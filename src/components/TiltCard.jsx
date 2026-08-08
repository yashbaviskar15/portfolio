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

    const rotateX = ((y - centerY) / centerY) * -7; // Max tilt 7deg
    const rotateY = ((x - centerX) / centerX) * 7;

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
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      whileHover={{ y: -6, scale: 1.015 }}
      className={`glass-card-hover rounded-2xl relative overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-purple-500/10 ${className}`}
      {...props}
    >
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
      {children}
    </motion.div>
  );
}
