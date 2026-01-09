
import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Avatar } from './Avatar';
import { Tabs } from './Tabs';
import { PostFeedItem } from './PostFeedItem';
// Added missing Input import
import { Input } from './Input';

export const CommunityHeader: React.FC<{ name: string; memberCount: number }> = ({ name, memberCount }) => (
  <div className="space-y-8">
    <div className="h-60 abyss-gradient-depth rounded-[2.5rem] border border-abyss-light relative overflow-hidden group">
      <div className="absolute inset-0 bg-aqua-light/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-5xl font-black font-heading text-moonlight uppercase tracking-tighter opacity-20">{name}</h1>
      </div>
    </div>
    <div className="px-8 -mt-20 flex items-end justify-between relative z-10">
      <div className="flex items-end gap-6">
        <div className="w-32 h-32 bg-abyss-base rounded-[2rem] border-4 border-abyss-base shadow-2xl flex items-center justify-center text-5xl">
          🌌
        </div>
        <div className="pb-4">
          <h2 className="text-4xl font-black font-heading text-moonlight uppercase tracking-tight">{name}</h2>
          <p className="text-xs font-bold text-aqua-light uppercase tracking-widest">{memberCount.toLocaleString()} Resonance Nodes</p>
        </div>
      </div>
      <div className="pb-4 flex gap-4">
        <Button variant="ghost">Invite</Button>
        <Button variant="primary">Sync Collective</Button>
      </div>
    </div>
  </div>
);

export const CommunityTabs: React.FC<{ activeId: string; onChange: (id: string) => void }> = ({ activeId, onChange }) => (
  <Tabs 
    activeId={activeId} 
    onChange={onChange} 
    tabs={[
      { id: 'pulse', label: 'Pulse' },
      { id: 'circles', label: 'Circles' },
      { id: 'about', label: 'Manifesto' },
      { id: 'mod', label: 'Moderation' }
    ]} 
    fullWidth
  />
);

export const CommunityPostCard: React.FC<{ post: any }> = ({ post }) => (
  <div className="relative">
    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-12 abyss-gradient-primary rounded-full" />
    <PostFeedItem post={post} />
  </div>
);

export const CommunityAboutSection: React.FC = () => (
  <div className="space-y-8">
    <h3 className="text-2xl font-black font-heading text-moonlight uppercase">Our Collective Vision</h3>
    <p className="text-lg text-pearl font-medium leading-relaxed opacity-80 italic">
      "We believe that true resonance occurs only when the noise of the digital world is muted, and we focus on the shared frequency of our intentions."
    </p>
    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-abyss-light">
      <div>
        <h4 className="text-[10px] font-black font-heading text-teal-light uppercase tracking-widest mb-2">Foundation</h4>
        <p className="text-sm font-bold text-moonlight">November 2024</p>
      </div>
      <div>
        <h4 className="text-[10px] font-black font-heading text-teal-light uppercase tracking-widest mb-2">Status</h4>
        <p className="text-sm font-bold text-moonlight">Open Resonance</p>
      </div>
    </div>
  </div>
);

export const CreatePostModal: React.FC = () => (
  <div className="space-y-8">
    <div className="flex items-center gap-4">
      <Avatar size="sm" src="https://i.pravatar.cc/150?u=me" />
      <span className="text-xs font-black font-heading text-moonlight uppercase tracking-widest">Disseminating Frequency</span>
    </div>
    <textarea className="w-full bg-abyss-base border border-abyss-light rounded-[1.5rem] p-6 text-pearl text-lg h-48 focus:outline-none focus:border-aqua-light transition-all placeholder:opacity-30" placeholder="Establish your pulse..."></textarea>
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        <button className="text-xl">📸</button>
        <button className="text-xl">📊</button>
        <button className="text-xl">📍</button>
      </div>
      <Button variant="primary" size="lg" className="px-10">Dispatch</Button>
    </div>
  </div>
);

export const InviteModeratorModal: React.FC = () => (
  <div className="space-y-8">
    <h3 className="text-xl font-black font-heading text-moonlight uppercase">Propose Moderator Role</h3>
    <Input label="Neural Link ID" placeholder="@node_id" />
    <div className="bg-abyss-mystic p-6 rounded-2xl border border-abyss-light">
      <p className="text-xs text-muted font-medium mb-4">Proposed moderators must have a resonance rating above 85%.</p>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 abyss-gradient-primary rounded-full flex items-center justify-center font-black">?</div>
        <p className="text-sm font-black font-heading text-moonlight uppercase">Awaiting ID Verification...</p>
      </div>
    </div>
    <Button variant="primary" className="w-full">Dispatch Proposal</Button>
  </div>
);

export const CommunityMemberCard: React.FC<{ name: string; role?: string }> = ({ name, role = "Node" }) => (
  <div className="p-4 bg-abyss-mystic border border-abyss-light rounded-2xl flex items-center justify-between hover:border-aqua-light transition-all cursor-pointer">
    <div className="flex items-center gap-3">
      <Avatar size="sm" src={`https://i.pravatar.cc/150?u=${name}`} />
      <div>
        <p className="text-sm font-black font-heading text-moonlight uppercase">{name}</p>
        <p className="text-[9px] text-teal-light font-black uppercase tracking-widest">{role}</p>
      </div>
    </div>
    <Button variant="ghost" size="sm" className="p-2 border-0">•••</Button>
  </div>
);

export const CommunityModeratorManager: React.FC = () => (
  <div className="space-y-4">
    <h4 className="text-[10px] font-black font-heading text-teal-light uppercase tracking-[0.3em] mb-4">Core Moderators</h4>
    <CommunityMemberCard name="Alex Rivers" role="Lead Architect" />
    <CommunityMemberCard name="Sarah Chen" role="Pulse Monitor" />
    <Button variant="primary" className="w-full mt-6 py-4 border-2 border-dashed border-aqua-light/30 bg-transparent text-aqua-light hover:bg-aqua-light/5">
      + Propose Moderator
    </Button>
  </div>
);
