import React, { useState } from 'react';

export default function ProjectsWindow() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState('3-tier-app');

  const projects = [
    {
      id: '3-tier-app',
      category: 'cloud',
      title: 'AWS Three-Tier Web Application Infrastructure',
      badge: 'Featured Cloud Architecture',
      status: 'Completed • 2024',
      github: 'https://github.com/yashbaviskar15/3-tier-app',
      shortDesc: 'Designed and deployed a highly available three-tier AWS architecture (public/private subnets, ALB, EC2, Multi-AZ RDS) isolating presentation, application, and database layers.',
      problem: 'Deploying web applications with hardcoded single-server topologies creates single points of failure, security risks, and unpredictable manual setup.',
      solution: 'Provisioned the full stack as version-controlled Terraform code: VPC, route tables, Internet Gateway, security groups, and compute - enabling repeatable, one-command redeployment.',
      architecture: [
        { layer: 'Public Ingress', icon: 'bi-globe', text: 'Internet Gateway → Route 53 DNS → Application Load Balancer (ALB)' },
        { layer: 'Presentation / Web Tier', icon: 'bi-hdd-network', text: 'Public Subnets: EC2 Web Instances with strictly bounded ingress rules' },
        { layer: 'Application Logic Tier', icon: 'bi-cpu', text: 'Private Subnets: EC2 App instances communicating exclusively via internal security groups' },
        { layer: 'Database Tier', icon: 'bi-database-fill', text: 'Isolated Private Subnets: Multi-AZ Amazon RDS (MySQL) with automated backups' },
        { layer: 'Security & Telemetry', icon: 'bi-shield-check', text: 'IAM least-privilege instance profiles + Amazon CloudWatch alarm monitoring' },
      ],
      technologies: ['AWS VPC', 'Terraform', 'EC2', 'ALB', 'Amazon RDS', 'Security Groups', 'NACLs', 'CloudWatch', 'IAM'],
    },
    {
      id: 'aravanta-cloudos',
      category: 'devops',
      title: 'Aravanta CloudOS — Cloud Infrastructure Platform',
      badge: 'Experimental Engineering',
      status: 'In Progress • 2025 – Present',
      github: 'https://github.com/yashbaviskar15/aravanta-cloudos',
      shortDesc: 'Self-service platform for provisioning cloud resources and deploying containerized applications through Infrastructure as Code, reducing manual environment setup time.',
      problem: 'Setting up new cloud environments manually requires repetitive configuration across compute, containers, and networking resources.',
      solution: 'Implemented backend services in FastAPI and PostgreSQL, containerized with Docker, with GitHub Actions automating build and deploy on every push.',
      architecture: [
        { layer: 'API Gateway & Auth', icon: 'bi-shield-lock-fill', text: 'FastAPI backend service with token authentication & RBAC' },
        { layer: 'Data Layer', icon: 'bi-database', text: 'PostgreSQL database storing user environments and state metadata' },
        { layer: 'Container Orchestration', icon: 'bi-box-seam', text: 'Docker container runtime + Kubernetes manifest scheduling' },
        { layer: 'IaC Provisioning', icon: 'bi-code-square', text: 'Modular Terraform templates provisioning AWS ECS/ECR resources' },
      ],
      technologies: ['Python', 'FastAPI', 'Docker', 'Kubernetes', 'PostgreSQL', 'Terraform', 'GitHub Actions', 'AWS ECR/ECS'],
    },
    {
      id: 'cicd-pipeline',
      category: 'devops',
      title: 'CI/CD Pipeline with Docker, Kubernetes & AWS',
      badge: 'DevOps & Automation',
      status: 'Completed • 2025',
      github: 'https://github.com/yashbaviskar15/cicd-pipeline',
      shortDesc: 'Automated build-test-deploy pipeline with GitHub Actions, cutting measured release time from 20 minutes to under 4 minutes with zero-downtime rolling updates.',
      problem: 'Manual deployment processes were slow, error-prone, and caused service downtime during application updates.',
      solution: 'Containerized a multi-service application, pushed versioned images to Amazon ECR, and deployed to Kubernetes using rolling updates for zero-downtime redeploys.',
      architecture: [
        { layer: 'Source Trigger', icon: 'bi-git', text: 'Developer git push to GitHub repository' },
        { layer: 'CI Automation', icon: 'bi-gear-wide-connected', text: 'GitHub Actions runner executes automated linting, test suites, and Docker build' },
        { layer: 'Artifact Registry', icon: 'bi-box-seam', text: 'Tagged container image pushed to Amazon Elastic Container Registry (ECR)' },
        { layer: 'CD Orchestration', icon: 'bi-arrow-repeat', text: 'Kubernetes rolling update deployment with zero-downtime health probes' },
      ],
      technologies: ['GitHub Actions', 'Docker', 'Kubernetes (k3s)', 'Amazon ECR', 'AWS CodePipeline', 'Bash', 'YAML'],
    },
    {
      id: 'cloud-monitoring',
      category: 'observability',
      title: 'Cloud Infrastructure Monitoring with Prometheus & Grafana',
      badge: 'Observability & Metrics',
      status: 'Completed • 2024 – 2025',
      github: 'https://github.com/yashbaviskar15/cloud-monitoring',
      shortDesc: 'Provisioned monitoring infrastructure on AWS EC2 with Terraform as version-controlled Infrastructure as Code for repeatable, one-command setup.',
      problem: 'Silent infrastructure failures and delayed incident detection lead to extended service downtime and poor user experience.',
      solution: 'Configured Prometheus scrapers, Node Exporter, and cAdvisor to collect container and host metrics, visualised via 5 tailored Grafana dashboards with Alertmanager thresholds.',
      architecture: [
        { layer: 'Compute Target', icon: 'bi-hdd-rack-fill', text: 'AWS EC2 instances provisioned via version-controlled Terraform' },
        { layer: 'Metrics Exporters', icon: 'bi-activity', text: 'Node Exporter & cAdvisor scraping host and container metrics across 10+ targets' },
        { layer: 'Time-Series Engine', icon: 'bi-cpu', text: 'Prometheus server collecting telemetry with retention policies' },
        { layer: 'Visualization & Alerts', icon: 'bi-speedometer2', text: '5 Grafana dashboards + Alertmanager webhooks' },
      ],
      technologies: ['Prometheus', 'Grafana', 'Alertmanager', 'Node Exporter', 'cAdvisor', 'Terraform', 'AWS EC2', 'Docker'],
    },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const current = projects.find(p => p.id === selectedProject) || projects[0];

  return (
    <div className="flex h-full flex-col md:flex-row select-none">
      {/* Finder Sidebar */}
      <div className="w-full md:w-56 p-3 border-b md:border-b-0 md:border-r border-white/10 bg-white/5 shrink-0 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider px-2">Favorites</span>
            <button
              onClick={() => setActiveCategory('all')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === 'all' ? 'bg-blue-600 text-white' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <i className="bi bi-folder2 text-sky-400" />
              <span>All Projects ({projects.length})</span>
            </button>
            <button
              onClick={() => setActiveCategory('cloud')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === 'cloud' ? 'bg-blue-600 text-white' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <i className="bi bi-cloud-fill text-amber-400" />
              <span>Cloud & IaC</span>
            </button>
            <button
              onClick={() => setActiveCategory('devops')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === 'devops' ? 'bg-blue-600 text-white' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <i className="bi bi-box-seam-fill text-purple-400" />
              <span>DevOps & CI/CD</span>
            </button>
            <button
              onClick={() => setActiveCategory('observability')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === 'observability' ? 'bg-blue-600 text-white' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <i className="bi bi-activity text-emerald-400" />
              <span>Observability</span>
            </button>
          </div>

          {/* Quick List */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider px-2">Repositories</span>
            {filteredProjects.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProject(p.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs truncate transition-colors flex items-center gap-2 ${
                  selectedProject === p.id ? 'bg-white/20 text-white font-semibold' : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <i className="bi bi-hdd-network text-[11px] text-cyan-400" />
                <span className="truncate">{p.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 text-[11px] text-white/50 px-2 flex items-center justify-between">
          <span>4 Cloud Systems</span>
          <i className="bi bi-shield-check text-emerald-400" />
        </div>
      </div>

      {/* Main Project Details Inspector */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto macos-scrollbar space-y-5 bg-black/20">
        {/* Header & Badges */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/15 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10.5px] font-mono">
                {current.badge}
              </span>
              <span className="text-xs text-white/60 font-mono">{current.status}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              {current.title}
            </h2>
          </div>

          <a
            href={current.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md hover:scale-105"
          >
            <i className="bi bi-github text-sm" />
            <span>GitHub Repo</span>
            <i className="bi bi-box-arrow-up-right text-[10px]" />
          </a>
        </div>

        {/* Short Summary */}
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/10">
          {current.shortDesc}
        </p>

        {/* Problem vs Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1.5">
            <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
              <i className="bi bi-exclamation-triangle-fill" /> Problem
            </span>
            <p className="text-xs text-white/75 leading-relaxed">{current.problem}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
            <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <i className="bi bi-check-circle-fill" /> Solution & IaC
            </span>
            <p className="text-xs text-white/75 leading-relaxed">{current.solution}</p>
          </div>
        </div>

        {/* Multi-Tier Architecture Pipeline */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white/90 uppercase tracking-wider font-mono flex items-center gap-2">
            <i className="bi bi-diagram-3-fill text-cyan-400" />
            <span>Architecture Breakdown</span>
          </h3>
          <div className="space-y-2">
            {current.architecture.map((layer, li) => (
              <div
                key={li}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                  <i className={`bi ${layer.icon}`} />
                </div>
                <div>
                  <div className="font-semibold text-white">{layer.layer}</div>
                  <div className="text-white/70 text-[11.5px] mt-0.5">{layer.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <h3 className="text-xs font-bold text-white/90 uppercase tracking-wider font-mono">
            Technologies & Tools
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {current.technologies.map(tech => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-white/90 text-xs font-medium shadow-2xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
