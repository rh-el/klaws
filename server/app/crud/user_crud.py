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

def create_user(user: UserCreateHashed, session: Session):
    new_user = User(
        email=user.email,
        nickname=user.nickname,
        bio=user.bio,
        avatar_url=user.avatar_url,
        account_status=user.account_status,
        hashed_password=user.hashed_password
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user