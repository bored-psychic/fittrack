import { differenceInCalendarDays, differenceInHours, differenceInMinutes } from 'date-fns'

export default function Countdown({ targetDate, startDate }) {
  const now = new Date()
  const target = new Date(targetDate + 'T00:00:00')
  const start = new Date(startDate + 'T00:00:00')

  const totalDays = differenceInCalendarDays(target, start)
  const daysLeft = differenceInCalendarDays(target, now)
  const daysPassed = totalDays - daysLeft
  const progress = Math.min(Math.max(daysPassed / totalDays, 0), 1)

  const hoursLeft = differenceInHours(target, now) % 24
  const minsLeft = differenceInMinutes(target, now) % 60

  const radius = 54
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <div className="countdown-card">
      <div className="countdown-ring-container">
        <svg viewBox="0 0 120 120" className="countdown-ring">
          <circle
            cx="60" cy="60" r={radius}
            fill="none" stroke="var(--surface-2)" strokeWidth="8"
          />
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke={daysLeft <= 14 ? 'var(--danger)' : 'var(--accent)'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="countdown-inner">
          <span className="countdown-number">{Math.max(daysLeft, 0)}</span>
          <span className="countdown-label">days left</span>
        </div>
      </div>
      <div className="countdown-details">
        <h3>September 1 Challenge</h3>
        <p className="countdown-time">
          {daysLeft}d {hoursLeft}h {minsLeft}m remaining
        </p>
        <div className="countdown-bar">
          <div className="countdown-bar-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <p className="countdown-progress-text">
          Day {daysPassed} of {totalDays} ({Math.round(progress * 100)}%)
        </p>
      </div>
    </div>
  )
}
