import React from 'react';

const STEPS = [
  { number: '01', title: 'Create your account', body: 'Choose Get started, enter your name, email, username and a password of at least eight characters. Each field is checked before registration.' },
  { number: '02', title: 'Log in', body: 'Use your email address or username and password. Your personal dashboard will open once you log in.' },
  { number: '03', title: 'Explore your dashboard', body: 'The dashboard shows your upcoming events, a calendar and quick statistics. Search by keyword or filter by Upcoming, All or Past.' },
  { number: '04', title: 'Add an event', body: 'Select Add event in the fixed header or the Add new event button. Enter the event name, date, time, location, category and description, then choose Create event.' },
  { number: '05', title: 'Edit or delete an event', body: 'Use Edit on an event card to update its details. Use Delete to remove it after confirming the prompt. The dashboard updates immediately.' },
  { number: '06', title: 'Find events by date', body: 'Use the calendar arrows to change months. Dots mark days with events. Select a date to filter the list; choose Clear filter to show your usual view.' },
];

export default function Help({ navigate, isLoggedIn }) {
  return (
    <main className="page-container help-page">
      <div className="eyebrow"><span className="eyebrow-line" /> HERE TO HELP</div>
      <h1>Planning made <em>simple.</em></h1>
      <p className="page-lead">Everything you need to make the most of Daymark, one easy step at a time.</p>
      <div className="help-grid">
        {STEPS.map((step) => <article className="help-card" key={step.number}><span className="help-number">{step.number}</span><h2>{step.title}</h2><p>{step.body}</p></article>)}
      </div>
      <section className="tips-section"><div><div className="eyebrow light">A FEW GOOD HABITS</div><h2>Make room for <em>better days.</em></h2></div><ul><li>Check your upcoming events at the start of each week.</li><li>Include useful locations and descriptions so nothing gets missed.</li><li>Use categories to keep work, personal and social plans organised.</li><li>Review past events and remove plans you no longer need.</li></ul></section>
      <div className="help-cta"><h2>Ready to get organised?</h2><p>One event at a time. You've got this.</p><button className="button button-primary" type="button" onClick={() => navigate(isLoggedIn ? 'add' : 'register')}>{isLoggedIn ? 'Add an event' : 'Get started'} <span aria-hidden="true">↗</span></button></div>
    </main>
  );
}
