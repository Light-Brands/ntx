/**
 * VIBEUP Development Tracker - Initialization
 * Initialize tracker state from epic specifications
 */

import * as path from 'path';
import type { Epic, Progress, Tooling, CoverageGates } from './types';
import { EPIC_IDS, EPIC_NAMES, EPIC_SPEC_FILES, EPIC_DEPENDENCIES, type EpicId } from './types';
import {
  ensureTrackerDirectories,
  writeProgress,
  writeEpic,
  writeTooling,
  writeCoverageGates,
  isTrackerInitialized,
  getTrackerPaths,
  readYamlFile,
} from './state';
import {
  parseEpicSpec,
  parseAllEpicSpecs,
  convertParsedEpicToState,
  calculateBlocksRelationships,
  getEpicParseSummary,
  getAllEpicsParseSummary,
  type ParseSummary,
} from './parser';
import { performFullValidation, saveValidationResult } from './validator';
import { performFullRollup } from './rollup';

// =============================================================================
// Types
// =============================================================================

export interface InitOptions {
  basePath: string;
  force?: boolean;
  skipValidation?: boolean;
  verbose?: boolean;
}

export interface InitResult {
  success: boolean;
  epicsInitialized: number;
  totalTasks: number;
  parseSummaries: ParseSummary[];
  toolingValidation?: {
    rulesCount: number;
    commandsCount: number;
    agentsCount: number;
    issues: string[];
  };
  errors: string[];
  warnings: string[];
}

// =============================================================================
// Default State Templates
// =============================================================================

function createDefaultProgress(): Progress {
  const epics: Record<string, any> = {};
  
  for (const epicId of EPIC_IDS) {
    const deps = EPIC_DEPENDENCIES[epicId];
    epics[epicId] = {
      status: deps.length === 0 ? 'not-started' : 'blocked',
      percentage: 0,
      blockers: deps,
      currentFocus: null,
    };
  }
  
  return {
    version: '1.0',
    lastUpdated: new Date().toISOString(),
    lastCheckpoint: undefined,
    platform: {
      name: 'VIBEUP',
      totalEpics: EPIC_IDS.length,
      completedEpics: 0,
      inProgressEpics: 0,
      blockedEpics: EPIC_IDS.length - 1, // All except epic-00 are blocked
      overallPercentage: 0,
      velocity: {
        tasksCompletedToday: 0,
        tasksCompletedThisWeek: 0,
        averageTaskDuration: '0m',
        trend: 'stable',
      },
    },
    epics,
    tooling: {
      lastValidated: new Date().toISOString(),
      rulesLoaded: 0,
      rulesApplied: 0,
      agentsAvailable: 0,
      coverageGate: 'not-configured',
    },
    activeWork: {},
  };
}

function createDefaultTooling(): Tooling {
  return {
    version: '1.0',
    lastValidated: new Date().toISOString(),
    aiCodingConfig: {
      installed: false,
      architecture: 'v2-cross-tool',
    },
    rules: {
      totalAvailable: 0,
      discoveredAt: new Date().toISOString(),
      categories: {},
    },
    commands: {
      available: [],
    },
    agents: {
      available: [],
    },
    validationHistory: [],
  };
}

function createDefaultCoverageGates(): CoverageGates {
  return {
    version: '1.0',
    enforced: true,
    overallStatus: 'not-checked',
    gates: {
      'service-layer': {
        threshold: 90,
        enforced: true,
        status: 'not-checked',
      },
      'api-routes': {
        threshold: 85,
        enforced: true,
        status: 'not-checked',
      },
      'components': {
        threshold: 75,
        enforced: true,
        status: 'not-checked',
      },
      'e2e-critical-paths': {
        threshold: 100,
        enforced: true,
        status: 'not-checked',
        paths: [
          'signup flow',
          'practice logging',
          'connection request',
          'payment flow',
          'profile creation',
        ],
      },
    },
    tddWorkflow: {
      requireTestsFirst: true,
      redGreenRefactorTracking: true,
      minimumTestsPerEndpoint: 3,
      minimumTestsPerService: 5,
      minimumTestsPerComponent: 2,
    },
    reporting: {
      reportOnComplete: true,
      reportFormat: 'json',
      reportDirectory: '.tracker/coverage-reports/',
      trendTracking: true,
      alertOnDecrease: true,
      decreaseThreshold: 2,
    },
  };
}

// =============================================================================
// Initialization Functions
// =============================================================================

export function initializeTracker(options: InitOptions): InitResult {
  const result: InitResult = {
    success: false,
    epicsInitialized: 0,
    totalTasks: 0,
    parseSummaries: [],
    errors: [],
    warnings: [],
  };
  
  const { basePath, force, skipValidation, verbose } = options;
  
  // Check if already initialized
  if (isTrackerInitialized(basePath) && !force) {
    result.warnings.push('Tracker already initialized. Use force=true to reinitialize.');
    result.success = true;
    return result;
  }
  
  if (verbose) {
    console.log('🚀 Initializing VIBEUP Development Tracker...');
  }
  
  // Ensure directories exist
  ensureTrackerDirectories(basePath);
  
  // Parse all epic specs
  if (verbose) {
    console.log('📖 Parsing epic specifications...');
  }
  
  const parsedEpics = parseAllEpicSpecs(basePath);
  
  if (parsedEpics.size === 0) {
    result.errors.push('No epic specifications found. Ensure vibeup-design-spec/epics/*.md exist.');
    return result;
  }
  
  // Convert parsed epics to state
  const epics = new Map<string, Epic>();
  
  for (const [epicId, parsed] of parsedEpics) {
    try {
      const epic = convertParsedEpicToState(parsed);
      epics.set(epicId, epic);
      
      const summary = getEpicParseSummary(parsed);
      result.parseSummaries.push(summary);
      result.totalTasks += summary.totalTasks;
      
      if (verbose) {
        console.log(`  ✓ ${epicId}: ${summary.featuresCount} features, ${summary.totalTasks} tasks`);
      }
    } catch (error) {
      result.warnings.push(`Failed to parse ${epicId}: ${error}`);
    }
  }
  
  // Calculate reverse dependencies (blocks)
  calculateBlocksRelationships(epics);
  
  // Save all epics
  for (const epic of epics.values()) {
    writeEpic(basePath, epic);
    result.epicsInitialized++;
  }
  
  // Create progress rollup
  if (verbose) {
    console.log('📊 Creating progress rollup...');
  }
  
  const progress = createDefaultProgress();
  
  // Update progress with actual epic data
  for (const [epicId, epic] of epics) {
    progress.epics[epicId] = {
      status: epic.status,
      percentage: epic.metrics.percentage,
      blockers: epic.dependencies.blockedBy,
      currentFocus: undefined,
    };
  }
  
  // Calculate platform totals
  progress.platform.totalEpics = epics.size;
  
  let totalTasks = 0;
  for (const epic of epics.values()) {
    totalTasks += epic.metrics.totalTasks;
  }
  
  writeProgress(basePath, progress);
  
  // Validate tooling (unless skipped)
  if (!skipValidation) {
    if (verbose) {
      console.log('🔧 Validating tooling...');
    }
    
    const validationResult = performFullValidation(basePath);
    saveValidationResult(basePath, validationResult);
    
    result.toolingValidation = {
      rulesCount: validationResult.tooling.rules.totalAvailable,
      commandsCount: validationResult.tooling.commands.available.length,
      agentsCount: validationResult.tooling.agents.available.length,
      issues: validationResult.issues.map(i => `${i.rule}: ${i.issue}`),
    };
    
    // Update progress with tooling info
    progress.tooling = {
      lastValidated: new Date().toISOString(),
      rulesLoaded: validationResult.tooling.rules.totalAvailable,
      rulesApplied: validationResult.tooling.rules.totalAvailable,
      agentsAvailable: validationResult.tooling.agents.available.length,
      coverageGate: 'not-configured',
    };
    
    writeProgress(basePath, progress);
    
    if (verbose) {
      console.log(`  ✓ Rules: ${result.toolingValidation.rulesCount}`);
      console.log(`  ✓ Commands: ${result.toolingValidation.commandsCount}`);
      console.log(`  ✓ Agents: ${result.toolingValidation.agentsCount}`);
    }
  } else {
    // Write default tooling
    writeTooling(basePath, createDefaultTooling());
  }
  
  // Write default coverage gates
  const paths = getTrackerPaths(basePath);
  const existingGates = readYamlFile<CoverageGates>(paths.coverageGates);
  if (!existingGates) {
    writeCoverageGates(basePath, createDefaultCoverageGates());
  }
  
  // Perform full rollup
  performFullRollup(basePath);
  
  result.success = true;
  
  if (verbose) {
    console.log('');
    console.log('✅ Tracker initialized successfully!');
    console.log(`   Epics: ${result.epicsInitialized}`);
    console.log(`   Total Tasks: ${result.totalTasks}`);
    console.log('');
    console.log('📋 Next steps:');
    console.log('   1. Run /track-status to see current state');
    console.log('   2. Run /track-start epic-00 <feature> to begin work');
    console.log('   3. Run /track-manifest epic-00 to generate swarm manifests');
  }
  
  return result;
}

// =============================================================================
// Re-initialization / Sync
// =============================================================================

export function syncTrackerWithSpecs(basePath: string): InitResult {
  // Re-parse specs and update tracker state
  // Preserves completed tasks, updates pending tasks
  
  const result: InitResult = {
    success: false,
    epicsInitialized: 0,
    totalTasks: 0,
    parseSummaries: [],
    errors: [],
    warnings: [],
  };
  
  console.log('🔄 Syncing tracker with specifications...');
  
  // Parse all specs
  const parsedEpics = parseAllEpicSpecs(basePath);
  
  for (const [epicId, parsed] of parsedEpics) {
    const summary = getEpicParseSummary(parsed);
    result.parseSummaries.push(summary);
    result.totalTasks += summary.totalTasks;
    result.epicsInitialized++;
  }
  
  // TODO: Implement smart merging that preserves completed task status
  // For now, just report what would be updated
  
  result.warnings.push('Sync not fully implemented - would update task lists while preserving completion status');
  result.success = true;
  
  return result;
}

// =============================================================================
// Status Check
// =============================================================================

export interface TrackerStatus {
  initialized: boolean;
  epicsCount: number;
  totalTasks: number;
  completedTasks: number;
  percentage: number;
  lastUpdated: string | null;
  toolingValid: boolean;
  rulesLoaded: number;
  commandsAvailable: number;
  agentsAvailable: number;
}

export function getTrackerStatus(basePath: string): TrackerStatus {
  const status: TrackerStatus = {
    initialized: false,
    epicsCount: 0,
    totalTasks: 0,
    completedTasks: 0,
    percentage: 0,
    lastUpdated: null,
    toolingValid: false,
    rulesLoaded: 0,
    commandsAvailable: 0,
    agentsAvailable: 0,
  };
  
  if (!isTrackerInitialized(basePath)) {
    return status;
  }
  
  status.initialized = true;
  
  const paths = getTrackerPaths(basePath);
  const progress = readYamlFile<Progress>(paths.progress);
  const tooling = readYamlFile<Tooling>(paths.tooling);
  
  if (progress) {
    status.epicsCount = progress.platform.totalEpics;
    status.percentage = progress.platform.overallPercentage;
    status.lastUpdated = progress.lastUpdated;
    
    // Count tasks from epics
    for (const epicRollup of Object.values(progress.epics)) {
      // Would need to read full epic files for task counts
    }
  }
  
  if (tooling) {
    status.toolingValid = tooling.rules.totalAvailable > 0;
    status.rulesLoaded = tooling.rules.totalAvailable;
    status.commandsAvailable = tooling.commands.available.length;
    status.agentsAvailable = tooling.agents.available.length;
  }
  
  return status;
}

