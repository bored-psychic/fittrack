import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, CalendarDays, BarChart3, Trophy, Settings } from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Today' },
  { to: '/weekly', icon: CalendarDays, label: 'Weekly' },
  { to: '/charts', icon: BarChart3, label: 'Charts' },
  { to: '/quests', icon: Trophy, label: 'Quests' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Layout() {
  return (
    <div className="app-layout">
      <main className="main-content">
        <Outlet />
      </main>
      <nav className="bottom-nav">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
