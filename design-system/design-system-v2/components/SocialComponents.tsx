
import React from 'react';
import { Card } from './Card';
import { Avatar } from './Avatar';
import { Button } from './Button';

export const NotificationsPanel: React.FC = () => (
  <Card className="w-96 max-h-[500px] overflow-y-auto p-0" elevation="deep">
    <div className="p-6 border-b border-abyss-light bg-abyss-mystic sticky top-0 z-10">
      <h3 className="text-sm font-black text-moonlight uppercase tracking-widest">Resonations</h3>
    </div>
    <div className="divide-y divide-abyss-light">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="p-6 hover:bg-abyss-light/30 transition-colors flex gap-4 cursor-pointer group">
          <Avatar size="sm" src={`https://i.pravatar.cc/150?u=${i}`} />
          <div>
            <p className="text-sm text-pearl">
              <span className="font-black text-aqua-light">Node {i}</span> resonated with your latest pulse.
            </p>
            <p className="text-[10px] text-muted font-bold mt-1 uppercase tracking-widest">4h ago</p>
          </div>
          {i === 1 && <div className="w-2 h-2 rounded-full bg-gold-accent ml-auto" />}
        </div>
      ))}
    </div>
  </Card>
);

export const DiscoveryFilterModal: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h4 className="text-[10px] font-black text-teal-light uppercase tracking-[0.3em] mb-4">Frequency Filter</h4>
      <div className="flex flex-wrap gap-2">
        {['High Resonance', 'Deep Calm', 'Neural Streams', 'Collective Pulse'].map(tag => (
          <button key={tag} className="px-4 py-2 rounded-full bg-abyss-base border border-abyss-light text-xs font-bold text-muted hover:border-aqua-light hover:text-aqua-light transition-all">
            {tag}
          </button>
        ))}
      </div>
    </div>
    <div>
      <h4 className="text-[10px] font-black text-teal-light uppercase tracking-[0.3em] mb-4">Depth Range</h4>
      <div className="h-1.5 w-full bg-abyss-light rounded-full relative">
        <div className="absolute left-1/4 right-1/4 h-full bg-aqua-light rounded-full" />
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-moonlight rounded-full border-2 border-aqua-light" />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-moonlight rounded-full border-2 border-aqua-light" />
      </div>
    </div>
    <Button variant="primary" className="w-full">Update Feed</Button>
  </div>
);

export const MapViewModal: React.FC = () => (
  <div className="space-y-6">
    <div className="aspect-video bg-abyss-base border border-abyss-light rounded-3xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-122.41,37.77,10/800x450?access_token=pk.xxx')] bg-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-12 h-12 abyss-gradient-primary rounded-full mira-glow animate-pulse flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full" />
        </div>
      </div>
    </div>
    <div className="flex justify-between items-center px-4">
      <p className="text-xs font-black text-teal-light uppercase tracking-widest">Active Resonance Radius: 5km</p>
      <Button variant="ghost" size="sm">Adjust Filter</Button>
    </div>
  </div>
);
