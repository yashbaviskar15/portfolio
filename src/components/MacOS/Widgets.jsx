import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Widgets({ onOpenProfile, onOpenProjects, onOpenContact }) {
  const [tempUnit, setTempUnit] = useState('C');
  const [inferenceState, setInferenceState] = useState('idle'); // 'idle' | 'running' | 'done'
  const [inferenceLogs, setInferenceLogs] = useState('');
  const [inferenceStats, setInferenceStats] = useState(null);

  // Run Inference Simulation
  const handleRunInference = () => {
    if (inferenceState === 'running') return;
    setInferenceState('running');
    setInferenceLogs('Provisioning AWS Fargate container task...');

    setTimeout(() => {
      setInferenceLogs('Loading neural weights into memory...');
    }, 700);

    setTimeout(() => {
      setInferenceLogs('Executing inference benchmark on ap-south-1...');
    }, 1400);

    setTimeout(() => {
      setInferenceState('done');
      setInferenceLogs('Inference cycle completed successfully.');
      setInferenceStats({
        latency: '14.2 ms',
        p99: '18.5 ms',
        throughput: '1,420 req/s',
        status: '200 OK',
      });
    }, 2100);
  };

  const handleResetInference = () => {
    setInferenceState('idle');
    setInferenceLogs('');
    setInferenceStats(null);
  };

  return (
    <aside className="hidden lg:flex flex-col gap-3.5 absolute top-12 right-4 sm:right-6 w-72 xl:w-80 z-10 select-none">
      {/* 1. Profile Widget */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onClick={onOpenProfile}
        className="rounded-2xl glass-panel p-4 shadow-xl border border-white/20 hover:border-white/35 transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/photo2.png"
              alt="Yash Baviskar"
              className="w-13 h-13 rounded-2xl object-cover border border-white/30 shadow-md group-hover:scale-105 transition-transform"
              onError={(e) => { e.target.src = '/profilephoto.png'; }}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white font-heading truncate group-hover:text-cyan-300 transition-colors">
                Yash Baviskar
              </h2>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Active
              </span>
            </div>
            <p className="text-[11.5px] text-white/70 font-mono">@yashbaviskar15</p>
            <p className="text-[11px] text-cyan-200/80 truncate">Junior Cloud Engineer</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-center">
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
            <span className="text-xs font-bold text-white block">128</span>
            <span className="text-[9.5px] text-white/60 uppercase tracking-wider block">Repos</span>
          </div>
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
            <span className="text-xs font-bold text-cyan-300 block">8.14</span>
            <span className="text-[9.5px] text-white/60 uppercase tracking-wider block">CGPA</span>
          </div>
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
            <span className="text-xs font-bold text-amber-300 block">4</span>
            <span className="text-[9.5px] text-white/60 uppercase tracking-wider block">Tracks</span>
          </div>
        </div>
      </motion.div>

      {/* 2. Weather Widget */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-2xl glass-panel p-4 shadow-xl border border-white/20 relative overflow-hidden"
      >
        {/* Ambient Warm Sun Glow */}
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-amber-500/25 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-white/80 text-xs font-medium">
              <i className="bi bi-geo-alt-fill text-rose-400 text-[11px]" />
              <span>Pune, IN</span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-extrabold text-white font-heading">
                {tempUnit === 'C' ? '27°' : '80.6°'}
              </span>
              <button
                type="button"
                onClick={() => setTempUnit(tempUnit === 'C' ? 'F' : 'C')}
                className="text-[11px] font-mono text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                °{tempUnit === 'C' ? 'C' : 'F'}
              </button>
            </div>
          </div>

          {/* Animated Weather Sun & Cloud Icon */}
          <div className="relative flex items-center justify-center w-12 h-12">
            <i className="bi bi-sun-fill text-amber-400 text-3xl animate-spin" style={{ animationDuration: '24s' }} />
            <i className="bi bi-cloud-fill text-white/85 text-xl absolute -bottom-1 -left-1 drop-shadow" />
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between text-xs text-white/80">
          <span className="font-semibold text-white/90">Partly Cloudy</span>
          <span className="text-white/60 text-[11px]">Feels like 29°C</span>
        </div>

        <div className="mt-2.5 pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[10.5px] text-white/70">
          <div className="flex items-center gap-1.5">
            <i className="bi bi-droplet text-cyan-400" />
            <span>Humidity: 68%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <i className="bi bi-wind text-sky-400" />
            <span>Wind: 14 km/h</span>
          </div>
        </div>
      </motion.div>

      {/* 3. Action Widget ("Run Inference") */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-2xl glass-panel p-4 shadow-xl border border-white/20 space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-500/30 border border-purple-400/40 flex items-center justify-center text-purple-300 text-xs">
              <i className="bi bi-cpu" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white font-heading">Run Inference</h3>
              <p className="text-[10px] text-white/60">AWS Microservice Benchmark</p>
            </div>
          </div>

          {/* Action Trigger Button */}
          {inferenceState === 'idle' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRunInference}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <i className="bi bi-play-fill" />
              <span>Run</span>
            </motion.button>
          )}

          {inferenceState === 'running' && (
            <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-mono">
              <i className="bi bi-arrow-repeat animate-spin" />
              <span>Benchmarking</span>
            </div>
          )}

          {inferenceState === 'done' && (
            <button
              onClick={handleResetInference}
              className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-[11px] font-medium transition-colors"
            >
              Reset
            </button>
          )}
        </div>

        {/* Live Simulation Output Box */}
        <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 font-mono text-[10.5px] text-white/80 space-y-1.5">
          {inferenceState === 'idle' && (
            <p className="text-white/50 text-[10px]">
              Click 'Run' to benchmark AWS Fargate container inference & latency response.
            </p>
          )}

          {inferenceState === 'running' && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="truncate">{inferenceLogs}</span>
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full animate-pulse w-3/4" />
              </div>
            </div>
          )}

          {inferenceState === 'done' && inferenceStats && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-emerald-400 font-bold text-[11px]">
                <span className="flex items-center gap-1">
                  <i className="bi bi-check-circle-fill" />
                  <span>Success</span>
                </span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9.5px]">
                  {inferenceStats.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[10px] text-white/70 pt-0.5">
                <div>Latency: <span className="text-white font-semibold">{inferenceStats.latency}</span></div>
                <div>P99: <span className="text-white font-semibold">{inferenceStats.p99}</span></div>
                <div className="col-span-2">Rate: <span className="text-white font-semibold">{inferenceStats.throughput}</span></div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* 4. Cloud Infrastructure Health Widget */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="rounded-2xl glass-panel p-3 shadow-xl border border-white/20 space-y-2 text-xs"
      >
        <div className="flex items-center justify-between text-white/90 font-semibold text-[11px]">
          <span className="flex items-center gap-1.5">
            <i className="bi bi-hdd-network text-emerald-400" />
            <span>AWS Infrastructure Status</span>
          </span>
          <span className="text-[9.5px] font-mono text-emerald-400">ap-south-1 • 99.99%</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="p-1 rounded bg-white/5 border border-white/10">
            <span className="text-white/60 block">CPU Load</span>
            <span className="font-mono font-bold text-white">14.2%</span>
          </div>
          <div className="p-1 rounded bg-white/5 border border-white/10">
            <span className="text-white/60 block">Memory</span>
            <span className="font-mono font-bold text-cyan-300">4.2 / 16G</span>
          </div>
          <div className="p-1 rounded bg-white/5 border border-white/10">
            <span className="text-white/60 block">Ping</span>
            <span className="font-mono font-bold text-emerald-300">12 ms</span>
          </div>
        </div>
      </motion.div>
    </aside>
  );
}
