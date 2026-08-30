import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Folder, Globe, Mail, User, FileText, AppWindow, Activity, FolderGit2, Zap, Clock } from 'lucide-react';
import { useGnomeStore } from '../../store/useGnomeStore';
import { WindowId } from '../../types/gnome';
import { springPhysics } from '../../lib/animations';

export const AltTabSwitcher: React.FC = () => {
  const {
    windows,
    isAltTabOpen,
    altTabSelectionIndex,
    setAltTabOpen,
    setAltTabSelection,
    focusApp,
    accentColor,
    themeMode,
  } = useGnomeStore();

  const openWindows = windows.filter((w) => w.isOpen);

  // Global Alt+Tab and Shift+Alt+Tab key listeners
  useEffect(() => {
    let isAltPressed = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        isAltPressed = true;
      }
      if (isAltPressed && (e.key === 'Tab' || e.key === '`')) {
        e.preventDefault();
        const currentOpen = useGnomeStore.getState().windows.filter((w) => w.isOpen);
        if (currentOpen.length === 0) return;

        if (!useGnomeStore.getState().isAltTabOpen) {
          setAltTabOpen(true);
          setAltTabSelection(0);
        } else {
          const currentIndex = useGnomeStore.getState().altTabSelectionIndex;
          const nextIndex = e.shiftKey
            ? (currentIndex - 1 + currentOpen.length) % currentOpen.length
            : (currentIndex + 1) % currentOpen.length;
          setAltTabSelection(nextIndex);
        }
      }
      if (useGnomeStore.getState().isAltTabOpen) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          const currentOpen = useGnomeStore.getState().windows.filter((w) => w.isOpen);
          const currentIndex = useGnomeStore.getState().altTabSelectionIndex;
          setAltTabSelection((currentIndex + 1) % currentOpen.length);
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const currentOpen = useGnomeStore.getState().windows.filter((w) => w.isOpen);
          const currentIndex = useGnomeStore.getState().altTabSelectionIndex;
          setAltTabSelection((currentIndex - 1 + currentOpen.length) % currentOpen.length);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        isAltPressed = false;
        if (useGnomeStore.getState().isAltTabOpen) {
          const currentOpen = useGnomeStore.getState().windows.filter((w) => w.isOpen);
          const selectedIndex = useGnomeStore.getState().altTabSelectionIndex;
          const selectedWin = currentOpen[selectedIndex];
          if (selectedWin) {
            focusApp(selectedWin.id as WindowId);
          }
          setAltTabOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [setAltTabOpen, setAltTabSelection, focusApp]);

  if (!isAltTabOpen || openWindows.length === 0) return null;

  const getWindowIcon = (id: string) => {
    switch (id) {
      case 'terminal':
        return <Terminal className="w-8 h-8 text-emerald-400" />;
      case 'files':
        return <Folder className="w-8 h-8 text-amber-400" />;
      case 'projects':
        return <FolderGit2 className="w-8 h-8 text-amber-400" />;
      case 'skills':
        return <Zap className="w-8 h-8 text-orange-400" />;
      case 'timeline':
        return <Clock className="w-8 h-8 text-purple-400" />;
      case 'about':
        return <User className="w-8 h-8 text-orange-400" />;
      case 'resume':
        return <FileText className="w-8 h-8 text-purple-400" />;
      case 'contact':
        return <Mail className="w-8 h-8 text-blue-400" />;
      case 'browser':
        return <Globe className="w-8 h-8 text-sky-400" />;
      case 'monitor':
        return <Activity className="w-8 h-8 text-rose-400" />;
      default:
        return <AppWindow className="w-8 h-8 text-neutral-300" />;
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-70 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 select-none"
        onClick={() => setAltTabOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={springPhysics}
          className={`p-4 rounded-3xl border shadow-2xl backdrop-blur-2xl flex flex-wrap items-center justify-center gap-3 max-w-4xl ${
            themeMode === 'dark' ? 'bg-[#18181b]/95 border-white/20 text-white' : 'bg-white/95 border-neutral-300 text-neutral-900 shadow-2xl'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {openWindows.map((win, idx) => {
            const isSelected = idx === altTabSelectionIndex;

            return (
              <button
                key={win.id}
                type="button"
                onClick={() => {
                  focusApp(win.id as WindowId);
                  setAltTabOpen(false);
                }}
                className={`w-28 h-32 p-3 rounded-2xl flex flex-col items-center justify-center gap-2.5 transition-all cursor-pointer border ${
                  isSelected
                    ? 'scale-105 shadow-xl'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
                style={
                  isSelected
                    ? {
                        backgroundColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                        borderColor: accentColor,
                      }
                    : {}
                }
              >
                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 shadow-md">
                  {getWindowIcon(win.id)}
                </div>
                <span className="text-[11px] font-semibold truncate max-w-full text-center leading-tight">
                  {win.title.split('—')[0]?.split(':')[0] || win.title}
                </span>
              </button>
            );
          })}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
