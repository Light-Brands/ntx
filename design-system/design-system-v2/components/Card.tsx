
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  elevation?: 'subtle' | 'deep' | 'none';
  // Add optional onClick property to support interactive cards
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  noPadding = false,
  elevation = 'subtle',
  // Destructure onClick from props
  onClick
}) => {
  const shadows = {
    subtle: 'border-abyss-light bg-abyss-depths',
    deep: 'border-teal-light bg-abyss-mystic shadow-2xl shadow-black/40',
    none: 'bg-transparent border-transparent'
  };

  return (
    <div 
      className={`border rounded-vibe-card overflow-hidden ${shadows[elevation]} ${!noPadding ? 'p-6' : ''} ${className}`}
      // Apply the onClick handler to the container element to fix the error in PracticeComponents.tsx
      onClick={onClick}
    >
      {children}
    </div>
  );
};
