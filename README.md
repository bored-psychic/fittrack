# FitTrack

Habit tracker and fitness dashboard for a 105-day challenge to get fit by September 1, 2026.

**Live app:** https://fittrack-2246a.web.app

## What it tracks

| Habit | Target |
|-------|--------|
| Weight | Daily weigh-in (102.3kg start, 88kg goal) |
| Protein | 120g/day |
| Calories | Configurable daily target |
| Steps | 15,000/day |
| Pushups | Progressive (wall to full, goal: 20) |
| Sleep | 6-7.5 hrs/night |
| Cigarettes | 5 or fewer/day |
| Skincare AM/PM | Morning and night routine |
| Gym | Check-in |
| NoFap | 0 per day (max 1) |

## Features

- **Dashboard** with countdown timer, weight progress, streak counter, and quick-tap daily checklist
- **Weekly summary** with averages, week-over-week comparison, and per-habit pie charts
- **Charts page** with line charts (weight, steps, calories, protein, pushups, sleep, cigs), GitHub-style heatmap, and completion pies. Supports 7D/30D/90D/All range selection
- **Pushup Quest** side quest with 5-stage progression from wall pushups to 20 consecutive full pushups
- **Settings** for configurable targets, profile, and account management
- **Real-time sync** across devices via Firebase Firestore
- **PWA** installable on Android and desktop

## Tech stack

- React 19 + Vite
- Firebase Authentication (email/password)
- Cloud Firestore (real-time sync)
- Firebase Hosting
- Recharts
- date-fns
- lucide-react

## Setup

```bash
git clone https://github.com/bored-psychic/fittrack.git
cd fittrack
npm install
npm run dev
```

Runs at `http://localhost:5173`.

### Firebase

The app uses Firebase for auth and data sync. The config in `src/firebase.js` points to the production project. To use your own:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password) and Firestore Database
3. Replace the config in `src/firebase.js` with your own

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
    Countdown.jsx          # Sept 1 countdown ring
    DailyChecklist.jsx     # Habit input cards
    WeightTracker.jsx      # Weight progress display
    StreakCounter.jsx       # Per-habit streak grid
    PushupQuest.jsx        # Pushup progression timeline
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
