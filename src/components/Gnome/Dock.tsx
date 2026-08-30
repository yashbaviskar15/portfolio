import React, { useRef, useState } from 'react';
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

// Individual macOS Dock Icon with dynamic width & breathing margins on hover
interface DockItemProps {
  mouseX: MotionValue<number>;
  app: DockItemConfig;
  isOpen: boolean;
  isMinimized: boolean;
  accentColor: string;
  onOpen: (id: WindowId, origin?: { x: number; y: number }) => void;
}

const DockItem: React.FC<DockItemProps> = ({
  mouseX,
  app,
  isOpen,
  isMinimized,
  accentColor,
  onOpen,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const [isBouncing, setIsBouncing] = useState<boolean>(false);

  // Compute cursor distance from the center of this item
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - (bounds.x + bounds.width / 2);
  });

  // Dynamic physical width expansion (42px base -> 62px target)
  const widthSync = useTransform(distance, [-140, 0, 140], [42, 62, 42]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 220, damping: 18 });

  // Dynamic margin expansion so neighbors smoothly part ways and make clean breathing room
  const marginSync = useTransform(distance, [-140, 0, 140], [4, 10, 4]);
  const margin = useSpring(marginSync, { mass: 0.1, stiffness: 220, damping: 18 });

  // Smooth lift up
  const ySync = useTransform(distance, [-140, 0, 140], [0, -8, 0]);
  const y = useSpring(ySync, { mass: 0.1, stiffness: 220, damping: 18 });

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
      style={{
        width,
        marginLeft: margin,
        marginRight: margin,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center justify-end select-none shrink-0"
    >
      {/* Clean Black Tooltip Above the Icon */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.92 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md text-white text-[11.5px] font-semibold px-2.5 py-1 rounded-md border border-white/15 shadow-2xl whitespace-nowrap pointer-events-none z-60 hidden sm:block"
          >
            {app.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button sizing exactly tracking dynamic width & lifting upward */}
      <motion.button
        type="button"
        tabIndex={0}
        style={{
          width,
          height: width,
          y,
        }}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e as any);
          }
        }}
        animate={isBouncing ? dockLaunchBounce : {}}
        whileTap={{ scale: 0.9 }}
        aria-label={app.label}
        className={`rounded-2xl ${app.tileClass} border flex items-center justify-center text-white shadow-xl cursor-pointer relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 shrink-0`}
      >
        <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center pointer-events-none">
          {app.icon}
        </div>
      </motion.button>

      {/* Active Indicator Dot */}
      <div className="h-1.5 w-full flex items-center justify-center mt-1 pointer-events-none">
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
  const { themeMode, accentColor, t } = useGnomeStore();
  const strings = t();

  const dockApps: DockItemConfig[] = [
    {
      id: 'files',
      label: `${strings.dock.files} [Ctrl+Alt+F]`,
      icon: <Folder className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 drop-shadow" />,
      tileClass: 'bg-gradient-to-b from-amber-500 to-amber-700 border-amber-300/40 shadow-amber-900/30',
    },
    {
      id: 'terminal',
      label: `${strings.dock.terminal} [Ctrl+Alt+T]`,
      icon: <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 drop-shadow" />,
      tileClass: 'bg-gradient-to-b from-neutral-900 to-black border-emerald-500/40 shadow-emerald-950/30',
    },
    {
      id: 'monitor',
      label: `${strings.dock.monitor}`,
      icon: <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400 drop-shadow" />,
      tileClass: 'bg-gradient-to-b from-neutral-900 to-black border-rose-500/40 shadow-rose-950/30',
    },
    {
      id: 'browser',
      label: `${strings.dock.browser}`,
      icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-sky-300 drop-shadow" />,
      tileClass: 'bg-gradient-to-b from-sky-500 to-indigo-700 border-sky-300/40 shadow-sky-950/30',
    },
    {
      id: 'contact',
      label: `${strings.dock.contact} [Ctrl+Alt+C]`,
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300 drop-shadow" />,
      tileClass: 'bg-gradient-to-b from-blue-500 to-blue-800 border-blue-300/40 shadow-blue-950/30',
    },
    {
      id: 'resume',
      label: `${strings.dock.resume} [Ctrl+Alt+R]`,
      icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300 drop-shadow" />,
      tileClass: 'bg-gradient-to-b from-purple-500 to-purple-800 border-purple-300/40 shadow-purple-950/30',
    },
    {
      id: 'about',
      label: `${strings.dock.settings} [Ctrl+Alt+A]`,
      icon: <User className="w-5 h-5 sm:w-6 sm:h-6 text-orange-300 drop-shadow" />,
      tileClass: 'bg-gradient-to-b from-orange-500 to-orange-700 border-orange-300/40 shadow-orange-950/30',
    },
  ];

  return (
    <motion.nav
      initial={{ x: '-50%', y: 80, opacity: 0 }}
      animate={{ x: '-50%', y: 0, opacity: 1 }}
      transition={dockSpring}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      style={{ left: '50%' }}
      className={`fixed bottom-3 sm:bottom-4 z-40 select-none flex items-end justify-center px-3 sm:px-4 py-2 rounded-2xl sm:rounded-3xl border shadow-2xl backdrop-blur-2xl transition-colors duration-150 overflow-visible pointer-events-auto ${
        themeMode === 'dark'
          ? 'bg-[#121214]/85 border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)]'
          : 'bg-[#f4f4f5]/90 border-neutral-300 shadow-[0_20px_40px_rgba(0,0,0,0.25)]'
      }`}
      aria-label="macOS-Style Fluid Dock"
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
              onOpen={onOpenApp}
            />
          );
        })}
      </div>

      {/* Subtle Vertical Glass Divider */}
      <div className="w-[1px] h-8 bg-white/15 mx-1.5 sm:mx-2 mb-2.5 shrink-0" />

      {/* Rightmost 9-Dots Grid Launcher (Show Applications / Activities) */}
      <div
        className="relative flex flex-col items-center justify-end select-none shrink-0 mx-1 mb-0.5"
        onMouseEnter={() => setGridHovered(true)}
        onMouseLeave={() => setGridHovered(false)}
      >
        <AnimatePresence>
          {gridHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.92 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
              className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md text-white text-[11.5px] font-semibold px-2.5 py-1 rounded-md border border-white/15 shadow-2xl whitespace-nowrap pointer-events-none z-60 hidden sm:block"
            >
              <span>Show Applications</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          tabIndex={0}
          onClick={onToggleActivities}
          whileHover={{ scale: 1.15, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 450, damping: 20 }}
          aria-label="Show Applications / Activities"
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shrink-0 ${
            themeMode === 'dark'
              ? 'bg-neutral-800/80 hover:bg-neutral-700/80 border-white/15 text-neutral-300 hover:text-white shadow-lg'
              : 'bg-neutral-200 hover:bg-neutral-300 border-neutral-300 text-neutral-700 hover:text-neutral-900 shadow-md'
          }`}
        >
          <LayoutGrid className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>

        {/* Empty spacer to align with indicator dot height */}
        <div className="h-1.5 w-full pointer-events-none mt-1" />
      </div>
    </motion.nav>
  );
};
