import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function CompletionPie({ completed, total, label }) {
  const missed = total - completed
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0

  const data = [
    { name: 'Completed', value: completed },
    { name: 'Missed', value: missed },
  ]

  const COLORS = ['var(--success)', 'var(--surface-2)']

  return (
    <div className="pie-container">
      <ResponsiveContainer width="100%" height={140}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={35}
            outerRadius={55}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--surface-1)',
              border: '1px solid var(--surface-2)',
              borderRadius: '8px',
              color: 'var(--text)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pie-label">
        <span className="pie-percent">{percent}%</span>
        <span className="pie-name">{label}</span>
      </div>
    </div>
  )
}
