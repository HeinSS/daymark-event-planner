import React from 'react';
import EventForm from '../components/EventForm';
import { useApp } from '../context/AppContext';

export default function EventEditor({ initialEvent, navigate, clearEditing }) {
  const { addEvent, updateEvent } = useApp();

  function save(details) {
    if (initialEvent) updateEvent(initialEvent.id, details);
    else addEvent(details);
    clearEditing();
    navigate('dashboard');
  }

  function cancel() {
    clearEditing();
    navigate('dashboard');
  }

  return (
    <main className="page-container editor-page">
      <button className="back-link" type="button" onClick={cancel}>← Back to dashboard</button>
      <div className="eyebrow"><span className="eyebrow-line" /> MAKE A LITTLE SPACE</div>
      <h1>{initialEvent ? 'Edit your ' : 'Create an '}<em>event.</em></h1>
      <p className="page-lead">{initialEvent ? 'A few small changes can make a big difference.' : "The best moments start with a plan. Let's get yours on the calendar."}</p>
      <div className="editor-card">
        <div className="editor-card-header"><span className="editor-icon">✳</span><div><h2>Event details</h2><p>Fill in the details below. Fields marked * are required.</p></div></div>
        <EventForm initialEvent={initialEvent} onSave={save} onCancel={cancel} />
      </div>
    </main>
  );
}
