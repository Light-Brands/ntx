# Testing Strategy

**Test-driven development approach for {BRAND_NAME}**

## Testing Philosophy

> Write tests first. Tests are documentation. Tests enable refactoring.

## Test Pyramid

```
        /\
       /  \      E2E Tests (10%)
      /----\     Critical user journeys
     /      \
    /--------\   Integration Tests (30%)
   /          \  API, database, services
  /------------\ Unit Tests (60%)
 /              \ Components, utilities, hooks
```

## Test Types

### Unit Tests

**What:** Individual functions, components, hooks
**Tools:** Vitest, React Testing Library
**Coverage Target:** 80%

```typescript
// Component test
describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});

// Hook test
describe('useCounter', () => {
  it('increments count', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });
});
```

### Integration Tests

**What:** API routes, database operations, service interactions
**Tools:** Vitest, Supertest, test database
**Coverage Target:** 70%

```typescript
describe('POST /api/users', () => {
  it('creates a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', name: 'Test User' });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe('test@example.com');
  });

  it('returns 422 for invalid email', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'invalid', name: 'Test' });

    expect(response.status).toBe(422);
  });
});
```

### E2E Tests

**What:** Complete user journeys
**Tools:** Playwright
**Coverage:** Critical paths only

```typescript
test('user can sign up and complete onboarding', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Get Started');

  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'SecurePass123!');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('/onboarding');
  await expect(page.locator('h1')).toHaveText('Welcome!');
});
```

## TDD Workflow

1. **Red:** Write a failing test
2. **Green:** Write minimal code to pass
3. **Refactor:** Improve code, keep tests passing

```typescript
// 1. Red - Write failing test
it('calculates total with tax', () => {
  expect(calculateTotal(100, 0.1)).toBe(110);
});

// 2. Green - Make it pass
function calculateTotal(amount: number, taxRate: number) {
  return amount + (amount * taxRate);
}

// 3. Refactor - Improve if needed
function calculateTotal(amount: number, taxRate: number) {
  const tax = amount * taxRate;
  return amount + tax;
}
```

## Test Organization

```
__tests__/
├── unit/
│   ├── components/
│   ├── hooks/
│   └── utils/
├── integration/
│   ├── api/
│   └── services/
└── e2e/
    └── journeys/
```

## CI/CD Integration

```yaml
test:
  runs-on: ubuntu-latest
  steps:
    - run: npm test -- --coverage
    - run: npm run test:e2e
    - uses: codecov/codecov-action@v3
```

## Quality Gates

- [ ] All tests pass
- [ ] Coverage > 80%
- [ ] No critical/high severity issues
- [ ] E2E critical paths pass

---

*Template from Onyx Design System*
