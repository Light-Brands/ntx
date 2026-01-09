# Code Syntax Highlighting Color Map

## Your Example Breakdown

```typescript
// Mira prompts during profile building
interface ProfilePrompt {
  trigger: 'section_start' | 'incomplete' | 'completion';
  section: 'intentions' | 'values' | 'interests' | 'chemistry';
  message: string;
  suggestedAction?: string;
}
```

### Element-by-Element Mapping

| Element | Class | Theme Color | CSS Variable |
|---------|-------|-------------|--------------|
| `// Mira prompts...` | `.hljs-comment` | Muted gray | `var(--color-moonlight-muted)` |
| `interface` | `.hljs-keyword` | Aqua | `var(--color-aqua-light)` |
| `ProfilePrompt` | `.hljs-title.class_` | Gold | `var(--color-gold-accent)` |
| `trigger` | `.hljs-attr` | Teal | `var(--color-teal-light)` |
| `'section_start'` | `.hljs-string` | Warning/Orange | `var(--color-warning)` |
| `\|` | `.hljs-operator` | Aqua | `var(--color-aqua-light)` |
| `string` | `.hljs-built_in` | Aqua Medium | `var(--color-aqua-medium)` |
| `?` | `.hljs-operator` | Aqua | `var(--color-aqua-light)` |

## Complete Color Scheme

### Keywords & Control Flow
**Color**: Aqua Light (`var(--color-aqua-light)`)
- `interface`, `class`, `function`, `const`, `let`, `var`
- `if`, `else`, `for`, `while`, `return`
- `import`, `export`, `from`, `as`
- `async`, `await`, `try`, `catch`

### Types & Built-ins
**Color**: Aqua Medium (`var(--color-aqua-medium)`)
- `string`, `number`, `boolean`, `any`, `void`
- `Array`, `Object`, `Promise`, `Map`, `Set`
- Built-in JavaScript types

### Class & Interface Names
**Color**: Gold Accent (`var(--color-gold-accent)`)
- `ProfilePrompt`, `UserData`, `ApiResponse`
- Class names, interface names, type names

### Functions & Methods
**Color**: Teal Light (`var(--color-teal-light)`)
- Function names
- Method calls
- Constructor names

### Properties & Attributes
**Color**: Teal Light (`var(--color-teal-light)`)
- Object properties: `trigger`, `section`, `message`
- HTML attributes: `class`, `id`, `href`
- CSS properties: `color`, `margin`, `padding`

### Strings
**Color**: Warning/Orange (`var(--color-warning)`)
- `'section_start'`, `"Hello World"`
- Template literals
- Regular expressions

### Comments
**Color**: Moonlight Muted (`var(--color-moonlight-muted)`)
- `// Single line comments`
- `/* Multi-line comments */`
- JSDoc comments

### Numbers & Literals
**Color**: Warning/Orange (`var(--color-warning)`)
- `42`, `3.14`, `0xFF`
- `true`, `false`, `null`, `undefined`

### Operators & Punctuation
**Color**: Aqua Light (`var(--color-aqua-light)`)
- `|`, `&`, `?`, `:`
- `=`, `+`, `-`, `*`, `/`
- `=>`, `...`, `?.`

## Testing Your Code

To verify the colors are working:

1. **Switch to a different palette** (e.g., Midnight Purple)
2. **Check each element type**:
   - Comments should be muted/dimmed
   - Keywords should be primary accent color
   - Strings should be warning/secondary color
   - Types should be medium accent
   - Classes should be gold/tertiary accent

## Color Palette Variations

### Onyx (Default)
- Keywords: `#97D9C4` (Aqua Light)
- Strings: `#FF9800` (Warning Orange)
- Classes: `#D4AF37` (Gold)
- Comments: `#A0A0A0` (Muted Gray)

### Midnight Purple
- Keywords: `#A78BFA` (Purple Light)
- Strings: `#FBBF24` (Gold)
- Classes: `#FBBF24` (Gold)
- Comments: `#B8A9D4` (Purple Muted)

### Forest Night
- Keywords: `#86EFAC` (Green Light)
- Strings: `#F59E0B` (Amber)
- Classes: `#FCD34D` (Yellow)
- Comments: `#A3C9A3` (Green Muted)

## CSS Specificity

All syntax rules now use `!important` to override any conflicting styles:

```css
.hljs-keyword {
  color: var(--color-aqua-light) !important;
}

.hljs-string {
  color: var(--color-warning) !important;
}

.hljs-title.class_ {
  color: var(--color-gold-accent) !important;
}
```

This ensures theme colors always apply, even with complex HTML structures.

## Troubleshooting

If colors still don't change:

1. **Hard refresh**: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
2. **Check CSS variables**: Open DevTools → Elements → `:root` → Styles
3. **Verify classes**: Inspect code element to see applied classes
4. **Clear cache**: Browser settings → Clear cached files
5. **Check console**: Look for CSS loading errors

---

**Last Updated**: December 2025  
**Version**: 2.0.2

