import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const API = '/api'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('notifai_token')
    const savedUser = localStorage.getItem('notifai_user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const saveAuth = (token, user) => {
    localStorage.setItem('notifai_token', token)
    localStorage.setItem('notifai_user', JSON.stringify(user))
    setToken(token)
    setUser(user)
  }

  const login = async (email, password) => {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    saveAuth(data.token, data.user)
    return data
  }

  const register = async (name, email, password) => {
    const res = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    saveAuth(data.token, data.user)
    return data
  }

  const logout = () => {
    localStorage.removeItem('notifai_token')
    localStorage.removeItem('notifai_user')
    setToken(null)
    setUser(null)
  }

  const authFetch = async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if (res.status === 401) {
      logout()
      throw new Error('Session expired. Please log in again.')
    }
    return res
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
