import React from 'react';
import { useApp } from '../context/AppContext';

export default function Header({ page, navigate }) {
  const { currentUser, logout } = useApp();

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="brand" type="button" onClick={() => navigate(currentUser ? 'dashboard' : 'welcome')} aria-label="Daymark home">
          <span className="brand-icon">✳</span>
          <span>daymark<span className="brand-dot">.</span></span>
        </button>
        <nav className="nav-links" aria-label="Main navigation">
          {currentUser ? (
            <>
              <button className={page === 'dashboard' ? 'nav-link active' : 'nav-link'} onClick={() => navigate('dashboard')} type="button">Dashboard</button>
              <button className={page === 'add' ? 'nav-link active' : 'nav-link'} onClick={() => navigate('add')} type="button">Add event</button>
              <button className={page === 'help' ? 'nav-link active' : 'nav-link'} onClick={() => navigate('help')} type="button">Help</button>
            </>
          ) : (
            <>
              <button className={page === 'welcome' ? 'nav-link active' : 'nav-link'} onClick={() => navigate('welcome')} type="button">Home</button>
              <button className={page === 'help' ? 'nav-link active' : 'nav-link'} onClick={() => navigate('help')} type="button">Help</button>
            </>
          )}
        </nav>
        <div className="header-actions">
          {currentUser ? (
            <>
              <span className="user-avatar" title={currentUser.name}>{currentUser.name.charAt(0).toUpperCase()}</span>
              <button className="button button-ghost button-small" type="button" onClick={() => { logout(); navigate('welcome'); }}>Log out</button>
            </>
          ) : (
            <>
              <button className="button button-ghost button-small" type="button" onClick={() => navigate('login')}>Log in</button>
              <button className="button button-primary button-small" type="button" onClick={() => navigate('register')}>Get started <span aria-hidden="true">↗</span></button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
