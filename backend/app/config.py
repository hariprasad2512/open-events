import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

# Backend API configuration
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("API_PORT", 8000))

# Bright Data Configuration
BRIGHT_DATA_API_KEY = os.getenv("BRIGHT_DATA_API_KEY", "")
BRIGHT_DATA_ZONE = os.getenv("BRIGHT_DATA_ZONE", "")
BRIGHT_DATA_SCRAPER_ID = os.getenv("BRIGHT_DATA_SCRAPER_ID", "c_9f81a7b4")

# Database Configuration
DATABASE_URL = os.getenv("DATABASE_URL", "")
# Default fallback to local SQLite DB path
if not DATABASE_URL:
    db_dir = os.path.dirname(os.path.abspath(__file__))
    DB_PATH = os.path.join(db_dir, "pipeline.db")
else:
    # If DATABASE_URL starts with sqlite:///, clean it to get the path
    if DATABASE_URL.startswith("sqlite:///"):
        DB_PATH = DATABASE_URL.replace("sqlite:///", "")
    else:
        DB_PATH = DATABASE_URL

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
