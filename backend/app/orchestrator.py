import uuid
import logging
import asyncio
from datetime import datetime
from app.database import (
    create_job,
    update_job_status,
    save_merged_events,
    persist_snapshot,
    get_all_events
)
from app.scraper.collector import collect_raw_dataset
from app.scraper.validator import validate_event_schema, run_self_healing
from app.processor.normalizer import normalize_events
from app.processor.deduplicator import deduplicate_events

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def run_pipeline(job_id: str, target: str, inject_errors: bool = False) -> dict:
    """
    Executes the full event pipeline step-by-step:
    1. Update job status to RUNNING
    2. Collect raw dataset (FullHyd / HydHub / AroundU)
    3. Health Check: Validate raw items
    4. AI Self-Healing: Repair broken selectors if needed
    5. Normalization: Map to Unified Category Taxonomy & YYYY-MM-DD date formats
    6. De-duplication: Fuzzy token match on title + date + venue
    7. Storage: Persist merged events and run snapshots
    """
    logger.info(f"Starting event pipeline for job {job_id} on target {target}")
    update_job_status(job_id, "RUNNING")
    
    try:
        await asyncio.sleep(0.5) # Simulate network/scraping
        
        # 1. Collect
        raw_data = collect_raw_dataset(target, inject_errors=inject_errors)
        
        # 2. Validate & Self-Heal
        validated_data = []
        healed_any = False
        healing_logs = []
        
        for item in raw_data:
            errors = validate_event_schema(item)
            if errors:
                logger.warning(f"Validation error in item: {errors}")
                healed_item, logs = run_self_healing(item, errors)
                validated_data.append(healed_item)
                healing_logs.extend(logs)
                healed_any = True
            else:
                validated_data.append(item)
                
        # 3. Normalize & Map Taxonomy
        normalized_data = normalize_events(validated_data)
        
        # 4. De-duplicate across sources
        merged_events, dedup_stats = deduplicate_events(normalized_data)
        
        # 5. Persist merged events
        save_merged_events(job_id, merged_events)
        
        # Calculate summary metrics & snapshot
        all_stored_events = get_all_events()
        total_events = len(all_stored_events)
        unique_venues = len(set(e["venue"] for e in all_stored_events)) if all_stored_events else 0
        persist_snapshot(total_events, unique_venues)
        
        final_status = "COMPLETED_HEALED" if healed_any else "COMPLETED"
        update_job_status(job_id, final_status)
        
        return {
            "status": "success",
            "job_id": job_id,
            "final_status": final_status,
            "healed": healed_any,
            "healing_logs": healing_logs,
            "dedup_stats": dedup_stats,
            "merged_events_count": len(merged_events)
        }
        
    except Exception as e:
        logger.error(f"Pipeline failed for job {job_id}: {str(e)}", exc_info=True)
        update_job_status(job_id, "FAILED", error_message=str(e))
        return {
            "status": "failed",
            "job_id": job_id,
            "error": str(e)
        }

async def start_periodic_scheduler(interval_seconds: int = 300, target: str = "FullHyd"):
    """
    Background loop that runs periodic event scraping tasks.
    """
    logger.info(f"Starting scheduler: Scrape target '{target}' every {interval_seconds}s")
    while True:
        await asyncio.sleep(interval_seconds)
        job_id = f"sched_{uuid.uuid4().hex[:8]}"
        create_job(job_id, target)
        await run_pipeline(job_id, target, inject_errors=False)
