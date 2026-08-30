import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Power, RotateCcw, Mail, Phone, Download, Globe, Sparkles, CheckCircle2, Terminal } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import { useGnomeStore } from '../../store/useGnomeStore';

interface ShutdownScreenProps {
  onRestart: () => void;
}

export const ShutdownScreen: React.FC<ShutdownScreenProps> = ({ onRestart }) => {
  const [isShuttingDown, setIsShuttingDown] = useState<boolean>(true);
  const [logIndex, setLogIndex] = useState<number>(0);
  const { accentColor } = useGnomeStore();

  const shutdownLogs = [
    '[  OK  ] Stopped Session 1 of user yash.',
    '[  OK  ] Stopped Target Graphical Interface.',
    '[  OK  ] Deactivated swap /swapfile.',
    '[  OK  ] Unmounted /home/yash cloud infrastructure & subnets.',
    '[  OK  ] Stopped User Manager for UID 1000.',
    '[  OK  ] Reached target System Power Off.',
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setLogIndex(1), 220);
    const timer2 = setTimeout(() => setLogIndex(2), 440);
    const timer3 = setTimeout(() => setLogIndex(3), 660);
    const timer4 = setTimeout(() => setLogIndex(4), 880);
    const timer5 = setTimeout(() => setLogIndex(5), 1100);
    const finishTimer = setTimeout(() => setIsShuttingDown(false), 1400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(finishTimer);
    };
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Yash_Baviskar_CV.pdf';
    link.download = 'YASH_BAVISKAR_CV.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-100 bg-[#08020d] text-white flex flex-col items-center justify-center p-6 select-none font-sans overflow-hidden">
      {isShuttingDown ? (
        /* Fast Linux Shutdown Terminal Log */
        <div className="w-full max-w-xl space-y-2 font-mono text-xs sm:text-sm text-neutral-300">
          <div className="flex items-center gap-2 text-orange-400 font-bold mb-4">
            <Power className="w-4 h-4 animate-pulse" />
            <span>Ubuntu Linux 24.04 LTS — Shutting Down...</span>
          </div>
          {shutdownLogs.slice(0, logIndex + 1).map((log, idx) => (
            <div key={idx} className="leading-relaxed">
              <span className="text-emerald-400 font-bold">[  OK  ]</span>
              <span className="ml-2 text-neutral-300">{log.replace('[  OK  ] ', '')}</span>
            </div>
          ))}
        </div>
      ) : (
        /* Thank You & System Halted Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="max-w-xl w-full p-8 sm:p-10 rounded-3xl bg-neutral-950/85 border border-white/15 shadow-2xl backdrop-blur-2xl text-center space-y-6"
        >
          {/* Header Badge */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center text-orange-500 shadow-lg">
              <Power className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>System Power Off • Session Completed</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-heading">
                Thank You for Visiting
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md mx-auto">
            Thank you for exploring my Linux GNOME workstation portfolio. I am currently open to <strong className="text-white">Cloud / DevOps Engineer</strong> roles. Let's connect.
          </p>

          {/* Quick Contact Badges */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
            <a
              href={`mailto:${portfolioData.contact.email}`}
              className="p-2.5 rounded-xl bg-neutral-900 border border-white/10 hover:border-orange-500 transition-colors flex items-center justify-center gap-2 text-neutral-300 hover:text-white cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span className="truncate">Email Yash</span>
            </a>
            <a
              href={`tel:${portfolioData.contact.phone.replace(/\s+/g, '')}`}
              className="p-2.5 rounded-xl bg-neutral-900 border border-white/10 hover:border-orange-500 transition-colors flex items-center justify-center gap-2 text-neutral-300 hover:text-white cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call / WhatsApp</span>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={onRestart}
              className="flex-1 py-3 px-4 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
              style={{ backgroundColor: accentColor }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Power On / Restart</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </button>
          </div>

          {/* Social Links Footer */}
          <div className="flex items-center justify-center gap-4 pt-2 border-t border-white/10 text-neutral-400 text-xs">
            <a
              href={portfolioData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 flex items-center gap-1.5 transition-colors font-mono"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 0-3.3 1.66 1.66 0 0 0 0 3.3m1.4 9.74V9.97H5.06v8.53h2.8z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <span>•</span>
            <a
              href={portfolioData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1.5 transition-colors font-mono"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
              <span>GitHub</span>
            </a>
            <span>•</span>
            <a
              href={portfolioData.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 flex items-center gap-1.5 transition-colors font-mono"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Website</span>
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};
