# CODEX Usage Guide for AI Agents

**How humans and AI agents should interact with the VIBEUP Design System Codex.**

---

## For Humans: How to Prompt AI Agents

When instructing AI agents (Cursor, Claude, Copilot) to work on this codebase, include
this design system reference in your prompts.

### Basic Prompt Template

```
Before implementing anything, read and follow:
1. /design-system/GUIDELINES.md
2. /design-system/tools/cursor-prompt-base.txt

Use the appropriate template from /design-system/templates/ for your task.

After implementation, validate with:
node design-system/tools/check-consistency.js [file-path]

[Your specific request here]
```

### Example Prompts

**Creating a New Component:**

```
Read /design-system/tools/cursor-prompt-base.txt first.

Create a UserProfileCard component in components/profile/UserProfileCard.tsx that:
- Displays user avatar, name, and bio
- Has onClick handler for navigation
- Supports loading state
- Uses staggered animations for lists

Use /design-system/templates/component-template.tsx as the base.
Reference /design-system/templates/example-community-card.tsx for patterns.
```

**Creating a New Page:**

```
Follow the design system in /design-system/GUIDELINES.md.

Create a notifications page at app/notifications/page.tsx that:
- Lists all user notifications
- Has search and filter functionality
- Supports mark as read actions
- Uses proper loading/error/empty states

Use /design-system/templates/page-template.tsx as the starting point.
Reference /design-system/templates/example-discover-page.tsx for patterns.
```

**Creating a New Hook:**

```
Read /design-system/tools/cursor-prompt-base.txt and follow all rules.

Create a useNotifications hook in hooks/use-notifications.ts that:
- Fetches notifications from /api/notifications
- Supports real-time updates
- Provides mark as read functionality
- Includes proper error handling

Base it on /design-system/templates/hook-template.ts.
```

---

## For AI Agents: Required Reading

### Step 1: Load the Base Prompt

Before any implementation, internalize this prompt:

```
==============================================
VIBEUP DESIGN SYSTEM - AI AGENT PROMPT BASE
==============================================

CRITICAL INSTRUCTION FOR ALL AI AGENTS:

You MUST strictly follow the design system documented in /design-system when implementing ANY new feature, page, component, or code change.

REQUIRED READING BEFORE ANY IMPLEMENTATION:
1. /design-system/GUIDELINES.md - Complete design patterns and standards
2. /design-system/existing-patterns.json - Detailed pattern examples
3. /design-system/templates/ - Use appropriate template for your task

ENFORCEMENT RULES:
━━━━━━━━━━━━━━━━━━

1. COMPONENT CREATION
   → Read: /design-system/templates/component-template.tsx
   → Follow: Naming conventions (PascalCase, FeatureName + ComponentType)
   → Include: Props interface with JSDoc comments
   → Use: Proper composition pattern (forwardRef for UI, functional for features)
   → Add: Component documentation block with usage example

2. PAGE CREATION
   → Read: /design-system/templates/page-template.tsx
   → Follow: App Router structure (app/[route]/page.tsx)
   → Include: "use client" directive if interactive
   → Use: Standard layout pattern (sticky header, max-w-6xl container, mobile padding)
   → Implement: Loading, error, and empty states

3. HOOK CREATION
   → Read: /design-system/templates/hook-template.ts
   → Follow: use-[feature]-[aspect].ts naming
   → Include: TypeScript return type
   → Document: Hook purpose and usage with JSDoc

4. UTILITY FUNCTIONS
   → Read: /design-system/templates/utils-template.ts
   → Follow: camelCase naming (verb-noun pattern)
   → Place: In appropriate utils/ subdirectory
   → Include: Error handling with try-catch
   → Use: Unified logger for all logging

5. API ROUTES
   → Structure: app/api/[resource]/route.ts
   → Implement: Authentication check first
   → Use: DatabaseService.getInstance(supabase)
   → Return: Consistent { success, data, error } format
   → Add: Sentry error tracking

6. STYLING
   → Use: Tailwind CSS only (no inline styles)
   → Import: cn() utility for class composition
   → Apply: CVA (Class Variance Authority) for variants
   → Follow: Color system (#04282F background, #97D9C4 accent)
   → Support: Dark mode and responsive breakpoints

7. ERROR HANDLING
   → Use: Custom error classes (ValidationError, AuthenticationError, etc.)
   → Implement: Proper try-catch blocks
   → Log: With unified logger (logger.category.level)
   → Report: Sentry.captureException with tags/extra
   → Never: Silently catch errors without logging

8. TYPE SAFETY
   → Never: Use 'any' type
   → Use: Record<string, unknown> for objects
   → Use: unknown for error catches
   → Define: Explicit interfaces for all props
   → Add: JSDoc comments on all interfaces

9. OBSERVABILITY
   → Import: logger from @/utils/unified-logger
   → Use: Appropriate category (auth, api, database, ui, ai, hooks, general)
   → Add: Sentry.captureException for errors
   → Include: Context data in logs (userId, endpoint, etc.)

10. CODE ORGANIZATION
    → Group imports: External → Types → Internal → Feature
    → Order: Types/interfaces at top → Helpers → Main code
    → Structure: Based on epic/feature organization
    → Follow: File naming conventions from GUIDELINES.md

11. MOBILE-FIRST DESIGN
    → Ensure: Everything you build feels like a native mobile app and works perfectly on <640px screens
    → Default: Design for mobile first, then add sm/md/lg breakpoints
    → Touch: All interactive elements must be at least 44×44px
    → Spacing: Use consistent padding rhythm (px-3 sm:px-4, pb-28 sm:pb-24)
    → Modals: Prefer bottom-sheet patterns on mobile
    → Animations: Use native-like transitions (framer-motion or tailwind-animate)
    → Never: Use fixed pixel widths that exceed screen size

VERIFICATION CHECKLIST:
━━━━━━━━━━━━━━━━━━━━━

Before submitting ANY code:
□ Read relevant template from /design-system/templates/
□ Followed naming conventions from GUIDELINES.md
□ Added TypeScript types (no 'any')
□ Included JSDoc documentation
□ Implemented error handling with try-catch
□ Added logging with unified logger
□ Used Tailwind CSS (no inline styles)
□ Supported dark mode and responsive design
□ Tested loading/error/empty states
□ No console.log statements
□ TypeScript compiles with no errors
□ ESLint passes with no violations
□ Works on mobile (<640px) - feels like native app
□ Touch targets are at least 44×44px
□ No horizontal scroll on mobile

VALIDATION COMMAND:
━━━━━━━━━━━━━━━━━━

Run this to check consistency:
  node design-system/tools/check-consistency.js [file-path]

FAILURE TO FOLLOW THESE RULES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Violating the design system creates:
• Technical debt
• Inconsistent UX
• Harder maintenance
• Regression risks
• Failed code reviews

When in doubt, ASK before implementing. Reference the design system documentation FIRST, code SECOND.

==============================================
Last Updated: 2025-12-12
Version: 1.0.0
==============================================
```

### Step 2: Understand File Types

| Creating  | Read Template                      | Read Example                           |
| --------- | ---------------------------------- | -------------------------------------- |
| Component | `templates/component-template.tsx` | `templates/example-community-card.tsx` |
| Page      | `templates/page-template.tsx`      | `templates/example-discover-page.tsx`  |
| Hook      | `templates/hook-template.ts`       | -                                      |
| Utility   | `templates/utils-template.ts`      | -                                      |
| Epic Plan | `templates/epic-template.md`       | -                                      |

### Step 3: Follow Implementation Order

1. **Read the template** - Understand the expected structure
2. **Read the guidelines** - Understand the patterns
3. **Check existing patterns** - Find similar code in `existing-patterns.json`
4. **Implement** - Following all conventions
5. **Validate** - Run `check-consistency.js`
6. **Test** - Verify all states work

---

## Common Mistakes to Avoid

### ❌ Using `any` Type

```typescript
// WRONG
const data: any = response;
function process(item: any) {}

// CORRECT
const data = response as Record<string, unknown>;
function process(item: Record<string, unknown>) {}
```

### ❌ Using `console.log`

```typescript
// WRONG
console.log("User logged in", userId);

// CORRECT
import { logger } from "@/utils/unified-logger";
logger.auth.info("User logged in", { userId });
```

### ❌ Missing Error Handling

```typescript
// WRONG
async function fetchData() {
  const response = await fetch("/api/data");
  return response.json();
}

// CORRECT
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) throw new Error("Fetch failed");
    return response.json();
  } catch (error) {
    logger.api.error("Failed to fetch data", { error });
    throw error;
  }
}
```

### ❌ Inline Styles

```typescript
// WRONG
<div style={{ color: 'red', padding: '10px' }}>

// CORRECT
<div className="text-red-500 p-2.5">
```

### ❌ Missing Props Interface

```typescript
// WRONG
export function Card({ title, onClick }) {

// CORRECT
interface CardProps {
  /** Card title */
  title: string;
  /** Click handler */
  onClick?: () => void;
}

export function Card({ title, onClick }: CardProps) {
```

### ❌ Wrong Import Organization

```typescript
// WRONG
import { Card } from "@/components/ui/card";
import React from "react";
import { logger } from "@/utils/unified-logger";
import { motion } from "framer-motion";

// CORRECT
// External packages
import React from "react";
import { motion } from "framer-motion";

// Internal utilities
import { logger } from "@/utils/unified-logger";

// Components
import { Card } from "@/components/ui/card";
```

---

## Pattern Quick Reference

### Component Structure

```typescript
"use client";

/**
 * COMPONENT NAME
 * Brief description
 *
 * @example
 * <ComponentName title="Example" onClick={handler} />
 */

// External packages
import React from "react";
import { motion } from "framer-motion";

// Internal utilities
import { cn } from "@/lib/utils";
import { logger } from "@/utils/unified-logger";

// Types
interface ComponentNameProps {
  /** Required prop */
  title: string;
  /** Optional prop */
  onClick?: () => void;
  /** Custom styles */
  className?: string;
}

export function ComponentName({ title, onClick, className }: ComponentNameProps) {
  // State
  // Effects
  // Handlers
  // Render
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("base-styles", className)}
    >
      {title}
    </motion.div>
  );
}

ComponentName.displayName = "ComponentName";
```

### Page Structure

```typescript
"use client";

/**
 * PAGE NAME
 * Route: /route/path
 */

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { logger } from "@/utils/unified-logger";

export default function PageName() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      // Fetch data
    } catch (error) {
      logger.api.error('Failed to load', { error });
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // Loading state
  if (isLoading) return <LoadingSpinner />;

  // Error state
  if (error) return <ErrorMessage error={error} />;

  // Empty state
  if (!data.length) return <EmptyState />;

  // Main render
  return (
    <div className="min-h-screen w-full bg-[#04282F]">
      <div className="sticky top-0 z-50 bg-[#04282F] border-b border-white/10">
        <AppHeader title="Page Title" />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-6 pb-28 sm:pb-24">
        {/* Content */}
      </div>
    </div>
  );
}
```

### API Route Structure

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/database/supabase/server";
import { DatabaseService } from "@/database/services/database-service";
import { logger } from "@/utils/unified-logger";
import * as Sentry from "@sentry/nextjs";

export async function GET(request: NextRequest) {
  try {
    // 1. Auth
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

    // 2. Parse params
    const { searchParams } = new URL(request.url);

    // 3. Database operation
    const db = DatabaseService.getInstance(supabase);
    const result = await db.resource.fetch();

    // 4. Success response
    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    logger.api.error("Operation failed", { error });
    Sentry.captureException(error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

## Cursor Rules Integration

This design system works with Cursor's rules system. Relevant rules:

- `.cursor/rules/frontend/react-components.mdc` - Component patterns
- `.cursor/rules/code-style-and-zen-of-python.mdc` - Code style
- Always-applied rules for TypeScript, Git, etc.

When Cursor loads these rules, they complement this design system.

---

## Validation Before Commit

Always run before committing:

```bash
# Check specific file
node design-system/tools/check-consistency.js path/to/file.tsx

# Type check
npm run type-check

# Lint
npm run lint
```

Expected output for passing file:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Design System Consistency Check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File: components/NewComponent.tsx

Detected Type: component

✓ All checks passed!

This file follows design system guidelines.
```

---

## Questions for AI Agents

If uncertain about any pattern:

1. **Check `existing-patterns.json`** - Find similar code
2. **Check `GUIDELINES.md`** - Read the relevant section
3. **Check templates** - See the expected structure
4. **Ask the human** - When still unclear

Never guess. The design system exists to eliminate ambiguity.

---

**Version:** 1.0.0 **Last Updated:** 2025-12-12
