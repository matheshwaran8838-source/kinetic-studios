import React from 'react';
import { PortfolioProject } from '../../types/database';
import { ExternalLink, X, Tag, Trophy, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0e0e12] border border-white/10 rounded-3xl overflow-hidden shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 border border-white/10 backdrop-blur-md transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Hero Image */}
        <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-zinc-950">
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-black/30" />

          {/* Badges on image */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/40">
              {project.category}
            </span>
            {project.metrics && (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-xs font-mono text-zinc-200">
                <Trophy className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>{project.metrics}</span>
              </div>
            )}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-10 space-y-8">
          <div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
              CLIENT // {project.client_name}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
              {project.title}
            </h2>
          </div>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
            {project.description}
          </p>

          {/* Tech Stack & Tags */}
          <div>
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-[#8B5CF6]" />
              ENGINEERING STACK & DISCIPLINES
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-mono text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom actions */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
              STATUS: <span className="uppercase text-white font-semibold">{project.status}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-white"
              >
                Close Preview
              </button>
              {project.project_url && project.project_url !== '#' ? (
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/30 flex items-center justify-center gap-2"
                >
                  <span>Launch Live Site</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <a
                  href="#contact"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/30 flex items-center justify-center gap-2"
                >
                  <span>Build Similar Flagship</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
