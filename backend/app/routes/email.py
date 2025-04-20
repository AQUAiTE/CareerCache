from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel
import json

# from app.services.cerebras_service import invoke_ceberas_api
from backend.app.services.email_services import fetch_email_info



from typing import List
import base64

router = APIRouter()

@router.get("/fetch_email")
async def get_mail():

    return {"message": "Mail fetched successfully"}

@router.post("/nonification")
async def notifications(request: Request):
    from backend.app.main import app

    try:
        data = await request.json()
        # Extract message data and process

        message_data = data['message']['data']
        _, new_history_id = _parse_data(message_data)

        emails = fetch_email_info()
        print(f"Emails you have gotten:")

        for email in emails:
            print(f"Subject: {email['subject']}, Sender: {email['sender']}, Body: {email['body']}")

        # set new history ID so that we only fetch new emails
        app.state.historyId = new_history_id
        print(f"NEW: {app.state.historyId}")

        # Fetch email details using Gmail API here
        return {"status": "success"}
    except Exception as e:
        print(f"An error occurred while processing the notification: {e}")
        return {"status": "error"}



# HELPER FUNCTIONS: 

def _parse_data(message_data):
    """
    Parses and transform the data into its individual components
    """
    decoded_data = base64.b64decode(message_data)
    decoded_data = json.loads(decoded_data)
    email_address = decoded_data['emailAddress']
    new_history_id = decoded_data['historyId']

    return email_address, new_history_id