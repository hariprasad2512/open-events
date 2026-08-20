# MVP Startup Data Sources

> Defines the primary public web sources used for Startup Traction Intelligence.

---

# 1. MVP Sources Selection

To keep the MVP scope focused, the system collects signals from 3 primary sources:

### 1. Developer Activity (GitHub)
- **Metrics**: `github_stars`, `github_contributors`, `github_commits`
- **Signal Category**: `developer_activity`
- **Weight**: 35% of Traction Score
- **Purpose**: Measures developer engagement and technical velocity.

### 2. Hiring Activity (Job Boards / Careers)
- **Metrics**: `open_positions`, `engineering_roles`, `new_jobs_this_month`
- **Signal Category**: `hiring_activity`
- **Weight**: 35% of Traction Score
- **Purpose**: Indicates team expansion and business growth.

### 3. Product & News Updates (Website / News / Product Hunt)
- **Metrics**: `product_releases`, `funding_announcements`, `community_mentions`
- **Signal Category**: `product_activity` / `public_attention`
- **Weight**: 30% of Traction Score
- **Purpose**: Measures public visibility and product launch momentum.

---

# 2. Integration Rules

- Each source must provide timestamped observations.
- All scraped source data passes through the Health Validator before entering the Normalization Layer.
