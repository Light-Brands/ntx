# VIBEUP Design System Codex

**The authoritative source for all UI/UX patterns, coding standards, and development
conventions in VIBEUP.**

> 🤖 **AI Agents:** Start with `CODEX_USAGE.md` for prompting instructions.

---

## Quick Start

### For Humans

1. **Read First:** `GUIDELINES.md` - Complete development standards
2. **Use Templates:** Copy from `templates/` for new components, pages, hooks
3. **Validate Code:** Run `node tools/check-consistency.js <file-path>`

### For AI Agents

1. **Read First:** `CODEX_USAGE.md` - How to use this design system
2. **Before Implementation:** Load `tools/cursor-prompt-base.txt` into context
3. **Reference:** `existing-patterns.json` for code examples

---

## Structure

```
design-system/
├── README.md                    # This file - entry point
├── CODEX_USAGE.md              # AI agent prompting guide
├── GUIDELINES.md               # Complete development standards
├── existing-patterns.json      # Extracted code patterns (machine-readable)
│
├── templates/                  # Copy-paste templates
│   ├── README.md              # Template usage guide
│   ├── component-template.tsx # React component template
│   ├── page-template.tsx      # Next.js page template
│   ├── hook-template.ts       # Custom hook template
│   ├── utils-template.ts      # Utility functions template
│   ├── epic-template.md       # Feature planning template
│   ├── example-*.tsx          # Real-world examples
│   └── ...
│
└── tools/                      # Enforcement tools
    ├── README.md              # Tools documentation
    ├── cursor-prompt-base.txt # AI agent prompt prefix
    ├── lint-rules.md          # ESLint rules for enforcement
    └── check-consistency.js   # Automated consistency checker
```

---

## Core Principles

### 1. Consistency Over Preference

Every component, page, and function follows the same patterns. No exceptions.

### 2. Type Safety First

- **Never** use `any` type
- Use `unknown` for error catches
- Use `Record<string, unknown>` for generic objects
- Define explicit interfaces for all props

### 3. Observable by Default

- Use `logger` from `@/utils/unified-logger` (never `console.log`)
- Integrate Sentry for error tracking
- Add context to all logs

### 4. Mobile-First, Dark-Mode Native

- Design for mobile, enhance for desktop
- Default theme: dark (`#04282F` background)
- Accent color: `#97d8c4` (aqua-light)

---

## Key Patterns at a Glance

### Component Props

```typescript
interface ComponentNameProps {
  /** Required: Primary data */
  data: DataType;

  /** Optional: Click handler */
  onClick?: () => void;

  /** Optional: Loading state */
  isLoading?: boolean;

  /** Optional: Custom styles */
  className?: string;
}
```

### Page Layout

```typescript
<div className="min-h-screen w-full bg-[#04282F]">
  {/* Sticky Header */}
  <div className="sticky top-0 z-50 bg-[#04282F] border-b border-white/10">
    <AppHeader title="Page Title" />
  </div>

  {/* Main Content */}
  <div className="max-w-6xl mx-auto px-4 py-6 pb-28 sm:pb-24">
    {/* Content */}
  </div>
</div>
```

### Error Handling

```typescript
try {
  const result = await operation();
  return result;
} catch (error) {
  logger.api.error("Operation failed", { error });
  Sentry.captureException(error, { tags: { action: "operation" } });
  throw error;
}
```

### Styling with Tailwind

```typescript
import { cn } from "@/lib/utils";

className={cn(
  "base-styles here",
  "hover:hover-styles",
  { "conditional-style": condition },
  className // Allow overrides
)}
```

---

## File Reference

| File                               | Purpose               | Read When            |
| ---------------------------------- | --------------------- | -------------------- |
| `GUIDELINES.md`                    | Complete standards    | Starting any work    |
| `existing-patterns.json`           | Code examples         | Need specific syntax |
| `templates/component-template.tsx` | Component boilerplate | Creating components  |
| `templates/page-template.tsx`      | Page boilerplate      | Creating pages       |
| `templates/hook-template.ts`       | Hook boilerplate      | Creating hooks       |
| `templates/utils-template.ts`      | Utility boilerplate   | Creating utils       |
| `templates/epic-template.md`       | Feature planning      | Planning epics       |
| `tools/cursor-prompt-base.txt`     | AI prompt prefix      | AI implementation    |
| `tools/lint-rules.md`              | Linting rules         | Setting up linting   |
| `tools/check-consistency.js`       | Validation script     | Before committing    |

---

## Technology Stack

```yaml
framework: Next.js 13+ (App Router)
language: TypeScript (strict mode)
styling: Tailwind CSS + CVA (Class Variance Authority)
state: React Hooks + Custom Hooks
database: Supabase + Service Layer Pattern
validation: Zod schemas
logging: Unified Logger (categorized)
monitoring: Sentry
animations: Framer Motion
```

---

## Color System

### Primary (Backgrounds)

| Name        | Hex       | Usage                |
| ----------- | --------- | -------------------- |
| Deep Abyss  | `#04282F` | Main background      |
| Teal Depths | `#083B4A` | Secondary background |
| Teal Mystic | `#052A31` | Tertiary background  |

### Accent (Highlights)

| Name        | Hex       | Usage              |
| ----------- | --------- | ------------------ |
| Aqua Light  | `#97D9C4` | Primary accent     |
| Aqua Medium | `#6BC7A8` | Secondary accent   |
| Gold        | `#fbbf24` | Special highlights |

### Semantic (CSS Variables)

```css
--background: hsl(...) --foreground: hsl(...) --primary: hsl(...)
  --destructive: hsl(...) --muted: hsl(...);
```

---

## Validation Workflow

### Before Committing

```bash
# 1. Check file against design system
node design-system/tools/check-consistency.js path/to/file.tsx

# 2. TypeScript check
npm run type-check

# 3. ESLint
npm run lint

# 4. All clear? Commit!
git add path/to/file.tsx
git commit -m "feat: add new component"
```

### Checklist

- [ ] TypeScript compiles with no errors
- [ ] ESLint passes with no violations
- [ ] No `any` types
- [ ] No `console.log` statements
- [ ] Proper error handling with try-catch
- [ ] Logging with unified logger
- [ ] JSDoc documentation added
- [ ] Responsive design tested
- [ ] Dark mode works

---

## Examples in Templates Folder

| Example                      | Demonstrates                            |
| ---------------------------- | --------------------------------------- |
| `example-community-card.tsx` | Card component, animations, images      |
| `example-app-header.tsx`     | Complex component, state, accessibility |
| `example-discover-page.tsx`  | Full page, data fetching, filtering     |

---

## Related Workspace Rules

The design system works alongside these workspace rules:

- `.cursor/rules/frontend/react-components.mdc`
- `.cursor/rules/code-style-and-zen-of-python.mdc`
- TypeScript Coding Standards (always applied)
- Git Collaboration Rules (always applied)

---

## Contributing

When adding to the design system:

1. Update `GUIDELINES.md` with new patterns
2. Update `existing-patterns.json` with code examples
3. Add templates if creating new file types
4. Update validation tools if adding new rules
5. Test changes with `check-consistency.js`

---

## Version History

| Version | Date       | Changes                     |
| ------- | ---------- | --------------------------- |
| 1.0.0   | 2025-12-12 | Initial design system codex |

---

## Questions?

1. Check `GUIDELINES.md` for detailed standards
2. Review `templates/` for examples
3. Run `check-consistency.js` to validate
4. Ask in team Slack channel

---

**Maintainer:** VIBEUP Development Team **Last Updated:** 2025-12-12
