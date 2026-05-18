import { format, startOfWeek, addDays, subDays, isSameDay, parseISO } from 'date-fns'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function getColor(score) {
  if (score === null) return 'var(--surface-1)'
  if (score >= 80) return '#22c55e'
  if (score >= 60) return '#4ade80'
  if (score >= 40) return '#facc15'
  if (score >= 20) return '#fb923c'
  if (score > 0) return '#f87171'
  return 'var(--surface-2)'
}

function getDayScore(dayData, settings) {
  if (!dayData) return null
  let total = 0
  let count = 0

  if (dayData.protein !== undefined) { count++; if (dayData.protein >= (settings.proteinTarget || 120)) total++ }
  if (dayData.skincareAM !== undefined) { count++; if (dayData.skincareAM) total++ }
  if (dayData.skincarePM !== undefined) { count++; if (dayData.skincarePM) total++ }
  if (dayData.steps !== undefined) { count++; if (dayData.steps >= (settings.stepsTarget || 15000)) total++ }
  if (dayData.cigs !== undefined) { count++; if (dayData.cigs <= (settings.cigTarget || 5)) total++ }
  if (dayData.sleep !== undefined) { count++; if (dayData.sleep >= (settings.sleepTarget || 6)) total++ }
  if (dayData.fap !== undefined) { count++; if (dayData.fap === 0) total++ }
  if (dayData.pushups !== undefined) { count++; if (dayData.pushups > 0) total++ }

  if (count === 0) return null
  return Math.round((total / count) * 100)
}

export default function Heatmap({ allData, settings, weeks = 14 }) {
  const today = new Date()
  const grid = []

  const startMonday = startOfWeek(subDays(today, (weeks - 1) * 7), { weekStartsOn: 1 })

  for (let w = 0; w < weeks; w++) {
    const week = []
    for (let d = 0; d < 7; d++) {
      const date = addDays(startMonday, w * 7 + d)
      const dateStr = format(date, 'yyyy-MM-dd')
      const dayData = allData[dateStr]
      const score = getDayScore(dayData, settings)
      const isToday = isSameDay(date, today)
      const isFuture = date > today
      week.push({ date, dateStr, score, isToday, isFuture })
    }
    grid.push(week)
  }

  return (
    <div className="heatmap-container">
      <h3 className="chart-title">Activity Heatmap</h3>
      <div className="heatmap-labels">
        {DAYS.map(d => <span key={d} className="heatmap-day-label">{d}</span>)}
      </div>
      <div className="heatmap-grid">
        {grid.map((week, wi) => (
          <div key={wi} className="heatmap-week">
            {week.map(({ dateStr, score, isToday, isFuture }) => (
              <div
                key={dateStr}
                className={`heatmap-cell ${isToday ? 'today' : ''} ${isFuture ? 'future' : ''}`}
                style={{ backgroundColor: isFuture ? 'var(--surface-1)' : getColor(score) }}
                title={`${dateStr}: ${score !== null ? score + '%' : 'No data'}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="heatmap-legend">
        <span>Less</span>
        {[0, 20, 40, 60, 80, 100].map(s => (
          <div key={s} className="heatmap-cell legend" style={{ backgroundColor: getColor(s) }} />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}
