# System Architecture

> Technical architecture for Startup Traction Intelligence.

---

# 1. Purpose

Startup Traction Intelligence collects publicly observable signals about startups from multiple web sources, validates and normalizes those signals, tracks them over time, and converts them into explainable traction insights.

The system is designed around one core question:
> **Is a startup showing meaningful signs of momentum, and what evidence supports that conclusion?**

The architecture separates data acquisition from intelligence generation so that sources, scoring methods, and product features can evolve independently.

---

# 2. High-Level Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                     PUBLIC WEB SOURCES                       │
│                                                              │
│  Developer │ Hiring │ Product │ Community │ News │ Other     │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                     BRIGHT DATA CLOUD                        │
│                                                              │
│                Scrapers / Data Collection                    │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                  COLLECTOR CONTROL LAYER                     │
│                                                              │
│      Trigger Scrape → Poll Status → Retrieve Dataset         │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                       HEALTH VALIDATOR                       │
│                                                              │
│  Schema Check │ Required Fields │ Empty Data │ Anomalies     │
└───────────────────────┬───────────────────────┬──────────────┘
                        │                       │
                     HEALTHY                UNHEALTHY
                        │                       │
                        ▼                       ▼
┌───────────────────────────────┐       ┌───────────────────────┐
│     NORMALIZATION LAYER       │       │    FAILURE / REPAIR   │
│                               │       │                       │
│ Source-Specific → Canonical   │       │ Detect → Diagnose     │
│ Startup Signal Schema         │       │ → Repair → Revalidate │
└───────────────┬───────────────┘       └───────────┬───────────┘
                │                                   │
                └────────────────┬──────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────┐
│                     HISTORICAL STORAGE                       │
│                                                              │
│     Startup │ Signal │ Value │ Source │ Timestamp            │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                     INTELLIGENCE ENGINE                      │
│                                                              │
│  Change Detection │ Growth Calculation │ Signal Analysis     │
│  Traction Score │ Score Explanation                          │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                          API LAYER                           │
│                                                              │
│  Startups │ Signals │ Trends │ Scores │ Insights │ Health    │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                      FRONTEND DASHBOARD                      │
│                                                              │
│  Search │ Startup Profile │ Trends │ Rankings │ Explanations │
└──────────────────────────────────────────────────────────────┘
```

---

# 3. Core Architecture Principle

The system follows this pipeline:
`COLLECT` ➔ `VALIDATE` ➔ `NORMALIZE` ➔ `STORE` ➔ `COMPARE OVER TIME` ➔ `ANALYZE` ➔ `EXPLAIN` ➔ `PRESENT`

Each stage has a separate responsibility. A failure in one stage should not silently corrupt the next stage.

---

# 4. Component Responsibilities

### 4.1 Public Web Sources
The external sources from which startup signals originate:
- Developer activity (GitHub)
- Hiring activity (Job Boards)
- Product activity (Website / Product Hunt)
- News & announcements

### 4.2 Bright Data Cloud
Bright Data is responsible for external data collection. It is an external managed service and should not be treated as application code running inside the backend.
Collector metadata is centrally tracked in `configs/scraper_registry.json`.

### 4.3 Collector Control Layer
The boundary between the Python application and Bright Data:
- triggering approved collectors
- monitoring execution status & polling
- retrieving datasets & handling timeouts

### 4.4 Health Validator
Validates raw scraped data before entering the intelligence pipeline: checks response existence, expected structure, required fields, and valid field types.
Healthy data proceeds to Normalization; unhealthy data routes to the Failure/Repair flow.

### 4.5 Normalization Layer
Converts source-specific raw JSON into a common internal representation (Canonical Startup Signal Schema).

---

# 5. Historical Storage

Time is a core dimension. The system stores observations as timestamped snapshots:
```text
Startup ➔ Snapshot T1, Snapshot T2, Snapshot T3, Snapshot T4
```
This allows the intelligence engine to calculate absolute change, percentage change, growth rate, momentum, and trend direction.

---

# 6. Intelligence Engine

Converts normalized historical data into useful signals:
- **Signal Analysis**: Evaluates individual changes (e.g. GitHub activity changed +X%, open positions changed +Y%).
- **Traction Score**: Generates an analytical metric (0–100) based on weighted signals.
- **Explainability Layer**: Identifies primary contributing signals and weak signals (e.g. "Why traction increased").

---

# 7. Failure and Recovery Architecture

Supports a controlled failure path across 4 automation levels:
- **Level 1 — Detection**: System detects invalid output or missing expected fields.
- **Level 2 — Diagnosis**: System identifies what failed (missing field, selector mismatch).
- **Level 3 — Agent-Assisted Repair**: An AI agent or developer updates extraction logic based on failure events.
- **Level 4 — Automated Repair**: System attempts automatic selector repair and re-validates the result.

---

# 8. API Layer

Exposes processed intelligence to the frontend via stable endpoints: `/startups`, `/startups/{id}`, `/startups/{id}/signals`, `/startups/{id}/history`, `/startups/{id}/traction`, `/startups/{id}/insights`, `/health`.

---

# 9. Frontend Architecture

Consumes application API endpoints to render Discovery search, Startup Profiles, Time-Series trend charts, Signal breakdowns, and Explainable Traction views.

---

# 10. Data Boundaries

- **Raw Data**: Direct scraper output (source-specific).
- **Normalized Data**: Canonical internal representation (`Startup Signal Schema`).
- **Intelligence Data**: Derived insights (Traction Scores, trends, explanations).

---

# 11. Architecture Summary

The product transforms fragmented public web data through collection, validation, normalization, historical tracking, traction analysis, and explainability into user insights.