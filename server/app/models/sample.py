from datetime import datetime
from typing import Optional
from pydantic import EmailStr
from sqlmodel import Enum, Field, SQLModel

class SampleBase(SQLModel):
    url: str
    name: str

class SampleCreate(SampleBase):
    pass