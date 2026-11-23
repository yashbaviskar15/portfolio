import React, { useState } from 'react';
import {
  LayoutGrid,
  Cloud,
  Server,
  Terminal,
  Activity,
  Code2,
  CheckCircle2,
  ExternalLink,
  Star,
  Download,
  ShieldCheck,
  Search,
  Sparkles,
} from 'lucide-react';
import { useGnomeStore } from '../../../store/useGnomeStore';

interface SkillPackage {
  id: string;
  name: string;
  packageName: string;
  category: 'cloud' | 'iac' | 'containers' | 'cicd' | 'monitoring' | 'linux';
  version: string;
  rating: number;
  size: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  projectAction?: string;
}

export const SoftwareCenterApp: React.FC = () => {
  const { themeMode, openApp } = useGnomeStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const packages: SkillPackage[] = [
    {
      id: 'pkg-aws',
      name: 'Amazon Web Services (AWS)',
      packageName: 'aws-cloud-infrastructure',
      category: 'cloud',
      version: '2026.4.2',
      rating: 4.9,
      size: '24.2 MB',
      description: 'Production cloud architecture: Multi-AZ VPC, Public/Private Subnets, EC2 Auto-Scaling, ALB, RDS MySQL, S3, IAM least-privilege RBAC.',
      icon: <Cloud className="w-6 h-6 text-orange-400" />,
      tags: ['VPC', 'EC2', 'RDS', 'ALB', 'S3', 'IAM'],
      projectAction: 'projects',
    },
    {
      id: 'pkg-terraform',
      name: 'HashiCorp Terraform (IaC)',
      packageName: 'terraform-iac-engine',
      category: 'iac',
      version: '1.8.1-1',
      rating: 5.0,
      size: '84.0 MB',
      description: 'Modular Infrastructure as Code with reusable VPC, ALB, and RDS modules. S3 remote state storage with DynamoDB distributed locking.',
      icon: <Code2 className="w-6 h-6 text-amber-400" />,
      tags: ['HCL', 'Modules', 'S3 Backend', 'DynamoDB Locks'],
      projectAction: 'projects',
    },
    {
      id: 'pkg-docker',
      name: 'Docker & Kubernetes (k3s)',
      packageName: 'docker-k8s-runtime',
      category: 'containers',
      version: '26.0.1-k3s',
      rating: 4.8,
      size: '112 MB',
      description: 'Multi-stage Dockerfile optimization, Kubernetes declarative manifests (learning basics), and ClusterIP/NodePort/Ingress routing concepts.',
      icon: <Server className="w-6 h-6 text-sky-400" />,
      tags: ['Multi-Stage', 'k3s', 'Manifests', 'Probes'],
      projectAction: 'projects',
    },
    {
      id: 'pkg-cicd',
      name: 'GitHub Actions & CI/CD',
      packageName: 'github-actions-automation',
      category: 'cicd',
      version: '3.4.0',
      rating: 4.9,
      size: '18.4 MB',
      description: 'Automated Continuous Integration and Continuous Deployment pipelines triggered on commit to test, build, lint, and deploy container images to AWS ECR/ECS.',
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      tags: ['Workflows', 'ECR Push', 'Automated Testing'],
      projectAction: 'projects',
    },
    {
      id: 'pkg-monitoring',
      name: 'Prometheus & Grafana Telemetry',
      packageName: 'prometheus-grafana-stack',
      category: 'monitoring',
      version: '2.51.0-10.4',
      rating: 4.8,
      size: '42.6 MB',
      description: 'Complete observability stack tracking Node Exporter host telemetry, cAdvisor container metrics, PromQL query panels, and Alertmanager notification dispatching.',
      icon: <Activity className="w-6 h-6 text-rose-400" />,
      tags: ['Node Exporter', 'PromQL', 'Dashboards', 'Alertmanager'],
      projectAction: 'monitor',
    },
    {
      id: 'pkg-linux',
      name: 'Linux Systems & Bash Automation',
      packageName: 'ubuntu-sysadmin-core',
      category: 'linux',
      version: '6.8.0-generic',
      rating: 5.0,
      size: '14.0 MB',
      description: 'Ubuntu Server and Amazon Linux systems administration, systemd unit service engineering, cron automation, Bash shell scripting, and Python automation.',
      icon: <Terminal className="w-6 h-6 text-emerald-400" />,
      tags: ['Ubuntu', 'systemd', 'Cron', 'Bash', 'Python'],
      projectAction: 'terminal',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Packages' },
    { id: 'cloud', label: 'Cloud (AWS)' },
    { id: 'iac', label: 'Infrastructure as Code' },
    { id: 'containers', label: 'Containers & K8s' },
    { id: 'cicd', label: 'CI/CD Pipelines' },
    { id: 'monitoring', label: 'Observability' },
    { id: 'linux', label: 'Linux & Scripting' },
  ];

  const filtered = packages.filter((pkg) => {
    const matchesCat = activeCategory === 'all' || pkg.category === activeCategory;
    const matchesQuery =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div
      className={`h-full flex flex-col font-sans select-none ${
        themeMode === 'dark' ? 'bg-[#18181b] text-neutral-200' : 'bg-neutral-50 text-neutral-900'
      }`}
    >
      {/* Top Header */}
      <div
        className={`px-6 py-3 border-b flex flex-wrap items-center justify-between gap-3 shrink-0 ${
          themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-neutral-200 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-orange-600/20 text-orange-400 border border-orange-500/30">
            <LayoutGrid className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight">Software Center (App Center)</h1>
            <p className="text-[11px] text-neutral-400">Verified Technical Competencies &amp; Infrastructure Stacks</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border transition-colors focus:outline-none focus:border-orange-500 ${
              themeMode === 'dark'
                ? 'bg-neutral-800/80 border-white/10 text-white placeholder:text-neutral-500'
                : 'bg-neutral-100 border-neutral-300 text-neutral-900 placeholder:text-neutral-400'
            }`}
          />
        </div>
      </div>

      {/* Main Content Area: Sidebar + Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Categories Sidebar */}
        <div
          className={`w-48 p-3 border-r hidden md:flex flex-col gap-1 shrink-0 ${
            themeMode === 'dark' ? 'bg-neutral-900/40 border-white/10' : 'bg-white border-neutral-200'
          }`}
        >
          <span className="text-[10px] font-bold font-mono text-neutral-400 uppercase tracking-wider px-2 py-1">
            Categories
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-orange-600 text-white font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Package Grid */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto gnome-scrollbar space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map((pkg) => (
              <div
                key={pkg.id}
                className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between gap-3 transition-all ${
                  themeMode === 'dark'
                    ? 'bg-neutral-900/70 border-white/10 hover:border-white/20 shadow-lg'
                    : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-neutral-800 border border-white/10 shrink-0">
                        {pkg.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white font-heading leading-tight">
                          {pkg.name}
                        </h3>
                        <p className="text-[11px] font-mono text-neutral-400">
                          {pkg.packageName} • v{pkg.version}
                        </p>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Installed</span>
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {pkg.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-neutral-300 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                  <div className="flex items-center gap-1 text-amber-400 font-mono text-[11px]">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{pkg.rating.toFixed(1)}</span>
                    <span className="text-neutral-500 ml-1">({pkg.size})</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (pkg.projectAction === 'monitor') openApp('monitor');
                      else if (pkg.projectAction === 'terminal') openApp('terminal');
                      else openApp('projects');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-600/30 hover:bg-orange-600/50 text-orange-300 border border-orange-500/40 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Launch Project</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
