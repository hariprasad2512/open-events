# Data Contract

> Defines how data moves from external scraping sources into the Startup Traction Intelligence system.

The purpose of this contract is to ensure that:
- scraper output can change independently from application logic
- multiple sources can provide different data formats
- normalized signals follow one canonical structure
- frontend and backend can develop independently
- intelligence logic does not depend directly on raw scraper output

---

# 1. Data Flow

The system has major data representations:
```text
RAW SOURCE DATA
      ↓
VALIDATED RAW DATA
      ↓
NORMALIZED STARTUP SIGNALS
      ↓
HISTORICAL SNAPSHOTS
      ↓
TRACTION INTELLIGENCE
```

---

# 2. Raw Scraper Data

Raw data is the output returned directly from a scraper or external collection process.
Example:
```json
{
  "company_name": "Example Startup",
  "github_url": "https://github.com/example/startup",
  "stars": 12000,
  "forks": 850,
  "contributors": 75
}
```
Raw data is source-specific, potentially inconsistent, and must be validated before ingestion.

---

# 3. Validation Contract

Before normalization, raw data must pass validation.
The validator checks: Response exists ➔ Expected structure exists ➔ Required fields exist ➔ Field types are valid ➔ Values are reasonable.

Validation result structure:
```json
{
  "valid": true,
  "errors": [],
  "warnings": []
}
```

---

# 4. Canonical Startup Identity

Every normalized record is associated with a startup:
```json
{
  "startup_id": "startup_001",
  "startup_name": "Example AI"
}
```

Required Fields:
- `startup_id` (string): Internal unique identifier.
- `startup_name` (string): Human-readable startup name.

---

# 5. Normalized Signal Schema

The core internal unit of the system is a **Startup Signal**:

```json
{
  "startup_id": "startup_001",
  "startup_name": "Example AI",
  "signal_category": "developer_activity",
  "metric": "github_stars",
  "value": 12500,
  "unit": "count",
  "source": "github",
  "observed_at": "2026-08-20T10:00:00Z",
  "metadata": {
    "repository_url": "https://github.com/example-ai/core"
  }
}
```

---

# 6. Startup Signal Fields

### Signal Classification
- `signal_category`: Category string (e.g. `developer_activity`, `hiring_activity`, `product_activity`, `community_activity`, `public_attention`).
- `metric`: Specific metric name (e.g. `github_stars`, `github_contributors`, `open_positions`, `community_mentions`).

### Value & Source
- `value`: Numeric count or percentage value (e.g. `12500`).
- `unit`: Measurement unit (e.g. `count`, `percentage`).
- `source`: Source identifier string (e.g. `github`, `job_source`, `news`).
- `observed_at`: Timestamp in UTC ISO-8601 format (`2026-08-20T10:00:00Z`).

---

# 7. Multiple Signals Example

```json
[
  {
    "startup_id": "startup_001",
    "signal_category": "developer_activity",
    "metric": "github_stars",
    "value": 12500,
    "unit": "count",
    "source": "github",
    "observed_at": "2026-08-20T10:00:00Z",
    "metadata": {}
  },
  {
    "startup_id": "startup_001",
    "signal_category": "hiring_activity",
    "metric": "open_positions",
    "value": 18,
    "unit": "count",
    "source": "job_source",
    "observed_at": "2026-08-20T10:00:00Z",
    "metadata": {}
  }
]
```

---

# 8. Historical Data Contract

Historical analysis compares observations of the same metric across time snapshots:
```json
[
  { "observed_at": "2026-08-01T00:00:00Z", "value": 8000 },
  { "observed_at": "2026-08-08T00:00:00Z", "value": 9200 },
  { "observed_at": "2026-08-15T00:00:00Z", "value": 10800 }
]
```

---

# 9. Derived Metrics

Calculated from historical signals:
```json
{
  "metric": "github_stars",
  "current_value": 12000,
  "previous_value": 10000,
  "absolute_change": 2000,
  "percentage_change": 20.0,
  "current_observed_at": "2026-08-20T10:00:00Z",
  "previous_observed_at": "2026-08-13T10:00:00Z"
}
```

---

# 10. Traction Result Contract

```json
{
  "startup_id": "startup_001",
  "traction_score": 85,
  "score_change": 9,
  "calculated_at": "2026-08-20T10:00:00Z",
  "contributors": [
    {
      "signal_category": "developer_activity",
      "metric": "github_stars",
      "impact": "positive",
      "reason": "GitHub stars increased by 20%"
    },
    {
      "signal_category": "hiring_activity",
      "metric": "open_positions",
      "impact": "positive",
      "reason": "Open positions increased from 12 to 18"
    }
  ]
}
```

---

# 11. Data Quality States

- `PENDING`: Scrape initiated.
- `RUNNING`: Collecting data.
- `SUCCESS`: Scraping complete and validated.
- `VALIDATION_FAILED`: Output failed schema check.
- `FAILED`: Execution error or timeout.