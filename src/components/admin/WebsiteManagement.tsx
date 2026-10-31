import React, { useState, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { updateWebsiteSettings } from '../../lib/database-service';
import { WebsiteSettings } from '../../types/database';
import {
  Save,
  CheckCircle2,
  Globe,
  Palette,
  Phone,
  Share2,
  FileText,
  Search,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const WebsiteManagement: React.FC = () => {
  const { settings, refreshData } = useWebsite();
  const [formData, setFormData] = useState<WebsiteSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setToastMessage('');

    try {
      await updateWebsiteSettings(formData);
      await refreshData();
      setIsSaving(false);
      setToastMessage('Website settings successfully saved and synced to database!');
      setTimeout(() => setToastMessage(''), 4000);
    } catch (err) {
      setIsSaving(false);
      setToastMessage('Error saving settings to database.');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8B5CF6] uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4" />
            GLOBAL CONTENT MANAGEMENT
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Website & Brand Settings
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
            Edit branding, typography, palette, coordinates, and metadata. Saved changes immediately update the live public site.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {isSaving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{isSaving ? 'Synchronizing...' : 'Save All Changes'}</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Core Brand Identity */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold font-display text-white border-b border-white/5 pb-4">
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            <span>Brand Identity & Logo</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Company / Agency Name
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="KINETIC STUDIOS"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Custom Logo URL (Optional Image Override)
              </label>
              <input
                type="text"
                name="logo_url"
                value={formData.logo_url}
                onChange={handleChange}
                placeholder="https://example.com/logo.svg"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Color Palette */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold font-display text-white border-b border-white/5 pb-4">
            <Palette className="w-4 h-4 text-[#8B5CF6]" />
            <span>Theme & Color System</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Website Background Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  name="bg_color"
                  value={formData.bg_color || '#080808'}
                  onChange={handleChange}
                  className="w-12 h-12 rounded-xl bg-transparent border border-white/10 cursor-pointer p-1"
                />
                <input
                  type="text"
                  name="bg_color"
                  value={formData.bg_color}
                  onChange={handleChange}
                  placeholder="#080808"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1 font-mono">Default: Deep Black (#080808)</p>
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Primary Electric Accent Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  name="accent_color"
                  value={formData.accent_color || '#8B5CF6'}
                  onChange={handleChange}
                  className="w-12 h-12 rounded-xl bg-transparent border border-white/10 cursor-pointer p-1"
                />
                <input
                  type="text"
                  name="accent_color"
                  value={formData.accent_color}
                  onChange={handleChange}
                  placeholder="#8B5CF6"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1 font-mono">Default: Electric Purple (#8B5CF6)</p>
            </div>
          </div>
        </div>

        {/* Section 3: Hero Section Messaging */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold font-display text-white border-b border-white/5 pb-4">
            <FileText className="w-4 h-4 text-[#8B5CF6]" />
            <span>Hero Section Copy & Calls to Action</span>
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
              Hero Top Badge
            </label>
            <input
              type="text"
              name="hero_badge"
              value={formData.hero_badge}
              onChange={handleChange}
              placeholder="AWWWARDS NOMINEE 2026 • DIGITAL AGENCY OF THE YEAR"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
              Hero Main Heading (Words like 'Digital', 'Experiences', 'Move' automatically receive kinetic gradient)
            </label>
            <input
              type="text"
              name="hero_heading"
              value={formData.hero_heading}
              onChange={handleChange}
              placeholder="WE CRAFT DIGITAL EXPERIENCES THAT MOVE THE WORLD"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm font-bold font-display"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
              Hero Description Paragraph
            </label>
            <textarea
              name="hero_description"
              rows={3}
              value={formData.hero_description}
              onChange={handleChange}
              placeholder="An elite digital agency engineering high-conversion, animation-rich web experiences..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Primary CTA Button Text
              </label>
              <input
                type="text"
                name="hero_cta_primary"
                value={formData.hero_cta_primary}
                onChange={handleChange}
                placeholder="Start a Project"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Secondary CTA Button Text
              </label>
              <input
                type="text"
                name="hero_cta_secondary"
                value={formData.hero_cta_secondary}
                onChange={handleChange}
                placeholder="Explore Our Work"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Contact & Studio Coordinates */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold font-display text-white border-b border-white/5 pb-4">
            <Phone className="w-4 h-4 text-[#8B5CF6]" />
            <span>Contact Information & Coordinates</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Company Email
              </label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                placeholder="hello@kineticstudios.agency"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="+1 (555) 234-8900"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                WhatsApp Number
              </label>
              <input
                type="text"
                name="whatsapp_number"
                value={formData.whatsapp_number}
                onChange={handleChange}
                placeholder="+15552348900"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
              Physical Studio Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="450 Kinetic Tower, Innovation Blvd, San Francisco, CA"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm"
            />
          </div>
        </div>

        {/* Section 5: Social Media Accounts */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold font-display text-white border-b border-white/5 pb-4">
            <Share2 className="w-4 h-4 text-[#8B5CF6]" />
            <span>Social Media Channels</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Twitter / X Profile URL
              </label>
              <input
                type="text"
                name="social_twitter"
                value={formData.social_twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/kineticstudios"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                name="social_linkedin"
                value={formData.social_linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/company/kineticstudios"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                GitHub Organization URL
              </label>
              <input
                type="text"
                name="social_github"
                value={formData.social_github}
                onChange={handleChange}
                placeholder="https://github.com/kineticstudios"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Instagram URL
              </label>
              <input
                type="text"
                name="social_instagram"
                value={formData.social_instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/kineticstudios"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 6: SEO & Footer */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold font-display text-white border-b border-white/5 pb-4">
            <Search className="w-4 h-4 text-[#8B5CF6]" />
            <span>Search Engine Optimization & Footer</span>
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
              SEO Browser Page Title
            </label>
            <input
              type="text"
              name="seo_title"
              value={formData.seo_title}
              onChange={handleChange}
              placeholder="KINETIC STUDIOS — Elite Digital Agency & Web Experiences"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
              Meta SEO Description
            </label>
            <textarea
              name="seo_description"
              rows={2}
              value={formData.seo_description}
              onChange={handleChange}
              placeholder="Kinetic Studios is a premier digital agency specializing in website design..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
              Footer Content Text
            </label>
            <textarea
              name="footer_content"
              rows={2}
              value={formData.footer_content}
              onChange={handleChange}
              placeholder="Kinetic Studios is an independent digital design and creative engineering studio..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8B5CF6] text-sm resize-none"
            />
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white text-xs font-semibold shadow-xl shadow-[#8B5CF6]/30 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save All Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
