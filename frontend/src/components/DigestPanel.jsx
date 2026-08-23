import React from 'react';
import { DatabaseIcon, LocationIcon, SparklesIcon } from './Icons.jsx';

export default function DigestPanel({ digest }) {
  if (!digest) return null;

  const { city = 'Hyderabad', period = 'Weekly', total_events = 0, unique_venues = 0, category_breakdown = {} } = digest;

  return (
    <div className="digest-panel-container">
      <div className="digest-panel-header">
        <DatabaseIcon className="w-4 h-4 text-gold-accent inline-block mr-2" />
        <span className="font-serif text-lg tracking-wide text-bone">CITY CULTURAL DIGEST</span>
      </div>

      <div className="digest-stats-grid">
        <div className="digest-stat-card">
          <span className="stat-num font-serif">{total_events}</span>
          <span className="stat-label">TOTAL DISCOVERED EVENTS</span>
        </div>

        <div className="digest-stat-card">
          <span className="stat-num font-serif">{unique_venues}</span>
          <span className="stat-label">UNIQUE ACTIVE VENUES</span>
        </div>

        <div className="digest-stat-card">
          <span className="stat-num font-serif">{city.toUpperCase()}</span>
          <span className="stat-label">CULTURAL METROPOLIS</span>
        </div>
      </div>

      <div className="category-breakdown-list">
        <span className="breakdown-title">TAXONOMY BREAKDOWN</span>
        <div className="breakdown-items-row">
          {Object.entries(category_breakdown).map(([cat, count]) => (
            <div key={cat} className="breakdown-chip">
              <span className="chip-name">{cat}</span>
              <span className="chip-count font-mono">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
