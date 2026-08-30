export type LocaleCode = 'en' | 'hi' | 'es' | 'de' | 'fr' | 'pt' | 'ja' | 'zh-CN' | 'ar';

export interface LanguageMeta {
  code: LocaleCode;
  shortCode: string;
  nativeName: string;
  englishName: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', shortCode: 'EN', nativeName: 'English', englishName: 'English', dir: 'ltr' },
  { code: 'hi', shortCode: 'HI', nativeName: 'हिन्दी', englishName: 'Hindi', dir: 'ltr' },
  { code: 'es', shortCode: 'ES', nativeName: 'Español', englishName: 'Spanish', dir: 'ltr' },
  { code: 'de', shortCode: 'DE', nativeName: 'Deutsch', englishName: 'German', dir: 'ltr' },
  { code: 'fr', shortCode: 'FR', nativeName: 'Français', englishName: 'French', dir: 'ltr' },
  { code: 'pt', shortCode: 'PT', nativeName: 'Português', englishName: 'Portuguese', dir: 'ltr' },
  { code: 'ja', shortCode: 'JA', nativeName: '日本語', englishName: 'Japanese', dir: 'ltr' },
  { code: 'zh-CN', shortCode: 'ZH', nativeName: '简体中文', englishName: 'Chinese (Simplified)', dir: 'ltr' },
  { code: 'ar', shortCode: 'AR', nativeName: 'العربية', englishName: 'Arabic', dir: 'rtl' },
];

export interface TranslatedProject {
  id: string;
  name: string;
  tagline: string;
  status: string;
  bulletPoints: string[];
  problem: string;
  solution: string;
}

export interface TranslatedMilestone {
  year: string;
  title: string;
  subtitle: string;
  category: string;
  desc: string;
  points: string[];
}

export interface TranslatedSkillGroup {
  category: string;
  skills: { name: string; level: number; note: string }[];
}

export interface TranslationSchema {
  topbar: {
    activities: string;
    tour: string;
    shortcuts: string;
    notifications: string;
    quickSettings: string;
    themeMode: string;
    darkStyle: string;
    lightStyle: string;
    accentColor: string;
    soundFx: string;
    volume: string;
    settings: string;
    powerOff: string;
    language: string;
    weatherLocation: string;
    weatherDesc: string;
    clearAll: string;
    noNotifications: string;
  };
  dock: {
    terminal: string;
    files: string;
    projects: string;
    skills: string;
    timeline: string;
    resume: string;
    contact: string;
    browser: string;
    monitor: string;
    settings: string;
  };
  desktop: {
    projects: string;
    projectsSub: string;
    skills: string;
    skillsSub: string;
    timeline: string;
    timelineSub: string;
    resume: string;
    resumeSub: string;
    terminal: string;
    terminalSub: string;
    contact: string;
    contactSub: string;
  };
  about: {
    title: string;
    role: string;
    available: string;
    desktopAppearance: string;
    themeMode: string;
    dark: string;
    light: string;
    accentColor: string;
    soundFx: string;
    soundOn: string;
    soundMuted: string;
    regionalLanguage: string;
    autoDetected: string;
    summaryTitle: string;
    summaryText: string;
    skillsTitle: string;
    educationTitle: string;
    languagesTitle: string;
    degree: string;
    institution: string;
    focus: string;
  };
  projects: {
    title: string;
    subtitle: string;
    repositoriesCount: string;
    github: string;
    highlights: string;
    problem: string;
    solution: string;
    list: TranslatedProject[];
  };
  skills: {
    title: string;
    subtitle: string;
    badge: string;
    groups: TranslatedSkillGroup[];
  };
  timeline: {
    title: string;
    subtitle: string;
    periodBadge: string;
    milestones: TranslatedMilestone[];
  };
  contact: {
    title: string;
    directEmail: string;
    phoneNumber: string;
    copyEmail: string;
    copied: string;
    to: string;
    from: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    sendMessage: string;
    sending: string;
    sent: string;
  };
  terminal: {
    welcome: string;
    candidate: string;
    targetRole: string;
    location: string;
    contact: string;
    github: string;
    typeHelp: string;
  };
  systemMonitor: {
    title: string;
    cpuHistory: string;
    ramMemory: string;
    networkRate: string;
    activeProcesses: string;
    cloudInfra: string;
  };
}
