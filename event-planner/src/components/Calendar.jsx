import React, { useState } from 'react';
import { calendarDays, dateKey } from '../utils/events';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Calendar({ events, selectedDate, onSelectDate }) {
  const [month, setMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const days = calendarDays(month.getFullYear(), month.getMonth());
  const eventDates = new Set(events.map((event) => event.date));
  const todayKey = dateKey(new Date());

  function shiftMonth(amount) {
    setMonth(new Date(month.getFullYear(), month.getMonth() + amount, 1));
  }

  return (
    <section className="calendar-panel" aria-label="Event calendar">
      <div className="section-heading compact">
        <div><h2>Calendar</h2><p>Find your days at a glance</p></div>
      </div>
      <div className="calendar-nav">
        <strong>{month.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })}</strong>
        <div className="calendar-nav-buttons">
          <button type="button" aria-label="Previous month" onClick={() => shiftMonth(-1)}>‹</button>
          <button type="button" aria-label="Next month" onClick={() => shiftMonth(1)}>›</button>
        </div>
      </div>
      <div className="calendar-grid">
        {WEEKDAYS.map((day) => <span className="calendar-weekday" key={day}>{day}</span>)}
        {days.map((day, index) => {
          if (day === null) return <span key={`empty-${index}`} />;
          const key = dateKey(new Date(month.getFullYear(), month.getMonth(), day));
          return (
            <button
              key={key}
              type="button"
              className={[
                'calendar-day',
                key === todayKey ? 'today' : '',
                key === selectedDate ? 'selected' : '',
                eventDates.has(key) ? 'has-event' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => onSelectDate(selectedDate === key ? '' : key)}
              aria-pressed={selectedDate === key}
              aria-label={`${key}${eventDates.has(key) ? ', has events' : ''}`}
            >
              {day}
            </button>
          );
        })}
      </div>
      <div className="calendar-legend"><span className="legend-dot" /> Day with an event <button type="button" onClick={() => onSelectDate('')}>Clear filter</button></div>
    </section>
  );
}
