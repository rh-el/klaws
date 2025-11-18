import os
import uuid

from dotenv import load_dotenv
from app.db import get_session
import cloudinary
import cloudinary.uploader
from fastapi import APIRouter, Depends, HTTPException, UploadFile
from sqlmodel import Session



router = APIRouter(prefix="/images", tags=["images"])

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
       
cloudinary.config( 
    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME"), 
    api_key = os.getenv("CLOUDINARY_API_KEY"), 
    api_secret = os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)


@router.post("/upload_image")
async def upload_to_cloudinary(file: UploadFile):
    try:
        print(cloudinary)
        result = cloudinary.uploader.upload(file.file, public_id=str(uuid.uuid4()))
        return {"secure_url": result.get("secure_url"), "public_id": result.get("public_id")}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
    

@router.delete("/delete_image/{public_id}/{image_id}")
async def delete_image_from_cloudinary(public_id: str, image_id: int, session: Session = Depends(get_session)):
    try:
        result = cloudinary.uploader.destroy(public_id, resource_type="image")
        
        if result.get("result") != "ok":
            raise Exception("An error occured while deleting image from cloudinary")

        # success = delete_product_image(session, image_id)
        # if not success:
            # raise Exception("An error occured while deleting image from database")
        return {"message": "image deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))