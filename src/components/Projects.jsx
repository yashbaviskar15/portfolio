import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';
import { useLanguage } from '../context/LanguageContext';

export default function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 'aravanta-cloudos',
      category: t('projects.catAutomation'),
      icon: 'bi-cpu',
      title: 'Aravanta CloudOS',
      subtitle: t('projects.p1Subtitle'),
      status: t('projects.statusInProgress'),
      terminalSnippet: [
        '$ python -m aravanta.cli deploy --config infra.yaml',
        '✓ FastAPI backend: Connected to PostgreSQL & RBAC auth',
        '✓ Terraform: Provisioning AWS VPC, ECS & ECR resources',
        '✓ GitHub Actions: Automated CI/CD pipeline active'
      ],
      highlights: [
        t('projects.p1H1'),
        t('projects.p1H2'),
        t('projects.p1H3'),
      ],
      tags: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'ECR/ECS', 'Python', 'FastAPI', 'PostgreSQL'],
      github: 'https://github.com/yashbaviskar15/aravanta-cloudos'
    },
    {
      id: 'aws-threetier',
      category: t('projects.catArchitecture'),
      icon: 'bi-diagram-3-fill',
      title: 'AWS Three-Tier Web App',
      subtitle: t('projects.p2Subtitle'),
      status: t('projects.statusCompleted2024'),
      terminalSnippet: [
        '$ terraform apply -target=module.vpc -auto-approve',
        '✓ Amazon VPC: Public & Private subnets created',
        '✓ ALB: Traffic load balancer attached to EC2 instances',
        '✓ Amazon RDS: Deployed in private database tier'
      ],
      highlights: [
        t('projects.p2H1'),
        t('projects.p2H2'),
        t('projects.p2H3'),
      ],
      tags: ['AWS', 'Terraform', 'VPC', 'EC2', 'ALB', 'RDS', 'CloudWatch'],
      github: 'https://github.com/yashbaviskar15/3-tier-app'
    },
    {
      id: 'cicd-k8s',
      category: t('projects.catCicd'),
      icon: 'bi-git',
      title: 'CI/CD Pipeline with K8s & AWS',
      subtitle: t('projects.p3Subtitle'),
      status: t('projects.statusCompleted2025'),
      terminalSnippet: [
        '$ git push origin main',
        '✓ GitHub Actions: Build & Test PASSED (3m 48s)',
        '✓ Docker: Versioned image pushed to Amazon ECR',
        '✓ Kubernetes: Rolling update deployment healthy'
      ],
      highlights: [
        t('projects.p3H1'),
        t('projects.p3H2'),
        t('projects.p3H3'),
      ],
      tags: ['GitHub Actions', 'Docker', 'Kubernetes', 'ECR', 'ECS', 'CodePipeline'],
      github: 'https://github.com/yashbaviskar15/cicd-pipeline'
    },
    {
      id: 'monitoring-iac',
      category: t('projects.catMonitoring'),
      icon: 'bi-activity',
      title: 'Cloud Monitoring with Prometheus',
      subtitle: t('projects.p4Subtitle'),
      status: t('projects.statusCompletedMulti'),
      terminalSnippet: [
        '$ terraform apply -auto-approve',
        '✓ AWS EC2: Monitoring server provisioned with IaC',
        '$ prometheus --config.file=prometheus.yml',
        'STATUS: 10+ targets scraped, 5 Grafana dashboards active'
      ],
      highlights: [
        t('projects.p4H1'),
        t('projects.p4H2'),
        t('projects.p4H3'),
      ],
      tags: ['AWS EC2', 'Terraform', 'Prometheus', 'Grafana', 'Alertmanager'],
      github: 'https://github.com/yashbaviskar15/cloud-monitoring'
    }
  ];

  return (
    <section id="projects" className="py-24 sm:py-32 relative bg-[#F8FAF9] scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1000 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold tracking-wider uppercase font-heading">
            <i className="bi bi-folder-check" />
            <span>{t('projects.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            {t('projects.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Compact 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 35, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <TiltCard className="p-6 bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between h-full">
                {/* Card Header */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center text-lg shrink-0">
                        <i className={`bi ${project.icon}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-heading text-slate-900 leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">{project.subtitle}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md text-[10px] font-bold font-heading border border-purple-100 shrink-0 whitespace-nowrap">
                      {project.status.split('•')[0].trim()}
                    </span>
                  </div>

                  {/* Summary Highlight */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {project.highlights[0]}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 6).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[10px] font-medium border border-slate-200/80"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 6 && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-400 text-[10px] font-medium border border-slate-200/80">
                        +{project.tags.length - 6}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5 pt-5 mt-auto border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all hover:scale-[1.03]"
                  >
                    <i className="bi bi-eye-fill" />
                    <span>{t('projects.quickView')}</span>
                  </button>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-slate-800 font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-all hover:scale-[1.03]"
                  >
                    <i className="bi bi-github text-sm" />
                    <span>{t('projects.codebase')}</span>
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* GitHub Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center pt-4"
        >
          <a
            href="https://github.com/yashbaviskar15"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <i className="bi bi-github text-xl" />
            <span>{t('projects.exploreGithub')}</span>
            <i className="bi bi-arrow-right text-lg" />
          </a>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 space-y-6 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                <i className="bi bi-x-lg text-sm" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
                  <i className={`bi ${selectedProject.icon}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900">{selectedProject.title}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-semibold text-purple-600">{selectedProject.subtitle}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{selectedProject.status}</span>
                  </div>
                </div>
              </div>

              {/* Terminal Snippet */}
              <div className="rounded-2xl bg-slate-900 text-slate-200 p-4 font-mono text-xs border border-slate-800 shadow-lg space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-sans">{selectedProject.category}</span>
                </div>
                <div className="space-y-1.5 leading-relaxed">
                  {selectedProject.terminalSnippet.map((line, i) => (
                    <p
                      key={i}
                      className={
                        line.startsWith('$')
                          ? 'text-purple-400 font-semibold'
                          : line.includes('✓')
                          ? 'text-emerald-400'
                          : 'text-slate-300'
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">{t('projects.detailsHeader')}</h4>
                <div className="space-y-2.5">
                  {selectedProject.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 text-xs sm:text-sm text-slate-700">
                      <i className="bi bi-check-circle-fill text-purple-600 text-base shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm flex items-center gap-2 transition-all"
                >
                  <i className="bi bi-github text-lg" />
                  <span>{t('projects.viewRepo')}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
