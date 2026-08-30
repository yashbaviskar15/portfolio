import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGnomeStore, wallpaperPresets } from '../../store/useGnomeStore';

export const UbuntuWallpaper: React.FC = () => {
  const { selectedWallpaperId } = useGnomeStore();
  const currentPreset = wallpaperPresets.find((p) => p.id === selectedWallpaperId) || wallpaperPresets[0];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic Animated Gradient Layer with Cross-Fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPreset.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full gnome-wallpaper"
          style={{ background: currentPreset.gradient }}
        />
      </AnimatePresence>

      {/* Subtle Geometric Ubuntu Noble Numbat Origami Vector Grid (Pure SVG) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M 400,200 L 700,500 L 600,850 L 300,750 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M 700,500 L 1100,350 L 1300,700 L 600,850 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M 1100,350 L 1500,250 L 1650,600 L 1300,700 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="960" cy="540" r="420" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
      </svg>
    </div>
  );
};
