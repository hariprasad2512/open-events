# Data Contract

> Defines raw scraper outputs, validation contracts, normalized event schemas, and merged de-duplicated records for OpenEvents.

---

# 1. Data Pipeline Stages

```text
RAW SCRAPER OUTPUT ➔ VALIDATED RAW DATA ➔ NORMALIZED EVENT ➔ FUZZY MERGED EVENT ➔ TIME-SERIES DB
```

---

# 2. Unified Data Schema (Normalization Target)

Every site's raw scraped output is mapped into this common structure before merging:

| Field | Type | Description |
|---|---|---|
| `event_id` | string | Generated hash/UUID for the merged (de-duplicated) event record |
| `title` | string | Event name as listed on source site |
| `category` | enum | Mapped to Unified Taxonomy |
| `date` | string | Event start date (`YYYY-MM-DD`) |
| `time` | string | Start time (`HH:MM`) or slot label (e.g. `Evening`) |
| `venue` | string | Venue / location name |
| `area` | string | Neighborhood / locality (e.g., `Jubilee Hills`) |
| `price` | string | `Free` or listed price range |
| `description` | string | Short blurb summary |
| `sources` | list of objects | `[{site_name, source_url}]` — one per site found on post de-dup |
| `scraped_at` | string | Datetime timestamp (`ISO-8601`) |

---

# 3. Unified Category Taxonomy

- `Music`
- `Theatre & Arts`
- `Workshops & Classes`
- `Sports & Outdoors`
- `Food & Drink`
- `Talks & Meetups`
- `Nightlife`
- `Family / Kids`
- `Exhibitions`

---

# 4. De-duplication Contract

Events matched across sources on fuzzy token similarity (`title` + `date` + `venue`) are merged into a single event record with combined `sources` arrays:

```json
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
    { "site_name": "FullHyd", "source_url": "https://events.fullhyderabad.com/sunburn-dj-night" },
    { "site_name": "HydHub", "source_url": "https://hydhub.in/events/sunburn-dj" }
  ],
  "scraped_at": "2026-08-22T12:00:00Z"
}
```