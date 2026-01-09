
import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { Toggle } from './Toggle';

// --- Specialized Icons for Onboarding ---

const FlowIcons = {
  Email: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  SMS: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Chat: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Guide: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
    </svg>
  ),
  Journal: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  Personal: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Professional: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Spiritual: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ),
  Lite: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20" /><path d="m4.93 4.93 14.14 14.14" />
    </svg>
  ),
  Deep: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="m16 12-4-4-4 4" /><path d="M12 16V8" />
    </svg>
  ),
  Deeper: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20" /><path d="m4.93 4.93 14.14 14.14" /><path d="M2 12h20" /><path d="m19.07 4.93-14.14 14.14" />
    </svg>
  )
};

// --- Atomic Helpers ---

const OTPInput: React.FC<{ onComplete: (otp: string) => void }> = ({ onComplete }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every(v => v !== '')) {
      onComplete(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-between gap-2 md:gap-3">
      {code.map((digit, i) => (
        <input
          key={i}
          ref={el => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          className="w-12 h-14 md:w-14 md:h-16 bg-abyss-base border border-abyss-light rounded-xl text-center text-xl font-black text-aqua-light focus:border-aqua-light focus:ring-4 focus:ring-aqua-light/10 focus:outline-none transition-all"
        />
      ))}
    </div>
  );
};

const ChoiceCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
}> = ({ title, description, icon, onClick, selected }) => (
  <Card
    onClick={onClick}
    className={`group cursor-pointer p-8 flex flex-col items-center text-center gap-4 transition-all duration-300 border-2 ${selected ? 'border-aqua-light bg-aqua-light/5 shadow-2xl scale-105' : 'border-abyss-light hover:border-teal-light'}`}
    elevation={selected ? 'deep' : 'subtle'}
  >
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${selected ? 'bg-aqua-light text-abyss-base' : 'bg-abyss-light text-aqua-light group-hover:scale-110'}`}>
      {icon}
    </div>
    <div>
      <h4 className={`text-lg font-black uppercase tracking-tight mb-1 ${selected ? 'text-moonlight' : 'text-muted'}`}>{title}</h4>
      <p className="text-[10px] font-black uppercase text-teal-light tracking-widest opacity-60">{description}</p>
    </div>
  </Card>
);

// --- Component 1: Authentication Flow ---

export const AuthenticationFlow: React.FC<{ onVerified?: (email: string) => void }> = ({ onVerified }) => {
  const [step, setStep] = useState<'welcome' | 'input' | 'otp' | 'success'>('welcome');
  const [method, setMethod] = useState<'email' | 'sms'>('email');
  const [inputValue, setInputValue] = useState('');

  const handleSocial = (provider: string) => {
    // Simulating OAuth response
    if (onVerified) onVerified('Lena River');
  };

  if (step === 'welcome') {
    return (
      <Card className="max-w-md w-full p-10 space-y-10 animate-in fade-in zoom-in duration-500" elevation="deep">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 abyss-gradient-primary rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl animate-drift">
            <span className="text-abyss-base font-black text-3xl">A</span>
          </div>
          <h2 className="text-3xl font-black text-moonlight uppercase tracking-tighter">Enter the Abyss</h2>
          <p className="text-muted text-sm font-medium">Synchronize your presence with the neural collective.</p>
        </div>

        <div className="space-y-4">
          <Button variant="primary" className="w-full py-5 text-base shadow-xl" onClick={() => setStep('input')}>
            Join via Frequency Link
          </Button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-abyss-light"></div></div>
            <div className="relative flex justify-center text-[10px] font-black uppercase text-muted bg-abyss-depths px-4">Social Resonance</div>
          </div>

          <div className="space-y-3">
             <button onClick={() => handleSocial('Google')} className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-pearl transition-all shadow-xl">
               Continue with Google
             </button>
             <button onClick={() => handleSocial('Apple')} className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-abyss-mystic text-moonlight font-black text-xs uppercase tracking-widest rounded-2xl border border-abyss-light hover:bg-abyss-light transition-all shadow-xl">
               Continue with Apple
             </button>
          </div>
        </div>
      </Card>
    );
  }

  if (step === 'input') {
    return (
      <Card className="max-w-md w-full p-10 space-y-10 animate-in slide-in-from-right-10 duration-500" elevation="deep">
        <button onClick={() => setStep('welcome')} className="text-[10px] font-black text-teal-light uppercase tracking-widest hover:text-moonlight transition-colors">← Back</button>
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-moonlight uppercase tracking-tight">Identity Dispatch</h3>
          <p className="text-muted text-sm font-medium">dispatching a 6-digit resonance code to your {method}.</p>
        </div>
        <div className="space-y-6">
          <Input
            icon={method === 'email' ? <FlowIcons.Email /> : <FlowIcons.SMS />}
            placeholder={method === 'email' ? "architect@void.com" : "+1 (555) 000-0000"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button variant="primary" className="w-full py-5 abyss-gradient-primary shadow-xl shadow-aqua-light/10" disabled={!inputValue} onClick={() => setStep('otp')}>
            Dispatch Resonance
          </Button>
          <button
            onClick={() => setMethod(method === 'email' ? 'sms' : 'email')}
            className="w-full text-center text-[10px] font-black text-aqua-light uppercase tracking-widest hover:underline"
          >
            Use {method === 'email' ? 'Phone' : 'Email'} Instead
          </button>
        </div>
      </Card>
    );
  }

  if (step === 'otp') {
    return (
      <Card className="max-w-md w-full p-10 space-y-10 animate-in slide-in-from-right-10 duration-500" elevation="deep">
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-moonlight uppercase tracking-tight">Verify Frequency</h3>
          <p className="text-muted text-sm font-medium">Dispatch established to <span className="text-aqua-light">{inputValue}</span>.</p>
        </div>
        <div className="space-y-10">
          <OTPInput onComplete={() => setStep('success')} />
          <div className="text-center space-y-4">
            <button className="text-[10px] font-black text-muted uppercase tracking-widest hover:text-moonlight">Resend resonance link (45s)</button>
            <Button variant="primary" className="w-full py-5" onClick={() => setStep('success')}>Verify Frequency</Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="text-center animate-in zoom-in duration-1000 p-12 max-w-md w-full">
      <div className="w-24 h-24 abyss-gradient-primary rounded-full mx-auto mb-10 mira-glow flex items-center justify-center">
        <svg className="w-12 h-12 text-abyss-base" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
      </div>
      <h2 className="text-4xl font-black text-moonlight uppercase mb-4 tracking-tighter">Verified</h2>
      <p className="text-muted text-lg font-medium mb-12">Your frequency link is now stable in the collective.</p>
      <Button variant="ghost" className="px-12 uppercase font-black tracking-widest" onClick={() => setStep('welcome')}>Reset Flow</Button>
    </div>
  );
};

// --- Component 2: Quick Onboarding Flow ---

export const QuickOnboardingFlow: React.FC<{ prefillName?: string }> = ({ prefillName = "" }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(prefillName);
  const [intention, setIntention] = useState('');
  const [lens, setLens] = useState('');
  const [depth, setDepth] = useState('');

  const nextStep = () => setStep(s => s + 1);

  if (step === 1) {
    return (
      <Card className="max-w-md w-full p-10 space-y-10 animate-in fade-in duration-500" elevation="deep">
        <div className="flex items-center gap-4 text-teal-light font-black uppercase tracking-[0.4em] text-[10px]">
          <span className="text-aqua-light">01</span> / 04 <span>Genesis</span>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-moonlight uppercase tracking-tight">Identity Anchor</h2>
          <p className="text-muted text-sm font-medium">Define your digital signature for the collective.</p>
        </div>
        <div className="space-y-6">
          <Input
            label="Neural Identifier"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Lena River"
          />
          <Button variant="primary" className="w-full py-5 abyss-gradient-primary shadow-xl" disabled={!name} onClick={nextStep}>
            Confirm Identity
          </Button>
        </div>
      </Card>
    );
  }

  if (step === 2) {
    return (
      <div className="w-full max-w-5xl space-y-12 animate-in slide-in-from-right-12 duration-500">
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-4 text-teal-light font-black uppercase tracking-[0.4em] text-[10px]">
            01 / <span className="text-aqua-light">02</span> / 04 <span>Intention</span>
          </div>
          <h2 className="text-4xl font-black text-moonlight uppercase tracking-tighter">Your Sacred Purpose</h2>
          <p className="text-muted text-lg font-medium">Select your primary mode of resonance.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 'Chat', title: 'Collective Chat', desc: 'Communicate with others', icon: <FlowIcons.Chat /> },
            { id: 'Guide', title: 'Mira Guide', desc: 'Seek neural assistance', icon: <FlowIcons.Guide /> },
            { id: 'Journal', title: 'Void Journal', desc: 'Record your introspection', icon: <FlowIcons.Journal /> }
          ].map(item => (
            <ChoiceCard
              key={item.id}
              title={item.title}
              description={item.desc}
              icon={item.icon}
              selected={intention === item.id}
              onClick={() => { setIntention(item.id); setTimeout(nextStep, 500); }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="w-full max-w-5xl space-y-12 animate-in slide-in-from-right-12 duration-500">
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-4 text-teal-light font-black uppercase tracking-[0.4em] text-[10px]">
            01 / 02 / <span className="text-aqua-light">03</span> / 04 <span>Lens</span>
          </div>
          <h2 className="text-4xl font-black text-moonlight uppercase tracking-tighter">Adjust Your Lens</h2>
          <p className="text-muted text-lg font-medium">Under which framework will you observe the void?</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 'Personal', title: 'Personal', desc: 'Internal focus', icon: <FlowIcons.Personal /> },
            { id: 'Professional', title: 'Professional', desc: 'Entity & Logic', icon: <FlowIcons.Professional /> },
            { id: 'Spiritual', title: 'Spiritual', desc: 'Soul & Stillness', icon: <FlowIcons.Spiritual /> }
          ].map(item => (
            <ChoiceCard
              key={item.id}
              title={item.title}
              description={item.desc}
              icon={item.icon}
              selected={lens === item.id}
              onClick={() => { setLens(item.id); setTimeout(nextStep, 500); }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="w-full max-w-5xl space-y-12 animate-in slide-in-from-right-12 duration-500">
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-4 text-teal-light font-black uppercase tracking-[0.4em] text-[10px]">
            01 / 02 / 03 / <span className="text-aqua-light">04</span> <span>Submersion</span>
          </div>
          <h2 className="text-4xl font-black text-moonlight uppercase tracking-tighter">Choose Your Depth</h2>
          <p className="text-muted text-lg font-medium">Determine the density of your digital experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: 'Lite', title: 'Lite', desc: 'Surface frequency', icon: <FlowIcons.Lite /> },
            { id: 'Deep', title: 'Deep', desc: 'Density Tier 1', icon: <FlowIcons.Deep /> },
            { id: 'Deeper', title: 'Deeper', desc: 'Total immersion', icon: <FlowIcons.Deeper /> }
          ].map(item => (
            <ChoiceCard
              key={item.id}
              title={item.title}
              description={item.desc}
              icon={item.icon}
              selected={depth === item.id}
              onClick={() => { setDepth(item.id); nextStep(); }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center animate-in zoom-in duration-1000 p-12 max-w-lg w-full">
      <div className="w-24 h-24 abyss-gradient-primary rounded-full mx-auto mb-10 mira-glow flex items-center justify-center">
        <svg className="w-12 h-12 text-abyss-base" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
      </div>
      <h2 className="text-4xl font-black text-moonlight uppercase mb-4 tracking-tighter">Sacred Sync Complete</h2>
      <p className="text-muted text-lg font-medium mb-12">Welcome, <span className="text-aqua-light font-black">{name}</span>. You are now tuned to the <span className="text-gold-accent font-black">{depth}</span> depth via the <span className="text-aqua-light font-black">{lens}</span> lens.</p>
      <Button variant="ghost" className="px-12 uppercase font-black tracking-widest" onClick={() => setStep(1)}>Initiate New Sync</Button>
    </div>
  );
};

// --- SACRED LOADING Helper ---

export const SacredLoading: React.FC = () => (
  <div className="flex flex-col items-center gap-8 p-20 animate-in fade-in duration-500">
    <div className="relative w-32 h-32">
      <div className="absolute inset-0 border-4 border-teal-light rounded-full opacity-10" />
      <div className="absolute inset-0 border-4 border-t-aqua-light rounded-full animate-spin shadow-[0_0_30px_rgba(151,217,196,0.4)]" />
      <div className="absolute inset-6 border-2 border-b-gold-accent rounded-full animate-spin [animation-duration:3s] opacity-50" />
    </div>
    <div className="text-center space-y-2">
      <span className="block text-[11px] font-black text-aqua-light uppercase tracking-[0.6em] animate-pulse">Stabilizing Neural Link</span>
      <span className="block text-[9px] font-black text-muted uppercase tracking-widest opacity-40">Calculating Frequency Offsets</span>
    </div>
  </div>
);

// Fallback exports for existing calls in Showcase if any
export const AuthFlow: React.FC = () => <div className="flex flex-col gap-20 items-center"><AuthenticationFlow /><QuickOnboardingFlow /></div>;

// Re-export HomeComponents for backward compatibility
export {
  EmailCapture,
  SoftArrival,
  OnboardingForm,
  PageContainer,
  ErrorContainer
} from './HomeComponents';
