const links = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Journey', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Contact', id: 'contact' },
];

export default function Footer() {
  const scrollTo = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <a className="footer__brand" href="#home" onClick={(event) => scrollTo(event, 'home')}>
            <span>YB</span>
            Yash Baviskar
          </a>
          <p>Cloud Engineer portfolio for AWS, DevOps, and infrastructure automation roles.</p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={(event) => scrollTo(event, link.id)}>{link.label}</a>
          ))}
        </nav>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Yash Baviskar</span>
          <span>Built with React, Vite, and Bootstrap Icons</span>
        </div>
      </div>
    </footer>
  );
}
