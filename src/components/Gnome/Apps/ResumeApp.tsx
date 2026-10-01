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
Junior Cloud / DevOps Engineer
+91 96231 66585 | yashbaviskar0215@outlook.com
Jalgaon / Pune, India (Open to EU Relocation / Remote)
yashbaviskar.me | linkedin.com/in/yashbaviskar15 | github.com/yashbaviskar15
================================================================================

[PROFESSIONAL SUMMARY]
--------------------------------------------------------------------------------
Entry-level Cloud & DevOps Engineer with hands-on project experience in AWS,
Infrastructure as Code (Terraform), Docker containerization, Kubernetes
orchestration, and Linux systems administration. Independently architected,
built, and deployed multi-tier AWS environments with Terraform, containerized
microservices with Docker, automated CI/CD release pipelines with GitHub Actions,
and instrumented full observability stacks with Prometheus and Grafana.

[TECHNICAL SKILLS]
--------------------------------------------------------------------------------
* Cloud Infrastructure (AWS): EC2, S3, IAM, VPC, Route 53, RDS MySQL, ECS, ECR,
                              ELB/ALB, CloudFront, CloudWatch
* Infrastructure as Code:     Terraform (modular design, state management)
* Containers & Orchestration: Docker (multi-stage builds), Kubernetes (k3s, Minikube)
* CI/CD & Automation:         GitHub Actions, AWS CodePipeline, CodeBuild, CodeDeploy
* Observability & SRE:        Prometheus, Grafana, Alertmanager, Amazon CloudWatch
* Linux Systems:              Ubuntu Server, Amazon Linux, systemd units, cron
* Networking & Security:      VPC Subnets, Route Tables, Internet Gateway, Security
                              Groups, NACLs, SSH key authentication, UFW, Fail2Ban
* Scripting & Databases:      Python, Bash/Shell, YAML, JSON, PostgreSQL, Git

[CLOUD & DEVOPS PROJECTS]
--------------------------------------------------------------------------------
1. AWS Three-Tier Web Application Infrastructure (2024)
   GitHub: github.com/yashbaviskar15/3-tier-app
   • Architected and provisioned an isolated 3-tier AWS environment using modular
     Terraform scripts across dedicated public and private VPC subnets.
   • Configured an Application Load Balancer (ALB) and isolated RDS MySQL database.
   • Enforced least-privilege IAM roles, Security Groups, NACLs, and SSH key-only auth.

2. Cloud Infrastructure Monitoring with Prometheus & Grafana (2024 – 2025)
   GitHub: github.com/yashbaviskar15/cloud-monitoring
   • Automated provisioning of full-stack observability on AWS EC2 via Terraform & Docker.
   • Scraped telemetry across 10+ containerized services; built 5 custom Grafana dashboards.
   • Tuned Alertmanager rules, reducing MTTD from 15+ mins to <2 mins during testing.

3. CI/CD Release Pipeline with Docker, Kubernetes & AWS (2025)
   GitHub: github.com/yashbaviskar15/cicd-pipeline
   • Built automated GitHub Actions CI/CD pipeline for linting, testing, and container builds.
   • Published optimized multi-stage Docker images to Amazon ECR.
   • Deployed containerized workloads to Kubernetes (k3s) with zero-downtime rolling updates.

4. Aravanta CloudOS — Cloud Infrastructure Automation Platform (2025 – Present)
   GitHub: github.com/yashbaviskar15/acos
   • Building a self-service cloud provisioning platform on Infrastructure as Code.
   • RESTful backend built with Python (FastAPI) and PostgreSQL, containerized with Docker.
   • GitHub Actions handles validation, linting, and continuous delivery.

[EDUCATION]
--------------------------------------------------------------------------------
Bachelor of Computer Applications (BCA) | 2023 – 2026 (Expected)
KCES's Institute of Management and Research, Jalgaon, India

[LANGUAGES]
--------------------------------------------------------------------------------
English: B2 (Professional Working) | German: A1 (Elementary / Active Study)
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
