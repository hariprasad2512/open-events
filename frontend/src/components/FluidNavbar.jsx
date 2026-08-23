import React, { useState } from 'react';
import { SearchIcon, LightningIcon } from './Icons.jsx';

export default function FluidNavbar({
  page = 'home',
  onNavigate,
  savedCount = 0,
  onOpenConsole,
  onOpenSearch
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: 'Overview' },
    { key: 'discover', label: 'Discover' },
    { key: 'calendar', label: 'Timeline' },
    { key: 'venues', label: 'Venues' },
    { key: 'my-week', label: 'My Constellation', count: savedCount }
  ];

  const handleNav = (key) => {
    onNavigate(key);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sv-navbar-wrapper">
      <div className="sv-navbar-inner">
        {/* Brand Identity: openevents */}
        <div className="sv-nav-brand-group">
          <a
            href="/"
            className="sv-brand"
            onClick={(e) => {
              e.preventDefault();
              handleNav('home');
            }}
          >
            <span className="sv-brand-mark">
              <span className="sv-brand-orb" />
            </span>
            <span className="sv-brand-title">openevents</span>
          </a>

          <div className="sv-live-tag font-mono">
            <span className="sv-live-dot" />
            <span>HYD // LIVE</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="sv-desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = page === item.key;
            return (
              <button
                key={item.key}
                type="button"
                className={`sv-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => handleNav(item.key)}
              >
                <span>{item.label}</span>
                {item.count > 0 && (
                  <span className="sv-nav-badge">{item.count}</span>
                )}
                {isActive && <span className="sv-nav-active-pill" />}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="sv-nav-actions">
          {/* Quick Search Key Trigger */}
          <button
            type="button"
            className="sv-search-trigger-btn"
            onClick={onOpenSearch}
            title="Search events (⌘K / Ctrl+K)"
          >
            <SearchIcon className="w-3.5 h-3.5 opacity-70" />
            <span className="sv-search-placeholder">Quick search...</span>
            <kbd className="sv-kbd">⌘K</kbd>
          </button>

          {/* Scraper Console Button */}
          <button
            type="button"
            className="sv-console-btn"
            onClick={onOpenConsole}
            title="Bright Data Scraper & Pipeline Console"
          >
            <LightningIcon className="w-3.5 h-3.5 text-saffron" />
            <span>Data Console</span>
          </button>

          {/* Primary Explore CTA */}
          <button
            type="button"
            className="sv-cta-btn"
            onClick={() => handleNav('discover')}
          >
            <span>Explore City</span>
            <span className="sv-cta-arrow">↗</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className={`sv-mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className="bar bar-1" />
            <span className="bar bar-2" />
            <span className="bar bar-3" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sv-mobile-menu">
          <div className="sv-mobile-menu-inner">
            <div className="sv-mobile-search-row">
              <button
                type="button"
                className="sv-mobile-search-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
              >
                <SearchIcon className="w-4 h-4 text-muted" />
                <span>Search events, venues, topics...</span>
                <kbd className="sv-kbd">⌘K</kbd>
              </button>
            </div>

            <nav className="sv-mobile-nav-links">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={`sv-mobile-nav-item ${page === item.key ? 'active' : ''}`}
                  onClick={() => handleNav(item.key)}
                >
                  <span>{item.label}</span>
                  {item.count > 0 && <span className="sv-nav-badge">{item.count}</span>}
                </button>
              ))}
            </nav>

            <div className="sv-mobile-actions">
              <button
                type="button"
                className="sv-console-btn w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsole();
                }}
              >
                <LightningIcon className="w-4 h-4 text-saffron" />
                <span>Open Data Console</span>
              </button>
              <button
                type="button"
                className="sv-cta-btn w-full justify-center"
                onClick={() => handleNav('discover')}
              >
                <span>Explore Live Hyderabad Index ↗</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
