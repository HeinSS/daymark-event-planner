import React, { useMemo, useState } from 'react';
import Calendar from '../components/Calendar';
import EventCard from '../components/EventCard';
import { useApp } from '../context/AppContext';
import { dateKey, eventsForDate, sortEvents, upcomingEvents } from '../utils/events';

export default function Dashboard({ navigate, onEdit }) {
  const { currentUser, userEvents, deleteEvent } = useApp();
  const [selectedDate, setSelectedDate] = useState('');
  const [filter, setFilter] = useState('Upcoming');
  const [search, setSearch] = useState('');
  const today = dateKey(new Date());
  const upcoming = upcomingEvents(userEvents);
  const thisMonth = userEvents.filter((event) => event.date.startsWith(today.slice(0, 7))).length;
  const next = upcoming[0];
  const visible = useMemo(() => {
    let result = selectedDate
      ? eventsForDate(userEvents, selectedDate)
      : filter === 'Upcoming'
        ? upcomingEvents(userEvents)
        : filter === 'Past'
          ? sortEvents(userEvents).filter((event) => new Date(`${event.date}T${event.time}:00`).getTime() < Date.now()).reverse()
          : sortEvents(userEvents);
    if (search.trim()) {
      const query = search.trim().toLowerCase();
      result = result.filter((event) => [event.title, event.location, event.description, event.category].some((value) => value.toLowerCase().includes(query)));
    }
    return result;
  }, [userEvents, selectedDate, filter, search]);

  function confirmDelete(event) {
    if (window.confirm(`Delete "${event.title}"? This cannot be undone.`)) deleteEvent(event.id);
  }

  return (
    <main className="dashboard-page page-container">
      <div className="dashboard-heading">
        <div>
          <div className="eyebrow"><span className="eyebrow-line" /> YOUR PERSONAL SPACE</div>
          <h1>Good to see you, <em>{currentUser.name.split(' ')[0]}.</em></h1>
          <p>Here's what's happening in your world.</p>
        </div>
        <button className="button button-primary" type="button" onClick={() => navigate('add')}><span aria-hidden="true">＋</span> Add new event</button>
      </div>
      <div className="stats-grid">
        <div className="stat-card"><span className="stat-icon purple">◷</span><span className="stat-label">Upcoming events</span><strong>{upcoming.length}</strong><small>On your horizon</small></div>
        <div className="stat-card"><span className="stat-icon peach">▦</span><span className="stat-label">This month</span><strong>{thisMonth}</strong><small>Moments to look forward to</small></div>
        <div className="stat-card next-event-stat"><span className="stat-icon mint">✳</span><span className="stat-label">Next up</span><strong className="next-title">{next ? next.title : 'All clear!'}</strong><small>{next ? `${next.date} · ${next.time}` : 'A little breathing room'}</small></div>
      </div>
      <div className="dashboard-grid">
        <section className="events-panel">
          <div className="section-heading">
            <div><h2>Your events <span className="heading-count">{visible.length}</span></h2><p>All the things worth showing up for.</p></div>
          </div>
          <div className="event-toolbar">
            <div className="filter-tabs">
              {['Upcoming', 'All', 'Past'].map((option) => <button type="button" key={option} className={filter === option && !selectedDate ? 'filter-tab active' : 'filter-tab'} onClick={() => { setFilter(option); setSelectedDate(''); }}>{option}</button>)}
            </div>
            <input className="search-input" type="search" placeholder="⌕  Search events..." aria-label="Search events" value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>
          {selectedDate && <div className="date-filter-notice">Showing events on {selectedDate} <button type="button" onClick={() => setSelectedDate('')}>Clear ×</button></div>}
          <div className="event-list">
            {visible.length ? visible.map((event) => <EventCard key={event.id} event={event} onEdit={onEdit} onDelete={confirmDelete} />) : (
              <div className="empty-state">
                <div className="empty-icon">✳</div>
                <h3>{search || selectedDate ? 'No matching events' : 'A fresh page awaits'}</h3>
                <p>{search || selectedDate ? 'Try a different search or date.' : 'Your calendar is ready for something wonderful.'}</p>
                <button className="button button-primary" type="button" onClick={() => navigate('add')}>Create an event <span aria-hidden="true">↗</span></button>
              </div>
            )}
          </div>
        </section>
        <aside className="sidebar">
          <Calendar events={userEvents} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          <div className="tip-panel"><span className="tip-symbol">✦</span><h3>A little planning goes a long way.</h3><p>Keep your calendar up to date, and make room for what makes you happy.</p><button type="button" onClick={() => navigate('help')}>Explore planning tips <span aria-hidden="true">↗</span></button></div>
        </aside>
      </div>
    </main>
  );
}
