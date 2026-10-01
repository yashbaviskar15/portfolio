import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Folder,
  Globe,
  Mail,
  User,
  FileText,
  Activity,
  LayoutGrid,
  FolderGit2,
  Zap,
} from 'lucide-react';
import { dockSpring, dockIndicatorVariants } from '../../lib/animations';
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
  app: DockItemConfig;
  isOpen: boolean;
  isFocused: boolean;
  isMinimized: boolean;
  accentColor: string;
  isDesktop: boolean;
  onOpen: (id: WindowId, origin?: { x: number; y: number }) => void;
}

const DockItem: React.FC<DockItemProps> = ({
  app,
  isOpen,
  isFocused,
  isMinimized,
  accentColor,
  isDesktop,
  onOpen,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const [isBouncing, setIsBouncing] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const origin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    // Trigger authentic Ubuntu dock launch bounce animation
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 480);
    onOpen(app.id, origin);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center justify-end select-none shrink-0 w-8 sm:w-11 sm:h-11 mx-0.5 sm:mx-1"
    >
      {/* Dock Icon Button: Tactile feedback, hover lift & launch bounce */}
      <motion.button
        type="button"
        tabIndex={0}
        onClick={handleClick}
        animate={
          isBouncing
            ? { y: [0, -11, 0, -4, 0], scale: [1, 1.12, 0.95, 1.04, 1] }
            : hovered
            ? { scale: 1.14, y: -4 }
            : { scale: 1, y: 0 }
        }
        transition={
          isBouncing
            ? { duration: 0.46, ease: 'easeInOut' }
            : { type: 'spring', stiffness: 450, damping: 25 }
        }
        whileTap={{ scale: 0.9 }}
        aria-label={app.label}
        className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl ${app.tileClass} border flex items-center justify-center text-white shadow-md cursor-pointer relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shrink-0 transition-colors overflow-visible`}
      >
        {/* Tooltip: Anchored above icon */}
        <AnimatePresence>
          {hovered && isDesktop && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 3, scale: 0.92 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
              className="absolute bottom-[calc(100%+10px)] px-3 py-1.5 rounded-lg bg-[#18181b]/95 text-white text-[11px] font-medium font-sans whitespace-nowrap pointer-events-none border border-white/20 shadow-2xl z-50 backdrop-blur-md"
            >
              {app.label}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center pointer-events-none">
          {app.icon}
        </div>
      </motion.button>

      {/* Linux Dash-to-Dock Active Running Dot Indicator */}
      <div className="h-1.5 flex items-center justify-center mt-1">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={dockIndicatorVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`rounded-full transition-all duration-200 ${
                isFocused
                  ? 'w-2.5 h-1 bg-orange-500 shadow-[0_0_8px_rgba(233,84,32,0.95)]'
                  : isMinimized
                  ? 'w-1 h-1 bg-neutral-400 opacity-60'
                  : 'w-1.5 h-1 bg-white opacity-80'
              }`}
              style={isFocused ? { backgroundColor: accentColor } : {}}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const Dock: React.FC<DockProps> = ({ openWindows, onOpenApp, onToggleActivities }) => {
  const [gridHovered, setGridHovered] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(() => typeof window !== 'undefined' ? window.innerWidth >= 640 : false);
  const { themeMode, accentColor, activeWindowId, t } = useGnomeStore();
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

  // Recruiter-First Dock Application Order: Projects, Resume, Terminal, Skills, Files, Contact, Monitor, Settings
  const dockApps: DockItemConfig[] = [
    {
      id: 'projects',
      label: `${strings.desktop.projects || 'Projects'} [Ctrl+Alt+P]`,
      icon: <FolderGit2 className="w-full h-full text-amber-300 drop-shadow-xs" />,
      tileClass: 'bg-gradient-to-b from-amber-600 to-amber-800 border-amber-400/30',
    },
    {
      id: 'resume',
      label: `${strings.dock.resume || 'CV / Resume'} [Ctrl+Alt+R]`,
      icon: <FileText className="w-full h-full text-purple-300 drop-shadow-xs" />,
      tileClass: 'bg-gradient-to-b from-purple-600 to-purple-800 border-purple-400/30',
    },
    {
      id: 'terminal',
      label: `${strings.dock.terminal || 'Terminal'} [Ctrl+Alt+T]`,
      icon: <Terminal className="w-full h-full text-emerald-400 drop-shadow-xs" />,
      tileClass: 'bg-gradient-to-b from-neutral-900 to-black border-emerald-500/40',
    },
    {
      id: 'skills',
      label: `${strings.desktop.skills || 'Skills Matrix'} [Ctrl+Alt+S]`,
      icon: <Zap className="w-full h-full text-orange-300 drop-shadow-xs" />,
      tileClass: 'bg-gradient-to-b from-orange-600 to-orange-800 border-orange-400/30',
    },
    {
      id: 'files',
      label: `${strings.dock.files || 'Files'} [Ctrl+Alt+F]`,
      icon: <Folder className="w-full h-full text-amber-300 drop-shadow-xs" />,
      tileClass: 'bg-gradient-to-b from-amber-500 to-amber-700 border-amber-300/30',
    },
    {
      id: 'contact',
      label: `${strings.dock.contact || 'Contact'} [Ctrl+Alt+C]`,
      icon: <Mail className="w-full h-full text-blue-300 drop-shadow-xs" />,
      tileClass: 'bg-gradient-to-b from-blue-600 to-blue-800 border-blue-400/30',
    },
    {
      id: 'monitor',
      label: `${strings.dock.monitor || 'System Monitor'}`,
      icon: <Activity className="w-full h-full text-rose-400 drop-shadow-xs" />,
      tileClass: 'bg-gradient-to-b from-neutral-900 to-neutral-950 border-rose-500/30',
    },
    {
      id: 'about',
      label: `${strings.dock.settings || 'Settings'} [Ctrl+Alt+A]`,
      icon: <User className="w-full h-full text-orange-300 drop-shadow-xs" />,
      tileClass: 'bg-gradient-to-b from-orange-500 to-orange-700 border-orange-300/30',
    },
  ];

  return (
    <motion.nav
      initial={{ x: '-50%', y: 60, opacity: 0 }}
      animate={{ x: '-50%', y: 0, opacity: 1 }}
      transition={dockSpring}
      style={{ left: '50%' }}
      className={`fixed bottom-2.5 sm:bottom-4 z-40 select-none flex items-end justify-center px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-2xl border shadow-xl backdrop-blur-xl transition-colors duration-150 overflow-visible pointer-events-auto max-w-[calc(100vw-12px)] sm:max-w-none ${
        themeMode === 'dark'
          ? 'bg-[#18181b]/85 border-white/10 shadow-black/60'
          : 'bg-white/90 border-neutral-300 shadow-neutral-400/30'
      }`}
      role="toolbar"
      aria-label="Application Dock"
    >
      {/* Dock App Items */}
      <div className="flex items-end justify-center">
        {dockApps.map((app) => {
          const win = openWindows.find((w) => w.id === app.id);
          const isOpen = Boolean(win && win.isOpen);
          const isMinimized = Boolean(win?.isMinimized);
          const isFocused = activeWindowId === app.id;

          return (
            <DockItem
              key={app.id}
              app={app}
              isOpen={isOpen}
              isFocused={isFocused}
              isMinimized={isMinimized}
              accentColor={accentColor}
              isDesktop={isDesktop}
              onOpen={onOpenApp}
            />
          );
        })}
      </div>

      {/* GNOME Dash to Dock Separator */}
      <div
        className={`h-7 w-[1px] my-auto mx-1 shrink-0 ${
          themeMode === 'dark' ? 'bg-white/15' : 'bg-neutral-300'
        }`}
      />

      {/* Show Apps / Activities Grid Launcher Button */}
      <div
        onMouseEnter={() => setGridHovered(true)}
        onMouseLeave={() => setGridHovered(false)}
        className="relative flex flex-col items-center justify-end select-none shrink-0 w-8 sm:w-11 sm:h-11 mx-0.5 sm:mx-1"
      >
        <motion.button
          type="button"
          tabIndex={0}
          whileHover={{ scale: 1.14, y: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleActivities}
          aria-label="Show Applications (Super)"
          className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl border flex items-center justify-center shadow-md cursor-pointer relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shrink-0 transition-colors ${
            themeMode === 'dark'
              ? 'bg-neutral-800 hover:bg-neutral-700 text-white border-white/15'
              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-300'
          }`}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {gridHovered && isDesktop && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 3, scale: 0.92 }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
                className="absolute bottom-[calc(100%+10px)] px-3 py-1.5 rounded-lg bg-[#18181b]/95 text-white text-[11px] font-medium font-sans whitespace-nowrap pointer-events-none border border-white/20 shadow-2xl z-50 backdrop-blur-md"
              >
                {strings.dock.showApps || 'Show Applications'} [Super]
              </motion.div>
            )}
          </AnimatePresence>

          <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-300 group-hover:text-white transition-colors" />
        </motion.button>

        {/* Spacer for bottom alignment */}
        <div className="h-1.5 mt-1" />
      </div>
    </motion.nav>
  );
};
