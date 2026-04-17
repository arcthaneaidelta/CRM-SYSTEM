'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockClients } from '@/lib/mockData';
import { Search, Plus, ExternalLink, MoreHorizontal, TrendingUp, ChevronRight, X, User, Mail, CreditCard, Activity } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

type Client = typeof mockClients[0];

const planColors = { Enterprise: '#6366f1', Growth: '#8b5cf6', Starter: '#3b82f6' } as const;
const statusVariant = { active: 'success', onboarding: 'warning' } as const;

export default function ClientsPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Client | null>(null);

  const filtered = mockClients.filter((c) => {
    const q = search.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || c.contact.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Client Management</h2>
          <p className="text-sm text-white/35 mt-0.5">{mockClients.length} clients · {formatCurrency(mockClients.reduce((a, c) => a + c.mrr, 0) * 12)}/year ARR</p>
        </div>
        <Button size="sm"><Plus size={14} /> Add Client</Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clients..."
          className="w-full bg-white/4 border border-white/8 rounded-xl pl-8 pr-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-indigo-500/40 transition-all" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((client, i) => (
          <motion.div key={client.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }} whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onClick={() => setSelected(client)}
            className="p-5 rounded-2xl cursor-pointer group"
            style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: `${planColors[client.plan as keyof typeof planColors]}18`, border: `1px solid ${planColors[client.plan as keyof typeof planColors]}30` }}>
                  {client.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">{client.name}</p>
                  <p className="text-xs text-white/35">{client.contact}</p>
                </div>
              </div>
              <Badge variant={statusVariant[client.status as keyof typeof statusVariant] ?? 'neutral'} size="sm" dot>
                {client.status}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: 'MRR', value: formatCurrency(client.mrr) },
                { label: 'Plan', value: client.plan },
                { label: 'Tasks', value: client.tasks },
              ].map((s) => (
                <div key={s.label} className="p-2 rounded-lg text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <p className="text-xs font-semibold text-white">{s.value}</p>
                  <p className="text-[10px] text-white/25 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Health bar */}
            <div>
              <div className="flex justify-between text-[10px] text-white/30 mb-1.5">
                <span>Health Score</span>
                <span className={client.health >= 90 ? 'text-emerald-400' : client.health >= 75 ? 'text-amber-400' : 'text-red-400'}>{client.health}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/6">
                <div className="h-full rounded-full transition-all"
                  style={{
                    width: `${client.health}%`,
                    background: client.health >= 90 ? '#22c55e' : client.health >= 75 ? '#f59e0b' : '#ef4444',
                  }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Client detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.25, ease: [0.25, 0, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-3xl p-6 space-y-5"
              style={{ background: '#141420', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center text-base font-bold text-white"
                    style={{ background: `${planColors[selected.plan as keyof typeof planColors]}20`, border: `1px solid ${planColors[selected.plan as keyof typeof planColors]}30` }}>
                    {selected.name[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{selected.name}</h3>
                    <p className="text-xs text-white/40">{selected.contact} · Client since {selected.since}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white/70 transition-colors cursor-pointer"><X size={18} /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Monthly Revenue', value: formatCurrency(selected.mrr), icon: CreditCard },
                  { label: 'Annual Value', value: formatCurrency(selected.mrr * 12), icon: TrendingUp },
                  { label: 'Plan', value: selected.plan, icon: Activity },
                  { label: 'Open Tasks', value: selected.tasks.toString(), icon: Activity },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white/40">Health Score</span>
                  <span className={selected.health >= 90 ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>{selected.health}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/8">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${selected.health}%` }} transition={{ duration: 0.8, ease: [0.25, 0, 0, 1] }}
                    className="h-full rounded-full" style={{ background: selected.health >= 90 ? '#22c55e' : '#f59e0b' }} />
                </div>
              </div>
              <div className="flex gap-2 pt-2 border-t border-white/6">
                <Button variant="secondary" size="sm"><Mail size={13} /> Email Client</Button>
                <Button size="sm"><ExternalLink size={13} /> View Portal</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
