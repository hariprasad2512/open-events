import sqlite3
import json
from datetime import datetime
import os
from app.config import DB_PATH

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
    
    # De-duplicated merged events table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS events (
        event_id TEXT PRIMARY KEY,
        job_id TEXT NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT,
        venue TEXT NOT NULL,
        area TEXT,
        price TEXT,
        description TEXT,
        sources TEXT NOT NULL, -- JSON list of {site_name, source_url}
        scraped_at TEXT NOT NULL,
        FOREIGN KEY (job_id) REFERENCES jobs (id)
    )
    """)
    
    # Time-series metrics history table
    cursor.execute("DROP TABLE IF EXISTS metrics_history")
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS metrics_history (
        timestamp TEXT PRIMARY KEY,
        total_events INTEGER NOT NULL,
        unique_venues INTEGER NOT NULL
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

def save_merged_events(job_id: str, events: list) -> None:
    conn = get_db_connection()
    cursor = conn.cursor()
    for event in events:
        sources_json = json.dumps(event.get("sources", []))
        cursor.execute(
            """
            INSERT OR REPLACE INTO events (
                event_id, job_id, title, category, date, time, venue, area, price, description, sources, scraped_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                event.get("event_id"),
                job_id,
                event.get("title"),
                event.get("category"),
                event.get("date"),
                event.get("time", ""),
                event.get("venue"),
                event.get("area", ""),
                event.get("price", "Free"),
                event.get("description", ""),
                sources_json,
                event.get("scraped_at", datetime.utcnow().isoformat() + "Z")
            )
        )
    conn.commit()
    conn.close()

def persist_snapshot(total_events: int, unique_venues: int) -> None:
    conn = get_db_connection()
    cursor = conn.cursor()
    now = datetime.utcnow().isoformat() + "Z"
    cursor.execute(
        "INSERT OR REPLACE INTO metrics_history (timestamp, total_events, unique_venues) VALUES (?, ?, ?)",
        (now, total_events, unique_venues)
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

def get_all_events() -> list:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM events ORDER BY date ASC")
    rows = cursor.fetchall()
    conn.close()
    
    events = []
    for row in rows:
        event_dict = dict(row)
        event_dict["sources"] = json.loads(event_dict["sources"])
        events.append(event_dict)
    return events

def get_event_by_id(event_id: str) -> dict:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM events WHERE event_id = ?", (event_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        event_dict = dict(row)
        event_dict["sources"] = json.loads(event_dict["sources"])
        return event_dict
    return None
