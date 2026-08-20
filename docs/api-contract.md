# API Contract

## Base URL: `http://localhost:8000`

### 1. `GET /health`
- **Description**: Returns server status.
- **Response**: `{"status": "ok"}`

### 2. `POST /dca/trigger`
- **Description**: Triggers a scraper run in a background worker task.
- **Query Params**:
  - `target` (string, required): e.g. "Job Boards", "Code Repos", "News"
  - `inject_errors` (boolean, optional): if true, simulates selector glitches.
- **Response**:
  ```json
  {
    "status": "triggered",
    "job_id": "job_e98f01a7",
    "target": "Code Repos"
  }
  ```

### 3. `GET /dca/jobs/{job_id}`
- **Description**: Returns the execution state of a background job.
- **Response**:
  ```json
  {
    "id": "job_e98f01a7",
    "target": "Code Repos",
    "status": "COMPLETED",
    "error_message": null,
    "created_at": "2026-08-20T12:00:00Z",
    "updated_at": "2026-08-20T12:01:00Z"
  }
  ```

### 4. `GET /dca/dataset/{job_id}`
- **Description**: Returns the full processed dataset conforming to the Data Contract.

### 5. `GET /api/metrics`
- **Description**: Returns time-series run snapshots.
