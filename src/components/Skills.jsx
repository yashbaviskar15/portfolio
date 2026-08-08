import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Skills() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');

  const skillCategories = [
    { id: 'cloud', name: t('skills.categories.cloudIac', 'Cloud & IaC'), icon: 'bi-cloud-fill', color: 'text-amber-600 bg-amber-50 border-amber-200/80',
      skills: [
        { name: 'Amazon Web Services (AWS)', desc: 'Core Cloud Provider' },
        { name: 'AWS EC2 & Auto Scaling', desc: 'Compute' },
        { name: 'Amazon S3', desc: 'Object Storage' },
        { name: 'Amazon RDS', desc: 'Managed Databases' },
        { name: 'AWS VPC & Subnets', desc: 'Networking' },
        { name: 'AWS IAM', desc: 'Access Control' },
        { name: 'ALB & CloudFront', desc: 'Traffic Distribution' },
        { name: 'Microsoft Azure', desc: 'IaaS (Learning)' },
        { name: 'Terraform (HCL)', desc: 'Infrastructure as Code' },
        { name: 'AWS CloudFormation', desc: 'Cloud Templates' },
      ],
    },
    { id: 'containers', name: t('skills.categories.containersDevops', 'Containers & DevOps'), icon: 'bi-box-seam-fill', color: 'text-blue-600 bg-blue-50 border-blue-200/80',
      skills: [
        { name: 'Docker', desc: 'Multi-stage Containers' },
        { name: 'Docker Compose', desc: 'Multi-container Setups' },
        { name: 'Kubernetes (k8s)', desc: 'Container Orchestration' },
        { name: 'Amazon ECS & ECR', desc: 'AWS Container Services' },
        { name: 'GitHub Actions', desc: 'CI/CD Workflows' },
        { name: 'AWS CodePipeline', desc: 'Continuous Delivery' },
        { name: 'Prometheus', desc: 'Metrics Collection' },
        { name: 'Grafana', desc: 'Observability Dashboards' },
        { name: 'Alertmanager', desc: 'Incident Triggers' },
      ],
    },
    { id: 'security', name: t('skills.categories.securitySystems', 'Security & Systems'), icon: 'bi-shield-check', color: 'text-emerald-600 bg-emerald-50 border-emerald-200/80',
      skills: [
        { name: 'Linux (Ubuntu / Amazon)', desc: 'Server Administration' },
        { name: 'systemd & cron', desc: 'Process & Job Management' },
        { name: 'Security Groups & NACLs', desc: 'Firewall Rules' },
        { name: 'IAM Least-Privilege', desc: 'Access Policies' },
        { name: 'SSH Key Authentication', desc: 'Secure Login' },
        { name: 'Python', desc: 'Automation & FastAPI' },
        { name: 'Bash / Shell', desc: 'System Scripts' },
        { name: 'Git & GitHub', desc: 'Version Control' },
      ],
    },
  ];

  const filteredCategories = activeTab === 'all' ? skillCategories : skillCategories.filter((c) => c.id === activeTab);

  return (
    <section id="skills" className="py-20 sm:py-28 relative bg-[#F8FAF9] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold tracking-wider uppercase font-heading">
            <i className="bi bi-tools" />
            <span>{t('skills.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            {t('skills.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button type="button" onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTab === 'all' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}`}>
            {t('skills.categories.all', 'All')} ({skillCategories.length})
          </button>
          {skillCategories.map((cat) => (
            <button key={cat.id} type="button" onClick={() => setActiveTab(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === cat.id ? 'bg-purple-600 text-white font-bold shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}`}>
              <i className={`bi ${cat.icon}`} /><span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCategories.map((cat, idx) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }} transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border ${cat.color}`}>
                  <i className={`bi ${cat.icon}`} />
                </div>
                <h3 className="text-sm font-bold font-heading text-slate-900 leading-tight">{cat.name}</h3>
              </div>
              <ul className="space-y-2 text-xs">
                {cat.skills.map((skill) => (
                  <li key={skill.name} className="flex flex-col py-0.5">
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                      <span>{skill.name}</span>
                    </span>
                    <span className="text-[11px] text-slate-500 pl-3 leading-snug">{skill.desc}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{cat.skills.length} {t('skills.tools', 'tools')}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
