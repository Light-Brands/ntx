# Deployment Infrastructure

**Infrastructure configuration for {BRAND_NAME}**

## Architecture Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Vercel    │────▶│ Cloudflare  │────▶│  Supabase   │
│  (Frontend) │     │    (CDN)    │     │  (Backend)  │
└─────────────┘     └─────────────┘     └─────────────┘
```

## Environments

| Environment | URL | Purpose |
|-------------|-----|---------|
| Production | {brand}.com | Live users |
| Staging | staging.{brand}.com | Pre-release testing |
| Development | dev.{brand}.com | Development testing |

## Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase_anon_key"
  }
}
```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| NEXT_PUBLIC_SUPABASE_URL | Supabase project URL | https://xxx.supabase.co |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anonymous key | eyJ... |
| SUPABASE_SERVICE_ROLE_KEY | Server-side key | eyJ... |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NEXT_PUBLIC_APP_URL | Application URL | - |
| SENTRY_DSN | Error tracking | - |

## CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## Health Checks

```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    api: 'ok',
    database: await checkDatabase(),
    timestamp: new Date().toISOString(),
  };

  const healthy = Object.values(checks).every(v => v === 'ok' || typeof v === 'string');

  return Response.json(checks, {
    status: healthy ? 200 : 503
  });
}
```

---

*Template from Onyx Design System*
