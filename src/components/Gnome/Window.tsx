import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Square, Copy, X } from 'lucide-react';
import { windowSpawnVariants, mobileWindowVariants } from '../../lib/animations';
import { WindowPosition, WindowSize } from '../../types/gnome';
import { useGnomeStore } from '../../store/useGnomeStore';

interface WindowProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  isFocused: boolean;
  origin?: { x: number; y: number };
  position: WindowPosition;
  size: WindowSize;
  onClose: () => void;
  onMinimize: () => void;
  onMaximizeToggle: () => void;
  onFocus: () => void;
  onUpdateBounds: (position: WindowPosition, size: WindowSize) => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  isFocused,
  origin,
  position,
  size,
  onClose,
  onMinimize,
  onMaximizeToggle,
  onFocus,
  onUpdateBounds,
  children,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isCloseHovered, setIsCloseHovered] = useState<boolean>(false);
  const { themeMode, accentColor } = useGnomeStore();

  // Responsive tracking
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen || isMinimized) return null;

  // Mobile layout snap (<768px): Full viewport minus topbar/dock
  if (isMobile) {
    return (
      <motion.div
        variants={mobileWindowVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          position: 'fixed',
          top: '32px',
          left: '0px',
          right: '0px',
          width: '100vw',
          height: 'calc(100dvh - 32px - 56px)',
          zIndex: zIndex + 30,
        }}
        onClick={onFocus}
        role="region"
        aria-label={title}
        className={`flex flex-col select-none border-t shadow-2xl overflow-hidden ${
          themeMode === 'dark' ? 'bg-[#1e1e1e] border-white/10' : 'bg-white border-neutral-300'
        }`}
      >
        {/* Authentic Mobile HeaderBar */}
        <div
          className={`h-11 px-3.5 flex items-center justify-between shrink-0 border-b select-none transition-colors duration-150 ${
            themeMode === 'dark'
              ? isFocused ? 'bg-[#282828] text-white border-white/10' : 'bg-[#1e1e1e] text-neutral-400 border-white/5 opacity-60'
              : isFocused ? 'bg-[#ebebeb] text-neutral-900 border-neutral-300' : 'bg-[#f4f4f4] text-neutral-600 border-neutral-200 opacity-60'
          }`}
          style={isFocused ? { borderTop: `2px solid ${accentColor}` } : {}}
        >
          <div className="flex items-center gap-2.5 text-xs font-semibold truncate">
            {icon && <span className="shrink-0">{icon}</span>}
            <span className="truncate">{title}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="w-7 h-7 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dedicated Mobile Scrollable Body */}
        <div
          className={`gnome-mobile-window-content gnome-scrollbar select-text ${
            themeMode === 'dark' ? 'bg-[#1a1a1a] text-neutral-200' : 'bg-neutral-100 text-neutral-800'
          }`}
        >
          {children}
        </div>
      </motion.div>
    );
  }

  // Desktop Maximized Mode
  if (isMaximized) {
    return (
      <motion.div
        layout
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: '32px',
          left: '0px',
          width: '100vw',
          height: 'calc(100vh - 32px)',
          zIndex,
        }}
        onClick={onFocus}
        role="region"
        aria-label={title}
        className={`gnome-window flex flex-col select-none shadow-2xl overflow-hidden transition-colors duration-150 ${
          themeMode === 'dark' ? 'bg-[#1e1e1e] border-white/10' : 'bg-white border-neutral-300'
        }`}
      >
        {/* Maximized Title Bar */}
        <div
          onDoubleClick={onMaximizeToggle}
          className={`h-10 px-4 flex items-center justify-between shrink-0 border-b select-none transition-colors duration-150 ${
            themeMode === 'dark'
              ? isFocused ? 'bg-[#282828] text-white border-white/10' : 'bg-[#1e1e1e] text-neutral-400 border-white/5 opacity-60'
              : isFocused ? 'bg-[#ebebeb] text-neutral-900 border-neutral-300' : 'bg-[#f4f4f4] text-neutral-600 border-neutral-200 opacity-60'
          }`}
          style={isFocused ? { borderTop: `2px solid ${accentColor}` } : {}}
        >
          <div className="flex items-center gap-2.5 text-xs font-semibold truncate pr-4">
            {icon && <span className="shrink-0">{icon}</span>}
            <span className="truncate">{title}</span>
          </div>

          {/* Standardized Traffic-Light Dots: Minimize (grey), Maximize (grey), Close (red) */}
          <div className="flex items-center gap-1.5 ml-2 shrink-0">
            <motion.button
              type="button"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={onMinimize}
              aria-label="Minimize"
              className="w-5.5 h-5.5 rounded-full bg-neutral-700/80 hover:bg-neutral-600 text-neutral-300 flex items-center justify-center cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <Minus className="w-3 h-3" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={onMaximizeToggle}
              aria-label="Restore"
              className="w-5.5 h-5.5 rounded-full bg-neutral-700/80 hover:bg-neutral-600 text-neutral-300 flex items-center justify-center cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <Copy className="w-3 h-3" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setIsCloseHovered(true)}
              onMouseLeave={() => setIsCloseHovered(false)}
              onClick={onClose}
              aria-label="Close"
              className="w-5.5 h-5.5 rounded-full bg-neutral-700/80 hover:bg-[#e95420] text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <X className="w-3.5 h-3.5 font-bold" />
            </motion.button>
          </div>
        </div>

        {/* Maximized Scrollable Body */}
        <div
          className={`gnome-window-content gnome-scrollbar select-text ${
            themeMode === 'dark' ? 'bg-[#1a1a1a] text-neutral-200' : 'bg-neutral-100 text-neutral-800'
          }`}
        >
          {children}
        </div>
      </motion.div>
    );
  }

  // Desktop Floating & Resizable Window with Origin-Locked Spawn & Exit Animation
  return (
    <Rnd
      position={{ x: position.x, y: position.y }}
      size={{ width: size.width, height: size.height }}
      minWidth={360}
      minHeight={260}
      bounds="window"
      dragHandleClassName="gnome-titlebar-handle"
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
      onDragStop={(e, d) => {
        onUpdateBounds({ x: d.x, y: d.y }, size);
      }}
      onResizeStop={(e, direction, ref, delta, newPos) => {
        onUpdateBounds(newPos, {
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
        });
      }}
      onMouseDown={onFocus}
      style={{ zIndex }}
      className={`gnome-window rounded-t-xl rounded-b-md overflow-hidden flex flex-col transition-shadow duration-150 ${
        themeMode === 'dark'
          ? isFocused
            ? 'bg-[#1e1e1e] border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1)]'
            : 'bg-[#1a1a1a] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
          : isFocused
          ? 'bg-white border border-neutral-400 shadow-[0_25px_60px_rgba(0,0,0,0.25)]'
          : 'bg-[#f7f7f8] border border-neutral-300 shadow-[0_10px_25px_rgba(0,0,0,0.15)]'
      }`}
    >
      <div className="w-full h-full flex flex-col overflow-hidden">
        {/* Authentic Ubuntu GNOME HeaderBar */}
        <div
          onDoubleClick={onMaximizeToggle}
          className={`h-10 px-3.5 flex items-center justify-between select-none cursor-grab active:cursor-grabbing shrink-0 border-b gnome-titlebar-handle transition-all duration-150 ${
            themeMode === 'dark'
              ? isFocused
                ? 'bg-[#282828] text-white border-white/10 opacity-100'
                : 'bg-[#1e1e1e] text-neutral-400 border-white/5 opacity-60'
              : isFocused
              ? 'bg-[#ebebeb] text-neutral-900 border-neutral-300 opacity-100'
              : 'bg-[#f4f4f4] text-neutral-600 border-neutral-200 opacity-60'
          }`}
          style={isFocused ? { borderTop: `2px solid ${accentColor}` } : {}}
        >
          {/* Left Side: Window Icon & Title (Truncates gracefully with ellipsis) */}
          <div className="flex items-center gap-2.5 text-xs font-semibold truncate pointer-events-none pr-3">
            {icon && <span className="shrink-0">{icon}</span>}
            <span className="truncate">{title}</span>
          </div>

          {/* Right Side: Standardized Traffic-Light Dots */}
          <div className="flex items-center gap-1.5 ml-2 shrink-0">
            <motion.button
              type="button"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              aria-label={`Minimize ${title}`}
              className="w-5.5 h-5.5 rounded-full bg-neutral-700/80 hover:bg-neutral-600 active:bg-neutral-500 flex items-center justify-center text-neutral-300 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-500"
              title="Minimize"
            >
              <Minus className="w-3 h-3" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onMaximizeToggle();
              }}
              aria-label={`Maximize ${title}`}
              className="w-5.5 h-5.5 rounded-full bg-neutral-700/80 hover:bg-neutral-600 active:bg-neutral-500 flex items-center justify-center text-neutral-300 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-500"
              title="Maximize"
            >
              <Square className="w-2.5 h-2.5" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setIsCloseHovered(true)}
              onMouseLeave={() => setIsCloseHovered(false)}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label={`Close ${title}`}
              className="w-5.5 h-5.5 rounded-full bg-neutral-700/80 hover:bg-[#e95420] active:bg-[#c7162b] flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-500"
              title="Close"
            >
              <X className="w-3.5 h-3.5 font-bold" />
            </motion.button>
          </div>
        </div>

        {/* Floating Window Scrollable Body */}
        <div
          className={`gnome-window-content gnome-scrollbar select-text flex-1 min-h-0 ${
            themeMode === 'dark' ? 'bg-[#1a1a1a] text-neutral-200' : 'bg-neutral-100 text-neutral-800'
          }`}
        >
          {children}
        </div>
      </div>
    </Rnd>
  );
};
