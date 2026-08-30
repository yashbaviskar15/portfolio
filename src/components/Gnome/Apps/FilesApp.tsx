import React, { useState } from 'react';
import { FolderGit2, Folder, FileText, FileCode, ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, AlertCircle, ShieldCheck, Home, HardDrive, Terminal } from 'lucide-react';
import { portfolioData, Project } from '../../../data/portfolio';
import { globalVFS, VFSNode } from '../../../lib/virtualFileSystem';
import { useGnomeStore } from '../../../store/useGnomeStore';

export const FilesApp: React.FC = () => {
  const { currentCwd, setCwd, themeMode, accentColor, openApp } = useGnomeStore();
  const [selectedProject, setSelectedProject] = useState<Project>(portfolioData.projects[0]);
  const [activeTab, setActiveTab] = useState<'projects' | 'vfs'>('projects');
  const [openedFile, setOpenedFile] = useState<{ name: string; content: string } | null>(null);

  // VFS Folder browsing
  const vfsFiles = globalVFS.listDirectory(currentCwd);

  const handleVfsClick = (node: VFSNode) => {
    if (node.type === 'folder') {
      const nextPath = globalVFS.resolvePath(node.name, currentCwd);
      setCwd(nextPath);
      setOpenedFile(null);
    } else {
      const fullPath = globalVFS.resolvePath(node.name, currentCwd);
      const content = globalVFS.readFile(fullPath);
      setOpenedFile({ name: node.name, content: content || '' });
    }
  };

  const handleGoUp = () => {
    const nextPath = globalVFS.resolvePath('..', currentCwd);
    setCwd(nextPath);
    setOpenedFile(null);
  };

  return (
    <div className={`flex flex-col md:flex-row h-full select-none ${themeMode === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-800'}`}>
      {/* Nautilus Left Sidebar */}
      <div className={`w-full md:w-56 p-3 border-b md:border-b-0 md:border-r shrink-0 space-y-4 ${themeMode === 'dark' ? 'bg-neutral-950/80 border-white/10' : 'bg-neutral-200/70 border-neutral-300'}`}>
        <div>
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 block mb-1.5 font-mono">
            Places
          </span>
          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('projects');
                setOpenedFile(null);
              }}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                activeTab === 'projects'
                  ? 'text-white font-semibold shadow-sm'
                  : 'hover:bg-white/10 text-neutral-400 hover:text-neutral-200'
              }`}
              style={activeTab === 'projects' ? { backgroundColor: accentColor } : {}}
            >
              <FolderGit2 className="w-4 h-4 text-amber-400" />
              <span>Cloud Projects ({portfolioData.projects.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('vfs');
                setCwd('/home/yash');
                setOpenedFile(null);
              }}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                activeTab === 'vfs'
                  ? 'text-white font-semibold shadow-sm'
                  : 'hover:bg-white/10 text-neutral-400 hover:text-neutral-200'
              }`}
              style={activeTab === 'vfs' ? { backgroundColor: accentColor } : {}}
            >
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <span>Virtual File System</span>
            </button>
          </div>
        </div>

        {/* Project Repositories Quick Filter List */}
        {activeTab === 'projects' && (
          <div>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 block mb-1.5 font-mono">
              Repositories
            </span>
            <div className="space-y-1">
              {portfolioData.projects.map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => setSelectedProject(proj)}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs truncate transition-colors flex items-center gap-2 cursor-pointer ${
                    selectedProject.id === proj.id
                      ? 'bg-white/15 text-white font-semibold'
                      : 'text-neutral-400 hover:bg-white/10'
                  }`}
                >
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
                  <span className="truncate">{proj.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-white/10 text-[11px] text-neutral-400 px-2 flex items-center justify-between font-mono">
          <span>ext4 • Linux Root</span>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        </div>
      </div>

      {/* Main Files & Detail View */}
      <div className={`flex-1 p-4 sm:p-6 overflow-y-auto gnome-scrollbar space-y-5 ${themeMode === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
        {activeTab === 'projects' ? (
          <>
            {/* Header Bar */}
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-bold border"
                    style={{
                      color: accentColor,
                      borderColor: `${accentColor}40`,
                      backgroundColor: `${accentColor}15`,
                    }}
                  >
                    {selectedProject.category}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">{selectedProject.status}</span>
                </div>
                <h2 className={`text-lg sm:text-xl font-bold font-heading ${themeMode === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  {selectedProject.name}
                </h2>
              </div>

              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
                style={{ backgroundColor: accentColor }}
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Open GitHub Repo</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>

            {/* Tagline Summary */}
            <p className={`text-xs sm:text-sm leading-relaxed p-3.5 rounded-xl border ${themeMode === 'dark' ? 'bg-neutral-900 text-neutral-300 border-white/10' : 'bg-neutral-50 text-neutral-700 border-neutral-200'}`}>
              {selectedProject.tagline}
            </p>

            {/* Implementation Highlights (From Official CV) */}
            <div className={`p-4 rounded-xl border space-y-2 ${themeMode === 'dark' ? 'bg-neutral-900 border-white/10' : 'bg-neutral-50 border-neutral-200'}`}>
              <div className="text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-2" style={{ color: accentColor }}>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Implementation Highlights (From CV)</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-[13px] pt-1">
                {selectedProject.bulletPoints.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-bold mt-0.5" style={{ color: accentColor }}>•</span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Problem vs Solution Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className={`p-3.5 rounded-xl border space-y-1.5 ${themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-neutral-50 border-neutral-200'}`}>
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Problem Addressed</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">{selectedProject.problem}</p>
              </div>

              <div className={`p-3.5 rounded-xl border space-y-1.5 ${themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-neutral-50 border-neutral-200'}`}>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>DevOps / Cloud Solution</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">{selectedProject.solution}</p>
              </div>
            </div>

            {/* Technologies Provisioned */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-mono">
                Technologies & Tools
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2.5 py-1 rounded-md border text-xs font-mono ${
                      themeMode === 'dark' ? 'bg-neutral-800 border-white/10 text-neutral-200' : 'bg-neutral-100 border-neutral-300 text-neutral-800'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Virtual File System Browser */
          <div className="space-y-4">
            {/* Breadcrumb Path Bar */}
            <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-mono ${themeMode === 'dark' ? 'bg-neutral-900 border-white/10' : 'bg-neutral-100 border-neutral-300'}`}>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGoUp}
                  disabled={currentCwd === '/'}
                  className="p-1 rounded hover:bg-white/10 disabled:opacity-40"
                  title="Go up one directory"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <span className="font-semibold text-neutral-300">{currentCwd}</span>
              </div>
              <span className="text-[10px] text-neutral-500">{vfsFiles.length} items</span>
            </div>

            {/* File List Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {vfsFiles.map((file) => (
                <button
                  key={file.name}
                  type="button"
                  onClick={() => handleVfsClick(file)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all hover:scale-105 cursor-pointer ${
                    themeMode === 'dark' ? 'bg-neutral-900/80 border-white/10 hover:border-orange-500/50' : 'bg-neutral-50 border-neutral-200 hover:border-orange-500'
                  }`}
                >
                  {file.type === 'folder' ? (
                    <Folder className="w-8 h-8 text-amber-400" />
                  ) : (
                    <FileText className="w-8 h-8 text-sky-400" />
                  )}
                  <div>
                    <span className="text-xs font-semibold block truncate max-w-[120px]">{file.name}</span>
                    <span className="text-[10px] text-neutral-500 font-mono">{file.size || 'Folder'}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* File Preview */}
            {openedFile && (
              <div className={`p-4 rounded-xl border space-y-2 mt-4 ${themeMode === 'dark' ? 'bg-neutral-950 border-white/15' : 'bg-neutral-100 border-neutral-300'}`}>
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-xs font-mono">
                  <span className="font-bold text-orange-400">{openedFile.name}</span>
                  <button type="button" onClick={() => setOpenedFile(null)} className="text-neutral-500 hover:text-white">
                    Close Preview ✕
                  </button>
                </div>
                <pre className="text-xs font-mono whitespace-pre-wrap leading-relaxed text-neutral-300 overflow-x-auto">
                  {openedFile.content}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
