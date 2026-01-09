/**
 * Sovereign Platform Module Registry
 *
 * Machine-readable metadata for all available platform modules.
 * This registry enables:
 * - Automated dependency resolution
 * - Module compatibility checking
 * - Platform composition validation
 * - Documentation generation
 */

// ============================================================================
// Types
// ============================================================================

export type ModuleCategory =
  | "foundation"
  | "identity"
  | "engagement"
  | "ecosystem";

export type ModulePriority = "P0" | "P1" | "P2";

export type ModuleStatus =
  | "stable"
  | "beta"
  | "alpha"
  | "planned"
  | "deprecated";

export interface ModuleDependency {
  moduleId: string;
  required: boolean;
  minVersion?: string;
}

export interface ModuleIntegration {
  aiCompanion: boolean;
  cryptoLayer: boolean;
  karmaLayer: boolean;
}

export interface ModuleMetrics {
  name: string;
  target: string;
}

export interface ModuleConfig {
  key: string;
  type: "string" | "number" | "boolean" | "array" | "object";
  required: boolean;
  default?: unknown;
  description: string;
}

export interface Module {
  // Identity
  id: string;
  name: string;
  description: string;
  version: string;

  // Classification
  category: ModuleCategory;
  priority: ModulePriority;
  status: ModuleStatus;

  // Relationships
  dependencies: ModuleDependency[];
  integrations: ModuleIntegration;

  // Implementation
  specPath: string;
  sourcePath?: string;
  timeline: string;

  // Features
  deliverables: string[];
  metrics: ModuleMetrics[];
  configSchema: ModuleConfig[];

  // Metadata
  tags: string[];
  lastUpdated: string;
}

// ============================================================================
// Module Registry
// ============================================================================

export const moduleRegistry: Module[] = [
  // =========================================================================
  // FOUNDATION MODULES
  // =========================================================================
  {
    id: "foundation",
    name: "Foundation",
    description:
      "Core infrastructure including database, testing, monitoring, and CI/CD pipelines.",
    version: "1.0.0",

    category: "foundation",
    priority: "P0",
    status: "stable",

    dependencies: [],
    integrations: {
      aiCompanion: false,
      cryptoLayer: false,
      karmaLayer: false,
    },

    specPath: "modules/foundation/FOUNDATION-SPEC.md",
    sourcePath: "vibeup/spec/epics/epic-00-foundation.md",
    timeline: "2-3 weeks",

    deliverables: [
      "Supabase PostgreSQL infrastructure",
      "Testing framework (Jest, RTL, Playwright)",
      "Observability (Sentry error tracking)",
      "Feature flag system (database-driven)",
      "Admin panel foundation",
      "CI/CD pipelines (GitHub Actions)",
      "Design system integration",
    ],

    metrics: [],

    configSchema: [
      {
        key: "database.provider",
        type: "string",
        required: true,
        default: "supabase",
        description: "Database provider (supabase, postgres)",
      },
      {
        key: "monitoring.provider",
        type: "string",
        required: true,
        default: "sentry",
        description: "Error monitoring provider",
      },
      {
        key: "ci_cd.provider",
        type: "string",
        required: true,
        default: "github_actions",
        description: "CI/CD pipeline provider",
      },
    ],

    tags: ["infrastructure", "required", "backend"],
    lastUpdated: "2025-01-05",
  },

  {
    id: "ai-companion",
    name: "AI Companion",
    description:
      "Business-nameable AI personality that guides users through the platform experience.",
    version: "1.0.0",

    category: "foundation",
    priority: "P0",
    status: "stable",

    dependencies: [{ moduleId: "foundation", required: true }],
    integrations: {
      aiCompanion: true,
      cryptoLayer: false,
      karmaLayer: false,
    },

    specPath: "ai-layer/AI-COMPANION-SPEC.md",
    sourcePath: "vibeup/spec/epics/epic-01-mira.md",
    timeline: "2 weeks",

    deliverables: [
      "AI companion onboarding experience",
      "Profile guidance as identity coach",
      "Practice companion with streak tracking",
      "Discovery guide for connections",
      "Messaging coach and relationship insights",
      "Business advisor for services",
      "Community facilitator",
    ],

    metrics: [
      { name: "onboarding_completion", target: "80%" },
      { name: "daily_engagement", target: "70%" },
    ],

    configSchema: [
      {
        key: "companion.name",
        type: "string",
        required: true,
        description: "The name of the AI companion (business-defined)",
      },
      {
        key: "companion.personality.traits",
        type: "array",
        required: true,
        default: ["calm", "wise", "supportive"],
        description: "Primary personality traits",
      },
      {
        key: "companion.tone.warmth",
        type: "number",
        required: false,
        default: 0.8,
        description: "Warmth level (0-1)",
      },
      {
        key: "companion.tone.formality",
        type: "number",
        required: false,
        default: 0.3,
        description: "Formality level (0-1)",
      },
    ],

    tags: ["ai", "required", "ux", "personalization"],
    lastUpdated: "2025-01-05",
  },

  {
    id: "crypto-layer",
    name: "Crypto Layer",
    description:
      "Web3 financial infrastructure for wallet identity, payments, and token rewards.",
    version: "1.0.0",

    category: "foundation",
    priority: "P0",
    status: "stable",

    dependencies: [{ moduleId: "foundation", required: true }],
    integrations: {
      aiCompanion: false,
      cryptoLayer: true,
      karmaLayer: false,
    },

    specPath: "crypto-layer/CRYPTO-LAYER-SPEC.md",
    sourcePath: "vibeup/spec/epics/epic-1a-crypto.md",
    timeline: "4 weeks",

    deliverables: [
      "Wallet identity with @handles",
      "Handle-based payments (no wallet addresses)",
      "USDC stablecoin transfers",
      "Platform utility token system",
      "Multi-chain support (Base, Solana, Polygon)",
      "Hybrid wallets (custodial + external)",
      "CryptoRouterService for module integration",
    ],

    metrics: [
      { name: "transfer_success_rate", target: "99.9%" },
      { name: "user_adoption_phase2", target: "30%" },
    ],

    configSchema: [
      {
        key: "chain.primary",
        type: "string",
        required: true,
        default: "base",
        description: "Primary blockchain (base, solana, polygon)",
      },
      {
        key: "token.name",
        type: "string",
        required: true,
        description: "Platform token name",
      },
      {
        key: "token.symbol",
        type: "string",
        required: true,
        description: "Platform token symbol",
      },
      {
        key: "token.total_supply",
        type: "number",
        required: true,
        default: 1000000000,
        description: "Total token supply",
      },
      {
        key: "wallet.default_type",
        type: "string",
        required: false,
        default: "managed",
        description: "Default wallet type (managed, external)",
      },
    ],

    tags: ["crypto", "required", "payments", "web3"],
    lastUpdated: "2025-01-05",
  },

  // =========================================================================
  // IDENTITY MODULES
  // =========================================================================
  {
    id: "profiles",
    name: "Profiles",
    description:
      "User identity, profiles, chemistry framework, and connection system.",
    version: "1.0.0",

    category: "identity",
    priority: "P0",
    status: "stable",

    dependencies: [
      { moduleId: "foundation", required: true },
      { moduleId: "ai-companion", required: true },
    ],
    integrations: {
      aiCompanion: true,
      cryptoLayer: true,
      karmaLayer: true,
    },

    specPath: "modules/profiles/PROFILES-SPEC.md",
    sourcePath: "vibeup/spec/epics/epic-02-humans.md",
    timeline: "2-3 weeks",

    deliverables: [
      "User profiles with identity attributes",
      "Chemistry framework (Astrology, Enneagram, Human Design)",
      "Connection system (follow, connect, message)",
      "Progressive disclosure flow",
      "Verified badge system",
      "Profile URL scheme (/iam/[handle])",
      "Account management",
    ],

    metrics: [
      { name: "profile_completion", target: "60%" },
      { name: "verified_users", target: "40%" },
    ],

    configSchema: [
      {
        key: "chemistry.enabled",
        type: "boolean",
        required: false,
        default: true,
        description: "Enable chemistry framework",
      },
      {
        key: "chemistry.types",
        type: "array",
        required: false,
        default: ["astrology", "enneagram", "human_design"],
        description: "Chemistry types to include",
      },
      {
        key: "verification.enabled",
        type: "boolean",
        required: false,
        default: true,
        description: "Enable profile verification",
      },
      {
        key: "url_pattern",
        type: "string",
        required: false,
        default: "/iam/[handle]",
        description: "Profile URL pattern",
      },
    ],

    tags: ["identity", "social", "profiles"],
    lastUpdated: "2025-01-05",
  },

  {
    id: "karma",
    name: "Karma",
    description:
      "Non-transferable recognition score and impact tracking system.",
    version: "1.0.0",

    category: "identity",
    priority: "P0",
    status: "stable",

    dependencies: [
      { moduleId: "foundation", required: true },
      { moduleId: "crypto-layer", required: true },
    ],
    integrations: {
      aiCompanion: true,
      cryptoLayer: true,
      karmaLayer: true,
    },

    specPath: "modules/karma/KARMA-SPEC.md",
    sourcePath: "vibeup/spec/epics/epic-1b-karma.md",
    timeline: "4 weeks",

    deliverables: [
      "KARMA Score (non-transferable recognition)",
      "Dual currency model (Tokens + KARMA)",
      "Planetary impact tracker",
      "Recognition engine (badges, levels, celebrations)",
      "KARMA level multipliers on token earning",
      "Impact dashboard",
    ],

    metrics: [
      { name: "active_karma_earners", target: "50%" },
      { name: "level_progression_rate", target: "20%" },
    ],

    configSchema: [
      {
        key: "levels.count",
        type: "number",
        required: false,
        default: 10,
        description: "Number of karma levels",
      },
      {
        key: "multiplier.max",
        type: "number",
        required: false,
        default: 2.0,
        description: "Maximum token earning multiplier",
      },
      {
        key: "actions",
        type: "object",
        required: true,
        description: "Karma points per action",
      },
    ],

    tags: ["gamification", "recognition", "reputation"],
    lastUpdated: "2025-01-05",
  },

  // =========================================================================
  // ENGAGEMENT MODULES
  // =========================================================================
  {
    id: "practices",
    name: "Practices",
    description:
      "Habit tracking with streaks, calendars, and token rewards.",
    version: "1.0.0",

    category: "engagement",
    priority: "P0",
    status: "stable",

    dependencies: [
      { moduleId: "foundation", required: true },
      { moduleId: "crypto-layer", required: true },
      { moduleId: "karma", required: false },
    ],
    integrations: {
      aiCompanion: true,
      cryptoLayer: true,
      karmaLayer: true,
    },

    specPath: "modules/practices/PRACTICES-SPEC.md",
    sourcePath: "vibeup/spec/epics/epic-03-practices.md",
    timeline: "2 weeks",

    deliverables: [
      "Practice tracking (log/unlog daily)",
      "Streak calculations with visual indicators",
      "Calendar views (daily, weekly, monthly)",
      "Default practices library",
      "Custom practices creation",
      "Community practice journeys",
      "Practice stacks",
    ],

    metrics: [
      { name: "daily_active_practitioners", target: "40%" },
      { name: "7_day_streak_retention", target: "30%" },
    ],

    configSchema: [
      {
        key: "rewards.base",
        type: "number",
        required: false,
        default: 10,
        description: "Base tokens per practice",
      },
      {
        key: "rewards.streak_multipliers",
        type: "object",
        required: false,
        default: { 7: 1.5, 30: 2.0, 100: 3.0 },
        description: "Streak day to multiplier mapping",
      },
      {
        key: "defaults",
        type: "array",
        required: false,
        description: "Default practices to include",
      },
    ],

    tags: ["habits", "wellness", "gamification"],
    lastUpdated: "2025-01-05",
  },

  {
    id: "discovery",
    name: "Discovery",
    description:
      "AI-powered matching, search, and in-chat payments.",
    version: "1.0.0",

    category: "engagement",
    priority: "P0",
    status: "stable",

    dependencies: [
      { moduleId: "foundation", required: true },
      { moduleId: "ai-companion", required: true },
      { moduleId: "profiles", required: true },
    ],
    integrations: {
      aiCompanion: true,
      cryptoLayer: true,
      karmaLayer: false,
    },

    specPath: "modules/discovery/DISCOVERY-SPEC.md",
    sourcePath: "vibeup/spec/epics/epic-04-discovery.md",
    timeline: "2-3 weeks",

    deliverables: [
      "AI-powered recommendation engine",
      "Multi-channel feed",
      "Search & filters",
      "Geographic map discovery",
      "Direct messaging system",
      "Connection management",
      "My Library (saved items)",
      "In-chat P2P payments",
    ],

    metrics: [
      { name: "discovery_engagement", target: "50%" },
      { name: "connection_rate", target: "20%" },
    ],

    configSchema: [
      {
        key: "channels",
        type: "array",
        required: false,
        default: ["all", "vibes", "humans", "businesses", "communities"],
        description: "Discovery feed channels",
      },
      {
        key: "ai_matching",
        type: "boolean",
        required: false,
        default: true,
        description: "Enable AI-powered matching",
      },
      {
        key: "geo_discovery",
        type: "boolean",
        required: false,
        default: true,
        description: "Enable geographic discovery",
      },
      {
        key: "in_chat_payments",
        type: "boolean",
        required: false,
        default: true,
        description: "Enable in-chat payments",
      },
    ],

    tags: ["social", "matching", "search", "messaging"],
    lastUpdated: "2025-01-05",
  },

  {
    id: "impact",
    name: "Impact",
    description:
      "Voting, feedback collection, and community-led development.",
    version: "1.0.0",

    category: "engagement",
    priority: "P1",
    status: "stable",

    dependencies: [
      { moduleId: "foundation", required: true },
      { moduleId: "crypto-layer", required: true },
    ],
    integrations: {
      aiCompanion: true,
      cryptoLayer: true,
      karmaLayer: true,
    },

    specPath: "modules/impact/IMPACT-SPEC.md",
    sourcePath: "vibeup/spec/epics/epic-05-impact.md",
    timeline: "1 week",

    deliverables: [
      "Feature voting system",
      "Initiative voting",
      "Impact dashboard",
      "Feedback collection system",
      "Contextual in-flow feedback",
      "Community-led development visibility",
    ],

    metrics: [
      { name: "voting_participation", target: "30%" },
      { name: "feedback_submissions", target: "10%" },
    ],

    configSchema: [
      {
        key: "voting.token_weighted",
        type: "boolean",
        required: false,
        default: true,
        description: "Weight votes by token holdings",
      },
      {
        key: "voting.stake_enabled",
        type: "boolean",
        required: false,
        default: true,
        description: "Allow staking tokens on initiatives",
      },
      {
        key: "feedback.rewards",
        type: "object",
        required: false,
        default: { quality_feedback: 25 },
        description: "Token rewards for feedback",
      },
    ],

    tags: ["governance", "feedback", "voting"],
    lastUpdated: "2025-01-05",
  },

  // =========================================================================
  // ECOSYSTEM MODULES
  // =========================================================================
  {
    id: "business",
    name: "Business",
    description:
      "Business profiles, modular listings, and crypto payments.",
    version: "1.0.0",

    category: "ecosystem",
    priority: "P1",
    status: "stable",

    dependencies: [
      { moduleId: "foundation", required: true },
      { moduleId: "ai-companion", required: true },
      { moduleId: "crypto-layer", required: true },
    ],
    integrations: {
      aiCompanion: true,
      cryptoLayer: true,
      karmaLayer: true,
    },

    specPath: "modules/business/BUSINESS-SPEC.md",
    sourcePath: "vibeup/spec/epics/epic-06-business.md",
    timeline: "3-4 weeks",

    deliverables: [
      "Business profiles",
      "Verification system",
      "Modular listings (Services, Products, Events, Courses, Properties, Jobs)",
      "Membership tiers",
      "AI services guide",
      "Crypto payments and discounts",
      "Business premium features",
    ],

    metrics: [
      { name: "business_signups", target: "100/month" },
      { name: "crypto_payment_rate", target: "20%" },
    ],

    configSchema: [
      {
        key: "listing_types",
        type: "array",
        required: false,
        default: [
          "services",
          "products",
          "events",
          "courses",
          "properties",
          "jobs",
        ],
        description: "Types of listings to enable",
      },
      {
        key: "tiers",
        type: "array",
        required: true,
        description: "Business membership tiers",
      },
      {
        key: "payments.crypto",
        type: "boolean",
        required: false,
        default: true,
        description: "Enable crypto payments",
      },
      {
        key: "payments.fiat",
        type: "boolean",
        required: false,
        default: true,
        description: "Enable fiat payments",
      },
    ],

    tags: ["b2b", "marketplace", "listings"],
    lastUpdated: "2025-01-05",
  },

  {
    id: "community",
    name: "Community",
    description:
      "Community creation, moderation, and treasury management.",
    version: "1.0.0",

    category: "ecosystem",
    priority: "P1",
    status: "stable",

    dependencies: [
      { moduleId: "foundation", required: true },
      { moduleId: "ai-companion", required: true },
      { moduleId: "profiles", required: true },
    ],
    integrations: {
      aiCompanion: true,
      cryptoLayer: true,
      karmaLayer: true,
    },

    specPath: "modules/community/COMMUNITY-SPEC.md",
    sourcePath: "vibeup/spec/epics/epic-07-community.md",
    timeline: "2-3 weeks",

    deliverables: [
      "Community creation by users and businesses",
      "Vibes feed with reactions",
      "Member directory",
      "Moderation tools",
      "Access levels (Public, Semi-Private, Private)",
      "Community transformation",
      "Practice stack curation",
      "Community treasury",
    ],

    metrics: [
      { name: "community_engagement", target: "40%" },
      { name: "treasury_adoption", target: "20%" },
    ],

    configSchema: [
      {
        key: "access_levels",
        type: "array",
        required: false,
        default: ["public", "semi_private", "private"],
        description: "Available access levels",
      },
      {
        key: "treasury.enabled",
        type: "boolean",
        required: false,
        default: true,
        description: "Enable community treasury",
      },
      {
        key: "treasury.crowdfunding",
        type: "boolean",
        required: false,
        default: true,
        description: "Enable crowdfunding features",
      },
      {
        key: "moderation.roles",
        type: "array",
        required: false,
        default: ["admin", "moderator", "member"],
        description: "Moderation roles",
      },
    ],

    tags: ["social", "groups", "moderation"],
    lastUpdated: "2025-01-05",
  },

  {
    id: "monetization",
    name: "Monetization",
    description:
      "Membership tiers, payment processing, and revenue features.",
    version: "1.0.0",

    category: "ecosystem",
    priority: "P1",
    status: "stable",

    dependencies: [
      { moduleId: "foundation", required: true },
      { moduleId: "crypto-layer", required: true },
    ],
    integrations: {
      aiCompanion: true,
      cryptoLayer: true,
      karmaLayer: false,
    },

    specPath: "modules/monetization/MONETIZATION-SPEC.md",
    sourcePath: "vibeup/spec/epics/epic-08-monetization.md",
    timeline: "2 weeks",

    deliverables: [
      "Membership tiers",
      "Stripe integration",
      "Crypto payment alternative",
      "Impact integration (tree planting)",
      "Affiliate program",
      "Business premium features",
      "Sponsorship opportunities",
    ],

    metrics: [
      { name: "conversion_rate", target: "5%" },
      { name: "crypto_payment_rate", target: "15%" },
    ],

    configSchema: [
      {
        key: "tiers",
        type: "array",
        required: true,
        description: "Membership tier definitions",
      },
      {
        key: "payments.stripe",
        type: "boolean",
        required: false,
        default: true,
        description: "Enable Stripe payments",
      },
      {
        key: "payments.crypto",
        type: "boolean",
        required: false,
        default: true,
        description: "Enable crypto payments",
      },
      {
        key: "impact.tree_per_subscriber",
        type: "number",
        required: false,
        default: 1,
        description: "Trees planted per subscriber per month",
      },
      {
        key: "impact.partner",
        type: "string",
        required: false,
        default: "onetreeplanted.org",
        description: "Impact partner organization",
      },
    ],

    tags: ["revenue", "subscriptions", "payments"],
    lastUpdated: "2025-01-05",
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get a module by ID
 */
export function getModule(id: string): Module | undefined {
  return moduleRegistry.find((m) => m.id === id);
}

/**
 * Get all modules in a category
 */
export function getModulesByCategory(category: ModuleCategory): Module[] {
  return moduleRegistry.filter((m) => m.category === category);
}

/**
 * Get required (P0) modules
 */
export function getRequiredModules(): Module[] {
  return moduleRegistry.filter((m) => m.priority === "P0");
}

/**
 * Get foundation modules (always required)
 */
export function getFoundationModules(): Module[] {
  return moduleRegistry.filter((m) => m.category === "foundation");
}

/**
 * Resolve all dependencies for a module
 */
export function resolveDependencies(moduleId: string): string[] {
  const module = getModule(moduleId);
  if (!module) return [];

  const deps: string[] = [];
  const visited = new Set<string>();

  function resolve(id: string) {
    if (visited.has(id)) return;
    visited.add(id);

    const mod = getModule(id);
    if (!mod) return;

    for (const dep of mod.dependencies) {
      if (dep.required) {
        resolve(dep.moduleId);
        if (!deps.includes(dep.moduleId)) {
          deps.push(dep.moduleId);
        }
      }
    }
  }

  resolve(moduleId);
  return deps;
}

/**
 * Check if a platform composition is valid
 */
export function validatePlatform(moduleIds: string[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check all foundation modules are included
  const foundationModules = getFoundationModules();
  for (const fm of foundationModules) {
    if (!moduleIds.includes(fm.id)) {
      errors.push(`Missing required foundation module: ${fm.id}`);
    }
  }

  // Check all dependencies are satisfied
  for (const id of moduleIds) {
    const deps = resolveDependencies(id);
    for (const dep of deps) {
      if (!moduleIds.includes(dep)) {
        errors.push(`Module ${id} requires ${dep}`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generate a minimal platform configuration
 */
export function getMinimalPlatform(): string[] {
  return getFoundationModules().map((m) => m.id);
}

/**
 * Generate a full platform configuration
 */
export function getFullPlatform(): string[] {
  return moduleRegistry.map((m) => m.id);
}

/**
 * Get modules with a specific integration
 */
export function getModulesWithIntegration(
  integration: keyof ModuleIntegration
): Module[] {
  return moduleRegistry.filter((m) => m.integrations[integration]);
}

/**
 * Get modules by tag
 */
export function getModulesByTag(tag: string): Module[] {
  return moduleRegistry.filter((m) => m.tags.includes(tag));
}

// ============================================================================
// Export Types and Registry
// ============================================================================

export default moduleRegistry;
