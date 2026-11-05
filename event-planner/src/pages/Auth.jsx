import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { validateLogin, validateRegistration } from '../utils/validation';

export default function Auth({ mode, navigate }) {
  const isRegister = mode === 'register';
  const { register, login } = useApp();
  const [form, setForm] = useState({ name: '', email: '', username: '', password: '', identifier: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setMessage('');
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = isRegister ? validateRegistration(form) : validateLogin(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const result = isRegister ? register(form) : login(form.identifier, form.password);
    if (result.ok) navigate('dashboard');
    else {
      setErrors(result.errors || {});
      setMessage(result.message || '');
    }
  }

  return (
    <main className="auth-layout">
      <section className="auth-intro">
        <div className="eyebrow light"><span className="eyebrow-line" /> YOUR DAYS, BEAUTIFULLY PLANNED</div>
        <h1>Make space for<br /><em>what matters.</em></h1>
        <p>Less time juggling plans. More time showing up for the moments that count.</p>
        <div className="auth-visual">
          <div className="visual-circle circle-one" /><div className="visual-circle circle-two" />
          <div className="floating-note"><span className="note-icon">✳</span><span><strong>Your next chapter</strong><small>Starts with a plan</small></span><span className="note-check">✓</span></div>
        </div>
        <div className="auth-footer">✦ A little more clarity, every day.</div>
      </section>
      <section className="auth-form-side">
        <div className="auth-card">
          <div className="eyebrow"><span className="eyebrow-line" /> WELCOME TO DAYMARK</div>
          <h2>{isRegister ? 'Create your account' : 'Welcome back'}</h2>
          <p className="muted">{isRegister ? 'Your organised life starts right here.' : 'Pick up right where you left off.'}</p>
          <form onSubmit={submit} noValidate className="auth-form">
            {isRegister && (
              <>
                <label className="field">Full name
                  <input autoComplete="name" placeholder="Your full name" value={form.name} onChange={(e) => update('name', e.target.value)} aria-invalid={Boolean(errors.name)} />
                  {errors.name && <span className="field-error" role="alert">{errors.name}</span>}
                </label>
                <label className="field">Email address
                  <input type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={(e) => update('email', e.target.value)} aria-invalid={Boolean(errors.email)} />
                  {errors.email && <span className="field-error" role="alert">{errors.email}</span>}
                </label>
                <label className="field">Username
                  <input autoComplete="username" placeholder="Choose a username" value={form.username} onChange={(e) => update('username', e.target.value)} aria-invalid={Boolean(errors.username)} />
                  {errors.username && <span className="field-error" role="alert">{errors.username}</span>}
                </label>
              </>
            )}
            {!isRegister && (
              <label className="field">Email or username
                <input autoComplete="username" placeholder="Your email or username" value={form.identifier} onChange={(e) => update('identifier', e.target.value)} aria-invalid={Boolean(errors.identifier)} />
                {errors.identifier && <span className="field-error" role="alert">{errors.identifier}</span>}
              </label>
            )}
            <label className="field">Password
              <input type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} placeholder={isRegister ? 'At least 8 characters' : 'Enter your password'} value={form.password} onChange={(e) => update('password', e.target.value)} aria-invalid={Boolean(errors.password)} />
              {errors.password && <span className="field-error" role="alert">{errors.password}</span>}
            </label>
            {message && <div className="form-alert" role="alert">{message}</div>}
            <button className="button button-primary button-full" type="submit">{isRegister ? 'Create account' : 'Log in'} <span aria-hidden="true">↗</span></button>
          </form>
          <p className="auth-switch">{isRegister ? 'Already have an account?' : "Don't have an account?"} <button type="button" onClick={() => navigate(isRegister ? 'login' : 'register')}>{isRegister ? 'Log in' : 'Create one'}</button></p>
          <p className="privacy-note">Demo app · Data is saved in this browser only. Do not use a real password.</p>
        </div>
      </section>
    </main>
  );
}
