import { useState } from 'react'

export default function NoteCard({ note, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false)

  const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const preview = note.content.length > 120 ? note.content.slice(0, 120) + '...' : note.content

  return (
    <div className={`note-card glass ${expanded ? 'expanded' : ''}`} onClick={() => setExpanded(!expanded)}>
      <div className="note-card-header">
        <h3 className="note-title">{note.title}</h3>
        <span className="note-date">{formatDate(note.updated_at)}</span>
      </div>
      <p className="note-content">{expanded ? note.content : preview}</p>
      <div className="note-card-actions" onClick={(e) => e.stopPropagation()}>
        <button className="btn-icon edit" onClick={() => onEdit(note)} title="Edit note">
          <i className="fas fa-pencil" />
        </button>
        <button className="btn-icon delete" onClick={() => onDelete(note)} title="Delete note">
          <i className="fas fa-trash-can" />
        </button>
      </div>
    </div>
  )
}
