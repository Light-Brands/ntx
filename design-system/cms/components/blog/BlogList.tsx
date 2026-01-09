'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { BlogPost, PostStatus, View } from '../../types';
import { getAllPosts, deletePost as deletePostAPI } from '../../lib/api';
import { stripHtmlTags, truncateText } from '../../lib/utils';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  FileText,
  Calendar,
  Tag,
  Loader2
} from 'lucide-react';

interface BlogListProps {
  onNavigate: (view: View, postId?: string) => void;
  editPostId?: string;
}

const BlogList: React.FC<BlogListProps> = ({ onNavigate, editPostId }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | PostStatus>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        await deletePostAPI(id);
        await loadPosts();
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  const handleEdit = (postId: string) => {
    onNavigate('editor', postId);
  };

  const handleView = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getReadTime = (content: string) => {
    const wordCount = content.split(/\s+/).filter(w => w).length;
    return Math.ceil(wordCount / 200);
  };

  // Filter and search posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = ['all', ...new Set(posts.map(p => p.category))];
  
  // Post detail view
  if (selectedPost) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedPost(null)}>
            ← Back to Posts
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleEdit(selectedPost.id!)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              className="text-destructive hover:text-destructive"
              onClick={() => {
                handleDelete(selectedPost.id!);
                setSelectedPost(null);
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            {selectedPost.thumbnailUrl && (
              <div className="mb-6 rounded-lg overflow-hidden">
                <img 
                  src={selectedPost.thumbnailUrl} 
                  alt={selectedPost.title}
                  className="w-full h-auto object-cover max-h-96"
                />
              </div>
            )}

            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="capitalize">{selectedPost.category}</Badge>
              <Badge 
                variant={selectedPost.status === PostStatus.PUBLISHED ? 'default' : 'secondary'}
              >
                {selectedPost.status}
              </Badge>
              {selectedPost.tags.map(tag => (
                <Badge key={tag} variant="secondary">#{tag}</Badge>
              ))}
            </div>

            <h1 className="text-4xl font-bold mb-4">{selectedPost.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(selectedPost.createdAt)}
              </span>
              <span>•</span>
              <span>{getReadTime(selectedPost.content)} min read</span>
              {selectedPost.author && (
                <>
                  <span>•</span>
                  <span>By {selectedPost.author}</span>
                </>
              )}
            </div>

            {selectedPost.summary && (
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed border-l-4 border-primary pl-4">
                {selectedPost.summary}
              </p>
            )}

            <div className="prose-custom">
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
            </div>

            <div className="mt-8 pt-6 border-t text-xs text-muted-foreground">
              <p>Created: {formatDate(selectedPost.createdAt)}</p>
              <p>Last updated: {formatDate(selectedPost.updatedAt)}</p>
              {selectedPost.publishedAt && (
                <p>Published: {formatDate(selectedPost.publishedAt)}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-6 mb-4">
              <FileText className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Error Loading Posts</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">{error}</p>
            <Button onClick={loadPosts}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Posts list view
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">
            Manage your blog posts • {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>
        <Button onClick={() => onNavigate('editor')}>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-12">
            <div className="md:col-span-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
              >
                <option value="all">All Status</option>
                <option value={PostStatus.DRAFT}>Drafts</option>
                <option value={PostStatus.PUBLISHED}>Published</option>
                <option value={PostStatus.ARCHIVED}>Archived</option>
              </Select>
            </div>
            <div className="md:col-span-3">
              <Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="capitalize">
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {searchTerm || filterStatus !== 'all' || filterCategory !== 'all' 
                ? 'No posts found' 
                : 'No posts yet'}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {searchTerm || filterStatus !== 'all' || filterCategory !== 'all'
                ? 'Try adjusting your filters or search terms.'
                : 'Start creating your first blog post to see it here.'}
            </p>
            {!searchTerm && filterStatus === 'all' && filterCategory === 'all' && (
              <Button onClick={() => onNavigate('editor')}>
                <Plus className="mr-2 h-4 w-4" />
                Create First Post
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
              {post.thumbnailUrl ? (
                <div className="h-48 overflow-hidden bg-muted">
                  <img 
                    src={post.thumbnailUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-muted-foreground" />
                </div>
              )}

              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <Badge variant="outline" className="capitalize text-xs">{post.category}</Badge>
                  <Badge 
                    variant={post.status === PostStatus.PUBLISHED ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {post.status}
                  </Badge>
                </div>

                <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {post.summary || truncateText(stripHtmlTags(post.content), 100)}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(post.createdAt)}</span>
                  <span>•</span>
                  <span>{getReadTime(post.content)} min</span>
                </div>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">+{post.tags.length - 3}</Badge>
                    )}
                  </div>
                )}

                <div className="flex gap-2 pt-3 border-t">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleView(post)}
                  >
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEdit(post.id!)}
                  >
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(post.id!)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;

