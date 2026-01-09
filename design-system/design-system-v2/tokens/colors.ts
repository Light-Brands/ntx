/**
 * Onyx Design System - Color Tokens
 * Single source of truth for all color values
 * 
 * @see ../spec/brand/01-visual-identity.md - Brand philosophy
 * @see ../spec/design/DESIGN-SYSTEM.md - Implementation guide
 */

export const colors = {
  // ============================================================================
  // Abyss (Background) Scale - Deep, immersive dark backgrounds
  // ============================================================================
  
  /**
   * Primary background color - Deep immersive darkness
   * @usage Page backgrounds, app canvas
   * @contrast 18.1:1 with moonlight (AAA)
   */
  'abyss-base': '#0D0D0D',
  
  /**
   * Elevated surface background - Card and modal backgrounds
   * @usage Cards, modals, elevated surfaces
   * @contrast 16.2:1 with moonlight (AAA)
   */
  'abyss-mystic': '#121212',
  
  /**
   * Interactive background - Hover and active states
   * @usage Hover states, interactive element backgrounds
   * @contrast 14.1:1 with moonlight (AAA)
   */
  'abyss-light': '#1A1A1A',
  
  /**
   * Subtle separator - Borders and dividers
   * @usage Borders, dividers, subtle separators
   * @contrast 9.8:1 with moonlight (AA)
   */
  'abyss-lighter': '#2A2A2A',
  
  // ============================================================================
  // Moonlight (Text) Scale - Clear, readable text emerging from darkness
  // ============================================================================
  
  /**
   * Primary text color - Maximum readability
   * @usage Headings, body text, primary content
   * @contrast 18.1:1 on abyss-base (AAA)
   */
  'moonlight': '#F5F5F5',
  
  /**
   * Secondary text color - Slightly muted
   * @usage Secondary content, descriptions
   * @contrast 14.5:1 on abyss-base (AAA)
   */
  'moonlight-soft': '#E0E0E0',
  
  /**
   * Tertiary text color - Subtle, helper text
   * @usage Captions, metadata, timestamps, helper text
   * @contrast 7.2:1 on abyss-base (AA)
   */
  'moonlight-muted': '#A0A0A0',
  
  // ============================================================================
  // Accent Colors - Signature VIBEUP colors for energy and interaction
  // ============================================================================
  
  /**
   * Primary accent color - VIBEUP's signature aqua
   * @usage Primary buttons, links, Mira AI elements, primary CTAs
   * @contrast 10.5:1 on abyss-base (AAA)
   * @meaning Energy, transformation, Mira's presence
   */
  'aqua-light': '#97D9C4',
  
  /**
   * Secondary accent color - Hover states
   * @usage Button hover states, secondary accents, gradient endpoints
   * @contrast 8.9:1 on abyss-base (AA)
   * @meaning Sustained energy, active states
   */
  'aqua-medium': '#7BC4B1',
  
  /**
   * Interactive accent color - Links and secondary interactions
   * @usage Links, interactive elements, supporting accents
   * @contrast 7.5:1 on abyss-base (AA)
   * @meaning Connection, sustained practice, harmony
   */
  'teal-light': '#5BB8B0',
  
  /**
   * Premium accent color - Special moments and achievements
   * @usage Premium features, achievements, recognition, special highlights
   * @contrast 8.2:1 on abyss-base (AA)
   * @meaning Wisdom, achievement, recognition
   */
  'gold-accent': '#D4AF37',
  
  // ============================================================================
  // Semantic Colors - Universal feedback following conventions
  // ============================================================================
  
  /**
   * Success color - Positive feedback
   * @usage Success states, completed actions, positive feedback
   * @contrast 6.8:1 on abyss-base (AA)
   */
  'success': '#4CAF50',
  
  /**
   * Warning color - Caution states
   * @usage Warnings, pending actions, caution states
   * @contrast 5.9:1 on abyss-base (AA)
   */
  'warning': '#FF9800',
  
  /**
   * Error color - Destructive actions
   * @usage Error states, destructive actions, critical alerts
   * @contrast 6.2:1 on abyss-base (AA)
   */
  'error': '#EF5350',
  
  /**
   * Info color - Informational states
   * @usage Informational states, tips, guidance, neutral feedback
   * @contrast 7.1:1 on abyss-base (AA)
   */
  'info': '#29B6F6',
} as const;

export type ColorToken = keyof typeof colors;

/**
 * Color migration reference from old VIBEUP spec to Onyx palette
 * 
 * Old Token           -> New Token
 * vibe-deep-blue      -> aqua-light
 * vibe-white          -> abyss-base (inverted for dark mode)
 * vibe-graphite       -> moonlight (inverted for dark mode)
 * vibe-sky-blue       -> teal-light
 * vibe-soft-aqua      -> aqua-medium
 * vibe-midnight       -> abyss-mystic
 */
export const colorMigration = {
  'vibe-deep-blue': 'aqua-light',
  'vibe-white': 'abyss-base',
  'vibe-graphite': 'moonlight',
  'vibe-sky-blue': 'teal-light',
  'vibe-soft-aqua': 'aqua-medium',
  'vibe-midnight': 'abyss-mystic',
  'vibe-light-grey': 'abyss-lighter',
  'vibe-cool-grey': 'moonlight-muted',
} as const;

