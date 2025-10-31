import os
from typing import Iterator

from dotenv import load_dotenv
from sqlmodel import Session, create_engine


load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://klaws:klaws@localhost:5432/klaws",  # sensible local default
)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)


def get_session() -> Iterator[Session]:
    with Session(engine) as session:
        yield session


