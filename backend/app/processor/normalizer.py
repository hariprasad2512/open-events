import pandas as pd
from datetime import datetime
import re

UNIFIED_TAXONOMY = [
    "Music",
    "Theatre & Arts",
    "Workshops & Classes",
    "Sports & Outdoors",
    "Food & Drink",
    "Talks & Meetups",
    "Nightlife",
    "Family / Kids",
    "Exhibitions"
]

def map_category(raw_cat: str) -> str:
    """Maps raw source category strings into the Unified Category Taxonomy."""
    cat_lower = str(raw_cat).lower()
    
    if any(k in cat_lower for k in ["music", "concert", "dj", "band"]):
        return "Music"
    elif any(k in cat_lower for k in ["theatre", "art", "play", "stage", "cultural", "literary"]):
        return "Theatre & Arts"
    elif any(k in cat_lower for k in ["workshop", "class", "tech", "learning"]):
        return "Workshops & Classes"
    elif any(k in cat_lower for k in ["sport", "outdoor", "run", "fitness", "hike"]):
        return "Sports & Outdoors"
    elif any(k in cat_lower for k in ["food", "drink", "dining", "tasting"]):
        return "Food & Drink"
    elif any(k in cat_lower for k in ["talk", "meetup", "social", "networking"]):
        return "Talks & Meetups"
    elif any(k in cat_lower for k in ["nightlife", "party", "club"]):
        return "Nightlife"
    elif any(k in cat_lower for k in ["family", "kid", "child"]):
        return "Family / Kids"
    elif any(k in cat_lower for k in ["exhibition", "expo", "gallery"]):
        return "Exhibitions"
    
    return "Talks & Meetups" # Default fallback

def parse_date(date_str: str) -> str:
    """Parses various date text formats (e.g. 2026-08-28, 28/08/2026) into YYYY-MM-DD."""
    if not date_str:
        return datetime.utcnow().strftime("%Y-%m-%d")
        
    date_str = date_str.strip()
    
    # Check DD/MM/YYYY
    match_slash = re.match(r"^(\d{2})/(\d{2})/(\d{4})$", date_str)
    if match_slash:
        day, month, year = match_slash.groups()
        return f"{year}-{month}-{day}"
        
    try:
        dt = pd.to_datetime(date_str)
        return dt.strftime("%Y-%m-%d")
    except Exception:
        return datetime.utcnow().strftime("%Y-%m-%d")

def normalize_events(raw_items: list) -> list:
    """
    Normalizes a list of raw event items into the common internal structure.
    """
    if not raw_items:
        return []
        
    normalized = []
    for item in raw_items:
        title = str(item.get("raw_title", "")).strip()
        cat_raw = item.get("raw_category", "")
        category = map_category(cat_raw)
        
        date_raw = item.get("raw_date", "")
        date_clean = parse_date(date_raw)
        
        time_clean = str(item.get("raw_time", "Evening")).strip()
        venue_clean = str(item.get("venue_name", "City Venue")).strip()
        area_clean = str(item.get("locality", "")).strip()
        price_clean = str(item.get("ticket_price", "Free")).strip()
        desc_clean = str(item.get("blurb", "")).strip()
        
        site_name = str(item.get("source_site", "Web")).strip()
        source_url = str(item.get("source_url", "")).strip()
        scraped_at = item.get("scraped_at", datetime.utcnow().isoformat() + "Z")
        
        normalized.append({
            "title": title,
            "category": category,
            "date": date_clean,
            "time": time_clean,
            "venue": venue_clean,
            "area": area_clean,
            "price": price_clean,
            "description": desc_clean,
            "site_name": site_name,
            "source_url": source_url,
            "scraped_at": scraped_at
        })
        
    return normalized
