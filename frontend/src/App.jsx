import { useAuth } from './context/AuthContext'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import NotesPage from './components/NotesPage'
import { useState } from 'react'
import './App.css'

export default function App() {
  const { user, loading } = useAuth()
  const [showRegister, setShowRegister] = useState(false)

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner" />
        <p>Loading NotifAI...</p>
      </div>
    )
  }

  if (!user) {
    return showRegister ? (
      <RegisterPage onSwitch={() => setShowRegister(false)} />
    ) : (
      <LoginPage onSwitch={() => setShowRegister(true)} />
    )
  }

  return <NotesPage />
}
