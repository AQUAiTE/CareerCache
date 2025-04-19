import os.path 

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build


SCOPES = ['https://www.googleapis.com/auth/gmail.modify']

current_dir = os.path.dirname(os.path.abspath(__file__))

token_path = os.path.join(current_dir, "../core/token.json")
credentials_path = os.path.join(current_dir, "../core/credentials.json")

# Normalize the path (resolves any ".." or extra "/" components)
# os.path.normpath(token_path)

service = None
TOKEN_PATH = os.path.normpath(token_path)
CREDENTIALS_PATH = os.path.normpath(credentials_path)

def initialize_watcher():
    global service
    creds = None
    try:
        if os.path.exists(TOKEN_PATH):
            creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)
        # If there are no (valid) credentials available, let the user log in.
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    CREDENTIALS_PATH, SCOPES
                )
                creds = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open(TOKEN_PATH, "w") as token:
                token.write(creds.to_json())

        service = build("gmail", "v1", credentials=creds)
        request_body = {
            'labels': ['INBOX'],
            'topicName': 'projects/careercache/topics/myTopic',
            
        }        
        response = service.users().watch(userId = 'me', body=request_body).execute()
        print("Watcher started")

        return response['historyId']

    except Exception as e:
        print(f"Error initializing watcher: {e}")

def stop_gmail_watcher():
    global service
    try:
        
        response = service.users().stop(userId = 'me').execute()
        print("Watcher stopped")
    except Exception as e:
        print(f"Error stopping watcher: {e}")


def fetch_email_info():
    """
    Returns a list of email messages. Each of them contains, the following 
    fields:
    - body: The email body
    - subject: The email subject
    - sender: The email sender
    """
    global service
    try:
        message_ids = _get_message_ids(service)
        message_data = _batch_get_messages(service, message_ids)
        formatted_messages = _format_messages(message_data)
        return formatted_messages

    except Exception as e:
        print(f"Error fetching email: {e}")


# helper functions for fetching message ids
def _get_message_ids(service):
    from app.main import app
    try:
        history = service.users().history().list(
            userId='me',
            startHistoryId=app.state.historyId
        ).execute()

        message_ids = []

        if 'history' in history:
            for record in history['history']:
                if 'messages' in record:
                    for message in record['messages']:
                        message_ids.append(message['id'])

        return message_ids


    except Exception as e:
        print(f"Error fetching message Ids: {e}")

# Function to batch retrieve messages
def _batch_get_messages(service, message_ids):
    batch_size = 100  # Set a reasonable batch size
    messages = []
    
    # Create a batch request
    batch = service.new_batch_http_request()

    # Function to process individual responses
    def callback(request_id, response, exception):
        if exception is not None:
            print(f'Error fetching message ID {request_id}: {exception}')
        else:
            messages.append(response)
    
    # Add messages to batch request
    for message_id in message_ids:
        batch.add(service.users().messages().get(userId='me', id=message_id, format='full'), callback=callback)
        
        # Execute batch request when the batch size is reached
        if len(messages) % batch_size == 0:
            batch.execute()
            batch = service.new_batch_http_request()  # Reset batch for the next set

    # Execute any remaining requests
    if len(messages) % batch_size != 0:
        batch.execute()
    
    return messages



def _format_messages(messages):
    """
    Parses the message json and 
    returns a list of dictionaries with the following fields:
    - body: The email body
    - subject: The email subject
    - sender: The email sender
    """
    try:
        formatted_messages = []
        for message_data in messages:
            
            message = {}
            message['body'] = message_data['snippet']

            for header in message_data["payload"]["headers"]:
                if header["name"] == "From":
                    message['sender'] = header["value"]
                
                if header["name"] == "Subject":
                    message['subject'] = header["value"]

            formatted_messages.append(message)
        return formatted_messages   
    except Exception as e:
        print(f"Error formatting messages: {e}")