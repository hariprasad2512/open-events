import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Hero13 from '../components/originkit/hero-13.jsx';
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
      tag: 'FREQ_01 // 44.1 kHz',
      band: 'SONIC SPECTRUM',
      desc: 'Indie showcases, progressive techno, and classical sitar jams.',
      bgClass: 'energy-saffron',
      glyphColor: '#FF6B35',
      signalCount: '64 SIGNALS'
    },
    {
      title: 'Makers & Tactile Craft',
      category: 'Workshops & Classes',
      tag: 'FREQ_02 // 2.4 GHz',
      band: 'TACTILE LABS',
      desc: 'Terracotta wheel pottery, pastry ateliers, and screen printing.',
      bgClass: 'energy-jade',
      glyphColor: '#10B981',
      signalCount: '38 SIGNALS'
    },
    {
      title: 'Founder Mixers & Ideas',
      category: 'Talks & Meetups',
      tag: 'FREQ_03 // 5.8 GHz',
      band: 'INTELLECTUAL SALONS',
      desc: 'Frontier AI gatherings, philosophy salons, and founder roundtables.',
      bgClass: 'energy-indigo',
      glyphColor: '#FFAA64',
      signalCount: '42 SIGNALS'
    },
    {
      title: 'Stage Drama & Comedy',
      category: 'Theatre & Arts',
      tag: 'FREQ_04 // 10.2 GHz',
      band: 'PERFORMANCE STAGES',
      desc: 'Original Hindi/Telugu stage plays, comedy cellars, and fine art.',
      bgClass: 'energy-violet',
      glyphColor: '#34D399',
      signalCount: '28 SIGNALS'
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
      {/* ── SECTION 00: ORIGINKIT HERO 13 ── */}
      <Hero13
        totalCount={totalCount}
        onExplore={() => onNavigate('discover')}
        onTimeline={() => onNavigate('calendar')}
        onOpenConsole={onOpenTriggerPanel}
      />

      

      {/* ── SECTION 01: SPOTLIGHT ── */}
      <section className="sv-section">
        <div className="sv-section-head">
          <div>
            <h2 className="sv-section-title font-serif">The city, in focus.</h2>
          </div>
          <button
            type="button"
            className="sv-text-link font-mono"
            onClick={() => onNavigate('discover')}
          >
            <span>VIEW ALL</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="sv-spotlight-grid">
          {featuredEvents.map((event, idx) => (
            <article
              key={event.event_id}
              className={`sv-spotlight-card sv-hud-card spotlight-${idx}`}
              onClick={() => onSelectEvent(event)}
            >
              <div className="sv-hud-top-bar font-mono">
                <span>SIG_FEATURED #0{idx + 1}</span>
                <span className="text-jade">● VERIFIED</span>
              </div>
              <img
                src={event.image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80'}
                alt={event.title}
                className="sv-spotlight-bg"
                loading="lazy"
              />
              <div className="sv-hud-scanlines" />
              <div className="sv-spotlight-overlay" />
              <div className="sv-spotlight-content">
                <span className="sv-spotlight-tag font-mono">
                  <CategoryGlyph category={event.category} className="w-3 h-3 inline mr-1" />
                  {event.category.toUpperCase()}
                </span>
                <h3 className="sv-spotlight-title font-serif">{event.title}</h3>
                <p className="sv-spotlight-meta font-mono">
                  {event.date} // {event.venue} ({event.area?.split(',')[0] || 'Hyderabad'})
                </p>
                <div className="sv-hud-action-btn font-mono">
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── SECTION 02: DISCOVER BY ENERGY ── */}
      

      {/* ── SECTION 03: LIVE FEED ── */}
      <section className="sv-section">
        <div className="sv-section-head">
          <div>
            <h2 className="sv-section-title font-serif">Living event gallery.</h2>
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
            className="sv-primary-btn font-mono"
            onClick={() => onNavigate('discover')}
          >
            <span>VIEW ALL EVENTS </span>
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </button>
        </div>
      </section>

      {/* ── SECTION 04: HOW IT WORKS PIPELINE ── */}
      

      {/* ── SECTION 05: FAQ ACCORDION ── */}
      <section className="sv-section">
        <div className="sv-section-head">
          <div>
            <h2 className="sv-section-title font-serif">Frequently asked questions.</h2>
          </div>
        </div>

        <div className="sv-faq-grid">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`sv-faq-item sv-hud-card ${isOpen ? 'open' : ''}`}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
              >
                <div className="sv-faq-question-row">
                  <h3 className="sv-faq-q">{faq.q}</h3>
                  <span className="sv-faq-toggle-icon font-mono">{isOpen ? '−' : '+'}</span>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      className="sv-faq-answer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 06: FINAL CONVERSION CTA ── */}
      <section className="sv-final-banner sv-hud-card">
        <span className="sv-hud-reticle top-left">+</span>
        <span className="sv-hud-reticle top-right">+</span>
        <span className="sv-hud-reticle bottom-left">+</span>
        <span className="sv-hud-reticle bottom-right">+</span>

        <div className="sv-final-banner-inner">
            <h2 className="sv-final-title font-serif">
            Enter Hyderabad’s living cultural archive.
          </h2>
          <p className="sv-final-sub">
            Discover gigs, pottery workshops, comedy cellars, and talks across the city in real time.
          </p>

          <div className="sv-final-actions font-mono">
            <button
              type="button"
              className="sv-hero-primary-btn"
              onClick={() => onNavigate('discover')}
            >
              <span>ACCESS EXCLUSIVE EVENTS</span>
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
              <span>LAUNCH DATA CONSOLE</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
