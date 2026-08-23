import React from 'react';
import { SearchIcon, SparklesIcon, DatabaseIcon, LightningIcon } from './Icons.jsx';

export default function OpenEventsHeader({
  activeTab = 'home',
  onTabChange,
  searchQuery = '',
  onSearchChange,
  dataSourceMode = 'fixture',
  onToggleDataSource,
  savedCount = 0,
  onOpenTriggerPanel
}) {
  return (
    <header className="open-events-header">
      <div className="header-inner">
        {/* Brand Identity */}
        <div className="brand-badge-group" onClick={() => onTabChange('home')}>
          <div className="brand-logo-symbol">
            <SparklesIcon className="w-4 h-4 text-gold-accent animate-pulse" />
          </div>
          <div className="brand-text-group">
            <span className="brand-title">RASA</span>
            <span className="brand-subtitle">CULTURAL OBSERVATORY // HYDERABAD</span>
          </div>
        </div>

        {/* Exploratory Navigation Tabs */}
        <nav className="header-nav-rail">
          {[
            { id: 'home', label: 'HERO SCULPTURE', symbol: '✿' },
            { id: 'discover', label: 'GALLERY WALL', symbol: '✦' },
            { id: 'calendar', label: 'CITY TIMELINE', symbol: '◉' },
            { id: 'myweek', label: 'MY CONSTELLATION', symbol: '◆', badge: savedCount }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`nav-item-btn ${activeTab === item.id ? 'active' : ''}`}
            >
              <span className="nav-symbol">{item.symbol}</span>
              <span className="nav-label">{item.label}</span>
              {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>

        {/* Global Search & Data Source Controls */}
        <div className="header-controls-group">
          {/* Quick Search */}
          <div className="header-search-bar">
            <SearchIcon className="search-icon w-3.5 h-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search signal feeds..."
              className="search-input"
            />
          </div>

          {/* Data Source Toggle */}
          <button
            onClick={onToggleDataSource}
            className="data-mode-chip"
            title="Toggle between Normalized Raw Scraped Fixtures and Live Scraped Database"
          >
            <DatabaseIcon className="w-3.5 h-3.5 inline-block mr-1 opacity-80" />
            <span>{dataSourceMode === 'fixture' ? 'RAW FIXTURES' : 'LIVE DATABASE'}</span>
          </button>

          {/* Scraper Trigger Action */}
          <button
            onClick={onOpenTriggerPanel}
            className="trigger-console-btn"
          >
            <LightningIcon className="w-3.5 h-3.5 inline-block mr-1" />
            <span>SCRAPER CONSOLE</span>
          </button>
        </div>
      </div>
    </header>
  );
}
