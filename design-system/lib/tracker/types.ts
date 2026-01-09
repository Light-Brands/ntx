/**
 * VIBEUP Development Tracker - Type Definitions
 * Comprehensive types for atomic-level development tracking
 */

// =============================================================================
// Status Enums
// =============================================================================

export type EpicStatus = 'not-started' | 'in-progress' | 'blocked' | 'complete';
export type TaskStatus = 'pending' | 'in-progress' | 'complete' | 'blocked' | 'skipped';
export type AgentType = 'cursor' | 'claude-cli' | 'swarm-agent';
export type CoverageGateStatus = 'passing' | 'failing' | 'not-configured' | 'not-checked';
export type VelocityTrend = 'accelerating' | 'stable' | 'decelerating';
export type CheckpointReason = 
  | 'manual-save' 
  | 'interrupt' 
  | 'session-end' 
  | 'milestone' 
  | 'task-complete' 
  | 'error-recovery'
  | 'swarm-start'
  | 'swarm-complete';

export type TaskType = 
  | 'table-schema'
  | 'table-rls'
  | 'table-migration'
  | 'endpoint-implementation'
  | 'endpoint-tests'
  | 'service-implementation'
  | 'service-tests'
  | 'component-implementation'
  | 'component-tests'
  | 'config'
  | 'documentation';

// =============================================================================
// Atomic Task Types
// =============================================================================

export interface AtomicTask {
  status: TaskStatus;
  assignedTo?: AgentType;
  pr?: number;
  prUrl?: string;
  tests?: number;
  coverage?: number;
  startedAt?: string;
  completedAt?: string;
  duration?: string;
  notes?: string;
}

export interface TableTask {
  schema?: AtomicTask;
  rls_policies?: AtomicTask;
  indexes?: AtomicTask;
  migrations?: AtomicTask;
  seed_data?: AtomicTask;
}

export interface EndpointTask {
  implementation?: AtomicTask;
  validation?: AtomicTask;
  tests_unit?: AtomicTask & { count?: number };
  tests_integration?: AtomicTask & { count?: number };
  documentation?: AtomicTask;
}

export interface ServiceTask {
  implementation?: AtomicTask;
  unit_tests?: AtomicTask & { count?: number; coverage?: number };
}

export interface ComponentTask {
  implementation?: AtomicTask;
  styling?: AtomicTask;
  accessibility?: AtomicTask;
  tests?: AtomicTask & { count?: number };
  storybook?: AtomicTask;
}

// =============================================================================
// Feature Types
// =============================================================================

export interface Feature {
  status: EpicStatus;
  percentage: number;
  startedAt?: string;
  completedAt?: string;
  description?: string;
  
  // Atomic task collections
  tables?: Record<string, TableTask>;
  endpoints?: Record<string, EndpointTask>;
  services?: Record<string, ServiceTask>;
  components?: Record<string, ComponentTask>;
  tests?: Record<string, AtomicTask>;
  configs?: Record<string, AtomicTask>;
}

// =============================================================================
// Epic Types
// =============================================================================

export interface EpicMetrics {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks?: number;
  blockedTasks?: number;
  percentage: number;
  testCoverage?: number;
  testsWritten?: number;
  testsPassing?: number;
}

export interface EpicToolingValidation {
  lastCheck: string;
  rulesLoaded: string[];
  rulesApplied: boolean;
  coverageGatePassing: boolean;
  tddEnforced: boolean;
}

export interface EpicDependencies {
  blockedBy: string[];
  blocks: string[];
}

export interface Epic {
  epicId: string;
  epicName: string;
  specFile: string;
  status: EpicStatus;
  startedAt?: string;
  completedAt?: string;
  metrics: EpicMetrics;
  features: Record<string, Feature>;
  toolingValidation?: EpicToolingValidation;
  dependencies: EpicDependencies;
}

// =============================================================================
// Progress Types
// =============================================================================

export interface VelocityMetrics {
  tasksCompletedToday: number;
  tasksCompletedThisWeek: number;
  averageTaskDuration: string;
  estimatedCompletionDate?: string;
  trend: VelocityTrend;
}

export interface PlatformMetrics {
  name: 'VIBEUP';
  totalEpics: number;
  completedEpics: number;
  inProgressEpics: number;
  blockedEpics?: number;
  overallPercentage: number;
  velocity?: VelocityMetrics;
}

export interface EpicRollup {
  status: EpicStatus;
  percentage: number;
  blockers: string[];
  currentFocus?: string;
  startedAt?: string;
  completedAt?: string;
}

export interface ToolingHealth {
  lastValidated: string;
  rulesLoaded: number;
  rulesApplied: number;
  agentsAvailable: number;
  coverageGate: CoverageGateStatus;
  issues?: Array<{
    rule: string;
    issue: string;
    severity: 'warning' | 'error';
  }>;
}

export interface ActiveCursorWork {
  currentEpic: string;
  currentFeature: string;
  currentTask: string;
  startedAt: string;
}

export interface ActiveSwarmWork {
  executionId: string;
  tasksRunning: number;
  tasksQueued: number;
  agents?: Array<{
    id: string;
    status: 'idle' | 'busy' | 'offline';
    currentTask?: string;
  }>;
}

export interface ActiveWork {
  cursor?: ActiveCursorWork;
  swarm?: ActiveSwarmWork;
}

export interface Progress {
  version: string;
  lastUpdated: string;
  lastCheckpoint?: string;
  platform: PlatformMetrics;
  epics: Record<string, EpicRollup>;
  tooling: ToolingHealth;
  activeWork: ActiveWork;
}

// =============================================================================
// Tooling Types
// =============================================================================

export interface RuleStatus {
  name: string;
  path: string;
  alwaysApply?: boolean;
  description?: string;
  loadedInSession?: boolean;
  appliedCorrectly?: boolean;
  lastLoaded?: string;
  loadCount?: number;
}

export interface CommandStatus {
  name: string;
  path: string;
  description?: string;
  lastUsed?: string;
  usageCount?: number;
  cursorSymlink?: string;
}

export interface AgentStatus {
  name: string;
  path: string;
  description?: string;
  status: 'available' | 'busy' | 'unavailable';
  model?: string;
  tools?: string[];
  lastInvoked?: string;
  invocationCount?: number;
}

export interface ValidationIssue {
  rule: string;
  issue: string;
  severity: 'info' | 'warning' | 'error';
  resolved?: boolean;
  resolvedAt?: string;
  resolution?: string;
}

export interface AiCodingConfigStatus {
  installed: boolean;
  version?: string;
  architecture: 'v1-cursor-first' | 'v2-cross-tool';
  lastUpdated?: string;
  repoPath?: string;
  issues?: string[];
}

export interface RulesConfig {
  totalAvailable: number;
  discoveredAt: string;
  rulesDirectory?: string;
  cursorSymlinkValid?: boolean;
  categories: Record<string, RuleStatus[]>;
}

export interface CommandsConfig {
  directory?: string;
  cursorSymlinkValid?: boolean;
  available: CommandStatus[];
}

export interface AgentsConfig {
  directory?: string;
  available: AgentStatus[];
}

export interface GitHooksConfig {
  huskyInstalled: boolean;
  preCommitConfigured: boolean;
  prePushConfigured: boolean;
  hooksWorking: boolean;
  lastVerified?: string;
}

export interface CoverageConfig {
  toolConfigured: boolean;
  configPath?: string;
  thresholds?: {
    statements?: number;
    branches?: number;
    functions?: number;
    lines?: number;
  };
}

export interface ValidationHistoryEntry {
  timestamp: string;
  rulesLoaded: number;
  rulesApplied: number;
  issues: ValidationIssue[];
}

export interface Tooling {
  version: string;
  lastValidated: string;
  aiCodingConfig: AiCodingConfigStatus;
  rules: RulesConfig;
  commands: CommandsConfig;
  agents: AgentsConfig;
  skills?: {
    directory?: string;
    available: Array<{
      name: string;
      path: string;
      description?: string;
      recommended?: boolean;
    }>;
  };
  plugins?: {
    directory?: string;
    installed: Array<{
      name: string;
      path: string;
      hasAgents?: boolean;
      hasCommands?: boolean;
      hasRules?: boolean;
    }>;
  };
  gitHooks?: GitHooksConfig;
  coverage?: CoverageConfig;
  validationHistory?: ValidationHistoryEntry[];
}

// =============================================================================
// Checkpoint Types
// =============================================================================

export interface CheckpointActiveWork {
  epic: string;
  feature: string;
  task: string;
  taskType: TaskType;
  assignedTo?: AgentType;
  taskProgress?: number;
}

export interface CheckpointTestStatus {
  total: number;
  passing: number;
  failing: number;
  skipped?: number;
  summary?: string;
}

export interface CheckpointContext {
  specSections: string[];
  rulesLoaded: string[];
  filesModified: string[];
  filesCreated?: string[];
  testsWritten: string[];
  testStatus?: CheckpointTestStatus;
  dependencies?: Array<{
    name: string;
    version: string;
    installed: boolean;
  }>;
  environmentVariables?: string[];
}

export interface CheckpointGitState {
  branch: string;
  worktree?: string;
  isWorktree?: boolean;
  mainRepoPath?: string;
  uncommittedChanges: boolean;
  uncommittedFiles?: string[];
  lastCommit: string;
  lastCommitMessage?: string;
  stashCreated?: boolean;
  stashRef?: string;
}

export interface CheckpointTimeTracking {
  sessionStartedAt?: string;
  onTaskDuration: string;
  onFeatureDuration?: string;
  onEpicDuration?: string;
  totalSessionDuration?: string;
}

export interface CheckpointSwarmContext {
  executionId: string;
  manifestPath: string;
  tasksCompleted: string[];
  tasksInProgress: string[];
  tasksQueued: string[];
  agentAssignments?: Record<string, string>;
}

export interface CheckpointBlocker {
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  waitingFor?: string;
}

export interface Checkpoint {
  checkpointId: string;
  createdAt: string;
  reason: CheckpointReason;
  activeWork: CheckpointActiveWork;
  context: CheckpointContext;
  git: CheckpointGitState;
  timeTracking?: CheckpointTimeTracking;
  swarmContext?: CheckpointSwarmContext;
  resumeNotes?: string;
  nextSteps?: string[];
  blockers?: CheckpointBlocker[];
}

// =============================================================================
// Coverage Gates Types
// =============================================================================

export interface CoverageGate {
  threshold: number;
  enforced: boolean;
  currentCoverage?: number;
  status?: CoverageGateStatus;
  lastChecked?: string;
  trend?: 'increasing' | 'stable' | 'decreasing';
  history?: Array<{
    timestamp: string;
    coverage: number;
  }>;
}

export interface CriticalPathGate extends CoverageGate {
  paths: string[];
}

export interface TddWorkflowConfig {
  requireTestsFirst: boolean;
  redGreenRefactorTracking: boolean;
  minimumTestsPerEndpoint: number;
  minimumTestsPerService: number;
  minimumTestsPerComponent: number;
}

export interface CoverageReportingConfig {
  reportOnComplete: boolean;
  reportFormat: 'json' | 'html' | 'text' | 'lcov';
  reportDirectory?: string;
  trendTracking: boolean;
  alertOnDecrease: boolean;
  decreaseThreshold?: number;
}

export interface CoverageGates {
  version: string;
  enforced: boolean;
  lastCheck?: string;
  overallStatus?: CoverageGateStatus;
  gates: {
    'service-layer': CoverageGate;
    'api-routes': CoverageGate;
    'components': CoverageGate;
    'e2e-critical-paths'?: CriticalPathGate;
    'integration-tests'?: CoverageGate;
    'utils-helpers'?: CoverageGate;
  };
  epicOverrides?: Record<string, {
    gates: Record<string, Partial<CoverageGate>>;
    reason: string;
  }>;
  featureOverrides?: Record<string, {
    gates: Record<string, Partial<CoverageGate>>;
    reason: string;
  }>;
  exemptions?: Array<{
    pattern: string;
    reason: string;
    approvedBy?: string;
    approvedAt?: string;
  }>;
  tddWorkflow?: TddWorkflowConfig;
  reporting?: CoverageReportingConfig;
}

// =============================================================================
// Epic ID Constants
// =============================================================================

export const EPIC_IDS = [
  'epic-00',
  'epic-01',
  'epic-1a',
  'epic-1b',
  'epic-02',
  'epic-03',
  'epic-04',
  'epic-05',
  'epic-06',
  'epic-07',
  'epic-08',
] as const;

export type EpicId = typeof EPIC_IDS[number];

export const EPIC_NAMES: Record<EpicId, string> = {
  'epic-00': 'Foundation',
  'epic-01': 'Mira',
  'epic-1a': 'Crypto',
  'epic-1b': 'Karma',
  'epic-02': 'Humans',
  'epic-03': 'Practices',
  'epic-04': 'Discovery',
  'epic-05': 'Impact',
  'epic-06': 'Business',
  'epic-07': 'Community',
  'epic-08': 'Monetization',
};

export const EPIC_SPEC_FILES: Record<EpicId, string> = {
  'epic-00': 'vibeup-design-spec/epics/epic-00-foundation.md',
  'epic-01': 'vibeup-design-spec/epics/epic-01-mira.md',
  'epic-1a': 'vibeup-design-spec/epics/epic-1a-crypto.md',
  'epic-1b': 'vibeup-design-spec/epics/epic-1b-karma.md',
  'epic-02': 'vibeup-design-spec/epics/epic-02-humans.md',
  'epic-03': 'vibeup-design-spec/epics/epic-03-practices.md',
  'epic-04': 'vibeup-design-spec/epics/epic-04-discovery.md',
  'epic-05': 'vibeup-design-spec/epics/epic-05-impact.md',
  'epic-06': 'vibeup-design-spec/epics/epic-06-business.md',
  'epic-07': 'vibeup-design-spec/epics/epic-07-community.md',
  'epic-08': 'vibeup-design-spec/epics/epic-08-monetization.md',
};

// Epic dependency graph
export const EPIC_DEPENDENCIES: Record<EpicId, EpicId[]> = {
  'epic-00': [],
  'epic-01': ['epic-00'],
  'epic-1a': ['epic-00'],
  'epic-1b': ['epic-00'],
  'epic-02': ['epic-00', 'epic-01'],
  'epic-03': ['epic-00', 'epic-01'],
  'epic-04': ['epic-00', 'epic-01', 'epic-02'],
  'epic-05': ['epic-00', 'epic-01'],
  'epic-06': ['epic-00', 'epic-01', 'epic-02'],
  'epic-07': ['epic-00', 'epic-01', 'epic-03', 'epic-04', 'epic-06'],
  'epic-08': ['epic-00', 'epic-06', 'epic-07'],
};

