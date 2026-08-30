import React from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Folder, Globe, Mail, User, FileText, Search, ExternalLink, Code, Layers, FileCode, CheckCircle2 } from 'lucide-react';
import { useGnomeStore } from '../../store/useGnomeStore';
import { WindowId } from '../../types/gnome';
import { portfolioData } from '../../data/portfolio';
import { springPhysics } from '../../lib/animations';

export const ActivitiesOverview: React.FC = () => {
  const { isActivitiesOpen, setActivitiesOpen, openApp, themeMode, accentColor } = useGnomeStore();

  if (!isActivitiesOpen) return null;

  const appItems = [
    { id: 'terminal' as WindowId, title: 'Terminal', desc: 'Interactive Ubuntu Bash Shell', icon: <Terminal className="w-5 h-5 text-emerald-400" /> },
    { id: 'files' as WindowId, title: 'Files (Nautilus)', desc: 'Cloud Architectures & Project Repositories', icon: <Folder className="w-5 h-5 text-amber-400" /> },
    { id: 'about' as WindowId, title: 'Settings (About & Theme)', desc: 'Bio, Dark/Light Mode, Specs & Education', icon: <User className="w-5 h-5 text-orange-400" /> },
    { id: 'resume' as WindowId, title: 'Resume (Gedit)', desc: 'Plaintext Resume & CV Download', icon: <FileText className="w-5 h-5 text-purple-400" /> },
    { id: 'contact' as WindowId, title: 'Thunderbird Mail', desc: 'Email Yash Baviskar', icon: <Mail className="w-5 h-5 text-blue-400" /> },
    { id: 'browser' as WindowId, title: 'Web Browser', desc: 'Cloud Architecture Telemetry', icon: <Globe className="w-5 h-5 text-sky-400" /> },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0c0312]/90 backdrop-blur-3xl z-60 flex flex-col items-center justify-start pt-14 sm:pt-16 px-4 select-none"
        onClick={() => setActivitiesOpen(false)}
      >
        <motion.div
          initial={{ y: -25, scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: -20, scale: 0.95, opacity: 0 }}
          transition={springPhysics}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl"
        >
          {/* cmdk Command Palette Root */}
          <Command
            className={`rounded-2xl border shadow-2xl overflow-hidden font-sans ${
              themeMode === 'dark' ? 'bg-[#18181b]/95 border-white/20 text-white' : 'bg-white/95 border-neutral-300 text-neutral-900'
            }`}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <Search className="w-4 h-4 text-neutral-400 shrink-0" />
              <Command.Input
                placeholder="Type to search apps, cloud projects, skills, or commands..."
                autoFocus
                className="w-full bg-transparent text-sm focus:outline-none placeholder:text-neutral-500 font-sans"
              />
              <kbd className="px-2 py-0.5 text-[10px] rounded bg-neutral-800 border border-white/10 text-neutral-400 font-mono">
                ESC
              </kbd>
            </div>

            {/* Search Results List */}
            <Command.List className="max-h-96 overflow-y-auto gnome-scrollbar p-2 space-y-2">
              <Command.Empty className="py-8 text-center text-xs text-neutral-400 font-mono">
                No matching applications or files found.
              </Command.Empty>

              {/* Applications Group */}
              <Command.Group heading="Applications" className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2.5 py-1">
                {appItems.map((app) => (
                  <Command.Item
                    key={app.id}
                    onSelect={() => {
                      openApp(app.id);
                      setActivitiesOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer hover:bg-orange-600 hover:text-white transition-colors group data-[selected=true]:bg-orange-600 data-[selected=true]:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                        {app.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-tight">{app.title}</div>
                        <div className="text-[10.5px] opacity-75">{app.desc}</div>
                      </div>
                    </div>
                    <span className="text-[10px] opacity-60 font-mono">Launch ↵</span>
                  </Command.Item>
                ))}
              </Command.Group>

              {/* Cloud Repositories Group */}
              <Command.Group heading="Cloud Projects" className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2.5 py-1 pt-2 border-t border-white/5">
                {portfolioData.projects.map((proj) => (
                  <Command.Item
                    key={proj.id}
                    onSelect={() => {
                      openApp('files');
                      setActivitiesOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer hover:bg-orange-600 hover:text-white transition-colors group data-[selected=true]:bg-orange-600 data-[selected=true]:text-white"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                        <FileCode className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold leading-tight truncate">{proj.name}</div>
                        <div className="text-[10.5px] opacity-75 truncate">{proj.tagline}</div>
                      </div>
                    </div>
                    <span className="text-[10px] opacity-60 font-mono shrink-0 ml-2">Inspect</span>
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
