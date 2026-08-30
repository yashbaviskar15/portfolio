import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bootContainerVariants, bootLogoVariants } from '../../lib/animations';

interface BootScreenProps {
  onBootComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [bootStep, setBootStep] = useState<number>(0);

  const bootLogs = [
    '[  OK  ] Started Linux Kernel 6.8.0-generic x86_64',
    '[  OK  ] Mounted AWS Infrastructure Mesh & VPC Subnets',
    '[  OK  ] Initialized Terraform & Docker Runtime',
    '[  OK  ] Starting Ubuntu GNOME 24.04 Display Manager...',
  ];

  useEffect(() => {
    // Check if user already booted this session
    const hasSeenBoot = sessionStorage.getItem('yash_ubuntu_booted');
    if (hasSeenBoot) {
      onBootComplete();
      return;
    }

    const logTimer1 = setTimeout(() => setBootStep(1), 350);
    const logTimer2 = setTimeout(() => setBootStep(2), 750);
    const logTimer3 = setTimeout(() => setBootStep(3), 1150);

    const finishTimer = setTimeout(() => {
      sessionStorage.setItem('yash_ubuntu_booted', 'true');
      onBootComplete();
    }, 1850);

    const handleSkip = () => {
      sessionStorage.setItem('yash_ubuntu_booted', 'true');
      onBootComplete();
    };

    window.addEventListener('keydown', handleSkip);
    return () => {
      clearTimeout(logTimer1);
      clearTimeout(logTimer2);
      clearTimeout(logTimer3);
      clearTimeout(finishTimer);
      window.removeEventListener('keydown', handleSkip);
    };
  }, [onBootComplete]);

  const handleSkipClick = () => {
    sessionStorage.setItem('yash_ubuntu_booted', 'true');
    onBootComplete();
  };

  return (
    <motion.div
      variants={bootContainerVariants}
      initial="initial"
      exit="exit"
      onClick={handleSkipClick}
      className="fixed inset-0 z-100 bg-[#0c0312] text-white flex flex-col items-center justify-between py-12 px-6 select-none cursor-pointer font-sans"
    >
      {/* Top Space */}
      <div className="h-10" />

      {/* Center: Pulsing Noble Numbat Geometric Logo */}
      <div className="flex flex-col items-center gap-6 text-center">
        <motion.div
          variants={bootLogoVariants}
          initial="initial"
          animate="animate"
          className="relative flex items-center justify-center"
        >
          {/* Geometric Ubuntu Rings */}
          <div className="w-24 h-24 rounded-full border-2 border-orange-500/40 animate-ping absolute" />
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-600 via-purple-700 to-amber-500 p-0.5 shadow-[0_0_40px_rgba(233,84,32,0.5)]">
            <div className="w-full h-full bg-[#0c0312] rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3v18" />
                <path d="M3 12h18" />
                <circle cx="12" cy="12" r="4" fill="#e95420" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-wider text-white font-mono">
            UBUNTU 24.04 LTS
          </h1>
          <p className="text-xs text-orange-400 font-mono">
            Yash Baviskar • Cloud Workstation
          </p>
        </div>

        {/* 3-Dot Ubuntu Pulse */}
        <div className="flex items-center gap-2 pt-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      {/* Bottom: Fast Boot Logs & Skip Hint */}
      <div className="w-full max-w-md space-y-2 text-center font-mono">
        <div className="text-[11px] text-neutral-400 h-5 truncate transition-all">
          {bootLogs[bootStep] || bootLogs[bootLogs.length - 1]}
        </div>
        <div className="text-[10px] text-neutral-600">
          Click anywhere or press any key to skip boot
        </div>
      </div>
    </motion.div>
  );
};
