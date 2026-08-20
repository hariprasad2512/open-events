# Data Directory Guidelines

This directory contains data files used across development, testing, and operation.

## Folders
- `data/samples/`: Representative successful real-world payloads saved from controlled live scraping.
- `data/fixtures/`: Controlled test inputs (healthy data, missing fields, malformed JSON, schema change fixtures) used by unit/integration tests to avoid triggering live scrapers.
- `data/snapshots/`: Local application runtime snapshots.
