# DECISIONS.md

> Record of important project decisions for OpenEvents — City Leisure Events Aggregator.

---

# Decision Log

---

## D001 — Final Product Direction: City Leisure Events Aggregator
**Status:** ACCEPTED  
**Date:** 2026-08-22  

### Decision
The project will build **OpenEvents — City Leisure Events Aggregator** for the pilot city of Hyderabad.  
The system collects leisure events (music, theatre, workshops, meetups, sports, food, art) from multiple independent event-listing sites, normalizes them into a unified schema, de-duplicates records across sources, and serves a weekly digest.

---

## D002 — Target Sources Selection for MVP
**Status:** ACCEPTED  
**Date:** 2026-08-22  

### Decision
The MVP targets 3 core independent, publicly accessible event platforms:
1. **FullHyd Events** (`events.fullhyderabad.com`)
2. **HydHub** (`hydhub.in`)
3. **AroundU** (`aroundu.in/city/hyderabad`)

No login-gated pages, no government sites, and no global platforms present in Bright Data pre-built libraries will be targeted.

---

## D003 — Unified Event Schema & Taxonomy
**Status:** ACCEPTED  
**Date:** 2026-08-22  

### Decision
All scraped raw event payloads map to a single target schema:
`event_id`, `title`, `category`, `date`, `time`, `venue`, `area`, `price`, `description`, `sources`, `scraped_at`.

Unified Taxonomy: `Music`, `Theatre & Arts`, `Workshops & Classes`, `Sports & Outdoors`, `Food & Drink`, `Talks & Meetups`, `Nightlife`, `Family / Kids`, `Exhibitions`.

---

## D004 — Fuzzy De-duplication Across Sources
**Status:** ACCEPTED  
**Date:** 2026-08-22  

### Decision
Because the same event may be listed across multiple platforms (e.g., FullHyd and HydHub), the system implements fuzzy token matching on `title` + `date` + `venue`. Matches are merged into a single event record with a combined `sources` array (`[{site_name, source_url}]`).

---

## D005 — Bright Data Custom Scraper Studio
**Status:** ACCEPTED  
**Date:** 2026-08-22  

### Decision
Custom scrapers built per source site in Bright Data Scraper Studio are used for data collection, complying with hackathon rules. Collector IDs are pinned in `configs/scraper_registry.json`.

---

## D006 — Health Validation Before Normalization & De-duplication
**Status:** ACCEPTED  
**Date:** 2026-08-22  

### Decision
Scraped records pass through validation (`validator.py`) to verify required fields (`title`, `date`, `venue`). If selector structures change, the AI Self-Healing Agent corrects the fields before passing data to the normalizer and deduplicator.

---

## D007 — Time-Series & Weekly Digest Storage
**Status:** ACCEPTED  
**Date:** 2026-08-22  

### Decision
SQLite persists raw jobs, normalized events, merged deduplicated events, and weekly run metrics.
