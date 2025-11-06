from datetime import datetime
from typing import Optional
from pydantic import EmailStr
from sqlmodel import Enum, Field, SQLModel

class GroupColor(str, Enum):
    white = "white"
    red = "red"
    blue = "blue"
    green = "green"
    purple = "purple"

class EffectType(int, Enum):
    first = 1
    second = 2
    third = 3

class GroupBase(SQLModel):
    name: Optional[str] = "new group"
    color: GroupColor = Field(default=GroupColor.purple)
    reverb_enabled: bool = False
    reverb_gain: int
    reverb_type: EffectType = Field(default=EffectType.first)
    delay_enabled: bool = False
    delay_gain: int
    delay_type: EffectType = Field(default=EffectType.first)

class GroupCreate(GroupBase):
    pass

class GroupUpdate(GroupBase):
    name: Optional[str] = "new group"
    color: Optional[GroupColor] = Field(default=GroupColor.purple)
    reverb_enabled: Optional[bool] = False
    reverb_gain: Optional[int]
    reverb_type: Optional[EffectType] = Field(default=EffectType.first)
    delay_enabled: Optional[bool] = False
    delay_gain: Optional[int]
    delay_type: Optional[EffectType] = Field(default=EffectType.first)
    updated_at: Optional[datetime] = Field(default=None, sa_column_kwargs={"onupdate": datetime.now})


