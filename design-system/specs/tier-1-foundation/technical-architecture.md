# VIBEUP Technical Architecture

> **Status**: 🚧 In Progress | **Last Updated**: [Date] | **Owner**: [Name]

This document defines the technical stack, architectural patterns, and development standards for VIBEUP. All code must follow these specifications.

## 🏗️ Architecture Overview

```
┌────────────────────────────────────────────────────────┐
│                    CLIENTS                             │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │   iOS App    │  │ Android App  │  │   Web App   │ │
│  │ (React Native)│  │(React Native)│  │   (Next.js) │ │
│  └───────┬──────┘  └──────┬───────┘  └──────┬──────┘ │
└──────────┼─────────────────┼──────────────────┼────────┘
           │                 │                  │
           └─────────────────┴──────────────────┘
                             │
┌────────────────────────────┴────────────────────────────┐
│              EDGE LAYER (Cloudflare Workers)            │
│  ┌──────────────────────────────────────────────────┐  │
│  │ • Rate Limiting         • DDoS Protection        │  │
│  │ • Auth Token Validation • Request Routing        │  │
│  │ • Caching               • Geographic Routing     │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────┐
│              API LAYER (Vercel Serverless)              │
│  ┌──────────────────────────────────────────────────┐  │
│  │ • Business Logic        • Input Validation       │  │
│  │ • Orchestration         • Error Handling         │  │
│  │ • Feature Flags         • Logging (Sentry)       │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────┐
│              SERVICE LAYER                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │ • Business Rules        • Data Access            │  │
│  │ • Domain Logic          • External API Calls     │  │
│  │ • Feature Flag Checks   • Event Emission         │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────┐
│              REPOSITORY LAYER                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │ • ONLY layer that touches database               │  │
│  │ • Query Building        • Transaction Management │  │
│  │ • Data Mapping          • Connection Pooling     │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────┐
│              DATA LAYER (Supabase)                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │ • PostgreSQL Database   • Authentication         │  │
│  │ • Real-time Subscriptions • Storage              │  │
│  │ • Row Level Security    • Edge Functions         │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend (Mobile & Web)

**Mobile Apps**
```
Framework:     React Native [Version]
Language:      TypeScript 5+
State:         [Zustand/Redux Toolkit/Jotai]
Navigation:    React Navigation
UI Library:    [React Native Paper/NativeBase/Custom]
Styling:       [StyleSheet/Styled Components]
Testing:       Jest + React Native Testing Library
E2E:           Detox
```

**Web App**
```
Framework:     Next.js [Version]
Language:      TypeScript 5+
State:         [Zustand/Redux Toolkit]
Styling:       Tailwind CSS + CSS Modules
Testing:       Vitest + React Testing Library
E2E:           Playwright
```

### Backend

**Serverless Functions (Vercel)**
```
Runtime:       Node.js 20+
Language:      TypeScript 5+
Framework:     Next.js API Routes
Validation:    Zod
Testing:       Vitest
```

**Edge Functions (Cloudflare Workers)**
```
Runtime:       Cloudflare Workers
Language:      TypeScript 5+
Purpose:       Auth, rate limiting, caching
Testing:       Miniflare + Vitest
```

### Database & Backend Services (Supabase)

```
Database:      PostgreSQL 15+
Auth:          Supabase Auth
Storage:       Supabase Storage
Real-time:     Supabase Realtime
Migrations:    Supabase CLI
```

### DevOps & Infrastructure

```
Version Control:   GitHub
CI/CD:             GitHub Actions
Hosting (Web):     Vercel
Hosting (API):     Vercel Serverless
Hosting (Edge):    Cloudflare Workers
CDN:               Cloudflare
Monitoring:        Sentry
Logging:           Sentry + Vercel Logs
Feature Flags:     [LaunchDarkly/PostHog/Custom]
Analytics:         [PostHog/Mixpanel/Amplitude]
```

---

## 📐 Architectural Patterns

### 1. Zero Direct Database Access

**NEVER** access the database directly from API routes or components.

```typescript
// ❌ WRONG - Direct database access
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data } = await supabase
    .from('users')
    .select('*')
  return Response.json(data)
}

// ✅ CORRECT - Through repository layer
import { UserRepository } from '@/repositories/UserRepository'

export async function GET() {
  const users = await UserRepository.findAll()
  return Response.json(users)
}
```

**Why?**
- Centralized query logic
- Cacheable at the repository level
- Easy to mock in tests
- Database-agnostic business logic
- Single place to add logging/tracing

### 2. Repository Pattern

**Every entity gets a repository.**

```typescript
// repositories/UserRepository.ts
import { supabase } from '@/lib/supabase'
import { logger } from '@/lib/logger'
import * as Sentry from '@sentry/nextjs'
import { cache } from '@/lib/cache'

export class UserRepository {
  private static readonly TABLE = 'users'
  private static readonly CACHE_TTL = 300 // 5 minutes

  static async findById(id: string): Promise<User | null> {
    // Start Sentry span
    return await Sentry.startSpan(
      { op: 'db.query', name: 'UserRepository.findById' },
      async () => {
        // Log operation
        logger.info({ userId: id }, 'Finding user by ID')

        // Check cache first
        const cached = await cache.get<User>(`user:${id}`)
        if (cached) {
          logger.debug({ userId: id }, 'User found in cache')
          return cached
        }

        // Query database
        const { data, error } = await supabase
          .from(this.TABLE)
          .select('*')
          .eq('id', id)
          .single()

        if (error) {
          logger.error({ error, userId: id }, 'Failed to find user')
          throw new DatabaseError('Failed to find user', { cause: error })
        }

        if (!data) {
          logger.debug({ userId: id }, 'User not found')
          return null
        }

        // Cache result
        await cache.set(`user:${id}`, data, this.CACHE_TTL)

        logger.info({ userId: id }, 'User found successfully')
        return data as User
      }
    )
  }

  static async create(input: CreateUserInput): Promise<User> {
    return await Sentry.startSpan(
      { op: 'db.mutation', name: 'UserRepository.create' },
      async () => {
        logger.info({ email: input.email }, 'Creating user')

        const { data, error } = await supabase
          .from(this.TABLE)
          .insert(input)
          .select()
          .single()

        if (error) {
          logger.error({ error, input }, 'Failed to create user')
          throw new DatabaseError('Failed to create user', { cause: error })
        }

        logger.info({ userId: data.id }, 'User created successfully')
        return data as User
      }
    )
  }

  static async update(id: string, updates: UpdateUserInput): Promise<User> {
    return await Sentry.startSpan(
      { op: 'db.mutation', name: 'UserRepository.update' },
      async () => {
        logger.info({ userId: id }, 'Updating user')

        const { data, error } = await supabase
          .from(this.TABLE)
          .update(updates)
          .eq('id', id)
          .select()
          .single()

        if (error) {
          logger.error({ error, userId: id, updates }, 'Failed to update user')
          throw new DatabaseError('Failed to update user', { cause: error })
        }

        // Invalidate cache
        await cache.delete(`user:${id}`)

        logger.info({ userId: id }, 'User updated successfully')
        return data as User
      }
    )
  }

  static async delete(id: string): Promise<void> {
    return await Sentry.startSpan(
      { op: 'db.mutation', name: 'UserRepository.delete' },
      async () => {
        logger.info({ userId: id }, 'Deleting user')

        const { error } = await supabase
          .from(this.TABLE)
          .delete()
          .eq('id', id)

        if (error) {
          logger.error({ error, userId: id }, 'Failed to delete user')
          throw new DatabaseError('Failed to delete user', { cause: error })
        }

        // Invalidate cache
        await cache.delete(`user:${id}`)

        logger.info({ userId: id }, 'User deleted successfully')
      }
    )
  }

  // Additional query methods as needed
  static async findByEmail(email: string): Promise<User | null> { /* ... */ }
  static async findAll(filters?: UserFilters): Promise<User[]> { /* ... */ }
  static async count(filters?: UserFilters): Promise<number> { /* ... */ }
}
```

### 3. Service Layer Pattern

**Business logic lives in services, NOT in API routes.**

```typescript
// services/user/createUser.ts
import { UserRepository } from '@/repositories/UserRepository'
import { EmailService } from '@/services/email/EmailService'
import { isFeatureEnabled } from '@/lib/features'
import { logger } from '@/lib/logger'
import * as Sentry from '@sentry/nextjs'
import { z } from 'zod'

// Input validation schema
const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  password: z.string().min(8),
})

export type CreateUserInput = z.infer<typeof CreateUserSchema>

export async function createUser(input: CreateUserInput): Promise<User> {
  return await Sentry.startSpan(
    { op: 'service', name: 'createUser' },
    async (span) => {
      // Add context
      span.setAttribute('user_email', input.email)
      
      logger.info({ email: input.email }, 'Creating new user')

      // Validate input
      const validated = CreateUserSchema.parse(input)

      // Check if email already exists
      const existing = await UserRepository.findByEmail(validated.email)
      if (existing) {
        logger.warn({ email: validated.email }, 'User already exists')
        throw new ValidationError('Email already in use')
      }

      // Hash password (using Supabase Auth)
      // Create user
      const user = await UserRepository.create({
        email: validated.email,
        name: validated.name,
        // ... other fields
      })

      // Send welcome email (if feature enabled)
      if (await isFeatureEnabled('welcome-emails')) {
        try {
          await EmailService.sendWelcome(user.email, user.name)
          logger.info({ userId: user.id }, 'Welcome email sent')
        } catch (error) {
          // Don't fail user creation if email fails
          logger.error({ error, userId: user.id }, 'Failed to send welcome email')
          Sentry.captureException(error, {
            tags: { feature: 'welcome-emails' },
            extra: { userId: user.id },
          })
        }
      }

      logger.info({ userId: user.id }, 'User created successfully')
      return user
    }
  )
}
```

### 4. API Route Pattern

**API routes are thin controllers that delegate to services.**

```typescript
// app/api/users/create/route.ts
import { createUser } from '@/services/user/createUser'
import { withAuth } from '@/lib/middleware/withAuth'
import { withValidation } from '@/lib/middleware/withValidation'
import { withFeatureFlag } from '@/lib/middleware/withFeatureFlag'
import { withRateLimit } from '@/lib/middleware/withRateLimit'
import { CreateUserSchema } from '@/services/user/createUser'
import { logger } from '@/lib/logger'
import * as Sentry from '@sentry/nextjs'

export const POST = withRateLimit(
  '10/minute',
  withFeatureFlag('user-registration',
    withValidation(CreateUserSchema,
      async (req: Request) => {
        try {
          // Request already validated by middleware
          const body = req.validatedBody

          // Delegate to service
          const user = await createUser(body)

          logger.info({ userId: user.id }, 'User registration successful')

          return Response.json(
            { user },
            { status: 201 }
          )
        } catch (error) {
          logger.error({ error }, 'User registration failed')
          
          // Let error middleware handle response
          throw error
        }
      }
    )
  )
)
```

### 5. Feature Flag Pattern

**Every new feature behind a flag.**

```typescript
// lib/features.ts
export interface FeatureFlag {
  enabled: boolean
  description: string
  rolloutPercentage: number
  allowedUserIds?: string[]
  allowedEmails?: string[]
}

export const FEATURES: Record<string, FeatureFlag> = {
  'user-registration': {
    enabled: false,
    description: 'New user registration flow',
    rolloutPercentage: 0,
  },
  'social-feed-v2': {
    enabled: false,
    description: 'Redesigned social feed',
    rolloutPercentage: 0,
  },
  'welcome-emails': {
    enabled: true,
    description: 'Send welcome email on registration',
    rolloutPercentage: 100,
  },
  // ... all features
}

export async function isFeatureEnabled(
  featureName: string,
  userId?: string
): Promise<boolean> {
  const feature = FEATURES[featureName]
  
  if (!feature) {
    logger.warn({ featureName }, 'Unknown feature flag')
    return false
  }

  // Feature disabled globally
  if (!feature.enabled) {
    return false
  }

  // Feature enabled for specific users
  if (userId && feature.allowedUserIds?.includes(userId)) {
    return true
  }

  // Rollout percentage (deterministic based on userId)
  if (userId && feature.rolloutPercentage > 0) {
    const hash = hashString(userId + featureName)
    const percentage = hash % 100
    return percentage < feature.rolloutPercentage
  }

  // Default: feature enabled
  return feature.rolloutPercentage === 100
}

// Usage in code:
if (await isFeatureEnabled('social-feed-v2', user.id)) {
  // New implementation
  return <SocialFeedV2 />
} else {
  // Old implementation
  return <SocialFeedV1 />
}
```

### 6. Comprehensive Logging Pattern

**Every operation logs start, success, and failure.**

```typescript
// lib/logger.ts
import pino from 'pino'

export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  formatters: {
    level: (label) => ({ level: label }),
  },
  // In production, output JSON
  // In development, use pretty print
  transport: process.env.NODE_ENV === 'development' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  } : undefined,
})

// Usage pattern:
export async function someOperation(param: string) {
  const operationLogger = logger.child({ operation: 'someOperation', param })
  
  operationLogger.info('Starting operation')
  
  try {
    // Do work
    const result = await doWork(param)
    
    operationLogger.info({ result }, 'Operation completed successfully')
    
    return result
  } catch (error) {
    operationLogger.error({ error }, 'Operation failed')
    throw error
  }
}
```

### 7. Error Handling Pattern

**Typed errors with proper status codes.**

```typescript
// lib/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string,
    public details?: unknown
  ) {
    super(message)
    this.name = this.constructor.name
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR', details)
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR')
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR')
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND')
  }
}

export class ConflictError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 409, 'CONFLICT', details)
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfter: number) {
    super('Rate limit exceeded', 429, 'RATE_LIMIT_EXCEEDED', { retryAfter })
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, 500, 'DATABASE_ERROR', options?.cause)
  }
}

// Global error handler middleware
export function errorHandler(error: Error): Response {
  // Log all errors
  logger.error({ error }, 'Error occurred')

  // Capture in Sentry
  Sentry.captureException(error)

  // Handle known errors
  if (error instanceof AppError) {
    return Response.json(
      {
        error: {
          message: error.message,
          code: error.code,
          details: error.details,
        },
      },
      { status: error.statusCode }
    )
  }

  // Handle unknown errors (don't leak details)
  return Response.json(
    {
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_ERROR',
      },
    },
    { status: 500 }
  )
}
```

---

## 🗄️ Database Schema Patterns

### Naming Conventions
```
Tables:        snake_case, plural (users, posts, user_followers)
Columns:       snake_case (created_at, user_id, email_verified)
Indexes:       idx_<table>_<column(s)> (idx_users_email, idx_posts_user_id)
Foreign Keys:  fk_<table>_<column> (fk_posts_user_id)
```

### Standard Columns
Every table includes:
```sql
id           UUID PRIMARY KEY DEFAULT gen_random_uuid()
created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
```

### Soft Deletes
For tables that need soft deletes:
```sql
deleted_at   TIMESTAMPTZ NULL
```

### Row Level Security (RLS)
Enable RLS on all tables:
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Example policy: Users can only read their own data
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Example policy: Authenticated users can insert
CREATE POLICY "Authenticated users can insert"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

---

## 🧪 Testing Standards

### Test Structure
```
src/
├── services/
│   ├── user/
│   │   ├── createUser.ts
│   │   └── __tests__/
│   │       ├── createUser.test.ts
│   │       └── createUser.integration.test.ts
│   └── ...
└── repositories/
    ├── UserRepository.ts
    └── __tests__/
        └── UserRepository.test.ts
```

### Test Requirements

**Unit Tests** (Every function)
```typescript
// services/user/__tests__/createUser.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createUser } from '../createUser'
import { UserRepository } from '@/repositories/UserRepository'
import { EmailService } from '@/services/email/EmailService'

// Mock dependencies
vi.mock('@/repositories/UserRepository')
vi.mock('@/services/email/EmailService')
vi.mock('@/lib/features', () => ({
  isFeatureEnabled: vi.fn().mockResolvedValue(true),
}))

describe('createUser', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates user with valid input', async () => {
    // Arrange
    const input = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'SecurePass123',
    }
    
    const expectedUser = { id: '123', ...input }
    vi.mocked(UserRepository.findByEmail).mockResolvedValue(null)
    vi.mocked(UserRepository.create).mockResolvedValue(expectedUser)

    // Act
    const result = await createUser(input)

    // Assert
    expect(result).toEqual(expectedUser)
    expect(UserRepository.create).toHaveBeenCalledOnce()
    expect(EmailService.sendWelcome).toHaveBeenCalledWith(
      input.email,
      input.name
    )
  })

  it('throws ValidationError for duplicate email', async () => {
    // Arrange
    const input = {
      email: 'existing@example.com',
      name: 'Test User',
      password: 'SecurePass123',
    }
    
    vi.mocked(UserRepository.findByEmail).mockResolvedValue({
      id: '456',
      email: input.email,
    } as any)

    // Act & Assert
    await expect(createUser(input)).rejects.toThrow(ValidationError)
    expect(UserRepository.create).not.toHaveBeenCalled()
  })

  it('continues if welcome email fails', async () => {
    // Arrange
    const input = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'SecurePass123',
    }
    
    const expectedUser = { id: '123', ...input }
    vi.mocked(UserRepository.findByEmail).mockResolvedValue(null)
    vi.mocked(UserRepository.create).mockResolvedValue(expectedUser)
    vi.mocked(EmailService.sendWelcome).mockRejectedValue(
      new Error('Email service down')
    )

    // Act
    const result = await createUser(input)

    // Assert
    expect(result).toEqual(expectedUser)
    // User still created despite email failure
  })
})
```

**Integration Tests** (API routes)
```typescript
// app/api/users/create/__tests__/route.integration.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { POST } from '../route'

describe('POST /api/users/create', () => {
  beforeAll(async () => {
    // Set up test database
  })

  afterAll(async () => {
    // Clean up test database
  })

  it('creates user and returns 201', async () => {
    // Arrange
    const request = new Request('http://localhost/api/users/create', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'Test User',
        password: 'SecurePass123',
      }),
    })

    // Act
    const response = await POST(request)
    const data = await response.json()

    // Assert
    expect(response.status).toBe(201)
    expect(data.user).toMatchObject({
      email: 'test@example.com',
      name: 'Test User',
    })
    expect(data.user.id).toBeDefined()
  })

  it('returns 400 for invalid input', async () => {
    // Arrange
    const request = new Request('http://localhost/api/users/create', {
      method: 'POST',
      body: JSON.stringify({
        email: 'invalid-email',
        name: 'T',
        password: '123',
      }),
    })

    // Act
    const response = await POST(request)
    const data = await response.json()

    // Assert
    expect(response.status).toBe(400)
    expect(data.error.code).toBe('VALIDATION_ERROR')
  })
})
```

**E2E Tests** (Critical flows)
```typescript
// e2e/registration.spec.ts
import { test, expect } from '@playwright/test'

test.describe('User Registration Flow', () => {
  test('complete registration flow', async ({ page }) => {
    // Navigate to registration
    await page.goto('/register')

    // Fill form
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="name"]', 'Test User')
    await page.fill('[name="password"]', 'SecurePass123')

    // Submit
    await page.click('button[type="submit"]')

    // Verify success
    await expect(page).toHaveURL('/onboarding')
    await expect(page.locator('h1')).toContainText('Welcome')
  })

  test('shows error for duplicate email', async ({ page }) => {
    // Navigate to registration
    await page.goto('/register')

    // Fill with existing email
    await page.fill('[name="email"]', 'existing@example.com')
    await page.fill('[name="name"]', 'Test User')
    await page.fill('[name="password"]', 'SecurePass123')

    // Submit
    await page.click('button[type="submit"]')

    // Verify error
    await expect(page.locator('[role="alert"]')).toContainText(
      'Email already in use'
    )
  })
})
```

### Test Coverage Targets
- **Unit Tests**: 90%+ coverage
- **Integration Tests**: All API routes
- **E2E Tests**: Critical user journeys

---

## 🔐 Security Patterns

### Authentication
```typescript
// Middleware: withAuth
export function withAuth(handler: Handler): Handler {
  return async (req: Request) => {
    // Get token from header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AuthenticationError()
    }

    const token = authHeader.substring(7)

    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      throw new AuthenticationError()
    }

    // Attach user to request
    req.user = user

    // Continue
    return handler(req)
  }
}
```

### Authorization
```typescript
// Middleware: withRole
export function withRole(allowedRoles: string[]) {
  return (handler: Handler): Handler => {
    return withAuth(async (req: Request) => {
      const userRole = req.user.role

      if (!allowedRoles.includes(userRole)) {
        throw new AuthorizationError()
      }

      return handler(req)
    })
  }
}

// Usage:
export const DELETE = withRole(['admin'])(
  async (req: Request) => {
    // Only admins can access
  }
)
```

### Rate Limiting
```typescript
// Middleware: withRateLimit
export function withRateLimit(limit: string) {
  // limit format: "10/minute", "100/hour"
  return (handler: Handler): Handler => {
    return async (req: Request) => {
      const identifier = req.user?.id || req.headers.get('x-forwarded-for')
      
      const rateLimiter = await getRateLimiter(limit)
      const allowed = await rateLimiter.check(identifier)
      
      if (!allowed) {
        throw new RateLimitError(60) // retry after 60s
      }

      return handler(req)
    }
  }
}
```

---

## 📊 Monitoring & Observability

### Sentry Integration

**Every function includes:**
1. Span for performance tracking
2. Context for debugging
3. Breadcrumbs for flow tracking
4. Error capture with tags

```typescript
import * as Sentry from '@sentry/nextjs'

export async function criticalOperation(params: Params) {
  return await Sentry.startSpan(
    { 
      op: 'service.criticalOperation',
      name: 'Critical Operation'
    },
    async (span) => {
      // Add context
      span.setAttribute('param_id', params.id)
      Sentry.setContext('params', params)

      // Breadcrumb: operation start
      Sentry.addBreadcrumb({
        category: 'operation',
        message: 'Starting critical operation',
        level: 'info',
        data: params,
      })

      try {
        // Do work
        const result = await doWork(params)

        // Breadcrumb: success
        Sentry.addBreadcrumb({
          category: 'operation',
          message: 'Operation completed',
          level: 'info',
        })

        return result

      } catch (error) {
        // Capture with context
        Sentry.captureException(error, {
          tags: {
            operation: 'critical',
            param_id: params.id,
          },
          extra: {
            params,
          },
        })

        throw error
      }
    }
  )
}
```

### Logging Best Practices

**Structure:**
```typescript
logger.info(
  { 
    // Context object first
    userId: user.id,
    operation: 'create_order',
    orderId: order.id,
  },
  // Message string second
  'Order created successfully'
)
```

**Levels:**
```typescript
logger.debug() // Development/troubleshooting
logger.info()  // Normal operations, important events
logger.warn()  // Concerning but recoverable
logger.error() // Errors that need attention
```

---

## 🚀 Deployment Pipeline

See `specs/workflows/deployment-pipeline.md` for complete details.

**Summary:**
1. PR opened → Preview deployment (Vercel)
2. PR merged → Staging deployment
3. Staging validated → Production deployment
4. Feature flags OFF by default
5. Gradual rollout: 5% → 25% → 100%
6. Monitor Sentry for errors
7. Auto-rollback if error rate spikes

---

## 📚 AI Development Guidelines

All AI agents must follow these standards from `@ai-coding-config`:
- `@rules/typescript-coding-standards`
- `@rules/git-interaction`
- `@rules/user-facing-language`
- All patterns in this document

**AI Checklist** (for every feature):
- [ ] Repository layer for data access
- [ ] Service layer for business logic
- [ ] API route as thin controller
- [ ] Comprehensive error handling
- [ ] Sentry spans and breadcrumbs
- [ ] Structured logging throughout
- [ ] Feature flag integration
- [ ] Input validation with Zod
- [ ] Unit tests (90%+ coverage)
- [ ] Integration tests
- [ ] TypeScript strict mode
- [ ] No direct DB access
- [ ] Proper error types

---

**This is the technical source of truth. All code must follow these patterns.**








