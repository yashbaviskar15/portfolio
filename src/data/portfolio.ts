/**
 * Yash Baviskar — Portfolio Data
 * Cloud Support Engineer
 * Content aligned with the official CV. Terraform / CI-CD / monitoring work is
 * described as designed / defined / validated (NOT provisioned or deployed on AWS).
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

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface ExperienceMilestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  category: 'education' | 'project-release';
  desc: string;
  points: string[];
  date: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedDate: string;
  expiryDate?: string;
  verifyUrl: string;
  badgeImageUrl: string;
}

export interface PortfolioData {
  developer: {
    name: string;
    handle: string;
    role: string;
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
    cgpa: string;
    coursework: string[];
  };
  experience: ExperienceItem[];
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
    role: 'Cloud Support Engineer',
    email: 'yashbaviskar0215@outlook.com',
    website: 'https://yashbaviskar.me',
    linkedin: 'https://linkedin.com/in/yashbaviskar15',
    github: 'https://github.com/yashbaviskar15',
    location: 'Jalgaon, Maharashtra, India',
    status: 'Open to relocation to Germany and other EU countries',
    summary:
      'Cloud Support Engineer at IT Digi Solution. I investigate EC2 instance and system status checks, CloudWatch metrics, Linux logs, IAM access issues, Docker container errors and network connectivity problems, document my findings in the ticket, and escalate to a senior engineer for the fix. Comfortable with Linux, Bash, AWS basics, Terraform (designed and validated) and Docker.',
    os: 'Ubuntu 24.04 LTS (Noble Numbat)',
    kernel: 'Linux 6.8.0-generic x86_64',
    shell: 'bash 5.2',
    uptime: 'Cloud support & hands-on lab engineering',
  },
  education: {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: "KCES's Institute of Management and Research",
    location: 'Jalgaon, India (KBCNMU)',
    period: '2023 – 2026',
    cgpa: '8.14 / 10',
    coursework: [
      'Cloud Architecture & Operating Systems',
      'Computer Networks & Subnetting',
      'Relational Database Management Systems (PostgreSQL)',
      'Data Structures & Linux Systems Administration',
    ],
  },
  experience: [
    {
      id: 'it-digi-solution',
      role: 'Cloud Support Engineer',
      company: 'IT Digi Solution',
      location: 'Jalgaon, India',
      period: 'June 2026 – Present',
      bullets: [
        'Investigates EC2 instance/system status checks and CloudWatch metrics, Linux logs, IAM access issues, Docker container errors and network connectivity issues.',
        'Documents findings (status, metrics, time) in the ticket and escalates to a senior engineer for the fix.',
      ],
    },
  ],
  languages: [
    { language: 'English', proficiency: 'B2' },
    { language: 'German', proficiency: 'A1 (learning)' },
    { language: 'Hindi', proficiency: 'Native' },
    { language: 'Marathi', proficiency: 'Native' },
  ],
  technicalSkills: {
    cloudAWS: ['EC2', 'CloudWatch', 'S3', 'IAM', 'VPC', 'Route 53', 'RDS', 'ECS', 'ECR'],
    iac: ['Terraform (designed, defined and validated with plan/validate)'],
    containers: ['Docker', 'Kubernetes (learning the basics)'],
    cicd: ['GitHub Actions'],
    monitoring: ['Prometheus', 'Grafana', 'CloudWatch'],
    linuxOS: ['Ubuntu Server', 'Amazon Linux', 'systemd', 'cron', 'log analysis'],
    networking: ['VPC/Subnet design (public/private)', 'Route Tables', 'Internet Gateway', 'Security Groups', 'DNS', 'Load Balancers'],
    programming: ['Bash / Shell', 'Python (basics)', 'YAML', 'JSON'],
    versionControl: ['Git', 'GitHub'],
    databases: ['PostgreSQL'],
    securityAutomation: ['IAM least-privilege policies', 'SSH key-only authentication', 'UFW'],
  },
  skills: [
    {
      id: 'cloud-aws',
      category: 'Cloud Support (AWS) & Networking',
      icon: 'Cloud',
      items: ['EC2', 'CloudWatch', 'S3', 'IAM', 'VPC', 'Route 53', 'RDS', 'Subnets', 'Security Groups'],
      skills: [
        { name: 'AWS Support Fundamentals', level: 'Core Support', desc: 'EC2 instance & system status checks, CloudWatch metrics and alarms, IAM access triage' },
        { name: 'Networking & Subnets', level: 'Fundamentals', desc: 'Public/private subnet concepts, Route Tables, NAT, Internet Gateways, connectivity triage' },
        { name: 'IAM & Access', level: 'Support', desc: 'Least-privilege policy concepts, security groups, SSH key authentication, UFW' },
      ],
    },
    {
      id: 'iac-devops',
      category: 'Infrastructure as Code & CI/CD',
      icon: 'Code2',
      items: ['Terraform (plan/validate)', 'GitHub Actions', 'YAML', 'JSON'],
      skills: [
        { name: 'Terraform (IaC)', level: 'Designed & validated', desc: 'Modular configuration designed and validated with terraform validate and terraform plan' },
        { name: 'GitHub Actions (CI/CD)', level: 'Defined', desc: 'Workflows defined for linting, tests and container image builds' },
      ],
    },
    {
      id: 'containers-monitoring',
      category: 'Containers, Orchestration & Observability',
      icon: 'Server',
      items: ['Docker', 'Kubernetes (learning basics)', 'Prometheus', 'Grafana', 'CloudWatch'],
      skills: [
        { name: 'Docker Containerization', level: 'Working', desc: 'Multi-stage builds, container isolation, image publishing' },
        { name: 'Kubernetes', level: 'Learning (basics)', desc: 'Studying pod manifests, services and ingress fundamentals' },
        { name: 'Prometheus & Grafana', level: 'Hands-on lab', desc: 'Scrape configuration and dashboards set up in a personal lab' },
      ],
    },
    {
      id: 'linux-scripting',
      category: 'Linux Administration & Scripting',
      icon: 'Terminal',
      items: ['Ubuntu Server', 'Amazon Linux', 'systemd', 'cron', 'Bash', 'Python', 'PostgreSQL', 'Git'],
      skills: [
        { name: 'Ubuntu & Amazon Linux', level: 'Support', desc: 'systemd service units, cron jobs, log analysis, user security' },
        { name: 'Bash & Python', level: 'Automation basics', desc: 'System management scripts, JSON/YAML processing' },
        { name: 'Git & Version Control', level: 'Collaboration', desc: 'Branching workflows and code reviews' },
      ],
    },
  ],
  projects: [
    {
      id: 'aws-three-tier',
      name: 'AWS Three-Tier Web Application Infrastructure (Terraform)',
      category: 'Cloud & IaC',
      status: 'Configuration validated (terraform validate & plan)',
      github: 'https://github.com/yashbaviskar15/3-tier-app',
      repoPath: 'yashbaviskar15/3-tier-app',
      tagline: 'Designed a modular, high-availability three-tier AWS architecture as Terraform infrastructure as code.',
      problem: 'Monolithic single-tier deployments suffer from single points of failure and no isolation between the database and web layers.',
      solution:
        'Designed and defined a three-tier AWS architecture in modular Terraform — public/private VPC subnets, an Application Load Balancer, EC2 and RDS (MySQL) — keeping the presentation, application and database layers separate. Validated the configuration with terraform validate and terraform plan; not applied to a live AWS account.',
      technologies: ['AWS VPC', 'Terraform', 'EC2', 'Application Load Balancer', 'RDS (MySQL)', 'CloudWatch', 'Security Groups', 'IAM'],
      bulletPoints: [
        'Designed and defined a modular three-tier AWS architecture in Terraform (VPC, route tables, Internet Gateway, security groups and compute).',
        'Validated the configuration with terraform validate and terraform plan; the stack was not applied to a live AWS account.',
        'Defined security groups and network ACL rules following least-privilege principles.',
        'Defined SSH key-only authentication for the EC2 instances in the configuration.',
      ],
      metrics: ['Infrastructure as Code', 'Terraform validate + plan verified', 'Multi-tier network design'],
    },
    {
      id: 'cloud-monitoring',
      name: 'Cloud Infrastructure Monitoring with Prometheus & Grafana',
      category: 'Observability',
      status: 'Hands-on lab',
      github: 'https://github.com/yashbaviskar15/cloud-monitoring',
      repoPath: 'yashbaviskar15/cloud-monitoring',
      tagline: 'Defined a Prometheus + Grafana telemetry setup for container and host metrics in a personal lab.',
      problem: 'Silent service degradations and delayed detection make problems harder to notice.',
      solution:
        'Defined a Prometheus and Grafana configuration for host and container metrics, and built dashboards to visualise system health in a personal lab environment.',
      technologies: ['Prometheus', 'Grafana', 'Docker', 'Linux'],
      bulletPoints: [
        'Defined Prometheus scrape configurations for node and container metrics in a personal lab.',
        'Built Grafana dashboards to visualise system and container health.',
        'Studied alerting rules to understand how degradation could be detected earlier.',
      ],
      metrics: ['Prometheus scrape config', 'Grafana dashboards', 'Container & host metrics'],
    },
    {
      id: 'cicd-pipeline',
      name: 'CI/CD Pipeline with Docker, GitHub Actions & AWS',
      category: 'DevOps & CI/CD',
      status: 'Workflow defined',
      github: 'https://github.com/yashbaviskar15/cicd-pipeline',
      repoPath: 'yashbaviskar15/cicd-pipeline',
      tagline: 'Defined a GitHub Actions workflow to lint, test and build container images.',
      problem: 'Manual multi-step release workflows are error-prone and hard to repeat.',
      solution:
        'Defined a GitHub Actions workflow that runs linting and tests, then builds container images. The deploy stage targets Kubernetes, where I am learning the basics using locally validated manifests.',
      technologies: ['GitHub Actions', 'Docker', 'Kubernetes (learning basics)', 'Amazon ECR', 'Bash', 'YAML'],
      bulletPoints: [
        'Defined a GitHub Actions workflow that runs linting and tests, then builds container images.',
        'Defined container image publishing steps for Amazon ECR.',
        'Defined Kubernetes manifests and validated them locally while learning the basics.',
      ],
      metrics: ['GitHub Actions workflow', 'Container image build', 'Locally validated manifests'],
    },
    {
      id: 'aravanta-cloudos',
      name: 'Aravanta CloudOS — Cloud Infrastructure Automation Platform',
      category: 'DevOps & CI/CD',
      status: 'In progress',
      github: 'https://github.com/yashbaviskar15/acos',
      repoPath: 'yashbaviskar15/acos',
      tagline: 'An in-progress self-service cloud provisioning platform built on infrastructure as code.',
      problem: 'Repetitive manual setup of cloud compute, databases and networking slows down getting an app live.',
      solution:
        'Building a self-service cloud provisioning platform on infrastructure as code to reduce manual setup before a containerized app can go live.',
      technologies: ['AWS', 'Terraform', 'Docker', 'Python', 'FastAPI', 'PostgreSQL'],
      bulletPoints: [
        'Building a self-service provisioning platform on infrastructure as code to reduce manual setup.',
        'Backend built with FastAPI and PostgreSQL, containerized with Docker.',
        'GitHub Actions defined for build and publish automation.',
      ],
      metrics: ['Self-service provisioning', 'FastAPI & PostgreSQL backend', 'Containerized architecture'],
    },
  ],
  contact: {
    email: 'yashbaviskar0215@outlook.com',
    phone: '+91 96231 66585',
    github: 'https://github.com/yashbaviskar15',
    linkedin: 'https://linkedin.com/in/yashbaviskar15',
    website: 'https://yashbaviskar.me',
    location: 'Jalgaon, Maharashtra, India',
  },
  terminalFiles: [
    { name: 'about.txt', type: 'file', size: '2.4K' },
    { name: 'projects/', type: 'dir', size: '4.0K' },
    { name: 'skills.txt', type: 'file', size: '1.9K' },
    { name: 'resume.txt', type: 'file', size: '3.8K' },
    { name: 'contact.md', type: 'file', size: '1.1K' },
  ],
};
