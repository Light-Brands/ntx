# Epic [NUMBER]: [EPIC NAME]

**Status:** Planning | In Progress | Review | Complete **Priority:** P0 (Critical) | P1
(High) | P2 (Medium) | P3 (Low) **Estimated Effort:** [X weeks] **Start Date:**
YYYY-MM-DD **Target Date:** YYYY-MM-DD **Owner:** @username

---

## Overview

### Problem Statement

[Describe the problem this epic solves. What pain point does it address? Why is this
important?]

### Success Criteria

- [ ] Criterion 1: [Measurable outcome]
- [ ] Criterion 2: [Measurable outcome]
- [ ] Criterion 3: [Measurable outcome]

### User Stories

**As a** [user type] **I want** [goal] **So that** [benefit]

**Acceptance Criteria:**

- [ ] Specific testable requirement 1
- [ ] Specific testable requirement 2
- [ ] Specific testable requirement 3

---

## Architecture & Design

### System Components

```yaml
database:
  tables:
    - table_name: Description
    - table_name: Description

services:
  - ServiceName: Purpose and responsibilities
  - ServiceName: Purpose and responsibilities

api_routes:
  - GET /api/resource: Description
  - POST /api/resource: Description
  - PUT /api/resource/:id: Description
  - DELETE /api/resource/:id: Description

types:
  - types/feature.ts: Type definitions

components:
  - ComponentName: Purpose
  - ComponentName: Purpose

pages:
  - /route/path: Purpose
```

### Data Models

```typescript
// Primary types for this epic
interface PrimaryType {
  id: string;
  field1: string;
  field2: number;
  created_at: string;
  updated_at: string;
}

interface SecondaryType {
  // ...
}
```

### Database Schema

```sql
-- Main table
CREATE TABLE table_name (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  field1 TEXT NOT NULL,
  field2 INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_table_field ON table_name(field1);

-- RLS Policies
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data" ON table_name
  FOR SELECT USING (auth.uid() = user_id);
```

### API Endpoints

#### GET /api/resource

- **Purpose:** Fetch resources with filters
- **Auth:** Required
- **Query Params:**
  - `search` (optional): Search query
  - `filter` (optional): Filter criteria
  - `limit` (optional): Results limit (default: 20)
  - `offset` (optional): Pagination offset
- **Response:**
  ```typescript
  {
    success: true,
    data: Resource[],
    pagination: {
      total: number,
      limit: number,
      offset: number
    }
  }
  ```

#### POST /api/resource

- **Purpose:** Create new resource
- **Auth:** Required
- **Body:**
  ```typescript
  {
    field1: string,
    field2: number
  }
  ```
- **Response:**
  ```typescript
  {
    success: true,
    data: Resource
  }
  ```

---

## Implementation Checklist

### Phase 1: Foundation (Week 1)

**Database Setup:**

- [ ] Create database tables
- [ ] Add indexes for performance
- [ ] Set up RLS policies
- [ ] Add seed data for testing
- [ ] Document schema in `database/schemas/`

**Type Definitions:**

- [ ] Define core types in `types/feature.ts`
- [ ] Export types for use in components/services
- [ ] Document type relationships
- [ ] Add JSDoc comments

**Database Services:**

- [ ] Create `FeatureService` extending `BaseDatabaseService`
- [ ] Implement CRUD operations
- [ ] Add error handling
- [ ] Add logging statements
- [ ] Write unit tests

### Phase 2: API Layer (Week 1-2)

**API Routes:**

- [ ] Implement GET `/api/resource` with filtering
- [ ] Implement POST `/api/resource` with validation
- [ ] Implement PUT `/api/resource/:id` with authorization
- [ ] Implement DELETE `/api/resource/:id` with authorization
- [ ] Add Zod schemas for validation
- [ ] Add comprehensive error handling
- [ ] Add Sentry error tracking
- [ ] Test all endpoints with Postman/Insomnia

**API Documentation:**

- [ ] Document request/response formats
- [ ] Add example requests
- [ ] Document error codes
- [ ] Add rate limiting details

### Phase 3: UI Components (Week 2)

**Core Components:**

- [ ] Create `ResourceCard.tsx` following component template
- [ ] Create `ResourceList.tsx` for displaying collections
- [ ] Create `ResourceForm.tsx` for create/edit
- [ ] Create `ResourceModal.tsx` for dialogs
- [ ] Add animations with Framer Motion
- [ ] Add accessibility features (ARIA labels, keyboard nav)
- [ ] Follow GUIDELINES.md patterns

**Component Testing:**

- [ ] Test rendering with mock data
- [ ] Test user interactions
- [ ] Test loading/error states
- [ ] Test accessibility with screen reader

### Phase 4: Custom Hooks (Week 2)

**State Management:**

- [ ] Create `useFeatureState` hook following hook template
- [ ] Implement data fetching
- [ ] Implement CRUD operations
- [ ] Add loading/error states
- [ ] Add optimistic updates
- [ ] Test hook in isolation

### Phase 5: Pages (Week 3)

**Page Implementation:**

- [ ] Create `/route/path/page.tsx` following page template
- [ ] Implement search functionality
- [ ] Implement filtering
- [ ] Add pagination
- [ ] Add loading states
- [ ] Add error states
- [ ] Add empty states
- [ ] Mobile responsive design

**Page Testing:**

- [ ] Test navigation flows
- [ ] Test data fetching
- [ ] Test error handling
- [ ] Test on mobile devices

### Phase 6: Integration & Testing (Week 3-4)

**Integration:**

- [ ] Connect all components
- [ ] Test complete user flows
- [ ] Verify API integration
- [ ] Check error handling
- [ ] Verify logging and monitoring

**Testing:**

- [ ] Unit tests for services
- [ ] Integration tests for API routes
- [ ] Component tests
- [ ] End-to-end tests for critical paths
- [ ] Performance testing
- [ ] Accessibility testing

**Code Quality:**

- [ ] TypeScript compiles with no errors
- [ ] ESLint passes
- [ ] All tests pass
- [ ] Code reviewed by team
- [ ] Documentation complete

### Phase 7: Deployment (Week 4)

**Pre-Deployment:**

- [ ] Run full test suite
- [ ] Check Sentry configuration
- [ ] Verify environment variables
- [ ] Review security (RLS, auth checks)
- [ ] Test in staging environment

**Deployment:**

- [ ] Deploy database migrations
- [ ] Deploy backend services
- [ ] Deploy frontend
- [ ] Monitor deployment
- [ ] Verify production functionality

**Post-Deployment:**

- [ ] Monitor error rates in Sentry
- [ ] Check performance metrics
- [ ] Gather user feedback
- [ ] Plan follow-up improvements

---

## Dependencies

### External Dependencies

- Package 1: Purpose
- Package 2: Purpose

### Internal Dependencies

- Epic X: Dependency reason
- Epic Y: Dependency reason

### Blocking Issues

- [ ] Issue 1: Description
- [ ] Issue 2: Description

---

## Design System Compliance

**Follow these guidelines (see /design-system/GUIDELINES.md):**

### Components

- [ ] Use proper naming convention (FeatureName + ComponentType)
- [ ] Define explicit props interface with JSDoc
- [ ] Include comprehensive component documentation
- [ ] Use `cn()` for className composition
- [ ] Implement proper animation patterns
- [ ] Add ARIA labels and keyboard navigation
- [ ] Support dark mode

### Pages

- [ ] Use "use client" directive
- [ ] Implement proper layout structure
- [ ] Add loading, error, and empty states
- [ ] Follow mobile-first responsive design
- [ ] Use max-w-6xl container
- [ ] Add pb-28 sm:pb-24 for mobile nav clearance
- [ ] Export metadata for SEO

### API Routes

- [ ] Implement authentication checks
- [ ] Use DatabaseService singleton pattern
- [ ] Return consistent response format
- [ ] Add comprehensive error handling
- [ ] Integrate Sentry for error tracking
- [ ] Use structured logging
- [ ] Add request validation with Zod

### Database Services

- [ ] Extend BaseDatabaseService
- [ ] Implement proper error handling
- [ ] Add logging statements
- [ ] Use TypeScript types
- [ ] Follow naming conventions

### Styling

- [ ] Use Tailwind CSS exclusively
- [ ] Follow color palette (deep-abyss, aqua-light)
- [ ] Use semantic color variables
- [ ] Support dark mode
- [ ] Use responsive breakpoints

### Code Quality

- [ ] TypeScript strict mode enabled
- [ ] No `any` types (use `unknown` or proper types)
- [ ] Proper error boundaries
- [ ] Memoize expensive computations
- [ ] Use useCallback for event handlers

---

## Testing Strategy

### Unit Tests

```typescript
describe("FeatureService", () => {
  it("should fetch resources with filters", async () => {
    // Test implementation
  });

  it("should create new resource", async () => {
    // Test implementation
  });
});
```

### Integration Tests

```typescript
describe("GET /api/resource", () => {
  it("should return filtered resources", async () => {
    // Test implementation
  });

  it("should require authentication", async () => {
    // Test implementation
  });
});
```

### E2E Tests

```typescript
describe("Resource Management Flow", () => {
  it("should allow users to create and view resources", async () => {
    // Test implementation
  });
});
```

---

## Performance Considerations

- [ ] Optimize database queries (indexes, pagination)
- [ ] Implement caching where appropriate
- [ ] Use lazy loading for images
- [ ] Minimize bundle size
- [ ] Use React.memo for expensive components
- [ ] Implement virtualization for long lists

---

## Security Checklist

- [ ] RLS policies configured correctly
- [ ] Authentication required for protected routes
- [ ] Input validation on all endpoints
- [ ] XSS prevention (React escapes by default)
- [ ] CSRF protection (Next.js handles this)
- [ ] Rate limiting implemented
- [ ] Sensitive data not logged
- [ ] Environment variables secured

---

## Observability

### Logging

- [ ] Use unified logger with appropriate categories
- [ ] Log all API requests
- [ ] Log errors with context
- [ ] Log significant user actions

### Error Tracking

- [ ] Sentry configured for error capture
- [ ] Add breadcrumbs for context
- [ ] Tag errors appropriately
- [ ] Set up alerts for critical errors

### Metrics

- [ ] Track API response times
- [ ] Monitor error rates
- [ ] Track user engagement
- [ ] Monitor resource usage

---

## Documentation

### Required Documentation

- [ ] API endpoint documentation
- [ ] Component usage examples
- [ ] Hook usage documentation
- [ ] Database schema documentation
- [ ] Deployment instructions
- [ ] Troubleshooting guide

### Code Comments

- [ ] JSDoc for all public functions
- [ ] Inline comments for complex logic
- [ ] Type definitions documented
- [ ] README in feature directory

---

## Rollout Plan

### Phase 1: Internal Testing

- Deploy to staging
- Test with internal users
- Gather feedback
- Fix critical issues

### Phase 2: Beta Release

- Enable for beta users
- Monitor closely
- Gather feedback
- Iterate quickly

### Phase 3: General Availability

- Enable for all users
- Announce feature
- Monitor adoption
- Provide support

---

## Success Metrics

### Quantitative Metrics

- [ ] Metric 1: Target value
- [ ] Metric 2: Target value
- [ ] Metric 3: Target value

### Qualitative Metrics

- [ ] User satisfaction rating: Target
- [ ] Feedback sentiment: Target
- [ ] Support ticket volume: Target

---

## Risks & Mitigation

| Risk   | Impact | Probability | Mitigation          |
| ------ | ------ | ----------- | ------------------- |
| Risk 1 | High   | Medium      | Mitigation strategy |
| Risk 2 | Medium | Low         | Mitigation strategy |

---

## Resources

### Design

- Figma: [Link to designs]
- Design system: `/design-system/GUIDELINES.md`
- Patterns: `/design-system/existing-patterns.json`

### Documentation

- Technical spec: [Link]
- User guide: [Link]
- API docs: [Link]

### Related Epics

- Epic X: [Link]
- Epic Y: [Link]

---

## Notes & Updates

### 2024-XX-XX

- Initial epic creation
- Added implementation checklist

### 2024-XX-XX

- Updated after design review
- Revised timeline

---

## Sign-off

- [ ] Technical lead approval
- [ ] Design approval
- [ ] Product approval
- [ ] Security review complete
- [ ] Ready for implementation

---

**For questions or clarifications, refer to:**

- `/design-system/GUIDELINES.md` - Development standards
- `/design-system/existing-patterns.json` - Code patterns
- TypeScript coding standards in workspace rules
- Git collaboration rules in workspace rules
