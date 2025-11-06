import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "KLAWS"
    PROJECT_DESCRIPTION: str = "API for Klaws platform. Powered by FastAPI with SQLModel and Supabase"
    PROJECT_VERSION: str = "0.1.0"
    # SUPABASE_URL = os.getenv("SUPABASE_URL")
    # SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    BACKEND_CORS_ORIGINS: list = ["*"]

settings = Settings()
