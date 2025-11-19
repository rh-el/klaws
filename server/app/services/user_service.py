from __future__ import annotations
from datetime import datetime, timedelta, timezone
from fastapi.security import OAuth2PasswordBearer
from app.core.exceptions import UserAlreadyExistsException
from app.core.config import settings
from app.crud.user_crud import create_user, get_user_by_email, get_user_hashed_password
import jwt
from sqlmodel import Session
from app.models.user import UserCreate, UserCreateHashed
from passlib.context import CryptContext
from app.models.token import TokenData

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
oauth2_scheme_no_error = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(plain_password: str) -> str:
    return pwd_context.hash(plain_password)


class UserService:    
    def __init__(self, session: Session):
        self.session = session
        self.jwt_secret_key = settings.JWT_SECRET_KEY
        self.jwt_algorithm = settings.JWT_ALGORITHM
        self.access_token_expire_days = settings.JWT_ACCESS_TOKEN_EXPIRE_DAYS
    
    def create_access_token(self, data: dict, expires_delta: timedelta | None = None) -> str:
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, self.jwt_secret_key, algorithm=self.jwt_algorithm)
    
    def authenticate_user(self, email: str, password: str):
        user = get_user_hashed_password(email, self.session)
        if not user:
            return False
        if not verify_password(password, user.hashed_password):
            return False
        return user
    
    def create_user(self, user_data: UserCreate):
        db_user = get_user_by_email(user_data.email, self.session)
        
        if db_user:
            raise UserAlreadyExistsException(user_data.email)
        
        hashed_password = get_password_hash(user_data.plain_password)
        new_user = UserCreateHashed(
            email=user_data.email,
            username=user_data.username,
            bio=user_data.bio,
            avatar_url=user_data.avatar_url,
            account_status=user_data.account_status,
            hashed_password=hashed_password
        )
        return create_user(new_user, self.session)
