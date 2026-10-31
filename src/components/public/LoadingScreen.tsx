import React, { useEffect, useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { settings } = useWebsite();
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!settings.loading_screen_enabled) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        const jump = Math.floor(Math.random() * 12) + 6;
        return Math.min(100, prev + jump);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [settings.loading_screen_enabled, onComplete]);

  if (!settings.loading_screen_enabled) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-14 bg-[#080808] text-white transition-all duration-700 pointer-events-auto ${
        isFading ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Top Header */}
      <div className="flex justify-between items-center text-xs tracking-widest text-zinc-400 uppercase font-mono">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-ping" />
          {settings.company_name}
        </span>
        <span>CREATIVE DIGITAL ENGINEERING</span>
      </div>

      {/* Middle Kinetic Typography */}
      <div className="my-auto max-w-4xl">
        <p className="text-zinc-500 text-sm md:text-base font-mono mb-3 tracking-wider">
          INITIALIZING DIGITAL EXPERIENCES // 2026
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-none">
          WE MAKE <span className="text-gradient-purple">IDEAS</span> MOVE.
        </h1>
      </div>

      {/* Bottom Progress Bar & Counter */}
      <div>
        <div className="flex justify-between items-end mb-4 font-mono text-sm">
          <span className="text-zinc-400 text-xs">SYNCHRONIZING ASSETS & 3D CANVASES</span>
          <span className="text-3xl md:text-5xl font-bold font-mono text-[#8B5CF6]">
            {progress}%
          </span>
        </div>
        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#C4B5FD] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
