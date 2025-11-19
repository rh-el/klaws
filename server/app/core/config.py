import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "KLAWS"
    PROJECT_DESCRIPTION: str = "API for Klaws platform. Powered by FastAPI with SQLModel and Supabase"
    PROJECT_VERSION: str = "0.1.0"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    BACKEND_CORS_ORIGINS: list = ["*"]

    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    JWT_ACCESS_TOKEN_EXPIRE_DAYS: int = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_DAYS", "2"))

    CLOUDINARY_CLOUD_NAME: str = os.getenv("CLOUDINARY_CLOUD_NAME", "")
    CLOUDINARY_API_KEY: str = os.getenv("CLOUDINARY_API_KEY", "")
    CLOUDINARY_API_SECRET: str = os.getenv("CLOUDINARY_API_SECRET", "")

    @property
    def cloudinary_config(self) -> dict:
        """Returns Cloudinary configuration as a dictionary."""
        return {
            "cloud_name": self.CLOUDINARY_CLOUD_NAME,
            "api_key": self.CLOUDINARY_API_KEY,
            "api_secret": self.CLOUDINARY_API_SECRET,
            "secure": True,
        }

settings = Settings()
