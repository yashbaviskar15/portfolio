import React, { useState, useRef, useEffect } from 'react';

export default function TerminalWindow({ onOpenWindow }) {
  const [history, setHistory] = useState([
    {
      type: 'output',
      text: "Last login: Sun Aug 30 10:24:09 on ttys001\nWelcome to Yash Baviskar's Cloud Terminal v2.4 (Darwin Kernel / arm64)\nType \"help\" to view available commands or \"neofetch\" for system specs.\n",
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmed = inputVal.trim();
      const newHistory = [...history, { type: 'input', text: `yash@macbook-pro ~ % ${inputVal}` }];

      if (trimmed) {
        setCommandHistory(prev => [...prev, trimmed]);

        const parts = trimmed.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        switch (cmd) {
          case 'help':
            newHistory.push({
              type: 'output',
              text: `Available Commands:
  neofetch       - Display Yash's developer specs and system info
  about          - Bio, background, and cloud engineering focus
  skills         - List cloud, IaC, containers & security skills
  projects       - View production & experimental cloud projects
  education      - BCA degree (8.14 CGPA) & learning tracks
  contact        - Email, LinkedIn, and GitHub links
  curl cv        - Download or preview Yash's CV (PDF)
  date           - Print system timestamp
  clear          - Clear terminal history`,
            });
            break;

          case 'neofetch':
          case 'fetch':
            newHistory.push({
              type: 'output',
              text: `      .:'          yash@macbook-pro.local
     __ :'__        -----------------------
  .'__ '-'__'.     OS: macOS Sonoma 14.6 (Cloud Edition)
 :__________.-'    Host: Yash Baviskar (Junior Cloud Engineer)
 :_________        Kernel: 23.6.0 Darwin Kernel / arm64
  :_________.-.    Uptime: 2+ Years in Cloud & DevOps
   .__.-.__.'      Shell: zsh 5.9
                    Core Stack: AWS, Terraform, Docker, K8s, Linux
                    Education: BCA (CGPA: 8.14 / 10.0)
                    Status: Available for Cloud Roles
                    Location: Pune, India`,
            });
            break;

          case 'about':
          case 'whoami':
            newHistory.push({
              type: 'output',
              text: `Yash Baviskar - Junior Cloud Engineer
Specialized in building, automating, deploying, and managing cloud infrastructure on AWS.
Proficient in Terraform (IaC), Docker, Kubernetes, CI/CD with GitHub Actions, Prometheus/Grafana monitoring, and Linux administration.`,
            });
            break;

          case 'skills':
            newHistory.push({
              type: 'output',
              text: `[Cloud & IaC]        AWS (EC2, S3, RDS, VPC, IAM, ALB), Terraform (HCL), Azure
[DevOps & Containers] Docker, Docker Compose, Kubernetes (k8s/k3s), GitHub Actions, ECR/ECS
[Observability]       Prometheus, Grafana, Alertmanager, Node Exporter, CloudWatch
[Systems & Scripting] Linux (Ubuntu/Amazon), systemd, Bash, Python (FastAPI), Git`,
            });
            break;

          case 'projects':
            newHistory.push({
              type: 'output',
              text: `1. AWS Three-Tier Web Architecture  -> Terraform, VPC, EC2, Multi-AZ RDS, ALB
2. Aravanta CloudOS                -> FastAPI, Docker, Kubernetes, PostgreSQL, Terraform
3. CI/CD Release Pipeline          -> GitHub Actions, Amazon ECR, Kubernetes Rolling Updates
4. Cloud Infrastructure Monitor    -> Prometheus, Grafana, Node Exporter, Alertmanager

Use the GUI Finder window or visit https://github.com/yashbaviskar15 for full source.`,
            });
            break;

          case 'contact':
            newHistory.push({
              type: 'output',
              text: `Email:    yashbaviskar0215@outlook.com
LinkedIn: https://linkedin.com/in/yashbaviskar15
GitHub:   https://github.com/yashbaviskar15
Dev.to:   https://dev.to/yashbaviskar15`,
            });
            break;

          case 'curl':
            if (args[0] === 'cv' || args[0] === 'resume' || args[0]?.includes('resume')) {
              window.open('/yash_cv.pdf', '_blank');
              newHistory.push({
                type: 'output',
                text: 'Downloading Yash_Baviskar_CV.pdf... Opening in new tab.',
              });
            } else {
              newHistory.push({
                type: 'output',
                text: 'curl: try "curl cv" to fetch Yash\'s resume.',
              });
            }
            break;

          case 'clear':
            setHistory([]);
            setInputVal('');
            return;

          case 'date':
            newHistory.push({
              type: 'output',
              text: new Date().toString(),
            });
            break;

          case 'uname':
            newHistory.push({
              type: 'output',
              text: 'Darwin macbook-pro.local 23.6.0 Darwin Kernel Version 23.6.0: arm64',
            });
            break;

          default:
            newHistory.push({
              type: 'output',
              text: `zsh: command not found: ${trimmed}. Type "help" for a list of available commands.`,
            });
            break;
        }
      }

      setHistory(newHistory);
      setInputVal('');
    }
  };

  return (
    <div
      className="p-4 bg-slate-950/90 text-slate-100 font-mono text-xs sm:text-sm h-full flex flex-col justify-between select-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="space-y-2 overflow-y-auto macos-scrollbar">
        {history.map((entry, idx) => (
          <div key={idx} className="leading-relaxed whitespace-pre-wrap">
            {entry.type === 'input' ? (
              <span className="text-cyan-400 font-semibold">{entry.text}</span>
            ) : (
              <span className="text-slate-300">{entry.text}</span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* CLI Input Line */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/10 shrink-0">
        <span className="text-cyan-400 font-semibold shrink-0">yash@macbook-pro ~ %</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleCommand}
          className="w-full bg-transparent text-white focus:outline-none font-mono"
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  );
}
