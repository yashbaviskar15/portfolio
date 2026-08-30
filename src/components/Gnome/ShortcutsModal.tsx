import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X, Command } from 'lucide-react';
import { useGnomeStore } from '../../store/useGnomeStore';
import { springPhysics } from '../../lib/animations';

export const ShortcutsModal: React.FC = () => {
  const { isShortcutsHelpOpen, setShortcutsHelpOpen, themeMode, accentColor } = useGnomeStore();

  if (!isShortcutsHelpOpen) return null;

  const shortcutGroups = [
    {
      title: 'Global Navigation',
      items: [
        { keys: ['Super', 'Ctrl + Space'], desc: 'Open Activities Overview & Search' },
        { keys: ['Alt + Tab'], desc: 'Cycle & Switch between open windows' },
        { keys: ['?'], desc: 'Toggle Keyboard Shortcuts Cheat Sheet' },
        { keys: ['Esc'], desc: 'Close overlay, menu, or search' },
      ],
    },
    {
      title: 'Quick App Launchers',
      items: [
        { keys: ['Ctrl + Alt + T'], desc: 'Open Ubuntu Bash Terminal' },
        { keys: ['Ctrl + Alt + F'], desc: 'Open Projects / Files (Nautilus)' },
        { keys: ['Ctrl + Alt + A'], desc: 'Open System Settings & About' },
        { keys: ['Ctrl + Alt + R'], desc: 'Open Resume.txt (Gedit)' },
        { keys: ['Ctrl + Alt + C'], desc: 'Open Thunderbird Mail' },
      ],
    },
    {
      title: 'Window Management (Active Window)',
      items: [
        { keys: ['Ctrl + W'], desc: 'Close active window' },
        { keys: ['Ctrl + M'], desc: 'Minimize active window' },
        { keys: ['Ctrl + Shift + M', 'F11'], desc: 'Maximize / Restore toggle' },
        { keys: ['Ctrl + Arrows'], desc: 'Nudge window position (20px)' },
        { keys: ['Ctrl + Alt + Shift + ←/→'], desc: 'Snap window to left/right half screen' },
      ],
    },
    {
      title: 'Terminal Shell',
      items: [
        { keys: ['↑ / ↓'], desc: 'Cycle command history' },
        { keys: ['Tab'], desc: 'Autocomplete commands' },
        { keys: ['Ctrl + L'], desc: 'Clear terminal screen' },
      ],
    },
  ];

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-75 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 select-none"
        onClick={() => setShortcutsHelpOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={springPhysics}
          onClick={(e) => e.stopPropagation()}
          className={`max-w-2xl w-full max-h-[85vh] overflow-y-auto gnome-scrollbar p-6 rounded-3xl border shadow-2xl space-y-6 ${
            themeMode === 'dark' ? 'bg-[#18181b]/95 border-white/15 text-white' : 'bg-white border-neutral-300 text-neutral-900'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/30">
                <Keyboard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-heading">GNOME Keyboard Shortcuts</h3>
                <p className="text-xs text-neutral-400">Complete keyboard interaction parity</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShortcutsHelpOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Shortcuts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shortcutGroups.map((group) => (
              <div
                key={group.title}
                className={`p-3.5 rounded-2xl border space-y-2.5 ${
                  themeMode === 'dark' ? 'bg-neutral-900/80 border-white/5' : 'bg-neutral-50 border-neutral-200'
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider font-mono block" style={{ color: accentColor }}>
                  {group.title}
                </span>
                <div className="space-y-1.5">
                  {group.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1">
                      <span className="text-neutral-300 pr-2">{item.desc}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        {item.keys.map((k) => (
                          <kbd
                            key={k}
                            className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-200 font-mono text-[10px] border border-white/10 shadow-xs"
                          >
                            {k}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-neutral-500 font-mono pt-1">
            Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-white/10 text-neutral-300">Esc</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-white/10 text-neutral-300">?</kbd> to dismiss
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
