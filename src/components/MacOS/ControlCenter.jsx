import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WALLPAPERS } from './Wallpaper';

export default function ControlCenter({ isOpen, onClose, currentWallpaper, onSelectWallpaper }) {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [airDropEnabled, setAirDropEnabled] = useState(true);
  const [brightness, setBrightness] = useState(85);
  const [volume, setVolume] = useState(70);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -8, x: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8, x: 8 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-9 right-3 w-80 sm:w-88 rounded-2xl glass-window p-3 shadow-2xl z-50 text-white select-none border border-white/20 backdrop-blur-2xl"
      >
        <div className="space-y-3">
          {/* Top Connectivity Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Wi-Fi & Bluetooth Stack */}
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 space-y-2">
              {/* Wi-Fi */}
              <button
                onClick={() => setWifiEnabled(!wifiEnabled)}
                className="w-full flex items-center gap-2.5 p-1 rounded-lg hover:bg-white/10 transition-colors text-left"
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm ${wifiEnabled ? 'bg-blue-500 text-white' : 'bg-white/20 text-white/60'}`}>
                  <i className="bi bi-wifi" />
                </div>
                <div>
                  <div className="text-[12px] font-semibold leading-tight">Wi-Fi</div>
                  <div className="text-[10px] text-white/60">{wifiEnabled ? 'Cloud Mesh 5G' : 'Off'}</div>
                </div>
              </button>

              {/* Bluetooth */}
              <button
                onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
                className="w-full flex items-center gap-2.5 p-1 rounded-lg hover:bg-white/10 transition-colors text-left"
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm ${bluetoothEnabled ? 'bg-blue-500 text-white' : 'bg-white/20 text-white/60'}`}>
                  <i className="bi bi-bluetooth" />
                </div>
                <div>
                  <div className="text-[12px] font-semibold leading-tight">Bluetooth</div>
                  <div className="text-[10px] text-white/60">{bluetoothEnabled ? 'AirPods Pro' : 'Off'}</div>
                </div>
              </button>
            </div>

            {/* AirDrop & Do Not Disturb */}
            <div className="grid grid-rows-2 gap-2">
              <button
                onClick={() => setAirDropEnabled(!airDropEnabled)}
                className="p-2.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2.5 hover:bg-white/15 transition-colors text-left"
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm ${airDropEnabled ? 'bg-blue-500 text-white' : 'bg-white/20 text-white/60'}`}>
                  <i className="bi bi-broadcast" />
                </div>
                <div>
                  <div className="text-[12px] font-semibold leading-tight">AirDrop</div>
                  <div className="text-[10px] text-white/60">{airDropEnabled ? 'Contacts Only' : 'Off'}</div>
                </div>
              </button>

              <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2.5 text-left">
                <div className="w-7 h-7 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm">
                  <i className="bi bi-moon-stars-fill" />
                </div>
                <div>
                  <div className="text-[12px] font-semibold leading-tight">Focus</div>
                  <div className="text-[10px] text-white/60">Cloud Engineer Mode</div>
                </div>
              </div>
            </div>
          </div>

          {/* Wallpaper Switcher */}
          <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-white/80">
              <span className="flex items-center gap-1.5">
                <i className="bi bi-image" />
                <span>Desktop Wallpaper</span>
              </span>
              <span className="text-[10px] text-white/50">{WALLPAPERS[currentWallpaper]?.name}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {Object.values(WALLPAPERS).map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => onSelectWallpaper(wp.id)}
                  className={`h-10 rounded-lg p-0.5 border transition-all relative overflow-hidden ${
                    currentWallpaper === wp.id ? 'border-blue-400 ring-2 ring-blue-400/50 scale-105' : 'border-white/20 hover:border-white/40'
                  }`}
                  title={wp.name}
                >
                  <div className={`w-full h-full rounded-md bg-gradient-to-br ${wp.bgClass}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Sliders: Display Brightness & Volume */}
          <div className="p-3 rounded-xl bg-white/10 border border-white/15 space-y-3">
            {/* Brightness */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-semibold text-white/80">
                <span className="flex items-center gap-1.5">
                  <i className="bi bi-brightness-high" />
                  <span>Display</span>
                </span>
                <span className="font-mono text-[10px]">{brightness}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Sound */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-semibold text-white/80">
                <span className="flex items-center gap-1.5">
                  <i className="bi bi-volume-up-fill" />
                  <span>Sound</span>
                </span>
                <span className="font-mono text-[10px]">{volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          {/* Now Playing Widget */}
          <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-base shadow-md">
                <i className="bi bi-music-note-beamed" />
              </div>
              <div>
                <div className="text-[12px] font-semibold leading-tight">Automating Clouds</div>
                <div className="text-[10px] text-white/60">Yash Baviskar • Synthwave Lo-Fi</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/80 pr-1">
              <i className="bi bi-play-fill text-xl hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
