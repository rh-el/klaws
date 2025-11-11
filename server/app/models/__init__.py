from datetime import datetime
from typing import List, Optional

from sqlmodel import Field, Relationship
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

    projects: Optional[List["Project"]] = Relationship(back_populates="id_user")

class Project(ProjectBase, table= True):
    # __tablename__ = "project"

    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default=None, sa_column_kwargs={"onupdate": datetime.now})

    id_user: User = Relationship(back_populates="projects")
    groups: Optional[List["Group"]] = Relationship(back_populates="id_project")
    areas: Optional[List["Area"]] = Relationship(back_populates="id_project")

class Group(GroupBase, table=True):
    # __tablename__ = "group"

    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default=None, sa_column_kwargs={"onupdate": datetime.now})

    id_project: Project = Relationship(back_populates="groups")
    areas: Optional[List["Area"]] = Relationship(back_populates="id_group")

class Area(AreaBase, table=True):
    # __tablename__ = "area"

    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default=None, sa_column_kwargs={"onupdate": datetime.now})

    id_project: Project = Relationship(back_populates="areas")
    id_group: Group = Relationship(back_populates="areas")
    id_sample: "Sample" = Relationship(back_populates="area")

class Sample(SampleBase, table=True):
    # __tablename__ = "sample"

    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default=None, sa_column_kwargs={"onupdate": datetime.now})

    area: Area = Relationship(back_populates="id_sample")

__all__ = ["User", "Project", "Group", "Area", "Sample"]