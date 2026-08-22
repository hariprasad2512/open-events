import React, { useEffect, useRef, useState } from 'react';
import SceneLandingPage from '../components/SceneLandingPage.jsx';
import EventCard from '../components/EventCard.jsx';
import { ArrowRightIcon, CalendarIcon, DatabaseIcon, LightningIcon, SparklesIcon, TicketIcon, SourceIcon } from '../components/Icons.jsx';

export default function HomePage({
  events = [],
  onNavigate,
  onSelectEvent,
  onSelectCategory,
  onOpenTriggerPanel
}) {
  const featuredEvents = events.slice(0, 6);
  const [taglineProgress, setTaglineProgress] = useState(0);
  const taglineRef = useRef(null);

  // Tagline reveal animation using IntersectionObserver / smooth scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTaglineProgress(1);
        }
      },
      { threshold: 0.35 }
    );

    if (taglineRef.current) {
      observer.observe(taglineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const taglineWords = [
    "A", "city", "is", "not", "a", "calendar", "grid.",
    "It", "is", "a", "living", "constellation", "of",
    "human", "sound,", "material", "craft,", "and",
    "shared", "thought."
  ];

  const categories = [
    { name: 'Music', symbol: '✿', desc: 'Live concerts, sitars, acoustic jams & waveforms', image: '/assets/music_concert_visual.jpg' },
    { name: 'Theatre & Arts', symbol: '✦', desc: 'Terracotta pottery, canvas paintings & plays', image: '/assets/art_workshop_visual.jpg' },
    { name: 'Talks & Meetups', symbol: '◉', desc: 'Archival ideas, founder mixers & keynotes', image: '/assets/ideas_talks_visual.jpg' },
    { name: 'Sports & Outdoors', symbol: '⌁', desc: 'Trekking, outdoor camps & wilderness survival', image: '/assets/hyderabad_cultural_hero.jpg' },
    { name: 'Family / Kids', symbol: '◆', desc: 'Neighborhood gatherings & community workshops', image: '/assets/hyderabad_cultural_hero.jpg' }
  ];

  const faqs = [
    {
      q: "Where does RASA get its event listings?",
      a: "RASA uses autonomous Bright Data collectors to index public leisure feeds across FullHyd, HighApe, and AroundU, merging them into one canonical database."
    },
    {
      q: "Can I book tickets directly on RASA?",
      a: "RASA is a free discovery observatory. Each event card links directly to the official ticketing source with zero platform markups."
    },
    {
      q: "How does deduplication eliminate duplicate events?",
      a: "Our pipeline executes fuzzy string matching on titles, dates, and venue coordinates to merge duplicate listings into a single verified entry with multi-source badges."
    },
    {
      q: "How often are event feeds updated?",
      a: "Collectors run continuously on scheduled cycles and can also be triggered instantly through the Scraper Console."
    },
    {
      q: "Is RASA free to access?",
      a: "Yes. RASA is completely free and accessible to all cultural seekers with no paywalls or required signups."
    },
    {
      q: "How do I save events for my week?",
      a: "Click into any event and select '+ ADD TO CONSTELLATION' to pin the signal to your personal spatial observatory."
    }
  ];

  return (
    <div className="landing-page-root">
      {/* ── SECTION 1: HERO (Above the fold) ── */}
      <section className="landing-hero-section">
        <div className="hero-kicker-badge">
          <span className="kicker-dot" />
          <span>HYDERABAD CULTURAL OBSERVATORY</span>
        </div>

        <h1 className="landing-hero-headline">
          Discover independent city culture before it sells out
        </h1>

        <p className="landing-hero-subheadline">
          Real-time crawlers aggregate gigs, pottery workshops, theatre plays, and founder meetups across Hyderabad into one living index.
        </p>

        <div className="landing-hero-actions">
          <button
            onClick={() => onNavigate('discover')}
            className="landing-primary-btn"
          >
            <span>Explore Live Gallery</span>
            <ArrowRightIcon className="w-4 h-4 ml-2 inline-block" />
          </button>
          <button
            onClick={() => onNavigate('calendar')}
            className="landing-secondary-btn"
          >
            <span>View City Timeline</span>
          </button>
        </div>

        {/* Proof Line */}
        <div className="hero-proof-line">
          <div className="proof-metric">
            <span className="proof-num font-mono">{events.length > 0 ? events.length : 128}</span>
            <span className="proof-label">active cultural signals</span>
          </div>
          <div className="proof-divider" />
          <div className="proof-metric">
            <span className="proof-num font-mono">42</span>
            <span className="proof-label">verified venues</span>
          </div>
          <div className="proof-divider" />
          <div className="proof-metric">
            <span className="proof-num font-mono">3</span>
            <span className="proof-label">crawled platforms</span>
          </div>
        </div>

        {/* 3D Visual Artwork Hero Banner */}
        <div className="landing-hero-artwork-box">
          <img
            src="/assets/hyderabad_cultural_hero.jpg"
            alt="Hyderabad Cultural Sculpture"
            className="landing-hero-artwork-img"
          />
          <div className="landing-hero-artwork-overlay" />
          <div className="landing-hero-artwork-badge">
            <SparklesIcon className="w-4 h-4 text-gold-accent inline-block mr-2" />
            <span>HERO SCULPTURE · CHARMINAR ORBITS</span>
          </div>
        </div>
      </section>

      {/* ── 3D Interactive Canvas ── */}
      <SceneLandingPage
        onSelectCategory={(cat) => {
          onSelectCategory(cat);
          onNavigate('discover');
        }}
      />

      {/* ── SECTION 2: MANDATORY TAGLINE REVEAL (B11) ── */}
      <section ref={taglineRef} className="tagline-reveal-section">
        <div className="tagline-kicker">[THE LIVING CITY]</div>
        <div className="tagline-words-wrap">
          {taglineWords.map((word, idx) => (
            <span
              key={idx}
              className={`tagline-word ${taglineProgress ? 'active' : ''}`}
              style={{
                transitionDelay: `${idx * 45}ms`
              }}
            >
              {word}{' '}
            </span>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: PROBLEM VS SOLUTION ── */}
      <section className="problem-solution-section">
        <div className="section-header-block">
          <span className="statement-badge">[THE SHIFT]</span>
          <h2 className="section-title">Built for explorers, not ticket brokers</h2>
          <p className="section-subtitle">
            How RASA transforms scattered commercial feeds into a unified cultural archive.
          </p>
        </div>

        <div className="comparison-grid">
          <div className="comparison-card traditional">
            <h3 className="comparison-card-title">Traditional Walled Gardens</h3>
            <ul className="comparison-list">
              <li>Scattered across 5+ different booking apps</li>
              <li>Same event listed multiple times with conflicting dates</li>
              <li>Algorithms push commercial stadium tours over local craft</li>
              <li>No transparent crawl or provenance metadata</li>
            </ul>
          </div>

          <div className="comparison-card rasa-way">
            <h3 className="comparison-card-title">The RASA Observatory</h3>
            <ul className="comparison-list">
              <li>Single unified index for all independent city leisure</li>
              <li>Fuzzy deduplication merges duplicate listings automatically</li>
              <li>Equal visibility for clay workshops, jazz gigs, and talks</li>
              <li>Full scraper provenance with collector IDs and timestamps</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: OUTCOME BENEFITS ── */}
      <section className="benefits-section">
        <div className="section-header-block">
          <span className="statement-badge">[CORE BENEFITS]</span>
          <h2 className="section-title">Everything you need to navigate city culture</h2>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon-box">
              <SparklesIcon className="w-5 h-5 text-gold-accent" />
            </div>
            <h3 className="benefit-title">Unified City Index</h3>
            <p className="benefit-desc">
              Stop switching between five different ticketing portals. Every independent gig, comedy night, and pottery workshop is organized in one place.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-box">
              <DatabaseIcon className="w-5 h-5 text-cyan-accent" />
            </div>
            <h3 className="benefit-title">Zero Duplicate Noise</h3>
            <p className="benefit-desc">
              Multi-source cross-posted events are automatically merged into clean canonical records with verifiable source citations.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-box">
              <CalendarIcon className="w-5 h-5 text-purple-glow" />
            </div>
            <h3 className="benefit-title">Living Temporal Horizon</h3>
            <p className="benefit-desc">
              Explore your week chronologically or switch to personal spatial constellation mode to plan your cultural calendar effortlessly.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-box">
              <LightningIcon className="w-5 h-5 text-rose-glow" />
            </div>
            <h3 className="benefit-title">Scraper Provenance</h3>
            <p className="benefit-desc">
              Inspect exact crawl timestamps, collector IDs, and direct organizer links on every artifact for complete data transparency.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: HOW IT WORKS ── */}
      <section className="how-it-works-section">
        <div className="section-header-block">
          <span className="statement-badge">[THE PIPELINE]</span>
          <h2 className="section-title">How raw web feeds become cultural artifacts</h2>
        </div>

        <div className="steps-row">
          <div className="step-card">
            <span className="step-number font-mono">01</span>
            <h3 className="step-title">Autonomous Crawl</h3>
            <p className="step-desc">
              Bright Data collectors stream raw event feeds from FullHyd, HighApe, and AroundU on scheduled intervals.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number font-mono">02</span>
            <h3 className="step-title">Fuzzy Deduplication</h3>
            <p className="step-desc">
              The processing pipeline normalizes date coordinates, standardizes price tiers, and reconciles duplicate listings.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number font-mono">03</span>
            <h3 className="step-title">Artistic Rendering</h3>
            <p className="step-desc">
              Cleaned event signals are styled into collectible poster artifacts with category-specific visual textures.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: LIVE GALLERY PREVIEW ── */}
      <section className="live-preview-section">
        <div className="section-header-block">
          <span className="statement-badge">[CURATED GALLERY]</span>
          <h2 className="section-title">Happening this week in Hyderabad</h2>
          <p className="section-subtitle">
            Live cultural signals indexed and ready for exploration.
          </p>
        </div>

        <div className="featured-cards-grid">
          {featuredEvents.map((evt) => (
            <EventCard
              key={evt.event_id}
              event={evt}
              onClick={() => onSelectEvent(evt)}
            />
          ))}
        </div>

        <div className="view-all-cta-wrap">
          <button
            onClick={() => onNavigate('discover')}
            className="landing-primary-btn"
          >
            <span>View All {events.length} Events</span>
            <ArrowRightIcon className="w-4 h-4 ml-2 inline-block" />
          </button>
        </div>
      </section>

      {/* ── SECTION 7: FAQ SECTION ── */}
      <section className="landing-faq-section">
        <div className="section-header-block">
          <span className="statement-badge">[FREQUENTLY ASKED QUESTIONS]</span>
          <h2 className="section-title">Answers to common questions</h2>
        </div>

        <div className="faq-grid">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-card">
              <h3 className="faq-question">{faq.q}</h3>
              <p className="faq-answer">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 8: FINAL CONVERSION ACTION ── */}
      <section className="final-cta-section">
        <div className="final-cta-box">
          <span className="statement-badge">[START EXPLORING]</span>
          <h2 className="final-cta-title">
            Enter Hyderabad's living cultural archive
          </h2>
          <p className="final-cta-subtitle">
            Explore independent gigs, pottery workshops, comedy cellars, and talks across the city.
          </p>
          <div className="landing-hero-actions">
            <button
              onClick={() => onNavigate('discover')}
              className="landing-primary-btn"
            >
              <span>Explore Live Gallery</span>
              <ArrowRightIcon className="w-4 h-4 ml-2 inline-block" />
            </button>
            <button
              onClick={onOpenTriggerPanel}
              className="landing-secondary-btn"
            >
              <span>Open Scraper Console</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: FOOTER ── */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo font-serif">RASA</span>
            <p className="footer-tagline">Hyderabad Cultural Observatory & Event Archive</p>
          </div>
          <div className="footer-meta font-mono">
            <span>DATA SOURCE: BRIGHT DATA COLLECTORS</span>
            <span>·</span>
            <span>STATUS: LIVE FEEDS ACTIVE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
