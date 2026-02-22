import { DollarSign, TrendingUp, ShoppingBag, Activity } from 'lucide-react'

const SummaryCards = ({ summary }) => {
  const categories = Object.entries(summary.byCategory || {})
  const topCategory = categories.sort((a, b) => b[1] - a[1])[0]

  const cards = [
    {
      title: 'Total Spent',
      value: `৳ ${summary.total?.toFixed(2) || '0.00'}`,
      icon: <DollarSign size={20} color="#6366f1" />,
      bg: '#1e1b4b',
      border: '#6366f1',
    },
    {
      title: 'Total Expenses',
      value: summary.count || 0,
      icon: <Activity size={20} color="#22d3ee" />,
      bg: '#0c2a3a',
      border: '#22d3ee',
    },
    {
      title: 'Top Category',
      value: topCategory ? topCategory[0] : 'N/A',
      icon: <TrendingUp size={20} color="#22c55e" />,
      bg: '#0a2a1a',
      border: '#22c55e',
    },
    {
      title: 'Avg per Expense',
      value: summary.count
        ? `৳ ${(summary.total / summary.count).toFixed(2)}`
        : '৳ 0.00',
      icon: <ShoppingBag size={20} color="#f59e0b" />,
      bg: '#2a1f0a',
      border: '#f59e0b',
    },
  ]

  return (
    <div style={styles.grid}>
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            ...styles.card,
            background: card.bg,
            borderColor: card.border,
          }}
        >
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>{card.title}</span>
            <div style={{
              ...styles.iconBox,
              background: card.bg,
              border: `1px solid ${card.border}`,
            }}>
              {card.icon}
            </div>
          </div>
          <div style={styles.cardValue}>{card.value}</div>
        </div>
      ))}
    </div>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },
  card: {
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid',
    transition: 'transform 0.2s',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  cardTitle: {
    fontSize: '13px',
    color: '#94a3b8',
    fontWeight: '500',
  },
  iconBox: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#f1f5f9',
  },
}

export default SummaryCards