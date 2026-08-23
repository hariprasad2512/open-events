# TASKS.md

> Single active work board for OpenEvents — City Leisure Events Aggregator.

---

# Phase 0 — Pre-Hackathon Prep & Setup
- [x] Finalize 3 target sites (FullHyd, HydHub, AroundU) for MVP
- [x] Define unified event data schema & category taxonomy
- [x] Establish repository governance (.ai/) & agent rules
- [x] Define data contract (`docs/data-contract.md`)
- [x] Define API contract (`docs/api-contract.md`)

---

# Phase 1 — Custom Scrapers & Collector Service
- [x] Register collectors in `configs/scraper_registry.json` (`fullhyd_events`, `hydhub_events`, `aroundu_events`)
- [x] Implement collector simulator in `backend/app/scraper/collector.py`
- [x] Implement Health Validator & AI Self-Healing simulator in `backend/app/scraper/validator.py`
- [x] Test error-injection scenarios for missing fields/broken selectors

---

# Phase 2 — Normalize & Map
- [x] Implement event normalizer in `backend/app/processor/normalizer.py`
- [x] Parse inconsistent date/time text formats into ISO `YYYY-MM-DD` and `HH:MM`
- [x] Map raw source category labels to Unified Category Taxonomy (`Music`, `Workshops & Classes`, etc.)

---

# Phase 3 — De-duplicate Engine
- [x] Implement fuzzy de-duplication in `backend/app/processor/deduplicator.py`
- [x] Token similarity matching on `title` + `date` + `venue`
- [x] Merge matching event records with combined `sources` list (`[{site_name, source_url}]`)
- [x] Log deduplication stats for demo presentation

---

# Phase 4 — Database, API & Test Suite
- [x] Update SQLite persistence in `backend/app/database.py` for merged event records
- [x] Update orchestrator pipeline in `backend/app/orchestrator.py`
- [x] Expose API routes in `backend/app/main.py` (`GET /events`, `GET /events/digest`, `POST /dca/trigger`)
- [x] Update automated test suite in `backend/tests/test_pipeline.py` (100% pass rate)

---

# Phase 5 — UI & Submission Packaging
- [ ] Connect frontend Weekly Digest dashboard view
- [ ] Record end-to-end demo video showing self-healing and deduplication
- [ ] Finalize submission documentation (`docs/hackathon.md`, `docs/demo.md`)
