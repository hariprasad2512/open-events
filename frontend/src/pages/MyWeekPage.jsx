import React, { useState } from 'react';
import EventCard from '../components/EventCard.jsx';
import { ConstellationIcon, TimelineIcon } from '../components/Icons.jsx';

export default function MyWeekPage({ savedEvents = [], onSelectEvent, onRemoveSaved }) {
  const [viewMode, setViewMode] = useState('constellation'); // 'constellation' | 'timeline'

  return (
    <div className="constellation-page-container">
      {/* Editorial Header */}
      <section className="constellation-header-hero">
        <div className="header-kicker">
          <span className="statement-badge">[PERSONAL OBSERVATORY]</span>
          <span className="kicker-meta">{savedEvents.length} ORBITING NODES</span>
        </div>

        <h1 className="constellation-title">
          My Cultural Constellation.
        </h1>

        <p className="constellation-subtitle">
          Your personal collection of saved cultural signals, floating in an orbiting temporal space around your observer node.
        </p>

        {/* View Switcher Controls */}
        <div className="view-switcher-bar">
          <button
            onClick={() => setViewMode('constellation')}
            className={`switcher-btn ${viewMode === 'constellation' ? 'active' : ''}`}
          >
            <ConstellationIcon className="w-4 h-4 inline-block mr-2" />
            <span>CONSTELLATION</span>
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`switcher-btn ${viewMode === 'timeline' ? 'active' : ''}`}
          >
            <TimelineIcon className="w-4 h-4 inline-block mr-2" />
            <span>TIMELINE</span>
          </button>
        </div>
      </section>

      {/* Orbiting Space Canvas View or Linear Grid */}
      {viewMode === 'constellation' ? (
        <section className="constellation-space-canvas">
          <div className="center-user-observer-node">
            <span className="observer-glyph">✦</span>
            <span className="observer-label">YOU</span>
          </div>

          <div className="orbiting-nodes-ring">
            {savedEvents.map((evt, idx) => {
              const angle = (idx / Math.max(savedEvents.length, 1)) * 360;
              const radius = 180 + (idx % 3) * 35;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <div
                  key={evt.event_id || idx}
                  className="orbit-node-item"
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                  onClick={() => onSelectEvent(evt)}
                >
                  <div className="node-dot-symbol">
                    {evt.category.toLowerCase().includes('music') ? '✿' : evt.category.toLowerCase().includes('art') ? '✦' : '◉'}
                  </div>
                  <div className="node-tooltip-label">
                    {evt.title}
                  </div>
                </div>
              );
            })}
          </div>

          {savedEvents.length === 0 && (
            <div className="empty-constellation-msg">
              <ConstellationIcon className="w-10 h-10 text-gold-accent opacity-40 mb-3" />
              <h3>Your constellation space is empty.</h3>
              <p>Explore the Gallery Wall or City Timeline to pin events into your observatory.</p>
            </div>
          )}
        </section>
      ) : (
        <section className="constellation-grid-section">
          <div className="featured-cards-grid">
            {savedEvents.map((evt) => (
              <div key={evt.event_id} className="saved-card-wrapper">
                <EventCard event={evt} onClick={() => onSelectEvent(evt)} />
                <button
                  onClick={() => onRemoveSaved(evt.event_id)}
                  className="remove-node-btn"
                >
                  Remove Node ×
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
