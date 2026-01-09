# Feature Flags

**Feature toggle system for {BRAND_NAME}**

## Overview

Feature flags enable gradual rollouts, A/B testing, and quick rollbacks.

## Flag Categories

### Release Flags
Control feature availability.

```typescript
interface ReleaseFlag {
  name: string;
  enabled: boolean;
  rolloutPercentage?: number;
  enabledForUsers?: string[];
}
```

### Experiment Flags
A/B testing variants.

```typescript
interface ExperimentFlag {
  name: string;
  variants: string[];
  distribution: Record<string, number>;
}
```

### Operational Flags
System behavior toggles.

```typescript
interface OperationalFlag {
  name: string;
  enabled: boolean;
  config?: Record<string, unknown>;
}
```

## Flag Definitions

### Feature Flags

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `feature.new_dashboard` | release | false | New dashboard UI |
| `feature.dark_mode` | release | true | Dark mode toggle |
| `feature.ai_assistant` | release | false | AI assistant feature |

### Experiment Flags

| Flag | Variants | Distribution | Description |
|------|----------|--------------|-------------|
| `exp.onboarding_flow` | control, variant_a | 50/50 | Onboarding A/B test |
| `exp.pricing_page` | original, new | 70/30 | Pricing page test |

### Operational Flags

| Flag | Default | Description |
|------|---------|-------------|
| `ops.maintenance_mode` | false | Enable maintenance page |
| `ops.rate_limiting` | true | API rate limiting |
| `ops.verbose_logging` | false | Debug logging |

## Implementation

### Client-Side

```typescript
import { useFeatureFlag } from '@/lib/feature-flags';

function Component() {
  const showNewDashboard = useFeatureFlag('feature.new_dashboard');

  if (showNewDashboard) {
    return <NewDashboard />;
  }

  return <LegacyDashboard />;
}
```

### Server-Side

```typescript
import { getFeatureFlag } from '@/lib/feature-flags';

export async function GET(request: Request) {
  const flag = await getFeatureFlag('feature.ai_assistant', { userId });

  if (!flag.enabled) {
    return Response.json({ error: 'Feature not available' }, { status: 403 });
  }

  // Feature logic
}
```

## Admin Controls

Feature flags are manageable via:
- Admin panel UI
- Environment variables
- Database configuration
- API endpoints

## Rollout Strategy

1. **Internal** (0%): Dev team only
2. **Beta** (5%): Beta testers
3. **Gradual** (25% → 50% → 75%): Staged rollout
4. **Full** (100%): General availability

---

*Template from Onyx Design System*
