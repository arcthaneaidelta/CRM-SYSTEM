'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockTasks, mockTeamMembers } from '@/lib/mockData';
import { Plus, Star, Globe, MoreHorizontal, CheckCircle, Clock, Circle } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

type Task = typeof mockTasks[0];
type Status = 'todo' | 'inProgress' | 'done';

const columns: { id: Status; label: string; color: string }[] = [
  { id: 'todo', label: 'To Do', color: '#3b82f6' },
  { id: 'inProgress', label: 'In Progress', color: '#f59e0b' },
  { id: 'done', label: 'Done', color: '#22c55e' },
];

const priorityVariant = { high: 'danger', medium: 'warning', low: 'neutral' } as const;
const statusIcon = { todo: Circle, inProgress: Clock, done: CheckCircle };

export default function TeamPage() {
  const [tasks, setTasks] = useState(mockTasks);
  const [tab, setTab] = useState<'board' | 'members'>('board');

  const tasksByStatus = (s: Status) => tasks.filter((t) => t.status === s);

  const cycleStatus = (id: string) => {
    setTasks((prev) => prev.map((t) => {
      if (t.id !== id) return t;
      const cycle: Status[] = ['todo', 'inProgress', 'done'];
      const idx = cycle.indexOf(t.status as Status);
      return { ...t, status: cycle[(idx + 1) % cycle.length] };
    }));
  };

  return (
    <div className="space-y-5 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Team Management</h2>
          <p className="text-sm text-white/35 mt-0.5">{mockTeamMembers.length} team members · {tasks.filter((t) => t.status !== 'done').length} open tasks</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            {(['board', 'members'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2 text-xs font-medium transition-all cursor-pointer capitalize ${tab === t ? 'bg-indigo-500 text-white' : 'text-white/40 hover:text-white/70 bg-white/3'}`}>
                {t}
              </button>
            ))}
          </div>
          <Button size="sm"><Plus size={14} /> Add Task</Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {tab === 'board' ? (
          <motion.div key="board" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {columns.map((col) => {
                const colTasks = tasksByStatus(col.id);
                const StatusIcon = statusIcon[col.id];
                return (
                  <div key={col.id}>
                    <div className="flex items-center gap-2 mb-3 px-1">
                      <StatusIcon size={14} style={{ color: col.color }} />
                      <span className="text-xs font-semibold text-white/60">{col.label}</span>
                      <span className="text-xs text-white/25 ml-1">({colTasks.length})</span>
                    </div>
                    <div className="space-y-2.5">
                      {colTasks.map((task, i) => (
                        <motion.div key={task.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06 }} layout
                          className="p-4 rounded-2xl cursor-pointer group hover:border-white/10 transition-all"
                          style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}
                          onClick={() => cycleStatus(task.id)}>
                          <div className="flex items-start justify-between mb-3">
                            <Badge variant={priorityVariant[task.priority as keyof typeof priorityVariant]} size="sm">{task.priority}</Badge>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                              <MoreHorizontal size={14} className="text-white/30" />
                            </button>
                          </div>
                          <p className="text-sm font-medium text-white mb-1 leading-snug">{task.title}</p>
                          <p className="text-[11px] text-white/30 mb-3">{task.client}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
                              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                              {task.assignee.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <span className="text-[10px] text-white/25">Due {task.due}</span>
                          </div>
                          <div className="mt-2 text-[10px] text-white/20">Click to advance status</div>
                        </motion.div>
                      ))}
                      {colTasks.length === 0 && (
                        <div className="flex items-center justify-center h-20 rounded-2xl text-xs text-white/15" style={{ border: '1px dashed rgba(255,255,255,0.08)' }}>
                          No tasks
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div key="members" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockTeamMembers.map((member, i) => (
                <motion.div key={member.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -2, transition: { duration: 0.15 } }}
                  className="p-5 rounded-2xl" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                        {member.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#111118] ${member.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{member.name}</p>
                      <p className="text-xs text-white/40">{member.role}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-[10px] text-white/25">
                        <Globe size={10} />{member.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-amber-400">
                      <Star size={12} fill="currentColor" />{member.rating}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Tasks', value: member.tasks },
                      { label: 'Done', value: member.completed },
                      { label: 'Rate', value: `${Math.round((member.completed / member.tasks) * 100)}%` },
                    ].map((s) => (
                      <div key={s.label} className="p-2 rounded-lg text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <p className="text-sm font-bold text-white">{s.value}</p>
                        <p className="text-[10px] text-white/25 mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <div className="h-1.5 rounded-full bg-white/6">
                      <div className="h-full rounded-full bg-indigo-400"
                        style={{ width: `${(member.completed / member.tasks) * 100}%` }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
