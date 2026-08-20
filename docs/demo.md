# Hackathon Demo Script

> Step-by-step demonstration script for judging presentations.

---

## Step 1 — Discover
- Open the Startup Intelligence Dashboard.
- Show **Trending Startups** list ranked by growth rate:
  1. Startup A (Score 91, ↑ +15)
  2. Startup B (Score 87, ↑ +12)
  3. Startup C (Score 83, ↑ +8)

---

## Step 2 — Investigate
- Click on **Startup A** to open its profile view.
- Highlight **Traction Score: 91 / 100** and change indicator (`+15`).

---

## Step 3 — Show History
- Display the time-series trend line chart (`62 → 68 → 76 → 84 → 91`).
- Explain: *"This isn't a static score snapshot—our pipeline tracks weekly changes over time."*

---

## Step 4 — Explain
- Open **Why This Score?** explainability breakdown:
  - `+ GitHub contributors increased 40%`
  - `+ Engineering hiring increased 60%`
  - `+ Product releases increased`
  - `- Community mentions remained flat`

---

## Step 5 — Show the Scraper Pipeline
- Demonstrate data provenance:
  `Public Web` ➔ `Bright Data Cloud` ➔ `Collector Control` ➔ `Health Validator` ➔ `Normalizer` ➔ `Time-Series DB` ➔ `API`

---

## Step 6 — Demonstrate Recovery (Self-Healing)
- Run trigger with error injection: `POST /dca/trigger?target=Job+Boards&inject_errors=true`.
- Show that:
  1. Health Validator detects missing selector/field.
  2. AI Self-Healing agent diagnoses and repairs extraction pattern.
  3. Pipeline re-validates and completes (`COMPLETED_HEALED`).
  4. Downstream data continues to flow cleanly!
