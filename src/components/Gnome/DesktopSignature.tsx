import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useGnomeStore } from '../../store/useGnomeStore';

// Exact continuous calligraphy "hello" stroke path from https://yashbaviskar.vercel.app/
const EXACT_HELLO_PATH =
  'M-293.58-104.62S-103.61-205.49-60-366.25c9.13-32.45,9-58.31,0-74-10.72-18.82-49.69-33.21-75.55,31.94-27.82,70.11-52.22,377.24-44.11,322.48s34-176.24,99.89-183.19c37.66-4,49.55,23.58,52.83,47.92a117.06,117.06,0,0,1-3,45.32c-7.17,27.28-20.47,97.67,33.51,96.86,66.93-1,131.91-53.89,159.55-84.49,31.1-36.17,31.1-70.64,19.27-90.25-16.74-29.92-69.47-33-92.79,16.73C62.78-179.86,98.7-93.8,159-81.63S302.7-99.55,393.3-269.92c29.86-58.16,52.85-114.71,46.14-150.08-7.44-39.21-59.74-54.5-92.87-8.7-47,65-61.78,266.62-34.74,308.53S416.62-58,481.52-130.31s133.2-188.56,146.54-256.23c14-71.15-56.94-94.64-88.4-47.32C500.53-375,467.58-229.49,503.3-127a73.73,73.73,0,0,0,23.43,33.67c25.49,20.23,55.1,16,77.46,6.32a111.25,111.25,0,0,0,30.44-19.87c37.73-34.23,29-36.71,64.58-127.53C724-284.3,785-298.63,821-259.13a71,71,0,0,1,13.69,22.56c17.68,46,6.81,80-6.81,107.89-12,24.62-34.56,42.72-61.45,47.91-23.06,4.45-48.37-.35-66.48-24.27a78.88,78.88,0,0,1-12.66-25.8c-14.75-51,4.14-88.76,11-101.41,6.18-11.39,37.26-69.61,103.42-42.24,55.71,23.05,100.66-23.31,100.66-23.31';

export const DesktopSignature: React.FC = () => {
  const { windows, accentColor } = useGnomeStore();
  const prefersReducedMotion = useReducedMotion();

  // Check if any active window is open on the desktop
  const hasVisibleWindows = useMemo(
    () => windows.some((w) => w.isOpen && !w.isMinimized),
    [windows]
  );

  const gradientId = 'desktop-exact-hello-grad';

  // Reduced motion: static crisp watermark
  if (prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-2"
        style={{ opacity: hasVisibleWindows ? 0.12 : 0.9 }}
      >
        <svg
          viewBox="0 0 1230.94 414.57"
          xmlns="http://www.w3.org/2000/svg"
          className="w-48 sm:w-64 md:w-80 lg:w-[400px] max-w-[65vw] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
          aria-hidden="true"
        >
          <path
            d={EXACT_HELLO_PATH}
            transform="translate(311.08 476.02)"
            fill="none"
            stroke="#ffffff"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p
          className="mt-2 text-xl sm:text-2xl md:text-3xl italic text-white/90 select-none"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          I'm Yash.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-2"
      animate={{ opacity: hasVisibleWindows ? 0.14 : 0.95 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="flex flex-col items-center justify-center relative px-4 text-center max-w-[85vw]">
        {/* Exact Apple-style continuous cursive "hello" stroke in infinite loop */}
        <svg
          viewBox="0 0 1230.94 414.57"
          xmlns="http://www.w3.org/2000/svg"
          className="w-48 sm:w-64 md:w-80 lg:w-[400px] max-w-[65vw] overflow-visible drop-shadow-[0_6px_22px_rgba(0,0,0,0.85)]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="65%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor={accentColor || '#e95420'} stopOpacity="1" />
            </linearGradient>
          </defs>

          <motion.path
            d={EXACT_HELLO_PATH}
            transform="translate(311.08 476.02)"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.1 }}
            animate={{
              pathLength: [0, 0, 1, 1, 1, 0],
              opacity: [0.1, 1, 1, 1, 0.15, 0.1],
            }}
            transition={{
              duration: 6.5,
              times: [0, 0.12, 0.65, 0.88, 0.98, 1],
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 0.6,
            }}
          />
        </svg>

        {/* Next line: "I'm Yash." only */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: [0, 0, 1, 1, 0, 0],
            y: [8, 8, 0, 0, 8, 8],
          }}
          transition={{
            duration: 6.5,
            times: [0, 0.45, 0.65, 0.88, 0.98, 1],
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 0.6,
          }}
          className="mt-1.5 sm:mt-2 text-xl sm:text-2xl md:text-3xl italic text-white/90 select-none tracking-wide"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            textShadow: '0 3px 14px rgba(0,0,0,0.85), 0 0 20px rgba(233,84,32,0.3)',
          }}
        >
          I'm Yash.
        </motion.p>
      </div>
    </motion.div>
  );
};
