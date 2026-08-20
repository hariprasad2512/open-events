# Startup Traction Intelligence

> A self-healing startup intelligence platform that transforms public web signals into explainable traction insights.

---

## Overview

Startup information is scattered across the web.

A company's developer activity may be visible on GitHub. Hiring signals may appear on job platforms. Product launches, community attention, public announcements, and other indicators may exist across entirely different sources.

Individually, these signals provide only a partial picture.

**Startup Traction Intelligence** brings these public signals together, tracks how they change over time, and transforms them into structured, explainable insights.

The core question we aim to answer is:
> **Is a startup showing meaningful signs of traction, and what public evidence supports that conclusion?**

---

## What the Platform Does

```text
Public Web Sources
        ↓
Bright Data Scrapers
        ↓
Raw Data
        ↓
Health Validation
        ↓
Normalization
        ↓
Signal Intelligence
        ↓
Historical Tracking
        ↓
Traction Analysis
        ↓
API
        ↓
Startup Intelligence Dashboard
```

The platform is designed to move beyond a static startup profile.  
Instead of only showing current counts, the system tracks changes over time (GitHub Activity ↑, Hiring Activity ↑, Product Activity ↑) and converts those changes into actionable intelligence.

---

## Core Features

- **Startup Signal Collection**: Collects publicly available signals from multiple sources (GitHub developer activity, Job boards hiring, Website updates, News announcements).
- **Historical Tracking**: Stores startup signals as timestamped snapshots, allowing the system to calculate growth, decline, and momentum over time.
- **Traction Score**: Generates an internal analytical Traction Score (0–100) based on observable public signals.
- **Explainable Intelligence**: Explains *why* a score or trend changed with observable evidence (e.g. "+ GitHub contributors increased 40%", "+ Engineering jobs increased 60%").
- **Self-Healing Scraping**: Detects selector changes or data structure anomalies when external targets change, triggering an AI recovery workflow to repair scraper extraction before downstream processing.

---

## Project Structure

```text
scrape-verse/
├── README.md                 # Public-facing entry point
├── CONTRIBUTING.md           # Contribution & collaboration guidelines
├── AI_INSTRUCTIONS.md        # Shared operating contract for AI agents (Cursor, Codex, Antigravity)
├── PROJECT_STATE.md          # Current project state & priorities
├── DECISIONS.md              # Architectural Decision Records (ADR log D001-D013)
├── TASKS.md                  # Single active task work board
│
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore configuration
├── .editorconfig             # Editor formatting rules
│
├── .cursor/rules/            # Modular Cursor system rules (00-global to 50-git)
├── .github/                  # GitHub Actions CI workflows & PR templates
│
├── docs/                     # Technical documentation
│   ├── architecture.md       # Full 6-layer system architecture
│   ├── product.md            # Product overview & user personas
│   ├── data-contract.md      # Data schemas & contracts
│   ├── api-contract.md       # API endpoint specification
│   ├── brightdata.md         # Bright Data Scraper Studio guide & resource policy
│   ├── hackathon.md          # Hackathon strategy & judging checklist
│   └── demo.md               # Step-by-step hackathon demo script
│
├── configs/                  # Infrastructure configurations
│   ├── scraper_registry.json # Single source of truth for Bright Data collectors
│   └── scoring.yaml          # Intelligence scoring weights
│
├── schemas/                  # Machine-readable JSON schemas
├── data/                     # Samples, test fixtures, and snapshot data
│   ├── samples/
│   ├── fixtures/
│   └── snapshots/
│
├── backend/                  # Application Backend
│   ├── app/                  # Main package core (API, Scraper, Processor, DB)
│   ├── tests/                # Automated test suite
│   └── requirements.txt      # Python dependencies
│
├── frontend/                 # React/Next.js dashboard interface
├── scripts/                  # Development & validation scripts
└── experiments/              # Self-healing failure lab & experiments
```

---

## Development Principles

### Repository as Shared Memory
The project is built collaboratively by human developers and AI agents (Cursor, Codex, Antigravity). The repository documentation acts as the shared source of truth.

### Data Contract First
Frontend, backend, and scraper layers communicate through explicit data contracts (`docs/data-contract.md`, `docs/api-contract.md`). Frontend development proceeds using local mock fixtures without waiting for live scraping.

### Controlled External Resource Usage
Live scraping is not required for ordinary local development. The workflow uses local samples and fixtures (`data/samples/`, `data/fixtures/`).

---

## Quick Start (Backend)

1. **Install Dependencies**:
   ```bash
   pip install -r backend/requirements.txt
   ```

2. **Configure Environment**:
   ```bash
   cp .env.example .env
   ```

3. **Run Automated Test Suite**:
   ```bash
   $env:PYTHONPATH="backend"; python -m unittest backend/tests/test_pipeline.py
   ```

4. **Start Application API**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 --app-dir backend
   ```
