'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Upload, CreditCard, User, FileText, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import { sleep } from '@/lib/utils';

const steps = [
  { id: 0, label: 'Welcome', icon: Zap },
  { id: 1, label: 'Documents', icon: FileText },
  { id: 2, label: 'Payment', icon: CreditCard },
  { id: 3, label: 'Complete', icon: CheckCircle },
];

export default function ClientsOnboardingPage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [firmName, setFirmName] = useState('');
  const [contactName, setContactName] = useState('');

  const next = async () => {
    setLoading(true);
    await sleep(1000);
    setLoading(false);
    setStep((s) => s + 1);
  };

  const simulateUpload = async (name: string) => {
    await sleep(900);
    setUploaded((prev) => [...prev, name]);
  };

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold text-white">Client Onboarding</h2>
        <p className="text-sm text-white/35 mt-0.5">Step-by-step client intake flow</p>
      </div>

      {/* Step indicator */}
      <div className="p-5 rounded-2xl" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-5 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="absolute left-0 top-5 h-px transition-all duration-700"
            style={{ width: `${(step / (steps.length - 1)) * 100}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
          {steps.map((s) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="relative flex flex-col items-center gap-2 z-10">
                <motion.div animate={{ scale: active ? 1.15 : 1 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all"
                  style={{
                    background: done ? '#6366f1' : active ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.05)',
                    border: `2px solid ${done || active ? '#6366f1' : 'rgba(255,255,255,0.1)'}`,
                    boxShadow: active ? '0 0 20px rgba(99,102,241,0.4)' : 'none',
                  }}>
                  {done ? <CheckCircle size={16} className="text-white" /> : <Icon size={16} className={active ? 'text-indigo-400' : 'text-white/25'} />}
                </motion.div>
                <span className={`text-[11px] font-medium whitespace-nowrap ${active ? 'text-indigo-300' : done ? 'text-white/60' : 'text-white/25'}`}>{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="p-6 rounded-2xl min-h-64 space-y-5" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
        {step === 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="text-center pb-2">
              <div className="flex h-16 w-16 mx-auto mb-4 items-center justify-center rounded-2xl" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                <Zap size={28} className="text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Welcome to AccountOS</h3>
              <p className="text-sm text-white/40">Let&apos;s set up your firm profile in just a few minutes. We&apos;ll collect your documents, set up billing, and get you live.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Firm Name', val: firmName, set: setFirmName, ph: 'Acme Accounting LLC' },
                { label: 'Contact Name', val: contactName, set: setContactName, ph: 'Jennifer Walsh' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-[10px] text-white/30 mb-1.5 block uppercase tracking-wider">{f.label}</label>
                  <input value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.ph}
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-indigo-500/50 transition-all" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div>
              <h3 className="text-base font-semibold text-white mb-1">Upload Documents</h3>
              <p className="text-sm text-white/40">We need a few documents to get started</p>
            </div>
            {[
              { name: 'Prior Year Tax Return', desc: 'PDF or image' },
              { name: 'Bank Statements (3 months)', desc: 'PDF or CSV' },
              { name: 'Business Registration', desc: 'Certificate of formation' },
            ].map((doc) => {
              const done = uploaded.includes(doc.name);
              return (
                <div key={doc.name} className="flex items-center justify-between p-4 rounded-xl"
                  style={{ background: done ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.03)', border: `1px solid ${done ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{ background: done ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.05)', border: `1px solid ${done ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.08)'}` }}>
                      {done ? <CheckCircle size={16} className="text-emerald-400" /> : <FileText size={16} className="text-white/30" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{doc.name}</p>
                      <p className="text-xs text-white/30">{doc.desc}</p>
                    </div>
                  </div>
                  {!done ? (
                    <Button variant="secondary" size="sm" onClick={() => simulateUpload(doc.name)}>
                      <Upload size={12} /> Upload
                    </Button>
                  ) : (<span className="text-xs text-emerald-400 font-medium">✓ Uploaded</span>)}
                </div>
              );
            })}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div>
              <h3 className="text-base font-semibold text-white mb-1">Payment Setup</h3>
              <p className="text-sm text-white/40">Set up your billing to activate your account</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/60">Growth Plan</span>
                <span className="text-white font-semibold">$2,400/mo</span>
              </div>
              <p className="text-xs text-white/30">Billed monthly · 14-day free trial included</p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-white/30 mb-1.5 block uppercase tracking-wider">Card Number</label>
                <input placeholder="4242 4242 4242 4242" defaultValue="4242 4242 4242 4242"
                  className="w-full bg-white/4 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white font-mono outline-none focus:border-indigo-500/50 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="MM / YY" defaultValue="04 / 28"
                  className="bg-white/4 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white font-mono outline-none focus:border-indigo-500/50 transition-all" />
                <input placeholder="CVC" defaultValue="424"
                  className="bg-white/4 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white font-mono outline-none focus:border-indigo-500/50 transition-all" />
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="text-center py-8 space-y-4">
            <div className="relative flex h-24 w-24 mx-auto items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-indigo-500/10 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.12))', border: '1px solid rgba(99,102,241,0.3)' }}>
                <CheckCircle size={40} className="text-indigo-400" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Onboarding Complete!</h3>
              <p className="text-white/45">{firmName || 'Your firm'} is now live on AccountOS</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {['CRM Active', 'Billing Live', 'Team Ready'].map((item) => (
                <div key={item} className="p-3 rounded-xl text-xs font-medium text-emerald-400" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                  <CheckCircle size={14} className="mx-auto mb-1" />{item}
                </div>
              ))}
            </div>
            <Button onClick={() => setStep(0)} variant="secondary" className="mt-4">Start New Onboarding</Button>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      {step < 3 && (
        <div className="flex justify-between">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>← Back</Button>
          ) : <div />}
          <Button loading={loading} onClick={next} disabled={step === 0 && (!firmName || !contactName)}>
            {step === 2 ? 'Complete Setup' : 'Continue'} <ArrowRight size={14} />
          </Button>
        </div>
      )}
    </div>
  );
}
