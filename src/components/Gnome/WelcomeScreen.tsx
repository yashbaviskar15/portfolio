import React, { useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Terminal, Shield, Sparkles } from 'lucide-react';
import { useGnomeStore } from '../../store/useGnomeStore';
import { welcomeButtonVariants } from '../../lib/animations';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const { setHasSeenWelcome, accentColor } = useGnomeStore();
  const shouldReduceMotion = useReducedMotion();

  const handleEnter = useCallback(() => {
    setHasSeenWelcome(true);
    onEnter();
  }, [setHasSeenWelcome, onEnter]);

  // Keyboard Access: Enter or Space triggers entry
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleEnter]);

  const greetingWords = ["Hello,", "I'm", "Yash", "Baviskar"];

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: shouldReduceMotion ? 1 : 1.05,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#2c001e] via-[#1a0826] to-[#0d1322] text-white select-none overflow-hidden font-sans"
    >
      {/* Background Ambient Ubuntu Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-600/15 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-700/20 blur-3xl" />
      </div>

      {/* Main Glassmorphic Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 max-w-lg w-full flex flex-col items-center text-center space-y-6 p-8 sm:p-10 rounded-3xl bg-neutral-950/80 border border-white/15 shadow-2xl backdrop-blur-2xl"
      >
        {/* Strictly Photo-Free Initials-in-Gradient Avatar ("YB") */}
        <div className="relative">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(233,84,32,0.4)] border-2 shrink-0 select-none"
            style={{
              background: 'linear-gradient(135deg, #77216f 0%, #e95420 100%)',
              borderColor: accentColor,
            }}
          >
            <span className="font-extrabold text-3xl font-mono tracking-tight drop-shadow-md">
              YB
            </span>
          </div>
          <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-orange-600 text-white text-[10px] font-mono font-bold shadow-md">
            Ubuntu 24.04
          </span>
        </div>

        {/* Animated Greeting Title: Word-by-Word Reveal */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-heading flex flex-wrap items-center justify-center gap-2">
            {greetingWords.map((word, idx) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: shouldReduceMotion ? 0 : 0.1 + idx * 0.07,
                  ease: 'easeOut',
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed">
            Welcome to my interactive portfolio — built like a modern Linux GNOME workstation.
          </p>
        </div>

        {/* Enter Desktop Button with Continuous Pulsing Scale */}
        <div className="w-full pt-2 flex flex-col items-center space-y-3">
          <motion.button
            type="button"
            onClick={handleEnter}
            variants={shouldReduceMotion ? {} : welcomeButtonVariants}
            initial="idle"
            animate="pulse"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full py-3.5 px-6 rounded-2xl text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl transition-all cursor-pointer group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/50"
            style={{ backgroundColor: accentColor }}
          >
            <span>Enter Desktop</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Keyboard Hint */}
          <p className="text-[11px] text-neutral-400 font-mono">
            Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-white/10 text-neutral-200">Enter</kbd> or click to continue
          </p>
        </div>
      </motion.div>

      {/* Bottom Footer */}
      <div className="absolute bottom-6 text-center text-xs text-neutral-500 font-mono">
        Yash Baviskar • Cloud & DevOps Engineer
      </div>
    </motion.div>
  );
};
