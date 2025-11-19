import uuid
import cloudinary
import cloudinary.uploader
from fastapi import UploadFile
from app.core.config import settings


class ImageService:
    def __init__(self):
        cloudinary.config(**settings.cloudinary_config)
    
    async def upload_image(self, file: UploadFile) -> dict:
        try:
            result = cloudinary.uploader.upload(
                file.file, 
                public_id=str(uuid.uuid4())
            )
            return {
                "secure_url": result.get("secure_url"),
                "public_id": result.get("public_id")
            }
        except Exception as e:
            raise Exception(f"Failed to upload image: {str(e)}")
    
    async def delete_image(self, public_id: str) -> dict:
        try:
            result = cloudinary.uploader.destroy(public_id, resource_type="image")
            
            if result.get("result") != "ok":
                raise Exception("Failed to delete image from Cloudinary")
            
            return {"message": "Image deleted successfully", "result": result}
        except Exception as e:
            raise Exception(f"Failed to delete image: {str(e)}")

