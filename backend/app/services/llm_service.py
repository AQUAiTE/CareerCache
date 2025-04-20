import os
from cerebras.cloud.sdk import Cerebras

from backend.app.core.config import settings

client = Cerebras(
    # This is the default and can be omitted
    api_key=settings.CEREBRAS_API_KEY,
)

prompt_template = """
You are an intelligent parser that extracts job application details from emails.

Your job is to read an email message and return the following information in JSON format:

{{
  "company": string or null,
  "role": string or null,
  "status": enum
}}

- "company" is the name of the organization sending the job-related email.
- "role" is the job title or position the candidate is being considered for.
- "status" can be "APPLIED", "REJECTED", "INTERVIEW", "OFFER"

EMAIL:
{email}
"""

schema = {
    "type": "object",
    "properties": {
        "company": {"type": "string"},
        "role": {"type": "string"},
        "status": {"type": "string", "enum": ["APPLIED", "INTERVIEW", "REJECTED", "OFFER"]},
    },
    "required": ["company", "role", "status"],
    "additionalProperties": False,
}


async def extract_application_details(email: str):
    global client
    prompt = prompt_template.format(email=email)
    # print(prompt, type(prompt))
    try:


        chat_completion = client.chat.completions.create(
            model="llama-4-scout-17b-16e-instruct",
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            response_format={
                "type": "json_schema",
                "json_schema": {
                    "name": "schema",
                    "strict": True,
                    "schema": schema,
                },
            },
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"Error invoking Cerebras API: {e}")
        return None
    

job_app_prompt = """
You are an intelligent classifier that determines whether an email is related to a job application.

Classify the following email as either: True or False
job_application: boolean

Email:
{email}
"""

app_schema = {
    "type": "object",
    "properties": {
        "is_job_app": {"type": "boolean"}
    },
    "required": ["is_job_app"],
    "additionalProperties": False,
}
async def classify_email(email):
    global client
    prompt = job_app_prompt.format(email=email)
    # print(prompt)
    try:


        chat_completion = client.chat.completions.create(
            model="llama-4-scout-17b-16e-instruct",
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            response_format={
                "type": "json_schema",
                "json_schema": {
                    "name": "schema",
                    "strict": True,
                    "schema": app_schema,
                },
            },
        )
        # print(chat_completion)
        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"Error invoking Cerebras API: {e}")
        return None
