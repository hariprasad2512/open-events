from fastapi import FastAPI

app = FastAPI(title="Scrape Verse Backend", version="0.1.0")


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/mock-data")
def mock_data() -> dict:
    return {
        "status": "ok",
        "generatedAt": "2026-08-19T00:00:00Z",
        "summary": {
            "totalItems": 0,
            "averageScore": 0
        },
        "items": []
    }
