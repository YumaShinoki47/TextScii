from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ASCIIResponse(BaseModel):
    ascii_art: str = Field(..., description="Generated ASCII art")
    style: str = Field(..., description="Style used for generation")
    width: int = Field(..., description="Width of the ASCII art")
    height: int = Field(..., description="Height of the ASCII art")
    generation_time: Optional[float] = Field(default=None, description="Time taken to generate (seconds)")
    created_at: datetime = Field(default_factory=datetime.now, description="Creation timestamp")

class ErrorResponse(BaseModel):
    error: str = Field(..., description="Error message")
    code: int = Field(..., description="Error code")
    details: Optional[str] = Field(default=None, description="Additional error details")

class HealthResponse(BaseModel):
    status: str = Field(..., description="Service status")
    version: str = Field(..., description="API version")
    timestamp: datetime = Field(default_factory=datetime.now, description="Response timestamp")