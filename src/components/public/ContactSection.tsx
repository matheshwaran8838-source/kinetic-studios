import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { submitInquiry } from '../../lib/database-service';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings, services } = useWebsite();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_interested: services[0]?.title || 'Bespoke Website Design & Development',
    budget_range: '$10,000 - $25,000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete your name, email, and project brief.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service_interested: formData.service_interested,
        budget_range: formData.budget_range,
        message: formData.message,
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#FFFFFF', '#A78BFA', '#6D28D9'],
        });
      } catch (err) {
        // Confetti fallback
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service_interested: services[0]?.title || 'Bespoke Website Design & Development',
        budget_range: '$10,000 - $25,000',
        message: '',
      });
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage('Failed to submit inquiry. Please try again or email us directly.');
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#8B5CF6]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Agency Pitch & Direct Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8B5CF6] mb-3">
                <Sparkles className="w-4 h-4" />
                INITIATE COLLABORATION
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight leading-tight">
                LET'S BUILD SOMETHING <span className="text-gradient-purple">UNFORGETTABLE</span>.
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base mt-4 font-light leading-relaxed">
                Whether launching a breakthrough startup or redefining a legacy category, we take on a strictly limited number of projects per quarter to guarantee obsession over every detail.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-4">
              <a
                href={`mailto:${settings.contact_email || 'hello@kineticstudios.agency'}`}
                className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-[#8B5CF6]/40 transition-all flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Direct Email</div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#A78BFA] transition-colors">
                    {settings.contact_email || 'hello@kineticstudios.agency'}
                  </div>
                </div>
              </a>

              {settings.whatsapp_number && (
                <a
                  href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-[#8B5CF6]/40 transition-all flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">WhatsApp Instant Chat</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#A78BFA] transition-colors">
                      {settings.whatsapp_number}
                    </div>
                  </div>
                </a>
              )}

              {settings.phone_number && (
                <a
                  href={`tel:${settings.phone_number}`}
                  className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-[#8B5CF6]/40 transition-all flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Studio Phone</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#A78BFA] transition-colors">
                      {settings.phone_number}
                    </div>
                  </div>
                </a>
              )}

              {settings.address && (
                <div className="glass-panel p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#8B5CF6]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Studio Headquarters</div>
                    <div className="text-xs font-medium text-zinc-300">
                      {settings.address}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Proposal Form */}
          <div className="lg:col-span-7 glass-panel-glow p-8 sm:p-10 rounded-3xl border border-white/10 relative">
            {isSuccess ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6] mx-auto flex items-center justify-center text-[#8B5CF6] animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-white">
                  Proposal Inquiry Dispatched!
                </h3>
                <p className="text-zinc-400 text-sm max-w-md mx-auto">
                  Our creative director has received your requirements and will reply within 12 business hours with initial discovery insights.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-xs font-mono text-[#8B5CF6] uppercase tracking-wider">
                  PROJECT SPECIFICATION FORM
                </div>

                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-xs">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#8B5CF6] text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#8B5CF6] text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. HyperScale Tech"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#8B5CF6] text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#8B5CF6] text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Primary Service Interested
                    </label>
                    <select
                      id="contact-service-select"
                      name="service_interested"
                      value={formData.service_interested}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#121216] border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm transition-colors"
                    >
                      {services.map(s => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Complete Brand + Full-Stack Flagship">Complete Brand + Full-Stack Flagship</option>
                      <option value="Other Bespoke Requirement">Other Bespoke Requirement</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Target Budget Range
                    </label>
                    <select
                      id="contact-budget-select"
                      name="budget_range"
                      value={formData.budget_range}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#121216] border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm transition-colors"
                    >
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                      <option value="$50,000+">$50,000+ (Enterprise Scope)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                    Project Brief & Goals *
                  </label>
                  <textarea
                    id="contact-message-input"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your brand, current challenges, desired features, reference websites, and key timeline milestones..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#8B5CF6] text-sm transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] text-white font-semibold text-sm shadow-xl shadow-[#8B5CF6]/30 hover:shadow-[#8B5CF6]/50 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                      <span>Submit Project Proposal Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
