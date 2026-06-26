import { useEffect, useRef } from 'react';

const groups = [
  {
    icon: 'bi-cloud-fill',
    title: 'AWS & Cloud',
    skills: ['EC2', 'S3', 'IAM', 'VPC', 'Lambda', 'DynamoDB', 'CloudFront', 'Route 53'],
  },
  {
    icon: 'bi-hammer',
    title: 'DevOps Tools',
    skills: ['Terraform', 'GitHub Actions', 'Docker', 'AWS CLI', 'CodePipeline', 'CloudFormation'],
  },
  {
    icon: 'bi-pc-display-horizontal',
    title: 'Systems',
    skills: ['Linux', 'Bash', 'Networking', 'CloudWatch', 'Nginx basics', 'Security basics'],
  },
  {
    icon: 'bi-code-slash',
    title: 'Programming',
    skills: ['Python', 'JavaScript basics', 'SQL basics', 'Git', 'REST APIs', 'Documentation'],
  },
];

export default function Skills() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle('visible', entry.isIntersecting)),
      { threshold: 0.12 }
    );

    ref.current?.querySelectorAll('.reveal, .reveal-scale').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills section" id="skills" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label"><i className="bi bi-stack" aria-hidden="true" /> Skills</span>
          <h2 className="section-title">Technical capability areas</h2>
          <p className="section-subtitle">A focused stack for cloud infrastructure, automation, deployment workflows, and system operations.</p>
        </div>

        <div className="skills__grid">
          {groups.map((group, index) => (
            <article className={`skills__group reveal-scale delay-${(index + 1) * 100}`} key={group.title}>
              <div className="skills__group-head">
                <i className={`bi ${group.icon}`} aria-hidden="true" />
                <h3>{group.title}</h3>
              </div>
              <div className="skills__chips">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
