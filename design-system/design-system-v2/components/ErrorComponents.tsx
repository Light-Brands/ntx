
import React from 'react';
import { Card } from './Card';
import { Button } from './Button';

export const ErrorBoundary: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-12">
    <div className="text-6xl mb-6">🌩️</div>
    <h2 className="text-2xl font-black text-red-500 uppercase tracking-tighter mb-4">Neural Link Severed</h2>
    <p className="text-muted max-w-sm mb-8">An unexpected frequency interruption occurred. Your session is being stabilized.</p>
    <Button variant="ghost" onClick={() => window.location.reload()} className="border-red-500/30 text-red-500 hover:bg-red-500/10">Reconnect Link</Button>
  </div>
);

export const ProfileErrorFallback: React.FC = () => (
  <Card className="border-red-500/20 bg-red-500/5 p-8" elevation="deep">
    <div className="flex gap-4 items-start">
      <div className="text-2xl">⚠️</div>
      <div>
        <h4 className="font-black text-red-500 uppercase text-xs tracking-widest mb-1">Entity Not Found</h4>
        <p className="text-sm text-muted">The requested node ID does not exist in the current abyss depth.</p>
        <Button variant="ghost" size="sm" className="mt-4 border-red-500/20 text-red-500">Return to Pulse</Button>
      </div>
    </div>
  </Card>
);
