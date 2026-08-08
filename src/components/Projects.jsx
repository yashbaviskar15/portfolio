import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Projects() {
  const { t } = useLanguage();
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: '3-tier-app',
      featured: true,
      title: 'AWS Three-Tier Web Application Infrastructure',
      badge: 'Featured Cloud Project',
      status: t('projects.statusCompleted2024', 'Completed • 2024'),
      github: 'https://github.com/yashbaviskar15/3-tier-app',
      shortDesc: t('projects.p2H1', 'Designed and deployed a highly available three-tier AWS architecture - public/private subnets, ALB, EC2, RDS - isolating presentation, application, and database layers for scalability and fault tolerance.'),
      problem: 'Deploying web applications with hardcoded single-server topologies creates single points of failure, security risks, and unpredictable manual setup.',
      solution: t('projects.p2H2', 'Provisioned the full stack as version-controlled Terraform code: VPC, route tables, Internet Gateway, security groups, and compute - enabling repeatable, one-command redeployment.'),
      architectureDiagram: [
        { layer: 'Public Ingress', icon: 'bi-globe', text: 'Internet Gateway → Route 53 DNS → Application Load Balancer (ALB)' },
        { layer: 'Presentation / Web Tier', icon: 'bi-hdd-network', text: 'Public Subnets: EC2 Web Instances with strictly bounded ingress rules' },
        { layer: 'Application Logic Tier', icon: 'bi-cpu', text: 'Private Subnets: EC2 App instances communicating exclusively via internal security groups' },
        { layer: 'Database Tier', icon: 'bi-database-fill', text: 'Isolated Private Subnets: Multi-AZ Amazon RDS (MySQL) with automated backups' },
        { layer: 'Security & Telemetry', icon: 'bi-shield-check', text: 'IAM least-privilege instance profiles + Amazon CloudWatch alarm monitoring' },
      ],
      technologies: ['AWS VPC', 'Terraform', 'EC2', 'Application Load Balancer', 'Amazon RDS', 'Security Groups', 'NACLs', 'CloudWatch', 'IAM'],
      keyImplementations: [
        t('projects.p2H2', 'Modular Terraform HCL code separating VPC, compute, and database states for clean reusability.'),
        t('projects.p2H3', 'Load-balanced traffic across multiple EC2 instances and enforced strict network segmentation between tiers.'),
        'CloudWatch health alarms monitoring instance CPU utilization and RDS storage thresholds.',
        'Repeatable one-command deployment (`terraform apply`) enabling full stack reproduction.',
      ],
      security: 'Least-privilege IAM policies, security group chaining, NACLs, private subnet isolation, and SSH key authentication.',
    },
    {
      id: 'aravanta-cloudos',
      featured: false,
      title: 'Aravanta CloudOS — Cloud Infrastructure Platform',
      badge: 'Experimental Engineering',
      status: t('projects.statusInProgress', 'In Progress • 2025 – Present'),
      github: 'https://github.com/yashbaviskar15/aravanta-cloudos',
      shortDesc: t('projects.p1H1', 'Building a self-service platform for provisioning cloud resources and deploying containerized applications through Infrastructure as Code, targeting reduced manual setup time for new environments.'),
      problem: 'Setting up new cloud environments manually requires repetitive configuration across compute, containers, and networking resources.',
      solution: t('projects.p1H2', 'Implemented backend services in FastAPI and PostgreSQL, containerized with Docker, with GitHub Actions automating build and deploy on every push.'),
      architectureDiagram: [
        { layer: 'API Gateway & Auth', icon: 'bi-shield-lock-fill', text: 'FastAPI backend service with token authentication & RBAC' },
        { layer: 'Data Layer', icon: 'bi-database', text: 'PostgreSQL database storing user environments and state metadata' },
        { layer: 'Container Orchestration', icon: 'bi-box-seam', text: 'Docker container runtime + Kubernetes manifest scheduling' },
        { layer: 'IaC Provisioning', icon: 'bi-code-square', text: 'Modular Terraform templates provisioning AWS ECS/ECR resources' },
      ],
      technologies: ['Python', 'FastAPI', 'Docker', 'Kubernetes', 'PostgreSQL', 'Terraform', 'GitHub Actions', 'AWS ECR/ECS'],
      keyImplementations: [
        t('projects.p1H2', 'FastAPI REST API handling environment registration and container state tracking.'),
        t('projects.p1H3', 'Integrating Prometheus, Grafana, centralized logging, and role-based access control (RBAC).'),
        'Docker Compose & Kubernetes manifests for local reproduction and cluster deployments.',
      ],
      statusBreakdown: {
        implemented: ['FastAPI Backend', 'PostgreSQL Data Layer', 'Docker Containerization', 'GitHub Actions CI/CD', 'Terraform AWS Modules'],
        planned: ['Multi-Tenant Kubernetes Operator', 'Dynamic Cluster Autoscaling', 'Automated Cost Anomaly Alerts'],
      },
      security: 'Environment variable secret injection, container vulnerability scanning, and isolated network bridges.',
    },
    {
      id: 'cicd-pipeline',
      featured: false,
      title: 'CI/CD Pipeline with Docker, Kubernetes & AWS',
      badge: 'DevOps & Automation',
      status: t('projects.statusCompleted2025', 'Completed • 2025'),
      github: 'https://github.com/yashbaviskar15/cicd-pipeline',
      shortDesc: t('projects.p3H1', 'Built an automated build-test-deploy pipeline with GitHub Actions, cutting measured release time from 20 minutes to under 4 minutes in the project’s test environment.'),
      problem: 'Manual deployment processes were slow, error-prone, and caused service downtime during application updates.',
      solution: t('projects.p3H2', 'Containerized a multi-service application, pushed versioned images to Amazon ECR, and deployed to Kubernetes using rolling updates for zero-downtime redeploys.'),
      architectureDiagram: [
        { layer: 'Source Trigger', icon: 'bi-git', text: 'Developer git push to GitHub repository' },
        { layer: 'CI Automation', icon: 'bi-gear-wide-connected', text: 'GitHub Actions runner executes automated linting, test suites, and Docker build' },
        { layer: 'Artifact Registry', icon: 'bi-box-seam', text: 'Tagged container image pushed to Amazon Elastic Container Registry (ECR)' },
        { layer: 'CD Orchestration', icon: 'bi-arrow-repeat', text: 'Kubernetes rolling update deployment with zero-downtime health probes' },
      ],
      technologies: ['GitHub Actions', 'Docker', 'Kubernetes (k3s)', 'Amazon ECR', 'AWS CodePipeline', 'Bash', 'YAML'],
      keyImplementations: [
        t('projects.p3H1', 'Automated build-test-deploy pipeline cutting release time from 20 minutes to under 4 minutes.'),
        t('projects.p3H2', 'Kubernetes rolling update strategy preventing downtime during new container rollouts.'),
        t('projects.p3H3', 'Orchestrated the release workflow end-to-end via AWS CodePipeline, CodeBuild, and CodeDeploy.'),
      ],
      security: 'Least-privilege IAM deployment roles, signed Git commits, and ephemeral container instances.',
    },
    {
      id: 'cloud-monitoring',
      featured: false,
      title: 'Cloud Infrastructure Monitoring with Prometheus & Grafana',
      badge: 'Observability & Metrics',
      status: t('projects.statusCompletedMulti', 'Completed • 2024 – 2025'),
      github: 'https://github.com/yashbaviskar15/cloud-monitoring',
      shortDesc: t('projects.p4H1', 'Provisioned monitoring infrastructure on AWS EC2 with Terraform as version-controlled Infrastructure as Code for repeatable, one-command setup.'),
      problem: 'Silent infrastructure failures and delayed incident detection lead to extended service downtime and poor user experience.',
      solution: t('projects.p4H2', 'Configured Prometheus scrapers, Node Exporter, and cAdvisor to collect container and host metrics, visualised via 5 tailored Grafana dashboards with Alertmanager thresholds.'),
      architectureDiagram: [
        { layer: 'Compute Target', icon: 'bi-hdd-rack-fill', text: 'AWS EC2 instances provisioned via version-controlled Terraform' },
        { layer: 'Metrics Exporters', icon: 'bi-activity', text: 'Node Exporter & cAdvisor scraping host and container metrics across 10+ targets' },
        { layer: 'Prometheus Engine', icon: 'bi-speedometer2', text: 'Prometheus time-series database with custom PromQL queries and retention' },
        { layer: 'Visualization & Alerts', icon: 'bi-bar-chart-line-fill', text: '5 Grafana dashboards + Alertmanager threshold triggers (MTTD < 2 mins)' },
      ],
      technologies: ['Prometheus', 'Grafana', 'Alertmanager', 'AWS EC2', 'Terraform', 'Docker', 'Linux', 'PromQL'],
      keyImplementations: [
        t('projects.p4H1', 'Provisioned complete monitoring host with Terraform as reproducible Infrastructure as Code.'),
        t('projects.p4H2', 'Constructed 5 Grafana dashboards displaying CPU, memory, network I/O, and container health.'),
        t('projects.p4H3', 'Reduced mean time to detect (MTTD) incidents to under 2 minutes through automated threshold triggers.'),
      ],
      security: 'Reverse proxy authentication, private metrics scrapers, and secure firewall rules.',
    },
  ];

  return (
    <section id="projects" className="py-20 sm:py-28 relative bg-[#F8FAF9] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold tracking-wider uppercase font-heading">
            <i className="bi bi-folder-check" />
            <span>{t('projects.badge', 'Featured Work')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            {t('projects.title', 'Cloud & Automation Projects')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('projects.subtitle', 'Hands-on cloud infrastructure implementations with Terraform IaC, containers, CI/CD, and Prometheus.')}
          </p>
        </motion.div>

        {/* Featured Project Showcase (Major Highlight) */}
        {projects.filter((p) => p.featured).map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-purple-200/80 shadow-md relative overflow-hidden space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-bold tracking-wider uppercase">
                  {p.badge}
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">{p.status}</span>
              </div>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-purple-600 transition-colors"
              >
                <i className="bi bi-github text-sm" />
                <span>{t('projects.viewRepo', 'View Repository on GitHub')}</span>
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                  {p.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {p.shortDesc}
                </p>

                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading block">
                    {t('projects.detailsHeader', 'Key Implementation Details:')}
                  </span>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                    {p.keyImplementations.map((imp) => (
                      <li key={imp} className="flex items-start gap-2">
                        <i className="bi bi-check2-circle text-purple-600 text-sm mt-0.5 shrink-0" />
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {p.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveProject(p)}
                    className="px-5 py-2.5 rounded-xl gradient-btn text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <i className="bi bi-diagram-3-fill" />
                    <span>View Full Architecture & Details</span>
                  </button>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-purple-300 text-slate-800 text-xs font-bold flex items-center gap-2 shadow-2xs transition-all"
                  >
                    <i className="bi bi-github" />
                    <span>Explore Code</span>
                  </a>
                </div>
              </div>

              {/* Visual Architecture Topology Card */}
              <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900 text-white space-y-3 font-mono text-xs border border-slate-800 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[11px] text-purple-400 font-bold">AWS 3-Tier Topology</span>
                  <span className="text-[10px] text-slate-400">Terraform IaC</span>
                </div>
                <div className="space-y-2 py-1">
                  {p.architectureDiagram.map((item, i) => (
                    <div key={item.layer} className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-purple-300 font-bold">
                        <span className="flex items-center gap-1.5">
                          <i className={`bi ${item.icon} text-purple-400`} />
                          <span>{item.layer}</span>
                        </span>
                        <span className="text-[9px] text-slate-400 font-sans">Layer {i + 1}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-sans leading-snug">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* 3-Column Grid for Remaining Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.filter((p) => !p.featured).map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-purple-300/80 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                    {p.badge}
                  </span>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-900 transition-colors"
                    title="View GitHub Repository"
                  >
                    <i className="bi bi-github text-base" />
                  </a>
                </div>

                <h3 className="text-lg font-bold font-heading text-slate-900 leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {p.shortDesc}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {p.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-50 text-slate-700 border border-slate-200/70"
                    >
                      {tech}
                    </span>
                  ))}
                  {p.technologies.length > 5 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400">
                      +{p.technologies.length - 5}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActiveProject(p)}
                  className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <i className="bi bi-diagram-3" />
                  <span>Architecture Details</span>
                </button>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
                >
                  <span>Code</span>
                  <i className="bi bi-arrow-up-right text-[10px]" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recruiter-First Deep Dive Architecture Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden my-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold">
                    <i className="bi bi-diagram-3-fill" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-heading text-slate-900 leading-tight">
                      {activeProject.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-500">{activeProject.status}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <i className="bi bi-github" />
                    <span>View Repository</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveProject(null)}
                    className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <i className="bi bi-x-lg text-xs" />
                  </button>
                </div>
              </div>

              {/* Modal Content Body */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh] custom-scrollbar text-left text-slate-700 text-sm">
                {/* Problem & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
                      Problem Solved
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {activeProject.problem}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 font-heading">
                      Technical Solution
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {activeProject.solution}
                    </p>
                  </div>
                </div>

                {/* Architecture Flow */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-heading flex items-center gap-1.5">
                    <i className="bi bi-diagram-2 text-purple-600" />
                    <span>Architecture & Layer Breakdown</span>
                  </h4>
                  <div className="space-y-2">
                    {activeProject.architectureDiagram.map((item, idx) => (
                      <div key={item.layer} className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
                        <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-slate-900 block font-heading">{item.layer}</strong>
                          <p className="text-xs text-slate-600 leading-snug">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Breakdown for Experimental Projects */}
                {activeProject.statusBreakdown && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-heading">
                      Implementation Status Breakdown (Transparent Audit)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="font-bold text-emerald-700 block mb-1.5 flex items-center gap-1">
                          <i className="bi bi-check-circle-fill text-emerald-600" />
                          <span>Implemented in Codebase:</span>
                        </span>
                        <ul className="space-y-1 text-slate-600 pl-4 list-disc">
                          {activeProject.statusBreakdown.implemented.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-bold text-amber-700 block mb-1.5 flex items-center gap-1">
                          <i className="bi bi-clock-history text-amber-600" />
                          <span>Planned Roadmap Modules:</span>
                        </span>
                        <ul className="space-y-1 text-slate-500 pl-4 list-disc">
                          {activeProject.statusBreakdown.planned.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Technical Highlights */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-heading">
                    Key Implementation Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                    {activeProject.keyImplementations.map((imp) => (
                      <li key={imp} className="flex items-start gap-2">
                        <i className="bi bi-check2 text-purple-600 font-bold shrink-0 mt-0.5" />
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Security & Access Controls */}
                <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 text-xs space-y-1">
                  <strong className="text-white flex items-center gap-1.5 font-heading">
                    <i className="bi bi-shield-lock-fill text-purple-400" />
                    <span>Security & Networking Controls</span>
                  </strong>
                  <p className="text-slate-300 leading-relaxed">{activeProject.security}</p>
                </div>

                {/* Tech Stack Pills */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-heading">
                    Complete Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-mono font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
