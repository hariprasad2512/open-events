import { useState, useEffect, useMemo } from 'react';
import { fetchFixtureEvents, fetchEvents } from './lib/api.ts';
import EventCard from './components/EventCard.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import DigestPanel from './components/DigestPanel.jsx';
import TriggerPanel from './components/TriggerPanel.jsx';

export default function App() {
  const [data, setData] = useState(null);               // raw API response
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Data Source Mode: 'fixture' (200+ real scraped events) vs 'database' (live DB events)
  const [dataMode, setDataMode] = useState('fixture');

  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date' | 'price' | 'category'

  // Keyboard shortcut ⌘K or / to focus search
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('events-search')?.focus();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Load events from either fixture endpoint or live DB endpoint based on selected mode
  async function loadEvents(mode = dataMode) {
    setLoading(true);
    setError(null);
    try {
      let res;
      if (mode === 'database') {
        res = await fetchEvents({ limit: 300 });
      } else {
        res = await fetchFixtureEvents({ limit: 300 });
      }
      setData(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents(dataMode);
  }, [dataMode]);

  // Client-side filtering and search on top of the dataset
  const filteredEvents = useMemo(() => {
    if (!data?.events) return [];
    let events = [...data.events];

    // Category filter
    if (activeCategory) {
      events = events.filter(e => e.category === activeCategory);
    }

    // Search filter — title, venue, area, description, category
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

  // Digest stats
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

  // Callback when a scrape run finishes in TriggerPanel
  function handleScrapeFinished() {
    setDataMode('database');
    loadEvents('database');
  }

  return (
    <div className="app-wrapper">
      {/* ── Header ── */}
      <header className="header">
        <div className="header-inner">
          <a className="header-logo" href="/" aria-label="Scrapeverse home">
            <div className="logo-icon">🌐</div>
            <span className="logo-text">Scrapeverse</span>
          </a>

          {/* Mode Switcher */}
          <div className="mode-switcher">
            <button
              onClick={() => setDataMode('fixture')}
              className={`mode-btn ${dataMode === 'fixture' ? 'active' : ''}`}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: dataMode === 'fixture' ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))' : 'transparent',
                color: dataMode === 'fixture' ? '#fff' : 'var(--text-secondary)'
              }}
            >
              📊 Real Scraped Fixture (200 events)
            </button>
            <button
              onClick={() => setDataMode('database')}
              className={`mode-btn ${dataMode === 'database' ? 'active' : ''}`}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: dataMode === 'database' ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))' : 'transparent',
                color: dataMode === 'database' ? '#fff' : 'var(--text-secondary)'
              }}
            >
              🗄️ Live Pipeline DB
            </button>
          </div>

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
            <span>✦</span> City Leisure Intelligence · Bright Data Scraper Studio
          </div>
          <h1 className="hero-title">
            Discover <span>Hyderabad</span><br />This Week
          </h1>
          <p className="hero-subtitle">
            Music concerts, theatre plays, workshops, tech meetups, sports &amp; food aggregated across FullHyd, HighApe, and AroundU, normalized into a single weekly digest.
          </p>

          {/* Stats Bar */}
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

        {/* Category Filter Tabs */}
        <CategoryFilter
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        {/* Search + Sort Controls */}
        <div className="controls-row">
          <div className="search-wrapper">
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              id="events-search"
              className="search-input"
              type="search"
              placeholder="Search events, venues, neighborhood areas (Press ⌘K)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search events"
            />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px' }}>⌘K</span>
          </div>
          <select
            className="sort-select"
            id="events-sort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            aria-label="Sort events"
          >
            <option value="date">Sort: Date</option>
            <option value="price">Sort: Price (Low → High)</option>
            <option value="category">Sort: Category</option>
          </select>
        </div>

        {/* Results Header */}
        {!loading && !error && (
          <div className="results-header">
            <p className="results-count">
              Showing <strong>{filteredEvents.length}</strong>
              {activeCategory ? ` "${activeCategory}"` : ''} events
              {searchQuery ? ` matching "${searchQuery}"` : ''}
              <span style={{ opacity: 0.6, marginLeft: '8px', fontSize: '0.8rem' }}>
                ({dataMode === 'fixture' ? 'Mode: Real Scraped Fixture' : 'Mode: Live Pipeline Database'})
              </span>
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="loading-state" role="status" aria-live="polite">
            <div className="spinner" />
            <p className="loading-text">Loading Hyderabad city events…</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="error-state" role="alert">
            <div className="error-icon">⚠️</div>
            <h2 className="error-title">Could not load events</h2>
            <p className="error-message">
              {error}. Make sure the backend server is running on <code>localhost:8000</code>.
            </p>
            <button className="retry-btn" id="retry-btn" onClick={() => loadEvents(dataMode)}>
              ↺ Retry
            </button>
          </div>
        )}

        {/* Events Grid */}
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

        {/* Empty State */}
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🎭</div>
            <p className="empty-text">
              No events found{activeCategory ? ` in "${activeCategory}"` : ''}.
              {searchQuery ? ' Try a different search term.' : ' Select another category.'}
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

        {/* Scrape Trigger Command Panel */}
        <TriggerPanel onTriggered={handleScrapeFinished} />

      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <p>
          © 2026 Scrapeverse · City Leisure Events Aggregator ·{' '}
          <a href="https://brightdata.com" target="_blank" rel="noopener noreferrer">
            Powered by Bright Data Scraper Studio
          </a>{' '}
          · Hyderabad Pilot
        </p>
      </footer>
    </div>
  );
}
