import { motion } from 'framer-motion';
import StatCounter from './StatCounter';
import TiltCard from './TiltCard';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const pillars = [
    { icon: 'bi-cloud-fill', title: t('about.pillar1Title'), text: t('about.pillar1Text') },
    { icon: 'bi-code-square', title: t('about.pillar2Title'), text: t('about.pillar2Text') },
    { icon: 'bi-box-seam-fill', title: t('about.pillar3Title'), text: t('about.pillar3Text') },
    { icon: 'bi-shield-lock-fill', title: t('about.pillar4Title'), text: t('about.pillar4Text') },
  ];

  const goals = [
    { icon: 'bi-microsoft', title: t('about.goal1Title'), text: t('about.goal1Text') },
    { icon: 'bi-rocket-takeoff-fill', title: t('about.goal2Title'), text: t('about.goal2Text') },
    { icon: 'bi-shield-check', title: t('about.goal3Title'), text: t('about.goal3Text') },
    { icon: 'bi-currency-dollar', title: t('about.goal4Title'), text: t('about.goal4Text') },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 relative bg-[#F8FAF9] border-y border-slate-200/60 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1000 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold tracking-wider uppercase font-heading">
            <i className="bi bi-person-badge-fill" />
            <span>{t('about.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            {t('about.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('about.summary')}
          </p>
        </motion.div>

        {/* Animated Metric Counters Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCounter prefix=">" targetValue="75" suffix="%" label={t('about.metric1Label')} delay={0.1} />
          <StatCounter prefix=">" targetValue="85" suffix="%" label={t('about.metric2Label')} delay={0.2} />
          <StatCounter targetValue="100" suffix="%" label={t('about.metric3Label')} delay={0.3} />
          <StatCounter targetValue="4" label={t('about.metric4Label')} delay={0.4} />
        </div>

        {/* Capabilities & Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Core Capabilities (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-slate-200/80 pb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold shrink-0">
                <i className="bi bi-cpu-fill" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900">{t('about.pillarsTitle')}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {pillars.map((pillar) => (
                <TiltCard key={pillar.title} className="p-5 flex flex-col justify-start bg-white border border-slate-200/80 rounded-2xl shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg font-bold mb-3 shrink-0">
                    <i className={`bi ${pillar.icon}`} />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1.5 font-heading">{pillar.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pillar.text}</p>
                </TiltCard>
              ))}
            </div>

            {/* Languages & Availability Banner */}
            <div className="glass-card rounded-2xl p-5 bg-white border border-slate-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">{t('about.languages')}</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">{t('about.langEnglish')}</span>
                  <span className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">{t('about.langNative')}</span>
                  <span className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">{t('about.langGerman')}</span>
                  <span className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">{t('about.langFrench')}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-purple-600">
                <i className="bi bi-calendar-event text-sm" />
                <span>{t('about.availability')}</span>
              </div>
            </div>
          </motion.div>

          {/* Future Focus (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-slate-200/80 pb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold shrink-0">
                <i className="bi bi-compass-fill" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900">{t('about.futureTitle')}</h3>
            </div>

            <div className="space-y-4 flex-1 flex flex-col justify-between">
              {goals.map((goal) => (
                <TiltCard key={goal.title} className="p-5 flex items-start gap-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-base font-bold shrink-0 mt-0.5">
                    <i className={`bi ${goal.icon}`} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1 font-heading">{goal.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{goal.text}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
