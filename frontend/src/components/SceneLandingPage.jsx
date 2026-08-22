import { useState } from 'react';
import ParticleCanvas from './ParticleCanvas.jsx';
import FluidNavbar from './FluidNavbar.jsx';
import TaglineReveal from './TaglineReveal.jsx';
import DeduplicationVisualizer from './DeduplicationVisualizer.jsx';
import ScraperTelemetryWidget from './ScraperTelemetryWidget.jsx';

const FEATURED_REAL_EVENTS = [
  {
    title: 'LITJAM Hyderabad: Pyaar & Dosti Jam',
    category: 'Music',
    venue: 'Jammin Junction Bar & Kitchen',
    area: 'Jubilee Hills',
    price: '₹349',
    date: '23 Aug',
    time: '5:00 PM',
    sources: ['AroundU', 'FullHyd']
  },
  {
    title: "Entrepreneur's Mixer (Hyderabad)",
    category: 'Talks & Meetups',
    venue: 'Executive Hub',
    area: 'Madhapur',
    price: '₹500',
    date: '29 Aug',
    time: '5:00 PM',
    sources: ['AroundU', 'HydHub']
  },
  {
    title: 'Hyderabad Live Standup Comedy Jam',
    category: 'Theatre & Arts',
    venue: 'The Habitat Studio',
    area: 'Banjara Hills',
    price: '₹299',
    date: '30 Aug',
    time: '7:30 PM',
    sources: ['FullHyd']
  },
  {
    title: 'Tech Founders & AI Engineers Meetup',
    category: 'Workshops & Classes',
    venue: 'T-Hub 2.0',
    area: 'Raidurg',
    price: 'Free Entry',
    date: '02 Sep',
    time: '6:00 PM',
    sources: ['HydHub', 'AroundU']
  }
];

const FAQ_ITEMS = [
  {
    q: 'What sources does Scrapeverse track?',
    a: 'Scrapeverse currently aggregates FullHyd (events.fullhyderabad.com), HydHub (hydhub.in), and AroundU (aroundu.in) across Hyderabad, with modular scraper blueprints ready for expansion.'
  },
  {
    q: 'How are duplicate events detected across platforms?',
    a: 'Our fuzzy record matching engine evaluates title similarities, venue strings, and ISO dates using token set ratio algorithms, grouping matching listings into a single verified canonical card.'
  },
  {
    q: 'What happens when an upstream site changes layout?',
    a: 'The pipeline features an automated health validator. If DOM selectors fail, fallback self-healing parsers step in while logging telemetry alerts to prevent pipeline interruptions.'
  },
  {
    q: 'Can I filter events by specific neighborhood?',
    a: 'Yes. Every event is mapped to locality sectors like Jubilee Hills, Madhapur, Gachibowli, Banjara Hills, and Hitech City for instant neighborhood targeting.'
  },
  {
    q: 'Is the data available via REST API?',
    a: 'Yes. FastAPI endpoints serve normalized JSON payloads including category filters, area parameters, deduplication metrics, and automated weekly digests.'
  },
  {
    q: 'How often is the event index refreshed?',
    a: 'Scrapers run automatically on scheduled intervals, and operators can manually trigger on-demand pipeline runs directly through the telemetry dashboard.'
  },
  {
    q: 'How are prices formatted across free and paid events?',
    a: 'Ticket pricing is normalized across currencies. Free entry events are explicitly flagged, while ticketed entries display precise numerical values.'
  },
  {
    q: 'What technology stack powers the platform?',
    a: 'The core backend is built on Python FastAPI, RapidFuzz deduplication, Bright Data Scraper Studio, SQLite, and a modern React frontend.'
  }
];

export default function SceneLandingPage({ onLaunchExplorer }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="scene-landing-wrapper">
      {/* Skip to Content for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Interactive Cyber Particle Canvas Backdrop */}
      <ParticleCanvas />

      {/* Fluid Island Glass Navigation Bar (Rule B7) */}
      <FluidNavbar
        onOpenExplorer={onLaunchExplorer}
        onOpenTelemetry={() => {
          const el = document.getElementById('telemetry-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main id="main-content">
        {/* ============================================================
            HERO SECTION (Rule B5, A2)
            ============================================================ */}
        <section id="hero" className="hero-scene-section">
          <div className="hero-content-box">
            {/* Status Pill Badge */}
            <div className="hero-hud-badge">
              <span className="hud-pulse-dot" />
              <span className="hud-text">[HYD_CORE_01 // 200+ EVENTS INDEXED]</span>
            </div>

            {/* Main Headline (Gradient white -> gray, max-width 680px, no hyphens) */}
            <h1 className="hero-gradient-title">
              Aggregating city leisure events into one clean verified feed
            </h1>

            {/* Subheadline (Max width 680px, pretty text wrap) */}
            <p className="hero-subheading">
              Scrapeverse continuously extracts, normalizes, and deduplicates listings from platforms across Hyderabad so you never miss a concert, meetup, or workshop.
            </p>

            {/* Hero CTAs */}
            <div className="hero-cta-group">
              <button
                onClick={onLaunchExplorer}
                className="hero-btn-primary"
              >
                <span>Launch Event Explorer</span>
                <span className="btn-arrow">→</span>
              </button>
              <a
                href="#telemetry-section"
                className="hero-btn-secondary"
              >
                <span>View Telemetry</span>
              </a>
            </div>

            {/* Proof Signals Strip */}
            <div className="hero-proof-strip">
              <div className="proof-item">
                <span className="proof-num">200+</span>
                <span className="proof-label">Live Hyderabad Events</span>
              </div>
              <div className="proof-divider" />
              <div className="proof-item">
                <span className="proof-num">98.7%</span>
                <span className="proof-label">Deduplication Accuracy</span>
              </div>
              <div className="proof-divider" />
              <div className="proof-item">
                <span className="proof-num">3 Platforms</span>
                <span className="proof-label">FullHyd, HydHub, AroundU</span>
              </div>
            </div>
          </div>

          {/* Interactive Hero Visual Showcase */}
          <div className="hero-showcase-container">
            <div className="showcase-hud-frame">
              <div className="hud-frame-header">
                <span className="frame-dot" />
                <span className="frame-title">LIVE EVENT STREAM // HYDERABAD</span>
                <span className="frame-status">REC ✦ STREAMING</span>
              </div>
              <div className="showcase-cards-grid">
                {FEATURED_REAL_EVENTS.map((event, i) => (
                  <div key={i} className="showcase-event-card">
                    <div className="card-top">
                      <span className="cat-chip">{event.category}</span>
                      <span className="date-chip">{event.date}</span>
                    </div>
                    <h3 className="card-title">{event.title}</h3>
                    <div className="card-loc">
                      <span>📍 {event.venue} ({event.area})</span>
                      <span className="price-tag">{event.price}</span>
                    </div>
                    <div className="card-sources">
                      <span className="sources-label">Sources:</span>
                      {event.sources.map((s, idx) => (
                        <span key={idx} className="source-pill">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            MANDATORY TAGLINE REVEAL SECTION (Rule B11)
            ============================================================ */}
        <TaglineReveal />

        {/* ============================================================
            BENEFITS SECTION (Rule A2, A5)
            ============================================================ */}
        <section id="benefits" className="benefits-section">
          <div className="section-header">
            <span className="telemetry-badge">[CAPABILITIES // METRICS]</span>
            <h2 className="section-title">Built for high-density event intelligence</h2>
            <p className="section-desc">
              How Scrapeverse transforms fragmented event listings into an organized stream.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon-box text-cyan">✦</div>
              <h3 className="benefit-title">Zero Duplicate Noise</h3>
              <p className="benefit-body">
                Fuzzy record matching groups identical listings from multiple sources into a single canonical event card.
              </p>
              <div className="benefit-footer">
                <span className="footer-tag">RapidFuzz Engine</span>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-box text-violet">📍</div>
              <h3 className="benefit-title">Instant Locality Filtering</h3>
              <p className="benefit-body">
                Filter events across Jubilee Hills, Madhapur, Gachibowli, and Hitech City in under 15 milliseconds.
              </p>
              <div className="benefit-footer">
                <span className="footer-tag">Sub-second Queries</span>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-box text-emerald">🛡️</div>
              <h3 className="benefit-title">Self Healing Architecture</h3>
              <p className="benefit-body">
                Automated validation rules fall back gracefully when upstream HTML structures shift unexpectedly.
              </p>
              <div className="benefit-footer">
                <span className="footer-tag">Fault Tolerant</span>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-box text-rose">⚡</div>
              <h3 className="benefit-title">Automated Weekly Digest</h3>
              <p className="benefit-body">
                Key events categorized across Music, Theatre, Workshops, Sports, and Food served as a weekly digest.
              </p>
              <div className="benefit-footer">
                <span className="footer-tag">Curated Highlights</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            FUZZY DEDUPLICATION MATRIX SECTION (Rule A2)
            ============================================================ */}
        <section id="dedup" className="dedup-section">
          <div className="section-header">
            <span className="telemetry-badge">[DEDUPLICATION // DEMO]</span>
            <h2 className="section-title">Interactive multi-source merging</h2>
            <p className="section-desc">
              Compare raw source payloads from AroundU and FullHyd merged into single canonical listings.
            </p>
          </div>

          <DeduplicationVisualizer />
        </section>

        {/* ============================================================
            THREE-STEP ARCHITECTURE SECTION (Rule A2, A5)
            ============================================================ */}
        <section id="features" className="how-it-works-section">
          <div className="section-header">
            <span className="telemetry-badge">[PIPELINE // 3 STEPS]</span>
            <h2 className="section-title">How the data pipeline operates</h2>
            <p className="section-desc">
              Three streamlined steps from raw web markup to structured JSON stream.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num">01</div>
              <h3 className="step-title">Distributed Scrapers</h3>
              <p className="step-body">
                Bright Data Scraper Studio extracts raw event payloads continuously from FullHyd, HydHub, and AroundU.
              </p>
              <div className="step-badge">Bright Data Cloud</div>
            </div>

            <div className="step-card">
              <div className="step-num">02</div>
              <h3 className="step-title">Normalizer & Deduplicator</h3>
              <p className="step-body">
                Titles, dates, venues, and ticket pricing map to a unified schema with multi-source verification.
              </p>
              <div className="step-badge">Fuzzy Token Matching</div>
            </div>

            <div className="step-card">
              <div className="step-num">03</div>
              <h3 className="step-title">Unified REST API</h3>
              <p className="step-body">
                Access clean structured JSON or browse events instantly via the interactive Explorer dashboard.
              </p>
              <div className="step-badge">FastAPI Async Server</div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SCRAPER TELEMETRY SECTION
            ============================================================ */}
        <section id="telemetry-section" className="telemetry-section-wrapper">
          <div className="section-header">
            <span className="telemetry-badge">[TELEMETRY // CONTROL PANEL]</span>
            <h2 className="section-title">Live pipeline telemetry</h2>
            <p className="section-desc">
              Inspect real execution logs and system metrics from Bright Data scrapers.
            </p>
          </div>

          <ScraperTelemetryWidget />
        </section>

        {/* ============================================================
            FAQ SECTION (Rule A2, A5)
            ============================================================ */}
        <section id="faq" className="faq-section">
          <div className="section-header">
            <span className="telemetry-badge">[KNOWLEDGE BASE // FAQ]</span>
            <h2 className="section-title">Frequently asked questions</h2>
            <p className="section-desc">
              Everything you need to know about Scrapeverse architecture and data pipeline.
            </p>
          </div>

          <div className="faq-accordion-list">
            {FAQ_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className={`faq-item ${activeFaq === idx ? 'is-expanded' : ''}`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="faq-question-btn"
                  aria-expanded={activeFaq === idx}
                >
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-icon">{activeFaq === idx ? '−' : '+'}</span>
                </button>
                {activeFaq === idx && (
                  <div className="faq-answer-panel">
                    <p className="faq-a-text">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            FINAL CTA SECTION (Rule A2)
            ============================================================ */}
        <section className="final-cta-section">
          <div className="cta-glowing-box">
            <div className="cta-hud-tag">[READY TO EXPLORE // HYDERABAD]</div>
            <h2 className="cta-heading">Discover upcoming leisure events in Hyderabad</h2>
            <p className="cta-subheading">
              Browse 200+ verified events across music, theatre, workshops, sports, and meetups in real time.
            </p>
            <div className="cta-actions">
              <button
                onClick={onLaunchExplorer}
                className="cta-primary-btn"
              >
                <span>Launch Scrapeverse Explorer</span>
                <span className="btn-glow-dot" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================
          FOOTER SECTION (Rule B10)
          ============================================================ */}
      <footer className="scene-footer">
        <div className="footer-container">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <span className="logo-spark">✦</span> SCRAPEVERSE
            </div>
            <p className="footer-tagline">
              Resilient city leisure event aggregation powered by Bright Data Scraper Studio & fuzzy deduplication.
            </p>
            <span className="footer-copy">© 2026 Scrapeverse. All rights reserved.</span>
          </div>

          <div className="footer-links-group">
            <div className="footer-col">
              <h4 className="footer-col-title">Navigation</h4>
              <a href="#hero" className="footer-link">Overview</a>
              <a href="#benefits" className="footer-link">Capabilities</a>
              <a href="#dedup" className="footer-link">Deduplication</a>
              <a href="#telemetry-section" className="footer-link">Telemetry</a>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Sources</h4>
              <a href="https://events.fullhyderabad.com" target="_blank" rel="noreferrer" className="footer-link">FullHyd Events ↗</a>
              <a href="https://hydhub.in" target="_blank" rel="noreferrer" className="footer-link">HydHub ↗</a>
              <a href="https://aroundu.in" target="_blank" rel="noreferrer" className="footer-link">AroundU ↗</a>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Legal & Compliance</h4>
              <a href="#legal" className="footer-link">Privacy Policy</a>
              <a href="#legal" className="footer-link">Terms of Service</a>
              <a href="#legal" className="footer-link">Data Scraping Ethics</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
