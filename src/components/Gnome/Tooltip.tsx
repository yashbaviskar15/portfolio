import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TooltipProps {
  content: React.ReactNode;
  shortcut?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  delay?: number;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  shortcut,
  side = 'top',
  align = 'center',
  delay = 200,
  disabled = false,
  className = '',
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (disabled || !content) return;
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (disabled || !content) {
    return <>{children}</>;
  }

  // Positioning classes based on side and align
  const getPositionClasses = () => {
    switch (side) {
      case 'bottom':
        return align === 'start'
          ? 'top-[calc(100%+6px)] left-0'
          : align === 'end'
          ? 'top-[calc(100%+6px)] right-0'
          : 'top-[calc(100%+6px)] left-1/2 -translate-x-1/2';
      case 'left':
        return 'right-[calc(100%+6px)] top-1/2 -translate-y-1/2';
      case 'right':
        return 'left-[calc(100%+6px)] top-1/2 -translate-y-1/2';
      case 'top':
      default:
        return align === 'start'
          ? 'bottom-[calc(100%+6px)] left-0'
          : align === 'end'
          ? 'bottom-[calc(100%+6px)] right-0'
          : 'bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2';
    }
  };

  const getInitialOffset = () => {
    switch (side) {
      case 'bottom': return { y: -4, x: align === 'center' ? '-50%' : 0 };
      case 'left': return { x: 4, y: '-50%' };
      case 'right': return { x: -4, y: '-50%' };
      case 'top':
      default: return { y: 4, x: align === 'center' ? '-50%' : 0 };
    }
  };

  const getAnimateOffset = () => {
    switch (side) {
      case 'bottom':
      case 'top': return { y: 0, x: align === 'center' ? '-50%' : 0 };
      case 'left':
      case 'right': return { x: 0, y: '-50%' };
      default: return { y: 0, x: align === 'center' ? '-50%' : 0 };
    }
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, scale: 0.92, ...getInitialOffset() }}
            animate={{ opacity: 1, scale: 1, ...getAnimateOffset() }}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.1 } }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className={`absolute z-[99999] pointer-events-none select-none whitespace-nowrap px-2.5 py-1 rounded-md bg-[#18181b]/95 border border-white/15 text-neutral-100 text-[11px] font-medium shadow-[0_8px_24px_rgba(0,0,0,0.65)] backdrop-blur-md flex items-center gap-1.5 ${getPositionClasses()} ${className}`}
          >
            <span>{content}</span>
            {shortcut && (
              <kbd className="px-1 py-0.5 rounded bg-white/10 text-neutral-300 font-mono text-[9px] border border-white/10 tracking-tight leading-none">
                {shortcut}
              </kbd>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
