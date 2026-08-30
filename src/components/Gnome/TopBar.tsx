import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Battery,
  Power,
  Settings,
  Moon,
  Sun,
  Calendar as CalendarIcon,
  MapPin,
  Bell,
  X,
  Check,
  ChevronDown,
  HelpCircle,
  Compass,
  Keyboard,
  Bluetooth,
  Laptop,
} from 'lucide-react';
import { toast } from 'sonner';
import { dropdownMenuVariants } from '../../lib/animations';
import { WindowId } from '../../types/gnome';
import { useGnomeStore } from '../../store/useGnomeStore';
import { SUPPORTED_LANGUAGES } from '../../types/i18n';
import { useNetworkDevice } from '../../hooks/useNetworkDevice';

interface TopBarProps {
  onToggleActivities: () => void;
  isActivitiesOpen: boolean;
  onOpenApp: (appId: WindowId) => void;
}

// Format dynamic relative time
function formatRelativeTime(timestamp?: number, fallback: string = 'Just now'): string {
  if (!timestamp) return fallback;
  const diffSeconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (diffSeconds < 60) return 'Just now';
  const diffMins = Math.floor(diffSeconds / 60);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleActivities, isActivitiesOpen, onOpenApp }) => {
  const {
    themeMode,
    toggleThemeMode,
    soundEnabled,
    toggleSound,
    nightLight,
    toggleNightLight,
    setShutdown,
    toggleShortcutsHelp,
    accentColor,
    setAccentColor,
    notifications,
    dismissNotification,
    clearAllNotifications,
    startTour,
    locale,
    setLocale,
    hasAutoDetectedLocale,
    setHasAutoDetectedLocale,
    setSettingsPage,
    t,
  } = useGnomeStore();

  const network = useNetworkDevice();

  const [timeString, setTimeString] = useState<string>('');
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [quickSettingsOpen, setQuickSettingsOpen] = useState<boolean>(false);
  const [helpMenuOpen, setHelpMenuOpen] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80);
  const [wifiEnabled, setWifiEnabled] = useState<boolean>(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState<boolean>(true);
  const [soundExpanded, setSoundExpanded] = useState<boolean>(false);
  const [powerDialog, setPowerDialog] = useState<boolean>(false);

  const quickSettingsRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const helpMenuRef = useRef<HTMLDivElement>(null);
  const strings = t();

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === locale) || SUPPORTED_LANGUAGES[0];

  // Auto-detection toast on initial mount
  useEffect(() => {
    if (!hasAutoDetectedLocale) {
      const detectedLang = SUPPORTED_LANGUAGES.find((l) => l.code === locale);
      if (detectedLang && locale !== 'en') {
        toast.info(`Language set to ${detectedLang.nativeName} (${detectedLang.englishName})`, {
          description: 'Change anytime from Settings → Region & Language.',
        });
      }
      setHasAutoDetectedLocale(true);
    }
  }, [hasAutoDetectedLocale, locale, setHasAutoDetectedLocale]);

  // Live Date/Time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      };
      try {
        const formatted = new Intl.DateTimeFormat(locale, options).format(now);
        setTimeString(formatted);
      } catch (e) {
        setTimeString(now.toLocaleString('en-US', options).replace(/,/g, ''));
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [locale]);

  // Close popovers on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (quickSettingsRef.current && !quickSettingsRef.current.contains(event.target as Node)) {
        setQuickSettingsOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
      if (helpMenuRef.current && !helpMenuRef.current.contains(event.target as Node)) {
        setHelpMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setQuickSettingsOpen(false);
        setCalendarOpen(false);
        setHelpMenuOpen(false);
        setPowerDialog(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Deep-link to Region & Language page in Settings
  const openRegionSettings = () => {
    setSettingsPage('region');
    onOpenApp('about');
    setQuickSettingsOpen(false);
    setHelpMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 h-8 select-none z-50 flex items-center justify-between px-3 text-xs font-medium border-b transition-colors duration-150 ${
          themeMode === 'dark'
            ? 'bg-[#121214]/90 text-neutral-200 border-white/10'
            : 'bg-[#f4f4f5]/90 text-neutral-800 border-neutral-300 shadow-xs'
        } backdrop-blur-xl`}
      >
        {/* Left: Activities Button + Help Menu (GNOME-native clustering) */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onToggleActivities}
            className={`px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
              isActivitiesOpen
                ? 'bg-orange-600 text-white shadow-xs'
                : themeMode === 'dark'
                ? 'text-neutral-200 hover:bg-white/15'
                : 'text-neutral-800 hover:bg-black/10'
            }`}
            title="Toggle Activities Overview (Super / Ctrl+Space)"
            aria-label="Activities Overview"
          >
            {strings.topbar.activities}
          </button>

          {/* Help Menu Icon — contains Tour + Shortcuts as menu items instead of separate pills */}
          <div className="relative" ref={helpMenuRef}>
            <button
              type="button"
              onClick={() => {
                setHelpMenuOpen(!helpMenuOpen);
                setQuickSettingsOpen(false);
                setCalendarOpen(false);
              }}
              className={`p-1 rounded-full transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                helpMenuOpen
                  ? 'bg-white/20'
                  : themeMode === 'dark'
                  ? 'text-neutral-400 hover:bg-white/10 hover:text-white'
                  : 'text-neutral-600 hover:bg-black/10 hover:text-neutral-900'
              }`}
              title="Help & Tour"
              aria-label="Help Menu"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>

            <AnimatePresence>
              {helpMenuOpen && (
                <motion.div
                  variants={dropdownMenuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`absolute left-0 top-8 w-48 rounded-xl border shadow-2xl backdrop-blur-2xl p-1.5 z-50 space-y-0.5 ${
                    themeMode === 'dark'
                      ? 'bg-[#1e1e22]/95 border-white/15 text-neutral-200'
                      : 'bg-white/95 border-neutral-300 text-neutral-800'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      startTour();
                      setHelpMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                      themeMode === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/5'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{strings.topbar.tour || 'Portfolio Tour'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      toggleShortcutsHelp();
                      setHelpMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                      themeMode === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/5'
                    }`}
                  >
                    <Keyboard className="w-3.5 h-3.5 text-sky-400" />
                    <span>{strings.topbar.shortcuts || 'Keyboard Shortcuts'}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Center: Absolute-Centered Date & Time (Notification Center Trigger) */}
        <div className="absolute left-1/2 -translate-x-1/2" ref={calendarRef}>
          <button
            type="button"
            onClick={() => {
              setCalendarOpen(!calendarOpen);
              setQuickSettingsOpen(false);
              setHelpMenuOpen(false);
            }}
            className={`flex items-center gap-2 px-3 py-0.5 rounded-full transition-all cursor-pointer font-medium tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
              calendarOpen
                ? 'bg-white/20 font-semibold'
                : themeMode === 'dark'
                ? 'text-neutral-200 hover:bg-white/10'
                : 'text-neutral-800 hover:bg-black/10'
            }`}
            aria-label="Date, Calendar and Notification Center"
          >
            <span>{timeString || 'Aug 30 10:44 AM'}</span>
            {notifications.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            )}
          </button>

          {/* GNOME Calendar & Notification Center Popover */}
          <AnimatePresence>
            {calendarOpen && (
              <motion.div
                variants={dropdownMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`absolute left-1/2 -translate-x-1/2 top-8 w-80 sm:w-96 rounded-2xl border shadow-2xl backdrop-blur-2xl p-4 z-50 space-y-4 font-sans max-h-[80vh] overflow-y-auto gnome-scrollbar ${
                  themeMode === 'dark'
                    ? 'bg-[#1e1e22]/95 border-white/15 text-neutral-200'
                    : 'bg-white/95 border-neutral-300 text-neutral-800'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <CalendarIcon className="w-4 h-4 text-orange-400" />
                    <span>{strings.topbar.notifications}</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {locale.toUpperCase()} • {network.devicePlatform}
                  </span>
                </div>

                {/* Weather Info Card */}
                <div
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                    themeMode === 'dark'
                      ? 'bg-neutral-900 border-white/5'
                      : 'bg-neutral-50 border-neutral-200'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      <span>{strings.topbar.weatherLocation}</span>
                    </div>
                    <div className="text-xl font-bold font-mono">27°C</div>
                    <div className="text-[11px] text-neutral-400">
                      {strings.topbar.weatherDesc}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                    <Sun className="w-5 h-5" />
                  </div>
                </div>

                {/* Live Dynamic Notification Feed */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">
                      {strings.topbar.notifications} ({notifications.length})
                    </span>
                    {notifications.length > 0 && (
                      <button
                        type="button"
                        onClick={clearAllNotifications}
                        className="text-[10px] text-orange-400 hover:underline font-mono cursor-pointer"
                      >
                        {strings.topbar.clearAll}
                      </button>
                    )}
                  </div>

                  {notifications.length === 0 ? (
                    <div className="py-4 text-center text-xs text-neutral-500 font-mono">
                      {strings.topbar.noNotifications}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <AnimatePresence>
                        {notifications.map((notif) => {
                          const liveTime = formatRelativeTime(notif.timestamp, notif.time);
                          return (
                            <motion.div
                              key={notif.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className={`p-2.5 rounded-xl border flex items-start justify-between gap-2 text-xs ${
                                themeMode === 'dark'
                                  ? 'bg-neutral-900/90 border-white/5'
                                  : 'bg-neutral-50 border-neutral-200'
                              }`}
                            >
                              <div className="space-y-0.5 flex-1 pr-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-white text-[11.5px] flex items-center gap-1.5">
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full ${
                                        notif.type === 'success'
                                          ? 'bg-emerald-400'
                                          : notif.type === 'alert'
                                          ? 'bg-rose-400'
                                          : 'bg-sky-400'
                                      }`}
                                    />
                                    <span>{notif.title}</span>
                                  </span>
                                  <span className="text-[9.5px] text-neutral-500 font-mono">
                                    {liveTime}
                                  </span>
                                </div>
                                <p className="text-[11px] text-neutral-400 leading-relaxed">
                                  {notif.message}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => dismissNotification(notif.id)}
                                className="p-1 rounded hover:bg-white/10 text-neutral-500 hover:text-white cursor-pointer"
                                title="Dismiss"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: System Indicators Pill (Wi-Fi · Volume · Battery · EN · Power) */}
        <div className="flex items-center gap-1.5 relative" ref={quickSettingsRef}>
          {/* Compact "EN" language indicator — deep-links to Region & Language settings */}
          <button
            type="button"
            onClick={openRegionSettings}
            className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono transition-colors cursor-pointer ${
              themeMode === 'dark'
                ? 'text-neutral-400 hover:text-white hover:bg-white/10'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-black/5'
            }`}
            title={`Language: ${currentLang.nativeName} — Click to open Region & Language settings`}
          >
            {currentLang.shortCode}
          </button>

          <button
            type="button"
            onClick={() => {
              setQuickSettingsOpen(!quickSettingsOpen);
              setCalendarOpen(false);
              setHelpMenuOpen(false);
            }}
            className={`flex items-center gap-2.5 px-3 py-0.5 rounded-full transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
              quickSettingsOpen
                ? 'bg-white/20 font-semibold'
                : themeMode === 'dark'
                ? 'text-neutral-200 hover:bg-white/10'
                : 'text-neutral-800 hover:bg-black/10'
            }`}
            title={strings.topbar.quickSettings}
            aria-label={strings.topbar.quickSettings}
          >
            <motion.div
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
              {wifiEnabled && network.isOnline ? (
                <Wifi className="w-3.5 h-3.5" />
              ) : (
                <WifiOff className="w-3.5 h-3.5 text-neutral-500" />
              )}
            </motion.div>

            <Volume2 className="w-3.5 h-3.5" />

            <div className="flex items-center gap-1">
              <span className="text-[10.5px] font-mono">100%</span>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
              </motion.div>
            </div>

            <Power className="w-3 h-3 text-orange-400" />
          </button>

          {/* ====== GNOME Quick Settings Popover ====== */}
          <AnimatePresence>
            {quickSettingsOpen && (
              <motion.div
                variants={dropdownMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`absolute right-0 top-8 w-80 sm:w-88 rounded-2xl border shadow-2xl backdrop-blur-2xl p-4 z-50 space-y-3 ${
                  themeMode === 'dark'
                    ? 'bg-[#1e1e22]/95 border-white/15 text-neutral-200'
                    : 'bg-white/95 border-neutral-300 text-neutral-800'
                }`}
              >
                {/* ── Top: 2-Column Toggle Grid (Wi-Fi, Bluetooth, Dark Style, Night Light) ── */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Wi-Fi Toggle with actual connected device detection */}
                  <button
                    type="button"
                    onClick={() => {
                      const next = !wifiEnabled;
                      setWifiEnabled(next);
                      toast.info(next ? `Connected: ${network.networkName}` : 'Wi-Fi Disconnected');
                    }}
                    className={`p-2.5 rounded-xl border transition-colors flex items-center gap-2.5 text-left cursor-pointer ${
                      wifiEnabled && network.isOnline
                        ? 'bg-orange-600 border-orange-500 text-white shadow-xs'
                        : 'bg-neutral-800/40 border-neutral-700 text-neutral-400'
                    }`}
                  >
                    {wifiEnabled && network.isOnline ? (
                      <Wifi className="w-4 h-4 shrink-0" />
                    ) : (
                      <WifiOff className="w-4 h-4 shrink-0" />
                    )}
                    <div className="truncate">
                      <div className="text-xs font-bold leading-tight">Wi-Fi</div>
                      <div className="text-[10px] opacity-80 truncate">
                        {wifiEnabled && network.isOnline ? network.networkName : 'Disconnected'}
                      </div>
                    </div>
                  </button>

                  {/* Bluetooth Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      setBluetoothEnabled(!bluetoothEnabled);
                      toast.info(bluetoothEnabled ? 'Bluetooth Off' : `Bluetooth: ${network.deviceName}`);
                    }}
                    className={`p-2.5 rounded-xl border transition-colors flex items-center gap-2.5 text-left cursor-pointer ${
                      bluetoothEnabled
                        ? 'bg-sky-600 border-sky-500 text-white shadow-xs'
                        : 'bg-neutral-800/40 border-neutral-700 text-neutral-400'
                    }`}
                  >
                    <Bluetooth className="w-4 h-4 shrink-0" />
                    <div className="truncate">
                      <div className="text-xs font-bold leading-tight">Bluetooth</div>
                      <div className="text-[10px] opacity-80 truncate">
                        {bluetoothEnabled ? network.deviceName : 'Off'}
                      </div>
                    </div>
                  </button>

                  {/* Dark / Light Style Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      toggleThemeMode();
                      toast.success(
                        `Switched to ${themeMode === 'dark' ? 'LIGHT' : 'DARK'} Mode`
                      );
                    }}
                    className={`p-2.5 rounded-xl border transition-colors flex items-center gap-2.5 text-left cursor-pointer ${
                      themeMode === 'dark'
                        ? 'bg-orange-600 border-orange-500 text-white shadow-xs'
                        : 'bg-neutral-200 border-neutral-300 text-neutral-900 font-bold'
                    }`}
                  >
                    {themeMode === 'dark' ? (
                      <Moon className="w-4 h-4 shrink-0" />
                    ) : (
                      <Sun className="w-4 h-4 shrink-0 text-amber-500" />
                    )}
                    <div>
                      <div className="text-xs font-bold leading-tight">
                        {themeMode === 'dark'
                          ? strings.topbar.darkStyle
                          : strings.topbar.lightStyle}
                      </div>
                      <div className="text-[10px] opacity-80">
                        {themeMode === 'dark' ? 'Active' : 'Light Mode'}
                      </div>
                    </div>
                  </button>

                  {/* Night Light — Interactive Screen Color Temperature Filter */}
                  <button
                    type="button"
                    onClick={() => {
                      toggleNightLight();
                      toast.info(
                        !nightLight ? 'Night Light Enabled (Warm Temperature)' : 'Night Light Disabled'
                      );
                    }}
                    className={`p-2.5 rounded-xl border transition-colors flex items-center gap-2.5 text-left cursor-pointer ${
                      nightLight
                        ? 'bg-amber-600 border-amber-500 text-white shadow-xs'
                        : themeMode === 'dark'
                        ? 'bg-neutral-800/40 border-neutral-700 text-neutral-400'
                        : 'bg-neutral-100 border-neutral-300 text-neutral-600'
                    }`}
                  >
                    {nightLight ? (
                      <Moon className="w-4 h-4 shrink-0 text-amber-200" />
                    ) : (
                      <Sun className="w-4 h-4 shrink-0" />
                    )}
                    <div>
                      <div className="text-xs font-bold leading-tight">Night Light</div>
                      <div className="text-[10px] opacity-80">
                        {nightLight ? 'Active · Warm Tint' : 'Off · Natural'}
                      </div>
                    </div>
                  </button>
                </div>

                {/* ── Divider ── */}
                <div className="border-t border-white/10" />

                {/* ── Volume Slider with Expandable Output ── */}
                <div
                  className={`p-2.5 rounded-xl border space-y-1.5 ${
                    themeMode === 'dark'
                      ? 'bg-neutral-900 border-white/5'
                      : 'bg-neutral-100 border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      {volume === 0 ? (
                        <VolumeX className="w-3.5 h-3.5" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                      <span>{strings.topbar.volume}</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px]">{volume}%</span>
                      <button
                        type="button"
                        onClick={() => setSoundExpanded(!soundExpanded)}
                        className="p-0.5 rounded hover:bg-white/10 cursor-pointer transition-colors"
                        title="Output device"
                      >
                        <ChevronDown className={`w-3 h-3 transition-transform ${soundExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    aria-label="Sound Volume"
                  />

                  {/* Expandable Sound Output & UI Audio toggle */}
                  <AnimatePresence>
                    {soundExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-1.5 space-y-1.5 border-t border-white/5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-neutral-400 flex items-center gap-1">
                              <Laptop className="w-3 h-3 text-neutral-500" />
                              <span>Device Output</span>
                            </span>
                            <span className={`font-semibold ${themeMode === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                              {network.deviceName} Speakers
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              toggleSound();
                              toast.info(soundEnabled ? 'UI Audio Muted' : 'UI Audio Enabled');
                            }}
                            className={`w-full py-1.5 px-2.5 rounded-lg text-[11px] font-medium flex items-center justify-between transition-all cursor-pointer border ${
                              soundEnabled
                                ? 'bg-emerald-600/15 text-emerald-400 border-emerald-500/30'
                                : 'bg-neutral-800/40 text-neutral-400 border-neutral-700'
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                              <span>UI Sound Effects</span>
                            </span>
                            <span>{soundEnabled ? 'On' : 'Muted'}</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── Bottom Row: Settings Gear + Power ── */}
                <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setSettingsPage('about');
                      onOpenApp('about');
                      setQuickSettingsOpen(false);
                    }}
                    className={`p-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                      themeMode === 'dark'
                        ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                        : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-800'
                    }`}
                    title="System Settings"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>{strings.topbar.settings}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPowerDialog(true);
                      setQuickSettingsOpen(false);
                    }}
                    className="p-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Power Off / Shut Down"
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{strings.topbar.powerOff}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Ubuntu Power Off Confirmation Modal */}
      <AnimatePresence>
        {powerDialog && (
          <div className="fixed inset-0 bg-black/65 backdrop-blur-md z-70 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className={`w-full max-w-sm rounded-3xl border p-6 shadow-2xl text-center space-y-4 font-sans ${
                themeMode === 'dark'
                  ? 'bg-[#1e1e22] border-white/15 text-neutral-200'
                  : 'bg-white border-neutral-300 text-neutral-900'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-600/20 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
                <Power className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading">
                  {strings.topbar.powerOff} / Restart
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Yash Baviskar's Cloud Workstation Session • {network.deviceName}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPowerDialog(false)}
                  className={`py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                    themeMode === 'dark'
                      ? 'bg-neutral-800 hover:bg-neutral-700 border-white/10 text-neutral-200'
                      : 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-800'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPowerDialog(false);
                    setShutdown(true);
                  }}
                  className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors cursor-pointer shadow-md"
                >
                  {strings.topbar.powerOff}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
