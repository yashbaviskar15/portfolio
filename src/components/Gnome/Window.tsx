import React, { useState, useEffect, Component, ReactNode, ErrorInfo } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Square, Copy, X, ArrowLeft, RotateCcw, AlertTriangle } from 'lucide-react';
import { mobileWindowVariants } from '../../lib/animations';
import { WindowPosition, WindowSize } from '../../types/gnome';
import { useGnomeStore } from '../../store/useGnomeStore';

// Per-Window Error Boundary to prevent one crashed app from breaking the desktop
interface WindowErrorBoundaryProps {
  appTitle: string;
  onReset: () => void;
  children: ReactNode;
}

interface WindowErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class WindowErrorBoundary extends Component<WindowErrorBoundaryProps, WindowErrorBoundaryState> {
  public state: WindowErrorBoundaryState = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): WindowErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error in app ${this.props.appTitle}:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 h-full flex flex-col items-center justify-center text-center space-y-3 font-mono bg-neutral-900 text-neutral-200">
          <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white font-heading">Application Error</h3>
            <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
              {this.props.appTitle} encountered an unexpected runtime error.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              this.props.onReset();
            }}
            className="px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reload App</span>
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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

  // Responsive breakpoint tracking
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen || isMinimized) return null;

  // Mobile layout (<768px): Fullscreen app shell with native mobile navigation bar
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
        role="dialog"
        aria-modal="false"
        aria-label={title}
        className={`flex flex-col select-none border-t shadow-2xl overflow-hidden ${
          themeMode === 'dark' ? 'bg-[#1e1e1e] border-white/10' : 'bg-white border-neutral-300'
        }`}
      >
        {/* Authentic Mobile HeaderBar with prominent Back / Close navigation */}
        <div
          className={`h-11 px-3 flex items-center justify-between shrink-0 border-b select-none transition-colors duration-150 ${
            themeMode === 'dark'
              ? isFocused ? 'bg-[#282828] text-white border-white/10' : 'bg-[#1e1e1e] text-neutral-400 border-white/5 opacity-80'
              : isFocused ? 'bg-[#ebebeb] text-neutral-900 border-neutral-300' : 'bg-[#f4f4f4] text-neutral-600 border-neutral-200 opacity-80'
          }`}
          style={isFocused ? { borderTop: `2px solid ${accentColor}` } : {}}
        >
          <div className="flex items-center gap-2 text-xs font-semibold truncate">
            <button
              type="button"
              onClick={onClose}
              aria-label="Back to desktop"
              className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer transition-colors active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            {icon && <span className="shrink-0">{icon}</span>}
            <span className="truncate">{title}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title} (Esc)`}
            className="w-7 h-7 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center cursor-pointer shadow-xs active:scale-95 focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dedicated Mobile Scrollable Body with Error Boundary */}
        <div
          className={`gnome-mobile-window-content gnome-scrollbar select-text flex-1 overflow-y-auto ${
            themeMode === 'dark' ? 'bg-[#1a1a1a] text-neutral-200' : 'bg-neutral-100 text-neutral-800'
          }`}
        >
          <WindowErrorBoundary appTitle={title} onReset={onFocus}>
            {children}
          </WindowErrorBoundary>
        </div>
      </motion.div>
    );
  }

  // Desktop Maximized Mode: Respectful margins (leaves dock visible & accessible at the bottom!)
  if (isMaximized) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 8, transition: { duration: 0.14 } }}
        transition={{ type: 'spring', stiffness: 520, damping: 32 }}
        style={{
          position: 'fixed',
          top: '38px',
          left: '14px',
          right: '14px',
          width: 'calc(100vw - 28px)',
          height: 'calc(100vh - 38px - 74px)',
          zIndex,
        }}
        onClick={onFocus}
        role="dialog"
        aria-label={title}
        className={`gnome-window rounded-xl border flex flex-col select-none shadow-[0_22px_55px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12)] overflow-hidden transition-colors duration-150 ${
          themeMode === 'dark' ? 'bg-[#1e1e1e] border-white/15' : 'bg-white border-neutral-300'
        }`}
      >
        {/* Maximized Title Bar */}
        <div
          onDoubleClick={onMaximizeToggle}
          className={`h-9 px-3.5 flex items-center justify-between shrink-0 border-b select-none transition-colors duration-150 ${
            themeMode === 'dark'
              ? isFocused ? 'bg-[#282828] text-white border-white/10' : 'bg-[#1e1e1e] text-neutral-400 border-white/5 opacity-80'
              : isFocused ? 'bg-[#ebebeb] text-neutral-900 border-neutral-300' : 'bg-[#f4f4f4] text-neutral-600 border-neutral-200 opacity-80'
          }`}
          style={isFocused ? { borderTop: `2px solid ${accentColor}` } : {}}
        >
          <div className="flex items-center gap-2 text-xs font-semibold tracking-tight truncate pr-4">
            {icon && <span className="shrink-0">{icon}</span>}
            <span className="truncate">{title}</span>
          </div>

          {/* Traffic-Light Window Controls */}
          <div className="flex items-center gap-2 ml-2 shrink-0">
            <motion.button
              type="button"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={onMinimize}
              aria-label={`Minimize ${title} (Ctrl+M)`}
              className="w-6 h-6 rounded-full bg-neutral-700/80 hover:bg-neutral-600 active:bg-neutral-500 text-neutral-200 flex items-center justify-center cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-orange-500 shadow-xs"
            >
              <Minus className="w-3 h-3 stroke-[2.5]" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={onMaximizeToggle}
              aria-label={`Restore ${title}`}
              className="w-6 h-6 rounded-full bg-neutral-700/80 hover:bg-neutral-600 active:bg-neutral-500 text-neutral-200 flex items-center justify-center cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-orange-500 shadow-xs"
            >
              <Copy className="w-3 h-3 stroke-[2.2]" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setIsCloseHovered(true)}
              onMouseLeave={() => setIsCloseHovered(false)}
              onClick={onClose}
              aria-label={`Close ${title} (Ctrl+W / Esc)`}
              className="w-6 h-6 rounded-full bg-neutral-700/80 hover:bg-[#e95420] active:bg-[#c7162b] text-neutral-200 hover:text-white flex items-center justify-center cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-orange-500 shadow-xs"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </motion.button>
          </div>
        </div>

        {/* Maximized Scrollable Body */}
        <div
          className={`gnome-window-content gnome-scrollbar select-text flex-1 overflow-y-auto ${
            themeMode === 'dark' ? 'bg-[#1a1a1a] text-neutral-200' : 'bg-neutral-100 text-neutral-800'
          }`}
        >
          <WindowErrorBoundary appTitle={title} onReset={onFocus}>
            {children}
          </WindowErrorBoundary>
        </div>
      </motion.div>
    );
  }

  // Desktop Floating & Resizable Window with Motion Open/Close Animation & Pointer Safety
  const originX = position.x + size.width / 2;
  const originY = position.y + size.height / 2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8, transition: { duration: 0.14, ease: 'easeOut' } }}
      transition={{ type: 'spring', stiffness: 520, damping: 32 }}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex,
        transformOrigin: `${originX}px ${originY}px`,
      }}
    >
      <div className="w-full h-full pointer-events-none">
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
          onClick={onFocus}
          style={{ zIndex, pointerEvents: 'auto' }}
          className={`gnome-window rounded-xl overflow-hidden flex flex-col transition-all duration-150 ${
            themeMode === 'dark'
              ? isFocused
                ? 'bg-[#1e1e1e] border border-white/20 shadow-[0_22px_55px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12)] ring-1 ring-white/10'
                : 'bg-[#1a1a1a] border border-white/10 shadow-[0_10px_28px_rgba(0,0,0,0.6)] opacity-95 hover:opacity-100'
              : isFocused
              ? 'bg-white border border-neutral-400 shadow-[0_22px_55px_rgba(0,0,0,0.22)] ring-1 ring-neutral-400/20'
              : 'bg-[#f7f7f8] border border-neutral-300 shadow-[0_10px_25px_rgba(0,0,0,0.15)] opacity-95 hover:opacity-100'
          }`}
        >
          {/* Inner container providing structure */}
          <div className="w-full h-full flex flex-col overflow-hidden">
            {/* Authentic Ubuntu GNOME HeaderBar */}
            <div
              onDoubleClick={onMaximizeToggle}
              className={`h-9 px-3 flex items-center justify-between select-none cursor-grab active:cursor-grabbing shrink-0 border-b gnome-titlebar-handle transition-all duration-150 ${
                themeMode === 'dark'
                  ? isFocused
                    ? 'bg-[#282828] text-white border-white/10 opacity-100'
                    : 'bg-[#1e1e1e] text-neutral-400 border-white/5 opacity-80 hover:opacity-100 hover:text-neutral-200'
                  : isFocused
                  ? 'bg-[#ebebeb] text-neutral-900 border-neutral-300 opacity-100'
                  : 'bg-[#f4f4f4] text-neutral-600 border-neutral-200 opacity-80 hover:opacity-100 hover:text-neutral-800'
              }`}
              style={isFocused ? { borderTop: `2px solid ${accentColor}` } : {}}
            >
              {/* Left Side: Window Icon & Title */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-tight truncate pointer-events-none pr-3">
                {icon && <span className="shrink-0">{icon}</span>}
                <span className="truncate">{title}</span>
              </div>

              {/* Right Side: Standardized Traffic-Light Dots */}
              <div className="flex items-center gap-2 ml-2 shrink-0">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMinimize();
                  }}
                  aria-label={`Minimize ${title} (Ctrl+M)`}
                  className="w-6 h-6 rounded-full bg-neutral-700/80 hover:bg-neutral-600 active:bg-neutral-500 flex items-center justify-center text-neutral-200 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-500 shadow-xs"
                >
                  <Minus className="w-3 h-3 stroke-[2.5]" />
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
                  className="w-6 h-6 rounded-full bg-neutral-700/80 hover:bg-neutral-600 active:bg-neutral-500 flex items-center justify-center text-neutral-200 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-500 shadow-xs"
                >
                  <Square className="w-2.5 h-2.5 stroke-[2.2]" />
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
                  aria-label={`Close ${title} (Ctrl+W / Esc)`}
                  className="w-6 h-6 rounded-full bg-neutral-700/80 hover:bg-[#e95420] active:bg-[#c7162b] flex items-center justify-center text-neutral-200 hover:text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-500 shadow-xs"
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </motion.button>
              </div>
            </div>

            {/* Floating Window Scrollable Body with Error Boundary */}
            <div
              className={`gnome-window-content gnome-scrollbar select-text flex-1 min-h-0 overflow-y-auto ${
                themeMode === 'dark' ? 'bg-[#1a1a1a] text-neutral-200' : 'bg-neutral-100 text-neutral-800'
              }`}
            >
              <WindowErrorBoundary appTitle={title} onReset={onFocus}>
                {children}
              </WindowErrorBoundary>
            </div>
          </div>
        </Rnd>
      </div>
    </motion.div>
  );
};
