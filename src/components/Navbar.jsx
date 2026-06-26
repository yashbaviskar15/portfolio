import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Journey', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Credentials', id: 'certifications' },
  { label: 'Contact', id: 'contact' },
];

function Icon({ name }) {
  if (name === 'sun') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
    </svg>
  );
}

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      let current = 'home';
      for (const { id } of navLinks) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 820) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const scrollTo = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} aria-label="Main navigation">
        <div className="navbar__inner">
          <a href="#home" className="navbar__logo" onClick={(event) => scrollTo(event, 'home')} aria-label="Yash Baviskar - Home">
            <span className="navbar__logo-mark">YB</span>
            <span className="navbar__logo-name">Yash Baviskar</span>
          </a>

          <ul className="navbar__links" role="list">
            {navLinks.map(({ label, id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`navbar__link ${activeSection === id ? 'navbar__link--active' : ''}`}
                  onClick={(event) => scrollTo(event, id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar__right">
            <button
              className="navbar__theme-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              type="button"
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </button>

            <a href="mailto:yashbaviskar0215@outlook.com" className="navbar__cta" aria-label="Contact me - send email">
              Contact Me
            </a>

            <button
              className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              type="button"
            >
              <span className="navbar__hamburger-line" aria-hidden="true" />
              <span className="navbar__hamburger-line" aria-hidden="true" />
              <span className="navbar__hamburger-line" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`} aria-hidden={!menuOpen}>
        {navLinks.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`navbar__mobile-link ${activeSection === id ? 'navbar__mobile-link--active' : ''}`}
            onClick={(event) => scrollTo(event, id)}
          >
            {label}
          </a>
        ))}
        <a href="mailto:yashbaviskar0215@outlook.com" className="btn-primary">Start a Conversation</a>
      </div>
    </header>
  );
}
