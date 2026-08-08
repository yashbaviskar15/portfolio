import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const learningTracks = [
  {
    icon: 'bi-cloud-check-fill',
    title: 'AWS Cloud Architecture & Compute',
    issuer: 'Amazon Web Services Focus',
    status: 'Applied in Production Projects',
    statusBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    desc: 'Hands-on design of VPC networks, public/private subnets, Application Load Balancers, EC2 auto-recovery, IAM least privilege, and Amazon RDS multi-AZ databases.',
    tags: ['AWS VPC', 'EC2', 'RDS', 'IAM', 'ALB', 'S3'],
  },
  {
    icon: 'bi-code-square',
    title: 'Terraform Infrastructure as Code (IaC)',
    issuer: 'HashiCorp HCL Methodology',
    status: 'Version-Controlled IaC',
    statusBg: 'bg-purple-50 text-purple-700 border-purple-200',
    desc: 'Modular, provider-based state management, automated environment provisioning, variable separation, and one-command infrastructure teardown.',
    tags: ['Terraform', 'State Management', 'CloudFormation', 'Modules'],
  },
  {
    icon: 'bi-box-seam-fill',
    title: 'Docker & Kubernetes Container Lifecycle',
    issuer: 'Cloud Native Computing Track',
    status: 'Containerized Deployments',
    statusBg: 'bg-blue-50 text-blue-700 border-blue-200',
    desc: 'Multi-stage Docker builds, image publishing to Amazon ECR, Kubernetes pod specs, k3s/Minikube cluster testing, and rolling release automation.',
    tags: ['Docker', 'Kubernetes', 'k3s', 'Amazon ECR', 'ECS'],
  },
  {
    icon: 'bi-terminal-fill',
    title: 'Linux Administration & Automation',
    issuer: 'Systems Engineering Focus',
    status: 'Core Systems Knowledge',
    statusBg: 'bg-slate-100 text-slate-800 border-slate-200',
    desc: 'Ubuntu Server and Amazon Linux administration, systemd service units, cron job scheduling, Bash scripting, and secure SSH key-only access.',
    tags: ['Linux', 'Ubuntu', 'Bash', 'systemd', 'SSH Keys'],
  },
];

export default function Certifications() {
  const { t } = useLanguage();

  return (
    <section id="certifications" className="py-20 sm:py-28 relative bg-[#F8FAF9] border-t border-slate-200/60 scroll-mt-20">
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
            <i className="bi bi-patch-check-fill" />
            <span>Technical Validation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Technical Pathways & Foundations
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Practical hands-on labs, structured technical tracks, and real-world implementation proof across cloud platforms.
          </p>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {learningTracks.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-purple-300/80 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center text-lg font-bold">
                      <i className={`bi ${item.icon}`} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-heading text-slate-900 leading-tight">
                        {item.title}
                      </h3>
                      <span className="text-xs text-slate-500 font-medium">{item.issuer}</span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.statusBg} shrink-0`}>
                    {item.status}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 mt-3 border-t border-slate-100">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-50 text-slate-700 border border-slate-200/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
