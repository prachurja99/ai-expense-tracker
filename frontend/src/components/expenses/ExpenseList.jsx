import { Pencil, Trash2, Calendar, Tag } from 'lucide-react'

const CATEGORY_COLORS = {
  Food: '#22c55e',
  Transport: '#22d3ee',
  Shopping: '#a855f7',
  Health: '#ef4444',
  Entertainment: '#f59e0b',
  Education: '#6366f1',
  Bills: '#ec4899',
  Other: '#94a3b8',
}

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyText}>No expenses yet. Add your first one!</p>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Recent Expenses</h3>
      <div style={styles.list}>
        {expenses.map((expense) => (
          <div key={expense._id} style={styles.card}>
            <div style={styles.left}>
              <div style={{
                ...styles.categoryDot,
                background: CATEGORY_COLORS[expense.category] || '#94a3b8',
              }} />
              <div>
                <p style={styles.expenseTitle}>{expense.title}</p>
                <div style={styles.meta}>
                  <span style={styles.metaItem}>
                    <Tag size={11} />
                    {expense.category}
                  </span>
                  <span style={styles.metaItem}>
                    <Calendar size={11} />
                    {new Date(expense.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  {expense.note && (
                    <span style={styles.note}>{expense.note}</span>
                  )}
                </div>
              </div>
            </div>

            <div style={styles.right}>
              <span style={styles.amount}>৳ {expense.amount.toFixed(2)}</span>
              <div style={styles.actions}>
                <button
                  onClick={() => onEdit(expense)}
                  style={styles.editBtn}
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => onDelete(expense._id)}
                  style={styles.deleteBtn}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    background: '#1e293b',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #334155',
  },
  title: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: '16px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 16px',
    background: '#0f172a',
    borderRadius: '10px',
    border: '1px solid #334155',
    transition: 'border-color 0.2s',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  categoryDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  expenseTitle: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#f1f5f9',
    marginBottom: '4px',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#94a3b8',
  },
  note: {
    fontSize: '12px',
    color: '#64748b',
    fontStyle: 'italic',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  amount: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#f1f5f9',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  editBtn: {
    padding: '7px',
    background: '#1e1b4b',
    border: '1px solid #6366f1',
    borderRadius: '6px',
    color: '#6366f1',
    display: 'flex',
    alignItems: 'center',
  },
  deleteBtn: {
    padding: '7px',
    background: '#2a0f0f',
    border: '1px solid #ef4444',
    borderRadius: '6px',
    color: '#ef4444',
    display: 'flex',
    alignItems: 'center',
  },
  empty: {
    background: '#1e293b',
    borderRadius: '12px',
    padding: '40px',
    border: '1px solid #334155',
    textAlign: 'center',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: '14px',
  },
}

export default ExpenseList