import { useEffect, useState } from 'react';
import './SystemStatus.css';

export default function SystemStatus() {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const statusItems = [
    { label: 'Status', value: 'Available', indicator: true },
    { label: 'Time', value: time, indicator: false },
    { label: 'Timezone', value: 'IST (UTC+5:30)', indicator: false },
    { label: 'Response Time', value: '< 100ms', indicator: false },
  ];

  const projectStats = [
    { label: 'Deployed', value: '15+', icon: '🚀' },
    { label: 'Success Rate', value: '99.8%', icon: '✅' },
    { label: 'Uptime', value: '99.9%', icon: '📈' },
    { label: 'Active Projects', value: '8', icon: '💻' },
  ];

  return (
    <div className="system-status">
      {/* Main Status Display */}
      <div className="status-board">
        <div className="status-header">
          <h3 className="status-title">System Status</h3>
          <span className="status-refresh">[LIVE]</span>
        </div>

        {/* Primary Status Grid */}
        <div className="status-grid">
          {statusItems.map((item, idx) => (
            <div key={idx} className="status-item">
              <div className="status-label-wrapper">
                <span className="status-label">{item.label}</span>
                {item.indicator && <div className="status-indicator"></div>}
              </div>
              <div className="status-value-wrapper">
                <span className="status-value">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Statistics */}
      <div className="stats-board">
        <div className="stats-header">
          <h3 className="stats-title">Project Analytics</h3>
        </div>

        <div className="stats-grid">
          {projectStats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-name">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
