import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, ExternalLink, ChevronDown, ChevronUp, CheckCircle2, AlertCircle, Layers, Terminal, Sparkles } from 'lucide-react';
import { portfolioData } from '../../../data/portfolio';
import { useGnomeStore } from '../../../store/useGnomeStore';

export const ProjectsApp: React.FC = () => {
  const { themeMode, accentColor, t } = useGnomeStore();
  const strings = t();
  const projectsList = strings.projects.list || [];
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(projectsList[0]?.id || 'aws-three-tier');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulated brief GNOME skeleton loader
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  if (isLoading) {
    return (
      <div className={`p-6 space-y-4 ${themeMode === 'dark' ? 'bg-[#1a1a1a]' : 'bg-neutral-100'}`}>
        <div className="h-7 w-48 rounded-lg bg-neutral-800 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-44 rounded-2xl bg-neutral-800/60 animate-pulse border border-white/5" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full p-4 sm:p-6 space-y-6 select-text pb-20 ${
        themeMode === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
      }`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <h2
            className={`text-lg sm:text-xl font-extrabold font-heading ${
              themeMode === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}
          >
            {strings.projects.title}
          </h2>
          <p className="text-xs text-neutral-400 font-mono mt-0.5">
            {strings.projects.subtitle}
          </p>
        </div>
        <span
          className="px-3 py-1 rounded-full text-xs font-mono font-bold border"
          style={{
            color: accentColor,
            borderColor: `${accentColor}40`,
            backgroundColor: `${accentColor}15`,
          }}
        >
          {projectsList.length} {strings.projects.repositoriesCount}
        </span>
      </div>

      {/* Projects List / Grid with Inline Accordion Expansion */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="space-y-4"
      >
        {projectsList.map((project) => {
          const isExpanded = expandedProjectId === project.id;
          const orig = portfolioData.projects.find((p) => p.id === project.id) || portfolioData.projects[0];

          return (
            <motion.div
              key={project.id}
              layout
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
              }}
              className={`rounded-2xl border transition-all overflow-hidden ${
                themeMode === 'dark'
                  ? isExpanded
                    ? 'bg-neutral-900/95 border-orange-500/50 shadow-xl'
                    : 'bg-neutral-900/60 border-white/10 hover:border-white/20'
                  : isExpanded
                  ? 'bg-white border-orange-500/60 shadow-md'
                  : 'bg-white/80 border-neutral-300 hover:border-neutral-400'
              }`}
            >
              {/* Card Header (Click to toggle accordion) */}
              <div
                onClick={() => toggleExpand(project.id)}
                className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className="p-3 rounded-xl shadow-md shrink-0 text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    <FolderGit2 className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={`text-sm sm:text-base font-bold ${
                          themeMode === 'dark' ? 'text-white' : 'text-neutral-900'
                        }`}
                      >
                        {project.name}
                      </h3>
                      <span className="text-[10.5px] px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300 border border-white/10 font-mono">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl">
                      {project.tagline}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {orig.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 py-0.5 rounded text-[10.5px] font-mono border ${
                            themeMode === 'dark'
                              ? 'bg-neutral-950 border-white/10 text-neutral-300'
                              : 'bg-neutral-100 border-neutral-300 text-neutral-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={orig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1 transition-colors border border-white/10 cursor-pointer"
                    title="Open GitHub Repository"
                  >
                    <span className="hidden sm:inline">{strings.projects.github}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    className="p-2 rounded-xl hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Inline Accordion Expanded Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="border-t border-white/10 p-5 space-y-4 font-sans text-xs bg-black/20"
                  >
                    {/* Implementation Highlights */}
                    <div className="space-y-2">
                      <div
                        className="font-bold uppercase tracking-wider font-mono text-[11px] flex items-center gap-1.5"
                        style={{ color: accentColor }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{strings.projects.highlights}</span>
                      </div>
                      <ul className="space-y-1.5 text-neutral-300 pl-1">
                        {project.bulletPoints.map((bp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="font-bold text-orange-400">•</span>
                            <span className="leading-relaxed">{bp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Problem & Solution Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div
                        className={`p-3.5 rounded-xl border space-y-1 ${
                          themeMode === 'dark'
                            ? 'bg-neutral-950/70 border-white/5'
                            : 'bg-neutral-50 border-neutral-200'
                        }`}
                      >
                        <div className="font-bold text-rose-400 font-mono text-[10.5px] uppercase flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{strings.projects.problem}</span>
                        </div>
                        <p className="text-neutral-400 leading-relaxed">{project.problem}</p>
                      </div>

                      <div
                        className={`p-3.5 rounded-xl border space-y-1 ${
                          themeMode === 'dark'
                            ? 'bg-neutral-950/70 border-white/5'
                            : 'bg-neutral-50 border-neutral-200'
                        }`}
                      >
                        <div className="font-bold text-emerald-400 font-mono text-[10.5px] uppercase flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{strings.projects.solution}</span>
                        </div>
                        <p className="text-neutral-400 leading-relaxed">{project.solution}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
