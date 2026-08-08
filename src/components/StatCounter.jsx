import { useEffect, useRef, useState } from 'react';
import { useInView, motion } from 'framer-motion';

export default function StatCounter({ targetValue, prefix = '', suffix = '', label, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) {
      setDisplayValue('0');
      return;
    }

    const duration = 1400; // ms
    const target = parseFloat(targetValue);
    const isDecimal = String(targetValue).includes('.');
    const decimalPlaces = isDecimal ? String(targetValue).split('.')[1].length : 0;
    const startTime = performance.now() + delay * 400;

    let animationFrame;

    const updateCount = (currentTime) => {
      if (currentTime < startTime) {
        animationFrame = requestAnimationFrame(updateCount);
        return;
      }

      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeOutProgress * target;

      if (isDecimal) {
        setDisplayValue(currentVal.toFixed(decimalPlaces));
      } else {
        setDisplayValue(String(Math.floor(currentVal)));
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(String(targetValue));
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, targetValue, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.45, delay: delay * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="rounded-2xl p-5 text-center border border-slate-200/90 bg-white shadow-2xs hover:shadow-md hover:border-purple-200 transition-all"
    >
      <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900 mb-1 tracking-tight">
        <span className="text-purple-600 font-extrabold">{prefix}</span>
        <span>{displayValue}</span>
        <span className="text-purple-600 font-extrabold">{suffix}</span>
      </div>
      <div className="text-[11px] sm:text-xs font-bold text-slate-500 tracking-wider uppercase font-heading">
        {label}
      </div>
    </motion.div>
  );
}
