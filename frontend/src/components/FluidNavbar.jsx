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
    { key: 'discover', label: 'All Events' },
    { key: 'calendar', label: 'Timeline' },
    { key: 'venues', label: 'Venues' },
    { key: 'my-week', label: 'Constellation', count: savedCount }
  ];

  const handleNav = (key) => {
    onNavigate(key);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sv-navbar-wrapper">
      <div className="sv-navbar-inner">
        {/* Brand Identity & Digitized Node Badge */}
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
            <span className="sv-brand-title font-serif">openevents</span>
          </a>

          
        </div>

        {/* Desktop Navigation Links (Digitized Index Tabs) */}
        <nav className="sv-desktop-nav font-mono" aria-label="Main navigation">
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
            className="sv-search-trigger-btn font-mono"
            onClick={onOpenSearch}
            title="Search events (⌘K / Ctrl+K)"
          >
            <SearchIcon className="w-3.5 h-3.5 opacity-70" />
            
          </button>

          {/* Scraper Console Button */}
          <button
            type="button"
            className="sv-console-btn font-mono"
            onClick={onOpenConsole}
            title="Bright Data Scraper & Pipeline Console"
          >
            <LightningIcon className="w-3.5 h-3.5 text-saffron" />
            <span>CONSOLE</span>
          </button>

          {/* Primary Explore CTA */}
          <button
            type="button"
            className="sv-cta-btn font-mono"
            onClick={() => handleNav('discover')}
          >
            <span>DISCOVER</span>
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

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sv-mobile-menu font-mono">
          {navItems.map((item) => {
            const isActive = page === item.key;
            return (
              <button
                key={item.key}
                type="button"
                className={`sv-mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => handleNav(item.key)}
              >
                <span>{item.label}</span>
                {item.count > 0 && (
                  <span className="sv-nav-badge">{item.count}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
