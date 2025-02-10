from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Literal

class PostBase(BaseModel):
    title: str = Field(..., min_length=20, description="Minimal 20 karakter")
    content: str = Field(..., min_length=200, description="Minimal 200 karakter")
    category: str = Field(..., min_length=3, description="Minimal 3 karakter")
    status: str = Literal["Publish", "Draft", "Thrash"]

    @validator("status")
    def validate_status(cls, value):
        allowed_status = {"Publish", "Draft", "Thrash"}
        if value not in allowed_status:
            raise ValueError("Status harus salah satu dari: Publish, Draft, Thrash.")
        return value

class PostCreate(PostBase):
    pass

class PostResponse(PostBase):
    class Config:
        from_attributes = True

class PostsResponse(PostBase):
    id: int
    class Config:
        from_attributes = True