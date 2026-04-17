'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, BarChart3, Users, Zap, Shield, Globe, TrendingUp, CheckCircle, ChevronRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0, 0, 1] } }),
};

const features = [
  { icon: Users, title: 'CRM Pipeline', desc: 'Kanban-style deal management with drag & drop. Track every opportunity from lead to close.' },
  { icon: Zap, title: 'Workflow Automation', desc: 'Visual flow builder automating your entire client lifecycle. Zero manual work.' },
  { icon: BarChart3, title: 'Real-Time Reporting', desc: 'Live financial dashboards with P&L, cash flow, and revenue breakdowns.' },
  { icon: Shield, title: 'Enterprise Security', desc: 'Bank-grade encryption, SOC 2 compliant, role-based access control.' },
  { icon: Globe, title: 'Offshore Team Hub', desc: 'Manage your global bookkeeping team with tasks, tracking, and performance metrics.' },
  { icon: TrendingUp, title: 'AI Lead Generation', desc: 'Enrich leads automatically and launch targeted outreach sequences in seconds.' },
];

const stats = [
  { value: '142+', label: 'Active Clients' },
  { value: '$8.4M', label: 'Revenue Processed' },
  { value: '99.9%', label: 'System Uptime' },
  { value: '4.9★', label: 'Client Satisfaction' },
];

const steps = [
  { n: '01', title: 'Lead Captured', desc: 'CFO contact auto-enriched from your ICP list', color: '#6366f1' },
  { n: '02', title: 'CRM Entry', desc: 'Deal created and assigned to sales rep', color: '#8b5cf6' },
  { n: '03', title: 'Proposal Sent', desc: 'Automated proposal generated and delivered', color: '#a78bfa' },
  { n: '04', title: 'Client Onboarded', desc: 'Welcome flow, docs collected, billing started', color: '#c4b5fd' },
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen" style={{ background: '#08080f', color: '#f4f4f6' }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: 'rgba(8,8,15,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <span className="font-semibold text-white text-sm">AccountOS</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-white/45">
          {['Features', 'How It Works', 'Pricing', 'Team'].map((l) => (
            <button key={l} className="hover:text-white/80 transition-colors cursor-pointer">{l}</button>
          ))}
        </div>
        <button
          onClick={() => router.push('/app/dashboard')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all cursor-pointer"
          style={{ background: '#6366f1', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}
        >
          Open Dashboard <ArrowRight size={14} />
        </button>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)',
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, #6366f1 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <motion.div initial="hidden" animate="visible" className="relative z-10 max-w-4xl space-y-6">
          <motion.div variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium mb-2"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px #4ade80' }} />
            Now serving 142 firms worldwide — Fully Automated
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            The Operating System<br />
            <span style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              for Modern Accounting
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">
            AccountOS replaces 12 tools with one AI-powered platform — CRM, billing, bookkeeping, outreach, and offshore team management. Built for firms that want to scale.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => router.push('/app/dashboard')}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer hover:scale-105 active:scale-100"
              style={{ background: '#6366f1', boxShadow: '0 8px 30px rgba(99,102,241,0.35)' }}
            >
              View Live Demo <ArrowRight size={16} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-white/60 hover:text-white/90 cursor-pointer transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              Watch Overview <ChevronRight size={14} />
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} custom={4} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/35 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* System flow */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <motion.p variants={fadeUp} custom={0} className="text-xs font-medium tracking-widest uppercase text-indigo-400 mb-3">How It Works</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold text-white">From lead to loyal client</motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-white/40 mt-3 max-w-xl mx-auto">Every touchpoint automated. Every workflow connected. One unified system.</motion.p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-0 right-0 h-px hidden md:block" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), rgba(192,132,252,0.4), transparent)' }} />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={step.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative flex flex-col items-center text-center p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl mb-4 text-lg font-bold" style={{ background: `${step.color}15`, border: `1px solid ${step.color}30`, color: step.color }}>
                  {step.n}
                </div>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <motion.p variants={fadeUp} custom={0} className="text-xs font-medium tracking-widest uppercase text-indigo-400 mb-3">Platform Modules</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold text-white">Everything your firm needs</motion.h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl cursor-pointer group"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-4"
                  style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                  <Icon size={18} className="text-indigo-400" />
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center rounded-3xl p-16 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.08))', border: '1px solid rgba(99,102,241,0.2)' }}>
          <div className="absolute inset-0 rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-6 text-emerald-400/80 text-sm font-medium">
              <CheckCircle size={16} /> <span>No credit card required · 14-day free trial</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Ready to automate your firm?</h2>
            <p className="text-white/40 mb-8 max-w-xl mx-auto">Join 142+ accounting firms using AccountOS to close more deals, retain every client, and run a lean, automated operation.</p>
            <button
              onClick={() => router.push('/app/dashboard')}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white cursor-pointer hover:scale-105 active:scale-100 transition-all"
              style={{ background: '#6366f1', boxShadow: '0 8px 40px rgba(99,102,241,0.4)' }}
            >
              Launch Live System Demo <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-white/20" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        © 2026 AccountOS · AI-Powered Accounting Firm OS · All rights reserved
      </footer>
    </div>
  );
}
