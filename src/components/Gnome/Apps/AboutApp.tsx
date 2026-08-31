import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HardDrive,
  Award,
  GraduationCap,
  MapPin,
  Terminal,
  Server,
  CheckCircle2,
  Phone,
  Mail,
  Globe,
  Languages,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Palette,
  Sparkles,
  User,
  ExternalLink,
  Check,
  ChevronDown,
  ChevronRight,
  Cpu,
  ShieldCheck,
  Wifi,
  Bluetooth,
  Bell,
  Monitor,
  Info,
} from 'lucide-react';
import { toast } from 'sonner';
import { portfolioData } from '../../../data/portfolio';
import { useGnomeStore } from '../../../store/useGnomeStore';
import { SUPPORTED_LANGUAGES, LocaleCode } from '../../../types/i18n';

type SettingsPage = 'appearance' | 'region' | 'about';

interface SidebarItem {
  id: SettingsPage;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
}

export const AboutApp: React.FC = () => {
  const {
    themeMode,
    setThemeMode,
    accentColor,
    setAccentColor,
    soundEnabled,
    toggleSound,
    locale,
    setLocale,
    settingsPage,
    setSettingsPage,
    t,
  } = useGnomeStore();

  const [imgError, setImgError] = useState<boolean>(false);
  const strings = t();

  const accentColors = [
    { name: 'Ubuntu Orange', hex: '#e95420' },
    { name: 'Aubergine', hex: '#77216f' },
    { name: 'Emerald Green', hex: '#10b981' },
    { name: 'Sky Blue', hex: '#0ea5e9' },
    { name: 'Rose Red', hex: '#f43f5e' },
  ];

  const handleThemeChange = (mode: 'dark' | 'light') => {
    setThemeMode(mode);
    toast.success(`Theme: ${mode.toUpperCase()}`, {
      description: `Ubuntu Yaru ${mode === 'dark' ? 'Dark' : 'Light'} style.`,
    });
  };

  const handleAccentChange = (hex: string, name: string) => {
    setAccentColor(hex);
    toast.success(`Accent color: ${name}`);
  };

  const handleLanguageChange = (langCode: LocaleCode) => {
    const selected = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
    setLocale(langCode);
    toast.success(`Language set to ${selected?.nativeName || langCode}`);
  };

  // GNOME Settings Sidebar Items
  const sidebarItems: SidebarItem[] = [
    { id: 'appearance', label: strings.about.desktopAppearance || 'Appearance', shortLabel: 'Appearance', icon: <Palette className="w-4 h-4" /> },
    { id: 'region', label: strings.about.regionalLanguage || 'Region & Language', shortLabel: 'Language', icon: <Languages className="w-4 h-4" /> },
    { id: 'about', label: strings.about.aboutTitle || 'About', shortLabel: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === locale) || SUPPORTED_LANGUAGES[0];

  // ──── Appearance Page ────
  const renderAppearancePage = () => (
    <div className="space-y-6">
      <h2 className="text-sm font-bold" style={{ color: accentColor }}>
        {strings.about.desktopAppearance || 'Appearance'}
      </h2>

      {/* Theme Mode */}
      <div
        className={`p-4 rounded-2xl border space-y-3 ${
          themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-neutral-300 shadow-xs'
        }`}
      >
        <span className="text-xs font-semibold block">{strings.about.themeMode || 'Style'}</span>
        <div className="flex gap-3">
          {(['dark', 'light'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => handleThemeChange(mode)}
              className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                themeMode === mode
                  ? 'border-orange-500 shadow-lg'
                  : themeMode === 'dark'
                  ? 'border-white/10 hover:border-white/20'
                  : 'border-neutral-300 hover:border-neutral-400'
              }`}
            >
              <div
                className={`w-full h-16 rounded-lg ${
                  mode === 'dark'
                    ? 'bg-gradient-to-br from-neutral-800 to-neutral-950'
                    : 'bg-gradient-to-br from-neutral-100 to-white'
                }`}
              />
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                {mode === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                <span>{mode === 'dark' ? (strings.about.dark || 'Dark') : (strings.about.light || 'Light')}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div
        className={`p-4 rounded-2xl border space-y-3 ${
          themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-neutral-300 shadow-xs'
        }`}
      >
        <span className="text-xs font-semibold block">{strings.about.accentColor || 'Accent Color'}</span>
        <div className="flex items-center gap-3">
          {accentColors.map((color) => (
            <button
              key={color.hex}
              type="button"
              onClick={() => handleAccentChange(color.hex, color.name)}
              className={`w-8 h-8 rounded-full transition-transform hover:scale-110 cursor-pointer relative ${
                accentColor === color.hex
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-900 scale-110'
                  : ''
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-label={color.name}
            />
          ))}
        </div>
      </div>

      {/* Sound Effects */}
      <div
        className={`p-4 rounded-2xl border space-y-3 ${
          themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-neutral-300 shadow-xs'
        }`}
      >
        <span className="text-xs font-semibold block">{strings.about.soundFx || 'Sound'}</span>
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-400">UI Sound Effects</span>
          <button
            type="button"
            onClick={() => {
              toggleSound();
              toast.info(soundEnabled ? 'UI sounds muted' : 'UI sounds enabled');
            }}
            className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
              soundEnabled ? 'bg-orange-600' : 'bg-neutral-600'
            }`}
          >
            <motion.div
              animate={{ x: soundEnabled ? 20 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
            />
          </button>
        </div>
      </div>
    </div>
  );

  // ──── Region & Language Page ────
  const renderRegionPage = () => (
    <div className="space-y-6">
      <h2 className="text-sm font-bold" style={{ color: accentColor }}>
        {strings.about.regionalLanguage || 'Region & Language'}
      </h2>

      {/* Current Language */}
      <div
        className={`p-4 rounded-2xl border space-y-3 ${
          themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-neutral-300 shadow-xs'
        }`}
      >
        <span className="text-xs font-semibold block">Language</span>
        <p className="text-[11px] text-neutral-400">
          Your portfolio content, desktop labels, and date/time formats will update to match the selected language.
        </p>
        <div className="space-y-1 pt-1">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = locale === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer border ${
                  isSelected
                    ? 'border-orange-500 shadow-md'
                    : themeMode === 'dark'
                    ? 'border-transparent hover:bg-white/5'
                    : 'border-transparent hover:bg-neutral-50'
                }`}
                style={isSelected ? { backgroundColor: `${accentColor}22` } : {}}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 text-center font-mono text-[10px] font-bold opacity-60">
                    {lang.shortCode}
                  </span>
                  <div className="text-left">
                    <span className={`block font-semibold ${isSelected ? 'text-white' : ''}`}>
                      {lang.nativeName}
                    </span>
                    <span className="text-[10px] text-neutral-500">{lang.englishName}</span>
                  </div>
                </div>
                {isSelected && (
                  <Check className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Formats */}
      <div
        className={`p-4 rounded-2xl border space-y-2 ${
          themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-neutral-300 shadow-xs'
        }`}
      >
        <span className="text-xs font-semibold block">Formats</span>
        <div className="grid grid-cols-2 gap-3 text-[11px]">
          <div>
            <span className="text-neutral-500 block">Date</span>
            <span className={themeMode === 'dark' ? 'text-white' : 'text-neutral-900'}>
              {new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date())}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 block">Time</span>
            <span className={themeMode === 'dark' ? 'text-white' : 'text-neutral-900'}>
              {new Intl.DateTimeFormat(locale, { timeStyle: 'short' }).format(new Date())}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 block">Number</span>
            <span className={themeMode === 'dark' ? 'text-white' : 'text-neutral-900'}>
              {new Intl.NumberFormat(locale).format(1234567.89)}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 block">Currency</span>
            <span className={themeMode === 'dark' ? 'text-white' : 'text-neutral-900'}>
              {new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(1234.5)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // ──── About Page ────
  const renderAboutPage = () => (
    <div className="space-y-6">
      <h2 className="text-sm font-bold" style={{ color: accentColor }}>
        {strings.about.aboutTitle || 'About'}
      </h2>

      {/* Profile Card — avatar with green status ring (no separate floating dot) */}
      <div
        className={`p-5 rounded-2xl border flex flex-col items-center gap-4 ${
          themeMode === 'dark'
            ? 'bg-gradient-to-br from-neutral-900 via-neutral-900 to-purple-950/40 border-white/10 shadow-lg'
            : 'bg-white border-neutral-300 shadow-xs'
        }`}
      >
        {/* Avatar with integrated status ring */}
        <div className="relative shrink-0">
          {imgError ? (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-white shadow-xl select-none"
              style={{
                background: 'linear-gradient(135deg, #77216f 0%, #e95420 100%)',
                border: '3px solid #10b981',
              }}
            >
              <span className="font-extrabold text-2xl font-mono tracking-tight drop-shadow-md">
                YB
              </span>
            </div>
          ) : (
            <div
              className="w-24 h-24 rounded-full p-[3px] shadow-xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #10b981, #10b981)',
              }}
            >
              <img
                src="/profile.jpg"
                alt={portfolioData.developer.name}
                onError={() => setImgError(true)}
                loading="eager"
                className="w-full h-full object-cover object-center rounded-full block select-none"
              />
            </div>
          )}
        </div>

        {/* Name + Status */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-2">
            <h1
              className={`text-lg font-extrabold font-heading ${
                themeMode === 'dark' ? 'text-white' : 'text-neutral-900'
              }`}
            >
              {portfolioData.developer.name}
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
              {strings.about.available}
            </span>
          </div>
          <p className="text-xs font-semibold" style={{ color: accentColor }}>
            {strings.about.role}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-[11px] text-neutral-400 font-mono">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-400" />
              <span>{portfolioData.developer.location}</span>
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{portfolioData.developer.phone}</span>
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-sky-400" />
              <span>{portfolioData.developer.email}</span>
            </span>
          </div>
        </div>
      </div>

      {/* System Specs */}
      <div
        className={`p-4 rounded-2xl border space-y-3 ${
          themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-neutral-300 shadow-xs'
        }`}
      >
        <span className="text-xs font-semibold block">Device Information</span>
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div>
            <span className="text-neutral-400 block text-[10px] uppercase font-bold">Host OS</span>
            <span className={`font-semibold ${themeMode === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              Ubuntu 24.04 LTS
            </span>
          </div>
          <div>
            <span className="text-neutral-400 block text-[10px] uppercase font-bold">Desktop</span>
            <span className={`font-semibold ${themeMode === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              GNOME 46
            </span>
          </div>
          <div>
            <span className="text-neutral-400 block text-[10px] uppercase font-bold">Focus</span>
            <span className="font-semibold" style={{ color: accentColor }}>
              {strings.about.focus}
            </span>
          </div>
          <div>
            <span className="text-neutral-400 block text-[10px] uppercase font-bold">Kernel</span>
            <span className={`font-semibold ${themeMode === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              6.8.0-45-generic
            </span>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="space-y-2">
        <h3
          className="text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-2"
          style={{ color: accentColor }}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>{strings.about.summaryTitle}</span>
        </h3>
        <p
          className={`text-xs sm:text-sm leading-relaxed p-4 rounded-2xl border ${
            themeMode === 'dark'
              ? 'bg-neutral-900 border-white/10 text-neutral-300'
              : 'bg-white border-neutral-300 text-neutral-700 shadow-xs'
          }`}
        >
          {strings.about.summaryText}
        </p>
      </div>

      {/* Technical Skills */}
      <div className="space-y-2">
        <h3
          className="text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-2"
          style={{ color: accentColor }}
        >
          <Server className="w-3.5 h-3.5" />
          <span>{strings.about.skillsTitle}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {strings.skills.groups.map((group) => (
            <div
              key={group.category}
              className={`p-4 rounded-2xl border space-y-2 ${
                themeMode === 'dark' ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-300 shadow-xs'
              }`}
            >
              <span
                className={`text-xs font-bold block ${themeMode === 'dark' ? 'text-white' : 'text-neutral-900'}`}
              >
                {group.category}
              </span>
              {group.skills.map((skill) => (
                <p key={skill.name} className="text-xs text-neutral-400 leading-relaxed">
                  <strong className={themeMode === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}>
                    {skill.name}:
                  </strong>{' '}
                  {skill.note}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="space-y-2">
        <h3
          className="text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-2"
          style={{ color: accentColor }}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>{strings.about.educationTitle}</span>
        </h3>
        <div
          className={`p-4 rounded-2xl border space-y-2.5 ${
            themeMode === 'dark' ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-300 shadow-xs'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className={`text-sm font-bold ${themeMode === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                {strings.about.degree}
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">
                {strings.about.institution}
              </div>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-0.5 rounded-md bg-orange-600/20 text-orange-300 border border-orange-500/30 font-mono text-xs font-bold">
                {portfolioData.education.period}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-2 pb-8">
        <h3
          className="text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-2"
          style={{ color: accentColor }}
        >
          <Languages className="w-3.5 h-3.5" />
          <span>{strings.about.languagesTitle}</span>
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {portfolioData.languages.map((lang) => (
            <div
              key={lang.language}
              className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                themeMode === 'dark' ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-300 shadow-xs'
              }`}
            >
              <span className={`font-bold text-xs ${themeMode === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                {lang.language}
              </span>
              <span className="text-xs font-mono font-semibold" style={{ color: accentColor }}>
                {lang.proficiency}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row h-full w-full">
      {/* ════ Left Sidebar Navigation (Desktop) ════ */}
      <div
        className={`hidden sm:flex flex-col w-52 shrink-0 border-r py-2 ${
          themeMode === 'dark'
            ? 'bg-[#1a1a1e] border-white/10'
            : 'bg-[#f0f0f2] border-neutral-300'
        }`}
      >
        <div className="px-3 py-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-mono">
            Settings
          </span>
        </div>
        {sidebarItems.map((item) => {
          const isActive = settingsPage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSettingsPage(item.id)}
              className={`mx-1.5 px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-all cursor-pointer text-left ${
                isActive
                  ? themeMode === 'dark'
                    ? 'bg-white/10 text-white font-semibold'
                    : 'bg-neutral-300 text-neutral-900 font-semibold'
                  : themeMode === 'dark'
                  ? 'text-neutral-400 hover:bg-white/5 hover:text-white'
                  : 'text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
              }`}
              style={isActive ? { borderLeft: `3px solid ${accentColor}` } : { paddingLeft: '15px' }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* ════ Mobile Top Tabs (Horizontal Scrollable) ════ */}
      <div
        className={`sm:hidden flex items-center border-b shrink-0 px-2 gap-1 overflow-x-auto gnome-scrollbar ${
          themeMode === 'dark'
            ? 'bg-[#1a1a1e] border-white/10'
            : 'bg-[#f0f0f2] border-neutral-300'
        }`}
      >
        {sidebarItems.map((item) => {
          const isActive = settingsPage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSettingsPage(item.id)}
              className={`px-3 py-2 text-[11px] font-medium border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'text-white font-semibold'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
              style={isActive ? { borderBottomColor: accentColor } : {}}
            >
              {item.icon}
              <span>{item.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* ════ Main Content Area ════ */}
      <div
        className={`flex-1 min-w-0 min-h-0 overflow-y-auto gnome-scrollbar p-3.5 sm:p-6 transition-colors duration-200 ${
          themeMode === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
        }`}
      >
        {settingsPage === 'appearance' && renderAppearancePage()}
        {settingsPage === 'region' && renderRegionPage()}
        {settingsPage === 'about' && renderAboutPage()}
      </div>
    </div>
  );
};
