import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';
import { useLanguage } from '../context/LanguageContext';

const bentoSkills = [
  {
    id: 'cloud-aws-azure',
    categoryKey: 'cloudIac',
    title: 'Cloud Platforms (AWS & Azure)',
    icon: 'bi-cloud-fill',
    bgColor: 'bg-amber-500/10 text-amber-600 border-amber-200/60',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/80',
    span: 'lg:col-span-8',
    skills: ['AWS (EC2, S3, IAM, VPC, Route 53, Lambda)', 'Amazon RDS, ECS, ECR, ELB, CloudFront', 'Microsoft Azure (Core Compute, Storage, Networking)'],
  },
  {
    id: 'iac',
    categoryKey: 'cloudIac',
    title: 'Infrastructure as Code',
    icon: 'bi-code-square',
    bgColor: 'bg-purple-500/10 text-purple-600 border-purple-200/60',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/80',
    span: 'lg:col-span-4',
    skills: ['Terraform (Modular & State-Managed)', 'AWS CloudFormation', 'Ansible Automation', 'AWS CLI'],
  },
  {
    id: 'containers',
    categoryKey: 'containersDevops',
    title: 'Containers & Orchestration',
    icon: 'bi-box-seam-fill',
    bgColor: 'bg-blue-500/10 text-blue-600 border-blue-200/60',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/80',
    span: 'lg:col-span-4',
    skills: ['Docker Containerization', 'Kubernetes (Minikube, k3s)', 'Amazon ECS', 'Amazon ECR'],
  },
  {
    id: 'cicd',
    categoryKey: 'containersDevops',
    title: 'CI/CD & Automation',
    icon: 'bi-git',
    bgColor: 'bg-rose-500/10 text-rose-600 border-rose-200/60',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200/80',
    span: 'lg:col-span-4',
    skills: ['GitHub Actions Workflows', 'AWS CodePipeline', 'AWS CodeBuild', 'AWS CodeDeploy'],
  },
  {
    id: 'monitoring',
    categoryKey: 'securitySystems',
    title: 'Monitoring & Observability',
    icon: 'bi-activity',
    bgColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-200/60',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    span: 'lg:col-span-4',
    skills: ['Prometheus Scrapers', 'Grafana Dashboards', 'Alertmanager Thresholds', 'Amazon CloudWatch'],
  },
  {
    id: 'networking',
    categoryKey: 'cloudIac',
    title: 'Cloud Networking',
    icon: 'bi-diagram-3-fill',
    bgColor: 'bg-indigo-500/10 text-indigo-600 border-indigo-200/60',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    span: 'lg:col-span-4',
    skills: ['VPC & Subnet Design', 'Route Tables & IGW', 'Security Groups & NACLs', 'DNS, Load Balancers & Nginx'],
  },
  {
    id: 'security',
    categoryKey: 'securitySystems',
    title: 'Security & Access Control',
    icon: 'bi-shield-lock-fill',
    bgColor: 'bg-purple-500/10 text-purple-600 border-purple-200/60',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/80',
    span: 'lg:col-span-4',
    skills: ['IAM Least-Privilege Policies', 'SSH Key-Only Auth', 'UFW Deny-by-Default', 'Fail2Ban & Secrets Mgmt'],
  },
  {
    id: 'linux',
    categoryKey: 'securitySystems',
    title: 'Linux Administration',
    icon: 'bi-hdd-rack-fill',
    bgColor: 'bg-teal-500/10 text-teal-600 border-teal-200/60',
    badgeBg: 'bg-teal-50 text-teal-700 border-teal-200/80',
    span: 'lg:col-span-4',
    skills: ['Ubuntu Server & Amazon Linux', 'Systemd Services & Cron', 'Log Analysis & Troubleshooting', 'RedHat Fundamentals'],
  },
  {
    id: 'scripting',
    categoryKey: 'containersDevops',
    title: 'Programming & Scripting',
    icon: 'bi-terminal-fill',
    bgColor: 'bg-violet-500/10 text-violet-600 border-violet-200/60',
    badgeBg: 'bg-violet-50 text-violet-700 border-violet-200/80',
    span: 'lg:col-span-4',
    skills: ['Python (Infrastructure Automation)', 'Bash / Shell Scripting', 'YAML Manifests', 'JSON Configs'],
  },
  {
    id: 'version-control',
    categoryKey: 'containersDevops',
    title: 'Version Control & Tooling',
    icon: 'bi-github',
    bgColor: 'bg-slate-500/10 text-slate-700 border-slate-200/60',
    badgeBg: 'bg-slate-100 text-slate-700 border-slate-200/80',
    span: 'lg:col-span-4',
    skills: ['Git Branching Workflows', 'GitHub Repositories & PRs', 'VS Code DevOps Tooling', 'CI Integration'],
  },
  {
    id: 'cost-optimization',
    categoryKey: 'cloudIac',
    title: 'Cost Optimization',
    icon: 'bi-currency-dollar',
    bgColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-200/60',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    span: 'lg:col-span-4',
    skills: ['AWS Cost Explorer', 'Compute Instance Right-Sizing', 'Resource Tagging Strategy', 'Cost Allocation'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 35, rotateX: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const tagContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.08,
    },
  },
};

const tagItemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Skills() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { key: 'all', label: t('skills.categories.all') },
    { key: 'cloudIac', label: t('skills.categories.cloudIac') },
    { key: 'containersDevops', label: t('skills.categories.containersDevops') },
    { key: 'securitySystems', label: t('skills.categories.securitySystems') },
  ];

  const filteredCards = activeCategory === 'all'
    ? bentoSkills
    : bentoSkills.filter((item) => item.categoryKey === activeCategory);

  return (
    <section id="skills" className="py-24 sm:py-32 relative bg-[#F8FAF9] scroll-mt-20 sm:scroll-mt-24">
      <div className="absolute inset-0 subtle-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
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
            <i className="bi bi-stack" />
            <span>{t('skills.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            {t('skills.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-purple-600 shadow-md shadow-purple-500/20'
                    : 'text-slate-600 bg-white border border-slate-200/90 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Bento Grid Layout - 11 Skills from CV */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card, idx) => (
              <motion.div
                key={card.id}
                layout
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: '-40px' }}
                className={`${card.span} flex flex-col`}
              >
                <TiltCard className="p-6 sm:p-7 bg-white border border-slate-200/90 flex flex-col justify-between h-full shadow-xs hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold border shrink-0 ${card.bgColor}`}>
                        <i className={`bi ${card.icon}`} />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900">
                        {card.title}
                      </h3>
                    </div>

                    {/* Skill Tags */}
                    <motion.div
                      variants={tagContainerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false }}
                      className="flex flex-wrap gap-2 pt-1"
                    >
                      {card.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          variants={tagItemVariants}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold border ${card.badgeBg}`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
