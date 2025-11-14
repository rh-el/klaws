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
from app.services.user_service import authenticate_user, create_access_token, create_user_service

load_dotenv()

# ACCESS_TOKEN_EXPIRE_DAYS = os.getenv("ACCESS_TOKEN_EXPIRE_DAYS")
ACCESS_TOKEN_EXPIRE_DAYS = 2

router = APIRouter(prefix="/user", tags=["users"])
oauth2_schema = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/signup", response_model=UserCreateResponse, status_code=201)
def create_user(user: UserCreate, session: Session = Depends(get_session)):
    new_user = create_user_service(user, session)
    access_token_expires = timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    return UserCreateResponse(
        email=new_user.email,
        nickname=new_user.nickname,
        account_status=new_user.account_status,
        token=Token(access_token=access_token, token_type="bearer")
    )

@router.post("/login", response_model=Token)
def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session: Session = Depends(get_session)):
    print(form_data)
    user = authenticate_user(form_data.username, form_data.password, session)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token_expires = timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")

@router.get("/")
def get_all_users(session: Session = Depends(get_session)):
    print(session.exec(select(User)).all())
    return session.exec(select(User)).all()