import { useState, useEffect, useMemo } from 'react';
import { fetchFixtureEvents } from './lib/api.ts';
import EventCard from './components/EventCard.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import DigestPanel from './components/DigestPanel.jsx';
import TriggerPanel from './components/TriggerPanel.jsx';

export default function App() {
  const [data, setData] = useState(null);      // raw API response
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date' | 'price' | 'category'

  // Load events from fixture endpoint on mount
  async function loadEvents() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchFixtureEvents({ limit: 300 });
      setData(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  // Client-side filtering and search on top of the full dataset
  const filteredEvents = useMemo(() => {
    if (!data?.events) return [];
    let events = [...data.events];

    // Category filter
    if (activeCategory) {
      events = events.filter(e => e.category === activeCategory);
    }

    // Search filter — title, venue, area, description
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      events = events.filter(e =>
        (e.title || '').toLowerCase().includes(q) ||
        (e.venue || '').toLowerCase().includes(q) ||
        (e.area || '').toLowerCase().includes(q) ||
        (e.description || '').toLowerCase().includes(q) ||
        (e.category || '').toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'date') {
      events.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    } else if (sortBy === 'price') {
      // Free events first, then by numeric price ascending
      events.sort((a, b) => {
        const priceA = parseFloat(String(a.price).replace(/[^0-9.]/g, '')) || 0;
        const priceB = parseFloat(String(b.price).replace(/[^0-9.]/g, '')) || 0;
        return priceA - priceB;
      });
    } else if (sortBy === 'category') {
      events.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
    }

    return events;
  }, [data, activeCategory, searchQuery, sortBy]);

  // Digest stats (recompute on filter for live-feel)
  const digestStats = useMemo(() => {
    if (!data) return null;
    return {
      total: filteredEvents.length,
      unique_venues: new Set(filteredEvents.map(e => e.venue).filter(Boolean)).size,
    };
  }, [filteredEvents, data]);

  const categoryBreakdown = useMemo(() => {
    if (!filteredEvents.length) return data?.category_breakdown || {};
    const counts = {};
    filteredEvents.forEach(e => {
      const c = e.category || 'Talks & Meetups';
      counts[c] = (counts[c] || 0) + 1;
    });
    return counts;
  }, [filteredEvents, data]);

  return (
    <div className="app-wrapper">
      {/* ── Header ── */}
      <header className="header">
        <div className="header-inner">
          <a className="header-logo" href="/" aria-label="Scrapeverse home">
            <div className="logo-icon">🌐</div>
            <span className="logo-text">Scrapeverse</span>
          </a>
          <div className="header-city-badge">
            <span className="city-dot" />
            Hyderabad · This Week
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="main-content">

        {/* Hero */}
        <section className="hero">
          <div className="hero-kicker">
            <span>✦</span> Live City Events · Powered by Bright Data
          </div>
          <h1 className="hero-title">
            Discover <span>Hyderabad</span><br />This Week
          </h1>
          <p className="hero-subtitle">
            Music, theatre, workshops, talks, food &amp; more — aggregated from multiple sources,
            de-duplicated, and served fresh.
          </p>

          {/* Stats bar */}
          {data && (
            <div className="stats-bar">
              <div className="stat-item">
                <div className="stat-value">{data.total ?? '—'}</div>
                <div className="stat-label">Events</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{data.unique_venues ?? '—'}</div>
                <div className="stat-label">Venues</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">3</div>
                <div className="stat-label">Sources</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">9</div>
                <div className="stat-label">Categories</div>
              </div>
            </div>
          )}
        </section>

        {/* Category filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        {/* Search + sort controls */}
        <div className="controls-row">
          <div className="search-wrapper">
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              id="events-search"
              className="search-input"
              type="search"
              placeholder="Search events, venues, areas…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search events"
            />
          </div>
          <select
            className="sort-select"
            id="events-sort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            aria-label="Sort events"
          >
            <option value="date">Sort: Date</option>
            <option value="price">Sort: Price (low → high)</option>
            <option value="category">Sort: Category</option>
          </select>
        </div>

        {/* Results header */}
        {!loading && !error && (
          <div className="results-header">
            <p className="results-count">
              Showing <strong>{filteredEvents.length}</strong>
              {activeCategory ? ` "${activeCategory}"` : ''} events
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="loading-state" role="status" aria-live="polite">
            <div className="spinner" />
            <p className="loading-text">Loading Hyderabad events…</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="error-state" role="alert">
            <div className="error-icon">⚠️</div>
            <h2 className="error-title">Could not load events</h2>
            <p className="error-message">
              {error}. Make sure the backend is running on <code>localhost:8000</code>.
            </p>
            <button className="retry-btn" id="retry-btn" onClick={loadEvents}>
              ↺ Retry
            </button>
          </div>
        )}

        {/* Events grid */}
        {!loading && !error && filteredEvents.length > 0 && (
          <div
            className="events-grid"
            role="list"
            aria-label="Events list"
          >
            {filteredEvents.map(event => (
              <div role="listitem" key={event.event_id}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🎭</div>
            <p className="empty-text">
              No events found{activeCategory ? ` in "${activeCategory}"` : ''}.
              {searchQuery ? ' Try a different search.' : ' Try another category.'}
            </p>
          </div>
        )}

        {/* Digest Panel */}
        {!loading && !error && data && (
          <DigestPanel
            stats={digestStats}
            categoryBreakdown={categoryBreakdown}
          />
        )}

        {/* Scrape Trigger Panel */}
        <TriggerPanel onTriggered={() => {}} />

      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <p>
          © 2026 Scrapeverse · City Leisure Events Aggregator ·{' '}
          <a href="https://brightdata.com" target="_blank" rel="noopener noreferrer">
            Powered by Bright Data
          </a>{' '}
          · Hyderabad Pilot
        </p>
      </footer>
    </div>
  );
}
