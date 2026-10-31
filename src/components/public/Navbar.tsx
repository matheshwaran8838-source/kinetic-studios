import React, { useState, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { Menu, X, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const { settings } = useWebsite();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Estimator', href: '#estimator' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3.5 bg-[#080808]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/80'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#5B21B6] p-0.5 flex items-center justify-center shadow-lg shadow-[#8B5CF6]/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#080808] rounded-[10px] flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#8B5CF6] group-hover:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#8B5CF6] transition-colors">
                {settings.company_name || 'KINETIC STUDIOS'}
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                DIGITAL FLAGSHIPS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Admin Portal Shortcut Button */}
            <button
              onClick={onOpenAdmin}
              className="px-3.5 py-2 rounded-xl text-xs font-mono text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 transition-all flex items-center gap-1.5"
              title="Open Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Admin Portal</span>
            </button>

            {/* Get Started CTA */}
            <a
              href="#contact"
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white text-xs font-semibold tracking-wide transition-all duration-300 shadow-lg shadow-[#8B5CF6]/30 hover:shadow-[#8B5CF6]/50 hover:scale-[1.02] flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Started</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#8B5CF6]"
              aria-label="Admin Portal"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-4">
            <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-2">
              NAVIGATION
            </div>
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold font-display text-zinc-200 hover:text-[#8B5CF6] transition-colors py-1 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-5 h-5 opacity-40" />
              </a>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-3 rounded-xl bg-white/10 text-white font-mono text-sm flex items-center justify-center gap-2 border border-white/10"
            >
              <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
              Admin Portal
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-xl bg-[#8B5CF6] text-white font-semibold text-center text-sm shadow-xl shadow-[#8B5CF6]/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Start a Project
            </a>
          </div>
        </div>
      )}
    </>
  );
};
