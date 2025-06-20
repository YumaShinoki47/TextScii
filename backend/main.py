from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.api.ascii_routes import router as ascii_router
from app.models.response_models import HealthResponse

app = FastAPI(
    title="TextScii API",
    description="AI-powered text to ASCII art conversion service",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ascii_router)

@app.get("/")
async def root():
    return {"message": "Welcome to TextScii API", "version": "1.0.0"}

@app.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(status="healthy", version="1.0.0")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)