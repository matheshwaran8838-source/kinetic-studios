import React from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { AdminTab } from './AdminLayout';
import {
  Users,
  Mail,
  Clock,
  Briefcase,
  CheckCircle2,
  FolderKanban,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Plus,
  Eye,
  Calendar
} from 'lucide-react';

interface AdminOverviewProps {
  onNavigateTab: (tab: AdminTab) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigateTab }) => {
  const { stats, inquiries, projects, services, settings } = useWebsite();

  const recentInquiries = inquiries.slice(0, 5);

  const statCards = [
    {
      title: 'Total Website Visitors',
      value: (stats.totalVisitors || 18492).toLocaleString(),
      change: '+14.2% this month',
      icon: Users,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    {
      title: 'Total Project Inquiries',
      value: stats.totalInquiries ?? inquiries.length,
      change: 'Lifetime submissions',
      icon: Mail,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      title: 'New / Pending Inquiries',
      value: stats.newInquiries ?? inquiries.filter(i => i.status === 'pending').length,
      change: 'Action required',
      icon: Clock,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      highlight: true,
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects ?? projects.filter(p => p.status === 'in_progress').length,
      change: 'In development sprint',
      icon: Briefcase,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
    },
    {
      title: 'Completed Projects',
      value: stats.completedProjects ?? projects.filter(p => p.status === 'completed').length,
      change: 'Delivered flagships',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      title: 'Total Portfolio Projects',
      value: stats.totalPortfolioProjects ?? projects.length,
      change: `${services.length} active services`,
      icon: FolderKanban,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-[#8B5CF6]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8B5CF6] uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            CONTROL SUITE // REAL-TIME TELEMETRY
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Welcome to {settings.company_name} Admin
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 font-light">
            Database sync active. All modifications instantly update the public production website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateTab('portfolio')}
            className="px-4 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold shadow-lg shadow-[#8B5CF6]/30 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
          <button
            onClick={() => onNavigateTab('services')}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* 6 Key Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`p-6 rounded-3xl glass-panel border transition-all duration-300 hover:-translate-y-1 ${
                stat.highlight
                  ? 'border-amber-500/40 bg-amber-500/[0.04]'
                  : 'border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={`w-9 h-9 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center border ${stat.border}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] font-mono text-zinc-500 mt-2 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Chart & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visitors & Conversion Chart Preview */}
        <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold font-display text-white">
                Visitor & Inbound Momentum
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Last 7-day traffic trajectory and conversion velocity
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('analytics')}
              className="text-xs font-mono text-[#8B5CF6] hover:underline flex items-center gap-1"
            >
              <span>Detailed Analytics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Stylized SVG Chart */}
          <div className="h-56 w-full pt-4 relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1="0" y1="40" x2="700" y2="40" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="700" y2="90" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="700" y2="140" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />

              {/* Gradient Area Fill */}
              <path
                d="M 0 160 Q 120 120 240 140 T 480 70 T 700 30 L 700 200 L 0 200 Z"
                fill="url(#chartGradient)"
              />

              {/* Smooth Spline Curve */}
              <path
                d="M 0 160 Q 120 120 240 140 T 480 70 T 700 30"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Highlight Nodes */}
              <circle cx="240" cy="140" r="5" fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="480" cy="70" r="5" fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="700" cy="30" r="6" fill="#A78BFA" stroke="#FFFFFF" strokeWidth="2" />
            </svg>

            {/* Day Labels */}
            <div className="flex justify-between text-[11px] font-mono text-zinc-500 pt-3">
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <span>SAT</span>
              <span className="text-[#8B5CF6] font-bold">TODAY</span>
            </div>
          </div>
        </div>

        {/* Quick Agency Actions */}
        <div className="lg:col-span-4 glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold font-display text-white mb-2">
              Website Quick Links
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              Frequently accessed management sections
            </p>

            <div className="space-y-3">
              <button
                onClick={() => onNavigateTab('website')}
                className="w-full p-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/5 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-white">Hero & Brand Settings</div>
                  <div className="text-[11px] text-zinc-400">Headings, colors, social links</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </button>

              <button
                onClick={() => onNavigateTab('inquiries')}
                className="w-full p-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/5 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-white">Review Client Inquiries</div>
                  <div className="text-[11px] text-zinc-400">
                    {stats.newInquiries || 0} pending review
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </button>

              <button
                onClick={() => onNavigateTab('animations')}
                className="w-full p-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/5 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-white">Animation & Cursor FX</div>
                  <div className="text-[11px] text-zinc-400">Toggle speed & kinetic loaders</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </button>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>PLATFORM: VITE + REACT + SUPABASE</span>
            <span className="text-emerald-400">ONLINE</span>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Quick Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold font-display text-white">
              Recent Client Inquiries
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Prospective project briefs submitted through the contact form
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('inquiries')}
            className="text-xs font-mono text-[#8B5CF6] hover:underline flex items-center gap-1"
          >
            <span>View All ({inquiries.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentInquiries.length === 0 ? (
          <div className="py-12 text-center text-zinc-500 text-xs font-mono">
            No inquiries received yet. Submit a test from the public contact form!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-[11px] font-mono text-zinc-500 uppercase">
                  <th className="pb-3 font-medium">Client Name</th>
                  <th className="pb-3 font-medium">Company</th>
                  <th className="pb-3 font-medium">Service Interested</th>
                  <th className="pb-3 font-medium">Budget</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentInquiries.map(inq => (
                  <tr key={inq.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 font-semibold text-white">
                      {inq.name}
                      <div className="text-[11px] text-zinc-500 font-mono font-normal">{inq.email}</div>
                    </td>
                    <td className="py-3.5 text-zinc-300">
                      {inq.company || '—'}
                    </td>
                    <td className="py-3.5 text-zinc-300 max-w-[200px] truncate">
                      {inq.service_interested}
                    </td>
                    <td className="py-3.5 font-mono text-[#8B5CF6]">
                      {inq.budget_range}
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase ${
                        inq.status === 'pending'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : inq.status === 'contacted'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => onNavigateTab('inquiries')}
                        className="px-3 py-1 rounded-lg bg-white/5 hover:bg-[#8B5CF6] hover:text-white text-zinc-400 transition-colors font-mono text-[11px]"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
