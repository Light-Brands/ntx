
import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from './Avatar';
import { Card } from './Card';
import { Button } from './Button';

interface Message {
  id: string;
  sender: 'mira' | 'user';
  text: string;
  timestamp: string;
}

export const MiraGuide: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'mira',
      text: "Greetings, architect. I am Mira. Your neural link is established. How shall we refine the abyss today?",
      timestamp: "Now"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: "Just now"
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Mira's response
    setTimeout(() => {
      const miraMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'mira',
        text: "I have processed your request through the collective resonance. Adjustments are being synchronized across all nodes.",
        timestamp: "Just now"
      };
      setMessages(prev => [...prev, miraMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-4xl h-[700px] flex flex-col p-0 overflow-hidden border-teal-light/30 shadow-[0_0_50px_rgba(4,40,47,0.8)]" elevation="deep">
      {/* Header */}
      <div className="px-8 py-6 border-b border-abyss-light bg-abyss-mystic/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 abyss-gradient-primary rounded-xl animate-neural blur-md opacity-30" />
            <div className="relative w-12 h-12 abyss-gradient-primary rounded-xl flex items-center justify-center shadow-lg transform rotate-3 animate-drift">
               <svg className="w-6 h-6 text-abyss-base" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-black text-moonlight uppercase tracking-tight leading-none">Mira Guide</h3>
            <p className="text-[10px] font-black text-aqua-light uppercase tracking-[0.3em] mt-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-aqua-light animate-pulse" />
              Neural Link Active
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-full border-0 bg-abyss-light">⚙️</Button>
          <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-full border-0 bg-abyss-light">✕</Button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 bg-[radial-gradient(circle_at_center,_var(--teal-mystic)_0%,_var(--deep-abyss)_100%)] scroll-smooth"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`flex gap-4 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <Avatar 
                size="sm" 
                src={msg.sender === 'mira' ? undefined : "https://i.pravatar.cc/150?u=me"} 
                alt={msg.sender === 'mira' ? "Mira" : "User"}
                className={msg.sender === 'mira' ? 'abyss-gradient-primary text-abyss-base' : ''}
              />
              <div className="space-y-1">
                <div className={`
                  px-6 py-4 rounded-3xl text-sm font-medium leading-relaxed
                  ${msg.sender === 'user' 
                    ? 'bg-abyss-light text-moonlight rounded-tr-none border border-teal-light/20' 
                    : 'bg-abyss-mystic/80 backdrop-blur-md text-pearl rounded-tl-none border border-aqua-light/10 shadow-xl'}
                `}>
                  {msg.text}
                </div>
                <p className={`text-[9px] font-black text-muted uppercase tracking-widest px-2 opacity-40 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="flex gap-4">
              <Avatar size="sm" className="abyss-gradient-primary text-abyss-base" />
              <div className="bg-abyss-mystic/80 backdrop-blur-md px-6 py-4 rounded-3xl rounded-tl-none border border-aqua-light/10">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-aqua-light rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-aqua-light rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                  <div className="w-1.5 h-1.5 bg-aqua-light rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-8 border-t border-abyss-light bg-abyss-mystic/30">
        {/* Quick Actions */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2 no-scrollbar">
          {[
            "Establish new circle",
            "Review resonance logs",
            "Optimize neural output",
            "Sync collective metadata"
          ].map(action => (
            <button 
              key={action}
              onClick={() => setInputValue(action)}
              className="whitespace-nowrap px-4 py-2 rounded-full border border-abyss-light bg-abyss-base text-[10px] font-black text-muted uppercase tracking-widest hover:border-aqua-light hover:text-aqua-light transition-all duration-300"
            >
              {action}
            </button>
          ))}
        </div>

        <div className="relative flex items-center">
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Channel your frequency..."
            className="w-full bg-abyss-base border border-abyss-light rounded-2xl pl-6 pr-16 py-5 text-pearl focus:outline-none focus:border-aqua-light focus:ring-4 focus:ring-aqua-light/5 transition-all"
          />
          <button 
            onClick={handleSend}
            className="absolute right-3 w-12 h-12 abyss-gradient-primary rounded-xl flex items-center justify-center text-abyss-base shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <p className="text-center text-[9px] font-black text-muted uppercase tracking-[0.4em] mt-4 opacity-30">
          Powered by Abyss Neural Engine v2.5
        </p>
      </div>
    </Card>
  );
};
