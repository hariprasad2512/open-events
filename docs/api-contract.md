# API Contract

> Public Application API Contract for Scrapeverse — City Leisure Events Aggregator.

Base URL: `http://localhost:8000`

---

# Endpoints

### 1. `GET /health`
Returns application status.
```json
{ "status": "healthy" }
```

---

### 2. `GET /events`
Returns list of normalized and de-duplicated city leisure events.  
Query Params: `category` (optional), `area` (optional), `date` (optional), `limit` (optional).

Response:
```json
{
  "total": 1,
  "events": [
    {
      "event_id": "evt_a8f9021b",
      "title": "Sunburn Hyderabad DJ Night",
      "category": "Music",
      "date": "2026-08-28",
      "time": "20:00",
      "venue": "Gachibowli Stadium",
      "area": "Gachibowli",
      "price": "₹999 onwards",
      "description": "Live DJ concert featuring international artists.",
      "sources": [
        { "site_name": "FullHyd", "source_url": "https://events.fullhyderabad.com/sunburn" },
        { "site_name": "HydHub", "source_url": "https://hydhub.in/events/sunburn" }
      ],
      "scraped_at": "2026-08-22T12:00:00Z"
    }
  ]
}
```

---

### 3. `GET /events/{event_id}`
Returns details for a single event record by ID.

---

### 4. `GET /events/digest`
Returns the weekly city digest summary:
```json
{
  "city": "Hyderabad",
  "period": "This Week",
  "total_events": 45,
  "unique_venues": 18,
  "category_breakdown": {
    "Music": 12,
    "Workshops & Classes": 15,
    "Talks & Meetups": 8,
    "Theatre & Arts": 10
  },
  "dedup_summary": {
    "raw_scraped_count": 68,
    "merged_unique_count": 45,
    "duplicates_removed": 23
  }
}
```

---

### 5. `GET /events/categories`
Returns the list of supported categories in the Unified Category Taxonomy.

---

### 6. `POST /dca/trigger`
Triggers an event scraping run in a background task.  
Query Params: `target` (e.g., `FullHyd`, `HydHub`, `AroundU`), `inject_errors` (bool).