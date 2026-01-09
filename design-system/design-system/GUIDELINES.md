# VIBEUP Design System Guidelines

**Version:** 1.0.0 **Last Updated:** 2025-12-12 **Purpose:** AI-optimized design
patterns and development standards

---

## Quick Reference

```yaml
framework: Next.js 13+ (App Router)
language: TypeScript (strict mode)
styling: Tailwind CSS + CVA
state: React Hooks + Custom Hooks
database: Supabase + Service Layer
validation: Zod schemas
logging: Unified Logger + Sentry
animations: Framer Motion
```

---

# Mobile-First & Native-App Feel

**Everything we build must feel like a native mobile app and work perfectly on screens
<640px.**

## Mandatory Rules

### 1. Fully Responsive (Mobile-First)

All new pages and components must be designed mobile-first, targeting screens under
640px as the default.

```typescript
// ✅ CORRECT: Mobile-first approach
className = "text-sm sm:text-base md:text-lg";
className = "px-3 sm:px-4 md:px-6";
className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

// ❌ WRONG: Desktop-first (requires overrides for mobile)
className = "text-lg md:text-base sm:text-sm";
```

### 2. Tailwind Mobile-First Breakpoints

Use breakpoints in order: default (mobile) → `sm` (640px) → `md` (768px) → `lg` (1024px)

```yaml
default: < 640px (mobile phones)
sm: ≥ 640px (large phones, small tablets)
md: ≥ 768px (tablets)
lg: ≥ 1024px (laptops)
xl: ≥ 1280px (desktops)
```

### 3. Touch-Friendly Targets

All interactive elements must have minimum 44×44px tappable areas.

```typescript
// ✅ CORRECT: Touch-friendly button
className = "w-9 h-9 sm:w-10 sm:h-10"; // 36px min, 40px on larger
className = "p-3"; // Padding creates 48px+ tappable area
className = "min-h-[44px] min-w-[44px]";

// ❌ WRONG: Too small for touch
className = "w-6 h-6"; // 24px - too small!
className = "p-1"; // Insufficient padding
```

### 4. Consistent Spacing Rhythm

Follow our established mobile padding/margin patterns:

```typescript
// Header padding (from example-app-header.tsx)
className = "px-3 sm:px-4 py-2.5 sm:py-3";

// Page content (from example-discover-page.tsx)
className = "max-w-6xl mx-auto px-4 py-6 pb-28 sm:pb-24";

// Component spacing
className = "space-x-2.5 sm:space-x-3";
className = "gap-2 sm:gap-4";

// Mobile navigation clearance (ALWAYS include)
className = "pb-28 sm:pb-24";
```

### 5. Bottom-Sheet Modals on Mobile

Prefer bottom-sheet patterns over centered popups for mobile screens.

```typescript
// ✅ CORRECT: Bottom sheet on mobile, modal on desktop
<div className={cn(
  "fixed inset-x-0 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2",
  "sm:-translate-x-1/2 sm:-translate-y-1/2",
  "rounded-t-2xl sm:rounded-xl",
  "max-h-[85vh] sm:max-h-[80vh]"
)}>

// Bottom sheet specific styling
className="safe-area-inset-bottom"  // Respect device safe areas
```

### 6. Focus & Hover/Tap States

All interactive elements must have visible focus states and appropriate hover/tap
feedback.

```typescript
// ✅ CORRECT: Complete interaction states
className={cn(
  "transition-all duration-200",
  // Focus state (keyboard navigation)
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#97d8c4]",
  // Hover state (desktop)
  "hover:bg-white/10 hover:border-[#97d8c4]/30",
  // Active/tap state (mobile)
  "active:scale-95 active:bg-white/5"
)}

// With framer-motion
whileHover={{ y: -2 }}
whileTap={{ scale: 0.95 }}
```

### 7. Native-Like Animations

Use framer-motion or Tailwind animate classes for native-feeling interactions.

```typescript
// Smooth entry animations
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3, ease: "easeOut" }}

// Staggered list animations
transition={{ delay: index * 0.05 }}

// Spring physics for interactive elements
whileTap={{ scale: 0.95 }}
transition={{ type: "spring", stiffness: 400, damping: 17 }}

// Tailwind animate classes
className="animate-spin"
className="animate-pulse"
className="transition-all duration-200"
```

### 8. No Fixed Widths Exceeding Screen

Never use fixed pixel widths that could exceed the viewport.

```typescript
// ✅ CORRECT: Responsive widths
className="w-full max-w-md"
className="w-full sm:w-96"
className="max-w-6xl mx-auto"

// ❌ WRONG: Fixed widths that break on mobile
className="w-[800px]"  // Will overflow on mobile!
style={{ width: "500px" }}  // Never do this
```

---

## Mobile Checklist

Before committing any UI code, verify:

- [ ] Looks correct at 320px width (smallest common phone)
- [ ] Touch targets are at least 44×44px
- [ ] No horizontal scroll on mobile
- [ ] Bottom padding accounts for mobile nav (pb-28)
- [ ] Focus states visible on keyboard navigation
- [ ] Animations feel smooth and native-like
- [ ] Modals slide from bottom on mobile
- [ ] Text is readable without zooming (min 14px)

---

# Component Design

## Naming Convention

**Pattern:** `FeatureName` + `ComponentType`

```typescript
// ✅ GOOD
CommunityCard.tsx;
ListingCard.tsx;
AppHeader.tsx;
ProfileAvatar.tsx;

// ❌ BAD
card.tsx;
component1.tsx;
MyComponent.tsx;
```

**Rules:**

- Use **PascalCase** for component names
- UI primitives use single names: `Button`, `Card`, `Input`
- Feature components use descriptive compound names
- File naming: PascalCase OR kebab-case (both allowed)

---

## Props Interface Pattern

**Always define explicit interfaces with JSDoc comments.**

```typescript
// ✅ REQUIRED PATTERN
interface ComponentNameProps {
  /** Primary data object */
  data: DataType;

  /** Optional callback when item is clicked */
  onClick?: () => void;

  /** Show loading state */
  isLoading?: boolean;

  /** Additional CSS classes */
  className?: string;
}
```

**Prop Ordering:**

1. Required props first
2. Optional props after
3. `className` always last

**Naming Conventions:**

```yaml
callbacks: "on" prefix (onClick, onSubmit, onComplete)
booleans: "show", "is", "has" prefix (showSearch, isActive, hasError)
data_props: descriptive nouns (user, community, message)
style_props: className (always optional)
```

---

## Component Composition Patterns

### Pattern 1: forwardRef (Base UI Components)

Use for low-level UI primitives that need ref forwarding.

```typescript
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

**When to use:** Button, Input, Card, Dialog - base UI components

---

### Pattern 2: Functional Components (Feature Components)

Use for feature-specific components with business logic.

```typescript
export function CommunityCard({
  community,
  onClick,
  index = 0
}: CommunityCardProps) {
  const router = useRouter();
  const { user } = useAuth();

  // Business logic here

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Component content */}
    </motion.div>
  );
}
```

**When to use:** Feature cards, list items, page sections

---

### Pattern 3: Compound Components

Use for complex UI with sub-components.

```typescript
// Export all related components together
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
};

// Usage
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

---

## Component Documentation

**Always include JSDoc block with usage example.**

````typescript
/**
 * APP HEADER
 * ==========
 *
 * Reusable header component used across all main app pages.
 * Features responsive layout with search, navigation, and action buttons.
 *
 * @example
 * ```tsx
 * <AppHeader
 *   title="Discovery"
 *   subtitle="Discover what aligns with your current energy."
 *   showSearch={true}
 *   onMenuClick={() => setShowSidebar(true)}
 * />
 * ```
 */
export function AppHeader({ title, subtitle, showSearch }: AppHeaderProps) {
  // ...
}
````

---

## State Management in Components

### Local State Pattern

```typescript
// ✅ Type your state properly
const [isOpen, setIsOpen] = useState<boolean>(false);
const [data, setData] = useState<Community | null>(null);
const [items, setItems] = useState<Item[]>([]);
```

### Custom Hooks Pattern

```typescript
// Extract complex logic to custom hooks
const { user, isAuthenticated, isLoading } = useAuth();
const { conversations, loadConversations } = useConversationState();
const { community, updateCommunity } = useCommunityState(communityId);
```

**Available Custom Hooks:**

```yaml
useAuth: Authentication state
useConversationState: Conversation management
useCommunityState: Community data
useOnboarding: Onboarding flow
```

---

## Animation Patterns

**Library:** Framer Motion

### Fade In (List Items)

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.05 }}
>
  {content}
</motion.div>
```

### Hover Effects

```typescript
<motion.div
  whileHover={{ y: -2 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  {content}
</motion.div>
```

---

# Page Structure

## File System Pattern

**Next.js App Router:** `app/[route]/page.tsx`

```yaml
routes:
  - route: "/community/discover"
    file: "app/community/discover/page.tsx"

  - route: "/business/[handle]"
    file: "app/business/[handle]/page.tsx"

  - route: "/profile/edit"
    file: "app/profile/edit/page.tsx"
```

**Naming:** Use kebab-case for directory names

---

## Page Template

```typescript
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/use-auth";
import { logger } from "@/utils/unified-logger";

export default function PageName() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/endpoint');
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        logger.general.error('Failed to load data', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Main render
  return (
    <div className="min-h-screen w-full bg-[#04282F]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#04282F] border-b border-white/10">
        <AppHeader title="Page Title" subtitle="Description" />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 pb-28 sm:pb-24">
        {/* Page content */}
      </div>
    </div>
  );
}
```

---

## Page Layout Standards

**Container Pattern:**

```typescript
className = "max-w-6xl mx-auto px-4 py-6";
```

**Mobile Navigation Spacing:**

```typescript
className = "pb-28 sm:pb-24"; // Bottom padding for mobile nav
```

**Sticky Header:**

```typescript
className = "sticky top-0 z-50 bg-[#04282F] border-b border-white/10";
```

---

## Conditional Rendering Patterns

### Loading State

```typescript
if (isLoading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin">Loading...</div>
    </div>
  );
}
```

### Error State

```typescript
if (error) {
  return <ErrorMessage error={error} />;
}
```

### Empty State

```typescript
if (!data.length) {
  return (
    <EmptyState
      message="No communities found"
      action={<Button onClick={onCreate}>Create One</Button>}
    />
  );
}
```

---

## Data Fetching Pattern

**Client-Side Fetching:**

```typescript
useEffect(
  () => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/endpoint", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.success) {
          setItems(data.data);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        logger.general.error("Failed to load data", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  },
  [
    /* dependencies */
  ]
);
```

---

## Metadata Export

**For SEO and PWA support:**

```typescript
export const metadata = {
  title: "VIBEUP - Page Title",
  description: "Page description for SEO",
  manifest: "/manifest.json",
};
```

---

# Function Patterns

## Async/Await Pattern

**Always use try-catch with async functions.**

```typescript
// ✅ CORRECT
async function fetchData(userId: string): Promise<UserData> {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    logger.api.error("Failed to fetch user data", error);
    throw error;
  }
}
```

**Never:**

```typescript
// ❌ WRONG - No error handling
async function fetchData(userId: string) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}
```

---

## Error Handling Pattern

**Use custom error classes for proper HTTP mapping.**

```typescript
import {
  ValidationError,
  AuthenticationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
} from "@/lib/errors";

// Validation errors (400)
if (!params.query) {
  throw new ValidationError("Query parameter is required");
}

// Authentication errors (401)
if (!bearerToken) {
  throw new AuthenticationError("Bearer token required");
}

// Not found errors (404)
const user = await db.user.findUnique({ where: { email } });
if (!user) {
  throw new NotFoundError("User");
}

// Conflict errors (409)
if (existingEmail) {
  throw new ConflictError("Email already registered");
}

// Rate limit errors (429)
if (requestCount > limit) {
  throw new RateLimitError("Too many requests");
}
```

**Error Mapping:**

```yaml
ValidationError: 400 Bad Request
AuthenticationError: 401 Unauthorized
NotFoundError: 404 Not Found
ConflictError: 409 Conflict
RateLimitError: 429 Too Many Requests
```

---

## Logging Pattern

**Use unified logger with categories.**

```typescript
import { logger } from "@/utils/unified-logger";

// Available categories
logger.auth.info("User logged in", { userId, email });
logger.api.error("API request failed", { endpoint, error });
logger.database.info("Query executed", { table, rowCount });
logger.ui.info("Modal opened", { modalId });
logger.ai.info("Assistant response generated", { tokens });
logger.hooks.info("State updated", { hookName, newState });
logger.general.info("General app event", { context });
```

**Log Levels:**

```yaml
info: Normal operations
warn: Warning conditions
error: Error conditions requiring attention
debug: Debug information (disabled in production)
```

**Environment Variables:**

```bash
ENABLE_ALL_LOGGING=true
ENABLE_CONSOLE_LOGGING=true
LOG_LEVEL=info
```

---

## Utility Function Organization

**Location:** `utils/[category]/[utility-name].ts`

```yaml
structure:
  - utils/general-utils/: Generic helpers
  - utils/auth/: Auth utilities
  - utils/security/: Security middleware
  - utils/api-config/: API configuration
```

**Naming:** camelCase, descriptive verb-noun

```typescript
// ✅ GOOD
formatDate();
validateEmail();
generateToken();
parseQueryParams();

// ❌ BAD
format();
validate();
gen();
parse();
```

---

# Epic & Feature Workflow

## Epic Structure

**Organization:** Feature-based with epic numbering

```yaml
epic_components:
  - database/services/[epic-name]-service.ts
  - app/api/[resource]/route.ts
  - types/[feature].ts
  - components/[feature]/
  - app/[feature]/page.tsx
```

---

## Epic Examples

### Epic 2: Enhanced Profiles

```yaml
services:
  - ProfileService
  - ProfileAttributeService
  - ConnectionService
types: types/epic2-profile.ts
api: app/api/profile/
components: components/core/profile/
```

### Epic 3: Practices & Intentions

```yaml
services:
  - PracticeService
types: types/practices.ts
api: app/api/practices/
components: components/core/practices/
```

### Epic 4: Social Features

```yaml
services:
  - MessagingService
  - SocialDiscoveryService
  - NotificationService
types: types/social.ts
api: app/api/connections/, app/api/notifications/
pages: app/discover/
```

### Epic 5: Impact Tracking

```yaml
services:
  - ImpactService
types: types/impact.ts
api: app/api/impact/
components: components/impact/
```

### Epic 6: Business Profiles

```yaml
services:
  - BusinessProfileService
types: types/business.ts
api: app/api/business/
components: components/business/
```

### Epic 7: Communities

```yaml
services:
  - CommunityService
types: types/community.ts
api: app/api/communities/
components: components/communities/
pages: app/community/
```

---

## Service Layer Pattern

**All database services extend `BaseDatabaseService`.**

```typescript
import { BaseDatabaseService } from "./base-database-service";

export class CommunityService extends BaseDatabaseService {
  async discoverCommunities(filters: CommunityFilters) {
    // Implementation
  }

  async getCommunity(id: string) {
    // Implementation
  }

  async createCommunity(data: CreateCommunityInput) {
    // Implementation
  }
}
```

**Access via Singleton:**

```typescript
import { DatabaseService } from "@/database/services/database-service";

const db = DatabaseService.getInstance(supabase);
const communities = await db.community.discoverCommunities(filters);
```

---

## API Route Pattern

**Structure:** `app/api/[resource]/route.ts`

**Template:**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/database/supabase/server";
import { DatabaseService } from "@/database/services/database-service";
import { logger } from "@/utils/unified-logger";
import * as Sentry from "@sentry/nextjs";

export async function GET(request: NextRequest) {
  try {
    // 1. Authentication
    const supabase = await createServerSupabase();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    // 2. Parse query params
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const limit = parseInt(searchParams.get("limit") || "20");

    // 3. Database operation
    const db = DatabaseService.getInstance(supabase);
    const result = await db.resource.fetchData({ search, limit });

    // 4. Success response
    return NextResponse.json({
      success: true,
      data: result,
      pagination: {
        total: result.length,
        limit,
      },
    });
  } catch (error: unknown) {
    logger.api.error("Operation failed", error);
    Sentry.captureException(error, {
      tags: { api: "resource" },
    });

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Authentication
    const supabase = await createServerSupabase();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    // 2. Parse and validate body
    const body = await request.json();

    // Optional: Zod validation
    // const validationResult = Schema.safeParse(body);
    // if (!validationResult.success) {
    //   return NextResponse.json(
    //     { error: 'Validation failed', details: validationResult.error.issues },
    //     { status: 400 }
    //   );
    // }

    // 3. Database operation
    const db = DatabaseService.getInstance(supabase);
    const result = await db.resource.create(body);

    // 4. Success response
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    logger.api.error("Operation failed", error);
    Sentry.captureException(error, {
      tags: { api: "resource" },
    });

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

## Validation with Zod

```typescript
import { z } from "zod";

const UpdateProfileSchema = z.object({
  display_name: z.string().min(1).max(100).optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  email: z.string().email().optional(),
});

// In API route
const body = await request.json();
const validationResult = UpdateProfileSchema.safeParse(body);

if (!validationResult.success) {
  return NextResponse.json(
    {
      error: "Validation failed",
      details: validationResult.error.issues,
    },
    { status: 400 }
  );
}

const validData = validationResult.data;
```

---

# Styling & Theming

## Tailwind CSS + CVA

**Core Utility:** `cn()` function

```typescript
import { cn } from "@/lib/utils";

// Merge classes with conflict resolution
className={cn(
  "rounded-lg bg-background p-4",
  "hover:bg-muted/50 transition-colors",
  { "border-blue-500": variant === "primary" },
  className  // Allow prop overrides
)}
```

---

## Variant Pattern (CVA)

**Use Class Variance Authority for component variants.**

```typescript
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

// Usage
<Button className={buttonVariants({ variant: "outline", size: "lg" })} />
```

---

## Color System

### Primary Colors

```yaml
deep-abyss: "#04282F" # Main background
teal-depths: "#083B4A" # Secondary background
teal-mystic: "#052A31" # Tertiary background
```

### Accent Colors

```yaml
aqua-light: "#97D9C4" # Primary accent
aqua-medium: "#6BC7A8" # Secondary accent
gold-accent: "#fbbf24" # Gold highlights
```

### Semantic Colors

```typescript
// Use CSS variables for theme-aware colors
className = "bg-background text-foreground";
className = "bg-primary text-primary-foreground";
className = "bg-destructive text-destructive-foreground";
className = "bg-muted text-muted-foreground";
```

---

## Dark Mode Pattern

**System:** Class-based dark mode (default: dark)

```typescript
// Always provide dark mode variants
className = "bg-white dark:bg-[#04282F] text-black dark:text-white";
className = "border-gray-200 dark:border-white/10";
className = "hover:bg-gray-100 dark:hover:bg-white/5";
```

---

## Responsive Design

**Mobile-First Approach:**

```typescript
className = "text-base sm:text-lg md:text-xl lg:text-2xl";
className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
className = "px-4 sm:px-6 lg:px-8";
```

**Breakpoints:**

```yaml
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## Typography

**Font Family:**

```yaml
sans: Ubuntu
mono: Ubuntu Mono
```

**Font Scale:**

```typescript
className = "text-sm"; // 14px
className = "text-base"; // 16px (default)
className = "text-lg"; // 18px
className = "text-xl"; // 20px
className = "text-2xl"; // 24px
className = "text-3xl"; // 30px
```

---

## Spacing Standards

**Container:**

```typescript
className = "max-w-6xl mx-auto";
```

**Padding:**

```typescript
className = "px-4 py-6"; // Standard page padding
className = "pb-28 sm:pb-24"; // Mobile nav clearance
className = "p-4"; // Card padding
```

**Gap (Flexbox/Grid):**

```typescript
className = "flex gap-4"; // Standard gap
className = "grid gap-6"; // Larger gap for grids
```

---

# Accessibility & Best Practices

## Semantic HTML

**Always use proper semantic elements.**

```typescript
// ✅ GOOD
<header>...</header>
<nav>...</nav>
<main>...</main>
<article>...</article>
<section>...</section>
<footer>...</footer>

// ❌ BAD
<div className="header">...</div>
<div className="navigation">...</div>
<div className="main-content">...</div>
```

---

## ARIA Labels

**Provide context for screen readers.**

```typescript
// Buttons without visible text
<button aria-label="Close dialog">
  <X className="h-4 w-4" />
</button>

// Icon buttons
<button aria-label="Search">
  <SearchIcon />
</button>

// Inputs
<input
  type="text"
  aria-label="Search communities"
  aria-describedby="search-hint"
/>
<span id="search-hint">Enter keywords to search</span>
```

---

## Keyboard Navigation

**Ensure all interactive elements are keyboard accessible.**

```typescript
// Tab navigation
<button tabIndex={0}>Focusable</button>
<div tabIndex={-1}>Not in tab order</div>

// Handle keyboard events
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Interactive div
</div>
```

---

## Focus Management

**Show focus indicators and manage focus flow.**

```typescript
// Focus visible styles
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"

// Auto-focus important elements
<input ref={inputRef} />

useEffect(() => {
  inputRef.current?.focus();
}, []);

// Trap focus in modals
import { FocusTrap } from "@/components/ui/focus-trap";

<FocusTrap>
  <Dialog>...</Dialog>
</FocusTrap>
```

---

## Performance Best Practices

### Image Optimization

```typescript
import Image from "next/image";

<Image
  src="/image.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

### Lazy Loading

```typescript
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <LoadingSpinner />,
  ssr: false
});
```

### Memoization

```typescript
import { useMemo, useCallback } from "react";

// Expensive computations
const filteredData = useMemo(() => {
  return data.filter((item) => item.active);
}, [data]);

// Stable function references
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

---

## Error Boundaries

**Let errors bubble to boundaries, don't catch unnecessarily.**

```typescript
// ✅ GOOD - Let it bubble
async function fetchData() {
  const response = await fetch("/api/data");
  return response.json();
}

// ❌ BAD - Silently swallowing errors
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    return response.json();
  } catch (error) {
    console.log("Error occurred"); // Lost context!
    return null;
  }
}
```

**Only catch when you have recovery logic:**

```typescript
// ✅ GOOD - Catch with recovery
try {
  await primaryAPI();
} catch (error) {
  logger.api.warn("Primary failed, using fallback", error);
  await fallbackAPI();
}
```

---

## Security Best Practices

### Authentication Check

```typescript
// Always verify auth in protected routes
const { user } = useAuth();

useEffect(() => {
  if (!user) {
    router.push("/auth/login");
  }
}, [user, router]);
```

### XSS Prevention

```typescript
// ✅ GOOD - React escapes by default
<div>{userInput}</div>

// ❌ DANGEROUS - Only use when absolutely necessary
<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
```

### Environment Variables

```typescript
// Client-side (public)
process.env.NEXT_PUBLIC_API_URL;

// Server-side only (private)
process.env.DATABASE_URL;
process.env.API_SECRET_KEY;
```

---

## Observability

### Structured Logging

```typescript
import { logger } from "@/utils/unified-logger";

logger.api.info("Request processed", {
  userId: user.id,
  endpoint: "/api/communities",
  duration: 150,
  statusCode: 200,
});
```

### Error Tracking

```typescript
import * as Sentry from "@sentry/nextjs";

try {
  await riskyOperation();
} catch (error) {
  logger.error("Operation failed", error);

  Sentry.captureException(error, {
    tags: {
      component: "api",
      action: "send_email",
    },
    extra: {
      userId,
      messageId,
      attemptCount,
    },
  });

  throw error;
}
```

### Performance Monitoring

```typescript
return await Sentry.startSpan(
  { op: "http.request", name: `${method} ${url}` },
  async (span) => {
    span.setAttribute("user_id", userId);
    const result = await execute();
    span.setStatus({ code: 1, message: "Success" });
    return result;
  }
);
```

---

## Testing Checklist

```yaml
unit_tests:
  - [ ] Component renders without errors
  - [ ] Props are properly typed
  - [ ] Event handlers work correctly
  - [ ] State updates as expected

integration_tests:
  - [ ] API routes return correct responses
  - [ ] Authentication flows work
  - [ ] Database operations succeed
  - [ ] Error handling works

accessibility_tests:
  - [ ] Keyboard navigation works
  - [ ] Screen reader labels present
  - [ ] Focus management correct
  - [ ] Color contrast passes WCAG AA

performance_tests:
  - [ ] No unnecessary re-renders
  - [ ] Images optimized
  - [ ] Lazy loading implemented
  - [ ] Bundle size reasonable
```

---

## Code Review Checklist

```yaml
before_commit:
  - [ ] TypeScript compiles with no errors
  - [ ] ESLint passes
  - [ ] No console.log statements
  - [ ] Imports organized correctly
  - [ ] JSDoc comments added
  - [ ] Error handling present
  - [ ] Logging statements added
  - [ ] Component documented

before_pr:
  - [ ] All tests pass
  - [ ] No regressions introduced
  - [ ] Performance tested
  - [ ] Accessibility verified
  - [ ] Mobile responsive
  - [ ] Dark mode works
  - [ ] Error cases handled
  - [ ] Security reviewed
```

---

## Common Anti-Patterns to Avoid

```typescript
// ❌ Using 'any' type
const data: any = response;

// ✅ Use proper types
const data = response as Record<string, unknown>;
const data: unknown = response;

// ❌ Missing error handling
async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}

// ✅ Always handle errors
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error('Fetch failed');
    return response.json();
  } catch (error) {
    logger.api.error('Failed to fetch data', error);
    throw error;
  }
}

// ❌ Inline styles
<div style={{ color: 'red', fontSize: '16px' }}>Text</div>

// ✅ Use Tailwind classes
<div className="text-red-500 text-base">Text</div>

// ❌ Not memoizing callbacks
<Child onClick={() => doSomething(id)} />

// ✅ Use useCallback
const handleClick = useCallback(() => doSomething(id), [id]);
<Child onClick={handleClick} />

// ❌ Using console.log
console.log('User logged in');

// ✅ Use unified logger
logger.auth.info('User logged in', { userId, email });
```

---

## File Organization Template

```
feature-name/
├── components/
│   ├── FeatureCard.tsx          # Feature component
│   ├── FeatureList.tsx          # List component
│   └── FeatureModal.tsx         # Modal component
├── hooks/
│   └── use-feature-state.ts     # Custom hook
├── types/
│   └── feature.ts               # Type definitions
├── utils/
│   └── feature-helpers.ts       # Utility functions
└── page.tsx                     # Main page
```

---

## Version History

```yaml
v1.0.0:
  date: 2025-12-12
  changes:
    - Initial guidelines document
    - Extracted patterns from existing codebase
    - Added AI-optimized structure
```

---

**For questions or clarifications, refer to:**

- `/design-system/README.md` - Design system entry point
- `/design-system/CODEX_USAGE.md` - AI agent prompting guide
- `/design-system/existing-patterns.json` - Detailed pattern examples
- TypeScript coding standards in workspace rules
- Git collaboration rules in workspace rules
