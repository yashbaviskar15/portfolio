import { useState } from 'react';
import SidebarNav from './SidebarNav';
import './TerminalLayout.css';

export default function TerminalLayout({ theme, toggleTheme }) {
  const [activeSection, setActiveSection] = useState('about');
  const [activeTab, setActiveTab] = useState('stats');

  const tabs = ['stats', 'scope', 'stack', 'client'];
  const socialLinks = [
    { icon: 'bi bi-envelope', label: 'Email' },
    { icon: 'bi bi-twitter-x', label: '' },
    { icon: 'bi bi-instagram', label: '' },
    { icon: 'bi bi-linkedin', label: '' },
    { icon: 'bi bi-github', label: '' },
    { icon: 'bi bi-wrench', label: '' },
  ];

  return (
    <div className="portfolio-container" data-theme={theme}>
      <div className="decorative-shape">
        <svg viewBox="0 0 500 500" className="shape-svg">
          <polygon points="0,100 100,0 200,100 100,200" fill="#ef4444" />
          <polygon points="100,0 200,100 300,0 200,-100" fill="#f97316" />
          <polygon points="200,100 300,200 200,300 100,200" fill="#06b6d4" />
          <polygon points="300,0 400,100 300,200 200,100" fill="#f59e0b" />
          <polygon points="400,100 500,200 400,300 300,200" fill="#14b8a6" />
          <polygon points="300,200 400,300 300,400 200,300" fill="#0ea5e9" />
          <polygon points="0,300 100,200 200,300 100,400" fill="#06b6d4" />
          <polygon points="150,400 200,350 250,400 200,450" fill="#0ea5e9" />
        </svg>
      </div>

      <div className="main-layout">
        <SidebarNav 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <div className="content-area">
          <div className="header-card">
            <div className="window-controls">
              <span className="window-dot red"></span>
              <span className="window-dot yellow"></span>
              <span className="window-dot green"></span>
            </div>
            <div className="header-content">
              <div className="header-left">
                <div className="profile-avatar-container">
                  <img src="/profile.jpg" alt="Yash Baviskar" className="header-avatar" />
                  <div className="avatar-glow"></div>
                </div>
                <div className="profile-info-header">
                  <h1 className="profile-name-header">Yash <span className="highlight">Baviskar</span></h1>
                  <p className="profile-role-header">Cloud Engineer & DevOps</p>
                  <span className="profile-badge">operator/01</span>
                </div>
              </div>

              <div className="header-center">
                <div className="system-status">
                  <div className="status-label">SYSTEM STATUS</div>
                  <div className="status-item">
                    <span className="status-key">status:</span>
                    <span className="status-indicator"></span>
                    <span className="status-value">available</span>
                  </div>
                  <div className="status-item">
                    <span className="status-key">tz:</span>
                    <span className="status-value">IST</span>
                  </div>
                  <div className="status-item">
                    <span className="status-key">response:</span>
                    <span className="status-value">&lt;24h</span>
                  </div>
                </div>
              </div>

              <div className="header-right">
                <div className="header-top-label">operator console</div>
                <button className="download-cv-btn">
                  <i className="bi bi-download"></i>
                  <span>Download CV</span>
                </button>
                <div className="social-links-header">
                  {socialLinks.map((link, i) => (
                    <a key={i} href="#" className="social-link-header">
                      <i className={link.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="content-card">
            <div className="section-title-container">
              <h2 className="section-title-main">
                {activeSection === 'about' && 'About Me'}
                {activeSection === 'journey' && 'My Journey'}
                {activeSection === 'education' && 'Education'}
                {activeSection === 'resume' && 'Resume'}
                {activeSection === 'portfolio' && 'Portfolio'}
                {activeSection === 'blog' && 'Blog'}
                {activeSection === 'contact' && 'Get In Touch'}
                {activeSection === 'terminal' && 'Terminal'}
                {activeSection === 'infrastructure' && 'Infrastructure'}
                <span className="title-accent">.</span>
              </h2>
              <div className="title-underline"></div>
            </div>

            {activeSection === 'about' && (
              <div className="tabs-container">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
            )}

            <div className="tab-content-area">
              {activeSection === 'about' && activeTab === 'stats' && (
                <div className="about-intro-full">
                  <p className="intro-greeting-text">
                    <i className="bi bi-diamond"></i> Senior Cloud Engineer & DevOps • India • 5+ yrs at scale
                  </p>
                  <p className="intro-text-full">
                    Passionate <strong>Cloud Engineer</strong> and <strong>DevOps Specialist</strong> 
                    with a deep love for building scalable, reliable, and secure cloud infrastructure. 
                    I specialize in <strong>AWS & Kubernetes</strong>, infrastructure as code with 
                    <strong>Terraform & Ansible</strong>, and modern CI/CD pipelines that help teams 
                    ship faster without compromising quality.
                  </p>
                  <p className="intro-text-full">
                    With hands-on experience in multi-cloud architectures, observability stacks 
                    and cost optimization, I transform complex systems into manageable, automated platforms.
                  </p>
                </div>
              )}

              {activeSection === 'about' && activeTab === 'scope' && (
                <div className="scope-content">
                  <h3 className="subsection-title">What I'm Doing</h3>
                  <div className="scope-grid-full">
                    <div className="scope-item">
                      <div className="scope-icon">
                        <i className="bi bi-shield-lock"></i>
                      </div>
                      <div className="scope-label">SECURITY</div>
                      <h4 className="scope-title">DevSecOps</h4>
                      <p className="scope-description">
                        Designing CI/CD pipelines with security built in — vulnerability scanning for containers,
                        secrets, and Kubernetes, WAF tuning, IAM governance, and compliance guardrails baked
                        into the delivery process.
                      </p>
                    </div>
                    <div className="scope-item">
                      <div className="scope-icon">
                        <i className="bi bi-cloud"></i>
                      </div>
                      <div className="scope-label">CLOUD</div>
                      <h4 className="scope-title">Cloud Engineer</h4>
                      <p className="scope-description">
                        Building secure, cost-efficient cloud environments on AWS and GCP — from Landing Zone
                        setup and IAM governance to multi-cloud migration and Graviton optimization.
                      </p>
                    </div>
                    <div className="scope-item">
                      <div className="scope-icon">
                        <i className="bi bi-gear-wide-connected"></i>
                      </div>
                      <div className="scope-label">RELIABILITY</div>
                      <h4 className="scope-title">SRE</h4>
                      <p className="scope-description">
                        Keeping systems reliably available through Kubernetes platform management, observability
                        stacks, incident response, and eliminating toil with automation.
                      </p>
                    </div>
                    <div className="scope-item">
                      <div className="scope-icon">
                        <i className="bi bi-wrench"></i>
                      </div>
                      <div className="scope-label">AUTOMATION</div>
                      <h4 className="scope-title">Infrastructure Automation</h4>
                      <p className="scope-description">
                        Building the tooling that glues everything together — automation scripts in Bash, Go, and
                        Python, Ansible playbooks, and internal services that eliminate repetitive ops work.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'about' && activeTab === 'stack' && (
                <div className="stack-content">
                  <h3 className="subsection-title">Tech Stack</h3>
                  <div className="tech-stack-list">
                    <div className="tech-category">
                      <span className="tech-label">Cloud</span>
                      <span className="tech-items">AWS • GCP • Azure</span>
                    </div>
                    <div className="tech-category">
                      <span className="tech-label">Platform</span>
                      <span className="tech-items">Kubernetes • Docker • Helm • Terraform • Ansible</span>
                    </div>
                    <div className="tech-category">
                      <span className="tech-label">CI/CD</span>
                      <span className="tech-items">GitHub Actions • GitLab CI • Jenkins • ArgoCD</span>
                    </div>
                    <div className="tech-category">
                      <span className="tech-label">Observability</span>
                      <span className="tech-items">Prometheus • Grafana • Loki • ELK • Thanos</span>
                    </div>
                    <div className="tech-category">
                      <span className="tech-label">Data</span>
                      <span className="tech-items">MongoDB • PostgreSQL • Redis</span>
                    </div>
                    <div className="tech-category">
                      <span className="tech-label">Languages</span>
                      <span className="tech-items">Python • Bash • Go • JavaScript</span>
                    </div>
                    <div className="tech-category">
                      <span className="tech-label">Edge</span>
                      <span className="tech-items">Kong Gateway • Nginx</span>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'about' && activeTab === 'client' && (
                <div className="client-content">
                  <h3 className="subsection-title">Clients</h3>
                  <div className="clients-grid">
                    <div className="client-logo-card">
                      <div className="client-logo-text">TechCorp</div>
                    </div>
                    <div className="client-logo-card">
                      <div className="client-logo-text">CloudBase</div>
                    </div>
                    <div className="client-logo-card">
                      <div className="client-logo-text">DevOps Inc</div>
                    </div>
                    <div className="client-logo-card">
                      <div className="client-logo-text">StartupX</div>
                    </div>
                    <div className="client-logo-card">
                      <div className="client-logo-text">ScaleUp</div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'journey' && (
                <div className="journey-content">
                  <h3 className="subsection-title">My Journey</h3>
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-year">2023 - Present</div>
                      <div className="timeline-content">
                        <h4>Senior Cloud Engineer & DevOps</h4>
                        <p>
                          Leading cloud infrastructure initiatives, designing multi-region Kubernetes clusters,
                          and implementing enterprise-grade observability and security practices.
                        </p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-year">2021 - 2023</div>
                      <div className="timeline-content">
                        <h4>Cloud Engineer</h4>
                        <p>
                          Focused on AWS infrastructure, CI/CD pipeline automation, and infrastructure as code
                          with Terraform and CloudFormation.
                        </p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-year">2020 - 2021</div>
                      <div className="timeline-content">
                        <h4>DevOps Engineer</h4>
                        <p>
                          Getting started with DevOps practices, containerization with Docker, and automating
                          deployment pipelines.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'education' && (
                <div className="education-content">
                  <h3 className="subsection-title">Education</h3>
                  <div className="education-grid">
                    <div className="education-item">
                      <div className="education-icon">
                        <i className="bi bi-mortarboard"></i>
                      </div>
                      <div className="education-info">
                        <h4>Master of Science in Computer Science</h4>
                        <p className="degree">Specialization in Cloud Computing & Distributed Systems</p>
                        <p className="details">2018 - 2020 • CGPA: 3.8/4.0</p>
                      </div>
                    </div>
                    <div className="education-item">
                      <div className="education-icon">
                        <i className="bi bi-book"></i>
                      </div>
                      <div className="education-info">
                        <h4>Bachelor of Technology in Computer Engineering</h4>
                        <p className="degree">Major in Computer Science & Engineering</p>
                        <p className="details">2014 - 2018 • CGPA: 3.6/4.0</p>
                      </div>
                    </div>
                    <div className="education-item">
                      <div className="education-icon">
                        <i className="bi bi-award"></i>
                      </div>
                      <div className="education-info">
                        <h4>AWS Solutions Architect - Professional</h4>
                        <p className="degree">Amazon Web Services Certification</p>
                        <p className="details">Issued: 2022 • Valid until: 2025</p>
                      </div>
                    </div>
                    <div className="education-item">
                      <div className="education-icon">
                        <i className="bi bi-certificate"></i>
                      </div>
                      <div className="education-info">
                        <h4>Certified Kubernetes Administrator (CKA)</h4>
                        <p className="degree">Cloud Native Computing Foundation</p>
                        <p className="details">Issued: 2021 • Valid until: 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'resume' && (
                <div className="resume-content">
                  <h3 className="subsection-title">Resume Highlights</h3>
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-number">5+</div>
                      <div className="stat-label">YEARS EXPERIENCE</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number">20+</div>
                      <div className="stat-label">PROJECTS COMPLETED</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number">20+</div>
                      <div className="stat-label">TECHNOLOGIES MASTERED</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number">5+</div>
                      <div className="stat-label">CLOUD CERTIFICATIONS</div>
                    </div>
                  </div>
                  <div className="resume-details">
                    <div className="detail-item">
                      <h4>
                        <i className="bi bi-bullseye"></i> Key Expertise
                      </h4>
                      <p>AWS, Kubernetes, Terraform, CI/CD, Observability, Security</p>
                    </div>
                    <div className="detail-item">
                      <h4>
                        <i className="bi bi-rocket-takeoff"></i> Achievements
                      </h4>
                      <p>Reduced infrastructure costs by 40%, improved deployment speed by 80%, maintained 99.9% uptime</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'portfolio' && (
                <div className="portfolio-content">
                  <h3 className="subsection-title">Portfolio</h3>
                  <div className="portfolio-grid">
                    <div className="portfolio-item">
                      <h4>Multi-Region Kubernetes Cluster</h4>
                      <p>Highly available Kubernetes deployment across AWS regions with automatic failover</p>
                      <div className="portfolio-tags">
                        <span>Kubernetes</span>
                        <span>Terraform</span>
                        <span>AWS</span>
                        <span>Helm</span>
                      </div>
                    </div>
                    <div className="portfolio-item">
                      <h4>CI/CD Pipeline Automation</h4>
                      <p>End-to-end automated deployment pipeline that reduced release time from hours to minutes</p>
                      <div className="portfolio-tags">
                        <span>GitHub Actions</span>
                        <span>Docker</span>
                        <span>AWS ECS</span>
                      </div>
                    </div>
                    <div className="portfolio-item">
                      <h4>Enterprise Observability Stack</h4>
                      <p>Comprehensive monitoring platform with Prometheus, Grafana, Loki, and ELK</p>
                      <div className="portfolio-tags">
                        <span>Prometheus</span>
                        <span>Grafana</span>
                        <span>ELK</span>
                        <span>PagerDuty</span>
                      </div>
                    </div>
                    <div className="portfolio-item">
                      <h4>Cloud Cost Optimization</h4>
                      <p>Automated cost management and resource optimization reducing cloud expenses by 40%</p>
                      <div className="portfolio-tags">
                        <span>AWS Cost Explorer</span>
                        <span>Lambda</span>
                        <span>Python</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'blog' && (
                <div className="blog-content">
                  <h3 className="subsection-title">Blog</h3>
                  <div className="blog-list">
                    <div className="blog-item">
                      <div className="blog-date">2024-05-15</div>
                      <div className="blog-content-inner">
                        <h4>Getting Started with Terraform</h4>
                        <p>
                          A comprehensive beginner's guide to infrastructure as code using Terraform,
                          including best practices, examples, and common patterns.
                        </p>
                      </div>
                    </div>
                    <div className="blog-item">
                      <div className="blog-date">2024-04-02</div>
                      <div className="blog-content-inner">
                        <h4>Kubernetes Best Practices for Production</h4>
                        <p>
                          Essential tips for running production-grade Kubernetes clusters, covering
                          security, reliability, scalability, and maintainability.
                        </p>
                      </div>
                    </div>
                    <div className="blog-item">
                      <div className="blog-date">2024-02-20</div>
                      <div className="blog-content-inner">
                        <h4>Designing Effective CI/CD Pipelines</h4>
                        <p>
                          How to build robust, efficient, and secure deployment pipelines that help
                          your team ship faster with confidence.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'terminal' && (
                <div className="terminal-content">
                  <h3 className="subsection-title">Terminal</h3>
                  <div className="terminal-commands">
                    <div className="command-item">
                      <span className="command-prompt">$</span>
                      <span className="command-name">help</span>
                      <span className="command-desc">- List all available commands</span>
                    </div>
                    <div className="command-item">
                      <span className="command-prompt">$</span>
                      <span className="command-name">about</span>
                      <span className="command-desc">- Learn more about me</span>
                    </div>
                    <div className="command-item">
                      <span className="command-prompt">$</span>
                      <span className="command-name">projects</span>
                      <span className="command-desc">- View my portfolio</span>
                    </div>
                    <div className="command-item">
                      <span className="command-prompt">$</span>
                      <span className="command-name">contact</span>
                      <span className="command-desc">- Get in touch</span>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'infrastructure' && (
                <div className="infrastructure-content">
                  <h3 className="subsection-title">Infrastructure</h3>
                  <div className="infrastructure-grid">
                    <div className="infrastructure-item">
                      <h4>AWS Architecture</h4>
                      <p>VPC design, multi-AZ deployment, auto-scaling groups, and well-architected framework</p>
                    </div>
                    <div className="infrastructure-item">
                      <h4>Kubernetes Platform</h4>
                      <p>EKS cluster management, Helm charts, operators, and GitOps workflows with ArgoCD</p>
                    </div>
                    <div className="infrastructure-item">
                      <h4>CI/CD Platform</h4>
                      <p>GitHub Actions, ArgoCD, and complete GitOps workflow implementation</p>
                    </div>
                    <div className="infrastructure-item">
                      <h4>Observability Stack</h4>
                      <p>Prometheus, Grafana, Loki, Tempo, and end-to-end monitoring setup</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'contact' && (
                <div className="contact-content">
                  <h3 className="subsection-title">Get In Touch</h3>
                  <div className="contact-grid">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="bi bi-envelope"></i>
                      </div>
                      <div className="contact-label">Email</div>
                      <div className="contact-value">yash.baviskar@example.com</div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="bi bi-linkedin"></i>
                      </div>
                      <div className="contact-label">LinkedIn</div>
                      <div className="contact-value">linkedin.com/in/yashbaviskar</div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="bi bi-github"></i>
                      </div>
                      <div className="contact-label">GitHub</div>
                      <div className="contact-value">github.com/yashbaviskar</div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="bi bi-twitter-x"></i>
                      </div>
                      <div className="contact-label">Twitter</div>
                      <div className="contact-value">@yashbaviskar</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <footer className="portfolio-footer">
            <span>© {new Date().getFullYear()} Yash Baviskar</span>
            <span>
              <i className="bi bi-circle-fill"></i>
            </span>
            <span>All systems operational</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
