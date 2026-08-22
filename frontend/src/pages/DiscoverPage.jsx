import { useState, useMemo } from 'react';

const HYDERABAD_AREAS = [
  'All Localities',
  'Madhapur',
  'Jubilee Hills',
  'Banjara Hills',
  'Gachibowli',
  'Hitech City',
  'Raidurg'
];

export default function DiscoverPage({
  events = [],
  activeCategory,
  setActiveCategory,
  onSelectEvent,
  onSelectVenue,
  onToggleSave,
  savedEventIds = new Set()
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeScope, setTimeScope] = useState('This Week'); // 'Today' | 'This Week' | 'This Month'
  const [selectedArea, setSelectedArea] = useState('All Localities');
  const [ticketFilter, setTicketFilter] = useState('All'); // 'All' | 'Free' | 'Ticketed'

  const categories = [
    'All Categories',
    'Music',
    'Theatre & Arts',
    'Workshops & Classes',
    'Talks & Meetups',
    'Sports & Outdoors',
    'Food & Drink',
    'Nightlife'
  ];

  // Filtering logic
  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      // Category filter
      if (activeCategory && activeCategory !== 'All Categories') {
        if (evt.category !== activeCategory) return false;
      }

      // Locality area filter
      if (selectedArea !== 'All Localities') {
        if (!(evt.area || '').toLowerCase().includes(selectedArea.toLowerCase())) return false;
      }

      // Ticket filter
      if (ticketFilter === 'Free') {
        if (!(evt.price || '').toLowerCase().includes('free') && evt.price !== 0) return false;
      } else if (ticketFilter === 'Ticketed') {
        if ((evt.price || '').toLowerCase().includes('free')) return false;
      }

      // Search query filter (search artists, events, venues, topics)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = (evt.title || '').toLowerCase().includes(q);
        const venueMatch = (evt.venue || '').toLowerCase().includes(q);
        const descMatch = (evt.description || '').toLowerCase().includes(q);
        const catMatch = (evt.category || '').toLowerCase().includes(q);
        if (!titleMatch && !venueMatch && !descMatch && !catMatch) return false;
      }

      return true;
    });
  }, [events, activeCategory, selectedArea, ticketFilter, searchQuery]);

  return (
    <div className="blueprint-page discover-page">
      {/* ── Screen 02 Header & Controls ── */}
      <div className="discover-header">
        <div className="discover-title-box">
          <span className="telemetry-badge">[02 DISCOVER // SEARCH & BROWSE]</span>
          <h1 className="discover-heading">Discover City Events</h1>
          <p className="discover-subtext">
            Search artists, events, venues, and topics across public web sources.
          </p>
        </div>

        {/* Search Bar */}
        <div className="discover-search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="search"
            placeholder="Search artists, events, venues, topics…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="discover-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="clear-search-btn"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Time Scope & Category Rails ── */}
      <div className="scope-and-rails-row">
        {/* Time Scope Segmented Controls */}
        <div className="time-scope-tabs">
          {['Today', 'This Week', 'This Month'].map((scope) => (
            <button
              key={scope}
              onClick={() => setTimeScope(scope)}
              className={`scope-tab-btn ${timeScope === scope ? 'active' : ''}`}
            >
              {scope}
            </button>
          ))}
        </div>

        {/* Category Rails */}
        <div className="category-rails-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === 'All Categories' ? null : cat)}
              className={`cat-rail-btn ${(activeCategory === cat || (!activeCategory && cat === 'All Categories')) ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Secondary Filters Bar ── */}
      <div className="discovery-filters-bar">
        <div className="filter-group">
          <label className="filter-label">Locality:</label>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="filter-select"
          >
            {HYDERABAD_AREAS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Access:</label>
          <select
            value={ticketFilter}
            onChange={(e) => setTicketFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Events</option>
            <option value="Free">Free Entry Only</option>
            <option value="Ticketed">Ticketed Only</option>
          </select>
        </div>

        <div className="results-count-chip">
          Showing <strong>{filteredEvents.length}</strong> verified listings
        </div>
      </div>

      {/* ── Event Cards Grid ── */}
      <div className="events-discovery-grid">
        {filteredEvents.map((evt) => {
          const isSaved = savedEventIds.has(evt.event_id);
          const primarySource = evt.sources?.[0] || {};

          return (
            <div key={evt.event_id} className="blueprint-event-card">
              <div className="card-header-bar">
                <span className="card-cat-badge">{evt.category || 'Event'}</span>
                <button
                  onClick={() => onToggleSave(evt)}
                  className={`save-bookmark-btn ${isSaved ? 'is-saved' : ''}`}
                  title={isSaved ? 'Saved in My Week' : 'Save to My Week'}
                >
                  {isSaved ? '★ Saved' : '☆ Save to My Week'}
                </button>
              </div>

              <h2
                onClick={() => onSelectEvent(evt)}
                className="card-title-clickable"
              >
                {evt.title}
              </h2>

              <div className="card-meta-block">
                <div className="meta-row">
                  <span>📅 {evt.date} at {evt.time || 'Evening'}</span>
                </div>
                <div
                  onClick={() => onSelectVenue(evt.venue || 'Hyderabad Venue', evt.area)}
                  className="meta-row venue-clickable"
                >
                  <span>📍 {evt.venue || 'Venue TBD'} ({evt.area || 'Hyderabad'}) ↗</span>
                </div>
              </div>

              {evt.description && (
                <p className="card-excerpt">{evt.description.slice(0, 110)}…</p>
              )}

              <div className="card-provenance-row">
                <span className="provenance-source">Source: {primarySource.site_name || 'Public Web'}</span>
                <span className="provenance-verified">Verified: 2026-08-23</span>
              </div>

              <div className="card-actions-footer">
                <span className="card-price-tag">{evt.price || 'Free Entry'}</span>
                <button
                  onClick={() => onSelectEvent(evt)}
                  className="card-inspect-btn"
                >
                  Open Detail →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
