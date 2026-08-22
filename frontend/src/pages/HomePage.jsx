export default function HomePage({
  events = [],
  onNavigate,
  onSelectEvent,
  onSelectCategory
}) {
  const featuredEvents = events.slice(0, 3);

  const categories = [
    { name: 'Music', icon: '🎵', desc: 'Live concerts, jams & acoustic sets' },
    { name: 'Art & Culture', icon: '🎨', desc: 'Exhibitions, theatre & performances' },
    { name: 'Ideas & Talks', icon: '💡', desc: 'Panels, founder mixers & keynotes' },
    { name: 'Technology', icon: '⚡', desc: 'AI hackathons, dev meetups & workshops' },
    { name: 'Community', icon: '🤝', desc: 'Neighborhood gatherings & social clubs' }
  ];

  return (
    <div className="blueprint-page home-manifesto-page">
      {/* ── Screen 01: Hero / Statement ── */}
      <section className="manifesto-hero">
        <div className="hero-kicker-pill">
          <span className="pill-dot" />
          <span>OPEN EVENTS // CITY CULTURE DIGEST</span>
        </div>

        <h1 className="hero-manifesto-title">
          Something is happening.
        </h1>

        <p className="hero-manifesto-subtitle">
          Independent, cultural, and community events are scattered across isolated websites. Open Events aggregates them into one non-transactional discovery space.
        </p>

        <div className="hero-actions-row">
          <button
            onClick={() => onNavigate('discover')}
            className="manifesto-primary-btn"
          >
            <span>Discover Events</span>
            <span className="btn-arrow">→</span>
          </button>
          <button
            onClick={() => onNavigate('calendar')}
            className="manifesto-secondary-btn"
          >
            <span>Explore Calendar</span>
          </button>
        </div>
      </section>

      {/* ── Editorial Statement Section ── */}
      <section className="manifesto-statement-box">
        <div className="statement-badge">[DESIGN PHILOSOPHY]</div>
        <h2 className="statement-heading">
          "The product should feel like an artistic discovery space, not a transactional ticket marketplace."
        </h2>
        <p className="statement-body">
          We believe city culture thrives when events remain visible, accessible, and connected. Structured data operates underneath while presentation remains high-density, transparent, and continuous.
        </p>
      </section>

      {/* ── Live Discovery Preview ── */}
      <section className="live-discovery-preview-section">
        <div className="preview-header">
          <span className="preview-tag">[LIVE DISCOVERY PREVIEW]</span>
          <h2 className="preview-title">Happening this week in Hyderabad</h2>
          <button
            onClick={() => onNavigate('discover')}
            className="preview-view-all-btn"
          >
            View All {events.length} Events →
          </button>
        </div>

        <div className="featured-cards-grid">
          {featuredEvents.map((evt) => (
            <div
              key={evt.event_id}
              onClick={() => onSelectEvent(evt)}
              className="featured-event-card"
            >
              <div className="card-top-bar">
                <span className="cat-badge">{evt.category || 'Music'}</span>
                <span className="freshness-badge">✦ Verified</span>
              </div>
              <h3 className="event-card-title">{evt.title}</h3>
              <div className="card-meta-line">
                <span>📅 {evt.date} at {evt.time || 'Evening'}</span>
                <span>📍 {evt.venue || 'Hyderabad'}</span>
              </div>
              <div className="card-footer-line">
                <span className="card-price">{evt.price || 'Free Entry'}</span>
                <span className="card-open-link">Inspect Event →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Category Invitation Grid ── */}
      <section className="category-invitation-section">
        <div className="preview-header">
          <span className="preview-tag">[CATEGORY INVITATION]</span>
          <h2 className="preview-title">Explore by domain</h2>
        </div>

        <div className="category-cards-grid">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => {
                onSelectCategory(cat.name);
                onNavigate('discover');
              }}
              className="category-invite-card"
            >
              <div className="cat-icon-circle">{cat.icon}</div>
              <h3 className="cat-card-title">{cat.name}</h3>
              <p className="cat-card-desc">{cat.desc}</p>
              <span className="cat-explore-link">Browse {cat.name} →</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer / Source Philosophy ── */}
      <footer className="source-philosophy-footer">
        <div className="footer-philosophy-box">
          <p className="philosophy-text">
            <strong>Source Philosophy:</strong> All events are discovered from public web source platforms (FullHyd, HydHub, AroundU). Open Events does not sell tickets or lock content behind paywalls.
          </p>
        </div>
      </footer>
    </div>
  );
}
