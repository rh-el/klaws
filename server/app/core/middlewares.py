from fastapi.responses import JSONResponse
from fastapi import Request
from app.core.exceptions import AppException
import traceback

async def global_exception_handler(request: Request, exc: Exception):

    if isinstance(exc, AppException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"error": exc.detail, "code": exc.status_code}
        )


    print(f"[ERROR] Unexpected error: {exc}\n{traceback.format_exc()}")
    return JSONResponse(
        status_code=500,
        content={"error": "An unexpected error occurred", "code": 500}
    )