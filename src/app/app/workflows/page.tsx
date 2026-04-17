'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle, Zap, Users, CreditCard, BarChart3, ArrowRight, GitBranch, Plus, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { sleep } from '@/lib/utils';

const workflows = [
  {
    id: 'wf1', name: 'Lead → CRM Automation', status: 'active', runs: 284, lastRun: '2 min ago',
    nodes: [
      { id: 'n1', label: 'New Lead', type: 'trigger', x: 40, y: 80, color: '#6366f1' },
      { id: 'n2', label: 'Enrich Data', type: 'action', x: 200, y: 80, color: '#8b5cf6' },
      { id: 'n3', label: 'Score Lead', type: 'action', x: 360, y: 80, color: '#a855f7' },
      { id: 'n4', label: 'Create CRM Deal', type: 'action', x: 520, y: 80, color: '#c084fc' },
      { id: 'n5', label: 'Notify Sales Rep', type: 'action', x: 680, y: 80, color: '#22c55e' },
    ],
    edges: [['n1', 'n2'], ['n2', 'n3'], ['n3', 'n4'], ['n4', 'n5']],
  },
  {
    id: 'wf2', name: 'Client Onboarding Flow', status: 'active', runs: 89, lastRun: '1 hr ago',
    nodes: [
      { id: 'n1', label: 'Deal Won', type: 'trigger', x: 40, y: 80, color: '#22c55e' },
      { id: 'n2', label: 'Send Welcome', type: 'action', x: 200, y: 80, color: '#6366f1' },
      { id: 'n3', label: 'Collect Docs', type: 'action', x: 360, y: 80, color: '#8b5cf6' },
      { id: 'n4', label: 'Setup Billing', type: 'action', x: 520, y: 80, color: '#f59e0b' },
    ],
    edges: [['n1', 'n2'], ['n2', 'n3'], ['n3', 'n4']],
  },
  {
    id: 'wf3', name: 'Monthly Invoice Automation', status: 'paused', runs: 412, lastRun: '3 days ago',
    nodes: [
      { id: 'n1', label: 'Month End', type: 'trigger', x: 40, y: 80, color: '#f59e0b' },
      { id: 'n2', label: 'Generate Invoice', type: 'action', x: 200, y: 80, color: '#6366f1' },
      { id: 'n3', label: 'Send to Client', type: 'action', x: 360, y: 80, color: '#8b5cf6' },
      { id: 'n4', label: 'Log in Books', type: 'action', x: 520, y: 80, color: '#22c55e' },
    ],
    edges: [['n1', 'n2'], ['n2', 'n3'], ['n3', 'n4']],
  },
];

const nodeIcons: Record<string, typeof Zap> = {
  trigger: Zap, action: ArrowRight,
};

export default function WorkflowsPage() {
  const [selected, setSelected] = useState(workflows[0]);
  const [running, setRunning] = useState<string | null>(null);
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);

  const runWorkflow = async (wfId: string) => {
    const wf = workflows.find((w) => w.id === wfId);
    if (!wf) return;
    setSelected(wf);
    setRunning(wfId);
    setCompletedNodes([]);
    for (const node of wf.nodes) {
      await sleep(500);
      setCompletedNodes((prev) => [...prev, node.id]);
    }
    await sleep(400);
    setRunning(null);
  };

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Workflow Automation</h2>
          <p className="text-sm text-white/35 mt-0.5">{workflows.filter((w) => w.status === 'active').length} active workflows · 785 total runs</p>
        </div>
        <Button size="sm"><Plus size={14} /> New Workflow</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Workflow list */}
        <div className="space-y-3">
          {workflows.map((wf) => (
            <motion.button key={wf.id} onClick={() => { setSelected(wf); setCompletedNodes([]); }}
              whileHover={{ x: 2 }} whileTap={{ scale: 0.99 }}
              className={`w-full text-left p-4 rounded-2xl cursor-pointer transition-all ${selected.id === wf.id ? 'ring-1 ring-indigo-500/40' : ''}`}
              style={{ background: '#111118', border: `1px solid ${selected.id === wf.id ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.06)'}` }}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                  <GitBranch size={14} className="text-indigo-400" />
                </div>
                <Badge variant={wf.status === 'active' ? 'success' : 'warning'} size="sm" dot>{wf.status}</Badge>
              </div>
              <p className="text-xs font-semibold text-white mb-1 leading-tight">{wf.name}</p>
              <div className="flex gap-3 text-[10px] text-white/25">
                <span>{wf.runs} runs</span>
                <span>Last: {wf.lastRun}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Flow canvas */}
        <div className="lg:col-span-2 rounded-2xl p-5 space-y-4" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">{selected.name}</h3>
              <p className="text-xs text-white/35 mt-0.5">{selected.nodes.length} nodes · {selected.runs} total executions</p>
            </div>
            <Button size="sm" loading={running === selected.id} onClick={() => runWorkflow(selected.id)}>
              {running === selected.id ? <RefreshCw size={13} className="animate-spin" /> : <Play size={13} />}
              {running === selected.id ? 'Running...' : 'Test Run'}
            </Button>
          </div>

          {/* Visual flow */}
          <div className="relative overflow-x-auto pb-4">
            <div className="relative" style={{ height: 180, minWidth: 760 }}>
              {/* SVG edges */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {selected.edges.map(([from, to]) => {
                  const fromNode = selected.nodes.find((n) => n.id === from);
                  const toNode = selected.nodes.find((n) => n.id === to);
                  if (!fromNode || !toNode) return null;
                  const x1 = fromNode.x + 64;
                  const x2 = toNode.x;
                  const y = fromNode.y + 28;
                  const isActive = completedNodes.includes(from) && completedNodes.includes(to);
                  return (
                    <line key={`${from}-${to}`} x1={x1} y1={y} x2={x2} y2={y}
                      stroke={isActive ? '#6366f1' : 'rgba(255,255,255,0.08)'}
                      strokeWidth={isActive ? 2 : 1}
                      strokeDasharray={isActive ? 'none' : '4 3'}
                    />
                  );
                })}
              </svg>

              {/* Nodes */}
              {selected.nodes.map((node, i) => {
                const Icon = node.type === 'trigger' ? Zap : ArrowRight;
                const done = completedNodes.includes(node.id);
                return (
                  <motion.div key={node.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.05 } }}
                    style={{ position: 'absolute', left: node.x, top: node.y - 28, zIndex: 1 }}
                  >
                    <motion.div
                      animate={done ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{
                          background: done ? `${node.color}20` : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${done ? node.color + '50' : 'rgba(255,255,255,0.08)'}`,
                          boxShadow: done ? `0 0 20px ${node.color}25` : 'none',
                          transition: 'all 0.3s ease',
                        }}>
                        {done ? <CheckCircle size={22} style={{ color: node.color }} /> : <Icon size={20} className="text-white/25" />}
                      </div>
                      <span className="text-[10px] text-white/40 text-center w-16 leading-tight">{node.label}</span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/5">
            {[
              { label: 'Total Runs', value: selected.runs.toLocaleString() },
              { label: 'Status', value: selected.status },
              { label: 'Last Run', value: selected.lastRun },
            ].map((s) => (
              <div key={s.label} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-xs font-semibold text-white capitalize">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
