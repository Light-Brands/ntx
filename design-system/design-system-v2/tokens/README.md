# VIBEUP Design Tokens

**Single Source of Truth** for all design values in the VIBEUP Onyx Design System.

> **Philosophy**: For the WHY behind these values, see [../spec/brand/01-visual-identity.md](../spec/brand/01-visual-identity.md)  
> **Implementation Guide**: For HOW to use these tokens, see [../spec/design/DESIGN-SYSTEM.md](../spec/design/DESIGN-SYSTEM.md)

---

## Overview

Design tokens are the atomic values that power the entire VIBEUP design system. Every color, spacing value, typography setting, and shadow is defined here once and used everywhere.

**Key Principle**: Never hardcode design values—always import from tokens.

---

## Token Categories

| File | Purpose | Tokens | Import |
|------|---------|--------|--------|
| [`colors.ts`](colors.ts) | Color palette | 17 colors | `import { colors } from '../tokens';` |
| [`typography.ts`](typography.ts) | Type system | Families, sizes, weights, spacing | `import { typography } from '../tokens';` |
| [`spacing.ts`](spacing.ts) | Spatial system | 30 spacing + 13 radius values | `import { spacing, borderRadius } from '../tokens';` |
| [`shadows.ts`](shadows.ts) | Elevation & glows | 16 shadow definitions | `import { shadows } from '../tokens';` |
| [`index.ts`](index.ts) | Unified export | All tokens | `import { colors, typography, spacing, shadows } from '../tokens';` |

---

## Quick Start

### Importing Tokens

```typescript
// Import all tokens
import { colors, typography, spacing, borderRadius, shadows } from '../tokens';

// Import specific categories
import { colors } from '../tokens';
import { typography } from '../tokens';
```

### Using Tokens in Components

```typescript
// In styled components or inline styles
const MyComponent = () => (
  <div style={{
    backgroundColor: colors['abyss-base'],
    color: colors['moonlight'],
    padding: spacing['6'],
    borderRadius: borderRadius['vibe-card'],
    boxShadow: shadows['elevation'],
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base
  }}>
    Content
  </div>
);

// In Tailwind classes (after config)
<div className="bg-abyss-base text-moonlight p-6 rounded-vibe-card shadow-elevation">
  Content
</div>
```

---

## Color Tokens

### Background Scale (Abyss)

Deep, immersive dark backgrounds creating focus and calm:

```typescript
colors['abyss-base']     // #0D0D0D - Primary page background
colors['abyss-mystic']   // #121212 - Card backgrounds, elevated surfaces
colors['abyss-light']    // #1A1A1A - Hover states, interactive backgrounds
colors['abyss-lighter']  // #2A2A2A - Borders, dividers, subtle separators
```

**Usage**:
- Page backgrounds: `abyss-base`
- Cards, modals: `abyss-mystic`
- Hover states: `abyss-light`
- Borders: `abyss-lighter`

**Accessibility**: High contrast with all text colors (18:1+ ratios)

### Text Scale (Moonlight)

Clear, readable text emerging from darkness:

```typescript
colors['moonlight']       // #F5F5F5 - Primary text, headings (18.1:1 contrast)
colors['moonlight-soft']  // #E0E0E0 - Secondary text, descriptions (14.5:1)
colors['moonlight-muted'] // #A0A0A0 - Captions, metadata, helper text (7.2:1)
```

**Usage**:
- Headings, body text: `moonlight`
- Descriptions, secondary content: `moonlight-soft`
- Captions, timestamps: `moonlight-muted`

**Accessibility**: All meet or exceed WCAG AA standards on dark backgrounds

### Accent Colors

Signature VIBEUP colors for energy and interaction:

```typescript
colors['aqua-light']   // #97D9C4 - Primary accent, Mira's color (10.5:1 contrast)
colors['aqua-medium']  // #7BC4B1 - Secondary accent, hover states
colors['teal-light']   // #5BB8B0 - Interactive elements, links
colors['gold-accent']  // #D4AF37 - Premium features, achievements
```

**Usage**:
- Primary CTAs: `aqua-light`
- Button hover states: `aqua-medium`
- Links, secondary interactions: `teal-light`
- Premium highlights: `gold-accent`

**Brand Meaning**:
- Aqua = Energy, transformation, Mira's presence
- Teal = Connection, sustained practice
- Gold = Achievement, wisdom, recognition

### Semantic Colors

Universal feedback colors following conventions:

```typescript
colors['success']  // #4CAF50 - Success states, positive feedback
colors['warning']  // #FF9800 - Warnings, pending states
colors['error']    // #EF5350 - Errors, destructive actions
colors['info']     // #29B6F6 - Informational states, tips
```

**Usage**: Standard feedback patterns—don't reinvent meanings

---

## Typography Tokens

### Font Families

```typescript
typography.fontFamily.sans  // ['Inter', 'SF Pro', 'system-ui', 'sans-serif']
typography.fontFamily.mono  // ['JetBrains Mono', 'Fira Code', 'monospace']
```

**Why Inter**: Clarity at any size, modern without being trendy, humanistic warmth

### Font Sizes

```typescript
typography.fontSize.xs     // 0.75rem (12px) - Micro text
typography.fontSize.sm     // 0.875rem (14px) - Small text, captions
typography.fontSize.base   // 1rem (16px) - Body text default
typography.fontSize.lg     // 1.125rem (18px) - Large body
typography.fontSize.xl     // 1.25rem (20px) - Small headings
typography.fontSize['2xl'] // 1.5rem (24px) - Section headings
typography.fontSize['3xl'] // 1.875rem (30px) - Page headings
typography.fontSize['4xl'] // 2.25rem (36px) - Hero text
```

**Scale Philosophy**: Each step creates natural rhythm, comfortable reading at base size

### Font Weights

```typescript
typography.fontWeight.light     // 300 - Captions, subtle text
typography.fontWeight.normal    // 400 - Body text
typography.fontWeight.medium    // 500 - Emphasis
typography.fontWeight.semibold  // 600 - Subheadings
typography.fontWeight.bold      // 700 - Headings
typography.fontWeight.black     // 900 - Hero text
```

### Letter Spacing

```typescript
typography.letterSpacing.tight      // -0.025em - Tight headings
typography.letterSpacing.normal     // 0 - Body text
typography.letterSpacing.wide       // 0.025em - Comfortable spacing
typography.letterSpacing.wider      // 0.05em - Airy spacing
typography.letterSpacing['ultra-wide']  // 0.2em - Hero text impact
```

**Usage**: Hero text gets ultra-wide tracking for impact, body text stays normal

---

## Spacing Tokens

### Spacing Scale (4px Grid)

```typescript
spacing['0']   // 0 - No spacing
spacing['1']   // 0.25rem (4px) - Micro spacing
spacing['2']   // 0.5rem (8px) - Tight spacing
spacing['3']   // 0.75rem (12px) - Comfortable inline
spacing['4']   // 1rem (16px) - Default spacing
spacing['6']   // 1.5rem (24px) - Comfortable spacing
spacing['8']   // 2rem (32px) - Section spacing
spacing['12']  // 3rem (48px) - Major section breaks
spacing['16']  // 4rem (64px) - Page-level divisions
spacing['24']  // 6rem (96px) - Large divisions
spacing['32']  // 8rem (128px) - Maximum spacing
```

**Philosophy**: Based on 4px grid for visual rhythm, generous spacing creates calm

**Common Patterns**:
- Card padding: `spacing['6']` (24px)
- Section margins: `spacing['12']` (48px)
- Inline gaps: `spacing['2']` (8px)
- Page padding: `spacing['4']` (16px)

### Border Radius

```typescript
borderRadius['sm']        // 0.125rem (2px) - Subtle rounding
borderRadius['default']   // 0.25rem (4px) - Default
borderRadius['lg']        // 0.5rem (8px) - Noticeable rounding
borderRadius['xl']        // 0.75rem (12px) - Prominent rounding
borderRadius['2xl']       // 1rem (16px) - Cards
borderRadius['3xl']       // 1.5rem (24px) - Modals, buttons
borderRadius['vibe-btn']  // 1.5rem (24px) - VIBEUP button standard
borderRadius['vibe-card'] // 1rem (16px) - VIBEUP card standard
borderRadius['full']      // 9999px - Circles, pills
```

**Brand Standard**: 12-24px creates approachable, modern feel without being trendy

---

## Shadow Tokens

### Standard Elevations

```typescript
shadows['sm']       // Subtle elevation - Slight lift
shadows['default']  // Standard card elevation
shadows['md']       // Medium elevation - Prominent cards
shadows['lg']       // Large elevation - Modals
shadows['xl']       // Maximum elevation - Hero elements
shadows['2xl']      // Extreme elevation - Overlays
```

**Usage**: Match elevation to importance and z-index hierarchy

### Brand-Specific Glows

```typescript
shadows['mira-glow']         // Mira AI elements - Aqua glow at 20% opacity
shadows['mira-glow-intense'] // Active Mira states - Aqua glow at 30% opacity
shadows['aqua-glow']         // Accent button hovers - Aqua glow at 15% opacity
shadows['gold-glow']         // Premium features - Gold glow at 15% opacity
shadows['teal-glow']         // Interactive accents - Teal glow at 15% opacity
```

**Philosophy**: Glows create energy and draw attention without being aggressive

### Inner Shadows

```typescript
shadows['inner']     // Subtle inner shadow - Depth
shadows['inner-lg']  // Prominent inner shadow - Recessed elements
```

---

## Migration Guide

### From Hardcoded Values

```typescript
// ❌ Before - Hardcoded
const Button = styled.button`
  background-color: #97D9C4;
  color: #0D0D0D;
  border-radius: 24px;
  padding: 12px 24px;
  box-shadow: 0 0 20px rgba(151, 217, 196, 0.15);
`;

// ✅ After - Using tokens
import { colors, borderRadius, spacing, shadows } from '../tokens';

const Button = styled.button`
  background-color: ${colors['aqua-light']};
  color: ${colors['abyss-base']};
  border-radius: ${borderRadius['vibe-btn']};
  padding: ${spacing['3']} ${spacing['6']};
  box-shadow: ${shadows['aqua-glow']};
`;
```

### Common Replacements

| Hardcoded Value | Token | Notes |
|-----------------|-------|-------|
| `#0D0D0D` | `colors['abyss-base']` | Primary background |
| `#121212` | `colors['abyss-mystic']` | Card background |
| `#F5F5F5` | `colors['moonlight']` | Primary text |
| `#97D9C4` | `colors['aqua-light']` | Primary accent |
| `#D4AF37` | `colors['gold-accent']` | Premium highlights |
| `24px` | `borderRadius['vibe-btn']` | Button radius |
| `16px` | `borderRadius['vibe-card']` | Card radius |
| `24px` | `spacing['6']` | Comfortable spacing |
| `48px` | `spacing['12']` | Section spacing |

---

## Tailwind Integration

### Configuration

```javascript
// tailwind.config.js
import { colors, typography, spacing, borderRadius, shadows } from './tokens';

export default {
  theme: {
    extend: {
      colors: colors,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      spacing: spacing,
      borderRadius: borderRadius,
      boxShadow: shadows,
    },
  },
};
```

### Usage in Classes

```typescript
// Colors
<div className="bg-abyss-base text-moonlight border-abyss-lighter">

// Typography
<h1 className="font-sans text-4xl font-black tracking-ultra-wide">

// Spacing
<div className="p-6 gap-2 space-y-12">

// Border Radius
<div className="rounded-vibe-card">

// Shadows
<div className="shadow-elevation hover:shadow-aqua-glow">
```

---

## Best Practices

### DO

✓ Always import tokens, never hardcode values  
✓ Use semantic token names (`aqua-light` not `#97D9C4`)  
✓ Reference tokens in component documentation  
✓ Update tokens when design changes (single source of truth)  
✓ Test accessibility with token-based colors

### DON'T

✗ Hardcode hex colors, pixel values, or inline styles  
✗ Create "magic numbers" outside the token system  
✗ Duplicate token values in multiple places  
✗ Override token values with inline styles  
✗ Use tokens from other design systems

---

## Token Philosophy

**Atomic Design Values**: Tokens are the atoms of our design system—the smallest, most fundamental units that combine to create molecules (components) and organisms (pages).

**Single Source of Truth**: When a design value needs to change, update the token once. All components using that token update automatically.

**Semantic Naming**: Token names describe meaning, not appearance. `aqua-light` communicates "primary accent" better than `color-1` or `#97D9C4`.

**Accessibility Built-In**: Token values are chosen for WCAG AA+ compliance. Using tokens ensures accessible designs by default.

**Brand Consistency**: Tokens encode brand philosophy into code. Every component using tokens automatically embodies VIBEUP's visual identity.

---

## Related Documentation

- **Brand Philosophy (WHY)**: [../spec/brand/01-visual-identity.md](../spec/brand/01-visual-identity.md)
- **Implementation Guide (HOW)**: [../spec/design/DESIGN-SYSTEM.md](../spec/design/DESIGN-SYSTEM.md)
- **Component Catalog**: [../spec/design/COMPONENT-CATALOG.md](../spec/design/COMPONENT-CATALOG.md)
- **Main README**: [../README.md](../README.md)

---

**Design Tokens Version**: 2.0.0  
**Total Tokens**: 76 (17 colors + 24 typography + 43 spacing/radius + 16 shadows)  
**Last Updated**: December 19, 2025

