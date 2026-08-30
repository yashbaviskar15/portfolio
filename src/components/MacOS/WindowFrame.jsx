import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function WindowFrame({
  id,
  title,
  icon,
  isOpen,
  onClose,
  onMinimize,
  onFocus,
  zIndex = 20,
  children,
  defaultWidth = 'max-w-4xl',
  defaultHeight = 'h-[540px]',
}) {
  const [isMaximized, setIsMaximized] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none flex items-center justify-center p-2 sm:p-6"
      style={{ zIndex }}
      onClick={onFocus}
    >
      <motion.div
        drag={!isMaximized}
        dragMomentum={false}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex flex-col rounded-2xl glass-window shadow-2xl border border-white/20 overflow-hidden text-white backdrop-blur-3xl transition-all duration-200 ${
          isMaximized ? 'w-full h-[calc(100vh-4rem)] max-w-none rounded-none mt-7 mb-14' : `${defaultWidth} ${defaultHeight} w-full`
        }`}
      >
        {/* macOS Window Titlebar */}
        <div
          className="h-10 px-4 flex items-center justify-between border-b border-white/15 bg-white/10 select-none cursor-move shrink-0"
          onDoubleClick={() => setIsMaximized(!isMaximized)}
        >
          {/* Traffic Light Buttons */}
          <div className="flex items-center gap-2">
            {/* Close */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:brightness-90 flex items-center justify-center text-[8px] text-black/60 group cursor-pointer"
              title="Close"
            >
              <i className="bi bi-x opacity-0 group-hover:opacity-100 font-bold" />
            </button>

            {/* Minimize */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize ? onMinimize() : onClose();
              }}
              className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:brightness-90 flex items-center justify-center text-[8px] text-black/60 group cursor-pointer"
              title="Minimize"
            >
              <i className="bi bi-dash opacity-0 group-hover:opacity-100 font-bold" />
            </button>

            {/* Maximize */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMaximized(!isMaximized);
              }}
              className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:brightness-90 flex items-center justify-center text-[8px] text-black/60 group cursor-pointer"
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              <i className="bi bi-arrows-angle-expand opacity-0 group-hover:opacity-100 font-bold" />
            </button>
          </div>

          {/* Window Title */}
          <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
            {icon && <i className={`bi ${icon} text-white/70`} />}
            <span>{title}</span>
          </div>

          {/* Window Controls / Space */}
          <div className="w-14 flex justify-end">
            <button
              type="button"
              onClick={() => setIsMaximized(!isMaximized)}
              className="text-white/40 hover:text-white text-xs p-1"
              title={isMaximized ? 'Restore' : 'Fullscreen'}
            >
              <i className={`bi ${isMaximized ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'}`} />
            </button>
          </div>
        </div>

        {/* Window Body */}
        <div className="flex-1 overflow-y-auto macos-scrollbar bg-slate-950/40 relative">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
