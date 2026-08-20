import unittest
import asyncio
import os
import json
import sqlite3
import pandas as pd
from datetime import datetime
from unittest.mock import MagicMock

from backend.database import init_db, get_job, get_items_by_job, get_db_connection, DB_PATH
from backend.scraper.collector import collect_raw_dataset
from backend.scraper.validator import validate_item_schema, run_self_healing
from backend.processor.normalizer import normalize_dataset
from backend.processor.scoring import score_items
from backend.main import trigger_scrape, check_job, get_dataset
from backend.orchestrator import run_pipeline

class TestDataIntelligencePipeline(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        # Initialize database
        init_db()

    def setUp(self):
        self.loop = asyncio.get_event_loop()

    def tearDown(self):
        # Clean database tables between tests
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM scraped_items")
        cursor.execute("DELETE FROM jobs")
        cursor.execute("DELETE FROM metrics_history")
        conn.commit()
        conn.close()

    def test_database_crud(self):
        """Tests job creation, retrieval, and status updates in SQLite."""
        from backend.database import create_job, update_job_status
        job_id = "test_job_123"
        create_job(job_id, "Test Target")
        
        job = get_job(job_id)
        self.assertIsNotNone(job)
        self.assertEqual(job["target"], "Test Target")
        self.assertEqual(job["status"], "PENDING")
        
        update_job_status(job_id, "RUNNING")
        job = get_job(job_id)
        self.assertEqual(job["status"], "RUNNING")

    def test_collector_and_error_injection(self):
        """Tests collector retrieves raw mock data and injects schema errors."""
        # Test clean collection
        clean_jobs = collect_raw_dataset("Job Listings", inject_errors=False)
        self.assertTrue(len(clean_jobs) > 0)
        self.assertIsNotNone(clean_jobs[0]["source"])
        
        # Test collection with injected errors
        faulty_jobs = collect_raw_dataset("Job Listings", inject_errors=True)
        self.assertTrue(len(faulty_jobs) > 0)
        # First item should have missing source
        self.assertIsNone(faulty_jobs[0]["source"])

    def test_health_validator_and_self_healing(self):
        """Tests validation of clean items and self-healing of faulty items."""
        # 1. Clean item
        clean_item = {
            "id": "item_1",
            "title": "Data Scientist",
            "source": "LinkedIn Jobs",
            "url": "https://linkedin.com/jobs/view/1",
            "tags": ["AI"],
            "metadata": {"scrapedAt": "2026-08-20T12:00:00Z", "region": "US"}
        }
        errors = validate_item_schema(clean_item)
        self.assertEqual(len(errors), 0)
        
        # 2. Faulty item: missing source & broken selector
        faulty_item = {
            "id": "item_2",
            "title": "Quantum researcher",
            "source": "MIT_Tech_Review_Broken_Selector",
            "url": "https://technologyreview.com/quantum",
            "tags": None,
            "metadata": {"scrapedAt": "2026-08-20T12:00:00Z", "region": "US"}
        }
        errors = validate_item_schema(faulty_item)
        self.assertTrue(len(errors) > 0)
        
        # Repair the faulty item
        healed, logs = run_self_healing(faulty_item, errors)
        self.assertEqual(healed["source"], "MIT Tech Review")
        self.assertEqual(healed["tags"], ["General"])
        
        # Validate repaired item again
        post_heal_errors = validate_item_schema(healed)
        self.assertEqual(len(post_heal_errors), 0)

    def test_data_normalizer(self):
        """Tests Pandas normalizer strips strings and standardizes dates."""
        raw_items = [
            {
                "id": "item_norm",
                "title": "  Lead AI Architect   ",
                "source": " GitHub Jobs ",
                "url": "HTTP://GITHUB.COM/jobs/view",
                "tags": [" AI ", "ML "],
                "metadata": {"scrapedAt": "2026-08-20 12:00:00", "region": "US-West"}
            }
        ]
        normalized = normalize_dataset(raw_items)
        self.assertEqual(normalized[0]["title"], "Lead AI Architect")
        self.assertEqual(normalized[0]["source"], "GitHub Jobs")
        self.assertEqual(normalized[0]["url"], "http://github.com/jobs/view")
        self.assertEqual(normalized[0]["tags"], ["ai", "ml"])
        self.assertEqual(normalized[0]["metadata"]["region"], "us-west")

    def test_scoring_engine(self):
        """Tests dynamic weighting intelligence scoring rules."""
        items = [
            {
                "title": "Regular developer",
                "source": "generic web scrape",
                "tags": []
            },
            {
                "title": "Senior AI Resident Engineer",
                "source": "github jobs",
                "tags": ["AI", "MLOps"]
            }
        ]
        scored = score_items(items)
        
        # Regular developer should have baseline generic score (50)
        self.assertEqual(scored[0]["score"], 50.0)
        
        # AI/MLOps Github jobs candidate gets base 85 + 10 (AI tag) + 15 (MLOps tag) + 10 (AI title bonus) = 120, capped at 100
        self.assertEqual(scored[1]["score"], 100.0)

    def test_end_to_end_api_endpoints_mocked(self):
        """Tests full pipeline orchestrator execution and endpoint route functions directly."""
        mock_bg_tasks = MagicMock()
        
        # 1. Trigger job through main route handler
        trigger_res = trigger_scrape(
            target="Code Repos", 
            background_tasks=mock_bg_tasks, 
            inject_errors=True
        )
        self.assertEqual(trigger_res["status"], "triggered")
        job_id = trigger_res["job_id"]
        mock_bg_tasks.add_task.assert_called_once()
        
        # 2. Run the background pipeline synchronously in test loop
        pipeline_res = self.loop.run_until_complete(
            run_pipeline(job_id, "Code Repos", inject_errors=True)
        )
        self.assertEqual(pipeline_res["status"], "success")
        
        # 3. Query job state
        job_status = check_job(job_id)
        self.assertEqual(job_status["status"], "COMPLETED_HEALED")
        
        # 4. Get dataset through route handler
        dataset_res = get_dataset(job_id)
        self.assertEqual(dataset_res["status"], "COMPLETED_HEALED")
        self.assertTrue(len(dataset_res["items"]) > 0)
        self.assertTrue(dataset_res["summary"]["totalItems"] > 0)
        self.assertTrue(dataset_res["summary"]["averageScore"] > 0)

if __name__ == "__main__":
    unittest.main()
