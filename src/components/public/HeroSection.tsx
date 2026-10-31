import React from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { ArrowUpRight, Sparkles, Zap, Shield, Play, Flame } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { settings } = useWebsite();

  const clientLogos = [
    'STRIPE', 'VERCEL', 'LINEAR', 'FRAMER', 'FIGMA', 'NIKE LAB', 'OPENAI', 'SOLANA', 'CHRONO'
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col justify-center">
      {/* Background Glows & Mesh Grids */}
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/15 rounded-full blur-[140px] pointer-events-none animate-glowPulse" />
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] bg-[#6D28D9]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#4C1D95]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
        {/* Top Floating Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-white/10 shadow-lg shadow-purple-500/10 animate-fade-in">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B5CF6]"></span>
            </span>
            <span className="text-xs font-mono tracking-wider text-zinc-300 uppercase">
              {settings.hero_badge || 'AWWWARDS NOMINEE 2026 • DIGITAL AGENCY OF THE YEAR'}
            </span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-5xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-[1.05] uppercase">
            {settings.hero_heading ? (
              settings.hero_heading.split(' ').map((word, i) => {
                const isHighlight = i === 1 || i === 3 || word.toLowerCase().includes('digital') || word.toLowerCase().includes('move') || word.toLowerCase().includes('world');
                return (
                  <span
                    key={i}
                    className={`inline-block mr-3 sm:mr-4 ${
                      isHighlight ? 'text-gradient-purple drop-shadow-[0_0_35px_rgba(139,92,246,0.3)]' : 'text-white'
                    }`}
                  >
                    {word}
                  </span>
                );
              })
            ) : (
              <>
                WE CRAFT <span className="text-gradient-purple">DIGITAL EXPERIENCES</span> THAT MOVE THE WORLD
              </>
            )}
          </h1>
        </div>

        {/* Hero Description */}
        <p className="text-center max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-10">
          {settings.hero_description ||
            'An elite digital agency engineering high-conversion, animation-rich web experiences, cutting-edge creative code, and immersive design systems for visionary brands.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] text-white font-semibold text-sm tracking-wide shadow-xl shadow-[#8B5CF6]/30 hover:shadow-[#8B5CF6]/60 hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
            <span>{settings.hero_cta_primary || 'Start a Project'}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>

          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel hover:bg-white/[0.08] text-white font-semibold text-sm tracking-wide border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-[#8B5CF6] fill-[#8B5CF6]" />
            <span>{settings.hero_cta_secondary || 'Explore Our Work'}</span>
          </a>
        </div>

        {/* Floating Feature Cards Preview Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
          <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-[#8B5CF6]/40 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Speed & Motion</span>
            </div>
            <div className="text-2xl font-bold font-display text-white">60 FPS WebGL</div>
            <p className="text-xs text-zinc-400 mt-1">Silky smooth transitions, GPU-accelerated shaders, and sub-1s load times.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-[#8B5CF6]/40 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
                <Flame className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Conversion Engine</span>
            </div>
            <div className="text-2xl font-bold font-display text-white">+240% Avg Lift</div>
            <p className="text-xs text-zinc-400 mt-1">Engineered buyer psychology designed to convert passive traffic into clients.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-[#8B5CF6]/40 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Architecture</span>
            </div>
            <div className="text-2xl font-bold font-display text-white">Supabase & RLS</div>
            <p className="text-xs text-zinc-400 mt-1">Enterprise-grade security, instantaneous data sync, and zero maintenance friction.</p>
          </div>
        </div>

        {/* Marquee Ticker */}
        <div className="pt-8 border-t border-white/5">
          <p className="text-center text-xs font-mono tracking-widest text-zinc-500 uppercase mb-6">
            TRUSTED BY INDUSTRY DISRUPTORS & FAST-GROWING TEAMS
          </p>
          <div className="relative overflow-hidden py-3">
            <div className="flex gap-12 sm:gap-16 items-center whitespace-nowrap animate-marquee">
              {[...clientLogos, ...clientLogos].map((name, idx) => (
                <div
                  key={idx}
                  className="text-lg sm:text-2xl font-display font-extrabold tracking-wider text-zinc-600 hover:text-white transition-colors duration-300 cursor-default"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
