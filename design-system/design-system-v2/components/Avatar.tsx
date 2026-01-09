
import React from 'react';
import { ComponentSize } from '../types';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: ComponentSize;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt = "User", size = 'md', className = '' }) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  return (
    <div className={`relative inline-block ${sizeMap[size]} rounded-full overflow-hidden bg-abyss-mystic border border-abyss-light ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-teal-light font-black uppercase text-xs">
          {alt.charAt(0)}
        </div>
      )}
    </div>
  );
};
