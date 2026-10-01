import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Terminal,
  Folder,
  Globe,
  Mail,
  User,
  FileText,
  Activity,
  AppWindow,
  FolderGit2,
  Zap,
  Clock,
  FileCode,
  Image as ImageIcon,
  LayoutGrid,
  Calculator as CalcIcon,
  CloudSun,
} from 'lucide-react';
import { Toaster } from 'sonner';
import { useHotkeys } from 'react-hotkeys-hook';
import { useShortcutIsolation } from '../../hooks/useShortcutIsolation';
import { WindowId } from '../../types/gnome';
import { UbuntuWallpaper } from './UbuntuWallpaper';
import { ShutdownScreen } from './ShutdownScreen';
import { BootScreen } from './BootScreen';
import { LoginScreen } from './LoginScreen';
import { LockScreen } from './LockScreen';
import { ContextMenu } from './ContextMenu';
import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { DesktopIcons } from './DesktopIcons';
import { ConkyWidget } from './ConkyWidget';
import { Window } from './Window';
import { AltTabSwitcher } from './AltTabSwitcher';
import { ActivitiesOverview } from './ActivitiesOverview';
import { ShortcutsModal } from './ShortcutsModal';
import { WallpaperModal } from './WallpaperModal';
import { GuidedTour } from './GuidedTour';
import { DesktopSignature } from './DesktopSignature';
import { RecruiterView } from './RecruiterView';
import { TerminalApp } from './Apps/TerminalApp';
import { FilesApp } from './Apps/FilesApp';
import { AboutApp } from './Apps/AboutApp';
import { ResumeApp } from './Apps/ResumeApp';
import { ContactApp } from './Apps/ContactApp';
import { BrowserApp } from './Apps/BrowserApp';
import { SystemMonitorApp } from './Apps/SystemMonitorApp';
import { ProjectsApp } from './Apps/ProjectsApp';
import { SkillsApp } from './Apps/SkillsApp';
import { TimelineApp } from './Apps/TimelineApp';
import { TextEditorApp } from './Apps/TextEditorApp';
import { ImageViewerApp } from './Apps/ImageViewerApp';
import { SoftwareCenterApp } from './Apps/SoftwareCenterApp';
import { CalculatorApp } from './Apps/CalculatorApp';
import { ClocksApp } from './Apps/ClocksApp';
import { WeatherApp } from './Apps/WeatherApp';
import { useGnomeStore } from '../../store/useGnomeStore';

export const GnomeDesktop: React.FC = () => {
  const {
    isBooted,
    setBooted,
    isLoggedIn,
    setLoggedIn,
    isLocked,
    setLocked,
    isSuspended,
    setSuspended,
    isShutdown,
    setShutdown,
    activeWorkspace,
    switchWorkspace,
    isShortcutsHelpOpen,
    toggleShortcutsHelp,
    isRecruiterViewOpen,
    setRecruiterViewOpen,
    windows,
    activeWindowId,
    windowOrigins,
    activeSnapPreview,
    isActivitiesOpen,
    themeMode,
    accentColor,
    nightLight,
    openApp,
    closeApp,
    minimizeApp,
    toggleMaximizeApp,
    focusApp,
    updateWindowBounds,
    nudgeActiveWindow,
    snapActiveWindow,
    takeScreenshot,
    toggleActivities,
    setActivitiesOpen,
  } = useGnomeStore();

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  // Theme synchronization on mount / change
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (themeMode === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    }
  }, [themeMode]);

  // Isolate keyboard shortcuts & prevent unwanted browser interception
  useShortcutIsolation({
    onTriggerHelp: toggleShortcutsHelp,
    onTriggerFind: toggleActivities,
  });

  // Global Scoped Hotkeys
  // 1. App Launchers
  useHotkeys('ctrl+alt+t', (e) => { e.preventDefault(); openApp('terminal'); });
  useHotkeys('ctrl+alt+f', (e) => { e.preventDefault(); openApp('files'); });
  useHotkeys('ctrl+alt+a', (e) => { e.preventDefault(); openApp('about'); });
  useHotkeys('ctrl+alt+r', (e) => { e.preventDefault(); openApp('resume'); });
  useHotkeys('ctrl+alt+c', (e) => { e.preventDefault(); openApp('contact'); });
  useHotkeys('ctrl+alt+p', (e) => { e.preventDefault(); openApp('projects'); });
  useHotkeys('ctrl+alt+s', (e) => { e.preventDefault(); openApp('skills'); });

  // 2. Workspaces & Screenshot Hotkeys
  useHotkeys('ctrl+alt+left', (e) => { e.preventDefault(); switchWorkspace(1); });
  useHotkeys('ctrl+alt+right', (e) => { e.preventDefault(); switchWorkspace(2); });
  useHotkeys('meta+l, super+l', (e) => { e.preventDefault(); setLocked(true); });
  useHotkeys('printscreen', (e) => { e.preventDefault(); takeScreenshot(); });

  // 3. Activities & Help Modal
  useHotkeys('ctrl+space, meta, super, ctrl+k', (e) => { e.preventDefault(); toggleActivities(); });
  useHotkeys('meta+a, super+a', (e) => { e.preventDefault(); toggleActivities(); });
  useHotkeys('shift+/', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '')) return;
    e.preventDefault();
    toggleShortcutsHelp();
  });

  // 4. Active Window Management
  useHotkeys('ctrl+w', (e) => {
    if (activeWindowId) {
      e.preventDefault();
      closeApp(activeWindowId);
    }
  });

  useHotkeys('ctrl+m', (e) => {
    if (activeWindowId) {
      e.preventDefault();
      minimizeApp(activeWindowId);
    }
  });

  useHotkeys('ctrl+shift+m, f11', (e) => {
    if (activeWindowId) {
      e.preventDefault();
      toggleMaximizeApp(activeWindowId);
    }
  });

  // 5. Window Nudging (Ctrl + Arrow Keys)
  useHotkeys('ctrl+up', (e) => { e.preventDefault(); nudgeActiveWindow(0, -20); });
  useHotkeys('ctrl+down', (e) => { e.preventDefault(); nudgeActiveWindow(0, 20); });
  useHotkeys('ctrl+left', (e) => { e.preventDefault(); nudgeActiveWindow(-20, 0); });
  useHotkeys('ctrl+right', (e) => { e.preventDefault(); nudgeActiveWindow(20, 0); });

  // 6. Window Tiling (Ctrl + Alt + Shift + Arrows)
  useHotkeys('ctrl+alt+shift+left', (e) => { e.preventDefault(); snapActiveWindow('left'); });
  useHotkeys('ctrl+alt+shift+right', (e) => { e.preventDefault(); snapActiveWindow('right'); });
  useHotkeys('ctrl+alt+shift+up', (e) => { e.preventDefault(); snapActiveWindow('top'); });

  // 7. Escape Global Handler (Dismiss overlays or close active window)
  useHotkeys('escape', (e) => {
    if (contextMenu) {
      setContextMenu(null);
      return;
    }
    if (isActivitiesOpen) {
      setActivitiesOpen(false);
      return;
    }
    if (isRecruiterViewOpen) {
      setRecruiterViewOpen(false);
      return;
    }
    if (isShortcutsHelpOpen) {
      toggleShortcutsHelp();
      return;
    }
    if (activeWindowId) {
      closeApp(activeWindowId);
    }
  });

  // Desktop Right-Click Context Menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  // Render individual application content
  const renderAppContent = (id: WindowId) => {
    switch (id) {
      case 'terminal':
        return <TerminalApp />;
      case 'files':
        return <FilesApp />;
      case 'projects':
        return <ProjectsApp />;
      case 'skills':
        return <SkillsApp />;
      case 'timeline':
        return <TimelineApp />;
      case 'about':
        return <AboutApp />;
      case 'resume':
        return <ResumeApp />;
      case 'contact':
        return <ContactApp />;
      case 'browser':
        return <BrowserApp />;
      case 'monitor':
        return <SystemMonitorApp />;
      case 'text-editor':
        return <TextEditorApp />;
      case 'image-viewer':
        return <ImageViewerApp />;
      case 'software-center':
        return <SoftwareCenterApp />;
      case 'calculator':
        return <CalculatorApp />;
      case 'clocks':
        return <ClocksApp />;
      case 'weather':
        return <WeatherApp />;
      default:
        return null;
    }
  };

  // Helper icon renderer for Window headers
  const getWindowIcon = (id: WindowId) => {
    switch (id) {
      case 'terminal':
        return <Terminal className="w-3.5 h-3.5 text-emerald-400" />;
      case 'files':
        return <Folder className="w-3.5 h-3.5 text-amber-400" />;
      case 'projects':
        return <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />;
      case 'skills':
        return <Zap className="w-3.5 h-3.5 text-orange-400" />;
      case 'timeline':
        return <Clock className="w-3.5 h-3.5 text-purple-400" />;
      case 'about':
        return <User className="w-3.5 h-3.5 text-orange-400" />;
      case 'resume':
        return <FileText className="w-3.5 h-3.5 text-purple-400" />;
      case 'contact':
        return <Mail className="w-3.5 h-3.5 text-blue-400" />;
      case 'browser':
        return <Globe className="w-3.5 h-3.5 text-sky-400" />;
      case 'monitor':
        return <Activity className="w-3.5 h-3.5 text-rose-400" />;
      case 'text-editor':
        return <FileCode className="w-3.5 h-3.5 text-emerald-400" />;
      case 'image-viewer':
        return <ImageIcon className="w-3.5 h-3.5 text-sky-400" />;
      case 'software-center':
        return <LayoutGrid className="w-3.5 h-3.5 text-orange-400" />;
      case 'calculator':
        return <CalcIcon className="w-3.5 h-3.5 text-amber-400" />;
      case 'clocks':
        return <Clock className="w-3.5 h-3.5 text-purple-400" />;
      case 'weather':
        return <CloudSun className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <AppWindow className="w-3.5 h-3.5 text-neutral-300" />;
    }
  };

  // 1. Boot Screen (BIOS -> GRUB -> Systemd -> Plymouth)
  if (!isBooted) {
    return (
      <BootScreen
        onBootComplete={() => setBooted(true)}
        onOpenRecruiterView={() => setRecruiterViewOpen(true)}
      />
    );
  }

  // 2. GDM Login Screen
  if (isBooted && !isLoggedIn) {
    return (
      <LoginScreen
        onLogin={() => setLoggedIn(true)}
        onOpenRecruiterView={() => setRecruiterViewOpen(true)}
        onShutdown={() => setShutdown(true)}
        onRestart={() => {
          setBooted(false);
          setLoggedIn(false);
        }}
        onSuspend={() => setSuspended(true)}
      />
    );
  }

  // 3. Power Off or Suspend Screen
  if (isShutdown || isSuspended) {
    return (
      <ShutdownScreen
        onRestart={() => {
          setShutdown(false);
          setSuspended(false);
          setBooted(false);
          setLoggedIn(false);
        }}
        isSuspended={isSuspended}
        onWake={() => setSuspended(false)}
      />
    );
  }

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={() => setContextMenu(null)}
      className={`relative w-screen h-screen overflow-hidden select-none font-sans transition-colors duration-150 ${
        themeMode === 'dark' ? 'bg-[#110519] text-neutral-200' : 'bg-[#e4e4e7] text-neutral-800'
      }`}
    >
      {/* 1. GNOME Sonner Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: themeMode === 'dark' ? 'bg-[#1e1e22] text-white border-white/15' : 'bg-white text-neutral-900 border-neutral-300 shadow-xl',
          style: {
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
          },
        }}
      />

      {/* 2. Ubuntu Wallpaper with Animated Gradient Shift & Crossfade */}
      <UbuntuWallpaper />

      {/* 3. Top Bar (Activities, Notification Center clock, Quick Settings cluster) */}
      <TopBar
        isActivitiesOpen={isActivitiesOpen}
        onToggleActivities={toggleActivities}
        onOpenApp={openApp}
      />

      {/* 4. Ubuntu Launcher Dock (Left on Desktop, Bottom on Mobile) */}
      <Dock
        openWindows={windows.filter((w) => w.workspace === activeWorkspace || !w.workspace)}
        onOpenApp={openApp}
        onToggleActivities={toggleActivities}
      />

      {/* 5. Desktop Surface Icons (with 3D mouse parallax + Keyboard Navigation) */}
      <DesktopIcons onOpenApp={openApp} isActivitiesOpen={isActivitiesOpen} />

      {/* 5b. Ambient Calligraphy "Hello" Signature (behind windows, pointer-events: none) */}
      <DesktopSignature />

      {/* 6. Linux Conky System Monitor Widget (Right) */}
      <ConkyWidget onOpenApp={openApp} />

      {/* 7. Active Windows Layer with react-rnd 8-direction resizing */}
      <AnimatePresence>
        {windows
          .filter((win) => win.isOpen && !win.isMinimized && (win.workspace === activeWorkspace || !win.workspace))
          .map((win) => (
            <Window
              key={win.id}
              id={win.id}
              title={win.title}
              icon={getWindowIcon(win.id)}
              isOpen={win.isOpen}
              isMinimized={win.isMinimized}
              isMaximized={win.isMaximized}
              zIndex={win.zIndex}
              isFocused={activeWindowId === win.id}
              origin={windowOrigins[win.id]}
              position={win.position}
              size={win.size}
              onClose={() => closeApp(win.id)}
              onMinimize={() => minimizeApp(win.id)}
              onMaximizeToggle={() => toggleMaximizeApp(win.id)}
              onFocus={() => focusApp(win.id)}
              onUpdateBounds={(pos, sz) => updateWindowBounds(win.id, pos, sz)}
            >
              {renderAppContent(win.id)}
            </Window>
          ))}
      </AnimatePresence>

      {/* 8. Window Snap Preview Ghost Overlay */}
      {activeSnapPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed pointer-events-none z-50 rounded-2xl bg-orange-500/15 border-2 border-orange-500/60 backdrop-blur-xs transition-all duration-150 ${
            activeSnapPreview === 'left'
              ? 'left-2 top-10 bottom-2 w-[calc(50vw-12px)]'
              : activeSnapPreview === 'right'
              ? 'right-2 top-10 bottom-2 w-[calc(50vw-12px)]'
              : 'inset-2 top-10'
          }`}
        />
      )}

      {/* 9. Alt+Tab Window Switcher Overlay */}
      <AltTabSwitcher />

      {/* 10. cmdk Activities / Command Search Overview */}
      <ActivitiesOverview />

      {/* 11. Guided Tour 15-Step Overlay */}
      <GuidedTour />

      {/* 12. Wallpaper Selector Modal */}
      <WallpaperModal />

      {/* 13. Keyboard Shortcuts Help Cheat Sheet Modal (?) */}
      <ShortcutsModal />

      {/* 13b. Executive Recruiter ATS 1-Page Summary View */}
      <RecruiterView
        isOpen={isRecruiterViewOpen}
        onClose={() => setRecruiterViewOpen(false)}
      />

      {/* 13c. Lock Screen (Super+L) */}
      <AnimatePresence>
        {isLocked && (
          <LockScreen
            onUnlock={() => setLocked(false)}
            onOpenRecruiterView={() => setRecruiterViewOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* 14. Desktop Right-Click Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
            onOpenApp={openApp}
          />
        )}
      </AnimatePresence>

      {/* 15. GNOME Night Light Screen Color Temperature Warm Filter */}
      {nightLight && (
        <div
          className="pointer-events-none fixed inset-0 z-65 bg-amber-500/10 mix-blend-color-burn transition-all duration-500"
          style={{ backdropFilter: 'sepia(18%)' }}
        />
      )}
    </div>
  );
};
