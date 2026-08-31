import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useGnomeStore } from '../../store/useGnomeStore';

// High-fidelity continuous cursive "hello" stroke path matching the iconic Apple script
const HELLO_CALLIGRAPHY_PATH =
  'M 45,150 ' +
  // 'h' - ascender loop & downstroke
  'C 62,118 78,55 94,22 ' +
  'C 106,-2 98,45 88,110 ' +
  'C 78,158 74,182 74,182 ' +
  // 'h' - hump & arch
  'C 74,182 98,115 125,102 ' +
  'C 145,92 152,112 144,145 ' +
  'C 136,178 132,182 132,182 ' +
  // 'e' - loop sweep
  'C 132,182 158,162 176,128 ' +
  'C 192,95 184,118 172,136 ' +
  'C 158,156 156,182 178,182 ' +
  'C 196,182 210,160 216,148 ' +
  // 'l' (first) - tall loop
  'C 216,148 238,85 252,32 ' +
  'C 264,-2 254,42 242,112 ' +
  'C 232,158 228,182 242,182 ' +
  'C 255,182 270,155 280,128 ' +
  // 'l' (second) - tall loop
  'C 280,128 300,70 314,30 ' +
  'C 326,-4 316,42 304,112 ' +
  'C 294,158 292,182 306,182 ' +
  'C 320,182 338,155 352,126 ' +
  // 'o' - counter-clockwise oval and top connector flick
  'C 368,98 392,96 408,105 ' +
  'C 426,116 428,155 412,174 ' +
  'C 394,194 366,178 376,138 ' +
  'C 384,106 408,98 424,106 ' +
  'C 438,114 452,118 472,110';

export const DesktopSignature: React.FC = () => {
  const { windows, accentColor, themeMode } = useGnomeStore();
  const prefersReducedMotion = useReducedMotion();

  // Check if any active window is open on the desktop
  const hasVisibleWindows = useMemo(
    () => windows.some((w) => w.isOpen && !w.isMinimized),
    [windows]
  );

  const gradientId = 'desktop-calligraphy-grad';
  const glowFilterId = 'desktop-calligraphy-glow';

  // Reduced motion: static watermark
  if (prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-2"
        style={{ opacity: hasVisibleWindows ? 0.12 : 0.7 }}
      >
        <svg
          viewBox="0 0 520 220"
          xmlns="http://www.w3.org/2000/svg"
          className="w-64 sm:w-80 md:w-[440px] lg:w-[520px] max-w-[88vw]"
          aria-hidden="true"
        >
          <path
            d={HELLO_CALLIGRAPHY_PATH}
            fill="none"
            stroke={themeMode === 'dark' ? '#ffffff' : '#111827'}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="mt-2 text-sm sm:text-base font-semibold tracking-wider font-mono text-neutral-300">
          I'm Yash
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-2"
      animate={{ opacity: hasVisibleWindows ? 0.16 : 0.95 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="flex flex-col items-center justify-center relative">
        <svg
          viewBox="0 0 520 220"
          xmlns="http://www.w3.org/2000/svg"
          className="w-64 sm:w-80 md:w-[440px] lg:w-[520px] max-w-[88vw] overflow-visible"
          aria-hidden="true"
        >
          <defs>
            {/* Subtle luminous gradient */}
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="60%" stopColor="#f3f4f6" stopOpacity="0.95" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="1" />
            </linearGradient>

            {/* Soft luminous ambient glow */}
            <filter id={glowFilterId} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Continuous cursive "hello" stroke - draws smoothly on spawn and stays complete */}
          <motion.path
            d={HELLO_CALLIGRAPHY_PATH}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${glowFilterId})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0.75, 1, 0.75],
            }}
            transition={{
              pathLength: { duration: 2.2, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 4, ease: 'easeInOut', repeat: Infinity, delay: 2.2 },
            }}
          />
        </svg>

        {/* Signature Bottom Text: "I'm Yash" */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.2,
            delay: 1.4,
            ease: 'easeOut',
          }}
          className="mt-1 sm:mt-2 text-center"
        >
          <span
            className="text-base sm:text-lg md:text-xl font-bold tracking-widest font-heading drop-shadow-lg px-4 py-0.5 rounded-full"
            style={{
              color: '#ffffff',
              textShadow: `0 0 20px ${accentColor}aa, 0 2px 6px rgba(0,0,0,0.7)`,
              letterSpacing: '0.18em',
            }}
          >
            I'm Yash
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};
