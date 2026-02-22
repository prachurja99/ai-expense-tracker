import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis,
  ResponsiveContainer, Legend
} from 'recharts'

const COLORS = ['#6366f1', '#22d3ee', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#ec4899', '#14b8a6']

const SpendingChart = ({ summary }) => {
  const data = Object.entries(summary.byCategory || {}).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2)),
  }))

  if (data.length === 0) {
    return (
      <div style={styles.empty}>
        <p>No expense data yet. Add some expenses to see charts!</p>
      </div>
    )
  }

  return (
    <div style={styles.grid}>
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Spending by Category</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f1f5f9',
              }}
              formatter={(value) => [`৳ ${value}`, 'Amount']}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Category Breakdown</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={{ stroke: '#334155' }}
            />
            <Tooltip
              contentStyle={{
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f1f5f9',
              }}
              formatter={(value) => [`৳ ${value}`, 'Amount']}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },
  card: {
    background: '#1e293b',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #334155',
  },
  cardTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: '16px',
  },
  empty: {
    background: '#1e293b',
    borderRadius: '12px',
    padding: '40px',
    border: '1px solid #334155',
    textAlign: 'center',
    color: '#94a3b8',
    marginBottom: '24px',
  },
}

export default SpendingChart