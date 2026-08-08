import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('interactive-hover')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden hidden md:block">
      {/* Soft Ambient Radial Glow Following Cursor */}
      <motion.div
        className="absolute rounded-full bg-gradient-to-tr from-indigo-500/10 via-violet-500/10 to-blue-500/10 blur-2xl pointer-events-none"
        animate={{
          x: mousePosition.x - (isHovered ? 120 : 80),
          y: mousePosition.y - (isHovered ? 120 : 80),
          width: isHovered ? 240 : 160,
          height: isHovered ? 240 : 160,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 200, mass: 0.5 }}
      />
    </div>
  );
}
