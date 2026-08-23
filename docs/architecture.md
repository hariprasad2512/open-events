# System Architecture

> Technical architecture for OpenEvents — City Leisure Events Aggregator.

---

# 1. Purpose

OpenEvents collects leisure events from multiple independent web listing sites, validates HTML extraction results, normalizes source labels into a Unified Category Taxonomy, de-duplicates cross-listed events using fuzzy token matching, and serves a weekly city events digest.

---

# 2. High-Level Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                    PUBLIC EVENT PLATFORMS                    │
│                                                              │
│        FullHyd Events  │  HydHub  │  AroundU  │  ...         │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                     BRIGHT DATA CLOUD                        │
│                                                              │
│              Custom Scrapers in Scraper Studio               │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                  COLLECTOR CONTROL LAYER                     │
│                                                              │
│      Trigger Scrape → Poll Status → Retrieve Raw JSON        │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                       HEALTH VALIDATOR                       │
│                                                              │
│  Schema Check │ Required Fields │ Empty Data │ Glitch Detection
└───────────────────────┬───────────────────────┬──────────────┘
                        │                       │
                     HEALTHY                UNHEALTHY
                        │                       │
                        ▼                       ▼
┌───────────────────────────────┐       ┌───────────────────────┐
│     NORMALIZATION LAYER       │       │    FAILURE / REPAIR   │
│                               │       │                       │
│ Category Taxonomy Mapping ➔   │       │ Detect → Diagnose     │
│ YYYY-MM-DD Date Normalizer    │       │ → Repair → Revalidate │
└───────────────┬───────────────┘       └───────────┬───────────┘
                │                                   │
                └────────────────┬──────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────┐
│                 DE-DUPLICATION ENGINE                        │
│                                                              │
│  Fuzzy Matching on Title + Date + Venue (rapid/difflib)      │
│  Combine Source URLs ➔ Unified Merged Event Record           │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                  STORAGE & API LAYER                         │
│                                                              │
│   SQLite Persistence ➔ FastAPI Digest & Events Routes        │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                   WEEKLY DIGEST DASHBOARD                    │
│                                                              │
│   Category Filters │ Event Listings │ Dedup Logs │ Digest    │
└──────────────────────────────────────────────────────────────┘
```

---

# 3. Component Breakdown

1. **Public Event Platforms**: Independent listing sites with un-gated public event pages.
2. **Bright Data Cloud**: Managed scraper execution using Scraper Studio custom scrapers.
3. **Health Validator**: Checks required attributes (`title`, `date`, `venue`). Triggers AI self-healing simulator if extraction selectors are corrupted.
4. **Normalization Layer**: Maps inconsistent category labels to standard taxonomy (`Music`, `Workshops & Classes`, etc.) and formats timestamps.
5. **De-duplication Engine**: Uses fuzzy string comparison on `title` + `date` + `venue` to merge cross-listed events and join their `sources` lists.
6. **Storage & API Layer**: Commits merged events and run metrics to SQLite, serving `/events`, `/events/digest`, and `/dca/trigger`.