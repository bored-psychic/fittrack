import { format } from 'date-fns'
import {
  Beef, Droplets, Footprints, Cigarette, Weight, Flame,
  Moon, Dumbbell, Check, X, ChevronUp, ChevronDown
} from 'lucide-react'

const HABITS = [
  {
    key: 'weight',
    label: 'Weight',
    icon: Weight,
    type: 'number',
    unit: 'kg',
    step: 0.1,
    color: '#4ade80',
  },
  {
    key: 'protein',
    label: 'Protein',
    icon: Beef,
    type: 'number',
    unit: 'g',
    target: 'proteinTarget',
    color: '#f472b6',
  },
  {
    key: 'calories',
    label: 'Calories',
    icon: Flame,
    type: 'number',
    unit: 'kcal',
    target: 'calorieTarget',
    color: '#fb923c',
  },
  {
    key: 'steps',
    label: 'Steps',
    icon: Footprints,
    type: 'number',
    unit: '',
    target: 'stepsTarget',
    color: '#34d399',
  },
  {
    key: 'pushups',
    label: 'Pushups',
    icon: Dumbbell,
    type: 'number',
    unit: '',
    color: '#60a5fa',
  },
  {
    key: 'sleep',
    label: 'Sleep',
    icon: Moon,
    type: 'number',
    unit: 'hrs',
    step: 0.5,
    target: 'sleepTarget',
    color: '#38bdf8',
  },
  {
    key: 'cigs',
    label: 'Cigarettes',
    icon: Cigarette,
    type: 'number',
    unit: '',
    target: 'cigTarget',
    lowerIsBetter: true,
    color: '#f87171',
  },
  {
    key: 'fap',
    label: 'Fap',
    icon: X,
    type: 'toggle',
    options: [0, 1],
    labels: ['None ✓', '1'],
    color: '#fbbf24',
  },
  {
    key: 'skincareAM',
    label: 'Skincare AM',
    icon: Droplets,
    type: 'checkbox',
    color: '#2dd4bf',
  },
  {
    key: 'skincarePM',
    label: 'Skincare PM',
    icon: Droplets,
    type: 'checkbox',
    color: '#2dd4bf',
  },
  {
    key: 'gym',
    label: 'Gym',
    icon: Dumbbell,
    type: 'checkbox',
    color: '#f97316',
  },
]

export default function DailyChecklist({ date, dayData, onUpdate, settings }) {
  const dateStr = typeof date === 'string' ? date : format(date, 'yyyy-MM-dd')
  const displayDate = format(
    typeof date === 'string' ? new Date(date + 'T00:00:00') : date,
    'EEEE, MMM d'
  )

  const handleNumberChange = (key, value, step = 1) => {
    const num = parseFloat(value)
    if (!isNaN(num) && num >= 0) {
      onUpdate(dateStr, { [key]: num })
    }
  }

  const handleIncrement = (key, step = 1) => {
    const current = dayData[key] || 0
    onUpdate(dateStr, { [key]: Math.round((current + step) * 10) / 10 })
  }

  const handleDecrement = (key, step = 1) => {
    const current = dayData[key] || 0
    onUpdate(dateStr, { [key]: Math.max(0, Math.round((current - step) * 10) / 10) })
  }

  const getProgressPercent = (habit) => {
    if (habit.type === 'checkbox') return dayData[habit.key] ? 100 : 0
    if (habit.type === 'toggle') return dayData[habit.key] === 0 ? 100 : 30
    if (!habit.target) return 0
    const target = settings[habit.target]
    if (!target) return 0
    const val = dayData[habit.key] || 0
    if (habit.lowerIsBetter) return val <= target ? 100 : Math.max(0, (1 - (val - target) / target) * 100)
    return Math.min(100, (val / target) * 100)
  }

  return (
    <div className="daily-checklist">
      <h2 className="checklist-date">{displayDate}</h2>
      <div className="habits-grid">
        {HABITS.map((habit) => {
          const progress = getProgressPercent(habit)
          const isComplete = progress >= 100

          if (habit.type === 'checkbox') {
            return (
              <button
                key={habit.key}
                className={`habit-card habit-checkbox ${dayData[habit.key] ? 'checked' : ''}`}
                onClick={() => onUpdate(dateStr, { [habit.key]: !dayData[habit.key] })}
                style={{ '--habit-color': habit.color }}
              >
                <div className="habit-icon-wrap">
                  <habit.icon size={20} />
                </div>
                <span className="habit-label">{habit.label}</span>
                <div className={`habit-check ${dayData[habit.key] ? 'on' : ''}`}>
                  {dayData[habit.key] ? <Check size={16} /> : null}
                </div>
              </button>
            )
          }

          if (habit.type === 'toggle') {
            const val = dayData[habit.key] || 0
            return (
              <button
                key={habit.key}
                className={`habit-card habit-toggle ${val === 0 ? 'checked' : 'warning'}`}
                onClick={() => onUpdate(dateStr, { [habit.key]: val === 0 ? 1 : 0 })}
                style={{ '--habit-color': habit.color }}
              >
                <div className="habit-icon-wrap">
                  <habit.icon size={20} />
                </div>
                <span className="habit-label">{habit.label}</span>
                <span className="habit-toggle-value">{habit.labels[val]}</span>
              </button>
            )
          }

          return (
            <div
              key={habit.key}
              className={`habit-card habit-numeric ${isComplete ? 'complete' : ''}`}
              style={{ '--habit-color': habit.color }}
            >
              <div className="habit-header">
                <div className="habit-icon-wrap">
                  <habit.icon size={18} />
                </div>
                <span className="habit-label">{habit.label}</span>
              </div>
              <div className="habit-input-row">
                <button className="habit-btn" onClick={() => handleDecrement(habit.key, habit.step || (habit.key === 'steps' ? 500 : 1))}>
                  <ChevronDown size={16} />
                </button>
                <input
                  type="number"
                  className="habit-input"
                  value={dayData[habit.key] || ''}
                  placeholder="0"
                  step={habit.step || 1}
                  onChange={(e) => handleNumberChange(habit.key, e.target.value, habit.step)}
                />
                <button className="habit-btn" onClick={() => handleIncrement(habit.key, habit.step || (habit.key === 'steps' ? 500 : 1))}>
                  <ChevronUp size={16} />
                </button>
              </div>
              <div className="habit-meta">
                <span className="habit-value">
                  {dayData[habit.key] || 0}{habit.unit && ` ${habit.unit}`}
                </span>
                {habit.target && settings[habit.target] && (
                  <span className="habit-target">/ {settings[habit.target]}{habit.unit && ` ${habit.unit}`}</span>
                )}
              </div>
              {habit.target && (
                <div className="habit-progress-bar">
                  <div
                    className="habit-progress-fill"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { HABITS }
