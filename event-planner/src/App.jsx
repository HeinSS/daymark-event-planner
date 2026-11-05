import React, { useState } from 'react';
import Header from './components/Header';
import { useApp } from './context/AppContext';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import EventEditor from './pages/EventEditor';
import Help from './pages/Help';
import Welcome from './pages/Welcome';

export default function App() {
  const { currentUser } = useApp();
  const [page, setPage] = useState(() => currentUser ? 'dashboard' : 'welcome');
  const [editingEvent, setEditingEvent] = useState(null);

  function navigate(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function editEvent(event) {
    setEditingEvent(event);
    navigate('edit');
  }

  const protectedPage = ['dashboard', 'add', 'edit'].includes(page);
  const actualPage = !currentUser && protectedPage ? 'login' : currentUser && ['welcome', 'register', 'login'].includes(page) ? 'dashboard' : page;

  let content;
  switch (actualPage) {
    case 'dashboard':
      content = <Dashboard navigate={navigate} onEdit={editEvent} />;
      break;
    case 'add':
    case 'edit':
      content = <EventEditor initialEvent={actualPage === 'edit' ? editingEvent : null} navigate={navigate} clearEditing={() => setEditingEvent(null)} />;
      break;
    case 'login':
    case 'register':
      content = <Auth key={actualPage} mode={actualPage} navigate={navigate} />;
      break;
    case 'help':
      content = <Help navigate={navigate} isLoggedIn={Boolean(currentUser)} />;
      break;
    default:
      content = <Welcome navigate={navigate} />;
  }

  return <><Header page={actualPage} navigate={navigate} />{content}<footer className="site-footer"><span>✳ daymark.</span><span>Make time for what matters. © {new Date().getFullYear()}</span></footer></>;
}
