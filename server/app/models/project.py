from datetime import datetime
from typing import Optional
from pydantic import EmailStr
from sqlmodel import Field, SQLModel
from enum import Enum


class MapStyle(str, Enum):
    dark = "dark"
    light = "light"
    satellite = "satellite"
    
class ProjectType(str, Enum):
    tourism = "tourism"
    music = "music"
    art = "art"

class ProjectStatus(str, Enum):
    not_published = "not_published"
    published = "published"

class ProjectBase(SQLModel):
    title: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    map_style: MapStyle = Field(default=MapStyle.dark)
    project_type: ProjectType = Field(default=ProjectType.tourism)
    project_status: ProjectStatus = Field(default=ProjectStatus.not_published)
    class Config:
        arbitrary_types_allowed=True

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    title: Optional[str]
    description: Optional[str] = None
    image_url: Optional[str] = None
    map_style: Optional[MapStyle] = Field(default=MapStyle.dark)
    project_type: Optional[ProjectType] = Field(default=ProjectType.tourism)
    project_status: Optional[ProjectStatus] = Field(default=ProjectStatus.not_published)
