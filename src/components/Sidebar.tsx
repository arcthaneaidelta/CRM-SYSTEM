'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Users, Target, Mail, Calendar, CreditCard,
  Briefcase, GitBranch, CheckSquare, BarChart3, Settings,
  ChevronLeft, Zap, Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/app/dashboard' },
  { id: 'crm', label: 'CRM', icon: Users, path: '/app/crm' },
  { id: 'leads', label: 'Leads', icon: Target, path: '/app/leads' },
  { id: 'outreach', label: 'Outreach', icon: Mail, path: '/app/outreach' },
  { id: 'scheduling', label: 'Scheduling', icon: Calendar, path: '/app/scheduling' },
  { id: 'billing', label: 'Billing', icon: CreditCard, path: '/app/billing' },
  { id: 'clients', label: 'Clients', icon: Briefcase, path: '/app/clients' },
  { id: 'workflows', label: 'Workflows', icon: GitBranch, path: '/app/workflows' },
  { id: 'team', label: 'Team', icon: CheckSquare, path: '/app/team' },
  { id: 'reports', label: 'Reports', icon: BarChart3, path: '/app/reports' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/app/settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ duration: 0.25, ease: [0.25, 0, 0, 1] }}
      className="relative flex flex-col h-screen shrink-0 overflow-hidden"
      style={{ background: '#0d0d14', borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 mb-1 overflow-hidden">
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/25">
          <Building2 size={15} className="text-indigo-400" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="text-sm font-semibold text-white tracking-tight leading-none">AccountOS</div>
              <div className="text-[10px] text-white/30 mt-0.5 tracking-widest uppercase">Enterprise</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const active = pathname === item.path;
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              onClick={() => router.push(item.path)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left overflow-hidden group',
                active
                  ? 'bg-indigo-500/12 text-indigo-300 border border-indigo-500/20'
                  : 'text-white/45 hover:text-white/80 hover:bg-white/5 border border-transparent'
              )}
            >
              {active && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08), transparent)' }}
                  transition={{ duration: 0.25 }}
                />
              )}
              <Icon size={16} className="shrink-0 relative z-10" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="truncate relative z-10 whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {active && !collapsed && (
                <div className="ml-auto flex h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0 relative z-10" />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Status */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-3 mb-3 rounded-xl p-3"
            style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.12)' }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="flex h-2 w-2 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px rgba(52,211,153,0.8)' }} />
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-medium">All Systems Operational</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap size={10} className="text-indigo-400" />
              <span className="text-[10px] text-indigo-400/70">142 active clients synced</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-5 -right-3 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-[#1a1a28] border border-white/10 text-white/40 hover:text-white/80 hover:border-white/20 transition-all cursor-pointer"
      >
        <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronLeft size={12} />
        </motion.div>
      </button>
    </motion.aside>
  );
}
