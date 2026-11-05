import React from 'react';
import { formatDate, formatTime } from '../utils/events';

const ICONS = { Work: '▣', Personal: '✳', Social: '♧', Health: '♡', Other: '◈' };

export default function EventCard({ event, onEdit, onDelete }) {
  return (
    <article className="event-card">
      <div className={`event-category category-${event.category.toLowerCase()}`}>
        <span aria-hidden="true">{ICONS[event.category] || '◈'}</span>
        {event.category}
      </div>
      <div className="event-card-content">
        <div className="event-card-date">{formatDate(event.date)} <span className="dot-separator">·</span> {formatTime(event.time)}</div>
        <h3>{event.title}</h3>
        <p className="event-description">{event.description}</p>
        <div className="event-location"><span aria-hidden="true">⌖</span> {event.location}</div>
      </div>
      <div className="event-card-actions">
        <button className="text-button" type="button" onClick={() => onEdit(event)}>Edit <span aria-hidden="true">↗</span></button>
        <button className="text-button danger" type="button" onClick={() => onDelete(event)}>Delete</button>
      </div>
    </article>
  );
}
