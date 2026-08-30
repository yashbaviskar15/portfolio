import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, Wifi, Server, Activity, ShieldCheck, Terminal, Folder, FileText } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import { WindowId } from '../../types/gnome';
import { useNetworkDevice } from '../../hooks/useNetworkDevice';

interface ConkyWidgetProps {
  onOpenApp: (appId: WindowId) => void;
}

export const ConkyWidget: React.FC<ConkyWidgetProps> = ({ onOpenApp }) => {
  const network = useNetworkDevice();
  const [cpuUsage, setCpuUsage] = useState<number[]>([18, 12, 25, 8]);
  const [memUsage, setMemUsage] = useState<number>(27.2);
  const [ping, setPing] = useState<number>(12);

  // Subtle real-time jitter for authentic Linux telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsage([
        Math.floor(12 + Math.random() * 15),
        Math.floor(8 + Math.random() * 12),
        Math.floor(18 + Math.random() * 18),
        Math.floor(5 + Math.random() * 10),
      ]);
      setPing(Math.floor(11 + Math.random() * 4));
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <aside
      className="hidden lg:flex flex-col gap-3 absolute top-12 right-6 w-80 z-10 select-none font-mono text-[11px] text-neutral-300 pointer-events-auto"
      aria-label="Linux Conky System Monitor"
    >
      {/* Conky Main Panel */}
      <div className="p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl shadow-2xl space-y-3">
        {/* Header / Hostname */}
        <div className="border-b border-white/10 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-bold text-white tracking-wide">YASH@UBUNTU-NODE</span>
          </div>
          <span className="text-[10px] text-orange-400 font-bold bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">
            {network.devicePlatform}
          </span>
        </div>

        {/* System & Kernel Meta */}
        <div className="space-y-1 text-[10.5px]">
          <div className="flex justify-between text-neutral-400">
            <span>Kernel:</span>
            <span className="text-neutral-200">{portfolioData.developer.kernel}</span>
          </div>
          <div className="flex justify-between text-neutral-400">
            <span>Uptime:</span>
            <span className="text-neutral-200">{portfolioData.developer.uptime}</span>
          </div>
          <div className="flex justify-between text-neutral-400">
            <span>Role:</span>
            <span className="text-orange-400 font-semibold">{portfolioData.developer.role}</span>
          </div>
          <div className="flex justify-between text-neutral-400">
            <span>Education:</span>
            <span className="text-emerald-400 font-bold">BCA (2023–2026)</span>
          </div>
        </div>

        {/* CPU Core Utilization Bars */}
        <div className="space-y-1.5 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-orange-400" />
              <span>CPU Cores (AMD Ryzen)</span>
            </span>
            <span className="text-white font-bold">
              {Math.round(cpuUsage.reduce((a, b) => a + b, 0) / 4)}%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-0.5">
            {cpuUsage.map((core, i) => (
              <div key={i} className="space-y-0.5 bg-neutral-900/80 p-1.5 rounded border border-white/5">
                <div className="flex justify-between text-[9.5px] text-neutral-400">
                  <span>Core {i}</span>
                  <span className="text-neutral-200">{core}%</span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-amber-400 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${core}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RAM & Storage */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          {/* RAM */}
          <div className="space-y-1">
            <div className="flex justify-between text-neutral-400">
              <span>RAM (DDR5)</span>
              <span className="text-neutral-200">4.24G / 15.6G (27.1%)</span>
            </div>
            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all rounded-full"
                style={{ width: `${memUsage}%` }}
              />
            </div>
          </div>

          {/* NVMe Storage */}
          <div className="space-y-1">
            <div className="flex justify-between text-neutral-400">
              <span>NVMe (/dev/nvme0n1p2)</span>
              <span className="text-neutral-200">142G / 512G (28%)</span>
            </div>
            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-sky-500 h-full rounded-full" style={{ width: '28%' }} />
            </div>
          </div>
        </div>

        {/* AWS Cloud Node Health */}
        <div className="space-y-1 pt-2 border-t border-white/10 text-[10.5px]">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-purple-400" />
              <span>AWS Cloud Mesh</span>
            </span>
            <span className="text-emerald-400 font-bold">ap-south-1 ({ping}ms)</span>
          </div>
          <div className="p-2 rounded bg-neutral-900/90 border border-white/5 text-[10px] text-neutral-300 space-y-0.5">
            <div className="flex justify-between">
              <span>VPC Status:</span>
              <span className="text-emerald-400 font-semibold">Active (Multi-AZ)</span>
            </div>
            <div className="flex justify-between">
              <span>Prometheus Telemetry:</span>
              <span className="text-cyan-400 font-semibold">10+ Targets OK</span>
            </div>
          </div>
        </div>

        {/* Quick Launcher Pills */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-1.5">
          <button
            type="button"
            onClick={() => onOpenApp('terminal')}
            className="flex-1 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-[10.5px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer border border-white/10"
          >
            <Terminal className="w-3 h-3 text-emerald-400" />
            <span>Terminal</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenApp('files')}
            className="flex-1 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-[10.5px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer border border-white/10"
          >
            <Folder className="w-3 h-3 text-amber-400" />
            <span>Projects</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenApp('resume')}
            className="flex-1 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-[10.5px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer border border-white/10"
          >
            <FileText className="w-3 h-3 text-sky-400" />
            <span>CV</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
