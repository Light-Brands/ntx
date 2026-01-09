# Visual Identity

**Visual design system for {BRAND_NAME}**

## Color Palette

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| Primary | #000000 | Main brand color |
| Secondary | #666666 | Supporting elements |
| Accent | #0066FF | Interactive elements, CTAs |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| Success | #22C55E | Positive feedback |
| Warning | #F59E0B | Caution states |
| Error | #EF4444 | Error states |
| Info | #3B82F6 | Informational |

### Background Colors

| Name | Hex | Usage |
|------|-----|-------|
| Background | #FFFFFF | Primary background |
| Surface | #F5F5F5 | Card backgrounds |
| Elevated | #FAFAFA | Elevated surfaces |

## Typography

### Font Family

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Type Scale

| Name | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Display | 48px | 700 | 1.1 | Hero headlines |
| H1 | 32px | 700 | 1.2 | Page titles |
| H2 | 24px | 600 | 1.3 | Section headers |
| H3 | 20px | 600 | 1.4 | Subsections |
| Body | 16px | 400 | 1.5 | Main content |
| Small | 14px | 400 | 1.5 | Secondary text |
| Caption | 12px | 400 | 1.4 | Labels, captions |

## Spacing

Based on 4px grid system:

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight spacing |
| sm | 8px | Component padding |
| md | 16px | Standard spacing |
| lg | 24px | Section spacing |
| xl | 32px | Large gaps |
| 2xl | 48px | Page sections |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| sm | 4px | Buttons, inputs |
| md | 8px | Cards |
| lg | 16px | Modals, large cards |
| full | 9999px | Pills, avatars |

## Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

## Iconography

- Use consistent icon set (Lucide, Heroicons, etc.)
- Icon sizes: 16px, 20px, 24px
- Stroke width: 1.5px - 2px
- Match icon color with text color

## Motion

```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--easing-default: cubic-bezier(0.4, 0, 0.2, 1);
```

---

*Template from Onyx Design System*
