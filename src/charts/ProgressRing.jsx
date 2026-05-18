export default function ProgressRing({ value, max, size = 80, strokeWidth = 6, color = 'var(--accent)', label, sublabel }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = max > 0 ? Math.min(value / max, 1) : 0
  const offset = circumference * (1 - progress)

  return (
    <div className="progress-ring-container" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="progress-ring-svg">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="var(--surface-2)" strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="progress-ring-inner">
        {label && <span className="progress-ring-label">{label}</span>}
        {sublabel && <span className="progress-ring-sublabel">{sublabel}</span>}
      </div>
    </div>
  )
}
