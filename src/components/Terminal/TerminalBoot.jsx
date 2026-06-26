import { useEffect, useState } from 'react';
import './TerminalBoot.css';

const bootMessages = [
  { text: '+----------------------------------------+', delay: 0 },
  { text: '|                                        |', delay: 200 },
  { text: '|    YASH CLOUD ENGINEER PORTFOLIO      |', delay: 400 },
  { text: '|              v2.0.0                    |', delay: 600 },
  { text: '|                                        |', delay: 800 },
  { text: '+----------------------------------------+', delay: 1000 },
  { text: '', delay: 1200 },
  { text: '> Initializing system...', delay: 1400 },
  { text: '> Loading cloud infrastructure...', delay: 1800 },
  { text: '> Mounting file systems...', delay: 2200 },
  { text: '> Configuring terminal environment...', delay: 2600 },
  { text: '> System ready! [OK]', delay: 3000 },
];

export default function TerminalBoot({ onBootComplete }) {
  const [bootSequence, setBootSequence] = useState([]);

  useEffect(() => {
    const timers = bootMessages.map((msg) => {
      const timer = setTimeout(() => {
        setBootSequence((prev) => [...prev, msg.text]);
      }, msg.delay);
      return timer;
    });

    const completeTimer = setTimeout(() => {
      onBootComplete();
    }, 3500);

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      clearTimeout(completeTimer);
    };
  }, [onBootComplete]);

  return (
    <div className="terminal-boot">
      <div className="boot-container">
        <div className="boot-screen">
          {bootSequence.map((line, idx) => (
            <div key={idx} className="boot-line">
              <span className="boot-text">{line}</span>
              {idx === bootSequence.length - 1 && <span className="boot-cursor">|</span>}
            </div>
          ))}
        </div>
        <div className="boot-progress">
          <div className="progress-bar">
            <div className="progress-fill" />
          </div>
        </div>
      </div>
    </div>
  );
}
