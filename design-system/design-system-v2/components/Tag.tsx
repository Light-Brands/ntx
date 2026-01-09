
import React from 'react';

interface TagProps {
  label: string;
  onClick?: () => void;
  variant?: 'outline' | 'filled';
}

export const Tag: React.FC<TagProps> = ({ label, onClick, variant = 'outline' }) => {
  const styles = {
    outline: "border border-abyss-light text-muted hover:border-aqua-light hover:text-aqua-light",
    filled: "bg-abyss-light text-moonlight hover:bg-teal-light shadow-lg"
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${styles[variant]}`}
    >
      {label.startsWith('#') ? label : `#${label}`}
    </button>
  );
};
