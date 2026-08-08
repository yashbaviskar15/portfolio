import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, languagesList } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
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
    { name: t('nav.home'), href: '#home', id: 'home', icon: 'bi-house-door-fill' },
    { name: t('nav.about'), href: '#about', id: 'about', icon: 'bi-person-badge-fill' },
    { name: t('nav.skills'), href: '#skills', id: 'skills', icon: 'bi-tools' },
    { name: t('nav.education'), href: '#experience', id: 'experience', icon: 'bi-mortarboard-fill' },
    { name: t('nav.projects'), href: '#projects', id: 'projects', icon: 'bi-folder-check' },
    { name: t('nav.contact'), href: '#contact', id: 'contact', icon: 'bi-chat-dots-fill' },
  ];

  const currentLangObj = languagesList.find((l) => l.code === lang) || languagesList[0];

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle active section tracking on scroll, outside click, keydown, and window resize
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollPosition) {
          const currentId = navItems[i].id;
          setActiveSection(currentId);
          sessionStorage.setItem('yash_portfolio_active_section', currentId);
          sessionStorage.setItem('yash_portfolio_scroll_y', String(window.scrollY));
          if (window.location.hash !== '#' + currentId) {
            window.history.replaceState(null, '', '#' + currentId);
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
      if (e.key === 'Escape') {
        setLangDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
        setLangDropdownOpen(false);
      }
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
  }, [navItems]);

  const scrollToSection = (e, href) => {
    if (e && e.preventDefault) e.preventDefault();
    setMobileMenuOpen(false);
    setLangDropdownOpen(false);
    const targetId = href.replace('#', '');
    setActiveSection(targetId);
    sessionStorage.setItem('yash_portfolio_active_section', targetId);
    window.history.replaceState(null, '', '#' + targetId);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs py-2.5 sm:py-3'
            : 'bg-white/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none py-3.5 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <img
              src="/favicon.png"
              alt="Yash Baviskar"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover shadow-xs group-hover:scale-105 transition-transform border border-slate-200/80"
            />
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-slate-900 text-sm sm:text-base tracking-tight group-hover:text-purple-600 transition-colors whitespace-nowrap">
                Yash Baviskar
              </span>
              <span className="text-[10px] font-mono text-purple-600 font-bold tracking-wider uppercase hidden sm:block">
                Cloud & DevOps
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links Pill */}
          <nav className="hidden lg:flex items-center gap-1 glass-card px-3 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                    isActive ? 'text-purple-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Bar: Multi-Language Selector Dropdown & Contact Button */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Multi-Language Selector Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-white border border-slate-200/90 rounded-full shadow-2xs text-xs font-bold font-heading text-slate-700 hover:border-purple-300 hover:shadow-xs transition-all cursor-pointer"
                aria-expanded={langDropdownOpen}
                aria-label="Select Language"
              >
                <span className="text-sm leading-none">{currentLangObj.flag}</span>
                <span className="uppercase tracking-wider font-mono text-slate-900 font-bold">{currentLangObj.code}</span>
                <span className="hidden md:inline text-slate-500 font-normal text-[11px] max-w-[65px] truncate">
                  {currentLangObj.name}
                </span>
                <i
                  className={`bi bi-chevron-down text-[10px] text-slate-400 transition-transform duration-200 ${
                    langDropdownOpen ? 'rotate-180 text-purple-600' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 mt-2 w-72 sm:w-88 bg-white border border-slate-200 shadow-2xl rounded-2xl p-3 z-50 ring-1 ring-black/5 max-w-[calc(100vw-2rem)]"
                  >
                    {/* Dropdown Header */}
                    <div className="flex items-center justify-between px-2 pb-2.5 mb-2 border-b border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs font-bold font-heading text-slate-900">
                        <i className="bi bi-globe2 text-purple-600" />
                        <span>Select Language / भाषा</span>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                        {languagesList.length} languages
                      </span>
                    </div>

                    {/* 2-Column Language Grid */}
                    <div className="grid grid-cols-2 gap-1.5 max-h-[300px] overflow-y-auto custom-scrollbar p-0.5">
                      {languagesList.map((item) => {
                        const isSelected = lang === item.code;
                        return (
                          <button
                            key={item.code}
                            type="button"
                            onClick={() => {
                              setLang(item.code);
                              setLangDropdownOpen(false);
                            }}
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
                            <span
                              className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded shrink-0 ${
                                isSelected ? 'bg-purple-200 text-purple-800 font-bold' : 'text-slate-400 bg-slate-200/60'
                              }`}
                            >
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

            {/* Desktop Contact CTA Button */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 sm:px-4.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-white gradient-btn shadow-xs hover:shadow-purple-500/20 transition-all hover:-translate-y-0.5"
            >
              <i className="bi bi-send-fill text-xs" />
              <span>{t('nav.contactBtn')}</span>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setLangDropdownOpen(false);
              }}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <i className={`bi ${mobileMenuOpen ? 'bi-x-lg text-purple-600' : 'bi-list'} text-lg sm:text-xl`} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen / Solid Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Dimming Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40"
              aria-hidden="true"
            />

            {/* Solid Mobile Sheet Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed inset-x-0 top-[56px] sm:top-[64px] bottom-0 z-50 bg-white shadow-2xl flex flex-col justify-between overflow-y-auto border-t border-slate-200"
            >
              <div className="p-5 sm:p-6 space-y-5">
                {/* Navigation Links Grid */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1 font-heading">
                    Menu Navigation
                  </div>
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={(e) => scrollToSection(e, item.href)}
                        className={`flex items-center justify-between py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                          isActive
                            ? 'bg-purple-50 text-purple-700 font-bold border border-purple-200/80 shadow-2xs'
                            : 'text-slate-700 hover:bg-slate-50 border border-transparent active:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                              isActive ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <i className={`bi ${item.icon}`} />
                          </div>
                          <span className="text-base">{item.name}</span>
                        </div>
                        <i className={`bi bi-chevron-right text-xs ${isActive ? 'text-purple-600' : 'text-slate-300'}`} />
                      </a>
                    );
                  })}
                </div>

                {/* Integrated Mobile Language Selector */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between px-1 mb-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider font-heading">
                      <i className="bi bi-globe2 text-purple-600" />
                      <span>Language / भाषा ({languagesList.length})</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                      Active: {currentLangObj.flag} {currentLangObj.code.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-48 sm:max-h-56 overflow-y-auto custom-scrollbar p-1 bg-slate-50/80 rounded-2xl border border-slate-100">
                    {languagesList.map((item) => {
                      const isSelected = lang === item.code;
                      return (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => {
                            setLang(item.code);
                            setMobileMenuOpen(false);
                          }}
                          className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white text-purple-700 font-bold border-purple-300 shadow-xs'
                              : 'bg-white/60 border-slate-200/60 hover:bg-white text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="text-sm shrink-0">{item.flag}</span>
                            <span className="truncate text-slate-900">{item.name}</span>
                          </div>
                          <span
                            className={`text-[9px] uppercase font-mono px-1 py-0.2 rounded shrink-0 ${
                              isSelected ? 'bg-purple-100 text-purple-800 font-bold' : 'text-slate-400 bg-slate-100'
                            }`}
                          >
                            {item.code}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Contact & CV Bar */}
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="/yash_cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-xs shadow-xs hover:border-purple-300"
                  >
                    <i className="bi bi-file-earmark-pdf-fill text-red-500" />
                    <span>View CV (PDF)</span>
                  </a>
                  <a
                    href="/yash_cv.pdf"
                    download="Yash_Baviskar_CV.pdf"
                    className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl gradient-btn text-white font-bold text-xs shadow-xs"
                  >
                    <i className="bi bi-download" />
                    <span>Download CV</span>
                  </a>
                </div>

                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xs hover:bg-slate-800"
                >
                  <i className="bi bi-send-fill text-xs text-purple-400" />
                  <span>{t('nav.contactBtn')}</span>
                </a>

                <div className="flex items-center justify-center gap-4 text-xs font-medium text-slate-500 pt-1">
                  <a
                    href="mailto:yashbaviskar0215@outlook.com"
                    className="hover:text-purple-600 transition-colors flex items-center gap-1"
                  >
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
