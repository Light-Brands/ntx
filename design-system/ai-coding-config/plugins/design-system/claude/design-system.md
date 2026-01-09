# Design System for Claude Code

This design system ensures consistent, accessible, mobile-first UI development for modern web applications.

## Core Principles

1. **Mobile-First**: Design for <640px first, enhance for larger screens
2. **Type Safety First**: Never use `any`, explicit interfaces for all props
3. **Accessible by Default**: Semantic HTML, ARIA labels, keyboard navigation
4. **Native-App Feel**: Smooth animations, touch-friendly targets (44×44px minimum)
5. **Dark Mode Native**: Support dark mode from the start

## Quick Reference

### Component Creation

```typescript
/**
 * COMPONENT NAME
 * Brief description
 *
 * @example
 * <ComponentName title="Example" onClick={handler} />
 */

interface ComponentNameProps {
  /** Required: Primary data */
  data: DataType;
  
  /** Optional: Click handler */
  onClick?: () => void;
  
  /** Optional: Custom styles */
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
"use client";

export default function PageName() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/endpoint');
        const result = await response.json();
        if (result.success) setData(result.data);
      } catch (error) {
        logger.error('Failed to load', { error });
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (!data.length) return <EmptyState />;

  return (
    <div className="min-h-screen w-full">
      <div className="sticky top-0 z-50 border-b">
        <header />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-6 pb-28 sm:pb-24">
        {/* Content */}
      </div>
    </div>
  );
}
```

### Mobile-First Styling

```typescript
// Always start with mobile, then add breakpoints
className="text-sm sm:text-base md:text-lg"
className="px-3 sm:px-4 md:px-6"
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

// Touch-friendly targets (minimum 44×44px)
className="min-h-[44px] min-w-[44px] p-3"

// Mobile navigation clearance (ALWAYS include on pages)
className="pb-28 sm:pb-24"
```

### Interaction States

```typescript
className={cn(
  "transition-all duration-200",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
  "hover:bg-accent/10 hover:border-primary/30",
  "active:scale-95 active:bg-accent/5"
)}
```

### API Routes

```typescript
export async function GET(request: NextRequest) {
  try {
    // 1. Auth check
    // 2. Parse params
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    
    // 3. Fetch data
    const result = await fetchData(query);
    
    // 4. Return success
    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    logger.error("Operation failed", { error });
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## Checklist Before Commit

Mobile:
- [ ] Works at 320px width
- [ ] Touch targets ≥ 44×44px
- [ ] No horizontal scroll
- [ ] Bottom padding for nav (pb-28 sm:pb-24)

Code Quality:
- [ ] TypeScript compiles
- [ ] ESLint passes
- [ ] No `any` types
- [ ] No `console.log` (use logger)
- [ ] JSDoc comments added
- [ ] Error handling present

Accessibility:
- [ ] Semantic HTML
- [ ] ARIA labels on icon buttons
- [ ] Keyboard navigation works
- [ ] Focus states visible

Design:
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] Animations smooth
- [ ] Component documented

## Key Patterns

**Component Naming**: `FeatureName` + `ComponentType` (e.g., `UserProfileCard`, `SearchFilterBar`)

**Props Pattern**: Required first, optional after, `className` last

**Styling**: Use `cn()` utility for class composition, CVA for variants

**State**: Local `useState` for component state, custom hooks for reusable logic

**Animations**: framer-motion for native-feeling interactions

**Error Handling**: Let errors bubble up unless you have specific recovery logic

**File Organization**: External imports → Types → Internal utils → Components








