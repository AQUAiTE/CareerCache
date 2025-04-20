from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel
import json

# from app.services.cerebras_service import invoke_ceberas_api
from backend.app.services.email_services import fetch_email_info

from backend.app.services.llm_service import classify_email, extract_application_details
from backend.app.services.db_service import insert_email_record, fetch_all_records, fetch_status_counts

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

        # set new history ID so that we only fetch new emails
        app.state.historyId = new_history_id
        print(f"NEW: {app.state.historyId}")

        for email in emails:
            print(f"Subject: {email['subject']}, Sender: {email['sender']}, Body: {email['body']}")
            
            body = email['body']
            response = await classify_email(email = body)
            if not json.loads(response)['is_job_app']:
                print(f"response: {response}, NOT JOB APP")
                continue

            extracted_info = await extract_application_details(email = body)
            extracted_info_json = json.loads(extracted_info)

            print(extracted_info_json)
            print("\n\n")

            company, status, role = extracted_info_json['company'], extracted_info_json['status'], extracted_info_json['role']

            insert_email_record(company=company, status=status, role = role)


        # Fetch email details using Gmail API here
        return {"status": "success"}
    except Exception as e:
        print(f"An error occurred while processing the notification: {e}")
        return {"status": "error"}
    

# TESTING
    
@router.post("/llm")
async def invoke(request: Request):
    

    try:
        data = await request.json()
        # Extract message data and process
        input = data['message']
        
        is_job_app = await classify_email(email = input)

        response = await extract_application_details(email = input)

        response = json.loads(response)
        is_job_app = json.loads(is_job_app)

        return {"extracted_info": response, "is_job_app": is_job_app}

    except Exception as e:
        print(f"An error occurred while calling LLM : {e}")
        return {"status": "error"}
    
@router.get("/get_db")
async def get_db():
    try:

        response = fetch_all_records()

        return response['data']

    except Exception as e:
        print(f"An issue in db: {e}")
        return {"status": "error"}
    
@router.get("/group_by_status")
async def get_status_count():
    try:

        response = fetch_status_counts()

        return response

    except Exception as e:
        print(f"An issue in db: {e}")
        return {"status": "error"}


@router.post("/db")
async def add_db():

    try:
        insert_email_record(company="apple", status="APPLIED", role="tech support")

        return {"status": "success"}

    except Exception as e:
        print(f"An issue in db: {e}")
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