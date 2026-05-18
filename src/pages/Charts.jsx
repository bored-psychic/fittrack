import { subDays, format } from 'date-fns'
import WeightLineChart from '../charts/WeightLineChart'
import HabitLineChart from '../charts/HabitLineChart'
import Heatmap from '../charts/Heatmap'
import CompletionPie from '../charts/CompletionPie'
import { useState } from 'react'

const RANGES = [
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
  { label: 'All', days: 365 },
]

export default function ChartsPage({ habits, profile, settings }) {
  const [range, setRange] = useState(30)
  const today = new Date()
  const startDate = subDays(today, range)
  const data = habits.getDayRange(startDate, today)

  const allDates = habits.getAllDates()
  const totalDaysLogged = allDates.length

  const habitChecks = [
    { key: 'protein', label: 'Protein', check: (d) => d.protein >= (settings.proteinTarget || 120) },
    { key: 'steps', label: 'Steps', check: (d) => d.steps >= (settings.stepsTarget || 15000) },
    { key: 'sleep', label: 'Sleep', check: (d) => d.sleep >= (settings.sleepTarget || 6) },
    { key: 'fap', label: 'NoFap', check: (d) => d.fap === 0 },
    { key: 'cigs', label: 'Cigs ≤5', check: (d) => d.cigs <= (settings.cigTarget || 5) },
    { key: 'pushups', label: 'Pushups', check: (d) => d.pushups > 0 },
  ]

  return (
    <div className="charts-page">
      <h2>Progress Charts</h2>

      <div className="range-selector">
        {RANGES.map(r => (
          <button
            key={r.days}
            className={`range-btn ${range === r.days ? 'active' : ''}`}
            onClick={() => setRange(r.days)}
          >
            {r.label}
          </button>
        ))}
      </div>

      <WeightLineChart data={data} targetWeight={profile.targetWeight} />

      <HabitLineChart data={data} dataKey="steps" title="Daily Steps" color="#34d399" unit="" target={settings.stepsTarget} />
      <HabitLineChart data={data} dataKey="calories" title="Calories" color="#fb923c" unit="kcal" target={settings.calorieTarget} />
      <HabitLineChart data={data} dataKey="protein" title="Protein" color="#f472b6" unit="g" target={settings.proteinTarget} />
      <HabitLineChart data={data} dataKey="pushups" title="Pushups" color="#60a5fa" unit="" />
      <HabitLineChart data={data} dataKey="sleep" title="Sleep" color="#38bdf8" unit="hrs" target={settings.sleepTarget} />
      <HabitLineChart data={data} dataKey="cigs" title="Cigarettes" color="#f87171" unit="" target={settings.cigTarget} lowerIsBetter />

      <Heatmap allData={habits.allData} settings={settings} />

      <h3 className="section-title">Overall Completion</h3>
      <div className="charts-pies">
        {habitChecks.map(h => {
          const completed = allDates.filter(d => {
            const dayData = habits.getDay(d)
            return h.check(dayData)
          }).length
          return (
            <CompletionPie
              key={h.key}
              completed={completed}
              total={totalDaysLogged || 1}
              label={h.label}
            />
          )
        })}
      </div>
    </div>
  )
}
