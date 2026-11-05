import test from 'node:test';
import assert from 'node:assert/strict';
import { validateRegistration, validateLogin, validateEvent } from '../src/utils/validation.js';
import { calendarDays, dateKey, eventsForDate, sortEvents, upcomingEvents } from '../src/utils/events.js';

test('registration rejects missing fields', () => {
  const errors = validateRegistration({ name: '', email: '', username: '', password: '' });
  assert.deepEqual(Object.keys(errors).sort(), ['email', 'name', 'password', 'username']);
});
test('registration rejects malformed email and short password', () => {
  const errors = validateRegistration({ name: 'Sam', email: 'invalid', username: 'sam', password: 'abc' });
  assert.ok(errors.email);
  assert.ok(errors.password);
});
test('registration accepts valid values', () => {
  assert.deepEqual(validateRegistration({ name: 'Sam', email: 'sam@example.com', username: 'sam_1', password: 'password123' }), {});
});
test('login validates required values', () => {
  assert.ok(validateLogin({ identifier: '', password: '' }).identifier);
  assert.deepEqual(validateLogin({ identifier: 'sam', password: 'secret' }), {});
});
test('event requires all fields', () => {
  const errors = validateEvent({ title: '', date: '', time: '', location: '', description: '' });
  assert.equal(Object.keys(errors).length, 5);
});
test('event validates time format', () => {
  const details = { title: 'Meeting', date: '2026-11-05', time: '25:00', location: 'Office', description: 'Planning' };
  assert.ok(validateEvent(details).time);
  assert.deepEqual(validateEvent({ ...details, time: '14:30' }), {});
});
test('event sorting, filtering and upcoming logic', () => {
  const events = [
    { id: 'b', date: '2026-11-05', time: '16:00' },
    { id: 'a', date: '2026-11-05', time: '08:00' },
    { id: 'c', date: '2026-10-01', time: '12:00' },
  ];
  assert.deepEqual(sortEvents(events).map((e) => e.id), ['c', 'a', 'b']);
  assert.deepEqual(eventsForDate(events, '2026-11-05').map((e) => e.id), ['a', 'b']);
  assert.deepEqual(upcomingEvents(events, new Date('2026-11-05T09:00:00')).map((e) => e.id), ['b']);
});
test('calendar begins on Monday and local date key is stable', () => {
  assert.equal(calendarDays(2026, 10)[0], null);
  assert.equal(calendarDays(2026, 10).filter((day) => day !== null).length, 30);
  assert.equal(dateKey(new Date(2026, 9, 28)), '2026-10-28');
});
