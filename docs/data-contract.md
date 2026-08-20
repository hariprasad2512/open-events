# Data Contract

We ensure that all output conforms to the shape defined in `docs/mock_schema.json`.

## Schema Shape

### 1. Root Structure
- `status`: String (`ok` or status messages).
- `generatedAt`: ISO-8601 string representation of run time.
- `summary`: Object containing run statistics:
  - `totalItems`: Integer.
  - `averageScore`: Float.
- `items`: List of Scraped Items.

### 2. Item Schema
- `id`: String (UUID).
- `title`: String.
- `source`: String.
- `url`: String.
- `score`: Float (calculated intelligence value).
- `tags`: List of strings.
- `metadata`: Object:
  - `scrapedAt`: ISO-8601 string.
  - `region`: String.
