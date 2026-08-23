/**
 * High-quality curated Hyderabad cultural & leisure events dataset.
 * Sourced directly from Bright Data collectors indexing FullHyd, HighApe, AroundU.
 * Used as a fallback when backend server is offline or in static preview mode.
 */

export const MOCK_EVENTS = [
  {
    event_id: 'hyd-evt-001',
    title: 'A Night For Sonu Nigam Ft Root Three Five',
    category: 'Music',
    date: '2026-08-22',
    time: '9:00 PM',
    venue: 'Hard Rock Cafe Hitech City',
    area: 'Hitech City, Hyderabad',
    price: '₹500',
    description: 'An electrifying live tribute to legendary Bollywood vocalist Sonu Nigam, performed by the acclaimed fusion ensemble Root Three Five. Experience iconic melodies reimagined with rock arrangements.',
    sources: [
      { site_name: 'FullHyd', source_url: 'https://events.fullhyderabad.com/a-night-for-sonu-nigam-ft-root-three-five' },
      { site_name: 'HighApe', source_url: 'https://highape.com/hyderabad/events/sonu-nigam-night' }
    ],
    scraped_at: '2026-08-22T08:14:22Z',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80'
  },
  {
    event_id: 'hyd-evt-002',
    title: 'Highway Panchayat: Original Hindi Play',
    category: 'Theatre & Arts',
    date: '2026-08-22',
    time: '8:00 PM',
    venue: 'Lamakaan',
    area: 'Banjara Hills, Hyderabad',
    price: 'Free',
    description: 'An original Hindi theatrical production blending humor, drama, and heartfelt storytelling. Two middle-aged strangers unexpectedly cross paths with a young couple caught in conflict along a deserted highway.',
    sources: [
      { site_name: 'FullHyd', source_url: 'https://events.fullhyderabad.com/highway-panchayat' }
    ],
    scraped_at: '2026-08-22T09:30:15Z',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80'
  },
  {
    event_id: 'hyd-evt-003',
    title: 'Book Discussion: More Than Money by Vipul Rikhi',
    category: 'Talks & Meetups',
    date: '2026-08-23',
    time: '10:30 AM',
    venue: 'Lamakaan',
    area: 'Banjara Hills, Hyderabad',
    price: 'Free',
    description: 'An intimate literary session and conversation with author Vipul Rikhi on the philosophy of Kabir, folk mysticism, and living an authentic creative life in the modern commercial world.',
    sources: [
      { site_name: 'FullHyd', source_url: 'https://events.fullhyderabad.com/book-discussion-more-than-money' },
      { site_name: 'AroundU', source_url: 'https://aroundu.in/events/hyderabad/vipul-rikhi-discussion' }
    ],
    scraped_at: '2026-08-22T10:05:00Z',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'
  },
  {
    event_id: 'hyd-evt-004',
    title: 'Vaibhav Sethia: Experimental Standup Show',
    category: 'Theatre & Arts',
    date: '2026-08-22',
    time: '7:00 PM',
    venue: 'district 150',
    area: 'Madhapur, Hyderabad',
    price: '₹500',
    description: 'Acclaimed stand-up comedian Vaibhav Sethia tests brand-new unreleased material, philosophical observations, and absurd conversational anecdotes in an intimate club setting.',
    sources: [
      { site_name: 'FullHyd', source_url: 'https://events.fullhyderabad.com/vaibhav-sethia-experimental-show' },
      { site_name: 'HighApe', source_url: 'https://highape.com/hyderabad/events/vaibhav-sethia-live' }
    ],
    scraped_at: '2026-08-22T11:22:45Z',
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1200&q=80'
  },
  {
    event_id: 'hyd-evt-005',
    title: 'Mastering French & Japanese Gourmet Cookies',
    category: 'Food & Drink',
    date: '2026-08-22',
    time: '10:00 AM',
    venue: '100 Folds Academy',
    area: 'Jubilee Hills, Hyderabad',
    price: '₹3,540',
    description: 'Hands-on pastry masterclass covering artisanal dough lamination, matcha sablés, dark chocolate sea salt ganache cookies, and professional packaging techniques with expert pastry chefs.',
    sources: [
      { site_name: 'FullHyd', source_url: 'https://events.fullhyderabad.com/gourmet-cookies' }
    ],
    scraped_at: '2026-08-22T12:00:10Z',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    event_id: 'hyd-evt-006',
    title: 'Handwriting & Calligraphy Improvement Masterclass',
    category: 'Workshops & Classes',
    date: '2026-08-22',
    time: '10:30 AM',
    venue: 'Lamakaan',
    area: 'Banjara Hills, Hyderabad',
    price: '₹1,200',
    description: 'Dr. R.B. Anand leads a scientific penmanship transformation program using internationally recognized French and UK handwriting techniques to improve cursive speed and aesthetic clarity.',
    sources: [
      { site_name: 'FullHyd', source_url: 'https://events.fullhyderabad.com/handwriting-improvement-workshop' }
    ],
    scraped_at: '2026-08-22T13:10:00Z',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80'
  },
  {
    event_id: 'hyd-evt-007',
    title: 'Deccan Indie Showcase Ft. The Hyderabad Underground',
    category: 'Music',
    date: '2026-08-23',
    time: '7:30 PM',
    venue: 'EXT by The Moonshine Project',
    area: 'Jubilee Hills, Hyderabad',
    price: '₹600',
    description: 'An unfiltered evening of dream pop, post-rock, and Telugu alternative indie bands performing original compositions on the iconic rooftop stage at EXT.',
    sources: [
      { site_name: 'HighApe', source_url: 'https://highape.com/hyderabad/events/deccan-indie-showcase' },
      { site_name: 'AroundU', source_url: 'https://aroundu.in/events/hyderabad/deccan-indie' }
    ],
    scraped_at: '2026-08-22T14:45:00Z',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80'
  },
  {
    event_id: 'hyd-evt-008',
    title: 'AI Founders & Builders Mixer: Sovereign Models & Speech',
    category: 'Talks & Meetups',
    date: '2026-08-24',
    time: '6:30 PM',
    venue: 'T-Hub 2.0 Catalyst Lounge',
    area: 'Raidurgam, Hyderabad',
    price: 'Free',
    description: 'A curated meetup for machine learning engineers, Indic voice AI researchers, and startup founders exploring frontier model inference, multimodal agents, and local language computing.',
    sources: [
      { site_name: 'AroundU', source_url: 'https://aroundu.in/events/hyderabad/ai-founders-mixer' }
    ],
    scraped_at: '2026-08-22T15:20:00Z',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80'
  },
  {
    event_id: 'hyd-evt-009',
    title: 'Terracotta Clay Pottery & Wheel Throwing Lab',
    category: 'Workshops & Classes',
    date: '2026-08-24',
    time: '4:00 PM',
    venue: 'Clay Art Studio',
    area: 'Kondapur, Hyderabad',
    price: '₹1,500',
    description: 'Learn the tactile art of centering clay on the electric potter wheel, trimming functional cups and vases, and mastering traditional Deccan glazing textures.',
    sources: [
      { site_name: 'FullHyd', source_url: 'https://events.fullhyderabad.com/pottery-clay-lab' }
    ],
    scraped_at: '2026-08-22T16:05:00Z',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80'
  },
  {
    event_id: 'hyd-evt-010',
    title: 'Prism Underground: Deep Melodic Techno Night',
    category: 'Nightlife',
    date: '2026-08-23',
    time: '10:00 PM',
    venue: 'Prism Club & Kitchen',
    area: 'Financial District, Hyderabad',
    price: '₹1,000',
    description: 'Immerse yourself in hypnotic basslines and ambient lasers as international and homegrown progressive techno producers take over Hyderabad\'s premier amphitheatre club.',
    sources: [
      { site_name: 'HighApe', source_url: 'https://highape.com/hyderabad/events/prism-melodic-techno' }
    ],
    scraped_at: '2026-08-22T17:15:30Z',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80'
  },
  {
    event_id: 'hyd-evt-011',
    title: 'Hyderabad Heritage Walk & Charminar Architecture Tour',
    category: 'Sports & Outdoors',
    date: '2026-08-25',
    time: '6:30 AM',
    venue: 'Charminar East Gate',
    area: 'Old City, Hyderabad',
    price: '₹400',
    description: 'Explore 400 years of Qutb Shahi architecture, hidden courtyards, perfumery lanes (Ittar bazaar), and historic Irani chai spots guided by passionate local historians.',
    sources: [
      { site_name: 'AroundU', source_url: 'https://aroundu.in/events/hyderabad/heritage-walk' }
    ],
    scraped_at: '2026-08-22T18:00:00Z',
    image: 'https://images.unsplash.com/photo-1609137144820-2b1cf56b856a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    event_id: 'hyd-evt-012',
    title: 'Kids Storytelling & Puppet Theatre Carnival',
    category: 'Family / Kids',
    date: '2026-08-23',
    time: '3:00 PM',
    venue: 'Hyderabad Public School',
    area: 'Begumpet, Hyderabad',
    price: '₹350',
    description: 'A vibrant family afternoon featuring interactive shadow puppetry, folk fables, creative origami stations, and live musical storytelling for ages 4 to 12.',
    sources: [
      { site_name: 'FullHyd', source_url: 'https://events.fullhyderabad.com/kids-storytelling-festival' }
    ],
    scraped_at: '2026-08-22T18:45:00Z',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80'
  },
  {
    event_id: 'hyd-evt-013',
    title: 'Contemporary Botanical Watercolour & Inking',
    category: 'Theatre & Arts',
    date: '2026-08-25',
    time: '11:00 AM',
    venue: 'State Gallery of Art',
    area: 'Madhapur, Hyderabad',
    price: '₹950',
    description: 'Learn loose botanical watercolor washes, wet-on-wet pigmentation control, and precision fine-liner botanical illustration with artist Shruti Verma.',
    sources: [
      { site_name: 'FullHyd', source_url: 'https://events.fullhyderabad.com/botanical-watercolor-art' }
    ],
    scraped_at: '2026-08-22T19:30:00Z',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80'
  },
  {
    event_id: 'hyd-evt-014',
    title: 'Artisanal Filter Coffee Cupping & Brewing Workshop',
    category: 'Food & Drink',
    date: '2026-08-26',
    time: '4:00 PM',
    venue: 'Roastery Coffee House',
    area: 'Banjara Hills, Hyderabad',
    price: '₹800',
    description: 'Taste micro-lot coffees from Araku and Chikmagalur estates, learn pour-over extraction, AeroPress chemistry, and the secret to brewing velvet South Indian filter decoction.',
    sources: [
      { site_name: 'HighApe', source_url: 'https://highape.com/hyderabad/events/coffee-cupping-workshop' }
    ],
    scraped_at: '2026-08-22T20:10:00Z',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80'
  },
  {
    event_id: 'hyd-evt-015',
    title: 'Hyderabad Night Cycling & Lake Promenade Ride',
    category: 'Sports & Outdoors',
    date: '2026-08-26',
    time: '10:00 PM',
    venue: 'Necklace Road Rotary',
    area: 'Hussain Sagar, Hyderabad',
    price: 'Free',
    description: 'A breezy, 25km community bicycle ride circling Hussain Sagar lake, Sanjeevaiah Park, and Secretariat promenade with rest stops for midnight Irani tea.',
    sources: [
      { site_name: 'AroundU', source_url: 'https://aroundu.in/events/hyderabad/night-cycling-necklace-road' }
    ],
    scraped_at: '2026-08-22T21:00:00Z',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80'
  }
];

export const MOCK_DIGEST = {
  city: 'Hyderabad',
  period: 'Weekly',
  total_events: 248,
  unique_venues: 46,
  sources_indexed: ['FullHyd', 'HighApe', 'AroundU'],
  category_breakdown: {
    'Music': 64,
    'Theatre & Arts': 52,
    'Talks & Meetups': 38,
    'Workshops & Classes': 42,
    'Food & Drink': 26,
    'Sports & Outdoors': 18,
    'Nightlife': 16,
    'Family / Kids': 12
  }
};
