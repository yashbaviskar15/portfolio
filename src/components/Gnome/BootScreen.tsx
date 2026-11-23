import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Shield, ArrowRight, Play, Power, CheckCircle2 } from 'lucide-react';
import { BootStage } from '../../types/gnome';
import { useGnomeStore } from '../../store/useGnomeStore';

interface BootScreenProps {
  onBootComplete: () => void;
  onOpenRecruiterView: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete, onOpenRecruiterView }) => {
  const [stage, setStage] = useState<BootStage>('bios');
  const [grubIndex, setGrubIndex] = useState<number>(0);
  const [grubTimer, setGrubTimer] = useState<number>(3);
  const [systemdLogIndex, setSystemdLogIndex] = useState<number>(0);
  const { setRecruiterViewOpen } = useGnomeStore();

  const grubOptions = [
    'YashOS 24.04 LTS (Portfolio Edition) - Linux 6.8.0-generic',
    'Advanced options for YashOS',
    'Executive Recruiter Mode (Skip boot & open instant ATS summary)',
  ];

  const systemdLogs = [
    'Started Linux Kernel 6.8.0-45-generic x86_64',
    'Mounted Root Virtual Filesystem (VFS) with /home/yash single source of truth',
    'Reached target Local Encrypted Storage & S3 State Locks',
    'Started Docker Application Container Engine (dockerd 26.0.1)',
    'Started containerd container runtime engine',
    'Reached target Documented Multi-AZ AWS Architecture (Terraform validated)',
    'Initialized Kubernetes (k3s) Node & CoreDNS mesh',
    'Started Prometheus Telemetry Node Exporter (port 9100)',
    'Started Grafana Observability Dashboard Service (port 3000)',
    'Reached target Network Time & AWS CloudWatch Daemon',
    'Started OpenSSH Server (sshd - ED25519 cloud access)',
    'Reached target Multi-AZ Architecture Documentation & Lab Environment',
    'Starting GNOME Display Manager (GDM 46.0)...',
  ];

  // 1. BIOS Stage -> GRUB
  useEffect(() => {
    // Check if user already completed boot in this session
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        if (window.sessionStorage.getItem('yashos_boot_done')) {
          onBootComplete();
          return;
        }
      }
    } catch {}

    if (stage === 'bios') {
      const biosTimer = setTimeout(() => {
        setStage('grub');
      }, 1200);
      return () => clearTimeout(biosTimer);
    }
  }, [stage, onBootComplete]);

  // 2. GRUB Stage Countdown
  useEffect(() => {
    if (stage !== 'grub') return;

    const timer = setInterval(() => {
      setGrubTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          proceedFromGrub(grubIndex);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setGrubIndex((prev) => (prev > 0 ? prev - 1 : grubOptions.length - 1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setGrubIndex((prev) => (prev < grubOptions.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        clearInterval(timer);
        proceedFromGrub(grubIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [stage, grubIndex]);

  const proceedFromGrub = (idx: number) => {
    if (idx === 2) {
      // Recruiter option
      try {
        window.sessionStorage.setItem('yashos_boot_done', 'true');
      } catch {}
      onBootComplete();
      onOpenRecruiterView();
      return;
    }
    setStage('systemd');
  };

  // 3. Systemd Scrolling Logs
  useEffect(() => {
    if (stage !== 'systemd') return;

    const interval = setInterval(() => {
      setSystemdLogIndex((prev) => {
        if (prev >= systemdLogs.length - 1) {
          clearInterval(interval);
          setTimeout(() => setStage('plymouth'), 300);
          return prev;
        }
        return prev + 1;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [stage]);

  // 4. Plymouth Splash
  useEffect(() => {
    if (stage !== 'plymouth') return;

    const plymouthTimer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.setItem('yashos_boot_done', 'true');
        }
      } catch {}
      onBootComplete();
    }, 1500);

    return () => clearTimeout(plymouthTimer);
  }, [stage, onBootComplete]);

  const handleSkipAll = () => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem('yashos_boot_done', 'true');
      }
    } catch {}
    onBootComplete();
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black text-white font-mono select-none flex flex-col justify-between p-4 sm:p-8 overflow-hidden">
      {/* Top Bar: Always Visible Skip Button */}
      <div className="flex items-center justify-between z-10">
        <div className="text-[11px] text-neutral-500">
          YashOS 24.04 LTS UEFI v2.8 (Cloud Workstation)
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              handleSkipAll();
              onOpenRecruiterView();
            }}
            className="px-3 py-1 rounded bg-orange-600/30 hover:bg-orange-600/50 text-orange-300 border border-orange-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recruiter Fast Track</span>
          </button>

          <button
            type="button"
            onClick={handleSkipAll}
            className="px-3 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Skip Boot (Esc)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Stage Content */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto">
        {/* Stage 1: BIOS / UEFI POST */}
        {stage === 'bios' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-2xl space-y-4 text-xs font-mono text-neutral-300"
          >
            <div className="flex items-center gap-3 border-b border-white/20 pb-3">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-orange-600 to-purple-600 flex items-center justify-center font-bold text-white text-sm">
                Y
              </div>
              <div>
                <h1 className="text-sm font-bold text-white">YashOS UEFI BIOS POST</h1>
                <p className="text-[11px] text-neutral-400">Release Date: 04/24/2026 • Core v6.8.0</p>
              </div>
            </div>

            <div className="space-y-1 text-[11.5px] leading-relaxed">
              <p>CPU: Cloud Virtual Octa-Core Processor @ 3.40 GHz</p>
              <p>Memory Test: <span className="text-emerald-400">16384 MB OK</span></p>
              <p>Storage: NVMe 512GB (AWS Architecture / Docker / Terraform Workspace) — <span className="text-emerald-400">HEALTHY</span></p>
              <p>Network: eth0 10.0.1.42 (AWS Multi-AZ VPC Gateway) — <span className="text-emerald-400">CONNECTED</span></p>
            </div>

            <div className="pt-4 text-neutral-500 text-[11px]">
              Press <span className="text-white font-bold">&lt;DEL&gt;</span> to enter Setup, <span className="text-white font-bold">&lt;F12&gt;</span> for Boot Menu...
            </div>
          </motion.div>
        )}

        {/* Stage 2: GRUB 2.06 Menu */}
        {stage === 'grub' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-2xl space-y-6"
          >
            <div className="text-center space-y-1">
              <h2 className="text-sm font-bold text-neutral-200">GNU GRUB  version 2.06</h2>
              <p className="text-xs text-neutral-400">Select an operating system environment to load</p>
            </div>

            <div className="border border-neutral-700 bg-neutral-950 p-2 rounded space-y-1">
              {grubOptions.map((opt, idx) => {
                const isSelected = grubIndex === idx;
                return (
                  <div
                    key={opt}
                    onClick={() => {
                      setGrubIndex(idx);
                      proceedFromGrub(idx);
                    }}
                    className={`px-3 py-2 rounded text-xs transition-colors cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-neutral-200 text-black font-bold'
                        : 'text-neutral-300 hover:bg-neutral-900'
                    }`}
                  >
                    <span>{isSelected ? `* ${opt}` : `  ${opt}`}</span>
                    {idx === 2 && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        isSelected ? 'bg-orange-600 text-white' : 'bg-orange-600/30 text-orange-300'
                      }`}>
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center text-xs text-neutral-400 space-y-1">
              <p>Use the <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-white/10 text-white">&uarr;</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-white/10 text-white">&darr;</kbd> keys to select which entry is highlighted.</p>
              <p>Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-white/10 text-white">Enter</kbd> to boot the selected OS.</p>
              <p className="text-orange-400 font-bold pt-1">The highlighted entry will be executed automatically in {grubTimer}s.</p>
            </div>
          </motion.div>
        )}

        {/* Stage 3: Systemd Scrolling Boot Logs */}
        {stage === 'systemd' && (
          <div className="w-full max-w-2xl space-y-1 text-xs">
            {systemdLogs.slice(0, systemdLogIndex + 1).map((log, idx) => (
              <div key={idx} className="flex items-center gap-2 leading-tight">
                <span className="text-emerald-400 font-bold">[  OK  ]</span>
                <span className="text-neutral-200">{log}</span>
              </div>
            ))}
          </div>
        )}

        {/* Stage 4: Plymouth Splash */}
        {stage === 'plymouth' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-2 border-orange-500/30 animate-ping absolute" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-600 via-purple-700 to-amber-500 p-1 shadow-[0_0_50px_rgba(233,84,32,0.6)]">
                <div className="w-full h-full bg-[#0c0312] rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-3 border-orange-500 border-t-transparent animate-spin" />
                </div>
              </div>
            </div>

            <div className="space-y-1 font-sans">
              <h1 className="text-2xl font-extrabold tracking-wider text-white font-heading">
                YashOS 24.04 LTS
              </h1>
              <p className="text-xs text-orange-400 font-mono">
                Yash Baviskar • Cloud Support Engineer
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="text-center text-[11px] text-neutral-600">
        YashOS 24.04 LTS (Noble Numbat) • Engineered by Yash Baviskar
      </div>
    </div>
  );
};
