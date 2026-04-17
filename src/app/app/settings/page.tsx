'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, Globe, Users, Zap, CreditCard, Save, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { sleep } from '@/lib/utils';

const tabs = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'team', label: 'Team & Roles', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Zap },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

const integrations = [
  { name: 'QuickBooks Online', desc: 'Sync transactions and invoices', connected: true, logo: '📊' },
  { name: 'Stripe', desc: 'Payment processing and subscriptions', connected: true, logo: '💳' },
  { name: 'Slack', desc: 'Team notifications and alerts', connected: false, logo: '💬' },
  { name: 'Google Calendar', desc: 'Sync meetings and deadlines', connected: true, logo: '📅' },
  { name: 'Zapier', desc: '3000+ app integrations', connected: false, logo: '⚡' },
  { name: 'HubSpot', desc: 'CRM data sync', connected: false, logo: '🔶' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [firmName, setFirmName] = useState('AccountOS Demo Firm');
  const [email, setEmail] = useState('admin@accountos.com');
  const [timezone, setTimezone] = useState('America/New_York');
  const [notifications, setNotifications] = useState({
    newLead: true, invoicePaid: true, taskOverdue: true, weeklyReport: false, systemAlerts: true,
  });
  const [intgs, setIntgs] = useState(integrations);

  const handleSave = async () => {
    setSaving(true);
    await sleep(1200);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleIntegration = (name: string) => {
    setIntgs((prev) => prev.map((i) => i.name === name ? { ...i, connected: !i.connected } : i));
  };

  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h2 className="text-xl font-semibold text-white">Settings</h2>
        <p className="text-sm text-white/35 mt-0.5">Manage your firm&apos;s configuration and preferences</p>
      </div>

      <div className="flex gap-5">
        {/* Tab sidebar */}
        <div className="w-44 shrink-0 space-y-0.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-left transition-all cursor-pointer
                  ${activeTab === tab.id ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'text-white/45 hover:text-white/70 hover:bg-white/5'}`}>
                <Icon size={15} />{tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {activeTab === 'general' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="p-5 rounded-2xl space-y-4" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="text-sm font-semibold text-white">Firm Information</h3>
                {[
                  { label: 'Firm Name', val: firmName, set: setFirmName, ph: 'Your Firm LLC' },
                  { label: 'Admin Email', val: email, set: setEmail, ph: 'admin@firm.com' },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-[10px] text-white/30 mb-1.5 block uppercase tracking-wider">{f.label}</label>
                    <input value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.ph}
                      className="w-full bg-white/4 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-indigo-500/50 transition-all" />
                  </div>
                ))}
                <div>
                  <label className="text-[10px] text-white/30 mb-1.5 block uppercase tracking-wider">Timezone</label>
                  <select value={timezone} onChange={(e) => setTimezone(e.target.value)}
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500/50 transition-all cursor-pointer appearance-none">
                    {['America/New_York', 'America/Los_Angeles', 'America/Chicago', 'Europe/London', 'Asia/Dubai', 'Asia/Singapore'].map((tz) => (
                      <option key={tz} value={tz} style={{ background: '#111118' }}>{tz.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <div className="p-5 rounded-2xl space-y-4" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="text-sm font-semibold text-white">Notification Preferences</h3>
                {[
                  { key: 'newLead', label: 'New Lead Assigned', desc: 'When a lead is added to your pipeline' },
                  { key: 'invoicePaid', label: 'Invoice Paid', desc: 'When a client pays an invoice' },
                  { key: 'taskOverdue', label: 'Task Overdue', desc: 'When a task passes its due date' },
                  { key: 'weeklyReport', label: 'Weekly Report', desc: 'Summary digest every Monday morning' },
                  { key: 'systemAlerts', label: 'System Alerts', desc: 'Critical system and security notifications' },
                ].map((n) => (
                  <div key={n.key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-sm text-white">{n.label}</p>
                      <p className="text-xs text-white/35 mt-0.5">{n.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications((prev) => ({ ...prev, [n.key]: !prev[n.key as keyof typeof prev] }))}
                      className={`relative h-6 w-11 rounded-full transition-all duration-200 cursor-pointer ${notifications[n.key as keyof typeof notifications] ? 'bg-indigo-500' : 'bg-white/10'}`}>
                      <div className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-200 ${notifications[n.key as keyof typeof notifications] ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'integrations' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <div className="p-5 rounded-2xl space-y-3" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="text-sm font-semibold text-white mb-4">Connected Applications</h3>
                {intgs.map((intg) => (
                  <div key={intg.name} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{intg.logo}</span>
                      <div>
                        <p className="text-sm font-medium text-white">{intg.name}</p>
                        <p className="text-xs text-white/35">{intg.desc}</p>
                      </div>
                    </div>
                    <button onClick={() => toggleIntegration(intg.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${intg.connected ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20' : 'bg-white/5 text-white/50 border border-white/10 hover:bg-indigo-500/10 hover:text-indigo-400 hover:border-indigo-500/20'}`}>
                      {intg.connected ? '✓ Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <div className="p-5 rounded-2xl space-y-4" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="text-sm font-semibold text-white">Security Settings</h3>
                {[
                  { label: 'Two-Factor Authentication', desc: '2FA enabled via Authenticator App', enabled: true },
                  { label: 'Session Timeout', desc: 'Auto logout after 30 min inactivity', enabled: true },
                  { label: 'IP Allowlist', desc: 'Restrict access to specific IPs', enabled: false },
                  { label: 'Audit Logs', desc: 'Track all admin actions', enabled: true },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                      <p className="text-sm text-white">{s.label}</p>
                      <p className="text-xs text-white/35 mt-0.5">{s.desc}</p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.enabled ? 'text-emerald-400 bg-emerald-500/10' : 'text-white/30 bg-white/5'}`}>
                      {s.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {(activeTab === 'team' || activeTab === 'billing') && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-48 rounded-2xl text-center"
              style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(99,102,241,0.1)' }}>
                {activeTab === 'team' ? <Users size={18} className="text-indigo-400" /> : <CreditCard size={18} className="text-indigo-400" />}
              </div>
              <p className="text-sm text-white/50">Configure {activeTab === 'team' ? 'team roles and permissions' : 'billing details'}</p>
              <p className="text-xs text-white/25 mt-1">Available in Enterprise plan</p>
            </motion.div>
          )}

          {/* Save button */}
          {activeTab !== 'integrations' && activeTab !== 'security' && (
            <div className="flex justify-end">
              <Button loading={saving} onClick={handleSave}>
                {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
