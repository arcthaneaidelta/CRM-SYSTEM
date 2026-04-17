'use client';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Users, Target, CheckSquare, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockKPIs, mockRevenueData, mockActivityFeed } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';

const kpiCards = [
  { key: 'revenue', icon: DollarSign, color: '#6366f1', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)' },
  { key: 'activeClients', icon: Users, color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' },
  { key: 'pipeline', icon: Target, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
  { key: 'tasksCompleted', icon: CheckSquare, color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' },
];

const activityIcons: Record<string, typeof Activity> = {
  client: Users, billing: DollarSign, lead: Target, task: CheckSquare, outreach: Activity, workflow: Activity,
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl p-3 text-xs" style={{ background: '#161622', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}>
        <p className="text-white/50 mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ background: p.color }} />
            <span className="text-white/70 capitalize">{p.name}:</span>
            <span className="text-white font-medium">{formatCurrency(p.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome banner */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Good afternoon, Jonathan 👋</h2>
          <p className="text-sm text-white/35 mt-1">Here&apos;s your firm&apos;s performance overview for April 2026</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}>
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          All systems operational
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiCards.map((card, i) => {
          const kpi = mockKPIs[card.key as keyof typeof mockKPIs];
          const Icon = card.icon;
          const isRevenue = card.key === 'revenue' || card.key === 'pipeline';
          return (
            <motion.div key={card.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="p-5 rounded-2xl"
              style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: card.bg, border: `1px solid ${card.border}` }}>
                  <Icon size={16} style={{ color: card.color }} />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                  <TrendingUp size={12} />
                  +{kpi.change}%
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {isRevenue ? formatCurrency(kpi.value) : kpi.value.toLocaleString()}
                {card.key === 'tasksCompleted' ? '%' : ''}
              </div>
              <div className="text-xs text-white/35">{kpi.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.4 }}
          className="xl:col-span-2 p-5 rounded-2xl" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white">Revenue vs Expenses</h3>
              <p className="text-xs text-white/35 mt-0.5">Last 6 months performance</p>
            </div>
            <div className="flex gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-indigo-400 inline-block" />Revenue</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-purple-400 inline-block" />Expenses</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockRevenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revGrad)" />
              <Area type="monotone" dataKey="expenses" stroke="#a855f7" strokeWidth={2} fill="url(#expGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Activity feed */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }}
          className="p-5 rounded-2xl" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-white">Live Activity</h3>
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="space-y-3">
            {mockActivityFeed.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.07 }}
                className="flex gap-3 p-2.5 rounded-xl hover:bg-white/3 transition-colors">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.15)' }}>
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-white/80 leading-snug line-clamp-2">{item.message}</p>
                  <p className="text-[10px] text-white/25 mt-1">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Profit bar chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.4 }}
        className="p-5 rounded-2xl" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-white">Monthly Profit</h3>
            <p className="text-xs text-white/35 mt-0.5">Net profit tracked monthly</p>
          </div>
          <div className="text-xs font-medium text-emerald-400 flex items-center gap-1">
            <TrendingUp size={12} /> +34.2% vs last quarter
          </div>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={mockRevenueData} barSize={32}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="profit" fill="#6366f1" radius={[6, 6, 0, 0]} fillOpacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
