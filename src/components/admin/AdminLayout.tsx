import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWebsite } from '../../context/WebsiteContext';
import { getSupabaseConfig } from '../../lib/supabase';
import {
  LayoutDashboard,
  Globe,
  Briefcase,
  FolderKanban,
  Mail,
  BarChart3,
  Sparkles,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Database,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export type AdminTab =
  | 'dashboard'
  | 'website'
  | 'services'
  | 'portfolio'
  | 'inquiries'
  | 'analytics'
  | 'animations'
  | 'admin-settings';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onViewPublicSite: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onTabChange,
  onViewPublicSite,
  children,
}) => {
  const { user, logout } = useAuth();
  const { inquiries, settings } = useWebsite();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const supabaseConfig = getSupabaseConfig();
  const pendingInquiriesCount = inquiries.filter(i => i.status === 'pending').length;

  const navItems = [
    { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'website' as AdminTab, label: 'Website Settings', icon: Globe },
    { id: 'services' as AdminTab, label: 'Services', icon: Briefcase },
    { id: 'portfolio' as AdminTab, label: 'Portfolio', icon: FolderKanban },
    {
      id: 'inquiries' as AdminTab,
      label: 'Inquiries',
      icon: Mail,
      badge: pendingInquiriesCount > 0 ? pendingInquiriesCount : undefined,
    },
    { id: 'analytics' as AdminTab, label: 'Analytics', icon: BarChart3 },
    { id: 'animations' as AdminTab, label: 'Animation Settings', icon: Sparkles },
    { id: 'admin-settings' as AdminTab, label: 'Admin Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#0e0e12] border-b border-white/5 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] flex items-center justify-center font-black">
            K
          </div>
          <span className="font-display font-extrabold text-sm">
            KINETIC ADMIN
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onViewPublicSite}
            className="p-2 rounded-lg bg-white/5 text-zinc-300 text-xs flex items-center gap-1"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-lg bg-white/5 text-white"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0c0c10] border-r border-white/5 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Logo Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#5B21B6] p-0.5 flex items-center justify-center shadow-lg shadow-[#8B5CF6]/30">
                <div className="w-full h-full bg-[#080808] rounded-[10px] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#8B5CF6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="font-display font-black text-sm text-white tracking-wide">
                  {settings.company_name || 'KINETIC'}
                </div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  ADMIN ENGINE
                </div>
              </div>
            </div>
            {mobileSidebarOpen && (
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="lg:hidden text-zinc-400 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Database Connection Status Badge */}
          <div className="px-6 py-3 border-b border-white/5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <div className="flex items-center gap-2 text-zinc-400">
                <Database className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>DB Engine:</span>
              </div>
              {supabaseConfig.isConfigured ? (
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Supabase
                </span>
              ) : (
                <span className="flex items-center gap-1 text-purple-400 font-semibold" title="Local Storage Synced & Ready for Supabase Credentials">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Local Sync
                </span>
              )}
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#8B5CF6] text-white font-semibold shadow-lg shadow-[#8B5CF6]/30'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        isActive
                          ? 'bg-white text-[#8B5CF6]'
                          : 'bg-[#8B5CF6] text-white animate-pulse'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5 space-y-3">
          {/* Quick link to public website */}
          <button
            onClick={onViewPublicSite}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-mono transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>View Public Site</span>
            </span>
            <span className="text-[10px] text-zinc-500">LIVE</span>
          </button>

          {/* Admin Profile & Logout */}
          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                alt="Admin Avatar"
                className="w-8 h-8 rounded-full object-cover border border-[#8B5CF6]/40 shrink-0"
              />
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">
                  {user?.name || 'Administrator'}
                </div>
                <div className="text-[10px] text-zinc-500 font-mono truncate">
                  {user?.email}
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen overflow-y-auto">
        {/* Top Desktop Bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-4 bg-[#0a0a0d] border-b border-white/5">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="text-zinc-600">ADMIN</span>
            <span>/</span>
            <span className="text-white uppercase font-bold tracking-wider">{currentTab}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Realtime Sync Active</span>
            </div>

            <button
              onClick={onViewPublicSite}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B5CF6]/10 hover:bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 text-white text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Go to Public Site</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
