import { useAuth } from './context/AuthContext'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import NotesPage from './components/NotesPage'
import StackInfo from './components/StackInfo'
import { useState } from 'react'
import './App.css'

export default function App() {
  const { user, loading } = useAuth()
  const [showRegister, setShowRegister] = useState(false)
  const [showStack, setShowStack] = useState(false)

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner" />
        <p>Loading NotifAI...</p>
      </div>
    )
  }

  if (!user && showStack) {
    return (
      <div className="auth-page">
        <div className="auth-bg" />
        <div className="stack-info-public">
          <StackInfo onBack={() => setShowStack(false)} />
        </div>
      </div>
    )
  }

  if (!user) {
    return showRegister ? (
      <RegisterPage onSwitch={() => setShowRegister(false)} onStackInfo={() => setShowStack(true)} />
    ) : (
      <LoginPage onSwitch={() => setShowRegister(true)} onStackInfo={() => setShowStack(true)} />
    )
  }

  return <NotesPage />
}
