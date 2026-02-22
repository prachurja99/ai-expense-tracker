import { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import ExpenseForm from '../components/expenses/ExpenseForm'
import ExpenseList from '../components/expenses/ExpenseList'
import SummaryCards from '../components/charts/SummaryCards'
import SpendingChart from '../components/charts/SpendingChart'
import api from '../utils/api'
import toast from 'react-hot-toast'
import { Plus, X } from 'lucide-react'

const Dashboard = () => {
  const [expenses, setExpenses] = useState([])
  const [summary, setSummary] = useState({ total: 0, byCategory: {}, count: 0 })
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)

  const fetchExpenses = async () => {
    try {
      const { data } = await api.get('/expenses')
      setExpenses(data)
    } catch (error) {
      toast.error('Failed to fetch expenses')
    }
  }

  const fetchSummary = async () => {
    try {
      const { data } = await api.get('/expenses/summary')
      setSummary(data)
    } catch (error) {
      toast.error('Failed to fetch summary')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
    fetchSummary()
  }, [])

  const handleExpenseAdded = () => {
    fetchExpenses()
    fetchSummary()
    setShowForm(false)
    setEditingExpense(null)
  }

  const handleEdit = (expense) => {
    setEditingExpense(expense)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`)
      toast.success('Expense deleted')
      fetchExpenses()
      fetchSummary()
    } catch (error) {
      toast.error('Failed to delete expense')
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingExpense(null)
  }

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Dashboard</h1>
            <p style={styles.subtitle}>Track and manage your expenses</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={styles.addBtn}
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? 'Cancel' : 'Add Expense'}
          </button>
        </div>

        {loading ? (
          <div style={styles.loading}>Loading your data...</div>
        ) : (
          <>
            <SummaryCards summary={summary} />

            {showForm && (
              <div style={styles.formWrapper}>
                <ExpenseForm
                  onSuccess={handleExpenseAdded}
                  editingExpense={editingExpense}
                  onClose={handleCloseForm}
                />
              </div>
            )}

            <SpendingChart summary={summary} />

            <ExpenseList
              expenses={expenses}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0f172a',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: '4px',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '14px',
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(99,102,241,0.3)',
  },
  formWrapper: {
    marginBottom: '24px',
  },
  loading: {
    textAlign: 'center',
    color: '#94a3b8',
    padding: '60px',
    fontSize: '16px',
  },
}

export default Dashboard