# AI Instructions

Read this file first before making changes.

## Project Intent
Scrape Verse is split into:
- frontend/: UI and dashboard views
- backend/: scraping and data processing pipeline
- docs/: architecture and data contracts

## Non-Negotiables
- Keep API contracts aligned with docs/mock_schema.json.
- Do not hardcode secrets.
- Preserve separation of concerns between scraper and processor modules.

## Workflow
1. Update docs when data shape or endpoints change.
2. Keep frontend fetch wrappers in frontend/src/lib.
3. Keep backend pipeline logic in backend/scraper and backend/processor.
