import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import {
  Globe,
  Sparkles,
  Code2,
  ShoppingBag,
  Palette,
  TrendingUp,
  ArrowRight,
  Check,
  Zap
} from 'lucide-react';
import { ServiceItem } from '../../types/database';

export const ServicesSection: React.FC = () => {
  const { services } = useWebsite();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Icon mapping helper
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return Sparkles;
      case 'Code2': return Code2;
      case 'ShoppingBag': return ShoppingBag;
      case 'Palette': return Palette;
      case 'TrendingUp': return TrendingUp;
      case 'Globe':
      default: return Globe;
    }
  };

  const activeServices = services.filter(s => s.is_active);

  const handleSelectService = (service: ServiceItem) => {
    // Scroll to contact form and set chosen service
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      const serviceSelect = document.getElementById('contact-service-select') as HTMLSelectElement;
      if (serviceSelect) {
        serviceSelect.value = service.title;
        serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8B5CF6] mb-3">
              <Zap className="w-4 h-4" />
              CAPABILITIES & EXPERTISE
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase leading-tight">
              SERVICES ENGINEERED FOR <span className="text-gradient-purple">MAXIMUM IMPACT</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
            We operate at the intersection of haute couture digital design and robust full-stack engineering. Every deliverable is calibrated for business growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeServices.map((service, index) => {
            const Icon = getIcon(service.icon_name);
            return (
              <div
                key={service.id}
                className="group relative rounded-2xl glass-panel p-8 border border-white/10 hover:border-[#8B5CF6]/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B5CF6]/15"
              >
                {/* Background image subtle preview on hover */}
                {service.image_url && (
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: `url(${service.image_url})` }}
                  />
                )}

                <div>
                  {/* Top Bar with Icon and Index */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-zinc-500 tracking-widest">
                      // 0{index + 1}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div className="mb-3">
                    <h3 className="text-xl font-bold font-display text-white group-hover:text-[#A78BFA] transition-colors">
                      {service.title}
                    </h3>
                    {service.starting_price && (
                      <span className="inline-block mt-1 text-xs font-mono text-[#8B5CF6] font-semibold">
                        Starting from {service.starting_price}
                      </span>
                    )}
                  </div>

                  {/* Short Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-light">
                    {service.short_description}
                  </p>

                  {/* Feature Bullets */}
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-2 mb-8 pt-4 border-t border-white/5">
                      {service.features.slice(0, 4).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-[#8B5CF6] mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-mono text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleSelectService(service)}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-[#8B5CF6] text-white text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 group-hover:shadow-lg group-hover:shadow-[#8B5CF6]/30"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Service Deep Dive */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="glass-panel-glow max-w-2xl w-full p-8 rounded-3xl border border-white/10 relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              ✕
            </button>

            <div className="text-xs font-mono text-[#8B5CF6] uppercase tracking-wider mb-2">
              SERVICE SPECIFICATION
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-white mb-2">
              {selectedService.title}
            </h3>
            {selectedService.starting_price && (
              <p className="text-sm font-mono text-zinc-400 mb-6">
                Investment: <span className="text-white font-bold">{selectedService.starting_price}</span>
              </p>
            )}

            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
              {selectedService.full_description || selectedService.short_description}
            </p>

            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                KEY DELIVERABLES & INCLUSIONS:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.features?.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 text-xs text-zinc-200">
                    <Check className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const s = selectedService;
                  setSelectedService(null);
                  handleSelectService(s);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/30 flex items-center gap-2"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
