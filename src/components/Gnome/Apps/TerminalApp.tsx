import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../../data/portfolio';
import { globalVFS } from '../../../lib/virtualFileSystem';
import { sounds } from '../../../lib/soundEffects';
import { useGnomeStore } from '../../../store/useGnomeStore';
import { terminalLineVariants, windowShakeAnimation } from '../../../lib/animations';

interface TerminalLine {
  id: string;
  type: 'prompt' | 'output' | 'error';
  content: string;
}

export const TerminalApp: React.FC = () => {
  const { currentCwd, setCwd, setThemeMode, themeMode } = useGnomeStore();
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [inputVal, setInputVal] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isTypingAnimation, setIsTypingAnimation] = useState<boolean>(true);
  const [animationText, setAnimationText] = useState<string>('');
  const [shakeKey, setShakeKey] = useState<number>(0);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const animationTimerRef = useRef<number | null>(null);

  const initialWelcomeMessage = `Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-generic x86_64)

 * Candidate:      ${portfolioData.developer.name}
 * Target Role:    ${portfolioData.developer.role}
 * Location:       ${portfolioData.developer.location}
 * Contact:        ${portfolioData.developer.phone} | ${portfolioData.developer.email}
 * GitHub:         ${portfolioData.developer.github}

yash@ubuntu:~$ cat summary.txt
${portfolioData.developer.summary}

Type "help" for interactive commands (ls, cd, cat, projects, skills, theme, curl cv).
`;

  // Auto-scroll on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, animationText]);

  // Initial Typewriter Effect (~14ms per character, skippable on click)
  useEffect(() => {
    let currentIdx = 0;
    const fullText = initialWelcomeMessage;

    const typeNextChar = () => {
      if (currentIdx < fullText.length) {
        setAnimationText(fullText.slice(0, currentIdx + 1));
        currentIdx++;
        animationTimerRef.current = window.setTimeout(typeNextChar, 14);
      } else {
        setIsTypingAnimation(false);
        setHistory([{ id: 'init-1', type: 'output', content: fullText }]);
        setAnimationText('');
        inputRef.current?.focus();
      }
    };

    animationTimerRef.current = window.setTimeout(typeNextChar, 60);

    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, []);

  const handleSkipAnimation = () => {
    if (isTypingAnimation) {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
      setIsTypingAnimation(false);
      setAnimationText('');
      setHistory([{ id: 'init-skipped', type: 'output', content: initialWelcomeMessage }]);
      inputRef.current?.focus();
    }
  };

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    const promptLine = `yash@ubuntu:${currentCwd === '/home/yash' ? '~' : currentCwd}$ ${cmdStr}`;
    const newLines: TerminalLine[] = [
      {
        id: `cmd-${Date.now()}`,
        type: 'prompt',
        content: promptLine,
      },
    ];

    if (!trimmed) {
      setHistory((prev) => [...prev, ...newLines]);
      return;
    }

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const subCmd = parts.slice(1).join(' ').trim();

    switch (mainCmd) {
      case 'help':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `Ubuntu GNOME Terminal v24.04 (VFS Integrated):

  ls [-l]          List files in the current working directory
  cd <dir>         Change working directory (e.g. "cd projects", "cd ..")
  pwd              Print current working directory
  cat <file>       Display file content (e.g. "cat resume.txt", "cat summary.txt")
  tree             Display visual file hierarchy
  theme <dark|light> Switch desktop theme mode
  about / whoami   Professional summary & candidate profile
  skills           Technical skills breakdown (AWS, IaC, CI/CD, Linux)
  projects         Cloud & DevOps project repositories
  education        Academic credentials (BCA) & coursework
  languages        Language proficiencies (English, German)
  contact          Phone, Email, LinkedIn, and GitHub links
  curl cv          Download Yash's official CV (PDF)
  clear            Clear the terminal screen`,
        });
        break;

      case 'ls': {
        const files = globalVFS.listDirectory(currentCwd);
        if (subCmd === '-l' || subCmd === '-la' || subCmd === '-al') {
          const listStr = files
            .map(
              (f) =>
                `${f.permissions || '-rw-r--r--'}  1 yash yash  ${(f.size || '4.0K').padStart(6, ' ')}  ${f.updatedAt || 'Aug 30 10:00'}  ${f.name}${f.type === 'folder' ? '/' : ''}`
            )
            .join('\n');
          newLines.push({ id: `out-${Date.now()}`, type: 'output', content: listStr });
        } else {
          const listStr = files.map((f) => (f.type === 'folder' ? `${f.name}/` : f.name)).join('   ');
          newLines.push({ id: `out-${Date.now()}`, type: 'output', content: listStr });
        }
        break;
      }

      case 'pwd':
        newLines.push({ id: `out-${Date.now()}`, type: 'output', content: currentCwd });
        break;

      case 'cd': {
        const target = subCmd || '~';
        const nextPath = globalVFS.resolvePath(target, currentCwd);
        const node = globalVFS.getNode(nextPath);

        if (node && node.type === 'folder') {
          setCwd(nextPath);
        } else {
          sounds.playTerminalBeep();
          setShakeKey((prev) => prev + 1);
          newLines.push({
            id: `err-${Date.now()}`,
            type: 'error',
            content: `cd: no such file or directory: ${subCmd}`,
          });
        }
        break;
      }

      case 'cat': {
        if (!subCmd) {
          newLines.push({ id: `err-${Date.now()}`, type: 'error', content: `cat: missing file argument` });
          break;
        }
        const filePath = globalVFS.resolvePath(subCmd, currentCwd);
        const content = globalVFS.readFile(filePath);

        if (content !== null) {
          newLines.push({ id: `out-${Date.now()}`, type: 'output', content });
        } else {
          sounds.playTerminalBeep();
          setShakeKey((prev) => prev + 1);
          newLines.push({
            id: `err-${Date.now()}`,
            type: 'error',
            content: `cat: ${subCmd}: No such file or directory. Try "ls" to list files.`,
          });
        }
        break;
      }

      case 'tree':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `/home/yash
├── summary.txt
├── resume.txt
├── contact.md
├── projects/
│   ├── 3-tier-app.md
│   ├── cloud-monitoring.md
│   ├── cicd-pipeline.md
│   └── acos.md
└── scripts/
    ├── deploy.sh
    └── healthcheck.py`,
        });
        break;

      case 'theme':
        if (subCmd === 'light' || subCmd === 'dark') {
          setThemeMode(subCmd);
          newLines.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: `Switched desktop theme to ${subCmd.toUpperCase()} mode.`,
          });
        } else {
          newLines.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: `Usage: theme <dark|light>`,
          });
        }
        break;

      case 'about':
      case 'whoami':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `${portfolioData.developer.name}
Role:     ${portfolioData.developer.role}
Phone:    ${portfolioData.developer.phone}
Email:    ${portfolioData.developer.email}
Location: ${portfolioData.developer.location}

Summary:
${portfolioData.developer.summary}`,
        });
        break;

      case 'skills':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `TECHNICAL SKILLS (From Official CV):

[Cloud (AWS)]
  EC2, S3, IAM, VPC, Route 53, RDS, ECS, ECR, ELB, CloudFront

[Infrastructure as Code]
  Terraform (modular, provider-based, state-managed deployments)

[Containers & Orchestration]
  Docker, Kubernetes (Minikube, k3s), Amazon ECS, Amazon ECR

[CI/CD & Release Automation]
  GitHub Actions, AWS CodePipeline, CodeBuild, CodeDeploy

[Monitoring & Observability]
  Prometheus, Grafana, Alertmanager, Amazon CloudWatch

[Linux & Systems]
  Ubuntu Server, Amazon Linux, systemd, cron, log analysis

[Networking]
  VPC/Subnet design (public/private), Route Tables, Internet Gateway,
  Security Groups, NACLs, DNS, Load Balancers

[Programming & Automation]
  Python, Bash/Shell, YAML, JSON, PostgreSQL, IAM least-privilege, SSH Keys`,
        });
        break;

      case 'projects':
        const projStr = portfolioData.projects
          .map(
            (p, idx) =>
              `[${idx + 1}] ${p.name} (${p.status})
    Category: ${p.category}
    GitHub:   ${p.github}
    Tech:     ${p.technologies.join(', ')}
    Highlights:
${p.bulletPoints.map((b) => `      * ${b}`).join('\n')}`
          )
          .join('\n\n');

        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `CLOUD / DEVOPS PROJECTS:\n\n${projStr}`,
        });
        break;

      case 'education':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `EDUCATION CREDENTIALS:
Degree:      ${portfolioData.education.degree}
Institution: ${portfolioData.education.institution}, ${portfolioData.education.location}
Period:      ${portfolioData.education.period}
Coursework:  ${portfolioData.education.coursework.join(', ')}`,
        });
        break;

      case 'languages':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `LANGUAGES:
  * English - B2 (Professional Working Proficiency)
  * German  - A1 (Beginner)`,
        });
        break;

      case 'contact':
      case 'links':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `CONTACT CHANNELS:
  Phone:    ${portfolioData.contact.phone}
  Email:    ${portfolioData.contact.email}
  Website:  ${portfolioData.contact.website}
  LinkedIn: ${portfolioData.contact.linkedin}
  GitHub:   ${portfolioData.contact.github}
  Location: ${portfolioData.contact.location}`,
        });
        break;

      case 'curl':
        if (subCmd.includes('cv') || subCmd.includes('resume')) {
          const link = document.createElement('a');
          link.href = '/Yash_Baviskar_CV.pdf';
          link.download = 'YASH_BAVISKAR_CV.pdf';
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          newLines.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: `Downloading Yash_Baviskar_CV.pdf (38 KB)... Download initiated.`,
          });
        } else {
          newLines.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: `curl: try "curl cv" to download the official PDF resume.`,
          });
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        sounds.playTerminalBeep();
        setShakeKey((prev) => prev + 1);
        newLines.push({
          id: `err-${Date.now()}`,
          type: 'error',
          content: `command not found: ${trimmed}. Type "help" to see valid commands.`,
        });
        break;
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex] || '');
      }
    }
  };

  return (
    <motion.div
      key={shakeKey}
      animate={shakeKey > 0 ? windowShakeAnimation : {}}
      className="flex-1 bg-[#1E1E1E] text-[#4AF626] font-mono text-xs sm:text-[13px] p-3 sm:p-4 flex flex-col justify-between overflow-y-auto gnome-scrollbar select-text cursor-text"
      onClick={handleSkipAnimation}
    >
      <div className="space-y-1 leading-relaxed whitespace-pre-wrap">
        {isTypingAnimation ? (
          <div>
            <span>{animationText}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block text-[#4AF626] ml-0.5"
            >
              ▊
            </motion.span>
            <div className="text-[10px] sm:text-[11px] text-neutral-500 mt-2 italic pointer-events-none">
              (Click anywhere to skip typing animation)
            </div>
          </div>
        ) : (
          history.map((line) => (
            <motion.div
              key={line.id}
              variants={terminalLineVariants}
              initial="hidden"
              animate="visible"
            >
              {line.type === 'prompt' ? (
                <span className="text-white font-bold">{line.content}</span>
              ) : line.type === 'error' ? (
                <span className="text-rose-400 font-medium">{line.content}</span>
              ) : (
                <span className="text-[#4AF626]">{line.content}</span>
              )}
            </motion.div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {!isTypingAnimation && (
        <div className="flex items-center gap-2 pt-2 mt-2 border-t border-neutral-800 shrink-0">
          <span className="text-orange-400 font-bold shrink-0 text-xs sm:text-[13px]">
            yash@ubuntu:{currentCwd === '/home/yash' ? '~' : currentCwd}$
          </span>
          <div className="flex-1 flex items-center relative">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-[#4AF626] focus:outline-none font-mono caret-[#4AF626] text-xs sm:text-[13px]"
              autoFocus
              spellCheck={false}
              aria-label="Terminal Shell Input"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};
