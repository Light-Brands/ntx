// =============================================================================
// Gemini Client - AI text generation for blog content
// =============================================================================

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { GenerateTextResult } from '../data/cmsTypes';

// Initialize Gemini AI client
const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '') as string;
const genAI = new GoogleGenerativeAI(apiKey);

// =============================================================================
// Configuration
// =============================================================================

const TEXT_MODEL = 'gemini-2.0-flash-exp';

const TEXT_GENERATION_CONFIG = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
};

// =============================================================================
// Helpers
// =============================================================================

/**
 * Check if Gemini API is configured
 */
export function isGeminiConfigured(): boolean {
  return Boolean(apiKey);
}

/**
 * Parse JSON from potentially malformed Gemini response
 */
function parseJsonResponse(text: string): { title: string; summary: string; content: string } | null {
  try {
    // Clean up the response
    let jsonText = text.trim();

    // Remove markdown code blocks
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/g, '').replace(/```\s*$/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/g, '').replace(/```\s*$/g, '');
    }

    // Try to extract JSON object if it's wrapped in text
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }

    return JSON.parse(jsonText);
  } catch {
    // Try to extract data from malformed JSON using regex
    try {
      const titleMatch = text.match(/"title"\s*:\s*"([^"]+)"/);
      const summaryMatch = text.match(/"summary"\s*:\s*"([^"]+)"/);
      const contentMatch = text.match(/"content"\s*:\s*"([\s\S]+?)"\s*\}/);

      if (titleMatch && summaryMatch && contentMatch) {
        return {
          title: titleMatch[1],
          summary: summaryMatch[1],
          content: contentMatch[1]
            .replace(/\\n/g, '\n')
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, '\\'),
        };
      }
    } catch {
      // Fall through to return null
    }

    return null;
  }
}

// =============================================================================
// Text Generation
// =============================================================================

/**
 * Generate blog article content using Gemini AI
 *
 * @param topic - The topic to write about
 * @param category - The category for the article
 * @returns Generated article with title, summary, and HTML content
 */
export async function generateBlogText(
  topic: string,
  category: string
): Promise<GenerateTextResult> {
  if (!isGeminiConfigured()) {
    throw new Error('Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your environment.');
  }

  if (!topic || !category) {
    throw new Error('Topic and category are required');
  }

  console.log(`Generating article: "${topic}" in category "${category}"`);

  const model = genAI.getGenerativeModel({
    model: TEXT_MODEL,
    generationConfig: TEXT_GENERATION_CONFIG,
  });

  const prompt = `You are a professional content writer. Create engaging, informative, and SEO-friendly blog articles.

Create a complete blog article about: ${topic}
Category: ${category}

FORMATTING RULES:
- Use HTML tags: h2, h3, p, strong, em, ul, ol, li, blockquote
- Add <br><br> after headings and <br> after paragraphs for spacing
- Make it 800-1500 words, well-structured and engaging

Return a JSON object with these exact fields:
- title: SEO-friendly title (50-60 chars)
- summary: Compelling hook (150-160 chars)
- content: Full HTML article with headings and paragraphs

IMPORTANT: Return ONLY raw JSON, no markdown formatting, no code blocks.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  console.log('Gemini response received, parsing...');

  // Parse the response
  let articleData = parseJsonResponse(text);

  // Use fallback if parsing failed
  if (!articleData) {
    console.warn('Using fallback content - parsing failed');
    articleData = {
      title: topic.length > 60 ? topic.substring(0, 57) + '...' : topic,
      summary: `An informative article about ${topic}`,
      content: `<h2>Introduction</h2><br><br><p>This article discusses ${topic}. Please edit this content to add your own information.</p>`,
    };
  }

  // Validate the response
  if (!articleData.title || !articleData.summary || !articleData.content) {
    throw new Error('Generated content is incomplete. Please try again.');
  }

  console.log(`Article generated: "${articleData.title}"`);
  console.log(`Content length: ${articleData.content.length} characters`);

  return {
    title: articleData.title,
    summary: articleData.summary,
    content: articleData.content,
    category: category,
  };
}

/**
 * Generate a subject description for image generation based on blog content
 */
export async function generateImageSubject(
  title: string,
  category?: string,
  summary?: string,
  content?: string
): Promise<string> {
  if (!isGeminiConfigured()) {
    return 'A person with serene expression, eyes gently closed, peaceful smile';
  }

  const analysisPrompt = `You are analyzing a blog post to create a minimal, photorealistic image subject description.

Blog Post:
Title: ${title}
${summary ? `Summary: ${summary}` : ''}
${content ? `Content excerpt: ${content.substring(0, 500)}` : ''}
Category: ${category || 'general'}

Your task: Generate a SINGLE, MINIMAL subject description (one sentence, max 30 words) for an image that represents this blog post.

IMPORTANT GUIDELINES:
- Be creative and varied - avoid defaulting to common tech objects like smartphones, mobile phones, or devices unless the blog is SPECIFICALLY about mobile technology
- Prioritize these subject types in order:
  1. Human portraits (most expressive and relatable)
  2. Abstract/minimal geometric forms (most versatile and artistic)
  3. Natural elements (plants, water, light, organic shapes)
  4. Conceptual objects (only if highly relevant to the content)
  5. Tech objects (only as last resort and only if content is specifically about that technology)

Subject Examples (use as inspiration, not templates):
- Human: "A person in their 30s with eyes gently closed, serene peaceful smile, head centered"
- Abstract: "ascending curves of golden light forming harmonious patterns"
- Natural: "a single leaf with soft natural glow floating gently"
- Conceptual: "geometric shapes representing connection and growth"
- Minimal object: "a clean notebook with pages glowing softly" (only if about writing/notes)

AVOID:
- Mobile phones, smartphones, or handheld devices (unless blog is specifically about mobile tech)
- Generic tech objects when abstract or human subjects would work better
- Multiple objects or complex scenes
- Busy compositions

CREATIVITY:
- Think metaphorically - what does this blog post FEEL like?
- Consider the emotion, concept, or essence rather than literal objects
- Prefer human emotion or abstract beauty over literal representations
- Be bold and creative while staying minimal and photorealistic

Respond with ONLY the subject description, nothing else.`;

  try {
    const textModel = genAI.getGenerativeModel({ model: TEXT_MODEL });
    const result = await textModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: analysisPrompt }] }],
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 100,
      },
    });

    const response = await result.response;
    const generatedSubject = response.text().trim();

    // Clean up the response
    const cleanSubject = generatedSubject
      .replace(/^["']|["']$/g, '')
      .replace(/^Subject:\s*/i, '')
      .trim();

    console.log(`AI-generated subject: ${cleanSubject}`);
    return cleanSubject || 'A person with serene expression, eyes gently closed, peaceful smile';
  } catch (error) {
    console.error('Error generating subject with AI:', error);
    return 'A person with serene expression, eyes gently closed, peaceful smile';
  }
}
