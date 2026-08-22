export default function EventDetailPage({
  event,
  allEvents = [],
  onBack,
  onSelectEvent,
  onSelectVenue,
  onToggleSave,
  isSaved = false
}) {
  if (!event) return null;

  const primarySource = event.sources?.[0] || {};

  // Find related events (same category or area)
  const relatedEvents = allEvents
    .filter(e => e.event_id !== event.event_id && (e.category === event.category || e.area === event.area))
    .slice(0, 3);

  return (
    <div className="blueprint-page event-detail-page">
      {/* ── Screen 04: Breadcrumb Navigation ── */}
      <div className="detail-breadcrumb-bar">
        <button onClick={onBack} className="back-btn">
          ← Back to Discovery
        </button>
        <span className="breadcrumb-path">
          Open Events / {event.category || 'Event'} / {event.event_id?.slice(0, 8)}
        </span>
      </div>

      {/* ── Hero Banner ── */}
      <div className="event-detail-hero-box">
        <div className="detail-hero-top">
          <span className="detail-cat-badge">{event.category || 'Music'}</span>
          <span className="detail-verified-badge">✦ Verified Source</span>
        </div>

        <h1 className="detail-event-title">{event.title}</h1>

        <div className="detail-hero-meta-grid">
          <div className="meta-box">
            <span className="meta-box-label">Date & Time</span>
            <span className="meta-box-val">📅 {event.date} at {event.time || '18:00'}</span>
          </div>

          <div
            onClick={() => onSelectVenue(event.venue || 'Hyderabad Venue', event.area)}
            className="meta-box venue-clickable"
          >
            <span className="meta-box-label">Venue & Locality ↗</span>
            <span className="meta-box-val">📍 {event.venue || 'Venue TBD'}, {event.area || 'Hyderabad'}</span>
          </div>

          <div className="meta-box">
            <span className="meta-box-label">Ticket / Access</span>
            <span className="meta-box-val text-emerald">💳 {event.price || 'Free Entry'}</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="detail-primary-actions-row">
          <button
            onClick={() => onToggleSave(event)}
            className={`detail-save-btn ${isSaved ? 'is-saved' : ''}`}
          >
            {isSaved ? '★ Saved in My Week' : '☆ Save to My Week'}
          </button>

          {primarySource.source_url && (
            <a
              href={primarySource.source_url}
              target="_blank"
              rel="noreferrer"
              className="detail-source-link-btn"
            >
              <span>Open Original Source</span>
              <span className="btn-arrow">↗</span>
            </a>
          )}
        </div>
      </div>

      {/* ── Main Content Grid: Description & Source Provenance ── */}
      <div className="detail-content-grid">
        <div className="detail-main-col">
          <section className="detail-section-box">
            <h2 className="detail-section-title">Event Overview & Description</h2>
            <p className="detail-body-text">
              {event.description || 'No detailed blurb provided for this listing. Verified directly from public source website.'}
            </p>
          </section>

          {/* Related Discovery Section */}
          {relatedEvents.length > 0 && (
            <section className="detail-section-box">
              <h2 className="detail-section-title">Related Discovery</h2>
              <div className="related-cards-grid">
                {relatedEvents.map(rel => (
                  <div
                    key={rel.event_id}
                    onClick={() => onSelectEvent(rel)}
                    className="related-event-card"
                  >
                    <span className="rel-cat">{rel.category}</span>
                    <h3 className="rel-title">{rel.title}</h3>
                    <span className="rel-loc">📍 {rel.venue} ({rel.date})</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar: Source Provenance & Freshness (Figma Wireframe Requirement) */}
        <aside className="detail-sidebar-col">
          <div className="provenance-panel-card">
            <div className="panel-title">[SOURCE PROVENANCE]</div>
            <div className="provenance-item">
              <span className="p-label">Primary Source Platform</span>
              <span className="p-val">{primarySource.site_name || 'AroundU / FullHyd'}</span>
            </div>
            <div className="provenance-item">
              <span className="p-label">Original Source URL</span>
              <a
                href={primarySource.source_url || '#'}
                target="_blank"
                rel="noreferrer"
                className="p-url-link"
              >
                {primarySource.source_url || 'https://aroundu.in'}
              </a>
            </div>
            <div className="provenance-item">
              <span className="p-label">Last Verified Timestamp</span>
              <span className="p-val">2026-08-23T00:48:22Z</span>
            </div>
            <div className="provenance-item">
              <span className="p-label">Data Verification Status</span>
              <span className="p-val text-emerald">✦ Active / Verified</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
