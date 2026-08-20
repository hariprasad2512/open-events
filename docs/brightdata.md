# Bright Data Integration

> Operational guide for data collection using Bright Data Scraper Studio.

---

# 1. Integration Boundary

The architecture separates Bright Data from application intelligence:

```text
Startup / Source Input
        ↓
Application
        ↓
Collector Control Layer
        ↓
Bright Data
        ↓
Dataset Output
        ↓
Health Validation
        ↓
Normalization
        ↓
Storage + Intelligence
```

Bright Data is responsible for managed scraping infrastructure. The Python application is responsible for validating, normalizing, storing, and analyzing that data.

---

# 2. Core Workflow

1. Select approved collector (from `configs/scraper_registry.json`)
2. Validate input
3. Trigger collection (`POST /dca/trigger`)
4. Track execution & poll status
5. Retrieve dataset
6. Validate output
7. Normalize data
8. Store timestamped signals

---

# 3. Collector Registry (`configs/scraper_registry.json`)

All approved collectors are tracked centrally in `configs/scraper_registry.json` to prevent:
- duplicate collector creation
- undocumented collector IDs
- confusion between experimental and active production collectors
- agents creating unnecessary external resources

Logical names used in application:
- `github_startup_signals`
- `job_activity`
- `product_activity`
- `news_activity`

Collector States: `EXPERIMENTAL`, `APPROVED`, `ACTIVE`, `DEPRECATED`, `DISABLED`

---

# 4. Controlled Resource Usage

Live scraping should not be used for ordinary local development or testing.  
Preferred workflow:  
`Controlled Live Collection` ➔ `Inspect Dataset` ➔ `Validate Output` ➔ `Save Representative Sample` ➔ `Create Test Fixtures` ➔ `Develop Locally` ➔ `Run Fixture-Based Tests` ➔ `Controlled Integration Test`

---

# 5. Scraper Health Validation & Self-Healing

The Health Validator checks returned datasets against required metrics. If validation fails, it triggers the repair workflow:
- **Level 1 — Detection**: Detects invalid schema or missing fields.
- **Level 2 — Diagnosis**: Identifies what changed (missing field, selector mismatch).
- **Level 3 — Agent-Assisted Repair**: Developer/Agent updates collector configuration.
- **Level 4 — Automated Repair**: Automated selector repair and re-testing.

---

# 6. What Not to Do

- ❌ Create a new collector every time a test fails
- ❌ Trigger live scraping for unit tests
- ❌ Hardcode collector IDs throughout the application
- ❌ Assume successful execution means valid data
- ❌ Allow invalid scraper output into intelligence logic
- ❌ Commit credentials