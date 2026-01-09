import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select } from '../ui/select';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Wand2, AlertCircle, Loader2, Sparkles, Image as ImageIcon, FileText, Save, CheckCircle, Eye } from 'lucide-react';
import { BlogPost, PostStatus } from '../../types';
import { generateText, generateImage, saveBlogPost } from '../../lib/api';
import orbAnimation from '../../public/orb-ultra-smooth.json';

interface AIGeneratorProps {
  onGenerated: (post: Partial<BlogPost>) => void;
  onCancel: () => void;
  onNavigate?: (view: any) => void;
}

enum GenerationStatus {
  IDLE = "idle",
  GENERATING_TEXT = "generating-text",
  GENERATING_IMAGE = "generating-image",
  PROCESSING = "processing",
  COMPLETE = "complete",
  ERROR = "error",
  SAVING = "saving",
  SAVED = "saved",
}

const AIGenerator: React.FC<AIGeneratorProps> = ({ onGenerated, onCancel, onNavigate }) => {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('technology');
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedData, setGeneratedData] = useState<Partial<BlogPost> | null>(null);

  const MIN_CHARS = 50;
  const MAX_CHARS = 500;
  const charCount = topic.trim().length;
  const isValidLength = charCount >= MIN_CHARS && charCount <= MAX_CHARS;
  const showValidation = topic.length > 0;
  const isGenerating = status !== GenerationStatus.IDLE && status !== GenerationStatus.COMPLETE && status !== GenerationStatus.ERROR;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !isValidLength) return;

    try {
      setStatus(GenerationStatus.GENERATING_TEXT);
      setGeneratedData(null);
      setErrorMessage('');

      // 1. Generate article text
      console.log('Generating article text with AI...');
      const textResponse = await generateText({
        topic: topic.trim(),
        category,
        provider: 'gemini-2.0-flash',
      });

      const partialData: Partial<BlogPost> = {
        title: textResponse.title,
        summary: textResponse.summary,
        content: textResponse.content,
        category: textResponse.category || category,
        tags: [],
        status: PostStatus.DRAFT,
      };

      // 2. Generate image with AI analyzing the blog content
      setStatus(GenerationStatus.GENERATING_IMAGE);
      console.log('Generating thumbnail image - AI analyzing blog content...');
      
      try {
        // Let AI analyze the blog post and generate contextual subject
        const imageResponse = await generateImage({
          title: textResponse.title,
          summary: textResponse.summary,
          content: textResponse.content,
          category: textResponse.category || category,
          imageModel: 'gemini-2.5-flash-image'
        });

        if (imageResponse.imageUrl) {
          // In Next.js, just use the relative path directly (same origin)
          partialData.thumbnailUrl = imageResponse.imageUrl;
          console.log('✅ Image generated:', imageResponse.imageUrl);
        } else if (imageResponse.imageData && imageResponse.mimeType) {
          partialData.thumbnailUrl = `data:${imageResponse.mimeType};base64,${imageResponse.imageData}`;
          console.log('✅ Image generated (base64)');
        }
      } catch (imageError) {
        console.error('Image generation failed:', imageError);
        // Continue without image - user can add one later
        console.log('⚠️ Continuing without image');
      }

      // 3. Auto-save as DRAFT
      setStatus(GenerationStatus.SAVING);
      console.log('💾 Auto-saving article as draft...');
      
      try {
        const savedPost = await saveBlogPost(partialData);
        console.log('✅ Article auto-saved as draft:', savedPost);
        
        setStatus(GenerationStatus.SAVED);
        setGeneratedData(savedPost); // Update with saved post (includes ID)
        
        // Show success message for 3 seconds
        setTimeout(() => {
          setStatus(GenerationStatus.COMPLETE);
        }, 3000);
      } catch (saveError) {
        console.error('Failed to auto-save:', saveError);
        // Still show the generated content even if save failed
        setStatus(GenerationStatus.COMPLETE);
        setGeneratedData(partialData);
        setErrorMessage('Article generated but failed to save. You can try saving manually.');
      }

    } catch (error) {
      console.error('Generation error:', error);
      setStatus(GenerationStatus.ERROR);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred during generation.');
    }
  };

  const handleUseGenerated = () => {
    if (generatedData) {
      onGenerated(generatedData);
    }
  };

  const handleGenerateNew = () => {
    // Reset form for new generation
    setStatus(GenerationStatus.IDLE);
    setGeneratedData(null);
    setTopic('');
    setErrorMessage('');
  };

  const getStatusMessage = () => {
    switch (status) {
      case GenerationStatus.GENERATING_TEXT:
        return 'Generating article content with AI...';
      case GenerationStatus.GENERATING_IMAGE:
        return 'Creating thumbnail image...';
      case GenerationStatus.PROCESSING:
        return 'Processing and optimizing...';
      case GenerationStatus.COMPLETE:
        return 'Article saved as draft! Check Dashboard or All Posts to view.';
      case GenerationStatus.SAVING:
        return 'Auto-saving as draft...';
      case GenerationStatus.SAVED:
        return 'Auto-saved as draft! ✓';
      default:
        return '';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case GenerationStatus.GENERATING_TEXT:
        return <FileText className="h-5 w-5 animate-pulse" />;
      case GenerationStatus.GENERATING_IMAGE:
        return <ImageIcon className="h-5 w-5 animate-pulse" />;
      case GenerationStatus.PROCESSING:
        return <Loader2 className="h-5 w-5 animate-spin" />;
      case GenerationStatus.COMPLETE:
        return <Sparkles className="h-5 w-5 text-green-500" />;
      case GenerationStatus.SAVING:
        return <Loader2 className="h-5 w-5 animate-spin" />;
      case GenerationStatus.SAVED:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Content Generator</h1>
          <p className="text-muted-foreground mt-1">
            Generate blog posts with AI-powered content and images
          </p>
        </div>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Generator Form */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleGenerate}>
            <Card className="shadow-lg">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  AI Configuration
                </CardTitle>
                <CardDescription>
                  Describe what you want to write about - articles are automatically saved as drafts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-base font-medium">
                    Topic or Prompt *
                  </Label>
                  <Textarea
                    id="topic"
                    placeholder="e.g., The evolution of renewable energy storage solutions and their impact on sustainable development..."
                    className={`min-h-[120px] resize-none text-base ${
                      showValidation && !isValidLength ? 'border-destructive focus-visible:ring-destructive' : ''
                    }`}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    disabled={isGenerating}
                    required
                    maxLength={MAX_CHARS}
                  />
                  <div className="flex items-center justify-between text-xs">
                    <div className="space-y-1">
                      {showValidation && charCount < MIN_CHARS && (
                        <p className="text-destructive">
                          Minimum {MIN_CHARS} characters required
                        </p>
                      )}
                      {charCount > MAX_CHARS && (
                        <p className="text-destructive">
                          Maximum {MAX_CHARS} characters exceeded
                        </p>
                      )}
                      {!showValidation && (
                        <p className="text-muted-foreground">
                          Enter at least {MIN_CHARS} characters to generate
                        </p>
                      )}
                    </div>
                    <div className={`font-medium ${
                      charCount < MIN_CHARS ? 'text-muted-foreground' :
                      charCount > MAX_CHARS ? 'text-destructive' :
                      'text-green-600 dark:text-green-500'
                    }`}>
                      {charCount} / {MAX_CHARS}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-base font-medium">Category</Label>
                  <Select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={isGenerating}
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

                <div className="rounded-lg bg-secondary/50 p-4 text-sm">
                  <p className="font-medium mb-2">What will be generated:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Article title and content
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Summary/excerpt
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Featured thumbnail image
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      <span className="font-medium text-green-600 dark:text-green-400">Auto-saved as DRAFT</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-5">
                <Button 
                  type="submit" 
                  className="w-full h-11 text-base font-medium" 
                  disabled={isGenerating || !topic || !isValidLength}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate with AI
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>

          {status === GenerationStatus.ERROR && (
            <div className="flex flex-col gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="font-semibold">Generation Error</span>
              </div>
              <p className="text-xs ml-6">
                {errorMessage || 'An error occurred during generation. Please try again.'}
              </p>
            </div>
          )}
        </div>

        {/* Right: Preview/Status */}
        <div className="lg:col-span-7">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                {status === GenerationStatus.IDLE 
                  ? 'Generated content will appear here'
                  : getStatusMessage()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating && (
                <div className="flex flex-col items-center justify-center py-12 space-y-6">
                  <div className="relative w-24 h-24">
                    {/* Background blurred orb for glow effect */}
                    <div className="absolute inset-0 blur-xl opacity-60">
                      <Lottie 
                        animationData={orbAnimation} 
                        loop={true}
                        autoplay={true}
                      />
                    </div>
                    {/* Foreground sharp orb */}
                    <div className="relative">
                      <Lottie 
                        animationData={orbAnimation} 
                        loop={true}
                        autoplay={true}
                      />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-lg font-medium text-foreground">{getStatusMessage()}</p>
                    <p className="text-xs text-muted-foreground">
                      {status === GenerationStatus.GENERATING_TEXT && 'Creating your article with AI...'}
                      {status === GenerationStatus.GENERATING_IMAGE && 'Designing the perfect thumbnail...'}
                      {status === GenerationStatus.PROCESSING && 'Finalizing everything...'}
                      {status === GenerationStatus.SAVING && 'Saving to your library...'}
                    </p>
                  </div>
                  <div className="w-full max-w-sm">
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700 ease-out"
                        style={{
                          width: status === GenerationStatus.GENERATING_TEXT ? '30%' :
                                 status === GenerationStatus.GENERATING_IMAGE ? '65%' :
                                 status === GenerationStatus.PROCESSING ? '85%' :
                                 status === GenerationStatus.SAVING ? '95%' : '0%'
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Starting...</span>
                      <span>
                        {status === GenerationStatus.GENERATING_TEXT && '30%'}
                        {status === GenerationStatus.GENERATING_IMAGE && '65%'}
                        {status === GenerationStatus.PROCESSING && '85%'}
                        {status === GenerationStatus.SAVING && '95%'}
                      </span>
                      <span>Complete</span>
                    </div>
                  </div>
                </div>
              )}

              {status === GenerationStatus.IDLE && !generatedData && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="rounded-full bg-muted p-6 mb-4">
                    <Wand2 className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Ready to generate</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Enter your topic and click "Generate with AI" to create your blog post
                  </p>
                </div>
              )}

              {generatedData && status === GenerationStatus.COMPLETE && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  {generatedData.thumbnailUrl && (
                    <div className="rounded-lg overflow-hidden border">
                      <img 
                        src={generatedData.thumbnailUrl} 
                        alt={generatedData.title}
                        className="w-full h-auto"
                      />
                    </div>
                  )}

                  <div>
                    <Badge variant="outline" className="capitalize mb-3">
                      {generatedData.category}
                    </Badge>
                    <h2 className="text-3xl font-bold mb-3">{generatedData.title}</h2>
                    {generatedData.summary && (
                      <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                        {generatedData.summary}
                      </p>
                    )}
                    <div className="prose-custom">
                      <div dangerouslySetInnerHTML={{ __html: generatedData.content || '' }} />
                    </div>
                  </div>

                  <div className="pt-6 border-t space-y-3">
                    <div className="flex items-center justify-center gap-2 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <div className="flex flex-col">
                        <span className="text-green-700 dark:text-green-300 font-medium">
                          Article auto-saved as draft!
                        </span>
                        <span className="text-xs text-green-600 dark:text-green-400">
                          View in Dashboard or All Posts
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      {onNavigate && (
                        <Button 
                          onClick={() => onNavigate('posts')}
                          className="flex-1"
                          variant="default"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View All Posts
                        </Button>
                      )}
                      <Button onClick={handleUseGenerated} variant="outline" className={onNavigate ? '' : 'flex-1'}>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full"
                      onClick={handleGenerateNew}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Another Article
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIGenerator;

