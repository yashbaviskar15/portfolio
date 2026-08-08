import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, languagesList } from '../context/LanguageContext';
import { useCV } from '../context/CVContext';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { openCV } = useCV();
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash ? window.location.hash.replace('#', '') : null;
      return hash || sessionStorage.getItem('yash_portfolio_active_section') || 'home';
    }
    return 'home';
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { name: t('nav.home', 'Home'), href: '#home', id: 'home', icon: 'bi-house-door-fill' },
    { name: t('nav.about', 'About'), href: '#about', id: 'about', icon: 'bi-person-badge-fill' },
    { name: t('nav.skills', 'Skills'), href: '#skills', id: 'skills', icon: 'bi-tools' },
    { name: t('nav.projects', 'Projects'), href: '#projects', id: 'projects', icon: 'bi-folder-check' },
    { name: t('nav.education', 'Experience'), href: '#experience', id: 'experience', icon: 'bi-mortarboard-fill' },
    { name: 'GitHub', href: '#github', id: 'github', icon: 'bi-github' },
    { name: t('nav.contact', 'Contact'), href: '#contact', id: 'contact', icon: 'bi-chat-dots-fill' },
  ];

  const currentLangObj = languagesList.find((l) => l.code === lang) || languagesList[0];

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'github', 'contact'];
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          sessionStorage.setItem('yash_portfolio_active_section', sectionIds[i]);
          if (window.location.hash !== '#' + sectionIds[i]) {
            window.history.replaceState(null, '', '#' + sectionIds[i]);
          }
          break;
        }
      }
    };

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { setLangDropdownOpen(false); setMobileMenuOpen(false); }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) { setMobileMenuOpen(false); setLangDropdownOpen(false); }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (e, href) => {
    if (e && e.preventDefault) e.preventDefault();
    setMobileMenuOpen(false);
    setLangDropdownOpen(false);
    const targetId = href.replace('#', '');
    setActiveSection(targetId);
    sessionStorage.setItem('yash_portfolio_active_section', targetId);
    window.history.replaceState(null, '', '#' + targetId);
    const element = document.getElementById(targetId);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-14 transition-all duration-200 ${
          isScrolled || mobileMenuOpen
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs'
            : 'bg-[#F8FAF9]/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-2">
          {/* Brand Logo & Name */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-2 group shrink-0 min-w-0"
          >
            <img
              src="/favicon.png"
              alt="Yash Baviskar Logo"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain shadow-2xs group-hover:scale-105 transition-transform shrink-0"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-slate-900 text-sm sm:text-base tracking-tight group-hover:text-purple-600 transition-colors whitespace-nowrap">
                Yash Baviskar
              </span>
              <span className="text-[9px] font-mono text-purple-600 font-bold tracking-wider uppercase hidden md:block leading-none">
                Junior Cloud Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Pill (1024px+) */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-white/95 px-3 py-1 rounded-full border border-slate-200/90 shadow-2xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-3 py-1 text-xs font-medium transition-colors ${
                    isActive ? 'text-purple-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-purple-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Selector Dropdown (Shown on sm+; mobile accesses via menu drawer) */}
            <div className="relative hidden sm:block" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200/90 rounded-full shadow-2xs text-xs font-bold text-slate-700 hover:border-purple-300 transition-all cursor-pointer"
                aria-expanded={langDropdownOpen}
                aria-label="Select Language"
              >
                <span className="text-sm leading-none">{currentLangObj.flag}</span>
                <span className="uppercase tracking-wider font-mono text-slate-900 font-bold text-[10px]">{currentLangObj.code}</span>
                <i className={`bi bi-chevron-down text-[9px] text-slate-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180 text-purple-600' : ''}`} />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 shadow-2xl rounded-2xl p-3 z-50 ring-1 ring-black/5 max-w-[calc(100vw-2rem)]"
                  >
                    <div className="flex items-center justify-between px-2 pb-2.5 mb-2 border-b border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs font-bold font-heading text-slate-900">
                        <i className="bi bi-globe2 text-purple-600" />
                        <span>Language / Sprache ({languagesList.length})</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 max-h-[280px] overflow-y-auto custom-scrollbar p-0.5">
                      {languagesList.map((item) => {
                        const isSelected = lang === item.code;
                        return (
                          <button
                            key={item.code}
                            type="button"
                            onClick={() => { setLang(item.code); setLangDropdownOpen(false); }}
                            className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all text-left border cursor-pointer ${
                              isSelected
                                ? 'bg-purple-50 border-purple-200 text-purple-700 font-bold shadow-2xs'
                                : 'bg-slate-50 border-transparent hover:bg-slate-100 hover:border-slate-200 text-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-sm shrink-0 leading-none">{item.flag}</span>
                              <span className="truncate text-slate-900">{item.name}</span>
                            </div>
                            <span className={`text-[9px] uppercase font-mono px-1 rounded shrink-0 ${isSelected ? 'bg-purple-200 text-purple-800 font-bold' : 'text-slate-400 bg-slate-200/60'}`}>
                              {item.code}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Download CV Button */}
            <button
              type="button"
              onClick={openCV}
              className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-bold text-white gradient-btn shadow-xs hover:shadow-purple-500/20 transition-all cursor-pointer shrink-0"
              aria-label="Download CV"
            >
              <i className="bi bi-file-earmark-pdf-fill text-xs" />
              <span className="hidden sm:inline">Download CV</span>
              <span className="sm:hidden">CV</span>
            </button>

            {/* Mobile Menu Hamburger Toggle (Visible < 1024px) */}
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setLangDropdownOpen(false); }}
              className="lg:hidden w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <i className={`bi ${mobileMenuOpen ? 'bi-x-lg text-purple-600' : 'bi-list'} text-base`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (< 1024px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40"
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed inset-x-0 top-14 bottom-0 z-40 bg-white shadow-2xl flex flex-col justify-between overflow-y-auto border-t border-slate-200"
            >
              <div className="p-4 space-y-4">
                {/* Navigation Links */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1 font-heading">
                    Navigation Menu
                  </div>
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={(e) => scrollToSection(e, item.href)}
                        className={`flex items-center justify-between py-2.5 px-3 rounded-xl font-medium text-sm transition-all ${
                          isActive
                            ? 'bg-purple-50 text-purple-700 font-bold border border-purple-200/80 shadow-2xs'
                            : 'text-slate-700 hover:bg-slate-50 border border-transparent active:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${isActive ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'}`}>
                            <i className={`bi ${item.icon}`} />
                          </div>
                          <span>{item.name}</span>
                        </div>
                        <i className={`bi bi-chevron-right text-xs ${isActive ? 'text-purple-600' : 'text-slate-300'}`} />
                      </a>
                    );
                  })}
                </div>

                {/* Mobile Language Selector */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between px-1 mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider font-heading">
                      <i className="bi bi-globe2 text-purple-600" />
                      <span>Select Language ({languagesList.length})</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                      {currentLangObj.flag} {currentLangObj.code.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto custom-scrollbar p-1 bg-slate-50/80 rounded-2xl border border-slate-100">
                    {languagesList.map((item) => {
                      const isSelected = lang === item.code;
                      return (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => { setLang(item.code); setMobileMenuOpen(false); }}
                          className={`flex items-center justify-between p-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white text-purple-700 font-bold border-purple-300 shadow-xs'
                              : 'bg-white/60 border-slate-200/60 hover:bg-white text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="text-sm shrink-0">{item.flag}</span>
                            <span className="truncate text-slate-900">{item.name}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2">
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); openCV(); }}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl gradient-btn text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  <i className="bi bi-file-earmark-pdf-fill" />
                  <span>View & Download CV (PDF)</span>
                </button>
                <div className="flex items-center justify-center gap-4 text-xs font-medium text-slate-500 pt-1">
                  <a href="mailto:yashbaviskar0215@outlook.com" className="hover:text-purple-600 transition-colors flex items-center gap-1">
                    <i className="bi bi-envelope-fill text-purple-600" />
                    <span>yashbaviskar0215@outlook.com</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
