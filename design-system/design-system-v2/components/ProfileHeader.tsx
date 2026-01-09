
import React from 'react';
import { User } from '../types';
import { Avatar } from './Avatar';
import { Button } from './Button';

interface ProfileHeaderProps {
  user: User;
  isFollowing?: boolean;
  onFollowToggle?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isFollowing, onFollowToggle }) => {
  return (
    <div className="space-y-8">
      <div className="relative h-72 abyss-gradient-depth rounded-3xl overflow-hidden border border-abyss-light">
         <div className="absolute inset-0 bg-gradient-to-t from-abyss-base via-transparent to-transparent z-10 opacity-80"></div>
         <img src="https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-30 hover:scale-105 transition-transform duration-[5000ms]" />
      </div>
      
      <div className="px-8 -mt-24 flex justify-between items-end relative z-20">
        <div className="p-1.5 bg-abyss-base rounded-full shadow-2xl border border-abyss-light">
          <Avatar 
            src={user.avatarUrl} 
            alt={user.name} 
            size="xl" 
            className="border-4 border-abyss-base"
          />
        </div>
        <div className="flex gap-4 mb-4">
          <Button variant="ghost" size="md">Message</Button>
          <Button 
            variant={isFollowing ? 'ghost' : 'primary'} 
            onClick={onFollowToggle}
          >
            {isFollowing ? 'Following' : 'Connect'}
          </Button>
        </div>
      </div>

      <div className="px-8 space-y-3">
        <h1 className="text-4xl font-black text-moonlight tracking-tight uppercase">{user.name}</h1>
        <div className="flex items-center gap-2">
          <p className="text-aqua-light font-black uppercase tracking-[0.2em] text-xs">@{user.username}</p>
          <div className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
          <p className="text-xs font-bold text-muted uppercase tracking-widest">Resonating</p>
        </div>
      </div>

      <div className="px-8 text-lg leading-relaxed text-pearl/80 max-w-2xl font-medium">
        {user.bio || "Navigating the mystic currents of the digital abyss."}
      </div>

      <div className="px-8 flex gap-12 border-t border-abyss-light pt-8">
        <div className="flex flex-col">
          <span className="font-black text-2xl text-aqua-light">{user.followingCount}</span>
          <span className="text-[10px] font-black text-teal-light uppercase tracking-[0.3em]">Following</span>
        </div>
        <div className="flex flex-col">
          <span className="font-black text-2xl text-gold-accent">{user.followersCount.toLocaleString()}</span>
          <span className="text-[10px] font-black text-teal-light uppercase tracking-[0.3em]">Resonators</span>
        </div>
      </div>
    </div>
  );
};
