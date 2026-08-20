# Hackathon / Dev Sprint Guide

Welcome to the hackathon sprint guidelines!

## Focus Areas
1. **Pipeline Resilience**: Prove that UI changes on external sites don't crash our system. We verify this via `/dca/trigger?inject_errors=true` and monitoring status results for `COMPLETED_HEALED`.
2. **Dashboard Visuals**: Render score indicators, trend grids, and manual run triggers in Next.js.
3. **Scoring Logic**: Calibrate source and tag weights dynamically.
