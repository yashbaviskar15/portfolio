import React from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Folder,
  Globe,
  Mail,
  User,
  FileText,
  Search,
  ExternalLink,
  Code,
  Layers,
  FileCode,
  CheckCircle2,
  FolderGit2,
  Zap,
  Clock,
  Activity,
  LayoutGrid,
  Image as ImageIcon,
  Calculator as CalcIcon,
  CloudSun,
  Monitor,
} from 'lucide-react';
import { useGnomeStore } from '../../store/useGnomeStore';
import { WindowId } from '../../types/gnome';
import { portfolioData } from '../../data/portfolio';
import { springPhysics } from '../../lib/animations';

export const ActivitiesOverview: React.FC = () => {
  const {
    isActivitiesOpen,
    setActivitiesOpen,
    openApp,
    themeMode,
    accentColor,
    activeWorkspace,
    switchWorkspace,
    windows,
  } = useGnomeStore();

  const appItems = [
    { id: 'terminal' as WindowId, title: 'Terminal', desc: 'Interactive Ubuntu Bash Shell', icon: <Terminal className="w-5 h-5 text-emerald-400" /> },
    { id: 'projects' as WindowId, title: 'Projects Showcase', desc: 'AWS 3-Tier, Telemetry, CI/CD & CloudOS', icon: <FolderGit2 className="w-5 h-5 text-amber-400" /> },
    { id: 'skills' as WindowId, title: 'Technical Skills Matrix', desc: 'AWS, Terraform, Docker, Kubernetes & Linux', icon: <Zap className="w-5 h-5 text-orange-400" /> },
    { id: 'timeline' as WindowId, title: 'Career & Education', desc: 'Engineering Milestones & Degree', icon: <Clock className="w-5 h-5 text-purple-400" /> },
    { id: 'files' as WindowId, title: 'Files (Nautilus)', desc: 'Virtual File System & Project Repositories', icon: <Folder className="w-5 h-5 text-amber-400" /> },
    { id: 'text-editor' as WindowId, title: 'Text Editor (gedit)', desc: 'Document & Terraform HCL Editor', icon: <FileCode className="w-5 h-5 text-emerald-400" /> },
    { id: 'resume' as WindowId, title: 'Document Viewer (Evince)', desc: 'Yash Baviskar CV & PDF Viewer', icon: <FileText className="w-5 h-5 text-purple-400" /> },
    { id: 'image-viewer' as WindowId, title: 'Image Viewer (Eye of GNOME)', desc: 'Cloud Architecture Maps & Diagrams', icon: <ImageIcon className="w-5 h-5 text-sky-400" /> },
    { id: 'software-center' as WindowId, title: 'Software Center', desc: 'Skills & Packages Catalog', icon: <LayoutGrid className="w-5 h-5 text-orange-400" /> },
    { id: 'monitor' as WindowId, title: 'System Monitor & Grafana', desc: 'Live CPU, RAM & Telemetry Stack', icon: <Activity className="w-5 h-5 text-rose-400" /> },
    { id: 'browser' as WindowId, title: 'Web Browser', desc: 'Cloud Architecture Explorer', icon: <Globe className="w-5 h-5 text-sky-400" /> },
    { id: 'about' as WindowId, title: 'Settings', desc: 'Appearance, Wallpapers, Display & About', icon: <User className="w-5 h-5 text-orange-400" /> },
    { id: 'contact' as WindowId, title: 'Contact Yash', desc: 'Email & Direct Message', icon: <Mail className="w-5 h-5 text-blue-400" /> },
    { id: 'calculator' as WindowId, title: 'Calculator', desc: 'Quick Arithmetic Utility', icon: <CalcIcon className="w-5 h-5 text-amber-400" /> },
    { id: 'clocks' as WindowId, title: 'Clocks', desc: 'World Time Zones', icon: <Clock className="w-5 h-5 text-purple-400" /> },
    { id: 'weather' as WindowId, title: 'Weather', desc: 'Cloud Region Weather', icon: <CloudSun className="w-5 h-5 text-amber-400" /> },
  ];

  const ws1Count = windows.filter((w) => w.isOpen && (w.workspace === 1 || !w.workspace)).length;
  const ws2Count = windows.filter((w) => w.isOpen && w.workspace === 2).length;

  return (
    <AnimatePresence>
      {isActivitiesOpen && (
        <motion.div
          key="activities-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-[#0c0312]/92 backdrop-blur-3xl z-60 flex flex-col items-center justify-start pt-12 sm:pt-14 px-4 select-none overflow-y-auto gnome-scrollbar"
          onClick={() => setActivitiesOpen(false)}
        >
          {/* Top: Workspaces Switcher Carousel */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 mb-6 p-2 rounded-2xl bg-black/40 border border-white/10"
          >
            <button
              type="button"
              onClick={() => switchWorkspace(1)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeWorkspace === 1
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Workspace 1</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/30 text-[10px] font-mono">
                {ws1Count} apps
              </span>
            </button>

            <button
              type="button"
              onClick={() => switchWorkspace(2)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeWorkspace === 2
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Workspace 2</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/30 text-[10px] font-mono">
                {ws2Count} apps
              </span>
            </button>
          </div>

          <motion.div
            key="activities-cmdk-card"
            initial={{ y: -20, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -15, scale: 0.96, opacity: 0 }}
            transition={springPhysics}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl pb-8"
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
                  No matching applications, files, or commands found.
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
                        openApp('projects');
                        setActivitiesOpen(false);
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer hover:bg-orange-600 hover:text-white transition-colors group data-[selected=true]:bg-orange-600 data-[selected=true]:text-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-black/40 border border-white/10 text-amber-400">
                          <FolderGit2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight">{proj.name}</div>
                          <div className="text-[10.5px] opacity-75">{proj.tagline}</div>
                        </div>
                      </div>
                      <span className="text-[10px] opacity-60 font-mono">View ↵</span>
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
