import { NextRequest, NextResponse } from 'next/server';
import { QueueItem, QueueItemStatus } from '@/types';

// In-memory queue storage (in production, use Redis or database)
let queue: QueueItem[] = [];
let isProcessing = false;

// Generate unique ID
function generateId(): string {
  return `queue-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// GET - Get all queue items
export async function GET() {
  return NextResponse.json({ queue });
}

// POST - Add items to queue
export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();
    
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items array is required' },
        { status: 400 }
      );
    }

    const newItems: QueueItem[] = items.map((item: { topic: string; category: string }) => ({
      id: generateId(),
      topic: item.topic.trim(),
      category: item.category || 'technology',
      status: QueueItemStatus.PENDING,
      createdAt: new Date().toISOString(),
    }));

    queue.push(...newItems);

    // Start processing if not already processing
    if (!isProcessing) {
      processQueue();
    }

    return NextResponse.json({ 
      success: true, 
      added: newItems.length,
      queue: queue 
    });
  } catch (error) {
    console.error('Error adding to queue:', error);
    return NextResponse.json(
      { error: 'Failed to add items to queue' },
      { status: 500 }
    );
  }
}

// DELETE - Remove item from queue
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      );
    }

    queue = queue.filter(item => item.id !== id);
    return NextResponse.json({ success: true, queue });
  } catch (error) {
    console.error('Error removing from queue:', error);
    return NextResponse.json(
      { error: 'Failed to remove item from queue' },
      { status: 500 }
    );
  }
}

// Process queue items one by one
async function processQueue() {
  if (isProcessing) return;
  
  isProcessing = true;
  console.log('🚀 Starting queue processing...');

  while (queue.some(item => item.status === QueueItemStatus.PENDING)) {
    const nextItem = queue.find(item => item.status === QueueItemStatus.PENDING);
    if (!nextItem) break;

    try {
      // Update status to processing
      nextItem.status = QueueItemStatus.PROCESSING;
      nextItem.startedAt = new Date().toISOString();
      nextItem.progress = 0;

      console.log(`\n📝 Processing: "${nextItem.topic}"`);

      // Step 1: Generate text
      nextItem.status = QueueItemStatus.GENERATING_TEXT;
      nextItem.progress = 20;
      
      // Construct base URL for internal API calls
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
      
      const textResponse = await fetch(`${baseUrl}/api/generate-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: nextItem.topic,
          category: nextItem.category,
          provider: 'gemini-2.0-flash',
        }),
      });

      if (!textResponse.ok) {
        const errorData = await textResponse.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate text');
      }

      const textData = await textResponse.json();
      nextItem.progress = 50;

      // Step 2: Generate image
      nextItem.status = QueueItemStatus.GENERATING_IMAGE;
      nextItem.progress = 60;

      const imageResponse = await fetch(`${baseUrl}/api/generate-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: textData.title,
          summary: textData.summary,
          content: textData.content,
          category: textData.category || nextItem.category,
          imageModel: 'gemini-2.5-flash-image',
        }),
      });

      if (!imageResponse.ok) {
        const errorData = await imageResponse.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const imageData = await imageResponse.json();
      nextItem.progress = 80;

      // Step 3: Save post
      const postData = {
        title: textData.title,
        summary: textData.summary,
        content: textData.content,
        category: textData.category || nextItem.category,
        tags: [],
        thumbnailUrl: imageData.imageUrl,
        status: 'draft',
      };

      const saveResponse = await fetch(`${baseUrl}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to save post');
      }

      const savedPost = await saveResponse.json();
      nextItem.progress = 100;
      nextItem.status = QueueItemStatus.COMPLETED;
      nextItem.completedAt = new Date().toISOString();
      nextItem.result = savedPost.post;

      console.log(`✅ Completed: "${nextItem.topic}"`);

      // Small delay between items
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`❌ Failed to process "${nextItem.topic}":`, error);
      nextItem.status = QueueItemStatus.FAILED;
      nextItem.error = error instanceof Error ? error.message : 'Unknown error';
      nextItem.completedAt = new Date().toISOString();
    }
  }

  isProcessing = false;
  console.log('✅ Queue processing complete');
}
