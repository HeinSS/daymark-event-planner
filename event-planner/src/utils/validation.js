export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,24}$/;

export function validateRegistration({ name, email, username, password }) {
  const errors = {};
  if (!name?.trim()) errors.name = 'Please enter your full name.';
  if (!email?.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Enter a valid email address.';
  if (!username?.trim()) errors.username = 'Please choose a username.';
  else if (!USERNAME_PATTERN.test(username.trim())) {
    errors.username = 'Use 3–24 letters, numbers or underscores.';
  }
  if (!password) errors.password = 'Please enter a password.';
  else if (password.length < 8) errors.password = 'Use at least 8 characters.';
  return errors;
}

export function validateLogin({ identifier, password }) {
  const errors = {};
  if (!identifier?.trim()) errors.identifier = 'Enter your email or username.';
  if (!password) errors.password = 'Enter your password.';
  return errors;
}

export function validateEvent({ title, date, time, location, description }) {
  const errors = {};
  if (!title?.trim()) errors.title = 'Event name is required.';
  if (!date) errors.date = 'Choose a date.';
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(new Date(`${date}T12:00:00`).getTime())) {
    errors.date = 'Choose a valid date.';
  }
  if (!time) errors.time = 'Choose a time.';
  else if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) errors.time = 'Choose a valid time.';
  if (!location?.trim()) errors.location = 'Location is required.';
  if (!description?.trim()) errors.description = 'Add a short description.';
  return errors;
}
