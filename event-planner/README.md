# Daymark — Personal Event Planner

A responsive React + Vite capstone project for planning personal and professional events.

## Features

- Account registration with name, email, username, password and input validation
- Login and logout
- Personal dashboard with upcoming events, statistics, search and filters
- Create, edit and delete events (name, date, time, location, category, description)
- Calendar view with clickable event dates
- Fixed header navigation (Dashboard, Add Event, Help)
- Context API for shared authentication and event state
- Browser localStorage persistence
- Responsive layout for desktop, tablet and mobile
- Help page with detailed user instructions

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Install and run

Open a terminal in the `event-planner` folder:

```bash
npm install
npm run dev
```

On Windows PowerShell, if `npm` is blocked by execution policy, use:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local address shown by Vite (usually `http://localhost:5173/`).

## Tests and production build

```bash
npm run test
npm run build
```

PowerShell equivalents:

```powershell
npm.cmd run test
npm.cmd run build
```

## How to use

1. Choose **Get started** and register with a name, valid email, username and password (8+ characters).
2. After registering, the dashboard opens automatically.
3. Choose **Add event**, fill in the required details and select **Create event**.
4. Use **Edit** to update an event or **Delete** to remove it (confirmation required).
5. Use the calendar, search bar and filter tabs to find events.
6. Use **Help** for detailed instructions and planning tips.
7. Log out and log back in to see the same events in the same browser.

## Folder structure

```text
event-planner/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles.css
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Calendar.jsx
│   │   ├── EventCard.jsx
│   │   └── EventForm.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── pages/
│   │   ├── Auth.jsx
│   │   ├── Welcome.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EventEditor.jsx
│   │   └── Help.jsx
│   └── utils/
│       ├── events.js
│       ├── storage.js
│       └── validation.js
└── tests/
    └── validation.test.js
```

## Technical notes

This is a **front-end coursework demo**, not a production authentication system. User accounts (including passwords) and events are stored in the browser's localStorage. **Do not reuse a real password.** A production app requires a backend, hashed passwords, secure sessions and database storage. Data does not sync across devices or browsers.

The project is structured for Git version control. To initialise a new local repository:

```bash
git init
git add .
git commit -m "Initial Daymark event planner capstone"
```

`node_modules/` and `dist/` are excluded via `.gitignore`.

## Capstone requirement checklist

- [x] Register and validate name, email, username and password
- [x] Log in and view dashboard
- [x] Add events with all required details
- [x] Display events dynamically using `array.map()`
- [x] Edit and delete events with immediate React state updates
- [x] Fixed navigation header
- [x] React Context API for user and event state
- [x] Help page
- [x] Responsive design
- [x] Git-ready project with README
- [x] React + Vite, `npm install`, `npm run dev`
