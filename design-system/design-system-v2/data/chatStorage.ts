// =============================================================================
// Chat Storage - localStorage implementation for AUTODEV AI Chat
// =============================================================================

import type { ChatSession, ChatMessage, ChatStorage } from './chatTypes';

const STORAGE_KEY = 'vibeup-autodev-chats';

// Generate a simple UUID
function generateId(): string {
  return `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Generate title from first user message
function generateTitle(messages: ChatMessage[]): string {
  const firstUserMessage = messages.find(m => m.role === 'user');
  if (firstUserMessage) {
    const content = firstUserMessage.content.trim();
    return content.length > 40 ? content.slice(0, 40) + '...' : content;
  }
  return 'New Conversation';
}

// localStorage implementation
class LocalStorageChatStorage implements ChatStorage {
  private getSessions(): ChatSession[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      console.error('Failed to read chats from localStorage');
      return [];
    }
  }

  private saveSessions(sessions: ChatSession[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to save chats to localStorage', e);
    }
  }

  async getAll(): Promise<ChatSession[]> {
    return this.getSessions().sort((a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  async getById(id: string): Promise<ChatSession | null> {
    const sessions = this.getSessions();
    return sessions.find(s => s.id === id) || null;
  }

  async create(data: Omit<ChatSession, 'id' | 'createdAt' | 'updatedAt'>): Promise<ChatSession> {
    const sessions = this.getSessions();
    const now = new Date().toISOString();

    const newSession: ChatSession = {
      ...data,
      id: generateId(),
      title: data.title || generateTitle(data.messages),
      createdAt: now,
      updatedAt: now,
    };

    sessions.push(newSession);
    this.saveSessions(sessions);
    return newSession;
  }

  async update(id: string, updates: Partial<ChatSession>): Promise<ChatSession> {
    const sessions = this.getSessions();
    const index = sessions.findIndex(s => s.id === id);

    if (index === -1) {
      throw new Error(`Chat session not found: ${id}`);
    }

    const updatedSession: ChatSession = {
      ...sessions[index],
      ...updates,
      id: sessions[index].id,
      createdAt: sessions[index].createdAt,
      updatedAt: new Date().toISOString(),
    };

    // Auto-update title if it was "New Conversation"
    if (updatedSession.title === 'New Conversation' && updatedSession.messages.length > 0) {
      updatedSession.title = generateTitle(updatedSession.messages);
    }

    sessions[index] = updatedSession;
    this.saveSessions(sessions);
    return updatedSession;
  }

  async delete(id: string): Promise<void> {
    const sessions = this.getSessions();
    const filtered = sessions.filter(s => s.id !== id);
    this.saveSessions(filtered);
  }

  async addMessage(sessionId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<ChatMessage> {
    const sessions = this.getSessions();
    const index = sessions.findIndex(s => s.id === sessionId);

    if (index === -1) {
      throw new Error(`Chat session not found: ${sessionId}`);
    }

    const newMessage: ChatMessage = {
      ...message,
      id: generateMessageId(),
      timestamp: new Date().toISOString(),
    };

    sessions[index].messages.push(newMessage);
    sessions[index].updatedAt = new Date().toISOString();

    // Update title if this is the first user message
    if (sessions[index].title === 'New Conversation') {
      sessions[index].title = generateTitle(sessions[index].messages);
    }

    this.saveSessions(sessions);
    return newMessage;
  }
}

// Export singleton instance
export const chatStorage = new LocalStorageChatStorage();

// Helper functions
export async function getRecentChats(limit: number = 10): Promise<ChatSession[]> {
  const all = await chatStorage.getAll();
  return all.filter(s => !s.isArchived).slice(0, limit);
}

export async function getArchivedChats(): Promise<ChatSession[]> {
  const all = await chatStorage.getAll();
  return all.filter(s => s.isArchived);
}

export async function getChatStats(): Promise<{
  total: number;
  active: number;
  archived: number;
  totalMessages: number;
}> {
  const all = await chatStorage.getAll();

  return {
    total: all.length,
    active: all.filter(s => !s.isArchived).length,
    archived: all.filter(s => s.isArchived).length,
    totalMessages: all.reduce((acc, s) => acc + s.messages.length, 0),
  };
}

export async function archiveChat(id: string): Promise<void> {
  await chatStorage.update(id, { isArchived: true });
}

export async function unarchiveChat(id: string): Promise<void> {
  await chatStorage.update(id, { isArchived: false });
}
