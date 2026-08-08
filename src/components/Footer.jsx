import { useLanguage } from '../context/LanguageContext';
import { useCV } from '../context/CVContext';

export default function Footer() {
  const { t } = useLanguage();
  const { openCV } = useCV();

  return (
    <footer className="bg-white border-t border-slate-200/80 py-10 sm:py-12 relative z-10 text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pb-6 border-b border-slate-100 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-heading font-extrabold text-slate-900 text-lg tracking-tight">
                Yash Baviskar
              </span>
              <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                {t('hero.role', 'Cloud Engineer & DevOps')}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              AWS • Terraform • Docker • Kubernetes • CI/CD • Linux
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
            <a href="https://github.com/yashbaviskar15" target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1.5 transition-colors">
              <i className="bi bi-github" /><span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/yashbaviskar15" target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/60 flex items-center gap-1.5 transition-colors">
              <i className="bi bi-linkedin" /><span>LinkedIn</span>
            </a>
            <a href="mailto:yashbaviskar0215@outlook.com"
              className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200/60 flex items-center gap-1.5 transition-colors">
              <i className="bi bi-envelope-fill" /><span>Email</span>
            </a>
            <button type="button" onClick={openCV}
              className="px-3 py-1.5 rounded-lg gradient-btn text-white font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer">
              <i className="bi bi-file-earmark-pdf-fill" />
              <span>{t('hero.viewResume', 'Download CV')}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left font-mono">
          <p>Copyright © 2026 {t('footer.rights', 'Yash Baviskar. Built with React & Tailwind CSS.')}</p>
          <span className="text-purple-600 font-bold">{t('hero.role', 'Cloud Engineer & DevOps')}</span>
        </div>
      </div>
    </footer>
  );
}
