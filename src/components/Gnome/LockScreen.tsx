import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Wifi, Battery, Volume2, Sparkles, ChevronUp } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
  onOpenRecruiterView: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock, onOpenRecruiterView }) => {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
      setDateStr(
        now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleKeyDown = (e: KeyboardEvent) => {
      onUnlock();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onUnlock]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      onClick={onUnlock}
      className="fixed inset-0 z-[160] bg-black/85 backdrop-blur-xl text-white flex flex-col justify-between p-6 sm:p-12 select-none cursor-pointer font-sans"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-xs text-neutral-300">
        <div className="flex items-center gap-2 font-mono">
          <Lock className="w-3.5 h-3.5 text-orange-400" />
          <span>YashOS 24.04 LTS (Locked)</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onUnlock();
              onOpenRecruiterView();
            }}
            className="px-3 py-1 rounded-full bg-orange-600/30 hover:bg-orange-600/50 text-orange-300 border border-orange-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recruiter Mode</span>
          </button>
          <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          <Battery className="w-3.5 h-3.5 text-emerald-400" />
        </div>
      </div>

      {/* Center Clock & Date */}
      <div className="text-center space-y-3 my-auto">
        <h1 className="text-6xl sm:text-8xl font-thin tracking-tight font-heading drop-shadow-lg">
          {timeStr || '08:45'}
        </h1>
        <p className="text-lg sm:text-2xl text-neutral-300 font-light font-sans">
          {dateStr || 'Tuesday, April 24'}
        </p>
      </div>

      {/* Bottom Hint */}
      <div className="flex flex-col items-center gap-2 text-center text-xs text-neutral-400">
        <ChevronUp className="w-4 h-4 animate-bounce text-orange-400" />
        <p className="font-mono">Click anywhere or press any key to unlock</p>
      </div>
    </motion.div>
  );
};
