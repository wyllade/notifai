import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import NoteCard from './NoteCard'
import StackInfo from './StackInfo'

const API = '/api'

export default function NotesPage() {
  const { user, logout, authFetch } = useAuth()
  const [view, setView] = useState('notes')
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formTitle, setFormTitle] = useState('')
  const [formContent, setFormContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchNotes = useCallback(async () => {
    try {
      const res = await authFetch(`${API}/notes`)
      const data = await res.json()
      setNotes(data)
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }, [authFetch])

  useEffect(() => { fetchNotes() }, [fetchNotes])

  const openCreate = () => {
    setEditing(null)
    setFormTitle('')
    setFormContent('')
    setShowModal(true)
  }

  const openEdit = (note) => {
    setEditing(note)
    setFormTitle(note.title)
    setFormContent(note.content)
    setShowModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing) {
        const res = await authFetch(`${API}/notes/${editing.id}`, {
          method: 'PUT',
          body: JSON.stringify({ title: formTitle, content: formContent })
        })
        const updated = await res.json()
        setNotes(notes.map(n => n.id === updated.id ? updated : n))
        showToast('Note updated!')
      } else {
        const res = await authFetch(`${API}/notes`, {
          method: 'POST',
          body: JSON.stringify({ title: formTitle, content: formContent })
        })
        const created = await res.json()
        setNotes([created, ...notes])
        showToast('Note created!')
      }
      setShowModal(false)
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (note) => {
    if (!confirm('Delete this note forever?')) return
    try {
      await authFetch(`${API}/notes/${note.id}`, { method: 'DELETE' })
      setNotes(notes.filter(n => n.id !== note.id))
      showToast('Note deleted')
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner" />
        <p>Loading your notes...</p>
      </div>
    )
  }

  return (
    <div className="dashboard">
      {toast && (
        <div className={`toast ${toast.type}`}>
          <i className={`fas fa-${toast.type === 'success' ? 'check-circle' : 'exclamation-circle'}`} />
          {toast.message}
        </div>
      )}

      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <i className="fas fa-pen-fancy" />
            <span>NotifAI</span>
          </div>
        </div>

        <div className="sidebar-user">
          <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-email">{user.email}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className={`nav-item ${view === 'notes' ? 'active' : ''}`} onClick={() => setView('notes')}>
            <i className="fas fa-note-sticky" />
            <span>My Notes</span>
            <span className="badge">{notes.length}</span>
          </div>
          <div className={`nav-item ${view === 'stack' ? 'active' : ''}`} onClick={() => setView('stack')}>
            <i className="fas fa-layer-group" />
            <span>Stack Info</span>
          </div>
        </nav>

        <button className="btn btn-logout" onClick={logout}>
          <i className="fas fa-right-from-bracket" />
          Sign Out
        </button>
      </aside>

      <main className="main-content">
        {view === 'notes' ? (
          <>
            <header className="content-header">
              <div>
                <h2>My Notes</h2>
                <p>{notes.length} note{notes.length !== 1 ? 's' : ''}</p>
              </div>
              <button className="btn btn-primary" onClick={openCreate}>
                <i className="fas fa-plus" /> New Note
              </button>
            </header>

            {notes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon"><i className="fas fa-pen" /></div>
                <h3>No notes yet</h3>
                <p>Create your first note to get started</p>
                <button className="btn btn-primary" onClick={openCreate}>
                  <i className="fas fa-plus" /> Create Note
                </button>
              </div>
            ) : (
              <div className="notes-grid">
                {notes.map(note => (
                  <NoteCard key={note.id} note={note} onEdit={openEdit} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </>
        ) : (
          <StackInfo />
        )}
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal glass" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? 'Edit Note' : 'New Note'}</h3>
              <button className="btn-icon close" onClick={() => setShowModal(false)}>
                <i className="fas fa-xmark" />
              </button>
            </div>
            <form onSubmit={handleSave} className="modal-form">
              <div className="input-group">
                <label htmlFor="noteTitle">Title</label>
                <input
                  id="noteTitle"
                  type="text"
                  placeholder="Note title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="noteContent">Content</label>
                <textarea
                  id="noteContent"
                  placeholder="Write something amazing..."
                  rows={8}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? <><div className="btn-spinner" /> Saving...</> : editing ? 'Update Note' : 'Create Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
