import { useEffect, useRef } from 'react';

const projects = [
  {
    icon: 'bi-link-45deg',
    title: 'Serverless URL Shortener',
    problem: 'Design a compact AWS serverless flow with secure custom domain routing.',
    built: 'API Gateway, Lambda, DynamoDB, CloudFront, ACM, and Route 53.',
    learned: 'Serverless routing, HTTPS, DynamoDB access patterns, CDN basics, and DNS setup.',
    tags: ['Lambda', 'DynamoDB', 'CloudFront', 'Route 53'],
  },
  {
    icon: 'bi-braces-asterisk',
    title: 'Terraform AWS Provisioning',
    problem: 'Avoid manual AWS setup and make infrastructure repeatable.',
    built: 'Terraform configuration for EC2, VPC networking, IAM, S3, and remote state locking.',
    learned: 'State management, reusable variables, provider configuration, and safe planning.',
    tags: ['Terraform', 'EC2', 'VPC', 'IAM'],
  },
  {
    icon: 'bi-git',
    title: 'GitHub Actions CI/CD',
    problem: 'Turn a manual build/deploy flow into an automated pipeline.',
    built: 'Workflow for builds, Docker image creation, and Amazon ECR push.',
    learned: 'Pipeline stages, secrets, image tagging, and release repeatability.',
    tags: ['GitHub Actions', 'Docker', 'ECR', 'CI/CD'],
  },
];

export default function Projects() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle('visible', entry.isIntersecting)),
      { threshold: 0.08 }
    );

    ref.current?.querySelectorAll('.reveal, .reveal-scale').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects section" id="projects" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label"><i className="bi bi-folder-check" aria-hidden="true" /> Projects</span>
          <h2 className="section-title">Selected cloud projects</h2>
          <p className="section-subtitle">Each project highlights the goal, implementation choices, and the cloud engineering skills demonstrated.</p>
        </div>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <article className={`project-card reveal-scale delay-${(index + 1) * 100}`} key={project.title}>
              <div className="project-card__icon"><i className={`bi ${project.icon}`} aria-hidden="true" /></div>
              <h3>{project.title}</h3>
              <dl>
                <div>
                  <dt>Goal</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt>Built with</dt>
                  <dd>{project.built}</dd>
                </div>
                <div>
                  <dt>Demonstrates</dt>
                  <dd>{project.learned}</dd>
                </div>
              </dl>
              <div className="project-card__tags">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>

        <div className="section-action reveal delay-400">
          <a className="btn-outline" href="https://github.com/yashbaviskar15" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-github" aria-hidden="true" />
            View GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
