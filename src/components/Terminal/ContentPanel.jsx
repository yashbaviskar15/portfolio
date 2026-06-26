import './ContentPanel.css';

const sectionContent = {
  skills: {
    title: 'Technical Skills',
    items: [
      {
        category: 'Cloud Platforms',
        skills: ['AWS (EC2, S3, Lambda, RDS, CloudFront)', 'Azure Basics', 'Google Cloud Platform'],
      },
      {
        category: 'Container & Orchestration',
        skills: ['Docker', 'Kubernetes (EKS, microk8s)', 'Docker Compose', 'Helm'],
      },
      {
        category: 'DevOps & IaC',
        skills: ['Terraform', 'CloudFormation', 'Ansible', 'Jenkins', 'GitLab CI/CD', 'GitHub Actions'],
      },
      {
        category: 'Monitoring & Logging',
        skills: ['Prometheus', 'Grafana', 'ELK Stack', 'CloudWatch', 'DataDog'],
      },
      {
        category: 'Programming',
        skills: ['Python', 'Bash Scripting', 'Go (basics)', 'SQL', 'JavaScript (Node.js)'],
      },
      {
        category: 'Other Tools',
        skills: ['Git', 'Linux Administration', 'Nginx', 'Apache', 'PostgreSQL', 'MongoDB'],
      },
    ],
  },
  experience: {
    title: 'Cloud Engineering Journey',
    items: [
      {
        role: 'BCA - Cloud Computing Focus',
        company: "KCES's Institute of Management & Research",
        period: '2023 - 2026',
        description: 'Studying computing fundamentals with a focus on networking, operating systems, DBMS, and cloud concepts.',
        highlights: ['CGPA 8.17 / 10', 'AWS learning path', 'Cloud project portfolio'],
      },
      {
        role: 'AWS Certification Path',
        company: 'Amazon Web Services',
        period: '2023 - 2024',
        description: 'Prepared and validated AWS fundamentals and architecture knowledge through certifications.',
        highlights: ['Cloud Practitioner', 'Solutions Architect Associate', 'Architecture fundamentals'],
      },
      {
        role: 'Infrastructure Automation Practice',
        company: 'Terraform and DevOps Labs',
        period: '2024 - Present',
        description: 'Building portfolio projects around Terraform, CI/CD, Docker, and AWS infrastructure.',
        highlights: ['Terraform workflows', 'GitHub Actions', 'Docker and ECR'],
      },
    ],
  },
  projects: {
    title: 'Featured Projects',
    items: [
      {
        name: 'Multi-Region K8s Cluster',
        description: 'Designed and deployed a highly available Kubernetes cluster across multiple AWS regions.',
        tech: ['Kubernetes', 'Terraform', 'AWS', 'Prometheus'],
        status: 'Completed',
      },
      {
        name: 'CI/CD Pipeline Automation',
        description: 'Built comprehensive GitLab CI/CD pipeline reducing deployment time from 2 hours to 15 minutes.',
        tech: ['GitLab CI', 'Docker', 'Python', 'Ansible'],
        status: 'Completed',
      },
      {
        name: 'Cloud Cost Optimization',
        description: 'Implemented automated cost optimization tools saving 40% on cloud infrastructure expenses.',
        tech: ['Python', 'AWS CloudWatch', 'Lambda', 'Grafana'],
        status: 'Completed',
      },
      {
        name: 'Infrastructure Monitoring Stack',
        description: 'Deployed comprehensive monitoring and alerting system across entire infrastructure.',
        tech: ['Prometheus', 'Grafana', 'AlertManager', 'ELK Stack'],
        status: 'Completed',
      },
    ],
  },
  certifications: {
    title: 'Professional Certifications',
    items: [
      {
        name: 'AWS Certified Solutions Architect - Professional',
        issuer: 'Amazon Web Services',
        year: '2023',
        expiry: 'Valid until 2025',
      },
      {
        name: 'Kubernetes Application Developer (CKAD)',
        issuer: 'Linux Foundation',
        year: '2022',
        expiry: 'Valid until 2025',
      },
      {
        name: 'AWS Certified DevOps Engineer - Professional',
        issuer: 'Amazon Web Services',
        year: '2022',
        expiry: 'Valid until 2024',
      },
      {
        name: 'Certified Kubernetes Administrator (CKA)',
        issuer: 'Linux Foundation',
        year: '2021',
        expiry: 'Valid until 2024',
      },
      {
        name: 'HashiCorp Certified: Terraform Associate',
        issuer: 'HashiCorp',
        year: '2021',
        expiry: 'Valid until 2024',
      },
    ],
  },
  contact: {
    title: 'Get In Touch',
    items: [],
  },
};

export default function ContentPanel({ section }) {
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
        {section === 'skills' && (
          <div className="skills-grid">
            {content.items.map((skillGroup, idx) => (
              <div key={idx} className="skill-group">
                <h4 className="skill-category">{skillGroup.category}</h4>
                <ul className="skill-list">
                  {skillGroup.skills.map((skill, sidx) => (
                    <li key={sidx} className="skill-item">
                      <span className="skill-dot">●</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {section === 'experience' && (
          <div className="experience-list">
            {content.items.map((exp, idx) => (
              <div key={idx} className="experience-item">
                <div className="exp-header">
                  <h4 className="exp-role">{exp.role}</h4>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <p className="exp-company">{exp.company}</p>
                <p className="exp-description">{exp.description}</p>
                <ul className="exp-highlights">
                  {exp.highlights.map((h, hidx) => (
                    <li key={hidx}>✓ {h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {section === 'projects' && (
          <div className="projects-grid">
            {content.items.map((project, idx) => (
              <div key={idx} className="project-card">
                <div className="project-header">
                  <h4 className="project-name">{project.name}</h4>
                  <span className={`project-status ${project.status.toLowerCase()}`}>{project.status}</span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t, tidx) => (
                    <span key={tidx} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {section === 'certifications' && (
          <div className="certifications-list">
            {content.items.map((cert, idx) => (
              <div key={idx} className="cert-item">
                <div className="cert-badge">🏆</div>
                <div className="cert-details">
                  <h4 className="cert-name">{cert.name}</h4>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <div className="cert-meta">
                    <span className="cert-year">{cert.year}</span>
                    <span className="cert-expiry">{cert.expiry}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {section === 'contact' && (
          <div className="contact-section">
            <div className="contact-form">
              <div className="form-group">
                <label className="form-label">Email:</label>
                <a href="mailto:yash@example.com" className="contact-link">yash@example.com</a>
              </div>
              <div className="form-group">
                <label className="form-label">LinkedIn:</label>
                <a href="#linkedin" className="contact-link">linkedin.com/in/yash</a>
              </div>
              <div className="form-group">
                <label className="form-label">GitHub:</label>
                <a href="#github" className="contact-link">github.com/yash</a>
              </div>
              <div className="form-group">
                <label className="form-label">Twitter:</label>
                <a href="#twitter" className="contact-link">@yash_engineer</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
