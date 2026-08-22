/**
 * Centralized API fetch wrapper for Scrapeverse frontend.
 * All backend calls go through here — do not call backend directly from components.
 *
 * Base URL reads from Vite env (VITE_API_URL) or falls back to localhost:8000.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) {
    const detail = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(detail.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

/**
 * GET /health
 */
export async function fetchHealth() {
  return apiFetch('/health');
}

/**
 * GET /events/fixture
 * Loads and normalizes the real scraped fixture data for UI development.
 * @param {object} params - { category, area, limit }
 */
export async function fetchFixtureEvents({ category, area, limit = 200 } = {}) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (area)     params.set('area', area);
  if (limit)    params.set('limit', String(limit));
  const qs = params.toString() ? `?${params.toString()}` : '';
  return apiFetch(`/events/fixture${qs}`);
}

/**
 * GET /events
 * Loads events from the live database (post-scrape).
 * @param {object} params - { category, area, limit }
 */
export async function fetchEvents({ category, area, limit = 100 } = {}) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (area)     params.set('area', area);
  if (limit)    params.set('limit', String(limit));
  const qs = params.toString() ? `?${params.toString()}` : '';
  return apiFetch(`/events${qs}`);
}

/**
 * GET /events/digest
 */
export async function fetchDigest() {
  return apiFetch('/events/digest');
}

/**
 * GET /events/categories
 */
export async function fetchCategories() {
  return apiFetch('/events/categories');
}

/**
 * GET /events/:event_id
 */
export async function fetchEventById(eventId) {
  return apiFetch(`/events/${eventId}`);
}

/**
 * POST /dca/trigger
 * Triggers a background scrape run.
 * @param {string} target - "FullHyd" | "HydHub" | "AroundU"
 * @param {boolean} injectErrors - Whether to inject validation errors for demo
 */
export async function triggerScrape(target = 'FullHyd', injectErrors = false) {
  const params = new URLSearchParams({ target, inject_errors: String(injectErrors) });
  return apiFetch(`/dca/trigger?${params.toString()}`, { method: 'POST' });
}
