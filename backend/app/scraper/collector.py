import uuid
from datetime import datetime
from app.config import BRIGHT_DATA_SCRAPER_ID as SCRAPER_ID

def collect_raw_dataset(target: str, inject_errors: bool = False) -> list:
    """
    Simulates custom scrapers built in Bright Data Scraper Studio for target sites:
    - FullHyd Events
    - HydHub
    - AroundU
    
    Returns raw event listing payloads.
    """
    timestamp = datetime.utcnow().isoformat() + "Z"
    
    if "fullhyd" in target.lower():
        dataset = [
            {
                "raw_id": str(uuid.uuid4()),
                "raw_title": "Hyderabad Literary & Theatre Festival",
                "raw_category": "Theatre & Cultural",
                "raw_date": "2026-08-28",
                "raw_time": "18:00",
                "venue_name": "Ravindra Bharathi Auditorium" if not inject_errors else None, # Glitch
                "locality": "Lakdikapul",
                "ticket_price": "Free Entry",
                "blurb": "Annual literary meet with theatre performances, poetry readings, and book discussions.",
                "source_site": "FullHyd",
                "source_url": "https://events.fullhyderabad.com/theatre-fest-2026",
                "scraped_at": timestamp
            },
            {
                "raw_id": str(uuid.uuid4()),
                "raw_title": "AI & Web-Slinger Developer Workshop",
                "raw_category": "Tech Workshop",
                "raw_date": "2026-08-30",
                "raw_time": "10:00 AM",
                "venue_name": "T-Hub Phase 2",
                "locality": "Hitech City",
                "ticket_price": "Free RSVP",
                "blurb": "Hands-on workshop on building web scrapers, data pipelines, and AI agent workflows.",
                "source_site": "FullHyd",
                "source_url": "https://events.fullhyderabad.com/ai-workshop-thub",
                "scraped_at": timestamp
            }
        ]
    elif "hydhub" in target.lower():
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
            },
            {
                "raw_id": str(uuid.uuid4()),
                "raw_title": "Live Acoustic Music Session",
                "raw_category": "Live Concerts",
                "raw_date": "2026-08-31",
                "raw_time": " Evening ",
                "venue_name": "Hard Rock Cafe",
                "locality": "Banjara Hills",
                "ticket_price": "₹500 cover",
                "blurb": "Enjoy acoustic indie performances live.",
                "source_site": "HydHub",
                "source_url": "https://hydhub.in/events/acoustic-night",
                "scraped_at": timestamp
            }
        ]
    else: # AroundU / default
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
