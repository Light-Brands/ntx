
import React from 'react';

interface ToggleProps {
  enabled: boolean;
  onChange: (val: boolean) => void;
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ enabled, onChange, label }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div 
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-aqua-light focus:ring-offset-2 focus:ring-offset-abyss-base
          ${enabled ? 'bg-aqua-light' : 'bg-abyss-light'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-moonlight transition-transform duration-300 shadow-sm
            ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </div>
      {label && <span className="text-sm font-bold text-muted group-hover:text-aqua-light transition-colors uppercase tracking-wider">{label}</span>}
    </label>
  );
};
