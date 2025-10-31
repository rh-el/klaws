from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel

from .db import engine, get_session


app = FastAPI(title="Klaws API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    # Create tables if they don't exist yet (MVP convenience)
    SQLModel.metadata.create_all(engine)


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "ok"}


