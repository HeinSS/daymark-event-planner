import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  clearSession, getEvents, getSession, getUsers, saveEvents, saveSession, saveUsers,
} from '../utils/storage';
import { validateRegistration } from '../utils/validation';

const AppContext = createContext(null);

function createId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function AppProvider({ children }) {
  const [users, setUsers] = useState(getUsers);
  const [sessionId, setSessionId] = useState(getSession);
  const [events, setEvents] = useState(getEvents);

  const currentUser = users.find((user) => user.id === sessionId) || null;
  const userEvents = events.filter((event) => event.ownerId === sessionId);

  function register(details) {
    const errors = validateRegistration(details);
    if (Object.keys(errors).length) return { ok: false, errors };
    const email = details.email.trim().toLowerCase();
    const username = details.username.trim();
    if (users.some((user) => user.email === email)) {
      return { ok: false, errors: { email: 'An account with this email already exists.' } };
    }
    if (users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
      return { ok: false, errors: { username: 'This username is already taken.' } };
    }
    const user = {
      id: createId(),
      name: details.name.trim(),
      email,
      username,
      password: details.password,
    };
    const next = [...users, user];
    setUsers(next);
    saveUsers(next);
    setSessionId(user.id);
    saveSession(user.id);
    return { ok: true };
  }

  function login(identifier, password) {
    const normalized = identifier.trim().toLowerCase();
    const user = users.find(
      (item) => (item.email === normalized || item.username.toLowerCase() === normalized)
        && item.password === password,
    );
    if (!user) return { ok: false, message: 'Incorrect login details. Please try again.' };
    setSessionId(user.id);
    saveSession(user.id);
    return { ok: true };
  }

  function logout() {
    setSessionId(null);
    clearSession();
  }

  function addEvent(details) {
    if (!sessionId) return;
    const next = [...events, { ...details, id: createId(), ownerId: sessionId, createdAt: Date.now() }];
    setEvents(next);
    saveEvents(next);
  }

  function updateEvent(id, details) {
    const next = events.map((event) => event.id === id && event.ownerId === sessionId
      ? { ...event, ...details, id: event.id, ownerId: event.ownerId }
      : event);
    setEvents(next);
    saveEvents(next);
  }

  function deleteEvent(id) {
    const next = events.filter((event) => !(event.id === id && event.ownerId === sessionId));
    setEvents(next);
    saveEvents(next);
  }

  const value = useMemo(() => ({
    currentUser, userEvents, register, login, logout, addEvent, updateEvent, deleteEvent,
  // The functions close over current state and must be refreshed each render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [currentUser, userEvents, users, events, sessionId]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider.');
  return context;
}
