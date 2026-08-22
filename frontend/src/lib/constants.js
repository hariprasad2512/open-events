// Category → Saturated Indian Warm & Cyber Color Gradients matching Sarvam.ai vibe
export const CATEGORY_META = {
  'Music': {
    color: '#ff5e36',
    gradient: 'linear-gradient(135deg, #ff5e36 0%, #ff7a00 100%)',
    bg: 'rgba(255, 94, 54, 0.12)',
    border: 'rgba(255, 94, 54, 0.3)',
    iconType: 'music'
  },
  'Theatre & Arts': {
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    bg: 'rgba(168, 85, 247, 0.12)',
    border: 'rgba(168, 85, 247, 0.3)',
    iconType: 'theatre'
  },
  'Workshops & Classes': {
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    bg: 'rgba(6, 182, 212, 0.12)',
    border: 'rgba(6, 182, 212, 0.3)',
    iconType: 'workshops'
  },
  'Sports & Outdoors': {
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #84cc16 100%)',
    bg: 'rgba(16, 185, 129, 0.12)',
    border: 'rgba(16, 185, 129, 0.3)',
    iconType: 'sports'
  },
  'Food & Drink': {
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ff7a00 100%)',
    bg: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.3)',
    iconType: 'food'
  },
  'Talks & Meetups': {
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    bg: 'rgba(99, 102, 241, 0.12)',
    border: 'rgba(99, 102, 241, 0.3)',
    iconType: 'talks'
  },
  'Nightlife': {
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    bg: 'rgba(236, 72, 153, 0.12)',
    border: 'rgba(236, 72, 153, 0.3)',
    iconType: 'nightlife'
  },
  'Family / Kids': {
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316 0%, #eab308 100%)',
    bg: 'rgba(249, 115, 22, 0.12)',
    border: 'rgba(249, 115, 22, 0.3)',
    iconType: 'family'
  },
  'Exhibitions': {
    color: '#84cc16',
    gradient: 'linear-gradient(135deg, #84cc16 0%, #10b981 100%)',
    bg: 'rgba(132, 204, 22, 0.12)',
    border: 'rgba(132, 204, 22, 0.3)',
    iconType: 'exhibitions'
  },
};

export const ALL_CATEGORIES = Object.keys(CATEGORY_META);

export function getCategoryMeta(cat) {
  return CATEGORY_META[cat] || {
    color: '#94a3b8',
    gradient: 'linear-gradient(135deg, #64748b, #94a3b8)',
    bg: 'rgba(148, 163, 184, 0.12)',
    border: 'rgba(148, 163, 184, 0.3)',
    iconType: 'talks'
  };
}

export function formatDate(rawDate) {
  if (!rawDate) return '';
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
