
import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-abyss-light last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left font-black text-sm uppercase tracking-tight hover:text-aqua-light transition-colors group"
      >
        <span className="group-hover:translate-x-1 transition-transform">{title}</span>
        <svg
          className={`w-4 h-4 text-teal-light transition-transform duration-300 ${isOpen ? 'rotate-180 text-aqua-light' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="text-sm text-muted leading-relaxed font-medium pl-2 border-l-2 border-aqua-light/20">
          {children}
        </div>
      </div>
    </div>
  );
};
