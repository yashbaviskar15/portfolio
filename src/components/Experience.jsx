import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Experience() {
  const { t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState(0);

  const roadmap = [
    {
      type: 'edu',
      period: '2023 – 2026',
      title: t('education.bcaTitle'),
      institution: t('education.bcaInst'),
      grade: t('education.bcaGrade'),
      details: [
        t('education.bcaDetail1'),
        t('education.bcaDetail2'),
      ]
    },
    {
      type: 'edu',
      period: '2022 – 2023',
      title: t('education.hscTitle'),
      institution: t('education.hscInst'),
      grade: t('education.hscGrade'),
      details: [
        t('education.hscDetail1'),
      ]
    },
    {
      type: 'community',
      period: 'Ongoing',
      title: t('education.communityTitle'),
      institution: t('education.communityInst'),
      grade: t('education.communityGrade'),
      details: [
        t('education.communityDetail1'),
        t('education.communityDetail2'),
      ]
    }
  ];

  const toggle = (idx) => {
    setExpandedIndex(expandedIndex === idx ? -1 : idx);
  };

  return (
    <section id="experience" className="py-24 sm:py-32 bg-[#F8FAF9] border-y border-slate-200/60 relative scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
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
            <i className="bi bi-clock-history" />
            <span>{t('education.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            {t('education.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('education.subtitle')}
          </p>
        </motion.div>

        {/* Timeline Layout with Alternating Side Organic Reveals */}
        <div className="relative border-l-2 border-purple-200/70 pl-6 sm:pl-10 space-y-8 ml-4 sm:ml-8">
          {roadmap.map((item, index) => {
            const isExpanded = expandedIndex === index;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: isEven ? -35 : 35, rotateX: 6 }}
                whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                viewport={{ once: false, margin: '-40px' }}
                transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{ perspective: 1000 }}
                className="relative"
              >
                {/* Timeline Icon Node */}
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className={`absolute -left-[37px] sm:-left-[53px] top-1.5 w-10 h-10 rounded-full bg-white border-2 shadow-sm flex items-center justify-center font-bold transition-all duration-300 ${
                    isExpanded
                      ? 'border-purple-600 text-purple-600 scale-110 shadow-purple-500/20'
                      : 'border-slate-300 text-slate-400 hover:border-purple-400 hover:text-purple-500'
                  }`}
                  title="Click to toggle details"
                >
                  <i className={`bi ${item.type === 'edu' ? 'bi-mortarboard-fill' : 'bi-people-fill'}`} />
                </button>

                {/* Timeline Card */}
                <div
                  className={`glass-card-hover rounded-3xl overflow-hidden bg-white border transition-all duration-300 ${
                    isExpanded ? 'border-purple-300/80 shadow-md ring-1 ring-purple-100' : 'border-slate-200/80 shadow-xs'
                  }`}
                >
                  {/* Card Header (Always Visible) */}
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full text-left p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-bold font-heading border border-purple-100">
                          {item.period}
                        </span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold">
                          {item.grade}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 leading-snug">
                        {item.title}
                      </h3>
                      <h4 className="text-sm font-medium text-slate-500">
                        {item.institution}
                      </h4>
                    </div>

                    {/* Expand Chevron Icon */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 self-start sm:self-center"
                    >
                      <i className="bi bi-chevron-down text-sm" />
                    </motion.div>
                  </button>

                  {/* Expandable Details Drawer */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <ul className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-3 border-t border-slate-100 pt-4">
                          {item.details.map((detail, dIdx) => (
                            <motion.li
                              key={dIdx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: dIdx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                              className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 leading-relaxed"
                            >
                              <i className="bi bi-check-circle-fill text-purple-600 text-sm shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
