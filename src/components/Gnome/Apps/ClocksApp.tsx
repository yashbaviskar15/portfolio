import React, { useState, useEffect } from 'react';
import { Clock, Globe } from 'lucide-react';
import { useGnomeStore } from '../../../store/useGnomeStore';

export const ClocksApp: React.FC = () => {
  const { themeMode } = useGnomeStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const worldClocks = [
    { city: 'Local Time (Jalgaon)', tz: 'Asia/Kolkata', offset: 'IST' },
    { city: 'Frankfurt (EU Target)', tz: 'Europe/Berlin', offset: 'CET' },
    { city: 'London (GMT)', tz: 'Europe/London', offset: 'GMT' },
    { city: 'New York (EST)', tz: 'America/New_York', offset: 'EST' },
  ];

  return (
    <div
      className={`h-full flex flex-col p-4 sm:p-6 font-sans select-none ${
        themeMode === 'dark' ? 'bg-[#18181b] text-neutral-200' : 'bg-white text-neutral-900'
      }`}
    >
      <div className="flex items-center gap-2 pb-4 border-b border-white/10">
        <Clock className="w-5 h-5 text-orange-400" />
        <h2 className="text-base font-bold">World Clocks</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 flex-1">
        {worldClocks.map((wc) => {
          const timeStr = time.toLocaleTimeString([], {
            timeZone: wc.tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          });

          return (
            <div
              key={wc.city}
              className={`p-4 rounded-2xl border flex flex-col justify-between ${
                themeMode === 'dark' ? 'bg-neutral-900/80 border-white/10' : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              <div>
                <span className="text-xs font-semibold text-neutral-400">{wc.city}</span>
                <p className="text-2xl font-mono font-extrabold text-white mt-1">{timeStr}</p>
              </div>
              <span className="text-[10px] font-mono text-orange-400 font-bold">{wc.offset}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
