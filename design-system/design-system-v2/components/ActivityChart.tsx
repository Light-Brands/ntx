
import React from 'react';

export const ActivityChart: React.FC = () => {
  const data = [40, 70, 45, 90, 65, 85, 60];
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="w-full p-8 bg-abyss-mystic border border-abyss-light rounded-3xl shadow-2xl">
      <div className="flex justify-between items-center mb-10">
        <div className="space-y-1">
          <h4 className="text-[10px] font-black text-teal-light uppercase tracking-[0.3em]">Deep Resonance Trends</h4>
          <p className="text-xs text-muted font-bold">Weekly Energy Observation</p>
        </div>
        <div className="text-3xl font-black text-gold-accent tracking-tighter shadow-gold-accent/10 shadow-sm">90% Peak</div>
      </div>
      <div className="flex items-end justify-between h-40 gap-4 px-2">
        {data.map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
            <div 
              className="w-full abyss-gradient-primary rounded-t-xl transition-all duration-1000 ease-out mira-glow relative overflow-hidden"
              style={{ height: `${val}%` }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-[9px] font-black text-teal-light uppercase tracking-widest">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
