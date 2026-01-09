
import React, { useState, useRef, useEffect } from 'react';

interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'danger';
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect: (id: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ trigger, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-abyss-mystic border border-abyss-light rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelect(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-5 py-3 text-xs font-black uppercase tracking-widest transition-colors text-left
                  ${item.variant === 'danger' ? 'text-red-400 hover:bg-red-500/10' : 'text-muted hover:bg-abyss-light hover:text-moonlight'}
                `}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
