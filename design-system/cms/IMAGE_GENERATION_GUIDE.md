# Image Generation Guide

## Universal Consistent Style

All images generated for VibeUp CMS maintain a consistent **ethereal, minimalist, spiritual aesthetic** while varying the subject matter to match each blog post.

## Style Characteristics

### Consistent Elements (Applied to ALL Images)
- **Background**: Soft white-to-light-gray foggy background fading to pure white at edges
- **Mood**: Calm, spiritual, futuristic, uplifting
- **Composition**: Symmetrical or near-symmetrical framing with generous negative space
- **Colors**: Delicate pastel hues (lavender, mint, pale gold, sky blue, rose)
- **Lighting**: Diffused and backlit with dreamy halo effect
- **Visual Quality**: Luminous, slightly blurred, transcendental
- **Technical**: 16:9 aspect ratio, photorealistic, high detail, 8k
- **Restrictions**: No text, badges, dates, UI elements, rounded corners, or borders

### Variable Elements (Unique to Each Post)
- **Subject**: Specific to blog post content
- **Visual Metaphors**: Category-appropriate imagery
- **Scene Elements**: Contextual to article theme

## How It Works

### Automatic Generation (Default)
When you generate a blog post with AI, the system automatically:
1. Analyzes the article title, summary, and category
2. Generates a detailed, specific subject description
3. Combines it with the master style
4. Creates a unique image that fits the content

### Category-Specific Visual Elements

Each category has tailored visual metaphors:

**Technology**
- Holographic interfaces with glowing data streams
- Floating translucent screens with elegant code/circuits
- Geometric networks of light
- Ethereal digital elements

**Health & Wellness**
- Figures in peaceful meditation with healing aura
- Hands releasing/receiving glowing energy
- Wellness symbols in soft light
- Chakra points softly illuminated

**Finance**
- Elegant ascending curves of golden light
- Floating financial symbols in harmony
- Geometric growth patterns
- Balanced scales made of light

**Lifestyle**
- Peaceful contemplation moments
- Ethereal everyday objects
- Graceful poses suggesting balance
- Symbols of fulfillment

**Education**
- Light emanating from enlightened figures
- Floating books/knowledge symbols
- Glowing wisdom elements
- Illuminated understanding

**Business**
- Professional figures with success symbols
- Ethereal organizational charts
- Translucent growth indicators
- Inspired clarity moments

**Travel**
- Ethereal destination landmarks in mist
- Translucent maps or compasses
- Dreamy location silhouettes
- Glowing journey elements

**Food**
- Glowing organic ingredients
- Floating ethereal food elements
- Peaceful cooking meditation
- Harmonious culinary arrangements

## Custom Subject Examples

### Example 1: Technology Post
```
A serene person (mid-30s, eyes softly closed, gentle knowing smile) emerging from a radiant white-to-transparent gradient into an infinite bright white void, their hands gracefully open and floating forward as if effortlessly shaping glowing translucent holographic panels that surround them: one panel shows a luminous analytics dashboard with rising golden growth curves, another a clean booking calendar with soft event icons, another an elegant e-commerce grid of wellness products, all made of pure light and subtle gold-white energy, the entire scene bathed in sacred soft rim light
```

### Example 2: Health Post
```
A diverse woman (late 20s) in serene meditation pose, eyes gently closed with peaceful expression, floating in infinite white void, one hand on heart and one extended outward releasing soft lavender and mint healing energy, translucent chakra points along her spine glowing with delicate pastel light, surrounded by floating organic shapes representing wellness and balance, all dissolving into ethereal mist at the edges
```

### Example 3: Finance Post
```
A confident professional figure (mid-40s, diverse, eyes looking upward with knowing smile) standing amid elegant ascending curves of pure golden light representing financial growth, translucent coins and growth charts orbiting harmoniously around them, hands open in gesture of abundance and wisdom, geometric patterns of light forming stable foundation beneath, entire composition symbolizing conscious wealth building
```

## API Usage

### Method 1: Automatic (Recommended)
Let the system generate the subject from your content:

```typescript
const imageResponse = await generateImage({
  title: "Your Article Title",
  summary: "Your article summary or description",
  category: "technology",
  imageModel: 'gemini-2.5-flash-image'
});
```

### Method 2: Custom Subject
Provide your own detailed subject (style will be automatically applied):

```typescript
const imageResponse = await generateImage({
  subject: "A serene person gracefully coding with holographic screens...",
  category: "technology",
  imageModel: 'gemini-2.5-flash-image'
});
```

### Method 3: Full Custom Prompt
Override everything (use sparingly, may break style consistency):

```typescript
const imageResponse = await generateImage({
  prompt: "Complete custom prompt including style instructions...",
  imageModel: 'gemini-2.5-flash-image'
});
```

## Best Practices

### ✅ DO
- Keep subjects detailed and specific to the content
- Include human figures when appropriate (diverse, mid-20s to 40s)
- Use visual metaphors that relate to the topic
- Mention specific elements (e.g., "holographic dashboard", "healing energy")
- Focus on the transcendental, elevated interpretation of the topic

### ❌ DON'T
- Don't include text or UI elements in subject description
- Don't use harsh colors or sharp contrasts
- Don't specify photographic realism for skin (keep it luminous)
- Don't include mundane or literal representations
- Don't break the ethereal, spiritual aesthetic

## Subject Description Template

For best results, structure custom subjects like this:

```
[Person description: age, diversity, expression, pose] 
[emerging from radiant white-to-transparent gradient] 
[main action or centerpiece] 
[specific relevant elements: list 2-4 topic-related items] 
[all made of pure light/energy] 
[bathed in soft rim light] 
[symbolic meaning related to category]
```

## Testing Your Images

After generation:
1. Check if the image maintains the ethereal, minimalist aesthetic
2. Verify the subject matter relates clearly to your blog post
3. Ensure no text or UI elements appear
4. Confirm the 16:9 aspect ratio looks good as a header
5. Test readability if text will be overlaid (optional)

## Troubleshooting

**Images too similar**: Add more specific details to your article summaries
**Images off-brand**: Check that custom prompts include style guidelines
**Generation fails**: Simplify the subject, avoid controversial topics
**Wrong aspect ratio**: Verify model is `gemini-2.5-flash-image`

---

**Note**: The automatic system provides excellent results for most use cases. Only use custom subjects when you need very specific imagery that the automatic generation doesn't capture.
