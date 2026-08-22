import uuid
from datetime import datetime
from typing import Optional, List, Dict
from pydantic import BaseModel, Field
from fastapi import FastAPI, BackgroundTasks, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from app.database import (
    init_db,
    get_job,
    get_all_events,
    get_event_by_id
)
from app.orchestrator import run_pipeline
from app.processor.normalizer import UNIFIED_TAXONOMY

app = FastAPI(
    title="Scrapeverse — City Leisure Events API",
    description="Resilient backend API for aggregating, validating, normalizing, and de-duplicating city leisure events.",
    version="0.3.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Data Models ---

class EventSourceModel(BaseModel):
    site_name: str = Field(..., description="Source platform name (e.g. FullHyd, HydHub, AroundU)")
    source_url: str = Field(..., description="URL of listing page")

class EventModel(BaseModel):
    event_id: str = Field(..., description="Unique event identifier")
    title: str = Field(..., description="Title of the event")
    category: str = Field(..., description="Category mapped to Unified Category Taxonomy")
    date: str = Field(..., description="Event date in YYYY-MM-DD format")
    time: Optional[str] = Field(None, description="Start time or slot label")
    venue: str = Field(..., description="Venue name")
    area: Optional[str] = Field(None, description="Locality / neighborhood")
    price: Optional[str] = Field(None, description="Ticket price or free entry indicator")
    description: Optional[str] = Field(None, description="Summary blurb")
    sources: List[EventSourceModel] = Field(..., description="List of source listing references post de-dup")
    scraped_at: str = Field(..., description="ISO 8601 timestamp")

class EventListResponse(BaseModel):
    total: int
    events: List[EventModel]

class WeeklyDigestResponse(BaseModel):
    city: str
    period: str
    total_events: int
    unique_venues: int
    category_breakdown: Dict[str, int]

class CategoriesResponse(BaseModel):
    categories: List[str]

class TriggerResponse(BaseModel):
    status: str
    job_id: str
    target: str

# --- Startup Event ---

@app.on_event("startup")
async def startup_event():
    init_db()

# --- API Endpoints ---

@app.get("/health", tags=["Health"])
def health() -> dict:
    """Returns service health status."""
    return {"status": "healthy"}

@app.get("/events", response_model=EventListResponse, tags=["Events"])
def list_events(
    category: Optional[str] = None,
    area: Optional[str] = None,
    limit: int = 50
):
    """
    Returns normalized and de-duplicated city leisure events.
    Allows filtering by `category` and `area`.
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

@app.get("/events/digest", response_model=WeeklyDigestResponse, tags=["Digest"])
def get_weekly_digest():
    """
    Returns the weekly city digest summary for the Hyderabad pilot.
    Includes category breakdowns and total event & venue counts.
    """
    events = get_all_events()
    total_events = len(events)
    unique_venues = len(set(e["venue"] for e in events)) if events else 0
    
    category_counts = {cat: 0 for cat in UNIFIED_TAXONOMY}
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

@app.get("/events/categories", response_model=CategoriesResponse, tags=["Taxonomy"])
def get_categories():
    """
    Returns the Unified Category Taxonomy supported by Scrapeverse.
    """
    return {
        "categories": UNIFIED_TAXONOMY
    }

@app.get("/events/{event_id}", response_model=EventModel, tags=["Events"])
def get_event(event_id: str):
    """
    Returns details for a single event record by ID.
    """
    event = get_event_by_id(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@app.post("/dca/trigger", response_model=TriggerResponse, tags=["Scraper Control"])
def trigger_scrape(target: str = "FullHyd", background_tasks: BackgroundTasks = None, inject_errors: bool = False):
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

@app.get("/dca/jobs/{job_id}", tags=["Scraper Control"])
def check_job(job_id: str) -> dict:
    """
    Returns status and logs for a background scraping job.
    """
    job = get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job
