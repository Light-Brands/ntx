# Sovereign Platform Architecture

> A modular, spec-driven framework for building sovereign digital platforms with AI-first design and crypto-native transactions.

## Philosophy

Every sovereign platform is built on **three foundational primitives** that are integrated from day one:

1. **Foundation Layer** - The bedrock (tooling, stack, patterns, coding standards, design guidance, complete spec)
2. **AI Layer** - Complete integration of AI into every business from the ground up
3. **Crypto Layer** - Standardized transaction layer for all value exchange

All feature modules sit on top of these primitives, consuming their services through standardized interfaces.

---

## Platform Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            FEATURE MODULES                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │ Profiles │ │Practices │ │Discovery │ │ Business │ │Community │ │ Impact   │ │
│  │  Module  │ │  Module  │ │  Module  │ │  Module  │ │  Module  │ │  Module  │ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ │
│       │            │            │            │            │            │        │
│       └────────────┴────────────┴─────┬──────┴────────────┴────────────┘        │
│                                       │                                          │
│                                       ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │                         MODULE INTERFACE LAYER                               ││
│  │              (Standardized APIs for Foundation Services)                     ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          FOUNDATIONAL PRIMITIVES                                 │
│                                                                                  │
│  ┌────────────────────────────────────┐  ┌────────────────────────────────────┐ │
│  │         AI COMPANION LAYER         │  │        CRYPTO/VALUE LAYER          │ │
│  │                                    │  │                                    │ │
│  │  ┌──────────────────────────────┐  │  │  ┌──────────────────────────────┐  │ │
│  │  │   Business AI Companion      │  │  │  │     Wallet Identity          │  │ │
│  │  │   (Named by each business)   │  │  │  │     (@handle system)         │  │ │
│  │  └──────────────────────────────┘  │  │  └──────────────────────────────┘  │ │
│  │                                    │  │                                    │ │
│  │  ┌──────────────────────────────┐  │  │  ┌──────────────────────────────┐  │ │
│  │  │   Personality Engine         │  │  │  │     Transfer Engine          │  │ │
│  │  │   (Configurable per brand)   │  │  │  │     (P2P & Business)         │  │ │
│  │  └──────────────────────────────┘  │  │  └──────────────────────────────┘  │ │
│  │                                    │  │                                    │ │
│  │  ┌──────────────────────────────┐  │  │  ┌──────────────────────────────┐  │ │
│  │  │   Context Awareness          │  │  │  │     Reward Engine            │  │ │
│  │  │   (Full platform access)     │  │  │  │     (Token distribution)     │  │ │
│  │  └──────────────────────────────┘  │  │  └──────────────────────────────┘  │ │
│  │                                    │  │                                    │ │
│  │  ┌──────────────────────────────┐  │  │  ┌──────────────────────────────┐  │ │
│  │  │   Safety Architecture        │  │  │  │     Multi-Chain Adapters     │  │ │
│  │  │   (Read-only financial)      │  │  │  │     (Base, Solana, Polygon)  │  │ │
│  │  └──────────────────────────────┘  │  │  └──────────────────────────────┘  │ │
│  │                                    │  │                                    │ │
│  └────────────────────────────────────┘  └────────────────────────────────────┘ │
│                                                                                  │
└──────────────────────────────────────┬───────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            FOUNDATION LAYER                                      │
│                                                                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────┐ │
│  │   Tooling   │ │    Stack    │ │  Patterns   │ │  Standards  │ │   Design   │ │
│  │             │ │             │ │             │ │             │ │   System   │ │
│  ├─────────────┤ ├─────────────┤ ├─────────────┤ ├─────────────┤ ├────────────┤ │
│  │ • Ruff      │ │ • Next.js   │ │ • Service   │ │ • TypeScript│ │ • Tokens   │ │
│  │ • Prettier  │ │ • Supabase  │ │   Adapter   │ │   Strict    │ │ • Themes   │ │
│  │ • ESLint    │ │ • PostgreSQL│ │ • Typed     │ │ • Error     │ │ • Spacing  │ │
│  │ • Vitest    │ │ • Drizzle   │ │   Errors    │ │   Handling  │ │ • Colors   │ │
│  │ • Playwright│ │ • Tailwind  │ │ • Config as │ │ • Logging   │ │ • Components│
│  │ • Sentry    │ │ • Framer    │ │   Data      │ │ • Testing   │ │ • Layouts  │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └────────────┘ │
│                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │                        COMPLETE SPECIFICATION                                ││
│  │   • Master Plan  • Epics  • Data Models  • API Reference  • Brand Guide     ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Layer Specifications

### 1. Foundation Layer

The **bedrock** upon which everything is built. Never skipped, always complete.

| Component | Description | Spec Reference |
|-----------|-------------|----------------|
| Tooling | Linting, formatting, testing, monitoring | `foundation/TOOLING.md` |
| Stack | Framework, database, ORM, styling | `foundation/STACK.md` |
| Patterns | Architectural patterns for consistency | `foundation/PATTERNS.md` |
| Standards | Coding conventions and quality gates | `foundation/STANDARDS.md` |
| Design System | Tokens, themes, components, layouts | `/design-system-v2/` |
| Specification | Complete platform spec as source of truth | `foundation/SPECIFICATION.md` |

**Key Principle**: The spec IS the codebase. Tests validate spec compliance. Code implements spec.

```
Spec → Tests → Code → Validation
```

### 2. AI Companion Layer

Every sovereign platform has an **AI Companion** - a unique personality that guides users through the entire experience. The companion is **named by each business** to match their brand identity.

| Component | Description | Spec Reference |
|-----------|-------------|----------------|
| Companion Identity | Name, personality, voice, vocabulary | `ai-layer/AI-COMPANION-SPEC.md` |
| Personality Engine | Configurable traits per brand | `ai-layer/PERSONALITY-ENGINE.md` |
| Context Awareness | Full platform state access | `ai-layer/CONTEXT-SERVICE.md` |
| Safety Architecture | Read-only financial access | `ai-layer/SAFETY-ARCHITECTURE.md` |
| Integration Points | Where companion appears in UX | `ai-layer/INTEGRATION-POINTS.md` |

**Key Principle**: The user is the hero. The AI Companion is their wise guide.

### 3. Crypto/Value Layer

Every platform has **native value exchange** built in from day one. No retrofitting payments later.

| Component | Description | Spec Reference |
|-----------|-------------|----------------|
| Wallet Identity | Human-readable @handles | `crypto-layer/WALLET-IDENTITY.md` |
| Transfer Engine | P2P and business payments | `crypto-layer/TRANSFER-ENGINE.md` |
| Reward Engine | Token distribution for actions | `crypto-layer/REWARD-ENGINE.md` |
| Verification Layer | Human-in-the-loop for transactions | `crypto-layer/VERIFICATION.md` |
| Multi-Chain | Adapters for Base, Solana, Polygon | `crypto-layer/MULTI-CHAIN.md` |

**Key Principle**: Humans verify, machines execute. AI cannot initiate transactions.

---

## Module Architecture

Feature modules consume foundation services through standardized interfaces:

```typescript
// Every module has access to foundational services
interface ModuleServices {
  // AI Companion Services
  companion: {
    getPersonality(): CompanionPersonality;
    generateGuidance(context: UserContext): Promise<Guidance>;
    formatMessage(content: string): FormattedMessage;
  };

  // Crypto Services (read-only for most modules)
  crypto: {
    getBalance(handle: string): Promise<Balance>;
    resolveHandle(handle: string): Promise<WalletAddress>;
    estimateTransaction(params: TransferParams): Promise<Estimate>;
  };

  // Foundation Services
  foundation: {
    db: DatabaseService;
    auth: AuthService;
    storage: StorageService;
    realtime: RealtimeService;
    observability: ObservabilityService;
  };
}
```

---

## Spec-Driven Development

All development follows **Spec → Test → Code** workflow:

### 1. Specification First
```markdown
# Module: Practices

## User Stories
- As a user, I want to track daily practices so I can build positive habits

## Acceptance Criteria
- [ ] User can log a practice with one tap
- [ ] Streak is calculated automatically
- [ ] Calendar shows practice history
```

### 2. Tests Validate Spec
```typescript
describe('Practices Module', () => {
  it('allows user to log practice with one tap', async () => {
    const result = await practiceService.log(userId, practiceId);
    expect(result.success).toBe(true);
  });

  it('calculates streak automatically', async () => {
    const streak = await practiceService.getStreak(userId, practiceId);
    expect(streak.currentStreak).toBe(7);
  });
});
```

### 3. Code Implements Spec
```typescript
class PracticeService {
  async log(userId: string, practiceId: string): Promise<LogResult> {
    // Implementation that satisfies spec and tests
  }
}
```

---

## Directory Structure

```
design-system-v2/spec/sovereign-platform/
├── PLATFORM-ARCHITECTURE.md          # This file - overview
├── MODULE-CATALOG.md                  # Marketplace of available modules
│
├── foundation/                        # Foundation layer specs
│   ├── FOUNDATION-SPEC.md            # Complete foundation overview
│   ├── TOOLING.md                    # Dev tools & quality gates
│   ├── STACK.md                      # Technology stack decisions
│   ├── PATTERNS.md                   # Architectural patterns
│   ├── STANDARDS.md                  # Coding standards
│   └── SPECIFICATION.md              # How to write specs
│
├── ai-layer/                         # AI Companion layer specs
│   ├── AI-COMPANION-SPEC.md          # Complete companion framework
│   ├── PERSONALITY-ENGINE.md         # Configurable personality
│   ├── CONTEXT-SERVICE.md            # Platform state awareness
│   ├── SAFETY-ARCHITECTURE.md        # Transaction safety
│   └── INTEGRATION-POINTS.md         # UX touchpoints
│
├── crypto-layer/                     # Crypto/Value layer specs
│   ├── CRYPTO-LAYER-SPEC.md          # Complete crypto framework
│   ├── WALLET-IDENTITY.md            # Handle system
│   ├── TRANSFER-ENGINE.md            # Payment engine
│   ├── REWARD-ENGINE.md              # Token distribution
│   ├── VERIFICATION.md               # Human verification
│   └── MULTI-CHAIN.md                # Chain adapters
│
├── modules/                          # Available feature modules
│   ├── profiles/                     # User identity module
│   ├── practices/                    # Habit tracking module
│   ├── discovery/                    # Search & matching module
│   ├── business/                     # Business profiles module
│   ├── community/                    # Community management module
│   ├── impact/                       # Voting & feedback module
│   └── monetization/                 # Revenue features module
│
└── diagrams/                         # Visual architecture references
    ├── platform-layers.svg
    ├── module-dependencies.svg
    └── data-flow.svg
```

---

## Creating a New Sovereign Platform

1. **Clone Foundation**
   ```bash
   cp -r design-system-v2/spec/sovereign-platform brands/{brand-name}/spec/
   ```

2. **Configure Brand Identity**
   - Name your AI Companion
   - Define personality traits
   - Customize voice and vocabulary

3. **Select Modules**
   - Review MODULE-CATALOG.md
   - Choose modules that fit your platform
   - Modules auto-integrate with foundation services

4. **Write Brand Spec**
   - Master plan with vision
   - Customize module specs
   - Define brand-specific features

5. **Generate Tests**
   - Tests are generated from specs
   - Human-readable acceptance criteria become test cases

6. **Implement**
   - Code satisfies tests
   - Tests validate spec
   - Spec is source of truth

---

## See Also

- [MODULE-CATALOG.md](./MODULE-CATALOG.md) - Marketplace of available modules
- [AI-COMPANION-SPEC.md](./ai-layer/AI-COMPANION-SPEC.md) - AI companion framework
- [CRYPTO-LAYER-SPEC.md](./crypto-layer/CRYPTO-LAYER-SPEC.md) - Transaction layer
- [FOUNDATION-SPEC.md](./foundation/FOUNDATION-SPEC.md) - Bedrock specifications
