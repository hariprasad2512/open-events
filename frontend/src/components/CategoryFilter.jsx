import { ALL_CATEGORIES, getCategoryMeta } from '../lib/constants.js';
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
    case 'music': return <IconMusic className="w-3.5 h-3.5" />;
    case 'theatre': return <IconTheatre className="w-3.5 h-3.5" />;
    case 'workshops': return <IconWorkshops className="w-3.5 h-3.5" />;
    case 'sports': return <IconSports className="w-3.5 h-3.5" />;
    case 'food': return <IconFood className="w-3.5 h-3.5" />;
    case 'nightlife': return <IconNightlife className="w-3.5 h-3.5" />;
    case 'family': return <IconFamily className="w-3.5 h-3.5" />;
    case 'exhibitions': return <IconExhibitions className="w-3.5 h-3.5" />;
    default: return <IconTalks className="w-3.5 h-3.5" />;
  }
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
        <IconSparkles className="w-3.5 h-3.5" />
        All Events
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
            {renderCategoryIcon(meta.iconType)}
            {cat}
          </button>
        );
      })}
    </div>
  );
}
