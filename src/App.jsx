import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import ScrollProgressBar from './components/ScrollProgressBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import SkeletonLoader from './components/SkeletonLoader';
import CursorFollower from './components/CursorFollower';
import BackToTop from './components/BackToTop';
import CookieBanner from './components/CookieBanner';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Restore visited section or scroll position after page reload and preloader completion
  useEffect(() => {
    if (!isLoading) {
      const restoreSection = () => {
        const hash = window.location.hash ? window.location.hash.replace('#', '') : null;
        const savedSection = hash || sessionStorage.getItem('yash_portfolio_active_section');
        const savedScrollY = sessionStorage.getItem('yash_portfolio_scroll_y');

        if (savedSection && savedSection !== 'home') {
          const element = document.getElementById(savedSection);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        }

        if (savedScrollY && Number(savedScrollY) > 80) {
          window.scrollTo({ top: Number(savedScrollY), behavior: 'smooth' });
        }
      };

      const timer = setTimeout(restoreSection, 150);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#F8FAF9] text-slate-900 font-sans relative selection:bg-purple-500 selection:text-white overflow-x-hidden">
        {/* Professional White Page Preloader */}
        <Preloader onComplete={() => setIsLoading(false)} />

        {/* Content with Smooth Entrance & Skeleton Backdrop */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SkeletonLoader />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <ScrollProgressBar />
              <CursorFollower />
              <BackToTop />
              <Navbar />
              <main>
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Contact />
              </main>
              <Footer />
              <CookieBanner />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LanguageProvider>
  );
}