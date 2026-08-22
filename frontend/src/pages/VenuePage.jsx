export default function VenuePage({
  venueName = 'Hyderabad Venue',
  areaName = 'Hyderabad',
  allEvents = [],
  onBack,
  onSelectEvent
}) {
  // Find all events taking place at this venue
  const venueEvents = allEvents.filter(e =>
    (e.venue || '').toLowerCase().includes(venueName.toLowerCase()) ||
    (e.area || '').toLowerCase().includes(areaName.toLowerCase())
  );

  return (
    <div className="blueprint-page venue-profile-page">
      {/* Breadcrumbs */}
      <div className="detail-breadcrumb-bar">
        <button onClick={onBack} className="back-btn">
          ← Back to Discovery
        </button>
        <span className="breadcrumb-path">
          Open Events / Venues / {venueName}
        </span>
      </div>

      {/* Screen 05 Banner */}
      <div className="venue-hero-banner">
        <div className="venue-tag">[05 SOURCE & VENUE PROFILE]</div>
        <h1 className="venue-title">{venueName}</h1>
        <p className="venue-locality">📍 Locality Sector: {areaName}, Hyderabad</p>
        <p className="venue-desc">
          Verified cultural & leisure venue profile. Aggregating live event listings and provenance metrics.
        </p>

        {/* Source Provenance Info */}
        <div className="venue-provenance-strip">
          <div className="provenance-chip">
            <span className="p-lbl">Source Health</span>
            <span className="p-val text-emerald">✦ 99.8% Healthy</span>
          </div>
          <div className="provenance-chip">
            <span className="p-lbl">Active Events</span>
            <span className="p-val text-cyan">{venueEvents.length} Listings</span>
          </div>
          <div className="provenance-chip">
            <span className="p-lbl">Scraper Status</span>
            <span className="p-val text-violet">Bright Data Sync OK</span>
          </div>
        </div>
      </div>

      {/* Upcoming Events at this Venue */}
      <div className="venue-events-section">
        <h2 className="venue-section-heading">Upcoming Events at {venueName}</h2>

        {venueEvents.length === 0 ? (
          <div className="empty-venue-box">
            <p>No active upcoming events indexed for this specific venue profile.</p>
          </div>
        ) : (
          <div className="venue-events-grid">
            {venueEvents.map(evt => (
              <div
                key={evt.event_id}
                onClick={() => onSelectEvent(evt)}
                className="venue-event-card"
              >
                <div className="card-top">
                  <span className="v-cat">{evt.category}</span>
                  <span className="v-date">{evt.date}</span>
                </div>
                <h3 className="v-title">{evt.title}</h3>
                <div className="card-footer">
                  <span className="v-price">{evt.price || 'Free Entry'}</span>
                  <span className="v-inspect">Inspect Event →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
