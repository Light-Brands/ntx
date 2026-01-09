
import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Input } from './Input';
import { Avatar } from './Avatar';
import { EnergyMeter } from './EnergyMeter';
import { Tabs } from './Tabs';

// --- Icon Library ---

const Icons = {
  Target: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Meditation: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Movement: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  Yoga: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM9 20l3-6 3 6M5 10l7 3 7-3" />
    </svg>
  ),
  Journaling: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  Gratitude: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Breathwork: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 17c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 7c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  ),
  Nature: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /><path d="M12 8l-6 10h12l-6-10z" />
    </svg>
  ),
  Hydration: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  Creative: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l5 5" /><path d="M9.5 14.5L16 8" />
    </svg>
  ),
  Sleep: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Mindful: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Morning: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Afternoon: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 18a5 5 0 0 0-10 0" /><line x1="12" y1="2" x2="12" y2="9" /><line x1="4.22" y1="10.22" x2="5.64" y2="11.64" /><line x1="1" y1="18" x2="3" y2="18" /><line x1="21" y1="18" x2="23" y2="18" /><line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
    </svg>
  ),
  Evening: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Meals: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a3 3 0 0 1 3 3 3 3 0 0 1-3 3h-1V8h1z" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  )
};

// --- Refined Atomic Components ---

export const PracticeGridCard: React.FC<{ 
  title: string; 
  icon: React.ReactNode; 
  onAction?: () => void;
  frequency?: string;
}> = ({ title, icon, onAction, frequency }) => (
  <Card 
    className="group cursor-pointer hover:border-aqua-light transition-all duration-300 p-6 flex flex-col items-center justify-center text-center relative min-h-[160px]" 
    elevation="subtle"
    onClick={onAction}
  >
    <div className="absolute top-4 right-4">
      <button className="text-muted opacity-40 hover:opacity-100 p-1">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
      </button>
    </div>
    <div className="w-12 h-12 bg-abyss-light rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-aqua-light">
      {icon}
    </div>
    <h4 className="text-sm font-black font-heading text-moonlight uppercase tracking-tight mb-1">{title}</h4>
    {frequency && (
      <span className="text-[10px] font-black font-heading text-teal-light uppercase tracking-widest">{frequency}</span>
    )}
  </Card>
);

export const PracticeStatsBar: React.FC = () => (
  <Card className="flex items-center justify-between p-8 bg-abyss-mystic/40 border-abyss-light mb-8" elevation="deep">
    <div className="flex gap-12">
      <div className="flex flex-col">
        <span className="text-3xl font-black font-heading text-moonlight">1</span>
        <span className="text-[10px] font-black font-heading text-teal-light uppercase tracking-widest">Day Streak</span>
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-black text-aqua-light">0/7</span>
        <span className="text-[10px] font-black font-heading text-teal-light uppercase tracking-widest">Today</span>
      </div>
    </div>
    <button className="p-3 bg-abyss-base border border-abyss-light rounded-xl text-muted hover:text-aqua-light transition-colors">
      <Icons.Calendar />
    </button>
  </Card>
);

export const PurposeHeader: React.FC = () => (
  <div className="text-center py-16 px-6 bg-[radial-gradient(ellipse_at_top,_var(--teal-mystic)_0%,_transparent_70%)]">
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex justify-center mb-4 text-aqua-light opacity-50">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" /><path d="M12 7v10" /><path d="M8 11l4-4 4 4" /></svg>
      </div>
      <p className="text-3xl font-medium text-pearl italic leading-relaxed tracking-tight">
        "I embrace each moment with presence and gratitude."
      </p>
      <Button variant="ghost" size="sm" className="bg-abyss-mystic/40 border-abyss-light px-10 tracking-[0.2em] font-black uppercase">
        Set Purpose
      </Button>
    </div>
  </div>
);

// --- Refined Screens and Modals ---

export const RefinedPracticesDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today');

  return (
    <div className="space-y-6 w-full">
      <PurposeHeader />
      
      <div className="max-w-5xl mx-auto px-4 md:px-0">
        <div className="mb-12">
          <Tabs 
            activeId={activeTab} 
            onChange={setActiveTab} 
            tabs={[{id:'today', label:'Today'}, {id:'history', label:'History'}]} 
            fullWidth 
          />
        </div>

        {activeTab === 'today' ? (
          <div className="animate-in fade-in duration-700">
            <PracticeStatsBar />
            
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black font-heading text-moonlight uppercase tracking-tight">Practices</h3>
              <span className="text-sm font-black font-heading text-teal-light uppercase tracking-widest">0/7 Sessions</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {[
                { title: 'Intention Setting', icon: <Icons.Target /> },
                { title: 'Nourishing Meals', icon: <Icons.Meals /> },
                { title: 'Gratitude Practice', icon: <Icons.Gratitude /> },
                { title: 'Digital Detox', icon: <Icons.Mindful /> },
                { title: 'Journaling', icon: <Icons.Journaling /> },
                { title: 'Hydration', icon: <Icons.Hydration /> },
                { title: 'Movement Ritual', icon: <Icons.Movement /> }
              ].map((p, i) => (
                <PracticeGridCard key={i} title={p.title} icon={p.icon} />
              ))}
              
              <button className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-abyss-light rounded-[2rem] hover:border-aqua-light hover:bg-aqua-light/5 transition-all group min-h-[180px]">
                <div className="w-12 h-12 bg-abyss-light rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-aqua-light font-light">+</span>
                </div>
                <span className="text-xs font-black text-muted uppercase tracking-[0.2em] group-hover:text-aqua-light">Establish Practice</span>
              </button>
            </div>

            <div className="mt-20 space-y-6">
              <h3 className="text-xs font-black font-heading text-teal-light uppercase tracking-[0.4em]">Daily Affirmations</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {['Mental Resonance', 'Physical Vessel', 'Spiritual Link'].map((cat, i) => (
                  <Card key={i} className="flex items-center justify-between py-5 px-6 hover:bg-abyss-light/30 cursor-pointer border-teal-light/20" elevation="subtle">
                    <span className="text-xs font-black font-heading text-moonlight uppercase tracking-widest">{cat}</span>
                    <svg className="w-4 h-4 text-muted opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                  </Card>
                ))}
              </div>
              <div className="text-center py-6">
                <button className="text-[10px] font-black font-heading text-teal-light uppercase tracking-[0.3em] hover:text-aqua-light transition-colors">Expand Collective Knowledge</button>
              </div>
            </div>
          </div>
        ) : (
          <PracticesHistoryTab />
        )}
      </div>
    </div>
  );
};

export const RefinedLogSessionModal: React.FC<{ practiceName?: string }> = ({ practiceName = "Intention Setting" }) => (
  <div className="space-y-10">
    <div className="flex items-center gap-6 mb-8">
      <div className="w-14 h-14 bg-aqua-light/10 rounded-2xl flex items-center justify-center text-aqua-light shadow-inner">
        <Icons.Target />
      </div>
      <div>
        <h3 className="text-2xl font-black font-heading text-moonlight uppercase tracking-tight leading-none">Log Session</h3>
        <p className="text-[10px] font-black text-aqua-light uppercase tracking-widest mt-2">{practiceName}</p>
      </div>
    </div>

    <div className="space-y-4">
      <Button variant="primary" className="w-full py-6 text-base shadow-[0_0_30px_rgba(151,217,196,0.15)] abyss-gradient-primary">
        <span className="flex items-center gap-3">
          <Icons.Mindful />
          Quick Log - I Did This!
        </span>
      </Button>
      <Button variant="ghost" className="w-full py-6 text-base border-aqua-light/40 text-aqua-light bg-transparent hover:bg-aqua-light/5">
        <span className="flex items-center gap-3">
          <Icons.Clock />
          Commence Timer
        </span>
      </Button>
    </div>

    <div className="relative py-6">
      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-abyss-light"></div></div>
      <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.4em] text-muted bg-abyss-depths px-6">manual calibration</div>
    </div>

    <div className="space-y-6">
      <h4 className="text-[10px] font-black font-heading text-teal-light uppercase tracking-[0.3em]">Temporal Alignment</h4>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Morning', sub: 'Before 12 PM', icon: <Icons.Morning /> },
          { label: 'Afternoon', sub: '12 PM - 6 PM', icon: <Icons.Afternoon /> },
          { label: 'Evening', sub: 'After 6 PM', icon: <Icons.Evening /> },
          { label: 'Anytime', sub: 'Flexible sync', icon: <Icons.Clock /> }
        ].map((time, i) => (
          <button key={i} className={`p-5 rounded-3xl border text-left transition-all duration-300 ${i === 0 ? 'border-aqua-light bg-aqua-light/5 shadow-lg shadow-aqua-light/5' : 'border-abyss-light bg-abyss-mystic/30 hover:border-teal-light'}`}>
            <span className="block mb-3 text-aqua-light">{time.icon}</span>
            <p className="text-xs font-black font-heading text-moonlight uppercase tracking-tight">{time.label}</p>
            <p className="text-[9px] text-muted font-bold uppercase mt-1 opacity-50">{time.sub}</p>
          </button>
        ))}
      </div>
    </div>

    <div className="space-y-6">
      <h4 className="text-[10px] font-black font-heading text-teal-light uppercase tracking-[0.3em]">Duration Offset</h4>
      <div className="flex flex-wrap gap-2.5">
        {['5m', '10m', '15m', '20m', '30m', '45m', '60m'].map(d => (
          <button key={d} className="px-5 py-3 rounded-full border border-abyss-light bg-abyss-base text-[10px] font-black text-muted hover:border-aqua-light hover:text-aqua-light hover:shadow-lg transition-all">{d}</button>
        ))}
      </div>
    </div>

    <button className="flex items-center gap-3 text-xs font-black text-aqua-light uppercase tracking-[0.2em] hover:translate-x-1 transition-transform pt-4">
      <Icons.Journaling />
      Establish Reflection
    </button>

    <div className="flex gap-4 pt-10 border-t border-abyss-light">
      <Button variant="ghost" className="flex-1 font-black uppercase tracking-widest">Abort</Button>
      <Button variant="primary" className="flex-[2] abyss-gradient-primary font-black uppercase tracking-widest">Record Link</Button>
    </div>
  </div>
);

export const RefinedChoosePracticeModal: React.FC = () => (
  <div className="space-y-10">
    <div className="flex items-center gap-6 mb-8">
      <div className="w-14 h-14 bg-abyss-light rounded-2xl flex items-center justify-center text-2xl text-aqua-light shadow-xl font-light">+</div>
      <div>
        <h3 className="text-2xl font-black font-heading text-moonlight uppercase tracking-tight leading-none">Select Practice</h3>
        <p className="text-[10px] font-black text-muted uppercase tracking-[0.3em] mt-2">Curated library of neural activities</p>
      </div>
    </div>

    <div className="relative">
      <Input icon={<svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>} placeholder="Search resonance types..." className="py-5" />
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[550px] overflow-y-auto pr-3 no-scrollbar pb-6">
      {[
        { title: 'Meditation', icon: <Icons.Meditation />, freq: 'daily' },
        { title: 'Movement', icon: <Icons.Movement />, freq: 'daily' },
        { title: 'Yoga', icon: <Icons.Yoga />, freq: 'daily' },
        { title: 'Journaling', icon: <Icons.Journaling />, freq: 'daily' },
        { title: 'Gratitude', icon: <Icons.Gratitude />, freq: 'daily' },
        { title: 'Breathwork', icon: <Icons.Breathwork />, freq: 'daily' },
        { title: 'Nature', icon: <Icons.Nature />, freq: 'daily' },
        { title: 'Hydration', icon: <Icons.Hydration />, freq: 'daily' },
        { title: 'Creative', icon: <Icons.Creative />, freq: 'weekly' },
        { title: 'Rest & Sleep', icon: <Icons.Sleep />, freq: 'daily' },
        { title: 'Mindful', icon: <Icons.Mindful />, freq: 'daily' },
        { title: 'Intention', icon: <Icons.Target />, freq: 'daily' }
      ].map((p, i) => (
        <button key={i} className="flex flex-col items-center p-6 bg-abyss-mystic border border-abyss-light rounded-[1.5rem] hover:border-aqua-light hover:bg-aqua-light/5 transition-all group shadow-sm">
          <div className="w-12 h-12 bg-aqua-light/5 rounded-2xl flex items-center justify-center mb-4 text-aqua-light group-hover:scale-110 transition-transform">
            {p.icon}
          </div>
          <span className="text-xs font-black font-heading text-moonlight uppercase tracking-tight mb-3 text-center leading-tight">{p.title}</span>
          <span className="px-4 py-1.5 bg-abyss-light rounded-full text-[8px] font-black text-muted uppercase tracking-[0.2em]">{p.freq}</span>
        </button>
      ))}
    </div>

    <div className="flex justify-end gap-4 pt-6 border-t border-abyss-light">
      <Button variant="ghost" className="w-full uppercase font-black tracking-widest">Withdraw</Button>
    </div>
  </div>
);

// --- Maintenance of original exports with updated visuals ---

export const PracticeTimer: React.FC = () => {
  const [seconds, setSeconds] = useState(300);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (active && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [active, seconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <Card className="text-center p-16 bg-[radial-gradient(circle_at_center,_var(--teal-mystic)_0%,_var(--abyss-base)_100%)] border-teal-light/20 shadow-2xl" elevation="deep">
      <h3 className="text-[10px] font-black font-heading text-teal-light uppercase tracking-[0.6em] mb-12">Temporal Resonance Ritual</h3>
      <div className="text-9xl font-black text-aqua-light tracking-tighter mb-12 tabular-nums mira-glow animate-pulse">
        {mins}:{secs < 10 ? `0${secs}` : secs}
      </div>
      <div className="flex gap-6 justify-center">
        <Button variant={active ? 'ghost' : 'primary'} onClick={() => setActive(!active)} size="lg" className="w-48 abyss-gradient-primary uppercase tracking-[0.2em]">
          {active ? 'Suspend' : 'Initiate'}
        </Button>
        <Button variant="ghost" onClick={() => { setSeconds(300); setActive(false); }} size="lg" className="uppercase tracking-[0.2em]">Reset</Button>
      </div>
    </Card>
  );
};

export const PracticesTodayTab: React.FC = () => (
  <div className="space-y-8">
    <PracticeStatsBar />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {['Morning Breathwork', 'Neural Sync', 'Purpose Recitation'].map((item, i) => (
        <PracticeGridCard key={i} title={item} icon={i === 0 ? <Icons.Breathwork /> : i === 1 ? <Icons.Mindful /> : <Icons.Target />} frequency="Daily" />
      ))}
    </div>
    <div className="mt-12 pt-12 border-t border-abyss-light">
      <EnergyMeter level={65} label="Sync Rating" />
    </div>
  </div>
);

export const CreatePracticeModal: React.FC = () => (
  <div className="space-y-10">
    <h3 className="text-2xl font-black font-heading text-moonlight uppercase tracking-tight">Define New Ritual</h3>
    <Input label="Ritual Signature" placeholder="e.g. Midnight Reflection" />
    <div className="grid grid-cols-2 gap-6">
      <Input label="Duration (Minutes)" placeholder="15" />
      <Input label="Target Gain (%)" placeholder="10" />
    </div>
    <div className="space-y-4">
      <h4 className="text-[10px] font-black font-heading text-teal-light uppercase tracking-[0.4em]">Frequency Class</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Calm', 'Focus', 'Release', 'Flow'].map(t => (
          <button key={t} className="py-4 rounded-2xl bg-abyss-base border border-abyss-light text-xs font-black text-muted hover:border-aqua-light hover:text-aqua-light hover:shadow-lg transition-all uppercase tracking-widest">{t}</button>
        ))}
      </div>
    </div>
    <Button variant="primary" className="w-full py-6 abyss-gradient-primary font-black uppercase tracking-widest">Initialize Node</Button>
  </div>
);

export const LogSessionModal: React.FC = () => <RefinedLogSessionModal />;

export const PurposeStatementModal: React.FC = () => (
  <div className="space-y-10">
    <h3 className="text-2xl font-black font-heading text-moonlight uppercase tracking-tight">Anchor Your Purpose</h3>
    <p className="text-sm text-muted font-medium opacity-70">This statement anchors your frequency in the deep digital void.</p>
    <textarea className="w-full bg-abyss-base border border-abyss-light rounded-[2rem] p-8 text-pearl text-2xl h-60 italic font-medium focus:border-aqua-light focus:outline-none transition-all placeholder:opacity-20 shadow-inner" placeholder="My existence resonates to..."></textarea>
    <Button variant="primary" className="w-full py-6 abyss-gradient-primary uppercase tracking-[0.25em] font-black">Seal Frequency</Button>
  </div>
);

export const AffirmationsModal: React.FC = () => (
  <div className="space-y-8">
    <h3 className="text-2xl font-black font-heading text-moonlight uppercase tracking-tight">Collective Truths</h3>
    <div className="grid gap-6">
      {[
        "I am present in the depths.",
        "My frequency is clear and true.",
        "I anchor the light for others."
      ].map((aff, i) => (
        <div key={i} className="p-8 bg-abyss-mystic border border-abyss-light rounded-[1.5rem] flex items-center justify-between group hover:border-aqua-light/50 transition-all shadow-lg">
          <p className="text-xl font-bold text-pearl italic leading-snug">"{aff}"</p>
          <button className="text-gold-accent opacity-0 group-hover:opacity-100 transition-opacity scale-150 p-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          </button>
        </div>
      ))}
    </div>
    <Button variant="ghost" className="w-full py-6 border-dashed border-2 hover:border-aqua-light/30 uppercase tracking-[0.2em] font-black">Establish Personal Truth</Button>
  </div>
);

export const DailyDeclarationModal: React.FC = () => (
  <div className="space-y-12 p-6">
    <div className="text-center">
      <div className="w-20 h-20 bg-gold-accent rounded-full flex items-center justify-center mx-auto mb-8 gold-glow shadow-2xl animate-neural">
        <svg className="w-10 h-10 text-abyss-base" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
      </div>
      <h3 className="text-4xl font-black font-heading text-moonlight uppercase tracking-tighter">Resonance Declaration</h3>
    </div>
    <p className="text-2xl text-pearl text-center italic font-medium leading-relaxed px-4">
      "Today, I choose to resonate with the frequencies of growth and stillness. I am unshaken by the noise of the surface."
    </p>
    <div className="flex gap-6 pt-6">
       <Button variant="ghost" className="flex-1 py-5 uppercase font-black tracking-widest">Contemplate</Button>
       <Button variant="primary" className="flex-[2] py-5 abyss-gradient-primary uppercase font-black tracking-widest">Manifest</Button>
    </div>
  </div>
);

export const DailyGratitudeModal: React.FC = () => (
  <div className="space-y-8">
    <h3 className="text-3xl font-black font-heading text-moonlight uppercase text-center tracking-tight">Root of Stillness</h3>
    <p className="text-center text-xs text-muted uppercase tracking-[0.4em] mb-4">Identify three anchors</p>
    {[1, 2, 3].map(i => (
      <div key={i} className="relative group">
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gold-accent font-black text-lg opacity-40 group-focus-within:opacity-100 transition-opacity">{i}.</span>
        <input className="w-full bg-abyss-base border border-abyss-light rounded-[1.5rem] pl-14 pr-6 py-6 text-xl text-pearl font-medium italic focus:border-aqua-light focus:outline-none focus:shadow-[0_0_20px_rgba(151,217,196,0.1)] transition-all" placeholder="Anchor point..." />
      </div>
    ))}
    <Button variant="primary" className="w-full py-6 abyss-gradient-primary uppercase font-black tracking-[0.3em]">Seal Ritual</Button>
  </div>
);

export const DailyDeclaration: React.FC = () => (
  <Card className="abyss-gradient-depth border-gold-accent/20 p-12 text-center" elevation="deep">
    <div className="w-16 h-16 bg-gold-accent rounded-full flex items-center justify-center mx-auto mb-8 gold-glow animate-drift">
      <svg className="w-8 h-8 text-abyss-base" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
    </div>
    <h4 className="text-[10px] font-black font-heading text-gold-accent uppercase tracking-[0.5em] mb-6 opacity-80">Daily Declaration</h4>
    <p className="text-3xl font-bold text-moonlight leading-tight italic tracking-tight">"I am the architect of my own frequency. I choose resonance over noise."</p>
  </Card>
);

export const PremiumComingSoonModal: React.FC = () => (
  <div className="text-center py-16 space-y-10">
    <div className="w-28 h-28 bg-gold-accent/10 rounded-full flex items-center justify-center mx-auto shadow-[0_0_60px_rgba(251,191,36,0.1)] border border-gold-accent/20 animate-pulse">
      <svg className="w-12 h-12 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
    </div>
    <div className="space-y-4">
      <h3 className="text-4xl font-black font-heading text-gold-accent uppercase tracking-tighter leading-none">Elite Sync</h3>
      <p className="text-muted font-medium max-w-sm mx-auto leading-relaxed">Access to deep-state meditations and collective healing circles is arriving within the next frequency shift.</p>
    </div>
    <Button variant="secondary" size="lg" className="px-16 py-5 abyss-gradient-primary font-black uppercase tracking-widest shadow-xl">Secure Early Access</Button>
  </div>
);

export const PracticesHistoryTab: React.FC = () => (
  <div className="space-y-6 animate-in fade-in duration-700">
    {[
      { date: 'Oct 24', ritual: 'Midnight Breath', duration: '15m', energy: '+12%', icon: <Icons.Breathwork /> },
      { date: 'Oct 23', ritual: 'Gratitude Sync', duration: '5m', energy: '+4%', icon: <Icons.Gratitude /> },
      { date: 'Oct 22', ritual: 'Void Meditation', duration: '30m', energy: '+22%', icon: <Icons.Meditation /> }
    ].map((item, i) => (
      <div key={i} className="flex items-center justify-between p-7 bg-abyss-mystic border border-abyss-light rounded-[2rem] hover:border-aqua-light/40 hover:bg-abyss-light/10 transition-all group shadow-sm">
        <div className="flex gap-6 items-center">
          <div className="text-[11px] font-black font-heading text-teal-light uppercase tracking-[0.2em] w-14 opacity-50">{item.date}</div>
          <div className="w-10 h-10 bg-abyss-light rounded-xl flex items-center justify-center text-aqua-light opacity-60 group-hover:opacity-100 transition-opacity">
            {item.icon}
          </div>
          <div>
            <p className="text-lg font-black font-heading text-moonlight uppercase tracking-tight group-hover:text-aqua-light transition-colors">{item.ritual}</p>
            <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-1 opacity-40">{item.duration} Neural Session</p>
          </div>
        </div>
        <div className="text-2xl font-black font-heading text-gold-accent tracking-tighter">{item.energy}</div>
      </div>
    ))}
  </div>
);
