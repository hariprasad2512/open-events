# Bright Data Integration

> Operational guide for custom scraper collection using Bright Data Scraper Studio.

---

# 1. Scraper Studio Custom Scrapers

In accordance with hackathon rules (Rules 3 & 5), custom scrapers are built per target site in Bright Data Scraper Studio (not pre-built marketplace scrapers).

### Registered Collectors (`configs/scraper_registry.json`):
1. **`fullhyd_events_collector`**: `c_fullhyd_events` — Scrapes events from `events.fullhyderabad.com`.
2. **`hydhub_events_collector`**: `c_hydhub_events` — Scrapes events from `hydhub.in`.
3. **`aroundu_events_collector`**: `c_aroundu_events` — Scrapes neighborhood meetups from `aroundu.in/city/hyderabad`.

---

# 2. Resource Consumption Policy

- **Mock Fixture First**: Normalizers, deduplicators, and UI components are tested against local fixture data (`data/fixtures/`, `data/samples/`).
- **No Login Pages**: Scrapers target public event listing cards only. No booking/checkout flows or login pages are accessed.