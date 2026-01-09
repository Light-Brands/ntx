
import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from './Avatar';
import { Card } from './Card';

// --- Types ---
type AgentType = 'guide' | 'journal' | 'deep-search' | 'creative';
type PersonalityType = 'personal' | 'professional' | 'spiritual';
type SpeedMode = 'fast' | 'deep' | 'creative';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

// --- Minimal Icons ---
const Icons = {
  Voice: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" x2="12" y1="19" y2="22"/>
    </svg>
  ),
  Rocket: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.5-1 1-4c1.5 0 3 .5 3 .5L9 12z"/><path d="M15 15v5s-1 .5-4 1c0-1.5.5-3 .5-3L15 15z"/><circle cx="15" cy="9" r="1"/></svg>
  ),
  Send: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 7-7 7 7"/>
      <path d="M12 19V5"/>
    </svg>
  ),
  Lightning: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z"/>
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z"/></svg>
  ),
  Search: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Creative: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
  ),
  Journal: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
  ),
  Lens: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  ChevronDown: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7"/>
    </svg>
  ),
  ArrowUp: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5m-7 7 7-7 7 7"/>
    </svg>
  ),
  MiraLogo: () => (
    <svg className="w-14 h-14" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle - vision/lens */}
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" opacity="0.4"/>
      
      {/* Inner geometric pattern - intelligence/insight */}
      <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="2.5" opacity="0.6"/>
      
      {/* Central focal point */}
      <circle cx="24" cy="24" r="4" fill="currentColor"/>
      
      {/* Radiating lines - guidance/illumination */}
      <line x1="24" y1="8" x2="24" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="24" y1="36" x2="24" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="8" y1="24" x2="12" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="36" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      
      {/* Diagonal rays */}
      <line x1="14.5" y1="14.5" x2="11.3" y2="11.3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="33.5" y1="33.5" x2="36.7" y2="36.7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="33.5" y1="14.5" x2="36.7" y2="11.3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="14.5" y1="33.5" x2="11.3" y2="36.7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  MiraLogoSmall: () => (
    <svg className="w-4 h-4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Simplified version for small sizes */}
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="3" opacity="0.5"/>
      <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="3"/>
      <circle cx="24" cy="24" r="5" fill="currentColor"/>
      
      {/* Main 4 rays only */}
      <line x1="24" y1="6" x2="24" y2="12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="24" y1="36" x2="24" y2="42" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="6" y1="24" x2="12" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="36" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
};

export const MiraIntelligence: React.FC = () => {
  const [flowStep, setFlowStep] = useState<'landing' | 'chat'>('landing');
  const [currentMode, setCurrentMode] = useState<AgentType>('guide'); // journal, guide, deep-search, creative
  const [personality, setPersonality] = useState<PersonalityType>('personal');
  const [speedMode, setSpeedMode] = useState<SpeedMode>('fast');
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isThinking]);

  // Close persona menu when clicking outside
  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Cycle through speed modes
  const cycleSpeedMode = () => {
    const modes: SpeedMode[] = ['fast', 'deep', 'creative'];
    const currentIndex = modes.indexOf(speedMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setSpeedMode(modes[nextIndex]);
  };

  // Cycle through personalities
  const cyclePersonality = () => {
    const personalities: PersonalityType[] = ['personal', 'professional', 'spiritual'];
    const currentIndex = personalities.indexOf(personality);
    const nextIndex = (currentIndex + 1) % personalities.length;
    setPersonality(personalities[nextIndex]);
  };

  const handleSendMessage = (text: string = inputValue) => {
    const content = text.trim();
    if (!content) return;

    if (flowStep === 'landing') setFlowStep('chat');

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      setIsStreaming(true);
      const assistantId = (Date.now() + 1).toString();
      
      // Contextual responses based on mode + speed + personality
      const getModeResponse = () => {
        if (currentMode === 'journal') {
          return "I'm here to hold space for your reflections. What you're sharing matters, and I'm listening with full presence.";
        }
        if (currentMode === 'deep-search') {
          return "I'm diving deep into the collective knowledge to find insights that resonate with your inquiry. Let me synthesize what emerges...";
        }
        if (currentMode === 'creative') {
          return "Your creative energy is beautiful. Let's explore this together and see what wants to be expressed through you.";
        }
        return "I'm tuning into your question. Let me offer what might be helpful right now.";
      };

      const getPersonalityTone = () => {
        if (personality === 'professional') return " I'll keep this grounded and actionable.";
        if (personality === 'spiritual') return " I sense there's deeper wisdom here for both of us.";
        return " I'm curious to explore this with you.";
      };
      
      const baseResponse = getModeResponse();
      const toneAddition = speedMode === 'deep' ? getPersonalityTone() : '';
      const speedContext = speedMode === 'fast' ? ' (Quick insight)' : speedMode === 'creative' ? ' Let me feel into this creatively...' : '';
      
      const fullContent = baseResponse + toneAddition + speedContext;
      let currentContent = "";
      let charIndex = 0;

      const streamInterval = setInterval(() => {
        currentContent += fullContent[charIndex];
        setMessages(prev => {
          const others = prev.filter(m => m.id !== assistantId);
          return [...others, { id: assistantId, role: 'assistant', content: currentContent, timestamp: new Date(), isStreaming: true }];
        });
        charIndex++;
        if (charIndex >= fullContent.length) {
          clearInterval(streamInterval);
          setIsStreaming(false);
          setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, isStreaming: false } : m));
        }
      }, 20);
    }, 800);
  };

  const ActionButton = ({ icon, label, active, onClick, dropdown }: any) => {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={`
          group relative flex items-center gap-1.5 md:gap-2.5 px-3 md:px-6 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl text-xs md:text-sm font-semibold transition-all duration-300
          border-2 whitespace-nowrap active:scale-95
          ${active 
            ? 'bg-aqua-light/10 text-aqua-light border-aqua-light/30 shadow-lg shadow-aqua-light/20'
            : 'bg-[#1a1a2e] text-moonlight-muted border-white/10 hover:border-aqua-light/20 hover:bg-[#16161f] hover:text-moonlight'}
        `}
      >
        <span className={`transition-colors ${active ? 'text-aqua-light' : 'text-moonlight-muted group-hover:text-aqua-light'}`}>
          {icon}
        </span>
        <span className="font-body">{label}</span>
        {dropdown && (
          <span className="text-moonlight-muted/50 group-hover:text-moonlight-muted transition-colors">
            <Icons.ChevronDown />
          </span>
        )}
      </button>
    );
  };

  return (
    <Card className="w-full h-[100vh] md:h-[850px] p-0 border-white/5 bg-abyss-base flex flex-col overflow-hidden shadow-2xl relative" elevation="none">
      
      {/* Ambient Backdrop Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(151,217,196,0.08)_0%,_transparent_50%)] pointer-events-none" />
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-aqua-light/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Message Feed - Chat Mode */}
      <div 
        ref={scrollRef}
        className={`flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-8 lg:px-20 no-scrollbar transition-all duration-700 ${flowStep === 'landing' ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 scale-100'}`}
      >
        <div className="max-w-3xl mx-auto py-6 md:py-12 lg:py-20 space-y-6 md:space-y-12">
          {/* Mode Indicator at top of chat */}
          {messages.length > 0 && (
            <div className="flex items-center justify-center gap-2 pb-2 md:pb-4 animate-in fade-in duration-500">
              <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-full bg-[#1a1a2e] border border-aqua-light/30 shadow-lg">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-aqua-light rounded-full animate-pulse" />
                <span className="text-[10px] md:text-xs font-semibold text-aqua-light uppercase tracking-wide font-ui">
                  {currentMode === 'guide' && 'Guidance'}
                  {currentMode === 'journal' && 'Journaling'}
                  {currentMode === 'deep-search' && 'Deep Search'}
                  {currentMode === 'creative' && 'Creative'}
                </span>
                <span className="hidden sm:inline text-xs text-moonlight-muted font-body">• {personality}</span>
              </div>
            </div>
          )}
          
          {messages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-3 duration-500`}>
              {m.role === 'assistant' && (
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-aqua-light">
                    <Icons.MiraLogoSmall />
                  </div>
                  <span className="text-xs font-bold text-aqua-light uppercase tracking-wider font-heading">Mira</span>
                  {/* Speed indicator */}
                  <span className={`transition-colors ${
                    speedMode === 'fast' ? 'text-aqua-light' : 
                    speedMode === 'deep' ? 'text-teal-light' : 
                    'text-gold-accent'
                  }`}>
                    {speedMode === 'fast' && <Icons.Lightning />}
                    {speedMode === 'deep' && <Icons.Search />}
                    {speedMode === 'creative' && <Icons.Sparkles />}
                  </span>
                </div>
              )}
              <div className={`
                max-w-[90%] md:max-w-[85%] text-sm md:text-base leading-relaxed
                ${m.role === 'user' 
                  ? 'bg-aqua-light/5 px-4 md:px-5 py-2.5 md:py-3.5 rounded-2xl text-moonlight border border-aqua-light/20 shadow-lg font-body' 
                  : 'text-moonlight-soft font-body'}
              `}>
                {m.content}
                {m.isStreaming && <span className="inline-block w-1 h-5 bg-aqua-light ml-1.5 animate-pulse align-middle rounded-sm" />}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex flex-col items-start gap-3 animate-in fade-in duration-300">
               <div className="flex items-center gap-3">
                  <div className="text-aqua-light/50">
                    <Icons.MiraLogoSmall />
                  </div>
                  <span className="text-xs font-semibold text-moonlight-muted uppercase tracking-wide font-body">Thinking...</span>
               </div>
               <div className="flex gap-1.5 ml-10">
                 <div className="w-2 h-2 bg-aqua-light rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                 <div className="w-2 h-2 bg-aqua-light rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                 <div className="w-2 h-2 bg-aqua-light rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Landing Visuals - Grok Style */}
      {flowStep === 'landing' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 transition-all duration-1000">
          <div className="mb-20 md:mb-28 flex flex-col items-center gap-4 md:gap-6 lg:gap-8 animate-in fade-in zoom-in duration-1000">
             {/* Mira Logo/Icon */}
             <div className="text-aqua-light hover:scale-105 transition-transform duration-500 cursor-pointer scale-75 md:scale-100">
               <Icons.MiraLogo />
             </div>
             
             {/* Title & Subtitle */}
             <div className="text-center space-y-2 md:space-y-3 px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-moonlight tracking-tight font-heading">
                  Mira
                </h1>
                <p className="text-xs md:text-sm font-medium text-moonlight-muted tracking-wide font-body max-w-xs md:max-w-md px-4">
                  Your emotionally intelligent AI guide. Ask me anything—journal, explore ideas, or search the collective wisdom.
                </p>
             </div>
             
             {/* Conversation Starters */}
             <div className="mt-2 md:mt-4 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 px-4">
                <p className="text-[10px] md:text-xs font-semibold text-aqua-light/60 uppercase tracking-wider text-center mb-1 font-ui">Try asking:</p>
                <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 max-w-xs md:max-w-2xl">
                   {[
                     "How can I cultivate more presence?",
                     "What practices align with my intention?",
                     "Help me reflect on my growth"
                   ].map((starter, idx) => (
                     <button
                       key={idx}
                       onClick={() => { setInputValue(starter); inputRef.current?.focus(); }}
                       className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#1a1a2e] hover:bg-[#16161f] border border-white/10 hover:border-aqua-light/30 text-[11px] md:text-xs text-moonlight-muted hover:text-moonlight transition-all duration-300 font-body active:scale-95"
                     >
                       {starter}
                     </button>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Grok-Style Input Module */}
      <div className={`
        w-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-10
        ${flowStep === 'landing' ? 'absolute bottom-[12%] md:bottom-[15%]' : 'pb-4 md:pb-8 pt-4 md:pt-6 bg-gradient-to-t from-abyss-base via-abyss-base to-transparent backdrop-blur-xl border-t border-white/5'}
      `}>
        <div className="max-w-4xl mx-auto px-3 md:px-6 lg:px-8 flex flex-col items-center gap-3 md:gap-6 overflow-visible">
          
          {/* Chat Mode Controls */}
          {flowStep === 'chat' && messages.length > 0 && (
            <div className="w-full flex items-center justify-between mb-1 md:mb-2">
              <button
                onClick={() => {
                  setMessages([]);
                  setFlowStep('landing');
                  setInputValue('');
                }}
                className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-full bg-[#1a1a2e] hover:bg-[#16161f] border border-white/10 hover:border-aqua-light/40 text-xs md:text-sm text-moonlight-muted hover:text-aqua-light transition-all font-body shadow-lg active:scale-95"
              >
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                <span className="hidden sm:inline">New Conversation</span>
                <span className="sm:hidden">New</span>
              </button>
              
              <div className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-1.5 md:py-2 rounded-full bg-[#1a1a2e] border border-white/5 text-[10px] md:text-xs text-moonlight-muted font-body">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-aqua-light/60 rounded-full animate-pulse" />
                {messages.length}
              </div>
            </div>
          )}
          
          {/* Core Input Bar - Grok Style */}
          <div className="w-full flex flex-col gap-2 md:gap-0">
             <div className="w-full relative group">
               {/* Voice Input Button */}
               <button 
                 className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 text-moonlight-muted/60 hover:text-aqua-light transition-all z-10 hover:scale-110 active:scale-95 duration-200"
                 title="Voice input (coming soon)"
               >
                 <Icons.Voice />
               </button>

               {/* Input Field */}
               <input
                 ref={inputRef}
                 type="text"
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                 placeholder={
                   currentMode === 'journal' ? "What's on your mind today?" :
                   currentMode === 'deep-search' ? "What would you like to explore?" :
                   currentMode === 'creative' ? "What shall we create together?" :
                   flowStep === 'landing' ? "What do you want to know?" : "Ask Mira anything..."
                 }
                 disabled={isStreaming || isThinking}
                 className="w-full bg-[#1a1a2e] border-2 border-white/10 rounded-[24px] md:rounded-[28px] pl-12 md:pl-16 pr-14 md:pr-64 py-3.5 md:py-5 text-base md:text-lg text-moonlight placeholder-moonlight-muted/50 focus:outline-none focus:border-aqua-light/50 focus:bg-[#16161f] hover:border-aqua-light/30 transition-all shadow-2xl font-body disabled:opacity-50 disabled:cursor-not-allowed"
               />

               {/* Send Button - Mobile (inside input) */}
               <button 
                 onClick={() => handleSendMessage()}
                 disabled={!inputValue.trim() || isStreaming || isThinking}
                 className={`
                   absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 md:hidden
                   ${inputValue.trim() && !isStreaming && !isThinking
                     ? 'bg-aqua-light text-abyss-base shadow-lg shadow-aqua-light/30 hover:shadow-xl hover:shadow-aqua-light/40 active:scale-95' 
                     : 'bg-white/5 text-white/20 cursor-not-allowed'}
                 `}
               >
                 <Icons.ArrowUp />
               </button>

               {/* Speed Mode Selector + Send Button - Desktop (inside input) */}
               <div className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-2">
                  {/* Speed Mode Cycle Button */}
                  <button 
                    onClick={cycleSpeedMode}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1a1a2e] hover:bg-[#16161f] border border-white/10 hover:border-aqua-light/40 transition-all group/mode shadow-lg"
                    title={
                      speedMode === 'fast' ? 'Fast Mode: Quick, concise responses' :
                      speedMode === 'deep' ? 'Deep Mode: Thorough, comprehensive analysis' :
                      'Creative Mode: Imaginative, exploratory thinking'
                    }
                  >
                    <span className={`transition-colors ${speedMode === 'fast' ? 'text-aqua-light' : speedMode === 'deep' ? 'text-teal-light' : 'text-gold-accent'}`}>
                      {speedMode === 'fast' && <Icons.Lightning />}
                      {speedMode === 'deep' && <Icons.Search />}
                      {speedMode === 'creative' && <Icons.Sparkles />}
                    </span>
                    <span className="text-sm font-semibold text-moonlight capitalize font-body">
                      {speedMode}
                    </span>
                  </button>
                  
                  {/* Send Button */}
                  <button 
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isStreaming || isThinking}
                    className={`
                      w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300
                      ${inputValue.trim() && !isStreaming && !isThinking
                        ? 'bg-aqua-light text-abyss-base shadow-lg shadow-aqua-light/30 hover:shadow-xl hover:shadow-aqua-light/40 hover:scale-105 active:scale-95' 
                        : 'bg-white/5 text-white/20 cursor-not-allowed'}
                    `}
                  >
                    <Icons.ArrowUp />
                  </button>
               </div>
             </div>

             {/* Speed Mode - Mobile (below input) */}
             <div className="md:hidden flex justify-center">
               <button 
                 onClick={cycleSpeedMode}
                 className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a2e] hover:bg-[#16161f] border border-white/10 hover:border-aqua-light/40 transition-all group/mode shadow-lg active:scale-95"
                 title={
                   speedMode === 'fast' ? 'Fast Mode: Quick, concise responses' :
                   speedMode === 'deep' ? 'Deep Mode: Thorough, comprehensive analysis' :
                   'Creative Mode: Imaginative, exploratory thinking'
                 }
               >
                 <span className={`transition-colors ${speedMode === 'fast' ? 'text-aqua-light' : speedMode === 'deep' ? 'text-teal-light' : 'text-gold-accent'}`}>
                   {speedMode === 'fast' && <Icons.Lightning />}
                   {speedMode === 'deep' && <Icons.Search />}
                   {speedMode === 'creative' && <Icons.Sparkles />}
                 </span>
                 <span className="text-sm font-semibold text-moonlight capitalize font-body">
                   {speedMode}
                 </span>
               </button>
             </div>
          </div>

          {/* Action Buttons - Landing State */}
          {flowStep === 'landing' && (
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
               <ActionButton 
                icon={<Icons.Search />} 
                label="Deep Search" 
                active={currentMode === 'deep-search'} 
                onClick={() => setCurrentMode('deep-search')} 
               />
               <ActionButton 
                icon={<Icons.Creative />} 
                label="Create Image" 
                active={currentMode === 'creative'} 
                onClick={() => setCurrentMode('creative')} 
               />
               <ActionButton 
                icon={<Icons.Journal />} 
                label="Journaling" 
                active={currentMode === 'journal'} 
                onClick={() => setCurrentMode('journal')} 
               />
               <ActionButton 
                icon={<Icons.Lens />} 
                label={`Persona: ${personality}`} 
                onClick={cyclePersonality} 
               />
            </div>
          )}
        </div>
      </div>

      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
    </Card>
  );
};
