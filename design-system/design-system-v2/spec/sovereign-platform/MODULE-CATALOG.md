# Module Catalog

> A marketplace of spec-driven modules that can be composed to build sovereign platforms. Each module is 100% specification-first, with tests derived from specs and code implementing the specifications.

## Philosophy

Modules are **composable building blocks**. Each module:

- Is **completely specified** in human-readable markdown
- Has **acceptance criteria** that become tests
- **Integrates** with foundation primitives (AI Companion, Crypto Layer)
- Can be **mixed and matched** based on platform needs
- Is **version-controlled** and **dependency-aware**

```
Spec → Tests → Code → Validation → Deploy
```

---

## Module Categories

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              MODULE CATALOG                                  │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │  FOUNDATION MODULES (Required)                                          ││
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                                ││
│  │  │Foundation│ │    AI    │ │  Crypto  │                                ││
│  │  │  Epic 00 │ │ Epic 01  │ │ Epic 1A  │                                ││
│  │  └──────────┘ └──────────┘ └──────────┘                                ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │  IDENTITY MODULES                                                        ││
│  │  ┌──────────┐ ┌──────────┐                                              ││
│  │  │ Profiles │ │  Karma   │                                              ││
│  │  │ Epic 02  │ │ Epic 1B  │                                              ││
│  │  └──────────┘ └──────────┘                                              ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │  ENGAGEMENT MODULES                                                      ││
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                                ││
│  │  │Practices │ │Discovery │ │  Impact  │                                ││
│  │  │ Epic 03  │ │ Epic 04  │ │ Epic 05  │                                ││
│  │  └──────────┘ └──────────┘ └──────────┘                                ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │  ECOSYSTEM MODULES                                                       ││
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                                ││
│  │  │ Business │ │Community │ │Monetize  │                                ││
│  │  │ Epic 06  │ │ Epic 07  │ │ Epic 08  │                                ││
│  │  └──────────┘ └──────────┘ └──────────┘                                ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Foundation Modules (Required)

These modules MUST be implemented for every sovereign platform.

### Module: Foundation (Epic 00)

**Purpose**: Core infrastructure that every platform needs.

| Attribute | Value |
|-----------|-------|
| ID | `foundation` |
| Priority | P0 (Required) |
| Timeline | 2-3 weeks |
| Dependencies | None |
| Source | `vibeup/spec/epics/epic-00-foundation.md` |

**Delivers:**
- [ ] Supabase PostgreSQL infrastructure
- [ ] Testing framework (Jest, RTL, Playwright)
- [ ] Observability (Sentry error tracking)
- [ ] Feature flag system (database-driven)
- [ ] Admin panel foundation
- [ ] CI/CD pipelines (GitHub Actions)
- [ ] Design system integration

**Database Tables:** 43+ PostgreSQL tables with Row Level Security (RLS)

**Configuration:**
```yaml
module: foundation
version: "1.0.0"
infrastructure:
  database: supabase
  testing: [jest, playwright]
  monitoring: sentry
  ci_cd: github_actions
```

---

### Module: AI Companion (Epic 01)

**Purpose**: The AI personality that guides users through the entire platform.

| Attribute | Value |
|-----------|-------|
| ID | `ai-companion` |
| Priority | P0 (Required) |
| Timeline | 2 weeks |
| Dependencies | `foundation` |
| Source | `vibeup/spec/epics/epic-01-mira.md` |

**Delivers:**
- [ ] AI companion onboarding (signature feature)
- [ ] Profile guidance as identity coach
- [ ] Practice companion with streak tracking
- [ ] Discovery guide for connections/businesses
- [ ] Messaging coach and relationship insights
- [ ] Business advisor for services
- [ ] Community facilitator

**Key Metrics:**
- 80%+ onboarding completion
- 70%+ daily companion engagement

**Configuration:**
```yaml
module: ai-companion
version: "1.0.0"
companion:
  name: "{{BUSINESS_DEFINED_NAME}}"
  personality:
    traits: [calm, wise, supportive]
    tone:
      warmth: 0.8
      formality: 0.3
  integration_points:
    - onboarding
    - profiles
    - practices
    - discovery
    - messaging
    - business
    - community
```

---

### Module: Crypto Layer (Epic 1A)

**Purpose**: Web3 financial infrastructure for value exchange.

| Attribute | Value |
|-----------|-------|
| ID | `crypto-layer` |
| Priority | P0 (Required) |
| Timeline | 4 weeks |
| Dependencies | `foundation` |
| Source | `vibeup/spec/epics/epic-1a-crypto.md` |

**Delivers:**
- [ ] Wallet identity with @handles
- [ ] Handle-based payments (no wallet addresses)
- [ ] USDC stablecoin transfers
- [ ] Platform utility token (rewards, governance)
- [ ] Multi-chain support (Base L2, Solana, Polygon)
- [ ] Hybrid wallets (custodial + external)
- [ ] CryptoRouterService for all modules

**Key Metrics:**
- 99.9% transfer success rate
- 30% user adoption by Phase 2

**Configuration:**
```yaml
module: crypto-layer
version: "1.0.0"
chain:
  primary: base
  adapters: [solana, polygon]
token:
  name: "{{PLATFORM_TOKEN_NAME}}"
  symbol: "{{PLATFORM_TOKEN_SYMBOL}}"
  total_supply: 1_000_000_000
wallet:
  default: managed
  external_support: true
```

---

## Identity Modules

### Module: Profiles (Epic 02)

**Purpose**: User identity, profiles, and chemistry framework.

| Attribute | Value |
|-----------|-------|
| ID | `profiles` |
| Priority | P0 |
| Timeline | 2-3 weeks |
| Dependencies | `foundation`, `ai-companion` |
| Source | `vibeup/spec/epics/epic-02-humans.md` |

**Delivers:**
- [ ] User profiles with identity attributes
- [ ] Chemistry framework (Astrology + Enneagram + Human Design)
- [ ] Connection system (follow, connect, message)
- [ ] Progressive disclosure flow
- [ ] Verified badge (gamified completion)
- [ ] Profile URL scheme: `{domain}/iam/[handle]`
- [ ] Account management (email, password, deletion)

**AI Companion Integration:**
- Companion guides every step as "identity coach"
- Celebrates profile milestones
- Explains chemistry matches

**Configuration:**
```yaml
module: profiles
version: "1.0.0"
features:
  chemistry_framework:
    enabled: true
    types: [astrology, enneagram, human_design]
  verification:
    enabled: true
    badge_name: "Verified"
  url_pattern: "/iam/[handle]"
```

---

### Module: Karma (Epic 1B)

**Purpose**: Non-transferable recognition and impact tracking.

| Attribute | Value |
|-----------|-------|
| ID | `karma` |
| Priority | P0 |
| Timeline | 4 weeks |
| Dependencies | `foundation`, `crypto-layer` |
| Source | `vibeup/spec/epics/epic-1b-karma.md` |

**Delivers:**
- [ ] KARMA Score (non-transferable recognition)
- [ ] Dual currency model (Tokens + KARMA)
- [ ] Planetary impact tracker (trees, carbon)
- [ ] Recognition engine (badges, levels, celebrations)
- [ ] KARMA level multipliers on token earning
- [ ] Impact dashboard

**Level System:**
```
Level 1-3: 1.0x token multiplier
Level 4:   1.1x multiplier
Level 5:   1.25x multiplier
Level 6:   1.5x multiplier
Level 7:   1.75x multiplier
Level 8+:  2.0x multiplier
```

**Configuration:**
```yaml
module: karma
version: "1.0.0"
scoring:
  enabled: true
  actions:
    profile_complete: 20
    practice_log: 5
    streak_7_day: 50
    community_post: 15
levels:
  - { level: 1, name: "Seedling", min_karma: 0 }
  - { level: 2, name: "Sprout", min_karma: 100 }
  - { level: 3, name: "Sapling", min_karma: 500 }
  - { level: 4, name: "Growing", min_karma: 1000 }
  # ... more levels
```

---

## Engagement Modules

### Module: Practices (Epic 03)

**Purpose**: Habit tracking with streaks and rewards.

| Attribute | Value |
|-----------|-------|
| ID | `practices` |
| Priority | P0 |
| Timeline | 2 weeks |
| Dependencies | `foundation`, `crypto-layer`, `karma` |
| Source | `vibeup/spec/epics/epic-03-practices.md` |

**Delivers:**
- [ ] Practice tracking (log/unlog daily)
- [ ] Streak calculations with visual indicators
- [ ] Calendar views (daily, weekly, monthly)
- [ ] Default practices library
- [ ] Custom practices creation
- [ ] Community practice journeys
- [ ] Practice stacks (business recommendations)

**Reward Integration:**
- Base: 10 tokens per practice
- 7-day streak: 1.5x multiplier
- 30-day streak: 2x multiplier
- 100-day streak: 3x multiplier

**Configuration:**
```yaml
module: practices
version: "1.0.0"
defaults:
  - { name: "Morning Meditation", category: "mindfulness" }
  - { name: "Daily Gratitude", category: "reflection" }
  - { name: "Affirmations", category: "mindset" }
rewards:
  base: 10
  streak_multipliers:
    7: 1.5
    30: 2.0
    100: 3.0
```

---

### Module: Discovery (Epic 04)

**Purpose**: AI-powered matching and search.

| Attribute | Value |
|-----------|-------|
| ID | `discovery` |
| Priority | P0 |
| Timeline | 2-3 weeks |
| Dependencies | `foundation`, `ai-companion`, `profiles` |
| Source | `vibeup/spec/epics/epic-04-discovery.md` |

**Delivers:**
- [ ] AI-powered recommendation engine
- [ ] Multi-channel feed (All, Vibes, Humans, Businesses, Communities)
- [ ] Search & filters across all content
- [ ] Geographic map discovery
- [ ] Direct messaging system
- [ ] Connection management
- [ ] "My Library" for saved items

**Crypto Integration:**
- In-chat P2P payments
- Payment requests with notes
- Split payments

**Configuration:**
```yaml
module: discovery
version: "1.0.0"
channels:
  - { id: "all", name: "All" }
  - { id: "vibes", name: "Vibes" }
  - { id: "humans", name: "Humans" }
  - { id: "businesses", name: "Businesses" }
  - { id: "communities", name: "Communities" }
features:
  ai_matching: true
  geo_discovery: true
  in_chat_payments: true
```

---

### Module: Impact (Epic 05)

**Purpose**: Voting, feedback, and community-led development.

| Attribute | Value |
|-----------|-------|
| ID | `impact` |
| Priority | P1 |
| Timeline | 1 week |
| Dependencies | `foundation`, `crypto-layer` |
| Source | `vibeup/spec/epics/epic-05-impact.md` |

**Delivers:**
- [ ] Feature voting system
- [ ] Initiative voting (events, causes)
- [ ] Impact dashboard with personal stats
- [ ] Feedback collection system
- [ ] Contextual in-flow feedback
- [ ] Community-led development visibility

**Token-Weighted Voting:**
- 1 token = 1 vote
- Stake tokens on initiatives
- Earn tokens for quality feedback

**Configuration:**
```yaml
module: impact
version: "1.0.0"
voting:
  token_weighted: true
  stake_enabled: true
feedback:
  contextual: true
  rewards:
    quality_feedback: 25
```

---

## Ecosystem Modules

### Module: Business (Epic 06)

**Purpose**: Business profiles, listings, and services.

| Attribute | Value |
|-----------|-------|
| ID | `business` |
| Priority | P1 |
| Timeline | 3-4 weeks |
| Dependencies | `foundation`, `ai-companion`, `crypto-layer` |
| Source | `vibeup/spec/epics/epic-06-business.md` |

**Delivers:**
- [ ] Business profiles
- [ ] Verification system (business badge)
- [ ] Modular listings (Services, Products, Events, Courses, Properties, Jobs)
- [ ] Membership tiers
- [ ] Services guide (AI recommends aligned businesses)
- [ ] Crypto payments and discounts
- [ ] Business premium features

**Configuration:**
```yaml
module: business
version: "1.0.0"
listing_types:
  - services
  - products
  - events
  - courses
  - properties
  - jobs
tiers:
  - { name: "Community", price: 0 }
  - { name: "Premium", price: 4 }
payments:
  crypto: true
  fiat: true
```

---

### Module: Community (Epic 07)

**Purpose**: Community creation and management.

| Attribute | Value |
|-----------|-------|
| ID | `community` |
| Priority | P1 |
| Timeline | 2-3 weeks |
| Dependencies | `foundation`, `ai-companion`, `profiles` |
| Source | `vibeup/spec/epics/epic-07-community.md` |

**Delivers:**
- [ ] Community creation by users and businesses
- [ ] Vibes feed with reactions
- [ ] Member directory and connection suggestions
- [ ] Moderation tools with role management
- [ ] Access levels (Public, Semi-Private, Private)
- [ ] Community transformation (user → business)
- [ ] Practice stack curation

**Treasury Integration:**
- Shared wallets for collective operations
- Membership dues in stablecoins/tokens
- Event/retreat crowdfunding
- Transparent on-chain reporting

**Configuration:**
```yaml
module: community
version: "1.0.0"
access_levels:
  - public
  - semi_private
  - private
treasury:
  enabled: true
  crowdfunding: true
  transparency: true
moderation:
  roles: [admin, moderator, member]
```

---

### Module: Monetization (Epic 08)

**Purpose**: Revenue features and membership tiers.

| Attribute | Value |
|-----------|-------|
| ID | `monetization` |
| Priority | P1 |
| Timeline | 2 weeks |
| Dependencies | `foundation`, `crypto-layer` |
| Source | `vibeup/spec/epics/epic-08-monetization.md` |

**Delivers:**
- [ ] Membership tiers
- [ ] Stripe integration
- [ ] Crypto payment alternative
- [ ] Impact integration (tree planting per subscriber)
- [ ] Affiliate program
- [ ] Business premium features
- [ ] Sponsorship opportunities

**Tier Features:**
```yaml
free:
  - basic_discovery
  - limited_practices
  - one_community

premium:
  - unlimited_practices
  - multiple_communities
  - daily_affirmations
  - recommended_connections
  - dating_features
  - perks_access
```

**Configuration:**
```yaml
module: monetization
version: "1.0.0"
tiers:
  - { name: "Free", price: 0, features: [basic] }
  - { name: "Premium", price: 4, features: [all] }
payments:
  stripe: true
  crypto: true
impact:
  tree_per_subscriber: 1
  partner: "onetreeplanted.org"
```

---

## Module Composition

### Minimal Platform

For a simple platform, use these modules:

```yaml
platform:
  name: "MyPlatform"
  modules:
    - foundation        # Required
    - ai-companion      # Required
    - crypto-layer      # Required
    - profiles          # Identity
    - practices         # Engagement
```

### Full-Featured Platform

For a complete platform like VIBEUP:

```yaml
platform:
  name: "VIBEUP"
  modules:
    # Foundation (Required)
    - foundation
    - ai-companion
    - crypto-layer

    # Identity
    - profiles
    - karma

    # Engagement
    - practices
    - discovery
    - impact

    # Ecosystem
    - business
    - community
    - monetization
```

---

## Module Specification Template

When creating a new module, use this template:

```markdown
# Module: [Name]

## Overview
Brief description of what this module provides.

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## AI Companion Integration
How the companion interacts with this module.

## Crypto Integration
How value exchange works in this module.

## Data Models
Tables/entities this module introduces.

## API Endpoints
Endpoints this module exposes.

## UI Components
Screen/components this module requires.

## Configuration
```yaml
module: [name]
version: "1.0.0"
# ... module-specific config
```

## Dependencies
- [module-1]
- [module-2]

## Testing
Key test scenarios for this module.
```

---

## Adding Modules to a Platform

1. **Select Module**
   Review this catalog and choose modules that fit your needs.

2. **Copy Spec**
   ```bash
   cp modules/{module}/spec.md brands/{brand}/spec/modules/
   ```

3. **Configure**
   Edit the configuration section for your brand.

4. **Generate Tests**
   Acceptance criteria become test cases.

5. **Implement**
   Code satisfies tests, tests validate spec.

---

## See Also

- [PLATFORM-ARCHITECTURE.md](./PLATFORM-ARCHITECTURE.md) - Overall architecture
- [AI-COMPANION-SPEC.md](./ai-layer/AI-COMPANION-SPEC.md) - AI companion details
- [CRYPTO-LAYER-SPEC.md](./crypto-layer/CRYPTO-LAYER-SPEC.md) - Crypto layer details
- Individual module specs in `./modules/`
