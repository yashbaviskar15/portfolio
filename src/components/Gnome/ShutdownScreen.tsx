import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Power, RotateCcw, Mail, Phone, Download, Globe, Sparkles, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';

interface ShutdownScreenProps {
  onRestart: () => void;
  isSuspended?: boolean;
  onWake?: () => void;
}

export const ShutdownScreen: React.FC<ShutdownScreenProps> = ({
  onRestart,
  isSuspended = false,
  onWake,
}) => {
  const [isShuttingDown, setIsShuttingDown] = useState<boolean>(!isSuspended);
  const [logIndex, setLogIndex] = useState<number>(0);

  const shutdownLogs = [
    'Stopped Session 1 of user yash.',
    'Stopped Target Graphical Interface.',
    'Deactivated swap /swapfile.',
    'Unmounted /home/yash cloud infrastructure & subnets.',
    'Stopped User Manager for UID 1000.',
    'Reached target System Power Off.',
  ];

  useEffect(() => {
    if (isSuspended) return;

    const timer1 = setTimeout(() => setLogIndex(1), 150);
    const timer2 = setTimeout(() => setLogIndex(2), 300);
    const timer3 = setTimeout(() => setLogIndex(3), 450);
    const timer4 = setTimeout(() => setLogIndex(4), 600);
    const timer5 = setTimeout(() => setLogIndex(5), 750);
    const finishTimer = setTimeout(() => setIsShuttingDown(false), 950);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(finishTimer);
    };
  }, [isSuspended]);

  if (isSuspended) {
    return (
      <div
        onClick={onWake}
        className="fixed inset-0 z-[250] bg-black cursor-pointer flex items-center justify-center select-none"
      >
        <div className="text-center space-y-2 text-neutral-800 hover:text-neutral-500 transition-colors">
          <div className="w-4 h-4 rounded-full bg-orange-600/30 animate-pulse mx-auto" />
          <p className="text-xs font-mono">System Suspended — Click anywhere or press any key to wake</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[250] bg-black text-white flex flex-col items-center justify-center p-6 select-none font-sans overflow-hidden">
      {isShuttingDown ? (
        /* Fast Linux Shutdown Terminal Log */
        <div className="w-full max-w-xl space-y-2 font-mono text-xs text-neutral-300">
          <div className="flex items-center gap-2 text-orange-400 font-bold mb-4">
            <Power className="w-4 h-4 animate-pulse" />
            <span>YashOS 24.04 LTS — Shutting Down...</span>
          </div>
          {shutdownLogs.slice(0, logIndex + 1).map((log, idx) => (
            <div key={idx} className="leading-relaxed">
              <span className="text-emerald-400 font-bold">[  OK  ]</span>
              <span className="ml-2 text-neutral-300">{log}</span>
            </div>
          ))}
        </div>
      ) : (
        /* Powered Off Screen with Center Power On Button */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center gap-8 text-center"
        >
          {/* Glowing Power On Button */}
          <button
            type="button"
            onClick={onRestart}
            className="group relative flex flex-col items-center gap-3 cursor-pointer"
          >
            <div className="w-24 h-24 rounded-full bg-neutral-900 border-2 border-neutral-700 group-hover:border-orange-500 flex items-center justify-center text-neutral-400 group-hover:text-orange-400 group-hover:shadow-[0_0_50px_rgba(233,84,32,0.6)] transition-all duration-300">
              <Power className="w-10 h-10 group-hover:scale-110 transition-transform" />
            </div>
            <div className="space-y-1">
              <span className="text-sm font-bold text-neutral-300 group-hover:text-white transition-colors">
                Press to Power On
              </span>
              <p className="text-[11px] text-neutral-500 font-mono">
                Reboots YashOS 24.04 LTS Workstation
              </p>
            </div>
          </button>

          {/* Quick Contact & CV Links */}
          <div className="pt-6 border-t border-neutral-800 max-w-md w-full space-y-3">
            <p className="text-xs text-neutral-400">
              Need to contact Yash directly?
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs font-mono">
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{portfolioData.contact.email}</span>
              </a>
              <a
                href="/YASH_BAVISKAR_CV.pdf"
                download="YASH_BAVISKAR_CV.pdf"
                className="px-3 py-1.5 rounded-lg bg-orange-600/30 hover:bg-orange-600/50 border border-orange-500/40 text-orange-300 flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
