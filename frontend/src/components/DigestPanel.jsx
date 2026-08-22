import { getCategoryMeta, ALL_CATEGORIES } from '../lib/constants.js';

export default function DigestPanel({ stats, categoryBreakdown }) {
  if (!stats) return null;

  const maxCount = Math.max(...Object.values(categoryBreakdown || {}), 1);

  return (
    <section className="digest-section" id="weekly-digest">
      <h2 className="section-heading">
        <span
          className="section-heading-icon"
          style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}
        >
          📊
        </span>
        Weekly Digest
      </h2>

      {/* Summary stats */}
      <div
        className="stats-bar"
        style={{ marginBottom: '1.5rem', maxWidth: '100%' }}
      >
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
                  <span>{meta.icon}</span>
                  {cat}
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
