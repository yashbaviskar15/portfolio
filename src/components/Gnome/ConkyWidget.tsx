import React, { useState, useEffect } from 'react';
import {
  Server,
  Activity,
  Terminal,
  Folder,
  FileText,
  ChevronRight,
  ChevronLeft,
  Laptop,
  HardDrive,
  Cpu,
  Clock,
  Wifi,
  Radio,
} from 'lucide-react';
import { WindowId } from '../../types/gnome';
import { useNetworkDevice } from '../../hooks/useNetworkDevice';
import { useGnomeStore } from '../../store/useGnomeStore';

interface ConkyWidgetProps {
  onOpenApp: (appId: WindowId) => void;
}

export const ConkyWidget: React.FC<ConkyWidgetProps> = ({ onOpenApp }) => {
  const network = useNetworkDevice();
  const { windows } = useGnomeStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [fps, setFps] = useState<number>(60);
  const [uptimeSeconds, setUptimeSeconds] = useState<number>(0);
  const [storageInfo, setStorageInfo] = useState<string>('Reading...');

  const cpuCores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
  const deviceMem =
    typeof navigator !== 'undefined' && (navigator as any).deviceMemory
      ? `${(navigator as any).deviceMemory} GB`
      : 'Unavailable in browser';

  const jsHeap = (() => {
    if (typeof performance !== 'undefined' && (performance as any).memory) {
      const mem = (performance as any).memory;
      return `${(mem.usedJSHeapSize / (1024 * 1024)).toFixed(1)} MB (Heap)`;
    }
    return 'Unavailable in browser';
  })();

  // 1. Session Uptime Tracker
  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Storage Estimation (Real browser Storage API)
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.storage?.estimate) {
      navigator.storage
        .estimate()
        .then((est) => {
          const used = est.usage ? (est.usage / (1024 * 1024)).toFixed(1) : '0';
          const quota = est.quota ? (est.quota / (1024 * 1024 * 1024)).toFixed(1) : '1.0';
          setStorageInfo(`${used} MB / ${quota} GB (VFS/Cache)`);
        })
        .catch(() => setStorageInfo('Unavailable in browser'));
    } else {
      setStorageInfo('Unavailable in browser');
    }
  }, []);

  // 3. Real Client FPS Meter via requestAnimationFrame
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calculateFps = (currentTime: number) => {
      frameCount++;
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      animId = requestAnimationFrame(calculateFps);
    };

    animId = requestAnimationFrame(calculateFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  const formatUptime = (total: number) => {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${h}h ${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const openWindowsCount = windows.filter((w) => w.isOpen && !w.isMinimized).length;

  return (
    <aside
      className="hidden lg:flex flex-col gap-2 absolute top-12 right-6 z-10 select-none font-mono text-[11px] text-neutral-300 pointer-events-auto transition-all"
      aria-label="System Monitor Widget"
    >
      {isCollapsed ? (
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="p-2 rounded-xl bg-[#121214]/90 border border-white/10 backdrop-blur-md shadow-lg text-orange-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Expand System Telemetry Widget"
        >
          <Activity className="w-4 h-4 text-orange-400" />
          <span className="text-[10px] font-bold">SYSTEM TELEMETRY</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      ) : (
        <div className="w-76 p-3.5 rounded-xl bg-[#121214]/90 border border-white/10 backdrop-blur-md shadow-xl space-y-2.5 relative">
          {/* Header / Hostname + Collapse Button */}
          <div className="border-b border-white/10 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-bold text-white tracking-wide text-[11px]">YASH@PORTFOLIO</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                {fps} FPS
              </span>
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer"
                title="Collapse widget"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick System Status & Uptime */}
          <div className="p-2 rounded-lg bg-black/40 border border-white/5 space-y-1 text-[10px]">
            <div className="flex justify-between items-center text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-orange-400" />
                <span>Session Uptime:</span>
              </span>
              <span className="text-white font-bold">{formatUptime(uptimeSeconds)}</span>
            </div>
            <div className="flex justify-between items-center text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-emerald-400" />
                <span>Active GUI Tasks:</span>
              </span>
              <span className="text-emerald-400 font-semibold">{openWindowsCount} active window{openWindowsCount === 1 ? '' : 's'}</span>
            </div>
          </div>

          {/* Device Panel (Real Browser Info with honest fallbacks) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-neutral-400 text-[10px] uppercase font-bold tracking-wider">
              <span className="flex items-center gap-1.5">
                <Laptop className="w-3 h-3 text-sky-400" />
                <span>Device Telemetry (from browser)</span>
              </span>
            </div>
            <div className="p-2 rounded-lg bg-black/40 border border-white/5 space-y-1 text-[10px]">
              <div className="flex justify-between text-neutral-400">
                <span className="flex items-center gap-1">
                  <Cpu className="w-2.5 h-2.5 text-neutral-500" />
                  <span>CPU Threads:</span>
                </span>
                <span className="text-neutral-200 font-semibold">{cpuCores} logical cores</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>CPU Load %:</span>
                <span className="text-neutral-500 italic">Unavailable in browser</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Device Memory (RAM):</span>
                <span className="text-neutral-200 font-semibold">{deviceMem}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Active JS Heap:</span>
                <span className="text-neutral-200 font-semibold">{jsHeap}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span className="flex items-center gap-1">
                  <HardDrive className="w-2.5 h-2.5 text-neutral-500" />
                  <span>Storage (Origin):</span>
                </span>
                <span className="text-neutral-200 font-semibold truncate max-w-[130px]">{storageInfo}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span className="flex items-center gap-1">
                  <Wifi className="w-2.5 h-2.5 text-neutral-500" />
                  <span>Network:</span>
                </span>
                <span className="text-emerald-400 font-semibold">{network.networkName}</span>
              </div>
              {network.rtt && (
                <div className="flex justify-between text-neutral-400">
                  <span>RTT Latency:</span>
                  <span className="text-neutral-200 font-semibold">{network.rtt} ms</span>
                </div>
              )}
            </div>
          </div>

          {/* Cloud Lab Project Telemetry (Explicitly Labeled) */}
          <div className="space-y-1 pt-1 border-t border-white/10">
            <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Server className="w-3 h-3 text-purple-400" />
                <span>Lab Project Telemetry</span>
              </span>
              <span className="text-neutral-500 font-mono text-[9px]">Sample</span>
            </div>
            <div className="p-2 rounded-lg bg-black/40 border border-white/5 space-y-1 text-[10px] text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-400">Project:</span>
                <span className="text-orange-400 font-semibold">cloud-monitoring</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">IaC Provisioner:</span>
                <span className="text-neutral-200 font-semibold">Terraform (AWS)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Prometheus:</span>
                <span className="text-cyan-400 font-semibold">Host &amp; Container Exporters</span>
              </div>
            </div>
          </div>

          {/* Quick Launcher Actions */}
          <div className="pt-1.5 border-t border-white/10 flex items-center justify-between gap-1.5">
            <button
              type="button"
              onClick={() => onOpenApp('terminal')}
              className="flex-1 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 text-white text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer border border-white/10 active:scale-95"
            >
              <Terminal className="w-3 h-3 text-emerald-400" />
              <span>Terminal</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenApp('projects')}
              className="flex-1 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 text-white text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer border border-white/10 active:scale-95"
            >
              <Folder className="w-3 h-3 text-amber-400" />
              <span>Projects</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenApp('resume')}
              className="flex-1 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 text-white text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer border border-white/10 active:scale-95"
            >
              <FileText className="w-3 h-3 text-sky-400" />
              <span>CV</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
