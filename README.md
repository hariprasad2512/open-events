# OpenEvents — City Leisure Events Aggregator

> A resilient, self-healing data pipeline that aggregates leisure events across a city, normalizes them into a unified schema, de-duplicates listings across sources, and serves a weekly digest.

---

## Overview

**OpenEvents** aggregates leisure events (music, theatre, workshops, meetups, sports, food, art) happening in a pilot city (**Hyderabad**) from multiple independent, publicly accessible event platforms:
- **FullHyd Events** (`events.fullhyderabad.com`) — Dance, music, theatre, arts, sports, workshops, tech, food.
- **HydHub** (`hydhub.in`) — General events, meetups, concerts.
- **AroundU** (`aroundu.in/city/hyderabad`) — Neighborhood community meetups (Jubilee Hills, Gachibowli, Hitech City).

Custom scrapers are built in **Bright Data Scraper Studio**, validated, normalized into a unified schema, de-duplicated across sources using fuzzy matching, and served as a weekly digest.

---

## Pipeline Architecture

```text
Public Web Sources (FullHyd, HydHub, AroundU)
        ↓
Bright Data Cloud / Scraper Studio
        ↓
Collector Control Layer
        ↓
Health Validator (with Self-Healing fallback)
        ↓
Normalization Layer (Taxonomy & Date Parsing)
        ↓
De-duplication Engine (Fuzzy Matching)
        ↓
Time-Series & Digest DB (SQLite)
        ↓
Application API
        ↓
Weekly Digest Dashboard
```

---

## Unified Data Schema

| Field | Type | Description |
|---|---|---|
| `event_id` | string | Generated hash/UUID for merged event record |
| `title` | string | Event name |
| `category` | enum | Mapped to Unified Taxonomy (`Music`, `Theatre & Arts`, `Workshops & Classes`, `Sports & Outdoors`, `Food & Drink`, `Talks & Meetups`, `Nightlife`, `Family / Kids`, `Exhibitions`) |
| `date` | string | Event start date (`YYYY-MM-DD`) |
| `time` | string | Start time or slot label (e.g., `19:00` or `Evening`) |
| `venue` | string | Venue / location name |
| `area` | string | Locality / neighborhood (e.g. `Jubilee Hills`) |
| `price` | string | Free or listed price/range |
| `description` | string | Event summary |
| `sources` | list | List of `{site_name, source_url}` matching records |
| `scraped_at` | string | Datetime of scraper run |

---

## Quick Start (Backend)

1. **Install Dependencies**:
   ```bash
   pip install -r backend/requirements.txt
   ```

2. **Run Automated Test Suite**:
   ```bash
   $env:PYTHONPATH="backend"; python -m unittest backend/tests/test_pipeline.py
   ```

3. **Start API Server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 --app-dir backend
   ```
