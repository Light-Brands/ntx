# Design System Plugin

A comprehensive, standardized design system for modern web applications. Ensures consistent, accessible, mobile-first UI development across all features and projects.

## What's Included

### Cursor Rules (`.mdc`)
- **Mobile-first responsive design** - Touch-friendly, works perfectly <640px
- **Component architecture patterns** - Naming, props, composition patterns
- **TypeScript standards** - Type safety, error handling, API patterns
- **Styling guidelines** - Tailwind + CVA, dark mode, animations
- **Accessibility standards** - ARIA, keyboard navigation, semantic HTML
- **Performance best practices** - Image optimization, lazy loading, memoization

### Claude Code Context (`.md`)
- Quick reference guide for AI agents
- Common patterns and code snippets
- Validation checklist
- Key principles and examples

### Templates
- **Component template** - Full-featured React component with animations
- **Page template** - Next.js App Router page with loading/error states
- **API route template** - Next.js API route with proper error handling

## Installation

### Claude Code
```bash
/plugin install design-system
```

### Cursor
Bootstrap script will install automatically when you run:
```bash
/ai-coding-config
```

Or manually copy `cursor/design-system.mdc` to your project's `.cursor/rules/` directory.

## What You Get

### Mobile-First by Default
- Everything designed for <640px first
- Touch-friendly targets (44×44px minimum)
- Responsive breakpoints: `sm:`, `md:`, `lg:`
- Native-app feel with smooth animations

### Type Safety First
- No `any` types allowed
- Explicit interfaces for all props
- Typed error classes that map to HTTP codes
- Proper error handling patterns

### Accessible by Default
- Semantic HTML elements
- ARIA labels on all icon buttons
- Keyboard navigation support
- Visible focus states

### Consistent Patterns
- Component naming: `FeatureName` + `ComponentType`
- Props ordering: Required → Optional → `className` last
- File organization: External → Types → Internal → Components
- API responses: `{ success, data, error }` format

## Key Patterns

### Component Creation
```typescript
interface ComponentNameProps {
  data: DataType;
  onClick?: () => void;
  className?: string;
}

export function ComponentName({ data, onClick, className }: ComponentNameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("base-styles", className)}
    >
      {/* Content */}
    </motion.div>
  );
}
```

### Page Structure
```typescript
export default function PageName() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataType[]>([]);

  // Loading → Error → Empty → Main render
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;
  if (!data.length) return <EmptyState />;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0" />
      <main className="max-w-6xl mx-auto px-4 py-6 pb-28 sm:pb-24">
        {/* Content */}
      </main>
    </div>
  );
}
```

### API Routes
```typescript
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await fetchData(searchParams);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    logger.error("Failed", { error });
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## Usage in Projects

Once installed, AI assistants will automatically:
- Follow mobile-first responsive patterns
- Create components with proper TypeScript types
- Include accessibility features (ARIA, keyboard nav)
- Use consistent naming and file organization
- Handle errors properly with typed error classes
- Add smooth animations with framer-motion

## Customization

The design system is meant to be a starting point. You can:
- Override styles with `className` prop on any component
- Extend the color palette in your `tailwind.config.ts`
- Add project-specific patterns to your local `.cursor/rules/`
- Create additional templates for your common use cases

## Stack Compatibility

Works best with:
- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + CVA (Class Variance Authority)
- **Animation**: Framer Motion
- **State**: React Hooks + custom hooks
- **Validation**: Zod (optional)

But the principles apply to any modern web stack!

## Philosophy

1. **Mobile-first** - Design for mobile, enhance for desktop
2. **Type safety** - Catch errors at compile time
3. **Accessibility** - Make it usable for everyone
4. **Performance** - Fast by default
5. **Consistency** - Same patterns everywhere
6. **Developer experience** - Clear, documented, maintainable

## Examples

See the `templates/` directory for complete examples:
- `component-template.tsx` - Full component with all features
- `page-template.tsx` - Complete page with states
- `api-route-template.ts` - API route with validation

## Contributing

Found a better pattern? Submit a PR! The design system evolves with real-world usage.

---

**Version**: 1.0.0
**Maintainer**: AI Coding Config Team
**License**: MIT








