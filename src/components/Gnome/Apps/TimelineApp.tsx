import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, FolderGit2, CheckCircle2, Clock, Calendar, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useGnomeStore } from '../../../store/useGnomeStore';

export const TimelineApp: React.FC = () => {
  const { themeMode, accentColor, t } = useGnomeStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const strings = t();
  const milestones = strings.timeline.milestones || [];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={`p-6 space-y-4 ${themeMode === 'dark' ? 'bg-[#1a1a1a]' : 'bg-neutral-100'}`}>
        <div className="h-7 w-44 rounded-lg bg-neutral-800 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-2xl bg-neutral-800/60 animate-pulse border border-white/5" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full p-4 sm:p-6 space-y-6 select-text pb-20 ${
        themeMode === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
      }`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <h2
            className={`text-lg sm:text-xl font-extrabold font-heading ${
              themeMode === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}
          >
            {strings.timeline.title}
          </h2>
          <p className="text-xs text-neutral-400 font-mono mt-0.5">
            {strings.timeline.subtitle}
          </p>
        </div>
        <span
          className="px-3 py-1 rounded-full text-xs font-mono font-bold border"
          style={{
            color: accentColor,
            borderColor: `${accentColor}40`,
            backgroundColor: `${accentColor}15`,
          }}
        >
          {strings.timeline.periodBadge}
        </span>
      </div>

      {/* Chronological Milestone Stream */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-orange-500/30 space-y-8 my-2">
        {milestones.map((m, idx) => (
          <motion.div
            key={m.title + idx}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="relative space-y-2"
          >
            {/* Timeline Dot with Pulse Indicator */}
            <div
              className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full border-2 border-neutral-900 shadow-md flex items-center justify-center"
              style={{ backgroundColor: accentColor }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping opacity-75" />
            </div>

            {/* Card Content */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                themeMode === 'dark'
                  ? 'bg-neutral-900/80 border-white/10 shadow-lg'
                  : 'bg-white border-neutral-300 shadow-sm'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-orange-600/20 text-orange-400 border border-orange-500/30 inline-block mb-1">
                    {m.year}
                  </span>
                  <h3
                    className={`text-sm sm:text-base font-bold ${
                      themeMode === 'dark' ? 'text-white' : 'text-neutral-900'
                    }`}
                  >
                    {m.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">{m.subtitle}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-white/10 font-mono">
                  {m.category}
                </span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">{m.desc}</p>

              {/* Key Bullet Points */}
              <ul className="space-y-1.5 text-xs text-neutral-400 border-t border-white/10 pt-2.5">
                {m.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
