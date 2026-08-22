import { useMemo } from 'react';

export default function MyWeekPage({
  savedEvents = [],
  onRemoveSave,
  onSelectEvent,
  onNavigate
}) {
  // Group saved events by date
  const eventsByDate = useMemo(() => {
    const map = {};
    savedEvents.forEach(evt => {
      const d = evt.date || 'Upcoming';
      if (!map[d]) map[d] = [];
      map[d].push(evt);
    });
    return map;
  }, [savedEvents]);

  // Conflict detection: detect overlapping times on the same date
  const conflictPairs = useMemo(() => {
    const conflicts = new Set();
    Object.keys(eventsByDate).forEach(d => {
      const dayList = eventsByDate[d];
      const timeSeen = {};
      dayList.forEach(e => {
        const t = e.time || '18:00';
        if (timeSeen[t]) {
          conflicts.add(e.event_id);
          conflicts.add(timeSeen[t]);
        } else {
          timeSeen[t] = e.event_id;
        }
      });
    });
    return conflicts;
  }, [eventsByDate]);

  return (
    <div className="blueprint-page my-week-page">
      {/* Screen 06 Header */}
      <div className="my-week-header">
        <div className="my-week-title-box">
          <span className="telemetry-badge">[06 MY WEEK // PERSONAL ITINERARY]</span>
          <h1 className="my-week-heading">My Saved Itinerary</h1>
          <p className="my-week-subtext">
            Personal timeline with conflict detection and overlapping schedule warnings.
          </p>
        </div>

        <div className="week-nav-controls">
          <button className="week-nav-btn">← Previous Week</button>
          <span className="current-week-label">Current Week (Aug 23 - Aug 30)</span>
          <button className="week-nav-btn">Next Week →</button>
        </div>
      </div>

      {/* Conflict Warning Banner if conflicts exist */}
      {conflictPairs.size > 0 && (
        <div className="conflict-warning-banner">
          <span className="banner-icon">⚠️</span>
          <div className="banner-text">
            <strong>Schedule Conflict Detected:</strong> You have {conflictPairs.size} overlapping events scheduled at the exact same time on your timeline!
          </div>
        </div>
      )}

      {/* Empty State */}
      {savedEvents.length === 0 ? (
        <div className="empty-my-week-box">
          <div className="empty-icon">⭐</div>
          <h2 className="empty-title">Your week collection is empty</h2>
          <p className="empty-desc">
            Save events from the Discover or Calendar screens to build your personal itinerary.
          </p>
          <button
            onClick={() => onNavigate('discover')}
            className="empty-cta-btn"
          >
            Find Something Around This Time →
          </button>
        </div>
      ) : (
        <div className="saved-stream-container">
          {Object.keys(eventsByDate).map(date => (
            <div key={date} className="saved-day-group">
              <h2 className="saved-date-heading">📅 {date}</h2>
              <div className="saved-day-events-list">
                {eventsByDate[date].map(evt => {
                  const hasConflict = conflictPairs.has(evt.event_id);

                  return (
                    <div
                      key={evt.event_id}
                      className={`saved-event-row ${hasConflict ? 'is-conflict' : ''}`}
                    >
                      <div className="row-time-col">
                        <span className="row-time">{evt.time || '18:00'}</span>
                        {hasConflict && (
                          <span className="row-conflict-badge">⚠️ Time Conflict</span>
                        )}
                      </div>

                      <div className="row-main-col">
                        <span className="row-cat">{evt.category}</span>
                        <h3
                          onClick={() => onSelectEvent(evt)}
                          className="row-title-clickable"
                        >
                          {evt.title}
                        </h3>
                        <span className="row-venue">📍 {evt.venue || 'Venue TBD'} ({evt.area})</span>
                      </div>

                      <div className="row-actions-col">
                        <button
                          onClick={() => onSelectEvent(evt)}
                          className="row-inspect-btn"
                        >
                          Inspect →
                        </button>
                        <button
                          onClick={() => onRemoveSave(evt.event_id)}
                          className="row-remove-btn"
                          title="Remove from My Week"
                        >
                          ✕ Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
