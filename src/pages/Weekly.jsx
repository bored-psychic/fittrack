import { format, subDays, startOfWeek, endOfWeek } from 'date-fns'
import ProgressRing from '../charts/ProgressRing'
import CompletionPie from '../charts/CompletionPie'

const HABIT_CHECKS = [
  { key: 'protein', label: 'Protein', check: (d, s) => d.protein >= (s.proteinTarget || 120) },
  { key: 'skincareAM', label: 'Skincare AM', check: (d) => d.skincareAM },
  { key: 'skincarePM', label: 'Skincare PM', check: (d) => d.skincarePM },
  { key: 'steps', label: 'Steps', check: (d, s) => d.steps >= (s.stepsTarget || 15000) },
  { key: 'cigs', label: 'Cigs ≤5', check: (d, s) => d.cigs <= (s.cigTarget || 5) },
  { key: 'sleep', label: 'Sleep', check: (d, s) => d.sleep >= (s.sleepTarget || 6) },
  { key: 'fap', label: 'NoFap', check: (d) => d.fap === 0 },
  { key: 'pushups', label: 'Pushups', check: (d) => d.pushups > 0 },
]

export default function Weekly({ habits, settings }) {
  const today = new Date()
  const weekStart = startOfWeek(today, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 })
  const weekData = habits.getDayRange(weekStart, today)
  const daysLogged = weekData.filter(d =>
    Object.keys(habits.allData).includes(d.date)
  ).length

  const prevWeekStart = subDays(weekStart, 7)
  const prevWeekEnd = subDays(weekStart, 1)
  const prevWeekData = habits.getDayRange(prevWeekStart, prevWeekEnd)

  const getAvg = (data, key) => {
    const vals = data.filter(d => d[key] > 0).map(d => d[key])
    return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length) : 0
  }

  const avgWeight = getAvg(weekData, 'weight')
  const avgSteps = getAvg(weekData, 'steps')
  const avgCalories = getAvg(weekData, 'calories')
  const avgSleep = getAvg(weekData, 'sleep')
  const avgProtein = getAvg(weekData, 'protein')

  const prevAvgSteps = getAvg(prevWeekData, 'steps')
  const prevAvgCalories = getAvg(prevWeekData, 'calories')

  const delta = (curr, prev) => {
    if (!prev) return null
    const diff = curr - prev
    return diff > 0 ? `+${Math.round(diff)}` : `${Math.round(diff)}`
  }

  const habitCompletions = HABIT_CHECKS.map(h => ({
    ...h,
    completed: weekData.filter(d =>
      Object.keys(habits.allData).includes(d.date) && h.check(d, settings)
    ).length,
    total: daysLogged,
  }))

  const overallCompleted = habitCompletions.reduce((s, h) => s + h.completed, 0)
  const overallTotal = habitCompletions.reduce((s, h) => s + h.total, 0)

  return (
    <div className="weekly-page">
      <h2>Weekly Summary</h2>
      <p className="week-range">
        {format(weekStart, 'MMM d')} — {format(weekEnd, 'MMM d')}
      </p>

      <div className="weekly-overview">
        <ProgressRing
          value={overallCompleted}
          max={overallTotal || 1}
          size={90}
          color="var(--accent)"
          label={`${overallTotal > 0 ? Math.round((overallCompleted / overallTotal) * 100) : 0}%`}
          sublabel="overall"
        />
        <div className="weekly-stats">
          <div className="weekly-stat">
            <span className="stat-label">Days logged</span>
            <span className="stat-value">{daysLogged}/7</span>
          </div>
          <div className="weekly-stat">
            <span className="stat-label">Avg steps</span>
            <span className="stat-value">
              {Math.round(avgSteps).toLocaleString()}
              {prevAvgSteps > 0 && <small className={avgSteps >= prevAvgSteps ? 'up' : 'down'}> {delta(avgSteps, prevAvgSteps)}</small>}
            </span>
          </div>
          <div className="weekly-stat">
            <span className="stat-label">Avg calories</span>
            <span className="stat-value">
              {Math.round(avgCalories)}
              {prevAvgCalories > 0 && <small className={avgCalories <= prevAvgCalories ? 'up' : 'down'}> {delta(avgCalories, prevAvgCalories)}</small>}
            </span>
          </div>
          <div className="weekly-stat">
            <span className="stat-label">Avg sleep</span>
            <span className="stat-value">{avgSleep.toFixed(1)} hrs</span>
          </div>
          <div className="weekly-stat">
            <span className="stat-label">Avg protein</span>
            <span className="stat-value">{Math.round(avgProtein)}g</span>
          </div>
        </div>
      </div>

      <h3 className="section-title">Habit Completion</h3>
      <div className="weekly-pies">
        {habitCompletions.map(h => (
          <CompletionPie
            key={h.key}
            completed={h.completed}
            total={h.total || 1}
            label={h.label}
          />
        ))}
      </div>

      <h3 className="section-title">Daily Breakdown</h3>
      <div className="week-days">
        {weekData.map(d => {
          const logged = Object.keys(habits.allData).includes(d.date)
          const completedCount = logged ? HABIT_CHECKS.filter(h => h.check(d, settings)).length : 0
          return (
            <div key={d.date} className={`week-day-card ${logged ? '' : 'empty'}`}>
              <span className="week-day-name">{format(new Date(d.date + 'T00:00:00'), 'EEE')}</span>
              <span className="week-day-date">{format(new Date(d.date + 'T00:00:00'), 'd')}</span>
              {logged ? (
                <div className="week-day-score" style={{
                  color: completedCount >= 6 ? 'var(--success)' : completedCount >= 4 ? 'var(--warning)' : 'var(--danger)'
                }}>
                  {completedCount}/8
                </div>
              ) : (
                <div className="week-day-score empty">—</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
