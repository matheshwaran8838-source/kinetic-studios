import React, { useState } from 'react';
import { Calculator, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export const InteractiveEstimateCalculator: React.FC = () => {
  const [platformType, setPlatformType] = useState<'bespoke' | 'webgl' | 'saas' | 'ecommerce'>('bespoke');
  const [motionLevel, setMotionLevel] = useState<'standard' | 'kinetic' | 'avantgarde'>('kinetic');
  const [timeline, setTimeline] = useState<'standard' | 'rush' | 'enterprise'>('standard');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'Supabase & Admin Dashboard',
    'Conversion Optimization'
  ]);

  // Base pricing calculations
  const platformBase = {
    bespoke: 4500,
    webgl: 6800,
    saas: 8500,
    ecommerce: 5800,
  };

  const motionMultiplier = {
    standard: 1.0,
    kinetic: 1.25,
    avantgarde: 1.5,
  };

  const timelineMultiplier = {
    standard: 1.0,
    rush: 1.3,
    enterprise: 1.15,
  };

  const addonsList = [
    { id: 'Supabase & Admin Dashboard', price: 1500, desc: 'Realtime database with custom admin portal' },
    { id: 'Conversion Optimization', price: 1200, desc: 'A/B testing and behavioral analytics funnels' },
    { id: 'Custom 3D Model Visualizer', price: 2200, desc: 'Photorealistic WebGL model interactive viewer' },
    { id: 'Multi-Language i18n', price: 900, desc: 'Multilingual localization framework' },
  ];

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const addonsCost = selectedAddons.reduce((acc, id) => {
    const item = addonsList.find(a => a.id === id);
    return acc + (item ? item.price : 0);
  }, 0);

  const baseCalculated = (platformBase[platformType] * motionMultiplier[motionLevel] * timelineMultiplier[timeline]) + addonsCost;
  const minEstimate = Math.round(baseCalculated / 100) * 100;
  const maxEstimate = Math.round((baseCalculated * 1.3) / 100) * 100;

  const handleApplyEstimate = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });

      // Auto populate fields
      const budgetSelect = document.getElementById('contact-budget-select') as HTMLSelectElement;
      if (budgetSelect) {
        if (minEstimate < 8000) budgetSelect.value = '$5,000 - $10,000';
        else if (minEstimate < 18000) budgetSelect.value = '$10,000 - $25,000';
        else if (minEstimate < 35000) budgetSelect.value = '$25,000 - $50,000';
        else budgetSelect.value = '$50,000+';
        budgetSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }

      const messageInput = document.getElementById('contact-message-input') as HTMLTextAreaElement;
      if (messageInput) {
        messageInput.value = `[Interactive Scope Estimate]\nPlatform: ${platformType.toUpperCase()}\nMotion Tier: ${motionLevel.toUpperCase()}\nTimeline: ${timeline.toUpperCase()}\nSelected Inclusions: ${selectedAddons.join(', ')}\nEstimated Target: $${minEstimate.toLocaleString()} - $${maxEstimate.toLocaleString()}\n\nProject details: `;
        messageInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  };

  return (
    <section id="estimator" className="py-24 relative overflow-hidden bg-black/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8B5CF6] mb-3">
            <Calculator className="w-4 h-4" />
            INSTANT PROJECT ESTIMATOR
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
            CALCULATE YOUR <span className="text-gradient-purple">PROJECT INVESTMENT</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-4 font-light">
            Transparent, algorithmic estimation designed to fit your roadmap, deliverables, and velocity requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
            {/* Step 1: Platform */}
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-3">
                1. SELECT PLATFORM ARCHITECTURE
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'bespoke', label: 'Bespoke Brand Flagship', base: '$4,500' },
                  { id: 'webgl', label: 'Interactive 3D / WebGL', base: '$6,800' },
                  { id: 'saas', label: 'Full-Stack SaaS & Portal', base: '$8,500' },
                  { id: 'ecommerce', label: 'Headless E-Commerce', base: '$5,800' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setPlatformType(item.id as any)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      platformType === item.id
                        ? 'border-[#8B5CF6] bg-[#8B5CF6]/10 text-white'
                        : 'border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-xs font-mono text-[#8B5CF6] mt-1">{item.base} base</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Motion Tier */}
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-3">
                2. MOTION & INTERACTION FIDELITY
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'standard', label: 'Refined Minimal', desc: 'Subtle transitions' },
                  { id: 'kinetic', label: 'Kinetic 60fps', desc: 'Smooth physics & magnetic cursor' },
                  { id: 'avantgarde', label: 'Avant-Garde 3D', desc: 'GPU shaders & 3D canvas' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setMotionLevel(item.id as any)}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      motionLevel === item.id
                        ? 'border-[#8B5CF6] bg-[#8B5CF6]/10 text-white'
                        : 'border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[11px] text-zinc-500 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-ons */}
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-3">
                3. INTEGRATIONS & ENHANCEMENTS
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addonsList.map(addon => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'border-[#8B5CF6] bg-[#8B5CF6]/10 text-white'
                          : 'border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-[#8B5CF6] text-white' : 'border border-zinc-700'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-200">{addon.id}</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">{addon.desc}</div>
                        <div className="text-[11px] font-mono text-[#8B5CF6] mt-1">+${addon.price.toLocaleString()}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result Card Column */}
          <div className="lg:col-span-5 glass-panel-glow p-8 rounded-3xl border border-[#8B5CF6]/30 relative">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8B5CF6] uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4" />
              ESTIMATED PROJECT BUDGET
            </div>

            <div className="text-4xl sm:text-5xl font-black font-display text-white tracking-tight my-4">
              ${minEstimate.toLocaleString()} — ${maxEstimate.toLocaleString()}
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-light">
              This estimate includes complete custom visual design, responsive frontend engineering, Supabase database integration, high-performance optimization, and 60 days of post-launch hypercare.
            </p>

            <div className="space-y-3 mb-8 pt-6 border-t border-white/10 text-xs font-mono text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-500">Architecture:</span>
                <span className="text-white capitalize">{platformType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Interaction:</span>
                <span className="text-white capitalize">{motionLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Included Modules:</span>
                <span className="text-white">{selectedAddons.length} Selected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Delivery Window:</span>
                <span className="text-[#8B5CF6]">3 to 6 Weeks</span>
              </div>
            </div>

            <button
              onClick={handleApplyEstimate}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white font-semibold text-sm shadow-xl shadow-[#8B5CF6]/30 flex items-center justify-center gap-2 transition-all duration-300 group"
            >
              <span>Lock In Estimate & Inquire</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-500 mt-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Fixed-Price Guarantee • No Hidden Overage Fees</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
