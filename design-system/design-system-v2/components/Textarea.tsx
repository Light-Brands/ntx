
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-[10px] font-black text-aqua-light uppercase tracking-[0.2em] mb-2">{label}</label>}
      <textarea
        className={`
          block w-full bg-abyss-base border border-abyss-light rounded-2xl text-pearl placeholder-muted/30
          focus:outline-none focus:ring-2 focus:ring-aqua-light/20 focus:border-aqua-light transition-all duration-300
          p-4 text-sm min-h-[120px] resize-none
          ${error ? 'border-red-500 focus:ring-red-500/10' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};
