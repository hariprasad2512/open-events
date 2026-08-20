# API Contract

> Defines the public application API contract between the backend and frontend.

The API exposes processed application data. It does not expose raw Bright Data scraper responses directly to the frontend.

---

# 1. API Principles

The API should:
- expose stable resource-oriented responses
- hide source-specific scraper complexity
- return normalized and processed data
- preserve source attribution where useful
- provide historical context
- expose explainable traction insights
- return predictable error responses

---

# 2. API Base

Base URL: `http://localhost:8000`

---

# 3. Endpoints

### 3.1 `GET /health`
Returns application health information.
Response:
```json
{
  "status": "healthy"
}
```

---

### 3.2 `GET /startups`
Returns list of available startups.
Query Params: `search`, `limit`, `offset`
Response:
```json
{
  "items": [
    {
      "startup_id": "startup_001",
      "startup_name": "Example AI",
      "website": "https://example.ai",
      "latest_traction_score": 85,
      "traction_change": 9
    }
  ],
  "total": 1
}
```

---

### 3.3 `GET /startups/{startup_id}`
Returns primary profile for a startup.
Response:
```json
{
  "startup_id": "startup_001",
  "startup_name": "Example AI",
  "website": "https://example.ai",
  "description": "Example startup description.",
  "latest_snapshot_at": "2026-08-20T10:00:00Z",
  "traction": {
    "score": 85,
    "change": 9,
    "calculated_at": "2026-08-20T10:00:00Z"
  }
}
```

---

### 3.4 `GET /startups/{startup_id}/signals`
Returns latest normalized signals.
Response:
```json
{
  "startup_id": "startup_001",
  "signals": [
    {
      "signal_category": "developer_activity",
      "metric": "github_stars",
      "value": 12500,
      "unit": "count",
      "source": "github",
      "observed_at": "2026-08-20T10:00:00Z"
    },
    {
      "signal_category": "developer_activity",
      "metric": "github_contributors",
      "value": 85,
      "unit": "count",
      "source": "github",
      "observed_at": "2026-08-20T10:00:00Z"
    }
  ]
}
```

---

### 3.5 `GET /startups/{startup_id}/history`
Returns historical observations for time-series visualizations.
Query Params: `metric`, `category`, `from`, `to`
Response:
```json
{
  "startup_id": "startup_001",
  "history": [
    {
      "metric": "github_stars",
      "source": "github",
      "observations": [
        { "value": 8000, "observed_at": "2026-08-01T00:00:00Z" },
        { "value": 9200, "observed_at": "2026-08-08T00:00:00Z" },
        { "value": 10800, "observed_at": "2026-08-15T00:00:00Z" },
        { "value": 12500, "observed_at": "2026-08-20T00:00:00Z" }
      ]
    }
  ]
}
```

---

### 3.6 `GET /startups/{startup_id}/traction`
Returns current traction analysis.
Response:
```json
{
  "startup_id": "startup_001",
  "score": 85,
  "previous_score": 76,
  "change": 9,
  "calculated_at": "2026-08-20T10:00:00Z",
  "signal_summary": [
    { "category": "developer_activity", "score": 88 },
    { "category": "hiring_activity", "score": 92 },
    { "category": "product_activity", "score": 84 }
  ]
}
```

---

### 3.7 `GET /startups/{startup_id}/insights`
Returns explainable contributors behind the startup's traction.
Response:
```json
{
  "startup_id": "startup_001",
  "insights": {
    "positive": [
      {
        "signal_category": "developer_activity",
        "metric": "github_contributors",
        "impact": "positive",
        "change": 40,
        "reason": "Contributor activity increased by 40%"
      },
      {
        "signal_category": "hiring_activity",
        "metric": "open_positions",
        "impact": "positive",
        "change": 50,
        "reason": "Open positions increased from 12 to 18"
      }
    ],
    "negative": [
      {
        "signal_category": "community_activity",
        "metric": "community_mentions",
        "impact": "negative",
        "change": -5,
        "reason": "Community activity decreased by 5%"
      }
    ],
    "neutral": []
  }
}
```

---

### 3.8 `GET /startups/trending`
Returns startups showing strongest recent traction changes. Query Params: `limit`, `period`.

---

### 3.9 Legacy / Diagnostic Endpoints
- `POST /dca/trigger`: Triggers background scraping.
- `GET /dca/jobs/{job_id}`: Job execution status.
- `GET /dca/dataset/{job_id}`: Raw and processed job output.
- `GET /api/metrics`: Aggregate time-series metric snapshots.

---

# 4. Error Contract

```json
{
  "error": {
    "code": "STARTUP_NOT_FOUND",
    "message": "The requested startup does not exist."
  }
}
```
Error codes include: `STARTUP_NOT_FOUND`, `INVALID_REQUEST`, `VALIDATION_ERROR`, `INTERNAL_ERROR`, `SERVICE_UNAVAILABLE`.