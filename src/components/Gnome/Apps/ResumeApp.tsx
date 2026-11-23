import React, { useState } from 'react';
import { FileText, Download, Copy, Check, ExternalLink, Eye, Code, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { portfolioData } from '../../../data/portfolio';
import { useGnomeStore } from '../../../store/useGnomeStore';
import { Tooltip } from '../Tooltip';

export const ResumeApp: React.FC = () => {
  const { themeMode, accentColor } = useGnomeStore();
  const [activeView, setActiveView] = useState<'pdf' | 'text'>('pdf');
  const [copied, setCopied] = useState(false);

  const resumePlainText = `================================================================================
YASH BAVISKAR
Cloud Support Engineer
yashbaviskar0215@outlook.com | +91 96231 66585
Jalgaon, India (Open to relocation to Germany and other EU countries)
yashbaviskar.me | linkedin.com/in/yashbaviskar15 | github.com/yashbaviskar15
================================================================================

[PROFESSIONAL SUMMARY]
--------------------------------------------------------------------------------
Cloud Support Engineer at IT Digi Solution with hands-on experience investigating
AWS and Linux issues, and with self-directed lab projects in cloud infrastructure,
containers and monitoring. Comfortable with Linux, Bash, AWS basics, Terraform
(designed and validated) and Docker.

[EXPERIENCE]
--------------------------------------------------------------------------------
Cloud Support Engineer | IT Digi Solution | Jalgaon, India | June 2026 – Present
• Investigates EC2 instance/system status checks and CloudWatch metrics, Linux
  logs, IAM access issues, Docker container errors and network connectivity issues.
• Documents findings (status, metrics, time) in the ticket and escalates to a
  senior engineer for the fix.

[TECHNICAL SKILLS]
--------------------------------------------------------------------------------
* Cloud (AWS):                EC2, CloudWatch, S3, IAM, VPC, Route 53, RDS, ECS, ECR
* Infrastructure as Code:     Terraform (designed, defined and validated with plan/validate)
* Containers:                 Docker (multi-stage builds); Kubernetes (learning the basics)
* CI/CD & Automation:         GitHub Actions, Bash/Shell, YAML, JSON
* Observability:              Prometheus, Grafana, CloudWatch (lab)
* Linux Systems:              Ubuntu Server, Amazon Linux, systemd, cron, log analysis
* Networking & Security:      VPC/Subnet design (public/private), Route Tables, Internet
                              Gateway, Security Groups, SSH key authentication, UFW
* Scripting & Databases:      Bash, Python (basics), PostgreSQL, Git

[CLOUD & DEVOPS LAB PROJECTS]
--------------------------------------------------------------------------------
1. AWS Three-Tier Web Application Infrastructure — Terraform (Lab Design)
   GitHub: github.com/yashbaviskar15/3-tier-app
   • Designed and defined a modular three-tier AWS architecture in Terraform
     (VPC, route tables, Internet Gateway, security groups and compute).
   • Defined an Application Load Balancer and an RDS MySQL instance in the config.
   • Validated the configuration with terraform validate and terraform plan; the
     stack was not applied to a live AWS account.

2. Cloud Infrastructure Monitoring with Prometheus & Grafana (Lab)
   GitHub: github.com/yashbaviskar15/cloud-monitoring
   • Defined Prometheus scrape configurations for node and container metrics in a
     personal lab environment.
   • Built Grafana dashboards to visualise system and container health.

3. CI/CD Pipeline with Docker, GitHub Actions & AWS (Workflow Defined)
   GitHub: github.com/yashbaviskar15/cicd-pipeline
   • Defined a GitHub Actions workflow that runs linting and tests, then builds
     container images.
   • Defined container image publishing steps for Amazon ECR.
   • Defined Kubernetes manifests and validated them locally while learning the basics.

4. Aravanta CloudOS — Cloud Infrastructure Automation Platform (In Progress)
   GitHub: github.com/yashbaviskar15/acos
   • Building a self-service cloud provisioning platform on infrastructure as code.
   • Backend built with FastAPI and PostgreSQL, containerized with Docker.
   • GitHub Actions defined for build and publish automation.

[EDUCATION]
--------------------------------------------------------------------------------
Bachelor of Computer Applications (BCA) | 2023 – 2026 | CGPA 8.14 / 10
KCES's Institute of Management and Research, Jalgaon (KBCNMU), India

[LANGUAGES]
--------------------------------------------------------------------------------
English: B2 | German: A1 (learning) | Hindi | Marathi
================================================================================`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(resumePlainText);
    setCopied(true);
    toast.success('Resume copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format: 'pdf' | 'docx') => {
    const filename = format === 'pdf' ? 'YASH_BAVISKAR_CV.pdf' : 'YASH_BAVISKAR_CV.docx';
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

  const lines = resumePlainText.split('\n');

  return (
    <div
      className={`flex flex-col h-full select-none ${
        themeMode === 'dark' ? 'bg-[#1e1e1e] text-neutral-200' : 'bg-neutral-100 text-neutral-800'
      }`}
    >
      {/* Top Gedit / Document Viewer Toolbar */}
      <div
        className={`h-11 px-3 sm:px-4 border-b flex items-center justify-between text-xs shrink-0 ${
          themeMode === 'dark' ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-300'
        }`}
      >
        {/* Left: View Mode Toggle */}
        <div className="flex items-center gap-1.5 font-mono">
          <button
            type="button"
            onClick={() => setActiveView('pdf')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeView === 'pdf'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'hover:bg-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>PDF Document</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('text')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeView === 'text'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'hover:bg-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Plaintext (gedit)</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Tooltip content="Copy raw plain text to clipboard" side="bottom">
            <button
              type="button"
              onClick={handleCopyText}
              className={`hidden sm:flex px-2.5 py-1 rounded-md text-xs font-medium items-center gap-1.5 transition-colors cursor-pointer border ${
                themeMode === 'dark'
                  ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-white/10'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-300'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </Tooltip>

          <Tooltip content="Download ATS-friendly PDF resume" side="bottom">
            <button
              type="button"
              onClick={() => handleDownload('pdf')}
              className="px-3 py-1 rounded-md bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </Tooltip>

          <Tooltip content="Download editable Word format (.docx)" side="bottom">
            <button
              type="button"
              onClick={() => handleDownload('docx')}
              className={`hidden md:flex px-2.5 py-1 rounded-md text-xs font-semibold items-center gap-1.5 border transition-colors cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-white/10'
                  : 'bg-white hover:bg-neutral-200 text-neutral-800 border-neutral-300'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Word (.docx)</span>
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Main Viewport Content */}
      {activeView === 'pdf' ? (
        <div className="flex-1 w-full h-full bg-[#2a2a2e] flex flex-col items-center justify-center relative overflow-hidden">
          <object
            data="/YASH_BAVISKAR_CV.pdf#toolbar=0&navpanes=0&scrollbar=1"
            type="application/pdf"
            className="w-full h-full border-none"
            aria-label="Yash Baviskar CV PDF Document"
          >
            {/* Fallback if browser PDF plugin is blocked or unavailable */}
            <div className="p-6 text-center space-y-4 max-w-md font-sans my-auto">
              <div className="w-12 h-12 rounded-full bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Yash Baviskar — Official CV</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Direct browser PDF viewing may be restricted by your browser. You can open the PDF in a new tab or download the file directly.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <a
                  href="/YASH_BAVISKAR_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in New Tab</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleDownload('pdf')}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-white/10 flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('text')}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-white/10 cursor-pointer"
                >
                  <span>View Plain Text</span>
                </button>
              </div>
            </div>
          </object>
        </div>
      ) : (
        /* Gedit Plaintext Editor View with Line Numbers */
        <div className="flex-1 overflow-y-auto gnome-scrollbar flex font-mono text-xs sm:text-[13px] bg-[#1a1a1a] select-text">
          {/* Gutter */}
          <div className="py-3 px-2 sm:px-2.5 bg-neutral-950/70 text-neutral-600 select-none text-right font-mono border-r border-white/5 space-y-0.5 min-w-8 sm:min-w-10">
            {lines.map((_, i) => (
              <div key={i} className="leading-5 text-[10px] sm:text-[11px]">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Text Stream */}
          <div className="p-3 sm:p-4 leading-5 text-neutral-300 whitespace-pre overflow-x-auto space-y-0.5 w-full">
            {lines.map((line, i) => (
              <div
                key={i}
                className={`${
                  line.startsWith('[')
                    ? 'text-orange-400 font-bold'
                    : line.startsWith('=') || line.startsWith('-')
                    ? 'text-neutral-500'
                    : 'text-neutral-300'
                }`}
              >
                {line || '\u00A0'}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
