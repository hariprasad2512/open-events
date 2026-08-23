import React, { useState, useMemo } from 'react';
import EventCard from '../components/EventCard.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import {
  SearchIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
  LocationIcon,
  CalendarIcon,
  TicketIcon,
  CloseIcon,
  CategoryGlyph
} from '../components/Icons.jsx';
import { HYDERABAD_LOCALITIES, formatDate, formatPrice, getCategoryMeta } from '../lib/constants.js';

export default function DiscoverPage({
  events = [],
  activeCategory = null,
  onSelectCategory,
  search = '',
  onSearchChange,
  sortBy = 'date',
  onSortChange,
  onSelectEvent,
  savedEvents = [],
  onToggleSave
}) {
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [priceFilter, setPriceFilter] = useState('all'); // 'all' | 'free' | 'paid'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: events.length };
    events.forEach((e) => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return counts;
  }, [events]);

  // Filtered & Sorted events
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Category
    if (activeCategory && activeCategory !== 'All') {
      result = result.filter((e) => e.category === activeCategory);
    }

    // Locality
    if (selectedArea && selectedArea !== 'All Areas') {
      result = result.filter((e) =>
        (e.area || '').toLowerCase().includes(selectedArea.toLowerCase()) ||
        (e.venue || '').toLowerCase().includes(selectedArea.toLowerCase())
      );
    }

    // Price
    if (priceFilter === 'free') {
      result = result.filter((e) => {
        const p = String(e.price || '').toLowerCase();
        return p.includes('free') || p === '0' || p === '';
      });
    } else if (priceFilter === 'paid') {
      result = result.filter((e) => {
        const p = String(e.price || '').toLowerCase();
        return !p.includes('free') && p !== '0' && p !== '';
      });
    }

    // Search Query
    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter((e) =>
        [e.title, e.venue, e.area, e.category, e.description].some((field) =>
          String(field || '').toLowerCase().includes(q)
        )
      );
    }

    // Sort
    if (sortBy === 'date') {
      result.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    } else if (sortBy === 'price') {
      const getNum = (v) => parseFloat(String(v || '').replace(/[^0-9.]/g, '')) || 0;
      result.sort((a, b) => getNum(a.price) - getNum(b.price));
    } else if (sortBy === 'category') {
      result.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
    }

    return result;
  }, [events, activeCategory, selectedArea, priceFilter, search, sortBy]);

  const handleResetFilters = () => {
    onSelectCategory(null);
    onSearchChange('');
    setSelectedArea('All Areas');
    setPriceFilter('all');
  };

  return (
    <div className="sv-discover-page">
      {/* Editorial Header */}
      <section className="sv-page-header">
        <div className="sv-header-kicker font-mono">
          <span className="sv-badge-tag">[CURATED INDEX]</span>
          <span className="sv-meta-count">{filteredEvents.length} DISCOVERED SIGNALS</span>
        </div>

        <h1 className="sv-page-title font-serif">The Cultural Gallery Wall.</h1>
        <p className="sv-page-desc">
          An organized gallery of independent gigs, clay pottery workshops, comedy cellars, theatre plays, and founder talks across Hyderabad.
        </p>

        {/* Toolbar: Search + Area + Price + Sort + View */}
        <div className="sv-discover-toolbar">
          {/* Search Input Bar */}
          <div className="sv-search-box">
            <SearchIcon className="w-4 h-4 text-saffron opacity-80" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by artist, venue, area, or topic..."
              className="sv-search-input"
              aria-label="Search events"
            />
            {search && (
              <button
                type="button"
                className="sv-search-clear-btn"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
              >
                <CloseIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Area / Locality Selector */}
          <div className="sv-filter-select-wrap">
            <LocationIcon className="w-4 h-4 text-muted inline mr-1.5" />
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="sv-filter-select font-mono"
              aria-label="Filter by locality"
            >
              {HYDERABAD_LOCALITIES.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          {/* Price Selector */}
          <div className="sv-price-toggles font-mono">
            <button
              type="button"
              className={`sv-price-toggle-btn ${priceFilter === 'all' ? 'active' : ''}`}
              onClick={() => setPriceFilter('all')}
            >
              All Tiers
            </button>
            <button
              type="button"
              className={`sv-price-toggle-btn ${priceFilter === 'free' ? 'active' : ''}`}
              onClick={() => setPriceFilter('free')}
            >
              Free Entry
            </button>
            <button
              type="button"
              className={`sv-price-toggle-btn ${priceFilter === 'paid' ? 'active' : ''}`}
              onClick={() => setPriceFilter('paid')}
            >
              Paid Passes
            </button>
          </div>

          {/* Sort Selector */}
          <div className="sv-filter-select-wrap">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="sv-filter-select font-mono"
              aria-label="Sort events"
            >
              <option value="date">Soonest First</option>
              <option value="price">Lowest Price</option>
              <option value="category">By Category</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="sv-view-mode-toggle">
            <button
              type="button"
              className={`sv-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              title="Masonry Grid View"
            >
              <GridIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              className={`sv-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
              title="Compact List View"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <CategoryFilter
          activeCategory={activeCategory}
          onChange={onSelectCategory}
          counts={categoryCounts}
        />
      </section>

      {/* Events Presentation Area */}
      <section className="sv-events-container">
        {filteredEvents.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="sv-event-card-grid">
              {filteredEvents.map((evt) => (
                <EventCard
                  key={evt.event_id}
                  event={evt}
                  onClick={() => onSelectEvent(evt)}
                  isSaved={savedEvents.some((s) => s.event_id === evt.event_id)}
                  onToggleSave={onToggleSave}
                />
              ))}
            </div>
          ) : (
            <div className="sv-compact-list">
              {filteredEvents.map((evt) => {
                const meta = getCategoryMeta(evt.category);
                const cleanArea = evt.area ? evt.area.split(',')[0].trim() : 'Hyderabad';

                return (
                  <article
                    key={evt.event_id}
                    className="sv-compact-row"
                    onClick={() => onSelectEvent(evt)}
                  >
                    <div className="sv-compact-left">
                      <span
                        className="sv-compact-symbol"
                        style={{
                          backgroundColor: meta.bg,
                          color: meta.color,
                          borderColor: meta.border
                        }}
                      >
                        <CategoryGlyph category={evt.category} className="w-4 h-4" />
                      </span>
                      <div className="sv-compact-titles">
                        <h3 className="sv-compact-title font-serif">{evt.title}</h3>
                        <p className="sv-compact-meta font-mono">
                          <span>{evt.category}</span>
                          <span>·</span>
                          <span>{evt.venue} ({cleanArea})</span>
                        </p>
                      </div>
                    </div>

                    <div className="sv-compact-right">
                      <div className="sv-compact-schedule font-mono">
                        <CalendarIcon className="w-3.5 h-3.5 text-saffron inline mr-1" />
                        <span>{formatDate(evt.date)}{evt.time ? ` · ${evt.time}` : ''}</span>
                      </div>

                      <span className="sv-price-pill font-mono">
                        {formatPrice(evt.price)}
                      </span>

                      <button
                        type="button"
                        className="sv-compact-inspect-btn font-mono"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEvent(evt);
                        }}
                      >
                        Inspect →
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )
        ) : (
          <div className="sv-empty-box">
            <FilterIcon className="w-10 h-10 text-saffron opacity-60 mb-3" />
            <h3 className="sv-empty-title font-serif">No cultural signals match your filter criteria.</h3>
            <p className="sv-empty-desc">
              Try clearing search terms or selecting another category orbit or locality sector.
            </p>
            <button
              type="button"
              className="sv-primary-btn mt-4"
              onClick={handleResetFilters}
            >
              <span>Reset All Filters</span>
              <span className="ml-1">↻</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
