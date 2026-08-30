import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useGnomeStore } from '../../store/useGnomeStore';

// High-fidelity continuous cursive "hello" stroke path matching the iconic Apple/Ubuntu script
const HELLO_CALLIGRAPHY_PATH =
  'M 40,155 ' +
  // 'h' - ascender loop & downstroke
  'C 60,120 75,55 92,20 ' +
  'C 105,-5 98,45 88,110 ' +
  'C 78,160 74,185 74,185 ' +
  // 'h' - hump & arch
  'C 74,185 98,115 125,102 ' +
  'C 145,92 152,112 144,145 ' +
  'C 136,178 132,185 132,185 ' +
  // 'e' - loop sweep
  'C 132,185 160,165 178,128 ' +
  'C 194,95 186,118 174,136 ' +
  'C 160,156 156,182 178,185 ' +
  'C 196,186 210,162 216,148 ' +
  // 'l' (first) - tall loop
  'C 216,148 238,85 252,32 ' +
  'C 264,-2 254,42 242,112 ' +
  'C 232,160 228,185 242,185 ' +
  'C 255,185 270,155 280,128 ' +
  // 'l' (second) - tall loop
  'C 280,128 300,70 314,30 ' +
  'C 326,-4 316,42 304,112 ' +
  'C 294,160 292,185 306,185 ' +
  'C 320,185 338,155 352,126 ' +
  // 'o' - counter-clockwise oval and exit flick
  'C 352,126 376,96 400,100 ' +
  'C 426,104 428,155 410,176 ' +
  'C 388,198 362,176 375,134 ' +
  'C 384,106 410,96 424,105 ' +
  'C 436,114 446,120 460,112';

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

  // Reduced motion: static subtle watermark
  if (prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-2"
        style={{ opacity: hasVisibleWindows ? 0.04 : 0.25 }}
      >
        <svg
          viewBox="0 0 500 240"
          xmlns="http://www.w3.org/2000/svg"
          className="w-72 sm:w-96 md:w-[460px] lg:w-[540px] xl:w-[620px] max-w-[80vw]"
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
      animate={{ opacity: hasVisibleWindows ? 0.04 : 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="flex flex-col items-center justify-center relative">
        <svg
          viewBox="0 0 500 240"
          xmlns="http://www.w3.org/2000/svg"
          className="w-72 sm:w-96 md:w-[460px] lg:w-[540px] xl:w-[620px] max-w-[80vw] overflow-visible"
          aria-hidden="true"
        >
          <defs>
            {/* Subtle bright gradient */}
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#f3f4f6" stopOpacity="0.9" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.95" />
            </linearGradient>

            {/* Soft luminous ambient glow */}
            <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Continuous Animated Calligraphy Path (Draw Start to End in Loop) */}
          <motion.path
            d={HELLO_CALLIGRAPHY_PATH}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${glowFilterId})`}
            initial={{ pathLength: 0, opacity: 0.05 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0.05, 0.45, 0.45, 0.05],
            }}
            transition={{
              duration: 7,
              times: [0, 0.42, 0.78, 1],
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 1.2,
            }}
          />
        </svg>

        {/* Signature Bottom Text: "I'm Yash" */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: [0, 0.85, 0.85, 0],
            y: [8, 0, 0, 8],
          }}
          transition={{
            duration: 7,
            times: [0.2, 0.45, 0.8, 1],
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 1.2,
          }}
          className="mt-1 sm:mt-2 text-center"
        >
          <span
            className="text-sm sm:text-base md:text-lg font-semibold tracking-widest font-heading drop-shadow-md px-3 py-0.5 rounded-full"
            style={{
              color: '#ffffff',
              textShadow: `0 0 16px ${accentColor}88, 0 2px 4px rgba(0,0,0,0.5)`,
              letterSpacing: '0.15em',
            }}
          >
            I'm Yash
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};
