import { useState, useEffect } from 'react';
import SidebarNav from './SidebarNav';
import SystemStatus from './SystemStatus';
import ProfileCard from './ProfileCard';
import ContentPanel from './ContentPanel';
import GeometricBackground from './GeometricBackground';
import TerminalBoot from './TerminalBoot';
import './TerminalLayout.css';

export default function TerminalLayout() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isBooting, setIsBooting] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const bootTimer = setTimeout(() => setIsBooting(false), 3500);
    return () => clearTimeout(bootTimer);
  }, []);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  if (isBooting) {
    return <TerminalBoot onBootComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="terminal-layout">
      <GeometricBackground />
      
      <div className="terminal-container">
        {/* Terminal Window Header */}
        <div className="terminal-header">
          <div className="terminal-title-bar">
            <div className="terminal-controls">
              <div className="terminal-dot close"></div>
              <div className="terminal-dot minimize"></div>
              <div className="terminal-dot maximize"></div>
            </div>
            <span className="terminal-title">yash@cloud-engineer:~/portfolio</span>
          </div>
        </div>

        <div className="terminal-body">
          {/* Left Sidebar Navigation */}
          <SidebarNav activeSection={activeSection} onSectionChange={setActiveSection} />

          {/* Main Content Area */}
          <div className="terminal-main-content">
            {/* System Status Board */}
            <SystemStatus activeSection={activeSection} showCursor={showCursor} />

            {/* Profile Card */}
            {activeSection === 'profile' && <ProfileCard />}

            {/* Content Panels for Other Sections */}
            {activeSection !== 'profile' && (
              <ContentPanel section={activeSection} showCursor={showCursor} />
            )}

            {/* Command Input Simulation */}
            <div className="terminal-command-line">
              <span className="command-prompt">$</span>
              <span className={`command-cursor ${showCursor ? 'active' : ''}`}>▌</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
