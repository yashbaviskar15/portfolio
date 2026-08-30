/**
 * Official CV and Portfolio * Yash Baviskar — Portfolio Data
 * Cloud / DevOps Engineer
 * Sourced directly from official CV PDF
 */

export interface Project {
  id: string;
  name: string;
  category: 'Cloud & IaC' | 'DevOps & CI/CD' | 'Observability';
  status: string;
  github: string;
  repoPath: string;
  tagline: string;
  problem: string;
  solution: string;
  technologies: string[];
  bulletPoints: string[];
  metrics: string[];
}

export interface SkillCategory {
  id: string;
  category: string;
  icon: string;
  items: string[];
  skills: { name: string; level: string; desc: string }[];
}

export interface PortfolioData {
  developer: {
    name: string;
    handle: string;
    role: string;
    phone: string;
    email: string;
    website: string;
    linkedin: string;
    github: string;
    location: string;
    status: string;
    summary: string;
    os: string;
    kernel: string;
    shell: string;
    uptime: string;
  };
  education: {
    degree: string;
    institution: string;
    location: string;
    period: string;
    coursework: string[];
  };
  languages: { language: string; proficiency: string }[];
  technicalSkills: {
    cloudAWS: string[];
    iac: string[];
    containers: string[];
    cicd: string[];
    monitoring: string[];
    linuxOS: string[];
    networking: string[];
    programming: string[];
    versionControl: string[];
    databases: string[];
    securityAutomation: string[];
  };
  skills: SkillCategory[];
  projects: Project[];
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    website: string;
    location: string;
  };
  terminalFiles: { name: string; type: 'file' | 'dir'; size: string }[];
}

export const portfolioData: PortfolioData = {
  developer: {
    name: 'YASH BAVISKAR',
    handle: 'yashbaviskar15',
    role: 'Cloud / DevOps Engineer',
    phone: '+91 96231 66585',
    email: 'yashbaviskar0215@outlook.com',
    website: 'https://yashbaviskar.me',
    linkedin: 'https://linkedin.com/in/yashbaviskar15',
    github: 'https://github.com/yashbaviskar15',
    location: 'Jalgaon / Pune, Maharashtra, India',
    status: 'Available for Cloud & DevOps Roles',
    summary:
      'Cloud / DevOps Engineer with hands-on project experience in AWS, Terraform, Docker, Kubernetes, and Linux. Built and deployed cloud infrastructure end-to-end – provisioning with Terraform, containerizing with Docker, and monitoring with Prometheus and Grafana. Comfortable with Bash scripting, YAML/JSON configuration, and CI/CD automation.',
    os: 'Ubuntu 24.04 LTS (Noble Numbat)',
    kernel: 'Linux 6.8.0-generic x86_64',
    shell: 'zsh 5.9 / bash 5.2',
    uptime: '2+ Years Project & Lab Engineering',
  },
  education: {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: "KCES's Institute of Management and Research",
    location: 'Jalgaon, India',
    period: '2023 – 2026 (Expected)',
    coursework: [
      'Cloud Architecture & Operating Systems',
      'Computer Networks & Subnetting',
      'Relational Database Management Systems (PostgreSQL)',
      'Data Structures & Linux Systems Administration',
    ],
  },
  languages: [
    { language: 'English', proficiency: 'B2 (Professional Working)' },
    { language: 'German', proficiency: 'A1 (Beginner)' },
  ],
  technicalSkills: {
    cloudAWS: ['EC2', 'S3', 'IAM', 'VPC', 'Route 53', 'RDS', 'ECS', 'ECR', 'ELB', 'CloudFront'],
    iac: ['Terraform (modular, provider-based, state-managed deployments)'],
    containers: ['Docker', 'Kubernetes (Minikube, k3s)', 'Amazon ECS', 'Amazon ECR'],
    cicd: ['GitHub Actions', 'AWS CodePipeline', 'CodeBuild', 'CodeDeploy'],
    monitoring: ['Prometheus', 'Grafana', 'Alertmanager', 'Amazon CloudWatch'],
    linuxOS: ['Ubuntu Server', 'Amazon Linux', 'systemd', 'cron', 'log analysis'],
    networking: ['VPC/Subnet design (public/private)', 'Route Tables', 'Internet Gateway', 'Security Groups', 'NACLs', 'DNS', 'Load Balancers'],
    programming: ['Python', 'Bash / Shell', 'YAML', 'JSON'],
    versionControl: ['Git', 'GitHub', 'Branching workflows'],
    databases: ['PostgreSQL'],
    securityAutomation: ['IAM least-privilege policies', 'SSH key-only authentication', 'UFW', 'Fail2Ban'],
  },
  skills: [
    {
      id: 'cloud-aws',
      category: 'Cloud Infrastructure (AWS) & Networking',
      icon: 'Cloud',
      items: ['EC2', 'S3', 'IAM', 'VPC', 'Route 53', 'RDS', 'ECS', 'ECR', 'ELB', 'CloudFront', 'Subnets', 'NACLs', 'Security Groups'],
      skills: [
        { name: 'Amazon Web Services (AWS)', level: 'Core Cloud', desc: 'VPC, EC2, RDS, S3, IAM least-privilege, Route 53, ALB, CloudFront' },
        { name: 'Networking & Subnets', level: 'Architecture', desc: 'Public/Private subnet segmentation, Route Tables, NAT, Internet Gateways' },
        { name: 'IAM Security & Firewalls', level: 'Security', desc: 'Least-privilege policies, security groups, NACLs, SSH key authentication, UFW' },
      ],
    },
    {
      id: 'iac-devops',
      category: 'Infrastructure as Code & CI/CD Pipelines',
      icon: 'Code2',
      items: ['Terraform', 'GitHub Actions', 'AWS CodePipeline', 'CodeBuild', 'CodeDeploy', 'YAML', 'JSON'],
      skills: [
        { name: 'Terraform (IaC)', level: 'Modular Deployments', desc: 'Modular, provider-based, state-managed cloud infrastructure automation' },
        { name: 'GitHub Actions (CI/CD)', level: 'Continuous Delivery', desc: 'Automated linting, test suites, container builds, and Kubernetes rollouts' },
        { name: 'AWS CodePipeline', level: 'AWS Native', desc: 'End-to-end build, test, and deploy orchestration with CodeBuild & CodeDeploy' },
      ],
    },
    {
      id: 'containers-monitoring',
      category: 'Containers, Orchestration & Observability',
      icon: 'Server',
      items: ['Docker', 'Kubernetes (Minikube, k3s)', 'Amazon ECS/ECR', 'Prometheus', 'Grafana', 'Alertmanager', 'CloudWatch'],
      skills: [
        { name: 'Docker Containerization', level: 'Packaging', desc: 'Multi-stage builds, container isolation, image publishing to Amazon ECR' },
        { name: 'Kubernetes (k3s / Minikube)', level: 'Orchestration', desc: 'Pod manifests, services, ingress, and zero-downtime rolling updates' },
        { name: 'Prometheus & Grafana', level: 'Observability', desc: '10+ container scrape targets, 5 tailored dashboards, Alertmanager tuning' },
      ],
    },
    {
      id: 'linux-scripting',
      category: 'Linux Administration & Scripting',
      icon: 'Terminal',
      items: ['Ubuntu Server', 'Amazon Linux', 'systemd', 'cron', 'Bash', 'Python', 'PostgreSQL', 'Git'],
      skills: [
        { name: 'Ubuntu & Amazon Linux', level: 'Server Administration', desc: 'systemd service units, cron automated jobs, log analysis, user security' },
        { name: 'Python & Bash Scripting', level: 'Automation', desc: 'System management scripts, REST services, FastAPI, JSON/YAML processing' },
        { name: 'Git & Version Control', level: 'Collaboration', desc: 'Branching workflows, code reviews, semantic version tagging' },
      ],
    },
  ],
  projects: [
    {
      id: '3-tier-app',
      name: 'AWS Three-Tier Web Application Infrastructure',
      category: 'Cloud & IaC',
      status: 'Completed – 2024',
      github: 'https://github.com/yashbaviskar15/3-tier-app',
      repoPath: 'yashbaviskar15/3-tier-app',
      tagline: 'High-availability multi-tier architecture deployed with modular Terraform IaC.',
      problem: 'Monolithic single-tier deployments suffer from single points of failure, lack of isolation between database and web layers, and manual configuration bottlenecks.',
      solution: 'Built a three-tier setup on AWS – public/private VPC subnets, an Application Load Balancer, EC2, and RDS – keeping presentation, application, and database layers separate.',
      technologies: ['AWS VPC', 'Terraform', 'EC2', 'Application Load Balancer', 'RDS (MySQL)', 'CloudWatch', 'Security Groups', 'IAM'],
      bulletPoints: [
        'Built a three-tier setup on AWS – public/private VPC subnets, an Application Load Balancer, EC2, and RDS – keeping presentation, application, and database layers separate.',
        'Wrote the full stack as Terraform code (VPC, route tables, Internet Gateway, security groups, compute), so the environment can be torn down and rebuilt with one command.',
        'Restricted access with security groups and NACLs following least-privilege principles.',
        'Used SSH key-only authentication for all EC2 instances.',
      ],
      metrics: ['100% Infrastructure as Code', 'Multi-AZ Database Isolation', 'One-Command Deployment'],
    },
    {
      id: 'cloud-monitoring',
      name: 'Cloud Infrastructure Monitoring with Prometheus & Grafana',
      category: 'Observability',
      status: 'Completed – 2024 – 2025',
      github: 'https://github.com/yashbaviskar15/cloud-monitoring',
      repoPath: 'yashbaviskar15/cloud-monitoring',
      tagline: 'End-to-end container & host telemetry stack provisioned on AWS EC2 with Terraform.',
      problem: 'Silent production service degradations and delayed incident detection lead to extended downtime.',
      solution: 'Provisioned the monitoring infrastructure itself on EC2 using Terraform, running Prometheus against 10+ containerized services and building 5 Grafana dashboards.',
      technologies: ['AWS EC2', 'Terraform', 'Prometheus', 'Grafana', 'Alertmanager', 'Docker', 'Linux'],
      bulletPoints: [
        'Provisioned the monitoring infrastructure itself on EC2 using Terraform, so the whole setup is version-controlled and repeatable.',
        'Ran Prometheus against 10+ containerized services and built 5 Grafana dashboards for visibility into system health.',
        'Tuned Alertmanager rules, cutting mean time to detection from 15+ minutes to under 2 in testing.',
      ],
      metrics: ['10+ Monitored Services', '5 Tailored Grafana Dashboards', 'MTTD cut from 15m+ to <2m'],
    },
    {
      id: 'cicd-pipeline',
      name: 'CI/CD Pipeline with Docker, Kubernetes & AWS',
      category: 'DevOps & CI/CD',
      status: 'Completed – 2025',
      github: 'https://github.com/yashbaviskar15/cicd-pipeline',
      repoPath: 'yashbaviskar15/cicd-pipeline',
      tagline: 'Automated GitHub Actions release pipeline with zero-downtime Kubernetes rolling updates.',
      problem: 'Manual multi-step release workflows were error-prone and caused service downtime during deployments.',
      solution: 'Set up a GitHub Actions pipeline that builds, tests, and deploys automatically – transforming a manual multi-step release into one triggered workflow.',
      technologies: ['GitHub Actions', 'Docker', 'Kubernetes (k3s)', 'Amazon ECR/ECS', 'AWS CodePipeline', 'Bash', 'YAML'],
      bulletPoints: [
        'Set up a GitHub Actions pipeline that builds, tests, and deploys automatically – a manual multi-step release became one triggered workflow.',
        'Containerized a multi-service application and pushed versioned images to Amazon ECR.',
        'Deployed to Kubernetes with rolling updates so a redeploy doesn’t take the service down.',
      ],
      metrics: ['Zero Downtime Deployments', 'Automated ECR Image Push', 'One Triggered Workflow'],
    },
    {
      id: 'aravanta-cloudos',
      name: 'Aravanta CloudOS — Cloud Infrastructure Automation Platform',
      category: 'DevOps & CI/CD',
      status: 'In Progress – 2025 – Present',
      github: 'https://github.com/yashbaviskar15/acos',
      repoPath: 'yashbaviskar15/acos',
      tagline: 'Self-service cloud provisioning platform on Infrastructure as Code.',
      problem: 'Repetitive manual setup of cloud compute, databases, and networking delays developer onboarding.',
      solution: 'Building a self-service cloud provisioning platform on Infrastructure as Code, cutting down manual setup before a containerized app can go live.',
      technologies: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'Amazon ECR/ECS', 'AWS CodePipeline', 'Python', 'FastAPI', 'PostgreSQL'],
      bulletPoints: [
        'Building a self-service cloud provisioning platform on Infrastructure as Code, cutting down manual setup before a containerized app can go live.',
        'Backend built with FastAPI and PostgreSQL, containerized with Docker.',
        'GitHub Actions handles build and deploy automation.',
      ],
      metrics: ['Self-Service Cloud Provisioning', 'FastAPI & PostgreSQL Backend', 'Containerized Architecture'],
    },
  ],
  contact: {
    email: 'yashbaviskar0215@outlook.com',
    phone: '+91 96231 66585',
    github: 'https://github.com/yashbaviskar15',
    linkedin: 'https://linkedin.com/in/yashbaviskar15',
    website: 'https://yashbaviskar.me',
    location: 'Jalgaon / Pune, Maharashtra, India',
  },
  terminalFiles: [
    { name: 'about.txt', type: 'file', size: '2.4K' },
    { name: 'projects/', type: 'dir', size: '4.0K' },
    { name: 'skills.txt', type: 'file', size: '1.9K' },
    { name: 'resume.txt', type: 'file', size: '3.8K' },
    { name: 'contact.md', type: 'file', size: '1.1K' },
  ],
};
