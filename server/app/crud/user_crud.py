from sqlmodel import Session, select
from app.models import User
from app.models.user import UserCreateHashed, UserHashedPasswordResponse, UserResponse, UserUpdate
from typing import List, Optional
import hashlib

def get_user_by_email(email: str, session: Session) -> Optional[UserResponse]:
    query = select(User).where(User.email == email)
    db_user = session.exec(query).first()
    if not db_user:
        return None
    return UserResponse(
        email=db_user.email,
        nickname=db_user.nickname,
        account_status=db_user.account_status
    )