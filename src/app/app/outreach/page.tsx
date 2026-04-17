'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockEmailSequences } from '@/lib/mockData';
import { Play, Pause, Mail, Link2, Phone, CheckCircle, ChevronRight, Zap, Plus } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { sleep } from '@/lib/utils';

type Seq = typeof mockEmailSequences[0];

const stepIcon = { email: Mail, linkedin: Link2, call: Phone };
const stepColors = { email: '#6366f1', linkedin: '#0077b5', call: '#22c55e' };

export default function OutreachPage() {
  const [sequences, setSequences] = useState(mockEmailSequences);
  const [selected, setSelected] = useState<Seq>(mockEmailSequences[0]);
  const [launching, setLaunching] = useState(false);
  const [launched, setLaunched] = useState(false);

  const toggleStatus = async (id: string) => {
    if (sequences.find((s) => s.id === id)?.status === 'active') {
      setSequences((prev) => prev.map((s) => s.id === id ? { ...s, status: 'paused' } : s));
    } else {
      setLaunching(true);
      await sleep(1800);
      setSequences((prev) => prev.map((s) => s.id === id ? { ...s, status: 'active' } : s));
      setLaunching(false);
      setLaunched(true);
      setTimeout(() => setLaunched(false), 3000);
    }
  };

  const selectedSeq = sequences.find((s) => s.id === selected.id) ?? selected;

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Outreach Automation</h2>
          <p className="text-sm text-white/35 mt-0.5">{sequences.length} active campaigns · {sequences.reduce((a, s) => a + s.prospects, 0)} prospects</p>
        </div>
        <Button size="sm"><Plus size={14} /> New Sequence</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Sequence list */}
        <div className="space-y-3">
          {sequences.map((seq) => (
            <motion.button key={seq.id} onClick={() => setSelected(seq)}
              whileHover={{ x: 2 }} whileTap={{ scale: 0.99 }}
              className={`w-full text-left p-4 rounded-2xl cursor-pointer transition-all ${selected.id === seq.id ? 'ring-1 ring-indigo-500/40' : ''}`}
              style={{ background: '#111118', border: `1px solid ${selected.id === seq.id ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.06)'}` }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                  <Mail size={14} className="text-indigo-400" />
                </div>
                <Badge variant={seq.status === 'active' ? 'success' : 'warning'} size="sm" dot>
                  {seq.status}
                </Badge>
              </div>
              <p className="text-sm font-medium text-white mb-1 leading-tight">{seq.name}</p>
              <div className="flex gap-3 text-[10px] text-white/30 mt-2">
                <span>{seq.prospects} prospects</span>
                <span>{seq.replied} replied</span>
              </div>
              <div className="mt-3 h-1 rounded-full bg-white/6">
                <div className="h-full rounded-full bg-indigo-400/50" style={{ width: `${(seq.opened / seq.prospects) * 100}%` }} />
              </div>
              <div className="mt-1 text-[10px] text-white/25">{Math.round((seq.opened / seq.prospects) * 100)}% open rate</div>
            </motion.button>
          ))}
        </div>

        {/* Sequence detail */}
        <div className="lg:col-span-2 rounded-2xl p-5 space-y-5" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">{selectedSeq.name}</h3>
              <p className="text-xs text-white/35 mt-0.5">{selectedSeq.steps.length} steps · {selectedSeq.prospects} prospects</p>
            </div>
            <div className="flex gap-2">
              <AnimatePresence mode="wait">
                {launched && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-emerald-400"
                    style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                    <CheckCircle size={13} /> Campaign started!
                  </motion.div>
                )}
              </AnimatePresence>
              <Button
                size="sm"
                variant={selectedSeq.status === 'active' ? 'danger' : 'primary'}
                loading={launching}
                onClick={() => toggleStatus(selectedSeq.id)}
              >
                {selectedSeq.status === 'active' ? <><Pause size={13} /> Pause</> : <><Play size={13} /> Start Campaign</>}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Prospects', value: selectedSeq.prospects, color: '#6366f1' },
              { label: 'Opened', value: selectedSeq.opened, color: '#f59e0b' },
              { label: 'Replied', value: selectedSeq.replied, color: '#22c55e' },
            ].map((s) => (
              <div key={s.label} className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[10px] text-white/35 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div>
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Sequence Steps</p>
            <div className="space-y-2">
              {selectedSeq.steps.map((step, i) => {
                const StepIcon = stepIcon[step.type as keyof typeof stepIcon] ?? Mail;
                const color = stepColors[step.type as keyof typeof stepColors] ?? '#6366f1';
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-4 p-3.5 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0"
                      style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                      <StepIcon size={14} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-white/30 uppercase tracking-wider">Day {step.day}</span>
                        <ChevronRight size={10} className="text-white/20" />
                        <span className="text-xs text-white/70 capitalize">{step.type}</span>
                      </div>
                      <p className="text-xs text-white/80 font-medium mt-0.5 truncate">{step.subject}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-semibold text-white">{step.sent}</div>
                      <div className="text-[10px] text-white/25">sent</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-semibold text-white/60">{step.opened}</div>
                      <div className="text-[10px] text-white/25">opened</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
