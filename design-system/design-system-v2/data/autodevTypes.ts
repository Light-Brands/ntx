// AUTODEV Types - Autonomous Development Intelligence System
// =============================================================

// ============ COMMON TYPES ============

export type AlertLevel = 'info' | 'advisory' | 'warning' | 'critical';
export type SystemStatus = 'nominal' | 'advisory' | 'warning' | 'critical';
export type Trend = 'up' | 'down' | 'stable';
export type EffortLevel = 'low' | 'medium' | 'high';
export type RiskLevel = 'low' | 'medium' | 'high';

// ============ SENTINEL TYPES (Real-Time Health Monitor) ============

export interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  threshold: {
    warning: number;
    critical: number;
  };
  trend: Trend;
  timestamp: string;
}

export interface SentinelMetrics {
  // Performance
  pageLoadTime: number;
  apiLatency: Record<string, number>;
  renderCycles: number;
  memoryUsage: number;

  // Reliability
  errorRate: number;
  errorsByType: Record<string, number>;
  uptime: number;

  // Usage
  activeUsers: number;
  featureUsage: Record<string, number>;
  navigationPatterns: string[];

  // Health Score (0-100)
  overallHealth: number;
  healthTrend: 'improving' | 'stable' | 'degrading';
}

export interface SystemHealth {
  overall: number; // 0-100
  status: SystemStatus;
  metrics: HealthMetric[];
  lastUpdated: string;
}

export interface Alert {
  id: string;
  level: AlertLevel;
  title: string;
  message: string;
  source: 'sentinel' | 'pulse' | 'cortex' | 'genesis';
  timestamp: string;
  acknowledged: boolean;
  resolvedAt?: string;
  resolution?: string;
}

export interface AlertFilter {
  level?: AlertLevel[];
  source?: Alert['source'][];
  acknowledged?: boolean;
  startDate?: string;
  endDate?: string;
}

// ============ PULSE TYPES (Periodic Analysis Engine) ============

export type PulseCycleType = 'heartbeat' | 'daily' | 'weekly' | 'monthly' | 'quarterly';

export interface PulseCycle {
  type: PulseCycleType;
  lastRun: string;
  nextRun: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  duration?: number;
  findings: number;
}

export interface Digest {
  id: string;
  type: PulseCycleType;
  period: {
    start: string;
    end: string;
  };
  summary: string;
  metrics: Record<string, number>;
  highlights: string[];
  concerns: string[];
  recommendations: string[];
  createdAt: string;
}

export interface DailyDigest {
  date: string;
  summary: string;

  performance: {
    avgResponseTime: number;
    peakUsageTime: string;
    slowestEndpoints: string[];
  };

  reliability: {
    errorsLogged: number;
    errorTrend: Trend;
    resolvedAutomatically: number;
  };

  usage: {
    uniqueUsers: number;
    topFeatures: string[];
    abandonedFlows: string[];
  };

  recommendations: Recommendation[];
  actionsAutoTaken: HealingAction[];
}

// ============ CORTEX TYPES (AI Intelligence Core) ============

export type PatternType = 'performance' | 'usage' | 'error' | 'success';
export type RecommendationType = 'performance' | 'reliability' | 'security' | 'ux' | 'architecture';
export type RecommendationSeverity = 'suggestion' | 'recommended' | 'important' | 'critical';
export type RecommendationStatus = 'pending' | 'approved' | 'rejected' | 'implemented' | 'deferred';

export interface Pattern {
  id: string;
  type: PatternType;
  description: string;
  frequency: number;
  confidence: number; // 0-1
  firstSeen: string;
  lastSeen: string;
  relatedEntities: string[];
}

export interface Prediction {
  id: string;
  type: string;
  description: string;
  probability: number; // 0-1
  timeframe: string;
  impact: 'low' | 'medium' | 'high';
  preventiveActions: string[];
}

export interface ProposedAction {
  id: string;
  description: string;
  type: 'code' | 'config' | 'infra' | 'manual';
  automated: boolean;
  preview?: string; // Code diff or config change preview
}

export interface Recommendation {
  id: string;
  type: RecommendationType;
  severity: RecommendationSeverity;
  title: string;
  description: string;
  reasoning: string;
  impact: {
    area: string;
    improvement: string;
    effort: EffortLevel;
    risk: RiskLevel;
  };
  proposedActions: ProposedAction[];
  status: RecommendationStatus;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  implementedAt?: string;
  outcome?: string;
}

export interface LearningStats {
  totalRecommendations: number;
  accepted: number;
  rejected: number;
  implemented: number;
  successRate: number; // Of implemented recommendations
  avgTimeToDecision: number; // milliseconds
  topAcceptedTypes: RecommendationType[];
  topRejectedTypes: RecommendationType[];
}

// ============ GENESIS TYPES (Self-Healing Module) ============

export type HealingLevel = 0 | 1 | 2 | 3;
export type HealingActionStatus = 'pending' | 'executing' | 'completed' | 'failed' | 'rolled-back';
export type PRStatus = 'draft' | 'open' | 'merged' | 'closed';

export interface HealingCapability {
  trigger: string;
  condition: string;
  action: string;
  level: HealingLevel;
  rollback?: string;
  prTemplate?: string;
}

export interface HealingRule {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  level: HealingLevel;
  enabled: boolean;
  cooldown: number; // seconds
  lastTriggered?: string;
  successRate: number; // 0-1
  executionCount: number;
}

export interface GenesisActionTracking {
  prNumber?: number;
  issueNumber?: number;
  branch: string;
  commitSha?: string;
  prStatus: PRStatus;
  approvedBy?: string[];
  mergedAt?: string;
}

export interface GenesisActionAudit {
  triggeredBy: string;
  reasoning: string;
  filesChanged: string[];
  diffPreview: string;
  testResults?: string;
  rollbackBranch?: string;
}

export interface GenesisAction {
  id: string;
  level: HealingLevel;
  tracking: GenesisActionTracking;
  audit: GenesisActionAudit;
}

export interface HealingAction {
  id: string;
  ruleId: string;
  trigger: string;
  action: string;
  status: HealingActionStatus;
  startedAt: string;
  completedAt?: string;
  result?: string;
  rollbackAvailable: boolean;
  genesisAction?: GenesisAction;
}

export interface AutonomyConfig {
  dialPosition: number; // 0-100
  description: string;
  l0Behavior: 'manual' | 'auto';
  l1Behavior: 'manual' | 'auto';
  l2Behavior: 'manual' | 'auto';
  l3Behavior: 'manual' | 'auto';
}

// ============ NEXUS TYPES (Central Command Hub) ============

export interface AutodevConfig {
  sentinel: {
    enabled: boolean;
    pollingInterval: number; // seconds
    alertThresholds: Record<string, { warning: number; critical: number }>;
  };
  pulse: {
    enabled: boolean;
    schedules: Record<PulseCycleType, string>; // cron expressions
  };
  cortex: {
    enabled: boolean;
    autoRecommend: boolean;
    confidenceThreshold: number; // 0-1
  };
  genesis: {
    enabled: boolean;
    autonomyDial: number; // 0-100
    maxAutoLevel: HealingLevel;
    requireApprovalFor: string[];
  };
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  actor: 'system' | 'user' | 'autodev';
  action: string;
  target: string;
  details: string;
  outcome: 'success' | 'failure';
  revertible: boolean;
}

// ============ PRISM TYPES (Multi-Spec Support Layer) ============

export interface MetricDefinition {
  name: string;
  type: 'counter' | 'gauge' | 'histogram';
  description: string;
  unit: string;
}

export interface SpecDefinition {
  id: string;
  name: string;
  version: string;

  repo: {
    url: string;
    branch: string;
    specPath: string;
  };

  telemetry: {
    enabled: boolean;
    endpoints: string[];
    components: string[];
    customMetrics: MetricDefinition[];
  };

  healingRules: HealingCapability[];

  integration: {
    aiCodingConfig: boolean;
    prLabels: string[];
    reviewers: string[];
    codeowners: boolean;
  };
}

export interface SpecRegistry {
  activeSpecs: SpecDefinition[];
  defaultSpec: string;
}

// ============ TELEMETRY TYPES ============

export interface TelemetryEvent {
  id: string;
  type: 'pageLoad' | 'apiCall' | 'render' | 'error' | 'warning' | 'navigation' | 'interaction' | 'feature' | 'metric';
  timestamp: string;
  data: Record<string, unknown>;
  sessionId: string;
}

export interface ErrorContext {
  component?: string;
  page?: string;
  userId?: string;
  sessionId: string;
  stack: string;
  timestamp: string;
}

export interface WarningContext {
  component?: string;
  page?: string;
  sessionId: string;
  timestamp: string;
}

export interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  fcp: number; // First Contentful Paint
}

// ============ UI STATE TYPES ============

export type AutodevTab = 'command' | 'sentinel' | 'pulse' | 'cortex' | 'genesis' | 'nexus';

export interface AutodevUIState {
  activeTab: AutodevTab;
  selectedAlertId?: string;
  selectedRecommendationId?: string;
  selectedDigestId?: string;
  selectedHealingRuleId?: string;
  isConfiguring: boolean;
  searchQuery: string;
  filters: {
    alertLevel?: AlertLevel[];
    recommendationStatus?: RecommendationStatus[];
    healingLevel?: HealingLevel[];
  };
}

// ============ CONTEXT STATE TYPE ============

export interface AutodevState {
  // System Health
  health: SystemHealth;
  alerts: Alert[];

  // Pulse
  pulseCycles: PulseCycle[];
  digests: Digest[];

  // Cortex
  patterns: Pattern[];
  predictions: Prediction[];
  recommendations: Recommendation[];
  learningStats: LearningStats;

  // Genesis
  healingRules: HealingRule[];
  healingHistory: HealingAction[];
  autonomyConfig: AutonomyConfig;

  // Nexus
  config: AutodevConfig;
  auditLog: AuditEntry[];

  // Prism
  specRegistry: SpecRegistry;
  activeSpecId: string;

  // UI
  ui: AutodevUIState;

  // Meta
  lastUpdated: string;
  isLoading: boolean;
  error?: string;
}

// ============ ACTION TYPES ============

export type AutodevAction =
  | { type: 'SET_HEALTH'; payload: SystemHealth }
  | { type: 'ADD_ALERT'; payload: Alert }
  | { type: 'ACKNOWLEDGE_ALERT'; payload: string }
  | { type: 'RESOLVE_ALERT'; payload: { id: string; resolution: string } }
  | { type: 'SET_PULSE_CYCLES'; payload: PulseCycle[] }
  | { type: 'ADD_DIGEST'; payload: Digest }
  | { type: 'SET_PATTERNS'; payload: Pattern[] }
  | { type: 'SET_PREDICTIONS'; payload: Prediction[] }
  | { type: 'ADD_RECOMMENDATION'; payload: Recommendation }
  | { type: 'UPDATE_RECOMMENDATION'; payload: { id: string; update: Partial<Recommendation> } }
  | { type: 'SET_HEALING_RULES'; payload: HealingRule[] }
  | { type: 'UPDATE_HEALING_RULE'; payload: { id: string; update: Partial<HealingRule> } }
  | { type: 'ADD_HEALING_ACTION'; payload: HealingAction }
  | { type: 'UPDATE_HEALING_ACTION'; payload: { id: string; update: Partial<HealingAction> } }
  | { type: 'SET_AUTONOMY_DIAL'; payload: number }
  | { type: 'SET_CONFIG'; payload: Partial<AutodevConfig> }
  | { type: 'ADD_AUDIT_ENTRY'; payload: AuditEntry }
  | { type: 'SET_ACTIVE_SPEC'; payload: string }
  | { type: 'REGISTER_SPEC'; payload: SpecDefinition }
  | { type: 'SET_UI_STATE'; payload: Partial<AutodevUIState> }
  | { type: 'SET_ACTIVE_TAB'; payload: AutodevTab }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | undefined }
  | { type: 'REFRESH_ALL' };
