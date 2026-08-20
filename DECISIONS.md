# Architectural Decisions Log (ADR)

This file tracks the major design and technical decisions of Scrape Verse.

---

## ADR 1: Use of SQLite as Local Persistence Engine
- **Status**: Approved
- **Context**: For local dev, hackathons, and v0.1 testing, we need a lightweight persistence engine without running complex Postgres/MySQL services.
- **Decision**: Used SQLite (`pipeline.db`) to persist jobs, items, and metrics snapshots. SQLite is zero-configuration and runs out-of-the-box.
- **Consequences**: Easy to run locally and test; if we scale, we can swap database drivers using an ORM like SQLAlchemy or SQLModel later.

---

## ADR 2: Pandas for Data Normalization
- **Status**: Approved
- **Context**: Scraped data often contains messy timestamps, white spaces, and varying location strings. 
- **Decision**: Integrated a Pandas-based `normalizer.py` file to convert raw lists into DataFrames, apply transformations, and convert back to dictionaries.
- **Consequences**: High performance for bulk records, but adds a dependency on Pandas (included in `requirements.txt`).

---

## ADR 3: Heuristics-based AI Self-Healing Simulation
- **Status**: Approved
- **Context**: LLM calls for self-healing (repairing selectors) are slow and costly to run for every single scraper failure.
- **Decision**: Implemented a mock simulation using custom heuristics (e.g. mapping domains to source strings) to prove the self-healing loop in v0.1 without calling external APIs.
- **Consequences**: Instantly testable, zero latency, and provides a clear extension point to plug in an actual OpenAI or Gemini API call later.
