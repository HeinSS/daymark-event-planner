export const EVENT_CATEGORIES = ['Work', 'Personal', 'Social', 'Health', 'Other'];

export function eventTimestamp(event) {
  return new Date(`${event.date}T${event.time}:00`).getTime();
}

export function sortEvents(events) {
  return [...events].sort((a, b) => eventTimestamp(a) - eventTimestamp(b));
}

export function upcomingEvents(events, now = new Date()) {
  return sortEvents(events).filter((event) => eventTimestamp(event) >= now.getTime());
}

export function eventsForDate(events, date) {
  return sortEvents(events).filter((event) => event.date === date);
}

export function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-ZA', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function formatTime(time) {
  return new Date(`2000-01-01T${time}:00`).toLocaleTimeString('en-ZA', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

export function calendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  return [
    ...Array.from({ length: mondayOffset }, () => null),
    ...Array.from({ length: count }, (_, index) => index + 1),
  ];
}
