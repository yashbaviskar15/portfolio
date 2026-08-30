import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ArrowRight, ArrowLeft, X, Check, Sparkles } from 'lucide-react';
import { useGnomeStore } from '../../store/useGnomeStore';
import { springPhysics } from '../../lib/animations';

interface TourStep {
  title: string;
  description: string;
  targetHint: string;
}

export const GuidedTour: React.FC = () => {
  const { isTourOpen, currentTourStep, nextTourStep, prevTourStep, endTour, themeMode, accentColor } = useGnomeStore();

  const tourSteps: TourStep[] = [
    {
      title: 'Welcome to Yash’s Linux Desktop',
      description: 'Explore an interactive personal portfolio built like a modern Ubuntu 24.04 LTS GNOME workstation.',
      targetHint: 'Desktop Center',
    },
    {
      title: 'Activities Overview & Search',
      description: 'Click "Activities" or press Super / Ctrl+Space to fuzzy search applications, cloud projects, and repos with cmdk.',
      targetHint: 'Top Bar (Left)',
    },
    {
      title: 'Ubuntu Launcher Dock',
      description: 'Hover to experience GNOME magnification and ripple physics. Click any app to launch with elastic spring bounce.',
      targetHint: 'Left Dock',
    },
    {
      title: 'Ubuntu Bash Terminal',
      description: 'Try typing help, projects, skills, curl cv, or tree into the interactive terminal shell with autocomplete.',
      targetHint: 'Terminal Window',
    },
    {
      title: 'Window Drag & 8-Direction Resize',
      description: 'Drag windows by the title bar or resize from any edge/corner handle with react-rnd. Double-click title bar to maximize.',
      targetHint: 'Window Chrome',
    },
    {
      title: 'Desktop Surface Icons',
      description: 'Use Up/Down arrow keys to navigate desktop icons with 3D mouse parallax and press Enter to launch.',
      targetHint: 'Desktop Surface',
    },
    {
      title: 'Conky System Monitor',
      description: 'Real-time simulated telemetry showing CPU cores, RAM consumption, and AWS Cloud Mesh latency.',
      targetHint: 'Right Widget',
    },
    {
      title: 'Alt + Tab Window Switcher',
      description: 'Hold Alt and press Tab to cycle through open window thumbnails and bring your selection to focus.',
      targetHint: 'Window Switcher',
    },
    {
      title: 'Projects Gallery',
      description: 'Browse real projects — click any card to expand details inline with accordion animations.',
      targetHint: 'Projects App',
    },
    {
      title: 'Skills Visualizer',
      description: 'Watch your skill bars animate — grouped by Cloud, DevOps, Monitoring, and Automation categories.',
      targetHint: 'Skills App',
    },
    {
      title: 'Experience Timeline',
      description: 'Scroll through experience and education as a self-drawing connected chronological timeline.',
      targetHint: 'Timeline App',
    },
    {
      title: 'Notification Center',
      description: 'Click the center date/time clock in the Top Bar to see recent system and deployment activity notifications.',
      targetHint: 'Top Bar (Center)',
    },
    {
      title: 'Quick Settings Flyout',
      description: 'Click the Wi-Fi/Volume/Battery cluster to adjust theme mode, accent colors, and volume without opening full Settings.',
      targetHint: 'Top Bar (Right)',
    },
    {
      title: 'Wallpaper Switcher',
      description: 'Right-click anywhere on the desktop to change your background gradient presets with smooth cross-fades.',
      targetHint: 'Context Menu',
    },
    {
      title: 'Keyboard Shortcuts Parity',
      description: 'Press ? at any time to open the full GNOME keyboard shortcuts cheat sheet.',
      targetHint: 'Shortcuts Modal',
    },
  ];

  // Keyboard navigation for guided tour
  useEffect(() => {
    if (!isTourOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        endTour();
      } else if (e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault();
        nextTourStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevTourStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTourOpen, nextTourStep, prevTourStep, endTour]);

  if (!isTourOpen) return null;

  const currentStepData = tourSteps[currentTourStep] || tourSteps[0];
  const isLastStep = currentTourStep === tourSteps.length - 1;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-80 pointer-events-none flex items-end sm:items-center justify-center p-4 sm:p-6 select-none font-sans">
        {/* Backdrop Tint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-xs pointer-events-auto"
          onClick={endTour}
        />

        {/* Floating Tour Step Card */}
        <motion.div
          key={currentTourStep}
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={springPhysics}
          className={`relative z-10 max-w-md w-full p-5 sm:p-6 rounded-3xl border shadow-2xl space-y-4 pointer-events-auto ${
            themeMode === 'dark'
              ? 'bg-[#18181b]/95 border-white/20 text-white shadow-[0_20px_60px_rgba(0,0,0,0.85)]'
              : 'bg-white border-neutral-300 text-neutral-900 shadow-2xl'
          }`}
        >
          {/* Card Top Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="p-1.5 rounded-xl text-white shadow-xs"
                style={{ backgroundColor: accentColor }}
              >
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase" style={{ color: accentColor }}>
                Tour Step {currentTourStep + 1} of {tourSteps.length}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-400 font-mono text-[10px] hidden sm:inline">
                {currentStepData.targetHint}
              </span>
              <button
                type="button"
                onClick={endTour}
                className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                title="Exit Tour (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5">
            <h3 className={`text-base sm:text-lg font-bold font-heading ${
              themeMode === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}>
              {currentStepData.title}
            </h3>
            <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed">
              {currentStepData.description}
            </p>
          </div>

          {/* Bottom Action Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <button
              type="button"
              onClick={prevTourStep}
              disabled={currentTourStep === 0}
              className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                currentTourStep === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-white/10 text-neutral-300'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={endTour}
                className="px-2.5 py-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer text-xs"
              >
                Skip
              </button>

              <button
                type="button"
                onClick={nextTourStep}
                className="px-4 py-1.5 rounded-xl text-white font-bold flex items-center gap-1.5 shadow-md transition-transform active:scale-95 cursor-pointer"
                style={{ backgroundColor: accentColor }}
              >
                <span>{isLastStep ? 'Got it' : 'Next'}</span>
                {isLastStep ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
