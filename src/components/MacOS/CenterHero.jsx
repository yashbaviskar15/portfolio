import React from 'react';
import { motion } from 'framer-motion';

export default function CenterHero({ onOpenContact, onOpenProjects }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4 text-center select-none pb-12 sm:pb-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center pointer-events-auto max-w-2xl mx-auto space-y-4"
      >
        {/* Elegant Italicized Hero Heading */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif italic text-white text-shadow-hero font-normal tracking-tight">
          I'm Yash.
        </h1>

        {/* Subtitle & Role Tagline */}
        <div className="space-y-1.5">
          <p className="text-base sm:text-xl font-heading font-bold text-white/90 text-shadow-sm tracking-wide">
            Junior Cloud & DevOps Engineer
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-sm font-mono text-cyan-200/90 text-shadow-sm">
            <span>AWS</span>
            <span className="opacity-50">•</span>
            <span>Terraform</span>
            <span className="opacity-50">•</span>
            <span>Docker</span>
            <span className="opacity-50">•</span>
            <span>Kubernetes</span>
            <span className="opacity-50">•</span>
            <span>CI/CD</span>
          </div>
        </div>

        {/* Glassmorphic Pill-Shaped Button "Say hello →" */}
        <div className="pt-2 flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenContact}
            className="group px-6 py-2.5 rounded-full glass-panel hover:bg-white/20 border border-white/30 text-white font-medium text-sm sm:text-base shadow-xl flex items-center gap-2.5 transition-all cursor-pointer backdrop-blur-xl"
          >
            <span>Say hello</span>
            <span className="text-cyan-300 group-hover:translate-x-1 transition-transform">→</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenProjects}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white/90 font-medium text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md"
          >
            <i className="bi bi-folder2-open text-xs text-sky-400" />
            <span>View Work</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
