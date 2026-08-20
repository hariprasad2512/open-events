# Scrape Verse Pipeline

A resilient, split-component data intelligence pipeline scaffold.

## Project Structure
- `backend/`: Python FastAPI scraping and data processing pipeline.
- `frontend/`: Web app UI and metrics dashboard.
- `docs/`: System architecture layouts, diagrams, and JSON mock schema contracts.

---

## Backend Architecture (v0.1)

The backend implements the complete architecture detailed in `docs/bcknd-arch_v0.1.png`:

- **Scrape Trigger & Dataset API**: FastAPI endpoints to enqueue background scraping tasks (`POST /dca/trigger`), track statuses (`GET /dca/jobs/{job_id}`), and poll processed datasets (`GET /dca/dataset/{job_id}`).
- **Collector Control Service**: Mock interface mimicking Bright Data Scraper Studio routing, configured with scraper IDs.
- **Health Validator**: Structural checks validating raw schema elements against `docs/mock_schema.json`.
- **AI Self-Healing Agent**: Automatic heuristics engine that heals broken/missing scraping selectors or fields.
- **Data Normalizer**: Pandas transformation pipeline standardizing whitespaces, regions, and timestamps.
- **Intelligence Scoring Engine**: Dynamic, rules-based intelligence scorer assigning weights to sources and keywords.
- **Time-Series Database**: SQLite repository persisting jobs, dataset items, and periodic metrics snapshots.

### File Layout:
- [`backend/config.py`](file:///D:/GitRepo/scrape_/backend/config.py): Configuration manager for loading environments, database paths, and API keys.
- [`backend/database.py`](file:///D:/GitRepo/scrape_/backend/database.py): SQLite CRUD adapters and schema initialization.
- [`backend/orchestrator.py`](file:///D:/GitRepo/scrape_/backend/orchestrator.py): Orchestrates asynchronous jobs and schedules periodic scraping tasks.
- [`backend/scraper/collector.py`](file:///D:/GitRepo/scrape_/backend/scraper/collector.py): Fetches target web structures with optional validation error simulation.
- [`backend/scraper/validator.py`](file:///D:/GitRepo/scrape_/backend/scraper/validator.py): Implements health checks and the AI self-healing agent simulator.
- [`backend/processor/normalizer.py`](file:///D:/GitRepo/scrape_/backend/processor/normalizer.py): Transforms and cleans datasets using Pandas.
- [`backend/processor/scoring.py`](file:///D:/GitRepo/scrape_/backend/processor/scoring.py): Calculates quality metrics.
- [`backend/main.py`](file:///D:/GitRepo/scrape_/backend/main.py): FastAPI application routing and startup hooks.
- [`backend/tests/test_pipeline.py`](file:///D:/GitRepo/scrape_/backend/tests/test_pipeline.py): Modular testing suite for automated validation of all nodes.

---

## Quick Start (Backend)

### 1. Setup Environment
Ensure you have Python 3.11+ installed. Create and activate a virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r backend/requirements.txt
```

### 3. Environment Variables
Copy `.env.example` to `.env` and fill in necessary configurations. (Environment files are git-ignored to prevent key leaks).
```bash
cp .env.example .env
```

### 4. Run the API Server
Start the FastAPI server:
```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```
Interactive API documentation will be available at `http://localhost:8000/docs`.

---

## Running Automated Tests

Run the test suite using Python's standard `unittest` library:
```bash
python -m unittest backend/tests/test_pipeline.py
```
This tests database initialization, scraping collection error injections, self-healing corrections, Pandas normalizations, scoring computations, and API routing.
