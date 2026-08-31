import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Check } from 'lucide-react';
import { useGnomeStore, wallpaperPresets } from '../../store/useGnomeStore';
import { springPhysics } from '../../lib/animations';

export const WallpaperModal: React.FC = () => {
  const { isWallpaperModalOpen, setWallpaperModalOpen, selectedWallpaperId, setWallpaper, themeMode, accentColor } = useGnomeStore();

  return (
    <AnimatePresence>
      {isWallpaperModalOpen && (
        <motion.div
          key="wallpaper-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-70 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 select-none"
          onClick={() => setWallpaperModalOpen(false)}
        >
          <motion.div
            key="wallpaper-dialog"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={springPhysics}
            onClick={(e) => e.stopPropagation()}
            className={`max-w-xl w-full p-6 rounded-3xl border shadow-2xl space-y-5 ${
              themeMode === 'dark' ? 'bg-[#1e1e22]/95 border-white/15 text-white' : 'bg-white border-neutral-300 text-neutral-900'
            }`}
          >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/30">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-heading">Change Desktop Background</h3>
                <p className="text-xs text-neutral-400">Strictly CSS gradients — zero raster photos</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setWallpaperModalOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Wallpaper Presets Grid */}
          <div className="grid grid-cols-2 gap-4">
            {wallpaperPresets.map((preset) => {
              const isSelected = selectedWallpaperId === preset.id;

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setWallpaper(preset.id)}
                  className={`p-2 rounded-2xl border flex flex-col items-center gap-2.5 transition-all cursor-pointer group text-left ${
                    isSelected
                      ? 'border-orange-500 bg-orange-600/10 shadow-lg'
                      : 'border-white/10 hover:border-white/20 bg-neutral-900/50'
                  }`}
                >
                  <div
                    className="w-full h-24 rounded-xl border border-white/10 shadow-inner flex items-center justify-center relative overflow-hidden"
                    style={{ background: preset.previewBg }}
                  >
                    {isSelected && (
                      <div
                        className="w-7 h-7 rounded-full text-white flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: accentColor }}
                      >
                        <Check className="w-4 h-4 font-bold" />
                      </div>
                    )}
                  </div>

                  <span className={`text-xs font-semibold font-mono truncate w-full text-center ${
                    isSelected ? 'text-orange-400 font-bold' : 'text-neutral-300'
                  }`}>
                    {preset.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-center text-xs text-neutral-500 font-mono pt-1">
            Backgrounds cross-fade smoothly across desktop viewports
          </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
