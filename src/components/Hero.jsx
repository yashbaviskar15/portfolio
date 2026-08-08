import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [showResume, setShowResume] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-28 sm:pt-36 pb-16 lg:py-28 overflow-hidden bg-[#F8FAF9] scroll-mt-24">
      {/* Hero Background Photo Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-end">
        <div className="w-full lg:w-[54%] h-full relative">
          <img
            src="/photo2.png"
            alt="Yash Baviskar — Cloud Engineer & DevOps"
            className="w-full h-full object-cover lg:object-contain object-top lg:object-right-bottom filter drop-shadow-xl"
            onError={(e) => { e.target.src = '/profilephoto.png'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAF9] via-[#F8FAF9]/85 via-55% to-transparent hidden lg:block" />
          <div className="absolute inset-0 bg-[#F8FAF9]/85 lg:hidden" />
        </div>
      </div>

      {/* Grid Pattern Texture */}
      <div className="absolute inset-0 subtle-grid-pattern opacity-30 pointer-events-none z-0" />

      {/* Ambient Radial Glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-10 left-1/4 w-[500px] h-[260px] bg-gradient-to-r from-purple-200/40 via-violet-100/30 to-indigo-100/40 rounded-full blur-3xl pointer-events-none z-0"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-xl lg:max-w-2xl text-left space-y-6">

          <motion.div
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-slate-900 tracking-tight leading-[1.1]">
                {t('hero.greeting')} <span className="gradient-text">Yash Baviskar</span>
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-purple-600 font-heading">
                {t('hero.role')}
              </p>
              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                {t('hero.summary')}
              </p>
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-1.5 pt-1">
              {[
                { name: 'AWS & Azure', color: 'text-amber-600' },
                { name: 'Terraform (IaC)', color: 'text-purple-600' },
                { name: 'Docker & Kubernetes', color: 'text-blue-600' },
                { name: 'GitHub Actions', color: 'text-rose-600' },
                { name: 'Prometheus & Grafana', color: 'text-emerald-600' },
                { name: 'Python & Bash', color: 'text-slate-600' },
              ].map((chip) => (
                <span
                  key={chip.name}
                  className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm border border-slate-200/80 text-slate-600 text-[11px] font-medium shadow-2xs flex items-center gap-1.5 cursor-default hover:border-purple-300 transition-colors"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${chip.color.replace('text-', 'bg-')}`} />
                  {chip.name}
                </span>
              ))}
            </motion.div>

            {/* Action CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="px-7 py-3.5 rounded-xl text-white font-semibold text-sm sm:text-base gradient-btn shadow-md hover:shadow-purple-500/20 flex items-center gap-2.5 transition-all hover:-translate-y-0.5"
              >
                <i className="bi bi-folder2-open text-lg" />
                <span>{t('hero.exploreProjects')}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowResume(true)}
                className="px-7 py-3.5 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-800 hover:text-purple-600 hover:border-purple-300 font-semibold text-sm sm:text-base shadow-2xs hover:shadow-sm flex items-center gap-2.5 transition-all hover:-translate-y-0.5"
              >
                <i className="bi bi-file-earmark-pdf-fill text-lg text-red-500" />
                <span>{t('hero.viewResume')}</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="px-7 py-3.5 rounded-xl bg-slate-200/80 hover:bg-slate-200 text-slate-700 font-semibold text-sm sm:text-base flex items-center gap-2.5 transition-all hover:-translate-y-0.5"
              >
                <i className="bi bi-envelope-fill text-sm text-purple-600" />
                <span>{t('hero.contactMe')}</span>
              </button>
            </motion.div>

            {/* Social Links Bar */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 pt-4 border-t border-slate-200/80">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">{t('hero.connect')}</span>
              <div className="flex flex-wrap items-center gap-2.5">
                {[
                  { href: 'https://linkedin.com/in/yashbaviskar15', icon: 'bi-linkedin', label: 'LinkedIn', hover: 'hover:text-purple-600 hover:border-purple-300' },
                  { href: 'https://github.com/yashbaviskar15', icon: 'bi-github', label: 'GitHub', hover: 'hover:text-slate-900 hover:border-slate-400' },
                  { href: 'https://dev.to/yashbaviskar15', icon: 'bi-journal-code', label: 'Dev.to Community', hover: 'hover:text-slate-900 hover:border-slate-400' },
                  { href: 'https://instagram.com/mryash.__', icon: 'bi-instagram', label: 'Instagram', hover: 'hover:text-pink-600 hover:border-pink-300' },
                  { href: 'mailto:yashbaviskar0215@outlook.com', icon: 'bi-envelope-at-fill', label: 'Email', hover: 'hover:text-blue-600 hover:border-blue-300' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/90 border border-slate-200 text-slate-600 flex items-center justify-center shadow-2xs ${s.hover} transition-all hover:-translate-y-0.5`}
                    aria-label={s.label}
                    title={s.label}
                  >
                    <i className={`bi ${s.icon} text-base sm:text-lg`} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex justify-center mt-12 sm:mt-16"
        >
          <button
            type="button"
            onClick={() => scrollTo('about')}
            className="group flex flex-col items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-purple-600 transition-colors font-heading"
          >
            <span>{t('hero.scrollDown')}</span>
            <div className="w-5 h-8 rounded-full border-2 border-slate-300 group-hover:border-purple-500 p-1 flex justify-center">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-1 h-2 bg-purple-600 rounded-full"
              />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Resume PDF Viewer Modal */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResume(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg font-bold">
                    <i className="bi bi-file-earmark-pdf-fill" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold font-heading text-slate-900 leading-tight">
                      Yash Baviskar — Curriculum Vitae (CV)
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      Cloud Engineer & DevOps • BCA CGPA 8.14/10.0
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/yash_cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                    title="Open in new tab"
                  >
                    <i className="bi bi-box-arrow-up-right text-xs" />
                    <span className="hidden sm:inline">Open in Tab</span>
                  </a>
                  <a
                    href="/yash_cv.pdf"
                    download="Yash_Baviskar_CV.pdf"
                    className="px-4 py-1.5 rounded-xl gradient-btn text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <i className="bi bi-download" />
                    <span>Download PDF</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowResume(false)}
                    className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close CV preview"
                  >
                    <i className="bi bi-x-lg text-xs" />
                  </button>
                </div>
              </div>

              {/* PDF Preview Frame */}
              <div className="flex-1 bg-slate-100 min-h-[60vh] sm:min-h-[70vh] relative flex flex-col">
                <iframe
                  src="/yash_cv.pdf#view=FitH&toolbar=0&navpanes=0"
                  title="Yash Baviskar CV PDF"
                  className="w-full h-full flex-1 border-0 bg-white"
                  style={{ minHeight: '62vh' }}
                />
              </div>

              {/* Bottom Quick-Action Bar */}
              <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/90 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Verified Official CV
                  </span>
                  <span className="hidden sm:inline text-slate-400">•</span>
                  <span className="hidden sm:inline text-slate-500 font-mono">yashbaviskar0215@outlook.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:yashbaviskar0215@outlook.com?subject=Opportunity%20Discussion%20-%20Cloud%20Engineer"
                    className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
                  >
                    <i className="bi bi-send-fill text-xs" />
                    <span>Contact Directly</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
