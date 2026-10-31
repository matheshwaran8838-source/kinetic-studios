import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { ProjectModal } from './ProjectModal';
import { PortfolioProject } from '../../types/database';
import { ExternalLink, ArrowUpRight, Sparkles, Star } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const { projects } = useWebsite();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8B5CF6] mb-3">
              <Sparkles className="w-4 h-4" />
              FEATURED PORTFOLIO
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase leading-tight">
              SELECTED <span className="text-gradient-purple">WORKS & CASE STUDIES</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
            A curation of high-performing digital platforms, WebGL spatial canvases, and bespoke brand ecosystems designed and built by Kinetic Studios.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/30 font-semibold'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className="group cursor-pointer rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-[#8B5CF6]/50 transition-all duration-300 flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#8B5CF6]/20"
            >
              {/* Image Container with Zoom & Glare Effect */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Featured Badge */}
                {project.is_featured && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/90 backdrop-blur-md text-white text-[10px] font-mono font-semibold">
                    <Star className="w-3 h-3 fill-white" />
                    FEATURED
                  </div>
                )}

                {/* Category Pill */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-zinc-300 text-[10px] font-mono border border-white/10">
                  {project.category}
                </div>

                {/* Hover Quick Action */}
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-75 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                    {project.client_name}
                  </div>
                  <h3 className="text-xl font-bold font-display text-white group-hover:text-[#A78BFA] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Metrics & Tags */}
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#8B5CF6] font-semibold truncate max-w-[200px]">
                    {project.metrics || 'Awwwards Honoree'}
                  </span>
                  <div className="flex gap-1.5">
                    {project.tags?.slice(0, 2).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
