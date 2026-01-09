
import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Avatar } from './Avatar';
import { Input } from './Input';

export const VerificationBadge: React.FC = () => (
  <div className="inline-flex items-center gap-1 bg-gold-accent/10 text-gold-accent px-2 py-0.5 rounded-full border border-gold-accent/20">
    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
    <span className="text-[10px] font-black uppercase tracking-wider">Verified Entity</span>
  </div>
);

export const ListingCard: React.FC<{ title: string; price: string; location: string }> = ({ title, price, location }) => (
  <Card className="group cursor-pointer overflow-hidden p-0" elevation="deep">
    <div className="aspect-video bg-abyss-base overflow-hidden relative">
      <div className="absolute top-4 right-4 z-10">
        <VerificationBadge />
      </div>
      <img src={`https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-lg font-black font-heading text-moonlight uppercase tracking-tight">{title}</h4>
        <span className="text-aqua-light font-black">{price}</span>
      </div>
      <p className="text-xs text-muted font-bold uppercase tracking-widest">{location}</p>
      <Button variant="ghost" className="w-full mt-6" size="sm">View Listing</Button>
    </div>
  </Card>
);

export const BusinessAdminManager: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between p-4 bg-abyss-mystic rounded-2xl border border-abyss-light">
      <div className="flex items-center gap-3">
        <Avatar size="sm" />
        <div>
          <p className="text-sm font-black font-heading text-moonlight uppercase">Sarah Connor</p>
          <p className="text-[10px] text-teal-light font-bold">Primary Admin</p>
        </div>
      </div>
      <Button variant="ghost" size="sm">Remove</Button>
    </div>
    <Button variant="primary" className="w-full py-4 border-2 border-dashed border-aqua-light/30 bg-transparent text-aqua-light hover:bg-aqua-light/5">
      + Invite Administrator
    </Button>
  </div>
);

export const BusinessProfileEditor: React.FC = () => (
  <Card elevation="deep">
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 bg-abyss-light rounded-3xl flex items-center justify-center border-2 border-dashed border-aqua-light/30">
          <span className="text-4xl">🏢</span>
        </div>
        <div className="flex-1 space-y-4">
          <Input label="Entity Name" defaultValue="Abyss Solutions Inc." />
          <VerificationBadge />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Industry" defaultValue="Resonance Tech" />
        <Input label="Founded" defaultValue="2024" />
      </div>
      <Button variant="primary" className="w-full">Sync Entity Data</Button>
    </div>
  </Card>
);

export const ImageUpload: React.FC = () => (
  <div className="w-full p-12 border-2 border-dashed border-abyss-light rounded-[2rem] flex flex-col items-center justify-center bg-abyss-mystic/20 hover:border-aqua-light hover:bg-aqua-light/5 transition-all cursor-pointer group">
    <div className="w-16 h-16 rounded-2xl bg-abyss-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <svg className="w-8 h-8 text-teal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
    </div>
    <p className="text-xs font-black text-muted uppercase tracking-widest">Release media into the abyss</p>
    <p className="text-[10px] text-teal-light font-bold uppercase mt-2">Maximum resolution: 4096px</p>
  </div>
);

export const CreateListingModal: React.FC = () => (
  <div className="space-y-8">
    <ImageUpload />
    <div className="space-y-4">
      <Input label="Listing Title" placeholder="e.g. Minimalist Zen Space" />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Price (Monthly)" placeholder="$0.00" />
        <Input label="Location Node" placeholder="Node #" />
      </div>
      <textarea className="w-full bg-abyss-base border border-abyss-light rounded-vibe-btn p-4 text-pearl text-sm h-32 focus:outline-none focus:border-aqua-light transition-all" placeholder="Resonance details..."></textarea>
    </div>
    <Button variant="primary" className="w-full">Establish Listing</Button>
  </div>
);

export const EditListingModal: React.FC<{ listing: any }> = ({ listing }) => (
  <div className="space-y-8">
    <div className="aspect-video bg-abyss-base rounded-3xl overflow-hidden relative border border-abyss-light">
      <img src={listing.imageUrl} className="w-full h-full object-cover opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Button variant="ghost" size="sm">Change Visuals</Button>
      </div>
    </div>
    <div className="space-y-4">
      <Input label="Listing Title" defaultValue={listing.title} />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Price (Monthly)" defaultValue={listing.price} />
        <Input label="Location Node" defaultValue={listing.location} />
      </div>
    </div>
    <div className="flex gap-4">
      <Button variant="danger" className="flex-1">Withdraw</Button>
      <Button variant="primary" className="flex-[2]">Update Listing</Button>
    </div>
  </div>
);

export const InviteAdminModal: React.FC = () => (
  <div className="space-y-8">
    <h3 className="text-xl font-black font-heading text-moonlight uppercase">Delegate Authority</h3>
    <Input label="Neural Handle" placeholder="@handle" />
    <div className="space-y-3">
      <h4 className="text-[10px] font-black font-heading text-teal-light uppercase tracking-widest">Authority Level</h4>
      <div className="grid grid-cols-2 gap-3">
        {['Full Access', 'Analytics Only', 'Content Curator', 'Support Node'].map(role => (
          <button key={role} className="px-4 py-3 rounded-xl bg-abyss-mystic border border-abyss-light text-xs font-bold text-muted hover:border-aqua-light transition-all">
            {role}
          </button>
        ))}
      </div>
    </div>
    <Button variant="primary" className="w-full">Dispatch Invitation</Button>
  </div>
);
