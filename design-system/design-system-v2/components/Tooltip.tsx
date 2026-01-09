
import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-abyss-mystic border border-teal-light text-aqua-light text-[10px] font-black uppercase tracking-widest rounded-xl whitespace-nowrap z-50 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-teal-light" />
        </div>
      )}
    </div>
  );
};
