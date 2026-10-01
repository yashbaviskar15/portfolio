import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  HardDrive,
  Activity,
  Server,
  Network,
  RefreshCw,
  Terminal,
  Laptop,
  CheckCircle2,
  Clock,
  Layers,
  ExternalLink,
  Shield,
  Wifi,
} from 'lucide-react';
import { useGnomeStore } from '../../../store/useGnomeStore';
import { useNetworkDevice } from '../../../hooks/useNetworkDevice';
import { WindowId } from '../../../types/gnome';

export const SystemMonitorApp: React.FC = () => {
  const { themeMode, accentColor, openApp, closeApp, focusApp, windows, activeWindowId } = useGnomeStore();
  const network = useNetworkDevice();
  const [activeTab, setActiveTab] = useState<'resources' | 'tasks' | 'cloudlab'>('resources');

  const [fps, setFps] = useState<number>(60);
  const [uptimeSeconds, setUptimeSeconds] = useState<number>(0);
  const [storageInfo, setStorageInfo] = useState<{ used: string; quota: string }>({ used: '0', quota: '0' });
  const [activePromqlQuery, setActivePromqlQuery] = useState<string>('node_cpu_seconds_total{mode="idle"}');

  const cpuCores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
  const deviceMem =
    typeof navigator !== 'undefined' && (navigator as any).deviceMemory
      ? `${(navigator as any).deviceMemory} GB`
      : 'Unavailable in browser sandbox';

  const jsHeap = (() => {
    if (typeof performance !== 'undefined' && (performance as any).memory) {
      const mem = (performance as any).memory;
      return `${(mem.usedJSHeapSize / (1024 * 1024)).toFixed(1)} MB / ${(mem.totalJSHeapSize / (1024 * 1024)).toFixed(1)} MB`;
    }
    return 'Unavailable in browser sandbox';
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
          setStorageInfo({ used: `${used} MB`, quota: `${quota} GB` });
        })
        .catch(() => setStorageInfo({ used: 'Unavailable', quota: 'Unavailable' }));
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

  const openWindows = windows.filter((w) => w.isOpen);

  return (
    <div
      className={`flex flex-col h-full select-none font-sans ${
        themeMode === 'dark' ? 'bg-[#18181b] text-neutral-200' : 'bg-neutral-100 text-neutral-800'
      }`}
    >
      {/* Top Tabs */}
      <div
        className={`h-11 px-4 border-b flex items-center justify-between shrink-0 ${
          themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-neutral-300 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('resources')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'resources'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Client System &amp; Sandbox
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tasks')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'tasks'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Active GUI Tasks ({openWindows.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cloudlab')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'cloudlab'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Cloud Lab Telemetry</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {fps} FPS
          </span>
          <span className="text-[10px] text-neutral-400">Session: {formatUptime(uptimeSeconds)}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-y-auto gnome-scrollbar">
        {activeTab === 'resources' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            {/* Disclaimer Bar */}
            <div
              className={`p-3 rounded-xl border text-xs font-mono flex items-center justify-between gap-3 ${
                themeMode === 'dark' ? 'bg-neutral-900/80 border-white/10' : 'bg-white border-neutral-300'
              }`}
            >
              <div className="flex items-center gap-2 text-neutral-400">
                <Laptop className="w-4 h-4 text-sky-400 shrink-0" />
                <span>
                  Telemetry reported via standard Web APIs. Browser sandboxing restricts direct OS kernel hardware probes.
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                100% Honest Telemetry
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CPU Information Card */}
              <div
                className={`p-4 rounded-2xl border space-y-3 ${
                  themeMode === 'dark' ? 'bg-neutral-900/80 border-white/10' : 'bg-white border-neutral-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">Processor Threads</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-orange-400">{cpuCores} Logical Cores</span>
                </div>

                <div className="space-y-2 text-xs font-mono text-neutral-300 pt-1">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-neutral-400">Browser Concurrency:</span>
                    <span className="font-semibold text-white">{cpuCores} web workers available</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-neutral-400">Host OS CPU Load %:</span>
                    <span className="text-neutral-500 italic">Unavailable in browser sandbox</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-400">Render Pipeline:</span>
                    <span className="text-emerald-400 font-semibold">{fps} FPS hardware-accelerated</span>
                  </div>
                </div>
              </div>

              {/* Memory Information Card */}
              <div
                className={`p-4 rounded-2xl border space-y-3 ${
                  themeMode === 'dark' ? 'bg-neutral-900/80 border-white/10' : 'bg-white border-neutral-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">Memory &amp; Storage</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-400">{deviceMem}</span>
                </div>

                <div className="space-y-2 text-xs font-mono text-neutral-300 pt-1">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-neutral-400">Device RAM Tier:</span>
                    <span className="font-semibold text-white">{deviceMem}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-neutral-400">Active JS Heap:</span>
                    <span className="text-neutral-200 font-semibold">{jsHeap}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-400">Origin Storage:</span>
                    <span className="text-neutral-200 font-semibold">
                      {storageInfo.used} used / {storageInfo.quota} quota
                    </span>
                  </div>
                </div>
              </div>

              {/* Network Status Card */}
              <div
                className={`p-4 rounded-2xl border space-y-3 md:col-span-2 ${
                  themeMode === 'dark' ? 'bg-neutral-900/80 border-white/10' : 'bg-white border-neutral-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Network className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">Network Connectivity</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {network.isOnline ? 'Online (Ready)' : 'Offline'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-neutral-950/70 border border-white/5 space-y-1">
                    <span className="text-neutral-500 text-[10px]">Client Platform</span>
                    <div className="text-sm font-bold text-sky-400">{network.devicePlatform}</div>
                    <span className="text-[10px] text-neutral-400">Operating environment</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950/70 border border-white/5 space-y-1">
                    <span className="text-neutral-500 text-[10px]">Effective Connection</span>
                    <div className="text-sm font-bold text-emerald-400">{network.networkName}</div>
                    <span className="text-[10px] text-neutral-400">Carrier / network type</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950/70 border border-white/5 space-y-1">
                    <span className="text-neutral-500 text-[10px]">Round-Trip Time (RTT)</span>
                    <div className="text-sm font-bold text-purple-400">{network.rtt ? `${network.rtt} ms` : 'N/A'}</div>
                    <span className="text-[10px] text-neutral-400">Estimated server latency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div
            className={`p-4 rounded-2xl border max-w-4xl mx-auto space-y-3 ${
              themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-neutral-300 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-300">
                Active GUI Tasks &amp; Windows ({openWindows.length})
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                Managed by YashOS Window Manager
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400 text-[10px] uppercase">
                    <th className="py-2.5 px-3">Application ID</th>
                    <th className="py-2.5 px-3">Window Title</th>
                    <th className="py-2.5 px-3">Workspace</th>
                    <th className="py-2.5 px-3">State</th>
                    <th className="py-2.5 px-3">Z-Index</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {openWindows.map((win) => {
                    const isFocused = activeWindowId === win.id;
                    return (
                      <tr key={win.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-orange-400">{win.id}</td>
                        <td className="py-2.5 px-3 font-medium text-white truncate max-w-[200px]">{win.title}</td>
                        <td className="py-2.5 px-3 text-neutral-400">Workspace {win.workspace || 1}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              win.isMinimized
                                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                : isFocused
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-neutral-800 text-neutral-300 border border-white/10'
                            }`}
                          >
                            {win.isMinimized ? 'Minimized' : isFocused ? 'Focused' : 'Active'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-neutral-400">{win.zIndex}</td>
                        <td className="py-2.5 px-3 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => focusApp(win.id)}
                            className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[10px] font-semibold transition-colors cursor-pointer"
                          >
                            Focus
                          </button>
                          <button
                            type="button"
                            onClick={() => closeApp(win.id)}
                            className="px-2.5 py-1 rounded bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 text-[10px] font-semibold transition-colors cursor-pointer"
                          >
                            Close
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'cloudlab' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            {/* Overview Banner */}
            <div
              className={`p-4 rounded-2xl border space-y-2 ${
                themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-neutral-300 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-bold font-mono">
                    Cloud Lab Observability Project: cloud-monitoring
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => openApp('projects')}
                  className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>View Project</span>
                </button>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Full-stack observability infrastructure provisioned on AWS using Terraform and Docker. Collects
                host metrics via Node Exporter, container telemetry via cAdvisor, and dispatches alerts via Prometheus Alertmanager.
              </p>
            </div>

            {/* PromQL Query Bar */}
            <div
              className={`p-4 rounded-2xl border space-y-2 ${
                themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-neutral-300 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold font-mono">PromQL Sample Query Bar</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                  Prometheus Server v2.51.0 Configuration
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={activePromqlQuery}
                  onChange={(e) => setActivePromqlQuery(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={() => openApp('terminal')}
                  className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Open in Terminal</span>
                </button>
              </div>
            </div>

            {/* Architecture Metrics Specification Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-white/10 space-y-2">
                <span className="text-neutral-400 text-[11px]">AWS Multi-AZ VPC</span>
                <div className="text-xl font-extrabold text-emerald-400">10.0.0.0/16</div>
                <p className="text-[10px] text-neutral-500">Public &amp; Private Subnets across 2 AZs</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-white/10 space-y-2">
                <span className="text-neutral-400 text-[11px]">Scrape Exporters</span>
                <div className="text-xl font-extrabold text-sky-400">Node + cAdvisor</div>
                <p className="text-[10px] text-neutral-500">Host port 9100 &amp; container port 8080</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-white/10 space-y-2">
                <span className="text-neutral-400 text-[11px]">Mean Time to Detect (MTTD)</span>
                <div className="text-xl font-extrabold text-purple-400">&lt; 2 minutes</div>
                <p className="text-[10px] text-neutral-500">Automated Alertmanager routing</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
