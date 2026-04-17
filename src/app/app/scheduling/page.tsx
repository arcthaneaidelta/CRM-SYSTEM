'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockTimeSlots } from '@/lib/mockData';
import { ChevronLeft, ChevronRight, CheckCircle, Calendar, Clock, User, Video } from 'lucide-react';
import Button from '@/components/ui/Button';
import { sleep } from '@/lib/utils';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function buildCalendar(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(first).fill(null);
  for (let i = 1; i <= days; i++) cells.push(i);
  return cells;
}

const bookedDays = [3, 7, 10, 14, 16, 21, 24, 28];

export default function SchedulingPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [booking, setBooking] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const cells = buildCalendar(year, month);

  const prevMonth = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

  const handleBook = async () => {
    if (!selectedDay || !selectedSlot || !name || !email) return;
    setBooking(true);
    await sleep(1800);
    setBooking(false);
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="max-w-lg mx-auto mt-20 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
          <div className="relative flex h-24 w-24 mx-auto mb-6 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)' }}>
              <CheckCircle size={36} className="text-emerald-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
          <p className="text-white/45 mb-6">Your discovery call has been scheduled for</p>
          <div className="p-4 rounded-2xl mb-6" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-white/60"><Calendar size={15} className="text-indigo-400" />{monthNames[month]} {selectedDay}, {year}</div>
              <div className="flex items-center gap-2 text-white/60"><Clock size={15} className="text-indigo-400" />{selectedSlot}</div>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-white/35"><Video size={12} /> Zoom link sent to {email}</div>
          </div>
          <Button onClick={() => { setConfirmed(false); setSelectedDay(null); setSelectedSlot(null); setName(''); setEmail(''); }}>
            Schedule Another
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h2 className="text-xl font-semibold text-white">Scheduling</h2>
        <p className="text-sm text-white/35 mt-0.5">Book discovery calls and client meetings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Calendar */}
        <div className="p-5 rounded-2xl space-y-4" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">{monthNames[month]} {year}</h3>
            <div className="flex gap-1">
              <button onClick={prevMonth} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/8 text-white/40 hover:text-white/80 transition-all cursor-pointer"><ChevronLeft size={14} /></button>
              <button onClick={nextMonth} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/8 text-white/40 hover:text-white/80 transition-all cursor-pointer"><ChevronRight size={14} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {daysOfWeek.map((d) => (
              <div key={d} className="text-center text-[10px] font-medium text-white/25 py-1.5 uppercase tracking-wider">{d}</div>
            ))}
            {cells.map((day, i) => {
              const isBooked = day && bookedDays.includes(day);
              const isSelected = day === selectedDay;
              const isPast = day && new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
              return (
                <button key={i} disabled={!day || !!isPast || !!isBooked}
                  onClick={() => day && setSelectedDay(day)}
                  className={`relative aspect-square flex items-center justify-center rounded-xl text-xs font-medium transition-all cursor-pointer
                    ${!day ? 'invisible' : ''}
                    ${isPast ? 'text-white/15 cursor-not-allowed' : ''}
                    ${isBooked ? 'text-white/20 cursor-not-allowed' : ''}
                    ${isSelected ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : (!isPast && !isBooked && day) ? 'hover:bg-white/8 text-white/70' : ''}
                  `}>
                  {day}
                  {isBooked && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-indigo-400/40" />}
                </button>
              );
            })}
          </div>
          {selectedDay && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-indigo-400 text-center">
              {monthNames[month]} {selectedDay} — Select a time slot →
            </motion.p>
          )}
        </div>

        {/* Time + Form */}
        <div className="space-y-4">
          {selectedDay ? (
            <>
              <div className="p-5 rounded-2xl" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Available Times</p>
                <div className="grid grid-cols-3 gap-2">
                  {mockTimeSlots.map((slot) => (
                    <button key={slot} onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-2 rounded-xl text-xs font-medium transition-all cursor-pointer
                        ${selectedSlot === slot ? 'bg-indigo-500 text-white' : 'bg-white/4 text-white/55 hover:bg-white/10 hover:text-white/90'}`}>
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              {selectedSlot && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl space-y-3" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Your Details</p>
                  {[{ label: 'Full Name', val: name, set: setName, ph: 'Jennifer Walsh', icon: User },
                    { label: 'Email', val: email, set: setEmail, ph: 'jwalsh@company.com', icon: Video }].map((f) => (
                    <div key={f.label}>
                      <label className="text-[10px] text-white/30 mb-1.5 block uppercase tracking-wider">{f.label}</label>
                      <input value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.ph}
                        className="w-full bg-white/4 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-indigo-500/50 transition-all" />
                    </div>
                  ))}
                  <Button className="w-full justify-center" loading={booking} onClick={handleBook}
                    disabled={!name || !email}>
                    <Calendar size={14} /> Confirm Booking
                  </Button>
                </motion.div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 rounded-2xl text-center" style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Calendar size={32} className="text-white/15 mb-3" />
              <p className="text-sm text-white/30">Select a date to see available slots</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
