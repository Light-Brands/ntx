/**
 * VIBEUP Development Tracker - Manifest Generator
 * Generate swarm-compatible work manifests from tracker state
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import type {
  Epic,
  Feature,
  AtomicTask,
  TableTask,
  EndpointTask,
  ServiceTask,
  ComponentTask,
  TaskStatus,
} from './types';
import { readEpic, readAllEpics, getTrackerPaths, writeYamlFile } from './state';
import { EPIC_NAMES, EPIC_SPEC_FILES } from './types';

// =============================================================================
// Types
// =============================================================================

interface SwarmTask {
  id: string;
  prompt: string;
  branch: string;
  priority: 'high' | 'medium' | 'low';
  depends_on?: string[];
  agent_hint?: string;
  timeout?: string;
}

interface SwarmManifest {
  name: string;
  repo?: string;
  base_branch: string;
  default_priority?: 'high' | 'medium' | 'low';
  max_parallel?: number;
  tasks: SwarmTask[];
}

interface TaskInfo {
  id: string;
  type: 'table' | 'endpoint' | 'service' | 'component' | 'test' | 'config';
  epic: string;
  feature: string;
  name: string;
  subTask?: string;
  status: TaskStatus;
  dependencies: string[];
}

// =============================================================================
// Task Extraction
// =============================================================================

function extractTableTasks(
  epicId: string,
  featureName: string,
  tableName: string,
  table: TableTask
): TaskInfo[] {
  const tasks: TaskInfo[] = [];
  const baseId = `${epicId}/${featureName}/table-${tableName}`;
  
  if (table.schema?.status === 'pending') {
    tasks.push({
      id: `${baseId}/schema`,
      type: 'table',
      epic: epicId,
      feature: featureName,
      name: tableName,
      subTask: 'schema',
      status: table.schema.status,
      dependencies: [],
    });
  }
  
  if (table.migrations?.status === 'pending') {
    tasks.push({
      id: `${baseId}/migrations`,
      type: 'table',
      epic: epicId,
      feature: featureName,
      name: tableName,
      subTask: 'migrations',
      status: table.migrations.status,
      dependencies: [`${baseId}/schema`],
    });
  }
  
  if (table.rls_policies?.status === 'pending') {
    tasks.push({
      id: `${baseId}/rls`,
      type: 'table',
      epic: epicId,
      feature: featureName,
      name: tableName,
      subTask: 'rls',
      status: table.rls_policies.status,
      dependencies: [`${baseId}/migrations`],
    });
  }
  
  if (table.indexes?.status === 'pending') {
    tasks.push({
      id: `${baseId}/indexes`,
      type: 'table',
      epic: epicId,
      feature: featureName,
      name: tableName,
      subTask: 'indexes',
      status: table.indexes.status,
      dependencies: [`${baseId}/migrations`],
    });
  }
  
  return tasks;
}

function extractEndpointTasks(
  epicId: string,
  featureName: string,
  endpointName: string,
  endpoint: EndpointTask
): TaskInfo[] {
  const tasks: TaskInfo[] = [];
  const baseId = `${epicId}/${featureName}/endpoint-${endpointName}`;
  
  // TDD: tests first
  if (endpoint.tests_unit?.status === 'pending') {
    tasks.push({
      id: `${baseId}/tests-unit`,
      type: 'endpoint',
      epic: epicId,
      feature: featureName,
      name: endpointName,
      subTask: 'tests-unit',
      status: endpoint.tests_unit.status,
      dependencies: [],
    });
  }
  
  if (endpoint.implementation?.status === 'pending') {
    tasks.push({
      id: `${baseId}/implementation`,
      type: 'endpoint',
      epic: epicId,
      feature: featureName,
      name: endpointName,
      subTask: 'implementation',
      status: endpoint.implementation.status,
      dependencies: [`${baseId}/tests-unit`],
    });
  }
  
  if (endpoint.validation?.status === 'pending') {
    tasks.push({
      id: `${baseId}/validation`,
      type: 'endpoint',
      epic: epicId,
      feature: featureName,
      name: endpointName,
      subTask: 'validation',
      status: endpoint.validation.status,
      dependencies: [`${baseId}/implementation`],
    });
  }
  
  if (endpoint.tests_integration?.status === 'pending') {
    tasks.push({
      id: `${baseId}/tests-integration`,
      type: 'endpoint',
      epic: epicId,
      feature: featureName,
      name: endpointName,
      subTask: 'tests-integration',
      status: endpoint.tests_integration.status,
      dependencies: [`${baseId}/implementation`],
    });
  }
  
  return tasks;
}

function extractServiceTasks(
  epicId: string,
  featureName: string,
  serviceName: string,
  service: ServiceTask
): TaskInfo[] {
  const tasks: TaskInfo[] = [];
  const baseId = `${epicId}/${featureName}/service-${serviceName}`;
  
  // TDD: tests first
  if (service.unit_tests?.status === 'pending') {
    tasks.push({
      id: `${baseId}/tests`,
      type: 'service',
      epic: epicId,
      feature: featureName,
      name: serviceName,
      subTask: 'tests',
      status: service.unit_tests.status,
      dependencies: [],
    });
  }
  
  if (service.implementation?.status === 'pending') {
    tasks.push({
      id: `${baseId}/implementation`,
      type: 'service',
      epic: epicId,
      feature: featureName,
      name: serviceName,
      subTask: 'implementation',
      status: service.implementation.status,
      dependencies: [`${baseId}/tests`],
    });
  }
  
  return tasks;
}

function extractComponentTasks(
  epicId: string,
  featureName: string,
  componentName: string,
  component: ComponentTask
): TaskInfo[] {
  const tasks: TaskInfo[] = [];
  const baseId = `${epicId}/${featureName}/component-${componentName}`;
  
  // TDD: tests first
  if (component.tests?.status === 'pending') {
    tasks.push({
      id: `${baseId}/tests`,
      type: 'component',
      epic: epicId,
      feature: featureName,
      name: componentName,
      subTask: 'tests',
      status: component.tests.status,
      dependencies: [],
    });
  }
  
  if (component.implementation?.status === 'pending') {
    tasks.push({
      id: `${baseId}/implementation`,
      type: 'component',
      epic: epicId,
      feature: featureName,
      name: componentName,
      subTask: 'implementation',
      status: component.implementation.status,
      dependencies: [`${baseId}/tests`],
    });
  }
  
  if (component.styling?.status === 'pending') {
    tasks.push({
      id: `${baseId}/styling`,
      type: 'component',
      epic: epicId,
      feature: featureName,
      name: componentName,
      subTask: 'styling',
      status: component.styling.status,
      dependencies: [`${baseId}/implementation`],
    });
  }
  
  if (component.accessibility?.status === 'pending') {
    tasks.push({
      id: `${baseId}/accessibility`,
      type: 'component',
      epic: epicId,
      feature: featureName,
      name: componentName,
      subTask: 'accessibility',
      status: component.accessibility.status,
      dependencies: [`${baseId}/implementation`],
    });
  }
  
  return tasks;
}

function extractFeatureTasks(
  epicId: string,
  featureName: string,
  feature: Feature
): TaskInfo[] {
  const tasks: TaskInfo[] = [];
  
  // Extract table tasks
  if (feature.tables) {
    for (const [tableName, table] of Object.entries(feature.tables)) {
      tasks.push(...extractTableTasks(epicId, featureName, tableName, table));
    }
  }
  
  // Extract endpoint tasks
  if (feature.endpoints) {
    for (const [endpointName, endpoint] of Object.entries(feature.endpoints)) {
      tasks.push(...extractEndpointTasks(epicId, featureName, endpointName, endpoint));
    }
  }
  
  // Extract service tasks
  if (feature.services) {
    for (const [serviceName, service] of Object.entries(feature.services)) {
      tasks.push(...extractServiceTasks(epicId, featureName, serviceName, service));
    }
  }
  
  // Extract component tasks
  if (feature.components) {
    for (const [componentName, component] of Object.entries(feature.components)) {
      tasks.push(...extractComponentTasks(epicId, featureName, componentName, component));
    }
  }
  
  return tasks;
}

function extractEpicTasks(epic: Epic): TaskInfo[] {
  const tasks: TaskInfo[] = [];
  
  for (const [featureName, feature] of Object.entries(epic.features)) {
    tasks.push(...extractFeatureTasks(epic.epicId, featureName, feature));
  }
  
  return tasks;
}

// =============================================================================
// Prompt Generation
// =============================================================================

function generateTablePrompt(task: TaskInfo, epicId: string): string {
  const specFile = EPIC_SPEC_FILES[epicId as keyof typeof EPIC_SPEC_FILES];
  
  switch (task.subTask) {
    case 'schema':
      return `Create the "${task.name}" database table following the spec in ${specFile}.

Requirements:
- Define complete TypeScript types for the table
- Create Supabase table schema with all columns
- Add appropriate constraints and defaults
- Include timestamps (created_at, updated_at)
- Follow the database schema patterns in epic-00-foundation.md
- Write unit tests for type definitions

Deliverables:
- types/database.ts additions
- SQL migration file
- Test file with at least 3 tests`;

    case 'migrations':
      return `Create Supabase migration for the "${task.name}" table.

Requirements:
- Generate migration using Supabase CLI conventions
- Include rollback script (down migration)
- Add appropriate indexes
- Follow naming conventions from epic-00-foundation.md

Deliverables:
- Migration file in supabase/migrations/
- Test migration applies cleanly`;

    case 'rls':
      return `Implement Row Level Security policies for the "${task.name}" table.

Requirements:
- Enable RLS on the table
- Create policies for SELECT, INSERT, UPDATE, DELETE
- Ensure users can only access their own data (unless admin)
- Follow RLS patterns from epic-00-foundation.md
- Write integration tests for each policy

Deliverables:
- RLS policies in migration file
- Test file with policy verification tests`;

    case 'indexes':
      return `Add performance indexes to the "${task.name}" table.

Requirements:
- Add indexes for commonly queried columns
- Add indexes for foreign keys
- Consider partial indexes where appropriate
- Follow indexing patterns from epic-00-foundation.md

Deliverables:
- Index migration file
- Performance test or explanation`;

    default:
      return `Complete "${task.subTask}" for table "${task.name}" following ${specFile}.`;
  }
}

function generateEndpointPrompt(task: TaskInfo, epicId: string): string {
  const specFile = EPIC_SPEC_FILES[epicId as keyof typeof EPIC_SPEC_FILES];
  
  switch (task.subTask) {
    case 'tests-unit':
      return `Write unit tests for the "${task.name}" API endpoint (TDD - tests first).

Requirements:
- Write failing tests first (TDD red phase)
- Cover happy path scenarios
- Cover error cases (validation, auth, not found)
- Cover edge cases
- Follow testing patterns from typescript-coding-standards.mdc
- Minimum 5 test cases

Deliverables:
- Test file in tests/api/ or __tests__/
- Tests should fail initially (no implementation yet)`;

    case 'implementation':
      return `Implement the "${task.name}" API endpoint to pass all tests.

Requirements:
- Follow spec in ${specFile}
- Make all unit tests pass (TDD green phase)
- Use proper error handling with typed errors
- Add structured logging
- Follow patterns from typescript-coding-standards.mdc

Deliverables:
- Route handler in app/api/
- All tests passing
- No linting errors`;

    case 'validation':
      return `Add input validation to the "${task.name}" endpoint.

Requirements:
- Use Zod for schema validation
- Validate all request parameters
- Return 400 with detailed error messages for invalid input
- Add validation tests

Deliverables:
- Zod schema in lib/validations/
- Validation middleware integration
- Validation tests`;

    case 'tests-integration':
      return `Write integration tests for the "${task.name}" endpoint.

Requirements:
- Test full request/response cycle
- Test with real (test) database
- Test authentication flows
- Test error scenarios
- Minimum 3 integration tests

Deliverables:
- Integration test file
- All tests passing`;

    default:
      return `Complete "${task.subTask}" for endpoint "${task.name}" following ${specFile}.`;
  }
}

function generateServicePrompt(task: TaskInfo, epicId: string): string {
  const specFile = EPIC_SPEC_FILES[epicId as keyof typeof EPIC_SPEC_FILES];
  
  switch (task.subTask) {
    case 'tests':
      return `Write unit tests for the "${task.name}" service (TDD - tests first).

Requirements:
- Write failing tests first (TDD red phase)
- Cover all public methods
- Cover success and error scenarios
- Mock external dependencies
- Target 90% coverage
- Minimum 5 test cases

Deliverables:
- Test file in tests/services/ or __tests__/
- Tests should fail initially`;

    case 'implementation':
      return `Implement the "${task.name}" service to pass all tests.

Requirements:
- Follow spec in ${specFile}
- Make all unit tests pass (TDD green phase)
- Use dependency injection
- Add structured logging
- Follow patterns from typescript-coding-standards.mdc

Deliverables:
- Service class in lib/services/
- All tests passing
- 90%+ coverage`;

    default:
      return `Complete "${task.subTask}" for service "${task.name}" following ${specFile}.`;
  }
}

function generateComponentPrompt(task: TaskInfo, epicId: string): string {
  const specFile = EPIC_SPEC_FILES[epicId as keyof typeof EPIC_SPEC_FILES];
  
  switch (task.subTask) {
    case 'tests':
      return `Write tests for the "${task.name}" component (TDD - tests first).

Requirements:
- Write failing tests first
- Test rendering
- Test user interactions
- Test accessibility
- Use React Testing Library
- Minimum 3 tests

Deliverables:
- Test file in __tests__/components/
- Tests should fail initially`;

    case 'implementation':
      return `Implement the "${task.name}" component to pass all tests.

Requirements:
- Follow spec in ${specFile}
- Follow design-system-v2 patterns
- Make all tests pass
- Use TypeScript with proper types
- Follow react-components.mdc guidelines

Deliverables:
- Component in components/
- All tests passing`;

    case 'styling':
      return `Style the "${task.name}" component following design system.

Requirements:
- Use Tailwind CSS
- Follow design tokens from design-system-v2
- Ensure dark mode support
- Responsive design
- Follow frontend aesthetics guidelines

Deliverables:
- Styled component
- Visual review ready`;

    case 'accessibility':
      return `Add accessibility to the "${task.name}" component.

Requirements:
- Proper ARIA attributes
- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Add accessibility tests

Deliverables:
- Accessible component
- Accessibility tests passing`;

    default:
      return `Complete "${task.subTask}" for component "${task.name}" following ${specFile}.`;
  }
}

function generateTaskPrompt(task: TaskInfo): string {
  switch (task.type) {
    case 'table':
      return generateTablePrompt(task, task.epic);
    case 'endpoint':
      return generateEndpointPrompt(task, task.epic);
    case 'service':
      return generateServicePrompt(task, task.epic);
    case 'component':
      return generateComponentPrompt(task, task.epic);
    default:
      return `Complete task "${task.name}" for ${task.feature} in ${task.epic}.`;
  }
}

// =============================================================================
// Manifest Generation
// =============================================================================

function taskToSwarmTask(task: TaskInfo): SwarmTask {
  const branchName = task.id
    .replace(/\//g, '-')
    .replace(/[^a-z0-9-]/gi, '-')
    .toLowerCase();
  
  return {
    id: task.id.replace(/\//g, '-'),
    prompt: generateTaskPrompt(task),
    branch: `feat/${branchName}`,
    priority: task.type === 'table' ? 'high' : 'medium',
    depends_on: task.dependencies.length > 0 
      ? task.dependencies.map(d => d.replace(/\//g, '-'))
      : undefined,
    timeout: task.type === 'table' ? '30m' : '45m',
  };
}

export interface GenerateManifestOptions {
  epicId: string;
  featureId?: string;
  batchSize?: number;
  includeInProgress?: boolean;
}

export function generateManifest(
  basePath: string,
  options: GenerateManifestOptions
): SwarmManifest | null {
  const epic = readEpic(basePath, options.epicId);
  if (!epic) {
    console.error(`Epic ${options.epicId} not found`);
    return null;
  }
  
  // Extract all pending tasks
  let tasks: TaskInfo[];
  
  if (options.featureId) {
    const feature = epic.features[options.featureId];
    if (!feature) {
      console.error(`Feature ${options.featureId} not found in epic ${options.epicId}`);
      return null;
    }
    tasks = extractFeatureTasks(options.epicId, options.featureId, feature);
  } else {
    tasks = extractEpicTasks(epic);
  }
  
  // Filter to only pending tasks (unless includeInProgress)
  if (!options.includeInProgress) {
    tasks = tasks.filter(t => t.status === 'pending');
  }
  
  // Apply batch size
  if (options.batchSize && options.batchSize > 0) {
    tasks = tasks.slice(0, options.batchSize);
  }
  
  if (tasks.length === 0) {
    console.log('No pending tasks to generate manifest for');
    return null;
  }
  
  // Generate manifest
  const epicName = EPIC_NAMES[options.epicId as keyof typeof EPIC_NAMES] || options.epicId;
  const featureSuffix = options.featureId ? ` - ${options.featureId}` : '';
  const batchNum = Math.floor(Date.now() / 1000);
  
  const manifest: SwarmManifest = {
    name: `${epicName}${featureSuffix} - Batch ${batchNum}`,
    base_branch: 'main',
    default_priority: 'medium',
    max_parallel: 4,
    tasks: tasks.map(taskToSwarmTask),
  };
  
  return manifest;
}

export function saveManifest(
  basePath: string,
  manifest: SwarmManifest,
  filename?: string
): string | null {
  const paths = getTrackerPaths(basePath);
  const name = filename || `${manifest.name.toLowerCase().replace(/\s+/g, '-')}.yaml`;
  const filePath = path.join(paths.manifests, name);
  
  const success = writeYamlFile(filePath, manifest);
  return success ? filePath : null;
}

export function generateAndSaveManifest(
  basePath: string,
  options: GenerateManifestOptions
): string | null {
  const manifest = generateManifest(basePath, options);
  if (!manifest) return null;
  
  return saveManifest(basePath, manifest);
}

// =============================================================================
// Batch Utilities
// =============================================================================

export function groupTasksIntoBatches(tasks: TaskInfo[], batchSize: number): TaskInfo[][] {
  const batches: TaskInfo[][] = [];
  
  // Group by independence (tasks with no dependencies in the set go first)
  const taskIds = new Set(tasks.map(t => t.id));
  
  const independent = tasks.filter(t => 
    t.dependencies.length === 0 || 
    !t.dependencies.some(d => taskIds.has(d))
  );
  
  const dependent = tasks.filter(t => 
    t.dependencies.length > 0 && 
    t.dependencies.some(d => taskIds.has(d))
  );
  
  // Create batches from independent tasks first
  for (let i = 0; i < independent.length; i += batchSize) {
    batches.push(independent.slice(i, i + batchSize));
  }
  
  // Then add dependent tasks
  for (let i = 0; i < dependent.length; i += batchSize) {
    batches.push(dependent.slice(i, i + batchSize));
  }
  
  return batches;
}

export function generateBatchedManifests(
  basePath: string,
  epicId: string,
  batchSize: number = 10
): string[] {
  const epic = readEpic(basePath, epicId);
  if (!epic) return [];
  
  const allTasks = extractEpicTasks(epic).filter(t => t.status === 'pending');
  const batches = groupTasksIntoBatches(allTasks, batchSize);
  const savedPaths: string[] = [];
  
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const epicName = EPIC_NAMES[epicId as keyof typeof EPIC_NAMES] || epicId;
    
    const manifest: SwarmManifest = {
      name: `${epicName} - Batch ${i + 1}`,
      base_branch: 'main',
      default_priority: 'medium',
      max_parallel: Math.min(4, batch.length),
      tasks: batch.map(taskToSwarmTask),
    };
    
    const filename = `${epicId}-batch-${String(i + 1).padStart(2, '0')}.yaml`;
    const savedPath = saveManifest(basePath, manifest, filename);
    
    if (savedPath) {
      savedPaths.push(savedPath);
    }
  }
  
  return savedPaths;
}

