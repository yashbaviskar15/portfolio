import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const corePillars = [
    {
      title: t('about.pillar1Title'),
      icon: 'bi-cloud-check-fill',
      color: 'text-amber-600 bg-amber-50 border-amber-200/80',
      description: t('about.pillar1Text'),
    },
    {
      title: t('about.pillar2Title'),
      icon: 'bi-code-square',
      color: 'text-purple-600 bg-purple-50 border-purple-200/80',
      description: t('about.pillar2Text'),
    },
    {
      title: t('about.pillar3Title'),
      icon: 'bi-box-seam-fill',
      color: 'text-blue-600 bg-blue-50 border-blue-200/80',
      description: t('about.pillar3Text'),
    },
    {
      title: t('about.pillar4Title'),
      icon: 'bi-activity',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200/80',
      description: t('about.pillar4Text'),
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 relative bg-[#F8FAF9] border-t border-slate-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold tracking-wider uppercase font-heading">
            <i className="bi bi-person-badge-fill" />
            <span>{t('about.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            {t('about.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('about.summary')}
          </p>
        </motion.div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: '8.14 / 10.0', label: t('education.bcaGrade', 'BCA Academic CGPA'), icon: 'bi-mortarboard-fill', color: 'text-purple-600' },
            { value: '< 4 min', label: t('about.metric1Label'), icon: 'bi-lightning-charge-fill', color: 'text-amber-500' },
            { value: '< 2 min', label: t('about.metric2Label'), icon: 'bi-shield-check', color: 'text-emerald-500' },
            { value: '4', label: t('about.metric4Label'), icon: 'bi-github', color: 'text-blue-500' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center space-y-1.5 flex flex-col items-center justify-center"
            >
              <div className={`w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-base ${stat.color} mb-1`}>
                <i className={`bi ${stat.icon}`} />
              </div>
              <strong className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 leading-tight">{stat.value}</strong>
              <span className="text-xs font-bold font-heading text-slate-700 block">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* 4 Core Competency Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {corePillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold border ${pillar.color}`}>
                  <i className={`bi ${pillar.icon}`} />
                </div>
                <h3 className="text-base font-bold font-heading text-slate-900">{pillar.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Languages & Availability */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 font-heading block">{t('about.languages')}</span>
            <p className="text-xs text-slate-700 font-medium">{t('about.langEnglish')}</p>
            <p className="text-xs text-slate-700 font-medium">{t('about.langNative')}</p>
            <p className="text-xs text-slate-700 font-medium">{t('about.langGerman')}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs sm:text-sm text-slate-600 font-medium">{t('about.availability')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
