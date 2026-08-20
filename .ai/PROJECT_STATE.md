# PROJECT_STATE.md

> Current state of the project.
> This file describes **what is true right now**.
> It is not the place for long-term instructions, implementation details, or brainstorming.

---

# 1. Current Phase

**Phase:** Pre-development / Repository & Team Setup  
**Status:** Foundation setup in progress  
**Last Updated:** 2026-08-20  

---

# 2. Project Status

The project is currently in the preparation stage.  
The technical architecture has a generic baseline, but the final product idea (**Startup Traction Intelligence**), target sources, and product-specific intelligence layer are documented and being integrated into foundational contracts.

The current priority is to establish:
- repository structure
- team collaboration workflow
- AI-agent operating rules
- documentation
- data contracts
- API contracts
- Bright Data integration conventions
- development/testing conventions

---

# 3. Current Architecture

The current baseline architecture contains these conceptual layers:

```text
External Web Targets
        ↓
Bright Data Cloud / Scraper
        ↓
Application Backend
        ↓
Validation
        ↓
Normalization
        ↓
Intelligence / Processing
        ↓
Historical Storage
        ↓
Application API
        ↓
Frontend Dashboard
```

---

# 4. Current Architecture Boundaries

### Frontend
Responsible for user-facing interface, visualizations, tables, dashboard interactions, consuming backend APIs.  
Primary location: `frontend/`

### Application Backend
Responsible for API endpoints, orchestration, scraper integration, validation, normalization, processing/intelligence logic, persistence.  
Primary location: `backend/`

### Bright Data
Responsible for managed scraping infrastructure and external web collection.  
Bright Data is an external managed service and is not part of the Python application runtime.  
Primary repository configuration: `configs/scraper_registry.json`

### AI / Developer Agent Layer
Agents such as Cursor, Codex, Antigravity CLI are development tools operating against the shared repository.  
Their shared context comes from `.ai/AI_INSTRUCTIONS.md`, `.ai/PROJECT_STATE.md`, `.ai/DECISIONS.md`, `.ai/TASKS.md`, and `docs/`.

---

# 5. What Is Finalized

The following are currently established:
- a modular frontend/backend architecture
- separation between our backend and Bright Data infrastructure
- validation before downstream processing
- normalization before intelligence/processing
- historical/time-series storage as a conceptual capability
- API layer between backend and frontend
- repository-first collaboration between humans and AI agents
- schema/data-contract-driven development
- controlled Bright Data resource usage
- Git-based collaboration with reviewed changes

---

# 6. What Is NOT Finalized

The following remain open for implementation details:
- final Bright Data production collectors (pending account key wiring)
- exact weighting formula fine-tuning for Traction Score
- final frontend UI widget components

---

# 7. Current Repository Objective

Build the shared development foundation before implementing full product features.

---

# 8. Current Priorities

### P0 — Foundation
- [x] Repository structure
- [x] `.ai/AI_INSTRUCTIONS.md`
- [x] `.ai/PROJECT_STATE.md`
- [x] `.ai/DECISIONS.md`
- [x] `.ai/TASKS.md`
- [x] `.gitignore`
- [x] `.env.example`
- [x] Agent-specific rules (`.ai/rules/`)
- [x] GitHub collaboration setup

### P0 — Architecture & Contracts
- [x] `docs/architecture.md`
- [x] `docs/data-contract.md`
- [x] `docs/api-contract.md`
- [x] `docs/hackathon.md`
- [x] `docs/brightdata.md`
- [x] Initial schemas (`schemas/`)
- [x] Sample/fixture strategy (`data/`)

### P1 — Tooling Verification
- [x] Verify team Git setup
- [x] Verify agent rules
- [x] Perform controlled scraper experiment

---

# 9. Current Agent Rules

All AI agents must:
1. Read `.ai/AI_INSTRUCTIONS.md`.
2. Read this file.
3. Read relevant decisions and documentation.
4. Work only within the assigned task.
5. Avoid making product assumptions.
6. Preserve existing contracts.
7. Validate changes before declaring completion.
8. Avoid unnecessary Bright Data usage.
9. Never commit secrets.
10. Update documentation when a change affects project truth.

---

# 10. Current Bright Data State

- **Integration status**: Operational in simulation/mock and ready for live key API injection.
- **Collector status**: Registered in `configs/scraper_registry.json`.
- **Credentials**: Managed safely through `.env`.

---

# 11. Current Data Strategy

The project uses three data categories under `data/`:
- `samples/`: Representative successful real-world payloads.
- `fixtures/`: Controlled inputs for tests, including healthy and broken cases.
- `snapshots/`: Historical application data generated during actual operation.

---

# 12. Current Development Strategy

Frontend and backend development proceed independently through defined data contracts (`schemas/`, `docs/data-contract.md`, `docs/api-contract.md`).

---

# 13. Known Risks

- **Scope creep**: Expanding beyond hackathon MVP requirements.
- **Agent drift**: Incompatible assumptions between different agents.
- **Bright Data resource waste**: Unnecessary live calls during local testing.
- **Contract drift**: Incompatible frontend/backend payload changes.

---

# 14. Current State Summary

```text
PROJECT
-------
Final idea:           STARTUP TRACTION INTELLIGENCE
Architecture:         ESTABLISHED & IMPLEMENTED
Repository:           FOUNDATION READY (.ai/ MANAGED)
Backend Pipeline:     OPERATIONAL (v0.1)
Bright Data Integration: SIMULATED / READY FOR API KEY
Schemas & Contracts:  DEFINED
```
