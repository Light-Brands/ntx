
import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Input } from './Input';
import { Avatar } from './Avatar';
import { ProfileHeader } from './ProfileHeader';
import { Textarea } from './Textarea';
import { Toggle } from './Toggle';

// --- Atomic Setup Components ---

const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <div className="w-full space-y-2 mb-12">
    <div className="flex justify-between items-end">
      <span className="text-[10px] font-black text-teal-light uppercase tracking-[0.4em]">Calibration Progress</span>
      <span className="text-xs font-black text-aqua-light uppercase tracking-widest">{current} / {total}</span>
    </div>
    <div className="h-1.5 w-full bg-abyss-base border border-abyss-light rounded-full overflow-hidden">
      <div 
        className="h-full abyss-gradient-primary transition-all duration-700 ease-out shadow-[0_0_15px_rgba(151,217,196,0.3)]"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  </div>
);

const SelectionTag: React.FC<{ label: string; selected: boolean; onClick: () => void }> = ({ label, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${
      selected 
      ? 'bg-aqua-light text-abyss-base border-aqua-light shadow-lg shadow-aqua-light/20 scale-105' 
      : 'bg-abyss-base text-muted border-abyss-light hover:border-teal-light hover:text-moonlight'
    }`}
  >
    {label}
  </button>
);

// --- 13 Step Flow Component ---

export const DetailedProfileSetupFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 13;

  // State for all steps
  const [basicInfo, setBasicInfo] = useState({ name: '', location: '', bio: '', avatar: '' });
  const [purpose, setPurpose] = useState({ statement: '', intentions: [] as string[] });
  const [values, setValues] = useState<string[]>([]);
  const [interests, setInterests] = useState<Record<string, string[]>>({
    wellness: [], growth: [], creativity: [], culture: [], recreation: [], community: []
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [energyStyle, setEnergyStyle] = useState('');
  const [connectionStyles, setConnectionStyles] = useState<string[]>([]);
  const [chemistry, setChemistry] = useState({ dob: '', time: '', location: '' });

  const next = () => setStep(s => Math.min(s + 1, totalSteps));
  const back = () => setStep(s => Math.max(s - 1, 1));
  const skip = () => next();

  const toggleItem = (list: string[], item: string, setter: (val: string[]) => void) => {
    if (list.includes(item)) setter(list.filter(i => i !== item));
    else setter([...list, item]);
  };

  const renderStep = () => {
    switch(step) {
      case 1: return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black font-heading text-moonlight uppercase tracking-tight leading-none">Basic Information</h2>
            <p className="text-muted font-body text-sm font-medium">Dispatch your initial identity markers.</p>
          </div>
          <div className="flex flex-col items-center gap-6 mb-8">
            <div className="relative group cursor-pointer">
              <Avatar size="xl" className="border-4 border-abyss-light" />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-black text-white uppercase">Upload Link</span>
              </div>
            </div>
            <p className="text-[10px] font-black text-teal-light uppercase tracking-widest">Neural Avatar Signature</p>
          </div>
          <div className="space-y-6">
            <Input label="Neural Identifier" placeholder="Lena River" value={basicInfo.name} onChange={e => setBasicInfo({...basicInfo, name: e.target.value})} />
            <Input label="Resonance Node (Location)" placeholder="Node 702 / Mars Colony" value={basicInfo.location} onChange={e => setBasicInfo({...basicInfo, location: e.target.value})} />
            <Textarea label="Digital Bio" placeholder="Tell the collective about your frequency..." value={basicInfo.bio} onChange={e => setBasicInfo({...basicInfo, bio: e.target.value})} />
          </div>
        </div>
      );
      case 2: return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black font-heading text-moonlight uppercase tracking-tight">Purpose & Intent</h2>
            <p className="text-muted font-body text-sm font-medium">Anchor your existence in the deep stream.</p>
          </div>
          <Textarea label="Purpose Statement" placeholder="I exist to resonance with..." value={purpose.statement} onChange={e => setPurpose({...purpose, statement: e.target.value})} />
          <div className="space-y-4">
            <p className="text-[10px] font-black text-teal-light uppercase tracking-widest">Collective Intentions</p>
            <div className="grid grid-cols-2 gap-3">
              {['Building Circles', 'Deep Learning', 'Creative Flow', 'Silent Observation'].map(i => (
                <button 
                  key={i}
                  onClick={() => toggleItem(purpose.intentions, i, (v) => setPurpose({...purpose, intentions: v}))}
                  className={`p-4 rounded-2xl border text-left transition-all ${purpose.intentions.includes(i) ? 'border-aqua-light bg-aqua-light/5 text-moonlight' : 'border-abyss-light text-muted hover:border-teal-light'}`}
                >
                  <span className="text-xs font-black uppercase tracking-tight">{i}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
      case 3: return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black font-heading text-moonlight uppercase tracking-tight">Core Values</h2>
            <p className="text-muted font-body text-sm font-medium">Select minimum 3 frequency anchors.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {['Authenticity', 'Freedom', 'Expansion', 'Stillness', 'Collective', 'Logic', 'Intuition', 'Resilience', 'Beauty', 'Justice'].map(v => (
              <SelectionTag key={v} label={v} selected={values.includes(v)} onClick={() => toggleItem(values, v, setValues)} />
            ))}
          </div>
        </div>
      );
      case 4: case 5: case 6: case 7: case 8: case 9: 
        const categories = ['Wellness', 'Growth', 'Creativity', 'Culture', 'Recreation', 'Community'];
        const cat = categories[step - 4];
        const key = cat.toLowerCase();
        const catInterests = {
          wellness: ['Yoga', 'Meditation', 'Biohacking', 'Hydration', 'Rest'],
          growth: ['Psychology', 'Philosophy', 'Productivity', 'Skill Mastery'],
          creativity: ['Digital Art', 'Generative Sound', 'Code Art', 'Design'],
          culture: ['Sci-Fi', 'Modernism', 'Void Cinema', 'Neural Music'],
          recreation: ['Void Hiking', 'Virtual Flight', 'Zero-G Sport', 'Retro Games'],
          community: ['DAO Architecture', 'Public Goods', 'Global Circles', 'Open Protocol']
        };
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-black font-heading text-moonlight uppercase tracking-tight">{cat} Interests</h2>
              <p className="text-muted font-body text-sm font-medium">How do you engage with {cat.toLowerCase()}?</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {catInterests[key as keyof typeof catInterests].map(i => (
                <SelectionTag key={i} label={i} selected={interests[key].includes(i)} onClick={() => {
                  const newList = interests[key].includes(i) ? interests[key].filter(x => x !== i) : [...interests[key], i];
                  setInterests({...interests, [key]: newList});
                }} />
              ))}
            </div>
          </div>
        );
      case 10: return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black font-heading text-moonlight uppercase tracking-tight">Neural Skills</h2>
            <p className="text-muted font-body text-sm font-medium">Define your functional attributes.</p>
          </div>
          <div className="space-y-6">
            <div className="flex gap-3">
              <Input placeholder="Create custom attribute..." id="new-skill" />
              <Button size="sm" onClick={() => {
                const input = document.getElementById('new-skill') as HTMLInputElement;
                if (input.value) {
                  setSkills([...skills, input.value]);
                  input.value = '';
                }
              }}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map(s => (
                <div key={s} className="flex items-center gap-2 px-4 py-2 bg-abyss-base border border-aqua-light/30 rounded-full text-[10px] font-black text-aqua-light uppercase tracking-widest">
                  {s}
                  <button onClick={() => setSkills(skills.filter(x => x !== s))} className="hover:text-red-400">×</button>
                </div>
              ))}
              {skills.length === 0 && <p className="text-xs text-muted opacity-40 italic">No custom attributes established yet.</p>}
            </div>
          </div>
        </div>
      );
      case 11: return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black font-heading text-moonlight uppercase tracking-tight">Energy Style</h2>
            <p className="text-muted font-body text-sm font-medium">Select your primary biological resonance.</p>
          </div>
          <div className="grid gap-4">
            {['Solar (Morning Bloom)', 'Lunar (Night Flow)', 'Void (Constant Sync)', 'Chaos (Reactive Flow)'].map(style => (
              <button 
                key={style}
                onClick={() => setEnergyStyle(style)}
                className={`p-6 rounded-[2rem] border-2 text-left transition-all ${energyStyle === style ? 'border-aqua-light bg-aqua-light/5 shadow-xl' : 'border-abyss-light hover:border-teal-light'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black text-moonlight uppercase tracking-tight">{style}</span>
                  {energyStyle === style && <div className="w-4 h-4 rounded-full bg-aqua-light mira-glow" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      );
      case 12: return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black font-heading text-moonlight uppercase tracking-tight">Connection Styles</h2>
            <p className="text-muted font-body text-sm font-medium">How do you link with other nodes?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['The Listener', 'The Architect', 'The Explorer', 'The Catalyst', 'The Guardian', 'The Muse'].map(s => (
              <button 
                key={s}
                onClick={() => toggleItem(connectionStyles, s, setConnectionStyles)}
                className={`p-6 rounded-[2rem] border-2 text-left transition-all ${connectionStyles.includes(s) ? 'border-aqua-light bg-aqua-light/5 shadow-xl' : 'border-abyss-light hover:border-teal-light'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black text-moonlight uppercase tracking-tight">{s}</span>
                  {connectionStyles.includes(s) && <div className="w-4 h-4 rounded-full bg-aqua-light mira-glow" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      );
      case 13: return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black font-heading text-gold-accent uppercase tracking-tight">Chemistry Setup</h2>
            <p className="text-muted font-body text-sm font-medium">Provide birth data for astronomical resonance (Optional).</p>
          </div>
          <div className="space-y-6">
            <Input type="date" label="Date of Genesis" value={chemistry.dob} onChange={e => setChemistry({...chemistry, dob: e.target.value})} />
            <Input type="time" label="Time of Arrival" value={chemistry.time} onChange={e => setChemistry({...chemistry, time: e.target.value})} />
            <Input label="Spatial Coordinates (City)" placeholder="e.g. San Francisco, Earth" value={chemistry.location} onChange={e => setChemistry({...chemistry, location: e.target.value})} />
          </div>
          <div className="p-6 bg-gold-accent/5 border border-gold-accent/20 rounded-2xl">
            <p className="text-[10px] text-gold-accent font-black uppercase tracking-widest leading-relaxed">
              This data is processed locally to generate your resonance chart and will not be shared without explicit neural confirmation.
            </p>
          </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <Card className="max-w-3xl w-full p-10 md:p-16" elevation="deep">
      <ProgressBar current={step} total={totalSteps} />
      
      <div className="min-h-[450px]">
        {renderStep()}
      </div>

      <div className="flex items-center justify-between pt-12 mt-8 border-t border-abyss-light">
        <Button variant="ghost" onClick={back} disabled={step === 1} className="px-8 border-0">← Back</Button>
        <div className="flex gap-4">
          {step < totalSteps && (
            <Button variant="ghost" onClick={skip} className="px-8 border-0 opacity-50 hover:opacity-100 uppercase font-black tracking-widest text-[10px]">Skip</Button>
          )}
          <Button 
            variant="primary" 
            onClick={step === totalSteps ? () => setStep(1) : next} 
            className="px-12 abyss-gradient-primary uppercase font-black tracking-widest"
          >
            {step === totalSteps ? 'Seal Identity' : 'Continue Calibration'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

// --- Legacy Exports ---

export const EnhancedProfileView: React.FC<{ user: any }> = ({ user }) => (
  <div className="space-y-12">
    <ProfileHeader user={user} />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-8">
      <Card elevation="deep" className="lg:col-span-2">
        <h4 className="text-xs font-black font-heading text-aqua-light uppercase tracking-widest mb-6">Recent Activity</h4>
        <div className="space-y-4">
          <p className="text-pearl font-medium opacity-60 italic">No public logs shared recently...</p>
        </div>
      </Card>
      <Card elevation="deep" className="h-fit">
        <h4 className="text-xs font-black font-heading text-gold-accent uppercase tracking-widest mb-6">Resonance Stats</h4>
        <div className="space-y-4">
          <div className="flex justify-between border-b border-abyss-light pb-2">
            <span className="text-[10px] text-muted font-bold uppercase">Consistency</span>
            <span className="text-sm font-black text-moonlight">98%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[10px] text-muted font-bold uppercase">Rank</span>
            <span className="text-sm font-black text-moonlight">Node Tier 1</span>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

export const ProfileEditingInterface: React.FC = () => (
  <Card className="max-w-2xl" elevation="deep">
    <div className="space-y-10">
      <div className="flex items-center gap-8 border-b border-abyss-light pb-8">
        <div className="relative group cursor-pointer">
          <Avatar size="xl" src="https://i.pravatar.cc/150?u=edit" />
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-black text-white uppercase">Update</span>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <Input label="Full Identity" defaultValue="Lena River" />
          <Input label="Digital Bio" placeholder="Tell the abyss about yourself..." />
        </div>
      </div>
      <div className="space-y-6">
         <h4 className="text-[10px] font-black font-heading text-teal-light uppercase tracking-widest">Extended Metadata</h4>
         <div className="grid grid-cols-2 gap-4">
           <Input label="Resonance Location" defaultValue="Node 702" />
           <Input label="Neural Link (URL)" placeholder="https://" />
         </div>
      </div>
      <div className="flex justify-end gap-4 pt-4 border-t border-abyss-light">
        <Button variant="ghost">Discard</Button>
        <Button variant="primary">Seal Changes</Button>
      </div>
    </div>
  </Card>
);

export const EnhancedProfileSetupFlow: React.FC = () => <DetailedProfileSetupFlow />;
