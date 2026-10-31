import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { savePortfolioProject, deletePortfolioProject } from '../../lib/database-service';
import { PortfolioProject } from '../../types/database';
import {
  FolderKanban,
  Plus,
  Edit2,
  Trash2,
  Star,
  ExternalLink,
  X,
  Search,
  CheckCircle2,
  Tag,
  Clock
} from 'lucide-react';

export const PortfolioManagement: React.FC = () => {
  const { projects, refreshData } = useWebsite();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [newTagText, setNewTagText] = useState('');

  // Form State
  const [formData, setFormData] = useState<Partial<PortfolioProject>>({
    title: '',
    client_name: '',
    category: 'SaaS / Web3',
    description: '',
    image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    project_url: 'https://demo.kineticstudios.agency',
    tags: ['React', 'Three.js', 'Tailwind'],
    is_featured: false,
    status: 'completed',
    metrics: 'Awwwards Site of the Day',
  });

  const categories = [
    'SaaS / Web3',
    'Interactive 3D',
    'Enterprise SaaS',
    'E-Commerce',
    'AI Platform',
    'Real Estate / Creative',
    'Mobile & PWA',
  ];

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      client_name: '',
      category: 'SaaS / Web3',
      description: '',
      image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      project_url: 'https://demo.kineticstudios.agency',
      tags: ['TypeScript', 'WebGL', 'Tailwind'],
      is_featured: false,
      status: 'completed',
      metrics: 'Featured Flagship',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({ ...project });
    setIsModalOpen(true);
  };

  const handleToggleFeatured = async (project: PortfolioProject) => {
    try {
      await savePortfolioProject({
        ...project,
        is_featured: !project.is_featured,
      });
      await refreshData();
    } catch (err) {
      console.error('Error toggling featured:', err);
    }
  };

  const handleAddTag = () => {
    if (newTagText.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTagText.trim()],
      }));
      setNewTagText('');
    }
  };

  const handleRemoveTag = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) return;

    setIsSaving(true);
    try {
      await savePortfolioProject({
        ...formData,
        id: editingProject?.id,
        title: formData.title.trim(),
      });
      await refreshData();
      setIsSaving(false);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to save project:', err);
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsSaving(true);
    try {
      await deletePortfolioProject(id);
      await refreshData();
      setDeleteConfirmId(null);
    } catch (err) {
      console.error('Failed to delete project:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8B5CF6] uppercase tracking-wider mb-1">
            <FolderKanban className="w-4 h-4" />
            SHOWCASE ARCHIVES
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Portfolio Management
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
            Manage projects, upload visual imagery, configure case studies, and feature selected flagships.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/30 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by project name, client, category..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>
        <div className="text-xs font-mono text-zinc-500">
          Total: <span className="text-white font-bold">{projects.length}</span>
        </div>
      </div>

      {/* Projects Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div
            key={project.id}
            className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#8B5CF6]/40 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Image Preview & Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Featured Star Button */}
                <button
                  type="button"
                  onClick={() => handleToggleFeatured(project)}
                  className={`absolute top-3 left-3 p-2 rounded-xl backdrop-blur-md transition-all ${
                    project.is_featured
                      ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/40'
                      : 'bg-black/50 text-zinc-400 hover:text-white'
                  }`}
                  title={project.is_featured ? 'Featured Project' : 'Click to feature'}
                >
                  <Star className={`w-4 h-4 ${project.is_featured ? 'fill-white' : ''}`} />
                </button>

                {/* Status Pill */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono border border-white/10 uppercase">
                  {project.status === 'completed' ? (
                    <span className="text-emerald-400">Completed</span>
                  ) : (
                    <span className="text-amber-400">In Progress</span>
                  )}
                </div>

                {/* Category */}
                <div className="absolute bottom-3 left-3 text-xs font-mono text-zinc-300">
                  {project.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                  CLIENT // {project.client_name}
                </div>
                <h3 className="text-base font-bold font-display text-white line-clamp-1 mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 font-light leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags?.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between">
              <div className="text-xs font-mono text-[#8B5CF6] truncate max-w-[150px]">
                {project.metrics || 'Awwwards'}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(project)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
                  title="Edit Project"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(project.id)}
                  className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 max-w-2xl w-full my-8 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold font-display text-white mb-2">
              {editingProject ? 'Edit Project Specification' : 'Add New Portfolio Project'}
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              Configure project case study parameters, imagery, and external preview URLs.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Aetheria OS Spatial Web"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formData.client_name}
                    onChange={e => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="e.g. Aetheria Labs"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#121216] border border-white/10 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                    Project Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl bg-[#121216] border border-white/10 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
                  >
                    <option value="completed">Completed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Image URL (High-Res Showcase)
                </label>
                <input
                  type="text"
                  required
                  value={formData.image_url}
                  onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  External Live Project URL
                </label>
                <input
                  type="text"
                  value={formData.project_url}
                  onChange={e => setFormData({ ...formData, project_url: e.target.value })}
                  placeholder="https://client-demo.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Key Metrics / Awards (e.g. +340% Conversions, Awwwards Site of the Day)
                </label>
                <input
                  type="text"
                  value={formData.metrics}
                  onChange={e => setFormData({ ...formData, metrics: e.target.value })}
                  placeholder="Awwwards Site of the Day • +340% User Waitlist"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Project Case Study Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explain the client context, technological challenge, and final result..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#8B5CF6] resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Tech Stack & Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTagText}
                    onChange={e => setNewTagText(e.target.value)}
                    placeholder="Add technology (e.g. Supabase, WebGL)"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#8B5CF6]"
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags?.map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-200"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(i)}
                        className="text-zinc-500 hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Switch */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <input
                  type="checkbox"
                  id="project-featured-toggle"
                  checked={formData.is_featured}
                  onChange={e => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-4 h-4 accent-[#8B5CF6] rounded cursor-pointer"
                />
                <label htmlFor="project-featured-toggle" className="text-xs font-medium text-white cursor-pointer flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  Mark as Featured Highlight
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/30 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-red-500/20 max-w-md w-full">
            <h3 className="text-lg font-bold font-display text-white mb-2">Delete Project?</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Are you sure you want to delete this case study from the portfolio? This action is permanent.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
