from typing import Optional

from sqlmodel import Field, SQLModel


class Sample(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    file_url: str


