import { create } from 'zustand';
import { WindowId, WindowState, WindowPosition, WindowSize, NotificationItem, WallpaperPreset } from '../types/gnome';
import { LocaleCode, TranslationSchema, SUPPORTED_LANGUAGES } from '../types/i18n';
import { translations, detectBrowserLocale } from '../locales/translations';
import { sounds } from '../lib/soundEffects';
import { vfs } from '../lib/virtualFileSystem';
import { LG_BREAKPOINT, LEFT_DOCK_INSET, BOTTOM_DOCK_INSET, TOP_INSET } from '../lib/layout';

export const wallpaperPresets: WallpaperPreset[] = [
  {
    id: 'noble-numbat',
    name: 'YashOS Noble (Aubergine)',
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

const getCenteredPosition = (w = 780, h = 490): { x: number; y: number } => {
  if (typeof window !== 'undefined') {
    const wide = window.innerWidth >= LG_BREAKPOINT;
    const minX = wide ? LEFT_DOCK_INSET : 70;
    const width = Math.min(w, window.innerWidth - (wide ? LEFT_DOCK_INSET + 36 : 80));
    const height = Math.min(h, window.innerHeight - 80);
    const x = Math.max(minX, Math.floor((window.innerWidth - width) / 2));
    const y = Math.max(45, Math.floor((window.innerHeight - height) / 2));
    return { x, y };
  }
  return { x: 260, y: 90 };
};

const STANDARD_WINDOW_SIZE: WindowSize = { width: 800, height: 510 };

const initialWindows: WindowState[] = [
  {
    id: 'terminal',
    title: 'yash@yash-portfolio: ~ (bash)',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 25,
    position: getCenteredPosition(800, 510),
    size: STANDARD_WINDOW_SIZE,
    iconName: 'Terminal',
    workspace: 1,
  },
  {
    id: 'projects',
    title: 'Projects Showcase — Cloud Support & Lab Architecture',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    position: getCenteredPosition(800, 510),
    size: STANDARD_WINDOW_SIZE,
    iconName: 'FolderGit2',
    workspace: 1,
  },
  {
    id: 'skills',
    title: 'Technical Skills Matrix',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 19,
    position: getCenteredPosition(800, 510),
    size: STANDARD_WINDOW_SIZE,
    iconName: 'Zap',
    workspace: 1,
  },
  {
    id: 'timeline',
    title: 'Career & Education Timeline',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 18,
    position: getCenteredPosition(800, 510),
    size: STANDARD_WINDOW_SIZE,
    iconName: 'Clock',
    workspace: 1,
  },
  {
    id: 'files',
    title: 'Files (VFS Explorer)',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    position: getCenteredPosition(800, 510),
    size: STANDARD_WINDOW_SIZE,
    iconName: 'Folder',
    workspace: 1,
  },
  {
    id: 'resume',
    title: 'Document Viewer — Yash Baviskar CV',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 21,
    position: getCenteredPosition(800, 510),
    size: STANDARD_WINDOW_SIZE,
    iconName: 'FileText',
    workspace: 1,
  },
  {
    id: 'contact',
    title: 'Contact Yash Baviskar',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 22,
    position: getCenteredPosition(800, 510),
    size: STANDARD_WINDOW_SIZE,
    iconName: 'Mail',
    workspace: 1,
  },
  {
    id: 'browser',
    title: 'Web Browser',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    position: getCenteredPosition(800, 510),
    size: STANDARD_WINDOW_SIZE,
    iconName: 'Globe',
    workspace: 1,
  },
  {
    id: 'monitor',
    title: 'System Monitor & Telemetry',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    position: getCenteredPosition(800, 510),
    size: STANDARD_WINDOW_SIZE,
    iconName: 'Activity',
    workspace: 1,
  },
  {
    id: 'about',
    title: 'Settings — YashOS 24.04 LTS',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    position: getCenteredPosition(800, 510),
    size: STANDARD_WINDOW_SIZE,
    iconName: 'Settings',
    workspace: 1,
  },
  {
    id: 'text-editor',
    title: 'Text Editor (gedit)',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 23,
    position: getCenteredPosition(800, 510),
    size: STANDARD_WINDOW_SIZE,
    iconName: 'FileCode',
    workspace: 1,
    activeFilePath: '/home/yash/Desktop/README.md',
  },
  {
    id: 'image-viewer',
    title: 'Image Viewer (Eye of GNOME)',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 23,
    position: getCenteredPosition(800, 510),
    size: STANDARD_WINDOW_SIZE,
    iconName: 'Image',
    workspace: 1,
    activeFilePath: '/home/yash/Pictures/profile.jpg',
  },
  {
    id: 'software-center',
    title: 'Software Center (App Center)',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    position: getCenteredPosition(800, 510),
    size: STANDARD_WINDOW_SIZE,
    iconName: 'LayoutGrid',
    workspace: 1,
  },
  {
    id: 'calculator',
    title: 'Calculator',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 24,
    position: getCenteredPosition(800, 510),
    size: STANDARD_WINDOW_SIZE,
    iconName: 'Calculator',
    workspace: 1,
  },
  {
    id: 'clocks',
    title: 'Clocks',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 24,
    position: getCenteredPosition(800, 510),
    size: STANDARD_WINDOW_SIZE,
    iconName: 'Clock',
    workspace: 1,
  },
  {
    id: 'weather',
    title: 'Weather',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 24,
    position: getCenteredPosition(800, 510),
    size: STANDARD_WINDOW_SIZE,
    iconName: 'CloudSun',
    workspace: 1,
  },
];

interface GnomeStore {
  // Lifecycle & Hardware States
  isBooted: boolean;
  setBooted: (booted: boolean) => void;
  isLoggedIn: boolean;
  setLoggedIn: (logged: boolean) => void;
  isLocked: boolean;
  setLocked: (locked: boolean) => void;
  isSuspended: boolean;
  setSuspended: (suspended: boolean) => void;
  isShutdown: boolean;
  setShutdown: (shutdown: boolean) => void;

  // Workspaces
  activeWorkspace: 1 | 2;
  switchWorkspace: (ws: 1 | 2) => void;

  // Windows & State
  windows: WindowState[];
  activeWindowId: WindowId | null;
  windowOrigins: Record<WindowId, { x: number; y: number }>;
  activeSnapPreview: 'left' | 'right' | 'top' | null;
  setActiveSnapPreview: (snap: 'left' | 'right' | 'top' | null) => void;

  // Desktop Surface
  rubberBand: { startX: number; startY: number; currentX: number; currentY: number } | null;
  setRubberBand: (rb: any) => void;

  // UI Modals
  isActivitiesOpen: boolean;
  isShortcutsHelpOpen: boolean;
  isWallpaperModalOpen: boolean;
  isTourOpen: boolean;
  isRecruiterViewOpen: boolean;
  selectedWallpaperId: string;
  themeMode: 'dark' | 'light';
  accentColor: string;
  soundEnabled: boolean;
  nightLight: boolean;
  fontSize: 'compact' | 'standard' | 'large';
  reducedMotion: boolean;
  settingsPage: 'appearance' | 'region' | 'about';
  currentCwd: string;

  // Notifications
  notifications: NotificationItem[];
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  dismissNotification: (id: string) => void;
  clearAllNotifications: () => void;

  // Alt-Tab Switcher
  isAltTabOpen: boolean;
  altTabSelectionIndex: number;
  setAltTabOpen: (open: boolean) => void;
  setAltTabSelection: (index: number) => void;

  // Desktop Icons Selection
  selectedDesktopIndex: number;
  setSelectedDesktopIndex: (index: number) => void;

  // Guided Tour
  currentTourStep: number;
  startTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  endTour: () => void;

  // Welcome state
  hasSeenWelcome: boolean;
  setHasSeenWelcome: (seen: boolean) => void;

  // i18n
  locale: LocaleCode;
  hasAutoDetectedLocale: boolean;
  setHasAutoDetectedLocale: (val: boolean) => void;
  setLocale: (locale: LocaleCode) => void;
  t: () => TranslationSchema;

  // Actions
  openApp: (id: WindowId, origin?: { x: number; y: number }, filePath?: string) => void;
  openFileInApp: (filePath: string) => void;
  closeApp: (id: WindowId) => void;
  minimizeApp: (id: WindowId) => void;
  toggleMaximizeApp: (id: WindowId) => void;
  focusApp: (id: WindowId) => void;
  updateWindowBounds: (id: WindowId, position: WindowPosition, size: WindowSize) => void;
  nudgeActiveWindow: (dx: number, dy: number) => void;
  snapActiveWindow: (direction: 'left' | 'right' | 'top') => void;
  resetDesktopLayout: () => void;
  takeScreenshot: () => void;
  reclampAllWindows: () => void;

  toggleActivities: () => void;
  setActivitiesOpen: (open: boolean) => void;
  toggleShortcutsHelp: () => void;
  setShortcutsHelpOpen: (open: boolean) => void;
  toggleWallpaperModal: () => void;
  setWallpaperModalOpen: (open: boolean) => void;
  toggleRecruiterView: () => void;
  setRecruiterViewOpen: (open: boolean) => void;
  setWallpaper: (id: string) => void;
  setThemeMode: (mode: 'dark' | 'light') => void;
  toggleThemeMode: () => void;
  setAccentColor: (color: string) => void;
  toggleSound: () => void;
  toggleNightLight: () => void;
  setNightLight: (enabled: boolean) => void;
  setFontSize: (size: 'compact' | 'standard' | 'large') => void;
  setReducedMotion: (reduced: boolean) => void;
  toggleReducedMotion: () => void;
  setSettingsPage: (page: 'appearance' | 'region' | 'about') => void;
  setCwd: (path: string) => void;
}

export const useGnomeStore = create<GnomeStore>()((set, get) => ({
      // Lifecycle initial states
      isBooted: true,
      setBooted: (booted) => set({ isBooted: booted }),
      isLoggedIn: true,
      setLoggedIn: (logged) => set({ isLoggedIn: logged }),
      isLocked: false,
      setLocked: (locked) => set({ isLocked: locked }),
      isSuspended: false,
      setSuspended: (suspended) => set({ isSuspended: suspended }),
      isShutdown: false,
      setShutdown: (shutdown) => set({ isShutdown: shutdown }),

      // Workspaces
      activeWorkspace: 1,
      switchWorkspace: (ws) => {
        sounds.playSliderTick();
        set({ activeWorkspace: ws });
      },

      // Windows
      windows: initialWindows,
      activeWindowId: null,
      windowOrigins: {
        terminal: { x: 24, y: 120 },
        files: { x: 24, y: 180 },
        about: { x: 24, y: 480 },
        resume: { x: 24, y: 240 },
        contact: { x: 24, y: 300 },
        browser: { x: 24, y: 360 },
        monitor: { x: 24, y: 420 },
        projects: { x: 24, y: 150 },
        skills: { x: 24, y: 210 },
        timeline: { x: 24, y: 270 },
        'text-editor': { x: 24, y: 330 },
        'image-viewer': { x: 24, y: 390 },
        'software-center': { x: 24, y: 450 },
        calculator: { x: 24, y: 510 },
        weather: { x: 24, y: 570 },
        clocks: { x: 24, y: 600 },
      },
      activeSnapPreview: null,
      setActiveSnapPreview: (snap) => set({ activeSnapPreview: snap }),
      rubberBand: null,
      setRubberBand: (rb) => set({ rubberBand: rb }),

      // UI States
      isActivitiesOpen: false,
      isShortcutsHelpOpen: false,
      isWallpaperModalOpen: false,
      isRecruiterViewOpen: false,
      selectedWallpaperId: 'noble-numbat',
      themeMode: 'dark',
      accentColor: '#e95420',
      soundEnabled: false,
      nightLight: false,
      fontSize: 'standard',
      reducedMotion: false,
      settingsPage: 'appearance',
      currentCwd: '/home/yash',

      // Notifications
      notifications: createInitialNotifications(),
      addNotification: (notif) => {
        sounds.playNotification();
        const item: NotificationItem = {
          ...notif,
          id: `notif_${Date.now()}_${Math.random()}`,
          timestamp: Date.now(),
        };
        set((state) => ({ notifications: [item, ...state.notifications] }));
      },
      removeNotification: (id) =>
        set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),
      dismissNotification: (id) =>
        set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),
      clearAllNotifications: () => set({ notifications: [] }),

      // Alt-Tab Switcher
      isAltTabOpen: false,
      altTabSelectionIndex: 0,
      setAltTabOpen: (open) => set({ isAltTabOpen: open }),
      setAltTabSelection: (idx) => set({ altTabSelectionIndex: idx }),

      // Desktop Icons
      selectedDesktopIndex: 0,
      setSelectedDesktopIndex: (idx) => set({ selectedDesktopIndex: idx }),

      // Guided Tour
      isTourOpen: false,
      currentTourStep: 0,
      startTour: () => set({ isTourOpen: true, currentTourStep: 0, isActivitiesOpen: false }),
      nextTourStep: () => set((state) => ({ currentTourStep: state.currentTourStep + 1 })),
      prevTourStep: () => set((state) => ({ currentTourStep: Math.max(0, state.currentTourStep - 1) })),
      endTour: () => set({ isTourOpen: false, currentTourStep: 0 }),

      // Welcome State
      hasSeenWelcome: false,
      setHasSeenWelcome: (seen) => set({ hasSeenWelcome: seen }),

      // i18n
      locale: 'en',
      hasAutoDetectedLocale: false,
      setHasAutoDetectedLocale: (val) => set({ hasAutoDetectedLocale: val }),
      setLocale: (locale) => set({ locale }),
      t: () => {
        const loc = get().locale;
        return translations[loc] || translations.en;
      },

      // Actions
      openApp: (id, origin, filePath) => {
        sounds.playWindowOpen();
        set((state) => {
          const maxZ = Math.max(...state.windows.map((w) => w.zIndex), 10);
          const currentWs = state.activeWorkspace;
          const openCount = state.windows.filter((w) => w.isOpen && !w.isMinimized && w.workspace === currentWs).length;
          const cascadeOffsetX = (openCount % 6) * 36;
          const cascadeOffsetY = (openCount % 6) * 30;

          return {
            windows: state.windows.map((w) => {
              if (w.id === id) {
                const screenW = typeof window !== 'undefined' ? window.innerWidth : 1280;
                const screenH = typeof window !== 'undefined' ? window.innerHeight : 800;
                const wide = screenW >= LG_BREAKPOINT;
                const availableW = screenW - (wide ? LEFT_DOCK_INSET : 0);
                const standardW = Math.min(780, Math.max(460, wide ? Math.floor(availableW * 0.6) : screenW - 56));
                const standardH = Math.min(520, Math.max(340, screenH - 130));
                const centered = getCenteredPosition(standardW, standardH);
                const minX = wide ? LEFT_DOCK_INSET + 8 : 20;
                const minY = wide ? TOP_INSET + 6 : 40;
                const bottomReserve = wide ? 16 : BOTTOM_DOCK_INSET;
                const initialX = Math.min(Math.max(minX, centered.x + cascadeOffsetX), Math.max(minX, screenW - standardW - 20));
                const initialY = Math.min(Math.max(minY, centered.y + cascadeOffsetY), Math.max(minY, screenH - standardH - bottomReserve));

                return {
                  ...w,
                  size: w.isOpen ? w.size : { width: standardW, height: standardH },
                  isOpen: true,
                  isMinimized: false,
                  zIndex: maxZ + 1,
                  workspace: currentWs,
                  activeFilePath: filePath || w.activeFilePath,
                  position: w.isOpen ? w.position : { x: initialX, y: initialY },
                };
              }
              return w;
            }),
            activeWindowId: id,
            isActivitiesOpen: false,
            windowOrigins: origin ? { ...state.windowOrigins, [id]: origin } : state.windowOrigins,
          };
        });
      },

      openFileInApp: (filePath: string) => {
        const ext = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
        if (ext === '.pdf') {
          get().openApp('resume', undefined, filePath);
        } else if (['.png', '.jpg', '.jpeg', '.svg', '.webp'].includes(ext)) {
          get().openApp('image-viewer', undefined, filePath);
        } else if (['.md', '.txt', '.json', '.yml', '.yaml', '.tf', '.sh', '.js', '.ts'].includes(ext)) {
          get().openApp('text-editor', undefined, filePath);
        } else {
          get().openApp('files', undefined, filePath);
        }
      },

      closeApp: (id) => {
        sounds.playWindowClose();
        set((state) => ({
          windows: state.windows.map((w) => (w.id === id ? { ...w, isOpen: false } : w)),
          activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
        }));
      },

      minimizeApp: (id) => {
        sounds.playWindowClose();
        set((state) => ({
          windows: state.windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
          activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
        }));
      },

      toggleMaximizeApp: (id) => {
        sounds.playWindowOpen();
        set((state) => ({
          windows: state.windows.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)),
        }));
      },

      focusApp: (id) => {
        set((state) => {
          const maxZ = Math.max(...state.windows.map((w) => w.zIndex), 10);
          return {
            windows: state.windows.map((w) => (w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w)),
            activeWindowId: id,
          };
        });
      },

      updateWindowBounds: (id, position, size) => {
        set((state) => {
          const screenW = typeof window !== 'undefined' ? window.innerWidth : 1280;
          const screenH = typeof window !== 'undefined' ? window.innerHeight : 800;
          const wide = screenW >= LG_BREAKPOINT;
          const minX = wide ? LEFT_DOCK_INSET : 0;
          const minY = wide ? TOP_INSET : 32;
          const clampedX = Math.max(minX, Math.min(position.x, screenW - 80));
          const clampedY = Math.max(minY, Math.min(position.y, screenH - 50));

          return {
            windows: state.windows.map((w) =>
              w.id === id
                ? {
                    ...w,
                    position: { x: clampedX, y: clampedY },
                    size: {
                      width: Math.min(size.width, screenW - minX),
                      height: Math.min(size.height, screenH - minY),
                    },
                  }
                : w
            ),
          };
        });
      },

      nudgeActiveWindow: (dx, dy) => {
        const { activeWindowId, windows, updateWindowBounds } = get();
        if (!activeWindowId) return;
        const win = windows.find((w) => w.id === activeWindowId);
        if (win && !win.isMaximized) {
          updateWindowBounds(
            activeWindowId,
            { x: win.position.x + dx, y: win.position.y + dy },
            win.size
          );
        }
      },

      snapActiveWindow: (direction) => {
        const { activeWindowId, windows, updateWindowBounds, toggleMaximizeApp } = get();
        if (!activeWindowId || typeof window === 'undefined') return;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const win = windows.find((w) => w.id === activeWindowId);
        if (!win) return;

        if (direction === 'top') {
          toggleMaximizeApp(activeWindowId);
          return;
        }

        const wide = screenW >= LG_BREAKPOINT;
        const topMargin = wide ? TOP_INSET : 34;
        const bottomMargin = wide ? 16 : BOTTOM_DOCK_INSET;
        const sideMargin = wide ? LEFT_DOCK_INSET + 8 : 14;
        const rightMargin = 14;
        const gutter = 10;
        const availableHeight = Math.max(300, screenH - topMargin - bottomMargin);
        const availWidth = screenW - sideMargin - rightMargin;
        const halfWidth = Math.max(320, Math.floor((availWidth - gutter) / 2));

        if (direction === 'left') {
          updateWindowBounds(
            activeWindowId,
            { x: sideMargin, y: topMargin },
            { width: halfWidth, height: availableHeight }
          );
        } else if (direction === 'right') {
          updateWindowBounds(
            activeWindowId,
            { x: screenW - rightMargin - halfWidth, y: topMargin },
            { width: halfWidth, height: availableHeight }
          );
        }
      },

      resetDesktopLayout: () => {
        // Full "Reset desktop": windows + every personalisation setting returns
        // to the clean default, and the virtual file system is restored to factory.
        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove('reduce-motion');
          document.documentElement.style.fontSize = '';
        }
        sounds.isMuted = true; // default soundEnabled is false
        set({
          windows: initialWindows.map((w) => ({
            ...w,
            isOpen: w.id === 'terminal',
            isMinimized: false,
            isMaximized: false,
            position: getCenteredPosition(w.size.width, w.size.height),
          })),
          activeWindowId: 'terminal',
          activeWorkspace: 1,
          notifications: createInitialNotifications(),
          selectedWallpaperId: 'noble-numbat',
          themeMode: 'dark',
          accentColor: '#e95420',
          soundEnabled: false,
          nightLight: false,
          fontSize: 'standard',
          reducedMotion: false,
          locale: 'en',
          settingsPage: 'appearance',
          currentCwd: '/home/yash',
          isActivitiesOpen: false,
          isShortcutsHelpOpen: false,
          isWallpaperModalOpen: false,
          isRecruiterViewOpen: false,
        });
        vfs.resetToFactory();
      },

      takeScreenshot: () => {
        sounds.playScreenshotSound();
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `Screenshot_${timestamp}.png`;
        const filePath = `/home/yash/Pictures/Screenshots/${filename}`;

        vfs.createFile(filePath, '[Screenshot Captured]', '/hero-bg.png', { app: 'image-viewer' });

        get().addNotification({
          title: 'Screenshot Captured',
          message: `Saved to ~/Pictures/Screenshots/${filename}`,
          time: 'Just now',
          type: 'success',
        });
      },

      reclampAllWindows: () => {
        if (typeof window === 'undefined') return;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const wide = screenW >= LG_BREAKPOINT;
        const minX = wide ? LEFT_DOCK_INSET : 0;
        const minY = wide ? TOP_INSET : 32;

        set((state) => ({
          windows: state.windows.map((w) => {
            const clampedX = Math.max(minX, Math.min(w.position.x, Math.max(minX, screenW - 100)));
            const clampedY = Math.max(minY, Math.min(w.position.y, Math.max(minY, screenH - 60)));
            const clampedW = Math.min(w.size.width, Math.max(280, screenW - minX - 16));
            const clampedH = Math.min(w.size.height, Math.max(200, screenH - minY - 16));

            return {
              ...w,
              position: { x: clampedX, y: clampedY },
              size: { width: clampedW, height: clampedH },
            };
          }),
        }));
      },

      toggleActivities: () => set((state) => ({ isActivitiesOpen: !state.isActivitiesOpen })),
      setActivitiesOpen: (open) => set({ isActivitiesOpen: open }),
      toggleShortcutsHelp: () => set((state) => ({ isShortcutsHelpOpen: !state.isShortcutsHelpOpen })),
      setShortcutsHelpOpen: (open) => set({ isShortcutsHelpOpen: open }),
      toggleWallpaperModal: () => set((state) => ({ isWallpaperModalOpen: !state.isWallpaperModalOpen })),
      setWallpaperModalOpen: (open) => set({ isWallpaperModalOpen: open }),
      toggleRecruiterView: () => set((state) => ({ isRecruiterViewOpen: !state.isRecruiterViewOpen })),
      setRecruiterViewOpen: (open) => set({ isRecruiterViewOpen: open }),
      setWallpaper: (id) => set({ selectedWallpaperId: id }),
      setThemeMode: (mode) => set({ themeMode: mode }),
      toggleThemeMode: () => {
        const next = get().themeMode === 'dark' ? 'light' : 'dark';
        set({ themeMode: next });
      },
      setAccentColor: (color) => set({ accentColor: color }),
      toggleSound: () => {
        const next = !get().soundEnabled;
        sounds.isMuted = !next;
        set({ soundEnabled: next });
      },
      toggleNightLight: () => set((state) => ({ nightLight: !state.nightLight })),
      setNightLight: (enabled) => set({ nightLight: enabled }),
      setFontSize: (size) => {
        if (typeof document !== 'undefined') {
          const root = document.documentElement;
          if (size === 'compact') root.style.fontSize = '14px';
          else if (size === 'large') root.style.fontSize = '18px';
          else root.style.fontSize = '16px';
        }
        set({ fontSize: size });
      },
      setReducedMotion: (reduced) => {
        if (typeof document !== 'undefined') {
          if (reduced) document.documentElement.classList.add('reduce-motion');
          else document.documentElement.classList.remove('reduce-motion');
        }
        set({ reducedMotion: reduced });
      },
      toggleReducedMotion: () => get().setReducedMotion(!get().reducedMotion),
      setSettingsPage: (page) => set({ settingsPage: page }),
      setCwd: (path) => set({ currentCwd: path }),
    })
);
