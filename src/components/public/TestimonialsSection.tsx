import React from 'react';
import { Star, Quote, ArrowUpRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "Kinetic Studios completely altered our growth trajectory. Our previous site converted at 1.8%; our new Kinetic flagship converts at 5.4% while establishing us as the premium authority in spatial robotics.",
      author: "Julian Richter",
      role: "CEO & Co-Founder",
      company: "Aetheria Systems",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      stats: "+300% Inbound Pipeline",
    },
    {
      quote: "Working with Kinetic was like stepping into the future. Their speed, Three.js shaders, and custom Supabase backend delivered an experience that won Site of the Day on Awwwards within 72 hours of launch.",
      author: "Camille Dupont",
      role: "VP of Product Marketing",
      company: "Nexus Luxury Vehicles",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      stats: "$28M Pre-Orders Generated",
    },
    {
      quote: "The admin panel they built connects seamlessly to our database. Our internal team updates services and portfolio case studies instantly without writing a single line of code. Extraordinary craftsmanship.",
      author: "David Zhao",
      role: "Chief Technology Officer",
      company: "Vanguard Global Capital",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      stats: "99.99% Availability",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#0c0c10]/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8B5CF6] mb-3">
            <Star className="w-4 h-4 fill-[#8B5CF6]" />
            CLIENT ENDORSEMENTS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
            TRUSTED BY <span className="text-gradient-purple">PIONEERING FOUNDERS</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-4 font-light">
            Here is what leaders say after launching their flagships with Kinetic Studios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-[#8B5CF6]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1 text-[#8B5CF6]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#8B5CF6]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-zinc-700 group-hover:text-[#8B5CF6] transition-colors" />
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic font-light">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-11 h-11 rounded-full object-cover border border-[#8B5CF6]/30"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">{t.author}</div>
                    <div className="text-xs text-zinc-400">{t.role}, {t.company}</div>
                  </div>
                </div>

                <span className="text-[11px] font-mono font-semibold text-[#8B5CF6] bg-[#8B5CF6]/10 px-2.5 py-1 rounded-full border border-[#8B5CF6]/20">
                  {t.stats}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
