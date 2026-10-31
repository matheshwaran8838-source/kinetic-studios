import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import {
  BarChart3,
  TrendingUp,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Share2,
  Users,
  Target,
  Clock,
  Sparkles
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { stats, inquiries, projects } = useWebsite();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  const totalVisitors = stats.totalVisitors || 18492;
  const totalInquiries = stats.totalInquiries || inquiries.length;
  const conversionRate = stats.conversionRate || ((totalInquiries / (totalVisitors || 1)) * 100).toFixed(2);

  const trafficSources = [
    { source: 'Awwwards / Design Portals', percent: 38, visits: Math.round(totalVisitors * 0.38) },
    { source: 'Direct URL Navigation', percent: 27, visits: Math.round(totalVisitors * 0.27) },
    { source: 'Organic Search (Google / DuckDuckGo)', percent: 19, visits: Math.round(totalVisitors * 0.19) },
    { source: 'Twitter / X & LinkedIn Mentions', percent: 11, visits: Math.round(totalVisitors * 0.11) },
    { source: 'GitHub Repositories', percent: 5, visits: Math.round(totalVisitors * 0.05) },
  ];

  const devices = [
    { label: 'Desktop & Workstations', percent: 64, icon: Monitor, color: 'text-purple-400' },
    { label: 'Mobile Smartphones', percent: 29, icon: Smartphone, color: 'text-blue-400' },
    { label: 'Tablets & Spatial Displays', percent: 7, icon: Tablet, color: 'text-cyan-400' },
  ];

  const funnelStages = [
    { stage: 'Unique Visitors', count: totalVisitors, dropoff: '100%' },
    { stage: 'Portfolio Work Explored', count: Math.round(totalVisitors * 0.62), dropoff: '62.0%' },
    { stage: 'Estimator Calculator Interacted', count: Math.round(totalVisitors * 0.28), dropoff: '28.0%' },
    { stage: 'Contact Inquiries Dispatched', count: totalInquiries, dropoff: `${conversionRate}%` },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8B5CF6] uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            TELEMETRY & CONVERSION AUDIT
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Agency Analytics
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
            Traffic attribution, device ergonomics, and visitor-to-client conversion funnel analysis.
          </p>
        </div>

        {/* Time Filter */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/5">
          {[
            { id: '7d', label: '7D' },
            { id: '30d', label: '30D' },
            { id: '90d', label: '90D' },
            { id: 'all', label: 'ALL' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTimeRange(t.id as any)}
              className={`px-3 py-1 rounded-xl text-xs font-mono ${
                timeRange === t.id
                  ? 'bg-[#8B5CF6] text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-panel p-6 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-zinc-400 uppercase">Gross Impressions</span>
            <Users className="w-4 h-4 text-[#8B5CF6]" />
          </div>
          <div className="text-3xl font-black font-display text-white">
            {totalVisitors.toLocaleString()}
          </div>
          <div className="text-[11px] font-mono text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs last period</span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-zinc-400 uppercase">Conversion Rate</span>
            <Target className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black font-display text-white">
            {conversionRate}%
          </div>
          <div className="text-[11px] font-mono text-zinc-500 mt-2">
            Visitor to Proposal Submission
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-zinc-400 uppercase">Total Inquiries</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black font-display text-white">
            {totalInquiries}
          </div>
          <div className="text-[11px] font-mono text-emerald-400 mt-2">
            Average deal target: $18,500
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-zinc-400 uppercase">Avg Session Duration</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black font-display text-white">
            3m 42s
          </div>
          <div className="text-[11px] font-mono text-zinc-500 mt-2">
            92% interactive engagement
          </div>
        </div>
      </div>

      {/* Traffic Sources & Device Ergonomics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Attribution Channels */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-display text-white">
              Traffic Acquisition Channels
            </h2>
            <span className="text-xs font-mono text-zinc-500">SHARE %</span>
          </div>

          <div className="space-y-4">
            {trafficSources.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-300 font-medium">{item.source}</span>
                  <span className="font-mono text-zinc-400">{item.percent}% ({item.visits.toLocaleString()})</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#C4B5FD] rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
          <h2 className="text-base font-bold font-display text-white">
            Device Distribution
          </h2>

          <div className="space-y-4">
            {devices.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-[#8B5CF6]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">{d.label}</div>
                      <div className="text-[11px] font-mono text-zinc-500">{d.percent}% of traffic</div>
                    </div>
                  </div>
                  <div className="text-lg font-mono font-bold text-white">
                    {d.percent}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5">
        <h2 className="text-base font-bold font-display text-white mb-2">
          End-to-End Client Conversion Funnel
        </h2>
        <p className="text-xs text-zinc-400 mb-6">
          How visitors navigate from landing on the hero to requesting a project proposal.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {funnelStages.map((stage, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 relative"
            >
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                STAGE 0{idx + 1}
              </div>
              <div className="text-sm font-semibold text-white mb-1">
                {stage.stage}
              </div>
              <div className="text-2xl font-black font-display text-[#8B5CF6]">
                {stage.count.toLocaleString()}
              </div>
              <div className="text-[11px] font-mono text-zinc-400 mt-2">
                Retention: <span className="text-white font-bold">{stage.dropoff}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
