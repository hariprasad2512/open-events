# Bright Data Setup Guide

To configure the real Bright Data Scraper Studio & Proxy Network:

1. **Get an Account**: Sign up on [Bright Data](https://brightdata.com).
2. **Setup Scraper Studio**: Create a new Web Scraper in the Scraper Studio dashboard and copy the Scraper ID (`c_xxxxxxxx`).
3. **Environment Setup**: In `.env`, configure:
   - `BRIGHT_DATA_API_KEY`: API access key.
   - `BRIGHT_DATA_ZONE`: Proxies zone.
   - `BRIGHT_DATA_SCRAPER_ID`: Scraper ID copy.
