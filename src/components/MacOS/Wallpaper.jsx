import React from 'react';

export const WALLPAPERS = {
  sonoma: {
    id: 'sonoma',
    name: 'macOS Sonoma Deep Blue',
    bgClass: 'from-[#030b1e] via-[#0b1c43] to-[#040e2b]',
  },
  monterey: {
    id: 'monterey',
    name: 'macOS Monterey Purple Waves',
    bgClass: 'from-[#12072b] via-[#240c4f] to-[#070b28]',
  },
  sequoia: {
    id: 'sequoia',
    name: 'macOS Sequoia Midnight',
    bgClass: 'from-[#020617] via-[#0f172a] to-[#090d16]',
  },
  aurora: {
    id: 'aurora',
    name: 'Northern Lights Glow',
    bgClass: 'from-[#031c26] via-[#0a2e38] to-[#041221]',
  },
};

export default function Wallpaper({ currentWallpaper = 'sonoma' }) {
  const wp = WALLPAPERS[currentWallpaper] || WALLPAPERS.sonoma;

  return (
    <div className={`fixed inset-0 w-full h-full bg-gradient-to-br ${wp.bgClass} overflow-hidden pointer-events-none z-0 transition-colors duration-1000`}>
      {/* High-Resolution SVG Sonoma Flowing Curves */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen select-none pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="sonomaGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="sonomaGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4338CA" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="sonomaGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="waveGold" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Ambient background waves */}
        <path
          d="M0,320 C320,180 580,480 960,340 C1340,200 1600,420 1920,280 L1920,1080 L0,1080 Z"
          fill="url(#sonomaGrad1)"
        />
        <path
          d="M0,480 C400,640 760,360 1140,520 C1520,680 1700,420 1920,560 L1920,1080 L0,1080 Z"
          fill="url(#sonomaGrad2)"
        />
        <path
          d="M0,680 C360,540 680,780 1080,620 C1480,460 1740,740 1920,680 L1920,1080 L0,1080 Z"
          fill="url(#sonomaGrad3)"
        />
        <path
          d="M0,200 C480,380 960,120 1440,320 C1680,420 1820,380 1920,340 L1920,1080 L0,1080 Z"
          fill="url(#waveGold)"
        />
      </svg>

      {/* Floating Dynamic Blur Light Orbs */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-blue-600/30 rounded-full blur-[140px] animate-sonoma-glow-1" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-indigo-600/25 rounded-full blur-[150px] animate-sonoma-glow-2" />
      <div className="absolute -bottom-48 left-1/4 w-[750px] h-[750px] bg-cyan-600/20 rounded-full blur-[160px] animate-sonoma-glow-1" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[130px]" />

      {/* Subtle Noise and Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25 pointer-events-none" />
    </div>
  );
}
