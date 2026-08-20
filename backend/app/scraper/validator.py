import logging

logger = logging.getLogger(__name__)

def validate_item_schema(item: dict) -> list:
    """
    Validates a single item's structure against mock_schema.json rules.
    Returns a list of error strings found. Empty list means the item is healthy.
    """
    errors = []
    
    # Required fields check
    for field in ["id", "title", "source", "url"]:
        if field not in item or item[field] is None or item[field] == "":
            errors.append(f"Missing required field: {field}")
            
    # Tags check: must be a list
    if "tags" not in item or item["tags"] is None:
        errors.append("Missing or null 'tags' field")
    elif not isinstance(item["tags"], list):
        errors.append("'tags' field must be a list of strings")
        
    # Metadata check
    if "metadata" not in item or not isinstance(item["metadata"], dict):
        errors.append("Missing or invalid 'metadata' field")
    else:
        meta = item["metadata"]
        if "scrapedAt" not in meta or not meta["scrapedAt"]:
            errors.append("Missing metadata field: scrapedAt")
            
    # Check for obvious broken selector signs
    if "source" in item and item["source"] and "Broken_Selector" in str(item["source"]):
        errors.append("Broken selector detected in 'source' field")
        
    return errors


def run_self_healing(item: dict, errors: list) -> tuple:
    """
    Simulates the AI Self-Healing Agent correcting broken selectors and repairing the schema.
    Returns a tuple (healed_item, healed_logs)
    """
    healed_item = dict(item)
    healed_logs = []
    
    for err in errors:
        if "Missing required field: source" in err or healed_item.get("source") is None:
            # Self-healing repairs source based on URL pattern
            url = healed_item.get("url", "")
            if "github.com" in url:
                healed_item["source"] = "GitHub Repos"
            elif "linkedin.com" in url:
                healed_item["source"] = "LinkedIn Jobs"
            else:
                healed_item["source"] = "Generic Web Scrape"
            healed_logs.append(f"Healed 'source' using URL pattern mapping: {healed_item['source']}")
            
        elif "Missing or null 'tags' field" in err:
            healed_item["tags"] = ["General"]
            healed_logs.append("Healed 'tags' field: default to ['General']")
            
        elif "Broken selector detected in 'source'" in err:
            # Clean up the broken selector string
            raw_source = healed_item["source"]
            cleaned = raw_source.replace("_Broken_Selector", "").replace("_", " ")
            healed_item["source"] = cleaned
            healed_logs.append(f"Healed 'source' selector glitch: '{raw_source}' -> '{cleaned}'")
            
        elif "Missing or invalid 'metadata'" in err:
            from datetime import datetime
            healed_item["metadata"] = {
                "scrapedAt": datetime.utcnow().isoformat() + "Z",
                "region": "Global"
            }
            healed_logs.append("Healed missing 'metadata' field: generated defaults")
            
    return healed_item, healed_logs
