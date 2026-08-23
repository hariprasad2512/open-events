import React, { useState } from 'react';
import EventCard from '../components/EventCard.jsx';
import {
  ConstellationIcon,
  TimelineIcon,
  CalendarIcon,
  ShareIcon,
  CheckIcon,
  CloseIcon,
  TicketIcon,
  LocationIcon,
  CategoryGlyph
} from '../components/Icons.jsx';
import { formatDate, formatPrice, getCategoryMeta } from '../lib/constants.js';

export default function MyWeekPage({
  savedEvents = [],
  onSelectEvent,
  onRemoveSaved,
  onNavigate
}) {
  const [viewMode, setViewMode] = useState('constellation'); // 'constellation' | 'timeline'
  const [copied, setCopied] = useState(false);

  const handleExportIcs = () => {
    if (savedEvents.length === 0) return;

    const vEvents = savedEvents.map((evt) => {
      return [
        'BEGIN:VEVENT',
        `SUMMARY:${evt.title}`,
        `DESCRIPTION:${(evt.description || '').replace(/\n/g, ' ')}`,
        `LOCATION:${evt.venue}, ${evt.area || 'Hyderabad'}`,
        `DTSTART:${evt.date ? evt.date.replace(/-/g, '') : '20260823'}T100000Z`,
        `DTEND:${evt.date ? evt.date.replace(/-/g, '') : '20260823'}T130000Z`,
        'END:VEVENT'
      ].join('\r\n');
    }).join('\r\n');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//openevents//Hyderabad Cultural Observatory//EN',
      vEvents,
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'my-hyderabad-cultural-week.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyItinerary = () => {
    if (savedEvents.length === 0) return;

    const text = [
      '✦ MY HYDERABAD CULTURAL CONSTELLATION ✦',
      '---------------------------------------',
      ...savedEvents.map(
        (e, i) => `${i + 1}. [${e.category}] ${e.title}\n   📅 ${formatDate(e.date)} · ${e.time || 'Time TBA'}\n   📍 ${e.venue} (${e.area || 'Hyderabad'})\n   🎟️ ${formatPrice(e.price)}`
      ),
      '---------------------------------------',
      'Curated on openevents (Hyderabad City EVENT)'
    ].join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="sv-my-week-page">
      {/* Editorial Header */}
      <section className="sv-page-header">
        

        <h1 className="sv-page-title font-serif">My Cultural Constellation.</h1>
        <p className="sv-page-desc">
          Your personal collection of saved cultural signals, arranged in an orbiting temporal space around your observer node.
        </p>

        {/* View Switcher & Action Controls */}
        <div className="sv-constellation-controls">
          <div className="sv-view-switch-tabs">
            <button
              type="button"
              className={`sv-switch-tab ${viewMode === 'constellation' ? 'active' : ''}`}
              onClick={() => setViewMode('constellation')}
            >
              <ConstellationIcon className="w-4 h-4 inline mr-2 text-saffron" />
              <span>ORBITAL CONSTELLATION</span>
            </button>
            <button
              type="button"
              className={`sv-switch-tab ${viewMode === 'timeline' ? 'active' : ''}`}
              onClick={() => setViewMode('timeline')}
            >
              <TimelineIcon className="w-4 h-4 inline mr-2 text-jade" />
              <span>ITINERARY TIMELINE</span>
            </button>
          </div>

          {savedEvents.length > 0 && (
            <div className="sv-constellation-actions">
              <button
                type="button"
                className="sv-action-pill-btn"
                onClick={handleCopyItinerary}
                title="Copy formatted text itinerary"
              >
                {copied ? <CheckIcon className="w-3.5 h-3.5 text-jade inline mr-1" /> : <ShareIcon className="w-3.5 h-3.5 inline mr-1" />}
                <span>{copied ? 'Itinerary Copied' : 'Copy Itinerary'}</span>
              </button>

              <button
                type="button"
                className="sv-action-pill-btn"
                onClick={handleExportIcs}
                title="Download .ics file for calendar apps"
              >
                <CalendarIcon className="w-3.5 h-3.5 inline mr-1" />
                <span>Export to Calendar (.ics)</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      {savedEvents.length > 0 ? (
        viewMode === 'constellation' ? (
          /* ── ORBITAL CONSTELLATION CANVAS VIEW ── */
          <section className="sv-orbital-canvas-wrapper">
            <div className="sv-orbital-canvas">
              {/* Central Observer Node */}
              <div className="sv-observer-center-node">
                <span className="sv-observer-pulse" />
                <span className="sv-observer-glyph">✦</span>
                <span className="sv-observer-label font-mono">OBSERVER</span>
              </div>

              {/* Orbit Rings */}
              <div className="sv-orbit-ring ring-inner" />
              <div className="sv-orbit-ring ring-middle" />
              <div className="sv-orbit-ring ring-outer" />

              {/* Orbiting Planetary Nodes */}
              {savedEvents.map((evt, idx) => {
                const total = savedEvents.length;
                const angle = (idx / Math.max(total, 1)) * 360;
                const rad = (angle * Math.PI) / 180;
                const radius = 175 + (idx % 3) * 45;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;

                const meta = getCategoryMeta(evt.category);

                return (
                  <div
                    key={evt.event_id || idx}
                    className="sv-orbit-node"
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                    onClick={() => onSelectEvent(evt)}
                  >
                    <div
                      className="sv-orbit-dot"
                      style={{
                        backgroundColor: meta.color,
                        boxShadow: `0 0 20px ${meta.color}`
                      }}
                    >
                      <CategoryGlyph category={evt.category} className="w-4 h-4 text-white" />
                    </div>

                    <div className="sv-node-card-tooltip">
                      <div className="sv-tooltip-cat font-mono" style={{ color: meta.color }}>
                        {evt.category}
                      </div>
                      <div className="sv-tooltip-title font-serif">{evt.title}</div>
                      <div className="sv-tooltip-meta font-mono">
                        {evt.date} · {evt.venue}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="sv-constellation-legend font-mono">
              <span>✦ CLICK ANY ORBITING NODE TO INSPECT EVENT</span>
              <span>·</span>
              <span>{savedEvents.length} SIGNALS IN MOTION</span>
            </div>
          </section>
        ) : (
          /* ── ITINERARY TIMELINE VIEW ── */
          <section className="sv-itinerary-container">
            <div className="sv-itinerary-list">
              {savedEvents.map((evt) => {
                const meta = getCategoryMeta(evt.category);
                const cleanArea = evt.area ? evt.area.split(',')[0].trim() : 'Hyderabad';

                return (
                  <article key={evt.event_id} className="sv-itinerary-item">
                    <div className="sv-itinerary-time-col font-mono">
                      <CalendarIcon className="w-4 h-4 text-saffron mb-1" />
                      <span className="sv-itin-date">{formatDate(evt.date)}</span>
                      <span className="sv-itin-time">{evt.time || 'Evening'}</span>
                    </div>

                    <div
                      className="sv-itinerary-card-col"
                      onClick={() => onSelectEvent(evt)}
                    >
                      <div className="sv-itinerary-top">
                        <span
                          className="sv-itinerary-badge font-mono"
                          style={{
                            backgroundColor: meta.bg,
                            color: meta.color,
                            borderColor: meta.border
                          }}
                        >
                          <CategoryGlyph category={evt.category} className="w-3.5 h-3.5 inline mr-1" />
                          {evt.category}
                        </span>
                        <span className="sv-price-pill font-mono">{formatPrice(evt.price)}</span>
                      </div>

                      <h3 className="sv-itinerary-title font-serif">{evt.title}</h3>
                      <p className="sv-itinerary-venue">
                        <LocationIcon className="w-3.5 h-3.5 inline mr-1 text-muted" />
                        {evt.venue} ({cleanArea})
                      </p>
                    </div>

                    <div className="sv-itinerary-actions-col">
                      <button
                        type="button"
                        className="sv-itinerary-remove-btn font-mono"
                        onClick={() => onRemoveSaved(evt)}
                        aria-label={`Remove ${evt.title} from constellation`}
                        title="Remove from saved"
                      >
                        <CloseIcon className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )
      ) : (
        /* Empty State */
        <div className="sv-empty-box">
          <ConstellationIcon className="w-12 h-12 text-saffron opacity-50 mb-3" />
          <h3 className="sv-empty-title font-serif">Your constellation space is empty.</h3>
          <p className="sv-empty-desc">
            Explore the Discovery Gallery Wall or City Timeline and click the bookmark icon on any event to pin signals into your personal observatory.
          </p>
          <button
            type="button"
            className="sv-primary-btn mt-4"
            onClick={() => onNavigate('discover')}
          >
            <span>Explore Discovered Events</span>
            <span className="ml-1">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
