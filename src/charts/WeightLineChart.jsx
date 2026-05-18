import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { format, parseISO } from 'date-fns'

export default function WeightLineChart({ data, targetWeight }) {
  const chartData = data
    .filter(d => d.weight && d.weight > 0)
    .map(d => ({
      date: d.date,
      label: format(parseISO(d.date), 'MMM d'),
      weight: d.weight,
    }))

  if (chartData.length === 0) {
    return (
      <div className="chart-empty">
        <p>Log your weight to see the trend</p>
      </div>
    )
  }

  return (
    <div className="chart-container">
      <h3 className="chart-title">Weight Trend</h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-2)" />
          <XAxis dataKey="label" stroke="var(--text-muted)" fontSize={11} />
          <YAxis
            stroke="var(--text-muted)"
            fontSize={11}
            domain={[targetWeight - 2, 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--surface-1)',
              border: '1px solid var(--surface-2)',
              borderRadius: '8px',
              color: 'var(--text)',
            }}
            formatter={(val) => [`${val} kg`, 'Weight']}
          />
          <ReferenceLine
            y={targetWeight}
            stroke="var(--success)"
            strokeDasharray="5 5"
            label={{ value: `Goal: ${targetWeight}kg`, fill: 'var(--success)', fontSize: 11 }}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#4ade80"
            strokeWidth={2}
            dot={{ fill: '#4ade80', r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
