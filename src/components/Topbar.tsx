'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, X, ChevronDown } from 'lucide-react';

const notifications = [
  { id: 1, title: 'Invoice paid', desc: 'Helix Pharma — $7,400', time: '2m ago', unread: true },
  { id: 2, title: 'New lead assigned', desc: 'Patricia Nguyen · Orion Systems', time: '18m ago', unread: true },
  { id: 3, title: 'Task overdue', desc: 'Audit prep — Pinnacle Group', time: '1h ago', unread: false },
  { id: 4, title: 'Workflow completed', desc: '18 transactions auto-processed', time: '3h ago', unread: false },
];

export default function Topbar({ title }: { title: string }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header
      className="flex items-center justify-between px-6 py-4 shrink-0"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(20px)' }}
    >
      <div className="flex items-center gap-3">
        <h1 className="text-base font-semibold text-white tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <motion.div
          animate={{ width: searchFocused ? 240 : 200 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
          <input
            type="text"
            placeholder="Search anything..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full bg-white/4 border border-white/8 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder:text-white/25 outline-none focus:border-indigo-500/40 focus:bg-white/6 transition-all"
          />
        </motion.div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-white/4 border border-white/8 hover:bg-white/8 transition-all cursor-pointer"
          >
            <Bell size={15} className="text-white/50" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[9px] font-bold text-white">
                {unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 z-50 w-80 rounded-2xl overflow-hidden"
                style={{ background: '#161622', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/6">
                  <span className="text-sm font-semibold text-white">Notifications</span>
                  <button onClick={() => setNotifOpen(false)} className="text-white/30 hover:text-white/60 transition-colors cursor-pointer">
                    <X size={14} />
                  </button>
                </div>
                <div className="divide-y divide-white/4">
                  {notifications.map((n) => (
                    <div key={n.id} className={`flex gap-3 px-4 py-3 hover:bg-white/3 transition-colors ${n.unread ? 'bg-indigo-500/4' : ''}`}>
                      <div className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${n.unread ? 'bg-indigo-400' : 'bg-white/15'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white leading-tight">{n.title}</p>
                        <p className="text-xs text-white/40 mt-0.5 truncate">{n.desc}</p>
                      </div>
                      <span className="text-[10px] text-white/25 shrink-0 mt-0.5">{n.time}</span>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-white/6">
                  <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">Mark all as read</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User */}
        <button className="flex items-center gap-2.5 rounded-xl px-3 py-2 bg-white/4 border border-white/8 hover:bg-white/8 transition-all cursor-pointer">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[11px] font-bold text-white">
            JO
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-medium text-white leading-none">Jonathan</p>
            <p className="text-[10px] text-white/35 mt-0.5">Admin</p>
          </div>
          <ChevronDown size={12} className="text-white/30 hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
