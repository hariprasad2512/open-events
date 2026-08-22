import { useState } from 'react';
import { getCategoryMeta, ALL_CATEGORIES } from '../lib/constants.js';

const ALL_PILL = { label: 'All Events', icon: '✦' };

export default function CategoryFilter({ activeCategory, onChange }) {
  return (
    <div className="filter-pills" role="group" aria-label="Filter by category">
      {/* All pill */}
      <button
        className={`pill${!activeCategory ? ' active' : ''}`}
        onClick={() => onChange(null)}
        id="filter-all"
      >
        <span>{ALL_PILL.icon}</span>
        {ALL_PILL.label}
      </button>

      {ALL_CATEGORIES.map((cat) => {
        const meta = getCategoryMeta(cat);
        return (
          <button
            key={cat}
            className={`pill${activeCategory === cat ? ' active' : ''}`}
            onClick={() => onChange(activeCategory === cat ? null : cat)}
            id={`filter-${cat.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
            style={
              activeCategory === cat
                ? {
                    background: meta.bg,
                    borderColor: meta.border,
                    color: meta.color,
                  }
                : {}
            }
          >
            <span
              className="pill-dot"
              style={{ background: meta.color }}
            />
            {cat}
          </button>
        );
      })}
    </div>
  );
}
