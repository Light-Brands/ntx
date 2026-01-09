# Development Guidelines

**Core development standards for the design system**

## Code Standards

### TypeScript

```typescript
// Always use explicit types
interface Props {
  variant: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
}

// Use functional components
export function Button({ variant, size = 'md', disabled, children }: Props) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }))}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

### Component Patterns

```typescript
// 1. Always export component and types
export interface CardProps {
  title: string;
  children: React.ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-lg bg-surface p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
}

// 2. Use composition over configuration
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>

// 3. Forward refs when needed
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={cn(inputStyles, className)} {...props} />;
  }
);
```

### Styling

```typescript
// Use design tokens, never hardcode values
// ❌ Bad
<div className="bg-[#0D0D0D] p-[24px]">

// ✅ Good
<div className="bg-abyss-base p-6">

// Use cn() for conditional classes
import { cn } from '@/lib/utils';

<div className={cn(
  'base-styles',
  isActive && 'active-styles',
  className
)}>
```

## File Organization

```
components/
├── ComponentName/
│   ├── index.ts              # Exports
│   ├── ComponentName.tsx     # Main component
│   ├── ComponentName.test.tsx # Tests
│   └── variants.ts           # Style variants (optional)
```

## Testing Standards

```typescript
// Test user behavior, not implementation
describe('Button', () => {
  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## Accessibility Checklist

- [ ] Semantic HTML elements
- [ ] ARIA labels where needed
- [ ] Keyboard navigation
- [ ] Focus management
- [ ] Color contrast (4.5:1 minimum)
- [ ] Screen reader testing

## Performance Guidelines

1. **Lazy load** components below the fold
2. **Memoize** expensive computations
3. **Virtualize** long lists
4. **Optimize** images with next/image
5. **Debounce** search inputs

---

*Onyx Design System*
