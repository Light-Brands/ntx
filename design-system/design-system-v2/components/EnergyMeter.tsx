
import React from 'react';

interface EnergyMeterProps {
  level: number; // 0 to 100
  label?: string;
}

export const EnergyMeter: React.FC<EnergyMeterProps> = ({ level, label = "Current Energy" }) => {
  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-bold text-aqua-light uppercase tracking-widest">{label}</span>
        <span className="text-2xl font-black text-moonlight tracking-tighter">{level}%</span>
      </div>
      <div className="h-2.5 w-full bg-abyss-base border border-abyss-light rounded-full overflow-hidden">
        <div 
          className="h-full abyss-gradient-primary transition-all duration-1000 ease-out mira-glow"
          style={{ width: `${level}%` }}
        />
      </div>
      <p className="text-[9px] text-muted uppercase tracking-[0.25em] text-right font-medium">Oceanic Resonance</p>
    </div>
  );
};
