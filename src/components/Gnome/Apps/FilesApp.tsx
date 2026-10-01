import React, { useState, useEffect } from 'react';
import {
  Folder,
  FileText,
  FileCode,
  Image as ImageIcon,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  LayoutGrid,
  List as ListIcon,
  Search,
  Plus,
  Trash2,
  ExternalLink,
  Home,
  HardDrive,
  FolderGit2,
  File,
  Briefcase,
} from 'lucide-react';
import { toast } from 'sonner';
import { vfs, VFSNode } from '../../../lib/virtualFileSystem';
import { useGnomeStore } from '../../../store/useGnomeStore';
import { Tooltip } from '../Tooltip';

export const FilesApp: React.FC = () => {
  const { themeMode, openFileInApp, openApp } = useGnomeStore();
  const [currentPath, setCurrentPath] = useState<string>('/home/yash');
  const [historyStack, setHistoryStack] = useState<string[]>(['/home/yash']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<VFSNode | null>(null);
  const [vfsVersion, setVfsVersion] = useState<number>(0);

  useEffect(() => {
    return vfs.subscribe(() => {
      setVfsVersion((v) => v + 1);
    });
  }, []);

  const items = vfs
    .listDir(currentPath, false)
    .filter((f) => f.name.toLowerCase().includes(searchFilter.toLowerCase()));

  const navigateTo = (path: string) => {
    const resolved = vfs.resolvePath(currentPath, path);
    const node = vfs.getNode(resolved);
    if (!node || node.type !== 'folder') return;

    setCurrentPath(resolved);
    setSelectedFile(null);
    const newStack = historyStack.slice(0, historyIndex + 1);
    newStack.push(resolved);
    setHistoryStack(newStack);
    setHistoryIndex(newStack.length - 1);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prev = historyStack[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(prev);
      setSelectedFile(null);
    }
  };

  const handleForward = () => {
    if (historyIndex < historyStack.length - 1) {
      const next = historyStack[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(next);
      setSelectedFile(null);
    }
  };

  const handleUp = () => {
    if (currentPath === '/') return;
    const parent = currentPath.substring(0, currentPath.lastIndexOf('/')) || '/';
    navigateTo(parent);
  };

  const handleItemClick = (node: VFSNode) => {
    setSelectedFile(node);
    if (node.type === 'folder') {
      navigateTo(node.name);
    } else {
      const fullPath = vfs.resolvePath(currentPath, node.name);
      openFileInApp(fullPath);
    }
  };

  const handleCreateNewFolder = () => {
    const name = `New_Folder_${Date.now().toString().slice(-4)}`;
    vfs.createFolder(vfs.resolvePath(currentPath, name));
    toast.success(`Created folder ${name}`);
  };

  const handleDeleteSelected = () => {
    if (!selectedFile) return;
    const targetPath = vfs.resolvePath(currentPath, selectedFile.name);
    vfs.deleteNode(targetPath, false);
    setSelectedFile(null);
    toast.success(`Moved ${selectedFile.name} to Trash`);
  };

  const getFileIcon = (node: VFSNode) => {
    if (node.type === 'folder') {
      return <Folder className="w-8 h-8 text-amber-400" />;
    }
    const name = node.name.toLowerCase();
    if (name.endsWith('.pdf')) return <FileText className="w-8 h-8 text-rose-400" />;
    if (name.endsWith('.png') || name.endsWith('.jpg')) return <ImageIcon className="w-8 h-8 text-sky-400" />;
    if (name.endsWith('.tf') || name.endsWith('.yaml') || name.endsWith('.json') || name.endsWith('.sh')) {
      return <FileCode className="w-8 h-8 text-emerald-400" />;
    }
    if (name.endsWith('.md')) return <FileText className="w-8 h-8 text-purple-400" />;
    return <File className="w-8 h-8 text-neutral-400" />;
  };

  const sidebarPlaces = [
    { label: 'Home', path: '/home/yash', icon: <Home className="w-4 h-4 text-orange-400" /> },
    { label: 'Desktop', path: '/home/yash/Desktop', icon: <HardDrive className="w-4 h-4 text-sky-400" /> },
    { label: 'Documents', path: '/home/yash/Documents', icon: <FileText className="w-4 h-4 text-purple-400" /> },
    { label: 'Projects', path: '/home/yash/Projects', icon: <FolderGit2 className="w-4 h-4 text-amber-400" /> },
    { label: 'Experience', path: '/home/yash/Experience', icon: <Briefcase className="w-4 h-4 text-rose-400" /> },
    { label: 'Pictures', path: '/home/yash/Pictures', icon: <ImageIcon className="w-4 h-4 text-emerald-400" /> },
    { label: 'File System', path: '/', icon: <HardDrive className="w-4 h-4 text-neutral-400" /> },
  ];

  const breadcrumbs = currentPath.split('/').filter(Boolean);

  return (
    <div
      className={`h-full flex flex-col font-sans select-none ${
        themeMode === 'dark' ? 'bg-[#18181b] text-neutral-200' : 'bg-white text-neutral-900'
      }`}
    >
      {/* Nautilus Top Toolbar */}
      <div
        className={`px-4 py-2 border-b flex flex-wrap items-center justify-between gap-3 shrink-0 ${
          themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-neutral-100 border-neutral-200 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <Tooltip content="Back" side="bottom">
            <button
              type="button"
              onClick={handleBack}
              disabled={historyIndex === 0}
              className="p-1.5 rounded-lg hover:bg-white/10 disabled:opacity-40 transition-colors cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Tooltip>
          <Tooltip content="Forward" side="bottom">
            <button
              type="button"
              onClick={handleForward}
              disabled={historyIndex >= historyStack.length - 1}
              className="p-1.5 rounded-lg hover:bg-white/10 disabled:opacity-40 transition-colors cursor-pointer"
              aria-label="Forward"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </Tooltip>
          <Tooltip content="Parent Directory" side="bottom">
            <button
              type="button"
              onClick={handleUp}
              disabled={currentPath === '/'}
              className="p-1.5 rounded-lg hover:bg-white/10 disabled:opacity-40 transition-colors cursor-pointer"
              aria-label="Parent Directory"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </Tooltip>

          {/* Breadcrumbs Path Bar */}
          <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-black/20 border border-white/10 text-xs font-mono">
            <button
              type="button"
              onClick={() => navigateTo('/')}
              className="hover:text-orange-400 font-bold transition-colors cursor-pointer"
            >
              /
            </button>
            {breadcrumbs.map((crumb, idx) => {
              const subpath = '/' + breadcrumbs.slice(0, idx + 1).join('/');
              return (
                <React.Fragment key={subpath}>
                  <span className="text-neutral-500">/</span>
                  <button
                    type="button"
                    onClick={() => navigateTo(subpath)}
                    className={`hover:text-orange-400 transition-colors cursor-pointer ${
                      idx === breadcrumbs.length - 1 ? 'text-orange-400 font-bold' : 'text-neutral-300'
                    }`}
                  >
                    {crumb}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Search & Actions Cluster */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search in folder..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="pl-8 pr-2 py-1 rounded-lg bg-white/10 border border-white/15 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-500 w-36 sm:w-44"
            />
          </div>

          <Tooltip content="New Folder" side="bottom">
            <button
              type="button"
              onClick={handleCreateNewFolder}
              className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-300 transition-colors cursor-pointer"
              aria-label="New Folder"
            >
              <Plus className="w-4 h-4" />
            </button>
          </Tooltip>

          {selectedFile && (
            <Tooltip content="Delete Selected" side="bottom">
              <button
                type="button"
                onClick={handleDeleteSelected}
                className="p-1.5 rounded-lg hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                aria-label="Delete Selected"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </Tooltip>
          )}

          <div className="flex items-center border border-white/15 rounded-lg overflow-hidden">
            <Tooltip content="Grid View" side="bottom">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 transition-colors ${
                  viewMode === 'grid' ? 'bg-orange-600 text-white' : 'hover:bg-white/10 text-neutral-400'
                }`}
                aria-label="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </Tooltip>
            <Tooltip content="List View" side="bottom">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 transition-colors ${
                  viewMode === 'list' ? 'bg-orange-600 text-white' : 'hover:bg-white/10 text-neutral-400'
                }`}
                aria-label="List View"
              >
                <ListIcon className="w-3.5 h-3.5" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Main Files Area: Sidebar + Browser */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Places */}
        <div
          className={`w-44 p-3 border-r hidden md:flex flex-col gap-1 shrink-0 ${
            themeMode === 'dark' ? 'bg-neutral-900/40 border-white/10' : 'bg-neutral-50 border-neutral-200'
          }`}
        >
          <span className="text-[10px] font-bold font-mono text-neutral-400 uppercase tracking-wider px-2 py-1">
            Places
          </span>
          {sidebarPlaces.map((place) => (
            <button
              key={place.path}
              type="button"
              onClick={() => navigateTo(place.path)}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                currentPath === place.path
                  ? 'bg-orange-600 text-white font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {place.icon}
              <span>{place.label}</span>
            </button>
          ))}
        </div>

        {/* Main Folder Explorer */}
        <div className="flex-1 p-4 overflow-y-auto gnome-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 text-xs">
              <Folder className="w-10 h-10 stroke-1 mb-2 opacity-40" />
              <p>This folder is empty.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {items.map((item) => (
                <div
                  key={item.name}
                  onClick={() => handleItemClick(item)}
                  className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer ${
                    selectedFile?.name === item.name
                      ? 'bg-orange-600/30 border border-orange-500 text-white'
                      : 'hover:bg-white/5 border border-transparent text-neutral-300'
                  }`}
                >
                  {getFileIcon(item)}
                  <span className="text-xs font-medium truncate max-w-full">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {item.type === 'folder' ? 'Folder' : item.size || '1.0 KB'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1 text-xs">
              <div className="grid grid-cols-12 gap-2 px-3 py-1.5 text-[11px] font-mono text-neutral-500 border-b border-white/5 uppercase">
                <span className="col-span-6">Name</span>
                <span className="col-span-3">Size</span>
                <span className="col-span-3">Type</span>
              </div>
              {items.map((item) => (
                <div
                  key={item.name}
                  onClick={() => handleItemClick(item)}
                  className={`grid grid-cols-12 gap-2 px-3 py-2 rounded-xl items-center transition-colors cursor-pointer ${
                    selectedFile?.name === item.name
                      ? 'bg-orange-600/30 text-white'
                      : 'hover:bg-white/5 text-neutral-300'
                  }`}
                >
                  <div className="col-span-6 flex items-center gap-2 truncate">
                    {getFileIcon(item)}
                    <span className="truncate">{item.name}</span>
                  </div>
                  <span className="col-span-3 font-mono text-neutral-400">
                    {item.type === 'folder' ? '--' : item.size || '1.0 KB'}
                  </span>
                  <span className="col-span-3 text-neutral-400">
                    {item.type === 'folder' ? 'Folder' : 'Document'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div
        className={`px-4 py-1.5 border-t flex items-center justify-between text-[11px] font-mono shrink-0 ${
          themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10 text-neutral-400' : 'bg-neutral-100 border-neutral-200 text-neutral-600'
        }`}
      >
        <span>{items.length} items</span>
        <span>{selectedFile ? `${selectedFile.name} selected` : 'Free space: 424.3 GB'}</span>
      </div>
    </div>
  );
};
