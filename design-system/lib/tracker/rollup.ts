/**
 * VIBEUP Development Tracker - Rollup Calculations
 * Calculate percentages and aggregate metrics across features and epics
 */

import type {
  Progress,
  Epic,
  EpicRollup,
  Feature,
  AtomicTask,
  TableTask,
  EndpointTask,
  ServiceTask,
  ComponentTask,
  EpicMetrics,
  PlatformMetrics,
  VelocityMetrics,
  EpicStatus,
  TaskStatus,
} from './types';
import { readAllEpics, readProgress, writeProgress, writeEpic } from './state';
import { EPIC_DEPENDENCIES, EPIC_IDS, type EpicId } from './types';

// =============================================================================
// Task Counting Utilities
// =============================================================================

interface TaskCounts {
  total: number;
  completed: number;
  inProgress: number;
  blocked: number;
  pending: number;
}

function countAtomicTask(task: AtomicTask | undefined): TaskCounts {
  if (!task) {
    return { total: 0, completed: 0, inProgress: 0, blocked: 0, pending: 0 };
  }
  
  return {
    total: 1,
    completed: task.status === 'complete' ? 1 : 0,
    inProgress: task.status === 'in-progress' ? 1 : 0,
    blocked: task.status === 'blocked' ? 1 : 0,
    pending: task.status === 'pending' ? 1 : 0,
  };
}

function countTableTask(table: TableTask | undefined): TaskCounts {
  if (!table) {
    return { total: 0, completed: 0, inProgress: 0, blocked: 0, pending: 0 };
  }
  
  const counts: TaskCounts = { total: 0, completed: 0, inProgress: 0, blocked: 0, pending: 0 };
  
  const tasks = [table.schema, table.rls_policies, table.indexes, table.migrations, table.seed_data];
  
  for (const task of tasks) {
    const c = countAtomicTask(task);
    counts.total += c.total;
    counts.completed += c.completed;
    counts.inProgress += c.inProgress;
    counts.blocked += c.blocked;
    counts.pending += c.pending;
  }
  
  return counts;
}

function countEndpointTask(endpoint: EndpointTask | undefined): TaskCounts {
  if (!endpoint) {
    return { total: 0, completed: 0, inProgress: 0, blocked: 0, pending: 0 };
  }
  
  const counts: TaskCounts = { total: 0, completed: 0, inProgress: 0, blocked: 0, pending: 0 };
  
  const tasks = [
    endpoint.implementation,
    endpoint.validation,
    endpoint.tests_unit,
    endpoint.tests_integration,
    endpoint.documentation,
  ];
  
  for (const task of tasks) {
    const c = countAtomicTask(task);
    counts.total += c.total;
    counts.completed += c.completed;
    counts.inProgress += c.inProgress;
    counts.blocked += c.blocked;
    counts.pending += c.pending;
  }
  
  return counts;
}

function countServiceTask(service: ServiceTask | undefined): TaskCounts {
  if (!service) {
    return { total: 0, completed: 0, inProgress: 0, blocked: 0, pending: 0 };
  }
  
  const counts: TaskCounts = { total: 0, completed: 0, inProgress: 0, blocked: 0, pending: 0 };
  
  const tasks = [service.implementation, service.unit_tests];
  
  for (const task of tasks) {
    const c = countAtomicTask(task);
    counts.total += c.total;
    counts.completed += c.completed;
    counts.inProgress += c.inProgress;
    counts.blocked += c.blocked;
    counts.pending += c.pending;
  }
  
  return counts;
}

function countComponentTask(component: ComponentTask | undefined): TaskCounts {
  if (!component) {
    return { total: 0, completed: 0, inProgress: 0, blocked: 0, pending: 0 };
  }
  
  const counts: TaskCounts = { total: 0, completed: 0, inProgress: 0, blocked: 0, pending: 0 };
  
  const tasks = [
    component.implementation,
    component.styling,
    component.accessibility,
    component.tests,
    component.storybook,
  ];
  
  for (const task of tasks) {
    const c = countAtomicTask(task);
    counts.total += c.total;
    counts.completed += c.completed;
    counts.inProgress += c.inProgress;
    counts.blocked += c.blocked;
    counts.pending += c.pending;
  }
  
  return counts;
}

// =============================================================================
// Feature Rollup
// =============================================================================

export function calculateFeatureCounts(feature: Feature): TaskCounts {
  const counts: TaskCounts = { total: 0, completed: 0, inProgress: 0, blocked: 0, pending: 0 };
  
  // Count tables
  if (feature.tables) {
    for (const table of Object.values(feature.tables)) {
      const c = countTableTask(table);
      counts.total += c.total;
      counts.completed += c.completed;
      counts.inProgress += c.inProgress;
      counts.blocked += c.blocked;
      counts.pending += c.pending;
    }
  }
  
  // Count endpoints
  if (feature.endpoints) {
    for (const endpoint of Object.values(feature.endpoints)) {
      const c = countEndpointTask(endpoint);
      counts.total += c.total;
      counts.completed += c.completed;
      counts.inProgress += c.inProgress;
      counts.blocked += c.blocked;
      counts.pending += c.pending;
    }
  }
  
  // Count services
  if (feature.services) {
    for (const service of Object.values(feature.services)) {
      const c = countServiceTask(service);
      counts.total += c.total;
      counts.completed += c.completed;
      counts.inProgress += c.inProgress;
      counts.blocked += c.blocked;
      counts.pending += c.pending;
    }
  }
  
  // Count components
  if (feature.components) {
    for (const component of Object.values(feature.components)) {
      const c = countComponentTask(component);
      counts.total += c.total;
      counts.completed += c.completed;
      counts.inProgress += c.inProgress;
      counts.blocked += c.blocked;
      counts.pending += c.pending;
    }
  }
  
  // Count standalone tests
  if (feature.tests) {
    for (const test of Object.values(feature.tests)) {
      const c = countAtomicTask(test);
      counts.total += c.total;
      counts.completed += c.completed;
      counts.inProgress += c.inProgress;
      counts.blocked += c.blocked;
      counts.pending += c.pending;
    }
  }
  
  // Count configs
  if (feature.configs) {
    for (const config of Object.values(feature.configs)) {
      const c = countAtomicTask(config);
      counts.total += c.total;
      counts.completed += c.completed;
      counts.inProgress += c.inProgress;
      counts.blocked += c.blocked;
      counts.pending += c.pending;
    }
  }
  
  return counts;
}

export function calculateFeaturePercentage(feature: Feature): number {
  const counts = calculateFeatureCounts(feature);
  if (counts.total === 0) return 0;
  return Math.round((counts.completed / counts.total) * 1000) / 10; // One decimal place
}

export function determineFeatureStatus(feature: Feature): EpicStatus {
  const counts = calculateFeatureCounts(feature);
  
  if (counts.total === 0) return 'not-started';
  if (counts.completed === counts.total) return 'complete';
  if (counts.blocked > 0 && counts.inProgress === 0) return 'blocked';
  if (counts.completed > 0 || counts.inProgress > 0) return 'in-progress';
  return 'not-started';
}

export function updateFeatureRollup(feature: Feature): Feature {
  feature.percentage = calculateFeaturePercentage(feature);
  feature.status = determineFeatureStatus(feature);
  
  if (feature.status === 'complete' && !feature.completedAt) {
    feature.completedAt = new Date().toISOString();
  }
  
  return feature;
}

// =============================================================================
// Epic Rollup
// =============================================================================

export function calculateEpicCounts(epic: Epic): TaskCounts {
  const counts: TaskCounts = { total: 0, completed: 0, inProgress: 0, blocked: 0, pending: 0 };
  
  for (const feature of Object.values(epic.features)) {
    const c = calculateFeatureCounts(feature);
    counts.total += c.total;
    counts.completed += c.completed;
    counts.inProgress += c.inProgress;
    counts.blocked += c.blocked;
    counts.pending += c.pending;
  }
  
  return counts;
}

export function calculateEpicPercentage(epic: Epic): number {
  const counts = calculateEpicCounts(epic);
  if (counts.total === 0) return 0;
  return Math.round((counts.completed / counts.total) * 1000) / 10;
}

export function determineEpicStatus(epic: Epic, completedEpics: Set<string>): EpicStatus {
  // Check if blocked by dependencies
  const blockedBy = epic.dependencies.blockedBy.filter(dep => !completedEpics.has(dep));
  if (blockedBy.length > 0) {
    return 'blocked';
  }
  
  const counts = calculateEpicCounts(epic);
  
  if (counts.total === 0) return 'not-started';
  if (counts.completed === counts.total) return 'complete';
  if (counts.completed > 0 || counts.inProgress > 0) return 'in-progress';
  return 'not-started';
}

export function updateEpicMetrics(epic: Epic): EpicMetrics {
  const counts = calculateEpicCounts(epic);
  
  return {
    totalTasks: counts.total,
    completedTasks: counts.completed,
    inProgressTasks: counts.inProgress,
    blockedTasks: counts.blocked,
    percentage: calculateEpicPercentage(epic),
    testCoverage: epic.metrics.testCoverage, // Preserve existing
    testsWritten: epic.metrics.testsWritten,
    testsPassing: epic.metrics.testsPassing,
  };
}

export function updateEpicRollup(epic: Epic, completedEpics: Set<string>): Epic {
  // Update all features first
  for (const [key, feature] of Object.entries(epic.features)) {
    epic.features[key] = updateFeatureRollup(feature);
  }
  
  // Update epic metrics
  epic.metrics = updateEpicMetrics(epic);
  epic.status = determineEpicStatus(epic, completedEpics);
  
  if (epic.status === 'complete' && !epic.completedAt) {
    epic.completedAt = new Date().toISOString();
  }
  
  return epic;
}

// =============================================================================
// Platform Rollup
// =============================================================================

export function calculatePlatformMetrics(epics: Map<string, Epic>): PlatformMetrics {
  let totalTasks = 0;
  let completedTasks = 0;
  let completedEpics = 0;
  let inProgressEpics = 0;
  let blockedEpics = 0;
  
  for (const epic of epics.values()) {
    const counts = calculateEpicCounts(epic);
    totalTasks += counts.total;
    completedTasks += counts.completed;
    
    switch (epic.status) {
      case 'complete':
        completedEpics++;
        break;
      case 'in-progress':
        inProgressEpics++;
        break;
      case 'blocked':
        blockedEpics++;
        break;
    }
  }
  
  const overallPercentage = totalTasks > 0
    ? Math.round((completedTasks / totalTasks) * 1000) / 10
    : 0;
  
  return {
    name: 'VIBEUP',
    totalEpics: epics.size,
    completedEpics,
    inProgressEpics,
    blockedEpics,
    overallPercentage,
  };
}

export function generateEpicRollups(epics: Map<string, Epic>): Record<string, EpicRollup> {
  const rollups: Record<string, EpicRollup> = {};
  
  // Determine which epics are complete for dependency checking
  const completedEpics = new Set<string>();
  for (const [id, epic] of epics) {
    if (epic.status === 'complete') {
      completedEpics.add(id);
    }
  }
  
  for (const [epicId, epic] of epics) {
    // Determine blockers
    const blockers = epic.dependencies.blockedBy.filter(dep => !completedEpics.has(dep));
    
    // Find current focus (first in-progress feature)
    let currentFocus: string | undefined;
    for (const [featureId, feature] of Object.entries(epic.features)) {
      if (feature.status === 'in-progress') {
        currentFocus = featureId;
        break;
      }
    }
    
    rollups[epicId] = {
      status: epic.status,
      percentage: epic.metrics.percentage,
      blockers,
      currentFocus,
      startedAt: epic.startedAt,
      completedAt: epic.completedAt,
    };
  }
  
  return rollups;
}

// =============================================================================
// Full Rollup Operation
// =============================================================================

export function performFullRollup(basePath: string): Progress | null {
  const epics = readAllEpics(basePath);
  if (epics.size === 0) {
    console.error('No epics found to rollup');
    return null;
  }
  
  // Determine completed epics for dependency checking
  const completedEpicIds = new Set<string>();
  for (const [id, epic] of epics) {
    if (epic.status === 'complete') {
      completedEpicIds.add(id);
    }
  }
  
  // Update all epics
  for (const [epicId, epic] of epics) {
    const updated = updateEpicRollup(epic, completedEpicIds);
    writeEpic(basePath, updated);
    
    // Check if status changed to complete
    if (updated.status === 'complete') {
      completedEpicIds.add(epicId);
    }
  }
  
  // Re-read epics after updates
  const updatedEpics = readAllEpics(basePath);
  
  // Calculate platform metrics
  const platformMetrics = calculatePlatformMetrics(updatedEpics);
  const epicRollups = generateEpicRollups(updatedEpics);
  
  // Read existing progress for velocity and active work
  const existingProgress = readProgress(basePath);
  
  // Build new progress
  const progress: Progress = {
    version: '1.0',
    lastUpdated: new Date().toISOString(),
    lastCheckpoint: existingProgress?.lastCheckpoint,
    platform: {
      ...platformMetrics,
      velocity: existingProgress?.platform.velocity,
    },
    epics: epicRollups,
    tooling: existingProgress?.tooling || {
      lastValidated: '',
      rulesLoaded: 0,
      rulesApplied: 0,
      agentsAvailable: 0,
      coverageGate: 'not-configured',
    },
    activeWork: existingProgress?.activeWork || {},
  };
  
  writeProgress(basePath, progress);
  
  return progress;
}

// =============================================================================
// Incremental Updates
// =============================================================================

export function updateTaskStatus(
  basePath: string,
  epicId: string,
  featureId: string,
  taskPath: string[], // e.g., ['tables', 'profiles', 'schema']
  newStatus: TaskStatus
): boolean {
  const epic = readAllEpics(basePath).get(epicId);
  if (!epic) {
    console.error(`Epic ${epicId} not found`);
    return false;
  }
  
  const feature = epic.features[featureId];
  if (!feature) {
    console.error(`Feature ${featureId} not found in epic ${epicId}`);
    return false;
  }
  
  // Navigate to the task
  let current: any = feature;
  for (let i = 0; i < taskPath.length - 1; i++) {
    current = current[taskPath[i]];
    if (!current) {
      console.error(`Path ${taskPath.slice(0, i + 1).join('.')} not found`);
      return false;
    }
  }
  
  const taskKey = taskPath[taskPath.length - 1];
  if (!current[taskKey]) {
    current[taskKey] = { status: 'pending' };
  }
  
  current[taskKey].status = newStatus;
  
  if (newStatus === 'in-progress' && !current[taskKey].startedAt) {
    current[taskKey].startedAt = new Date().toISOString();
  }
  
  if (newStatus === 'complete' && !current[taskKey].completedAt) {
    current[taskKey].completedAt = new Date().toISOString();
  }
  
  // Save and rollup
  writeEpic(basePath, epic);
  performFullRollup(basePath);
  
  return true;
}

