import { useState } from 'react';

export default function FluidNavbar({ onOpenExplorer, onOpenTelemetry }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (action) => {
    setIsOpen(false);
    if (action === 'explorer' && onOpenExplorer) onOpenExplorer();
    if (action === 'telemetry' && onOpenTelemetry) onOpenTelemetry();
  };

  return (
    <>
      {/* Closed State: Floating Glass Pill Navbar */}
      <header className="fluid-nav-container">
        <nav className="fluid-pill-nav">
          {/* Brand Logo */}
          <a href="#hero" className="fluid-logo">
            <span className="logo-spark">✦</span>
            <span className="logo-text">SCRAPEVERSE</span>
            <span className="logo-version">v2.4</span>
          </a>

          {/* Nav Links Desktop */}
          <div className="fluid-desktop-links">
            <a href="#features" className="fluid-link">Architecture</a>
            <a href="#dedup" className="fluid-link">Deduplication</a>
            <a href="#benefits" className="fluid-link">Benefits</a>
            <a href="#faq" className="fluid-link">FAQ</a>
          </div>

          {/* Action CTAs */}
          <div className="fluid-actions">
            <button
              onClick={() => handleNavClick('explorer')}
              className="fluid-btn-primary"
            >
              <span>Launch Explorer</span>
              <span className="btn-glow-dot" />
            </button>

            {/* Hamburger Button (Morphing to X) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`hamburger-toggle ${isOpen ? 'active' : ''}`}
              aria-label="Toggle Navigation Menu"
            >
              <span className="hamburger-line line-1" />
              <span className="hamburger-line line-2" />
              <span className="hamburger-line line-3" />
            </button>
          </div>
        </nav>
      </header>

      {/* Screen-Filling Glass Modal Navigation Overlay */}
      <div className={`fluid-modal-overlay ${isOpen ? 'is-open' : ''}`}>
        <div className="fluid-modal-content">
          <div className="modal-header">
            <span className="telemetry-badge">[SYS_MENU // HYD_NODE_01]</span>
            <button
              onClick={() => setIsOpen(false)}
              className="modal-close-btn"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="modal-links-grid">
            <a
              href="#hero"
              onClick={() => setIsOpen(false)}
              className="modal-nav-item delay-100"
            >
              <span className="modal-nav-num">01</span>
              <span className="modal-nav-title">Overview</span>
              <span className="modal-nav-desc">City leisure events aggregator</span>
            </a>
            <a
              href="#features"
              onClick={() => setIsOpen(false)}
              className="modal-nav-item delay-150"
            >
              <span className="modal-nav-num">02</span>
              <span className="modal-nav-title">Pipeline System</span>
              <span className="modal-nav-desc">Bright Data cloud scrapers</span>
            </a>
            <a
              href="#dedup"
              onClick={() => setIsOpen(false)}
              className="modal-nav-item delay-200"
            >
              <span className="modal-nav-num">03</span>
              <span className="modal-nav-title">Fuzzy Deduplication</span>
              <span className="modal-nav-desc">Multi source event merging</span>
            </a>
            <a
              href="#benefits"
              onClick={() => setIsOpen(false)}
              className="modal-nav-item delay-250"
            >
              <span className="modal-nav-num">04</span>
              <span className="modal-nav-title">Capabilities</span>
              <span className="modal-nav-desc">Neighborhood filters & telemetry</span>
            </a>
            <a
              href="#faq"
              onClick={() => setIsOpen(false)}
              className="modal-nav-item delay-300"
            >
              <span className="modal-nav-num">05</span>
              <span className="modal-nav-title">Knowledge Base</span>
              <span className="modal-nav-desc">FAQ & data validation schema</span>
            </a>
          </div>

          <div className="modal-footer-cta delay-350">
            <button
              onClick={() => handleNavClick('explorer')}
              className="modal-primary-action"
            >
              Enter Live Event Explorer
            </button>
            <button
              onClick={() => handleNavClick('telemetry')}
              className="modal-secondary-action"
            >
              Run Pipeline Collector Test
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
