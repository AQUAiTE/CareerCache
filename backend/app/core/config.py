import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Load .env file
load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Tracker"
    # DATABASE_URL: str = os.getenv("DATABASE_URL")
    # SECRET_KEY: str = os.getenv("SECRET_KEY")
    CEREBRAS_API_KEY: str = os.getenv("CEREBRAS_API_KEY")
    SUPABASE_API_KEY: str = os.getenv("SUPABASE_API_KEY")

settings = Settings()