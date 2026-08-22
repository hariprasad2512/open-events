import { getCategoryMeta, formatDate, formatPrice } from '../lib/constants.js';
import {
  IconMusic,
  IconTheatre,
  IconWorkshops,
  IconSports,
  IconFood,
  IconTalks,
  IconNightlife,
  IconFamily,
  IconExhibitions,
  IconCalendar,
  IconClock,
  IconMapPin,
  IconExternalLink
} from './Icons.jsx';

function renderCategoryIcon(iconType, className = "w-3.5 h-3.5") {
  switch (iconType) {
    case 'music': return <IconMusic className={className} />;
    case 'theatre': return <IconTheatre className={className} />;
    case 'workshops': return <IconWorkshops className={className} />;
    case 'sports': return <IconSports className={className} />;
    case 'food': return <IconFood className={className} />;
    case 'nightlife': return <IconNightlife className={className} />;
    case 'family': return <IconFamily className={className} />;
    case 'exhibitions': return <IconExhibitions className={className} />;
    default: return <IconTalks className={className} />;
  }
}

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
  const displayArea = area && area.length < 50 ? area.split(',')[0].trim() : (area || '').split(',')[0].trim();

  return (
    <article className="event-card" id={`event-${event.event_id}`}>
      {/* Accent gradient bar */}
      <div
        className="event-card-accent"
        style={{ background: meta.gradient }}
      />

      <div className="event-card-body">
        {/* Top bar: Category Badge + Source Pill */}
        <div className="event-card-top">
          <span
            className="event-category-badge"
            style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}
          >
            {renderCategoryIcon(meta.iconType, "w-3.5 h-3.5")}
            {category}
          </span>
          {primarySource.site_name && (
            <span className="event-source-badge">{primarySource.site_name}</span>
          )}
        </div>

        {/* Event Title */}
        <h2 className="event-title">{title}</h2>

        {/* Description Blurb */}
        {description && description.length > 8 && (
          <p className="event-description">{description}</p>
        )}

        {/* Meta Info Grid */}
        <div className="event-meta-row">
          {date && (
            <span className="event-meta-item">
              <IconCalendar className="event-meta-icon w-3.5 h-3.5 text-slate-400" />
              {formatDate(date)}
            </span>
          )}
          {time && time !== 'Evening' && (
            <span className="event-meta-item">
              <IconClock className="event-meta-icon w-3.5 h-3.5 text-slate-400" />
              {time}
            </span>
          )}
          {venue && (
            <span className="event-meta-item">
              <IconMapPin className="event-meta-icon w-3.5 h-3.5 text-slate-400" />
              {venue}
            </span>
          )}
          {displayArea && (
            <span className="event-meta-item" style={{ color: 'var(--text-accent)' }}>
              <span>📍</span>
              {displayArea}
            </span>
          )}
        </div>

        {/* Multi-source de-duplication chip */}
        {sources.length > 1 && (
          <div className="event-sources-row">
            <span>Verified across {sources.length} sources:</span>
            {sources.map((s, i) => (
              <span key={i} className="source-chip">{s.site_name}</span>
            ))}
          </div>
        )}

        {/* Card Footer: Price & Direct Action Link */}
        <div className="event-card-footer">
          <span className={`event-price${isFree ? ' free' : ''}`}>
            {isFree ? '✦ Free Entry' : displayPrice}
          </span>
          {primarySource.source_url ? (
            <a
              className="event-link"
              href={primarySource.source_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
            >
              Explore <IconExternalLink className="w-3 h-3 ml-1" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
