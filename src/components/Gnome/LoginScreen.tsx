import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Power, Sparkles, Wifi, Battery, Volume2, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import { Tooltip } from './Tooltip';

interface LoginScreenProps {
  onLogin: () => void;
  onOpenRecruiterView: () => void;
  onShutdown: () => void;
  onRestart: () => void;
  onSuspend: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onOpenRecruiterView,
  onShutdown,
  onRestart,
  onSuspend,
}) => {
  const [password, setPassword] = useState('');
  const [showPowerMenu, setShowPowerMenu] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="fixed inset-0 z-[150] bg-[#110519] text-white flex flex-col justify-between p-4 sm:p-8 select-none font-sans overflow-hidden">
      {/* Top Bar GDM Status Area */}
      <div className="flex items-center justify-between z-10">
        <div className="text-xs text-neutral-400 font-mono flex items-center gap-2">
          <span>YashOS 24.04 LTS</span>
          <span className="text-neutral-600">•</span>
          <span>GDM 46.0</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenRecruiterView}
            className="px-3 py-1.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recruiter Fast Track</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <Volume2 className="w-3.5 h-3.5" />
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
          </div>

          <div className="relative">
            <Tooltip content="Power options" side="bottom">
              <button
                type="button"
                onClick={() => setShowPowerMenu(!showPowerMenu)}
                className="p-2 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <Power className="w-4 h-4 text-orange-400" />
              </button>
            </Tooltip>

            {showPowerMenu && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#1e1e24] border border-white/15 shadow-2xl p-1.5 z-50 text-xs font-sans">
                <button
                  type="button"
                  onClick={onSuspend}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/10 text-neutral-200 transition-colors"
                >
                  Suspend
                </button>
                <button
                  type="button"
                  onClick={onRestart}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/10 text-neutral-200 transition-colors"
                >
                  Restart...
                </button>
                <button
                  type="button"
                  onClick={onShutdown}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-500/20 text-rose-400 font-semibold transition-colors"
                >
                  Power Off...
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Center User Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-sm mx-auto flex flex-col items-center gap-4 text-center my-auto"
      >
        {/* User Avatar */}
        <div className="relative">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-orange-500/40 p-1 bg-gradient-to-tr from-orange-600 to-purple-600 shadow-[0_10px_35px_rgba(233,84,32,0.4)]">
            <img
              src="/profile.jpg"
              alt="Yash Baviskar"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                // Fallback to stylized SVG placeholder if image missing
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="absolute bottom-1 right-1 p-1 rounded-full bg-emerald-500 text-white shadow-md">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* User Identity */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight font-heading">
            {portfolioData.developer.name}
          </h1>
          <p className="text-xs font-mono text-orange-400 font-semibold">
            {portfolioData.developer.role}
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-2 pt-2">
          <div className="relative flex items-center">
            <input
              type="password"
              placeholder="Password (press Enter)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-neutral-400 text-xs focus:outline-none focus:border-orange-500 focus:bg-white/15 transition-all text-center"
            />
            <Tooltip content="Log In" shortcut="Enter" side="top">
              <button
                type="submit"
                className="absolute right-1.5 p-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </Tooltip>
          </div>
          <p className="text-[11px] text-neutral-400 font-mono">
            Hint: No password required — press <kbd className="px-1 py-0.5 rounded bg-white/10 text-neutral-300">Enter</kbd> or click arrow
          </p>
        </form>
      </motion.div>

      {/* Bottom Footer */}
      <div className="text-center text-[11.5px] text-neutral-500 font-mono">
        Ubuntu Yaru Desktop • Cloud Support Engineer Portfolio Edition
      </div>
    </div>
  );
};
