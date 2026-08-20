import sqlite3
import json
from datetime import datetime
import os
from backend.config import DB_PATH

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Jobs table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        target TEXT NOT NULL,
        status TEXT NOT NULL,
        error_message TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
    )
    """)
    
    # Scraped items table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS scraped_items (
        id TEXT PRIMARY KEY,
        job_id TEXT NOT NULL,
        title TEXT NOT NULL,
        source TEXT NOT NULL,
        url TEXT NOT NULL,
        score REAL NOT NULL,
        tags TEXT NOT NULL, -- JSON list of tags
        scraped_at TEXT NOT NULL,
        region TEXT,
        FOREIGN KEY (job_id) REFERENCES jobs (id)
    )
    """)
    
    # Time-series metrics history table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS metrics_history (
        timestamp TEXT PRIMARY KEY,
        total_items INTEGER NOT NULL,
        average_score REAL NOT NULL
    )
    """)
    
    conn.commit()
    conn.close()

def create_job(job_id: str, target: str) -> None:
    conn = get_db_connection()
    cursor = conn.cursor()
    now = datetime.utcnow().isoformat() + "Z"
    cursor.execute(
        "INSERT INTO jobs (id, target, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
        (job_id, target, "PENDING", now, now)
    )
    conn.commit()
    conn.close()

def update_job_status(job_id: str, status: str, error_message: str = None) -> None:
    conn = get_db_connection()
    cursor = conn.cursor()
    now = datetime.utcnow().isoformat() + "Z"
    cursor.execute(
        "UPDATE jobs SET status = ?, error_message = ?, updated_at = ? WHERE id = ?",
        (status, error_message, now, job_id)
    )
    conn.commit()
    conn.close()

def save_scored_items(job_id: str, items: list) -> None:
    conn = get_db_connection()
    cursor = conn.cursor()
    for item in items:
        # Check if tags is a list, convert to json string
        tags_json = json.dumps(item.get("tags", []))
        metadata = item.get("metadata", {})
        scraped_at = metadata.get("scrapedAt", datetime.utcnow().isoformat() + "Z")
        region = metadata.get("region", "unknown")
        
        cursor.execute(
            """
            INSERT OR REPLACE INTO scraped_items (id, job_id, title, source, url, score, tags, scraped_at, region)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                item.get("id"),
                job_id,
                item.get("title"),
                item.get("source"),
                item.get("url"),
                item.get("score", 0.0),
                tags_json,
                scraped_at,
                region
            )
        )
    conn.commit()
    conn.close()

def persist_snapshot(total_items: int, average_score: float) -> None:
    conn = get_db_connection()
    cursor = conn.cursor()
    now = datetime.utcnow().isoformat() + "Z"
    cursor.execute(
        "INSERT OR REPLACE INTO metrics_history (timestamp, total_items, average_score) VALUES (?, ?, ?)",
        (now, total_items, average_score)
    )
    conn.commit()
    conn.close()

def get_job(job_id: str) -> dict:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM jobs WHERE id = ?", (job_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return dict(row)
    return None

def get_items_by_job(job_id: str) -> list:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM scraped_items WHERE job_id = ?", (job_id,))
    rows = cursor.fetchall()
    conn.close()
    
    items = []
    for row in rows:
        item_dict = dict(row)
        item_dict["tags"] = json.loads(item_dict["tags"])
        item_dict["metadata"] = {
            "scrapedAt": item_dict.pop("scraped_at"),
            "region": item_dict.pop("region")
        }
        items.append(item_dict)
    return items

def get_historical_metrics() -> list:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM metrics_history ORDER BY timestamp ASC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]
