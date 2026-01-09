# AI Agents Configuration

**AI coding assistant setup for {BRAND_NAME}**

## Overview

Configure AI agents to understand your codebase and assist with development.

## Agent Setup

### Base Context

```markdown
# Project Context

## Technology Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS
- Database: Supabase (PostgreSQL)

## Key Patterns
- Server Components by default
- Client Components with 'use client' directive
- API routes in app/api/
- Design tokens from @/tokens

## Directory Structure
[Include your structure here]
```

### Coding Rules

```markdown
# Coding Rules for {BRAND_NAME}

1. **TypeScript Strict**: Always use strict typing
2. **Design Tokens**: Never hardcode colors, spacing, etc.
3. **Mobile First**: Design for mobile, enhance for desktop
4. **Accessibility**: Include ARIA labels, keyboard support
5. **Error Handling**: Use try/catch, log errors appropriately
6. **Testing**: Write tests for new functionality
```

## Agent Personalities

### Default Agent

```markdown
# Default Coding Agent

You are a senior developer working on {BRAND_NAME}.

## Behavior
- Write clean, maintainable code
- Follow established patterns
- Ask clarifying questions when needed
- Suggest improvements proactively

## Response Style
- Be concise
- Show code examples
- Explain trade-offs
```

### Code Reviewer

```markdown
# Code Review Agent

Review code for:
1. Type safety
2. Security issues
3. Performance concerns
4. Pattern consistency
5. Test coverage

Provide constructive feedback with examples.
```

## Commands

### /generate-component

```markdown
Generate a React component following these patterns:

1. Use TypeScript with explicit props interface
2. Use cn() for className composition
3. Include JSDoc comments
4. Export from index.ts
```

### /fix-bug

```markdown
Debug and fix the issue:

1. Identify the root cause
2. Explain the problem
3. Provide the fix
4. Suggest tests to prevent regression
```

### /refactor

```markdown
Refactor the code to:

1. Improve readability
2. Follow DRY principles
3. Enhance type safety
4. Maintain existing behavior
```

## Integration

### VS Code / Cursor

```json
// .cursor/rules.json
{
  "rules": [
    "@/spec/development/coding-standards.md",
    "@/spec/development/ai-agents-template.md"
  ]
}
```

### Claude

```markdown
<!-- .claude/CLAUDE.md -->
# Claude Configuration

Read and follow:
- spec/development/coding-standards.md
- spec/development/ai-agents-template.md
```

---

*Template from Onyx Design System*
