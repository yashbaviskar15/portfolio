import React, { useState, useEffect } from 'react';
import { Save, Plus, X, FileText, Check, AlertCircle, FileCode } from 'lucide-react';
import { toast } from 'sonner';
import { vfs } from '../../../lib/virtualFileSystem';
import { useGnomeStore } from '../../../store/useGnomeStore';

interface EditorTab {
  id: string;
  path: string;
  filename: string;
  content: string;
  isDirty: boolean;
}

export const TextEditorApp: React.FC = () => {
  const { themeMode, windows } = useGnomeStore();
  const textEditorWin = windows.find((w) => w.id === 'text-editor');
  const initialPath = textEditorWin?.activeFilePath || '/home/yash/Desktop/README.md';

  const [tabs, setTabs] = useState<EditorTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>('');

  useEffect(() => {
    // Load initial file or fallback
    const node = vfs.getNode(initialPath);
    const content = node?.content || '# Untitled Document\n\nWrite here...';
    const filename = initialPath.substring(initialPath.lastIndexOf('/') + 1) || 'untitled.md';

    const firstTab: EditorTab = {
      id: 'tab-1',
      path: initialPath,
      filename,
      content,
      isDirty: false,
    };
    setTabs([firstTab]);
    setActiveTabId('tab-1');
  }, [initialPath]);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handleContentChange = (newContent: string) => {
    if (!activeTab) return;
    setTabs(
      tabs.map((t) =>
        t.id === activeTabId ? { ...t, content: newContent, isDirty: true } : t
      )
    );
  };

  const handleSave = () => {
    if (!activeTab) return;
    vfs.writeFile(activeTab.path, activeTab.content);
    setTabs(
      tabs.map((t) => (t.id === activeTabId ? { ...t, isDirty: false } : t))
    );
    toast.success(`Saved ${activeTab.filename} to virtual filesystem.`);
  };

  const handleNewTab = () => {
    const newId = `tab-${Date.now()}`;
    const newPath = `/home/yash/Documents/untitled_${tabs.length + 1}.txt`;
    const newTab: EditorTab = {
      id: newId,
      path: newPath,
      filename: `untitled_${tabs.length + 1}.txt`,
      content: '',
      isDirty: false,
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

  const lineCount = activeTab ? activeTab.content.split('\n').length : 1;
  const charCount = activeTab ? activeTab.content.length : 0;

  const getLanguageMode = (filename: string) => {
    if (filename.endsWith('.tf')) return 'Terraform HCL';
    if (filename.endsWith('.yaml') || filename.endsWith('.yml')) return 'YAML';
    if (filename.endsWith('.json')) return 'JSON';
    if (filename.endsWith('.sh') || filename.startsWith('.')) return 'Shell Script';
    if (filename.endsWith('.md')) return 'Markdown';
    return 'Plain Text';
  };

  return (
    <div
      className={`h-full flex flex-col font-sans select-text ${
        themeMode === 'dark' ? 'bg-[#18181b] text-neutral-200' : 'bg-white text-neutral-900'
      }`}
    >
      {/* gedit Tabs Bar */}
      <div
        className={`flex items-center justify-between border-b px-2 py-1 select-none shrink-0 ${
          themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-neutral-100 border-neutral-200'
        }`}
      >
        <div className="flex items-center gap-1 overflow-x-auto gnome-scrollbar">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-t-xl text-xs transition-colors cursor-pointer ${
                tab.id === activeTabId
                  ? themeMode === 'dark'
                    ? 'bg-[#18181b] text-white border-t-2 border-orange-500 font-semibold'
                    : 'bg-white text-neutral-900 border-t-2 border-orange-500 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span className="truncate max-w-[140px]">{tab.filename}</span>
              {tab.isDirty && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" title="Unsaved changes" />}
              {tabs.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => handleCloseTab(tab.id, e)}
                  className="hover:text-rose-400 p-0.5 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleNewTab}
            className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="New Document"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Toolbar Save Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save (Ctrl+S)</span>
          </button>
        </div>
      </div>

      {/* Editor Main Canvas with Line Numbers */}
      <div className="flex-1 flex overflow-hidden font-mono text-xs">
        {/* Line Numbers Column */}
        <div
          className={`w-12 py-3 px-2 text-right select-none shrink-0 font-mono text-[11px] leading-relaxed border-r ${
            themeMode === 'dark'
              ? 'bg-neutral-900/50 border-white/5 text-neutral-600'
              : 'bg-neutral-50 border-neutral-200 text-neutral-400'
          }`}
        >
          {Array.from({ length: Math.max(1, lineCount) }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Text Area Canvas */}
        <textarea
          value={activeTab?.content || ''}
          onChange={(e) => handleContentChange(e.target.value)}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
              e.preventDefault();
              handleSave();
            }
          }}
          spellCheck={false}
          className={`flex-1 p-3 bg-transparent resize-none outline-none font-mono text-xs leading-relaxed overflow-y-auto gnome-scrollbar ${
            themeMode === 'dark' ? 'text-neutral-100 placeholder:text-neutral-600' : 'text-neutral-900 placeholder:text-neutral-400'
          }`}
          placeholder="Start typing..."
        />
      </div>

      {/* gedit Bottom Status Bar */}
      <div
        className={`px-4 py-1.5 border-t flex items-center justify-between text-[11px] font-mono select-none shrink-0 ${
          themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10 text-neutral-400' : 'bg-neutral-100 border-neutral-200 text-neutral-600'
        }`}
      >
        <div className="flex items-center gap-3">
          <span>{activeTab ? activeTab.path : ''}</span>
          <span>•</span>
          <span>{lineCount} lines, {charCount} characters</span>
        </div>

        <div className="flex items-center gap-3">
          <span>UTF-8</span>
          <span>•</span>
          <span className="text-orange-400 font-semibold">{activeTab ? getLanguageMode(activeTab.filename) : 'Plain Text'}</span>
        </div>
      </div>
    </div>
  );
};
