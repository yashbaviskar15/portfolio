import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Folder, FileText, Settings, RotateCw, Palette, Compass, Zap, Clock, Sparkles, LayoutGrid } from 'lucide-react';
import { contextMenuVariants } from '../../lib/animations';
import { WindowId } from '../../types/gnome';
import { useGnomeStore } from '../../store/useGnomeStore';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onOpenApp: (appId: WindowId) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onOpenApp }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { setWallpaperModalOpen, startTour, toggleRecruiterView, resetDesktopLayout } = useGnomeStore();

  // Clamp position to avoid overflowing viewport edges
  const clampedX = Math.min(x, window.innerWidth - 250);
  const clampedY = Math.min(y, window.innerHeight - 340);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const menuItems = [
    {
      id: 'terminal' as WindowId,
      label: 'Open Terminal',
      icon: <Terminal className="w-3.5 h-3.5 text-emerald-400" />,
      shortcut: 'Ctrl+Alt+T',
    },
    {
      id: 'projects' as WindowId,
      label: 'Projects Gallery',
      icon: <Folder className="w-3.5 h-3.5 text-amber-400" />,
    },
    {
      id: 'skills' as WindowId,
      label: 'Skills Visualizer',
      icon: <Zap className="w-3.5 h-3.5 text-orange-400" />,
    },
    {
      id: 'resume' as WindowId,
      label: 'View Resume (Gedit)',
      icon: <FileText className="w-3.5 h-3.5 text-sky-400" />,
    },
    {
      id: 'about' as WindowId,
      label: 'System Settings',
      icon: <Settings className="w-3.5 h-3.5 text-neutral-300" />,
    },
  ];

  return (
    <motion.div
      ref={menuRef}
      variants={contextMenuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ top: `${clampedY}px`, left: `${clampedX}px` }}
      className="fixed z-50 w-64 rounded-2xl bg-[#1e1e22]/95 border border-white/15 p-1.5 shadow-2xl backdrop-blur-2xl text-xs text-neutral-200 select-none font-sans"
    >
      <div className="space-y-0.5">
        {/* Recruiter Quick View Highlight Item */}
        <button
          type="button"
          onClick={() => {
            toggleRecruiterView();
            onClose();
          }}
          className="w-full px-2.5 py-2 rounded-xl flex items-center justify-between bg-gradient-to-r from-orange-600/20 to-amber-600/20 hover:from-orange-600 hover:to-amber-600 border border-orange-500/30 text-orange-300 hover:text-white transition-all cursor-pointer text-left group"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-400 group-hover:text-white" />
            <span className="font-bold">Executive Recruiter View</span>
          </div>
          <span className="text-[10px] text-orange-400/80 group-hover:text-white font-mono">1-Page</span>
        </button>

        <div className="my-1 border-t border-white/10" />

        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              onOpenApp(item.id);
              onClose();
            }}
            className="w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between hover:bg-orange-600 hover:text-white transition-colors cursor-pointer text-left group"
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>
            {item.shortcut && (
              <span className="text-[10px] text-neutral-400 group-hover:text-white/80 font-mono">
                {item.shortcut}
              </span>
            )}
          </button>
        ))}

        <div className="my-1 border-t border-white/10" />

        {/* Change Background */}
        <button
          type="button"
          onClick={() => {
            setWallpaperModalOpen(true);
            onClose();
          }}
          className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer text-left text-neutral-300 hover:text-white"
        >
          <Palette className="w-3.5 h-3.5 text-orange-400" />
          <span>Change Background</span>
        </button>

        {/* Reset Desktop Layout */}
        <button
          type="button"
          onClick={() => {
            resetDesktopLayout();
            onClose();
          }}
          className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer text-left text-neutral-300 hover:text-white"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-sky-400" />
          <span>Reset Window Layout</span>
        </button>

        {/* Start Guided Tour */}
        <button
          type="button"
          onClick={() => {
            startTour();
            onClose();
          }}
          className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer text-left text-neutral-300 hover:text-white"
        >
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>Start Guided Tour</span>
        </button>

        <div className="my-1 border-t border-white/10" />

        {/* Reload */}
        <button
          type="button"
          onClick={() => {
            window.location.reload();
          }}
          className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer text-left text-neutral-400 hover:text-white"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Reload Desktop</span>
        </button>
      </div>
    </motion.div>
  );
};
