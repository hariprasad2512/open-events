export default function OpenEventsHeader({
  activeTab,
  setActiveTab,
  savedCount = 0,
  dataMode,
  setDataMode
}) {
  return (
    <header className="open-events-header">
      <div className="header-inner-container">
        {/* Brand & Manifesto Subtitle */}
        <div
          onClick={() => setActiveTab('home')}
          className="header-brand-box"
        >
          <div className="brand-title-row">
            <span className="brand-spark">✦</span>
            <span className="brand-name">OPEN EVENTS</span>
            <span className="brand-badge">PRODUCT BLUEPRINT</span>
          </div>
          <span className="brand-sub">Independent City Culture Feed</span>
        </div>

        {/* Core Navigation Links per Figma Blueprint */}
        <nav className="header-nav-tabs">
          <button
            onClick={() => setActiveTab('home')}
            className={`nav-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
          >
            <span className="tab-num">01</span>
            <span className="tab-label">Home / Manifesto</span>
          </button>

          <button
            onClick={() => setActiveTab('discover')}
            className={`nav-tab-btn ${activeTab === 'discover' ? 'active' : ''}`}
          >
            <span className="tab-num">02</span>
            <span className="tab-label">Discover</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`nav-tab-btn ${activeTab === 'calendar' ? 'active' : ''}`}
          >
            <span className="tab-num">03</span>
            <span className="tab-label">Explore / Calendar</span>
          </button>

          <button
            onClick={() => setActiveTab('my-week')}
            className={`nav-tab-btn ${activeTab === 'my-week' ? 'active' : ''}`}
          >
            <span className="tab-num">06</span>
            <span className="tab-label">My Week</span>
            {savedCount > 0 && (
              <span className="saved-count-pill">{savedCount}</span>
            )}
          </button>
        </nav>

        {/* Data Source Mode Switcher */}
        <div className="header-source-switcher">
          <button
            onClick={() => setDataMode(dataMode === 'fixture' ? 'database' : 'fixture')}
            className="source-toggle-btn"
          >
            <span className="source-dot" />
            <span>{dataMode === 'fixture' ? '200+ Scraped Events' : 'Live Pipeline DB'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
