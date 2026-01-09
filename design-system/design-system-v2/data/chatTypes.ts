// =============================================================================
// Chat Types - AUTODEV AI Chat Data Structures
// =============================================================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  context?: {
    page?: string;
    systemHealth?: number;
  };
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}

export interface ChatStorage {
  getAll(): Promise<ChatSession[]>;
  getById(id: string): Promise<ChatSession | null>;
  create(data: Omit<ChatSession, 'id' | 'createdAt' | 'updatedAt'>): Promise<ChatSession>;
  update(id: string, updates: Partial<ChatSession>): Promise<ChatSession>;
  delete(id: string): Promise<void>;
  addMessage(sessionId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<ChatMessage>;
}
