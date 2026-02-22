import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'

const TrendChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div style={styles.empty}>
        <p>No trend data available yet.</p>
      </div>
    )
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Monthly Spending Trend</h3>
      <p style={styles.subtitle}>Last 6 months overview</p>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={{ stroke: '#334155' }}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={{ stroke: '#334155' }}
          />
          <Tooltip
            contentStyle={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f1f5f9',
            }}
            formatter={(value) => [`৳ ${value}`, 'Total Spent']}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#colorTotal)"
            dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#22d3ee' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

const styles = {
  card: {
    background: '#1e293b',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #334155',
    marginBottom: '24px',
  },
  cardTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '12px',
    color: '#94a3b8',
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

export default TrendChart