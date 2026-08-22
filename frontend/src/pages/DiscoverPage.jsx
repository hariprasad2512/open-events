import React from 'react';
import EventCard from '../components/EventCard.jsx';
import { SearchIcon, FilterIcon, GridIcon } from '../components/Icons.jsx';

export default function DiscoverPage({
  events = [],
  categories = [],
  selectedCategory = 'All',
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
  onSelectEvent
}) {
  const filteredEvents = events.filter((evt) => {
    const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q ||
      (evt.title && evt.title.toLowerCase().includes(q)) ||
      (evt.venue && evt.venue.toLowerCase().includes(q)) ||
      (evt.area && evt.area.toLowerCase().includes(q)) ||
      (evt.description && evt.description.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="discover-page-container">
      {/* Editorial Header */}
      <section className="discover-header-hero">
        <div className="header-kicker">
          <span className="statement-badge">[CURATED INDEX]</span>
          <span className="kicker-meta">{filteredEvents.length} DISCOVERED SIGNALS</span>
        </div>

        <h1 className="discover-title">
          The Cultural Gallery Wall.
        </h1>

        <p className="discover-subtitle">
          An asymmetrical masonry collage of independent gigs, clay workshops, comedy cellars, theatre plays, and founder talks across Hyderabad.
        </p>

        {/* Filter & Search Bar */}
        <div className="discover-filter-bar">
          <div className="search-input-wrapper">
            <SearchIcon className="search-icon w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by artist, venue, area, or topic..."
              className="discover-search-input"
            />
          </div>

          {/* Category Rail */}
          <div className="category-rail-scroll">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className={`category-pill-btn ${selectedCategory === cat.name ? 'active' : ''}`}
              >
                <span className="category-symbol">{cat.symbol}</span>
                <span className="category-name">{cat.name}</span>
                <span className="category-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Asymmetrical Masonry Gallery Wall Grid */}
      <section className="discover-gallery-wall">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((evt, idx) => (
            <div
              key={evt.event_id || idx}
              className={`gallery-item-wrapper ${idx % 7 === 0 ? 'size-large' : idx % 5 === 0 ? 'size-tall' : 'size-standard'}`}
            >
              <EventCard event={evt} onClick={() => onSelectEvent(evt)} />
            </div>
          ))
        ) : (
          <div className="no-results-box">
            <FilterIcon className="w-8 h-8 text-gold-accent opacity-50 mb-3" />
            <h3>No cultural signals match your filter query.</h3>
            <p>Try clearing your search terms or selecting another category orbit.</p>
            <button
              onClick={() => {
                onSelectCategory('All');
                onSearchChange('');
              }}
              className="clear-filters-btn"
            >
              Clear Filters →
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
