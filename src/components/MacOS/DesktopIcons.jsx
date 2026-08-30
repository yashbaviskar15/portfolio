import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function DesktopIcons({ onOpenWindow }) {
  const [selectedId, setSelectedId] = useState(null);

  const icons = [
    {
      id: 'projects',
      label: 'Projects',
      iconType: 'folder',
      badgeIcon: 'bi-grid-fill',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'resume',
      label: 'Resume.pdf',
      iconType: 'pdf',
      badgeIcon: 'bi-filetype-pdf',
      color: 'from-rose-500 to-red-600',
    },
    {
      id: 'certifications',
      label: 'Certifications',
      iconType: 'folder',
      badgeIcon: 'bi-patch-check-fill',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'skills',
      label: 'Skills.sh',
      iconType: 'script',
      badgeIcon: 'bi-terminal-fill',
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 'experience',
      label: 'Experience',
      iconType: 'folder',
      badgeIcon: 'bi-mortarboard-fill',
      color: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <div className="absolute top-12 left-4 sm:left-6 flex flex-col gap-4 sm:gap-6 z-10 select-none">
      {icons.map((item, idx) => {
        const isSelected = selectedId === item.id;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.06 }}
            onClick={() => setSelectedId(item.id)}
            onDoubleClick={() => onOpenWindow(item.id)}
            className="flex flex-col items-center group cursor-pointer w-20 sm:w-22"
          >
            {/* Icon Graphic */}
            <div
              onClick={() => onOpenWindow(item.id)}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center relative transition-all duration-200 group-hover:scale-108 active:scale-95 ${
                isSelected
                  ? 'ring-2 ring-blue-400 bg-white/20 shadow-lg shadow-blue-500/20'
                  : 'bg-white/10 group-hover:bg-white/15'
              } border border-white/20 backdrop-blur-md shadow-md`}
            >
              {item.iconType === 'folder' && (
                <div className="relative flex items-center justify-center">
                  <i className="bi bi-folder-fill text-3xl sm:text-4xl text-sky-400 drop-shadow-md" />
                  <div className="absolute inset-0 flex items-center justify-center pt-1 text-[11px] text-white/90">
                    <i className={`bi ${item.badgeIcon}`} />
                  </div>
                </div>
              )}

              {item.iconType === 'pdf' && (
                <div className="flex flex-col items-center justify-center text-rose-400">
                  <i className="bi bi-file-earmark-pdf-fill text-3xl sm:text-4xl drop-shadow-md" />
                </div>
              )}

              {item.iconType === 'script' && (
                <div className="flex flex-col items-center justify-center text-amber-400">
                  <i className="bi bi-file-earmark-code-fill text-3xl sm:text-4xl drop-shadow-md" />
                </div>
              )}
            </div>

            {/* Centered White Text Label with Subtle Shadow */}
            <span
              className={`mt-1.5 px-2 py-0.5 text-[11.5px] sm:text-xs font-medium text-center text-white text-shadow-sm rounded max-w-[85px] truncate transition-colors ${
                isSelected ? 'bg-blue-600 text-white font-semibold' : 'group-hover:bg-black/30'
              }`}
            >
              {item.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
