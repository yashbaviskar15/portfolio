import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function CookieBanner() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('portfolio_cookie_consent');
    if (!consent) {
      // Small delay so page loads smoothly first
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleReopen = () => {
      setIsVisible(true);
      setShowDetails(true);
    };
    window.addEventListener('open_cookie_banner', handleReopen);
    return () => window.removeEventListener('open_cookie_banner', handleReopen);
  }, []);

  const handleAccept = (type = 'all') => {
    localStorage.setItem('portfolio_cookie_consent', type);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          aria-label="Cookie and Privacy Notice"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-md bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-2xl rounded-2xl p-5 ring-1 ring-black/5 space-y-4"
        >
          {/* Header with Icon & Close */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg font-bold shrink-0">
                <i className="bi bi-shield-lock-fill" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-heading text-slate-900 leading-tight">
                  {t('cookies.title')}
                </h4>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {t('cookies.privacyBadge')}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleAccept('dismissed')}
              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs transition-colors shrink-0"
              aria-label="Close banner"
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>

          {/* Body Text */}
          <p className="text-xs text-slate-600 leading-relaxed">
            {t('cookies.message')}
          </p>

          {/* Collapsible Privacy Details */}
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 space-y-1.5"
            >
              <div className="font-bold text-slate-800 font-heading">Stored Preferences:</div>
              <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                <li><code className="text-purple-600 font-mono text-[10px] font-bold">portfolio_lang</code>: Active language selection</li>
                <li><code className="text-purple-600 font-mono text-[10px] font-bold">portfolio_cookie_consent</code>: Your privacy choice</li>
                <li>No third-party analytics trackers, advertising IDs, or telemetry</li>
              </ul>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs font-semibold text-purple-600 hover:text-purple-700 underline underline-offset-2 transition-colors py-1"
            >
              {showDetails ? 'Hide details' : t('cookies.privacyPolicy')}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleAccept('essential')}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
              >
                {t('cookies.essential')}
              </button>
              <button
                type="button"
                onClick={() => handleAccept('all')}
                className="px-3.5 py-1.5 rounded-xl text-white text-xs font-semibold gradient-btn shadow-xs hover:shadow-purple-500/20 transition-all hover:-translate-y-0.5"
              >
                {t('cookies.accept')}
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
