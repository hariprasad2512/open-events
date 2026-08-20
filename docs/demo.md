# Demo Guidelines

Follow these steps to demonstrate the pipeline capabilities:

1. **Clean Run**:
   - Call `POST /dca/trigger?target=Job+Boards&inject_errors=false`.
   - Observe normal pipeline flow. Status: `COMPLETED`.
2. **AI Self-Healing Demo**:
   - Call `POST /dca/trigger?target=Job+Boards&inject_errors=true`.
   - Observe that the health validator triggers the Self-Healing agent, selector anomalies are corrected and logged, and the job status finishes as `COMPLETED_HEALED`.
3. **Database Inspection**:
   - Query `GET /api/metrics` to verify that run metadata and aggregate scores are successfully saved.
