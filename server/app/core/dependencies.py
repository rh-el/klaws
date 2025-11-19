from fastapi import Depends
from sqlmodel import Session
from app.db import get_session
from app.services.user_service import UserService
from app.services.image_service import ImageService


def get_user_service(session: Session = Depends(get_session)) -> UserService:
    return UserService(session)


def get_image_service() -> ImageService:
    return ImageService()

