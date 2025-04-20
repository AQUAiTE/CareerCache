from supabase import create_client, Client
import uuid
from datetime import datetime
from backend.app.core.config import settings 

# Replace with your actual Supabase URL and Key
SUPABASE_URL = 'https://ctmrvvvshyxbtlrrrpvq.supabase.co'
SUPABASE_KEY = settings.SUPABASE_API_KEY
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Insert a row into the table
def insert_email_record(company, status, role):
    try:
        now = datetime.now()

        data = {
            "id": str(uuid.uuid4()),
            "receiver": "8f3c4d2e-41e7-4e63-a3c1-6f1d73a1d233",
            "company": company,
            "received": now.strftime("%Y-%m-%d"),
            "status": status,  # Make sure this matches your ENUM type
            "role": role
        }
        response = supabase.table("job_email").insert(data).execute()
        # print(response)
    except Exception as e:
        print(f"Issue adding to db {e}")


# Query records
def fetch_all_records():
    try:
        response = supabase.table("job_email").select("company, received, status, role").execute()
        return {"data": response.data}
    except Exception as e:
        print(f"Issue returning db {e}")

    

