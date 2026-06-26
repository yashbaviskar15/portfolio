function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Hero() {
  return (
    <section className="hero" id="home" aria-label="Portfolio introduction">
      <div className="hero__photo-bg">
        <img src="/profile.jpg" alt="Yash Baviskar" className="hero__photo-bg-img" />
      </div>
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span className="hero__status-dot" aria-hidden="true" />
            Available for opportunities
          </p>

          <p className="hero__hello">Hello, I'm</p>
          <h1 className="hero__name"><span>Yash Baviskar</span></h1>
          <p className="hero__role">Cloud Engineer & DevOps</p>

          <p className="hero__lead">
            I build scalable, reliable infrastructure with AWS, Terraform, Docker, and modern DevOps practices. 
            Passionate about automation, cloud architecture, and continuous improvement of deployment pipelines.
          </p>

          <div className="hero__actions">
            <button className="btn-primary" type="button" onClick={() => scrollTo('projects')}>
              <i className="bi bi-folder-check" aria-hidden="true" />
              View My Work
            </button>
            <button className="btn-outline" type="button" onClick={() => scrollTo('contact')}>
              <i className="bi bi-envelope-paper" aria-hidden="true" />
              Contact Me
            </button>
            <a className="btn-ghost" href="/resume.pdf" download>
              <i className="bi bi-download" aria-hidden="true" />
              Download CV
            </a>
          </div>

          <div className="hero__links" aria-label="Profile links">
            <a href="https://linkedin.com/in/yashbaviskar15" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-linkedin" aria-hidden="true" />
              LinkedIn
            </a>
            <a href="https://github.com/yashbaviskar15" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-github" aria-hidden="true" />
              GitHub
            </a>
            <a href="mailto:yashbaviskar0215@outlook.com">
              <i className="bi bi-envelope-fill" aria-hidden="true" />
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
