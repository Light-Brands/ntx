
import React from 'react';

interface LikeButtonProps {
  count: number;
  isLiked?: boolean;
  onClick?: () => void;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ count, isLiked = false, onClick }) => {
  return (
    <div 
      className={`flex items-center group cursor-pointer transition-all duration-300 ${isLiked ? 'text-gold-accent' : 'hover:text-gold-accent text-muted'}`} 
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <div className={`p-2.5 rounded-full transition-colors ${isLiked ? 'bg-gold-accent/10' : 'group-hover:bg-gold-accent/10'}`}>
        <svg 
          className={`w-5 h-5 transition-transform group-active:scale-150 ${isLiked ? 'fill-gold-accent stroke-gold-accent' : 'fill-none stroke-current'}`} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </div>
      <span className="text-xs ml-1 font-black uppercase tracking-tighter">{count}</span>
    </div>
  );
};
