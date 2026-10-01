import React, { useState } from 'react';
import { Sun, CloudRain, Cloud, CloudSun, Wind, Droplets } from 'lucide-react';
import { useGnomeStore } from '../../../store/useGnomeStore';

export const WeatherApp: React.FC = () => {
  const { themeMode } = useGnomeStore();
  const [selectedCity, setSelectedCity] = useState(0);

  const locations = [
    { city: 'Frankfurt (eu-central-1)', temp: '16°C', condition: 'Partly Cloudy', humidity: '62%', wind: '14 km/h', icon: <CloudSun className="w-8 h-8 text-amber-400" /> },
    { city: 'Dublin (eu-west-1)', temp: '13°C', condition: 'Light Rain', humidity: '78%', wind: '22 km/h', icon: <CloudRain className="w-8 h-8 text-sky-400" /> },
    { city: 'Mumbai (ap-south-1)', temp: '31°C', condition: 'Sunny & Humid', humidity: '75%', wind: '11 km/h', icon: <Sun className="w-8 h-8 text-orange-400" /> },
    { city: 'Amsterdam (eu-central-2)', temp: '15°C', condition: 'Overcast', humidity: '68%', wind: '18 km/h', icon: <Cloud className="w-8 h-8 text-neutral-300" /> },
  ];

  const current = locations[selectedCity];

  return (
    <div
      className={`h-full flex flex-col p-4 sm:p-6 font-sans select-none ${
        themeMode === 'dark' ? 'bg-[#18181b] text-neutral-200' : 'bg-white text-neutral-900'
      }`}
    >
      {/* City Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto gnome-scrollbar pb-3 border-b border-white/10 shrink-0">
        {locations.map((loc, idx) => (
          <button
            key={loc.city}
            type="button"
            onClick={() => setSelectedCity(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCity === idx
                ? 'bg-orange-600 text-white font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {loc.city.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Main Weather Card */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 my-auto">
        <div className="p-4 rounded-3xl bg-neutral-900/60 border border-white/10 shadow-lg">
          {current.icon}
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading">
            {current.temp}
          </h1>
          <p className="text-sm font-semibold text-orange-400 font-mono">
            {current.condition}
          </p>
          <p className="text-xs text-neutral-400 font-mono">{current.city}</p>
        </div>

        {/* Details Row */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs pt-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-neutral-900/50 border border-white/10 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-sky-400" />
            <div className="text-left">
              <span className="text-[10px] text-neutral-500 block">Humidity</span>
              <span className="font-bold">{current.humidity}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-900/50 border border-white/10 flex items-center gap-2">
            <Wind className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <span className="text-[10px] text-neutral-500 block">Wind Speed</span>
              <span className="font-bold">{current.wind}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
