import pandas as pd
from datetime import datetime
import re
import json

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

HYDERABAD_AREAS = [
    "Madhapur", "Jubilee Hills", "Banjara Hills", "Gachibowli", "Hitech City",
    "Lakdikapul", "Film Nagar", "Kondapur", "Begumpet", "Secunderabad",
    "Panjagutta", "Khairatabad", "Raidurg", "Ramanthapur", "Kukatpally", "Miyapur"
]

def map_category(raw_cat: str) -> str:
    """Maps raw source category strings into the Unified Category Taxonomy."""
    if not raw_cat:
        return "Talks & Meetups"
        
    cat_lower = str(raw_cat).lower()
    
    if any(k in cat_lower for k in ["kid", "family"]):
        return "Family / Kids"
    elif any(k in cat_lower for k in ["music", "concert", "dj", "band", "acoustic"]):
        return "Music"
    elif any(k in cat_lower for k in ["theatre", "art", "play", "stage", "comedy", "cultural", "literary", "film", "movie"]):
        return "Theatre & Arts"
    elif any(k in cat_lower for k in ["workshop", "class", "tech", "learning", "craft"]):
        return "Workshops & Classes"
    elif any(k in cat_lower for k in ["sport", "outdoor", "run", "fitness", "hike"]):
        return "Sports & Outdoors"
    elif any(k in cat_lower for k in ["food", "drink", "dining", "tasting", "gourmet"]):
        return "Food & Drink"
    elif any(k in cat_lower for k in ["nightlife", "club", "single", "party"]):
        return "Nightlife"
    elif any(k in cat_lower for k in ["exhibition", "expo", "gallery", "showcase"]):
        return "Exhibitions"
    elif any(k in cat_lower for k in ["talk", "meetup", "social", "conference", "speech", "political"]):
        return "Talks & Meetups"
        
    return "Talks & Meetups"

def parse_date(date_str: str) -> str:
    """
    Parses various date text formats:
    - "23-Aug-26" -> "2026-08-23"
    - "27-Jun-26 22-Aug-26" -> "2026-06-27"
    - "28/08/2026" -> "2026-08-28"
    """
    if not date_str:
        return datetime.utcnow().strftime("%Y-%m-%d")
        
    date_str = str(date_str).strip()
    
    # Extract first date token if range (e.g., "27-Jun-26 22-Aug-26")
    tokens = date_str.split()
    first_token = tokens[0] if tokens else date_str
    
    # Try DD-MMM-YY (e.g. 23-Aug-26)
    match_dmy = re.match(r"^(\d{1,2})-([A-Za-z]{3})-(\d{2,4})$", first_token)
    if match_dmy:
        day, month_str, year = match_dmy.groups()
        if len(year) == 2:
            year = "20" + year
        try:
            dt = datetime.strptime(f"{day}-{month_str}-{year}", "%d-%b-%Y")
            return dt.strftime("%Y-%m-%d")
        except Exception:
            pass

    # Try DD/MM/YYYY
    match_slash = re.match(r"^(\d{2})/(\d{2})/(\d{4})$", first_token)
    if match_slash:
        day, month, year = match_slash.groups()
        return f"{year}-{month}-{day}"
        
    try:
        dt = pd.to_datetime(first_token)
        return dt.strftime("%Y-%m-%d")
    except Exception:
        return datetime.utcnow().strftime("%Y-%m-%d")

def parse_time(time_str: str) -> str:
    """Parses raw time strings (e.g., '7:00pm', '27-Jun-26 to 22-Aug-26 7:00pm')."""
    if not time_str:
        return "Evening"
        
    time_str = str(time_str).strip()
    
    # Match pattern like 7:00pm or 10:30am
    match_time = re.search(r"(\d{1,2}:\d{2}\s*(?:am|pm)?)", time_str, re.IGNORECASE)
    if match_time:
        return match_time.group(1).lower().replace(" ", "")
        
    match_hour = re.search(r"(\d{1,2}\s*(?:am|pm))", time_str, re.IGNORECASE)
    if match_hour:
        return match_hour.group(1).lower().replace(" ", "")
        
    return "Evening"

def parse_price(price_raw) -> str:
    """
    Parses raw ticket prices:
    - Dict: {"value": 500, "currency": "INR", "symbol": "₹"} -> "₹500"
    - String / None / 0 -> "Free Entry"
    """
    if not price_raw:
        return "Free Entry"
        
    if isinstance(price_raw, dict):
        val = price_raw.get("value")
        sym = price_raw.get("symbol", "₹")
        if val is None or val == 0:
            return "Free Entry"
        return f"{sym}{val}"
        
    price_str = str(price_raw).strip()
    if price_str.lower() in ["0", "free", "none", ""]:
        return "Free Entry"
    return price_str

def extract_area(locality_str: str) -> str:
    """Extracts recognizable Hyderabad neighborhood/locality from full address string."""
    if not locality_str:
        return "Hyderabad"
        
    locality = str(locality_str)
    for area in HYDERABAD_AREAS:
        if re.search(r"\b" + re.escape(area) + r"\b", locality, re.IGNORECASE):
            return area
            
    # Fallback to last comma segment
    parts = [p.strip() for p in locality.split(",") if p.strip()]
    if parts:
        if parts[-1].lower() == "hyderabad" and len(parts) > 1:
            return parts[-2]
        return parts[-1]
        
    return "Hyderabad"

def normalize_events(raw_items: list) -> list:
    """
    Normalizes a list of raw event items into the canonical internal structure.
    """
    if not raw_items:
        return []
        
    normalized = []
    for item in raw_items:
        title = str(item.get("raw_title", "")).strip()
        if not title:
            continue
            
        cat_raw = item.get("raw_category", "")
        category = map_category(cat_raw)
        
        date_raw = item.get("raw_date", "")
        date_clean = parse_date(date_raw)
        
        time_raw = item.get("raw_time", "")
        time_clean = parse_time(time_raw)
        
        venue_clean = str(item.get("venue_name", "City Venue")).strip()
        
        locality_raw = item.get("locality", "")
        area_clean = extract_area(locality_raw)
        
        price_raw = item.get("ticket_price")
        price_clean = parse_price(price_raw)
        
        desc_clean = str(item.get("blurb", "")).strip()
        site_name = str(item.get("source_site", "FullHyd")).strip()
        source_url = str(item.get("source_url") or item.get("product_page_url", "")).strip()
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
