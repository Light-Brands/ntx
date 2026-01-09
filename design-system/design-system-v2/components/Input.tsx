
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-bold text-aqua-light uppercase tracking-wider mb-2">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted opacity-50">
            {icon}
          </div>
        )}
        <input
          className={`
            block w-full bg-abyss-base border border-abyss-light rounded-vibe-btn text-pearl placeholder-text-muted/50
            focus:outline-none focus:ring-2 focus:ring-aqua-light/20 focus:border-aqua-light transition-all duration-300
            ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3.5 sm:text-sm
            ${error ? 'border-red-500 focus:ring-red-500/10' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};
