// =============================================================================
// Feedback Storage - localStorage implementation (API-ready structure)
// =============================================================================

import type { FeedbackItem, FeedbackStorage } from './feedbackTypes';

const STORAGE_KEY = 'vibeup-feedback';

// Generate a simple UUID
function generateId(): string {
  return `fb-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// localStorage implementation
class LocalStorageFeedbackStorage implements FeedbackStorage {
  private getItems(): FeedbackItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      console.error('Failed to read feedback from localStorage');
      return [];
    }
  }

  private saveItems(items: FeedbackItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save feedback to localStorage', e);
    }
  }

  async getAll(): Promise<FeedbackItem[]> {
    return this.getItems();
  }

  async getById(id: string): Promise<FeedbackItem | null> {
    const items = this.getItems();
    return items.find(item => item.id === id) || null;
  }

  async create(data: Omit<FeedbackItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<FeedbackItem> {
    const items = this.getItems();
    const now = new Date().toISOString();

    const newItem: FeedbackItem = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };

    items.push(newItem);
    this.saveItems(items);
    return newItem;
  }

  async update(id: string, updates: Partial<FeedbackItem>): Promise<FeedbackItem> {
    const items = this.getItems();
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
      throw new Error(`Feedback item not found: ${id}`);
    }

    const updatedItem: FeedbackItem = {
      ...items[index],
      ...updates,
      id: items[index].id, // Prevent id override
      createdAt: items[index].createdAt, // Prevent createdAt override
      updatedAt: new Date().toISOString(),
    };

    items[index] = updatedItem;
    this.saveItems(items);
    return updatedItem;
  }

  async delete(id: string): Promise<void> {
    const items = this.getItems();
    const filtered = items.filter(item => item.id !== id);
    this.saveItems(filtered);
  }
}

// Export singleton instance
export const feedbackStorage = new LocalStorageFeedbackStorage();

// Helper functions for common operations
export async function getPageFeedback(pageId: string): Promise<FeedbackItem[]> {
  const all = await feedbackStorage.getAll();
  return all.filter(item => item.pageId === pageId);
}

export async function getNewFeedbackCount(): Promise<number> {
  const all = await feedbackStorage.getAll();
  return all.filter(item => item.status === 'new').length;
}

export async function getFeedbackStats(): Promise<{
  total: number;
  new: number;
  inProgress: number;
  resolved: number;
  blocked: number;
  byCategory: Record<string, number>;
  byPage: Record<string, number>;
}> {
  const all = await feedbackStorage.getAll();

  const stats = {
    total: all.length,
    new: 0,
    inProgress: 0,
    resolved: 0,
    blocked: 0,
    byCategory: {} as Record<string, number>,
    byPage: {} as Record<string, number>,
  };

  for (const item of all) {
    // Status counts
    switch (item.status) {
      case 'new': stats.new++; break;
      case 'in-progress': stats.inProgress++; break;
      case 'resolved': stats.resolved++; break;
      case 'blocked': stats.blocked++; break;
    }

    // Category counts
    stats.byCategory[item.category] = (stats.byCategory[item.category] || 0) + 1;

    // Page counts
    stats.byPage[item.pageId] = (stats.byPage[item.pageId] || 0) + 1;
  }

  return stats;
}

// Export for bulk operations (useful for import/export)
export async function exportAllFeedback(): Promise<string> {
  const all = await feedbackStorage.getAll();
  return JSON.stringify(all, null, 2);
}

export async function importFeedback(jsonString: string): Promise<number> {
  const items: FeedbackItem[] = JSON.parse(jsonString);
  let imported = 0;

  for (const item of items) {
    // Skip if id already exists
    const existing = await feedbackStorage.getById(item.id);
    if (!existing) {
      await feedbackStorage.create(item);
      imported++;
    }
  }

  return imported;
}
