from fastapi import HTTPException, status

class AppException(HTTPException):
    def __init__(self, detail: str, status_code: int):
        super().__init__(status_code=status_code, detail=detail)



####### GENERIC ERRORS #######
class ResourceNotFoundException(AppException):
    def __init__(self, resource_type: str, resource_id: int):
        super().__init__(
            detail=f"{resource_type} with id {resource_id} not found",
            status_code=status.HTTP_404_NOT_FOUND
        )

class InvalidInputException(AppException):
    def __init__(self, message: str):
        super().__init__(
            detail=f"Invalid input: {message}",
            status_code=status.HTTP_400_BAD_REQUEST
        )


####### USER ERRORS #######
class UserAlreadyExistsException(AppException):
    def __init__(self, email: str):
        super().__init__(
            detail=f"User with email '{email}' already exists",
            status_code=status.HTTP_409_CONFLICT
        )