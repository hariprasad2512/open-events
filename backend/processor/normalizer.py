import pandas as pd
from datetime import datetime

def normalize_dataset(items: list) -> list:
    """
    Normalizes a list of items using Pandas.
    Cleans strings, formats dates to ISO-8601, maps null values, and returns list of clean items.
    """
    if not items:
        return []
        
    df = pd.DataFrame(items)
    
    # Clean whitespace from title and source
    if "title" in df.columns:
        df["title"] = df["title"].astype(str).str.strip()
    if "source" in df.columns:
        df["source"] = df["source"].astype(str).str.strip()
    if "url" in df.columns:
        df["url"] = df["url"].astype(str).str.strip().str.lower()
        
    # Standardize tags: ensure they are lowercase lists
    if "tags" in df.columns:
        def clean_tags(tags):
            if not isinstance(tags, list):
                return ["general"]
            return [str(t).strip().lower() for t in tags if t]
        df["tags"] = df["tags"].apply(clean_tags)
        
    # Standardize metadata scrapedAt using pandas datetime
    normalized_items = []
    for _, row in df.iterrows():
        item = row.to_dict()
        
        # Ensure metadata dict structure exists
        if not isinstance(item.get("metadata"), dict):
            item["metadata"] = {}
            
        metadata = item["metadata"]
        scraped_at_val = metadata.get("scrapedAt")
        
        try:
            # Parse & format date
            dt = pd.to_datetime(scraped_at_val or datetime.utcnow())
            metadata["scrapedAt"] = dt.strftime("%Y-%m-%dT%H:%M:%SZ")
        except Exception:
            metadata["scrapedAt"] = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
            
        # Clean region
        region = metadata.get("region")
        if not region or pd.isna(region):
            metadata["region"] = "global"
        else:
            metadata["region"] = str(region).strip().lower()
            
        item["metadata"] = metadata
        normalized_items.append(item)
        
    return normalized_items
