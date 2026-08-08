import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Fast, clean, professional entrance (280ms)
    const timer = setTimeout(() => {
      setIsDone(true);
      setTimeout(() => onComplete?.(), 250);
    }, 280);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F8FAF9]"
        >
          <div className="flex flex-col items-center space-y-4 text-center">
            {/* Clean Monogram */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center"
            >
              <img
                src="/favicon.png"
                alt="Yash Baviskar"
                className="w-9 h-9 rounded-xl object-cover"
              />
            </motion.div>

            {/* Direct Name & Role */}
            <div className="space-y-1">
              <h3 className="text-base font-extrabold font-heading text-slate-900 tracking-tight">
                Yash Baviskar
              </h3>
              <p className="text-xs font-mono font-semibold text-purple-600 tracking-wider uppercase">
                Junior Cloud Engineer
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
