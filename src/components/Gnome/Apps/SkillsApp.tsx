import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Server, Terminal, Shield, Network, Zap, CheckCircle2 } from 'lucide-react';
import { useGnomeStore } from '../../../store/useGnomeStore';

export const SkillsApp: React.FC = () => {
  const { themeMode, accentColor, t } = useGnomeStore();
  const [key, setKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const strings = t();

  useEffect(() => {
    // Replay animation on mount / locale change
    setKey((prev) => prev + 1);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [strings]);

  const categoryIcons = [
    <Cloud key="cloud" className="w-4 h-4 text-orange-400" />,
    <Server key="server" className="w-4 h-4 text-emerald-400" />,
    <Zap key="zap" className="w-4 h-4 text-amber-400" />,
    <Network key="net" className="w-4 h-4 text-sky-400" />,
  ];

  if (isLoading) {
    return (
      <div className={`p-6 space-y-4 ${themeMode === 'dark' ? 'bg-[#1a1a1a]' : 'bg-neutral-100'}`}>
        <div className="h-7 w-44 rounded-lg bg-neutral-800 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 rounded-2xl bg-neutral-800/60 animate-pulse border border-white/5" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      key={key}
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
            {strings.skills.title}
          </h2>
          <p className="text-xs text-neutral-400 font-mono mt-0.5">
            {strings.skills.subtitle}
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
          {strings.skills.badge}
        </span>
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {strings.skills.groups.map((group, groupIdx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: groupIdx * 0.08, ease: 'easeOut' }}
            className={`p-4 sm:p-5 rounded-2xl border space-y-4 ${
              themeMode === 'dark'
                ? 'bg-neutral-900/80 border-white/10 shadow-lg'
                : 'bg-white border-neutral-300 shadow-sm'
            }`}
          >
            {/* Category Header */}
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-neutral-800 border border-white/10">
                {categoryIcons[groupIdx % categoryIcons.length]}
              </div>
              <h3
                className={`text-xs sm:text-sm font-bold ${
                  themeMode === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}
              >
                {group.category}
              </h3>
            </div>

            {/* Skill Bars */}
            <div className="space-y-3 pt-1">
              {group.skills.map((skill, sIdx) => (
                <div key={skill.name} className="space-y-1.5 font-sans">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="font-mono text-[11px] text-neutral-400">{skill.level}%</span>
                  </div>

                  {/* Animated SVG Progress Bar Track */}
                  <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{
                        duration: 0.85,
                        delay: 0.15 + sIdx * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, #77216f 0%, ${accentColor} 100%)`,
                      }}
                    />
                  </div>

                  {/* Skill Note / Focus */}
                  <p className="text-[10.5px] text-neutral-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                    <span>{skill.note}</span>
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
