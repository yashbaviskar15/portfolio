import { useEffect, useRef } from 'react';

const certs = [
  { icon: 'bi-cloud-check-fill', name: 'AWS Certified Solutions Architect - Associate', issuer: 'Amazon Web Services', code: 'SAA-C03', date: 'Mar 2024' },
  { icon: 'bi-cloud-fill', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', code: 'CLF-C02', date: 'Aug 2023' },
  { icon: 'bi-tools', name: 'HashiCorp Certified: Terraform Associate', issuer: 'HashiCorp', code: '003', date: '2024' },
];

export default function Certifications() {
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
    <section className="certifications section" id="certifications" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label"><i className="bi bi-patch-check-fill" aria-hidden="true" /> Certifications</span>
          <h2 className="section-title">Professional certifications</h2>
          <p className="section-subtitle">Credentials that validate my AWS architecture foundation and Infrastructure as Code preparation.</p>
        </div>

        <div className="certs__grid">
          {certs.map((cert, index) => (
            <article className={`cert-card reveal-scale delay-${(index + 1) * 100}`} key={cert.name}>
              <i className={`bi ${cert.icon}`} aria-hidden="true" />
              <h3>{cert.name}</h3>
              <p>{cert.issuer}</p>
              <div>
                <span>{cert.code}</span>
                <span>{cert.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
