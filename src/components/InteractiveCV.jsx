import { useRef } from 'react';

export default function InteractiveCV() {
  const printRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="resume-section section" id="resume">
      <div className="container">
        <div className="section-header">
          <span className="section-label"><i className="bi bi-file-earmark-pdf-fill" aria-hidden="true" /> Curriculum Vitae</span>
          <h2 className="section-title">Interactive Resume</h2>
          <p className="section-subtitle">View, print, or download my official professional resume formatted for recruiters.</p>
        </div>

        <div className="resume-action">
          <button onClick={handlePrint} className="btn-primary">
            <i className="bi bi-printer-fill" aria-hidden="true" /> Print / Save as PDF
          </button>
        </div>

        <div className="resume-paper" ref={printRef} id="printable-resume">
          {/* Header */}
          <header className="resume-paper__header">
            <h1>Yash Baviskar</h1>
            <p className="resume-paper__contact">
              Jalgaon, Maharashtra, India &nbsp;|&nbsp;
              <a href="tel:+919623166585">+91 96231 66585</a> &nbsp;|&nbsp;
              <a href="mailto:yashbaviskar0215@outlook.com">yashbaviskar0215@outlook.com</a>
            </p>
            <p className="resume-paper__links">
              <a href="https://linkedin.com/in/yashbaviskar15" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin" /> linkedin.com/in/yashbaviskar15
              </a>
              &nbsp;|&nbsp;
              <a href="https://github.com/yashbaviskar15" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-github" /> github.com/yashbaviskar15
              </a>
            </p>
          </header>

          <hr className="resume-paper__divider" />

          {/* Summary */}
          <section className="resume-paper__section">
            <h2>Summary</h2>
            <p>
              Final-year BCA student specializing in cloud computing and DevOps engineering, with hands-on experience building
              AWS-based cloud infrastructure and full-stack applications. Proficient in Docker, Kubernetes, Terraform, GitHub Actions,
              Linux, Prometheus, and Grafana. Strong foundation in Infrastructure as Code, CI/CD automation, cloud security, and
              scalable system design. Seeking a DevOps Engineer internship to contribute to AI, robotics, and education technology
              platforms.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="resume-paper__section">
            <h2>Technical Skills</h2>
            <ul className="resume-paper__skills">
              <li><strong>Cloud Platforms:</strong> AWS (EC2, S3, IAM, VPC, Route 53, Lambda, RDS, ECS, SNS, ELB, CloudFront, ECR, CodePipeline)</li>
              <li><strong>Containers & Orchestration:</strong> Docker, Amazon ECS, Amazon ECR</li>
              <li><strong>Infrastructure as Code:</strong> Terraform, AWS CloudFormation, Ansible, AWS CLI</li>
              <li><strong>CI/CD & DevOps:</strong> GitHub Actions, AWS CodePipeline, CodeBuild, CodeDeploy, Jenkins</li>
              <li><strong>Monitoring & Security:</strong> Prometheus, Grafana, CloudWatch, IAM Policies, AWS KMS, SSL/TLS (ACM), Secrets Management</li>
              <li><strong>Databases & Storage:</strong> PostgreSQL, MySQL, Amazon S3</li>
              <li><strong>Networking:</strong> VPC Design, Subnets, NACLs, Security Groups, DNS, Load Balancers, Nginx</li>
              <li><strong>Programming & Scripting:</strong> Python, Bash/Shell Scripting, SQL, YAML, JSON, JavaScript</li>
              <li><strong>Operating Systems & Tools:</strong> Linux (Ubuntu, Amazon Linux), Git, VS Code, Bootstrap</li>
            </ul>
          </section>

          {/* Projects */}
          <section className="resume-paper__section">
            <h2>Projects</h2>
            
            <div className="resume-paper__project">
              <div className="resume-paper__project-header">
                <h3>CI/CD Pipeline with Docker, GitHub Actions & AWS</h3>
                <span>GitHub Actions | Docker | Amazon ECR | Amazon ECS</span>
              </div>
              <ul>
                <li>Designed and implemented end-to-end automated build, test, and deployment pipelines using GitHub Actions triggered on every code push and pull request, eliminating manual deployment steps.</li>
                <li>Containerized multi-service applications with Docker, pushed versioned images to Amazon ECR, and orchestrated blue/green deployments to Amazon ECS for zero-downtime production releases.</li>
                <li>Integrated AWS CodePipeline with CodeBuild and CodeDeploy to create a fully managed, auditable release workflow with automatic rollback on failed health checks.</li>
                <li>Configured environment-specific secrets management and IAM least-privilege roles across all pipeline stages, hardening the supply chain against credential exposure.</li>
                <li>Reduced average release cycle time and deployment errors, establishing a repeatable pattern applicable to mobile backends, web platforms, and AI microservices.</li>
              </ul>
            </div>

            <div className="resume-paper__project">
              <div className="resume-paper__project-header">
                <h3>Cloud Infrastructure Monitoring with Prometheus & Grafana</h3>
                <span>AWS EC2 | Terraform | Prometheus | Grafana | Docker | Linux</span>
              </div>
              <ul>
                <li>Provisioned monitoring infrastructure on AWS EC2 using Terraform, defining all resources as version-controlled Infrastructure as Code for repeatable environment setup.</li>
                <li>Deployed Prometheus for metrics collection across containerized services and built Grafana dashboards to visualize CPU, memory, and application-level performance.</li>
                <li>Configured alerting rules for resource thresholds and service downtime, reducing mean time to detect infrastructure issues.</li>
                <li>Documented setup and runbooks to make the monitoring stack reproducible across development, staging, and production environments.</li>
              </ul>
            </div>
          </section>

          {/* Education */}
          <section className="resume-paper__section">
            <h2>Education</h2>
            <div className="resume-paper__edu">
              <div className="resume-paper__edu-header">
                <h3>KCES’s Institute of Management and Research, Jalgaon</h3>
                <span>2026</span>
              </div>
              <p className="resume-paper__degree">Bachelor of Computer Applications (BCA) – CGPA: 8.14/10.0</p>
              <p className="resume-paper__coursework">Completed coursework in Cloud Computing, Computer Networking, Operating Systems, Database Management Systems (DBMS), and Distributed Systems.</p>
            </div>
            <div className="resume-paper__edu">
              <div className="resume-paper__edu-header">
                <h3>Adv. S.A. Baheti Arts, Commerce and Science College, Jalgaon</h3>
                <span>2022 – 2023</span>
              </div>
              <p className="resume-paper__degree">Higher Secondary (HSC)</p>
            </div>
          </section>

          {/* Achievements & Activities */}
          <section className="resume-paper__section">
            <h2>Achievements & Activities</h2>
            <ul>
              <li><strong>Active AWS Community Learner:</strong> Contributes to cloud learning communities and knowledge-sharing forums focused on DevOps, containerization, and cloud-native architecture.</li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
