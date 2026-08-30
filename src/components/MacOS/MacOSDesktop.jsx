import React, { useState, useEffect } from 'react';
import Wallpaper from './Wallpaper';
import TopMenuBar from './TopMenuBar';
import DesktopIcons from './DesktopIcons';
import CenterHero from './CenterHero';
import Widgets from './Widgets';
import Dock from './Dock';
import WindowManager from './WindowManager';
import ControlCenter from './ControlCenter';
import SpotlightSearch from './SpotlightSearch';

export default function MacOSDesktop() {
  const [openWindows, setOpenWindows] = useState({
    // Start with clean desktop, or projects ready to explore
  });
  const [activeWindow, setActiveWindow] = useState(null);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState('sonoma');

  // Open window handler
  const handleOpenWindow = (windowId) => {
    if (windowId === 'spotlight') {
      setIsSpotlightOpen(true);
      return;
    }
    setOpenWindows((prev) => ({ ...prev, [windowId]: true }));
    setActiveWindow(windowId);
  };

  // Close window handler
  const handleCloseWindow = (windowId) => {
    setOpenWindows((prev) => {
      const copy = { ...prev };
      delete copy[windowId];
      return copy;
    });
    if (activeWindow === windowId) {
      setActiveWindow(null);
    }
  };

  // Minimize window handler
  const handleMinimizeWindow = (windowId) => {
    handleCloseWindow(windowId);
  };

  // Focus window
  const handleFocusWindow = (windowId) => {
    setActiveWindow(windowId);
  };

  // Global keybindings (⌘K for Spotlight, ⌘T for Terminal)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 't') {
        e.preventDefault();
        handleOpenWindow('terminal');
      }
      if (e.key === 'Escape') {
        setIsControlCenterOpen(false);
        setIsSpotlightOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-slate-950 font-sans text-white">
      {/* 1. Dynamic Sonoma Abstract Wallpaper */}
      <Wallpaper currentWallpaper={currentWallpaper} />

      {/* 2. Top Glassmorphic Menu Bar */}
      <TopMenuBar
        activeWindow={activeWindow}
        onOpenWindow={handleOpenWindow}
        onToggleControlCenter={() => setIsControlCenterOpen((prev) => !prev)}
        onToggleSpotlight={() => setIsSpotlightOpen(true)}
      />

      {/* 3. Left-Side Clickable Desktop Files & Folders */}
      <DesktopIcons onOpenWindow={handleOpenWindow} />

      {/* 4. Center Hero Focal Point */}
      <CenterHero
        onOpenContact={() => handleOpenWindow('contact')}
        onOpenProjects={() => handleOpenWindow('projects')}
      />

      {/* 5. Right-Side iOS / Sonoma Stacked Widgets */}
      <Widgets
        onOpenProfile={() => handleOpenWindow('skills')}
        onOpenProjects={() => handleOpenWindow('projects')}
        onOpenContact={() => handleOpenWindow('contact')}
      />

      {/* 6. Active Draggable / Scalable macOS Window Applications */}
      <WindowManager
        openWindows={openWindows}
        activeWindow={activeWindow}
        onCloseWindow={handleCloseWindow}
        onMinimizeWindow={handleMinimizeWindow}
        onFocusWindow={handleFocusWindow}
        onOpenWindow={handleOpenWindow}
      />

      {/* 7. Magnifying Floating Bottom Dock */}
      <Dock
        openWindows={openWindows}
        onOpenWindow={handleOpenWindow}
        onToggleControlCenter={() => setIsControlCenterOpen((prev) => !prev)}
      />

      {/* 8. Control Center Overlay */}
      <ControlCenter
        isOpen={isControlCenterOpen}
        onClose={() => setIsControlCenterOpen(false)}
        currentWallpaper={currentWallpaper}
        onSelectWallpaper={setCurrentWallpaper}
      />

      {/* 9. Spotlight Search Overlay */}
      <SpotlightSearch
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        onOpenWindow={handleOpenWindow}
      />
    </div>
  );
}
