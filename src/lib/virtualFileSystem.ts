/**
 * Real In-Memory Virtual File System for Linux GNOME Portfolio
 * Backs both the Terminal shell and Nautilus FilesApp
 */

export interface VFSNode {
  name: string;
  type: 'file' | 'folder';
  size?: string;
  permissions?: string;
  updatedAt?: string;
  content?: string;
  meta?: Record<string, any>;
  children?: Record<string, VFSNode>;
}

export const initialFileSystem: VFSNode = {
  name: '/',
  type: 'folder',
  permissions: 'drwxr-xr-x',
  children: {
    home: {
      name: 'home',
      type: 'folder',
      permissions: 'drwxr-xr-x',
      children: {
        yash: {
          name: 'yash',
          type: 'folder',
          permissions: 'drwxr-xr-x',
          children: {
            'summary.txt': {
              name: 'summary.txt',
              type: 'file',
              size: '1.2 KB',
              permissions: '-rw-r--r--',
              updatedAt: 'Aug 30 10:44',
              content: `YASH BAVISKAR — Cloud / DevOps Engineer
Location: Jalgaon / Pune, Maharashtra, India
Phone: +91 96231 66585 | Email: yashbaviskar0215@outlook.com

Professional Summary:
Cloud / DevOps Engineer with hands-on project experience in AWS, Terraform, Docker, Kubernetes, and Linux. Built and deployed cloud infrastructure end-to-end – provisioning with Terraform, containerizing with Docker, and monitoring with Prometheus and Grafana. Comfortable with Bash scripting, YAML/JSON configuration, and CI/CD automation.`,
            },
            'resume.txt': {
              name: 'resume.txt',
              type: 'file',
              size: '3.8 KB',
              permissions: '-rw-r--r--',
              updatedAt: 'Aug 30 10:44',
              content: `================================================================================
YASH BAVISKAR — Cloud / DevOps Engineer
Contact: +91 96231 66585 | yashbaviskar0215@outlook.com
Website: https://yashbaviskar.me | LinkedIn: linkedin.com/in/yashbaviskar15
================================================================================

[EDUCATION]
Bachelor of Computer Applications (BCA)
KCES's Institute of Management and Research, Jalgaon, India | 2023 – 2026 (Expected)

[TECHNICAL SKILLS]
- Cloud (AWS): EC2, S3, IAM, VPC, Route 53, RDS, ECS, ECR, ELB, CloudFront
- IaC: Terraform (modular, provider-based, state-managed)
- Containers & Orchestration: Docker, Kubernetes (Minikube, k3s), ECS, ECR
- CI/CD: GitHub Actions, AWS CodePipeline, CodeBuild, CodeDeploy
- Monitoring: Prometheus, Grafana, Alertmanager, Amazon CloudWatch
- Linux: Ubuntu Server, Amazon Linux, systemd, cron, log analysis
- Languages: Python, Bash, YAML, JSON, PostgreSQL

[LANGUAGES]
- English (B2) | German (A1)
================================================================================`,
            },
            projects: {
              name: 'projects',
              type: 'folder',
              permissions: 'drwxr-xr-x',
              children: {
                '3-tier-app.md': {
                  name: '3-tier-app.md',
                  type: 'file',
                  size: '2.4 KB',
                  permissions: '-rw-r--r--',
                  updatedAt: 'Aug 30 09:12',
                  content: `# AWS Three-Tier Web Application Infrastructure
Status: Completed – 2024
GitHub: https://github.com/yashbaviskar15/3-tier-app

Key Architecture:
- Built three-tier setup on AWS (public/private VPC subnets, ALB, EC2, RDS).
- Complete modular Terraform IaC for one-command teardown and rebuild.
- Least-privilege IAM policies, security groups, NACLs, and SSH key-only auth.`,
                },
                'cloud-monitoring.md': {
                  name: 'cloud-monitoring.md',
                  type: 'file',
                  size: '2.1 KB',
                  permissions: '-rw-r--r--',
                  updatedAt: 'Aug 30 09:20',
                  content: `# Cloud Infrastructure Monitoring with Prometheus & Grafana
Status: Completed – 2024 – 2025
GitHub: https://github.com/yashbaviskar15/cloud-monitoring

Key Architecture:
- Provisioned Prometheus monitoring stack on EC2 via Terraform.
- Scraped 10+ containerized microservices and designed 5 Grafana dashboards.
- Tuned Alertmanager rules, cutting MTTD from 15+ mins to <2 mins.`,
                },
                'cicd-pipeline.md': {
                  name: 'cicd-pipeline.md',
                  type: 'file',
                  size: '1.9 KB',
                  permissions: '-rw-r--r--',
                  updatedAt: 'Aug 30 09:30',
                  content: `# CI/CD Pipeline with Docker, Kubernetes & AWS
Status: Completed – 2025
GitHub: https://github.com/yashbaviskar15/cicd-pipeline

Key Architecture:
- Automated GitHub Actions build, test, and release workflow.
- Docker multi-stage containerization with image push to Amazon ECR.
- Zero-downtime rolling updates deployed to Kubernetes (k3s).`,
                },
                'acos.md': {
                  name: 'acos.md',
                  type: 'file',
                  size: '2.5 KB',
                  permissions: '-rw-r--r--',
                  updatedAt: 'Aug 30 10:00',
                  content: `# Aravanta CloudOS — Cloud Infrastructure Automation Platform
Status: In Progress – 2025 – Present
GitHub: https://github.com/yashbaviskar15/acos

Key Architecture:
- Self-service cloud provisioning platform built on Terraform IaC.
- Backend powered by FastAPI and PostgreSQL, containerized with Docker.
- Automated GitHub Actions CI/CD workflows.`,
                },
              },
            },
            scripts: {
              name: 'scripts',
              type: 'folder',
              permissions: 'drwxr-xr-x',
              children: {
                'deploy.sh': {
                  name: 'deploy.sh',
                  type: 'file',
                  size: '840 B',
                  permissions: '-rwxr-xr-x',
                  updatedAt: 'Aug 30 10:15',
                  content: `#!/usr/bin/env bash
set -e
echo "Starting automated cloud deployment..."
terraform plan -out=tfplan.binary
terraform apply -auto-approve tfplan.binary
echo "Deployment successful: All AWS resources healthy."`,
                },
                'healthcheck.py': {
                  name: 'healthcheck.py',
                  type: 'file',
                  size: '1.1 KB',
                  permissions: '-rwxr-xr-x',
                  updatedAt: 'Aug 30 10:20',
                  content: `import sys, time
print("[HEALTHCHECK] Probing AWS ap-south-1 infrastructure targets...")
time.sleep(0.3)
print("[OK] VPC Subnets: Active (Multi-AZ)")
print("[OK] RDS MySQL Cluster: Healthy")
print("[OK] Prometheus Telemetry: 100% Targets Scraped")
sys.exit(0)`,
                },
              },
            },
            'contact.md': {
              name: 'contact.md',
              type: 'file',
              size: '950 B',
              permissions: '-rw-r--r--',
              updatedAt: 'Aug 30 10:30',
              content: `---
Name: Yash Baviskar
Email: yashbaviskar0215@outlook.com
Phone: +91 96231 66585
Website: https://yashbaviskar.me
LinkedIn: https://linkedin.com/in/yashbaviskar15
GitHub: https://github.com/yashbaviskar15
---`,
            },
          },
        },
      },
    },
  },
};

// VFS Helper Utilities
export class VirtualFileSystem {
  private root: VFSNode;

  constructor(initialTree: VFSNode = initialFileSystem) {
    this.root = initialTree;
  }

  public resolvePath(targetPath: string, cwd: string = '/home/yash'): string {
    if (!targetPath || targetPath === '.') return cwd;
    if (targetPath === '~') return '/home/yash';
    if (targetPath.startsWith('~/')) {
      targetPath = '/home/yash/' + targetPath.slice(2);
    }

    const isAbsolute = targetPath.startsWith('/');
    const baseParts = isAbsolute ? [] : cwd.split('/').filter(Boolean);
    const targetParts = targetPath.split('/').filter(Boolean);

    const resolvedParts = [...baseParts];

    for (const part of targetParts) {
      if (part === '.') continue;
      if (part === '..') {
        resolvedParts.pop();
      } else {
        resolvedParts.push(part);
      }
    }

    return '/' + resolvedParts.join('/');
  }

  public getNode(path: string): VFSNode | null {
    if (path === '/' || path === '') return this.root;

    const parts = path.split('/').filter(Boolean);
    let current: VFSNode = this.root;

    for (const part of parts) {
      if (!current.children || !current.children[part]) {
        return null;
      }
      current = current.children[part];
    }

    return current;
  }

  public listDirectory(path: string): VFSNode[] {
    const node = this.getNode(path);
    if (!node || node.type !== 'folder' || !node.children) return [];
    return Object.values(node.children);
  }

  public readFile(path: string): string | null {
    const node = this.getNode(path);
    if (!node || node.type !== 'file') return null;
    return node.content || '';
  }
}

export const globalVFS = new VirtualFileSystem();
