
import React from 'react';

interface MediaGalleryProps {
  images: string[];
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ images }) => {
  const count = images.length;
  
  if (count === 0) return null;

  return (
    <div className={`grid gap-3 rounded-2xl overflow-hidden border border-abyss-light bg-abyss-depths ${
      count === 1 ? 'grid-cols-1' : 'grid-cols-2'
    }`}>
      {images.slice(0, 4).map((src, i) => (
        <div key={i} className={`relative aspect-square overflow-hidden bg-abyss-base ${
          count === 3 && i === 0 ? 'row-span-2' : ''
        }`}>
          <img 
            src={src} 
            alt={`Media ${i + 1}`} 
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-[1500ms] ease-out" 
          />
          <div className="absolute inset-0 bg-aqua-light/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
      ))}
    </div>
  );
};
