import React, { useState } from 'react';

export default function SkillsWindow() {
  const [activeTab, setActiveTab] = useState('cloud');

  const categories = [
    {
      id: 'cloud',
      name: 'Cloud & Infrastructure as Code',
      icon: 'bi-cloud-fill',
      color: 'text-amber-400',
      skills: [
        { name: 'Amazon Web Services (AWS)', level: 'Advanced', desc: 'EC2, S3, RDS, VPC, IAM, ALB, CloudFront, Route53' },
        { name: 'Terraform (HCL)', level: 'Advanced', desc: 'Modular infrastructure provisioning, remote state locking, multi-env modules' },
        { name: 'AWS CloudFormation', level: 'Intermediate', desc: 'Declarative JSON/YAML cloud resource templates' },
        { name: 'Microsoft Azure', level: 'Fundamental', desc: 'Virtual Machines, Blob Storage, Virtual Networks' },
      ],
    },
    {
      id: 'devops',
      name: 'Containers & CI/CD Orchestration',
      icon: 'bi-box-seam-fill',
      color: 'text-blue-400',
      skills: [
        { name: 'Docker & Docker Compose', level: 'Advanced', desc: 'Multi-stage Dockerfiles, image optimization, multi-container stacks' },
        { name: 'Kubernetes (k8s / k3s)', level: 'Intermediate', desc: 'Deployments, Services, Ingress, Rolling updates, ConfigMaps' },
        { name: 'Amazon ECR & ECS', level: 'Advanced', desc: 'Managed container registries & serverless Fargate tasks' },
        { name: 'GitHub Actions', level: 'Advanced', desc: 'Automated CI/CD pipelines, automated testing, container push & deploy' },
        { name: 'AWS CodePipeline', level: 'Intermediate', desc: 'Continuous integration and continuous delivery release pipelines' },
      ],
    },
    {
      id: 'observability',
      name: 'Observability, Telemetry & Systems',
      icon: 'bi-shield-check',
      color: 'text-emerald-400',
      skills: [
        { name: 'Prometheus & Alertmanager', level: 'Advanced', desc: 'Scrape targets, PromQL queries, incident threshold webhooks' },
        { name: 'Grafana Dashboards', level: 'Advanced', desc: '5+ tailored infrastructure dashboards for host and container metrics' },
        { name: 'Linux Administration', level: 'Advanced', desc: 'Ubuntu & Amazon Linux, systemd unit services, cron scheduling, SSH hardening' },
        { name: 'Python & FastAPI', level: 'Intermediate', desc: 'Automated infrastructure scripts, RESTful microservices' },
        { name: 'Bash / Shell Scripting', level: 'Advanced', desc: 'System automation, server bootstrap user-data scripts' },
      ],
    },
  ];

  const currentCat = categories.find(c => c.id === activeTab) || categories[0];

  return (
    <div className="flex flex-col md:flex-row h-full select-none">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-56 p-3 border-b md:border-b-0 md:border-r border-white/10 bg-white/5 shrink-0 space-y-1">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider px-2 block mb-2">
          System Domains
        </span>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
              activeTab === cat.id ? 'bg-blue-600 text-white font-semibold shadow-md' : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <i className={`bi ${cat.icon} ${activeTab === cat.id ? 'text-white' : cat.color}`} />
            <span className="truncate">{cat.name.split(' ')[0]}</span>
          </button>
        ))}

        <div className="pt-4 mt-4 border-t border-white/10 px-2 text-[11px] text-white/50 space-y-1">
          <div>Architecture: <span className="text-white font-mono">Cloud Native</span></div>
          <div>Total Tools: <span className="text-white font-mono">18+</span></div>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto macos-scrollbar space-y-5 bg-black/20">
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lg">
            <i className={`bi ${currentCat.icon} ${currentCat.color}`} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold font-heading text-white">
              {currentCat.name}
            </h2>
            <p className="text-xs text-white/60">Validated practical toolset & implementation experience</p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentCat.skills.map((skill, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-xs sm:text-[13px]">{skill.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-cyan-300 border border-white/10">
                  {skill.level}
                </span>
              </div>
              <p className="text-[11.5px] text-white/70 leading-relaxed">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
