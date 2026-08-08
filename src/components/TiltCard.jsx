import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function TiltCard({ children, className = '', ...props }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle natural tilt (max 2.5deg) - feels crafted, not exaggerated
    const rotateX = ((y - centerY) / centerY) * -2.5;
    const rotateY = ((x - centerX) / centerX) * 2.5;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 25 }}
      whileHover={{ y: -4 }}
      className={`bg-white rounded-2xl relative overflow-hidden transition-all duration-300 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-purple-300/80 ${className}`}
      {...props}
    >
      <div className="absolute -right-10 -top-10 w-36 h-36 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-transparent rounded-full blur-xl pointer-events-none" />
      {children}
    </motion.div>
  );
}
