import React from 'react';
import { CalendarIcon, LocationIcon, TicketIcon, SourceIcon, DatabaseIcon } from '../components/Icons.jsx';

export default function EventDetailPage({
  event,
  onBack,
  isSaved = false,
  onToggleSave
}) {
  if (!event) return null;

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
    scraped_at
  } = event;

  const primarySource = sources[0] || {};

  return (
    <div className="event-detail-story-container">
      {/* Top Navigation Back Action */}
      <div className="detail-top-nav">
        <button onClick={onBack} className="back-nav-btn">
          ← Return to Index
        </button>
        <button
          onClick={() => onToggleSave(event)}
          className={`save-constellation-btn ${isSaved ? 'saved' : ''}`}
        >
          {isSaved ? '✦ IN MY CONSTELLATION' : '+ ADD TO CONSTELLATION'}
        </button>
      </div>

      {/* Hero Visual Encounter */}
      <section className="detail-encounter-hero">
        <div className="encounter-kicker">
          <span className="statement-badge">[CULTURAL ARTIFACT]</span>
          <span className="kicker-category">{category}</span>
        </div>

        <h1 className="detail-title">{title}</h1>

        {/* Narrative Specs Grid */}
        <div className="detail-specs-bar">
          <div className="spec-card">
            <CalendarIcon className="spec-icon" />
            <div className="spec-content">
              <span className="spec-label">DATE & TIME</span>
              <span className="spec-value">{date} · {time || 'Evening'}</span>
            </div>
          </div>

          <div className="spec-card">
            <LocationIcon className="spec-icon" />
            <div className="spec-content">
              <span className="spec-label">VENUE & LOCALITY</span>
              <span className="spec-value">{venue} {area ? `(${area})` : ''}</span>
            </div>
          </div>

          <div className="spec-card">
            <TicketIcon className="spec-icon" />
            <div className="spec-content">
              <span className="spec-label">ENTRY PASS</span>
              <span className="spec-value">{price || 'Free Entry'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Content Flow */}
      <section className="detail-narrative-section">
        <div className="narrative-body">
          <h2 className="section-subheading">Event Overview & Context</h2>
          <p className="description-paragraph">
            {description || 'Details are held by the original event organizer on public platforms. Refer to provenance feeds below.'}
          </p>
        </div>

        {/* Scraper Provenance Panel */}
        <div className="scraper-provenance-panel">
          <div className="provenance-header">
            <DatabaseIcon className="w-4 h-4 text-gold-accent inline-block mr-2" />
            <span>SCRAPER PROVENANCE METADATA</span>
          </div>

          <div className="provenance-grid">
            <div className="prov-item">
              <span className="prov-label">PRIMARY FEED SOURCE</span>
              <span className="prov-val">{primarySource.site_name || 'FullHyd / HighApe / AroundU'}</span>
            </div>
            <div className="prov-item">
              <span className="prov-label">SCRAPE TIMESTAMP</span>
              <span className="prov-val">{scraped_at || 'Verified Live Feed'}</span>
            </div>
            <div className="prov-item">
              <span className="prov-label">EVENT IDENTIFIER</span>
              <span className="prov-val font-mono">{event.event_id}</span>
            </div>
          </div>

          {primarySource.source_url && (
            <a
              href={primarySource.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="open-source-url-btn"
            >
              <SourceIcon className="w-4 h-4 inline-block mr-2" />
              Visit Original Source Page →
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
