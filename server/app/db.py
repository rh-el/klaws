import os
from typing import Iterator

from dotenv import load_dotenv
from sqlmodel import SQLModel, Session, create_engine

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "",  # sensible local default
)

engine = create_engine(DATABASE_URL, pool_pre_ping=True, pool_size=10, max_overflow=5)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session() -> Iterator[Session]:
    with Session(engine) as session:
        yield session


