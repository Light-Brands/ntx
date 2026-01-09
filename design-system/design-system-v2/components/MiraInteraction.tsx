
import React from 'react';

interface MiraInteractionProps {
  message: string;
  isProcessing?: boolean;
}

export const MiraInteraction: React.FC<MiraInteractionProps> = ({ message, isProcessing }) => {
  return (
    <div className={`p-8 rounded-vibe-card bg-abyss-mystic border border-teal-light text-moonlight mira-glow transition-all duration-500 ${isProcessing ? 'animate-pulse' : ''}`}>
      <div className="flex items-start gap-5">
        <div className="w-12 h-12 rounded-2xl abyss-gradient-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-aqua-light/10">
          <svg className="w-6 h-6 text-abyss-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h4 className="text-[10px] font-black text-aqua-light tracking-[0.2em] uppercase">Mira Intelligence</h4>
            <div className="w-1.5 h-1.5 rounded-full bg-gold-accent animate-ping" />
          </div>
          <p className="text-base leading-relaxed text-pearl font-medium">
            {message}
          </p>
          {isProcessing && (
            <div className="flex gap-2 pt-2">
              <div className="w-1.5 h-1.5 bg-aqua-light rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-aqua-light rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-aqua-light rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
