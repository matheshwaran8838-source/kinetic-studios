import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { saveService, deleteService } from '../../lib/database-service';
import { ServiceItem } from '../../types/database';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Globe,
  Sparkles,
  Code2,
  ShoppingBag,
  Palette,
  TrendingUp,
  Image as ImageIcon,
  DollarSign
} from 'lucide-react';

export const ServicesManagement: React.FC = () => {
  const { services, refreshData } = useWebsite();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [newFeatureText, setNewFeatureText] = useState('');

  // Form State
  const [formData, setFormData] = useState<Partial<ServiceItem>>({
    title: '',
    slug: '',
    short_description: '',
    full_description: '',
    icon_name: 'Globe',
    image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    starting_price: '$4,000',
    features: ['Custom Creative Art Direction', 'Lighthouse 98+ Score Guarantee'],
    is_active: true,
  });

  const availableIcons = [
    { name: 'Globe', icon: Globe },
    { name: 'Sparkles', icon: Sparkles },
    { name: 'Code2', icon: Code2 },
    { name: 'ShoppingBag', icon: ShoppingBag },
    { name: 'Palette', icon: Palette },
    { name: 'TrendingUp', icon: TrendingUp },
  ];

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      title: '',
      slug: '',
      short_description: '',
      full_description: '',
      icon_name: 'Globe',
      image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      starting_price: '$4,500',
      features: ['High-Performance Responsive Code', 'Awwwards-Level Micro-Interactions'],
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({ ...service });
    setIsModalOpen(true);
  };

  const handleAddFeature = () => {
    if (newFeatureText.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), newFeatureText.trim()],
      }));
      setNewFeatureText('');
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) return;

    setIsSaving(true);
    try {
      await saveService({
        ...formData,
        id: editingService?.id,
        title: formData.title.trim(),
      });
      await refreshData();
      setIsSaving(false);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to save service:', err);
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsSaving(true);
    try {
      await deleteService(id);
      await refreshData();
      setDeleteConfirmId(null);
    } catch (err) {
      console.error('Failed to delete service:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8B5CF6] uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4" />
            OFFERINGS & CAPABILITIES
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Services Management
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
            Create, edit, price, and organize agency service packages rendered on the public website.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/30 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => {
          const IconComponent = availableIcons.find(i => i.name === service.icon_name)?.icon || Globe;
          return (
            <div
              key={service.id}
              className={`p-6 rounded-3xl glass-panel border flex flex-col justify-between transition-all ${
                service.is_active
                  ? 'border-white/10 hover:border-[#8B5CF6]/40'
                  : 'border-white/5 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#8B5CF6]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                    service.is_active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {service.is_active ? 'Active' : 'Draft'}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-white mb-1">
                  {service.title}
                </h3>

                <div className="text-xs font-mono text-[#8B5CF6] font-semibold mb-3">
                  Starting from {service.starting_price || 'Inquire'}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4 line-clamp-3">
                  {service.short_description}
                </p>

                {service.features && service.features.length > 0 && (
                  <div className="space-y-1.5 mb-6 pt-3 border-t border-white/5 text-[11px] text-zinc-300">
                    {service.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#8B5CF6] shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => handleOpenEdit(service)}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono transition-colors flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => setDeleteConfirmId(service.id)}
                  className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}
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
              {editingService ? 'Edit Service Specification' : 'Add New Service Package'}
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              Configure parameters, pricing, and key deliverable bullets.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Bespoke Web Design & Motion"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                    Starting Price
                  </label>
                  <input
                    type="text"
                    value={formData.starting_price}
                    onChange={e => setFormData({ ...formData, starting_price: e.target.value })}
                    placeholder="e.g. $4,500"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>

              {/* Icon Picker */}
              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Select Visual Icon
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableIcons.map(item => {
                    const Icon = item.icon;
                    const isSelected = formData.icon_name === item.name;
                    return (
                      <button
                        type="button"
                        key={item.name}
                        onClick={() => setFormData({ ...formData, icon_name: item.name })}
                        className={`p-3 rounded-xl border flex items-center gap-2 text-xs transition-all ${
                          isSelected
                            ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]'
                            : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Short Summary (Card View)
                </label>
                <textarea
                  rows={2}
                  value={formData.short_description}
                  onChange={e => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Concise overview displayed on the homepage cards..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#8B5CF6] resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Full Detailed Description (Modal View)
                </label>
                <textarea
                  rows={3}
                  value={formData.full_description}
                  onChange={e => setFormData({ ...formData, full_description: e.target.value })}
                  placeholder="In-depth methodology and deliverables explanation..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#8B5CF6] resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Featured Image URL
                </label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              {/* Feature Bullets Editor */}
              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Service Deliverables & Bullets
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newFeatureText}
                    onChange={e => setNewFeatureText(e.target.value)}
                    placeholder="Add bullet (e.g. Next.js 15 & Supabase Setup)"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#8B5CF6]"
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.features?.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-200"
                    >
                      <span>{f}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(i)}
                        className="text-zinc-500 hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Toggle */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <input
                  type="checkbox"
                  id="service-active-toggle"
                  checked={formData.is_active}
                  onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 accent-[#8B5CF6] rounded cursor-pointer"
                />
                <label htmlFor="service-active-toggle" className="text-xs font-medium text-white cursor-pointer">
                  Publish Service to Public Website
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
                  {isSaving ? 'Saving...' : 'Save Service'}
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
            <h3 className="text-lg font-bold font-display text-white mb-2">Delete Service?</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Are you sure you want to delete this service package? This action will remove it from the database and public site.
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
