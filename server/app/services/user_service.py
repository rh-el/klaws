from datetime import datetime, timedelta, timezone
import os
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
from app.core.exceptions import UserAlreadyExistsException
from app.crud.user_crud import create_user, get_user_by_email
import jwt
from sqlmodel import Session
from app.db import get_session
from app.models.user import UserCreate, UserCreateHashed, UserResponse
from typing import Annotated
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from app.models.token import TokenData

load_dotenv()



JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")  # Changed from HASH_SECRET_KEY
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")
ACCESS_TOKEN_EXPIRE_DAYS = 2

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
oauth2_scheme_no_error = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)

def get_password_hash(plain_password):
    return pwd_context.hash(plain_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt



def create_user_service(user: UserCreate, session: Session):
    db_user = get_user_by_email(user.email, session)

    if db_user:
        raise UserAlreadyExistsException(user.email)
    
    hashed_pasword = get_password_hash(user.plain_password)
    new_user = UserCreateHashed(
        email=user.email,
        nickname=user.nickname,
        bio=user.bio,
        avatar_url=user.avatar_url,
        account_status=user.account_status,
        hashed_password=hashed_pasword
    )
    return create_user(new_user, session)


