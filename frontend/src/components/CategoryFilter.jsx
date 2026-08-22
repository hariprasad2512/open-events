import React from 'react';
import { ALL_CATEGORIES, getCategoryMeta } from '../lib/constants.js';
import { SparklesIcon, MusicIcon, PaletteIcon, FilterIcon } from './Icons.jsx';

function renderCategoryIcon(cat) {
  const c = (cat || '').toLowerCase();
  if (c.includes('music')) return <MusicIcon className="w-3.5 h-3.5" />;
  if (c.includes('art') || c.includes('theatre') || c.includes('exhibition')) return <PaletteIcon className="w-3.5 h-3.5" />;
  return <SparklesIcon className="w-3.5 h-3.5" />;
}

export default function CategoryFilter({ activeCategory, onChange }) {
  return (
    <div className="filter-pills" id="category-pills" role="tablist" aria-label="Category filter">
      <button
        type="button"
        role="tab"
        aria-selected={activeCategory === null}
        className={`pill ${activeCategory === null ? 'active' : ''}`}
        onClick={() => onChange(null)}
      >
        <SparklesIcon className="w-3.5 h-3.5" />
        <span>All Events</span>
      </button>

      {ALL_CATEGORIES.map(cat => {
        const meta = getCategoryMeta(cat);
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`pill ${isActive ? 'active' : ''}`}
            onClick={() => onChange(isActive ? null : cat)}
            style={isActive ? { borderColor: meta.color, background: meta.bg } : {}}
          >
            {renderCategoryIcon(cat)}
            <span>{cat}</span>
          </button>
        );
      })}
    </div>
  );
}
