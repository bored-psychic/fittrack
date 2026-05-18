# FitTrack

A habit tracking PWA with real-time cross-device sync, built for time-bound fitness challenges. Set a goal, pick your habits, and track daily progress with charts and streak counters.

## Features

- **Daily habit checklist** — quick-tap checkboxes and numeric inputs for fast logging
- **Countdown timer** — visual progress ring showing days remaining in your challenge
- **Weight tracker** — start/current/goal with trend visualization
- **Streak counter** — per-habit streak tracking with fire indicators
- **Charts** — line charts, GitHub-style activity heatmap, and completion pie charts with 7D/30D/90D/All range selector
- **Weekly summary** — averages, week-over-week deltas, daily breakdown cards
- **Side quests** — progressive challenge system (e.g., pushup progression from beginner to advanced)
- **Real-time sync** — log on your phone, see it on your laptop instantly
- **PWA** — installable on Android and desktop, works like a native app
- **Dark theme** — mobile-first responsive design

## Tech stack

- React 19 + Vite
- Firebase Authentication (email/password)
- Cloud Firestore (real-time sync)
- Firebase Hosting
- Recharts for data visualization
- date-fns for date utilities
- lucide-react for icons

## Setup

```bash
git clone https://github.com/bored-psychic/fittrack.git
cd fittrack
npm install
npm run dev
```

### Firebase configuration

The app requires a Firebase project with Authentication and Firestore enabled:

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** (Email/Password provider)
3. Create a **Firestore Database**
4. Register a web app and copy the config into `src/firebase.js`

### Deploy

```bash
npm run build
firebase deploy --only hosting
```

## Project structure

```
src/
  App.jsx                  # Root with routing and auth
  firebase.js              # Firebase config
  context/AuthContext.jsx   # Auth provider
  hooks/useHabits.js       # Firestore CRUD + streaks
  components/
    Layout.jsx             # Bottom nav + page shell
    Countdown.jsx          # Challenge countdown ring
    DailyChecklist.jsx     # Habit input cards
    WeightTracker.jsx      # Weight progress display
    StreakCounter.jsx       # Per-habit streak grid
    PushupQuest.jsx        # Side quest progression timeline
    Login.jsx              # Auth screen
  pages/
    Dashboard.jsx          # Main daily view
    Weekly.jsx             # 7-day summary
    Charts.jsx             # All visualizations
    Quests.jsx             # Side quests
    SettingsPage.jsx       # Targets + profile
  charts/
    WeightLineChart.jsx    # Weight trend line
    HabitLineChart.jsx     # Generic habit line chart
    Heatmap.jsx            # Calendar heatmap
    CompletionPie.jsx      # Donut completion chart
    ProgressRing.jsx       # Circular progress indicator
```

## License

MIT
