from datetime import timedelta
import os
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, status
from app.models import User
from sqlmodel import Session, select
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.db import get_session
from app.models.token import Token
from app.models.user import UserCreate, UserCreateResponse
from app.core.dependencies import get_user_service
from app.services.user_service import UserService

router = APIRouter(prefix="/user", tags=["users"])
oauth2_schema = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/signup", response_model=UserCreateResponse, status_code=201)
def create_user(user: UserCreate, user_service: UserService = Depends(get_user_service)):
    """Create a new user account."""
    new_user = user_service.create_user(user)
    access_token_expires = timedelta(days=user_service.access_token_expire_days)
    access_token = user_service.create_access_token(
        data={"sub": user.email}, 
        expires_delta=access_token_expires
    )
    return UserCreateResponse(
        email=new_user.email,
        username=new_user.username,
        account_status=new_user.account_status,
        token=Token(access_token=access_token, token_type="bearer")
    )

@router.post("/login", response_model=Token)
def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    user_service: UserService = Depends(get_user_service)
):
    """Authenticate user and return access token."""
    user = user_service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token_expires = timedelta(days=user_service.access_token_expire_days)
    access_token = user_service.create_access_token(
        data={"sub": user.email}, 
        expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")

@router.get("/")
def get_all_users(session: Session = Depends(get_session)):
    """Get all users (for testing/admin purposes)."""
    return session.exec(select(User)).all()