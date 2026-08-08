import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200/80 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src="/favicon.png"
              alt="Yash Baviskar"
              className="w-9 h-9 rounded-xl object-cover shadow-xs border border-slate-200/80"
            />
            <span className="font-heading font-extrabold text-slate-900 text-lg">
              Yash Baviskar
            </span>
          </div>

          {/* Nav Links & CV Download */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-slate-600">
            <a href="#home" className="hover:text-purple-600 transition-colors">{t('nav.home')}</a>
            <a href="#about" className="hover:text-purple-600 transition-colors">{t('nav.about')}</a>
            <a href="#skills" className="hover:text-purple-600 transition-colors">{t('nav.skills')}</a>
            <a href="#experience" className="hover:text-purple-600 transition-colors">{t('nav.education')}</a>
            <a href="#projects" className="hover:text-purple-600 transition-colors">{t('nav.projects')}</a>
            <a href="#contact" className="hover:text-purple-600 transition-colors">{t('nav.contact')}</a>
            <a
              href="/yash_cv.pdf"
              download="Yash_Baviskar_CV.pdf"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold text-xs border border-purple-200 transition-colors"
            >
              <i className="bi bi-download" />
              <span>CV (PDF)</span>
            </a>
          </div>

          {/* Styled Back to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-purple-50 hover:text-purple-600 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors shrink-0"
          >
            <i className="bi bi-arrow-up" />
            <span>{t('footer.backToTop')}</span>
          </button>
        </div>

        {/* Bottom Socials & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span>&copy; {currentYear} {t('footer.rights')}</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('open_cookie_banner'))}
              className="hover:text-purple-600 underline underline-offset-2 transition-colors cursor-pointer"
            >
              {t('footer.privacyLink')}
            </button>
          </div>

          <div className="flex items-center gap-3">
            {[
              { href: 'https://linkedin.com/in/yashbaviskar15', icon: 'bi-linkedin', label: 'LinkedIn' },
              { href: 'https://github.com/yashbaviskar15', icon: 'bi-github', label: 'GitHub' },
              { href: 'https://dev.to/yashbaviskar15', icon: 'bi-journal-code', label: 'Dev.to' },
              { href: 'https://instagram.com/mryash.__', icon: 'bi-instagram', label: 'Instagram' },
              { href: 'mailto:yashbaviskar0215@outlook.com', icon: 'bi-envelope-at-fill', label: 'Email' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-purple-600 hover:border-purple-300 flex items-center justify-center transition-all text-sm hover:-translate-y-0.5"
                title={s.label}
                aria-label={s.label}
              >
                <i className={`bi ${s.icon}`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
