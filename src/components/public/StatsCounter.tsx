import React from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { Trophy, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

export const StatsCounter: React.FC = () => {
  const { stats, projects } = useWebsite();

  const completedCount = projects.filter(p => p.status === 'completed').length || 18;
  const visitorCount = stats.totalVisitors || 18492;

  const metrics = [
    {
      label: 'Delivered Projects',
      value: `${completedCount}+`,
      subtext: 'Flagships & Web Applications',
      icon: CheckCircle2,
    },
    {
      label: 'Client Satisfaction',
      value: '99.8%',
      subtext: 'Net Promoter Score (NPS)',
      icon: Users,
    },
    {
      label: 'Visitor Footprint',
      value: `${(visitorCount / 1000).toFixed(1)}k+`,
      subtext: 'Global Unique Impressions',
      icon: TrendingUp,
    },
    {
      label: 'Design Accolades',
      value: '42',
      subtext: 'Awwwards, FWA & CSSDA Awards',
      icon: Trophy,
    },
  ];

  return (
    <section className="py-16 relative border-y border-white/5 bg-[#0e0e11]/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div
                key={i}
                className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-[#8B5CF6]/30 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    VERIFIED
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight group-hover:text-gradient-purple transition-colors">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-zinc-200 mt-2">{metric.label}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{metric.subtext}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
