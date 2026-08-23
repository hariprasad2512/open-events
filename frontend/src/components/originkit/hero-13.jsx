import React from 'react';
import CityWebGLScene from '../CityWebGLScene.jsx';
import { ArrowRightIcon, CalendarIcon, LightningIcon } from '../Icons.jsx';

/**
 * Hero13 Component (Originkit / Shadcnblocks Hero-13)
 * 
 * Left-aligned high-impact editorial hero with minimal brand provenance badge,
 * oversized headline, restrained paragraph, dual action controls,
 * and an interactive 3D spatial celestial observatory window.
 */
export default function Hero13({
  totalCount = 248,
  onExplore,
  onTimeline,
  onOpenConsole
}) {
  return (
    <section className="sv-hero13-root">
      <div className="sv-hero13-container">
        {/* Left Column: Hero 13 Content */}
        <div className="sv-hero13-left">
          {/* Minimalist Bright Data Provenance Badge */}
          <a
            href="https://brightdata.com"
            target="_blank"
            rel="noopener noreferrer"
            className="sv-hero-minimal-badge font-mono"
            title="Web Scraping powered by Bright Data"
          >
            <span className="sv-hero-badge-dot" />
            <span className="sv-hero-badge-text">POWERED BY BRIGHT DATA</span>
            <span className="sv-hero-badge-arrow">↗</span>
          </a>

          {/* Aggressive High-Impact Headline */}
          <h1 className="sv-hero13-headline font-serif">
            India’s city <br />
            <em>in motion.</em>
          </h1>

          {/* Restrained Muted Paragraph */}
          <p className="sv-hero13-lead">
            A digitized cultural observatory indexing real-time events across Hyderabad. Web scraping infrastructure powered by <a href="https://brightdata.com" target="_blank" rel="noopener noreferrer" className="sv-brand-link font-medium">Bright Data</a> — curated with verified venues and zero duplicate clutter.
          </p>

          {/* Dual Action Controls */}
          <div className="sv-hero13-actions font-mono">
            <button
              type="button"
              className="sv-hero13-btn-primary"
              onClick={onExplore}
            >
              <span>EXPLORE NEW EVENTS</span>
              <span className="sv-btn-arrow-wrap">
                <ArrowRightIcon className="w-4 h-4" />
              </span>
            </button>

            <button
              type="button"
              className="sv-hero13-btn-secondary"
              onClick={onTimeline}
            >
              <CalendarIcon className="w-4 h-4 text-saffron" />
              <span>TIMELINE</span>
            </button>
          </div>

          {/* Real-time Telemetry Proof Metrics Bar */}
          <div className="sv-hero13-proof font-mono">
            <div className="sv-hero13-proof-item">
              <span className="sv-hero13-proof-num text-saffron">{totalCount}</span>
              <span className="sv-hero13-proof-label">LIVE SIGNALS</span>
            </div>
            <div className="sv-hero13-proof-sep">/</div>
            <div className="sv-hero13-proof-item">
              <span className="sv-hero13-proof-num text-jade">BRIGHT DATA</span>
              <span className="sv-hero13-proof-label">SCRAPING PIPELINE</span>
            </div>
            <div className="sv-hero13-proof-sep">/</div>
            <div className="sv-hero13-proof-item">
              <span className="sv-hero13-proof-num text-amber">HYD</span>
              <span className="sv-hero13-proof-label">COVERAGE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Spatial Observatory Window */}
        <div className="sv-hero13-visual sv-hud-frame">
          <span className="sv-hud-reticle top-left">+</span>
          <span className="sv-hud-reticle top-right">+</span>
          <span className="sv-hud-reticle bottom-left">+</span>
          <span className="sv-hud-reticle bottom-right">+</span>

          <CityWebGLScene />

          <div className="sv-art-center-badge font-mono">
            <strong className="font-serif">HYD</strong>
            
          </div>
        </div>
      </div>
    </section>
  );
}
