'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select } from '../ui/select';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { BlogPost, PostStatus, View } from '../../types';
import { saveBlogPost, updatePost, getPostById, generateImage } from '../../lib/api';
import { Save, Eye, X, Tag, Image as ImageIcon, RefreshCw } from 'lucide-react';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface BlogEditorProps {
  postId?: string;
  onNavigate: (view: View) => void;
  onSave?: () => void;
  aiGeneratedData?: Partial<BlogPost>;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ postId, onNavigate, onSave, aiGeneratedData }) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('technology');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [status, setStatus] = useState<PostStatus>(PostStatus.DRAFT);
  const [author, setAuthor] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isRegeneratingImage, setIsRegeneratingImage] = useState(false);

  // Load existing post if editing, or AI-generated data if creating from AI
  useEffect(() => {
    const loadPost = async () => {
      if (postId) {
        try {
          const post = await getPostById(postId);
          if (post) {
            setTitle(post.title);
            setSummary(post.summary || '');
            setContent(post.content);
            setCategory(post.category || 'technology');
            setTags(post.tags || []);
            setThumbnailUrl(post.thumbnailUrl || '');
            setStatus(post.status as PostStatus || PostStatus.DRAFT);
            setAuthor(post.author || '');
          }
        } catch (error) {
          console.error('Error loading post:', error);
        }
      } else if (aiGeneratedData) {
        // Load AI-generated content
        setTitle(aiGeneratedData.title || '');
        setSummary(aiGeneratedData.summary || '');
        setContent(aiGeneratedData.content || '');
        setCategory(aiGeneratedData.category || 'technology');
        setTags(aiGeneratedData.tags || []);
        setThumbnailUrl(aiGeneratedData.thumbnailUrl || '');
        setStatus(aiGeneratedData.status || PostStatus.DRAFT);
        setAuthor(aiGeneratedData.author || '');
      }
    };
    
    loadPost();
  }, [postId, aiGeneratedData]);

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRegenerateImage = async () => {
    if (!title.trim()) {
      alert('Please add a title before generating an image');
      return;
    }

    setIsRegeneratingImage(true);

    try {
      console.log('🎨 Regenerating image - AI analyzing blog content...');
      const imageResponse = await generateImage({
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim(),
        category: category,
        imageModel: 'gemini-2.5-flash-image'
      });

      if (imageResponse.imageUrl) {
        setThumbnailUrl(imageResponse.imageUrl);
        console.log('✅ New image generated:', imageResponse.imageUrl);
        
        // Auto-save the post with new image if it already exists
        if (postId) {
          try {
            await updatePost(postId, { thumbnailUrl: imageResponse.imageUrl });
            console.log('✅ Post updated with new image');
          } catch (saveError) {
            console.error('Failed to auto-save new image:', saveError);
            // Still show the image even if save fails
          }
        }
      } else {
        throw new Error('No image URL returned');
      }
    } catch (error) {
      console.error('Failed to regenerate image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsRegeneratingImage(false);
    }
  };

  const handleSave = async (publishNow: boolean = false) => {
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required');
      return;
    }

    setIsSaving(true);

    try {
      const postData = {
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim(),
        category,
        tags,
        thumbnailUrl: thumbnailUrl.trim() || undefined,
        status: publishNow ? PostStatus.PUBLISHED : status,
        author: author.trim() || undefined,
      };

      if (postId) {
        // Update existing post
        const updated = await updatePost(postId, postData);
        console.log('Post updated:', updated);
      } else {
        // Create new post
        const saved = await saveBlogPost(postData);
        console.log('Post saved:', saved);
      }

      if (onSave) onSave();
      
      // Navigate back to posts list
      setTimeout(() => {
        onNavigate('posts');
      }, 500);
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('Failed to save post. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  if (showPreview) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Preview</h1>
          <Button variant="outline" onClick={() => setShowPreview(false)}>
            <X className="mr-2 h-4 w-4" />
            Close Preview
          </Button>
        </div>

        <Card>
          <CardContent className="p-8">
            {thumbnailUrl && (
              <div className="mb-6 rounded-lg overflow-hidden">
                <img src={thumbnailUrl} alt={title} className="w-full h-auto" />
              </div>
            )}
            
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="capitalize">{category}</Badge>
              {tags.map(tag => (
                <Badge key={tag} variant="secondary">#{tag}</Badge>
              ))}
            </div>

            <h1 className="text-4xl font-bold mb-4">{title || 'Untitled Post'}</h1>
            
            {summary && (
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{summary}</p>
            )}

            <div className="prose-custom">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>

            {author && (
              <div className="mt-8 pt-6 border-t">
                <p className="text-sm text-muted-foreground">Written by {author}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {postId ? 'Edit Post' : 'New Blog Post'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {postId ? 'Update your blog post' : 'Create a new blog post'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('posts')}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button variant="outline" onClick={() => setShowPreview(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={() => handleSave(false)} disabled={!isValid || isSaving}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={() => handleSave(true)} disabled={!isValid || isSaving} variant="default">
            Publish
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Main Editor */}
        <div className="lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter post title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-2xl font-bold h-auto py-3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Summary / Excerpt</Label>
                <Textarea
                  id="summary"
                  placeholder="Brief summary of your post (optional)"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={(value) => setContent(value)}
                  placeholder="Write your blog post content here..."
                  modules={{
                    toolbar: [
                      [{ 'header': [2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      ['blockquote', 'code-block'],
                      ['link'],
                      ['clean']
                    ],
                  }}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {content.length} characters • {Math.ceil(content.replace(/<[^>]*>/g, '').split(/\s+/).filter(w => w).length / 200)} min read
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PostStatus)}
                >
                  <option value={PostStatus.DRAFT}>Draft</option>
                  <option value={PostStatus.PUBLISHED}>Published</option>
                  <option value={PostStatus.ARCHIVED}>Archived</option>
                </Select>
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

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  placeholder="Author name (optional)"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button type="button" onClick={handleAddTag} variant="outline" size="sm">
                  Add
                </Button>
              </div>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors" onClick={() => handleRemoveTag(tag)}>
                      #{tag} <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Featured Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Input
                  placeholder="Image URL..."
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                />
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full"
                  onClick={handleRegenerateImage}
                  disabled={isRegeneratingImage || !title.trim()}
                >
                  {isRegeneratingImage ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Generate New Image with AI
                    </>
                  )}
                </Button>
              </div>
              {thumbnailUrl && (
                <div className="rounded-lg border overflow-hidden">
                  <img src={thumbnailUrl} alt="Thumbnail preview" className="w-full h-auto" />
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                {isRegeneratingImage 
                  ? 'Creating a new image based on your title and content...'
                  : 'Generate an AI image, enter a URL, or upload from Media Library'
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;

