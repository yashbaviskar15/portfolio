/**
 * YashOS 24.04 LTS (Portfolio Edition) — Reactive Virtual File System (VFS)
 * Single Source of Truth for Terminal, Nautilus Files, gedit, Evince, and Desktop.
 */

export interface VFSNode {
  name: string;
  type: 'file' | 'folder';
  size?: string;
  permissions?: string;
  owner?: string;
  group?: string;
  updatedAt?: string;
  content?: string;
  binaryUrl?: string;
  isExecutable?: boolean;
  isHidden?: boolean;
  meta?: Record<string, any>;
  children?: Record<string, VFSNode>;
}

export interface TrashItem {
  id: string;
  originalPath: string;
  deletedAt: string;
  node: VFSNode;
}

export const getInitialFileSystem = (): VFSNode => {
  const hardwareConcurrency = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 8 : 8;
  const deviceMemory = typeof (navigator as any) !== 'undefined' && (navigator as any).deviceMemory ? (navigator as any).deviceMemory : 16;

  return {
    name: '/',
    type: 'folder',
    permissions: 'drwxr-xr-x',
    owner: 'root',
    group: 'root',
    updatedAt: 'Apr 24 08:00',
    children: {
      bin: {
        name: 'bin',
        type: 'folder',
        permissions: 'drwxr-xr-x',
        owner: 'root',
        group: 'root',
        updatedAt: 'Apr 24 08:00',
        children: {
          bash: { name: 'bash', type: 'file', size: '1.4 MB', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', isExecutable: true, content: '#!/bin/bash binary' },
          ls: { name: 'ls', type: 'file', size: '142 KB', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', isExecutable: true },
          cat: { name: 'cat', type: 'file', size: '43 KB', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', isExecutable: true },
          grep: { name: 'grep', type: 'file', size: '280 KB', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', isExecutable: true },
          docker: { name: 'docker', type: 'file', size: '78 MB', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', isExecutable: true },
          kubectl: { name: 'kubectl', type: 'file', size: '52 MB', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', isExecutable: true },
          terraform: { name: 'terraform', type: 'file', size: '84 MB', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', isExecutable: true },
          aws: { name: 'aws', type: 'file', size: '36 MB', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', isExecutable: true },
          python3: { name: 'python3', type: 'file', size: '5.8 MB', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', isExecutable: true },
          git: { name: 'git', type: 'file', size: '4.2 MB', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', isExecutable: true },
          htop: { name: 'htop', type: 'file', size: '320 KB', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', isExecutable: true },
          neofetch: { name: 'neofetch', type: 'file', size: '110 KB', permissions: '-rwxr-xr-x', owner: 'root', group: 'root', isExecutable: true },
        },
      },
      etc: {
        name: 'etc',
        type: 'folder',
        permissions: 'drwxr-xr-x',
        owner: 'root',
        group: 'root',
        updatedAt: 'Apr 24 08:00',
        children: {
          hostname: {
            name: 'hostname',
            type: 'file',
            size: '7 B',
            permissions: '-rw-r--r--',
            owner: 'root',
            group: 'root',
            content: 'yashos\n',
          },
          'os-release': {
            name: 'os-release',
            type: 'file',
            size: '348 B',
            permissions: '-rw-r--r--',
            owner: 'root',
            group: 'root',
            content: `NAME="YashOS"
VERSION="24.04 LTS (Noble Numbat - Portfolio Edition)"
ID=yashos
ID_LIKE=ubuntu
PRETTY_NAME="YashOS 24.04 LTS (Portfolio Edition)"
VERSION_ID="24.04"
HOME_URL="https://yashbaviskar.me"
SUPPORT_URL="mailto:yashbaviskar0215@outlook.com"
BUG_REPORT_URL="https://github.com/yashbaviskar15/portfolio/issues"
PRIVACY_POLICY_URL="https://yashbaviskar.me/privacy"
UBUNTU_CODENAME=noble
ENGINEER="Yash Baviskar — Cloud Support Engineer"
`,
          },
          motd: {
            name: 'motd',
            type: 'file',
            size: '512 B',
            permissions: '-rw-r--r--',
            owner: 'root',
            group: 'root',
            content: `================================================================================
  Welcome to YashOS 24.04 LTS (GNU/Linux 6.8.0-generic x86_64)
  Interactive Cloud Support Engineering Workstation
================================================================================
  * Engineer:       Yash Baviskar (AWS, Linux, Terraform, Docker, Prometheus/Grafana)
  * Role:           Cloud Support Engineer @ IT Digi Solution
  * Relocation:     Open to Germany and other EU countries
  * Portfolio Web:  https://yashbaviskar.me
  * Quick Actions:  Type 'help', 'neofetch', 'terraform plan', or 'resume'
================================================================================
`,
          },
          environment: {
            name: 'environment',
            type: 'file',
            size: '96 B',
            permissions: '-rw-r--r--',
            owner: 'root',
            group: 'root',
            content: 'PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/home/yash/bin"\nLANG="en_US.UTF-8"\n',
          },
        },
      },
      proc: {
        name: 'proc',
        type: 'folder',
        permissions: 'dr-xr-xr-x',
        owner: 'root',
        group: 'root',
        updatedAt: 'Apr 24 08:00',
        children: {
          cpuinfo: {
            name: 'cpuinfo',
            type: 'file',
            size: '0 B',
            permissions: '-r--r--r--',
            owner: 'root',
            group: 'root',
            content: `processor\t: 0..${hardwareConcurrency - 1}
vendor_id\t: GenuineIntel / AMD
model name\t: Cloud Virtual CPU @ 3.40GHz
cpu cores\t: ${hardwareConcurrency}
flags\t\t: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss ht syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology cpuid tsc_known_freq pni pclmulqdq vmx ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor
`,
          },
          meminfo: {
            name: 'meminfo',
            type: 'file',
            size: '0 B',
            permissions: '-r--r--r--',
            owner: 'root',
            group: 'root',
            content: `MemTotal:       ${deviceMemory * 1048576} kB
MemFree:        ${Math.round(deviceMemory * 1048576 * 0.42)} kB
MemAvailable:   ${Math.round(deviceMemory * 1048576 * 0.68)} kB
Buffers:          248192 kB
Cached:          2184920 kB
SwapTotal:       2097148 kB
SwapFree:        2097148 kB
`,
          },
          version: {
            name: 'version',
            type: 'file',
            size: '0 B',
            permissions: '-r--r--r--',
            owner: 'root',
            group: 'root',
            content: 'Linux version 6.8.0-45-generic (buildd@lcy02-amd64-001) (x86_64-linux-gnu-gcc-13) #45-YashOS SMP PREEMPT_DYNAMIC\n',
          },
        },
      },
      var: {
        name: 'var',
        type: 'folder',
        permissions: 'drwxr-xr-x',
        owner: 'root',
        group: 'root',
        children: {
          log: {
            name: 'log',
            type: 'folder',
            permissions: 'drwxr-xr-x',
            owner: 'root',
            group: 'root',
            children: {
              syslog: {
                name: 'syslog',
                type: 'file',
                size: '24 KB',
                permissions: '-rw-r-----',
                content: `Apr 24 08:00:01 yashos systemd[1]: Reached target Terraform-Validated Infrastructure (lab).
Apr 24 08:00:02 yashos systemd[1]: Started Docker Application Container Engine.
Apr 24 08:00:03 yashos dockerd[1482]: Started containerd container runtime.
Apr 24 08:00:04 yashos kubelet[1520]: Kubernetes (lab) node ready for local workload experiments.
Apr 24 08:00:05 yashos prometheus[1680]: Server is ready to receive web requests.
Apr 24 08:00:06 yashos gdm[1720]: GDM Display Manager initialized successfully.
`,
              },
              'auth.log': {
                name: 'auth.log',
                type: 'file',
                size: '4.2 KB',
                permissions: '-rw-r-----',
                content: `Apr 24 08:00:07 yashos sshd[1820]: Accepted publickey for yash from 127.0.0.1 port 54220 ssh2: ED25519 SHA256:YashBaviskarCloudAuth\nApr 24 08:00:08 yashos sudo: yash : TTY=pts/0 ; PWD=/home/yash ; USER=root ; COMMAND=/usr/bin/systemctl status yash.service\n`,
              },
              'cloud-init.log': {
                name: 'cloud-init.log',
                type: 'file',
                size: '8.8 KB',
                permissions: '-rw-r--r--',
                content: `Cloud-init v. 24.1.3 running 'init-local' at Apr 24 07:59:58 UTC.
Simulated AWS EC2 metadata for this portfolio demo (no live AWS account).
VPC design (documented): 10.0.0.0/16
Public Subnets (design): 10.0.1.0/24, 10.0.2.0/24
Private Subnets (design): 10.0.10.0/24, 10.0.20.0/24
NAT Gateway & Application Load Balancer: defined in Terraform configuration (not deployed)
Cloud-init finished at Apr 24 08:00:01 UTC. Datasource DataSourceEc2Local. Up 3.42 seconds
`,
              },
            },
          },
        },
      },
      tmp: {
        name: 'tmp',
        type: 'folder',
        permissions: 'drwxrwxrwt',
        owner: 'root',
        group: 'root',
        children: {},
      },
      home: {
        name: 'home',
        type: 'folder',
        permissions: 'drwxr-xr-x',
        owner: 'root',
        group: 'root',
        children: {
          yash: {
            name: 'yash',
            type: 'folder',
            permissions: 'drwxr-xr-x',
            owner: 'yash',
            group: 'yash',
            updatedAt: 'Apr 24 08:00',
            children: {
              '.bashrc': {
                name: '.bashrc',
                type: 'file',
                size: '1.8 KB',
                permissions: '-rw-r--r--',
                owner: 'yash',
                group: 'yash',
                isHidden: true,
                content: `# ~/.bashrc: executed by bash(1) for non-login shells.
export USER="yash"
export HOSTNAME="yashos"
export ROLE="Cloud Support Engineer"
export LOCATION="Jalgaon, Maharashtra, India (open to relocation to Germany & other EU countries)"

# Aliases
alias ll='ls -la'
alias la='ls -A'
alias l='ls -CF'
alias k='kubectl'
alias tf='terraform'
alias d='docker'
alias doc='docker compose'
alias reload='source ~/.bashrc'
alias cls='clear'

# Bash prompt
PS1='\\[\\033[01;32m\\]\\u@\\h\\[\\033[00m\\]:\\[\\033[01;34m\\]\\w\\[\\033[00m\\]\\$ '

# Welcome on interactive shell
if [ -f /etc/motd ]; then
  cat /etc/motd
fi
`,
              },
              '.bash_history': {
                name: '.bash_history',
                type: 'file',
                size: '840 B',
                permissions: '-rw-------',
                owner: 'yash',
                group: 'yash',
                isHidden: true,
                content: `terraform init
terraform plan
kubectl get pods -A
docker ps
systemctl status yash.service
git status
git log --oneline
aws sts get-caller-identity
neofetch
cat Desktop/README.md
`,
              },
              '.ssh': {
                name: '.ssh',
                type: 'folder',
                permissions: 'drwx------',
                owner: 'yash',
                group: 'yash',
                isHidden: true,
                children: {
                  'id_ed25519.pub': {
                    name: 'id_ed25519.pub',
                    type: 'file',
                    size: '98 B',
                    permissions: '-rw-r--r--',
                    owner: 'yash',
                    group: 'yash',
                    content: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIClOUD3+0V7jW9uK4vQwP6zL0mNxYbAvIsKaR15 yash@yashos.local\n',
                  },
                },
              },
              Desktop: {
                name: 'Desktop',
                type: 'folder',
                permissions: 'drwxr-xr-x',
                owner: 'yash',
                group: 'yash',
                children: {
                  'README.md': {
                    name: 'README.md',
                    type: 'file',
                    size: '2.1 KB',
                    permissions: '-rw-r--r--',
                    owner: 'yash',
                    group: 'yash',
                    content: `# YashOS 24.04 LTS — Welcome to my Cloud Support Workstation

Hello! I am **Yash Baviskar**, a **Cloud Support Engineer** working with AWS, Linux, Terraform (IaC), Docker, and CI/CD tooling.

## Quick Terminal Commands to Try:
- \`terraform plan\` -> Inspect the designed (validated) IaC for a 3-tier AWS architecture
- \`kubectl get pods -A\` -> View a local Kubernetes (lab) sandbox
- \`docker ps\` -> List local containerized services
- \`git log --oneline\` inside \`~/experience\` -> Explore career and education history
- \`neofetch\` -> Full system information and ASCII terminal badge
- \`top\` or \`htop\` -> Live interactive system monitor TUI
- \`systemctl status yash.service\` -> Check engineering availability and contact info
- \`cmatrix\` or \`sl\` or \`cowsay\` -> Fun Linux Easter eggs!

## Fast Actions:
- **Recruiter View:** Click the sparkly "Recruiter View" button in the TopBar for a 1-page instant ATS evaluation with printable summary and CV downloads.
- **Files App:** Double-click on projects in \`~/Projects\` to inspect Terraform configs and Dockerfiles.
- **Resume:** Click Resume icon on desktop or type \`resume\` in Terminal.

Feel free to explore, create files, edit configs, or test bash pipes!
`,
                  },
                  'Resume.pdf': {
                    name: 'Resume.pdf',
                    type: 'file',
                    size: '38 KB',
                    permissions: '-rw-r--r--',
                    owner: 'yash',
                    group: 'yash',
                    binaryUrl: '/YASH_BAVISKAR_CV.pdf',
                    meta: { app: 'resume' },
                  },
                  'AWS-Topology.drawio.png': {
                    name: 'AWS-Topology.drawio.png',
                    type: 'file',
                    size: '1.1 MB',
                    permissions: '-rw-r--r--',
                    owner: 'yash',
                    group: 'yash',
                    binaryUrl: '/hero-bg.png',
                    meta: { app: 'image-viewer' },
                  },
                  'Contact-Yash.desktop': {
                    name: 'Contact-Yash.desktop',
                    type: 'file',
                    size: '220 B',
                    permissions: '-rwxr-xr-x',
                    owner: 'yash',
                    group: 'yash',
                    isExecutable: true,
                    content: `[Desktop Entry]
Name=Contact Yash Baviskar
Comment=Send direct message or email
Exec=yashos-contact
Icon=mail
Terminal=false
Type=Application
Categories=Communication;
`,
                    meta: { app: 'contact' },
                  },
                },
              },
              Documents: {
                name: 'Documents',
                type: 'folder',
                permissions: 'drwxr-xr-x',
                owner: 'yash',
                group: 'yash',
                children: {
                  'YASH_BAVISKAR_CV.pdf': {
                    name: 'YASH_BAVISKAR_CV.pdf',
                    type: 'file',
                    size: '38 KB',
                    permissions: '-rw-r--r--',
                    owner: 'yash',
                    group: 'yash',
                    binaryUrl: '/YASH_BAVISKAR_CV.pdf',
                    meta: { app: 'resume' },
                  },
                  'cover-letter.md': {
                    name: 'cover-letter.md',
                    type: 'file',
                    size: '1.9 KB',
                    permissions: '-rw-r--r--',
                    owner: 'yash',
                    group: 'yash',
                    content: `# Motivation & Cover Letter — Yash Baviskar
**Target Role:** Cloud Support Engineer / Junior Cloud Engineer  
**Target Market:** Germany, Luxembourg, Netherlands, Poland, Switzerland & Remote

Dear Hiring Manager,

I am an entry-level Cloud Support Engineer with hands-on experience investigating AWS and Linux issues, and with self-directed lab projects in cloud infrastructure, containers, and monitoring.

My core technical competencies include:
1. **Cloud & IaC:** Designing and validating modular AWS VPCs, Subnets, ALBs, EC2, and RDS MySQL with Terraform (terraform plan/validate — not applied to a live AWS account).
2. **Containers & Orchestration:** Building multi-stage Docker images and defining Kubernetes manifests; currently studying Kubernetes fundamentals.
3. **CI/CD Automation:** Designing GitHub Actions pipelines that run linting, tests, and container builds on push.
4. **Observability:** Configuring Prometheus scraping exporters and Grafana dashboards in a lab environment.
5. **Linux Systems:** Ubuntu Server administration basics, systemd service units, and Bash scripting.

I hold a Bachelor of Computer Applications (BCA, 2026), have professional working proficiency in English (B2) and am actively learning German (A1). I am open to relocation to Germany and other EU countries.

Sincerely,
Yash Baviskar
`,
                  },
                  certifications: {
                    name: 'certifications',
                    type: 'folder',
                    permissions: 'drwxr-xr-x',
                    owner: 'yash',
                    group: 'yash',
                    children: {
                      'aws-cloud-solutions.md': {
                        name: 'aws-cloud-solutions.md',
                        type: 'file',
                        size: '820 B',
                        permissions: '-rw-r--r--',
                        owner: 'yash',
                        group: 'yash',
                        content: `# AWS Cloud Architecture — Practical Lab Competency
Status: Self-Study & Documented Lab Projects (not applied on a live AWS account)
Focus Areas:
- Multi-AZ VPC network design (Public/Private Subnets, NAT Gateway, Internet Gateway, Route Tables)
- Compute & Storage: EC2 and Elastic Load Balancing (ALB) defined in Terraform, S3 lifecycle policies
- Database: Amazon RDS MySQL multi-AZ configuration defined in Terraform
- Identity & Access Management: IAM least-privilege roles and policies
`,
                      },
                      'terraform-associate.md': {
                        name: 'terraform-associate.md',
                        type: 'file',
                        size: '760 B',
                        permissions: '-rw-r--r--',
                        owner: 'yash',
                        group: 'yash',
                        content: `# HashiCorp Terraform — Infrastructure as Code Competency
Status: Self-Study & Documented Lab Projects
Core Principles:
- Declarative infrastructure definition with HCL syntax
- Modular structure with clear input variables, locals, and output parameters
- Remote backend state configuration in AWS S3 with DynamoDB state locking (defined, validated with terraform plan/validate)
- Configuration validated with terraform fmt/validate and plan (not applied to a live AWS account)
`,
                      },
                      'docker-kubernetes.md': {
                        name: 'docker-kubernetes.md',
                        type: 'file',
                        size: '720 B',
                        permissions: '-rw-r--r--',
                        owner: 'yash',
                        group: 'yash',
                        content: `# Docker & Kubernetes — Container Competency
Status: Docker self-study & lab projects; Kubernetes at learning (basics) level
Core Skills:
- Multi-stage Dockerfile builds to reduce image size
- Docker Compose for local multi-service stacks
- Kubernetes fundamentals (learning): Deployments, Services, ConfigMaps and Secrets manifests defined
`,
                      },
                    },
                  },
                },
              },
              Projects: {
                name: 'Projects',
                type: 'folder',
                permissions: 'drwxr-xr-x',
                owner: 'yash',
                group: 'yash',
                children: {
                  'terraform-aws-infrastructure': {
                    name: 'terraform-aws-infrastructure',
                    type: 'folder',
                    permissions: 'drwxr-xr-x',
                    owner: 'yash',
                    group: 'yash',
                    children: {
                      'README.md': {
                        name: 'README.md',
                        type: 'file',
                        size: '1.4 KB',
                        permissions: '-rw-r--r--',
                        owner: 'yash',
                        group: 'yash',
                        content: `# Automated Cloud Infrastructure with Terraform (AWS) — Lab Design
GitHub: https://github.com/yashbaviskar15/3-tier-app
Validated with terraform plan / validate (not applied on a live AWS account).

## Architecture (defined in Terraform):
- 3-tier AWS architecture defined via modular Terraform code.
- Custom VPC (10.0.0.0/16) across 2 Availability Zones with public/private subnets.
- Internet Gateway, NAT Gateway, Application Load Balancer defined with health checks.
- EC2 instances and RDS MySQL private database subnet group defined.
- Remote state configuration using AWS S3 backend with DynamoDB locking.
`,
                      },
                      'main.tf': {
                        name: 'main.tf',
                        type: 'file',
                        size: '2.8 KB',
                        permissions: '-rw-r--r--',
                        owner: 'yash',
                        group: 'yash',
                        content: `terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket         = "yash-terraform-remote-state-prod"
    key            = "aws-3tier/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "terraform-state-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Environment = "Production"
      ManagedBy   = "Terraform"
      Owner       = "Yash Baviskar"
    }
  }
}

module "vpc" {
  source             = "./modules/vpc"
  cidr_block         = var.vpc_cidr
  availability_zones = var.availability_zones
}

module "alb" {
  source          = "./modules/alb"
  vpc_id          = module.vpc.vpc_id
  public_subnets  = module.vpc.public_subnet_ids
  certificate_arn = var.ssl_certificate_arn
}

module "database" {
  source          = "./modules/rds"
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnet_ids
  db_name         = "yash_app_db"
  db_username     = var.db_username
  db_password     = var.db_password
}
`,
                      },
                      'variables.tf': {
                        name: 'variables.tf',
                        type: 'file',
                        size: '840 B',
                        permissions: '-rw-r--r--',
                        owner: 'yash',
                        group: 'yash',
                        content: `variable "aws_region" {
  description = "Target AWS deployment region"
  type        = string
  default     = "eu-central-1"
}

variable "vpc_cidr" {
  description = "CIDR IP block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  type    = list(string)
  default = ["eu-central-1a", "eu-central-1b"]
}
`,
                      },
                    },
                  },
                  'docker-k8s-microservices': {
                    name: 'docker-k8s-microservices',
                    type: 'folder',
                    permissions: 'drwxr-xr-x',
                    owner: 'yash',
                    group: 'yash',
                    children: {
                      'README.md': {
                        name: 'README.md',
                        type: 'file',
                        size: '1.2 KB',
                        permissions: '-rw-r--r--',
                        owner: 'yash',
                        group: 'yash',
                        content: `# Containerized Microservices (Docker + Kubernetes lab)
GitHub: https://github.com/yashbaviskar15/acos

Multi-service containerization with multi-stage Docker builds and Kubernetes manifests (learning-lab). Local Docker Compose stack; Kubernetes manifests defined for study.
`,
                      },
                      'Dockerfile': {
                        name: 'Dockerfile',
                        type: 'file',
                        size: '640 B',
                        permissions: '-rw-r--r--',
                        owner: 'yash',
                        group: 'yash',
                        content: `# Stage 1: Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Minimal Production Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 yashapp
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER yashapp
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/index.js"]
`,
                      },
                      'deployment.yaml': {
                        name: 'deployment.yaml',
                        type: 'file',
                        size: '1.1 KB',
                        permissions: '-rw-r--r--',
                        owner: 'yash',
                        group: 'yash',
                        content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: cloud-api-deployment
  namespace: production
  labels:
    app: cloud-api
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: cloud-api
  template:
    metadata:
      labels:
        app: cloud-api
    spec:
      containers:
      - name: api
        image: yashbaviskar15/cloud-api:v1.4.2
        ports:
        - containerPort: 3000
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "100m"
            memory: "128Mi"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 15
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
`,
                      },
                    },
                  },
                  'prometheus-grafana-monitoring': {
                    name: 'prometheus-grafana-monitoring',
                    type: 'folder',
                    permissions: 'drwxr-xr-x',
                    owner: 'yash',
                    group: 'yash',
                    children: {
                      'README.md': {
                        name: 'README.md',
                        type: 'file',
                        size: '1.1 KB',
                        permissions: '-rw-r--r--',
                        owner: 'yash',
                        group: 'yash',
                        content: `# Infrastructure Monitoring Stack (Prometheus & Grafana)
GitHub: https://github.com/yashbaviskar15/cloud-monitoring

Observability stack tracking Node Exporter host telemetry, cAdvisor container metrics, PromQL query panels, and Alertmanager notification dispatching.
`,
                      },
                      'prometheus.yml': {
                        name: 'prometheus.yml',
                        type: 'file',
                        size: '780 B',
                        permissions: '-rw-r--r--',
                        owner: 'yash',
                        group: 'yash',
                        content: `global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node_exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']
`,
                      },
                    },
                  },
                },
              },
              Experience: {
                name: 'Experience',
                type: 'folder',
                permissions: 'drwxr-xr-x',
                owner: 'yash',
                group: 'yash',
                children: {
                  '.git': {
                    name: '.git',
                    type: 'folder',
                    permissions: 'drwxr-xr-x',
                    owner: 'yash',
                    group: 'yash',
                    isHidden: true,
                    children: {
                      HEAD: { name: 'HEAD', type: 'file', size: '23 B', content: 'ref: refs/heads/main\n' },
                    },
                  },
                  '01_education_bca.md': {
                    name: '01_education_bca.md',
                    type: 'file',
                    size: '680 B',
                    permissions: '-rw-r--r--',
                    owner: 'yash',
                    group: 'yash',
                    content: `# Bachelor of Computer Applications (BCA)
Institution: KCES's Institute of Management and Research, Jalgaon (KBCNMU)
Period: 2023 – 2026
CGPA: 8.14 / 10
Focus: Computer Networking, Operating Systems (Linux), Cloud Computing Fundamentals, Python, Database Systems (RDBMS, SQL).
`,
                  },
                  '02_cloud_projects.md': {
                    name: '02_cloud_projects.md',
                    type: 'file',
                    size: '890 B',
                    permissions: '-rw-r--r--',
                    owner: 'yash',
                    group: 'yash',
                    content: `# Cloud & DevOps Hands-On Lab Projects
- Designed modular Terraform AWS infrastructure with VPC, ALB, EC2, RDS, and S3 state locking (validated with terraform plan/validate — not applied on AWS).
- Designed GitHub Actions CI/CD pipelines with linting and container build steps.
- Containerized microservices with Docker; defined Kubernetes manifests while learning Kubernetes basics.
- Configured Prometheus scraping and Grafana dashboards in a lab environment.
`,
                  },
                  '03_devops_contributions.md': {
                    name: '03_devops_contributions.md',
                    type: 'file',
                    size: '640 B',
                    permissions: '-rw-r--r--',
                    owner: 'yash',
                    group: 'yash',
                    content: `# Open Source & DevOps Community
Active GitHub repository publisher demonstrating clean Infrastructure as Code patterns, containerization standards, and Bash automation scripts.
GitHub Profile: https://github.com/yashbaviskar15
`,
                  },
                },
              },
              Pictures: {
                name: 'Pictures',
                type: 'folder',
                permissions: 'drwxr-xr-x',
                owner: 'yash',
                group: 'yash',
                children: {
                  'profile.jpg': {
                    name: 'profile.jpg',
                    type: 'file',
                    size: '34 KB',
                    permissions: '-rw-r--r--',
                    owner: 'yash',
                    group: 'yash',
                    binaryUrl: '/profile.jpg',
                    meta: { app: 'image-viewer' },
                  },
                  Screenshots: {
                    name: 'Screenshots',
                    type: 'folder',
                    permissions: 'drwxr-xr-x',
                    owner: 'yash',
                    group: 'yash',
                    children: {},
                  },
                },
              },
              '.local': {
                name: '.local',
                type: 'folder',
                permissions: 'drwx------',
                owner: 'yash',
                group: 'yash',
                isHidden: true,
                children: {
                  share: {
                    name: 'share',
                    type: 'folder',
                    permissions: 'drwx------',
                    owner: 'yash',
                    group: 'yash',
                    children: {
                      Trash: {
                        name: 'Trash',
                        type: 'folder',
                        permissions: 'drwx------',
                        owner: 'yash',
                        group: 'yash',
                        children: {
                          files: { name: 'files', type: 'folder', children: {} },
                          info: { name: 'info', type: 'folder', children: {} },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
};

/**
 * VFS Class with reactive state sync.
 *
 * SESSION-ISOLATED BY DESIGN: the file system lives in memory only. It is a
 * per-tab in-memory singleton (each browser tab / page load gets its own copy),
 * so one visitor's created / edited / deleted files can never be seen by another
 * visitor, and a refresh always returns to the clean factory file system.
 */
export class VirtualFileSystem {
  private root: VFSNode;
  private trash: TrashItem[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    this.root = getInitialFileSystem();
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    // No persistence — state stays in this tab's memory and resets on refresh.
    this.listeners.forEach((l) => l());
  }

  public resetToFactory() {
    this.root = getInitialFileSystem();
    this.trash = [];
    this.notify();
  }

  public getRoot(): VFSNode {
    return this.root;
  }

  public resolvePath(currentPath: string, targetPath: string): string {
    if (!targetPath) return currentPath;
    let path = targetPath.trim();

    if (path.startsWith('~')) {
      path = '/home/yash' + path.slice(1);
    }

    if (!path.startsWith('/')) {
      path = `${currentPath === '/' ? '' : currentPath}/${path}`;
    }

    const segments = path.split('/').filter(Boolean);
    const resolved: string[] = [];

    for (const seg of segments) {
      if (seg === '.') continue;
      if (seg === '..') {
        resolved.pop();
      } else {
        resolved.push(seg);
      }
    }

    return '/' + resolved.join('/');
  }

  public getNode(path: string): VFSNode | null {
    const resolved = this.resolvePath('/', path);
    if (resolved === '/') return this.root;

    const parts = resolved.split('/').filter(Boolean);
    let curr: VFSNode = this.root;

    for (const part of parts) {
      if (!curr.children || !curr.children[part]) {
        return null;
      }
      curr = curr.children[part];
    }
    return curr;
  }

  public listDir(path: string, showHidden = false): VFSNode[] {
    const node = this.getNode(path);
    if (!node || node.type !== 'folder' || !node.children) {
      return [];
    }
    return Object.values(node.children).filter((item) => (showHidden ? true : !item.name.startsWith('.')));
  }

  public createFile(path: string, content = '', binaryUrl?: string, meta?: Record<string, any>): boolean {
    const resolved = this.resolvePath('/', path);
    const lastSlash = resolved.lastIndexOf('/');
    const dirPath = resolved.substring(0, lastSlash) || '/';
    const fileName = resolved.substring(lastSlash + 1);

    if (!fileName) return false;
    const parent = this.getNode(dirPath);
    if (!parent || parent.type !== 'folder') return false;

    if (!parent.children) parent.children = {};
    const sizeBytes = new Blob([content]).size;
    const sizeFormatted = sizeBytes > 1024 ? `${(sizeBytes / 1024).toFixed(1)} KB` : `${sizeBytes} B`;

    parent.children[fileName] = {
      name: fileName,
      type: 'file',
      size: sizeFormatted,
      permissions: '-rw-r--r--',
      owner: 'yash',
      group: 'yash',
      updatedAt: 'Apr 24 10:00',
      content,
      binaryUrl,
      isHidden: fileName.startsWith('.'),
      meta,
    };
    this.notify();
    return true;
  }

  public createFolder(path: string): boolean {
    const resolved = this.resolvePath('/', path);
    const lastSlash = resolved.lastIndexOf('/');
    const dirPath = resolved.substring(0, lastSlash) || '/';
    const folderName = resolved.substring(lastSlash + 1);

    if (!folderName) return false;
    const parent = this.getNode(dirPath);
    if (!parent || parent.type !== 'folder') return false;

    if (!parent.children) parent.children = {};
    if (parent.children[folderName]) return false;

    parent.children[folderName] = {
      name: folderName,
      type: 'folder',
      permissions: 'drwxr-xr-x',
      owner: 'yash',
      group: 'yash',
      updatedAt: 'Apr 24 10:00',
      isHidden: folderName.startsWith('.'),
      children: {},
    };
    this.notify();
    return true;
  }

  public writeFile(path: string, content: string): boolean {
    const node = this.getNode(path);
    if (!node || node.type !== 'file') {
      return this.createFile(path, content);
    }
    node.content = content;
    const sizeBytes = new Blob([content]).size;
    node.size = sizeBytes > 1024 ? `${(sizeBytes / 1024).toFixed(1)} KB` : `${sizeBytes} B`;
    node.updatedAt = 'Apr 24 10:00';
    this.notify();
    return true;
  }

  public deleteNode(path: string, permanent = false): boolean {
    const resolved = this.resolvePath('/', path);
    if (resolved === '/' || resolved === '/home' || resolved === '/home/yash') return false;

    const lastSlash = resolved.lastIndexOf('/');
    const dirPath = resolved.substring(0, lastSlash) || '/';
    const targetName = resolved.substring(lastSlash + 1);

    const parent = this.getNode(dirPath);
    if (!parent || !parent.children || !parent.children[targetName]) return false;

    const removed = parent.children[targetName];
    delete parent.children[targetName];

    if (!permanent) {
      this.trash.push({
        id: `trash_${Date.now()}_${Math.random()}`,
        originalPath: resolved,
        deletedAt: new Date().toISOString(),
        node: removed,
      });
    }

    this.notify();
    return true;
  }

  public renameNode(oldPath: string, newName: string): boolean {
    if (!newName || newName.includes('/')) return false;
    const resolved = this.resolvePath('/', oldPath);
    const lastSlash = resolved.lastIndexOf('/');
    const dirPath = resolved.substring(0, lastSlash) || '/';
    const targetName = resolved.substring(lastSlash + 1);

    const parent = this.getNode(dirPath);
    if (!parent || !parent.children || !parent.children[targetName]) return false;

    const node = parent.children[targetName];
    delete parent.children[targetName];
    node.name = newName;
    node.isHidden = newName.startsWith('.');
    parent.children[newName] = node;

    this.notify();
    return true;
  }

  public copyNode(srcPath: string, destDirPath: string): boolean {
    const srcNode = this.getNode(srcPath);
    const destDir = this.getNode(destDirPath);
    if (!srcNode || !destDir || destDir.type !== 'folder') return false;

    if (!destDir.children) destDir.children = {};
    const cloned = JSON.parse(JSON.stringify(srcNode));
    destDir.children[cloned.name] = cloned;

    this.notify();
    return true;
  }

  public moveNode(srcPath: string, destDirPath: string): boolean {
    const success = this.copyNode(srcPath, destDirPath);
    if (success) {
      return this.deleteNode(srcPath, true);
    }
    return false;
  }

  public getTrash(): TrashItem[] {
    return this.trash;
  }

  public emptyTrash(): void {
    this.trash = [];
    this.notify();
  }
}

export const vfs = new VirtualFileSystem();
