
import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Input } from './Input';
import { SacredLoading } from './AuthComponents';

export const AffiliateSignupFlow: React.FC = () => {
  const [step, setStep] = useState<'OVERVIEW' | 'FORM' | 'PROCESSING' | 'SUCCESS'>('OVERVIEW');
  const [formData, setFormData] = useState({
    legalName: '',
    primaryLink: '',
    customCode: '',
    agreed: false
  });

  const handleNext = () => {
    if (step === 'OVERVIEW') setStep('FORM');
    else if (step === 'FORM') setStep('PROCESSING');
  };

  const simulateStripeConnect = () => {
    // Simulate a short delay for "Stripe Connection"
    setTimeout(() => {
      setStep('SUCCESS');
    }, 2500);
  };

  if (step === 'OVERVIEW') {
    return (
      <Card className="max-w-2xl w-full p-12 space-y-10 animate-in fade-in zoom-in duration-500" elevation="deep">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gold-accent/10 border border-gold-accent/20 rounded-3xl flex items-center justify-center mx-auto gold-glow">
            <svg className="w-10 h-10 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-moonlight uppercase tracking-tighter">Affiliate Collective</h2>
          <p className="text-muted text-lg font-medium leading-relaxed">
            Expand the reach of the Abyss and receive resonance rewards for every new node you establish.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: '25% Tier', desc: 'Resonance Share' },
            { label: 'Real-time', desc: 'Neural Payouts' },
            { label: 'Priority', desc: 'Support Node' }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-abyss-mystic border border-abyss-light rounded-2xl text-center">
              <p className="text-sm font-black text-aqua-light uppercase">{item.label}</p>
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        <Button variant="primary" className="w-full py-5 text-base abyss-gradient-primary shadow-xl" onClick={handleNext}>
          Join the Collective
        </Button>
      </Card>
    );
  }

  if (step === 'FORM') {
    return (
      <Card className="max-w-2xl w-full p-12 space-y-10 animate-in slide-in-from-right-8 duration-500" elevation="deep">
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-moonlight uppercase tracking-tight">Affiliate Application</h3>
          <p className="text-muted text-sm font-medium">Define your referral parameters.</p>
        </div>

        <div className="space-y-6">
          <Input 
            label="Legal Identity / Entity Name" 
            placeholder="John Doe or Void Corp"
            value={formData.legalName}
            onChange={(e) => setFormData({...formData, legalName: e.target.value})}
          />
          <Input 
            label="Primary Resonance Link (Social/Web)" 
            placeholder="https://x.com/yourhandle"
            value={formData.primaryLink}
            onChange={(e) => setFormData({...formData, primaryLink: e.target.value})}
          />
          <div className="pt-4 border-t border-abyss-light">
            <Input 
              label="Custom Affiliate Code (Optional)" 
              placeholder="VOID-001"
              value={formData.customCode}
              onChange={(e) => setFormData({...formData, customCode: e.target.value})}
            />
            <p className="text-[9px] text-teal-light font-black uppercase tracking-widest mt-2">
              This will be your unique resonance identifier.
            </p>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Button variant="ghost" className="flex-1" onClick={() => setStep('OVERVIEW')}>Abort</Button>
          <Button 
            variant="primary" 
            className="flex-[2] abyss-gradient-primary" 
            disabled={!formData.legalName || !formData.primaryLink}
            onClick={handleNext}
          >
            Submit Application
          </Button>
        </div>
      </Card>
    );
  }

  if (step === 'PROCESSING') {
    return (
      <Card className="max-w-2xl w-full p-16 space-y-12 animate-in fade-in duration-500 text-center" elevation="deep">
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-moonlight uppercase tracking-tight">Financial Calibration</h3>
          <p className="text-muted text-sm font-medium max-w-sm mx-auto">
            Establishing your neural financial link via <span className="text-aqua-light">Stripe Connect</span>.
          </p>
        </div>

        <div className="py-10 flex flex-col items-center gap-8">
          <div className="w-16 h-16 border-4 border-t-aqua-light border-abyss-light rounded-full animate-spin shadow-[0_0_20px_rgba(151,217,196,0.3)]" />
          <div className="space-y-4 w-full">
            <Button 
              variant="primary" 
              className="w-full bg-[#635bff] hover:bg-[#5a52e0] text-white border-0 py-6 text-lg font-black shadow-2xl" 
              onClick={simulateStripeConnect}
            >
              <span className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.962 10.935c0-1.212-1.077-1.423-1.923-1.423-.847 0-1.923.211-1.923 1.423 0 1.211 1.076 1.422 1.923 1.422.846 0 1.923-.211 1.923-1.422zM15.885 8.02c-.846-.846-1.923-1.057-3.846-1.057-1.923 0-3 .211-3.846 1.057-.846.846-1.057 1.923-1.057 3.846 0 1.923.211 3 1.057 3.846.846.846 1.923 1.057 3.846 1.057 1.923 0 3-.211 3.846-1.057.846-.846 1.057-1.923 1.057-3.846 0-1.923-.211-3-1.057-3.846zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                </svg>
                Connect with Stripe
              </span>
            </Button>
            <p className="text-[10px] text-muted font-bold uppercase tracking-[0.3em]">
              Secure Financial Protocol V3.1
            </p>
          </div>
        </div>

        <Button variant="ghost" className="w-full" onClick={() => setStep('FORM')}>Back to Application</Button>
      </Card>
    );
  }

  return (
    <div className="text-center animate-in zoom-in duration-1000 p-12 max-w-lg w-full">
      <div className="w-24 h-24 abyss-gradient-primary rounded-full mx-auto mb-10 mira-glow flex items-center justify-center">
        <svg className="w-12 h-12 text-abyss-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-4xl font-black text-moonlight uppercase mb-4 tracking-tighter">Affiliate Link Sealed</h2>
      <p className="text-muted text-lg font-medium mb-12">
        Your portal is now active. Your custom code <span className="text-aqua-light">{formData.customCode || 'ABYSS-NODE'}</span> is ready for dissemination.
      </p>
      <Button variant="ghost" className="px-12 uppercase font-black tracking-widest" onClick={() => setStep('OVERVIEW')}>Access Dashboard</Button>
    </div>
  );
};
