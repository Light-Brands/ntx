# Observability

**Logging and monitoring specification for {BRAND_NAME}**

## Overview

Observability enables understanding system behavior through logs, metrics, and traces.

## Logging

### Log Levels

| Level | Usage | Example |
|-------|-------|---------|
| ERROR | Errors requiring attention | Failed database connection |
| WARN | Potential issues | Rate limit approaching |
| INFO | Normal operations | User signed up |
| DEBUG | Development details | Request payload |

### Structured Logging

```typescript
// lib/logger.ts
import { createLogger } from '@/lib/observability';

const logger = createLogger('service-name');

// Usage
logger.info('User signed up', {
  userId: user.id,
  email: user.email,
  source: 'google_oauth',
});

logger.error('Database connection failed', {
  error: err.message,
  host: config.dbHost,
});
```

### Log Format

```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "info",
  "service": "api",
  "message": "User signed up",
  "context": {
    "userId": "123",
    "requestId": "abc-123",
    "duration": 45
  }
}
```

## Error Tracking

### Sentry Configuration

```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend(event) {
    // Scrub sensitive data
    return event;
  },
});

// Usage
try {
  await riskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    tags: { feature: 'checkout' },
    extra: { orderId },
  });
  throw error;
}
```

### Error Categories

| Category | Severity | Alert |
|----------|----------|-------|
| Database errors | Critical | Immediate |
| Authentication failures | High | 5 min |
| API errors (5xx) | High | 5 min |
| Validation errors | Low | Daily digest |

## Metrics

### Key Metrics

| Metric | Type | Description |
|--------|------|-------------|
| `http_requests_total` | Counter | Total HTTP requests |
| `http_request_duration_ms` | Histogram | Request latency |
| `active_users` | Gauge | Current active users |
| `errors_total` | Counter | Total errors by type |

### Health Checks

```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      database: await checkDatabase(),
      cache: await checkCache(),
      external: await checkExternalServices(),
    },
  };

  const allHealthy = Object.values(checks.checks).every(c => c.status === 'ok');

  return Response.json(checks, {
    status: allHealthy ? 200 : 503,
  });
}
```

## Alerting

### Alert Rules

| Condition | Threshold | Action |
|-----------|-----------|--------|
| Error rate | > 1% | Page on-call |
| Latency P99 | > 2s | Page on-call |
| CPU usage | > 80% | Warning notification |
| Disk usage | > 90% | Warning notification |

---

*Template from Onyx Design System*
