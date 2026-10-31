import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { updateWebsiteSettings } from '../../lib/database-service';
import {
  Sparkles,
  Zap,
  MousePointer,
  Clock,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Eye
} from 'lucide-react';

export const AnimationSettingsView: React.FC = () => {
  const { settings, refreshData } = useWebsite();

  const [animationsEnabled, setAnimationsEnabled] = useState(settings.animations_enabled ?? true);
  const [animationSpeed, setAnimationSpeed] = useState(settings.animation_speed ?? 1.0);
  const [loadingScreenEnabled, setLoadingScreenEnabled] = useState(settings.loading_screen_enabled ?? true);
  const [cursorEffectsEnabled, setCursorEffectsEnabled] = useState(settings.cursor_effects_enabled ?? true);

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const speedOptions = [
    { label: '0.5x Cinematic', value: 0.5, desc: 'Ultra-deliberate, high-luxury pace' },
    { label: '1.0x Normal', value: 1.0, desc: 'Balanced 60fps responsiveness (Default)' },
    { label: '1.5x Kinetic', value: 1.5, desc: 'Snappy modern physics and rapid transitions' },
    { label: '2.0x Hyper', value: 2.0, desc: 'Instantaneous UI feedback' },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      await updateWebsiteSettings({
        animations_enabled: animationsEnabled,
        animation_speed: animationSpeed,
        loading_screen_enabled: loadingScreenEnabled,
        cursor_effects_enabled: cursorEffectsEnabled,
      });
      await refreshData();
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to update animation settings:', err);
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8B5CF6] uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            MOTION & USER INTERACTION ENGINE
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Animation Settings
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
            Control the kinetic choreography, motion speed multiplier, cursor follower, and intro loading screen.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sliders className="w-4 h-4" />}
          <span>{isSaving ? 'Applying...' : 'Apply & Save Settings'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Animation settings updated and active on the website!</span>
        </div>
      )}

      {/* Main Settings Cards */}
      <div className="space-y-6">
        {/* Toggle 1: Master Animations */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 flex items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-bold font-display text-white">
              <Zap className="w-4 h-4 text-[#8B5CF6]" />
              <span>Enable Master Micro-Animations</span>
            </div>
            <p className="text-xs text-zinc-400 font-light">
              Activates ambient glow pulses, float physics on cards, marquee banners, and interactive button hover states.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={animationsEnabled}
              onChange={e => setAnimationsEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5CF6]"></div>
          </label>
        </div>

        {/* Setting 2: Animation Speed Multiplier */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold font-display text-white">
            <Clock className="w-4 h-4 text-[#8B5CF6]" />
            <span>Animation Velocity / Speed Multiplier ({animationSpeed}x)</span>
          </div>
          <p className="text-xs text-zinc-400 font-light">
            Adjusts CSS transitions and motion timelines across public website components.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {speedOptions.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAnimationSpeed(opt.value)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  animationSpeed === opt.value
                    ? 'border-[#8B5CF6] bg-[#8B5CF6]/15 text-white shadow-lg shadow-[#8B5CF6]/20'
                    : 'border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="text-xs font-bold">{opt.label}</div>
                <div className="text-[11px] text-zinc-500 mt-1">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Toggle 3: Cinematic Loading Screen */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 flex items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-bold font-display text-white">
              <Eye className="w-4 h-4 text-[#8B5CF6]" />
              <span>Cinematic Intro Loading Screen</span>
            </div>
            <p className="text-xs text-zinc-400 font-light">
              Displays the Awwwards-style typography percentage counter and logo reveal when a visitor first arrives.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={loadingScreenEnabled}
              onChange={e => setLoadingScreenEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5CF6]"></div>
          </label>
        </div>

        {/* Toggle 4: Custom Magnetic Cursor */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 flex items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-bold font-display text-white">
              <MousePointer className="w-4 h-4 text-[#8B5CF6]" />
              <span>Custom Kinetic Cursor & Magnetic Ring</span>
            </div>
            <p className="text-xs text-zinc-400 font-light">
              Replaces standard browser pointer with an electric purple ring and trailing luminous particle that expands on clickable items.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={cursorEffectsEnabled}
              onChange={e => setCursorEffectsEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5CF6]"></div>
          </label>
        </div>
      </div>
    </div>
  );
};
