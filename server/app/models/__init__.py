from datetime import datetime
from typing import Optional

from sqlmodel import Field
from app.models.area import AreaBase
from app.models.group import GroupBase
from app.models.project import ProjectBase
from app.models.sample import SampleBase
from app.models.user import UserBase

class User(UserBase, table=True):
    # __tablename__ = "user"

    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default=None, sa_column_kwargs={"onupdate": datetime.now})

class Project(ProjectBase, table= True):
    # __tablename__ = "project"

    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default=None, sa_column_kwargs={"onupdate": datetime.now})

class Group(GroupBase, table=True):
    # __tablename__ = "group"

    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default=None, sa_column_kwargs={"onupdate": datetime.now})

class Area(AreaBase, table=True):
    # __tablename__ = "area"

    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default=None, sa_column_kwargs={"onupdate": datetime.now})

class Sample(SampleBase, table=True):
    # __tablename__ = "sample"

    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default=None, sa_column_kwargs={"onupdate": datetime.now})
