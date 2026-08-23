import React, { useEffect, useRef, useState } from 'react';
import { SearchIcon, CloseIcon, LocationIcon, CalendarIcon, TicketIcon, CategoryGlyph } from './Icons.jsx';
import { getCategoryMeta, formatDate, formatPrice, ALL_CATEGORIES } from '../lib/constants.js';

export default function SearchModal({
  isOpen,
  onClose,
  events = [],
  onSelectEvent
}) {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setCategoryFilter(null);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filter events
  const filteredEvents = events.filter((evt) => {
    const matchesCat = !categoryFilter || evt.category === categoryFilter;
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || (
      (evt.title && evt.title.toLowerCase().includes(q)) ||
      (evt.venue && evt.venue.toLowerCase().includes(q)) ||
      (evt.area && evt.area.toLowerCase().includes(q)) ||
      (evt.category && evt.category.toLowerCase().includes(q)) ||
      (evt.description && evt.description.toLowerCase().includes(q))
    );
    return matchesCat && matchesQuery;
  }).slice(0, 8);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(filteredEvents.length, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredEvents.length) % Math.max(filteredEvents.length, 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredEvents[selectedIndex]) {
          onSelectEvent(filteredEvents[selectedIndex]);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredEvents, selectedIndex, onClose, onSelectEvent]);

  if (!isOpen) return null;

  return (
    <div className="sv-modal-backdrop" onClick={onClose}>
      <div
        className="sv-search-palette"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search Events"
      >
        {/* Search Input Header */}
        <div className="sv-palette-header">
          <SearchIcon className="w-5 h-5 text-saffron opacity-90" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search events, artists, venues, localities across Hyderabad..."
            className="sv-palette-input"
            aria-label="Search events input"
          />
          {query && (
            <button
              type="button"
              className="sv-palette-clear"
              onClick={() => setQuery('')}
              aria-label="Clear query"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          )}
          <kbd className="sv-palette-esc-badge" onClick={onClose}>ESC</kbd>
        </div>

        {/* Quick Category Filter Pills */}
        <div className="sv-palette-chips">
          <button
            type="button"
            className={`sv-palette-chip ${categoryFilter === null ? 'active' : ''}`}
            onClick={() => {
              setCategoryFilter(null);
              setSelectedIndex(0);
            }}
          >
            <span>All Categories</span>
          </button>
          {ALL_CATEGORIES.slice(0, 6).map((cat) => {
            const meta = getCategoryMeta(cat);
            const isActive = categoryFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                className={`sv-palette-chip ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setCategoryFilter(isActive ? null : cat);
                  setSelectedIndex(0);
                }}
              >
                <span className="sv-palette-chip-icon" style={{ color: isActive ? '#FFFFFF' : meta.color }}>
                  <CategoryGlyph category={cat} className="w-3.5 h-3.5" />
                </span>
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Search Results List */}
        <div className="sv-palette-results">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((evt, idx) => {
              const meta = getCategoryMeta(evt.category);
              const isSelected = idx === selectedIndex;
              const cleanArea = evt.area ? evt.area.split(',')[0].trim() : 'Hyderabad';

              return (
                <div
                  key={evt.event_id || idx}
                  className={`sv-palette-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    onSelectEvent(evt);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="sv-palette-item-left">
                    <span
                      className="sv-palette-item-symbol"
                      style={{
                        backgroundColor: meta.bg,
                        color: meta.color,
                        borderColor: meta.border
                      }}
                    >
                      <CategoryGlyph category={evt.category} className="w-4 h-4" />
                    </span>
                    <div className="sv-palette-item-info">
                      <div className="sv-palette-item-title-row">
                        <span className="sv-palette-item-title font-serif">{evt.title}</span>
                        <span className="sv-palette-item-category font-mono">{evt.category}</span>
                      </div>
                      <div className="sv-palette-item-meta font-mono">
                        <span className="inline-flex items-center gap-1">
                          <LocationIcon className="w-3 h-3 text-muted" />
                          {evt.venue} ({cleanArea})
                        </span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3 text-saffron" />
                          {formatDate(evt.date)}
                        </span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1">
                          <TicketIcon className="w-3 h-3 text-jade" />
                          {formatPrice(evt.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="sv-palette-item-action font-mono">
                    <span>Inspect ↵</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="sv-palette-empty">
              <p className="sv-palette-empty-title font-serif">No signals match "{query}"</p>
              <p className="sv-palette-empty-desc">Try searching for generic terms like "Music", "Comedy", "Lamakaan", or "Jubilee Hills".</p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="sv-palette-footer font-mono">
          <div className="sv-palette-shortcuts">
            <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
            <span><kbd>↵</kbd> select</span>
            <span><kbd>esc</kbd> close</span>
          </div>
          <div className="sv-palette-count">
            {filteredEvents.length} signals discovered
          </div>
        </div>
      </div>
    </div>
  );
}
