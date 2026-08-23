# PROJECT_STATE.md

> Current state of the project.
> This file describes **what is true right now**.
> It is not the place for long-term instructions, implementation details, or brainstorming.

---

# 1. Current Phase

**Phase:** Pre-Hackathon Prep / Core Development  
**Status:** City Leisure Events Aggregator Baseline Established  
**Last Updated:** 2026-08-22  

---

# 2. Project Status

The project is currently building **OpenEvents — City Leisure Events Aggregator** for the pilot city of Hyderabad.

The system continuously collects leisure events (music, theatre, workshops, meetups, sports, food, art) from multiple independent, publicly accessible event-listing websites (FullHyd Events, HydHub, AroundU), normalizes them into a unified schema, de-duplicates records across sources using fuzzy matching, and serves them via an API and weekly digest UI.

The current priority is to establish:
- custom Bright Data Scraper Studio configurations for FullHyd, HydHub, and AroundU
- unified event schema & taxonomy
- fuzzy de-duplication engine
- weekly digest API & frontend view

---

# 3. Current Architecture

The baseline architecture contains these conceptual layers:

```text
Public Web Targets (FullHyd, HydHub, AroundU)
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
Historical & Digest Storage (SQLite)
        ↓
Application API
        ↓
Weekly Digest Dashboard
```

---

# 4. Target Websites (Hyderabad Pilot)

1. **FullHyd Events** (`events.fullhyderabad.com`) — Priority: Core (Build first)
2. **HydHub** (`hydhub.in`) — Priority: Core
3. **AroundU** (`aroundu.in/city/hyderabad`) — Priority: Core
4. *(Stretch)* **HighApe** (`highape.com/hyderabad`)
5. *(Stretch)* **Hyderabad Feed** (`hyderabadfeed.com/events`)

---

# 5. Unified Category Taxonomy

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

# 6. What Is Finalized

- Product Idea: OpenEvents — City Leisure Events Aggregator
- Target Pilot City: Hyderabad
- Core 3 MVP Sources: FullHyd, HydHub, AroundU
- Unified Event Data Schema & Category Taxonomy
- De-duplication Strategy: Fuzzy-matching on title + date + venue
- Backend Architecture: FastAPI + Pandas + SQLite + Unittest

---

# 7. Current Priorities

### Phase 0 — Prep & Setup
- [x] Select MVP target sites (FullHyd, HydHub, AroundU)
- [x] Unified schema & category taxonomy
- [x] Repository governance & agent rules (.ai/)

### Phase 1 — Custom Scrapers & Pipeline
- [x] Collector simulator & Bright Data registry (`configs/scraper_registry.json`)
- [x] Health validator & self-healing simulator (`validator.py`)
- [x] Normalization & Taxonomy Mapping (`normalizer.py`)
- [x] Fuzzy De-duplication Engine (`deduplicator.py`)
- [x] Database Storage & API routes (`database.py`, `main.py`)
- [x] Automated test suite (`test_pipeline.py`)

### Phase 2 — UI & Packaging
- [ ] Weekly Digest Frontend View
- [ ] Submission video & documentation packaging
