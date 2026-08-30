import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopMenuBar({ onOpenWindow, onToggleControlCenter, onToggleSpotlight, activeWindow }) {
  const [dateTime, setDateTime] = useState('');
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const [wifiTooltip, setWifiTooltip] = useState(false);
  const [batteryTooltip, setBatteryTooltip] = useState(false);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      // Format as "Sun Aug 30  10:28 AM"
      const formatted = now.toLocaleString('en-US', options).replace(/,/g, '');
      setDateTime(formatted);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navMenuItems = [
    { label: 'Expertise', windowId: 'skills', icon: 'bi-tools' },
    { label: 'Experience', windowId: 'experience', icon: 'bi-mortarboard' },
    { label: 'Projects', windowId: 'projects', icon: 'bi-folder' },
    { label: 'Certifications', windowId: 'certifications', icon: 'bi-patch-check' },
    { label: 'Contact', windowId: 'contact', icon: 'bi-envelope' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-7 text-[13px] glass-menubar select-none z-50 flex items-center justify-between px-3 text-white/90 font-medium">
      {/* Left side: Logo + Brand + Menu Items */}
      <div className="flex items-center gap-1 sm:gap-1.5 h-full">
        {/* Apple / Yash Logo Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setAppleMenuOpen(!appleMenuOpen)}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-white/15 active:bg-white/20 transition-colors cursor-pointer text-white font-bold"
            title="System Menu"
          >
            <i className="bi bi-apple text-[14px]" />
            <span className="font-extrabold tracking-tight font-heading text-[13px]">yash.</span>
          </button>

          <AnimatePresence>
            {appleMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setAppleMenuOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-7 w-56 rounded-xl glass-window py-1.5 px-1 shadow-2xl z-50 text-xs border border-white/20 backdrop-blur-2xl"
                >
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <p className="font-bold text-white text-sm font-heading">Yash Baviskar</p>
                    <p className="text-[11px] text-white/60">Junior Cloud Engineer</p>
                    <p className="text-[10px] text-emerald-400 font-mono mt-0.5">macOS Sonoma 14.6 (Cloud Edition)</p>
                  </div>

                  <button
                    onClick={() => {
                      onOpenWindow('skills');
                      setAppleMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600/60 hover:text-white transition-colors flex items-center justify-between text-white/80"
                  >
                    <span>About This Portfolio</span>
                    <i className="bi bi-info-circle text-[11px]" />
                  </button>

                  <button
                    onClick={() => {
                      onOpenWindow('terminal');
                      setAppleMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600/60 hover:text-white transition-colors flex items-center justify-between text-white/80"
                  >
                    <span>Open Cloud Terminal</span>
                    <span className="text-[10px] font-mono opacity-60">⌘T</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenWindow('resume');
                      setAppleMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600/60 hover:text-white transition-colors flex items-center justify-between text-white/80"
                  >
                    <span>View Resume (PDF)</span>
                    <i className="bi bi-file-earmark-pdf text-[11px]" />
                  </button>

                  <div className="my-1 border-t border-white/10" />

                  <button
                    onClick={() => {
                      onToggleControlCenter();
                      setAppleMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-600/60 hover:text-white transition-colors flex items-center justify-between text-white/80"
                  >
                    <span>System Settings...</span>
                    <i className="bi bi-sliders text-[11px]" />
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Textual Navigation Menu */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navMenuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onOpenWindow(item.windowId)}
              className={`px-2.5 py-0.5 rounded text-[12.5px] transition-colors cursor-pointer ${
                activeWindow === item.windowId
                  ? 'bg-white/20 text-white font-semibold'
                  : 'hover:bg-white/12 text-white/90'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Right side: Status Indicators + Live Clock */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Wi-Fi Status */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setWifiTooltip(!wifiTooltip)}
            onMouseEnter={() => setWifiTooltip(true)}
            onMouseLeave={() => setWifiTooltip(false)}
            className="p-1 rounded hover:bg-white/15 transition-colors cursor-pointer text-white/90"
            title="Wi-Fi"
          >
            <i className="bi bi-wifi text-[13px]" />
          </button>
          {wifiTooltip && (
            <div className="absolute right-0 top-7 w-48 p-2 rounded-xl glass-window text-[11px] text-white/90 shadow-xl border border-white/20 z-50 pointer-events-none">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-white">AWS Cloud Mesh 5G</span>
              </div>
              <p className="text-[10px] text-white/60">IP: 192.168.1.15 • Latency: 12ms</p>
            </div>
          )}
        </div>

        {/* Battery Status */}
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={() => setBatteryTooltip(!batteryTooltip)}
            onMouseEnter={() => setBatteryTooltip(true)}
            onMouseLeave={() => setBatteryTooltip(false)}
            className="flex items-center gap-1 px-1 py-0.5 rounded hover:bg-white/15 transition-colors cursor-pointer text-[12px] text-white/90"
            title="Battery"
          >
            <span className="text-[11px] font-mono">100%</span>
            <i className="bi bi-battery-full text-[14px] text-emerald-400" />
          </button>
          {batteryTooltip && (
            <div className="absolute right-0 top-7 w-44 p-2 rounded-xl glass-window text-[11px] text-white/90 shadow-xl border border-white/20 z-50 pointer-events-none">
              <div className="font-semibold text-white">Power Source: Power Adapter</div>
              <p className="text-[10px] text-white/60">Battery is Charged (100%)</p>
            </div>
          )}
        </div>

        {/* Spotlight Search Icon */}
        <button
          type="button"
          onClick={onToggleSpotlight}
          className="p-1 rounded hover:bg-white/15 transition-colors cursor-pointer text-white/90"
          title="Spotlight Search (⌘K)"
        >
          <i className="bi bi-search text-[12px]" />
        </button>

        {/* Control Center Toggle */}
        <button
          type="button"
          onClick={onToggleControlCenter}
          className="p-1 rounded hover:bg-white/15 transition-colors cursor-pointer text-white/90"
          title="Control Center"
        >
          <i className="bi bi-sliders text-[13px]" />
        </button>

        {/* Live Date & Time Readout */}
        <div className="pl-1 text-[12px] font-medium tracking-tight text-white/95 cursor-default select-none">
          {dateTime || 'Sun Aug 30 10:28 AM'}
        </div>
      </div>
    </header>
  );
}
