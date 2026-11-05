import React from 'react';

export default function Welcome({ navigate }) {
  return (
    <main className="welcome-page">
      <div className="welcome-glow" />
      <div className="welcome-content">
        <div className="eyebrow"><span className="eyebrow-line" /> THE PERSONAL EVENT PLANNER</div>
        <h1>Good things happen<br />when you <em>make time.</em></h1>
        <p>Meet Daymark — a calmer way to plan your days, remember what matters, and stay one step ahead.</p>
        <div className="welcome-actions">
          <button className="button button-primary" type="button" onClick={() => navigate('register')}>Start planning for free <span aria-hidden="true">↗</span></button>
          <button className="button button-outline" type="button" onClick={() => navigate('login')}>I have an account</button>
        </div>
        <div className="feature-strip">
          <div><span>◷</span><strong>Stay on schedule</strong><small>Every event, one place</small></div>
          <div><span>✳</span><strong>Make it yours</strong><small>Organise your way</small></div>
          <div><span>✓</span><strong>Keep it simple</strong><small>Less chaos, more clarity</small></div>
        </div>
      </div>
      <div className="welcome-illustration" aria-hidden="true">
        <div className="illustration-orbit" />
        <div className="mock-calendar">
          <div className="mock-top"><span>October 2026</span><span>‹ &nbsp; ›</span></div>
          <div className="mock-week"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
          <div className="mock-dates">{Array.from({ length: 35 }, (_, i) => <span className={i === 17 ? 'mock-highlight' : ''} key={i}>{i < 3 || i > 33 ? '' : i - 2}</span>)}</div>
          <div className="mock-event"><span>●</span> Coffee with Maya <small>10:30 AM</small></div>
          <div className="mock-event second"><span>●</span> Design review <small>2:00 PM</small></div>
        </div>
        <div className="mock-badge">✦ &nbsp; Your week, in harmony</div>
      </div>
    </main>
  );
}
