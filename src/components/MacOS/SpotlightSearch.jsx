import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpotlightSearch({ isOpen, onClose, onOpenWindow }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const searchableItems = [
    { id: 'projects', title: 'Projects', category: 'Finder Application', icon: 'bi-folder2-open', desc: 'AWS 3-Tier App, Aravanta CloudOS, CI/CD Pipeline, Monitoring' },
    { id: 'terminal', title: 'Terminal', category: 'Developer Tools', icon: 'bi-terminal', desc: 'Interactive Cloud Terminal CLI' },
    { id: 'skills', title: 'Skills & Tech Stack', category: 'System Overview', icon: 'bi-tools', desc: 'AWS, Terraform, Docker, Kubernetes, Prometheus, Grafana' },
    { id: 'experience', title: 'Experience & Education', category: 'Documents', icon: 'bi-mortarboard', desc: 'BCA (8.14 CGPA), Cloud & DevOps Community' },
    { id: 'certifications', title: 'Certifications & Pathways', category: 'Validation', icon: 'bi-patch-check', desc: 'AWS Architecture, Terraform IaC, Docker Lifecycle' },
    { id: 'resume', title: 'Resume.pdf', category: 'PDF Document', icon: 'bi-file-earmark-pdf', desc: 'Official CV for Yash Baviskar - Junior Cloud Engineer' },
    { id: 'contact', title: 'Contact / Mail', category: 'Communications', icon: 'bi-envelope', desc: 'yashbaviskar0215@outlook.com' },
  ];

  const filteredItems = query.trim() === ''
    ? searchableItems
    : searchableItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onOpenWindow?.('spotlight');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onOpenWindow]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl rounded-2xl glass-window shadow-2xl border border-white/20 overflow-hidden text-white select-none backdrop-blur-3xl"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/15">
            <i className="bi bi-search text-white/50 text-lg" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Spotlight Search (Type a skill, project, or app)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-white text-base placeholder:text-white/40 focus:outline-none font-medium"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-white/40 hover:text-white text-sm">
                <i className="bi bi-x-circle-fill" />
              </button>
            )}
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2 macos-scrollbar space-y-1">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onOpenWindow(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-600/70 transition-colors text-left group ${
                    idx === 0 && query.trim() !== '' ? 'bg-blue-600/50' : 'hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center text-base text-white group-hover:scale-105 transition-transform">
                      <i className={`bi ${item.icon}`} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white leading-tight flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-white/10 text-white/70">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs text-white/60 truncate max-w-sm">{item.desc}</div>
                    </div>
                  </div>
                  <i className="bi bi-arrow-return-left text-xs text-white/40 group-hover:text-white" />
                </button>
              ))
            ) : (
              <div className="py-8 text-center text-white/50 text-sm">
                No matching results found for "{query}"
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2 border-t border-white/10 bg-white/5 text-[11px] text-white/50 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 font-mono text-[10px]">esc</kbd>
              <span>to close</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 font-mono text-[10px]">⌘K</kbd>
              <span>Spotlight</span>
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
