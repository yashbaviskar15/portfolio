/**
 * YashOS 24.04 LTS (Portfolio Edition) — Virtual Bash Interpreter
 * High-fidelity command-line engine with pipes, redirects, variables, coreutils, and DevOps toolset.
 */

import { vfs, VFSNode } from './virtualFileSystem';

export interface ShellResult {
  stdout: string;
  stderr?: string;
  exitCode: number;
  openApp?: string;
  clear?: boolean;
  interactiveMode?: 'htop' | 'cmatrix' | 'vim' | 'nano' | 'sl' | 'panic';
  interactiveData?: any;
}

export interface ShellContext {
  cwd: string;
  env: Record<string, string>;
  aliases: Record<string, string>;
  lastExitCode: number;
  history: string[];
  user: string;
  hostname: string;
  isRoot: boolean;
}

export class BashInterpreter {
  private ctx: ShellContext;

  constructor() {
    this.ctx = {
      cwd: '/home/yash',
      env: {
        USER: 'yash',
        HOME: '/home/yash',
        HOSTNAME: 'yashos',
        SHELL: '/bin/bash',
        PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/home/yash/bin',
        TERM: 'xterm-256color',
        LANG: 'en_US.UTF-8',
        ROLE: 'Cloud Support Engineer',
        AWS_DEFAULT_REGION: 'eu-central-1',
        KUBECONFIG: '/home/yash/.kube/config',
      },
      aliases: {
        ll: 'ls -la',
        la: 'ls -A',
        l: 'ls -CF',
        k: 'kubectl',
        tf: 'terraform',
        d: 'docker',
        doc: 'docker compose',
        cls: 'clear',
        reload: 'source ~/.bashrc',
      },
      lastExitCode: 0,
      history: [],
      user: 'yash',
      hostname: 'yashos',
      isRoot: false,
    };
  }

  public getContext(): ShellContext {
    return this.ctx;
  }

  public setCwd(path: string) {
    this.ctx.cwd = vfs.resolvePath('/', path);
  }

  public getPrompt(): string {
    const user = this.ctx.isRoot ? 'root' : this.ctx.user;
    const symbol = this.ctx.isRoot ? '#' : '$';
    let path = this.ctx.cwd;

    if (path === '/home/yash' || path.startsWith('/home/yash/')) {
      path = '~' + path.slice('/home/yash'.length);
    }

    return `${user}@${this.ctx.hostname}:${path}${symbol}`;
  }

  /**
   * Main Execute Entrypoint supporting `&&`, `||`, `;`, pipes `|`, redirects `>`, `>>`
   */
  public async execute(rawCommandLine: string): Promise<ShellResult> {
    const line = rawCommandLine.trim();
    if (!line) {
      return { stdout: '', exitCode: 0 };
    }

    // Append to history
    if (this.ctx.history[this.ctx.history.length - 1] !== line) {
      this.ctx.history.push(line);
      // Append to .bash_history in VFS
      const historyFile = vfs.getNode('/home/yash/.bash_history');
      if (historyFile) {
        vfs.writeFile('/home/yash/.bash_history', `${historyFile.content || ''}${line}\n`);
      }
    }

    // 1. Split on command separators (;, &&, ||)
    const commands = this.splitChain(line);
    let lastResult: ShellResult = { stdout: '', exitCode: 0 };

    for (const cmdObj of commands) {
      if (cmdObj.operator === '&&' && lastResult.exitCode !== 0) continue;
      if (cmdObj.operator === '||' && lastResult.exitCode === 0) continue;

      lastResult = await this.executePipeline(cmdObj.cmd);
      this.ctx.lastExitCode = lastResult.exitCode;
    }

    return lastResult;
  }

  private splitChain(input: string): { cmd: string; operator: ';' | '&&' | '||' | '' }[] {
    const result: { cmd: string; operator: ';' | '&&' | '||' | '' }[] = [];
    let current = '';
    let inSingle = false;
    let inDouble = false;
    let i = 0;

    while (i < input.length) {
      const char = input[i];
      if (char === "'" && !inDouble) inSingle = !inSingle;
      else if (char === '"' && !inSingle) inDouble = !inDouble;

      if (!inSingle && !inDouble) {
        if (input.substring(i, i + 2) === '&&') {
          result.push({ cmd: current.trim(), operator: '&&' });
          current = '';
          i += 2;
          continue;
        } else if (input.substring(i, i + 2) === '||') {
          result.push({ cmd: current.trim(), operator: '||' });
          current = '';
          i += 2;
          continue;
        } else if (char === ';') {
          result.push({ cmd: current.trim(), operator: ';' });
          current = '';
          i += 1;
          continue;
        }
      }
      current += char;
      i++;
    }

    if (current.trim()) {
      result.push({ cmd: current.trim(), operator: '' });
    }

    return result;
  }

  /**
   * Pipeline execution: connects output of step N into stdin of step N+1
   */
  private async executePipeline(pipelineStr: string): Promise<ShellResult> {
    const pipeStages = this.splitByPipe(pipelineStr);
    let currentStdin = '';
    let result: ShellResult = { stdout: '', exitCode: 0 };

    for (let i = 0; i < pipeStages.length; i++) {
      const stage = pipeStages[i].trim();
      if (!stage) continue;

      result = await this.executeSingleCommandWithRedirection(stage, currentStdin);
      if (result.exitCode !== 0 && i < pipeStages.length - 1) {
        // Pipeline error
        break;
      }
      currentStdin = result.stdout;
    }

    return result;
  }

  private splitByPipe(str: string): string[] {
    const parts: string[] = [];
    let current = '';
    let inSingle = false;
    let inDouble = false;

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === "'" && !inDouble) inSingle = !inSingle;
      else if (char === '"' && !inSingle) inDouble = !inDouble;

      if (char === '|' && !inSingle && !inDouble) {
        parts.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    if (current) parts.push(current);
    return parts;
  }

  /**
   * Execute single command with file redirection `>`, `>>`, `<`
   */
  private async executeSingleCommandWithRedirection(cmdStr: string, stdinText = ''): Promise<ShellResult> {
    let redirectMode: '>' | '>>' | '<' | null = null;
    let targetFile = '';
    let commandPart = cmdStr;

    // Detect redirection operators
    const appendMatch = cmdStr.match(/^(.*?)(?:>>)\s*([^\s]+)$/);
    const overwriteMatch = cmdStr.match(/^(.*?)(?:>)\s*([^\s]+)$/);
    const stdinMatch = cmdStr.match(/^(.*?)(?:<)\s*([^\s]+)$/);

    if (appendMatch) {
      commandPart = appendMatch[1].trim();
      targetFile = appendMatch[2].trim();
      redirectMode = '>>';
    } else if (overwriteMatch) {
      commandPart = overwriteMatch[1].trim();
      targetFile = overwriteMatch[2].trim();
      redirectMode = '>';
    } else if (stdinMatch) {
      commandPart = stdinMatch[1].trim();
      targetFile = stdinMatch[2].trim();
      redirectMode = '<';
    }

    // Handle stdin redirection from file
    let inputStdin = stdinText;
    if (redirectMode === '<') {
      const filePath = vfs.resolvePath(this.ctx.cwd, targetFile);
      const fileNode = vfs.getNode(filePath);
      if (!fileNode || fileNode.type !== 'file') {
        return { stdout: '', stderr: `bash: ${targetFile}: No such file or directory`, exitCode: 1 };
      }
      inputStdin = fileNode.content || '';
    }

    // Parse tokens and expand variables
    const tokens = this.tokenizeAndExpand(commandPart);
    if (tokens.length === 0) {
      return { stdout: '', exitCode: 0 };
    }

    // Check alias replacement
    const firstWord = tokens[0];
    if (this.ctx.aliases[firstWord]) {
      const aliasTokens = this.tokenizeAndExpand(this.ctx.aliases[firstWord]);
      tokens.splice(0, 1, ...aliasTokens);
    }

    const commandResult = await this.dispatchCommand(tokens, inputStdin);

    // Handle stdout output redirection to file
    if ((redirectMode === '>' || redirectMode === '>>') && targetFile) {
      const filePath = vfs.resolvePath(this.ctx.cwd, targetFile);
      if (redirectMode === '>') {
        vfs.writeFile(filePath, commandResult.stdout);
      } else {
        const existing = vfs.getNode(filePath);
        vfs.writeFile(filePath, (existing?.content || '') + commandResult.stdout);
      }
      return { stdout: '', exitCode: commandResult.exitCode };
    }

    return commandResult;
  }

  /**
   * Tokenizer supporting quoting, escapes, $VAR expansion, and globbing
   */
  private tokenizeAndExpand(str: string): string[] {
    const rawTokens: string[] = [];
    let current = '';
    let inSingle = false;
    let inDouble = false;

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === "'" && !inDouble) {
        inSingle = !inSingle;
        continue;
      }
      if (char === '"' && !inSingle) {
        inDouble = !inDouble;
        continue;
      }
      if (char === ' ' && !inSingle && !inDouble) {
        if (current.length > 0) {
          rawTokens.push(current);
          current = '';
        }
      } else {
        current += char;
      }
    }
    if (current.length > 0) rawTokens.push(current);

    // Variable expansion and globbing
    const expandedTokens: string[] = [];
    for (const token of rawTokens) {
      let expanded = token;

      // $? expansion
      expanded = expanded.replace(/\$\?/g, String(this.ctx.lastExitCode));

      // $VAR expansion
      expanded = expanded.replace(/\$([A-Za-z0-9_]+)/g, (_, varName) => {
        return this.ctx.env[varName] !== undefined ? this.ctx.env[varName] : '';
      });

      // ~ expansion
      if (expanded === '~' || expanded.startsWith('~/')) {
        expanded = '/home/yash' + expanded.slice(1);
      }

      // Globbing expansion (*.md, etc.)
      if (expanded.includes('*')) {
        const matches = this.expandGlob(expanded);
        if (matches.length > 0) {
          expandedTokens.push(...matches);
          continue;
        }
      }

      expandedTokens.push(expanded);
    }

    return expandedTokens;
  }

  private expandGlob(pattern: string): string[] {
    const dir = vfs.resolvePath(this.ctx.cwd, pattern.substring(0, pattern.lastIndexOf('/') + 1) || '.');
    const filePattern = pattern.substring(pattern.lastIndexOf('/') + 1);
    const regex = new RegExp('^' + filePattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');

    const nodes = vfs.listDir(dir, false);
    return nodes.filter((n) => regex.test(n.name)).map((n) => n.name);
  }

  /**
   * Command Dispatcher
   */
  private async dispatchCommand(args: string[], stdinText: string): Promise<ShellResult> {
    const cmd = args[0];
    const flags = args.slice(1);

    switch (cmd) {
      // ----------------------------------------------------
      // File Coreutils
      // ----------------------------------------------------
      case 'pwd':
        return { stdout: `${this.ctx.cwd}\n`, exitCode: 0 };

      case 'cd': {
        const target = flags[0] || '~';
        const newPath = vfs.resolvePath(this.ctx.cwd, target);
        const node = vfs.getNode(newPath);

        if (!node) {
          return { stdout: '', stderr: `cd: ${target}: No such file or directory\n`, exitCode: 1 };
        }
        if (node.type !== 'folder') {
          return { stdout: '', stderr: `cd: ${target}: Not a directory\n`, exitCode: 1 };
        }
        this.ctx.cwd = newPath;
        return { stdout: '', exitCode: 0 };
      }

      case 'ls': {
        const showAll = flags.some((f) => f.includes('a') || f === '-la' || f === '-A');
        const longFormat = flags.some((f) => f.includes('l'));
        const targetArg = flags.find((f) => !f.startsWith('-')) || '.';
        const targetPath = vfs.resolvePath(this.ctx.cwd, targetArg);

        const node = vfs.getNode(targetPath);
        if (!node) {
          return { stdout: '', stderr: `ls: cannot access '${targetArg}': No such file or directory\n`, exitCode: 2 };
        }

        if (node.type === 'file') {
          return {
            stdout: longFormat
              ? `${node.permissions || '-rw-r--r--'} 1 ${node.owner || 'yash'} ${node.group || 'yash'} ${node.size || '1.0 KB'} ${node.updatedAt || 'Apr 24 08:00'} ${node.name}\n`
              : `${node.name}\n`,
            exitCode: 0,
          };
        }

        const items = vfs.listDir(targetPath, showAll);
        if (items.length === 0) return { stdout: '', exitCode: 0 };

        if (longFormat) {
          let out = `total ${items.length * 4}\n`;
          for (const item of items) {
            const perms = item.permissions || (item.type === 'folder' ? 'drwxr-xr-x' : '-rw-r--r--');
            const owner = item.owner || 'yash';
            const group = item.group || 'yash';
            const size = item.size || (item.type === 'folder' ? '4.0 KB' : '1.2 KB');
            const date = item.updatedAt || 'Apr 24 08:00';
            const color = item.type === 'folder' ? '\x1b[1;34m' : item.isExecutable ? '\x1b[1;32m' : '\x1b[0m';
            out += `${perms} 1 ${owner} ${group} ${size.padStart(7)} ${date} ${color}${item.name}\x1b[0m\n`;
          }
          return { stdout: out, exitCode: 0 };
        } else {
          const names = items.map((i) => (i.type === 'folder' ? `${i.name}/` : i.name));
          return { stdout: names.join('  ') + '\n', exitCode: 0 };
        }
      }

      case 'cat': {
        if (flags.length === 0 && stdinText) {
          return { stdout: stdinText, exitCode: 0 };
        }
        if (flags.length === 0) {
          return { stdout: '', exitCode: 0 };
        }

        let out = '';
        for (const fileArg of flags) {
          if (fileArg.startsWith('-')) continue;
          const filePath = vfs.resolvePath(this.ctx.cwd, fileArg);
          const node = vfs.getNode(filePath);
          if (!node) {
            return { stdout: '', stderr: `cat: ${fileArg}: No such file or directory\n`, exitCode: 1 };
          }
          if (node.type === 'folder') {
            return { stdout: '', stderr: `cat: ${fileArg}: Is a directory\n`, exitCode: 1 };
          }
          out += (node.content || `[Binary File: ${node.binaryUrl || fileArg}]`) + '\n';
        }
        return { stdout: out, exitCode: 0 };
      }

      case 'head': {
        const nIndex = flags.indexOf('-n');
        const numLines = nIndex !== -1 && flags[nIndex + 1] ? parseInt(flags[nIndex + 1], 10) : 10;
        const fileArg = flags.find((f, idx) => !f.startsWith('-') && idx !== nIndex + 1);

        let content = stdinText;
        if (fileArg) {
          const node = vfs.getNode(vfs.resolvePath(this.ctx.cwd, fileArg));
          if (!node || node.type !== 'file') {
            return { stdout: '', stderr: `head: cannot open '${fileArg}': No such file\n`, exitCode: 1 };
          }
          content = node.content || '';
        }
        const lines = content.split('\n').slice(0, numLines).join('\n');
        return { stdout: lines + '\n', exitCode: 0 };
      }

      case 'tail': {
        const nIndex = flags.indexOf('-n');
        const numLines = nIndex !== -1 && flags[nIndex + 1] ? parseInt(flags[nIndex + 1], 10) : 10;
        const fileArg = flags.find((f, idx) => !f.startsWith('-') && idx !== nIndex + 1);

        let content = stdinText;
        if (fileArg) {
          const node = vfs.getNode(vfs.resolvePath(this.ctx.cwd, fileArg));
          if (!node || node.type !== 'file') {
            return { stdout: '', stderr: `tail: cannot open '${fileArg}': No such file\n`, exitCode: 1 };
          }
          content = node.content || '';
        }
        const allLines = content.split('\n');
        const lines = allLines.slice(Math.max(0, allLines.length - numLines)).join('\n');
        return { stdout: lines + '\n', exitCode: 0 };
      }

      case 'grep': {
        const isCaseInsensitive = flags.some((f) => f.includes('i'));
        const isCountOnly = flags.some((f) => f.includes('c'));
        const nonFlagArgs = flags.filter((f) => !f.startsWith('-'));
        const pattern = nonFlagArgs[0];
        const fileArg = nonFlagArgs[1];

        if (!pattern) {
          return { stdout: '', stderr: 'grep: missing pattern\nUsage: grep [OPTIONS] PATTERN [FILE...]\n', exitCode: 2 };
        }

        let content = stdinText;
        if (fileArg) {
          const node = vfs.getNode(vfs.resolvePath(this.ctx.cwd, fileArg));
          if (!node || node.type !== 'file') {
            return { stdout: '', stderr: `grep: ${fileArg}: No such file\n`, exitCode: 2 };
          }
          content = node.content || '';
        }

        const lines = content.split('\n');
        const regex = new RegExp(pattern, isCaseInsensitive ? 'i' : '');
        const matched = lines.filter((l) => regex.test(l));

        if (isCountOnly) {
          return { stdout: `${matched.length}\n`, exitCode: matched.length > 0 ? 0 : 1 };
        }

        return {
          stdout: matched.length > 0 ? matched.join('\n') + '\n' : '',
          exitCode: matched.length > 0 ? 0 : 1,
        };
      }

      case 'find': {
        const startDir = flags[0] && !flags[0].startsWith('-') ? flags[0] : '.';
        const resolved = vfs.resolvePath(this.ctx.cwd, startDir);
        const nameIdx = flags.indexOf('-name');
        const namePattern = nameIdx !== -1 ? flags[nameIdx + 1] : null;

        const results: string[] = [];
        const traverse = (path: string) => {
          const node = vfs.getNode(path);
          if (!node) return;
          if (!namePattern || node.name.includes(namePattern.replace(/\*/g, ''))) {
            results.push(path);
          }
          if (node.type === 'folder' && node.children) {
            for (const child of Object.values(node.children)) {
              traverse(vfs.resolvePath(path, child.name));
            }
          }
        };
        traverse(resolved);
        return { stdout: results.join('\n') + '\n', exitCode: 0 };
      }

      case 'wc': {
        const countLines = flags.some((f) => f.includes('l'));
        const countWords = flags.some((f) => f.includes('w'));
        const countChars = flags.some((f) => f.includes('c'));
        const fileArg = flags.find((f) => !f.startsWith('-'));

        let content = stdinText;
        if (fileArg) {
          const node = vfs.getNode(vfs.resolvePath(this.ctx.cwd, fileArg));
          if (!node || node.type !== 'file') {
            return { stdout: '', stderr: `wc: ${fileArg}: No such file\n`, exitCode: 1 };
          }
          content = node.content || '';
        }

        const lines = content.split('\n').length - (content.endsWith('\n') ? 1 : 0);
        const words = content.trim().split(/\s+/).filter(Boolean).length;
        const bytes = new Blob([content]).size;

        if (countLines && !countWords && !countChars) return { stdout: `${lines}\n`, exitCode: 0 };
        if (countWords && !countLines && !countChars) return { stdout: `${words}\n`, exitCode: 0 };
        if (countChars && !countLines && !countWords) return { stdout: `${bytes}\n`, exitCode: 0 };

        return { stdout: `  ${lines}  ${words}  ${bytes} ${fileArg || ''}\n`, exitCode: 0 };
      }

      case 'tree': {
        const target = flags[0] || '.';
        const startPath = vfs.resolvePath(this.ctx.cwd, target);
        const rootNode = vfs.getNode(startPath);
        if (!rootNode || rootNode.type !== 'folder') {
          return { stdout: '', stderr: `tree: '${target}' [error opening dir]\n`, exitCode: 1 };
        }

        let out = `${startPath}\n`;
        let dirCount = 0;
        let fileCount = 0;

        const buildTree = (node: VFSNode, prefix: string) => {
          if (!node.children) return;
          const entries = Object.values(node.children).filter((c) => !c.name.startsWith('.'));
          entries.forEach((entry, idx) => {
            const isLast = idx === entries.length - 1;
            const pointer = isLast ? '└── ' : '├── ';
            out += `${prefix}${pointer}${entry.name}${entry.type === 'folder' ? '/' : ''}\n`;

            if (entry.type === 'folder') {
              dirCount++;
              buildTree(entry, prefix + (isLast ? '    ' : '│   '));
            } else {
              fileCount++;
            }
          });
        };

        buildTree(rootNode, '');
        out += `\n${dirCount} directories, ${fileCount} files\n`;
        return { stdout: out, exitCode: 0 };
      }

      case 'mkdir': {
        const dirName = flags.find((f) => !f.startsWith('-'));
        if (!dirName) {
          return { stdout: '', stderr: 'mkdir: missing operand\n', exitCode: 1 };
        }
        const success = vfs.createFolder(vfs.resolvePath(this.ctx.cwd, dirName));
        if (!success) {
          return { stdout: '', stderr: `mkdir: cannot create directory '${dirName}': File exists or invalid path\n`, exitCode: 1 };
        }
        return { stdout: '', exitCode: 0 };
      }

      case 'touch': {
        const fileName = flags[0];
        if (!fileName) return { stdout: '', stderr: 'touch: missing file operand\n', exitCode: 1 };
        vfs.createFile(vfs.resolvePath(this.ctx.cwd, fileName), '');
        return { stdout: '', exitCode: 0 };
      }

      case 'rm': {
        const recursive = flags.some((f) => f.includes('r') || f.includes('R') || f === '-rf');
        const force = flags.some((f) => f.includes('f'));
        const target = flags.find((f) => !f.startsWith('-'));

        if (!target) {
          return { stdout: '', stderr: 'rm: missing operand\n', exitCode: 1 };
        }

        // Easter Egg: rm -rf /
        if (target === '/' && recursive && force) {
          return {
            stdout: '\x1b[1;31m[CRITICAL] Kernel panic - not syncing: Attempted to kill init! exitcode=0x0000000b\x1b[0m\nRebooting system in 3 seconds...',
            exitCode: 139,
            interactiveMode: 'panic',
          };
        }

        const success = vfs.deleteNode(vfs.resolvePath(this.ctx.cwd, target), false);
        if (!success && !force) {
          return { stdout: '', stderr: `rm: cannot remove '${target}': No such file or directory\n`, exitCode: 1 };
        }
        return { stdout: '', exitCode: 0 };
      }

      case 'cp': {
        const src = flags[0];
        const dest = flags[1];
        if (!src || !dest) return { stdout: '', stderr: 'cp: missing file operand\n', exitCode: 1 };
        const success = vfs.copyNode(vfs.resolvePath(this.ctx.cwd, src), vfs.resolvePath(this.ctx.cwd, dest));
        if (!success) return { stdout: '', stderr: `cp: cannot copy '${src}' to '${dest}'\n`, exitCode: 1 };
        return { stdout: '', exitCode: 0 };
      }

      case 'mv': {
        const src = flags[0];
        const dest = flags[1];
        if (!src || !dest) return { stdout: '', stderr: 'mv: missing file operand\n', exitCode: 1 };
        const success = vfs.moveNode(vfs.resolvePath(this.ctx.cwd, src), vfs.resolvePath(this.ctx.cwd, dest));
        if (!success) return { stdout: '', stderr: `mv: cannot move '${src}' to '${dest}'\n`, exitCode: 1 };
        return { stdout: '', exitCode: 0 };
      }

      case 'echo': {
        const text = flags.join(' ');
        return { stdout: `${text}\n`, exitCode: 0 };
      }

      case 'date':
        return { stdout: `${new Date().toUTCString()}\n`, exitCode: 0 };

      case 'cal': {
        const now = new Date();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return {
          stdout: `    ${monthNames[now.getMonth()]} ${now.getFullYear()}\nSu Mo Tu We Th Fr Sa\n 1  2  3  4  5  6  7\n 8  9 10 11 12 13 14\n15 16 17 18 19 20 21\n22 23 24 25 26 27 28\n29 30 31\n`,
          exitCode: 0,
        };
      }

      case 'clear':
        return { stdout: '', clear: true, exitCode: 0 };

      case 'history': {
        const out = this.ctx.history.map((h, i) => `  ${String(i + 1).padStart(4)}  ${h}`).join('\n');
        return { stdout: out + '\n', exitCode: 0 };
      }

      case 'alias': {
        if (flags.length === 0) {
          const out = Object.entries(this.ctx.aliases).map(([k, v]) => `alias ${k}='${v}'`).join('\n');
          return { stdout: out + '\n', exitCode: 0 };
        }
        const eqIndex = flags[0].indexOf('=');
        if (eqIndex !== -1) {
          const k = flags[0].substring(0, eqIndex);
          const v = flags[0].substring(eqIndex + 1).replace(/^['"]|['"]$/g, '');
          this.ctx.aliases[k] = v;
        }
        return { stdout: '', exitCode: 0 };
      }

      case 'export': {
        if (flags.length === 0) {
          const out = Object.entries(this.ctx.env).map(([k, v]) => `declare -x ${k}="${v}"`).join('\n');
          return { stdout: out + '\n', exitCode: 0 };
        }
        flags.forEach((f) => {
          const [k, ...rest] = f.split('=');
          if (k && rest.length > 0) {
            this.ctx.env[k] = rest.join('=').replace(/^['"]|['"]$/g, '');
          }
        });
        return { stdout: '', exitCode: 0 };
      }

      case 'env': {
        const out = Object.entries(this.ctx.env).map(([k, v]) => `${k}=${v}`).join('\n');
        return { stdout: out + '\n', exitCode: 0 };
      }

      case 'whoami':
        return { stdout: `${this.ctx.user}\n`, exitCode: 0 };

      case 'hostname':
        return { stdout: `${this.ctx.hostname}\n`, exitCode: 0 };

      case 'id':
        return { stdout: 'uid=1000(yash) gid=1000(yash) groups=1000(yash),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),122(docker)\n', exitCode: 0 };

      case 'uname': {
        if (flags.includes('-a')) {
          return { stdout: 'Linux yashos 6.8.0-45-generic #45-YashOS SMP PREEMPT_DYNAMIC x86_64 x86_64 x86_64 GNU/Linux\n', exitCode: 0 };
        }
        return { stdout: 'Linux\n', exitCode: 0 };
      }

      case 'uptime':
        return { stdout: ' 08:42:15 up 42 days, 3:14,  1 user,  load average: 0.12, 0.08, 0.05\n', exitCode: 0 };

      case 'free': {
        return {
          stdout: `               total        used        free      shared  buff/cache   available
Mem:        16384000     5242880     6144000      262144     4997120    10878976
Swap:        2097152           0     2097152
`,
          exitCode: 0,
        };
      }

      case 'df': {
        return {
          stdout: `Filesystem     1K-blocks      Used Available Use% Mounted on
tmpfs            1638400      2144   1636256   1% /run
/dev/nvme0n1p2 491520000  42150000 424370000  10% /
tmpfs            8192000         0   8192000   0% /dev/shm
/dev/nvme0n1p1    524288      6144    518144   2% /boot/efi
`,
          exitCode: 0,
        };
      }

      case 'ps': {
        return {
          stdout: `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 169344 13540 ?        Ss   Apr24   0:04 /sbin/init
root      1482  0.2  1.4 845210 114520 ?       Ssl  Apr24   2:18 /usr/bin/dockerd
yash      1520  0.5  2.8 1420540 230410 ?      Ssl  Apr24   5:40 /usr/local/bin/k3s server
yash      1680  0.1  0.8 450120 68420 ?        Sl   Apr24   1:12 /usr/bin/prometheus
yash      1940  0.0  0.2  22410  5120 pts/0    Ss   08:00   0:00 /bin/bash
yash      2412  0.0  0.1  18420  3240 pts/0    R+   08:42   0:00 ps aux
`,
          exitCode: 0,
        };
      }

      case 'ip': {
        return {
          stdout: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    inet 127.0.0.1/8 scope host lo
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    inet 10.0.1.42/24 brd 10.0.1.255 scope global eth0
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
`,
          exitCode: 0,
        };
      }

      case 'ping': {
        const host = flags.find((f) => !f.startsWith('-')) || '8.8.8.8';
        return {
          stdout: `PING ${host} (${host}) 56(84) bytes of data.
64 bytes from ${host}: icmp_seq=1 ttl=118 time=14.2 ms
64 bytes from ${host}: icmp_seq=2 ttl=118 time=13.8 ms
64 bytes from ${host}: icmp_seq=3 ttl=118 time=14.5 ms
64 bytes from ${host}: icmp_seq=4 ttl=118 time=14.0 ms

--- ${host} ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 13.842/14.125/14.510/0.245 ms
`,
          exitCode: 0,
        };
      }

      case 'crontab': {
        if (flags.includes('-l')) {
          return {
            stdout: `# Automated Cloud Support maintenance crontab (lab)
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# 1. Terraform state backup script (lab environment)
0 2 * * * /home/yash/bin/backup-tfstate.sh > /var/log/backup-tfstate.log 2>&1

# 2. Prometheus scraping node healthcheck every 15 minutes
*/15 * * * * /home/yash/bin/healthcheck-alert.sh

# 3. Docker dangling image cleanup weekly
0 4 * * 0 /usr/bin/docker image prune -af --filter "until=168h"
`,
            exitCode: 0,
          };
        }
        return { stdout: 'crontab: use -l to display active schedule\n', exitCode: 0 };
      }

      case 'sudo': {
        const subcmd = flags.join(' ');
        if (subcmd.includes('rm -rf /')) {
          return {
            stdout: '\x1b[1;31m[CRITICAL] Kernel panic - not syncing: Fatal exception in interrupt\x1b[0m\nRebooting...',
            exitCode: 139,
            interactiveMode: 'panic',
          };
        }
        if (subcmd) {
          this.ctx.isRoot = true;
          const result = await this.execute(subcmd);
          this.ctx.isRoot = false;
          return result;
        }
        return { stdout: 'usage: sudo command\n', exitCode: 1 };
      }

      // ----------------------------------------------------
      // Package Manager (apt)
      // ----------------------------------------------------
      case 'apt':
      case 'apt-get': {
        const sub = flags[0];
        if (sub === 'list' && flags.includes('--installed')) {
          return {
            stdout: `Listing... Done
aws-cli/stable,now 2.15.30 amd64 [installed]
bash/stable,now 5.2.21 amd64 [installed]
docker-ce/stable,now 26.0.1 amd64 [installed]
git/stable,now 2.43.0 amd64 [installed]
htop/stable,now 3.3.0 amd64 [installed]
kubectl/stable,now 1.29.3 amd64 [installed]
neofetch/stable,now 7.1.0 all [installed]
prometheus/stable,now 2.51.0 amd64 [installed]
python3/stable,now 3.12.3 amd64 [installed]
terraform/stable,now 1.8.1 amd64 [installed]
`,
            exitCode: 0,
          };
        }
        if (sub === 'install') {
          const pkg = flags[1] || 'package';
          return {
            stdout: `Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  ${pkg}
0 upgraded, 1 newly installed, 0 to remove.
Need to get 4,120 kB of archives.
Get:1 http://archive.ubuntu.com/ubuntu noble/main amd64 ${pkg} [4,120 kB]
Fetched 4,120 kB in 0s (12.4 MB/s)
Selecting previously unselected package ${pkg}.
Setting up ${pkg} (24.04-1) ...
Processing triggers for man-db (2.12.0-1) ...
`,
            exitCode: 0,
          };
        }
        return { stdout: 'apt: try "apt list --installed" or "apt install <package>"\n', exitCode: 0 };
      }

      // ----------------------------------------------------
      // DevOps & Portfolio CLI Tools
      // ----------------------------------------------------
      case 'terraform': {
        const sub = flags[0];
        if (sub === 'plan' || sub === 'apply') {
          return {
            stdout: `\x1b[1;36mTerraform used the selected providers to generate the following execution plan.\x1b[0m
Resource actions are indicated with the following symbols:
  \x1b[1;32m+\x1b[0m create

Terraform will perform the following actions:

  \x1b[1;32m# module.vpc.aws_vpc.main\x1b[0m will be created
  \x1b[1;32m+\x1b[0m resource "aws_vpc" "main" {
      \x1b[1;32m+\x1b[0m cidr_block           = "10.0.0.0/16"
      \x1b[1;32m+\x1b[0m enable_dns_hostnames = true
      \x1b[1;32m+\x1b[0m enable_dns_support   = true
      \x1b[1;32m+\x1b[0m id                   = (known after apply)
      \x1b[1;32m+\x1b[0m tags                 = {
          \x1b[1;32m+\x1b[0m "Environment" = "Production"
          \x1b[1;32m+\x1b[0m "ManagedBy"   = "Terraform"
          \x1b[1;32m+\x1b[0m "Owner"       = "Yash Baviskar"
        }
    }

  \x1b[1;32m# module.alb.aws_lb.app_alb\x1b[0m will be created
  \x1b[1;32m+\x1b[0m resource "aws_lb" "app_alb" {
      \x1b[1;32m+\x1b[0m load_balancer_type = "application"
      \x1b[1;32m+\x1b[0m internal           = false
      \x1b[1;32m+\x1b[0m subnets            = ["subnet-pub-1a", "subnet-pub-1b"]
    }

  \x1b[1;32m# module.database.aws_db_instance.mysql\x1b[0m will be created
  \x1b[1;32m+\x1b[0m resource "aws_db_instance" "mysql" {
      \x1b[1;32m+\x1b[0m allocated_storage  = 20
      \x1b[1;32m+\x1b[0m engine             = "mysql"
      \x1b[1;32m+\x1b[0m engine_version     = "8.0"
      \x1b[1;32m+\x1b[0m multi_az           = true
      \x1b[1;32m+\x1b[0m storage_encrypted  = true
    }

\x1b[1;32mPlan: 12 to add, 0 to change, 0 to destroy.\x1b[0m

\x1b[1;30m─────────────────────────────────────────────────────────────────────────────\x1b[0m
Remote State: \x1b[1;33ms3://yash-terraform-remote-state-prod/aws-3tier/terraform.tfstate\x1b[0m
Lock Table:   \x1b[1;33marn:aws:dynamodb:eu-central-1:123456789012:table/terraform-state-locks\x1b[0m
`,
            exitCode: 0,
          };
        }
        if (sub === 'init') {
          return {
            stdout: `Initializing the backend...
Successfully configured the backend "s3"! Terraform will automatically
use this backend unless the backend configuration changes.

Initializing provider plugins...
- Finding hashicorp/aws versions matching "~> 5.0"...
- Installing hashicorp/aws v5.46.0...
- Installed hashicorp/aws v5.46.0 (signed by HashiCorp)

Terraform has been successfully initialized!
`,
            exitCode: 0,
          };
        }
        return { stdout: 'Terraform v1.8.1 on linux_amd64\nUsage: terraform [init|plan|apply|destroy]\n', exitCode: 0 };
      }

      case 'kubectl': {
        const sub = flags[0];
        if (sub === 'get' && flags.includes('pods')) {
          return {
            stdout: `NAMESPACE     NAME                                  READY   STATUS    RESTARTS   AGE
kube-system   coredns-6799fbcd5-24h9v               1/1     Running   0          42d
kube-system   local-path-provisioner-84bb86445-r9   1/1     Running   0          42d
kube-system   metrics-server-67c658d76b-z8q2x       1/1     Running   0          42d
monitoring    prometheus-server-7945d89f4b-kp29z    2/2     Running   0          18d
monitoring    grafana-dashboard-5688b5dc67-d8x1l    1/1     Running   0          18d
production    cloud-api-deployment-7b89f5c4-2m49x   1/1     Running   0          5d
production    cloud-api-deployment-7b89f5c4-8k91p   1/1     Running   0          5d
production    cloud-api-deployment-7b89f5c4-j72pq   1/1     Running   0          5d
production    redis-cache-cluster-0                 1/1     Running   0          24d
`,
            exitCode: 0,
          };
        }
        if (sub === 'get' && (flags.includes('nodes') || flags.includes('no'))) {
          return {
            stdout: `NAME             STATUS   ROLES                  AGE   VERSION
k3s-control-01   Ready    control-plane,master   42d   v1.29.3+k3s1
k3s-worker-01    Ready    <none>                 42d   v1.29.3+k3s1
k3s-worker-02    Ready    <none>                 42d   v1.29.3+k3s1
`,
            exitCode: 0,
          };
        }
        return { stdout: 'kubectl controls the Kubernetes cluster manager.\nTry: kubectl get pods -A or kubectl get nodes\n', exitCode: 0 };
      }

      case 'docker': {
        const sub = flags[0];
        if (sub === 'ps') {
          return {
            stdout: `CONTAINER ID   IMAGE                               COMMAND                  CREATED         STATUS         PORTS                    NAMES
8f9e1b2a3c4d   yashbaviskar15/cloud-api:v1.4.2     "node dist/index.js"     5 hours ago     Up 5 hours     0.0.0.0:3000->3000/tcp   cloud-api-prod
1a2b3c4d5e6f   prom/prometheus:v2.51.0             "/bin/prometheus --c…"   2 days ago      Up 2 days      0.0.0.0:9090->9090/tcp   prometheus-metrics
9z8y7x6w5v4u   grafana/grafana:10.4.1              "/run.sh"                2 days ago      Up 2 days      0.0.0.0:3001->3000/tcp   grafana-dashboards
5k4j3h2g1f0e   mysql:8.0                           "docker-entrypoint.s…"   2 weeks ago     Up 2 weeks     3306/tcp                 mysql-cluster-db
`,
            exitCode: 0,
          };
        }
        if (sub === 'images') {
          return {
            stdout: `REPOSITORY                        TAG       IMAGE ID       CREATED        SIZE
yashbaviskar15/cloud-api          v1.4.2    a1b2c3d4e5f6   5 hours ago    74.2MB
yashbaviskar15/terraform-runner   latest    f6e5d4c3b2a1   3 days ago     184MB
prom/prometheus                   v2.51.0   99a88b77c66d   2 weeks ago    218MB
grafana/grafana                   10.4.1    55e44d33c22b   3 weeks ago    380MB
node                              20-alpine 112233445566   4 weeks ago    48.5MB
`,
            exitCode: 0,
          };
        }
        return { stdout: 'Docker version 26.0.1, build 789b34e\nTry: docker ps or docker images\n', exitCode: 0 };
      }

      case 'aws': {
        const sub = flags.join(' ');
        if (sub.includes('sts get-caller-identity')) {
          return {
            stdout: `{
    "UserId": "AIDAIEXAMPLE45678901",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/yash-baviskar"
}
`,
            exitCode: 0,
          };
        }
        if (sub.includes('s3 ls')) {
          return {
            stdout: `2024-04-10 14:20:18 yash-terraform-remote-state-prod
2024-04-12 09:12:45 yash-cloud-assets-eu-central-1
2024-04-18 18:40:02 yash-prometheus-longterm-metrics
`,
            exitCode: 0,
          };
        }
        return { stdout: 'AWS CLI v2.15.30\nTry: aws sts get-caller-identity or aws s3 ls\n', exitCode: 0 };
      }

      case 'git': {
        const sub = flags[0];
        if (sub === 'log') {
          return {
            stdout: `\x1b[1;33m8f9b4c2\x1b[0m (HEAD -> main, origin/main) feat(infra): define 3-tier AWS architecture with Terraform modules (plan/validate)
\x1b[1;33m6a1e8d9\x1b[0m feat(docker): multi-stage Docker build; studying Kubernetes basics
\x1b[1;33m3d5f7a1\x1b[0m feat(cicd): GitHub Actions workflow defined for lint, test and image build
\x1b[1;33m9c2b4e6\x1b[0m feat(monitoring): Prometheus scrape config & Grafana dashboards (personal lab)
\x1b[1;33m1a2b3c4\x1b[0m feat(edu): BCA (2023-2026) — KCES's IMR Jalgaon
\x1b[1;33m0e8f9a2\x1b[0m Initial commit: Cloud Support Engineer workstation setup
`,
            exitCode: 0,
          };
        }
        if (sub === 'status') {
          return {
            stdout: `On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
`,
            exitCode: 0,
          };
        }
        return { stdout: 'git version 2.43.0\nTry: git log --oneline or git status\n', exitCode: 0 };
      }

      case 'systemctl': {
        const sub = flags.join(' ');
        if (sub.includes('yash.service') || sub.includes('status yash')) {
          return {
            stdout: `\x1b[1;32m●\x1b[0m yash.service - Yash Baviskar Engineering Availability Service
     Loaded: loaded (/etc/systemd/system/yash.service; enabled; preset: enabled)
     Active: \x1b[1;32mactive (running)\x1b[0m since Mon 2026-04-24 08:00:00 UTC; 42 days ago
   Main PID: 1337 (yash-engineer)
      Tasks: 12 (limit: 4915)
     Memory: 64.0M
        CPU: 12.4s
     CGroup: /system.slice/yash.service
             ├─1337 /usr/bin/yash-engineer --mode=cloud-support
             └─1338 /usr/bin/yash-telemetry --listen=0.0.0.0:8080

Apr 24 08:00:00 yashos systemd[1]: Started Yash Baviskar Engineering Availability Service.
Apr 24 08:00:01 yashos yash-engineer[1337]: [INFO] Candidate status: Available for Cloud Support Engineer roles.
Apr 24 08:00:02 yashos yash-engineer[1337]: [INFO] Open to relocation to Germany and other EU countries.
Apr 24 08:00:03 yashos yash-engineer[1337]: [INFO] Direct contact: yashbaviskar0215@outlook.com
`,
            exitCode: 0,
          };
        }
        return { stdout: 'Systemctl unit manager. Try: systemctl status yash.service\n', exitCode: 0 };
      }

      case 'neofetch':
      case 'fastfetch': {
        return {
          stdout: `\x1b[1;31m          ./+o+-       \x1b[0m\x1b[1;32myash\x1b[0m@\x1b[1;32myashos\x1b[0m
\x1b[1;31m                  yyyyy-     \x1b[0m------------------------
\x1b[1;31m               \`:+ssssssso+\`   \x1b[0m\x1b[1;33mOS\x1b[0m: YashOS 24.04 LTS x86_64
\x1b[1;31m             \`-/osssssssssss/  \x1b[0m\x1b[1;33mHost\x1b[0m: Cloud Support Workstation
\x1b[1;31m           \`:+sssssssssssssso  \x1b[0m\x1b[1;33mKernel\x1b[0m: 6.8.0-45-generic
\x1b[1;31m         \`-/ossssssssssssssso  \x1b[0m\x1b[1;33mUptime\x1b[0m: 42 days, 3 hours
\x1b[1;31m        .+sssssssssssssssssso  \x1b[0m\x1b[1;33mPackages\x1b[0m: 2,298 (dpkg)
\x1b[1;31m       .ossssssssssssssssssso  \x1b[0m\x1b[1;33mShell\x1b[0m: bash 5.2.21
\x1b[1;31m       .ossssssssssssssssssso  \x1b[0m\x1b[1;33mDE\x1b[0m: GNOME 46.0 (Yaru)
\x1b[1;31m        .+sssssssssssssssssso  \x1b[0m\x1b[1;33mWM\x1b[0m: Mutter
\x1b[1;31m         \`-/ossssssssssssssso  \x1b[0m\x1b[1;33mRole\x1b[0m: Cloud Support Engineer
\x1b[1;31m           \`:+sssssssssssssso  \x1b[0m\x1b[1;33mStack\x1b[0m: AWS, Linux, Terraform, Docker
\x1b[1;31m             \`-/osssssssssss/  \x1b[0m\x1b[1;33mMonitoring\x1b[0m: Prometheus & Grafana
\x1b[1;31m               \`:+ssssssso+\`   \x1b[0m\x1b[1;33mTarget\x1b[0m: Germany & EU relocation
\x1b[1;31m                  yyyyy-       \x1b[0m\x1b[1;33mTerminal\x1b[0m: YashOS Terminal
\x1b[1;31m          ./+o+-               \x1b[0m\x1b[1;33mMemory\x1b[0m: 5242MiB / 16000MiB
`,
          exitCode: 0,
        };
      }

      // ----------------------------------------------------
      // App Launchers & Helpers
      // ----------------------------------------------------
      case 'open':
      case 'xdg-open': {
        const target = flags[0];
        if (!target) return { stdout: '', stderr: 'open: missing target\n', exitCode: 1 };

        if (target.endsWith('.pdf') || target.toLowerCase() === 'resume') {
          return { stdout: `Opening ${target} in Document Viewer...\n`, openApp: 'resume', exitCode: 0 };
        }
        if (target.endsWith('.md') || target.endsWith('.txt') || target.endsWith('.tf') || target.endsWith('.yaml')) {
          return { stdout: `Opening ${target} in Text Editor...\n`, openApp: 'files', exitCode: 0 };
        }
        if (target === 'projects' || target.includes('Projects')) {
          return { stdout: 'Opening Projects application...\n', openApp: 'projects', exitCode: 0 };
        }
        if (target === 'contact' || target === 'mail') {
          return { stdout: 'Opening Contact application...\n', openApp: 'contact', exitCode: 0 };
        }
        if (target === 'terminal') {
          return { stdout: 'Terminal is currently active.\n', exitCode: 0 };
        }
        return { stdout: `Opening ${target}...\n`, openApp: 'files', exitCode: 0 };
      }

      case 'resume':
        return { stdout: 'Opening CV Document in Evince...\n', openApp: 'resume', exitCode: 0 };

      case 'contact':
      case 'mail':
        return { stdout: 'Opening Contact application...\n', openApp: 'contact', exitCode: 0 };

      case 'skills':
        return { stdout: 'Opening Skills Matrix...\n', openApp: 'skills', exitCode: 0 };

      case 'projects':
        return { stdout: 'Opening Cloud Projects...\n', openApp: 'projects', exitCode: 0 };

      case 'about':
        return {
          stdout: `\x1b[1;36mYash Baviskar — Cloud Support Engineer\x1b[0m
Location:    Jalgaon, Maharashtra, India (open to relocation to Germany & other EU countries)
Core Stack:  AWS (EC2, CloudWatch, IAM), Linux, Terraform (designed & validated), Docker, Prometheus/Grafana
Education:   Bachelor of Computer Applications (BCA, 2023 – 2026), CGPA 8.14/10
Contact:     yashbaviskar0215@outlook.com
Links:       https://yashbaviskar.me | https://github.com/yashbaviskar15 | https://linkedin.com/in/yashbaviskar15
Type 'projects', 'skills', or 'resume' to explore work or open CV.
`,
          exitCode: 0,
        };

      // ----------------------------------------------------
      // Easter Eggs & TUI Tools
      // ----------------------------------------------------
      case 'cowsay': {
        const text = flags.join(' ') || 'Cloud support with Yash!';
        const border = '-'.repeat(text.length + 2);
        return {
          stdout: ` ${border}
< ${text} >
 ${border}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`,
          exitCode: 0,
        };
      }

      case 'fortune': {
        const fortunes = [
          '“Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.” — Martin Golding',
          '“There are only two hard things in Computer Science: cache invalidation and naming things.” — Phil Karlton',
          '“Simplicity is prerequisite for reliability.” — Edsger W. Dijkstra',
          '“Automate everything. If you do it twice, write a script. If you do it three times, write a Terraform module.” — DevOps Proverb',
        ];
        return { stdout: `${fortunes[Math.floor(Math.random() * fortunes.length)]}\n`, exitCode: 0 };
      }

      case 'cmatrix':
        return { stdout: 'Starting Matrix Digital Stream...', exitCode: 0, interactiveMode: 'cmatrix' };

      case 'sl':
        return { stdout: 'Steam Locomotive chugging by...', exitCode: 0, interactiveMode: 'sl' };

      case 'top':
      case 'htop':
        return { stdout: 'Starting live system monitor...', exitCode: 0, interactiveMode: 'htop' };

      case 'vim':
      case 'vi':
        return {
          stdout: 'Type :q! or :wq to exit vim editor.\n',
          exitCode: 0,
          interactiveMode: 'vim',
          interactiveData: { file: flags[0] || 'untitled.txt' },
        };

      case 'nano':
        return {
          stdout: 'GNU nano 7.2. Press Ctrl+X to exit.',
          exitCode: 0,
          interactiveMode: 'nano',
          interactiveData: { file: flags[0] || 'untitled.txt' },
        };

      case 'help': {
        return {
          stdout: `YashOS 24.04 LTS — Interactive Bash Shell Guide:
  File Operations:   ls, cd, pwd, cat, head, tail, grep, find, wc, tree, mkdir, rm, cp, mv, touch
  Cloud & Container Tools: terraform [plan|init], kubectl [get pods|nodes], docker [ps|images], aws sts, git log
  System Commands:   neofetch, top, htop, uptime, free, df, ip a, ping, systemctl status yash.service, crontab -l
  Portfolio Links:   resume, contact, skills, projects, open <file>
  Pipes & Features:  Supports pipes '|', redirects '>', '>>', '<', '&&', '||', variables '$VAR', globbing '*'
  Easter Eggs:       cmatrix, sl, cowsay <msg>, fortune, vim, nano
`,
          exitCode: 0,
        };
      }

      default:
        return {
          stdout: '',
          stderr: `bash: ${cmd}: command not found\nDid you mean: 'terraform', 'kubectl', 'docker', 'neofetch', 'help'?\n`,
          exitCode: 127,
        };
    }
  }

  /**
   * Autocompletion engine for commands, flags, and VFS file paths
   */
  public autocomplete(currentLine: string): { completedLine: string; suggestions: string[] } {
    const trimmed = currentLine;
    const tokens = trimmed.split(' ');
    const lastToken = tokens[tokens.length - 1];

    // If autocompleting the first command word
    if (tokens.length === 1) {
      const allCommands = [
        'ls', 'cd', 'pwd', 'cat', 'head', 'tail', 'grep', 'find', 'wc', 'tree',
        'mkdir', 'rm', 'cp', 'mv', 'touch', 'echo', 'date', 'cal', 'clear', 'history',
        'alias', 'export', 'env', 'whoami', 'hostname', 'id', 'uname', 'uptime',
        'free', 'df', 'ps', 'ip', 'ping', 'crontab', 'sudo', 'apt', 'terraform',
        'kubectl', 'docker', 'aws', 'git', 'systemctl', 'neofetch', 'fastfetch',
        'open', 'resume', 'contact', 'skills', 'projects', 'about', 'cowsay', 'fortune',
        'cmatrix', 'sl', 'top', 'htop', 'vim', 'nano', 'help',
      ];
      const matches = allCommands.filter((c) => c.startsWith(lastToken));
      if (matches.length === 1) {
        return { completedLine: matches[0] + ' ', suggestions: [] };
      }
      return { completedLine: currentLine, suggestions: matches };
    }

    // Autocompleting paths
    const pathArg = lastToken;
    let dirToSearch = this.ctx.cwd;
    let filePrefix = pathArg;

    if (pathArg.includes('/')) {
      const lastSlash = pathArg.lastIndexOf('/');
      const dirPart = pathArg.substring(0, lastSlash) || '/';
      filePrefix = pathArg.substring(lastSlash + 1);
      dirToSearch = vfs.resolvePath(this.ctx.cwd, dirPart);
    }

    const items = vfs.listDir(dirToSearch, filePrefix.startsWith('.'));
    const matches = items.filter((item) => item.name.startsWith(filePrefix)).map((item) => {
      const isDir = item.type === 'folder';
      if (pathArg.includes('/')) {
        const base = pathArg.substring(0, pathArg.lastIndexOf('/') + 1);
        return `${base}${item.name}${isDir ? '/' : ''}`;
      }
      return `${item.name}${isDir ? '/' : ''}`;
    });

    if (matches.length === 1) {
      tokens[tokens.length - 1] = matches[0];
      return { completedLine: tokens.join(' ') + (matches[0].endsWith('/') ? '' : ' '), suggestions: [] };
    }

    return { completedLine: currentLine, suggestions: matches };
  }
}

export const bashInterpreter = new BashInterpreter();
