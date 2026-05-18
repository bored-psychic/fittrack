import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { useHabits, useProfile, useSettings } from './hooks/useHabits'
import Layout from './components/Layout'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import Weekly from './pages/Weekly'
import ChartsPage from './pages/Charts'
import Quests from './pages/Quests'
import SettingsPage from './pages/SettingsPage'

function AppRoutes() {
  const { user, logout } = useAuth()

  if (!user) return <Login />

  const uid = user.uid

  return <AuthenticatedApp uid={uid} logout={logout} />
}

function AuthenticatedApp({ uid, logout }) {
  const habits = useHabits(uid)
  const { profile, updateProfile } = useProfile(uid)
  const { settings, updateSettings } = useSettings(uid)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout logout={logout} />}>
          <Route
            index
            element={
              <Dashboard habits={habits} profile={profile} settings={settings} />
            }
          />
          <Route
            path="weekly"
            element={
              <Weekly habits={habits} settings={settings} />
            }
          />
          <Route
            path="charts"
            element={
              <ChartsPage habits={habits} profile={profile} settings={settings} />
            }
          />
          <Route
            path="quests"
            element={
              <Quests profile={profile} allData={habits.allData} />
            }
          />
          <Route
            path="settings"
            element={
              <SettingsPage
                profile={profile}
                updateProfile={updateProfile}
                settings={settings}
                updateSettings={updateSettings}
                logout={logout}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
