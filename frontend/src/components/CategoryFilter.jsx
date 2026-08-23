import React from 'react';
import { ALL_CATEGORIES, getCategoryMeta } from '../lib/constants.js';
import { SparklesIcon, CategoryGlyph } from './Icons.jsx';

export default function CategoryFilter({ activeCategory, onChange, counts = {} }) {
  return (
    <div className="sv-category-rail" role="tablist" aria-label="Filter events by category">
      <button
        type="button"
        role="tab"
        aria-selected={activeCategory === null || activeCategory === 'All'}
        className={`sv-filter-pill ${activeCategory === null || activeCategory === 'All' ? 'active' : ''}`}
        onClick={() => onChange(null)}
      >
        <span className="sv-pill-icon-wrap">
          <SparklesIcon className="w-3.5 h-3.5" />
        </span>
        <span className="sv-pill-text">All Signals</span>
        {counts['All'] !== undefined && (
          <span className="sv-pill-count">{counts['All']}</span>
        )}
      </button>

      {ALL_CATEGORIES.map((cat) => {
        const meta = getCategoryMeta(cat);
        const isActive = activeCategory === cat;
        const count = counts[cat];

        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`sv-filter-pill ${isActive ? 'active' : ''}`}
            onClick={() => onChange(isActive ? null : cat)}
          >
            <span
              className="sv-pill-icon-wrap"
              style={{ color: isActive ? '#FFFFFF' : meta.color }}
            >
              <CategoryGlyph category={cat} className="w-3.5 h-3.5" />
            </span>
            <span className="sv-pill-text">{cat}</span>
            {count !== undefined && count > 0 && (
              <span className="sv-pill-count">{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
