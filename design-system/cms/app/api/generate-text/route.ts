import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { topic, category, provider } = await request.json();

    if (!topic || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: topic and category are required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Please set GEMINI_API_KEY in .env.local' },
        { status: 500 }
      );
    }

    console.log(`\n📝 Generating article: "${topic}" in category "${category}"`);

    // Get the generative model with config
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      },
    });

    // Create a detailed prompt for article generation (matching mito-website)
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

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('✓ Gemini response received, parsing...');

    // Parse the JSON response with enhanced error handling
    let articleData;
    try {
      // Extract JSON from the response (handle markdown code blocks)
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
      
      articleData = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', parseError);
      console.error('Raw response:', text.substring(0, 300) + '...');
      
      // Enhanced fallback: try to extract data from malformed JSON
      try {
        // Try to extract title
        const titleMatch = text.match(/"title"\s*:\s*"([^"]+)"/);
        const summaryMatch = text.match(/"summary"\s*:\s*"([^"]+)"/);
        const contentMatch = text.match(/"content"\s*:\s*"([\s\S]+?)"\s*\}/);
        
        if (titleMatch && summaryMatch && contentMatch) {
          articleData = {
            title: titleMatch[1],
            summary: summaryMatch[1],
            content: contentMatch[1]
              .replace(/\\n/g, '\n')
              .replace(/\\"/g, '"')
              .replace(/\\\\/g, '\\')
          };
          console.log('✓ Extracted data from malformed JSON');
        } else {
          throw new Error('Could not extract data');
        }
      } catch (extractError) {
        // Last resort fallback
        articleData = {
          title: topic.length > 60 ? topic.substring(0, 57) + '...' : topic,
          summary: `An informative article about ${topic}`,
          content: `<h2>Introduction</h2><br><br><p>This article discusses ${topic}. Please edit this content to add your own information.</p>`
        };
        console.log('⚠️ Using basic fallback - please edit the generated content');
      }
    }

    // Validate the response
    if (!articleData.title || !articleData.summary || !articleData.content) {
      console.error('Generated content is incomplete:', articleData);
      return NextResponse.json(
        { error: 'Generated content is incomplete. Please try again.' },
        { status: 500 }
      );
    }

    console.log(`✅ Article generated successfully: "${articleData.title}"`);
    console.log(`   Content length: ${articleData.content.length} characters\n`);

    return NextResponse.json({
      title: articleData.title,
      summary: articleData.summary,
      content: articleData.content,
      category: category,
      provider: provider || 'gemini-2.0-flash'
    });

  } catch (error) {
    console.error('❌ Error generating text:', error);
    console.error('Error details:', error instanceof Error ? error.stack : error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to generate article content. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

