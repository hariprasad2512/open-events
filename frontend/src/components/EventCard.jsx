import React from 'react';
import { getCategoryMeta, formatDate, formatPrice } from '../lib/constants.js';
import { CalendarIcon, LocationIcon, TicketIcon, SourceIcon } from './Icons.jsx';

export default function EventCard({ event, onClick }) {
  const {
    title,
    category = 'Music',
    date,
    time,
    venue,
    area,
    price,
    description,
    sources = [],
  } = event;

  const displayPrice = formatPrice(price);
  const isFree = displayPrice === 'Free';
  const primarySource = sources[0] || {};

  // Assign category visual artwork asset & ornamental token
  const catLower = category.toLowerCase();
  let catClass = 'cat-music';
  let symbol = '✿';
  let imageAsset = '/assets/music_concert_visual.jpg';

  if (catLower.includes('art') || catLower.includes('exhibition') || catLower.includes('theatre')) {
    catClass = 'cat-art';
    symbol = '✦';
    imageAsset = '/assets/art_workshop_visual.jpg';
  } else if (catLower.includes('talk') || catLower.includes('idea') || catLower.includes('workshop') || catLower.includes('class')) {
    catClass = 'cat-talks';
    symbol = '◉';
    imageAsset = '/assets/ideas_talks_visual.jpg';
  } else if (catLower.includes('dance') || catLower.includes('nightlife')) {
    catClass = 'cat-dance';
    symbol = '⌁';
    imageAsset = '/assets/hyderabad_cultural_hero.jpg';
  } else if (catLower.includes('community') || catLower.includes('sport') || catLower.includes('family')) {
    catClass = 'cat-community';
    symbol = '◆';
    imageAsset = '/assets/hyderabad_cultural_hero.jpg';
  }

  const displayArea = area && area.length < 50 ? area.split(',')[0].trim() : (area || '').split(',')[0].trim();

  return (
    <article
      className={`collectible-artifact-card ${catClass}`}
      id={`event-${event.event_id}`}
      onClick={onClick}
    >
      {/* Top Artwork Poster Media Header */}
      <div className="artifact-media-header">
        <img
          src={imageAsset}
          alt={title}
          className="artifact-media-img"
        />
        <div className="artifact-media-overlay" />
        <div className="artifact-badge-wrap">
          <span className="artifact-symbol-tag">
            <span className="symbol-glyph">{symbol}</span>
            <span className="category-text">{category}</span>
          </span>
        </div>
        {primarySource.site_name && (
          <div className="artifact-source-wrap">
            <span className="event-source-badge">
              <SourceIcon className="w-3 h-3 inline-block mr-1 opacity-70" />
              {primarySource.site_name}
            </span>
          </div>
        )}
      </div>

      {/* Kinetic Poster Title Header */}
      <h2 className="artifact-title">{title}</h2>

      {/* Description Snippet */}
      {description && description.length > 10 && (
        <p className="event-description">{description}</p>
      )}

      {/* Meta Specs Line: Date, Time, Venue, Locality */}
      <div className="artifact-meta-specs">
        {date && (
          <div className="spec-item">
            <CalendarIcon className="spec-icon" />
            <span>{formatDate(date)} {time && time !== 'Evening' ? `· ${time}` : ''}</span>
          </div>
        )}
        {venue && (
          <div className="spec-item">
            <LocationIcon className="spec-icon" />
            <span>{venue} {displayArea ? `(${displayArea})` : ''}</span>
          </div>
        )}
      </div>

      {/* Multi-Source chips */}
      {sources.length > 1 && (
        <div className="event-sources-row">
          <span className="source-label">Also indexed on:</span>
          {sources.slice(1).map((s, i) => (
            <span key={i} className="source-chip">{s.site_name}</span>
          ))}
        </div>
      )}

      {/* Footer: Price + Inspect Action */}
      <div className="artifact-footer">
        <span className="artifact-price">
          <TicketIcon className="w-3.5 h-3.5 inline-block mr-1 opacity-80" />
          {isFree ? 'FREE ENTRY' : displayPrice}
        </span>
        <span className="artifact-inspect-btn">
          Inspect Artifact →
        </span>
      </div>
    </article>
  );
}
