/**
 * VIBEUP Development Tracker - State Management
 * Read/write YAML state files with validation
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import type {
  Progress,
  Epic,
  Tooling,
  Checkpoint,
  CoverageGates,
  EpicId,
  EPIC_IDS,
} from './types';

// =============================================================================
// Constants
// =============================================================================

const TRACKER_DIR = '.tracker';
const EPICS_DIR = `${TRACKER_DIR}/epics`;
const CHECKPOINTS_DIR = `${TRACKER_DIR}/checkpoints`;
const MANIFESTS_DIR = `${TRACKER_DIR}/manifests`;
const FEATURES_DIR = `${TRACKER_DIR}/features`;

const PROGRESS_FILE = `${TRACKER_DIR}/progress.yaml`;
const TOOLING_FILE = `${TRACKER_DIR}/tooling.yaml`;
const COVERAGE_GATES_FILE = `${TRACKER_DIR}/coverage-gates.yaml`;
const LATEST_CHECKPOINT_FILE = `${CHECKPOINTS_DIR}/latest.yaml`;

// =============================================================================
// Directory Management
// =============================================================================

export function ensureTrackerDirectories(basePath: string): void {
  const dirs = [
    TRACKER_DIR,
    EPICS_DIR,
    CHECKPOINTS_DIR,
    MANIFESTS_DIR,
    FEATURES_DIR,
    `${TRACKER_DIR}/schema`,
    `${TRACKER_DIR}/coverage-reports`,
  ];

  for (const dir of dirs) {
    const fullPath = path.join(basePath, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  }
}

export function getTrackerPaths(basePath: string) {
  return {
    tracker: path.join(basePath, TRACKER_DIR),
    epics: path.join(basePath, EPICS_DIR),
    checkpoints: path.join(basePath, CHECKPOINTS_DIR),
    manifests: path.join(basePath, MANIFESTS_DIR),
    features: path.join(basePath, FEATURES_DIR),
    progress: path.join(basePath, PROGRESS_FILE),
    tooling: path.join(basePath, TOOLING_FILE),
    coverageGates: path.join(basePath, COVERAGE_GATES_FILE),
    latestCheckpoint: path.join(basePath, LATEST_CHECKPOINT_FILE),
  };
}

// =============================================================================
// Generic YAML Read/Write
// =============================================================================

export function readYamlFile<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return yaml.load(content) as T;
  } catch (error) {
    console.error(`Error reading YAML file ${filePath}:`, error);
    return null;
  }
}

export function writeYamlFile<T>(filePath: string, data: T): boolean {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const content = yaml.dump(data, {
      indent: 2,
      lineWidth: 120,
      noRefs: true,
      sortKeys: false,
    });
    
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing YAML file ${filePath}:`, error);
    return false;
  }
}

// =============================================================================
// Progress State
// =============================================================================

export function readProgress(basePath: string): Progress | null {
  const paths = getTrackerPaths(basePath);
  return readYamlFile<Progress>(paths.progress);
}

export function writeProgress(basePath: string, progress: Progress): boolean {
  const paths = getTrackerPaths(basePath);
  progress.lastUpdated = new Date().toISOString();
  return writeYamlFile(paths.progress, progress);
}

export function updateProgressTimestamp(basePath: string): boolean {
  const progress = readProgress(basePath);
  if (!progress) return false;
  progress.lastUpdated = new Date().toISOString();
  return writeProgress(basePath, progress);
}

// =============================================================================
// Epic State
// =============================================================================

export function getEpicFilePath(basePath: string, epicId: string): string {
  const paths = getTrackerPaths(basePath);
  return path.join(paths.epics, `${epicId}.yaml`);
}

export function readEpic(basePath: string, epicId: string): Epic | null {
  const filePath = getEpicFilePath(basePath, epicId);
  return readYamlFile<Epic>(filePath);
}

export function writeEpic(basePath: string, epic: Epic): boolean {
  const filePath = getEpicFilePath(basePath, epic.epicId);
  return writeYamlFile(filePath, epic);
}

export function readAllEpics(basePath: string): Map<string, Epic> {
  const epics = new Map<string, Epic>();
  const paths = getTrackerPaths(basePath);
  
  if (!fs.existsSync(paths.epics)) {
    return epics;
  }
  
  const files = fs.readdirSync(paths.epics).filter(f => f.endsWith('.yaml'));
  
  for (const file of files) {
    const epicId = file.replace('.yaml', '');
    const epic = readEpic(basePath, epicId);
    if (epic) {
      epics.set(epicId, epic);
    }
  }
  
  return epics;
}

// =============================================================================
// Tooling State
// =============================================================================

export function readTooling(basePath: string): Tooling | null {
  const paths = getTrackerPaths(basePath);
  return readYamlFile<Tooling>(paths.tooling);
}

export function writeTooling(basePath: string, tooling: Tooling): boolean {
  const paths = getTrackerPaths(basePath);
  tooling.lastValidated = new Date().toISOString();
  return writeYamlFile(paths.tooling, tooling);
}

// =============================================================================
// Coverage Gates State
// =============================================================================

export function readCoverageGates(basePath: string): CoverageGates | null {
  const paths = getTrackerPaths(basePath);
  return readYamlFile<CoverageGates>(paths.coverageGates);
}

export function writeCoverageGates(basePath: string, gates: CoverageGates): boolean {
  const paths = getTrackerPaths(basePath);
  gates.lastCheck = new Date().toISOString();
  return writeYamlFile(paths.coverageGates, gates);
}

// =============================================================================
// Checkpoint State
// =============================================================================

export function generateCheckpointId(prefix?: string): string {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const suffix = prefix || 'checkpoint';
  const hash = Math.random().toString(36).substring(2, 6);
  return `${date}-${suffix}-${hash}`;
}

export function getCheckpointFilePath(basePath: string, checkpointId: string): string {
  const paths = getTrackerPaths(basePath);
  return path.join(paths.checkpoints, `${checkpointId}.yaml`);
}

export function readCheckpoint(basePath: string, checkpointId: string): Checkpoint | null {
  const filePath = getCheckpointFilePath(basePath, checkpointId);
  return readYamlFile<Checkpoint>(filePath);
}

export function readLatestCheckpoint(basePath: string): Checkpoint | null {
  const paths = getTrackerPaths(basePath);
  return readYamlFile<Checkpoint>(paths.latestCheckpoint);
}

export function writeCheckpoint(basePath: string, checkpoint: Checkpoint): boolean {
  const paths = getTrackerPaths(basePath);
  
  // Write to specific checkpoint file
  const filePath = getCheckpointFilePath(basePath, checkpoint.checkpointId);
  const success = writeYamlFile(filePath, checkpoint);
  
  if (success) {
    // Also update latest.yaml
    writeYamlFile(paths.latestCheckpoint, checkpoint);
    
    // Update progress with latest checkpoint reference
    const progress = readProgress(basePath);
    if (progress) {
      progress.lastCheckpoint = checkpoint.checkpointId;
      writeProgress(basePath, progress);
    }
  }
  
  return success;
}

export function listCheckpoints(basePath: string): string[] {
  const paths = getTrackerPaths(basePath);
  
  if (!fs.existsSync(paths.checkpoints)) {
    return [];
  }
  
  return fs.readdirSync(paths.checkpoints)
    .filter(f => f.endsWith('.yaml') && f !== 'latest.yaml')
    .map(f => f.replace('.yaml', ''))
    .sort()
    .reverse(); // Most recent first
}

// =============================================================================
// Manifest Management
// =============================================================================

export function getManifestFilePath(basePath: string, manifestName: string): string {
  const paths = getTrackerPaths(basePath);
  return path.join(paths.manifests, `${manifestName}.yaml`);
}

export function listManifests(basePath: string): string[] {
  const paths = getTrackerPaths(basePath);
  
  if (!fs.existsSync(paths.manifests)) {
    return [];
  }
  
  return fs.readdirSync(paths.manifests)
    .filter(f => f.endsWith('.yaml'))
    .map(f => f.replace('.yaml', ''));
}

// =============================================================================
// Atomic Operations
// =============================================================================

export interface StateTransaction {
  progress?: Progress;
  epic?: Epic;
  tooling?: Tooling;
  checkpoint?: Checkpoint;
  coverageGates?: CoverageGates;
}

export function commitTransaction(basePath: string, transaction: StateTransaction): boolean {
  const results: boolean[] = [];
  
  if (transaction.progress) {
    results.push(writeProgress(basePath, transaction.progress));
  }
  
  if (transaction.epic) {
    results.push(writeEpic(basePath, transaction.epic));
  }
  
  if (transaction.tooling) {
    results.push(writeTooling(basePath, transaction.tooling));
  }
  
  if (transaction.checkpoint) {
    results.push(writeCheckpoint(basePath, transaction.checkpoint));
  }
  
  if (transaction.coverageGates) {
    results.push(writeCoverageGates(basePath, transaction.coverageGates));
  }
  
  return results.every(r => r);
}

// =============================================================================
// State Initialization
// =============================================================================

export function isTrackerInitialized(basePath: string): boolean {
  const paths = getTrackerPaths(basePath);
  return fs.existsSync(paths.progress) && fs.existsSync(paths.tooling);
}

export function getTrackerStats(basePath: string): {
  epicsCount: number;
  checkpointsCount: number;
  manifestsCount: number;
  lastUpdated: string | null;
} {
  const progress = readProgress(basePath);
  
  return {
    epicsCount: readAllEpics(basePath).size,
    checkpointsCount: listCheckpoints(basePath).length,
    manifestsCount: listManifests(basePath).length,
    lastUpdated: progress?.lastUpdated || null,
  };
}

