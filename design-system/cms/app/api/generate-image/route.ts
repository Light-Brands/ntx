import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import sharp from 'sharp';
import { uploadImage } from '@/lib/storage';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Universal Master Style - Consistent Aesthetic Foundation
const MASTER_STYLE = `Emerging from a soft radiant white-to-transparent gradient that blends seamlessly into a pure white void background, ethereal soft glow around the subject, subtle rim lighting, floating gently as if rising from pure light, minimalistic clean studio aesthetic, high detail texture, calm meditative energy, cinematic soft focus, 8k, photorealistic, --ar 16:9 --v 6 --q 2 --style raw

Style notes: No text, no badges, no dates, no UI elements, no rounded corners, no borders. Pure image only, ultra-clean and ready for blog header use. Diverse and inclusive representation when humans are present.`;

/**
 * Use AI to intelligently generate minimal subject descriptions based on blog content
 * Analyzes the blog post and creates a unique, contextual, minimal visual representation
 */
async function generateDetailedSubject(title: string, category?: string, summary?: string, content?: string): Promise<string> {
  const blogContent = content ? `${title}\n\n${summary || ''}\n\n${content.substring(0, 500)}` : `${title}\n\n${summary || ''}`;
  
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
    const textModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const result = await textModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: analysisPrompt }] }],
      generationConfig: {
        temperature: 0.9, // Higher temperature for more creativity and variety
        maxOutputTokens: 100,
      },
    });

    const response = await result.response;
    const generatedSubject = response.text().trim();
    
    // Clean up the response (remove quotes, extra formatting)
    const cleanSubject = generatedSubject
      .replace(/^["']|["']$/g, '') // Remove surrounding quotes
      .replace(/^Subject:\s*/i, '') // Remove "Subject:" prefix if present
      .trim();
    
    console.log(`🤖 AI-generated subject: ${cleanSubject}`);
    return cleanSubject || `A person with serene expression, eyes gently closed, peaceful smile`;
  } catch (error) {
    console.error('Error generating subject with AI:', error);
    // Fallback to simple description
    return `A person with serene expression, eyes gently closed, peaceful smile`;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, title, category, imageModel, summary, subject, content } = await request.json();

    if (!prompt && !title && !subject) {
      return NextResponse.json(
        { error: 'Either prompt, subject, or title is required for image generation' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Determine the final prompt
    let imagePrompt: string;
    
    if (prompt) {
      // Custom prompt provided - use it as-is (for manual override)
      imagePrompt = prompt;
      console.log(`\n🎨 Using custom prompt for: "${title || 'custom subject'}"`);
    } else if (subject) {
      // Explicit subject provided - combine with master style
      imagePrompt = `${subject}\n\n${MASTER_STYLE}`;
      console.log(`\n🎨 Generating with custom subject for: "${title || 'custom subject'}"`);
      console.log(`📝 Subject: ${subject.substring(0, 120)}...`);
    } else {
      // Use AI to analyze blog post and generate smart subject
      console.log(`\n🤖 Analyzing blog post to generate contextual image subject...`);
      console.log(`📄 Title: "${title}"`);
      console.log(`📝 Summary: ${summary ? summary.substring(0, 100) + '...' : 'N/A'}`);
      console.log(`📄 Content: ${content ? content.substring(0, 100) + '...' : 'N/A'}`);
      
      const detailedSubject = await generateDetailedSubject(title, category, summary, content);
      imagePrompt = `${detailedSubject}\n\n${MASTER_STYLE}`;
      console.log(`\n🎨 Generating image with ${imageModel || 'gemini-2.5-flash-image'} for: "${title}"`);
      console.log(`📝 AI-generated subject: ${detailedSubject.substring(0, 120)}...`);
    }

    // Use the correct Gemini image model (Nano Banana)
    console.log('🔧 Initializing model: gemini-2.5-flash-image');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-image' });

    console.log('⏳ Calling Gemini 2.5 Flash Image (Nano Banana)...');

    // Generate image with Gemini
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: imagePrompt }] }],
      generationConfig: {
        temperature: 0.7, // Higher for more variation in portraits
      },
    });

    const response = await result.response;
    
    // Check if response has candidates
    if (!response.candidates || response.candidates.length === 0) {
      console.error('❌ Gemini returned no candidates');
      throw new Error('No image generated by Gemini - empty response');
    }

    const candidate = response.candidates[0];
    
    // Check for safety blocks
    if (candidate.finishReason === 'SAFETY') {
      console.warn('⚠️ Gemini image generation blocked by safety filter');
      console.warn('Prompt was:', imagePrompt);
      throw new Error('Image generation blocked by safety filter - try refining prompt');
    }
    
    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      console.error('❌ Gemini response has no content parts');
      throw new Error('No image data in Gemini response');
    }

    // Search through all parts for inlineData (image)
    let imageBuffer: Buffer | null = null;
    let originalMimeType = 'image/png';

    for (const part of candidate.content.parts) {
      if (part.inlineData && part.inlineData.data) {
        console.log(`✓ Image data received: ${part.inlineData.data.length} bytes (base64)`);
        // Decode base64 to buffer
        imageBuffer = Buffer.from(part.inlineData.data, 'base64');
        originalMimeType = part.inlineData.mimeType || 'image/png';
        console.log(`✓ Image decoded: ${imageBuffer.length} bytes, type: ${originalMimeType}`);
        break;
      }
    }

    if (!imageBuffer) {
      // Debug: Log the full response for troubleshooting
      console.error('❌ No inline image data found in response');
      console.error('Response parts:', JSON.stringify(candidate.content.parts, null, 2));
      throw new Error('No image data received from Gemini - may have returned text only');
    }

    // Process image with Sharp: resize to 1920x1080 and convert to JPEG 90%
    console.log('🔧 Processing image with Sharp: resizing to 1920x1080...');
    const processedBuffer = await sharp(imageBuffer)
      .resize(1920, 1080, {
        fit: 'cover', // Crop to fit exact dimensions
        position: 'center'
      })
      .jpeg({ quality: 90 })
      .toBuffer();

    console.log(`✓ Image processed: ${processedBuffer.length} bytes`);

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `ai-thumbnail-${timestamp}.jpg`;
    
    // Upload to Supabase Storage
    console.log('☁️ Uploading image to Supabase Storage...');
    const imageUrl = await uploadImage(processedBuffer, filename);

    console.log(`✅ Image saved successfully to Supabase: ${imageUrl}\n`);
    
    // Return image URL
    return NextResponse.json({
      imageUrl: imageUrl,
      mimeType: 'image/jpeg',
      processed: true,
      dimensions: { width: 1920, height: 1080 },
      savedLocally: false,
      savedToSupabase: true
    });

  } catch (error) {
    console.error('❌ ERROR generating image:', error);
    console.error('Error details:', error instanceof Error ? error.stack : error);
    
    // Enhanced logging for safety blocks or specific issues
    if (error instanceof Error && error.message && (error.message.includes('blocked') || error.message.includes('safety'))) {
      console.warn('⚠️ Possible safety filter triggered - prompt may need refinement');
      console.warn('Consider making prompt more specific and less abstract');
    }
    
    // Return a more informative error
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to generate image. Please try again.',
        details: 'Gemini 2.5 Flash Image (Nano Banana) generation failed.',
        errorType: error instanceof Error ? error.constructor.name : typeof error,
        imageUrl: null,
        imageData: null
      },
      { status: 500 }
    );
  }
}

