import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingStages = [
  'Initializing Cloud Infrastructure...',
  'Provisioning Terraform & AWS Modules...',
  'Configuring Kubernetes & Docker Services...',
  'Connecting Observability & Metrics...',
  'Loading Multi-Language Engine...',
  'Portfolio Environment Ready',
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8 + 4);
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setStageIndex(loadingStages.length - 1);
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => onComplete?.(), 450);
        }, 350);
      } else {
        setProgress(current);
        const stage = Math.min(
          Math.floor((current / 100) * loadingStages.length),
          loadingStages.length - 2
        );
        setStageIndex(stage);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.98,
            y: -15,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          {/* Ambient Background Grid Pattern */}
          <div className="absolute inset-0 subtle-grid-pattern opacity-40 pointer-events-none" />

          {/* Ambient Soft Glow Spot */}
          <div className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-purple-200/30 via-violet-100/20 to-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 space-y-6 text-center">
            {/* Center Brand Monogram with Pulsing Rings */}
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-24 h-24 rounded-3xl bg-purple-100/80 -z-10"
              />
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute w-20 h-20 rounded-3xl border border-dashed border-purple-300/80 -z-10"
              />

              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-center relative overflow-hidden">
                <img
                  src="/favicon.png"
                  alt="Yash Baviskar"
                  className="w-11 h-11 rounded-xl object-cover"
                />
              </div>
            </div>

            {/* Title & Identity */}
            <div className="space-y-1.5">
              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg sm:text-xl font-extrabold font-heading text-slate-900 tracking-tight"
              >
                Yash Baviskar
              </motion.h3>
              <p className="text-xs font-bold font-mono text-purple-600 tracking-widest uppercase">
                Cloud Engineer & DevOps
              </p>
            </div>

            {/* High-Precision Progress Bar & Counter */}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-600 px-0.5">
                <span className="text-[11px] text-slate-400 font-sans truncate max-w-[200px] text-left">
                  {loadingStages[stageIndex]}
                </span>
                <span className="text-purple-600 font-bold">{progress}%</span>
              </div>

              {/* White Progress Track with Shimmer Fill */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/70 p-0.5 shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 rounded-full relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                >
                  <div className="absolute inset-0 skeleton-shimmer opacity-40 rounded-full" />
                </motion.div>
              </div>
            </div>

            {/* Tech Badges Row */}
            <div className="flex items-center justify-center flex-wrap gap-1.5 pt-2">
              {['AWS Cloud', 'Terraform', 'Docker & K8s', 'CI/CD Pipelines'].map((badge) => (
                <span
                  key={badge}
                  className="px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-50 rounded-full border border-slate-200/80"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
