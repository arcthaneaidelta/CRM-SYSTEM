'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phases = [
  { label: 'Initializing Financial Systems', sub: 'Loading core modules...', duration: 900 },
  { label: 'Connecting Data Sources', sub: 'Establishing secure connections...', duration: 900 },
  { label: 'Preparing Dashboard', sub: 'Syncing client data...', duration: 700 },
  { label: 'System Ready', sub: 'Welcome back', duration: 500 },
];

// Move particle generation into a stable client-side state
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on the client
    setParticles(Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    })));
  }, []);

  useEffect(() => {
    let current = 0;
    let phase = 0;
    const totalDuration = phases.reduce((a, p) => a + p.duration, 0);
    const step = 16;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += step;
      const raw = (elapsed / totalDuration) * 100;
      current = Math.min(raw, 100);
      setProgress(current);

      let acc = 0;
      for (let i = 0; i < phases.length; i++) {
        acc += phases[i].duration;
        if (elapsed <= acc) {
          phase = i;
          break;
        }
      }
      setPhaseIndex(phase);

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setProgress(100);
        setPhaseIndex(phases.length - 1);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 400);
      }
    }, step);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.25, 0, 0, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#08080f' }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
            }}
          />

          {/* Particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-indigo-400/40"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{ opacity: [0, 0.8, 0], y: [0, -30, -60], scale: [0, 1, 0] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Radial glow */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] }}
            className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm px-8"
          >
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-indigo-500/20 border border-indigo-500/30" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-1 rounded-lg border border-indigo-500/40 border-dashed"
                />
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="relative z-10">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-white font-semibold text-xl tracking-tight">AccountOS</div>
                <div className="text-indigo-400/70 text-xs font-medium tracking-widest uppercase">Enterprise Platform</div>
              </div>
            </div>

            {/* Phase text */}
            <div className="w-full text-center space-y-1.5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={phaseIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="text-white font-medium text-sm tracking-tight"
                >
                  {phases[phaseIndex]?.label}
                </motion.p>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`sub-${phaseIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-white/35 text-xs"
                >
                  {phases[phaseIndex]?.sub}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="w-full space-y-2">
              <div className="h-px w-full bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-violet-400 to-indigo-400 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/20 text-[10px] font-mono">
                  SYS.BOOT v2.6.1
                </span>
                <span className="text-white/40 text-[10px] font-mono tabular-nums">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            {/* System status dots */}
            <div className="flex gap-6">
              {['CRM', 'BILLING', 'REPORTS', 'TEAM'].map((label, i) => (
                <motion.div
                  key={label}
                  className="flex flex-col items-center gap-1.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: progress > (i + 1) * 20 ? 1 : 0.25 }}
                  transition={{ duration: 0.4 }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: progress > (i + 1) * 20 ? '#6366f1' : '#334155',
                      boxShadow: progress > (i + 1) * 20 ? '0 0 6px rgba(99,102,241,0.8)' : 'none',
                    }}
                  />
                  <span className="text-[9px] font-mono text-white/25 tracking-wider">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
