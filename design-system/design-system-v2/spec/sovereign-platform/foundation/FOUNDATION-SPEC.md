# Foundation Layer Specification

> The bedrock upon which every sovereign platform is built. This layer defines tooling, technology stack, architectural patterns, coding standards, and the complete specification framework.

## Philosophy

The Foundation Layer is **never skipped**. It provides:

- **Consistency** - Same patterns across all platforms
- **Quality** - Enforced through tooling and tests
- **Observability** - Everything is visible and traceable
- **Spec-First** - Specifications are the source of truth

```
"The spec IS the codebase.
Tests validate spec compliance.
Code implements the spec."
```

---

## Layer Components

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FOUNDATION LAYER                                   │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         SPECIFICATION                                    ││
│  │   Master Plan • Epics • Data Models • API Reference • Brand Guide       ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   TOOLING   │ │    STACK    │ │  PATTERNS   │ │  STANDARDS  │           │
│  │             │ │             │ │             │ │             │           │
│  │ Lint/Format │ │ Next.js     │ │ Service     │ │ TypeScript  │           │
│  │ Test        │ │ Supabase    │ │ Adapter     │ │ Strict      │           │
│  │ Monitor     │ │ PostgreSQL  │ │ Typed       │ │ Error       │           │
│  │ CI/CD       │ │ Drizzle     │ │ Errors      │ │ Handling    │           │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         DESIGN SYSTEM                                    ││
│  │   Tokens • Themes • Components • Layouts • Animations                   ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Tooling

### Development Tools

| Tool | Purpose | Configuration |
|------|---------|---------------|
| **TypeScript** | Type safety | `strict: true` |
| **ESLint** | Code quality | Consistent rules across projects |
| **Prettier** | Formatting | Single source of truth |
| **Ruff** | Python lint/format | Fast, opinionated |

### Testing Tools

| Tool | Purpose | Coverage Target |
|------|---------|-----------------|
| **Vitest/Jest** | Unit tests | 90%+ service layer |
| **React Testing Library** | Component tests | Critical paths |
| **Playwright** | E2E tests | User journeys |
| **PGlite** | In-memory PostgreSQL | Fast test execution |

### Monitoring Tools

| Tool | Purpose | Integration |
|------|---------|-------------|
| **Sentry** | Error tracking | All environments |
| **Structured Logging** | Observability | Context-first logging |
| **Performance Tracing** | Spans on operations | HTTP, LLM, DB |

### CI/CD Tools

| Tool | Purpose | Triggers |
|------|---------|----------|
| **GitHub Actions** | Pipeline automation | Push, PR, merge |
| **Pre-commit Hooks** | Quality gates | Lint, format, type-check |
| **Automated Deploys** | Continuous delivery | Main branch merge |

### Configuration

```yaml
# tooling.yaml
typescript:
  strict: true
  noImplicitAny: true
  noUnusedLocals: true

eslint:
  extends:
    - eslint:recommended
    - plugin:@typescript-eslint/recommended

prettier:
  semi: true
  singleQuote: true
  trailingComma: all
  tabWidth: 2

testing:
  coverage:
    service_layer: 90
    components: 70
    e2e: critical_paths

monitoring:
  sentry:
    dsn: "${SENTRY_DSN}"
    environment: "${NODE_ENV}"
    traces_sample_rate: 1.0
```

---

## 2. Technology Stack

### Backend

| Technology | Purpose | Why |
|------------|---------|-----|
| **Next.js 13+** | Framework | App Router, server components |
| **Supabase** | Backend-as-a-Service | Auth, DB, Storage, Realtime |
| **PostgreSQL** | Database | Reliable, feature-rich |
| **Drizzle** | ORM | Lightweight, SQL-focused, type-safe |
| **Row Level Security** | Data protection | Policy-based access control |

### Frontend

| Technology | Purpose | Why |
|------------|---------|-----|
| **React 18** | UI library | Component model, ecosystem |
| **TypeScript** | Type safety | Catch errors at compile time |
| **Tailwind CSS** | Styling | Utility-first, design tokens |
| **Framer Motion** | Animations | Spring physics, gestures |
| **Zustand/Context** | State management | Lightweight, hooks-based |

### AI Integration

| Technology | Purpose | Why |
|------------|---------|-----|
| **Claude** | Primary LLM | Best reasoning, safety |
| **Multi-provider Router** | LLM abstraction | Fallback, cost optimization |
| **Haiku** | Routing/classification | Fast, cheap for meta-modeling |

### Payments

| Technology | Purpose | Why |
|------------|---------|-----|
| **Stripe** | Fiat payments | Industry standard |
| **Base L2** | Crypto payments | Low fees, Ethereum security |
| **USDC** | Stablecoin | Price stability |

### Configuration

```yaml
# stack.yaml
backend:
  framework: nextjs
  version: "14"
  router: app

database:
  provider: supabase
  engine: postgresql
  orm: drizzle
  rls: enabled

frontend:
  library: react
  version: "18"
  styling: tailwind
  animations: framer-motion

ai:
  primary: claude
  router: multi-provider
  fallback: [openai, anthropic]

payments:
  fiat: stripe
  crypto:
    chain: base
    stablecoin: usdc
```

---

## 3. Architectural Patterns

### Service Adapter Pattern

All external integrations extend a base adapter:

```typescript
abstract class ServiceAdapter<TConfig, TClient> {
  protected config: TConfig;
  protected client: TClient;

  abstract initialize(): Promise<void>;
  abstract healthCheck(): Promise<boolean>;

  protected handleError(error: unknown): never {
    // Translate to ApplicationError
    throw new IntegrationError(this.constructor.name, error);
  }
}
```

### Typed Error Hierarchy

Errors have structure, not just messages:

```typescript
class ApplicationError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number,
    public context?: Record<string, unknown>
  ) {
    super(message);
  }
}

class ValidationError extends ApplicationError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'VALIDATION_ERROR', 400, context);
  }
}

class AuthenticationError extends ApplicationError {
  constructor(message: string) {
    super(message, 'AUTH_ERROR', 401);
  }
}

class NotFoundError extends ApplicationError {
  constructor(resource: string, id: string) {
    super(`${resource} not found: ${id}`, 'NOT_FOUND', 404, { resource, id });
  }
}
```

### Configuration as Data

Behavior is stored in data structures, not code:

```typescript
// Instead of hardcoded switch statements
const rewardConfig = {
  practice_complete: { base: 10, multipliers: { 7: 1.5, 30: 2.0 } },
  profile_complete: { base: 20 },
  community_post: { base: 5 },
} as const;

// Runtime lookup, not compiled logic
function getReward(action: string, context: RewardContext): number {
  const config = rewardConfig[action];
  if (!config) return 0;

  let amount = config.base;
  if (config.multipliers && context.streakDays) {
    amount *= config.multipliers[context.streakDays] ?? 1;
  }
  return amount;
}
```

### Concierge Pattern (Meta-Modeling)

Use small models to route to larger ones:

```typescript
// Fast, cheap model decides routing
const routingModel = 'claude-haiku';
const executionModel = 'claude-sonnet';

async function processRequest(request: UserRequest): Promise<Response> {
  // Haiku classifies the request (~$0.001)
  const classification = await classify(routingModel, request);

  // Route based on complexity
  if (classification.complexity === 'simple') {
    return execute(routingModel, request);
  } else {
    // Sonnet handles complex requests (~$0.015)
    return execute(executionModel, request);
  }
}
```

### HTTP Resilience

All HTTP calls have retry logic:

```typescript
const httpConfig = {
  timeout: 30000, // 30 seconds
  retries: 3,
  backoff: 'exponential',
  backoffLimit: 3000,
  retryOnStatus: [408, 429, 500, 502, 503, 504],
};
```

---

## 4. Coding Standards

### File Organization

```
lib/
├── db/                    # Database operations
│   ├── schema.ts         # Drizzle schema
│   ├── migrations/       # Database migrations
│   └── queries/          # Reusable queries
├── services/             # Business logic
│   ├── base.ts          # BaseDatabaseService
│   ├── practice.ts      # PracticeService
│   └── ...
├── integrations/         # External services
│   ├── stripe/
│   ├── sentry/
│   └── claude/
├── crypto/               # Crypto layer
│   ├── router.ts        # CryptoRouterService
│   ├── mira-safe.ts     # AI companion safe crypto
│   └── adapters/        # Chain adapters
└── utils/                # Shared utilities
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | `kebab-case.ts` | `practice-service.ts` |
| Classes | `PascalCase` | `PracticeService` |
| Functions | `camelCase` | `logPractice()` |
| Variables | `camelCase` | `currentStreak` |
| Constants | `SCREAMING_SNAKE` | `MAX_STREAK_DAYS` |
| Types | `PascalCase` | `PracticeRecord` |
| Interfaces | `PascalCase` | `IPracticeService` |

### Import Order

1. External packages
2. Types
3. Internal utilities
4. Feature code

```typescript
// 1. External
import { useState } from 'react';
import { z } from 'zod';

// 2. Types
import type { Practice, PracticeLog } from '@/types';

// 3. Internal utilities
import { db } from '@/lib/db';
import { logger } from '@/lib/observability';

// 4. Feature code
import { PracticeService } from '@/lib/services/practice';
```

### Function Guidelines

```typescript
// ✓ Good: Clear purpose, typed parameters and return
async function logPractice(
  userId: string,
  practiceId: string
): Promise<PracticeLog> {
  // Implementation
}

// ✗ Bad: Unclear purpose, any types
async function doThing(x: any): Promise<any> {
  // What does this do?
}
```

### Error Handling

```typescript
// ✓ Good: Specific recovery, general errors bubble up
async function fetchUser(id: string): Promise<User> {
  try {
    return await db.users.findUnique({ where: { id } });
  } catch (error) {
    if (error instanceof NotFoundError) {
      // Specific recovery
      return createDefaultUser(id);
    }
    // General errors bubble up
    throw error;
  }
}
```

### Testing Guidelines

```typescript
// Test behavior, not implementation
describe('PracticeService', () => {
  describe('logPractice', () => {
    it('creates a log entry for valid practice', async () => {
      const result = await service.logPractice(userId, practiceId);
      expect(result.success).toBe(true);
      expect(result.log).toBeDefined();
    });

    it('throws NotFoundError for invalid practice', async () => {
      await expect(
        service.logPractice(userId, 'invalid-id')
      ).rejects.toThrow(NotFoundError);
    });

    it('calculates streak correctly after logging', async () => {
      await service.logPractice(userId, practiceId);
      const streak = await service.getStreak(userId, practiceId);
      expect(streak.currentStreak).toBe(1);
    });
  });
});
```

---

## 5. Design System Integration

The Foundation Layer integrates with the Design System:

### Token System

```typescript
// Import from design system
import { colors, spacing, typography } from '@/design-system/tokens';

// Use in components
<div
  className={`
    bg-${colors.background.primary}
    p-${spacing.md}
    text-${typography.body.base}
  `}
>
```

### Theme Provider

```typescript
// Wrap application with theme provider
import { ThemeProvider } from '@/design-system/contexts/ThemeContext';

export function App({ children }) {
  return (
    <ThemeProvider defaultTheme="dark" defaultFont="inter">
      {children}
    </ThemeProvider>
  );
}
```

### Component Usage

```typescript
// Import production-ready components
import { Button, Card, Input } from '@/design-system/components';

// Use with consistent styling
<Card>
  <Input placeholder="Enter your name" />
  <Button variant="primary">Submit</Button>
</Card>
```

---

## 6. Specification Framework

### Spec-Driven Development

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SPECIFICATION FRAMEWORK                              │
│                                                                              │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌───────────┐ │
│  │    SPEC     │────▶│   TESTS     │────▶│    CODE     │────▶│  VALIDATE │ │
│  │ (Markdown)  │     │ (Automated) │     │ (TypeScript)│     │  (CI/CD)  │ │
│  └─────────────┘     └─────────────┘     └─────────────┘     └───────────┘ │
│        │                   │                   │                   │        │
│        ▼                   ▼                   ▼                   ▼        │
│   Human-readable      Test cases         Implementation     Continuous     │
│   requirements        from criteria       satisfies tests   verification   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Spec Structure

```
brands/{brand}/spec/
├── MASTER-PLAN.md              # Vision and strategy
├── README.md                    # Navigation hub
│
├── epics/                       # Feature specifications
│   ├── epic-00-foundation.md
│   ├── epic-01-ai-companion.md
│   └── ...
│
├── architecture/                # Technical design
│   ├── data-models.md
│   ├── api-reference.md
│   └── ...
│
├── brand/                       # Brand identity
│   ├── visual-identity.md
│   ├── brand-voice.md
│   └── companion-personality.md
│
├── design/                      # UX/UI specifications
│   ├── DESIGN-SYSTEM.md
│   └── COMPONENT-CATALOG.md
│
└── development/                 # Coding infrastructure
    ├── CLAUDE.md               # AI project context
    ├── rules/                  # Coding standards
    └── commands/               # Workflow automation
```

### Writing Specifications

Every spec follows this pattern:

```markdown
# Feature Name

## Overview
What this feature does and why it matters.

## User Stories
- As a [user], I want to [action] so that [benefit]

## Acceptance Criteria
- [ ] Criterion 1 (becomes a test case)
- [ ] Criterion 2 (becomes a test case)
- [ ] Criterion 3 (becomes a test case)

## Data Model
Tables, fields, relationships.

## API Endpoints
Routes, methods, request/response formats.

## UI Components
Screens, components, interactions.

## AI Companion Integration
How the companion assists with this feature.

## Crypto Integration
Value exchange in this feature.

## Configuration
```yaml
feature:
  enabled: true
  options: ...
```

## Test Scenarios
Key scenarios to validate.
```

---

## Quick Start

### 1. Initialize Foundation

```bash
# Create new platform from template
cp -r design-system-v2/spec/sovereign-platform brands/{brand}/spec/

# Install dependencies
cd brands/{brand}
pnpm install

# Set up database
pnpm db:push

# Run development server
pnpm dev
```

### 2. Configure Tooling

```bash
# TypeScript config
cp config/tsconfig.foundation.json tsconfig.json

# ESLint config
cp config/.eslintrc.foundation.js .eslintrc.js

# Prettier config
cp config/.prettierrc.foundation.json .prettierrc
```

### 3. Verify Setup

```bash
# Run all checks
pnpm lint
pnpm type-check
pnpm test

# All must pass before proceeding
```

---

## See Also

- [TOOLING.md](./TOOLING.md) - Detailed tooling configuration
- [STACK.md](./STACK.md) - Technology stack decisions
- [PATTERNS.md](./PATTERNS.md) - Architectural patterns
- [STANDARDS.md](./STANDARDS.md) - Coding standards
- [SPECIFICATION.md](./SPECIFICATION.md) - Writing specifications
