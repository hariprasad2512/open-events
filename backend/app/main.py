import uuid
from datetime import datetime
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.database import init_db, get_job, get_items_by_job, get_historical_metrics
from backend.orchestrator import run_pipeline, start_periodic_scheduler

app = FastAPI(title="Scrape Verse Backend", version="0.1.0")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    # Setup database structure
    init_db()
    # Optionally start periodic scraping simulator in background task
    import asyncio
    asyncio.create_task(start_periodic_scheduler(interval_seconds=300, target="Job Boards"))

@app.get("/health")
def health() -> dict:
    return {"status": "ok"}

@app.post("/dca/trigger")
def trigger_scrape(target: str, background_tasks: BackgroundTasks, inject_errors: bool = False) -> dict:
    """
    Scrape Trigger endpoint: POST /dca/trigger
    Kicks off collector control service in the background.
    """
    from backend.database import create_job
    job_id = f"job_{uuid.uuid4().hex[:8]}"
    create_job(job_id, target)
    
    # Run pipeline in background
    background_tasks.add_task(run_pipeline, job_id, target, inject_errors)
    
    return {
        "status": "triggered",
        "job_id": job_id,
        "target": target
    }

@app.get("/dca/jobs/{job_id}")
def check_job(job_id: str) -> dict:
    """
    Checks the status of a specific scrape job.
    """
    job = get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@app.get("/dca/dataset/{job_id}")
def get_dataset(job_id: str) -> dict:
    """
    Dataset API: GET /dca/dataset/{job_id}
    Retrieves the processed, normalized, and scored dataset.
    """
    job = get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
        
    items = get_items_by_job(job_id)
    
    total_items = len(items)
    avg_score = sum(i["score"] for i in items) / total_items if total_items > 0 else 0
    
    return {
        "status": job["status"],
        "generatedAt": job["updated_at"],
        "summary": {
            "totalItems": total_items,
            "averageScore": avg_score
        },
        "items": items
    }

@app.get("/api/metrics")
def get_historical_trends() -> dict:
    """
    Returns time-series historical data snapshots of pipeline runs.
    """
    history = get_historical_metrics()
    return {
        "status": "ok",
        "history": history
    }

@app.get("/mock-data")
def mock_data() -> dict:
    """
    Mock endpoint adhering strictly to docs/mock_schema.json
    """
    return {
        "status": "ok",
        "generatedAt": "2026-08-19T00:00:00Z",
        "summary": {
            "totalItems": 2,
            "averageScore": 85.0
        },
        "items": [
            {
                "id": "mock-item-1",
                "title": "Lead Devops Engineer",
                "source": "LinkedIn Jobs",
                "url": "https://linkedin.com/jobs/view/1",
                "score": 80.0,
                "tags": ["DevOps", "Kubernetes"],
                "metadata": {
                    "scrapedAt": "2026-08-19T00:00:00Z",
                    "region": "US"
                }
            },
            {
                "id": "mock-item-2",
                "title": "Senior AI Architect",
                "source": "GitHub Jobs",
                "url": "https://github.com/careers/ai-architect",
                "score": 90.0,
                "tags": ["AI", "Architecture", "Python"],
                "metadata": {
                    "scrapedAt": "2026-08-19T00:00:00Z",
                    "region": "US"
                }
            }
        ]
    }
