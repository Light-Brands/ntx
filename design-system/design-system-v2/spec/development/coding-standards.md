# Coding Standards

**Code conventions and style guide**

## TypeScript

### Strict Mode
Always use TypeScript strict mode.

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### Type Definitions

```typescript
// ✅ Explicit types for function parameters and returns
function processUser(user: User): ProcessedUser {
  return { ...user, processed: true };
}

// ✅ Interface for object shapes
interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// ✅ Union types for variants
type ButtonVariant = 'primary' | 'secondary' | 'ghost';

// ✅ Utility types
type PartialUser = Partial<User>;
type UserKeys = keyof User;
```

### Avoid `any`

```typescript
// ❌ Bad
function process(data: any) { ... }

// ✅ Good
function process(data: unknown) {
  if (isValidData(data)) {
    // data is now typed
  }
}

// ✅ Also good - generic
function process<T>(data: T): ProcessedData<T> { ... }
```

## React

### Component Structure

```typescript
// 1. Imports
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// 2. Types
interface Props {
  title: string;
  children: React.ReactNode;
}

// 3. Component
export function Card({ title, children }: Props) {
  // 3a. Hooks
  const [isOpen, setIsOpen] = useState(false);

  // 3b. Handlers
  const handleToggle = () => setIsOpen(!isOpen);

  // 3c. Render
  return (
    <div className="card">
      <h2 onClick={handleToggle}>{title}</h2>
      {isOpen && children}
    </div>
  );
}
```

### Hooks Best Practices

```typescript
// ✅ Custom hooks for reusable logic
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ✅ Cleanup in effects
useEffect(() => {
  const subscription = subscribe(callback);
  return () => subscription.unsubscribe();
}, []);
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile` |
| Functions | camelCase | `getUserById` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Types/Interfaces | PascalCase | `UserResponse` |
| Files (components) | PascalCase | `UserProfile.tsx` |
| Files (utils) | camelCase | `formatDate.ts` |

## File Organization

```
src/
├── components/
│   └── Button/
│       ├── index.ts         # export { Button }
│       ├── Button.tsx       # Component
│       ├── Button.test.tsx  # Tests
│       └── variants.ts      # Style variants
├── hooks/
│   └── useAuth.ts
├── lib/
│   ├── utils.ts
│   └── api.ts
└── types/
    └── index.ts
```

## Git Commits

```
feat: add user authentication
fix: resolve login redirect issue
docs: update API documentation
refactor: simplify user service
test: add integration tests for auth
chore: update dependencies
```

---

*Onyx Design System*
