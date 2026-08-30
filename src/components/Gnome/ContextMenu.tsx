import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Folder, FileText, Settings, RotateCw, Palette, Compass, Zap, Clock } from 'lucide-react';
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
  const { setWallpaperModalOpen, startTour } = useGnomeStore();

  // Clamp position to avoid overflowing viewport edges
  const clampedX = Math.min(x, window.innerWidth - 240);
  const clampedY = Math.min(y, window.innerHeight - 300);

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
      id: 'timeline' as WindowId,
      label: 'Experience Timeline',
      icon: <Clock className="w-3.5 h-3.5 text-purple-400" />,
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
      className="fixed z-50 w-60 rounded-2xl bg-[#1e1e22]/95 border border-white/15 p-1.5 shadow-2xl backdrop-blur-2xl text-xs text-neutral-200 select-none font-sans"
    >
      <div className="space-y-0.5">
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
