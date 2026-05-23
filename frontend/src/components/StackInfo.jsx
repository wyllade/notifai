export default function StackInfo({ onBack }) {
  const routes = [
    { method: 'GET', path: '/api/notes', desc: 'List all user notes' },
    { method: 'POST', path: '/api/notes', desc: 'Create a new note' },
    { method: 'PUT', path: '/api/notes/:id', desc: 'Update a note' },
    { method: 'DELETE', path: '/api/notes/:id', desc: 'Delete a note' },
  ]

  const stacks = [
    { icon: 'fa-bolt', name: 'React', desc: 'UI library for building interactive components', label: 'Frontend' },
    { icon: 'fa-bolt', name: 'Vite', desc: 'Fast build tool and dev server', label: 'Frontend' },
    { icon: 'fa-paint-brush', name: 'Tailwind CSS', desc: 'Utility-first CSS framework', label: 'Frontend' },
    { icon: 'fa-flask', name: 'Flask', desc: 'Lightweight Python web framework', label: 'Backend' },
    { icon: 'fa-database', name: 'SQLite', desc: 'Zero-config relational database', label: 'Database' },
  ]

  const features = [
    { icon: 'fa-user-lock', title: 'User Login / Signup', tier: 'intermediate' },
    { icon: 'fa-tags', title: 'Categories', tier: 'intermediate' },
    { icon: 'fa-search', title: 'Search Notes', tier: 'intermediate' },
    { icon: 'fa-moon', title: 'Dark Mode', tier: 'intermediate' },
    { icon: 'fa-thumbtack', title: 'Pin Notes', tier: 'intermediate' },
    { icon: 'fa-markdown', title: 'Markdown Support', tier: 'intermediate' },
    { icon: 'fa-robot', title: 'AI Summaries', tier: 'advanced' },
    { icon: 'fa-microphone', title: 'Voice Notes', tier: 'advanced' },
    { icon: 'fa-sync', title: 'Realtime Syncing', tier: 'advanced' },
    { icon: 'fa-users', title: 'Collaboration', tier: 'advanced' },
    { icon: 'fa-image', title: 'File / Image Uploads', tier: 'advanced' },
  ]

  return (
    <div className="stack-info">
      {onBack && (
        <button className="btn btn-secondary stack-back-btn" onClick={onBack}>
          <i className="fas fa-arrow-left" /> Back to Sign In
        </button>
      )}

      {/* Header Section */}
      <div className="stack-header">
        <h2>Recommended Stack</h2>
        <p>Built with a modern, scalable architecture</p>
      </div>

      <div className="stack-body">
        {/* Sidebar - Tech Stack */}
        <div className="stack-sidebar">
          <h3 className="stack-section-title">
            <i className="fas fa-layer-group" /> Tech Stack
          </h3>
          <div className="stack-cards">
            {stacks.map((s, i) => (
              <div key={i} className="stack-card glass">
                <div className="stack-card-icon">
                  <i className={`fas ${s.icon}`} />
                </div>
                <div className="stack-card-content">
                  <div className="stack-card-label">{s.label}</div>
                  <h4>{s.name}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="stack-main">
          {/* API Routes */}
          <div className="stack-section">
            <h3 className="stack-section-title">
              <i className="fas fa-code" /> API Routes
            </h3>
            <div className="routes-table glass">
              {routes.map((r, i) => (
                <div key={i} className="route-row">
                  <span className={`route-method ${r.method.toLowerCase()}`}>{r.method}</span>
                  <code className="route-path">{r.path}</code>
                  <span className="route-desc">{r.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Auth Routes */}
          <div className="stack-section">
            <h3 className="stack-section-title">
              <i className="fas fa-shield-halved" /> Authentication
            </h3>
            <div className="routes-table glass">
              <div className="route-row">
                <span className="route-method post">POST</span>
                <code className="route-path">/api/register</code>
                <span className="route-desc">Create a new user account</span>
              </div>
              <div className="route-row">
                <span className="route-method post">POST</span>
                <code className="route-path">/api/login</code>
                <span className="route-desc">Authenticate and get JWT token</span>
              </div>
            </div>
          </div>

          {/* Future Features */}
          <div className="stack-section">
            <h3 className="stack-section-title">
              <i className="fas fa-rocket" /> Features You Can Add Later
            </h3>

            <div className="features-grid">
              <div className="features-col">
                <div className="features-header intermediate">
                  <i className="fas fa-chart-simple" /> Intermediate
                </div>
                {features.filter(f => f.tier === 'intermediate').map((f, i) => (
                  <div key={i} className="feature-item glass">
                    <i className={`fas ${f.icon}`} />
                    <span>{f.title}</span>
                  </div>
                ))}
              </div>

              <div className="features-col">
                <div className="features-header advanced">
                  <i className="fas fa-crown" /> Advanced
                </div>
                {features.filter(f => f.tier === 'advanced').map((f, i) => (
                  <div key={i} className="feature-item glass">
                    <i className={`fas ${f.icon}`} />
                    <span>{f.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Database Section */}
      <div className="stack-section stack-footer glass">
        <i className="fas fa-database" />
        <div>
          <strong>Database:</strong> SQLite — auto-created on first run in <code>backend/instance/database.db</code>
        </div>
      </div>
    </div>
  )
}
