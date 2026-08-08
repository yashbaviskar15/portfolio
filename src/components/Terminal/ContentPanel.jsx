import './ContentPanel.css';

const sectionContent = {
  journey: {
    title: 'My Journey',
    items: [
      {
        year: '2023 - Present',
        title: 'Cloud Engineer & DevOps',
        description: 'Focused on building scalable, resilient cloud infrastructure and automating everything.'
      },
      {
        year: '2022 - 2023',
        title: 'Learning AWS & Kubernetes',
        description: 'Deep dive into cloud technologies, containerization, and orchestration.'
      },
      {
        year: '2021 - 2022',
        title: 'Getting Started with DevOps',
        description: 'Explored CI/CD pipelines, infrastructure as code, and monitoring.'
      }
    ]
  },
  about: {
    title: 'About Me',
    items: [
      {
        icon: '👨‍💻',
        title: 'Who I Am',
        description: 'A passionate Cloud Engineer & DevOps specialist with a love for automation and infrastructure.'
      },
      {
        icon: '🎯',
        title: 'What I Do',
        description: 'I design, build, and maintain scalable cloud infrastructure with a focus on reliability and efficiency.'
      },
      {
        icon: '🚀',
        title: 'My Mission',
        description: 'To help teams ship faster with confidence through automation and best practices.'
      }
    ]
  },
  resume: {
    title: 'Resume',
    items: [
      {
        label: 'Experience',
        value: '3+ Years'
      },
      {
        label: 'Projects',
        value: '15+'
      },
      {
        label: 'Certifications',
        value: '5+'
      },
      {
        label: 'Technologies',
        value: '20+'
      }
    ]
  },
  portfolio: {
    title: 'Portfolio',
    items: [
      {
        name: 'Multi-Region Kubernetes Cluster',
        description: 'Highly available Kubernetes deployment across AWS regions',
        tech: ['Kubernetes', 'Terraform', 'AWS', 'Helm']
      },
      {
        name: 'CI/CD Pipeline Automation',
        description: 'Automated deployment pipeline reducing release time by 80%',
        tech: ['GitHub Actions', 'Docker', 'AWS ECS']
      },
      {
        name: 'Infrastructure Monitoring Stack',
        description: 'Comprehensive observability platform for cloud infrastructure',
        tech: ['Prometheus', 'Grafana', 'ELK', 'PagerDuty']
      },
      {
        name: 'Cloud Cost Optimization',
        description: 'Automated cost management reducing expenses by 40%',
        tech: ['AWS Cost Explorer', 'Lambda', 'Python']
      }
    ]
  },
  blog: {
    title: 'Blog',
    items: [
      {
        date: '2024-01-15',
        title: 'Getting Started with Terraform',
        excerpt: 'A beginner\'s guide to infrastructure as code with Terraform.'
      },
      {
        date: '2024-02-20',
        title: 'Kubernetes Best Practices',
        excerpt: 'Essential tips for running production-grade Kubernetes clusters.'
      },
      {
        date: '2024-03-10',
        title: 'CI/CD Pipeline Design',
        excerpt: 'How to build robust and efficient deployment pipelines.'
      }
    ]
  },
  contact: {
    title: 'Get In Touch',
    items: [
      {
        icon: '📧',
        label: 'Email',
        value: 'yash@example.com'
      },
      {
        icon: '💼',
        label: 'LinkedIn',
        value: 'linkedin.com/in/yash'
      },
      {
        icon: '🐙',
        label: 'GitHub',
        value: 'github.com/yash'
      },
      {
        icon: '🐦',
        label: 'Twitter',
        value: '@yash_engineer'
      }
    ]
  },
  terminal: {
    title: 'Terminal',
    items: [
      {
        command: 'help',
        description: 'List all available commands'
      },
      {
        command: 'about',
        description: 'Learn more about me'
      },
      {
        command: 'projects',
        description: 'View my portfolio'
      },
      {
        command: 'contact',
        description: 'Get in touch'
      }
    ]
  },
  infrastructure: {
    title: 'Infrastructure',
    items: [
      {
        name: 'AWS Architecture',
        description: 'VPC design, multi-AZ deployment, auto-scaling groups'
      },
      {
        name: 'Kubernetes Platform',
        description: 'EKS cluster management, Helm charts, operators'
      },
      {
        name: 'CI/CD Platform',
        description: 'GitHub Actions, ArgoCD, GitOps workflows'
      },
      {
        name: 'Observability Stack',
        description: 'Prometheus, Grafana, Loki, Tempo'
      }
    ]
  }
};

export default function ContentPanel({ section, activeTab }) {
  const content = sectionContent[section];

  if (!content) {
    return <div className="content-panel">Section not found</div>;
  }

  return (
    <div className="content-panel">
      <div className="panel-header">
        <h2 className="panel-title">{content.title}</h2>
        <div className="panel-divider"></div>
      </div>

      <div className="panel-content">
        {section === 'journey' && (
          <div className="journey-list">
            {content.items.map((item, idx) => (
              <div key={idx} className="journey-item">
                <div className="journey-year">{item.year}</div>
                <div className="journey-details">
                  <h4 className="journey-title">{item.title}</h4>
                  <p className="journey-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {section === 'about' && (
          <div className="about-grid">
            {content.items.map((item, idx) => (
              <div key={idx} className="about-card">
                <div className="about-icon">{item.icon}</div>
                <h4 className="about-title">{item.title}</h4>
                <p className="about-description">{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {section === 'resume' && (
          <div className="resume-grid">
            {content.items.map((item, idx) => (
              <div key={idx} className="resume-card">
                <div className="resume-value">{item.value}</div>
                <div className="resume-label">{item.label}</div>
              </div>
            ))}
          </div>
        )}

        {section === 'portfolio' && (
          <div className="portfolio-grid">
            {content.items.map((project, idx) => (
              <div key={idx} className="portfolio-card">
                <h4 className="portfolio-name">{project.name}</h4>
                <p className="portfolio-description">{project.description}</p>
                <div className="portfolio-tech">
                  {project.tech.map((t, tidx) => (
                    <span key={tidx} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {section === 'blog' && (
          <div className="blog-list">
            {content.items.map((post, idx) => (
              <div key={idx} className="blog-item">
                <div className="blog-date">{post.date}</div>
                <div className="blog-content">
                  <h4 className="blog-title">{post.title}</h4>
                  <p className="blog-excerpt">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {section === 'contact' && (
          <div className="contact-grid">
            {content.items.map((item, idx) => (
              <div key={idx} className="contact-card">
                <div className="contact-icon">{item.icon}</div>
                <div className="contact-info">
                  <div className="contact-label">{item.label}</div>
                  <div className="contact-value">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {section === 'terminal' && (
          <div className="terminal-commands">
            {content.items.map((cmd, idx) => (
              <div key={idx} className="command-item">
                <span className="command-prompt">$</span>
                <span className="command-name">{cmd.command}</span>
                <span className="command-desc">- {cmd.description}</span>
              </div>
            ))}
          </div>
        )}

        {section === 'infrastructure' && (
          <div className="infrastructure-grid">
            {content.items.map((item, idx) => (
              <div key={idx} className="infrastructure-card">
                <h4 className="infrastructure-name">{item.name}</h4>
                <p className="infrastructure-description">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
