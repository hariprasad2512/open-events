from typing import Iterable, List, Dict, Any


def score_items(items: Iterable[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Assign a default score field if one is missing."""
    scored = []
    for item in items:
        data = dict(item)
        data.setdefault("score", 0)
        scored.append(data)
    return scored
