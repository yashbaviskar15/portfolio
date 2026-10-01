import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Plus, X, Maximize2, Minimize2, Copy, Check, Sparkles, ChevronRight, Shield, RefreshCw } from 'lucide-react';
import { bashInterpreter, ShellResult } from '../../../lib/bashInterpreter';
import { useGnomeStore } from '../../../store/useGnomeStore';

interface TerminalTab {
  id: string;
  title: string;
  history: { type: 'input' | 'output' | 'error'; text: string; prompt?: string }[];
  currentInput: string;
  historyIndex: number;
  interactiveMode?: 'htop' | 'cmatrix' | 'vim' | 'nano' | 'sl' | 'panic';
}

export const TerminalApp: React.FC = () => {
  const { openApp, setRecruiterViewOpen } = useGnomeStore();
  const [tabs, setTabs] = useState<TerminalTab[]>([
    {
      id: 'tab-1',
      title: 'yash@yashos:~',
      history: [
        {
          type: 'output',
          text: `\x1b[1;36m================================================================================
  Welcome to YashOS 24.04 LTS (GNU/Linux 6.8.0-generic x86_64)
  Interactive Cloud & DevOps Engineering Workstation
================================================================================\x1b[0m
  * Engineer:       Yash Baviskar (AWS, Terraform, Docker, K8s, CI/CD, Linux)
  * Target Roles:   Junior Cloud Engineer / Junior DevOps Engineer (EU & Remote)
  * Status:         \x1b[1;32mAvailable for Hire\x1b[0m
  * Quick Tips:     Type \x1b[1;33m'terraform plan'\x1b[0m, \x1b[1;33m'kubectl get pods'\x1b[0m, \x1b[1;33m'neofetch'\x1b[0m, or \x1b[1;33m'help'\x1b[0m
================================================================================
`,
        },
      ],
      currentInput: '',
      historyIndex: -1,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');
  const [theme, setTheme] = useState<'yaru' | 'matrix' | 'dracula'>('yaru');
  const [fontSize, setFontSize] = useState<number>(13);
  const [copied, setCopied] = useState<boolean>(false);
  const [reverseSearch, setReverseSearch] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    inputRef.current?.focus();
  }, [activeTab?.history, activeTab?.currentInput]);

  const handleCreateTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTab: TerminalTab = {
      id: newId,
      title: `yash@yashos:~`,
      history: [
        {
          type: 'output',
          text: `YashOS 24.04 LTS bash session initialized.\n`,
        },
      ],
      currentInput: '',
      historyIndex: -1,
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
  };

  const handleCloseTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const filtered = tabs.filter((t) => t.id !== id);
    setTabs(filtered);
    if (activeTabId === id) {
      setActiveTabId(filtered[0].id);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'c' && e.ctrlKey) {
      // Ctrl+C: Cancel current line or exit interactive mode
      e.preventDefault();
      if (activeTab.interactiveMode) {
        updateActiveTab({ interactiveMode: undefined });
        return;
      }
      appendHistory('input', activeTab.currentInput + '^C', bashInterpreter.getPrompt());
      updateActiveTab({ currentInput: '', historyIndex: -1 });
      return;
    }

    if (e.key === 'l' && e.ctrlKey) {
      // Ctrl+L: Clear screen
      e.preventDefault();
      updateActiveTab({ history: [] });
      return;
    }

    if (e.key === 'w' && e.ctrlKey) {
      // Ctrl+W: Delete word backwards (Unix readline)
      e.preventDefault();
      const current = activeTab.currentInput;
      const match = current.match(/^(.*?)(\s*\S+\s*)$/);
      const updated = match ? match[1] : '';
      updateActiveTab({ currentInput: updated });
      return;
    }

    if (e.key === 'u' && e.ctrlKey) {
      // Ctrl+U: Clear line from cursor to beginning (Unix readline)
      e.preventDefault();
      updateActiveTab({ currentInput: '' });
      return;
    }

    if (e.key === 'r' && e.ctrlKey) {
      // Ctrl+R: Reverse search
      e.preventDefault();
      setReverseSearch(reverseSearch === null ? '' : null);
      return;
    }

    if (e.key === 'Tab') {
      // Tab Autocompletion
      e.preventDefault();
      const { completedLine, suggestions } = bashInterpreter.autocomplete(activeTab.currentInput);
      if (suggestions.length > 1) {
        appendHistory('input', activeTab.currentInput, bashInterpreter.getPrompt());
        appendHistory('output', suggestions.join('   '));
      }
      updateActiveTab({ currentInput: completedLine });
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const historyItems = bashInterpreter.getContext().history;
      if (historyItems.length === 0) return;

      const nextIdx = activeTab.historyIndex === -1 ? historyItems.length - 1 : Math.max(0, activeTab.historyIndex - 1);
      updateActiveTab({
        historyIndex: nextIdx,
        currentInput: historyItems[nextIdx] || '',
      });
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const historyItems = bashInterpreter.getContext().history;
      if (activeTab.historyIndex === -1) return;

      const nextIdx = activeTab.historyIndex + 1;
      if (nextIdx >= historyItems.length) {
        updateActiveTab({ historyIndex: -1, currentInput: '' });
      } else {
        updateActiveTab({
          historyIndex: nextIdx,
          currentInput: historyItems[nextIdx] || '',
        });
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = activeTab.currentInput;
      const prompt = bashInterpreter.getPrompt();
      appendHistory('input', cmd, prompt);
      updateActiveTab({ currentInput: '', historyIndex: -1 });

      const result: ShellResult = await bashInterpreter.execute(cmd);

      if (result.clear) {
        updateActiveTab({ history: [] });
        return;
      }

      if (result.interactiveMode) {
        updateActiveTab({ interactiveMode: result.interactiveMode });
        if (result.interactiveMode === 'panic') {
          setTimeout(() => {
            window.location.reload();
          }, 3500);
        }
        return;
      }

      if (result.stdout) {
        appendHistory('output', result.stdout);
      }
      if (result.stderr) {
        appendHistory('error', result.stderr);
      }

      if (result.openApp) {
        if (result.openApp === 'resume') openApp('resume');
        else if (result.openApp === 'contact') openApp('contact');
        else if (result.openApp === 'skills') openApp('skills');
        else if (result.openApp === 'projects') openApp('projects');
        else if (result.openApp === 'files') openApp('files');
      }
    }
  };

  const appendHistory = (type: 'input' | 'output' | 'error', text: string, prompt?: string) => {
    updateActiveTab({
      history: [...activeTab.history, { type, text, prompt }],
    });
  };

  const updateActiveTab = (partial: Partial<TerminalTab>) => {
    setTabs(tabs.map((t) => (t.id === activeTabId ? { ...t, ...partial } : t)));
  };

  const handleRunQuickCommand = async (cmd: string) => {
    const prompt = bashInterpreter.getPrompt();
    appendHistory('input', cmd, prompt);
    const result: ShellResult = await bashInterpreter.execute(cmd);
    if (result.clear) {
      updateActiveTab({ history: [] });
      return;
    }
    if (result.interactiveMode) {
      updateActiveTab({ interactiveMode: result.interactiveMode });
      return;
    }
    if (result.stdout) {
      appendHistory('output', result.stdout);
    }
    if (result.stderr) {
      appendHistory('error', result.stderr);
    }
    if (result.openApp) {
      if (result.openApp === 'resume') openApp('resume');
      else if (result.openApp === 'contact') openApp('contact');
      else if (result.openApp === 'skills') openApp('skills');
      else if (result.openApp === 'projects') openApp('projects');
      else if (result.openApp === 'files') openApp('files');
    }
    inputRef.current?.focus();
  };

  const handleCopyOutput = () => {
    const text = activeTab.history.map((h) => (h.prompt ? `${h.prompt} ${h.text}` : h.text)).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMobileVirtualKey = (key: string) => {
    if (key === 'Tab') {
      const { completedLine } = bashInterpreter.autocomplete(activeTab.currentInput);
      updateActiveTab({ currentInput: completedLine });
    } else if (key === 'Ctrl+C') {
      appendHistory('input', activeTab.currentInput + '^C', bashInterpreter.getPrompt());
      updateActiveTab({ currentInput: '', historyIndex: -1 });
    } else if (key === 'Clear') {
      updateActiveTab({ history: [] });
    } else if (key === 'Up') {
      const historyItems = bashInterpreter.getContext().history;
      if (historyItems.length > 0) {
        const nextIdx = activeTab.historyIndex === -1 ? historyItems.length - 1 : Math.max(0, activeTab.historyIndex - 1);
        updateActiveTab({ historyIndex: nextIdx, currentInput: historyItems[nextIdx] || '' });
      }
    } else if (key === 'Down') {
      const historyItems = bashInterpreter.getContext().history;
      if (activeTab.historyIndex !== -1) {
        const nextIdx = activeTab.historyIndex + 1;
        if (nextIdx >= historyItems.length) updateActiveTab({ historyIndex: -1, currentInput: '' });
        else updateActiveTab({ historyIndex: nextIdx, currentInput: historyItems[nextIdx] || '' });
      }
    } else {
      updateActiveTab({ currentInput: activeTab.currentInput + key });
    }
    inputRef.current?.focus();
  };

  // Convert ANSI escape sequences to HTML styling
  const renderAnsi = (text: string) => {
    const formatted = text
      .replace(/\x1b\[1;31m/g, '<span class="text-rose-400 font-bold">')
      .replace(/\x1b\[1;32m/g, '<span class="text-emerald-400 font-bold">')
      .replace(/\x1b\[1;33m/g, '<span class="text-amber-400 font-bold">')
      .replace(/\x1b\[1;34m/g, '<span class="text-sky-400 font-bold">')
      .replace(/\x1b\[1;35m/g, '<span class="text-purple-400 font-bold">')
      .replace(/\x1b\[1;36m/g, '<span class="text-cyan-400 font-bold">')
      .replace(/\x1b\[1;30m/g, '<span class="text-neutral-500">')
      .replace(/\x1b\[0m/g, '</span>');

    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={`h-full flex flex-col font-mono select-text cursor-text relative ${
        theme === 'matrix'
          ? 'bg-black text-emerald-400'
          : theme === 'dracula'
          ? 'bg-[#181926] text-[#cad3f5]'
          : 'bg-[#18181b] text-neutral-100'
      }`}
      style={{ fontSize: `${fontSize}px` }}
    >
      {/* Floating Minimal Tooltip Controls (Theme / Font / Copy) */}
      <div className="absolute top-2.5 right-3.5 flex items-center gap-1.5 text-xs text-neutral-400 z-10 opacity-40 hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 select-none">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setFontSize(Math.max(10, fontSize - 1));
          }}
          className="px-1.5 py-0.5 rounded hover:bg-white/15 text-[10px] text-neutral-300 transition-colors cursor-pointer"
          title="Decrease Font Size"
        >
          A-
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setFontSize(Math.min(18, fontSize + 1));
          }}
          className="px-1.5 py-0.5 rounded hover:bg-white/15 text-[10px] text-neutral-300 transition-colors cursor-pointer"
          title="Increase Font Size"
        >
          A+
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setTheme(theme === 'yaru' ? 'matrix' : theme === 'matrix' ? 'dracula' : 'yaru');
          }}
          className="px-1.5 py-0.5 rounded hover:bg-white/15 text-[10px] text-neutral-300 font-mono transition-colors cursor-pointer"
          title="Toggle Terminal Theme"
        >
          {theme.toUpperCase()}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleCopyOutput();
          }}
          className="p-1 rounded hover:bg-white/15 text-neutral-300 transition-colors cursor-pointer"
          title="Copy Output"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
        </button>
      </div>

      {/* Tabs Header - ONLY visible when user creates 2 or more tabs */}
      {tabs.length > 1 && (
        <div className="flex items-center justify-between bg-black/40 border-b border-white/10 px-2 py-1 select-none shrink-0">
          <div className="flex items-center gap-1 overflow-x-auto gnome-scrollbar">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTabId(tab.id);
                }}
                className={`flex items-center gap-2 px-3 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                  tab.id === activeTabId
                    ? 'bg-white/15 text-white border-b-2 border-orange-500 font-semibold'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'
                }`}
              >
                <TerminalIcon className="w-3 h-3 text-orange-400 shrink-0" />
                <span className="truncate max-w-[120px]">{tab.title}</span>
                <button
                  type="button"
                  onClick={(e) => handleCloseTab(tab.id, e)}
                  className="hover:text-rose-400 rounded p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCreateTab();
              }}
              className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="New Tab (Ctrl+Shift+T)"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Terminal Output Buffer */}
      <div className="flex-1 p-4 overflow-y-auto gnome-scrollbar space-y-1.5">
        {/* Interactive Mode Overlays (htop, cmatrix, vim) */}
        {activeTab.interactiveMode === 'htop' && (
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-4 pb-2 border-b border-neutral-700">
              <div>
                <p className="text-emerald-400">1  [|||||||||||||||||||         48.2%] Tasks: 42, 112 thr</p>
                <p className="text-emerald-400">2  [||||||||||||                 32.4%] Load average: 0.18 0.12</p>
              </div>
              <div>
                <p className="text-sky-400">Mem[||||||||||||||||||   5.24G/16.0G] Uptime: 42 days</p>
                <p className="text-amber-400">Swp[                          0K/2.00G]</p>
              </div>
            </div>
            <p className="text-neutral-400">PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command</p>
            <p className="text-emerald-300">1482 root       20   0  825M  112M 34200 S  1.2  0.7  2:18.40 /usr/bin/dockerd</p>
            <p className="text-emerald-300">1520 yash       20   0 1420M  230M 45100 S  2.8  1.4  5:40.12 /usr/local/bin/k3s</p>
            <p className="text-emerald-300">1680 yash       20   0  450M   68M 18400 S  0.8  0.4  1:12.04 /usr/bin/prometheus</p>
            <p className="pt-2 text-neutral-500">Press <span className="text-orange-400 font-bold">Ctrl+C</span> to exit htop</p>
          </div>
        )}

        {activeTab.interactiveMode === 'cmatrix' && (
          <div className="text-emerald-500 text-xs animate-pulse font-mono leading-tight space-y-1">
            <p>0 1 0 1 1 0 1 0 1 0 0 1 0 1 1 0 1 0 1 0 1 0 1 0 1</p>
            <p>1 0 1 0 1 0 1 0 1 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0</p>
            <p>T E R R A F O R M   D O C K E R   K U B E R N E T E S</p>
            <p>1 1 0 1 0 1 0 0 1 0 1 1 0 1 0 1 0 1 0 1 1 0 1 0 1</p>
            <p>0 1 0 1 1 0 1 0 1 0 0 1 0 1 1 0 1 0 1 0 1 0 1 0 1</p>
            <p className="pt-2 text-neutral-400">Press <span className="text-white font-bold">Ctrl+C</span> to exit matrix</p>
          </div>
        )}

        {/* Regular Command History */}
        {!activeTab.interactiveMode && (
          <>
            {activeTab.history.map((item, idx) => (
              <div key={idx} className="leading-relaxed break-words whitespace-pre-wrap">
                {item.type === 'input' && (
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">{item.prompt || 'yash@yashos:~$'}</span>
                    <span className="text-white">{item.text}</span>
                  </div>
                )}
                {item.type === 'output' && (
                  <div className="text-neutral-200">{renderAnsi(item.text)}</div>
                )}
                {item.type === 'error' && (
                  <div className="text-rose-400">{renderAnsi(item.text)}</div>
                )}
              </div>
            ))}

            {/* Active Command Line Input */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-emerald-400 font-bold shrink-0">
                {bashInterpreter.getPrompt()}
              </span>
              <div className="relative flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={activeTab.currentInput}
                  onChange={(e) => updateActiveTab({ currentInput: e.target.value })}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-white font-mono p-0 focus:ring-0"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>
          </>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Authentic Linux GNOME Terminal Statusline */}
      <div className="flex items-center justify-between px-3.5 py-1 bg-black/40 border-t border-white/5 text-[11px] text-neutral-400 font-mono select-none shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto gnome-scrollbar">
          <span className="text-neutral-500 text-[10px]">Tips:</span>
          {['terraform plan', 'kubectl get pods', 'docker ps', 'neofetch', 'help'].map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => handleRunQuickCommand(cmd)}
              className="hover:text-orange-400 hover:underline cursor-pointer text-neutral-400 transition-colors text-[10px]"
            >
              {cmd}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-neutral-500 shrink-0">
          <span>bash 5.2</span>
          <span>•</span>
          <span>UTF-8</span>
        </div>
      </div>

      {/* Mobile Touch Toolbar with Essential Virtual Keys */}
      <div className="flex items-center gap-1.5 p-1.5 bg-black/60 border-t border-white/10 overflow-x-auto gnome-scrollbar md:hidden text-xs select-none shrink-0">
        {['Tab', 'Ctrl+C', 'Clear', 'Up', 'Down', '|', '~', '/', '-', '&&', 'ls', 'tf', 'k', 'd'].map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => handleMobileVirtualKey(key)}
            className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 active:bg-orange-600 text-white font-mono text-[11px] shrink-0 transition-colors cursor-pointer"
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};
