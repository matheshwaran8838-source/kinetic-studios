import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { updateInquiryStatus, deleteInquiry } from '../../lib/database-service';
import { ContactInquiry } from '../../types/database';
import {
  Mail,
  Search,
  CheckCircle2,
  Clock,
  Check,
  Trash2,
  ExternalLink,
  MessageSquare,
  X,
  Phone,
  Building,
  Calendar,
  AlertOctagon,
  FileText
} from 'lucide-react';

export const InquiriesManagement: React.FC = () => {
  const { inquiries, refreshData } = useWebsite();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'contacted' | 'completed' | 'spam'>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [internalNote, setInternalNote] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleOpenDetail = (inq: ContactInquiry) => {
    setSelectedInquiry(inq);
    setInternalNote(inq.notes || '');
  };

  const handleStatusChange = async (id: string, newStatus: ContactInquiry['status']) => {
    setIsUpdating(true);
    try {
      await updateInquiryStatus(id, newStatus, internalNote);
      await refreshData();
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(prev => prev ? { ...prev, status: newStatus, notes: internalNote } : null);
      }
    } catch (err) {
      console.error('Error changing status:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setIsUpdating(true);
    try {
      await updateInquiryStatus(selectedInquiry.id, selectedInquiry.status, internalNote);
      await refreshData();
      setSelectedInquiry(prev => prev ? { ...prev, notes: internalNote } : null);
    } catch (err) {
      console.error('Error saving notes:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsUpdating(true);
    try {
      await deleteInquiry(id);
      await refreshData();
      setDeleteConfirmId(null);
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    } catch (err) {
      console.error('Error deleting inquiry:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredInquiries = inquiries.filter(inq => {
    const matchesFilter = statusFilter === 'all' || inq.status === statusFilter;
    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      inq.service_interested.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8B5CF6] uppercase tracking-wider mb-1">
            <Mail className="w-4 h-4" />
            INBOUND CLIENT LEADS
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Customer Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
            Review submissions from the public website contact form, assign statuses, and initiate responses.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Inquiries' },
            { id: 'pending', label: 'Pending' },
            { id: 'contacted', label: 'Contacted' },
            { id: 'completed', label: 'Completed' },
            { id: 'spam', label: 'Spam' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? 'bg-[#8B5CF6] text-white font-semibold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search inquiries..."
            className="w-full pl-11 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="glass-panel rounded-3xl border border-white/5 overflow-hidden">
        {filteredInquiries.length === 0 ? (
          <div className="py-16 text-center text-zinc-500 text-xs font-mono">
            No inquiries match your current filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-[11px] font-mono text-zinc-500 uppercase bg-white/[0.01]">
                  <th className="py-4 px-6 font-medium">Client / Email</th>
                  <th className="py-4 px-4 font-medium">Company</th>
                  <th className="py-4 px-4 font-medium">Requested Service</th>
                  <th className="py-4 px-4 font-medium">Budget</th>
                  <th className="py-4 px-4 font-medium">Status</th>
                  <th className="py-4 px-4 font-medium">Date Received</th>
                  <th className="py-4 px-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredInquiries.map(inq => (
                  <tr
                    key={inq.id}
                    onClick={() => handleOpenDetail(inq)}
                    className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6">
                      <div className="font-semibold text-white group-hover:text-[#A78BFA] transition-colors">
                        {inq.name}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500">{inq.email}</div>
                    </td>

                    <td className="py-4 px-4 text-zinc-300">
                      {inq.company || '—'}
                    </td>

                    <td className="py-4 px-4 text-zinc-300 max-w-[200px] truncate">
                      {inq.service_interested}
                    </td>

                    <td className="py-4 px-4 font-mono text-[#8B5CF6] font-medium">
                      {inq.budget_range}
                    </td>

                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                        inq.status === 'pending'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : inq.status === 'contacted'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : inq.status === 'completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {inq.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono text-[11px] text-zinc-500 whitespace-nowrap">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-6 text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenDetail(inq)}
                          className="px-3 py-1 rounded-lg bg-white/5 hover:bg-[#8B5CF6] hover:text-white text-zinc-400 transition-colors font-mono text-[11px]"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(inq.id)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete spam inquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail Slide-Over / Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 max-w-2xl w-full my-8 relative">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono text-[#8B5CF6] uppercase tracking-wider mb-1">
              PROPOSAL SPECIFICATION // {selectedInquiry.id}
            </div>

            <h2 className="text-2xl font-bold font-display text-white mb-1">
              {selectedInquiry.name}
            </h2>
            <p className="text-xs font-mono text-zinc-400 mb-6 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              Received: {new Date(selectedInquiry.created_at).toLocaleString()}
            </p>

            {/* Client Coordinates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 mb-6 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                <span className="text-zinc-400">Email:</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-white hover:underline truncate">
                  {selectedInquiry.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                <span className="text-zinc-400">Phone:</span>
                <span className="text-white">{selectedInquiry.phone || 'Not provided'}</span>
              </div>

              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                <span className="text-zinc-400">Company:</span>
                <span className="text-white">{selectedInquiry.company || 'Not provided'}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Target Budget:</span>
                <span className="font-mono text-[#8B5CF6] font-semibold">{selectedInquiry.budget_range}</span>
              </div>
            </div>

            {/* Requested Service */}
            <div className="mb-4">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                Requested Service:
              </span>
              <div className="text-sm font-semibold text-white">
                {selectedInquiry.service_interested}
              </div>
            </div>

            {/* Message Body */}
            <div className="mb-6">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                Project Requirements & Brief:
              </span>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-zinc-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-light">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Internal Agency Notes:
                </label>
                <button
                  onClick={handleSaveNotes}
                  disabled={isUpdating}
                  className="text-xs font-mono text-[#8B5CF6] hover:underline"
                >
                  Save Notes
                </button>
              </div>
              <textarea
                rows={2}
                value={internalNote}
                onChange={e => setInternalNote(e.target.value)}
                placeholder="Log internal follow-up timeline, client preferences, or assigned dev..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#8B5CF6] resize-none"
              />
            </div>

            {/* Status Selector Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400">Change Status:</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleStatusChange(selectedInquiry.id, 'pending')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono ${
                      selectedInquiry.status === 'pending'
                        ? 'bg-amber-500 text-black font-bold'
                        : 'bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedInquiry.id, 'contacted')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono ${
                      selectedInquiry.status === 'contacted'
                        ? 'bg-blue-500 text-white font-bold'
                        : 'bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    Contacted
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedInquiry.id, 'completed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono ${
                      selectedInquiry.status === 'completed'
                        ? 'bg-emerald-500 text-white font-bold'
                        : 'bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>

              {/* Direct Communication Shortcut */}
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Kinetic Studios — Regarding Your Project Inquiry`}
                  className="px-4 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/30 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>

                {selectedInquiry.phone && (
                  <a
                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                    title="Open WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-red-500/20 max-w-md w-full">
            <h3 className="text-lg font-bold font-display text-white mb-2">Delete Inquiry?</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Are you sure you want to delete this submission? You can also mark it as spam instead.
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
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
