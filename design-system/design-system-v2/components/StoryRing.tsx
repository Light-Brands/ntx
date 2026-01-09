
import React from 'react';
import { Avatar } from './Avatar';

interface StoryRingProps {
  src: string;
  name: string;
  hasUnseen?: boolean;
}

export const StoryRing: React.FC<StoryRingProps> = ({ src, name, hasUnseen = true }) => {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer group">
      <div className={`p-0.5 rounded-full transition-all duration-500 group-active:scale-95 ${hasUnseen ? 'abyss-gradient-primary mira-glow' : 'bg-abyss-light'}`}>
        <div className="p-1 bg-abyss-base rounded-full">
          <Avatar src={src} size="lg" className="border-0" />
        </div>
      </div>
      <span className="text-[10px] font-bold text-muted uppercase tracking-widest truncate w-20 text-center group-hover:text-aqua-light transition-colors">{name}</span>
    </div>
  );
};
