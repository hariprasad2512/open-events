# DECISIONS.md

> Record of important project decisions.
>
> This file answers:
>
> **What did we decide, why did we decide it, and what should future team members or AI agents assume?**
>
> Do not use this file for brainstorming or unresolved discussions.

---

# Decision Log

---

## D001 — Final Product Direction

**Status:** ACCEPTED  
**Date:** 2026-08-20  

### Decision

The project will build a:

> **Startup Traction Intelligence Platform**

The system collects publicly available startup signals from multiple sources, tracks those signals over time, and converts them into structured intelligence.

The platform aims to help users answer:

> **Is this startup showing meaningful signs of growth, and what evidence supports that conclusion?**

### Core Users

- Developers
- Job seekers
- Investors
- Entrepreneurs
- Researchers interested in startup ecosystems

### Core Value

The system should not simply display scraped information.

It should transform public data into:

- structured signals
- historical snapshots
- growth trends
- traction indicators
- explainable insights

---

## D002 — Core System Flow

**Status:** ACCEPTED  
**Date:** 2026-08-20  

### Decision

The baseline system flow is:

```text
Public Web Sources
        ↓
Bright Data Scraper
        ↓
Raw Dataset
        ↓
Health Validation
        ↓
Normalization
        ↓
Signal / Intelligence Engine
        ↓
Time-Series Storage
        ↓
API
        ↓
Frontend Intelligence Dashboard
```

### Reason

The project must demonstrate more than scraping.
The scraper is the data acquisition layer.
The intelligence layer creates downstream value from the collected data.

---

## D003 — Bright Data Is Core Infrastructure

**Status:** ACCEPTED  
**Date:** 2026-08-20  

### Decision

Bright Data Scraper Studio will be used as the primary external data collection infrastructure for the hackathon.
The application should integrate real scraper output into the downstream system.

### Rules

- Use real Bright Data scraping workflows.
- Reuse approved collectors.
- Record Collector IDs centrally.
- Do not create duplicate collectors unnecessarily.
- Do not hardcode credentials.
- Save representative outputs for local development.

Collector configuration should be tracked through:

`configs/scraper_registry.json`

---

## D004 — Startup Signals Must Be Time-Series Data

**Status:** ACCEPTED  
**Date:** 2026-08-20  

### Decision

The system will not treat startup data as a one-time snapshot.
Signals should be stored with timestamps.

Example:

```text
Startup A
 │
 ├── Aug 1
 │   GitHub Stars: 8,000
 │   Jobs: 8
 │
 ├── Aug 8
 │   GitHub Stars: 9,200
 │   Jobs: 10
 │
 └── Aug 15
     GitHub Stars: 10,800
     Jobs: 14
```

### Reason

The core intelligence question is not only:
"What does this startup look like right now?"

It is:
"How is this startup changing over time?"

---

## D005 — Traction Score Is an Analytical Metric

**Status:** ACCEPTED  
**Date:** 2026-08-20  

### Decision

The platform will calculate a Traction Score based on multiple publicly observable signals.
The exact formula and weights are not finalized yet.

Potential categories include:

- developer activity
- hiring activity
- product activity
- community attention
- customer/public signals
- news and announcements

### Important Rule

The Traction Score must be presented as:
An internal analytical indicator based on available public signals.

It must not be presented as:

- revenue
- company valuation
- investment advice
- guaranteed company growth

---

## D006 — Scores Must Be Explainable

**Status:** ACCEPTED  
**Date:** 2026-08-20  

### Decision

The system must explain why a startup's score or trend changed.
The product should not only show:

`Traction Score: 85`

It should provide evidence such as:

```text
Why traction increased:

+ GitHub contributors increased
+ Engineering hiring increased
+ Product activity increased
+ Public attention increased
```

### Reason

Explainability is necessary for trust and makes the intelligence layer more useful than a simple ranking.

---

## D007 — Validation Happens Before Intelligence Processing

**Status:** ACCEPTED  
**Date:** 2026-08-20  

### Decision

Scraped data must pass through validation before normalization and intelligence processing.

Conceptually:

```text
Scraper Output
      ↓
Health Validator
      ↓
    Valid?
 ┌────┴────┐
 │         │
Yes       No
 │         │
 ↓         ↓
Normalize  Failure / Repair Flow
```

### Reason

A broken or changed scraper should not silently contaminate downstream metrics.

---

## D008 — Self-Healing Is a Key Hackathon Capability

**Status:** ACCEPTED  
**Date:** 2026-08-20  

### Decision

The project will include a scraper failure detection and recovery demonstration.

The conceptual flow is:

```text
Scrape
  ↓
Validate Output
  ↓
Failure Detected
  ↓
Identify Broken / Missing Data
  ↓
Repair Scraper
  ↓
Re-run
  ↓
Validate Again
```

### Important Distinction

The project must accurately distinguish between:

- automated failure detection
- agent-assisted scraper repair
- fully automated repair

The implementation must not claim a higher degree of autonomy than actually exists.

---

## D009 — Data Contracts Come Before Parallel Development

**Status:** ACCEPTED  
**Date:** 2026-08-20  

### Decision

Frontend and backend should communicate through explicit data contracts.
The scraper output should be normalized into a predictable structure.

Relevant locations:

```text
schemas/
docs/data-contract.md
docs/api-contract.md
data/samples/
data/fixtures/
```

### Reason

This allows:

```text
Frontend ← Sample Data / API Contract
Backend  ← Normalized Schema
Scraper  ← Raw Data → Normalization
```

to be developed in parallel.

---

## D010 — AI Agents Share Repository Context

**Status:** ACCEPTED  
**Date:** 2026-08-20  

### Decision

Cursor, Codex, Antigravity, and other development agents must treat repository files as shared project memory.

The primary context hierarchy is:

```text
AI_INSTRUCTIONS.md
        ↓
PROJECT_STATE.md
        ↓
DECISIONS.md
        ↓
TASKS.md
        ↓
docs/
        ↓
Code
```

### Reason

Individual AI conversations and context windows are not reliable sources of shared project truth.
The repository must remain understandable independently of any individual agent session.

---

## D011 — Git Is the Collaboration Boundary

**Status:** ACCEPTED  
**Date:** 2026-08-20  

### Decision

Development work should be isolated through Git branches.

Preferred pattern:

```text
task
  ↓
feature branch
  ↓
implementation
  ↓
validation
  ↓
commit
  ↓
pull request
  ↓
main
```

### Rule

One focused task should ideally correspond to one focused branch and pull request.

---

## D012 — Live Scraping Should Not Be Used for Ordinary Development

**Status:** ACCEPTED  
**Date:** 2026-08-20  

### Decision

Once representative scraper output is available, development should primarily use local sample and fixture data.

Preferred workflow:

```text
Controlled Live Scrape
  ↓
Inspect Output
  ↓
Save Sample
  ↓
Develop Locally
  ↓
Test with Fixtures
  ↓
Controlled Integration Test
```

### Reason

This reduces:

- unnecessary Bright Data usage
- dependency on external services
- inconsistent test results
- development delays

---

## D013 — Architecture Must Remain Modular

**Status:** ACCEPTED  
**Date:** 2026-08-20  

### Decision

The project should separate:

```text
Data Acquisition
Validation
Normalization
Intelligence
Storage
API
Frontend
```

Product-specific logic should not be tightly coupled to scraper implementation.

### Reason

This allows sources, metrics, and scoring strategies to evolve without rebuilding the entire system.

---

# Pending Decisions

The following decisions remain open and should not be assumed by agents.

| ID | Decision | Status |
|---|---|---|
| P001 | Initial startup data sources | OPEN |
| P002 | Exact Bright Data scraper targets | OPEN |
| P003 | Normalized startup data schema | OPEN |
| P004 | Traction Score formula | OPEN |
| P005 | Traction Score weights | OPEN |
| P006 | Database technology | OPEN |
| P007 | Historical storage implementation | OPEN |
| P008 | Backend deployment | OPEN |
| P009 | Frontend feature scope | OPEN |
| P010 | Final demo flow | OPEN |

---

# Decision Rules

When adding a new important decision:

1. Assign a new ID.
2. Add the date.
3. Mark the status.
4. State the decision clearly.
5. Explain why it was made.
6. Record important consequences if necessary.

Use:

```text
ACCEPTED
SUPERSEDED
REJECTED
OPEN
EXPERIMENTAL
```

Do not delete old decisions.

If a decision changes, mark the previous decision as: `SUPERSEDED` and create a new decision explaining the replacement.
