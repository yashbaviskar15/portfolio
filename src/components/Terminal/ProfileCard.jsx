import './ProfileCard.css';

const renderStats = () => (
  <div className="tab-content">
    <div className="profile-container">
      {/* Left Section - Profile Info */}
      <div className="profile-left">
        <div className="profile-avatar">
          <img src="/profile.png" alt="Yash Baviskar" className="avatar-img" />
          <div className="avatar-glow"></div>
        </div>

        <div className="profile-info">
          <h1 className="profile-name">Yash</h1>
          <p className="profile-title">Cloud Engineer & DevOps</p>
          <p className="profile-subtitle">AWS • Kubernetes • DevOps</p>

          <div className="profile-meta">
            <div className="meta-item">
              <span className="meta-icon">📍</span>
              <span className="meta-text">India</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">⚡</span>
              <span className="meta-text">Available</span>
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
          <div className="stat-value">3+</div>
          <div className="stat-label">Years Exp</div>
        </div>
        <div className="quick-stat">
          <div className="stat-value">5+</div>
          <div className="stat-label">Certifications</div>
        </div>
      </div>
    </div>
  </div>
);

const renderScope = () => (
  <div className="tab-content">
    <div className="scope-section">
      <h3 className="section-title">What I'm Doing</h3>
      <div className="scope-grid">
        <div className="scope-item">
          <div className="scope-icon">🔒</div>
          <h4 className="scope-title">DevSecOps</h4>
          <p className="scope-desc">
            Designing CI/CD pipelines with security built in — vulnerability scanning for containers,
            secrets, and Kubernetes, WAF tuning, IAM governance, and compliance guardrails baked
            into the delivery process.
          </p>
        </div>
        <div className="scope-item">
          <div className="scope-icon">☁️</div>
          <h4 className="scope-title">Cloud Engineer</h4>
          <p className="scope-desc">
            Building secure, cost-efficient cloud environments on AWS and GCP — from Landing Zone
            setup and IAM governance to multi-cloud migration and Graviton optimization.
          </p>
        </div>
        <div className="scope-item">
          <div className="scope-icon">🛠️</div>
          <h4 className="scope-title">SRE</h4>
          <p className="scope-desc">
            Keeping systems reliably available through Kubernetes platform management, observability
            stacks, incident response, and eliminating toil with automation.
          </p>
        </div>
        <div className="scope-item">
          <div className="scope-icon">⚙️</div>
          <h4 className="scope-title">Infrastructure Automation</h4>
          <p className="scope-desc">
            Building the tooling that glues everything together — automation scripts in Bash, Go, and
            Python, Ansible playbooks, and internal services that eliminate repetitive ops work.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const renderStack = () => (
  <div className="tab-content">
    <div className="tech-stack-section">
      <h3 className="section-title">Tech Stack</h3>
      <div className="stack-grid">
        <div className="stack-category">
          <h4 className="stack-category-title">Cloud Platforms</h4>
          <div className="stack-badges">
            <span className="stack-badge">AWS</span>
            <span className="stack-badge">GCP</span>
            <span className="stack-badge">Azure</span>
          </div>
        </div>
        <div className="stack-category">
          <h4 className="stack-category-title">Container & Orchestration</h4>
          <div className="stack-badges">
            <span className="stack-badge">Kubernetes</span>
            <span className="stack-badge">Docker</span>
            <span className="stack-badge">Helm</span>
          </div>
        </div>
        <div className="stack-category">
          <h4 className="stack-category-title">IaC & Automation</h4>
          <div className="stack-badges">
            <span className="stack-badge">Terraform</span>
            <span className="stack-badge">Ansible</span>
            <span className="stack-badge">CloudFormation</span>
          </div>
        </div>
        <div className="stack-category">
          <h4 className="stack-category-title">CI/CD</h4>
          <div className="stack-badges">
            <span className="stack-badge">GitHub Actions</span>
            <span className="stack-badge">GitLab CI</span>
            <span className="stack-badge">Jenkins</span>
          </div>
        </div>
        <div className="stack-category">
          <h4 className="stack-category-title">Monitoring & Observability</h4>
          <div className="stack-badges">
            <span className="stack-badge">Prometheus</span>
            <span className="stack-badge">Grafana</span>
            <span className="stack-badge">ELK</span>
            <span className="stack-badge">CloudWatch</span>
          </div>
        </div>
        <div className="stack-category">
          <h4 className="stack-category-title">Programming & Scripting</h4>
          <div className="stack-badges">
            <span className="stack-badge">Python</span>
            <span className="stack-badge">Bash</span>
            <span className="stack-badge">Go</span>
            <span className="stack-badge">JavaScript</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const renderClient = () => (
  <div className="tab-content">
    <div className="client-section">
      <h3 className="section-title">Clients</h3>
      <div className="client-grid">
        <div className="client-card">
          <div className="client-logo">🏢</div>
          <div className="client-name">TechCorp</div>
        </div>
        <div className="client-card">
          <div className="client-logo">☁️</div>
          <div className="client-name">CloudBase</div>
        </div>
        <div className="client-card">
          <div className="client-logo">🚀</div>
          <div className="client-name">DevOps Inc</div>
        </div>
        <div className="client-card">
          <div className="client-logo">🌐</div>
          <div className="client-name">WebScale</div>
        </div>
      </div>
    </div>
  </div>
);

export default function ProfileCard({ activeTab }) {
  return (
    <div className="profile-card">
      {activeTab === 'stats' && renderStats()}
      {activeTab === 'scope' && renderScope()}
      {activeTab === 'stack' && renderStack()}
      {activeTab === 'client' && renderClient()}
    </div>
  );
}
