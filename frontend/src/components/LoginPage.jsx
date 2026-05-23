import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage({ onSwitch, onStackInfo }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-card glass">
        <div className="auth-header">
          <div className="auth-logo">
            <i className="fas fa-pen-fancy" />
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to your NotifAI account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="toast error"><i className="fas fa-exclamation-circle" /> {error}</div>}

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <i className="fas fa-envelope input-icon" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <i className="fas fa-lock input-icon" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <><div className="btn-spinner" /> Signing in...</> : 'Sign In'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <button className="link-btn" onClick={onSwitch}>Create one</button>
        </p>
        <p className="auth-stack-link">
          <button className="link-btn" onClick={onStackInfo}><i className="fas fa-layer-group" /> View Stack Info</button>
        </p>
      </div>
    </div>
  )
}
