'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockDeals } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import { X, Mail, Phone, TrendingUp, Plus, MoreHorizontal, ChevronRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

type Stage = 'discovery' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won';

const stages: { id: Stage; label: string; color: string }[] = [
  { id: 'discovery', label: 'Discovery', color: '#3b82f6' },
  { id: 'qualified', label: 'Qualified', color: '#8b5cf6' },
  { id: 'proposal', label: 'Proposal', color: '#f59e0b' },
  { id: 'negotiation', label: 'Negotiation', color: '#f97316' },
  { id: 'closed-won', label: 'Closed Won', color: '#22c55e' },
];

const stageBadgeVariant: Record<Stage, 'info' | 'accent' | 'warning' | 'danger' | 'success'> = {
  discovery: 'info', qualified: 'accent', proposal: 'warning', negotiation: 'danger', 'closed-won': 'success',
};

export default function CRMPage() {
  const [deals, setDeals] = useState(mockDeals);
  const [selected, setSelected] = useState<typeof mockDeals[0] | null>(null);

  const dealsByStage = (stage: Stage) => deals.filter((d) => d.stage === stage);

  const moveStage = (dealId: string, dir: 1 | -1) => {
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== dealId) return d;
        const idx = stages.findIndex((s) => s.id === d.stage);
        const next = stages[Math.max(0, Math.min(stages.length - 1, idx + dir))];
        return { ...d, stage: next.id };
      })
    );
  };

  return (
    <div className="space-y-5 max-w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Sales Pipeline</h2>
          <p className="text-sm text-white/35 mt-0.5">
            {deals.length} deals · {formatCurrency(deals.reduce((a, d) => a + d.value, 0))} total pipeline
          </p>
        </div>
        <Button size="sm"><Plus size={14} /> Add Deal</Button>
      </div>

      {/* Pipeline board */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1">
        {stages.map((stage) => {
          const stageDeals = dealsByStage(stage.id);
          const stageValue = stageDeals.reduce((a, d) => a + d.value, 0);
          return (
            <div key={stage.id} className="flex-shrink-0 w-64">
              {/* Stage header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ background: stage.color }} />
                  <span className="text-xs font-semibold text-white/70">{stage.label}</span>
                  <span className="text-xs text-white/30 ml-1">({stageDeals.length})</span>
                </div>
                <span className="text-[10px] text-white/30 font-mono">{formatCurrency(stageValue)}</span>
              </div>

              {/* Cards */}
              <div className="space-y-2.5">
                {stageDeals.map((deal, i) => (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelected(deal)}
                    whileHover={{ y: -2, transition: { duration: 0.15 } }}
                    className="p-4 rounded-2xl cursor-pointer group"
                    style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                        style={{ background: `${stage.color}18`, border: `1px solid ${stage.color}30` }}>
                        {deal.title[0]}
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); }}>
                        <MoreHorizontal size={14} className="text-white/40" />
                      </button>
                    </div>
                    <p className="text-sm font-medium text-white mb-1 leading-tight">{deal.title}</p>
                    <p className="text-xs text-white/35 mb-3">{deal.contact}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{formatCurrency(deal.value)}</span>
                      <Badge variant={stageBadgeVariant[deal.stage as Stage]} size="sm">{deal.probability}%</Badge>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-white/25">
                      <span>{deal.owner}</span>
                      <span>{deal.daysInStage}d in stage</span>
                    </div>
                    {/* Probability bar */}
                    <div className="mt-2 h-0.5 rounded-full bg-white/6">
                      <div className="h-full rounded-full" style={{ width: `${deal.probability}%`, background: stage.color, opacity: 0.6 }} />
                    </div>
                  </motion.div>
                ))}
                {stageDeals.length === 0 && (
                  <div className="flex items-center justify-center h-20 rounded-2xl text-xs text-white/15" style={{ border: '1px dashed rgba(255,255,255,0.08)' }}>
                    No deals
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Deal modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.25, ease: [0.25, 0, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-3xl p-6 space-y-5"
              style={{ background: '#141420', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{selected.title}</h3>
                  <p className="text-sm text-white/40 mt-1">{selected.company}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white/70 transition-colors cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Deal Value', value: formatCurrency(selected.value) },
                  { label: 'Probability', value: `${selected.probability}%` },
                  { label: 'Stage', value: stages.find((s) => s.id === selected.stage)?.label ?? '' },
                  { label: 'Owner', value: selected.owner },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1.5">Notes</p>
                <p className="text-sm text-white/60">{selected.notes}</p>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition-colors cursor-pointer">
                  <Mail size={13} /> {selected.email}
                </button>
              </div>

              <div className="flex gap-2 pt-2 border-t border-white/6">
                <Button variant="ghost" size="sm" onClick={() => moveStage(selected.id, -1)}>← Move Back</Button>
                <Button size="sm" onClick={() => moveStage(selected.id, 1)}>Advance Stage <ChevronRight size={14} /></Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
