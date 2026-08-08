import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Experience() {
  const { t } = useLanguage();

  const timeline = [
    {
      period: '2023 – 2026',
      title: t('education.bcaTitle'),
      institution: t('education.bcaInst'),
      grade: t('education.bcaGrade', 'CGPA: 8.14 / 10.0'),
      badge: t('education.badge'),
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      details: [
        t('education.bcaDetail1'),
        t('education.bcaDetail2'),
      ],
    },
    {
      period: '2023 – Present',
      title: t('education.communityTitle'),
      institution: t('education.communityInst'),
      grade: t('education.communityGrade'),
      badge: 'Cloud & DevOps',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      details: [
        t('education.communityDetail1'),
        t('education.communityDetail2'),
      ],
    },
    {
      period: '2021 – 2023',
      title: t('education.hscTitle'),
      institution: t('education.hscInst'),
      grade: t('education.hscGrade'),
      badge: 'Pre-University',
      badgeBg: 'bg-slate-100 text-slate-700 border-slate-200',
      details: [
        t('education.hscDetail1'),
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 sm:py-28 relative bg-[#F8FAF9] border-t border-slate-200/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold tracking-wider uppercase font-heading">
            <i className="bi bi-mortarboard-fill" />
            <span>{t('education.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            {t('education.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('education.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-6">
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">{item.period}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeBg}`}>{item.badge}</span>
                </div>
                <span className="text-xs font-bold font-mono text-slate-800 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/70">{item.grade}</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">{item.institution}</p>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 pt-1">
                {item.details.map((detail, di) => (
                  <li key={di} className="flex items-start gap-2">
                    <i className="bi bi-check2-circle text-purple-600 text-sm mt-0.5 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
