const USERS_KEY = 'daymark_users_v1';
const SESSION_KEY = 'daymark_session_v1';
const EVENTS_KEY = 'daymark_events_v1';

function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function getUsers() {
  const value = readJSON(USERS_KEY, []);
  return Array.isArray(value) ? value : [];
}

export function saveUsers(users) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession() {
  return readJSON(SESSION_KEY, null);
}

export function saveSession(userId) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(userId));
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

export function getEvents() {
  const value = readJSON(EVENTS_KEY, []);
  return Array.isArray(value) ? value : [];
}

export function saveEvents(events) {
  window.localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}
