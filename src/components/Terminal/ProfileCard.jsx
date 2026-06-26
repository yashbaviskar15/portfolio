import './ProfileCard.css';

export default function ProfileCard() {
  return (
    <div className="profile-card">
      <div className="profile-container">
        {/* Left Section - Profile Info */}
        <div className="profile-left">
          <div className="profile-avatar">
            <img src="/profile.png" alt="Yash Baviskar" className="avatar-img" />
            <div className="avatar-glow"></div>
          </div>

          <div className="profile-info">
            <h1 className="profile-name">Yash</h1>
            <p className="profile-title">Cloud Engineer</p>
            <p className="profile-subtitle">AWS • Kubernetes • DevOps</p>

            <div className="profile-meta">
              <div className="meta-item">
                <span className="meta-icon">📍</span>
                <span className="meta-text">India</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">⚡</span>
                <span className="meta-text">Full-time Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Quick Stats */}
        <div className="profile-right">
          <div className="quick-stat">
            <div className="stat-value">15+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="quick-stat">
            <div className="stat-value">5+</div>
            <div className="stat-label">Years Exp</div>
          </div>
          <div className="quick-stat">
            <div className="stat-value">10+</div>
            <div className="stat-label">Certifications</div>
          </div>
        </div>
      </div>

      {/* Profile Bio Section */}
      <div className="profile-bio">
        <h3 className="bio-title">About</h3>
        <p className="bio-text">
          Cloud Engineer with expertise in designing, implementing, and managing scalable cloud infrastructure. 
          Specialized in AWS, Kubernetes, CI/CD pipelines, and DevOps practices. 
          Passionate about automation, infrastructure-as-code, and building resilient systems.
        </p>
      </div>

      {/* Tech Stack Section */}
      <div className="tech-stack">
        <h3 className="stack-title">Core Technologies</h3>
        <div className="stack-items">
          <span className="stack-badge">AWS</span>
          <span className="stack-badge">Kubernetes</span>
          <span className="stack-badge">Docker</span>
          <span className="stack-badge">Terraform</span>
          <span className="stack-badge">CI/CD</span>
          <span className="stack-badge">Python</span>
          <span className="stack-badge">Linux</span>
          <span className="stack-badge">Monitoring</span>
        </div>
      </div>

      {/* Social Links */}
      <div className="social-links">
        <a href="#github" className="social-link" title="GitHub">
          <span className="social-icon">⚙️</span>
        </a>
        <a href="#linkedin" className="social-link" title="LinkedIn">
          <span className="social-icon">🔗</span>
        </a>
        <a href="#twitter" className="social-link" title="Twitter">
          <span className="social-icon">🐦</span>
        </a>
        <a href="#email" className="social-link" title="Email">
          <span className="social-icon">💌</span>
        </a>
      </div>
    </div>
  );
}
