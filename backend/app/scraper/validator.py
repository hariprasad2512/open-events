import logging

logger = logging.getLogger(__name__)

def validate_event_schema(item: dict) -> list:
    """
    Validates raw event listing records.
    Returns list of validation error strings found.
    """
    errors = []
    
    # Required raw fields check
    for field in ["raw_title", "raw_date", "venue_name"]:
        if field not in item or item[field] is None or str(item[field]).strip() == "":
            errors.append(f"Missing required field: {field}")
            
    if "source_url" not in item or not item["source_url"]:
        errors.append("Missing required field: source_url")
        
    return errors

def run_self_healing(item: dict, errors: list) -> tuple:
    """
    Simulates AI Self-Healing Agent repairing missing fields or broken selector outputs.
    Returns (healed_item, healed_logs)
    """
    healed_item = dict(item)
    healed_logs = []
    
    for err in errors:
        if "Missing required field: venue_name" in err:
            # Self-healing infers venue from title or URL pattern
            url = healed_item.get("source_url", "")
            if "ravindra" in url:
                healed_item["venue_name"] = "Ravindra Bharathi Auditorium"
            elif "thub" in url:
                healed_item["venue_name"] = "T-Hub Phase 2"
            else:
                healed_item["venue_name"] = "City Venue"
            healed_logs.append(f"Healed missing 'venue_name' selector: inferred '{healed_item['venue_name']}'")
            
        elif "Missing required field: raw_date" in err:
            from datetime import datetime
            healed_item["raw_date"] = datetime.utcnow().strftime("%Y-%m-%d")
            healed_logs.append(f"Healed missing 'raw_date': defaulted to '{healed_item['raw_date']}'")
            
    return healed_item, healed_logs
