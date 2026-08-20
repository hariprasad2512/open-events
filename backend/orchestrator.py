import uuid
import logging
import asyncio
from datetime import datetime
from backend.database import (
    create_job,
    update_job_status,
    save_scored_items,
    persist_snapshot,
    get_items_by_job
)
from backend.scraper.collector import collect_raw_dataset
from backend.scraper.validator import validate_item_schema, run_self_healing
from backend.processor.normalizer import normalize_dataset
from backend.processor.scoring import score_items

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def run_pipeline(job_id: str, target: str, inject_errors: bool = False) -> dict:
    """
    Executes the full pipeline step-by-step:
    1. Update job status to RUNNING
    2. Collect dataset (raw JSON)
    3. Health Check: Validate items
    4. AI Self-Healing: Repair broken items if needed
    5. Normalization: clean strings/dates using Pandas
    6. Scoring: calculate intelligence scores
    7. Persistence: save job, items, and snapshot metrics
    """
    logger.info(f"Starting pipeline run for job {job_id} on target {target}")
    update_job_status(job_id, "RUNNING")
    
    try:
        # Simulate slight delay in network/scraping
        await asyncio.sleep(1.0)
        
        # 1. Collect
        raw_data = collect_raw_dataset(target, inject_errors=inject_errors)
        
        # 2. Validate and 3. AI Self-Heal
        validated_data = []
        healed_any = False
        healing_logs = []
        
        for item in raw_data:
            errors = validate_item_schema(item)
            if errors:
                logger.warning(f"Validation errors in item {item.get('id')}: {errors}")
                healed_item, logs = run_self_healing(item, errors)
                validated_data.append(healed_item)
                healing_logs.extend(logs)
                healed_any = True
            else:
                validated_data.append(item)
                
        # 4. Normalize
        normalized_data = normalize_dataset(validated_data)
        
        # 5. Score
        scored_data = score_items(normalized_data)
        
        # 6. Save items
        save_scored_items(job_id, scored_data)
        
        # Calculate summary metrics and persist historical snapshot
        total_items = len(scored_data)
        avg_score = sum(item["score"] for item in scored_data) / total_items if total_items > 0 else 0
        persist_snapshot(total_items, avg_score)
        
        # Update job status
        final_status = "COMPLETED_HEALED" if healed_any else "COMPLETED"
        update_job_status(job_id, final_status)
        
        return {
            "status": "success",
            "job_id": job_id,
            "final_status": final_status,
            "healed": healed_any,
            "healing_logs": healing_logs,
            "items_count": total_items,
            "average_score": avg_score
        }
        
    except Exception as e:
        logger.error(f"Pipeline failed for job {job_id}: {str(e)}", exc_info=True)
        update_job_status(job_id, "FAILED", error_message=str(e))
        return {
            "status": "failed",
            "job_id": job_id,
            "error": str(e)
        }

# Simple in-memory background scheduler to simulate Scheduled Task Orchestrator
async def start_periodic_scheduler(interval_seconds: int = 60, target: str = "Job Boards"):
    """
    Background loop that runs the scraping pipeline periodically.
    """
    logger.info(f"Starting scheduler: Scrape target '{target}' every {interval_seconds}s")
    while True:
        await asyncio.sleep(interval_seconds)
        job_id = f"sched_{uuid.uuid4().hex[:8]}"
        create_job(job_id, target)
        # Inject error periodically (every other run) to test self-healing
        inject_error = (int(datetime.utcnow().timestamp()) // interval_seconds) % 2 == 0
        await run_pipeline(job_id, target, inject_errors=inject_error)
