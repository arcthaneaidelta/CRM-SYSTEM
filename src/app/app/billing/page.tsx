'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockPlans } from '@/lib/mockData';
import { Check, CreditCard, Lock, CheckCircle, Zap, ArrowRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { sleep, formatCurrency } from '@/lib/utils';

type Plan = typeof mockPlans[0];

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [step, setStep] = useState<'plans' | 'checkout' | 'success'>('plans');
  const [processing, setProcessing] = useState(false);
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const formatCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
  };

  const handlePay = async () => {
    setProcessing(true);
    await sleep(2200);
    setProcessing(false);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="max-w-lg mx-auto mt-16 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 18 }}>
          <div className="relative flex h-28 w-28 mx-auto mb-8 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-indigo-500/10 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1))', border: '1px solid rgba(99,102,241,0.3)' }}>
              <CheckCircle size={44} className="text-indigo-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">You&apos;re all set!</h2>
          <p className="text-white/45 mb-2">Welcome to AccountOS {selectedPlan?.name}</p>
          <p className="text-sm text-white/30 mb-8">Your subscription is active · {formatCurrency(selectedPlan?.price ?? 0)}/month</p>
          <div className="p-5 rounded-2xl mb-6 text-left space-y-3" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">What&apos;s included</p>
            {selectedPlan?.features.slice(0, 4).map((f) => (
              <div key={f} className="flex items-center gap-2.5 text-sm text-white/60">
                <Check size={14} className="text-emerald-400 shrink-0" />{f}
              </div>
            ))}
          </div>
          <Button onClick={() => { setStep('plans'); setSelectedPlan(null); setCardNum(''); setExpiry(''); setCvc(''); }}>
            Back to Plans
          </Button>
        </motion.div>
      </div>
    );
  }

  if (step === 'checkout' && selectedPlan) {
    return (
      <div className="max-w-xl mx-auto space-y-5">
        <div>
          <button onClick={() => setStep('plans')} className="text-xs text-white/35 hover:text-white/60 transition-colors cursor-pointer mb-4 flex items-center gap-1">← Back to plans</button>
          <h2 className="text-xl font-semibold text-white">Checkout</h2>
          <p className="text-sm text-white/35 mt-0.5">{selectedPlan.name} Plan · {formatCurrency(selectedPlan.price)}/month</p>
        </div>

        {/* Order summary */}
        <div className="p-5 rounded-2xl" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">Order Summary</p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/60">{selectedPlan.name} Plan</span>
            <span className="text-sm text-white font-medium">{formatCurrency(selectedPlan.price)}/mo</span>
          </div>
          <div className="flex justify-between text-xs text-white/30 mb-4">
            <span>Billed monthly · Cancel anytime</span>
          </div>
          <div className="border-t border-white/6 pt-4 flex justify-between">
            <span className="text-sm font-semibold text-white">Total today</span>
            <span className="text-sm font-bold text-white">{formatCurrency(selectedPlan.price)}</span>
          </div>
        </div>

        {/* Payment form */}
        <div className="p-5 rounded-2xl space-y-4" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Payment Details</p>
            <div className="flex items-center gap-1 text-[10px] text-white/25"><Lock size={10} />Secure · 256-bit SSL</div>
          </div>
          <div>
            <label className="text-[10px] text-white/30 mb-1.5 block uppercase tracking-wider">Card Number</label>
            <div className="relative">
              <CreditCard size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
              <input value={cardNum} onChange={(e) => setCardNum(formatCard(e.target.value))}
                placeholder="4242 4242 4242 4242" maxLength={19}
                className="w-full bg-white/4 border border-white/8 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-indigo-500/50 transition-all font-mono tracking-wider" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Expiry', val: expiry, set: setExpiry, ph: 'MM / YY', fmt: formatExpiry, max: 7 },
              { label: 'CVC', val: cvc, set: setCvc, ph: '···', fmt: (v: string) => v.replace(/\D/g, '').slice(0, 3), max: 3 },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-[10px] text-white/30 mb-1.5 block uppercase tracking-wider">{f.label}</label>
                <input value={f.val} onChange={(e) => f.set(f.fmt(e.target.value))}
                  placeholder={f.ph} maxLength={f.max}
                  className="w-full bg-white/4 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-indigo-500/50 transition-all font-mono" />
              </div>
            ))}
          </div>
          <Button className="w-full justify-center mt-2" loading={processing}
            onClick={handlePay} disabled={!cardNum || !expiry || !cvc}>
            <Lock size={14} /> Pay {formatCurrency(selectedPlan.price)}
          </Button>
          <p className="text-center text-[10px] text-white/20">Your card won&apos;t be charged in this demo</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-6xl">
      <div>
        <h2 className="text-xl font-semibold text-white">Billing & Subscriptions</h2>
        <p className="text-sm text-white/35 mt-0.5">Choose the plan that fits your firm</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {mockPlans.map((plan, i) => (
          <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`p-6 rounded-2xl relative ${plan.recommended ? 'ring-1 ring-indigo-500/40' : ''}`}
            style={{ background: plan.recommended ? 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(168,85,247,0.04))' : '#111118', border: `1px solid ${plan.recommended ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.06)'}` }}>
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold text-white" style={{ background: '#6366f1', boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }}>
                  <Zap size={10} className="inline mr-1" />Most Popular
                </span>
              </div>
            )}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-white mb-1">{plan.name}</h3>
              <p className="text-xs text-white/35 leading-relaxed">{plan.description}</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">{formatCurrency(plan.price)}</span>
              <span className="text-white/35 text-sm ml-1">/month</span>
            </div>
            <div className="space-y-2.5 mb-6">
              {plan.features.map((f) => (
                <div key={f} className="flex items-start gap-2.5 text-sm text-white/55">
                  <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />{f}
                </div>
              ))}
            </div>
            <Button variant={plan.recommended ? 'primary' : 'secondary'} className="w-full justify-center"
              onClick={() => { setSelectedPlan(plan); setStep('checkout'); }}>
              Get Started <ArrowRight size={14} />
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Current status */}
      <div className="p-5 rounded-2xl" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-1">Current Subscription</p>
            <p className="text-sm font-semibold text-white">Enterprise Plan · Active since Nov 2023</p>
          </div>
          <Badge variant="success" dot>Active</Badge>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: 'Monthly Cost', value: '$6,200' },
            { label: 'Next Renewal', value: 'May 1, 2026' },
            { label: 'Clients Allowed', value: 'Unlimited' },
          ].map((s) => (
            <div key={s.label} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{s.label}</p>
              <p className="text-sm font-semibold text-white">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
