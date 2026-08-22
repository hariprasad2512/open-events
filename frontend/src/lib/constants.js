// Category → color/icon mapping for the Unified Taxonomy
export const CATEGORY_META = {
  'Music': {
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    bg: 'rgba(139,92,246,0.15)',
    border: 'rgba(139,92,246,0.35)',
    icon: '🎵',
  },
  'Theatre & Arts': {
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg, #f43f5e, #fb923c)',
    bg: 'rgba(244,63,94,0.15)',
    border: 'rgba(244,63,94,0.35)',
    icon: '🎭',
  },
  'Workshops & Classes': {
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #6366f1)',
    bg: 'rgba(6,182,212,0.15)',
    border: 'rgba(6,182,212,0.35)',
    icon: '🛠️',
  },
  'Sports & Outdoors': {
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #84cc16)',
    bg: 'rgba(16,185,129,0.15)',
    border: 'rgba(16,185,129,0.35)',
    icon: '⚡',
  },
  'Food & Drink': {
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316, #eab308)',
    bg: 'rgba(249,115,22,0.15)',
    border: 'rgba(249,115,22,0.35)',
    icon: '🍽️',
  },
  'Talks & Meetups': {
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    bg: 'rgba(99,102,241,0.15)',
    border: 'rgba(99,102,241,0.35)',
    icon: '💬',
  },
  'Nightlife': {
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
    bg: 'rgba(236,72,153,0.15)',
    border: 'rgba(236,72,153,0.35)',
    icon: '🌙',
  },
  'Family / Kids': {
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #f97316)',
    bg: 'rgba(245,158,11,0.15)',
    border: 'rgba(245,158,11,0.35)',
    icon: '👨‍👩‍👧',
  },
  'Exhibitions': {
    color: '#a3e635',
    gradient: 'linear-gradient(135deg, #a3e635, #06b6d4)',
    bg: 'rgba(163,230,53,0.12)',
    border: 'rgba(163,230,53,0.3)',
    icon: '🖼️',
  },
};

export const ALL_CATEGORIES = Object.keys(CATEGORY_META);

export function getCategoryMeta(cat) {
  return CATEGORY_META[cat] || {
    color: '#94a3b8',
    gradient: 'linear-gradient(135deg, #475569, #94a3b8)',
    bg: 'rgba(148,163,184,0.1)',
    border: 'rgba(148,163,184,0.2)',
    icon: '📅',
  };
}

export function formatDate(rawDate) {
  if (!rawDate) return '';
  // rawDate may be like "27-Jun-26 22-Aug-26" (range) or "2026-08-22" (ISO)
  // We try to parse just the first part if it's a range
  const part = rawDate.split(' ')[0];
  try {
    const d = new Date(part);
    if (!isNaN(d)) {
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  } catch (_) {}
  return rawDate;
}

export function formatPrice(price) {
  if (!price || price === 'Free' || String(price).toLowerCase().includes('free')) return 'Free';
  if (String(price).startsWith('₹') || String(price).startsWith('Rs')) return String(price);
  return price;
}

export function extractArea(locality) {
  if (!locality) return '';
  // Try to extract the last meaningful part before "Hyderabad"
  const parts = locality.split(',').map(s => s.trim()).filter(Boolean);
  const idx = parts.findIndex(p => p.toLowerCase().includes('hyderabad'));
  if (idx > 0) return parts[idx - 1];
  if (parts.length >= 2) return parts[parts.length - 2];
  return parts[0] || '';
}
