import uuid
from datetime import datetime
from typing import Optional
from fastapi import FastAPI, BackgroundTasks, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from app.database import (
    init_db,
    get_job,
    get_all_events,
    get_event_by_id,
    get_db_connection
)
from app.orchestrator import run_pipeline, start_periodic_scheduler
from app.processor.normalizer import UNIFIED_TAXONOMY

app = FastAPI(title="Scrapeverse — City Leisure Events API", version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    init_db()

@app.get("/health")
def health() -> dict:
    return {"status": "healthy"}

@app.get("/events")
def list_events(
    category: Optional[str] = None,
    area: Optional[str] = None,
    limit: int = 50
) -> dict:
    """
    Returns normalized and de-duplicated city leisure events.
    """
    events = get_all_events()
    
    if category:
        events = [e for e in events if e["category"].lower() == category.lower()]
    if area:
        events = [e for e in events if area.lower() in e.get("area", "").lower()]
        
    events = events[:limit]
    
    return {
        "total": len(events),
        "events": events
    }

@app.get("/events/digest")
def get_weekly_digest() -> dict:
    """
    Returns the weekly city digest summary for the Hyderabad pilot.
    """
    events = get_all_events()
    total_events = len(events)
    unique_venues = len(set(e["venue"] for e in events)) if events else 0
    
    category_counts = {}
    for cat in UNIFIED_TAXONOMY:
        category_counts[cat] = 0
    for e in events:
        cat = e.get("category", "Talks & Meetups")
        category_counts[cat] = category_counts.get(cat, 0) + 1
        
    return {
        "city": "Hyderabad",
        "period": "This Week",
        "total_events": total_events,
        "unique_venues": unique_venues,
        "category_breakdown": category_counts
    }

@app.get("/events/categories")
def get_categories() -> dict:
    """
    Returns the Unified Category Taxonomy.
    """
    return {
        "categories": UNIFIED_TAXONOMY
    }

@app.get("/events/{event_id}")
def get_event(event_id: str) -> dict:
    """
    Returns details for a single event record by ID.
    """
    event = get_event_by_id(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@app.post("/dca/trigger")
def trigger_scrape(target: str = "FullHyd", background_tasks: BackgroundTasks = None, inject_errors: bool = False) -> dict:
    """
    Triggers an event scraper run in the background.
    Targets: FullHyd, HydHub, AroundU
    """
    from app.database import create_job
    job_id = f"job_{uuid.uuid4().hex[:8]}"
    create_job(job_id, target)
    
    if background_tasks:
        background_tasks.add_task(run_pipeline, job_id, target, inject_errors)
        
    return {
        "status": "triggered",
        "job_id": job_id,
        "target": target
    }

@app.get("/dca/jobs/{job_id}")
def check_job(job_id: str) -> dict:
    job = get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job
