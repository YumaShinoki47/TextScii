# CLAUDE.md
基本的に日本語で回答してください。
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TextScii is an AI-powered text-to-ASCII art generator service built with a FastAPI backend and React TypeScript frontend. The application takes text descriptions in Japanese/English and uses Google Gemini AI to generate ASCII art with various styles and customization options.

## Development Commands

### Backend (FastAPI + Python)
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env to add your GOOGLE_API_KEY

# Run development server
python main.py
# Server runs on http://localhost:8000
# API docs available at http://localhost:8000/docs
```

### Frontend (React + TypeScript + Vite)
```bash
cd frontend

# Install dependencies
npm install

# Development server
npm run dev
# Runs on http://localhost:3000

# Build for production
npm run build

# Type checking
npm run build  # includes tsc check

# Linting
npm run lint

# Preview production build
npm run preview
```

## Architecture Overview

### Backend Structure
- **FastAPI Application**: Main server in `main.py` with CORS middleware
- **API Routes**: RESTful endpoints in `app/api/ascii_routes.py`
  - `POST /api/v1/generate-ascii` - Generate ASCII art from text
  - `POST /api/v1/refine-ascii` - Refine existing ASCII art
- **Core Services**:
  - `ASCIIGenerator` (`app/services/ascii_generator.py`) - Main business logic
  - `GeminiClient` (`app/services/gemini_client.py`) - Google Gemini AI integration
- **Data Models**: Pydantic models in `app/models/` for request/response validation
- **AI Integration**: Uses Google Gemini 2.0 Flash model for ASCII art generation

### Frontend Structure
- **React 18 + TypeScript**: Modern React with functional components and hooks
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first styling framework
- **Custom Hook**: `useASCIIGenerator` manages API calls and state
- **Component Architecture**:
  - `GenerationForm` - Input form with style/size controls
  - `ASCIIResult` - Display generated art with refinement options
  - `Header`, `LoadingSpinner`, `ErrorMessage` - UI components
- **API Layer**: Axios-based service in `src/services/api.ts`
- **Type Safety**: Comprehensive TypeScript types in `src/types/`

### Key Integration Points
- **Proxy Configuration**: Vite dev server proxies `/api` requests to backend
- **API Communication**: Frontend uses Axios to communicate with FastAPI backend
- **Error Handling**: Structured error responses from backend, user-friendly messages in frontend
- **State Management**: React hooks for local state, no external state manager needed

## Environment Setup

### Required Environment Variables (Backend)
```bash
GOOGLE_API_KEY=your_google_gemini_api_key_here  # Required - Get from https://ai.google.dev/
ENVIRONMENT=development
LOG_LEVEL=INFO
```

### API Configuration
- Backend runs on port 8000
- Frontend runs on port 3000 (development)
- Frontend proxies API calls to backend during development
- Production builds serve static files, API remains separate

## Key Development Patterns

### Backend Patterns
- **Async/Await**: All API endpoints and AI calls are asynchronous
- **Pydantic Validation**: Strong request/response validation with Pydantic models
- **Error Handling**: Structured exception handling with HTTPException
- **Service Layer**: Business logic separated into service classes
- **Environment-based Configuration**: Using python-dotenv for config management

### Frontend Patterns
- **Custom Hooks**: Business logic abstracted into reusable hooks
- **TypeScript Types**: Shared types between components and API layer
- **Component Composition**: Small, focused components with clear responsibilities
- **Error Boundaries**: Graceful error handling with user feedback
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Testing and Quality

### Backend
- No specific test framework configured - add pytest if implementing tests
- API documentation auto-generated with FastAPI/OpenAPI
- Input validation handled by Pydantic models

### Frontend
- ESLint configured with TypeScript rules
- Type checking with TypeScript compiler
- Build process includes type checking and linting
- No unit tests configured - add Jest/Vitest if implementing tests

## Common Development Tasks

### Adding New ASCII Styles
1. Update `ASCIIStyle` enum in `backend/app/models/request_models.py`
2. Add style prompt in `GeminiClient.generate_ascii_prompt()` method
3. Update frontend style options in `GenerationForm` component

### Modifying API Endpoints
1. Update route handlers in `backend/app/api/ascii_routes.py`
2. Update Pydantic models in `backend/app/models/`
3. Update frontend API service in `frontend/src/services/api.ts`
4. Update TypeScript types in `frontend/src/types/`

### Environment Configuration
- Backend environment variables in `.env` file (copy from `.env.example`)
- Google Gemini API key required for AI functionality
- No additional configuration needed for frontend development