import { useState, useMemo } from 'react';

export default function CalendarPage({
  events = [],
  onSelectEvent,
  onSelectVenue
}) {
  const [calendarView, setCalendarView] = useState('Week'); // 'Month' | 'Week' | 'Day'

  // Group events by date string (e.g. '2026-08-23', '2026-08-29', etc.)
  const eventsByDate = useMemo(() => {
    const map = {};
    events.forEach(e => {
      const d = e.date || 'Upcoming';
      if (!map[d]) map[d] = [];
      map[d].push(e);
    });
    return map;
  }, [events]);

  const uniqueDates = Object.keys(eventsByDate).sort();
  const [selectedDate, setSelectedDate] = useState(uniqueDates[0] || '2026-08-23');

  const selectedDayEvents = eventsByDate[selectedDate] || [];

  // Detect visual time overlaps for selected day
  const timeOverlapCounts = useMemo(() => {
    const counts = {};
    selectedDayEvents.forEach(e => {
      const t = e.time || '18:00';
      counts[t] = (counts[t] || 0) + 1;
    });
    return counts;
  }, [selectedDayEvents]);

  return (
    <div className="blueprint-page calendar-page">
      {/* ── Screen 03 Header & Controls ── */}
      <div className="calendar-header">
        <div className="calendar-title-box">
          <span className="telemetry-badge">[03 EXPLORE // CALENDAR & TIMELINE]</span>
          <h1 className="calendar-heading">Date-Led Discovery</h1>
          <p className="calendar-subtext">
            Explore day density, visual timelines, and conflicting event overlaps.
          </p>
        </div>

        {/* Time Navigation: Month / Week / Day */}
        <div className="calendar-view-switcher">
          {['Month', 'Week', 'Day'].map((view) => (
            <button
              key={view}
              onClick={() => setCalendarView(view)}
              className={`view-toggle-btn ${calendarView === view ? 'active' : ''}`}
            >
              {view} View
            </button>
          ))}
        </div>
      </div>

      {/* ── Date Strip / Day Density Overview ── */}
      <div className="date-strip-container">
        <span className="date-strip-label">Select Date:</span>
        <div className="date-strip-scroll">
          {uniqueDates.map((date) => {
            const count = eventsByDate[date].length;
            const isSelected = date === selectedDate;

            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`date-chip-btn ${isSelected ? 'active' : ''}`}
              >
                <span className="chip-date-text">{date}</span>
                <div className="density-indicators">
                  {Array.from({ length: Math.min(count, 5) }).map((_, i) => (
                    <span key={i} className="density-dot" />
                  ))}
                  {count > 5 && <span className="density-more">+{count - 5}</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Selected Day Timeline View ── */}
      <div className="timeline-section-container">
        <div className="timeline-header-bar">
          <h2 className="timeline-date-title">Timeline for {selectedDate}</h2>
          <span className="timeline-count">{selectedDayEvents.length} Events Scheduled</span>
        </div>

        <div className="timeline-stream">
          {selectedDayEvents.length === 0 ? (
            <div className="empty-timeline-box">
              <p>No events recorded for this date. Select another date above.</p>
            </div>
          ) : (
            selectedDayEvents.map((evt) => {
              const timeSlot = evt.time || 'Evening';
              const isOverlapped = (timeOverlapCounts[timeSlot] || 0) > 1;

              return (
                <div
                  key={evt.event_id}
                  className={`timeline-slot-card ${isOverlapped ? 'has-overlap' : ''}`}
                >
                  <div className="time-col">
                    <span className="time-text">{timeSlot}</span>
                    {isOverlapped && (
                      <span className="overlap-warning-chip" title="Another event occurs at the same time!">
                        ⚠️ Overlap
                      </span>
                    )}
                  </div>

                  <div className="slot-main-content">
                    <div className="slot-top-row">
                      <span className="slot-cat">{evt.category || 'Event'}</span>
                      <span className="slot-price">{evt.price || 'Free Entry'}</span>
                    </div>

                    <h3
                      onClick={() => onSelectEvent(evt)}
                      className="slot-title-clickable"
                    >
                      {evt.title}
                    </h3>

                    <div className="slot-location-row">
                      <span
                        onClick={() => onSelectVenue(evt.venue || 'Hyderabad Venue', evt.area)}
                        className="slot-venue-link"
                      >
                        📍 {evt.venue || 'Venue TBD'} ({evt.area || 'Hyderabad'}) ↗
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectEvent(evt)}
                    className="slot-action-btn"
                  >
                    Inspect →
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
