/**
 * VIBEUP Development Tracker - Checkpoint System
 * Create and restore checkpoints for interrupt/resume capability
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import type {
  Checkpoint,
  CheckpointActiveWork,
  CheckpointContext,
  CheckpointGitState,
  CheckpointTimeTracking,
  CheckpointReason,
  TaskType,
  AgentType,
} from './types';
import {
  generateCheckpointId,
  readCheckpoint,
  readLatestCheckpoint,
  writeCheckpoint,
  listCheckpoints,
  readProgress,
  readEpic,
  getTrackerPaths,
} from './state';
import { getLoadedRules } from './validator';

// =============================================================================
// Git State Utilities
// =============================================================================

function execGitCommand(basePath: string, command: string): string | null {
  try {
    return execSync(`git ${command}`, {
      cwd: basePath,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
  } catch {
    return null;
  }
}

function getCurrentBranch(basePath: string): string {
  return execGitCommand(basePath, 'rev-parse --abbrev-ref HEAD') || 'unknown';
}

function getLastCommitSha(basePath: string): string {
  return execGitCommand(basePath, 'rev-parse HEAD') || 'unknown';
}

function getLastCommitMessage(basePath: string): string {
  return execGitCommand(basePath, 'log -1 --pretty=%B') || '';
}

function hasUncommittedChanges(basePath: string): boolean {
  const status = execGitCommand(basePath, 'status --porcelain');
  return status !== null && status.length > 0;
}

function getUncommittedFiles(basePath: string): string[] {
  const status = execGitCommand(basePath, 'status --porcelain');
  if (!status) return [];
  
  return status.split('\n')
    .filter(line => line.trim())
    .map(line => line.substring(3).trim());
}

function isWorktree(basePath: string): boolean {
  const gitDir = execGitCommand(basePath, 'rev-parse --git-dir');
  return gitDir !== null && gitDir.includes('.git/worktrees');
}

function getMainRepoPath(basePath: string): string | null {
  if (!isWorktree(basePath)) return null;
  
  const gitDir = execGitCommand(basePath, 'rev-parse --git-dir');
  if (!gitDir) return null;
  
  // Parse worktree gitdir to find main repo
  const match = gitDir.match(/(.+)\/\.git\/worktrees\//);
  return match ? match[1] : null;
}

function stashChanges(basePath: string, message: string): string | null {
  const result = execGitCommand(basePath, `stash push -m "${message}"`);
  if (!result || result.includes('No local changes')) {
    return null;
  }
  
  // Get stash ref
  return execGitCommand(basePath, 'stash list -1 --format=%H');
}

function popStash(basePath: string, stashRef?: string): boolean {
  const command = stashRef ? `stash pop stash@{${stashRef}}` : 'stash pop';
  return execGitCommand(basePath, command) !== null;
}

// =============================================================================
// Checkpoint Creation
// =============================================================================

export interface CreateCheckpointOptions {
  reason: CheckpointReason;
  epic?: string;
  feature?: string;
  task?: string;
  taskType?: TaskType;
  assignedTo?: AgentType;
  resumeNotes?: string;
  nextSteps?: string[];
  stashChanges?: boolean;
}

export function createCheckpoint(
  basePath: string,
  options: CreateCheckpointOptions
): Checkpoint | null {
  const progress = readProgress(basePath);
  
  // Determine active work from progress or options
  let activeWork: CheckpointActiveWork;
  
  if (options.epic && options.feature && options.task) {
    activeWork = {
      epic: options.epic,
      feature: options.feature,
      task: options.task,
      taskType: options.taskType || 'endpoint-implementation',
      assignedTo: options.assignedTo,
    };
  } else if (progress?.activeWork.cursor) {
    activeWork = {
      epic: progress.activeWork.cursor.currentEpic,
      feature: progress.activeWork.cursor.currentFeature,
      task: progress.activeWork.cursor.currentTask,
      taskType: 'endpoint-implementation',
      assignedTo: 'cursor',
    };
  } else {
    // No active work to checkpoint
    console.warn('No active work to checkpoint');
    activeWork = {
      epic: 'unknown',
      feature: 'unknown',
      task: 'unknown',
      taskType: 'endpoint-implementation',
    };
  }
  
  // Get loaded rules
  const rulesLoaded = getLoadedRules(basePath);
  
  // Get modified files
  const filesModified = getUncommittedFiles(basePath);
  
  // Build context
  const context: CheckpointContext = {
    specSections: [],
    rulesLoaded,
    filesModified,
    filesCreated: [],
    testsWritten: filesModified.filter(f => 
      f.includes('.test.') || f.includes('.spec.') || f.includes('__tests__')
    ),
  };
  
  // Add spec sections based on epic
  if (activeWork.epic) {
    const epicData = readEpic(basePath, activeWork.epic);
    if (epicData) {
      context.specSections.push(epicData.specFile);
    }
  }
  
  // Build git state
  const branch = getCurrentBranch(basePath);
  const git: CheckpointGitState = {
    branch,
    isWorktree: isWorktree(basePath),
    mainRepoPath: getMainRepoPath(basePath) || undefined,
    uncommittedChanges: hasUncommittedChanges(basePath),
    uncommittedFiles: filesModified,
    lastCommit: getLastCommitSha(basePath),
    lastCommitMessage: getLastCommitMessage(basePath),
    stashCreated: false,
  };
  
  // Check if we're in a worktree
  if (git.isWorktree) {
    git.worktree = basePath;
  }
  
  // Optionally stash changes
  if (options.stashChanges && git.uncommittedChanges) {
    const checkpointId = generateCheckpointId(activeWork.epic);
    const stashRef = stashChanges(basePath, `checkpoint: ${checkpointId}`);
    if (stashRef) {
      git.stashCreated = true;
      git.stashRef = stashRef;
    }
  }
  
  // Build time tracking
  const timeTracking: CheckpointTimeTracking = {
    onTaskDuration: '0m',
    onFeatureDuration: '0m',
    onEpicDuration: '0m',
  };
  
  // If we have active cursor work, calculate duration
  if (progress?.activeWork.cursor?.startedAt) {
    const started = new Date(progress.activeWork.cursor.startedAt);
    const now = new Date();
    const minutes = Math.round((now.getTime() - started.getTime()) / 60000);
    timeTracking.onTaskDuration = `${minutes}m`;
    timeTracking.sessionStartedAt = progress.activeWork.cursor.startedAt;
  }
  
  // Generate checkpoint ID
  const checkpointId = generateCheckpointId(activeWork.epic);
  
  const checkpoint: Checkpoint = {
    checkpointId,
    createdAt: new Date().toISOString(),
    reason: options.reason,
    activeWork,
    context,
    git,
    timeTracking,
    resumeNotes: options.resumeNotes,
    nextSteps: options.nextSteps,
  };
  
  // Save checkpoint
  const success = writeCheckpoint(basePath, checkpoint);
  
  return success ? checkpoint : null;
}

// =============================================================================
// Checkpoint Restoration
// =============================================================================

export interface RestoreResult {
  success: boolean;
  checkpoint: Checkpoint;
  actions: string[];
  warnings: string[];
  errors: string[];
}

export function restoreCheckpoint(
  basePath: string,
  checkpointId?: string
): RestoreResult | null {
  // Load checkpoint
  const checkpoint = checkpointId
    ? readCheckpoint(basePath, checkpointId)
    : readLatestCheckpoint(basePath);
  
  if (!checkpoint) {
    console.error('Checkpoint not found');
    return null;
  }
  
  const result: RestoreResult = {
    success: true,
    checkpoint,
    actions: [],
    warnings: [],
    errors: [],
  };
  
  // Check git state
  const currentBranch = getCurrentBranch(basePath);
  
  if (currentBranch !== checkpoint.git.branch) {
    result.warnings.push(
      `Current branch (${currentBranch}) differs from checkpoint branch (${checkpoint.git.branch})`
    );
  }
  
  // Check for stashed changes
  if (checkpoint.git.stashCreated && checkpoint.git.stashRef) {
    result.actions.push(`Stashed changes available: ${checkpoint.git.stashRef}`);
    // Note: Don't auto-pop stash, let user decide
  }
  
  // Check for uncommitted changes
  if (hasUncommittedChanges(basePath)) {
    result.warnings.push('Working directory has uncommitted changes');
  }
  
  // Verify files still exist
  for (const file of checkpoint.context.filesModified) {
    const fullPath = path.join(basePath, file);
    if (!fs.existsSync(fullPath)) {
      result.warnings.push(`Modified file no longer exists: ${file}`);
    }
  }
  
  // Log actions for context restoration
  result.actions.push(`Epic: ${checkpoint.activeWork.epic}`);
  result.actions.push(`Feature: ${checkpoint.activeWork.feature}`);
  result.actions.push(`Task: ${checkpoint.activeWork.task}`);
  result.actions.push(`Task Type: ${checkpoint.activeWork.taskType}`);
  
  if (checkpoint.context.rulesLoaded.length > 0) {
    result.actions.push(`Rules to load: ${checkpoint.context.rulesLoaded.join(', ')}`);
  }
  
  if (checkpoint.resumeNotes) {
    result.actions.push(`Notes: ${checkpoint.resumeNotes}`);
  }
  
  if (checkpoint.nextSteps && checkpoint.nextSteps.length > 0) {
    result.actions.push('Next steps:');
    for (const step of checkpoint.nextSteps) {
      result.actions.push(`  - ${step}`);
    }
  }
  
  return result;
}

// =============================================================================
// Checkpoint Queries
// =============================================================================

export interface CheckpointInfo {
  id: string;
  createdAt: string;
  reason: CheckpointReason;
  epic: string;
  feature: string;
  task: string;
  branch: string;
  hasUncommittedChanges: boolean;
}

export function getCheckpointInfo(
  basePath: string,
  checkpointId: string
): CheckpointInfo | null {
  const checkpoint = readCheckpoint(basePath, checkpointId);
  if (!checkpoint) return null;
  
  return {
    id: checkpoint.checkpointId,
    createdAt: checkpoint.createdAt,
    reason: checkpoint.reason,
    epic: checkpoint.activeWork.epic,
    feature: checkpoint.activeWork.feature,
    task: checkpoint.activeWork.task,
    branch: checkpoint.git.branch,
    hasUncommittedChanges: checkpoint.git.uncommittedChanges,
  };
}

export function listCheckpointInfos(basePath: string): CheckpointInfo[] {
  const ids = listCheckpoints(basePath);
  const infos: CheckpointInfo[] = [];
  
  for (const id of ids) {
    const info = getCheckpointInfo(basePath, id);
    if (info) {
      infos.push(info);
    }
  }
  
  return infos;
}

export function getLatestCheckpointInfo(basePath: string): CheckpointInfo | null {
  const checkpoint = readLatestCheckpoint(basePath);
  if (!checkpoint) return null;
  
  return {
    id: checkpoint.checkpointId,
    createdAt: checkpoint.createdAt,
    reason: checkpoint.reason,
    epic: checkpoint.activeWork.epic,
    feature: checkpoint.activeWork.feature,
    task: checkpoint.activeWork.task,
    branch: checkpoint.git.branch,
    hasUncommittedChanges: checkpoint.git.uncommittedChanges,
  };
}

// =============================================================================
// Auto-Checkpoint on Session End
// =============================================================================

export function createSessionEndCheckpoint(basePath: string): Checkpoint | null {
  return createCheckpoint(basePath, {
    reason: 'session-end',
    resumeNotes: 'Auto-created on session end',
  });
}

export function createInterruptCheckpoint(
  basePath: string,
  notes?: string
): Checkpoint | null {
  return createCheckpoint(basePath, {
    reason: 'interrupt',
    resumeNotes: notes || 'Session interrupted',
    stashChanges: true, // Stash changes on interrupt
  });
}

export function createMilestoneCheckpoint(
  basePath: string,
  epic: string,
  feature: string,
  task: string,
  notes?: string
): Checkpoint | null {
  return createCheckpoint(basePath, {
    reason: 'milestone',
    epic,
    feature,
    task,
    resumeNotes: notes || `Milestone: ${task} complete`,
  });
}

