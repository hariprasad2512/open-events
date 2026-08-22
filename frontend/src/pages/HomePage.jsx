import React from 'react';
import SceneLandingPage from '../components/SceneLandingPage.jsx';
import EventCard from '../components/EventCard.jsx';
import { ArrowRightIcon, MusicIcon, PaletteIcon, SparklesIcon } from '../components/Icons.jsx';

export default function HomePage({
  events = [],
  onNavigate,
  onSelectEvent,
  onSelectCategory
}) {
  const featuredEvents = events.slice(0, 3);

  const categories = [
    { name: 'Music', symbol: '✿', desc: 'Live concerts, sitars, acoustic jams & waveforms', image: '/assets/music_concert_visual.jpg' },
    { name: 'Theatre & Arts', symbol: '✦', desc: 'Terracotta pottery, canvas paintings & plays', image: '/assets/art_workshop_visual.jpg' },
    { name: 'Talks & Meetups', symbol: '◉', desc: 'Archival ideas, founder mixers & keynotes', image: '/assets/ideas_talks_visual.jpg' },
    { name: 'Sports & Outdoors', symbol: '⌁', desc: 'Trekking, outdoor camps & wilderness survival', image: '/assets/hyderabad_cultural_hero.jpg' },
    { name: 'Family / Kids', symbol: '◆', desc: 'Neighborhood gatherings & community workshops', image: '/assets/hyderabad_cultural_hero.jpg' }
  ];

  return (
    <div className="home-manifesto-page">
      {/* ── Screen 01: Hero Composition ── */}
      <section className="manifesto-hero">
        <div className="hero-kicker-pill">
          <span className="pill-dot" />
          <span>HYDERABAD CULTURAL OBSERVATORY // REAL TIME FEEDS</span>
        </div>

        <h1 className="hero-manifesto-title">
          Where Art Happens.
        </h1>

        <p className="hero-manifesto-subtitle">
          Real city leisure events, 3D artwork compositions, kinetic typography, and live scraper feeds aggregated across FullHyd, HighApe, and AroundU.
        </p>

        <div className="hero-actions-row">
          <button
            onClick={() => onNavigate('discover')}
            className="manifesto-primary-btn"
          >
            <span>Enter The Universe</span>
            <ArrowRightIcon className="w-4 h-4 ml-2 inline-block" />
          </button>
          <button
            onClick={() => onNavigate('calendar')}
            className="manifesto-secondary-btn"
          >
            <span>Explore City Timeline</span>
          </button>
        </div>
      </section>

      {/* ── Generated Hyderabad 3D Cultural Hero Banner ── */}
      <div className="hero-art-banner-box">
        <img
          src="/assets/hyderabad_cultural_hero.jpg"
          alt="Hyderabad Cultural Universe"
          className="hero-art-banner-img"
        />
        <div className="hero-art-banner-overlay" />
        <div className="hero-art-banner-caption">
          <span className="statement-badge">[HERO COMPOSITION]</span>
          <h2 className="hero-art-banner-title">
            Charminar & Cultural Orbits · Hyderabad
          </h2>
        </div>
      </div>

      {/* ── 3D Living Sculpture Canvas ── */}
      <SceneLandingPage
        onSelectCategory={(cat) => {
          onSelectCategory(cat);
          onNavigate('discover');
        }}
      />

      {/* ── Editorial Manifesto Statement ── */}
      <section className="manifesto-statement-box">
        <div className="statement-badge">[DESIGN MANIFESTO]</div>
        <h2 className="statement-heading">
          "The product should feel like an artistic discovery space, not a transactional ticket marketplace."
        </h2>
        <p className="statement-body">
          We believe city culture thrives when events remain visible, accessible, and connected. Structured data operates underneath while presentation remains high-density, transparent, and continuous.
        </p>
      </section>

      {/* ── Live Discovery Artifact Preview ── */}
      <section className="live-discovery-preview-section">
        <div className="preview-header">
          <span className="statement-badge">[COLLECTIBLE SIGNALS]</span>
          <h2 className="statement-heading">Happening this week in Hyderabad</h2>
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
      </section>

      {/* ── Category Invitation Grid ── */}
      <section className="category-invitation-section">
        <div className="preview-header">
          <span className="statement-badge">[DOMAIN ORBITS]</span>
          <h2 className="statement-heading">Explore by cultural domain</h2>
        </div>

        <div className="domain-cards-grid">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => {
                onSelectCategory(cat.name);
                onNavigate('discover');
              }}
              className="collectible-artifact-card domain-artifact-card"
            >
              <div className="domain-card-media">
                <img src={cat.image} alt={cat.name} className="domain-card-img" />
                <div className="domain-card-overlay" />
                <div className="domain-card-symbol">{cat.symbol}</div>
              </div>
              <div className="domain-card-body">
                <h3 className="domain-card-title">{cat.name}</h3>
                <p className="domain-card-desc">{cat.desc}</p>
                <span className="domain-card-link">Browse Orbit →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
