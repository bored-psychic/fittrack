import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { format, parseISO } from 'date-fns'

export default function HabitLineChart({ data, dataKey, title, color, unit, target, lowerIsBetter }) {
  const chartData = data
    .filter(d => d[dataKey] !== undefined && d[dataKey] !== null && d[dataKey] > 0)
    .map(d => ({
      date: d.date,
      label: format(parseISO(d.date), 'MMM d'),
      value: d[dataKey],
    }))

  if (chartData.length === 0) {
    return (
      <div className="chart-empty">
        <p>No {title.toLowerCase()} data yet</p>
      </div>
    )
  }

  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-2)" />
          <XAxis dataKey="label" stroke="var(--text-muted)" fontSize={11} />
          <YAxis stroke="var(--text-muted)" fontSize={11} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--surface-1)',
              border: '1px solid var(--surface-2)',
              borderRadius: '8px',
              color: 'var(--text)',
            }}
            formatter={(val) => [`${val}${unit ? ` ${unit}` : ''}`, title]}
          />
          {target && (
            <ReferenceLine
              y={target}
              stroke={lowerIsBetter ? 'var(--danger)' : 'var(--success)'}
              strokeDasharray="5 5"
              label={{
                value: `Target: ${target}${unit ? ` ${unit}` : ''}`,
                fill: lowerIsBetter ? 'var(--danger)' : 'var(--success)',
                fontSize: 11,
              }}
            />
          )}
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 2 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
