from typing import Iterable, List, Dict, Any

# Define weights for sources
SOURCE_WEIGHTS = {
    "github repos": 90,
    "github jobs": 85,
    "linkedin jobs": 80,
    "techcrunch": 65,
    "mit tech review": 75,
    "generic web scrape": 50
}

# Define weights for matching tags/keywords
TAG_WEIGHTS = {
    "ai": 10,
    "llm": 10,
    "mlops": 15,
    "quantum": 12,
    "python": 5,
    "framework": 5,
    "open-source": 8
}

def score_items(items: Iterable[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Computes a weighted intelligence score for each item.
    Score = Base Source Weight + Sum of Keyword/Tag weights.
    Capped at 100.
    """
    scored = []
    for item in items:
        data = dict(item)
        
        # Determine base weight from source
        source_key = str(data.get("source", "")).strip().lower()
        base_weight = SOURCE_WEIGHTS.get(source_key, 60)
        
        # Sum tag weights
        tag_bonus = 0
        tags = data.get("tags", [])
        if isinstance(tags, list):
            for t in tags:
                tag_key = str(t).strip().lower()
                tag_bonus += TAG_WEIGHTS.get(tag_key, 0)
                
        # Title keyword bonus
        title_lower = str(data.get("title", "")).lower()
        for kw, wt in TAG_WEIGHTS.items():
            if kw in title_lower:
                tag_bonus += wt
                
        final_score = min(base_weight + tag_bonus, 100)
        data["score"] = float(final_score)
        
        scored.append(data)
        
    return scored
