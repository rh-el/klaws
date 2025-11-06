from datetime import datetime
from typing import Dict, Optional
from pydantic import EmailStr
from sqlmodel import JSON, Column, Enum, Field, SQLModel

class PlaybackMode(str, Enum):
    standard = "standard"
    modulate = "modulate"
    binaural = "binaural"

class AreaColor(str, Enum):
    white = "white"
    red = "red"
    blue = "blue"
    green = "green"
    purple = "purple"


class AreaBase(SQLModel):
    name: Optional[str] = "new area"
    playback_mode: PlaybackMode = Field(default=PlaybackMode.standard)
    color_fill: AreaColor = Field(default=AreaColor.purple)
    color_border: AreaColor = Field(default=AreaColor.purple)
    coordinates: Dict = Field(default_factory=dict, sa_column=Column(JSON))
    center_coordinates: Dict = Field(default_factory=dict, sa_column=Column(JSON))
    inner_coordinates: Dict = Field(default_factory=dict, sa_column=Column(JSON))

    class Config:
        arbitrary_types_allowed = True

class AreaCreate(AreaBase):
    pass

class AreaUpdate(AreaBase):
    name: Optional[str] = "new area"
    playback_mode: Optional[PlaybackMode] = Field(default=PlaybackMode.standard)
    color_fill: Optional[AreaColor] = Field(default=AreaColor.purple)
    color_border: Optional[AreaColor] = Field(default=AreaColor.purple)
    coordinates: Optional[Dict] = Field(default_factory=dict, sa_column=Column(JSON))
    center_coordinates: Optional[Dict] = Field(default_factory=dict, sa_column=Column(JSON))
    inner_coordinates: Optional[Dict] = Field(default_factory=dict, sa_column=Column(JSON))
    updated_at: Optional[datetime] = Field(default=None, sa_column_kwargs={"onupdate": datetime.now})

    class Config:
        arbitrary_types_allowed = True
