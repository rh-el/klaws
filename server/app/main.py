from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel

from app.core.middlewares import global_exception_handler
from app.routes import image, user
from .db import create_db_and_tables, engine, get_session
from contextlib import asynccontextmanager
from app.core.config import settings
import uvicorn

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.PROJECT_VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)   

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Dev - local Vite
        "http://localhost:5174",  # Test - local Vite
        "http://localhost:80",    # Prod - local Nginx
        "http://frontend:5173",   # Dev - Docker
        "http://frontend:80",     # Prod - Docker
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.on_event("startup")
# def on_startup() -> None:
#     # Create tables if they don't exist yet (MVP convenience)
#     SQLModel.metadata.create_all(engine)

app.add_exception_handler(Exception, global_exception_handler)
app.include_router(user.router, prefix=settings.API_V1_STR)
app.include_router(image.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {"message": "Welcome to Klaws API"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)