import './SidebarNav.css';

const NAV_ITEMS = [
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'skills', label: 'Skills', icon: '⚙️' },
  { id: 'experience', label: 'Experience', icon: '📊' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'certifications', label: 'Certs', icon: '🏆' },
  { id: 'contact', label: 'Contact', icon: '📧' },
];

export default function SidebarNav({ activeSection, onSectionChange }) {
  return (
    <div className="sidebar-nav">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-text">YASH</span>
          <span className="logo-status">●</span>
        </div>
        <p className="sidebar-subtitle">Cloud Engineer</p>
      </div>

      {/* Navigation Items */}
      <nav className="nav-menu">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSectionChange(item.id)}
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {activeSection === item.id && <span className="nav-indicator"></span>}
          </button>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="footer-stat">
          <span className="stat-label">Status</span>
          <span className="stat-value online">● Online</span>
        </div>
        <div className="footer-stat">
          <span className="stat-label">Version</span>
          <span className="stat-value">v2.0</span>
        </div>
      </div>
    </div>
  );
}
