
import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circle' | 'rect';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rect' }) => {
  const baseClass = "animate-pulse bg-abyss-light/50 border border-teal-light/20";
  const variantClass = {
    text: "h-4 w-3/4 rounded-md",
    circle: "rounded-full",
    rect: "rounded-vibe-card"
  };

  return <div className={`${baseClass} ${variantClass[variant]} ${className}`} />;
};
