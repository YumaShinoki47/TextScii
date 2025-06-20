from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class ASCIIStyle(str, Enum):
    CLASSIC = "classic"
    MODERN = "modern"
    MINIMAL = "minimal"
    ARTISTIC = "artistic"

class CharsetType(str, Enum):
    STANDARD = "standard"
    EXTENDED = "extended"
    MINIMAL = "minimal"
    CUSTOM = "custom"

class TextToASCIIRequest(BaseModel):
    text: str = Field(..., description="Text description to convert to ASCII art", min_length=1, max_length=1000)
    style: ASCIIStyle = Field(default=ASCIIStyle.CLASSIC, description="ASCII art style")
    width: Optional[int] = Field(default=80, description="Width of ASCII art", ge=20, le=200)
    height: Optional[int] = Field(default=40, description="Height of ASCII art", ge=10, le=100)
    charset: CharsetType = Field(default=CharsetType.STANDARD, description="Character set to use")
    density: Optional[float] = Field(default=1.0, description="Detail density", ge=0.1, le=2.0)
    language: Optional[str] = Field(default="ja", description="Input text language (ja/en)")

class ASCIICustomizationRequest(BaseModel):
    original_text: str = Field(..., description="Original text description")
    modification: str = Field(..., description="Modification instruction (e.g., 'make it more fantasy-like')")
    current_ascii: str = Field(..., description="Current ASCII art to modify")