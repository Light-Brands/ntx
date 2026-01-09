'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Activity, FileText, HardDrive, Edit, Trash2, Eye, Plus, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { View, BlogPost, PostStatus } from '../../types';
import { getAllPosts, deletePost as deletePostAPI } from '../../lib/api';
import { stripHtmlTags, truncateText, formatTimeAgo } from '../../lib/utils';

interface DashboardProps {
    onNavigate: (view: View, postId?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [storageStats, setStorageStats] = useState({ count: 0, size: '0 KB', published: 0, drafts: 0 });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const savedPosts = await getAllPosts();
      setPosts(savedPosts);
      
      // Calculate stats from posts
      const published = savedPosts.filter(p => p.status === PostStatus.PUBLISHED).length;
      const drafts = savedPosts.filter(p => p.status === PostStatus.DRAFT).length;
      setStorageStats({
        count: savedPosts.length,
        size: `${Math.round(JSON.stringify(savedPosts).length / 1024)} KB`,
        published,
        drafts
      });
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePostAPI(id);
        await loadPosts(); // Refresh the list
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your blog content.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('editor')}>
            <Edit className="mr-2 h-4 w-4" />
            Write Post
          </Button>
          <Button 
            onClick={() => onNavigate('ai-generate')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            AI Generate
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Posts</p>
                <h3 className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  {storageStats.count}
                </h3>
                <p className="text-xs text-muted-foreground mt-2">All articles</p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center shadow-inner">
                <FileText className="h-7 w-7 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Published</p>
                <h3 className="text-4xl font-bold bg-gradient-to-br from-green-600 to-green-400 bg-clip-text text-transparent">
                  {storageStats.published}
                </h3>
                <p className="text-xs text-muted-foreground mt-2">Live articles</p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center shadow-inner">
                <TrendingUp className="h-7 w-7 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Drafts</p>
                <h3 className="text-4xl font-bold bg-gradient-to-br from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
                  {storageStats.drafts}
                </h3>
                <p className="text-xs text-muted-foreground mt-2">Unpublished</p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 flex items-center justify-center shadow-inner">
                <FileText className="h-7 w-7 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Categories</p>
                <h3 className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-purple-400 bg-clip-text text-transparent">
                  {new Set(posts.map(a => a.category)).size}
                </h3>
                <p className="text-xs text-muted-foreground mt-2">Unique types</p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center shadow-inner">
                <Activity className="h-7 w-7 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Posts */}
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Posts</CardTitle>
            {posts.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => onNavigate('posts')}>
                View All
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                  Start creating blog posts to see them appear here.
                </p>
                <Button onClick={() => onNavigate('editor')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Post
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-start gap-4 group">
                    <div className="h-16 w-16 rounded-lg border bg-muted overflow-hidden flex-shrink-0">
                      {post.thumbnailUrl ? (
                        <img 
                          src={post.thumbnailUrl} 
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <FileText className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-none mb-1 truncate">
                        {post.title}
                      </p>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {post.summary || truncateText(stripHtmlTags(post.content), 80)}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={post.status === PostStatus.PUBLISHED ? 'default' : 'outline'} 
                          className="capitalize text-xs"
                        >
                          {post.status}
                        </Badge>
                        <Badge variant="outline" className="capitalize text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(post.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => onNavigate('posts', post.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => onNavigate('editor', post.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(post.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span>Storage Used</span>
                            <span className="font-medium">{storageStats.size}</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                            <div className="h-full bg-blue-500 w-[15%]"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span>Published Rate</span>
                            <span className="font-medium">
                              {storageStats.count > 0 
                                ? Math.round((storageStats.published / storageStats.count) * 100) 
                                : 0}%
                            </span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                            <div 
                              className="h-full bg-green-500" 
                              style={{
                                width: storageStats.count > 0 
                                  ? `${(storageStats.published / storageStats.count) * 100}%` 
                                  : '0%'
                              }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 rounded-lg border bg-muted/50 p-4">
                    <h4 className="text-sm font-semibold mb-2">Categories</h4>
                    <div className="space-y-2 text-sm">
                      {Array.from(new Set(posts.map(p => p.category))).slice(0, 5).map(category => {
                        const count = posts.filter(p => p.category === category).length;
                        return (
                          <div key={category} className="flex justify-between">
                            <span className="text-muted-foreground capitalize">{category}</span>
                            <span className="font-medium">{count}</span>
                          </div>
                        );
                      })}
                      {posts.length === 0 && (
                        <p className="text-xs text-muted-foreground">No categories yet</p>
                      )}
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
