from datetime import datetime
from typing import Optional
from pydantic import EmailStr
from app.models.token import Token
from sqlmodel import Field, SQLModel
from enum import Enum

class AccountStatus(str, Enum):
    premium = "premium"
    base = "base"

class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True)
    username: str
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    account_status: AccountStatus = Field(default=AccountStatus.base)
    class Config:
        arbitrary_types_allowed=True

class UserCreate(UserBase):
    plain_password: str

class UserCreateHashed(UserBase):
    hashed_password: str

class UserLogin(SQLModel):
    email: str
    plain_password: str

class UserUpdate(SQLModel):
    email: Optional[str] = Field(default=None, unique=True, index=True)
    username: Optional[str] = None
    hashed_password: Optional[str] = None
    updated_at: Optional[datetime] = Field(default=None, sa_column_kwargs={"onupdate": datetime.now})

class UserResponse(SQLModel):
    email: str
    username: str
    account_status: AccountStatus = Field(default=AccountStatus.base)
    class Config:
        arbitrary_types_allowed=True

class UserHashedPasswordResponse(SQLModel):
    email: str
    hashed_password: str

class UserCreateResponse(UserResponse):
    token: Token
