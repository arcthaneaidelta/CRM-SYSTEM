'use client';
import { motion } from 'framer-motion';
import { mockReportData, mockRevenueData } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, Download } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import Button from '@/components/ui/Button';

const PIE_COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#c084fc', '#ddd6fe', '#818cf8'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl p-3 text-xs" style={{ background: '#161622', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}>
        {label && <p className="text-white/50 mb-2">{label}</p>}
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ background: p.color ?? p.fill }} />
            <span className="text-white/70 capitalize">{p.name}:</span>
            <span className="text-white font-medium">{typeof p.value === 'number' && p.value > 999 ? formatCurrency(p.value) : p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ReportsPage() {
  const summaryStats = [
    { label: 'Total Revenue YTD', value: '$4.77M', change: '+18.4%', positive: true },
    { label: 'Net Profit Margin', value: '48.2%', change: '+3.1%', positive: true },
    { label: 'Cash on Hand', value: '$1.24M', change: '-2.1%', positive: false },
    { label: 'Accounts Receivable', value: '$386K', change: '-12.3%', positive: true },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Reports & Analytics</h2>
          <p className="text-sm text-white/35 mt-0.5">Financial performance · April 2026</p>
        </div>
        <Button variant="secondary" size="sm"><Download size={14} /> Export Report</Button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryStats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-5 rounded-2xl" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs text-white/35 mb-2">{s.label}</p>
            <p className="text-2xl font-bold text-white mb-1">{s.value}</p>
            <div className={`flex items-center gap-1 text-xs font-medium ${s.positive ? 'text-emerald-400' : 'text-red-400'}`}>
              <TrendingUp size={12} />{s.change} vs last period
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Cash Flow */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="p-5 rounded-2xl" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white">Cash Flow</h3>
            <p className="text-xs text-white/35 mt-0.5">Monthly inflows vs outflows</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockReportData.cashFlow} barSize={20} barGap={4}>
              <defs>
                <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.5} />
                </linearGradient>
                <linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="inflow" fill="url(#inflowGrad)" radius={[4, 4, 0, 0]} name="Inflow" />
              <Bar dataKey="outflow" fill="url(#outflowGrad)" radius={[4, 4, 0, 0]} name="Outflow" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Client revenue breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="p-5 rounded-2xl" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white">Revenue by Client</h3>
            <p className="text-xs text-white/35 mt-0.5">Annual revenue distribution</p>
          </div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={mockReportData.clientRevenue} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3}>
                  {mockReportData.clientRevenue.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {mockReportData.clientRevenue.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full shrink-0" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                    <span className="text-xs text-white/50 truncate max-w-[90px]">{item.name}</span>
                  </div>
                  <span className="text-xs font-medium text-white/70">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Expense breakdown */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="p-5 rounded-2xl" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-white">Expense Breakdown</h3>
          <p className="text-xs text-white/35 mt-0.5">Monthly expenses by category</p>
        </div>
        <div className="space-y-3">
          {mockReportData.expenseBreakdown.map((e, i) => {
            const total = mockReportData.expenseBreakdown.reduce((a, x) => a + x.amount, 0);
            const pct = (e.amount / total) * 100;
            return (
              <div key={e.category}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-white/60">{e.category}</span>
                  <div className="flex gap-3">
                    <span className="text-white/35">{pct.toFixed(1)}%</span>
                    <span className="text-white font-medium">{formatCurrency(e.amount)}</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-white/5">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0, 0, 1] }}
                    className="h-full rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
