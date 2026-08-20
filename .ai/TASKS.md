# TASKS.md

> Single active work board for Scrape Verse.

---

# P0 — Data Contracts
- [x] Define raw scraper output boundary
- [x] Define normalized startup schema
- [x] Create initial schema files (`schemas/`)
- [x] Create representative sample data (`data/samples/`)
- [x] Create healthy fixture (`data/fixtures/valid_result.json`)
- [x] Create missing-field fixture (`data/fixtures/missing_required_field.json`)
- [x] Create malformed-response fixture (`data/fixtures/malformed_result.json`)
- [x] Create empty-results fixture (`data/fixtures/empty_result.json`)
- [x] Write `docs/data-contract.md`

---

# P0 — API Contracts
- [x] Define initial API resources
- [x] Define startup profile response
- [x] Define startup signals response
- [x] Define historical snapshots response
- [x] Define traction score response
- [x] Define health/status response
- [x] Write `docs/api-contract.md`

---

# P0 — Hackathon Preparation
- [x] Create `docs/hackathon.md`
- [x] Record hackathon requirements
- [x] Define required Bright Data usage
- [x] Define self-healing demonstration
- [x] Define repository reproducibility requirements
- [x] Define final submission checklist
- [x] Define demo requirements

---

# P0 — Bright Data Preparation
- [x] Create `docs/brightdata.md`
- [x] Set up Bright Data configuration module (`config.py`)
- [x] Define scraper target simulator
- [x] Record Collector ID (`c_9f81a7b4`)
- [x] Add collector to `configs/scraper_registry.json`
- [x] Save representative output

---

# P1 — Product Definition
## Startup Sources
Potential signal categories:
- [x] Developer activity source (GitHub)
- [x] Hiring activity source (Job Boards)
- [x] Product activity source (Startup website / Product Hunt)
- [x] News/announcement source

## Source Selection
- [x] Select MVP source 1: GitHub (Stars, Contributors, Commits)
- [x] Select MVP source 2: Job Boards (Openings, Engineering roles)
- [x] Select MVP source 3: News / Competitor updates

---

# P1 — Backend
## Foundation
- [x] Initialize backend application (`backend/app/main.py`)
- [x] Configure project dependencies (`backend/requirements.txt`)
- [x] Configure environment loading (`backend/app/config.py`)
- [x] Add application configuration
- [x] Add health endpoint (`GET /health`)
- [x] Add collector trigger endpoint (`POST /dca/trigger`)
- [x] Add dataset retrieval endpoint (`GET /dca/dataset/{job_id}`)
- [x] Add historical metrics endpoint (`GET /api/metrics`)
- [x] Implement Health Validator & AI Self-Healing agent (`backend/app/scraper/validator.py`)
- [x] Implement Pandas Normalizer (`backend/app/processor/normalizer.py`)
- [x] Implement Intelligence Scoring engine (`backend/app/processor/scoring.py`)
- [x] Implement SQLite Time-Series DB persistence (`backend/app/database.py`)
- [x] Add automated test suite (`backend/tests/test_pipeline.py`)

---

# P2 — Frontend Dashboard
- [ ] Connect React/Next.js dashboard to backend APIs
- [ ] Implement Startup Discovery list view
- [ ] Implement Startup Profile view
- [ ] Render Time-Series trend charts (Recharts)
- [ ] Render Signal breakdown & Explainable Traction details
- [ ] Add trigger controls & error-injection toggle for live self-healing demo

---

# Task Rules

### Before Starting a Task
1. Check this file (`.ai/TASKS.md`).
2. Check `.ai/PROJECT_STATE.md`.
3. Check `.ai/DECISIONS.md`.
4. Check relevant documentation under `docs/`.

### When Starting a Task
Mark status as: `[~] Task in progress`

### When Complete
Mark status as: `[x] Task completed`  
Ensure code is committed, tests pass, and docs are updated.
