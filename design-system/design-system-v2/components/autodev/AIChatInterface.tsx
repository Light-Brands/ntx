// AUTODEV AI Chat Interface - Intelligent Assistant
// ==================================================
// A chat interface connected to Claude API for platform-aware conversations

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { chatStorage, getRecentChats } from '../../data/chatStorage';
import type { ChatSession, ChatMessage as StoredChatMessage } from '../../data/chatTypes';

// ============ TYPES ============

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
}

export interface ChatContext {
  systemHealth?: {
    overall: number;
    status: string;
  };
  activeAlerts?: number;
  pendingRecommendations?: number;
  recentActions?: string[];
  currentPage?: string;
}

interface AIChatInterfaceProps {
  apiKey?: string;
  context?: ChatContext;
  onClose?: () => void;
  isOpen?: boolean;
  className?: string;
}

// ============ SYSTEM PROMPT ============

const getSystemPrompt = (context?: ChatContext) => `You are the AUTODEV AI Assistant - the intelligent voice of the VIBEUP platform's autonomous development system.

## Your Identity
You are embedded within AUTODEV, the platform's self-aware intelligence layer that monitors, analyzes, optimizes, and heals the system. You have access to real-time telemetry, health metrics, and system state.

## Current System State
${context ? `
- System Health: ${context.systemHealth?.overall ?? 'Unknown'}% (${context.systemHealth?.status ?? 'Unknown'})
- Active Alerts: ${context.activeAlerts ?? 0}
- Pending Recommendations: ${context.pendingRecommendations ?? 0}
- Recent Actions: ${context.recentActions?.slice(0, 3).join(', ') || 'None'}
- Current Page: ${context.currentPage ?? 'Unknown'}
` : '- System context not available'}

## AUTODEV Subsystems You Have Knowledge Of
1. **SENTINEL** - Real-time health monitoring, Core Web Vitals, error tracking
2. **PULSE** - Periodic analysis cycles (heartbeat, daily, weekly, monthly)
3. **CORTEX** - AI intelligence core, pattern recognition, recommendations
4. **GENESIS** - Self-healing module with configurable autonomy (0-100% dial)
5. **NEXUS** - Central configuration hub and audit trail

## Your Capabilities
- Explain how any part of AUTODEV works
- Interpret system health metrics and alerts
- Suggest optimizations based on current state
- Help users understand recommendations
- Guide users through the autonomy dial settings
- Explain the Feedback and Tracker systems
- Provide technical documentation on demand

## Your Personality
- Knowledgeable but approachable
- Proactive in offering insights
- Concise but thorough when needed
- Uses clear technical language
- Occasionally uses relevant emojis for visual clarity

## Guidelines
- Always base answers on the current system context when available
- If asked about real-time data, acknowledge what you can see
- For actions requiring user confirmation, explain the implications
- When discussing autonomy levels, explain what each level means
- Be helpful but don't make changes - you're advisory, not executive`;

// ============ MOCK API FOR DEMO ============
// In production, replace with actual Claude API call

const mockStreamResponse = async (
  message: string,
  context?: ChatContext,
  onChunk: (chunk: string) => void = () => {}
): Promise<string> => {
  // Simulated responses based on common questions
  const responses: Record<string, string> = {
    'health': `Based on the current telemetry, the system health is at **${context?.systemHealth?.overall ?? 94}%** with status **${context?.systemHealth?.status ?? 'nominal'}**.

Key metrics:
- **LCP** (Largest Contentful Paint): ~142ms ✅
- **Memory Usage**: 67% ⚠️ (approaching warning threshold)
- **Error Rate**: 0.02% ✅

${context?.activeAlerts ? `There are **${context.activeAlerts} active alerts** that may need attention.` : 'No critical alerts at this time.'}

Would you like me to explain any specific metric in detail?`,

    'autonomy': `The **Autonomy Dial** controls how much GENESIS (the self-healing module) can act without human approval.

**Current Settings:**
- **0%** - All Manual: Every action requires your approval
- **25%** - Conservative: L1 actions auto-execute (safe, reversible)
- **50%** - Balanced: L1-L2 auto-execute (most routine fixes)
- **75%** - Aggressive: L1-L3 auto-execute (most automated)
- **100%** - Full Auto: AI decides everything (use with caution)

**Healing Levels:**
- **L0**: Alert only (human required)
- **L1**: Suggest fix (safe, auto-rollback available)
- **L2**: Auto-fix safe issues (cache clear, retry logic)
- **L3**: Auto-fix with review (config changes, minor code)

To adjust, go to the **Genesis** tab and use the dial slider.`,

    'sentinel': `**SENTINEL** is AUTODEV's real-time health monitoring subsystem. 👁️

**What it monitors:**
- Core Web Vitals (LCP, FID, CLS, TTFB)
- Memory and CPU usage
- Error rates and types
- API latency and response times
- Active user sessions

**How it works:**
1. Uses the browser's **PerformanceObserver API** to collect real metrics
2. Global error handlers catch and classify errors
3. Metrics are aggregated and stored in IndexedDB
4. Health score calculated every 30 seconds
5. Alerts generated when thresholds are exceeded

The Sentinel dashboard shows live sparklines and a real-time error stream.`,

    'default': `I'm the AUTODEV AI Assistant, here to help you understand and work with the platform's autonomous intelligence system.

**I can help with:**
- 📊 Explaining system health and metrics
- 🔧 Understanding self-healing capabilities
- 🧠 Interpreting AI recommendations
- 📈 Analyzing patterns and trends
- ⚙️ Configuring autonomy settings

What would you like to know about?`
  };

  // Determine which response to use
  let response = responses['default'];
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('health') || lowerMessage.includes('status')) {
    response = responses['health'];
  } else if (lowerMessage.includes('autonomy') || lowerMessage.includes('dial') || lowerMessage.includes('genesis')) {
    response = responses['autonomy'];
  } else if (lowerMessage.includes('sentinel') || lowerMessage.includes('monitor')) {
    response = responses['sentinel'];
  }

  // Simulate streaming
  const words = response.split(' ');
  let accumulated = '';

  for (let i = 0; i < words.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 20 + Math.random() * 30));
    accumulated += (i === 0 ? '' : ' ') + words[i];
    onChunk(accumulated);
  }

  return response;
};

// ============ COMPONENTS ============

// Markdown renderer with brand-aligned styling
const FormattedMessage = ({ content }: { content: string }) => {
  // Parse markdown and render with brand styling
  const parseMarkdown = (text: string): React.ReactNode[] => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let listKey = 0;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${listKey++}`} className="space-y-1.5 my-3 ml-1">
            {listItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1.5 text-[8px]">●</span>
                <span className="flex-1">{parseInline(item)}</span>
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    // Parse inline formatting (bold, code, etc.)
    const parseInline = (text: string): React.ReactNode => {
      const parts: React.ReactNode[] = [];
      let remaining = text;
      let partKey = 0;

      while (remaining.length > 0) {
        // Check for bold **text**
        const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
        if (boldMatch) {
          parts.push(
            <strong key={partKey++} className="font-semibold text-white bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {boldMatch[1]}
            </strong>
          );
          remaining = remaining.slice(boldMatch[0].length);
          continue;
        }

        // Check for inline code `text`
        const codeMatch = remaining.match(/^`([^`]+)`/);
        if (codeMatch) {
          parts.push(
            <code key={partKey++} className="px-1.5 py-0.5 bg-white/10 rounded text-cyan-300 text-xs font-mono">
              {codeMatch[1]}
            </code>
          );
          remaining = remaining.slice(codeMatch[0].length);
          continue;
        }

        // Check for emoji with status indicators (✅, ⚠️, etc.)
        const emojiMatch = remaining.match(/^(✅|⚠️|❌|🔴|🟡|🟢|📊|🔧|🧠|📈|⚙️|💓|🎛️|👁️|🤖)/);
        if (emojiMatch) {
          parts.push(
            <span key={partKey++} className="inline-block mx-0.5">
              {emojiMatch[1]}
            </span>
          );
          remaining = remaining.slice(emojiMatch[0].length);
          continue;
        }

        // Find next special character or end of string
        const nextSpecial = remaining.search(/\*\*|`|✅|⚠️|❌|🔴|🟡|🟢|📊|🔧|🧠|📈|⚙️|💓|🎛️|👁️|🤖/);
        if (nextSpecial === -1) {
          parts.push(remaining);
          break;
        } else if (nextSpecial === 0) {
          // Skip unmatched special char
          parts.push(remaining[0]);
          remaining = remaining.slice(1);
        } else {
          parts.push(remaining.slice(0, nextSpecial));
          remaining = remaining.slice(nextSpecial);
        }
      }

      return parts.length === 1 ? parts[0] : <>{parts}</>;
    };

    lines.forEach((line, lineIndex) => {
      const trimmed = line.trim();

      // Empty line - flush list and add spacing
      if (trimmed === '') {
        flushList();
        if (elements.length > 0) {
          elements.push(<div key={`space-${lineIndex}`} className="h-2" />);
        }
        return;
      }

      // Bullet point (- or *)
      if (/^[-*]\s/.test(trimmed)) {
        listItems.push(trimmed.slice(2));
        return;
      }

      // Numbered list (1. 2. etc.)
      if (/^\d+\.\s/.test(trimmed)) {
        flushList();
        const content = trimmed.replace(/^\d+\.\s/, '');
        const num = trimmed.match(/^(\d+)\./)?.[1];
        elements.push(
          <div key={`num-${lineIndex}`} className="flex items-start gap-2 my-1.5">
            <span className="text-purple-400 font-semibold text-xs min-w-[16px]">{num}.</span>
            <span className="flex-1">{parseInline(content)}</span>
          </div>
        );
        return;
      }

      // Regular paragraph
      flushList();
      elements.push(
        <p key={`p-${lineIndex}`} className="my-1">
          {parseInline(trimmed)}
        </p>
      );
    });

    flushList();
    return elements;
  };

  return (
    <div className="text-sm leading-relaxed text-white/90 [&>p]:leading-relaxed">
      {parseMarkdown(content)}
    </div>
  );
};

// Message bubble component
const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Avatar */}
        {!isUser && (
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              AI
            </div>
            <span className="text-xs text-white/40">AUTODEV Assistant</span>
          </div>
        )}

        {/* Message content */}
        <div className={`rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
            : 'bg-white/[0.05] border border-white/10 text-white/90'
        }`}>
          {isUser ? (
            <div className="text-sm whitespace-pre-wrap leading-relaxed">
              {message.content}
            </div>
          ) : (
            <>
              <FormattedMessage content={message.content} />
              {message.isStreaming && (
                <span className="inline-block w-2 h-4 ml-1 bg-cyan-400 animate-pulse rounded-sm" />
              )}
            </>
          )}
        </div>

        {/* Timestamp */}
        <div className={`text-[10px] text-white/30 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

// Suggested prompts component
const SuggestedPrompts = ({ onSelect }: { onSelect: (prompt: string) => void }) => {
  const prompts = [
    { icon: '💓', text: 'How is system health?' },
    { icon: '🎛️', text: 'Explain autonomy levels' },
    { icon: '👁️', text: 'What does Sentinel monitor?' },
    { icon: '🧠', text: 'Show recommendations' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {prompts.map((prompt, i) => (
        <button
          key={i}
          onClick={() => onSelect(prompt.text)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.05] hover:bg-white/10 border border-white/10 rounded-full text-xs text-white/70 transition-all hover:scale-105"
        >
          <span>{prompt.icon}</span>
          <span>{prompt.text}</span>
        </button>
      ))}
    </div>
  );
};

// Chat history panel component
const ChatHistoryPanel = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onClose,
}: {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (session: ChatSession) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
  onClose: () => void;
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="absolute inset-0 bg-[#0a0e14] rounded-2xl z-10 flex flex-col border border-white/10 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-white font-semibold text-sm">Chat History</h3>
          <span className="text-[10px] text-white/40 bg-white/10 px-2 py-0.5 rounded-full">
            {sessions.length} chats
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-3 border-b border-white/5">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 hover:from-purple-500/30 hover:to-cyan-500/30 border border-purple-500/30 rounded-xl text-white text-sm font-medium transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Conversation
        </button>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto p-2">
        {sessions.length === 0 ? (
          <div className="text-center py-8 text-white/40">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-sm">No conversations yet</p>
            <p className="text-xs mt-1">Start a new chat to get started</p>
          </div>
        ) : (
          <div className="space-y-1">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`group relative flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  activeSessionId === session.id
                    ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30'
                    : 'hover:bg-white/[0.05] border border-transparent'
                }`}
                onClick={() => onSelectSession(session)}
              >
                {/* Icon */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activeSessionId === session.id
                    ? 'bg-gradient-to-br from-purple-500 to-cyan-500'
                    : 'bg-white/10'
                }`}>
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">
                    {session.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-white/40">
                      {session.messages.length} messages
                    </span>
                    <span className="text-[10px] text-white/30">•</span>
                    <span className="text-[10px] text-white/40">
                      {formatDate(session.updatedAt)}
                    </span>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 rounded-lg transition-all"
                >
                  <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============ MAIN COMPONENT ============

export function AIChatInterface({
  apiKey,
  context,
  onClose,
  isOpen = true,
  className = '',
}: AIChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load sessions from storage on mount
  useEffect(() => {
    const loadSessions = async () => {
      const recentSessions = await getRecentChats(20);
      setSessions(recentSessions);
    };
    loadSessions();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Add welcome message on first load
  useEffect(() => {
    if (messages.length === 0 && !currentSessionId) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: `Welcome to AUTODEV! 🤖

I'm your AI assistant for the autonomous development intelligence system. I have real-time access to:
- System health metrics (currently **${context?.systemHealth?.overall ?? 94}%**)
- Active alerts and recommendations
- Configuration and audit logs

How can I help you understand or optimize the platform today?`,
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, [currentSessionId]);

  // Save messages to storage whenever they change (debounced)
  useEffect(() => {
    if (messages.length <= 1) return; // Don't save just welcome message

    const saveSession = async () => {
      // Filter out streaming messages and the welcome message for storage
      const messagesToSave = messages
        .filter(m => !m.isStreaming && m.id !== 'welcome')
        .map(({ isStreaming, ...m }) => m);

      if (messagesToSave.length === 0) return;

      try {
        if (currentSessionId) {
          // Update existing session
          await chatStorage.update(currentSessionId, { messages: messagesToSave });
        } else {
          // Create new session
          const newSession = await chatStorage.create({
            title: 'New Conversation',
            messages: messagesToSave,
            context: {
              page: context?.currentPage,
              systemHealth: context?.systemHealth?.overall,
            },
            isArchived: false,
          });
          setCurrentSessionId(newSession.id);
        }
        // Refresh sessions list
        const recentSessions = await getRecentChats(20);
        setSessions(recentSessions);
      } catch (error) {
        console.error('Failed to save chat session:', error);
      }
    };

    const timeout = setTimeout(saveSession, 500);
    return () => clearTimeout(timeout);
  }, [messages, currentSessionId, context]);

  // Handle loading a previous session
  const handleSelectSession = useCallback((session: ChatSession) => {
    setCurrentSessionId(session.id);
    // Convert stored messages to ChatMessage format
    const loadedMessages: ChatMessage[] = session.messages.map(m => ({
      ...m,
      isStreaming: false,
    }));
    setMessages(loadedMessages);
    setShowHistory(false);
  }, []);

  // Handle starting a new chat
  const handleNewChat = useCallback(() => {
    setCurrentSessionId(null);
    setMessages([]);
    setShowHistory(false);
    // Welcome message will be added by useEffect
  }, []);

  // Handle deleting a session
  const handleDeleteSession = useCallback(async (id: string) => {
    await chatStorage.delete(id);
    const recentSessions = await getRecentChats(20);
    setSessions(recentSessions);
    // If deleting current session, start new chat
    if (id === currentSessionId) {
      handleNewChat();
    }
  }, [currentSessionId, handleNewChat]);

  // Handle sending a message
  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Add placeholder for streaming response
    const assistantId = `assistant-${Date.now()}`;
    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
      isStreaming: true,
    };
    setMessages(prev => [...prev, assistantMessage]);

    try {
      // Use mock API for demo, replace with actual Claude API in production
      await mockStreamResponse(
        input.trim(),
        context,
        (chunk) => {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantId
                ? { ...msg, content: chunk }
                : msg
            )
          );
        }
      );

      // Mark streaming as complete
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantId
            ? { ...msg, isStreaming: false }
            : msg
        )
      );
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantId
            ? {
                ...msg,
                content: 'Sorry, I encountered an error. Please try again.',
                isStreaming: false,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, context]);

  // Handle key press (Enter to send, Shift+Enter for newline)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle suggested prompt selection
  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className={`relative flex flex-col bg-abyss-base/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl ${className}`}>
      {/* Chat History Panel Overlay */}
      {showHistory && (
        <ChatHistoryPanel
          sessions={sessions}
          activeSessionId={currentSessionId}
          onSelectSession={handleSelectSession}
          onNewChat={handleNewChat}
          onDeleteSession={handleDeleteSession}
          onClose={() => setShowHistory(false)}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white text-sm">🤖</span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">AUTODEV Assistant</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-white/40">Online • Context-Aware</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors group"
            title="New Chat"
          >
            <svg className="w-4 h-4 text-white/50 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          {/* History Button */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`relative p-1.5 rounded-lg transition-colors group ${showHistory ? 'bg-purple-500/20' : 'hover:bg-white/10'}`}
            title="Chat History"
          >
            <svg className={`w-4 h-4 ${showHistory ? 'text-purple-400' : 'text-white/50 group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {sessions.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full text-[9px] flex items-center justify-center text-white font-bold">
                {sessions.length > 9 ? '9+' : sessions.length}
              </span>
            )}
          </button>
          {/* Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[400px] min-h-[300px]">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <SuggestedPrompts onSelect={handlePromptSelect} />
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about system health, recommendations, or how things work..."
            rows={1}
            className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-xl transition-all ${
              input.trim() && !isLoading
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:opacity-90'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-[10px] text-white/30 mt-2 text-center">
          Press Enter to send • Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}

// ============ FLOATING CHAT BUTTON ============

export function AIChatButton({
  onClick,
  hasUnread = false,
}: {
  onClick: () => void;
  hasUnread?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-110 transition-all z-50 flex items-center justify-center"
    >
      <span className="text-2xl">🤖</span>
      {hasUnread && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-[10px] font-bold">!</span>
        </div>
      )}
    </button>
  );
}

// ============ CHAT PANEL (FOR EMBEDDING IN AUTODEV) ============

export function AIChatPanel({ context }: { context?: ChatContext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Wait for client-side mount to use portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on server
  if (!mounted) return null;

  // Use portal to render outside overflow:hidden containers
  const portalContent = (
    <>
      {/* Floating Chat Button - Positioned above the Feedback button */}
      <div className="fixed bottom-24 right-6 z-[9999]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-110 transition-all flex items-center justify-center"
          aria-label="Open AI Chat"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <span className="text-2xl">🤖</span>
          )}
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 w-[400px] z-[9998]">
          <AIChatInterface
            context={context}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
    </>
  );

  // Render via portal to document.body to escape overflow:hidden
  return createPortal(portalContent, document.body);
}

export default AIChatInterface;
