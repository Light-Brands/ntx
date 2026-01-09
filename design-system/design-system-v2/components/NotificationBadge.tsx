
import React from 'react';

interface NotificationBadgeProps {
  count?: number;
  className?: string;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count, className = '' }) => {
  if (count === 0) return null;
  
  return (
    <div className={`flex items-center justify-center bg-white text-black text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full border border-black ${className}`}>
      {count && count > 99 ? '99+' : count}
    </div>
  );
};
