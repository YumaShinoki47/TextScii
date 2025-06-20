from fastapi import APIRouter, HTTPException
from app.models.request_models import TextToASCIIRequest, ASCIICustomizationRequest
from app.models.response_models import ASCIIResponse
from app.services.ascii_generator import ASCIIGenerator
import time

router = APIRouter(prefix="/api/v1", tags=["ASCII Generation"])

ascii_generator = ASCIIGenerator()

@router.post("/generate-ascii", response_model=ASCIIResponse)
async def generate_ascii_art(request: TextToASCIIRequest):
    try:
        start_time = time.time()
        
        ascii_art = await ascii_generator.generate(
            text=request.text,
            style=request.style.value,
            width=request.width,
            height=request.height,
            charset=request.charset.value,
            density=request.density
        )
        
        generation_time = time.time() - start_time
        
        return ASCIIResponse(
            ascii_art=ascii_art,
            style=request.style.value,
            width=request.width,
            height=request.height,
            generation_time=generation_time
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate ASCII art: {str(e)}")

@router.post("/refine-ascii", response_model=ASCIIResponse)
async def refine_ascii_art(request: ASCIICustomizationRequest):
    try:
        start_time = time.time()
        
        refined_ascii = await ascii_generator.refine(
            original_text=request.original_text,
            modification=request.modification,
            current_ascii=request.current_ascii
        )
        
        generation_time = time.time() - start_time
        
        return ASCIIResponse(
            ascii_art=refined_ascii,
            style="refined",
            width=len(refined_ascii.split('\n')[0]) if refined_ascii.split('\n') else 0,
            height=len(refined_ascii.split('\n')),
            generation_time=generation_time
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to refine ASCII art: {str(e)}")