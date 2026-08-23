import React, { useState, useMemo } from 'react';
import EventCard from '../components/EventCard.jsx';
import { CalendarIcon, TimelineIcon } from '../components/Icons.jsx';
import { formatDate } from '../lib/constants.js';

export default function CalendarPage({
  events = [],
  onSelectEvent,
  savedEvents = [],
  onToggleSave
}) {
  const [selectedDate, setSelectedDate] = useState('All');

  // Extract unique sorted date strings
  const uniqueDates = useMemo(() => {
    return Array.from(
      new Set(events.map((e) => e.date).filter(Boolean))
    ).sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (selectedDate === 'All') return events;
    return events.filter((e) => e.date === selectedDate);
  }, [events, selectedDate]);

  // Group events by date for timeline stream
  const dateGroups = useMemo(() => {
    const groups = {};
    filteredEvents.forEach((evt) => {
      const d = evt.date || 'Upcoming TBA';
      if (!groups[d]) groups[d] = [];
      groups[d].push(evt);
    });
    return groups;
  }, [filteredEvents]);

  return (
    <div className="sv-calendar-page">
      {/* Header */}
      <section className="sv-page-header">
        

        <h1 className="sv-page-title font-serif">Timeline of the City.</h1>
        <p className="sv-page-desc">
          A living temporal schedule mapping cultural events, workshops, concerts, and talks across date coordinates in Hyderabad.
        </p>

        {/* Date Horizon Carousel Bar */}
        <div className="sv-date-strip-wrapper">
          <div className="sv-date-strip">
            <button
              type="button"
              className={`sv-date-pill ${selectedDate === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedDate('All')}
            >
              <span className="sv-date-day font-mono">ALL</span>
            </button>

            {uniqueDates.map((dateStr) => {
              const d = new Date(dateStr);
              const dayNum = !isNaN(d.getDate()) ? d.getDate() : dateStr.slice(-2);
              const monthStr = !isNaN(d.getMonth())
                ? d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
                : 'AUG';
              const weekday = !isNaN(d.getDay())
                ? d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
                : 'DAY';

              const count = events.filter((e) => e.date === dateStr).length;

              return (
                <button
                  key={dateStr}
                  type="button"
                  className={`sv-date-pill ${selectedDate === dateStr ? 'active' : ''}`}
                  onClick={() => setSelectedDate(dateStr)}
                >
                  <span className="sv-date-day font-mono">{dayNum}</span>
                  <span className="sv-date-sub">{monthStr} · {weekday}</span>
                  <span className="sv-date-count font-mono">{count} events</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Living Timeline Stream */}
      <section className="sv-timeline-stream">
        {Object.keys(dateGroups).length > 0 ? (
          Object.entries(dateGroups).map(([dateKey, dayEvents]) => (
            <div key={dateKey} className="sv-timeline-day-group">
              {/* Date Column Header */}
              <div className="sv-timeline-day-marker">
                <div className="sv-day-badge font-mono">
                  <CalendarIcon className="w-3.5 h-3.5 text-saffron inline mr-1.5" />
                  <span>{formatDate(dateKey)}</span>
                </div>
                <span className="sv-day-count font-mono">{dayEvents.length} signals</span>
              </div>

              {/* Event Cards in Day Cluster */}
              <div className="sv-timeline-cards-row">
                {dayEvents.map((evt) => (
                  <div key={evt.event_id} className="sv-timeline-card-wrapper">
                    <EventCard
                      event={evt}
                      onClick={() => onSelectEvent(evt)}
                      isSaved={savedEvents.some((s) => s.event_id === evt.event_id)}
                      onToggleSave={onToggleSave}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="sv-empty-box">
            <TimelineIcon className="w-10 h-10 text-saffron opacity-60 mb-3" />
            <h3 className="sv-empty-title font-serif">No events scheduled on this temporal coordinate.</h3>
            <p className="sv-empty-desc">Select another date from the strip above or view the full timeline schedule.</p>
            <button
              type="button"
              className="sv-primary-btn mt-4"
              onClick={() => setSelectedDate('All')}
            >
              <span>View Full Timeline Schedule</span>
              <span className="ml-1">→</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
