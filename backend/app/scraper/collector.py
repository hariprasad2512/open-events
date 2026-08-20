import random
import uuid
from datetime import datetime
from app.config import BRIGHT_DATA_SCRAPER_ID as SCRAPER_ID

def collect_raw_dataset(target: str, inject_errors: bool = False) -> list:
    """
    Simulates Collector Control Service scraping from Bright Data Scraper Studio.
    Returns a list of raw dictionaries matching the target.
    
    If inject_errors is True, introduces schema faults (broken selectors)
    to test the Health Validator and AI Self-Healing Agent.
    """
    timestamp = datetime.utcnow().isoformat() + "Z"
    
    if "job" in target.lower() or "listing" in target.lower():
        dataset = [
            {
                "id": str(uuid.uuid4()),
                "title": "Senior AI Resident Engineer",
                "source": "Github Jobs" if not inject_errors else None, # Error: missing source
                "url": "https://github.com/careers/ai-resident",
                "tags": ["AI", "LLM", "Python"],
                "metadata": {
                    "scrapedAt": timestamp,
                    "region": "US-West"
                }
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Machine Learning Platform Engineer",
                "source": "LinkedIn Jobs",
                "url": "https://linkedin.com/jobs/view/ml-platform",
                "tags": ["MLOps", "Kubernetes", "PyTorch"],
                "metadata": {
                    "scrapedAt": timestamp,
                    "region": "EU-Central"
                }
            }
        ]
    elif "repo" in target.lower() or "code" in target.lower():
        dataset = [
            {
                "id": str(uuid.uuid4()),
                "title": "TensorFlow Core Repository",
                "source": "GitHub Repos",
                "url": "https://github.com/tensorflow/tensorflow",
                # Error: tags might be missing/null if inject_errors is True
                "tags": None if inject_errors else ["Open-Source", "Framework", "C++"],
                "metadata": {
                    "scrapedAt": timestamp,
                    "region": "Global"
                }
            },
            {
                "id": str(uuid.uuid4()),
                "title": "FastAPI Web Framework",
                "source": "GitHub Repos",
                "url": "https://github.com/fastapi/fastapi",
                "tags": ["FastAPI", "Python", "ASGI"],
                "metadata": {
                    "scrapedAt": timestamp,
                    "region": "Global"
                }
            }
        ]
    else:  # News / Competitors / default
        dataset = [
            {
                "id": str(uuid.uuid4()),
                "title": "The Rise of Agentic AI Coding Assistants in 2026",
                "source": "TechCrunch",
                "url": "https://techcrunch.com/agentic-ai-2026",
                "tags": ["AI", "Industry", "Startup"],
                "metadata": {
                    "scrapedAt": timestamp,
                    "region": "US-East"
                }
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Quantum Computing Milestones Reached",
                "source": "MIT Tech Review" if not inject_errors else "MIT_Tech_Review_Broken_Selector", # selector glitch
                "url": "https://technologyreview.com/quantum-milestones",
                "tags": ["Quantum", "Physics", "Research"],
                "metadata": {
                    "scrapedAt": timestamp,
                    "region": "Global"
                }
            }
        ]
        
    return dataset
