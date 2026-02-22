import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { TrendingUp, LogOut, Menu, X, User } from 'lucide-react'
import toast from 'react-hot-toast'

const Navbar = () => {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <TrendingUp size={24} color="#6366f1" />
          <span style={styles.logoText}>SpendSmart</span>
        </div>

        <div style={styles.right}>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>
              <User size={16} color="#6366f1" />
            </div>
            <span style={styles.userName}>{user?.name}</span>
          </div>

          <button onClick={handleLogout} style={styles.logoutBtn}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={styles.menuBtn}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={styles.mobileMenu}>
          <div style={styles.mobileUser}>
            <User size={16} color="#6366f1" />
            <span>{user?.name}</span>
          </div>
          <button onClick={handleLogout} style={styles.mobileLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  )
}

const styles = {
  nav: {
    background: '#1e293b',
    borderBottom: '1px solid #334155',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#f1f5f9',
    letterSpacing: '-0.5px',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    background: '#0f172a',
    borderRadius: '8px',
    border: '1px solid #334155',
  },
  avatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: '#1e1b4b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#f1f5f9',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    background: 'transparent',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#94a3b8',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  menuBtn: {
    display: 'none',
    background: 'transparent',
    border: 'none',
    color: '#94a3b8',
    padding: '4px',
  },
  mobileMenu: {
    display: 'none',
    padding: '16px 24px',
    borderTop: '1px solid #334155',
    flexDirection: 'column',
    gap: '12px',
  },
  mobileUser: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#f1f5f9',
    fontSize: '14px',
  },
  mobileLogout: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'transparent',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#94a3b8',
    padding: '10px 16px',
    fontSize: '14px',
  },
}

export default Navbar