import { Flame, Zap } from 'lucide-react'

const STREAK_HABITS = [
  { key: 'protein', label: 'Protein', check: (d) => d.protein >= 100 },
  { key: 'skincareAM', label: 'Skincare AM', check: (d) => d.skincareAM },
  { key: 'skincarePM', label: 'Skincare PM', check: (d) => d.skincarePM },
  { key: 'steps', label: '15K Steps', check: (d) => d.steps >= 15000 },
  { key: 'cigs', label: 'Cigs ≤5', check: (d) => d.cigs <= 5 && d.cigs !== undefined },
  { key: 'sleep', label: 'Sleep 6h+', check: (d) => d.sleep >= 6 },
  { key: 'fap', label: 'NoFap', check: (d) => d.fap === 0 },
  { key: 'pushups', label: 'Pushups', check: (d) => d.pushups > 0 },
]

export default function StreakCounter({ getStreak }) {
  const streaks = STREAK_HABITS.map(h => ({
    ...h,
    streak: getStreak(h.key, h.check),
  }))

  const maxStreak = Math.max(...streaks.map(s => s.streak), 0)
  const activeStreaks = streaks.filter(s => s.streak > 0)

  return (
    <div className="streak-section">
      <div className="streak-header">
        <Flame size={20} className="streak-fire" />
        <h3>Streaks</h3>
      </div>
      <div className="streak-grid">
        {streaks.map(({ key, label, streak }) => (
          <div key={key} className={`streak-item ${streak > 0 ? 'active' : ''}`}>
            <div className="streak-count">
              {streak > 0 && <Zap size={12} className="streak-zap" />}
              <span>{streak}</span>
            </div>
            <span className="streak-label">{label}</span>
          </div>
        ))}
      </div>
      {maxStreak >= 7 && (
        <div className="streak-badge">
          🔥 Longest active streak: {maxStreak} days!
        </div>
      )}
    </div>
  )
}
