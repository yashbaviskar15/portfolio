import React from 'react';

export default function CertificationsWindow() {
  const tracks = [
    {
      icon: 'bi-cloud-check-fill',
      title: 'AWS Cloud Architecture & Compute',
      issuer: 'Amazon Web Services Focus',
      status: 'Production Architecture',
      statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      desc: 'Hands-on design of VPC networks, public/private subnets, Application Load Balancers, EC2 auto-recovery, IAM least privilege, and Amazon RDS multi-AZ databases.',
      tags: ['AWS VPC', 'EC2', 'RDS', 'IAM', 'ALB', 'S3'],
    },
    {
      icon: 'bi-code-square',
      title: 'Terraform Infrastructure as Code (IaC)',
      issuer: 'HashiCorp HCL Methodology',
      status: 'Version-Controlled IaC',
      statusColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
      desc: 'Modular, provider-based state management, automated environment provisioning, variable separation, and one-command infrastructure teardown.',
      tags: ['Terraform', 'State Management', 'CloudFormation', 'Modules'],
    },
    {
      icon: 'bi-box-seam-fill',
      title: 'Docker & Kubernetes Container Lifecycle',
      issuer: 'Cloud Native Computing Track',
      status: 'Containerized Deployments',
      statusColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      desc: 'Multi-stage Docker builds, image publishing to Amazon ECR, Kubernetes pod specs, k3s/Minikube cluster testing, and rolling release automation.',
      tags: ['Docker', 'Kubernetes', 'k3s', 'Amazon ECR', 'ECS'],
    },
    {
      icon: 'bi-terminal-fill',
      title: 'Linux Administration & Automation',
      issuer: 'Systems Engineering Focus',
      status: 'Core Systems Knowledge',
      statusColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
      desc: 'Ubuntu Server and Amazon Linux administration, systemd service units, cron job scheduling, Bash scripting, and secure SSH key-only access.',
      tags: ['Linux', 'Ubuntu', 'Bash', 'systemd', 'SSH Keys'],
    },
  ];

  return (
    <div className="p-4 sm:p-6 overflow-y-auto macos-scrollbar space-y-6 select-none bg-slate-950/30">
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
            Technical Pathways & Cloud Validation
          </h2>
          <p className="text-xs text-white/60">Structured learning paths, practical labs, and production-tested methodologies</p>
        </div>
        <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300">
          4 Active Tracks
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tracks.map((track, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-cyan-300 text-base">
                    <i className={`bi ${track.icon}`} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white font-heading">{track.title}</h3>
                    <span className="text-[11px] text-white/50">{track.issuer}</span>
                  </div>
                </div>
                <span className={`text-[9.5px] font-semibold px-2 py-0.5 rounded-full border ${track.statusColor} shrink-0`}>
                  {track.status}
                </span>
              </div>
              <p className="text-xs text-white/75 leading-relaxed">{track.desc}</p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
              {track.tags.map(t => (
                <span key={t} className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-white/10 text-white/80 border border-white/10">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
