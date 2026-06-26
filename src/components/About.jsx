import { useEffect, useRef } from 'react';

const strengths = [
  { icon: 'bi-diagram-3-fill', title: 'Cloud architecture', text: 'Works with AWS services, networking concepts, IAM, storage, and serverless design patterns.' },
  { icon: 'bi-terminal-fill', title: 'Infrastructure automation', text: 'Uses Terraform, GitHub Actions, Docker, Bash, and AWS CLI to make deployments repeatable.' },
  { icon: 'bi-journal-check', title: 'Operational clarity', text: 'Documents decisions, keeps projects understandable, and focuses on reliable cloud workflows.' },
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle('visible', entry.isIntersecting)),
      { threshold: 0.12 }
    );

    ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about section" id="about" ref={ref}>
      <div className="container">
        <div className="section-header section-header--left reveal">
          <span className="section-label"><i className="bi bi-person-badge-fill" aria-hidden="true" /> About</span>
          <h2 className="section-title">Cloud engineering profile built around AWS, automation, and practical delivery.</h2>
          <p className="section-subtitle">
            I am completing my BCA at KCES's Institute of Management & Research, Jalgaon.
            My work focuses on cloud infrastructure, DevOps workflows, Linux systems, and building
            clear projects that show how I approach real engineering problems.
          </p>
        </div>

        <div className="about__grid">
          {strengths.map((item, index) => (
            <article className={`about__card reveal-scale delay-${(index + 1) * 100}`} key={item.title}>
              <i className={`bi ${item.icon}`} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
