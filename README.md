# scrape-verse-project

A split frontend/backend scaffold for a scraping dashboard pipeline.

## Structure
- frontend/: web app UI
- backend/: Python API, scraper, processor
- docs/: architecture and frontend data contract

## Quick Start

### Backend
1. Create and activate a Python environment.
2. Install dependencies:
   - pip install -r backend/requirements.txt
3. Run:
   - uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000

### Frontend
1. cd frontend
2. npm install
3. npm run dev

## Notes
- Keep secrets in .env (not committed).
- Update docs/mock_schema.json if API response shape changes.
