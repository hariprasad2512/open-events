import React, { useState } from 'react';
import EventCard from '../components/EventCard.jsx';
import { CalendarIcon, TimelineIcon } from '../components/Icons.jsx';

export default function CalendarPage({ events = [], onSelectEvent }) {
  const [selectedDate, setSelectedDate] = useState('All');

  // Extract unique sorted date strings
  const uniqueDates = Array.from(
    new Set(events.map((e) => e.date).filter(Boolean))
  ).sort();

  const filteredEvents = selectedDate === 'All'
    ? events
    : events.filter((e) => e.date === selectedDate);

  return (
    <div className="calendar-page-container">
      {/* Editorial Header */}
      <section className="calendar-header-hero">
        <div className="header-kicker">
          <span className="statement-badge">[TEMPORAL HORIZON]</span>
          <span className="kicker-meta">{events.length} CHRONOLOGICAL SIGNALS</span>
        </div>

        <h1 className="calendar-title">
          Timeline of the City.
        </h1>

        <p className="calendar-subtitle">
          A living temporal schedule mapping cultural events, workshops, concerts, and talks across date coordinates in Hyderabad.
        </p>

        {/* Date Carousel Strip */}
        <div className="date-horizon-carousel">
          <button
            onClick={() => setSelectedDate('All')}
            className={`date-pill-item ${selectedDate === 'All' ? 'active' : ''}`}
          >
            <span className="date-day-num">ALL</span>
            <span className="date-month-text">SCHEDULE</span>
          </button>

          {uniqueDates.map((dateStr) => {
            const dateObj = new Date(dateStr);
            const dayNum = isNaN(dateObj.getDate()) ? '23' : dateObj.getDate();
            const monthName = isNaN(dateObj.getMonth())
              ? 'AUG'
              : dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            const weekday = isNaN(dateObj.getDay())
              ? 'SUN'
              : dateObj.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`date-pill-item ${selectedDate === dateStr ? 'active' : ''}`}
              >
                <span className="date-day-num">{dayNum}</span>
                <span className="date-month-text">{monthName} · {weekday}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Living Timeline Schedule Stream */}
      <section className="calendar-timeline-stream">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((evt, idx) => (
            <div key={evt.event_id || idx} className="timeline-node-row">
              {/* Left Time Coordinates Marker */}
              <div className="timeline-time-col">
                <div className="time-marker-badge">
                  <CalendarIcon className="w-3.5 h-3.5 inline-block mr-1 text-gold-accent" />
                  <span>{evt.date || 'UPCOMING'}</span>
                </div>
                <div className="time-subtext">{evt.time || 'Evening'}</div>
                <div className="node-orbital-dot" />
              </div>

              {/* Event Artifact Card */}
              <div className="timeline-card-col">
                <EventCard event={evt} onClick={() => onSelectEvent(evt)} />
              </div>
            </div>
          ))
        ) : (
          <div className="no-results-box">
            <TimelineIcon className="w-8 h-8 text-gold-accent opacity-50 mb-3" />
            <h3>No events scheduled on this temporal coordinate.</h3>
            <button onClick={() => setSelectedDate('All')} className="clear-filters-btn">
              View Full Timeline →
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
