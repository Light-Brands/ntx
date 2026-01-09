# Sovereign Platform Framework

> A modular, spec-driven framework for building AI-native, crypto-enabled digital platforms.

## Overview

The Sovereign Platform Framework provides a standardized approach to building platforms where:

- **AI is foundational** - Every platform has an AI Companion named by the business
- **Crypto is native** - Value exchange is built in from day one
- **Specs drive development** - Human-readable specifications are the source of truth
- **Modules are composable** - Pick and choose features from the catalog

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            FEATURE MODULES                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Profiles │ │Practices │ │Discovery │ │ Business │ │Community │ ...      │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘          │
│       └────────────┴────────────┴─────┬──────┴────────────┘                 │
└───────────────────────────────────────┼─────────────────────────────────────┘
                                        │
┌───────────────────────────────────────┼─────────────────────────────────────┐
│                    FOUNDATIONAL PRIMITIVES                                   │
│  ┌────────────────────────────────────┴───────────────────────────────────┐ │
│  │  ┌─────────────────────┐              ┌─────────────────────┐          │ │
│  │  │   AI COMPANION      │              │   CRYPTO LAYER      │          │ │
│  │  │   (Business-Named)  │              │   (@handle system)  │          │ │
│  │  └─────────────────────┘              └─────────────────────┘          │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────┬─────────────────────────────────────┘
                                        │
┌───────────────────────────────────────┼─────────────────────────────────────┐
│                       FOUNDATION LAYER                                       │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │  Tooling • Stack • Patterns • Standards • Design System • Specification ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

## Quick Start

### 1. Choose Your Modules

Review the [Module Catalog](./MODULE-CATALOG.md) and select the modules you need:

**Required (Foundation):**
- `foundation` - Core infrastructure
- `ai-companion` - Your platform's AI personality
- `crypto-layer` - Value exchange layer

**Optional (Identity, Engagement, Ecosystem):**
- `profiles`, `karma`, `practices`, `discovery`, `impact`, `business`, `community`, `monetization`

### 2. Create Your Platform

```bash
# Copy the framework to your brand
cp -r design-system-v2/spec/sovereign-platform brands/{your-brand}/spec/

# Configure your platform
edit brands/{your-brand}/spec/platform.yaml
```

### 3. Name Your AI Companion

Edit the AI companion configuration to give it a unique name and personality:

```yaml
# brands/{your-brand}/spec/ai-layer/companion-identity.yaml
identity:
  name: "Sage"           # Your companion's name
  tagline: "Your guide"  # Brief description
  pronouns: "they/them"  # Reference pronouns

personality:
  traits: [wise, supportive, calm]
  tone:
    warmth: 0.8
    formality: 0.3
```

### 4. Write Your Specs

For each module you're using, customize the spec:

```bash
# Copy module template
cp spec/modules/{module}/template.md spec/modules/{module}/{your-brand}-spec.md

# Edit acceptance criteria, configuration, etc.
edit spec/modules/{module}/{your-brand}-spec.md
```

### 5. Generate Tests & Implement

```
Spec (Markdown) → Tests (Automated) → Code (TypeScript) → Validate (CI/CD)
```

## Directory Structure

```
sovereign-platform/
├── README.md                     # This file
├── PLATFORM-ARCHITECTURE.md      # Architecture overview with diagrams
├── MODULE-CATALOG.md             # Marketplace of available modules
├── module-registry.ts            # Machine-readable module metadata
│
├── foundation/                   # Foundation layer specs
│   └── FOUNDATION-SPEC.md       # Tooling, stack, patterns, standards
│
├── ai-layer/                    # AI Companion layer specs
│   └── AI-COMPANION-SPEC.md     # Personality, integration, safety
│
├── crypto-layer/                # Crypto/Value layer specs
│   └── CRYPTO-LAYER-SPEC.md     # Wallets, transfers, rewards
│
├── modules/                     # Feature module specs
│   ├── profiles/
│   ├── practices/
│   ├── discovery/
│   └── ...
│
└── diagrams/                    # Visual architecture references
```

## Key Concepts

### Spec-Driven Development

Everything starts with a specification:

1. **Write the spec** - Human-readable markdown with acceptance criteria
2. **Generate tests** - Acceptance criteria become test cases
3. **Implement code** - Code satisfies tests
4. **Validate continuously** - CI/CD ensures spec compliance

### AI Companion (Not "Mira")

The AI Companion is **named by each business**. It's not a fixed name like "Mira" - each platform chooses a name that fits their brand:

| Platform Type | Example Names |
|---------------|---------------|
| Wellness | Sage, Luna, Zen |
| Professional | Atlas, Guide, Mentor |
| Creative | Muse, Spark, Nova |

### Crypto-Native

Every platform has native value exchange:

- **@handle** wallet identity (no 0x addresses)
- **Token rewards** for platform actions
- **P2P payments** through messaging
- **Business payments** for services

### Module Composition

Pick modules like building blocks:

```yaml
# Minimal platform
platform:
  modules:
    - foundation
    - ai-companion
    - crypto-layer
    - profiles

# Full-featured platform
platform:
  modules:
    - foundation
    - ai-companion
    - crypto-layer
    - profiles
    - karma
    - practices
    - discovery
    - business
    - community
    - monetization
```

## Documentation

| Document | Description |
|----------|-------------|
| [PLATFORM-ARCHITECTURE.md](./PLATFORM-ARCHITECTURE.md) | Complete architecture with diagrams |
| [MODULE-CATALOG.md](./MODULE-CATALOG.md) | All available modules with specs |
| [AI-COMPANION-SPEC.md](./ai-layer/AI-COMPANION-SPEC.md) | AI companion framework |
| [CRYPTO-LAYER-SPEC.md](./crypto-layer/CRYPTO-LAYER-SPEC.md) | Crypto/value layer |
| [FOUNDATION-SPEC.md](./foundation/FOUNDATION-SPEC.md) | Foundation layer details |

## Module Registry (TypeScript)

For programmatic access to module metadata:

```typescript
import {
  moduleRegistry,
  getModule,
  getRequiredModules,
  validatePlatform,
  resolveDependencies,
} from './module-registry';

// Get a specific module
const profiles = getModule('profiles');

// Get all required modules
const required = getRequiredModules();

// Validate a platform composition
const validation = validatePlatform(['foundation', 'ai-companion', 'profiles']);
// { valid: false, errors: ['Missing required foundation module: crypto-layer'] }

// Resolve dependencies
const deps = resolveDependencies('discovery');
// ['foundation', 'ai-companion', 'profiles']
```

## Coming From vibeup

This framework standardizes the patterns developed in vibeup:

| vibeup Epic | Framework Module |
|-------------|------------------|
| Epic 00: Foundation | `foundation` |
| Epic 01: Mira | `ai-companion` (now business-named) |
| Epic 02: Humans | `profiles` |
| Epic 03: Practices | `practices` |
| Epic 04: Discovery | `discovery` |
| Epic 05: Impact | `impact` |
| Epic 06: Business | `business` |
| Epic 07: Community | `community` |
| Epic 08: Monetization | `monetization` |
| Epic 1A: Crypto | `crypto-layer` |
| Epic 1B: Karma | `karma` |

## Contributing

To add a new module to the catalog:

1. Create the module spec in `modules/{module-name}/`
2. Add metadata to `module-registry.ts`
3. Update `MODULE-CATALOG.md`
4. Add integration points for AI Companion and Crypto Layer
