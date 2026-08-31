import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, MotionValue } from 'framer-motion';
import { Terminal, Folder, Globe, Mail, User, FileText, Activity, LayoutGrid } from 'lucide-react';
import { dockSpring, dockIndicatorVariants, dockLaunchBounce } from '../../lib/animations';
import { WindowId, WindowState } from '../../types/gnome';
import { useGnomeStore } from '../../store/useGnomeStore';

interface DockProps {
  openWindows: WindowState[];
  onOpenApp: (appId: WindowId, origin?: { x: number; y: number }) => void;
  onToggleActivities: () => void;
}

interface DockItemConfig {
  id: WindowId;
  label: string;
  icon: React.ReactNode;
  tileClass: string;
}

interface DockItemProps {
  mouseX: MotionValue<number>;
  app: DockItemConfig;
  isOpen: boolean;
  isMinimized: boolean;
  accentColor: string;
  isDesktop: boolean;
  onOpen: (id: WindowId, origin?: { x: number; y: number }) => void;
}

const DockItem: React.FC<DockItemProps> = ({
  mouseX,
  app,
  isOpen,
  isMinimized,
  accentColor,
  isDesktop,
  onOpen,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const [isBouncing, setIsBouncing] = useState<boolean>(false);

  // Compute cursor distance from the stable center of this item
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - (bounds.x + bounds.width / 2);
  });

  // Desktop fluid wave magnification (smooth dynamic width, GPU scale & lift)
  const widthSync = useTransform(distance, [-150, 0, 150], [44, 58, 44]);
  const width = useSpring(widthSync, { mass: 0.08, stiffness: 300, damping: 24 });

  const scaleSync = useTransform(distance, [-150, 0, 150], [1, 1.25, 1]);
  const scale = useSpring(scaleSync, { mass: 0.08, stiffness: 300, damping: 24 });

  const ySync = useTransform(distance, [-150, 0, 150], [0, -8, 0]);
  const y = useSpring(ySync, { mass: 0.08, stiffness: 300, damping: 24 });

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const origin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };

    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 460);

    onOpen(app.id, origin);
  };

  return (
    <motion.div
      ref={ref}
      style={isDesktop ? { width } : {}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center justify-end select-none shrink-0 w-7 sm:w-11 sm:h-11 mx-[1px] sm:mx-1"
    >
      {/* Button: GPU Magnification on Desktop, Compact 28px on Mobile */}
      <motion.button
        type="button"
        tabIndex={0}
        style={
          isDesktop
            ? {
                scale,
                y,
                transformOrigin: 'bottom center',
              }
            : {}
        }
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e as any);
          }
        }}
        animate={isBouncing ? dockLaunchBounce : {}}
        whileTap={{ scale: 0.85 }}
        aria-label={app.label}
        className={`w-7 h-7 sm:w-11 sm:h-11 rounded-lg sm:rounded-2xl ${app.tileClass} border flex items-center justify-center text-white shadow-lg cursor-pointer relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 shrink-0 transition-shadow duration-200 hover:shadow-2xl overflow-visible`}
      >
        {/* Tooltip: Anchored to button so it always floats precisely above the scaled icon */}
        <AnimatePresence>
          {hovered && isDesktop && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 2, scale: 0.92 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
              className="absolute bottom-[calc(100%+14px)] left-1/2 -translate-x-1/2 bg-[#18181b]/95 backdrop-blur-xl text-white text-[11.5px] font-medium px-3 py-1 rounded-lg border border-white/20 shadow-[0_12px_28px_rgba(0,0,0,0.85)] whitespace-nowrap pointer-events-none z-70 hidden sm:flex flex-col items-center"
            >
              <span>{app.label}</span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#18181b]/95" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-3.5 h-3.5 sm:w-6 sm:h-6 flex items-center justify-center pointer-events-none">
          {app.icon}
        </div>
      </motion.button>

      {/* Active Indicator Dot */}
      <div className="h-1 sm:h-1.5 w-full flex items-center justify-center mt-0.5 sm:mt-1 pointer-events-none">
        <AnimatePresence>
          {isOpen && (
            <motion.span
              variants={dockIndicatorVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`w-1 h-1 rounded-full ${
                isMinimized ? 'bg-neutral-500' : 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]'
              }`}
              style={!isMinimized ? { backgroundColor: accentColor } : {}}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const Dock: React.FC<DockProps> = ({ openWindows, onOpenApp, onToggleActivities }) => {
  const mouseX = useMotionValue(Infinity);
  const [gridHovered, setGridHovered] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(() => typeof window !== 'undefined' ? window.innerWidth >= 640 : false);
  const { themeMode, accentColor, t } = useGnomeStore();
  const strings = t();

  // Track responsive viewport width
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dockApps: DockItemConfig[] = [
    {
      id: 'files',
      label: `${strings.dock.files} [Ctrl+Alt+F]`,
      icon: <Folder className="w-full h-full text-amber-300 drop-shadow" />,
      tileClass: 'bg-gradient-to-b from-amber-500 to-amber-700 border-amber-300/40 shadow-amber-900/30',
    },
    {
      id: 'terminal',
      label: `${strings.dock.terminal} [Ctrl+Alt+T]`,
      icon: <Terminal className="w-full h-full text-emerald-400 drop-shadow" />,
      tileClass: 'bg-gradient-to-b from-neutral-900 to-black border-emerald-500/40 shadow-emerald-950/30',
    },
    {
      id: 'monitor',
      label: `${strings.dock.monitor}`,
      icon: <Activity className="w-full h-full text-rose-400 drop-shadow" />,
      tileClass: 'bg-gradient-to-b from-neutral-900 to-black border-rose-500/40 shadow-rose-950/30',
    },
    {
      id: 'browser',
      label: `${strings.dock.browser}`,
      icon: <Globe className="w-full h-full text-sky-300 drop-shadow" />,
      tileClass: 'bg-gradient-to-b from-sky-500 to-indigo-700 border-sky-300/40 shadow-sky-950/30',
    },
    {
      id: 'contact',
      label: `${strings.dock.contact} [Ctrl+Alt+C]`,
      icon: <Mail className="w-full h-full text-blue-300 drop-shadow" />,
      tileClass: 'bg-gradient-to-b from-blue-500 to-blue-800 border-blue-300/40 shadow-blue-950/30',
    },
    {
      id: 'resume',
      label: `${strings.dock.resume} [Ctrl+Alt+R]`,
      icon: <FileText className="w-full h-full text-purple-300 drop-shadow" />,
      tileClass: 'bg-gradient-to-b from-purple-500 to-purple-800 border-purple-300/40 shadow-purple-950/30',
    },
    {
      id: 'about',
      label: `${strings.dock.settings} [Ctrl+Alt+A]`,
      icon: <User className="w-full h-full text-orange-300 drop-shadow" />,
      tileClass: 'bg-gradient-to-b from-orange-500 to-orange-700 border-orange-300/40 shadow-orange-950/30',
    },
  ];

  return (
    <motion.nav
      initial={{ x: '-50%', y: 80, opacity: 0 }}
      animate={{ x: '-50%', y: 0, opacity: 1 }}
      transition={dockSpring}
      onMouseMove={(e) => {
        if (isDesktop) mouseX.set(e.pageX);
      }}
      onMouseLeave={() => {
        if (isDesktop) mouseX.set(Infinity);
      }}
      style={{ left: '50%' }}
      className={`fixed bottom-3 sm:bottom-4 z-40 select-none flex items-end justify-center px-1.5 sm:px-3 py-1 sm:py-2 rounded-2xl sm:rounded-3xl border shadow-2xl backdrop-blur-2xl transition-colors duration-150 overflow-visible pointer-events-auto max-w-[calc(100vw-12px)] sm:max-w-none ${
        themeMode === 'dark'
          ? 'bg-[#121214]/85 border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)]'
          : 'bg-[#f4f4f5]/90 border-neutral-300 shadow-[0_20px_40px_rgba(0,0,0,0.25)]'
      }`}
      aria-label="Cross-Platform Desktop Dock"
    >
      {/* Pinned Application Launcher Icons */}
      <div className="flex items-end shrink-0">
        {dockApps.map((app) => {
          const windowState = openWindows.find((w) => w.id === app.id);
          const isOpen = !!windowState?.isOpen;
          const isMinimized = !!windowState?.isMinimized;

          return (
            <DockItem
              key={app.id}
              mouseX={mouseX}
              app={app}
              isOpen={isOpen}
              isMinimized={isMinimized}
              accentColor={accentColor}
              isDesktop={isDesktop}
              onOpen={onOpenApp}
            />
          );
        })}
      </div>

      {/* Subtle Vertical Glass Divider */}
      <div className="w-[1px] h-5 sm:h-8 bg-white/15 mx-0.5 sm:mx-1.5 mb-1 sm:mb-2 shrink-0" />

      {/* Rightmost 9-Dots Grid Launcher (Show Applications / Activities) */}
      <div
        className="relative flex flex-col items-center justify-end select-none shrink-0 w-7 sm:w-11 sm:h-11 mx-[1px] sm:mx-1"
        onMouseEnter={() => setGridHovered(true)}
        onMouseLeave={() => setGridHovered(false)}
      >
        <motion.button
          type="button"
          tabIndex={0}
          onClick={onToggleActivities}
          whileHover={{ scale: 1.18 }}
          whileTap={{ scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 450, damping: 20 }}
          aria-label="Show Applications / Activities"
          className={`w-7 h-7 sm:w-11 sm:h-11 rounded-lg sm:rounded-2xl border flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shrink-0 relative overflow-visible ${
            themeMode === 'dark'
              ? 'bg-neutral-800/80 hover:bg-neutral-700/80 border-white/15 text-neutral-300 hover:text-white shadow-lg'
              : 'bg-neutral-200 hover:bg-neutral-300 border-neutral-300 text-neutral-700 hover:text-neutral-900 shadow-md'
          }`}
        >
          {/* Tooltip: Anchored to button (remains perfectly horizontal) */}
          <AnimatePresence>
            {gridHovered && isDesktop && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 2, scale: 0.92 }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
                className="absolute bottom-[calc(100%+14px)] left-1/2 -translate-x-1/2 bg-[#18181b]/95 backdrop-blur-xl text-white text-[11.5px] font-medium px-3 py-1 rounded-lg border border-white/20 shadow-[0_12px_28px_rgba(0,0,0,0.85)] whitespace-nowrap pointer-events-none z-70 hidden sm:flex flex-col items-center"
              >
                <span>Show Applications</span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#18181b]/95" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            animate={{ rotate: gridHovered ? 90 : 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="flex items-center justify-center pointer-events-none"
          >
            <LayoutGrid className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
          </motion.div>
        </motion.button>

        {/* Empty spacer to align with indicator dot height */}
        <div className="h-1 sm:h-1.5 w-full pointer-events-none mt-0.5 sm:mt-1" />
      </div>
    </motion.nav>
  );
};
