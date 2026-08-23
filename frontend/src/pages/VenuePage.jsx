import React, { useState, useMemo } from 'react';
import EventCard from '../components/EventCard.jsx';
import { LocationIcon, SparklesIcon, CalendarIcon } from '../components/Icons.jsx';

export default function VenuePage({
  events = [],
  onSelectEvent,
  savedEvents = [],
  onToggleSave
}) {
  const [selectedVenue, setSelectedVenue] = useState(null);

  // Group events by venue
  const venueMap = useMemo(() => {
    const map = {};
    events.forEach((e) => {
      const v = e.venue || 'Independent Venue';
      if (!map[v]) {
        map[v] = {
          name: v,
          area: e.area || 'Hyderabad',
          events: []
        };
      }
      map[v].events.push(e);
    });
    return Object.values(map).sort((a, b) => b.events.length - a.events.length);
  }, [events]);

  const activeVenueData = selectedVenue ? venueMap.find((v) => v.name === selectedVenue) : null;

  return (
    <div className="sv-venue-page">
      {/* Header */}
      <section className="sv-page-header">
        <div className="sv-header-kicker font-mono">
          <span className="sv-badge-tag">[CULTURAL PULSE]</span>
          <span className="sv-meta-count">{venueMap.length} VERIFIED VENUES</span>
        </div>

        <h1 className="sv-page-title font-serif">Places with a Pulse.</h1>
        <p className="sv-page-desc">
          Curated independent hubs, cultural amphitheatres, gallery lofts, and acoustic spaces hosting live signals across Hyderabad.
        </p>
      </section>

      {/* Selected Venue Drilldown (if any) */}
      {activeVenueData ? (
        <section className="sv-venue-detail-view">
          <div className="sv-venue-detail-banner">
            <button
              type="button"
              className="sv-detail-back-btn"
              onClick={() => setSelectedVenue(null)}
            >
              <span>←</span> Back to All Venues
            </button>

            <div className="sv-venue-detail-top">
              <span className="sv-venue-badge-letter font-serif">
                {activeVenueData.name.slice(0, 1)}
              </span>
              <div>
                <span className="sv-overline font-mono text-jade">VERIFIED CULTURAL VENUE</span>
                <h2 className="sv-venue-detail-title font-serif">{activeVenueData.name}</h2>
                <p className="sv-venue-detail-locality font-mono">
                  <LocationIcon className="w-4 h-4 inline mr-1 text-saffron" />
                  {activeVenueData.area}
                </p>
              </div>
            </div>

            <div className="sv-venue-provenance-chips font-mono">
              <div className="sv-prov-chip">
                <span>CRAWLER HEALTH:</span>
                <strong className="text-jade">99.8% OK</strong>
              </div>
              <div className="sv-prov-chip">
                <span>ACTIVE SIGNALS:</span>
                <strong>{activeVenueData.events.length} Events Indexed</strong>
              </div>
            </div>
          </div>

          <div className="sv-venue-events-grid">
            {activeVenueData.events.map((evt) => (
              <EventCard
                key={evt.event_id}
                event={evt}
                onClick={() => onSelectEvent(evt)}
                isSaved={savedEvents.some((s) => s.event_id === evt.event_id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        </section>
      ) : (
        /* Grid of Venue Cards */
        <section className="sv-venue-grid-container">
          <div className="sv-venues-grid">
            {venueMap.map((venue) => {
              const cleanArea = venue.area ? venue.area.split(',')[0].trim() : 'Hyderabad';

              return (
                <article
                  key={venue.name}
                  className="sv-venue-tile-card"
                  onClick={() => setSelectedVenue(venue.name)}
                >
                  <div className="sv-venue-tile-header">
                    <span className="sv-venue-tile-avatar font-serif">
                      {venue.name.slice(0, 1)}
                    </span>
                    <span className="sv-venue-tile-count font-mono">
                      {venue.events.length} {venue.events.length === 1 ? 'event' : 'events'}
                    </span>
                  </div>

                  <h3 className="sv-venue-tile-name font-serif">{venue.name}</h3>

                  <div className="sv-venue-tile-footer">
                    <span className="sv-venue-tile-area">
                      <LocationIcon className="w-3.5 h-3.5 inline mr-1 text-muted" />
                      {cleanArea}
                    </span>
                    <span className="sv-venue-tile-arrow font-mono">View →</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
