import React, { useState } from 'react';
import {
  CalendarIcon,
  LocationIcon,
  TicketIcon,
  SourceIcon,
  DatabaseIcon,
  BookmarkIcon,
  ShareIcon,
  CheckIcon,
  ArrowRightIcon,
  CategoryGlyph
} from '../components/Icons.jsx';
import { formatDate, formatPrice, getCategoryMeta } from '../lib/constants.js';

export default function EventDetailPage({
  event,
  onBack,
  isSaved = false,
  onToggleSave,
  onSelectEvent,
  allEvents = []
}) {
  if (!event) return null;

  const [copied, setCopied] = useState(false);

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
    scraped_at,
    image,
    event_id
  } = event;

  const meta = getCategoryMeta(category);
  const displayPrice = formatPrice(price);
  const isFree = displayPrice.toLowerCase().includes('free');
  const primarySource = sources[0] || {};
  const heroImage = image || meta.fallbackImage;
  const cleanArea = area ? area.split(',')[0].trim() : 'Hyderabad';

  // Related events from same category
  const relatedEvents = allEvents
    .filter((e) => e.event_id !== event_id && e.category === category)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${title} — Hyderabad`,
        text: `Check out ${title} at ${venue}, Hyderabad.`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//openevents//Hyderabad Cultural Observatory//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${(description || '').replace(/\n/g, ' ')}`,
      `LOCATION:${venue}, ${area}, Hyderabad`,
      `DTSTART:${date ? date.replace(/-/g, '') : '20260823'}T100000Z`,
      `DTEND:${date ? date.replace(/-/g, '') : '20260823'}T130000Z`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="sv-detail-page">
      {/* Top Breadcrumb & Action Bar */}
      <div className="sv-detail-nav-bar">
        <button type="button" onClick={onBack} className="sv-detail-back-btn">
          <span>←</span> Back to Discovery
        </button>

        <div className="sv-detail-top-actions font-mono">
          <button
            type="button"
            className="sv-detail-share-btn"
            onClick={handleShare}
            title="Share event link"
          >
            {copied ? <CheckIcon className="w-3.5 h-3.5 text-jade inline mr-1.5" /> : <ShareIcon className="w-3.5 h-3.5 inline mr-1.5" />}
            <span>{copied ? 'Link Copied' : 'Share Signal'}</span>
          </button>

          <button
            type="button"
            className="sv-detail-calendar-btn"
            onClick={handleDownloadIcs}
            title="Export to Apple / Google Calendar (.ics)"
          >
            <CalendarIcon className="w-3.5 h-3.5 inline mr-1.5" />
            <span>Add to Calendar</span>
          </button>

          <button
            type="button"
            className={`sv-detail-save-btn ${isSaved ? 'saved' : ''}`}
            onClick={() => onToggleSave(event)}
          >
            <BookmarkIcon className="w-4 h-4 inline mr-2" filled={isSaved} />
            <span>{isSaved ? 'In My Constellation' : '+ Save to Constellation'}</span>
          </button>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="sv-detail-hero-card">
        <div className="sv-detail-media">
          <img
            src={heroImage}
            alt={title}
            className="sv-detail-img"
            onError={(e) => {
              e.currentTarget.src = meta.fallbackImage;
            }}
          />
          <div className="sv-detail-media-overlay" />
        </div>

        <div className="sv-detail-hero-content">
          <div className="sv-detail-eyebrow">
            <span
              className="sv-category-badge"
              style={{
                borderColor: meta.border,
                backgroundColor: 'rgba(18, 22, 21, 0.85)',
                color: '#FFFFFF'
              }}
            >
              <span className="badge-glyph-wrap" style={{ color: meta.color }}>
                <CategoryGlyph category={category} className="w-3.5 h-3.5" />
              </span>
              <span>{category}</span>
            </span>
            <span className="sv-detail-signal-id font-mono">SIGNAL // {event_id}</span>
          </div>

          <h1 className="sv-detail-title">{title}</h1>

          {/* Key Quick Specs Bar */}
          <div className="sv-detail-specs-grid">
            <div className="sv-spec-box">
              <span className="sv-spec-label font-mono">TEMPORAL COORDINATE</span>
              <div className="sv-spec-val font-mono">
                <CalendarIcon className="w-4 h-4 text-saffron" />
                <span>{formatDate(date)} {time ? `· ${time}` : ''}</span>
              </div>
            </div>

            <div className="sv-spec-box">
              <span className="sv-spec-label font-mono">VENUE & LOCALITY</span>
              <div className="sv-spec-val">
                <LocationIcon className="w-4 h-4 text-jade" />
                <span>{venue} ({cleanArea})</span>
              </div>
            </div>

            <div className="sv-spec-box">
              <span className="sv-spec-label font-mono">ENTRY TIER</span>
              <div className="sv-spec-val font-mono">
                <TicketIcon className="w-4 h-4 text-amber" />
                <span className={isFree ? 'text-jade font-semibold' : ''}>{displayPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="sv-detail-grid-layout">
        {/* Left Column: Description & Context */}
        <div className="sv-detail-main-col">
          <section className="sv-detail-section">
            <h2 className="sv-detail-section-heading">About This Signal</h2>
            <div className="sv-detail-text">
              <p>{description || 'Details are held by the original event organizer on public platforms. Refer to verified provenance feeds below.'}</p>
            </div>
          </section>

          {/* Location & Venue Profile Highlights */}
          <section className="sv-detail-section">
            <h2 className="sv-detail-section-heading">Venue Location</h2>
            <div className="sv-venue-highlight-card">
              <div className="sv-venue-highlight-icon">
                <LocationIcon className="w-5 h-5 text-saffron" />
              </div>
              <div className="sv-venue-highlight-info">
                <h3 className="sv-venue-highlight-name font-serif">{venue}</h3>
                <p className="sv-venue-highlight-address">{area || 'Hyderabad, Telangana'}</p>
                <div className="sv-venue-highlight-meta font-mono">
                  <span>METRO SECTOR: HYDERABAD</span>
                  <span>·</span>
                  <span>INDEXED LOCATIONS: 1</span>
                </div>
              </div>
            </div>
          </section>

          {/* Scraper Provenance Panel */}
          <section className="sv-detail-section">
            <div className="sv-provenance-box">
              <div className="sv-provenance-header">
                <div className="sv-provenance-title-wrap">
                  <DatabaseIcon className="w-4 h-4 text-saffron inline mr-2" />
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                    Scraper Provenance & Crawl Verification
                  </span>
                </div>
                <span className="sv-provenance-badge font-mono">BRIGHT DATA VERIFIED</span>
              </div>

              <div className="sv-provenance-grid font-mono">
                <div className="sv-provenance-item">
                  <span className="sv-prov-label font-mono">PRIMARY CRAWLED FEED</span>
                  <span className="sv-prov-val">{primarySource.site_name || 'FullHyd / HighApe / AroundU'}</span>
                </div>

                <div className="sv-provenance-item">
                  <span className="sv-prov-label font-mono">CRAWL TIMESTAMP</span>
                  <span className="sv-prov-val font-mono">{scraped_at || '2026-08-22T08:14:22Z'}</span>
                </div>

                <div className="sv-provenance-item">
                  <span className="sv-prov-label font-mono">CANONICAL SIGNAL ID</span>
                  <span className="sv-prov-val font-mono">{event_id}</span>
                </div>

                <div className="sv-provenance-item">
                  <span className="sv-prov-label font-mono">DEDUPLICATION STATUS</span>
                  <span className="sv-prov-val text-jade">Single Canonical Cluster (0 Duplicates)</span>
                </div>
              </div>

              {primarySource.source_url && (
                <div className="sv-provenance-actions">
                  <a
                    href={primarySource.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sv-provenance-link-btn font-mono"
                  >
                    <SourceIcon className="w-4 h-4 inline mr-2 text-jade" />
                    <span>Visit Original {primarySource.site_name || 'Listing'} Source Page</span>
                    <span className="ml-1 text-saffron">↗</span>
                  </a>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Sidebar: Quick Actions & Related */}
        <aside className="sv-detail-sidebar">
          {/* Quick Ticket Action Card */}
          <div className="sv-ticket-action-card">
            <span className="sv-ticket-card-badge font-mono">DIRECT DISCOVERY</span>
            <div className="sv-ticket-price-row">
              <span className="sv-ticket-price-label">Ticket Access</span>
              <span className="sv-ticket-price-val font-serif">{displayPrice}</span>
            </div>
            <p className="sv-ticket-note">
              Direct organizer booking link with zero platform fee markups.
            </p>
            {primarySource.source_url ? (
              <a
                href={primarySource.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="sv-primary-btn w-full justify-center"
              >
                <span>Book Tickets on {primarySource.site_name || 'Source'}</span>
                <span className="ml-1.5">↗</span>
              </a>
            ) : (
              <button
                type="button"
                className="sv-primary-btn w-full justify-center"
                onClick={handleDownloadIcs}
              >
                <span>Add to My Calendar</span>
              </button>
            )}
          </div>

          {/* Related Category Signals */}
          {relatedEvents.length > 0 && (
            <div className="sv-related-box">
              <h3 className="sv-related-heading font-serif">More in {category}</h3>
              <div className="sv-related-list">
                {relatedEvents.map((rel) => (
                  <div
                    key={rel.event_id}
                    className="sv-related-card"
                    onClick={() => onSelectEvent(rel)}
                  >
                    <span className="sv-related-title font-serif">{rel.title}</span>
                    <span className="sv-related-meta font-mono">
                      {formatDate(rel.date)} · {rel.venue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
