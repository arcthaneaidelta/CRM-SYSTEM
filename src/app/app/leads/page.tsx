'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockLeads } from '@/lib/mockData';
import { Search, Filter, Sparkles, ChevronUp, ChevronDown, Mail, Phone } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { sleep } from '@/lib/utils';

type Lead = typeof mockLeads[0];

const statusVariant = { hot: 'danger', warm: 'warning', cold: 'info' } as const;
const statusLabel = { hot: '🔥 Hot', warm: '☀️ Warm', cold: '❄️ Cold' } as const;

export default function LeadsPage() {
  const [leads, setLeads] = useState(mockLeads);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [enriching, setEnriching] = useState<string | null>(null);
  const [sort, setSort] = useState<{ col: keyof Lead; dir: 'asc' | 'desc' }>({ col: 'score', dir: 'desc' });

  const filtered = leads
    .filter((l) => {
      const q = search.toLowerCase();
      const matchSearch = !q || l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q) || l.title.toLowerCase().includes(q);
      const matchFilter = filter === 'all' || l.status === filter || l.title.toLowerCase().includes(filter.toLowerCase());
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      const av = a[sort.col] as string | number;
      const bv = b[sort.col] as string | number;
      if (sort.dir === 'asc') return av > bv ? 1 : -1;
      return av < bv ? 1 : -1;
    });

  const handleEnrich = async (id: string) => {
    setEnriching(id);
    await sleep(1800);
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, enriched: true, score: Math.min(l.score + 8, 99) } : l));
    setEnriching(null);
  };

  const toggleSort = (col: keyof Lead) => {
    setSort((s) => s.col === col ? { col, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { col, dir: 'desc' });
  };

  const SortIcon = ({ col }: { col: keyof Lead }) => (
    <span className="flex flex-col gap-px opacity-40">
      <ChevronUp size={8} className={sort.col === col && sort.dir === 'asc' ? 'opacity-100 text-indigo-400' : ''} />
      <ChevronDown size={8} className={sort.col === col && sort.dir === 'desc' ? 'opacity-100 text-indigo-400' : ''} />
    </span>
  );

  return (
    <div className="space-y-5 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Lead Generation</h2>
          <p className="text-sm text-white/35 mt-0.5">{leads.length} leads in pipeline · {leads.filter((l) => l.enriched).length} enriched</p>
        </div>
        <Button size="sm"><Sparkles size={14} /> Import Leads</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 p-4 rounded-2xl" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full bg-white/4 border border-white/8 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder:text-white/25 outline-none focus:border-indigo-500/40 transition-all" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'hot', 'warm', 'cold', 'CFO', 'Controller'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer capitalize ${filter === f ? 'bg-indigo-500 text-white' : 'bg-white/5 text-white/45 hover:text-white/70 hover:bg-white/8'}`}>
              {f === 'all' ? 'All Leads' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {[
                  { key: 'name', label: 'Name' }, { key: 'title', label: 'Title' },
                  { key: 'company', label: 'Company' }, { key: 'industry', label: 'Industry' },
                  { key: 'revenue', label: 'Revenue' }, { key: 'score', label: 'Score' },
                  { key: 'status', label: 'Status' },
                ].map((col) => (
                  <th key={col.key} onClick={() => toggleSort(col.key as keyof Lead)}
                    className="text-left px-4 py-3.5 text-[11px] font-medium text-white/30 uppercase tracking-wider cursor-pointer hover:text-white/50 transition-colors">
                    <div className="flex items-center gap-1.5">{col.label}<SortIcon col={col.key as keyof Lead} /></div>
                  </th>
                ))}
                <th className="px-4 py-3.5 text-right text-[11px] font-medium text-white/30 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((lead, i) => (
                  <motion.tr key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="group hover:bg-white/2 transition-colors"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                          {lead.name[0]}
                        </div>
                        <div>
                          <div className="text-white font-medium text-xs">{lead.name}</div>
                          <div className="text-white/30 text-[10px] mt-0.5 flex items-center gap-2">
                            <Mail size={9} /> {lead.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-white/60">{lead.title}</td>
                    <td className="px-4 py-3.5 text-xs text-white/70 font-medium">{lead.company}</td>
                    <td className="px-4 py-3.5 text-xs text-white/45">{lead.industry}</td>
                    <td className="px-4 py-3.5 text-xs text-white/60">{lead.revenue}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-white/8 max-w-[60px]">
                          <div className="h-full rounded-full bg-indigo-400" style={{ width: `${lead.score}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-white/70 tabular-nums">{lead.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant={statusVariant[lead.status as keyof typeof statusVariant]} size="sm" dot>
                        {statusLabel[lead.status as keyof typeof statusLabel]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      {lead.enriched ? (
                        <span className="text-[10px] text-emerald-400/70 font-medium">✓ Enriched</span>
                      ) : (
                        <Button variant="secondary" size="sm" loading={enriching === lead.id}
                          onClick={() => handleEnrich(lead.id)}>
                          <Sparkles size={11} /> Enrich
                        </Button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
