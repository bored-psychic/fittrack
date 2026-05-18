import { Trophy, Lock, CheckCircle, ChevronRight } from 'lucide-react'
import { differenceInWeeks } from 'date-fns'

const STAGES = [
  {
    id: 'wall',
    name: 'Wall Pushups',
    description: 'Stand facing wall, push away. 3 sets of 10.',
    weeks: '1-2',
    reps: '3×10',
    badge: '🧱',
    unlockWeek: 0,
  },
  {
    id: 'incline',
    name: 'Incline Pushups',
    description: 'Hands on bench/counter, body straight. 3 sets of 8.',
    weeks: '3-4',
    reps: '3×8',
    badge: '📐',
    unlockWeek: 2,
  },
  {
    id: 'knee',
    name: 'Knee Pushups',
    description: 'On your knees, full range of motion. 3 sets of 8.',
    weeks: '5-7',
    reps: '3×8',
    badge: '🦵',
    unlockWeek: 4,
  },
  {
    id: 'half',
    name: 'Half Pushups',
    description: 'Full position, go halfway down. 3 sets of 5.',
    weeks: '8-10',
    reps: '3×5',
    badge: '💪',
    unlockWeek: 7,
  },
  {
    id: 'full',
    name: 'Full Pushups',
    description: 'Full pushups! Build to 20 consecutive.',
    weeks: '11-14',
    reps: 'Build to 20',
    badge: '🏆',
    unlockWeek: 10,
  },
]

export default function PushupQuest({ profile, allData }) {
  const startDate = new Date(profile.startDate + 'T00:00:00')
  const currentWeek = differenceInWeeks(new Date(), startDate)

  const totalPushups = Object.values(allData).reduce(
    (sum, d) => sum + (d.pushups || 0), 0
  )

  const maxPushups = Math.max(
    ...Object.values(allData).map(d => d.pushups || 0), 0
  )

  const getCurrentStage = () => {
    for (let i = STAGES.length - 1; i >= 0; i--) {
      if (currentWeek >= STAGES[i].unlockWeek) return i
    }
    return 0
  }

  const currentStageIdx = getCurrentStage()

  return (
    <div className="quest-page">
      <div className="quest-header-card">
        <Trophy size={28} className="quest-trophy" />
        <div>
          <h2>Pushup Quest</h2>
          <p>From zero to 20 pushups</p>
        </div>
      </div>

      <div className="quest-stats">
        <div className="quest-stat">
          <span className="quest-stat-value">{totalPushups}</span>
          <span className="quest-stat-label">Total pushups</span>
        </div>
        <div className="quest-stat">
          <span className="quest-stat-value">{maxPushups}</span>
          <span className="quest-stat-label">Best in a day</span>
        </div>
        <div className="quest-stat">
          <span className="quest-stat-value">Week {currentWeek + 1}</span>
          <span className="quest-stat-label">Current week</span>
        </div>
      </div>

      <div className="quest-timeline">
        {STAGES.map((stage, idx) => {
          const isUnlocked = currentWeek >= stage.unlockWeek
          const isCurrent = idx === currentStageIdx
          const isCompleted = idx < currentStageIdx

          return (
            <div
              key={stage.id}
              className={`quest-stage ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''} ${!isUnlocked ? 'locked' : ''}`}
            >
              <div className="quest-stage-line">
                <div className={`quest-stage-dot ${isCompleted ? 'done' : isCurrent ? 'active' : ''}`}>
                  {isCompleted ? (
                    <CheckCircle size={20} />
                  ) : !isUnlocked ? (
                    <Lock size={14} />
                  ) : (
                    <span className="quest-badge">{stage.badge}</span>
                  )}
                </div>
              </div>
              <div className="quest-stage-content">
                <div className="quest-stage-header">
                  <h3>{stage.name}</h3>
                  <span className="quest-weeks">Weeks {stage.weeks}</span>
                </div>
                <p>{stage.description}</p>
                <div className="quest-stage-meta">
                  <span className="quest-reps">{stage.reps}</span>
                  {isCurrent && (
                    <span className="quest-current-badge">
                      <ChevronRight size={14} /> You are here
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
