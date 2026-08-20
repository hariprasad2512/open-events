# Hackathon Strategy

> Product scope, technical focus, demo strategy, and execution constraints for Startup Traction Intelligence.

---

# 1. Project Overview

**Startup Traction Intelligence**  
**One-line description:**  
A startup intelligence platform that collects public web signals, tracks how they change over time, and converts them into explainable traction insights.

The system focuses on answering:
> **Is a startup showing meaningful signs of momentum, and what public evidence supports that conclusion?**

---

# 2. Core Hackathon Problem

Startup signals are fragmented across developer platforms, hiring pages, startup websites, product platforms, and news sources. Looking at a single source provides only a partial picture.

The project combines selected public signals and tracks them over time:
`Fragmented Signals` ➔ `Web Data Collection` ➔ `Validation` ➔ `Normalization` ➔ `Historical Tracking` ➔ `Traction Analysis` ➔ `Explainable Insights`

---

# 3. Hackathon Core Technical Story

The scraper is not just a background utility; it is a central part of the product:
> **We transform continuously changing public web data into structured startup intelligence.**

Scraped data is: collected ➔ validated ➔ normalized ➔ historically tracked ➔ analyzed ➔ explained.

---

# 4. Product Value

- **Developers**: Discover fast-growing startups, job opportunities, and technical momentum.
- **Founders**: Monitor competitor activity, hiring changes, product launches, and market momentum.
- **Investors & Analysts**: Explore structured public growth signals and time-series evidence.

---

# 5. Suggested Demo Flow (Step 1 to 6)

1. **Step 1 — Discover**: Show a list of trending startups ranked by traction growth (e.g., Startup A Score 91 ↑ +15).
2. **Step 2 — Investigate**: Open Startup A profile (Traction Score: 91, Change: +15).
3. **Step 3 — Show History**: Demonstrate time-series trend (62 → 68 → 76 → 84 → 91).
4. **Step 4 — Explain**: Show why traction changed (+ GitHub contributors increased, + Engineering hiring increased).
5. **Step 5 — Show the Scraper Pipeline**: Reveal underlying data flow (Public Source ➔ Bright Data ➔ Validator ➔ Normalizer ➔ Time-Series Storage ➔ Traction Engine).
6. **Step 6 — Demonstrate Recovery**: Demonstrate a controlled failure scenario (simulated UI change ➔ Validator detects mismatch ➔ Self-Healing recovery ➔ Re-testing ➔ Validated output).

---

# 6. Minimum Demo Checklist

- [x] At least one startup can be displayed
- [x] Data originates from the scraping pipeline
- [x] Raw data is validated
- [x] Data is normalized
- [x] Historical observations exist
- [x] At least one trend can be shown
- [x] Traction analysis works
- [x] Score output is explainable
- [x] Scraper failure scenario & recovery demonstrated
- [x] No credentials exposed
- [x] README & docs explain the project clearly