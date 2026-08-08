import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const repos = [
  {
    name: '3-tier-app',
    fullName: 'yashbaviskar15/3-tier-app',
    url: 'https://github.com/yashbaviskar15/3-tier-app',
    desc: 'Production-ready Three-Tier AWS Web Infrastructure provisioned via modular Terraform: VPC, public/private subnets, ALB, EC2 compute, Amazon RDS MySQL, and CloudWatch monitoring.',
    tags: ['Terraform', 'AWS VPC', 'EC2', 'ALB', 'RDS MySQL', 'CloudWatch'],
    primaryLang: 'HCL / Terraform',
    langColor: 'bg-purple-600',
  },
  {
    name: 'aravanta-cloudos',
    fullName: 'yashbaviskar15/aravanta-cloudos',
    url: 'https://github.com/yashbaviskar15/aravanta-cloudos',
    desc: 'Self-service Cloud Infrastructure Automation Platform with FastAPI backend, PostgreSQL database, Docker containerization, and automated GitHub Actions build-deploy pipeline.',
    tags: ['Python', 'FastAPI', 'Docker', 'Kubernetes', 'PostgreSQL', 'GitHub Actions'],
    primaryLang: 'Python',
    langColor: 'bg-blue-600',
  },
  {
    name: 'cicd-pipeline',
    fullName: 'yashbaviskar15/cicd-pipeline',
    url: 'https://github.com/yashbaviskar15/cicd-pipeline',
    desc: 'Automated CI/CD build-test-deploy workflow using GitHub Actions, containerizing multi-service apps, pushing versioned images to Amazon ECR, and executing Kubernetes rolling updates.',
    tags: ['GitHub Actions', 'Docker', 'Kubernetes', 'Amazon ECR', 'AWS CodePipeline'],
    primaryLang: 'YAML / Shell',
    langColor: 'bg-amber-600',
  },
  {
    name: 'cloud-monitoring',
    fullName: 'yashbaviskar15/cloud-monitoring',
    url: 'https://github.com/yashbaviskar15/cloud-monitoring',
    desc: 'Complete cloud observability stack with Prometheus scrapers, 5 Grafana dashboards for container & node metrics, and Alertmanager incident thresholds provisioned via Terraform.',
    tags: ['Prometheus', 'Grafana', 'Alertmanager', 'AWS EC2', 'Terraform', 'Linux'],
    primaryLang: 'PromQL / HCL',
    langColor: 'bg-emerald-600',
  },
];

export default function GitHub() {
  const { t } = useLanguage();

  return (
    <section id="github" className="py-20 sm:py-28 relative bg-[#F8FAF9] border-t border-slate-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold tracking-wider uppercase font-heading">
            <i className="bi bi-github text-slate-900" />
            <span>Open-Source Code</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            GitHub Engineering Repositories
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Explore verified, version-controlled Infrastructure as Code, CI/CD automation pipelines, and container orchestration stacks.
          </p>
        </motion.div>

        {/* Repositories 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {repos.map((repo, idx) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-purple-300/80 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Repo Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-base">
                      <i className="bi bi-journal-bookmark-fill" />
                    </div>
                    <div>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-bold font-heading text-slate-900 hover:text-purple-600 transition-colors flex items-center gap-1.5"
                      >
                        <span>{repo.name}</span>
                        <i className="bi bi-box-arrow-up-right text-xs text-slate-400" />
                      </a>
                      <span className="text-[11px] font-mono text-slate-400 block">{repo.fullName}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/70">
                    <span className={`w-2 h-2 rounded-full ${repo.langColor}`} />
                    <span>{repo.primaryLang}</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {repo.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {repo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-50 text-slate-700 border border-slate-200/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action & Clone snippet */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1.5 transition-colors"
                >
                  <i className="bi bi-code-slash" />
                  <span>Inspect Code on GitHub</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`git clone ${repo.url}.git`);
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-[11px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                  title="Copy git clone command"
                >
                  <i className="bi bi-clipboard" />
                  <span>git clone</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Direct GitHub Profile Banner */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xl shrink-0">
              <i className="bi bi-github" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold font-heading text-slate-900">
                github.com/yashbaviskar15
              </h4>
              <p className="text-xs text-slate-500">
                Check all branches, commits, Terraform modules, and GitHub Actions workflows.
              </p>
            </div>
          </div>

          <a
            href="https://github.com/yashbaviskar15"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all hover:-translate-y-0.5 shrink-0"
          >
            <span>Visit Full GitHub Profile</span>
            <i className="bi bi-arrow-right text-xs" />
          </a>
        </div>
      </div>
    </section>
  );
}
