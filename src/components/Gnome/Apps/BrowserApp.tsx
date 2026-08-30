import React, { useState } from 'react';
import { Globe, ArrowLeft, ArrowRight, RotateCw, Lock, ExternalLink, ShieldCheck, Server } from 'lucide-react';
import { portfolioData } from '../../../data/portfolio';

export const BrowserApp: React.FC = () => {
  const [url, setUrl] = useState<string>('https://yashbaviskar.dev/cloud-architecture');

  return (
    <div className="flex flex-col h-full bg-neutral-900 text-neutral-200 select-none">
      {/* GNOME Web URL & Navigation Bar */}
      <div className="h-11 px-3 border-b border-white/10 bg-neutral-950/80 flex items-center gap-2 text-xs shrink-0">
        <div className="flex items-center gap-1 text-neutral-400">
          <button type="button" className="p-1 rounded hover:bg-white/10 hover:text-white" title="Back">
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button type="button" className="p-1 rounded hover:bg-white/10 hover:text-white" title="Forward">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button type="button" className="p-1 rounded hover:bg-white/10 hover:text-white" title="Reload">
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* URL Bar */}
        <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-900 border border-white/10 text-xs font-mono text-neutral-300">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-neutral-200 text-xs"
            spellCheck={false}
          />
        </div>

        <a
          href="https://github.com/yashbaviskar15"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 text-xs flex items-center gap-1 transition-colors"
          title="Open in real browser"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Browser Viewport Content (Strictly Photo-Free: Cloud Architecture Telemetry View) */}
      <div className="flex-1 p-6 overflow-y-auto gnome-scrollbar bg-[#141414] space-y-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-purple-950/30 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified AWS Cloud Production Node</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-heading">
              Cloud Infrastructure Overview
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Real-time telemetry and topology status for Yash Baviskar's cloud microservices.
            </p>
          </div>

          {/* Infrastructure Health Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 space-y-1">
              <div className="text-[11px] font-mono text-neutral-400">AWS Region</div>
              <div className="text-sm font-bold text-white font-mono">ap-south-1 (Mumbai)</div>
              <div className="text-[10px] text-emerald-400">● 100% Operational</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 space-y-1">
              <div className="text-[11px] font-mono text-neutral-400">Container Runtime</div>
              <div className="text-sm font-bold text-white font-mono">Docker / k3s cluster</div>
              <div className="text-[10px] text-emerald-400">● 0 Restarts</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 space-y-1">
              <div className="text-[11px] font-mono text-neutral-400">Telemetry Monitoring</div>
              <div className="text-sm font-bold text-white font-mono">Prometheus / Grafana</div>
              <div className="text-[10px] text-emerald-400">● Scrape Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
