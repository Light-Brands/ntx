'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select } from '../ui/select';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { QueueItem, QueueItemStatus, View } from '../../types';
import { 
  Plus, 
  Trash2, 
  Play, 
  Pause, 
  Loader2, 
  CheckCircle, 
  XCircle, 
  FileText,
  Image as ImageIcon,
  Clock,
  Sparkles
} from 'lucide-react';

interface BatchQueueProps {
  onNavigate: (view: View) => void;
}

const BatchQueue: React.FC<BatchQueueProps> = ({ onNavigate }) => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [topicInput, setTopicInput] = useState('');
  const [category, setCategory] = useState('technology');
  const [isPolling, setIsPolling] = useState(false);

  // Load queue on mount
  useEffect(() => {
    loadQueue();
    setIsPolling(true);
  }, []);

  // Poll for queue updates
  useEffect(() => {
    if (!isPolling) return;

    const interval = setInterval(() => {
      loadQueue();
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  }, [isPolling]);

  const loadQueue = async () => {
    try {
      const response = await fetch('/api/queue');
      if (response.ok) {
        const data = await response.json();
        setQueue(data.queue || []);
      }
    } catch (error) {
      console.error('Error loading queue:', error);
    }
  };

  const handleAddToQueue = async () => {
    if (!topicInput.trim()) return;

    try {
      const response = await fetch('/api/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            topic: topicInput.trim(),
            category: category,
          }],
        }),
      });

      if (response.ok) {
        setTopicInput('');
        loadQueue();
      } else {
        alert('Failed to add to queue');
      }
    } catch (error) {
      console.error('Error adding to queue:', error);
      alert('Failed to add to queue');
    }
  };

  const handleAddMultiple = async () => {
    const topics = topicInput
      .split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    if (topics.length === 0) return;

    try {
      const response = await fetch('/api/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: topics.map(topic => ({
            topic,
            category: category,
          })),
        }),
      });

      if (response.ok) {
        setTopicInput('');
        loadQueue();
      } else {
        alert('Failed to add to queue');
      }
    } catch (error) {
      console.error('Error adding to queue:', error);
      alert('Failed to add to queue');
    }
  };

  const handleRemove = async (id: string) => {
    try {
      const response = await fetch(`/api/queue?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadQueue();
      }
    } catch (error) {
      console.error('Error removing from queue:', error);
    }
  };

  const getStatusIcon = (status: QueueItemStatus) => {
    switch (status) {
      case QueueItemStatus.PENDING:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case QueueItemStatus.PROCESSING:
      case QueueItemStatus.GENERATING_TEXT:
      case QueueItemStatus.GENERATING_IMAGE:
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case QueueItemStatus.COMPLETED:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case QueueItemStatus.FAILED:
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: QueueItemStatus) => {
    const variants: Record<QueueItemStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      [QueueItemStatus.PENDING]: { label: 'Pending', variant: 'outline' },
      [QueueItemStatus.PROCESSING]: { label: 'Processing', variant: 'default' },
      [QueueItemStatus.GENERATING_TEXT]: { label: 'Generating Text', variant: 'default' },
      [QueueItemStatus.GENERATING_IMAGE]: { label: 'Generating Image', variant: 'default' },
      [QueueItemStatus.COMPLETED]: { label: 'Completed', variant: 'default' },
      [QueueItemStatus.FAILED]: { label: 'Failed', variant: 'destructive' },
    };

    const config = variants[status];
    return (
      <Badge variant={config.variant} className="capitalize">
        {config.label}
      </Badge>
    );
  };

  const pendingCount = queue.filter(q => q.status === QueueItemStatus.PENDING).length;
  const processingCount = queue.filter(q => 
    q.status === QueueItemStatus.PROCESSING || 
    q.status === QueueItemStatus.GENERATING_TEXT || 
    q.status === QueueItemStatus.GENERATING_IMAGE
  ).length;
  const completedCount = queue.filter(q => q.status === QueueItemStatus.COMPLETED).length;
  const failedCount = queue.filter(q => q.status === QueueItemStatus.FAILED).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Batch Queue</h1>
          <p className="text-muted-foreground mt-1">
            Queue multiple blog posts for AI generation
          </p>
        </div>
        <Button variant="outline" onClick={() => onNavigate('dashboard')}>
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Add Items */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add to Queue
              </CardTitle>
              <CardDescription>
                Add topics for AI blog post generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic(s)</Label>
                <Textarea
                  id="topic"
                  placeholder="Enter one topic per line, or a single topic..."
                  className="min-h-[120px] resize-none"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  One topic per line for multiple items
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="technology">Technology</option>
                  <option value="health">Health & Wellness</option>
                  <option value="finance">Finance</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="education">Education</option>
                  <option value="business">Business</option>
                  <option value="travel">Travel</option>
                  <option value="food">Food & Recipes</option>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleAddToQueue} 
                  className="flex-1"
                  disabled={!topicInput.trim()}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Single
                </Button>
                <Button 
                  onClick={handleAddMultiple} 
                  variant="outline"
                  className="flex-1"
                  disabled={!topicInput.trim()}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Add Multiple
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Queue Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pending</span>
                <Badge variant="outline">{pendingCount}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Processing</span>
                <Badge variant="default">{processingCount}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Completed</span>
                <Badge variant="default" className="bg-green-500">{completedCount}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Failed</span>
                <Badge variant="destructive">{failedCount}</Badge>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-sm font-bold">{queue.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Queue List */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Queue Items</CardTitle>
              <CardDescription>
                {queue.length === 0 
                  ? 'No items in queue. Add topics to get started.'
                  : `${queue.length} item${queue.length !== 1 ? 's' : ''} in queue`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {queue.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Queue is empty</p>
                  <p className="text-sm mt-2">Add topics above to start generating</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {queue.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(item.status)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="font-medium">{item.topic}</p>
                            <div className="flex items-center gap-2 mt-2">
                              {getStatusBadge(item.status)}
                              <Badge variant="outline" className="capitalize">
                                {item.category}
                              </Badge>
                            </div>
                            
                            {item.progress !== undefined && item.progress < 100 && (
                              <div className="mt-3">
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                                    style={{ width: `${item.progress}%` }}
                                  />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {item.progress}% complete
                                </p>
                              </div>
                            )}

                            {item.error && (
                              <p className="text-sm text-red-500 mt-2">
                                Error: {item.error}
                              </p>
                            )}

                            {item.result && (
                              <div className="mt-2">
                                <Button
                                  variant="link"
                                  size="sm"
                                  onClick={() => {
                                    if (item.result?.id) {
                                      onNavigate('editor');
                                      // You might want to pass the post ID here
                                    }
                                  }}
                                >
                                  View Post →
                                </Button>
                              </div>
                            )}
                          </div>

                          {item.status === QueueItemStatus.PENDING && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemove(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BatchQueue;
