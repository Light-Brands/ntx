# 🚀 Quick Theme Testing Guide

## Test Your Code Example

Use this exact code snippet to verify all syntax highlighting works:

```typescript
// Mira prompts during profile building
interface ProfilePrompt {
  trigger: 'section_start' | 'incomplete' | 'completion';
  section: 'intentions' | 'values' | 'interests' | 'chemistry';
  message: string;
  suggestedAction?: string;
}

// Examples:
"Now that you've shared your intentions, let's explore what values guide your path."
"Your profile is 65% complete. Adding interests helps me connect you with aligned people."
"Chemistry unlocked! I can now show you deeper compatibility insights with connections."
```

## What Should Change

### 1. Switch to **Midnight Purple**
- ✅ `interface` → Purple (`#A78BFA`)
- ✅ `ProfilePrompt` → Gold (`#FBBF24`)
- ✅ `'section_start'` → Gold (`#FBBF24`)
- ✅ `string` → Purple Medium (`#8B5CF6`)
- ✅ `// Mira prompts...` → Purple Muted (`#B8A9D4`)

### 2. Switch to **Forest Night**
- ✅ `interface` → Green (`#86EFAC`)
- ✅ `ProfilePrompt` → Yellow (`#FCD34D`)
- ✅ `'section_start'` → Amber (`#F59E0B`)
- ✅ `string` → Green Medium (`#4ADE80`)
- ✅ `// Mira prompts...` → Green Muted (`#A3C9A3`)

### 3. Switch to **Ruby Noir**
- ✅ `interface` → Rose (`#FB7185`)
- ✅ `ProfilePrompt` → Gold (`#FBBF24`)
- ✅ `'section_start'` → Amber (`#F59E0B`)
- ✅ `string` → Rose Medium (`#F43F5E`)
- ✅ `// Mira prompts...` → Rose Muted (`#D4A5B3`)

## Step-by-Step Test

1. **Open any documentation page** with code blocks
2. **Find a TypeScript code example** (like the one above)
3. **Open theme switcher** (top-right corner)
4. **Switch between palettes** one by one
5. **Watch the code change colors** instantly

## What Each Element Should Do

| Element | Should Change To |
|---------|------------------|
| `interface` keyword | Primary accent color |
| `ProfilePrompt` class name | Gold/tertiary accent |
| `'section_start'` string | Warning/secondary color |
| `string` type | Medium accent color |
| `trigger` property | Teal/interactive color |
| `// comment` | Muted text color |

## If Colors Don't Change

### Quick Fixes:
1. **Hard Refresh**: `Cmd+Shift+R` or `Ctrl+Shift+R`
2. **Clear Browser Cache**
3. **Check DevTools Console** for errors
4. **Verify CSS loaded**: Look for `highlight-dark.css` in Network tab

### Verify CSS Variables:
Open DevTools → Elements → Select `<html>` → Styles → Look for:
```css
:root {
  --color-aqua-light: #97D9C4;  /* Should change with theme */
  --color-gold-accent: #D4AF37;  /* Should change with theme */
  --color-warning: #FF9800;      /* Should change with theme */
}
```

## Expected Behavior

✅ **Instant**: Colors change immediately (< 50ms)  
✅ **Smooth**: 300ms transition on color changes  
✅ **Complete**: ALL syntax elements update  
✅ **Persistent**: Theme saved to localStorage  

## Common Issues

### Issue: "Some colors change, but not all"
**Solution**: Hard refresh to reload CSS with `!important` rules

### Issue: "Colors flash back to default"
**Solution**: Check if `highlight-dark.css` is loading after other stylesheets

### Issue: "Inline code changes but blocks don't"
**Solution**: Verify both `<code>` and `<pre>` elements have proper classes

---

**Pro Tip**: Test with **3+ different palettes** to ensure full coverage. The most dramatic changes will be visible switching between:
- Onyx → Midnight Purple (dark → purple)
- Forest Night → Ruby Noir (green → red)
- Desert Sand → Deep Ocean (light → dark)

**Status**: ✅ All syntax highlighting now theme-aware with `!important` flags  
**Last Updated**: December 2025

