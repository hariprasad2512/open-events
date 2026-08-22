import { getCategoryMeta, formatDate, formatPrice } from '../lib/constants.js';

export default function EventCard({ event }) {
  const {
    title,
    category,
    date,
    time,
    venue,
    area,
    price,
    description,
    sources = [],
  } = event;

  const meta = getCategoryMeta(category);
  const displayPrice = formatPrice(price);
  const isFree = displayPrice === 'Free';
  const primarySource = sources[0] || {};

  // Derive display area from the full locality if area is very long
  const displayArea = area && area.length < 60 ? area.split(',')[0].trim() : (area || '').split(',')[0].trim();

  return (
    <article className="event-card" id={`event-${event.event_id}`}>
      {/* Top accent bar */}
      <div
        className="event-card-accent"
        style={{ background: meta.gradient }}
      />

      <div className="event-card-body">
        {/* Category + Source */}
        <div className="event-card-top">
          <span
            className="event-category-badge"
            style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}
          >
            <span>{meta.icon}</span>
            {category}
          </span>
          {primarySource.site_name && (
            <span className="event-source-badge">{primarySource.site_name}</span>
          )}
        </div>

        {/* Title */}
        <h2 className="event-title">{title}</h2>

        {/* Description */}
        {description && description.length > 10 && (
          <p className="event-description">{description}</p>
        )}

        {/* Meta info */}
        <div className="event-meta-row">
          {date && (
            <span className="event-meta-item">
              <span className="event-meta-icon">📅</span>
              {formatDate(date)}
            </span>
          )}
          {time && time !== 'Evening' && (
            <span className="event-meta-item">
              <span className="event-meta-icon">🕐</span>
              {time}
            </span>
          )}
          {venue && (
            <span className="event-meta-item">
              <span className="event-meta-icon">📍</span>
              {venue}
            </span>
          )}
          {displayArea && (
            <span className="event-meta-item">
              <span className="event-meta-icon">🏘️</span>
              {displayArea}
            </span>
          )}
        </div>

        {/* Multi-source chips */}
        {sources.length > 1 && (
          <div className="event-sources-row">
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginRight: '4px' }}>Also on:</span>
            {sources.slice(1).map((s, i) => (
              <span key={i} className="source-chip">{s.site_name}</span>
            ))}
          </div>
        )}

        {/* Footer: price + link */}
        <div className="event-card-footer">
          <span className={`event-price${isFree ? ' free' : ''}`}>
            {isFree ? '✦ Free' : displayPrice}
          </span>
          {primarySource.source_url ? (
            <a
              className="event-link"
              href={primarySource.source_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
            >
              Details →
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
