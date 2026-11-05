import React, { useState } from 'react';
import { EVENT_CATEGORIES, dateKey } from '../utils/events';
import { validateEvent } from '../utils/validation';

function FieldError({ message }) {
  return message ? <span className="field-error" role="alert">{message}</span> : null;
}

export default function EventForm({ initialEvent, onSave, onCancel }) {
  const [form, setForm] = useState(() => ({
    title: initialEvent?.title || '',
    date: initialEvent?.date || dateKey(new Date()),
    time: initialEvent?.time || '09:00',
    description: initialEvent?.description || '',
    location: initialEvent?.location || '',
    category: initialEvent?.category || 'Personal',
  }));
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = validateEvent(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    onSave({
      title: form.title.trim(),
      date: form.date,
      time: form.time,
      location: form.location.trim(),
      description: form.description.trim(),
      category: form.category,
    });
  }

  return (
    <form className="event-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        <label className="field full">Event name <span className="required">*</span>
          <input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="e.g. Team planning session" aria-invalid={Boolean(errors.title)} />
          <FieldError message={errors.title} />
        </label>
        <label className="field">Date <span className="required">*</span>
          <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} aria-invalid={Boolean(errors.date)} />
          <FieldError message={errors.date} />
        </label>
        <label className="field">Time <span className="required">*</span>
          <input type="time" value={form.time} onChange={(e) => update('time', e.target.value)} aria-invalid={Boolean(errors.time)} />
          <FieldError message={errors.time} />
        </label>
        <label className="field full">Location <span className="required">*</span>
          <input value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="e.g. Conference room / Online" aria-invalid={Boolean(errors.location)} />
          <FieldError message={errors.location} />
        </label>
        <label className="field full">Category
          <select value={form.category} onChange={(e) => update('category', e.target.value)}>
            {EVENT_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
          </select>
        </label>
        <label className="field full">Description <span className="required">*</span>
          <textarea value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="What's happening? Add a few helpful details..." rows="5" aria-invalid={Boolean(errors.description)} />
          <FieldError message={errors.description} />
        </label>
      </div>
      <div className="form-actions">
        <button className="button button-outline" type="button" onClick={onCancel}>Cancel</button>
        <button className="button button-primary" type="submit">{initialEvent ? 'Save changes' : 'Create event'} <span aria-hidden="true">↗</span></button>
      </div>
    </form>
  );
}
