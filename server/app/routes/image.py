from dotenv import load_dotenv
from app.db import get_session
from fastapi import APIRouter, Depends, HTTPException, UploadFile
from sqlmodel import Session
from app.db import get_session
from app.core.dependencies import get_image_service
from app.services.image_service import ImageService

router = APIRouter(prefix="/images", tags=["images"])

@router.post("/upload_image")
async def upload_to_cloudinary(
    file: UploadFile,
    image_service: ImageService = Depends(get_image_service)
):
    try:
        result = await image_service.upload_image(file)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/delete_image/{public_id}/{image_id}")
async def delete_image_from_cloudinary(
    public_id: str,
    image_id: int,
    session: Session = Depends(get_session),
    image_service: ImageService = Depends(get_image_service)
):
    try:
        result = await image_service.delete_image(public_id)
        # TODO: Add database deletion logic when needed
        # success = delete_product_image(session, image_id)
        # if not success:
        #     raise Exception("An error occurred while deleting image from database")
        return {"message": "image deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
