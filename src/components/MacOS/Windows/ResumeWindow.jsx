import React from 'react';

export default function ResumeWindow() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/yash_cv.pdf';
    link.download = 'Yash_Baviskar_CV.pdf';
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/90 text-white select-none">
      {/* Preview Toolbar */}
      <div className="h-11 px-4 border-b border-white/15 bg-white/5 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white/90">Yash_Baviskar_CV.pdf</span>
          <span className="text-[11px] text-white/50 font-mono">1 Page • 38 KB</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/yash_cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <i className="bi bi-box-arrow-up-right text-[11px]" />
            <span>Open in Tab</span>
          </a>

          <button
            onClick={handleDownload}
            className="px-3.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
          >
            <i className="bi bi-download text-[11px]" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Preview Frame */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto macos-scrollbar flex justify-center bg-black/40">
        <div className="w-full max-w-2xl bg-white text-slate-900 rounded-xl shadow-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
          {/* Header */}
          <div className="border-b border-slate-200 pb-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                Yash Baviskar
              </h1>
              <p className="text-purple-700 font-bold text-sm sm:text-base font-heading mt-0.5">
                Junior Cloud Engineer & DevOps Enthusiast
              </p>
              <p className="text-slate-600 text-xs mt-1">
                Pune, India • yashbaviskar0215@outlook.com • linkedin.com/in/yashbaviskar15
              </p>
            </div>
            <div className="px-3 py-1 rounded-md bg-purple-50 border border-purple-200 text-purple-700 font-mono text-xs font-bold">
              BCA CGPA: 8.14
            </div>
          </div>

          {/* Core Profile */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-700 font-heading">
              Professional Summary
            </h2>
            <p className="text-slate-700 text-xs sm:text-[13px] leading-relaxed">
              Motivated Junior Cloud Engineer with a strong foundation in AWS, Terraform (IaC), Docker containerization, Kubernetes orchestration, and automated CI/CD release pipelines. Proven track record of designing multi-tier cloud architectures, implementing zero-downtime deployments, and deploying telemetry suites with Prometheus and Grafana.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-700 font-heading">
              Technical Core Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="p-2 rounded bg-slate-50 border border-slate-200/70">
                <strong className="text-slate-900 block font-heading">Cloud & IaC:</strong>
                <span>AWS (VPC, EC2, RDS, S3, IAM, ALB), Terraform (HCL), Azure</span>
              </div>
              <div className="p-2 rounded bg-slate-50 border border-slate-200/70">
                <strong className="text-slate-900 block font-heading">Containers & DevOps:</strong>
                <span>Docker, Docker Compose, Kubernetes (k8s/k3s), GitHub Actions CI/CD</span>
              </div>
              <div className="p-2 rounded bg-slate-50 border border-slate-200/70">
                <strong className="text-slate-900 block font-heading">Observability & Logs:</strong>
                <span>Prometheus, Grafana, Alertmanager, Node Exporter, CloudWatch</span>
              </div>
              <div className="p-2 rounded bg-slate-50 border border-slate-200/70">
                <strong className="text-slate-900 block font-heading">Systems & Scripting:</strong>
                <span>Linux (Ubuntu / Amazon Linux), Bash scripting, Python (FastAPI), Git</span>
              </div>
            </div>
          </div>

          {/* Key Featured Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-700 font-heading">
              Key Cloud Implementations
            </h2>

            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <strong className="text-slate-900 font-heading text-xs sm:text-sm">AWS Three-Tier Web Architecture</strong>
                <span className="text-[11px] text-slate-500 font-mono">2024</span>
              </div>
              <p className="text-slate-600 text-xs">
                Architected high-availability VPC with public/private subnets, ALB, EC2 auto-scaling, and Multi-AZ RDS MySQL using modular Terraform code.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <strong className="text-slate-900 font-heading text-xs sm:text-sm">CI/CD Pipeline with Docker & Kubernetes</strong>
                <span className="text-[11px] text-slate-500 font-mono">2025</span>
              </div>
              <p className="text-slate-600 text-xs">
                Built end-to-end GitHub Actions pipeline pushing tagged images to Amazon ECR and triggering rolling updates on Kubernetes clusters, reducing deployment duration to &lt;4 minutes.
              </p>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2 border-t border-slate-200 pt-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-700 font-heading">
              Education & Academic Excellence
            </h2>
            <div className="flex justify-between items-center text-xs">
              <div>
                <strong className="text-slate-900 block">Bachelor of Computer Applications (BCA)</strong>
                <span className="text-slate-600">Sandip University, Nashik</span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-purple-700 block">CGPA: 8.14 / 10.0</span>
                <span className="text-slate-500 text-[11px]">2023 – 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
