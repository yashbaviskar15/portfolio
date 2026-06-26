import { useEffect, useRef } from 'react';

const journey = [
  {
    icon: 'bi-mortarboard-fill',
    period: '2023 - 2026',
    title: 'Bachelor of Computer Applications',
    meta: "KCES's Institute of Management & Research, Jalgaon",
    text: 'Studying computing fundamentals with focus on networking, operating systems, DBMS, and cloud concepts.',
  },
  {
    icon: 'bi-award-fill',
    period: 'Aug 2023',
    title: 'AWS Certified Cloud Practitioner',
    meta: 'Amazon Web Services - CLF-C02',
    text: 'Built a foundation in AWS services, shared responsibility, pricing, support, and cloud value.',
  },
  {
    icon: 'bi-cloud-check-fill',
    period: 'Mar 2024',
    title: 'AWS Solutions Architect - Associate',
    meta: 'Amazon Web Services - SAA-C03',
    text: 'Validated architecture basics around secure, resilient, performant, and cost-aware AWS solutions.',
  },
  {
    icon: 'bi-tools',
    period: '2024',
    title: 'Terraform Associate',
    meta: 'HashiCorp - 003',
    text: 'Practiced Terraform workflows, state, variables, modules, providers, and repeatable provisioning.',
  },
];

export default function Experience() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle('visible', entry.isIntersecting)),
      { threshold: 0.1 }
    );

    ref.current?.querySelectorAll('.reveal, .reveal-left').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="experience section" id="experience" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label"><i className="bi bi-signpost-split-fill" aria-hidden="true" /> Journey</span>
          <h2 className="section-title">Education and certification timeline</h2>
          <p className="section-subtitle">A concise view of my academic background, AWS preparation, and infrastructure automation credentials.</p>
        </div>

        <div className="timeline">
          {journey.map((item, index) => (
            <article className={`timeline__item reveal-left delay-${(index + 1) * 100}`} key={item.title}>
              <div className="timeline__icon"><i className={`bi ${item.icon}`} aria-hidden="true" /></div>
              <div className="timeline__content">
                <span>{item.period}</span>
                <h3>{item.title}</h3>
                <strong>{item.meta}</strong>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
