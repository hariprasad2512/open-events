# Hackathon Demo Script

> Step-by-step demonstration script for Scrapeverse — City Leisure Events Aggregator (Hyderabad Pilot).

---

## Step 1 — Overview & Target Sources
- Introduce Scrapeverse: Aggregating leisure events (music, theatre, workshops, meetups, sports, food, art) for Hyderabad across FullHyd, HydHub, and AroundU.

---

## Step 2 — Custom Scraper Studio Collection
- Show custom scrapers built in Bright Data Scraper Studio for FullHyd, HydHub, and AroundU.
- Demonstrate trigger endpoint: `POST /dca/trigger?target=FullHyd`.

---

## Step 3 — Health Validation & Self-Healing
- Trigger run with selector glitch simulation: `POST /dca/trigger?target=HydHub&inject_errors=true`.
- Show Health Validator detecting broken date/area selector ➔ AI Self-Healing agent repairing extraction ➔ Re-validation passing (`COMPLETED_HEALED`).

---

## Step 4 — Normalization & Unified Taxonomy Mapping
- Show raw site outputs transformed into the Unified Event Schema (`event_id`, `title`, `category`, `date`, `time`, `venue`, `area`, `price`, `sources`, `scraped_at`).
- Show raw categories mapped to standard taxonomy (`Music`, `Workshops & Classes`, `Sports & Outdoors`, etc.).

---

## Step 5 — Cross-Source Fuzzy De-duplication
- Demonstrate fuzzy matching on `title` + `date` + `venue`.
- Show duplicate events across FullHyd and HydHub merged into a single event record with a combined `sources` array (`[{site_name: "FullHyd"}, {site_name: "HydHub"}]`).

---

## Step 6 — Weekly Digest API & Output
- Query `GET /events/digest`.
- Show total events aggregated, unique venues, category breakdown, and deduplication statistics ("23 duplicates removed").
