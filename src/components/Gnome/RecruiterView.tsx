import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  Mail,
  Phone,
  Globe,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Printer,
  Sparkles,
  Server,
  Cloud,
  Code2,
  Terminal,
  Activity,
  Layers,
  GraduationCap,
  Languages as LanguagesIcon,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';
import { portfolioData } from '../../data/portfolio';
import { useGnomeStore } from '../../store/useGnomeStore';
import { springPhysics } from '../../lib/animations';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.74c-.95 0-1.72.77-1.72 1.72s.77 1.72 1.72 1.72 1.72-.77 1.72-1.72-.77-1.72-1.72-1.72z" />
  </svg>
);

interface RecruiterViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecruiterView: React.FC<RecruiterViewProps> = ({ isOpen, onClose }) => {
  const { themeMode, accentColor, openApp } = useGnomeStore();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
    toast.success(`Copied ${type} to clipboard!`);
  };

  const handleDownload = (type: 'pdf' | 'docx') => {
    const filename = type === 'pdf' ? 'YASH_BAVISKAR_CV.pdf' : 'YASH_BAVISKAR_CV.docx';
    const link = document.createElement('a');
    link.href = `/${filename}`;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloading ${filename}`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="recruiter-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto gnome-scrollbar"
          onClick={onClose}
        >
          <motion.div
            key="recruiter-card"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={springPhysics}
            onClick={(e) => e.stopPropagation()}
            className={`recruiter-print-card w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl md:rounded-3xl border shadow-2xl overflow-hidden font-sans ${
              themeMode === 'dark'
                ? 'bg-[#18181b] border-white/15 text-neutral-100 shadow-[0_25px_70px_rgba(0,0,0,0.9)]'
                : 'bg-white border-neutral-300 text-neutral-900 shadow-2xl'
            }`}
          >
            {/* Top Toolbar */}
            <div
              className={`no-print px-4 sm:px-6 py-3 border-b flex items-center justify-between shrink-0 ${
                themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-neutral-100 border-neutral-200'
              }`}
            >
              <div className="flex items-center gap-2 font-mono">
                <div className="p-1.5 rounded-lg bg-orange-600/20 text-orange-400 border border-orange-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">Executive Recruiter View</h3>
                  <p className="text-[11px] text-neutral-400">Clean single-page summary for fast technical evaluation</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    themeMode === 'dark'
                      ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-white/10'
                      : 'bg-white hover:bg-neutral-200 text-neutral-800 border-neutral-300'
                  }`}
                  title="Print summary"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleDownload('pdf')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CV (PDF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload('docx')}
                    className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      themeMode === 'dark'
                        ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-white/10'
                        : 'bg-white hover:bg-neutral-200 text-neutral-800 border-neutral-300'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Word (.docx)</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close recruiter view"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Printable Content Body */}
            <div className="flex-1 overflow-y-auto gnome-scrollbar p-5 sm:p-8 space-y-6 select-text print:p-0">
              {/* Header Profile Section */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
                      {portfolioData.developer.name}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-bold whitespace-nowrap">
                      Available for Hire
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-orange-400 font-mono">
                    {portfolioData.developer.role} • AWS, Terraform, Docker, Kubernetes, CI/CD, Linux
                  </p>
                  <p className="text-xs text-neutral-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span>{portfolioData.developer.location} • <strong className="text-neutral-300">Open to EU Relocation & Remote Roles</strong></span>
                  </p>
                </div>

                {/* Direct Contact Action Badges */}
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleCopy(portfolioData.contact.email, 'email')}
                    className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-mono cursor-pointer transition-colors ${
                      themeMode === 'dark' ? 'bg-neutral-900 border-white/10 hover:bg-neutral-800' : 'bg-neutral-100 border-neutral-300 hover:bg-neutral-200'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>{portfolioData.contact.email}</span>
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-neutral-500" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(portfolioData.contact.phone, 'phone')}
                    className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-mono cursor-pointer transition-colors ${
                      themeMode === 'dark' ? 'bg-neutral-900 border-white/10 hover:bg-neutral-800' : 'bg-neutral-100 border-neutral-300 hover:bg-neutral-200'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{portfolioData.contact.phone}</span>
                    {copiedPhone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-neutral-500" />}
                  </button>

                  <a
                    href={portfolioData.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>

                  <a
                    href={portfolioData.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 cursor-pointer transition-colors ${
                      themeMode === 'dark' ? 'bg-neutral-900 border-white/10 hover:bg-neutral-800 text-neutral-200' : 'bg-neutral-100 border-neutral-300 hover:bg-neutral-200 text-neutral-900'
                    }`}
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400">
                  Professional Executive Summary
                </h2>
                <p className={`text-xs sm:text-sm leading-relaxed p-4 rounded-xl border ${
                  themeMode === 'dark' ? 'bg-neutral-900/60 border-white/10 text-neutral-300' : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                }`}>
                  {portfolioData.developer.summary}
                </p>
              </div>

              {/* Core Technical Competencies Matrix */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400">
                  Technical Competencies Matrix
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className={`p-3.5 rounded-xl border space-y-1.5 ${themeMode === 'dark' ? 'bg-neutral-900/60 border-white/10' : 'bg-neutral-50 border-neutral-200'}`}>
                    <div className="flex items-center gap-2 font-semibold text-orange-400">
                      <Cloud className="w-4 h-4" />
                      <span>Cloud (AWS) & Networking</span>
                    </div>
                    <p className="text-neutral-400 leading-relaxed font-mono text-[11.5px]">
                      EC2, S3, IAM least-privilege, VPC public/private subnets, Route 53, RDS MySQL, ECS, ECR, ALB, CloudFront, CloudWatch, Security Groups, NACLs
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-xl border space-y-1.5 ${themeMode === 'dark' ? 'bg-neutral-900/60 border-white/10' : 'bg-neutral-50 border-neutral-200'}`}>
                    <div className="flex items-center gap-2 font-semibold text-amber-400">
                      <Code2 className="w-4 h-4" />
                      <span>Infrastructure as Code & CI/CD</span>
                    </div>
                    <p className="text-neutral-400 leading-relaxed font-mono text-[11.5px]">
                      Terraform (modular architecture, state management), GitHub Actions, AWS CodePipeline, CodeBuild, CodeDeploy, YAML, JSON
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-xl border space-y-1.5 ${themeMode === 'dark' ? 'bg-neutral-900/60 border-white/10' : 'bg-neutral-50 border-neutral-200'}`}>
                    <div className="flex items-center gap-2 font-semibold text-sky-400">
                      <Server className="w-4 h-4" />
                      <span>Containers & Observability</span>
                    </div>
                    <p className="text-neutral-400 leading-relaxed font-mono text-[11.5px]">
                      Docker multi-stage builds, Kubernetes (k3s, Minikube) rolling updates, Prometheus telemetry scraping, Grafana dashboards, Alertmanager
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-xl border space-y-1.5 ${themeMode === 'dark' ? 'bg-neutral-900/60 border-white/10' : 'bg-neutral-50 border-neutral-200'}`}>
                    <div className="flex items-center gap-2 font-semibold text-emerald-400">
                      <Terminal className="w-4 h-4" />
                      <span>Linux & Automation Scripting</span>
                    </div>
                    <p className="text-neutral-400 leading-relaxed font-mono text-[11.5px]">
                      Ubuntu Server, Amazon Linux, systemd unit services, cron automation, Bash shell scripting, Python (FastAPI, automation), PostgreSQL, Git
                    </p>
                  </div>
                </div>
              </div>

              {/* Cloud & DevOps Projects */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400">
                    Featured Cloud & DevOps Projects
                  </h2>
                  <span className="text-[11px] text-neutral-500 font-mono">100% Code-Backed on GitHub</span>
                </div>

                <div className="space-y-3.5">
                  {portfolioData.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 transition-all ${
                        themeMode === 'dark' ? 'bg-neutral-900/70 border-white/10 hover:border-white/20' : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm sm:text-base font-bold text-white font-heading">
                              {proj.name}
                            </h3>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-600/20 text-orange-400 border border-orange-500/30">
                              {proj.category}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 font-mono pt-0.5">{proj.status}</p>
                        </div>

                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>View Code</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>
                      </div>

                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {proj.tagline}
                      </p>

                      <ul className="space-y-1 text-xs text-neutral-400 pt-1">
                        {proj.bulletPoints.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {proj.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                              themeMode === 'dark' ? 'bg-neutral-800 border-white/10 text-neutral-300' : 'bg-white border-neutral-300 text-neutral-800'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Languages Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10 text-xs">
                <div className={`p-4 rounded-xl border space-y-1.5 ${themeMode === 'dark' ? 'bg-neutral-900/60 border-white/10' : 'bg-neutral-50 border-neutral-200'}`}>
                  <div className="flex items-center gap-2 font-bold text-white font-mono">
                    <GraduationCap className="w-4 h-4 text-purple-400" />
                    <span>Education</span>
                  </div>
                  <div className="font-semibold">{portfolioData.education.degree}</div>
                  <div className="text-neutral-400">{portfolioData.education.institution}</div>
                  <div className="text-[11px] text-neutral-500 font-mono">{portfolioData.education.period}</div>
                </div>

                <div className={`p-4 rounded-xl border space-y-1.5 ${themeMode === 'dark' ? 'bg-neutral-900/60 border-white/10' : 'bg-neutral-50 border-neutral-200'}`}>
                  <div className="flex items-center gap-2 font-bold text-white font-mono">
                    <LanguagesIcon className="w-4 h-4 text-emerald-400" />
                    <span>Languages (CEFR Standard)</span>
                  </div>
                  <div className="space-y-1 pt-0.5">
                    <div className="flex justify-between">
                      <span className="font-medium">English:</span>
                      <span className="text-neutral-400 font-mono">B2 (Professional Working)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">German:</span>
                      <span className="text-neutral-400 font-mono">A1 (Elementary / Active Study)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Actions */}
            <div
              className={`no-print px-6 py-3.5 border-t flex flex-wrap items-center justify-between gap-3 shrink-0 ${
                themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-neutral-100 border-neutral-200'
              }`}
            >
              <div className="text-xs text-neutral-400 font-mono">
                Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-white/10 text-neutral-200">Esc</kbd> to return to Ubuntu Desktop
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openApp('contact');
                  }}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Direct Message</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
