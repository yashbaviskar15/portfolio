import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, FileText, Terminal, Mail, Zap, Clock, Activity } from 'lucide-react';
import { WindowId } from '../../types/gnome';
import { useGnomeStore } from '../../store/useGnomeStore';

interface DesktopIconsProps {
  onOpenApp: (appId: WindowId, origin?: { x: number; y: number }) => void;
  isActivitiesOpen?: boolean;
}

interface DesktopItem {
  id: WindowId;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

export const DesktopIcons: React.FC<DesktopIconsProps> = ({ onOpenApp, isActivitiesOpen }) => {
  const { selectedDesktopIndex, setSelectedDesktopIndex, accentColor, t } = useGnomeStore();
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const strings = t();

  const desktopItems: DesktopItem[] = [
    {
      id: 'projects',
      label: strings.desktop.projects,
      sublabel: strings.desktop.projectsSub,
      icon: (
        <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-lg border border-amber-300/40">
          <FolderGit2 className="w-5 h-5 drop-shadow" />
        </div>
      ),
    },
    {
      id: 'skills',
      label: strings.desktop.skills,
      sublabel: strings.desktop.skillsSub,
      icon: (
        <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-orange-500 to-orange-700 flex items-center justify-center text-white shadow-lg border border-orange-300/40">
          <Zap className="w-5 h-5 drop-shadow" />
        </div>
      ),
    },
    {
      id: 'timeline',
      label: strings.desktop.timeline,
      sublabel: strings.desktop.timelineSub,
      icon: (
        <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-purple-500 to-purple-800 flex items-center justify-center text-white shadow-lg border border-purple-300/40">
          <Clock className="w-5 h-5 drop-shadow" />
        </div>
      ),
    },
    {
      id: 'resume',
      label: strings.desktop.resume,
      sublabel: strings.desktop.resumeSub,
      icon: (
        <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-rose-500 to-red-700 flex items-center justify-center text-white shadow-lg border border-rose-300/40">
          <FileText className="w-5 h-5 drop-shadow" />
        </div>
      ),
    },
    {
      id: 'terminal',
      label: strings.desktop.terminal,
      sublabel: strings.desktop.terminalSub,
      icon: (
        <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-neutral-900 to-black flex items-center justify-center text-emerald-400 shadow-lg border border-emerald-500/40">
          <Terminal className="w-5 h-5 drop-shadow" />
        </div>
      ),
    },
    {
      id: 'contact',
      label: strings.desktop.contact,
      sublabel: strings.desktop.contactSub,
      icon: (
        <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-lg border border-blue-300/40">
          <Mail className="w-5 h-5 drop-shadow" />
        </div>
      ),
    },
  ];

  // Mouse Parallax for 3D spatial depth (desktop only)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768) {
        const x = (e.clientX / window.innerWidth - 0.5) * 4;
        const y = (e.clientY / window.innerHeight - 0.5) * 4;
        setMouseOffset({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Arrow Keys Navigation on Desktop Icons
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((document.activeElement?.tagName || ''))) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedDesktopIndex((selectedDesktopIndex + 1) % desktopItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedDesktopIndex((selectedDesktopIndex - 1 + desktopItems.length) % desktopItems.length);
      } else if (e.key === 'Enter') {
        const activeItem = desktopItems[selectedDesktopIndex];
        if (activeItem) {
          const btn = iconRefs.current[selectedDesktopIndex];
          const rect = btn?.getBoundingClientRect();
          const origin = rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined;
          onOpenApp(activeItem.id, origin);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDesktopIndex, setSelectedDesktopIndex, desktopItems, onOpenApp]);

  if (isActivitiesOpen) return null;

  const handleClick = (id: WindowId, idx: number, e: React.MouseEvent<HTMLElement>) => {
    setSelectedDesktopIndex(idx);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      const rect = e.currentTarget.getBoundingClientRect();
      onOpenApp(id, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
  };

  const handleDoubleClick = (id: WindowId, e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onOpenApp(id, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <motion.div
      animate={{ x: mouseOffset.x, y: mouseOffset.y }}
      transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      className="hidden md:grid grid-cols-1 gap-3 absolute top-12 left-5 sm:left-6 z-10 select-none"
    >
      {desktopItems.map((item, idx) => {
        const isSelected = selectedDesktopIndex === idx;

        return (
          <button
            key={item.id}
            ref={(el) => { iconRefs.current[idx] = el; }}
            type="button"
            onClick={(e) => handleClick(item.id, idx, e)}
            onDoubleClick={(e) => handleDoubleClick(item.id, e)}
            className={`w-22 p-1.5 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer desktop-icon-highlight border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
              isSelected
                ? 'bg-orange-600/30 border-orange-500/60 shadow-lg'
                : 'border-transparent hover:bg-white/10'
            }`}
            title={`Double-click or press Enter to open ${item.label}`}
          >
            {/* Realistic App / Folder Graphic Tile */}
            <div className="relative flex items-center justify-center">
              {item.icon}
            </div>

            {/* Label Text Centered */}
            <div className="text-center space-y-0.5">
              <span
                className={`text-[11px] text-white block font-medium px-1 rounded leading-tight truncate max-w-[80px] ${
                  isSelected ? 'bg-orange-600 text-white font-semibold' : 'text-shadow'
                }`}
              >
                {item.label}
              </span>
              <span className="text-[9px] text-neutral-400 block font-mono">
                {item.sublabel}
              </span>
            </div>
          </button>
        );
      })}
    </motion.div>
  );
};
