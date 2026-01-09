// =============================================================================
// Image Generation - AI image generation with browser-based processing
// =============================================================================

import { GoogleGenerativeAI } from '@google/generative-ai';
import { cmsStorage, uploadImageFromBase64 } from '../data/cmsStorage';
import { generateImageSubject, isGeminiConfigured } from './geminiClient';
import type { GenerateImageOptions } from '../data/cmsTypes';

// Initialize Gemini AI client
const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '') as string;
const genAI = new GoogleGenerativeAI(apiKey);

// =============================================================================
// Configuration
// =============================================================================

const IMAGE_MODEL = 'gemini-2.0-flash-exp-image-generation';

// Target dimensions
const TARGET_WIDTH = 1920;
const TARGET_HEIGHT = 1080;
const JPEG_QUALITY = 0.9;

// Universal Master Style - Consistent Aesthetic Foundation
const MASTER_STYLE = `Emerging from a soft radiant white-to-transparent gradient that blends seamlessly into a pure white void background, ethereal soft glow around the subject, subtle rim lighting, floating gently as if rising from pure light, minimalistic clean studio aesthetic, high detail texture, calm meditative energy, cinematic soft focus, 8k, photorealistic, --ar 16:9 --v 6 --q 2 --style raw

Style notes: No text, no badges, no dates, no UI elements, no rounded corners, no borders. Pure image only, ultra-clean and ready for blog header use. Diverse and inclusive representation when humans are present.`;

// =============================================================================
// Browser-based Image Processing
// =============================================================================

/**
 * Process image using Canvas API (browser-native Sharp replacement)
 * Resizes image to target dimensions with cover fit
 */
async function processImageInBrowser(
  base64Data: string,
  mimeType: string = 'image/png'
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      // Create canvas with target dimensions
      const canvas = document.createElement('canvas');
      canvas.width = TARGET_WIDTH;
      canvas.height = TARGET_HEIGHT;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Calculate cover fit dimensions
      const sourceAspect = img.width / img.height;
      const targetAspect = TARGET_WIDTH / TARGET_HEIGHT;

      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = img.width;
      let sourceHeight = img.height;

      if (sourceAspect > targetAspect) {
        // Image is wider - crop sides
        sourceWidth = img.height * targetAspect;
        sourceX = (img.width - sourceWidth) / 2;
      } else {
        // Image is taller - crop top/bottom
        sourceHeight = img.width / targetAspect;
        sourceY = (img.height - sourceHeight) / 2;
      }

      // Draw image with cover fit
      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        TARGET_WIDTH,
        TARGET_HEIGHT
      );

      // Convert to JPEG blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob from canvas'));
          }
        },
        'image/jpeg',
        JPEG_QUALITY
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Handle both raw base64 and data URL formats
    if (base64Data.startsWith('data:')) {
      img.src = base64Data;
    } else {
      img.src = `data:${mimeType};base64,${base64Data}`;
    }
  });
}

// =============================================================================
// Image Generation
// =============================================================================

/**
 * Generate blog thumbnail image using Gemini AI
 *
 * @param options - Generation options including title, summary, content, category
 * @returns Public URL of the uploaded image
 */
export async function generateBlogImage(options: GenerateImageOptions): Promise<string> {
  if (!isGeminiConfigured()) {
    throw new Error('Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your environment.');
  }

  const { title, summary, content, category, customPrompt } = options;

  if (!title && !customPrompt) {
    throw new Error('Either title or customPrompt is required for image generation');
  }

  let imagePrompt: string;

  if (customPrompt) {
    // Use custom prompt as-is
    imagePrompt = customPrompt;
    console.log(`Using custom prompt for: "${title || 'custom subject'}"`);
  } else {
    // Generate smart subject from blog content
    console.log(`Analyzing blog post to generate contextual image subject...`);
    const detailedSubject = await generateImageSubject(title, category, summary, content);
    imagePrompt = `${detailedSubject}\n\n${MASTER_STYLE}`;
    console.log(`Generated subject: ${detailedSubject.substring(0, 100)}...`);
  }

  console.log(`Generating image with ${IMAGE_MODEL}...`);

  const model = genAI.getGenerativeModel({ model: IMAGE_MODEL });

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: imagePrompt }] }],
    generationConfig: {
      temperature: 0.7,
    },
  });

  const response = await result.response;

  // Check for candidates
  if (!response.candidates || response.candidates.length === 0) {
    throw new Error('No image generated by Gemini - empty response');
  }

  const candidate = response.candidates[0];

  // Check for safety blocks
  if (candidate.finishReason === 'SAFETY') {
    console.warn('Image generation blocked by safety filter');
    throw new Error('Image generation blocked by safety filter - try refining the topic');
  }

  if (!candidate.content?.parts || candidate.content.parts.length === 0) {
    throw new Error('No image data in Gemini response');
  }

  // Find image data in response
  let imageData: { data: string; mimeType: string } | null = null;

  for (const part of candidate.content.parts) {
    if (part.inlineData?.data) {
      imageData = {
        data: part.inlineData.data,
        mimeType: part.inlineData.mimeType || 'image/png',
      };
      break;
    }
  }

  if (!imageData) {
    console.error('Response parts:', JSON.stringify(candidate.content.parts, null, 2));
    throw new Error('No image data received from Gemini');
  }

  console.log(`Image data received: ${imageData.data.length} bytes (base64)`);

  // Process image using browser Canvas (replaces Sharp)
  console.log('Processing image with Canvas API: resizing to 1920x1080...');
  const processedBlob = await processImageInBrowser(imageData.data, imageData.mimeType);
  console.log(`Image processed: ${processedBlob.size} bytes`);

  // Generate unique filename
  const timestamp = Date.now();
  const filename = `ai-thumbnail-${timestamp}.jpg`;

  // Upload to Supabase Storage
  console.log('Uploading image to Supabase Storage...');
  const imageUrl = await cmsStorage.uploadImage(processedBlob, filename);

  console.log(`Image saved successfully: ${imageUrl}`);
  return imageUrl;
}

/**
 * Generate image from explicit subject description
 *
 * @param subject - The subject description for the image
 * @returns Public URL of the uploaded image
 */
export async function generateImageFromSubject(subject: string): Promise<string> {
  return generateBlogImage({
    title: subject,
    customPrompt: `${subject}\n\n${MASTER_STYLE}`,
  });
}

/**
 * Upload a local file as blog image
 *
 * @param file - File to upload
 * @returns Public URL of the uploaded image
 */
export async function uploadBlogImage(file: File): Promise<string> {
  // Process the image to standard dimensions
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const processedBlob = await processImageInBrowser(base64Data);

        const timestamp = Date.now();
        const filename = `upload-${timestamp}.jpg`;

        const imageUrl = await cmsStorage.uploadImage(processedBlob, filename);
        resolve(imageUrl);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
