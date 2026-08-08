import { useEffect, useRef, useState } from 'react';
import { useInView, motion } from 'framer-motion';

export default function StatCounter({ targetValue, prefix = '', suffix = '', label, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    const duration = 1600; // ms
    const target = parseFloat(targetValue);
    const startTime = performance.now() + delay * 600;

    let animationFrame;

    const updateCount = (currentTime) => {
      if (currentTime < startTime) {
        animationFrame = requestAnimationFrame(updateCount);
        return;
      }

      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutProgress * target);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, targetValue, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 25, rotateX: 10 }}
      transition={{ duration: 0.5, delay: delay * 0.1, ease: 'easeOut' }}
      style={{ perspective: 1000 }}
      className="glass-card-hover rounded-2xl p-6 text-center border border-slate-200/80 bg-white shadow-xs hover:shadow-lg transition-all"
    >
      <div className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 mb-1.5 tracking-tight">
        <span className="text-purple-600 font-extrabold">{prefix}</span>
        <span>{count}</span>
        <span className="text-purple-600 font-extrabold">{suffix}</span>
      </div>
      <div className="text-xs font-bold text-slate-500 tracking-wider uppercase font-heading">{label}</div>
    </motion.div>
  );
}
