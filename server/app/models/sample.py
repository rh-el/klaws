
from sqlmodel import SQLModel


class SampleBase(SQLModel):
    url: str
    name: str

class SampleCreate(SampleBase):
    pass