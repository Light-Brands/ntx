
import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
  fullWidth?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeId, onChange, fullWidth = false }) => {
  return (
    <div className={`flex border-b border-abyss-light ${fullWidth ? 'w-full' : ''}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            relative px-10 py-6 text-xs font-black uppercase tracking-[0.25em] transition-all
            ${activeId === tab.id ? 'text-aqua-light' : 'text-muted hover:text-moonlight'}
            ${fullWidth ? 'flex-1' : ''}
          `}
        >
          {tab.label}
          {activeId === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-1 abyss-gradient-primary rounded-t-full mx-8 mira-glow" />
          )}
        </button>
      ))}
    </div>
  );
};
