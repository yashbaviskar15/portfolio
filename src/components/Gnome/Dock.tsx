'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Folder,
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
  isDark: boolean;
  vertical: boolean;
  onOpen: (id: WindowId, origin?: { x: number; y: number }) => void;
}

const DockItem: React.FC<DockItemProps> = ({
  app,
  isOpen,
  isFocused,
  isMinimized,
  accentColor,
  isDark,
  vertical,
  onOpen,
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [isBouncing, setIsBouncing] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const origin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 480);
    onOpen(app.id, origin);
  };

  const sizeClass = vertical ? 'w-12 h-12' : 'w-10 h-10';
  const tileRounding = vertical ? 'rounded-[14px]' : 'rounded-xl';
  const restAnim = vertical ? { scale: 1, x: 0 } : { scale: 1, y: 0 };
  const hoverAnim = vertical ? { scale: 1.09, x: 4 } : { scale: 1.12, y: -5 };
  const bounceAnim = vertical
    ? { x: [0, 9, 0, 4, 0], scale: [1, 1.1, 0.96, 1.03, 1] }
    : { y: [0, -12, 0, -4, 0], scale: [1, 1.12, 0.95, 1.04, 1] };

  // Running-state indicator: left edge when the dock is vertical, below the icon when horizontal.
  const indicator = (
    <div className={`flex items-center justify-center shrink-0 ${vertical ? 'w-2.5 h-10' : 'h-2.5 w-10'}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.span
            variants={dockIndicatorVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`block rounded-full transition-all duration-200 ${
              isFocused
                ? vertical
                  ? 'w-1 h-5'
                  : 'h-1 w-5'
                : isMinimized
                ? vertical
                  ? 'w-1 h-1'
                  : 'h-1 w-1'
                : vertical
                ? 'w-1 h-1.5'
                : 'h-1 w-1.5'
            }`}
            style={{
              backgroundColor: isFocused ? accentColor : isMinimized ? '#a1a1aa' : isDark ? '#ffffff' : '#52525b',
              opacity: isFocused ? 1 : isMinimized ? 0.55 : 0.85,
              boxShadow: isFocused ? `0 0 8px ${accentColor}` : 'none',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex items-center justify-center select-none shrink-0 ${
        vertical ? 'flex-row' : 'flex-col'
      }`}
    >
      {vertical && indicator}

      <motion.button
        type="button"
        tabIndex={0}
        onClick={handleClick}
        animate={isBouncing ? bounceAnim : hovered ? hoverAnim : restAnim}
        transition={
          isBouncing
            ? { duration: 0.46, ease: 'easeInOut' }
            : { type: 'spring', stiffness: 450, damping: 25 }
        }
        whileTap={{ scale: 0.9 }}
        aria-label={app.label}
        className={`${sizeClass} ${tileRounding} ${app.tileClass} border flex items-center justify-center text-white shadow-md cursor-pointer relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shrink-0`}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, ...(vertical ? { x: -8, y: '-50%' } : { x: '-50%', y: 6 }) }}
              animate={{ opacity: 1, scale: 1, ...(vertical ? { x: 0, y: '-50%' } : { x: '-50%', y: 0 }) }}
              exit={{ opacity: 0, scale: 0.92, ...(vertical ? { x: -6, y: '-50%' } : { x: '-50%', y: 4 }) }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
              className={`absolute px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap pointer-events-none border shadow-2xl z-50 backdrop-blur-md ${
                isDark ? 'bg-[#18181b]/95 text-white border-white/15' : 'bg-white/95 text-neutral-900 border-neutral-300'
              } ${
                vertical
                  ? 'left-[calc(100%+12px)] top-1/2'
                  : 'bottom-[calc(100%+12px)] left-1/2'
              }`}
            >
              {app.label}
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`flex items-center justify-center pointer-events-none ${
            vertical ? 'w-6 h-6' : 'w-4 h-4 sm:w-5 sm:h-5'
          }`}
        >
          {app.icon}
        </div>
      </motion.button>

      {!vertical && indicator}
    </div>
  );
};

const ShowAppsButton: React.FC<{
  vertical: boolean;
  isDark: boolean;
  label: string;
  onClick: () => void;
}> = ({ vertical, isDark, label, onClick }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const sizeClass = vertical ? 'w-12 h-12' : 'w-10 h-10';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-center shrink-0"
    >
      <motion.button
        type="button"
        tabIndex={0}
        whileHover={vertical ? { scale: 1.09, x: 4 } : { scale: 1.12, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        aria-label={label}
        className={`${sizeClass} rounded-[14px] border flex items-center justify-center shadow-md cursor-pointer relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shrink-0 transition-colors ${
          isDark
            ? 'bg-white/10 hover:bg-white/20 text-neutral-200 border-white/15'
            : 'bg-neutral-200/80 hover:bg-neutral-200 text-neutral-700 border-neutral-300'
        }`}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, ...(vertical ? { x: -8, y: '-50%' } : { x: '-50%', y: 6 }) }}
              animate={{ opacity: 1, scale: 1, ...(vertical ? { x: 0, y: '-50%' } : { x: '-50%', y: 0 }) }}
              exit={{ opacity: 0, scale: 0.92, ...(vertical ? { x: -6, y: '-50%' } : { x: '-50%', y: 4 }) }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
              className={`absolute px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap pointer-events-none border shadow-2xl z-50 backdrop-blur-md ${
                isDark ? 'bg-[#18181b]/95 text-white border-white/15' : 'bg-white/95 text-neutral-900 border-neutral-300'
              } ${vertical ? 'left-[calc(100%+12px)] top-1/2' : 'bottom-[calc(100%+12px)] left-1/2'}`}
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>

        <LayoutGrid className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export const Dock: React.FC<DockProps> = ({ openWindows, onOpenApp, onToggleActivities }) => {
  const { themeMode, accentColor, activeWindowId, t } = useGnomeStore();
  const strings = t();
  const isDark = themeMode === 'dark';

  // Recruiter-first dock order: Projects, Resume, Terminal, Skills, Files, Contact, Monitor, Settings
  const dockApps: DockItemConfig[] = [
    {
      id: 'projects',
      label: `${strings.desktop.projects || 'Projects'} [Ctrl+Alt+P]`,
      icon: <FolderGit2 className="w-full h-full text-amber-300" />,
      tileClass: 'bg-gradient-to-b from-amber-600 to-amber-800 border-amber-400/30',
    },
    {
      id: 'resume',
      label: `${strings.dock.resume || 'CV / Resume'} [Ctrl+Alt+R]`,
      icon: <FileText className="w-full h-full text-purple-300" />,
      tileClass: 'bg-gradient-to-b from-purple-600 to-purple-800 border-purple-400/30',
    },
    {
      id: 'terminal',
      label: `${strings.dock.terminal || 'Terminal'} [Ctrl+Alt+T]`,
      icon: <Terminal className="w-full h-full text-emerald-400" />,
      tileClass: 'bg-gradient-to-b from-neutral-900 to-black border-emerald-500/40',
    },
    {
      id: 'skills',
      label: `${strings.desktop.skills || 'Skills Matrix'} [Ctrl+Alt+S]`,
      icon: <Zap className="w-full h-full text-orange-300" />,
      tileClass: 'bg-gradient-to-b from-orange-600 to-orange-800 border-orange-400/30',
    },
    {
      id: 'files',
      label: `${strings.dock.files || 'Files'} [Ctrl+Alt+F]`,
      icon: <Folder className="w-full h-full text-amber-300" />,
      tileClass: 'bg-gradient-to-b from-amber-500 to-amber-700 border-amber-300/30',
    },
    {
      id: 'contact',
      label: `${strings.dock.contact || 'Contact'} [Ctrl+Alt+C]`,
      icon: <Mail className="w-full h-full text-blue-300" />,
      tileClass: 'bg-gradient-to-b from-blue-600 to-blue-800 border-blue-400/30',
    },
    {
      id: 'monitor',
      label: `${strings.dock.monitor || 'System Monitor'}`,
      icon: <Activity className="w-full h-full text-rose-400" />,
      tileClass: 'bg-gradient-to-b from-neutral-900 to-neutral-950 border-rose-500/30',
    },
    {
      id: 'about',
      label: `${strings.dock.settings || 'Settings'} [Ctrl+Alt+A]`,
      icon: <User className="w-full h-full text-orange-300" />,
      tileClass: 'bg-gradient-to-b from-orange-500 to-orange-700 border-orange-300/30',
    },
  ];

  const renderItems = (vertical: boolean) =>
    dockApps.map((app) => {
      const win = openWindows.find((w) => w.id === app.id);
      return (
        <DockItem
          key={`${app.id}-${vertical ? 'v' : 'h'}`}
          app={app}
          isOpen={Boolean(win && win.isOpen)}
          isFocused={activeWindowId === app.id}
          isMinimized={Boolean(win?.isMinimized)}
          accentColor={accentColor}
          isDark={isDark}
          vertical={vertical}
          onOpen={onOpenApp}
        />
      );
    });

  const showAppsLabel = `${strings.dock.showApps || 'Show Applications'} [Super]`;

  const panelClass = isDark
    ? 'bg-[#1a1a1e]/80 border-white/10 shadow-black/60'
    : 'bg-white/85 border-neutral-300 shadow-neutral-400/30';

  const dividerClass = isDark ? 'bg-white/15' : 'bg-neutral-300';

  return (
    <>
      {/* ===== Vertical dock (left) — wide viewports ===== */}
      <div className="hidden lg:flex fixed inset-y-0 left-0 z-40 items-center pl-2.5 pointer-events-none">
        <motion.nav
          initial={{ x: -70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={dockSpring}
          role="toolbar"
          aria-label="Application dock"
          className={`pointer-events-auto flex flex-col items-center gap-1 px-2 py-2.5 rounded-2xl border shadow-2xl backdrop-blur-2xl max-h-[calc(100vh-72px)] overflow-y-auto ${panelClass}`}
        >
          {renderItems(true)}
          <div className={`w-9 h-px my-1 shrink-0 ${dividerClass}`} />
          <ShowAppsButton vertical isDark={isDark} label={showAppsLabel} onClick={onToggleActivities} />
        </motion.nav>
      </div>

      {/* ===== Horizontal dock (bottom) — tablets & phones ===== */}
      <motion.nav
        initial={{ x: '-50%', y: 60, opacity: 0 }}
        animate={{ x: '-50%', y: 0, opacity: 1 }}
        transition={dockSpring}
        style={{ left: '50%' }}
        role="toolbar"
        aria-label="Application dock"
        className={`fixed bottom-2.5 z-40 lg:hidden flex items-end gap-0.5 px-2 py-1.5 rounded-2xl border shadow-2xl backdrop-blur-2xl max-w-[calc(100vw-16px)] ${panelClass}`}
      >
        <div className="flex items-end gap-0.5 overflow-x-auto">{renderItems(false)}</div>
        <div className={`h-8 w-px mx-1 shrink-0 ${dividerClass}`} />
        <ShowAppsButton vertical={false} isDark={isDark} label={showAppsLabel} onClick={onToggleActivities} />
      </motion.nav>
    </>
  );
};
