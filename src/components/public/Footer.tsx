import React from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import {
  ShieldCheck,
  ArrowUp,
  Heart
} from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { settings } = useWebsite();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#060608] pt-20 pb-12 overflow-hidden text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#5B21B6] p-0.5 flex items-center justify-center shadow-lg shadow-[#8B5CF6]/30">
                <div className="w-full h-full bg-[#080808] rounded-[10px] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#8B5CF6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                {settings.company_name || 'KINETIC STUDIOS'}
              </span>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-light">
              {settings.footer_content ||
                'Kinetic Studios is an elite digital design & creative engineering agency crafting high-converting web applications that propel ambitious brands forward.'}
            </p>

            {/* Social Icons with SVG Brand Marks */}
            <div className="flex items-center gap-2.5 pt-2">
              {settings.social_twitter && (
                <a
                  href={settings.social_twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#8B5CF6] hover:text-white flex items-center justify-center transition-colors text-zinc-300"
                  aria-label="Twitter / X"
                >
                  <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
              {settings.social_linkedin && (
                <a
                  href={settings.social_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#8B5CF6] hover:text-white flex items-center justify-center transition-colors text-zinc-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              )}
              {settings.social_github && (
                <a
                  href={settings.social_github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#8B5CF6] hover:text-white flex items-center justify-center transition-colors text-zinc-300"
                  aria-label="GitHub"
                >
                  <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>
              )}
              {settings.social_instagram && (
                <a
                  href={settings.social_instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#8B5CF6] hover:text-white flex items-center justify-center transition-colors text-zinc-300"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {settings.social_dribbble && (
                <a
                  href={settings.social_dribbble}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#8B5CF6] hover:text-white flex items-center justify-center transition-colors text-zinc-300"
                  aria-label="Dribbble"
                >
                  <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.312c-.27-.052-2.45-.443-4.77.21a57.85 57.85 0 00-1.57-3.13 18.06 18.06 0 004.41-2.392zM12 3.515c2.035 0 3.905.718 5.378 1.916a19.782 19.782 0 01-4.04 2.23C12.16 5.352 10.87 3.69 10.79 3.585A8.47 8.47 0 0112 3.515zm-2.827.683c.1.134 1.34 1.758 2.5 3.962-3.32.96-6.42.99-6.9.99-.01-.06-.01-.13-.01-.2 0-2.14.793-4.103 2.1-5.61l2.31.858zm-5.64 6.32c.56 0 4.14-.04 7.69-1.12.39.77.75 1.56 1.09 2.36-4.66 1.48-8.89 4.79-9.15 4.99a8.47 8.47 0 01-.84-4.8c.43-.58.82-.99 1.21-1.43zm2.59 7.37c.36-.29 3.95-3.08 8.42-4.46.99 2.65 1.4 5.21 1.49 5.86a8.483 8.483 0 01-9.91-1.4zm11.38-.45c-.13-.67-.53-2.98-1.43-5.46 2.08-.63 3.96-.28 4.23-.23a8.528 8.528 0 01-2.8 5.69z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono text-white uppercase tracking-wider">INDEX</div>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#estimator" className="hover:text-white transition-colors">Cost Estimator</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Manifesto</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono text-white uppercase tracking-wider">DISCIPLINES</div>
            <ul className="space-y-2 text-xs">
              <li>Bespoke Flagships</li>
              <li>3D & WebGL Shaders</li>
              <li>Full-Stack React Apps</li>
              <li>Supabase Architecture</li>
              <li>Performance Tuning</li>
            </ul>
          </div>

          {/* Admin & System Access */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono text-white uppercase tracking-wider">ADMINISTRATION</div>
            <p className="text-xs text-zinc-400 font-light">
              Full content management dashboard connected to live database.
            </p>
            <button
              onClick={onOpenAdmin}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#8B5CF6] text-white text-xs font-mono border border-white/10 hover:border-transparent transition-all flex items-center gap-2 group shadow-lg"
            >
              <ShieldCheck className="w-4 h-4 text-[#8B5CF6] group-hover:text-white transition-colors" />
              <span>Launch Admin Dashboard</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            © {new Date().getFullYear()} {settings.company_name || 'KINETIC STUDIOS'}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              Built with <Heart className="w-3 h-3 text-[#8B5CF6] fill-[#8B5CF6]" /> & Precision Code
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
