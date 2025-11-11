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

    projects: List["Project"] = Relationship(back_populates="user")

class Project(ProjectBase, table=True):
    # __tablename__ = "project"

    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default=None, sa_column_kwargs={"onupdate": datetime.now})

    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    
    user: Optional[User] = Relationship(back_populates="projects")
    groups: List["Group"] = Relationship(back_populates="project")
    areas: List["Area"] = Relationship(back_populates="project")

class Group(GroupBase, table=True):
    # __tablename__ = "group"

    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default=None, sa_column_kwargs={"onupdate": datetime.now})

    project_id: Optional[int] = Field(default=None, foreign_key="project.id")
    
    project: Optional[Project] = Relationship(back_populates="groups")
    areas: List["Area"] = Relationship(back_populates="group")

class Area(AreaBase, table=True):
    # __tablename__ = "area"

    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default=None, sa_column_kwargs={"onupdate": datetime.now})

    project_id: Optional[int] = Field(default=None, foreign_key="project.id")
    group_id: Optional[int] = Field(default=None, foreign_key="group.id")
    
    project: Optional[Project] = Relationship(back_populates="areas")
    group: Optional[Group] = Relationship(back_populates="areas")
    sample: Optional["Sample"] = Relationship(
        back_populates="area",
        sa_relationship_kwargs={"uselist": False}
    )

class Sample(SampleBase, table=True):
    # __tablename__ = "sample"

    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default=None, sa_column_kwargs={"onupdate": datetime.now})

    area_id: Optional[int] = Field(default=None, foreign_key="area.id", unique=True)
    
    area: Optional[Area] = Relationship(back_populates="sample")

__all__ = ["User", "Project", "Group", "Area", "Sample"]