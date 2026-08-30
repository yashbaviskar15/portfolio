import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WindowId, WindowState, WindowPosition, WindowSize, NotificationItem, WallpaperPreset } from '../types/gnome';
import { LocaleCode, TranslationSchema, SUPPORTED_LANGUAGES } from '../types/i18n';
import { translations, detectBrowserLocale } from '../locales/translations';
import { sounds } from '../lib/soundEffects';

export const wallpaperPresets: WallpaperPreset[] = [
  {
    id: 'noble-numbat',
    name: 'Ubuntu Noble (Aubergine)',
    gradient: 'radial-gradient(circle at 15% 15%, rgba(233, 84, 32, 0.2), transparent 45%), radial-gradient(circle at 85% 85%, rgba(119, 33, 111, 0.35), transparent 50%), linear-gradient(135deg, #2c001e 0%, #1a0826 40%, #0d1322 100%)',
    previewBg: 'linear-gradient(135deg, #2c001e, #1a0826, #0d1322)',
  },
  {
    id: 'deep-slate',
    name: 'GNOME Dark Slate',
    gradient: 'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.2), transparent 50%), linear-gradient(135deg, #090d16 0%, #111827 50%, #1e1b4b 100%)',
    previewBg: 'linear-gradient(135deg, #090d16, #111827, #1e1b4b)',
  },
  {
    id: 'emerald-aurora',
    name: 'Emerald Matrix',
    gradient: 'radial-gradient(circle at 15% 15%, rgba(16, 185, 129, 0.2), transparent 45%), radial-gradient(circle at 85% 85%, rgba(6, 95, 70, 0.3), transparent 50%), linear-gradient(135deg, #022c22 0%, #064e3b 45%, #021a14 100%)',
    previewBg: 'linear-gradient(135deg, #022c22, #064e3b, #021a14)',
  },
  {
    id: 'cosmic-twilight',
    name: 'Cosmic Violet',
    gradient: 'radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.25), transparent 45%), radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.2), transparent 50%), linear-gradient(135deg, #1e1035 0%, #2e1065 45%, #090514 100%)',
    previewBg: 'linear-gradient(135deg, #1e1035, #2e1065, #090514)',
  },
];

const createInitialNotifications = (): NotificationItem[] => {
  const now = Date.now();
  return [
    {
      id: 'notif-init-1',
      title: 'Session Initialized',
      message: "Connected to Yash Baviskar's Cloud Workstation node.",
      time: 'Just now',
      timestamp: now - 15000,
      type: 'success',
    },
    {
      id: 'notif-init-2',
      title: 'Telemetry Node Online',
      message: 'AWS Multi-AZ VPC & Prometheus telemetry running 10+ targets OK.',
      time: '2m ago',
      timestamp: now - 120000,
      type: 'info',
    },
    {
      id: 'notif-init-3',
      title: 'Repositories Ready',
      message: '4 production repositories (3-Tier App, Telemetry, CI/CD, ACOS) ready.',
      time: '5m ago',
      timestamp: now - 300000,
      type: 'info',
    },
  ];
};

const getCenteredTerminalPosition = (): { x: number; y: number } => {
  if (typeof window !== 'undefined') {
    const width = Math.min(780, window.innerWidth - 80);
    const height = Math.min(490, window.innerHeight - 80);
    const x = Math.max(70, Math.floor((window.innerWidth - width) / 2));
    const y = Math.max(45, Math.floor((window.innerHeight - height) / 2));
    return { x, y };
  }
  return { x: 260, y: 90 };
};

const initialWindows: WindowState[] = [
  {
    id: 'terminal',
    title: 'yash@ubuntu: ~ (bash)',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 25,
    position: getCenteredTerminalPosition(),
    size: { width: 780, height: 490 },
    iconName: 'Terminal',
  },
  {
    id: 'projects',
    title: 'Projects Gallery — Expanded Portfolio',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    position: { x: 180, y: 70 },
    size: { width: 840, height: 540 },
    iconName: 'FolderGit2',
  },
  {
    id: 'skills',
    title: 'Technical Skills Visualizer',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    position: { x: 200, y: 80 },
    size: { width: 760, height: 530 },
    iconName: 'Zap',
  },
  {
    id: 'timeline',
    title: 'Experience & Milestones Timeline',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    position: { x: 220, y: 75 },
    size: { width: 780, height: 540 },
    iconName: 'Clock',
  },
  {
    id: 'files',
    title: 'Projects — Files (Nautilus)',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    position: { x: 170, y: 80 },
    size: { width: 840, height: 530 },
    iconName: 'Folder',
  },
  {
    id: 'about',
    title: 'System Settings — About Yash',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    position: { x: 190, y: 70 },
    size: { width: 760, height: 520 },
    iconName: 'User',
  },
  {
    id: 'resume',
    title: 'resume.txt — Gedit Text Editor',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    position: { x: 210, y: 75 },
    size: { width: 780, height: 520 },
    iconName: 'FileText',
  },
  {
    id: 'contact',
    title: 'Thunderbird Mail — Compose',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    position: { x: 230, y: 90 },
    size: { width: 680, height: 480 },
    iconName: 'Mail',
  },
  {
    id: 'browser',
    title: 'Cloud Telemetry — GNOME Web',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    position: { x: 160, y: 65 },
    size: { width: 820, height: 520 },
    iconName: 'Globe',
  },
  {
    id: 'monitor',
    title: 'System Monitor — Resources & Telemetry',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    position: { x: 180, y: 85 },
    size: { width: 800, height: 520 },
    iconName: 'Activity',
  },
];

interface GnomeStoreState {
  // Session & Overlay Flags
  hasSeenWelcome: boolean;
  hasClosedTerminal: boolean;
  isShutdown: boolean;
  isShortcutsHelpOpen: boolean;
  isWallpaperModalOpen: boolean;
  selectedWallpaperId: string;

  // i18n Internationalization
  locale: LocaleCode;
  hasAutoDetectedLocale: boolean;

  // Guided Tour
  isTourOpen: boolean;
  currentTourStep: number;

  // Notifications
  notifications: NotificationItem[];

  // Window System
  windows: WindowState[];
  activeWindowId: WindowId | null;
  windowOrigins: Record<string, { x: number; y: number }>;

  // Desktop & Overlays
  isActivitiesOpen: boolean;
  isAltTabOpen: boolean;
  altTabSelectionIndex: number;
  selectedDesktopIndex: number;

  // Theming & Customization (Dark/Light + Accents)
  themeMode: 'dark' | 'light';
  accentColor: string;
  soundEnabled: boolean;
  nightLight: boolean;

  // Settings App Sidebar Navigation
  settingsPage: 'appearance' | 'region' | 'about';

  // Virtual File System State
  currentCwd: string;

  // Actions
  setHasSeenWelcome: (seen: boolean) => void;
  setShutdown: (shutdown: boolean) => void;
  toggleShortcutsHelp: () => void;
  setShortcutsHelpOpen: (open: boolean) => void;
  setWallpaperModalOpen: (open: boolean) => void;
  setWallpaper: (id: string) => void;

  // i18n Actions
  setLocale: (locale: LocaleCode) => void;
  setHasAutoDetectedLocale: (detected: boolean) => void;
  t: () => TranslationSchema;

  // Guided Tour Actions
  startTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  endTour: () => void;

  // Notification Actions
  addNotification: (title: string, message: string, type?: 'info' | 'success' | 'alert') => void;
  dismissNotification: (id: string) => void;
  clearAllNotifications: () => void;

  // Window Actions
  openApp: (id: WindowId, origin?: { x: number; y: number }) => void;
  closeApp: (id: WindowId) => void;
  minimizeApp: (id: WindowId) => void;
  toggleMaximizeApp: (id: WindowId) => void;
  focusApp: (id: WindowId) => void;
  updateWindowBounds: (id: WindowId, position: WindowPosition, size?: WindowSize) => void;

  nudgeActiveWindow: (dx: number, dy: number) => void;
  snapActiveWindow: (direction: 'left' | 'right' | 'top' | 'full') => void;

  setSelectedDesktopIndex: (index: number) => void;

  toggleActivities: () => void;
  setActivitiesOpen: (open: boolean) => void;

  setAltTabOpen: (open: boolean) => void;
  setAltTabSelection: (index: number) => void;
  cycleAltTab: (reverse?: boolean) => void;

  setThemeMode: (mode: 'dark' | 'light') => void;
  toggleThemeMode: () => void;
  setAccentColor: (color: string) => void;
  toggleSound: () => void;
  toggleNightLight: () => void;
  setNightLight: (enabled: boolean) => void;
  setSettingsPage: (page: 'appearance' | 'region' | 'about') => void;
  setCwd: (path: string) => void;
}

export const useGnomeStore = create<GnomeStoreState>()(
  persist(
    (set, get) => ({
      hasSeenWelcome: true,
      hasClosedTerminal: false,
      isShutdown: false,
      isShortcutsHelpOpen: false,
      isWallpaperModalOpen: false,
      selectedWallpaperId: 'noble-numbat',

      locale: detectBrowserLocale(),
      hasAutoDetectedLocale: false,

      isTourOpen: false,
      currentTourStep: 0,

      notifications: createInitialNotifications(),

      windows: initialWindows,
      activeWindowId: 'terminal',
      windowOrigins: {},

      isActivitiesOpen: false,
      isAltTabOpen: false,
      altTabSelectionIndex: 0,
      selectedDesktopIndex: 0,

      themeMode: 'dark',
      accentColor: '#e95420',
      soundEnabled: true,
      nightLight: false,

      settingsPage: 'about',

      currentCwd: '/home/yash',

      setHasSeenWelcome: (seen: boolean) => {
        set({ hasSeenWelcome: seen });
      },

      setShutdown: (shutdown: boolean) => {
        if (shutdown) {
          sounds.playWindowClose();
        } else {
          sounds.playWindowOpen();
        }
        set({ isShutdown: shutdown });
      },

      toggleShortcutsHelp: () => {
        set((s) => ({ isShortcutsHelpOpen: !s.isShortcutsHelpOpen }));
      },

      setShortcutsHelpOpen: (open: boolean) => {
        set({ isShortcutsHelpOpen: open });
      },

      setWallpaperModalOpen: (open: boolean) => {
        set({ isWallpaperModalOpen: open });
      },

      setWallpaper: (id: string) => {
        set({ selectedWallpaperId: id });
      },

      setLocale: (newLocale: LocaleCode) => {
        set({ locale: newLocale });
        if (typeof document !== 'undefined') {
          document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
          document.documentElement.lang = newLocale;
        }
      },

      setHasAutoDetectedLocale: (detected: boolean) => {
        set({ hasAutoDetectedLocale: detected });
      },

      t: () => {
        const currentLocale = get().locale;
        return translations[currentLocale] || translations.en;
      },

      startTour: () => {
        sounds.playWindowOpen();
        set({ isTourOpen: true, currentTourStep: 0 });
      },

      nextTourStep: () => {
        const { currentTourStep } = get();
        if (currentTourStep < 6) {
          sounds.playWindowOpen();
          set({ currentTourStep: currentTourStep + 1 });
        }
      },

      prevTourStep: () => {
        const { currentTourStep } = get();
        if (currentTourStep > 0) {
          set({ currentTourStep: currentTourStep - 1 });
        }
      },

      endTour: () => {
        set({ isTourOpen: false, currentTourStep: 0 });
      },

      addNotification: (title: string, message: string, type: 'info' | 'success' | 'alert' = 'info') => {
        const newNotif: NotificationItem = {
          id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          title,
          message,
          time: 'Just now',
          timestamp: Date.now(),
          type,
        };
        set((state) => ({
          notifications: [newNotif, ...state.notifications].slice(0, 20),
        }));
      },

      dismissNotification: (id: string) => {
        sounds.playWindowClose();
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      clearAllNotifications: () => {
        sounds.playWindowClose();
        set({ notifications: [] });
      },

      setSelectedDesktopIndex: (index: number) => {
        set({ selectedDesktopIndex: index });
      },

      openApp: (id: WindowId, origin?: { x: number; y: number }) => {
        sounds.playWindowOpen();
        const { windows, windowOrigins, addNotification } = get();
        const highestZ = Math.max(...windows.map((w) => w.zIndex), 20) + 1;

        const updatedOrigins = origin ? { ...windowOrigins, [id]: origin } : windowOrigins;

        // Auto-log real user interaction notification
        const appTitles: Record<WindowId, string> = {
          terminal: 'Terminal App',
          files: 'Projects Workspace',
          about: 'System Settings',
          resume: 'Resume Document',
          contact: 'Contact Channel',
          browser: 'Telemetry Dashboard',
          monitor: 'System Monitor',
          projects: 'Projects Showcase',
          skills: 'Skills Matrix',
          timeline: 'Engineering Timeline',
        };

        if (appTitles[id]) {
          addNotification('Application Opened', `Launched ${appTitles[id]} in GNOME session.`, 'info');
        }

        set({
          isActivitiesOpen: false,
          isAltTabOpen: false,
          activeWindowId: id,
          hasClosedTerminal: id === 'terminal' ? false : get().hasClosedTerminal,
          windowOrigins: updatedOrigins,
          windows: windows.map((w) => {
            if (w.id === id) {
              return {
                ...w,
                isOpen: true,
                isMinimized: false,
                zIndex: highestZ,
              };
            }
            return w;
          }),
        });
      },

      closeApp: (id: WindowId) => {
        sounds.playWindowClose();
        const { windows, activeWindowId } = get();
        set({
          hasClosedTerminal: id === 'terminal' ? true : get().hasClosedTerminal,
          windows: windows.map((w) => (w.id === id ? { ...w, isOpen: false, isMinimized: false } : w)),
          activeWindowId: activeWindowId === id ? null : activeWindowId,
        });
      },

      minimizeApp: (id: WindowId) => {
        sounds.playWindowClose();
        const { windows } = get();
        set({
          windows: windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
          activeWindowId: null,
        });
      },

      toggleMaximizeApp: (id: WindowId) => {
        const { windows } = get();
        set({
          windows: windows.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)),
        });
      },

      focusApp: (id: WindowId) => {
        const { windows } = get();
        const highestZ = Math.max(...windows.map((w) => w.zIndex), 20) + 1;
        set({
          activeWindowId: id,
          windows: windows.map((w) => (w.id === id ? { ...w, isMinimized: false, zIndex: highestZ } : w)),
        });
      },

      updateWindowBounds: (id: WindowId, position: WindowPosition, size?: WindowSize) => {
        const { windows } = get();
        set({
          windows: windows.map((w) => {
            if (w.id === id) {
              return {
                ...w,
                position,
                size: size || w.size,
              };
            }
            return w;
          }),
        });
      },

      nudgeActiveWindow: (dx: number, dy: number) => {
        const { activeWindowId, windows } = get();
        if (!activeWindowId) return;
        set({
          windows: windows.map((w) => {
            if (w.id === activeWindowId && !w.isMaximized) {
              return {
                ...w,
                position: {
                  x: Math.max(64, Math.min(window.innerWidth - 200, w.position.x + dx)),
                  y: Math.max(32, Math.min(window.innerHeight - 100, w.position.y + dy)),
                },
              };
            }
            return w;
          }),
        });
      },

      snapActiveWindow: (direction: 'left' | 'right' | 'top' | 'full') => {
        const { activeWindowId, windows } = get();
        if (!activeWindowId || typeof window === 'undefined') return;

        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const dockOffset = screenW >= 768 ? 64 : 0;
        const topBarOffset = 32;
        const availW = screenW - dockOffset;
        const availH = screenH - topBarOffset;

        set({
          windows: windows.map((w) => {
            if (w.id === activeWindowId) {
              if (direction === 'left') {
                return {
                  ...w,
                  isMaximized: false,
                  position: { x: dockOffset, y: topBarOffset },
                  size: { width: Math.floor(availW / 2), height: availH },
                };
              }
              if (direction === 'right') {
                return {
                  ...w,
                  isMaximized: false,
                  position: { x: dockOffset + Math.floor(availW / 2), y: topBarOffset },
                  size: { width: Math.floor(availW / 2), height: availH },
                };
              }
              if (direction === 'top' || direction === 'full') {
                return {
                  ...w,
                  isMaximized: true,
                };
              }
            }
            return w;
          }),
        });
      },

      toggleActivities: () => {
        set((state) => ({ isActivitiesOpen: !state.isActivitiesOpen }));
      },

      setActivitiesOpen: (open: boolean) => {
        set({ isActivitiesOpen: open });
      },

      setAltTabOpen: (open: boolean) => {
        set({ isAltTabOpen: open });
      },

      setAltTabSelection: (index: number) => {
        set({ altTabSelectionIndex: index });
      },

      cycleAltTab: (reverse = false) => {
        const { windows, altTabSelectionIndex } = get();
        const openWins = windows.filter((w) => w.isOpen);
        if (openWins.length === 0) return;
        const nextIndex = reverse
          ? (altTabSelectionIndex - 1 + openWins.length) % openWins.length
          : (altTabSelectionIndex + 1) % openWins.length;
        set({ altTabSelectionIndex: nextIndex });
      },

      setThemeMode: (mode: 'dark' | 'light') => {
        if (typeof document !== 'undefined') {
          if (mode === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
          } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
          }
        }
        set({ themeMode: mode });
      },

      toggleThemeMode: () => {
        const current = get().themeMode;
        const next = current === 'dark' ? 'light' : 'dark';
        get().setThemeMode(next);
      },

      setAccentColor: (color: string) => {
        set({ accentColor: color });
      },

      toggleSound: () => {
        set((state) => {
          const next = !state.soundEnabled;
          sounds.isMuted = !next;
          return { soundEnabled: next };
        });
      },

      toggleNightLight: () => {
        set((state) => ({ nightLight: !state.nightLight }));
      },

      setNightLight: (enabled: boolean) => {
        set({ nightLight: enabled });
      },

      setSettingsPage: (page: 'appearance' | 'region' | 'about') => {
        set({ settingsPage: page });
      },

      setCwd: (path: string) => {
        set({ currentCwd: path });
      },
    }),
    {
      name: 'yash_gnome_settings',
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (state.hasClosedTerminal) {
            state.windows = state.windows.map((w) =>
              w.id === 'terminal' ? { ...w, isOpen: false } : w
            );
            if (state.activeWindowId === 'terminal') {
              state.activeWindowId = null;
            }
          }
          if (typeof document !== 'undefined' && state.locale) {
            document.documentElement.dir = state.locale === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = state.locale;
          }
        }
      },
      partialize: (state) => ({
        hasSeenWelcome: state.hasSeenWelcome,
        hasClosedTerminal: state.hasClosedTerminal,
        locale: state.locale,
        hasAutoDetectedLocale: state.hasAutoDetectedLocale,
        themeMode: state.themeMode,
        accentColor: state.accentColor,
        soundEnabled: state.soundEnabled,
        selectedWallpaperId: state.selectedWallpaperId,
        notifications: state.notifications,
      }),
    }
  )
);
