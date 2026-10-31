import React from 'react';
import { Sparkles, Terminal, Layers, Compass, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Deep Discovery & Brand Strategy',
      description: 'We dissect your market position, competitive landscape, and target buyer persona to identify unfair advantages.',
      icon: Compass,
    },
    {
      number: '02',
      title: 'Haute Couture Design Architecture',
      description: 'We sculpt bespoke visual languages, kinetic typography hierarchies, and intuitive user journeys that arrest attention.',
      icon: Layers,
    },
    {
      number: '03',
      title: 'Full-Stack Creative Engineering',
      description: 'We code with modern React, TypeScript, Three.js shaders, and Supabase backends with zero bloat and 60fps rendering.',
      icon: Terminal,
    },
    {
      number: '04',
      title: 'Conversion Calibration & Launch',
      description: 'Rigorous cross-device stress testing, Core Web Vitals tuning, and behavioral tracking pipelines before global deployment.',
      icon: Award,
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8B5CF6] mb-3">
            <Sparkles className="w-4 h-4" />
            OUR MANIFESTO & PROCESS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight leading-tight">
            WE REJECT BORING WEBSITES. <br />
            WE ENGINEER <span className="text-gradient-purple">DIGITAL MONUMENTS</span>.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-6 font-light leading-relaxed">
            In an era where every website looks like an interchangeable template, Kinetic Studios crafts distinct, visceral digital flagships that convert skeptical visitors into enthusiastic brand advocates.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 hover:border-[#8B5CF6]/30 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-3xl font-black font-display text-zinc-700 group-hover:text-[#8B5CF6] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold font-display text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  <span>STAGE {step.number}</span>
                  <div className="h-px bg-white/10 flex-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Creative Director Quote Banner */}
        <div className="glass-panel-glow p-8 sm:p-12 rounded-3xl border border-[#8B5CF6]/20 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-[#8B5CF6]/40 p-1 bg-black">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
              alt="Creative Director"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <blockquote className="text-lg sm:text-xl font-display font-medium text-zinc-200 italic leading-relaxed mb-4">
              "Great digital design isn't just decoration. It is the clearest transmission of your company's ambition, competence, and taste. If your website feels generic, your product will be perceived as generic."
            </blockquote>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white">Sophia Vance</span>
              <span className="text-zinc-500">•</span>
              <span className="text-xs font-mono text-[#8B5CF6]">Founding Partner & Creative Director</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
