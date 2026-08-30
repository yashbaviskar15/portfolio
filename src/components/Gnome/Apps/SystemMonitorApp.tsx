import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Activity, Server, Network, ShieldCheck, Zap, RefreshCw } from 'lucide-react';
import { useGnomeStore } from '../../../store/useGnomeStore';

interface ProcessItem {
  pid: number;
  name: string;
  user: string;
  cpu: number;
  mem: number;
  status: string;
}

export const SystemMonitorApp: React.FC = () => {
  const { themeMode, accentColor } = useGnomeStore();
  const [activeTab, setActiveTab] = useState<'resources' | 'processes' | 'cloud'>('resources');

  const [cpuHistory, setCpuHistory] = useState<number[]>([18, 22, 19, 25, 20, 28, 24, 18, 23, 21]);
  const [ramUsage, setRamUsage] = useState<number>(27.4);
  const [netSpeed, setNetSpeed] = useState<{ rx: number; tx: number }>({ rx: 1.4, tx: 0.8 });

  const [processes, setProcesses] = useState<ProcessItem[]>([
    { pid: 1420, name: 'gnome-shell', user: 'yash', cpu: 4.2, mem: 6.8, status: 'Running' },
    { pid: 2189, name: 'terraform', user: 'yash', cpu: 8.5, mem: 4.1, status: 'Active' },
    { pid: 3041, name: 'dockerd', user: 'root', cpu: 3.1, mem: 5.2, status: 'Running' },
    { pid: 3412, name: 'prometheus', user: 'prometheus', cpu: 2.8, mem: 3.9, status: 'Running' },
    { pid: 4022, name: 'grafana-server', user: 'grafana', cpu: 1.6, mem: 2.7, status: 'Running' },
    { pid: 5104, name: 'k3s-server', user: 'root', cpu: 5.4, mem: 6.1, status: 'Running' },
    { pid: 6180, name: 'bash', user: 'yash', cpu: 0.1, mem: 0.4, status: 'Sleeping' },
  ]);

  // Live telemetry loop
  useEffect(() => {
    const timer = setInterval(() => {
      const newCpu = Math.floor(14 + Math.random() * 22);
      setCpuHistory((prev) => [...prev.slice(1), newCpu]);
      setRamUsage(parseFloat((26.5 + Math.random() * 2.2).toFixed(1)));
      setNetSpeed({
        rx: parseFloat((1.1 + Math.random() * 1.8).toFixed(1)),
        tx: parseFloat((0.5 + Math.random() * 0.9).toFixed(1)),
      });

      setProcesses((prev) =>
        prev.map((p) => ({
          ...p,
          cpu: parseFloat((p.cpu * (0.85 + Math.random() * 0.3)).toFixed(1)),
        }))
      );
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const currentCpu = cpuHistory[cpuHistory.length - 1] || 20;

  return (
    <div className={`flex flex-col h-full select-none ${
      themeMode === 'dark' ? 'bg-[#1a1a1a] text-neutral-200' : 'bg-neutral-100 text-neutral-800'
    }`}>
      {/* Top Tabs */}
      <div className={`h-11 px-4 border-b flex items-center justify-between shrink-0 ${
        themeMode === 'dark' ? 'bg-[#222226] border-white/10' : 'bg-white border-neutral-300'
      }`}>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('resources')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'resources'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
            style={activeTab === 'resources' ? { backgroundColor: accentColor } : {}}
          >
            Resources
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('processes')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'processes'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
            style={activeTab === 'processes' ? { backgroundColor: accentColor } : {}}
          >
            Processes ({processes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cloud')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'cloud'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
            style={activeTab === 'cloud' ? { backgroundColor: accentColor } : {}}
          >
            Cloud Infrastructure
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Polling 2.0s</span>
        </div>
      </div>

      {/* Main Tab Views */}
      <div className="flex-1 min-h-0 w-full overflow-y-auto gnome-scrollbar p-4 sm:p-6 space-y-6">
        {activeTab === 'resources' && (
          <div className="space-y-6">
            {/* CPU History Graph */}
            <div className={`p-5 rounded-2xl border space-y-3 ${
              themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-neutral-300 shadow-sm'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider">
                    CPU History (Overall: {currentCpu}%)
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400">AMD Ryzen 8-Core Processor</span>
              </div>

              {/* Animated Waveform Bars */}
              <div className="h-24 bg-neutral-950/80 rounded-xl p-2.5 flex items-end gap-2 border border-white/5">
                {cpuHistory.map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <motion.div
                      animate={{ height: `${val}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="w-full rounded-t-md bg-gradient-to-t from-orange-600 to-amber-400"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RAM & Network Split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* RAM Usage */}
              <div className={`p-4 rounded-2xl border space-y-3 ${
                themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-neutral-300 shadow-sm'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold font-mono uppercase tracking-wider">Memory Usage</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">{ramUsage}%</span>
                </div>

                <div className="space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-neutral-400">
                    <span>Used / Total:</span>
                    <span className="text-neutral-200">4.38 GiB / 16.0 GiB</span>
                  </div>
                  <div className="w-full h-2.5 bg-neutral-950 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${ramUsage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Network IO */}
              <div className={`p-4 rounded-2xl border space-y-3 ${
                themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-neutral-300 shadow-sm'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Network className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-bold font-mono uppercase tracking-wider">Network Activity</span>
                  </div>
                  <span className="text-xs font-mono text-sky-400 font-bold">eth0 (Active)</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded-lg bg-neutral-950/70 border border-white/5">
                    <span className="text-[10px] text-neutral-500 block">Receiving (RX)</span>
                    <span className="text-sm font-bold text-sky-300">{netSpeed.rx} MB/s</span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-950/70 border border-white/5">
                    <span className="text-[10px] text-neutral-500 block">Sending (TX)</span>
                    <span className="text-sm font-bold text-indigo-300">{netSpeed.tx} MB/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'processes' && (
          <div className={`p-4 rounded-2xl border ${
            themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-neutral-300 shadow-sm'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400 text-[10px] uppercase">
                    <th className="py-2 px-2">PID</th>
                    <th className="py-2 px-2">Process Name</th>
                    <th className="py-2 px-2">User</th>
                    <th className="py-2 px-2">CPU %</th>
                    <th className="py-2 px-2">MEM %</th>
                    <th className="py-2 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {processes.map((proc) => (
                    <tr key={proc.pid} className="hover:bg-white/5 transition-colors">
                      <td className="py-2 px-2 text-neutral-400">{proc.pid}</td>
                      <td className="py-2 px-2 font-bold text-white">{proc.name}</td>
                      <td className="py-2 px-2 text-neutral-400">{proc.user}</td>
                      <td className="py-2 px-2 text-orange-400 font-bold">{proc.cpu}%</td>
                      <td className="py-2 px-2 text-emerald-400">{proc.mem}%</td>
                      <td className="py-2 px-2">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9.5px]">
                          {proc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'cloud' && (
          <div className="space-y-4">
            <div className={`p-5 rounded-2xl border space-y-3 ${
              themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-neutral-300 shadow-sm'
            }`}>
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold font-mono uppercase tracking-wider">AWS Cloud Mesh Telemetry</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-1">
                <div className="p-3 rounded-xl bg-neutral-950/70 border border-white/5 space-y-1">
                  <span className="text-neutral-500 text-[10px]">Region Target</span>
                  <div className="text-sm font-bold text-white">ap-south-1 (Mumbai)</div>
                  <span className="text-[10px] text-emerald-400 font-semibold">Latency: 12ms</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/70 border border-white/5 space-y-1">
                  <span className="text-neutral-500 text-[10px]">Terraform State</span>
                  <div className="text-sm font-bold text-white">Synced (S3 Backend)</div>
                  <span className="text-[10px] text-emerald-400 font-semibold">Locking: DynamoDB</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/70 border border-white/5 space-y-1">
                  <span className="text-neutral-500 text-[10px]">Kubernetes Ingress</span>
                  <div className="text-sm font-bold text-white">100% Up (0 Downtime)</div>
                  <span className="text-[10px] text-emerald-400 font-semibold">Pods: 12/12 Running</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
