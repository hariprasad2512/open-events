import os
import uuid
import json
import logging
import urllib.request
import urllib.error
from datetime import datetime
from app.config import BRIGHT_DATA_API_KEY, BRIGHT_DATA_ZONE

logger = logging.getLogger(__name__)

# Registry Collector mapping for Hyderabad pilot
COLLECTOR_REGISTRY = {
    "fullhyd": {
        "collector_id": "c_fullhyd_events",
        "site_name": "FullHyd",
        "url": "https://events.fullhyderabad.com"
    },
    "hydhub": {
        "collector_id": "c_hydhub_events",
        "site_name": "HydHub",
        "url": "https://hydhub.in"
    },
    "aroundu": {
        "collector_id": "c_aroundu_events",
        "site_name": "AroundU",
        "url": "https://aroundu.in/city/hyderabad"
    }
}

def fetch_live_brightdata_scraper(collector_id: str, target_url: str) -> list:
    """
    Triggers a live scrape via Bright Data Scraper Studio Trigger API.
    Endpoint: https://api.brightdata.com/dca/trigger?collector={collector_id}&queue_next=1
    """
    if not BRIGHT_DATA_API_KEY:
        logger.info("No BRIGHT_DATA_API_KEY found in .env. Using raw scraped JSON file fallback.")
        return None

    try:
        api_url = f"https://api.brightdata.com/dca/trigger?collector={collector_id}&queue_next=1"
        payload = json.dumps([{"url": target_url}]).encode("utf-8")
        
        req = urllib.request.Request(
            api_url,
            data=payload,
            headers={
                "Authorization": f"Bearer {BRIGHT_DATA_API_KEY}",
                "Content-Type": "application/json"
            },
            method="POST"
        )
        
        with urllib.request.urlopen(req, timeout=15) as response:
            res_body = response.read().decode("utf-8")
            data = json.loads(res_body)
            logger.info(f"Bright Data live trigger response: {data}")
            
            if isinstance(data, list):
                return data
            elif isinstance(data, dict) and "data" in data:
                return data["data"]
            return None
            
    except Exception as e:
        logger.error(f"Live Bright Data Scraper call failed for collector {collector_id}: {str(e)}")
        return None

def load_real_scraped_file() -> list:
    """Loads raw scraped items from teammate's scraped-data.json payload if available."""
    possible_paths = [
        os.path.join(os.path.dirname(__file__), "..", "..", ".pranav", "scraped-data.json"),
        os.path.join(os.path.dirname(__file__), "..", "..", "data", "samples", "scraped_data_real.json")
    ]
    for p in possible_paths:
        if os.path.exists(p):
            try:
                with open(p, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if isinstance(data, list) and len(data) > 0:
                        logger.info(f"Loaded {len(data)} real raw items from {p}")
                        return data
            except Exception as e:
                logger.error(f"Failed loading raw scraped file {p}: {str(e)}")
    return None

def collect_raw_dataset(target: str, inject_errors: bool = False) -> list:
    """
    Collects raw event listings from target platforms.
    1. Attempts live Bright Data API call if BRIGHT_DATA_API_KEY is available.
    2. Attempts loading teammate's raw scraped JSON file if present on disk.
    3. Falls back to sample listings simulation.
    """
    timestamp = datetime.utcnow().isoformat() + "Z"
    target_key = target.lower()
    
    # 1. Live Bright Data Scraper Studio Call
    collector_info = None
    for key, info in COLLECTOR_REGISTRY.items():
        if key in target_key:
            collector_info = info
            break
            
    if collector_info and BRIGHT_DATA_API_KEY:
        live_data = fetch_live_brightdata_scraper(collector_info["collector_id"], collector_info["url"])
        if live_data and isinstance(live_data, list) and len(live_data) > 0:
            logger.info(f"Successfully received {len(live_data)} raw items from Bright Data Scraper Studio.")
            return live_data

    # 2. Teammate's Real Raw Scraped JSON File
    if "fullhyd" in target_key:
        real_file_data = load_real_scraped_file()
        if real_file_data:
            if inject_errors:
                # Simulate glitch in first item
                real_file_data = [dict(item) for item in real_file_data]
                real_file_data[0]["venue_name"] = None
            return real_file_data

    # 3. Fallback High-Fidelity Samples
    logger.info(f"Using high-fidelity sample listings for target '{target}'")
    
    if "fullhyd" in target_key:
        dataset = [
            {
                "raw_id": str(uuid.uuid4()),
                "raw_title": "Hyderabad Literary & Theatre Festival",
                "raw_category": "Theatre & Cultural",
                "raw_date": "2026-08-28",
                "raw_time": "18:00",
                "venue_name": "Ravindra Bharathi Auditorium" if not inject_errors else None,
                "locality": "Lakdikapul",
                "ticket_price": "Free Entry",
                "blurb": "Annual literary meet with theatre performances, poetry readings, and book discussions.",
                "source_site": "FullHyd",
                "source_url": "https://events.fullhyderabad.com/theatre-fest-2026",
                "scraped_at": timestamp
            }
        ]
    elif "hydhub" in target_key:
        dataset = [
            {
                "raw_id": str(uuid.uuid4()),
                "raw_title": "Hyderabad Literary Festival 2026",
                "raw_category": "Stage Plays & Arts",
                "raw_date": "28/08/2026",
                "raw_time": "6:00 PM",
                "venue_name": "Ravindra Bharathi Auditorium",
                "locality": "Lakdikapul",
                "ticket_price": "Free",
                "blurb": "Celebration of literature, theatre, and arts.",
                "source_site": "HydHub",
                "source_url": "https://hydhub.in/events/ravindra-bharathi-fest",
                "scraped_at": timestamp
            }
        ]
    else:
        dataset = [
            {
                "raw_id": str(uuid.uuid4()),
                "raw_title": "Jubilee Hills Weekend Runners Social",
                "raw_category": "Outdoor Sports",
                "raw_date": "2026-08-29",
                "raw_time": "06:00 AM",
                "venue_name": "KBR National Park",
                "locality": "Jubilee Hills",
                "ticket_price": "Free",
                "blurb": "5K & 10K morning community run followed by coffee and networking.",
                "source_site": "AroundU",
                "source_url": "https://aroundu.in/city/hyderabad/kbr-park-run",
                "scraped_at": timestamp
            }
        ]
        
    return dataset
