import { TrendingDown, TrendingUp, Minus } from 'lucide-react'

export default function WeightTracker({ currentWeight, profile }) {
  const { startWeight, targetWeight } = profile
  const lost = currentWeight ? startWeight - currentWeight : 0
  const remaining = currentWeight ? currentWeight - targetWeight : startWeight - targetWeight
  const totalToLose = startWeight - targetWeight
  const progress = totalToLose > 0 ? Math.min(Math.max(lost / totalToLose, 0), 1) : 0

  const TrendIcon = lost > 0 ? TrendingDown : lost < 0 ? TrendingUp : Minus
  const trendColor = lost > 0 ? 'var(--success)' : lost < 0 ? 'var(--danger)' : 'var(--text-muted)'

  return (
    <div className="weight-card">
      <div className="weight-main">
        <div className="weight-current">
          <span className="weight-number">{currentWeight || '—'}</span>
          <span className="weight-unit">kg</span>
        </div>
        <div className="weight-delta" style={{ color: trendColor }}>
          <TrendIcon size={16} />
          <span>{lost > 0 ? `-${lost.toFixed(1)}` : lost < 0 ? `+${Math.abs(lost).toFixed(1)}` : '0'} kg</span>
        </div>
      </div>
      <div className="weight-range">
        <span>{startWeight} kg</span>
        <div className="weight-progress-bar">
          <div className="weight-progress-fill" style={{ width: `${progress * 100}%` }} />
          {currentWeight && (
            <div className="weight-marker" style={{ left: `${progress * 100}%` }} />
          )}
        </div>
        <span>{targetWeight} kg</span>
      </div>
      <div className="weight-stats">
        <div className="weight-stat">
          <span className="weight-stat-value">{lost.toFixed(1)} kg</span>
          <span className="weight-stat-label">Lost</span>
        </div>
        <div className="weight-stat">
          <span className="weight-stat-value">{Math.max(remaining, 0).toFixed(1)} kg</span>
          <span className="weight-stat-label">To go</span>
        </div>
        <div className="weight-stat">
          <span className="weight-stat-value">{Math.round(progress * 100)}%</span>
          <span className="weight-stat-label">Progress</span>
        </div>
      </div>
    </div>
  )
}
