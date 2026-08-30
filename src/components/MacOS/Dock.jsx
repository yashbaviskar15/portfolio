import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Dock({ openWindows = {}, onOpenWindow, onToggleControlCenter }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const dockApps = [
    {
      id: 'projects',
      label: 'Finder / Projects',
      icon: 'bi-folder2-open',
      gradient: 'from-blue-500 to-indigo-600',
      action: () => onOpenWindow('projects'),
      isOpen: !!openWindows['projects'],
    },
    {
      id: 'terminal',
      label: 'Terminal',
      icon: 'bi-terminal-fill',
      gradient: 'from-slate-800 to-slate-950',
      action: () => onOpenWindow('terminal'),
      isOpen: !!openWindows['terminal'],
    },
    {
      id: 'contact',
      label: 'Mail / Contact',
      icon: 'bi-envelope-fill',
      gradient: 'from-sky-500 to-blue-600',
      action: () => onOpenWindow('contact'),
      isOpen: !!openWindows['contact'],
    },
    {
      id: 'github',
      label: 'GitHub Profile',
      icon: 'bi-github',
      gradient: 'from-neutral-800 to-black',
      action: () => window.open('https://github.com/yashbaviskar15', '_blank'),
      isExternal: true,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: 'bi-linkedin',
      gradient: 'from-blue-600 to-blue-800',
      action: () => window.open('https://linkedin.com/in/yashbaviskar15', '_blank'),
      isExternal: true,
    },
    {
      id: 'resume',
      label: 'Resume (PDF)',
      icon: 'bi-file-earmark-pdf-fill',
      gradient: 'from-rose-500 to-red-700',
      action: () => onOpenWindow('resume'),
      isOpen: !!openWindows['resume'],
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: 'bi-gear-fill',
      gradient: 'from-slate-600 to-slate-800',
      action: () => onToggleControlCenter(),
    },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 select-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-end gap-2.5 sm:gap-3.5 px-3.5 py-2.5 rounded-2xl glass-dock border border-white/25 shadow-2xl backdrop-blur-2xl"
      >
        {dockApps.map((app, idx) => {
          // Calculate scale based on proximity to hovered item
          let scale = 1;
          let yOffset = 0;

          if (hoveredIdx !== null) {
            const distance = Math.abs(hoveredIdx - idx);
            if (distance === 0) {
              scale = 1.38;
              yOffset = -10;
            } else if (distance === 1) {
              scale = 1.18;
              yOffset = -5;
            }
          }

          return (
            <div
              key={app.id}
              className="relative flex flex-col items-center group cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={app.action}
            >
              {/* Tooltip Label */}
              <div
                className={`absolute -top-10 px-2.5 py-1 rounded-lg glass-window text-[11px] font-medium text-white shadow-xl pointer-events-none whitespace-nowrap border border-white/20 transition-all duration-150 ${
                  hoveredIdx === idx ? 'opacity-100 scale-100 -translate-y-1' : 'opacity-0 scale-90 translate-y-2'
                }`}
              >
                {app.label}
              </div>

              {/* App Icon Tile */}
              <motion.div
                animate={{ scale, y: yOffset }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-white text-xl sm:text-2xl shadow-lg border border-white/25 relative overflow-hidden transition-shadow group-hover:shadow-cyan-500/20 group-hover:shadow-xl active:scale-95`}
              >
                {/* Gloss reflection shine */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent pointer-events-none" />
                <i className={`bi ${app.icon} drop-shadow-md`} />
              </motion.div>

              {/* Active Indicator Dot */}
              <div className="h-1.5 flex items-center justify-center mt-1">
                {app.isOpen ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
