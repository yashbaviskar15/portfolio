import './SidebarNav.css';

const NAV_ITEMS = [
  { id: 'journey', label: 'Journey', icon: 'bi bi-map' },
  { id: 'about', label: 'About', icon: 'bi bi-person' },
  { id: 'education', label: 'Education', icon: 'bi bi-mortarboard' },
  { id: 'resume', label: 'Resume', icon: 'bi bi-file-earmark-text' },
  { id: 'portfolio', label: 'Portfolio', icon: 'bi bi-briefcase' },
  { id: 'blog', label: 'Blog', icon: 'bi bi-book' },
  { id: 'contact', label: 'Contact', icon: 'bi bi-envelope' },
  { id: 'terminal', label: 'Terminal', icon: 'bi bi-terminal' },
  { id: 'infrastructure', label: 'Infrastructure', icon: 'bi bi-server' },
];

export default function SidebarNav({ activeSection, onSectionChange, theme, toggleTheme }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="color-squares">
          <div className="color-square blue"></div>
          <div className="color-square green"></div>
          <div className="color-square orange"></div>
          <div className="color-square pink"></div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item-sidebar ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSectionChange(item.id)}
            title={item.label}
          >
            <i className={item.icon}></i>
            <span className="nav-label-sidebar">{item.label}</span>
            {activeSection === item.id && <span className="nav-dot"></span>}
          </button>
        ))}
      </nav>

      <div className="decorative-dots">
        <div className="dot-row">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="dot"></span>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="search-bar">
          <i className="bi bi-search"></i>
          <span className="search-text">SEARCH</span>
          <span className="search-shortcut">CTRL+K</span>
        </div>

        <div className="language-switcher">
          <button className="lang-btn active">EN</button>
          <button className="lang-btn">ID</button>
        </div>

        <button className="theme-toggle-sidebar" onClick={toggleTheme}>
          <i className={theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon'}></i>
          <span className="theme-text">{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
        </button>
      </div>
    </div>
  );
}
