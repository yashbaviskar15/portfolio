import React from 'react';
import { FileText, Download, Copy, Check, ExternalLink } from 'lucide-react';
import { portfolioData } from '../../../data/portfolio';

export const ResumeApp: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const resumePlainText = `================================================================================
YASH BAVISKAR
Cloud / DevOps Engineer
+91 96231 66585 | yashbaviskar0215@outlook.com
yashbaviskar.me | linkedin.com/in/yashbaviskar15 | github.com/yashbaviskar15
================================================================================

[PROFESSIONAL SUMMARY]
--------------------------------------------------------------------------------
Cloud / DevOps Engineer with hands-on project experience in AWS,
Terraform, Docker, Kubernetes, and Linux. Built and deployed cloud infrastructure
end-to-end – provisioning with Terraform, containerizing with Docker, and
monitoring with Prometheus and Grafana. Comfortable with Bash scripting,
YAML/JSON configuration, and CI/CD automation.

[TECHNICAL SKILLS]
--------------------------------------------------------------------------------
* Cloud (AWS):                EC2, S3, IAM, VPC, Route 53, RDS, ECS, ECR, ELB, CloudFront
* Infrastructure as Code:     Terraform (modular, provider-based, state-managed deployments)
* Containers & Orchestration: Docker, Kubernetes (Minikube, k3s), Amazon ECS, Amazon ECR
* CI/CD:                      GitHub Actions, AWS CodePipeline, CodeBuild, CodeDeploy
* Monitoring & Observability: Prometheus, Grafana, Alertmanager, Amazon CloudWatch
* Linux / Operating Systems:  Ubuntu Server, Amazon Linux, systemd, cron, log analysis
* Networking:                 VPC/Subnet design (public/private), Route Tables, Internet
                              Gateway, Security Groups, NACLs, DNS, Load Balancers
* Programming & Scripting:    Python, Bash/Shell, YAML, JSON
* Version Control:            Git, GitHub, branching workflows
* Databases:                  PostgreSQL
* Configuration & Security:   IAM least-privilege policies, SSH key-only authentication,
                              UFW, Fail2Ban

[CLOUD / DEVOPS PROJECTS]
--------------------------------------------------------------------------------
1. AWS Three-Tier Web Application Infrastructure
   AWS, Terraform, VPC, EC2, Application Load Balancer, RDS, CloudWatch
   GitHub: github.com/yashbaviskar15/3-tier-app | Completed – 2024
   • Built a three-tier setup on AWS – public/private VPC subnets, an Application
     Load Balancer, EC2, and RDS – keeping presentation, application, and database
     layers separate.
   • Wrote the full stack as Terraform code (VPC, route tables, Internet Gateway,
     security groups, compute), so the environment can be torn down and rebuilt with
     one command.
   • Restricted access with security groups and NACLs following least-privilege principles.
   • Used SSH key-only authentication for all EC2 instances.

2. Cloud Infrastructure Monitoring with Prometheus & Grafana
   AWS EC2, Terraform, Prometheus, Grafana, Docker, Linux
   GitHub: github.com/yashbaviskar15/cloud-monitoring | Completed – 2024 – 2025
   • Provisioned the monitoring infrastructure itself on EC2 using Terraform, so the
     whole setup is version-controlled and repeatable.
   • Ran Prometheus against 10+ containerized services and built 5 Grafana dashboards
     for visibility into system health.
   • Tuned Alertmanager rules, cutting mean time to detection from 15+ minutes to under 2
     in testing.

3. CI/CD Pipeline with Docker, Kubernetes & AWS
   GitHub Actions, Docker, Kubernetes, Amazon ECR/ECS, AWS CodePipeline
   GitHub: github.com/yashbaviskar15/cicd-pipeline | Completed – 2025
   • Set up a GitHub Actions pipeline that builds, tests, and deploys automatically –
     a manual multi-step release became one triggered workflow.
   • Containerized a multi-service application and pushed versioned images to Amazon ECR.
   • Deployed to Kubernetes with rolling updates so a redeploy doesn’t take the service down.

4. Aravanta CloudOS – Cloud Infrastructure Automation Platform
   AWS, Terraform, Docker, Kubernetes, Amazon ECR/ECS, AWS CodePipeline, Python, FastAPI
   GitHub: github.com/yashbaviskar15/acos | In Progress – 2025 – Present
   • Building a self-service cloud provisioning platform on Infrastructure as Code,
     cutting down manual setup before a containerized app can go live.
   • Backend built with FastAPI and PostgreSQL, containerized with Docker.
   • GitHub Actions handles build and deploy automation.

[EDUCATION]
--------------------------------------------------------------------------------
Bachelor of Computer Applications (BCA)
KCES’s Institute of Management and Research, Jalgaon, India | 2023 – 2026 (Expected)

[LANGUAGES]
--------------------------------------------------------------------------------
* English – B2 | German – A1
================================================================================`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(resumePlainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Yash_Baviskar_CV.pdf';
    link.download = 'YASH_BAVISKAR_CV.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const lines = resumePlainText.split('\n');

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-neutral-200 select-none">
      {/* Gedit Top Toolbar */}
      <div className="h-10 px-3 sm:px-4 border-b border-white/10 bg-neutral-900 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-2 font-mono truncate">
          <FileText className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="font-semibold text-white truncate">resume.txt</span>
          <span className="text-[10px] text-neutral-500 font-mono hidden sm:inline">({lines.length} lines • UTF-8)</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyText}
            className="px-2 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
            title="Copy plaintext resume"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="px-2.5 sm:px-3 py-1 rounded-md bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Editor Body with Line Numbers */}
      <div className="flex-1 overflow-y-auto gnome-scrollbar flex font-mono text-xs sm:text-[13px] bg-[#1a1a1a] select-text">
        {/* Line Numbers Gutter */}
        <div className="py-3 px-2 sm:px-2.5 bg-neutral-950/70 text-neutral-600 select-none text-right font-mono border-r border-white/5 space-y-0.5 min-w-8 sm:min-w-10">
          {lines.map((_, i) => (
            <div key={i} className="leading-5 text-[10px] sm:text-[11px]">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Text Content */}
        <div className="p-3 sm:p-4 leading-5 text-neutral-300 whitespace-pre overflow-x-auto space-y-0.5 w-full">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`${
                line.startsWith('[')
                  ? 'text-orange-400 font-bold'
                  : line.startsWith('=') || line.startsWith('-')
                  ? 'text-neutral-500'
                  : 'text-neutral-300'
              }`}
            >
              {line || '\u00A0'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
