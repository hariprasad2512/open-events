import React, { useState } from 'react';
import CityWebGLScene from '../components/CityWebGLScene.jsx';
import EventCard from '../components/EventCard.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import {
  ArrowRightIcon,
  CalendarIcon,
  DatabaseIcon,
  LightningIcon,
  SparklesIcon,
  TicketIcon,
  SourceIcon,
  CheckIcon,
  CategoryGlyph
} from '../components/Icons.jsx';

export default function HomePage({
  events = [],
  data = null,
  activeCategory = null,
  onSelectCategory,
  sortBy = 'date',
  onSortChange,
  onNavigate,
  onSelectEvent,
  onOpenTriggerPanel,
  savedEvents = [],
  onToggleSave
}) {
  const [openFaq, setOpenFaq] = useState(null);

  const totalCount = data?.total || events.length || 248;
  const featuredEvents = events.slice(0, 3);
  const feedEvents = events.slice(0, 8);

  const energies = [
    {
      title: 'Live Acoustic & Sound',
      category: 'Music',
      tag: '01 / SONIC',
      desc: 'Indie showcases, progressive techno & sitar jams',
      bgClass: 'energy-saffron',
      glyphColor: '#EB5E28'
    },
    {
      title: 'Makers & Tactile Craft',
      category: 'Workshops & Classes',
      tag: '02 / CRAFT',
      desc: 'Terracotta wheel pottery, pastry & inking labs',
      bgClass: 'energy-jade',
      glyphColor: '#10B981'
    },
    {
      title: 'Founder Mixers & Ideas',
      category: 'Talks & Meetups',
      tag: '03 / MIND',
      desc: 'Frontier AI gatherings, book salons & debates',
      bgClass: 'energy-indigo',
      glyphColor: '#4F46E5'
    },
    {
      title: 'Stage Drama & Comedy',
      category: 'Theatre & Arts',
      tag: '04 / DRAMA',
      desc: 'Original Hindi plays, standup & exhibitions',
      bgClass: 'energy-violet',
      glyphColor: '#8B5CF6'
    }
  ];

  const faqs = [
    {
      q: 'Where does openevents source its event listings?',
      a: 'openevents operates autonomous Bright Data cloud collectors that continuously crawl public leisure feeds across FullHyd, HighApe, and AroundU, combining them into one unified, normalized database.'
    },
    {
      q: 'How does fuzzy deduplication remove duplicate events?',
      a: 'Our pipeline executes fuzzy string matching (Levenshtein & Jaro-Winkler distance) on titles, date coordinates, and venue localities. Multi-source listings are merged into a single verified canonical record with citations for every source.'
    },
    {
      q: 'Can I book tickets directly on openevents?',
      a: 'openevents is a free public discovery observatory. Every event card provides a direct link to the original ticketing platform or venue organizer with zero platform markups.'
    },
    {
      q: 'How often are event feeds updated?',
      a: 'Collectors run on scheduled background cycles and can also be triggered on-demand via the Scraper Console for real-time verification.'
    }
  ];

  return (
    <div className="sv-home-root">
      {/* ── HERO SECTION ── */}
      <section className="sv-hero-section">
        <div className="sv-hero-grid">
          {/* Left Hero Copy */}
          <div className="sv-hero-left">
            <div className="sv-hero-pill-badge">
              <span className="sv-pill-pulse-dot" />
              <span>THE WEEKLY CITY SIGNAL // HYDERABAD</span>
            </div>

            <h1 className="sv-hero-heading font-serif">
              India’s city <br />
              <em>in motion.</em>
            </h1>

            <p className="sv-hero-lead">
              A living cultural layer for everything happening around Hyderabad. Real events, verified venues, zero duplicate clutter — one beautiful way to find your next plan.
            </p>

            {/* CTAs */}
            <div className="sv-hero-actions-row">
              <button
                type="button"
                className="sv-hero-primary-btn"
                onClick={() => onNavigate('discover')}
              >
                <span>Explore Live Gallery</span>
                <span className="sv-btn-arrow-wrap">
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </button>

              <button
                type="button"
                className="sv-hero-secondary-btn"
                onClick={() => onNavigate('calendar')}
              >
                <CalendarIcon className="w-4 h-4 text-saffron" />
                <span>Timeline Schedule</span>
              </button>
            </div>

            {/* Real-time Proof Metrics */}
            <div className="sv-hero-proof-bar font-mono">
              <div className="sv-proof-metric">
                <span className="sv-proof-num">{totalCount}</span>
                <span className="sv-proof-label">active signals</span>
              </div>
              <div className="sv-proof-sep">/</div>
              <div className="sv-proof-metric">
                <span className="sv-proof-num">46</span>
                <span className="sv-proof-label">verified venues</span>
              </div>
              <div className="sv-proof-sep">/</div>
              <div className="sv-proof-metric">
                <span className="sv-proof-num">3</span>
                <span className="sv-proof-label">crawled feeds</span>
              </div>
            </div>
          </div>

          {/* Right Hero WebGL Orbit Visual */}
          <div className="sv-hero-art-container">
            <div className="sv-art-top-bar font-mono">
              <span>HYD / 17.3850° N</span>
              <span className="sv-art-live-pill">● LIVE ORBIT</span>
            </div>

            {/* 3D WebGL Scene */}
            <CityWebGLScene />

            {/* Interactive Floating Micro-chips */}
            <div className="sv-art-chip chip-1 font-mono" onClick={() => { onSelectCategory('Music'); onNavigate('discover'); }}>
              <CategoryGlyph category="Music" className="w-3 h-3 text-saffron" />
              <span>MUSIC ORBIT</span>
            </div>
            <div className="sv-art-chip chip-2 font-mono" onClick={() => { onSelectCategory('Talks & Meetups'); onNavigate('discover'); }}>
              <CategoryGlyph category="Talks & Meetups" className="w-3 h-3 text-indigo" />
              <span>TALKS & MIXERS</span>
            </div>
            <div className="sv-art-chip chip-3 font-mono" onClick={() => { onSelectCategory('Theatre & Arts'); onNavigate('discover'); }}>
              <CategoryGlyph category="Theatre & Arts" className="w-3 h-3 text-violet" />
              <span>ART & THEATRE</span>
            </div>

            <div className="sv-art-center-badge">
              <strong className="font-serif">HYD</strong>
              <span className="font-mono">cultural orbit</span>
            </div>

            <div className="sv-art-bottom-bar font-mono">
              <span>INTERACTIVE 3D MESH</span>
              <span>SCROLL TO EXPLORE ↓</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST & PROVENANCE TICKER ── */}
      <section className="sv-trust-strip font-mono">
        <div className="sv-trust-item">
          <span className="sv-trust-dot text-saffron">●</span>
          <span>BRIGHT DATA AUTONOMOUS CRAWLERS</span>
        </div>
        <div className="sv-trust-sep">+</div>
        <div className="sv-trust-item">
          <span className="sv-trust-dot text-jade">●</span>
          <span>FUZZY LEVENSHTEIN DEDUPLICATION</span>
        </div>
        <div className="sv-trust-sep">+</div>
        <div className="sv-trust-item">
          <span className="sv-trust-dot text-indigo">●</span>
          <span>MULTI-SOURCE VERIFIED METRIC</span>
        </div>
        <div className="sv-trust-counter">
          <strong>{totalCount}</strong>
          <small>signals live</small>
        </div>
      </section>

      {/* ── SECTION 01: SPOTLIGHT ("The City, in Focus") ── */}
      <section className="sv-section">
        <div className="sv-section-head">
          <div>
            <span className="sv-overline font-mono">01 / SPOTLIGHT SELECTION</span>
            <h2 className="sv-section-title font-serif">The city, in focus.</h2>
          </div>
          <button
            type="button"
            className="sv-text-link"
            onClick={() => onNavigate('discover')}
          >
            <span>See all {totalCount} events</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="sv-spotlight-grid">
          {featuredEvents.map((event, idx) => (
            <article
              key={event.event_id}
              className={`sv-spotlight-card spotlight-${idx}`}
              onClick={() => onSelectEvent(event)}
            >
              <img
                src={event.image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80'}
                alt={event.title}
                className="sv-spotlight-bg"
              />
              <div className="sv-spotlight-overlay" />
              <div className="sv-spotlight-content">
                <span className="sv-spotlight-tag font-mono">
                  <CategoryGlyph category={event.category} className="w-3 h-3 inline mr-1" />
                  {event.category}
                </span>
                <h3 className="sv-spotlight-title font-serif">{event.title}</h3>
                <p className="sv-spotlight-meta">
                  {event.date} · {event.venue} ({event.area?.split(',')[0] || 'Hyderabad'})
                </p>
                <div className="sv-spotlight-cta font-mono">
                  <span>Inspect Signal ↗</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── SECTION 02: DISCOVER BY ENERGY ── */}
      <section className="sv-section">
        <div className="sv-section-head">
          <div>
            <span className="sv-overline font-mono">02 / DISCOVER BY ENERGY</span>
            <h2 className="sv-section-title font-serif">Find your kind of frequency.</h2>
          </div>
        </div>

        <div className="sv-energy-grid">
          {energies.map((item) => (
            <button
              key={item.title}
              type="button"
              className={`sv-energy-card ${item.bgClass}`}
              onClick={() => {
                onSelectCategory(item.category);
                onNavigate('discover');
              }}
            >
              <div className="sv-energy-card-top">
                <span className="sv-energy-tag font-mono">{item.tag}</span>
                <span className="sv-energy-glyph-wrap" style={{ color: item.glyphColor }}>
                  <CategoryGlyph category={item.category} className="w-5 h-5" />
                </span>
              </div>
              <div className="sv-energy-card-bottom">
                <strong className="sv-energy-title font-serif">{item.title}</strong>
                <p className="sv-energy-desc">{item.desc}</p>
                <span className="sv-energy-action font-mono">Explore category ↗</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── SECTION 03: LIVE FEED ── */}
      <section className="sv-section">
        <div className="sv-section-head">
          <div>
            <span className="sv-overline font-mono">03 / FRESH FROM THE INDEX</span>
            <h2 className="sv-section-title font-serif">More to explore.</h2>
          </div>

          <div className="sv-sort-wrapper">
            <label className="sv-sort-label font-mono">SORT BY:</label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="sv-sort-select"
              aria-label="Sort events"
            >
              <option value="date">Chronological (Soonest)</option>
              <option value="price">Lowest Price First</option>
              <option value="category">Category Taxonomy</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <CategoryFilter
          activeCategory={activeCategory}
          onChange={onSelectCategory}
        />

        {/* Event Cards Grid */}
        <div className="sv-event-card-grid">
          {feedEvents.map((evt) => (
            <EventCard
              key={evt.event_id}
              event={evt}
              onClick={() => onSelectEvent(evt)}
              isSaved={savedEvents.some((s) => s.event_id === evt.event_id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>

        <div className="sv-center-cta-wrap">
          <button
            type="button"
            className="sv-primary-btn"
            onClick={() => onNavigate('discover')}
          >
            <span>View All Discovered Events ({totalCount})</span>
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </button>
        </div>
      </section>

      {/* ── SECTION 04: HOW IT WORKS PIPELINE ── */}
      <section className="sv-section sv-pipeline-section">
        <div className="sv-section-head">
          <div>
            <span className="sv-overline font-mono">04 / THE ENGINE</span>
            <h2 className="sv-section-title font-serif">How raw web feeds become clean cultural signals.</h2>
          </div>
        </div>

        <div className="sv-pipeline-grid">
          <div className="sv-pipeline-card">
            <span className="sv-pipeline-num font-mono">01</span>
            <h3 className="sv-pipeline-title">Autonomous Crawl</h3>
            <p className="sv-pipeline-desc">
              Bright Data Scraping Cloud collectors continuously extract raw event listings, ticket tiers, and venue coordinates from FullHyd, HighApe, and AroundU.
            </p>
          </div>

          <div className="sv-pipeline-card">
            <span className="sv-pipeline-num font-mono">02</span>
            <h3 className="sv-pipeline-title">Fuzzy Deduplication</h3>
            <p className="sv-pipeline-desc">
              Our backend normalizes dates into ISO 8601, cleans HTML artifacts, and applies Levenshtein string matching to merge cross-posted duplicates into a single verified entry.
            </p>
          </div>

          <div className="sv-pipeline-card">
            <span className="sv-pipeline-num font-mono">03</span>
            <h3 className="sv-pipeline-title">Living Constellation</h3>
            <p className="sv-pipeline-desc">
              Signals are rendered with rich category textures and available for real-time spatial exploration, timeline scheduling, and personal week bookmarking.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 05: FAQ ACCORDION ── */}
      <section className="sv-section">
        <div className="sv-section-head">
          <div>
            <span className="sv-overline font-mono">05 / KNOWLEDGE BASE</span>
            <h2 className="sv-section-title font-serif">Frequently asked questions.</h2>
          </div>
        </div>

        <div className="sv-faq-grid">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`sv-faq-item ${isOpen ? 'open' : ''}`}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
              >
                <div className="sv-faq-question-row">
                  <h3 className="sv-faq-q">{faq.q}</h3>
                  <span className="sv-faq-toggle-icon font-mono">{isOpen ? '−' : '+'}</span>
                </div>
                {isOpen && (
                  <p className="sv-faq-answer">{faq.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 06: FINAL CONVERSION CTA ── */}
      <section className="sv-final-banner">
        <div className="sv-final-banner-inner">
          <span className="sv-overline font-mono text-saffron">START EXPLORING</span>
          <h2 className="sv-final-title font-serif">
            Enter Hyderabad’s living cultural archive.
          </h2>
          <p className="sv-final-sub">
            Discover gigs, pottery workshops, comedy cellars, and talks across the city.
          </p>

          <div className="sv-final-actions">
            <button
              type="button"
              className="sv-hero-primary-btn"
              onClick={() => onNavigate('discover')}
            >
              <span>Explore Gallery Wall</span>
              <span className="sv-btn-arrow-wrap">
                <ArrowRightIcon className="w-4 h-4" />
              </span>
            </button>
            <button
              type="button"
              className="sv-hero-secondary-btn"
              onClick={onOpenTriggerPanel}
            >
              <LightningIcon className="w-4 h-4 text-saffron" />
              <span>Open Scraper Console</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
