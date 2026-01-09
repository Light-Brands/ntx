
import React from 'react';
import { Card } from './Card';

interface MediaEmbedProps {
  type: 'image' | 'video' | 'audio';
  src: string;
  caption?: string;
}

export const MediaEmbed: React.FC<MediaEmbedProps> = ({ type, src, caption }) => {
  return (
    <Card className="p-0 overflow-hidden border-abyss-light bg-abyss-base group" elevation="deep">
      <div className="relative aspect-video">
        {type === 'image' && (
          <img src={src} alt={caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        )}
        {type === 'video' && (
          <video src={src} controls className="w-full h-full object-cover" />
        )}
        {type === 'audio' && (
          <div className="w-full h-full flex items-center justify-center bg-abyss-depths p-8">
            <div className="w-full h-2 bg-abyss-light rounded-full relative">
              <div className="absolute inset-y-0 left-0 w-1/3 bg-aqua-light rounded-full mira-glow" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <p className="text-[10px] font-black text-white uppercase tracking-widest">{type} resource</p>
        </div>
      </div>
      {caption && (
        <div className="p-4 border-t border-abyss-light">
          <p className="text-xs text-muted font-medium italic">"{caption}"</p>
        </div>
      )}
    </Card>
  );
};
