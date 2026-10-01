import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Maximize, ArrowLeft, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { useGnomeStore } from '../../../store/useGnomeStore';
import { Tooltip } from '../Tooltip';

export const ImageViewerApp: React.FC = () => {
  const { themeMode, windows } = useGnomeStore();
  const imageWin = windows.find((w) => w.id === 'image-viewer');
  const imageList = [
    { title: 'AWS 3-Tier Multi-AZ Cloud Architecture', url: '/hero-bg.png', path: '/home/yash/Desktop/AWS-Topology.drawio.png' },
    { title: 'Yash Baviskar — Profile Photo', url: '/profile.jpg', path: '/home/yash/Pictures/profile.jpg' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const currentImg = imageList[currentIndex] || imageList[0];

  const handleZoomIn = () => setScale((prev) => Math.min(3, prev + 0.25));
  const handleZoomOut = () => setScale((prev) => Math.max(0.5, prev - 0.25));
  const handleResetZoom = () => {
    setScale(1);
    setRotation(0);
  };
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1));
    handleResetZoom();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0));
    handleResetZoom();
  };

  return (
    <div
      className={`h-full flex flex-col font-sans select-none ${
        themeMode === 'dark' ? 'bg-[#121214] text-neutral-200' : 'bg-neutral-100 text-neutral-900'
      }`}
    >
      {/* Eye of GNOME Toolbar */}
      <div
        className={`px-4 py-2 border-b flex items-center justify-between shrink-0 ${
          themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10' : 'bg-white border-neutral-200 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2">
          <Tooltip content="Previous Image" side="bottom">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-300 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Tooltip>
          <span className="text-xs font-semibold truncate max-w-[200px]">
            {currentImg.title}
          </span>
          <Tooltip content="Next Image" side="bottom">
            <button
              type="button"
              onClick={handleNext}
              className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-300 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </Tooltip>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1.5 text-xs">
          <Tooltip content="Zoom In" shortcut="+" side="bottom">
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-300 transition-colors cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </Tooltip>
          <span className="font-mono text-[11px] w-12 text-center text-neutral-400">
            {Math.round(scale * 100)}%
          </span>
          <Tooltip content="Zoom Out" shortcut="-" side="bottom">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-300 transition-colors cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </Tooltip>
          <Tooltip content="Rotate 90°" side="bottom">
            <button
              type="button"
              onClick={handleRotate}
              className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-300 transition-colors cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </Tooltip>
          <Tooltip content="Fit to Window" side="bottom">
            <button
              type="button"
              onClick={handleResetZoom}
              className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] text-neutral-200 transition-colors cursor-pointer"
            >
              Reset
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-4 relative bg-black/20">
        <div
          className="transition-transform duration-200 ease-out max-w-full max-h-full flex items-center justify-center"
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
          }}
        >
          <img
            src={currentImg.url}
            alt={currentImg.title}
            className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div
        className={`px-4 py-1.5 border-t flex items-center justify-between text-[11px] font-mono shrink-0 ${
          themeMode === 'dark' ? 'bg-neutral-900/90 border-white/10 text-neutral-400' : 'bg-white border-neutral-200 text-neutral-600'
        }`}
      >
        <span>{currentImg.path}</span>
        <span>Image {currentIndex + 1} of {imageList.length}</span>
      </div>
    </div>
  );
};
