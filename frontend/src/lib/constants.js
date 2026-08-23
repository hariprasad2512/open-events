export const CATEGORY_META = {
  'Music': {
    color: '#EB5E28',
    bg: 'rgba(235, 94, 40, 0.1)',
    border: 'rgba(235, 94, 40, 0.25)',
    symbol: '✿',
    iconType: 'music',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80'
  },
  'Theatre & Arts': {
    color: '#8B5CF6',
    bg: 'rgba(139, 92, 246, 0.1)',
    border: 'rgba(139, 92, 246, 0.25)',
    symbol: '✦',
    iconType: 'theatre',
    fallbackImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80'
  },
  'Talks & Meetups': {
    color: '#3B82F6',
    bg: 'rgba(59, 130, 246, 0.1)',
    border: 'rgba(59, 130, 246, 0.25)',
    symbol: '◉',
    iconType: 'talks',
    fallbackImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'
  },
  'Workshops & Classes': {
    color: '#10B981',
    bg: 'rgba(16, 185, 129, 0.1)',
    border: 'rgba(16, 185, 129, 0.25)',
    symbol: '◈',
    iconType: 'workshops',
    fallbackImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80'
  },
  'Food & Drink': {
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.25)',
    symbol: '☼',
    iconType: 'food',
    fallbackImage: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80'
  },
  'Nightlife': {
    color: '#EC4899',
    bg: 'rgba(236, 72, 153, 0.1)',
    border: 'rgba(236, 72, 153, 0.25)',
    symbol: '⌁',
    iconType: 'nightlife',
    fallbackImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80'
  },
  'Sports & Outdoors': {
    color: '#06B6D4',
    bg: 'rgba(6, 182, 212, 0.1)',
    border: 'rgba(6, 182, 212, 0.25)',
    symbol: '▲',
    iconType: 'sports',
    fallbackImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80'
  },
  'Family / Kids': {
    color: '#F97316',
    bg: 'rgba(249, 115, 22, 0.1)',
    border: 'rgba(249, 115, 22, 0.25)',
    symbol: '◆',
    iconType: 'family',
    fallbackImage: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80'
  }
};

export const ALL_CATEGORIES = Object.keys(CATEGORY_META);

export const HYDERABAD_LOCALITIES = [
  'All Areas',
  'Banjara Hills',
  'Jubilee Hills',
  'Madhapur',
  'Hitech City',
  'Gachibowli',
  'Financial District',
  'Kondapur',
  'Begumpet',
  'Old City'
];

export function getCategoryMeta(cat) {
  if (!cat) return CATEGORY_META['Music'];
  if (CATEGORY_META[cat]) return CATEGORY_META[cat];
  
  const c = String(cat).toLowerCase();
  if (c.includes('music') || c.includes('concert') || c.includes('singles')) return CATEGORY_META['Music'];
  if (c.includes('theatre') || c.includes('art') || c.includes('comedy') || c.includes('dance')) return CATEGORY_META['Theatre & Arts'];
  if (c.includes('talk') || c.includes('meetup') || c.includes('conference') || c.includes('literary')) return CATEGORY_META['Talks & Meetups'];
  if (c.includes('workshop') || c.includes('class') || c.includes('learning')) return CATEGORY_META['Workshops & Classes'];
  if (c.includes('food') || c.includes('drink') || c.includes('baking')) return CATEGORY_META['Food & Drink'];
  if (c.includes('nightlife') || c.includes('club') || c.includes('dj')) return CATEGORY_META['Nightlife'];
  if (c.includes('sport') || c.includes('outdoor') || c.includes('fitness') || c.includes('trek')) return CATEGORY_META['Sports & Outdoors'];
  if (c.includes('kid') || c.includes('family') || c.includes('children')) return CATEGORY_META['Family / Kids'];

  return {
    color: '#71717A',
    bg: 'rgba(113, 113, 122, 0.1)',
    border: 'rgba(113, 113, 122, 0.25)',
    symbol: '✦',
    iconType: 'talks',
    fallbackImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'
  };
}

export function formatDate(rawDate) {
  if (!rawDate) return 'Date TBA';
  try {
    const d = new Date(rawDate);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    }
  } catch (_) {}
  return rawDate;
}

export function formatPrice(price) {
  if (!price || price === 'Free' || String(price).toLowerCase().includes('free') || price === 0 || price === '0') {
    return 'Free Entry';
  }
  if (String(price).startsWith('₹') || String(price).startsWith('Rs')) {
    return String(price);
  }
  return `₹${price}`;
}
