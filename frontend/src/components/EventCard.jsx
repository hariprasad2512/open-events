import React from 'react';
import { formatDate, formatPrice, getCategoryMeta } from '../lib/constants.js';
import { CalendarIcon, LocationIcon, TicketIcon, SourceIcon, BookmarkIcon, CategoryGlyph } from './Icons.jsx';

export default function EventCard({
  event,
  onClick,
  isSaved = false,
  onToggleSave
}) {
  if (!event) return null;

  const {
    title = 'Untitled Event',
    category = 'Music',
    date,
    time,
    venue = 'Hyderabad Venue',
    area = 'Hyderabad',
    price,
    description,
    sources = [],
    image
  } = event;

  const meta = getCategoryMeta(category);
  const displayPrice = formatPrice(price);
  const isFree = displayPrice.toLowerCase().includes('free');
  const primarySource = sources[0] || {};
  const cardImage = image || meta.fallbackImage;

  // Clean locality extraction
  const cleanArea = area ? area.split(',')[0].trim() : 'Hyderabad';

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    if (onToggleSave) onToggleSave(event);
  };

  return (
    <article
      className="sv-card group"
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Event: ${title}`}
    >
      {/* Media Header */}
      <div className="sv-card-media">
        <img
          src={cardImage}
          alt={title}
          className="sv-card-img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = meta.fallbackImage;
          }}
        />
        <div className="sv-card-media-overlay" />

        {/* Top Badges Bar */}
        <div className="sv-card-badges-top">
          <span
            className="sv-category-badge"
            style={{
              borderColor: meta.border,
              backgroundColor: 'rgba(18, 22, 21, 0.82)',
              color: '#FFFFFF'
            }}
          >
            <span className="badge-glyph-wrap" style={{ color: meta.color }}>
              <CategoryGlyph category={category} className="w-3.5 h-3.5" />
            </span>
            <span className="badge-category-text">{category}</span>
          </span>

          <button
            type="button"
            className={`sv-bookmark-btn ${isSaved ? 'active' : ''}`}
            onClick={handleBookmarkClick}
            aria-label={isSaved ? 'Remove from saved constellation' : 'Save to constellation'}
            title={isSaved ? 'Saved in My Week' : 'Save to My Week'}
          >
            <BookmarkIcon className="w-3.5 h-3.5" filled={isSaved} />
          </button>
        </div>

        {/* Source Verified Badge */}
        {primarySource.site_name && (
          <div className="sv-card-source-bottom">
            <span className="sv-source-chip">
              <SourceIcon className="w-3 h-3 text-jade" />
              <span>{primarySource.site_name}</span>
            </span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="sv-card-body">
        <div className="sv-card-meta-row">
          <div className="sv-card-date">
            <CalendarIcon className="w-3.5 h-3.5 text-saffron" />
            <span>{formatDate(date)}{time && time !== 'Evening' ? ` · ${time}` : ''}</span>
          </div>
        </div>

        <h3 className="sv-card-title" title={title}>
          {title}
        </h3>

        {description && (
          <p className="sv-card-desc">
            {description}
          </p>
        )}

        <div className="sv-card-venue">
          <LocationIcon className="w-3.5 h-3.5 text-muted" />
          <span className="truncate">{venue} · <span className="text-secondary">{cleanArea}</span></span>
        </div>

        {/* Multi-source indicator */}
        {sources.length > 1 && (
          <div className="sv-card-multisource">
            <span>+ verified across {sources.length} crawled feeds</span>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="sv-card-footer">
        <span className={`sv-price-pill ${isFree ? 'price-free' : 'price-paid'}`}>
          <TicketIcon className="w-3 h-3 opacity-80" />
          <span>{displayPrice}</span>
        </span>

        <span className="sv-card-cta">
          <span>Inspect</span>
          <span className="sv-cta-arrow-icon">→</span>
        </span>
      </div>
    </article>
  );
}
