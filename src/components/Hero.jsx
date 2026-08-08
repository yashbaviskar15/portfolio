import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.03 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative h-screen max-h-[100dvh] flex items-center overflow-hidden bg-[#F8FAF9] scroll-mt-20"
    >
      {/* Hero Background Photo — 100% Uncut, anchored bottom-right, same position */}
      <div className="absolute right-0 bottom-0 top-0 w-full lg:w-[48%] xl:w-[50%] flex items-end justify-end pointer-events-none z-0 overflow-hidden">
        <div className="relative w-full h-full flex items-end justify-end">
          <img
            src="/photo2.png"
            alt="Yash Baviskar — Cloud Engineer & DevOps"
            className="h-auto max-h-[85vh] lg:max-h-[88vh] w-auto max-w-full object-contain object-bottom filter drop-shadow-xl select-none"
            onError={(e) => { e.target.src = '/profilephoto.png'; }}
          />
          {/* Left-edge readability gradient — does NOT mask face */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAF9] via-[#F8FAF9]/30 via-20% to-transparent hidden lg:block" />
          <div className="absolute inset-0 bg-[#F8FAF9]/80 lg:hidden" />
        </div>
      </div>

      {/* Subtle Ambient Background */}
      <div className="absolute inset-0 subtle-grid-pattern opacity-25 pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-16 sm:pt-20">
        <div className="max-w-xl lg:max-w-2xl text-left space-y-3 sm:space-y-4">
          <motion.div
            className="space-y-3 sm:space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t('hero.statusBadge', 'Available for Cloud & DevOps Roles')}</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-1">
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold font-heading text-slate-900 tracking-tight leading-[1.1]">
                Yash Baviskar
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 font-heading">
                {t('hero.role', 'Cloud Engineer & DevOps')}
              </p>
            </motion.div>

            {/* Summary — uses existing hero.summary key */}
            <motion.div variants={itemVariants}>
              <p className="text-sm sm:text-base text-slate-700 max-w-lg leading-relaxed">
                {t('hero.summary', 'Specializing in AWS, Terraform, Docker, Kubernetes, Linux, and CI/CD pipelines. Actively expanding expertise into Microsoft Azure cloud technologies.')}
              </p>
            </motion.div>

            {/* Tech Stack Chips — compact */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-1.5">
              {[
                { name: 'AWS & Azure', color: 'bg-amber-500' },
                { name: 'Terraform (IaC)', color: 'bg-purple-500' },
                { name: 'Docker & Kubernetes', color: 'bg-blue-500' },
                { name: 'GitHub Actions (CI/CD)', color: 'bg-rose-500' },
                { name: 'Prometheus & Grafana', color: 'bg-emerald-500' },
                { name: 'Linux (Ubuntu/Amazon)', color: 'bg-slate-700' },
                { name: 'Python & Bash', color: 'bg-indigo-600' },
              ].map((chip) => (
                <span
                  key={chip.name}
                  className="px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-sm border border-slate-200 text-slate-700 text-[10px] sm:text-[11px] font-medium shadow-2xs flex items-center gap-1.5 hover:border-purple-300 transition-colors"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${chip.color}`} />
                  {chip.name}
                </span>
              ))}
            </motion.div>

            {/* Action Buttons — no duplicate Download CV */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-white font-semibold text-xs sm:text-sm gradient-btn shadow-md hover:shadow-purple-500/20 flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <i className="bi bi-folder2-open text-sm" />
                <span>{t('hero.exploreProjects', 'Explore Projects')}</span>
              </button>

              <a
                href="https://github.com/yashbaviskar15"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-2xs hover:shadow-sm flex items-center gap-2 transition-all hover:-translate-y-0.5"
              >
                <i className="bi bi-github text-sm" />
                <span>GitHub</span>
              </a>

              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-purple-600 hover:border-purple-300 font-semibold text-xs sm:text-sm shadow-2xs hover:shadow-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <i className="bi bi-envelope-fill text-xs text-purple-600" />
                <span>{t('hero.contactMe', 'Contact Me')}</span>
              </button>
            </motion.div>

            {/* Social Channels */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-heading">
                {t('hero.connect', 'Connect:')}
              </span>
              <div className="flex items-center gap-1.5">
                {[
                  { href: 'https://linkedin.com/in/yashbaviskar15', icon: 'bi-linkedin', label: 'LinkedIn', hover: 'hover:text-purple-600 hover:border-purple-300' },
                  { href: 'https://github.com/yashbaviskar15', icon: 'bi-github', label: 'GitHub', hover: 'hover:text-slate-900 hover:border-slate-400' },
                  { href: 'mailto:yashbaviskar0215@outlook.com', icon: 'bi-envelope-at-fill', label: 'Email', hover: 'hover:text-blue-600 hover:border-blue-300' },
                  { href: 'https://dev.to/yashbaviskar15', icon: 'bi-journal-code', label: 'Dev.to', hover: 'hover:text-slate-900 hover:border-slate-400' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center shadow-2xs ${s.hover} transition-all hover:-translate-y-0.5`}
                    aria-label={s.label}
                    title={s.label}
                  >
                    <i className={`bi ${s.icon} text-sm`} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
