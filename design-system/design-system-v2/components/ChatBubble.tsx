
import React from 'react';

interface ChatBubbleProps {
  message: string;
  isMe?: boolean;
  timestamp: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isMe, timestamp }) => {
  return (
    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} mb-4 max-w-[85%]`}>
      <div className={`
        px-5 py-3.5 rounded-2xl text-sm leading-relaxed font-medium
        ${isMe 
          ? 'abyss-gradient-primary text-abyss-base rounded-br-none shadow-lg' 
          : 'bg-abyss-light text-moonlight border border-teal-light rounded-bl-none'}
      `}>
        {message}
      </div>
      <span className="text-[9px] text-muted font-black uppercase tracking-widest mt-2 px-1 opacity-60">
        {timestamp}
      </span>
    </div>
  );
};
