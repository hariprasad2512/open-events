import { getCategoryMeta, ALL_CATEGORIES } from '../lib/constants.js';
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
  IconSparkles
} from './Icons.jsx';

function renderCategoryIcon(iconType) {
  switch (iconType) {
    case 'music': return <IconMusic className="w-4 h-4" />;
    case 'theatre': return <IconTheatre className="w-4 h-4" />;
    case 'workshops': return <IconWorkshops className="w-4 h-4" />;
    case 'sports': return <IconSports className="w-4 h-4" />;
    case 'food': return <IconFood className="w-4 h-4" />;
    case 'nightlife': return <IconNightlife className="w-4 h-4" />;
    case 'family': return <IconFamily className="w-4 h-4" />;
    case 'exhibitions': return <IconExhibitions className="w-4 h-4" />;
    default: return <IconTalks className="w-4 h-4" />;
  }
}

export default function DigestPanel({ stats, categoryBreakdown }) {
  if (!stats) return null;

  const maxCount = Math.max(...Object.values(categoryBreakdown || {}), 1);

  return (
    <section className="digest-section" id="weekly-digest">
      <h2 className="section-heading">
        <span className="section-heading-icon">
          <IconSparkles className="w-5 h-5 text-purple-400" />
        </span>
        Weekly Intelligence Digest
      </h2>

      {/* Summary stats */}
      <div className="stats-bar" style={{ marginBottom: '2rem', maxWidth: '100%' }}>
        <div className="stat-item">
          <div className="stat-value">{stats.total ?? '—'}</div>
          <div className="stat-label">Total Events</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.unique_venues ?? '—'}</div>
          <div className="stat-label">Unique Venues</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">3</div>
          <div className="stat-label">Sources</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">HYD</div>
          <div className="stat-label">Pilot City</div>
        </div>
      </div>

      {/* Category breakdown bars */}
      {categoryBreakdown && (
        <div className="category-bars">
          {ALL_CATEGORIES.map((cat) => {
            const count = categoryBreakdown[cat] || 0;
            const pct = Math.round((count / maxCount) * 100);
            const meta = getCategoryMeta(cat);
            return (
              <div className="category-bar-row" key={cat}>
                <div className="category-bar-label">
                  {renderCategoryIcon(meta.iconType)}
                  <span>{cat}</span>
                </div>
                <div className="category-bar-track">
                  <div
                    className="category-bar-fill"
                    style={{
                      width: `${pct}%`,
                      background: meta.gradient,
                    }}
                  />
                </div>
                <div className="category-bar-count">{count}</div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
