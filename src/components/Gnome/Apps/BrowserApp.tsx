import React, { useState } from 'react';
import {
  Globe,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Lock,
  ExternalLink,
  ShieldCheck,
  Server,
  Cloud,
  Layers,
  Cpu,
  CheckCircle2,
  Activity,
  Code2,
  BookOpen,
} from 'lucide-react';
import { portfolioData } from '../../../data/portfolio';
import { useGnomeStore } from '../../../store/useGnomeStore';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface Bookmark {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
}

export const BrowserApp: React.FC = () => {
  const { themeMode, accentColor } = useGnomeStore();
  const [activeUrl, setActiveUrl] = useState<string>('https://yashbaviskar.me/cloud-topology');
  const [urlInput, setUrlInput] = useState<string>('https://yashbaviskar.me/cloud-topology');
  const [history, setHistory] = useState<string[]>(['https://yashbaviskar.me/cloud-topology']);
  const [historyIdx, setHistoryIdx] = useState<number>(0);
  const [isReloading, setIsReloading] = useState<boolean>(false);

  const bookmarks: Bookmark[] = [
    {
      id: 'topology',
      name: 'AWS Architecture',
      url: 'https://yashbaviskar.me/cloud-topology',
      icon: <Cloud className="w-3.5 h-3.5 text-orange-400" />,
    },
    {
      id: 'github',
      name: 'GitHub Repos',
      url: 'https://github.com/yashbaviskar15',
      icon: <GithubIcon className="w-3.5 h-3.5 text-neutral-300" />,
    },
    {
      id: 'monitoring',
      name: 'Live Telemetry',
      url: 'https://yashbaviskar.me/telemetry-status',
      icon: <Activity className="w-3.5 h-3.5 text-emerald-400" />,
    },
  ];

  const navigateTo = (newUrl: string) => {
    setActiveUrl(newUrl);
    setUrlInput(newUrl);
    const newHistory = history.slice(0, historyIdx + 1);
    newHistory.push(newUrl);
    setHistory(newHistory);
    setHistoryIdx(newHistory.length - 1);
  };

  const handleBack = () => {
    if (historyIdx > 0) {
      const prev = history[historyIdx - 1];
      setHistoryIdx(historyIdx - 1);
      setActiveUrl(prev);
      setUrlInput(prev);
    }
  };

  const handleForward = () => {
    if (historyIdx < history.length - 1) {
      const next = history[historyIdx + 1];
      setHistoryIdx(historyIdx + 1);
      setActiveUrl(next);
      setUrlInput(next);
    }
  };

  const handleReload = () => {
    setIsReloading(true);
    setTimeout(() => setIsReloading(false), 500);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo(urlInput);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-900 text-neutral-200 select-none">
      {/* GNOME Web URL & Navigation Bar */}
      <div className="h-11 px-3 border-b border-white/10 bg-neutral-950/90 flex items-center gap-2 text-xs shrink-0">
        <div className="flex items-center gap-1 text-neutral-400">
          <button
            type="button"
            onClick={handleBack}
            disabled={historyIdx <= 0}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white disabled:opacity-30 cursor-pointer"
            title="Back"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleForward}
            disabled={historyIdx >= history.length - 1}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white disabled:opacity-30 cursor-pointer"
            title="Forward"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleReload}
            className={`p-1.5 rounded-lg hover:bg-white/10 hover:text-white cursor-pointer ${
              isReloading ? 'animate-spin text-orange-400' : ''
            }`}
            title="Reload Page"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* URL Bar Form */}
        <form onSubmit={handleUrlSubmit} className="flex-1 flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-900 border border-white/10 text-xs font-mono text-neutral-300">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-neutral-200 text-xs font-mono"
            spellCheck={false}
          />
        </form>

        <a
          href="https://github.com/yashbaviskar15"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 text-xs flex items-center gap-1 transition-colors cursor-pointer"
          title="Open in external browser"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Bookmarks Bar */}
      <div className="h-8 px-3 border-b border-white/5 bg-neutral-950/60 flex items-center gap-2 text-xs overflow-x-auto shrink-0 font-mono">
        {bookmarks.map((bm) => (
          <button
            key={bm.id}
            type="button"
            onClick={() => navigateTo(bm.url)}
            className={`px-2 py-0.5 rounded-md flex items-center gap-1.5 text-[11px] transition-colors cursor-pointer ${
              activeUrl === bm.url ? 'bg-white/15 text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
            }`}
          >
            {bm.icon}
            <span>{bm.name}</span>
          </button>
        ))}
      </div>

      {/* Browser Viewport Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto gnome-scrollbar bg-[#141414] space-y-6 select-text">
        {activeUrl.includes('github') ? (
          /* GitHub Hub View */
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="p-5 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white font-heading">github.com/yashbaviskar15</h2>
                  <p className="text-xs text-neutral-400">Public Repositories & Cloud Workloads</p>
                </div>
              </div>
              <a
                href="https://github.com/yashbaviskar15"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Open Live GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {portfolioData.projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-neutral-900/80 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white font-mono">{proj.name}</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Public</span>
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-2">{proj.tagline}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-neutral-800 text-[10px] text-neutral-300 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Cloud Infrastructure & Telemetry View */
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-purple-950/30 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-orange-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified AWS Infrastructure Topology</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white font-heading">
                Multi-Tier Cloud Topology & Telemetry
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Live simulated status for Yash Baviskar's cloud compute nodes, subnets, and observability exporters.
              </p>
            </div>

            {/* Topology Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 space-y-1.5">
                <div className="flex items-center gap-2 text-neutral-400 text-xs">
                  <Server className="w-4 h-4 text-sky-400" />
                  <span>Presentation Tier</span>
                </div>
                <div className="text-sm font-bold text-white font-mono">AWS ALB + HTTPS</div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Public Subnets Active</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 space-y-1.5">
                <div className="flex items-center gap-2 text-neutral-400 text-xs">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>Application Tier</span>
                </div>
                <div className="text-sm font-bold text-white font-mono">EC2 / k3s Containers</div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Auto-Scaling Target OK</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 space-y-1.5">
                <div className="flex items-center gap-2 text-neutral-400 text-xs">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>Database Tier</span>
                </div>
                <div className="text-sm font-bold text-white font-mono">Amazon RDS MySQL</div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Private Subnets Isolated</span>
                </div>
              </div>
            </div>

            {/* Telemetry Target Stream */}
            <div className="p-4 rounded-2xl bg-neutral-900/90 border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2 text-xs font-bold text-white font-mono">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Prometheus Active Scrape Targets</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  100% UP
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2 rounded bg-neutral-950/60 flex items-center justify-between">
                  <span className="text-neutral-300">node_exporter (Host Metrics)</span>
                  <span className="text-emerald-400">15s interval • OK</span>
                </div>
                <div className="p-2 rounded bg-neutral-950/60 flex items-center justify-between">
                  <span className="text-neutral-300">cadvisor (Container Telemetry)</span>
                  <span className="text-emerald-400">10s interval • OK</span>
                </div>
                <div className="p-2 rounded bg-neutral-950/60 flex items-center justify-between">
                  <span className="text-neutral-300">blackbox_exporter (HTTP Probes)</span>
                  <span className="text-emerald-400">5s interval • OK</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
