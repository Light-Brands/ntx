/**
 * VIBEUP Development Tracker
 * Comprehensive development tracking system with atomic-level granularity
 * 
 * @module lib/tracker
 */

// =============================================================================
// Types
// =============================================================================

export * from './types';

// =============================================================================
// State Management
// =============================================================================

export {
  // Directory management
  ensureTrackerDirectories,
  getTrackerPaths,
  
  // YAML read/write
  readYamlFile,
  writeYamlFile,
  
  // Progress state
  readProgress,
  writeProgress,
  updateProgressTimestamp,
  
  // Epic state
  getEpicFilePath,
  readEpic,
  writeEpic,
  readAllEpics,
  
  // Tooling state
  readTooling,
  writeTooling,
  
  // Coverage gates state
  readCoverageGates,
  writeCoverageGates,
  
  // Checkpoint state
  generateCheckpointId,
  getCheckpointFilePath,
  readCheckpoint,
  readLatestCheckpoint,
  writeCheckpoint,
  listCheckpoints,
  
  // Manifest management
  getManifestFilePath,
  listManifests,
  
  // Transactions
  commitTransaction,
  
  // Status checks
  isTrackerInitialized,
  getTrackerStats,
} from './state';

// =============================================================================
// Rollup Calculations
// =============================================================================

export {
  // Feature level
  calculateFeatureCounts,
  calculateFeaturePercentage,
  determineFeatureStatus,
  updateFeatureRollup,
  
  // Epic level
  calculateEpicCounts,
  calculateEpicPercentage,
  determineEpicStatus,
  updateEpicMetrics,
  updateEpicRollup,
  
  // Platform level
  calculatePlatformMetrics,
  generateEpicRollups,
  
  // Full rollup
  performFullRollup,
  
  // Incremental updates
  updateTaskStatus,
} from './rollup';

// =============================================================================
// Epic Spec Parser
// =============================================================================

export {
  parseEpicSpec,
  parseAllEpicSpecs,
  convertParsedEpicToState,
  calculateBlocksRelationships,
  getEpicParseSummary,
  getAllEpicsParseSummary,
  type ParseSummary,
} from './parser';

// =============================================================================
// Tooling Validation
// =============================================================================

export {
  // Individual validators
  validateAiCodingConfig,
  validateRules,
  validateCommands,
  validateAgents,
  validateGitHooks,
  
  // Full validation
  performFullValidation,
  saveValidationResult,
  type ValidationResult,
  
  // Rule loading tracking
  markRuleLoaded,
  markRulesLoaded,
  getLoadedRules,
  getAlwaysApplyRules,
} from './validator';

// =============================================================================
// Checkpoint System
// =============================================================================

export {
  // Checkpoint creation
  createCheckpoint,
  type CreateCheckpointOptions,
  
  // Checkpoint restoration
  restoreCheckpoint,
  type RestoreResult,
  
  // Checkpoint queries
  getCheckpointInfo,
  listCheckpointInfos,
  getLatestCheckpointInfo,
  type CheckpointInfo,
  
  // Auto-checkpoints
  createSessionEndCheckpoint,
  createInterruptCheckpoint,
  createMilestoneCheckpoint,
} from './checkpoint';

// =============================================================================
// Manifest Generation
// =============================================================================

export {
  // Manifest generation
  generateManifest,
  saveManifest,
  generateAndSaveManifest,
  type GenerateManifestOptions,
  
  // Batch utilities
  groupTasksIntoBatches,
  generateBatchedManifests,
} from './manifest';

// =============================================================================
// Initialization
// =============================================================================

export {
  initializeTracker,
  syncTrackerWithSpecs,
  getTrackerStatus,
  type InitOptions,
  type InitResult,
  type TrackerStatus,
} from './init';

