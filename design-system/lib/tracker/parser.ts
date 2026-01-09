/**
 * VIBEUP Development Tracker - Epic Spec Parser
 * Extract atomic tasks from markdown specification files
 */

import * as fs from 'fs';
import * as path from 'path';
import type {
  Epic,
  Feature,
  TableTask,
  EndpointTask,
  ServiceTask,
  ComponentTask,
  AtomicTask,
  EpicId,
} from './types';
import { EPIC_IDS, EPIC_NAMES, EPIC_SPEC_FILES, EPIC_DEPENDENCIES } from './types';

// =============================================================================
// Types
// =============================================================================

interface ParsedTable {
  name: string;
  hasRls: boolean;
  hasIndexes: boolean;
  hasMigration: boolean;
  hasSeedData: boolean;
}

interface ParsedEndpoint {
  name: string;
  method: string;
  path: string;
  hasValidation: boolean;
  hasTests: boolean;
  hasDocumentation: boolean;
}

interface ParsedService {
  name: string;
  methods: string[];
}

interface ParsedComponent {
  name: string;
  hasTests: boolean;
  hasStorybook: boolean;
  hasAccessibility: boolean;
}

interface ParsedFeature {
  name: string;
  description: string;
  tables: ParsedTable[];
  endpoints: ParsedEndpoint[];
  services: ParsedService[];
  components: ParsedComponent[];
}

interface ParsedEpic {
  epicId: EpicId;
  epicName: string;
  specFile: string;
  features: ParsedFeature[];
}

// =============================================================================
// Parsing Utilities
// =============================================================================

function extractTables(content: string): ParsedTable[] {
  const tables: ParsedTable[] = [];
  
  // Pattern 1: SQL CREATE TABLE statements
  const createTableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:public\.)?(\w+)/gi;
  let match;
  while ((match = createTableRegex.exec(content)) !== null) {
    const tableName = match[1];
    if (!tables.find(t => t.name === tableName)) {
      tables.push({
        name: tableName,
        hasRls: content.includes(`ENABLE ROW LEVEL SECURITY`) || 
                content.toLowerCase().includes(`rls`) ||
                content.includes(`policy`),
        hasIndexes: content.includes(`CREATE INDEX`) || 
                   content.includes(`CREATE UNIQUE INDEX`),
        hasMigration: true, // Assume migration needed for all tables
        hasSeedData: content.toLowerCase().includes('seed') || 
                     content.toLowerCase().includes('insert into'),
      });
    }
  }
  
  // Pattern 2: Table names in markdown tables
  const tableListRegex = /\|\s*`?(\w+)`?\s*\|.*\|.*\|/g;
  while ((match = tableListRegex.exec(content)) !== null) {
    const tableName = match[1].toLowerCase();
    // Filter out header-like entries
    if (!['table', 'name', 'field', 'column', 'type', 'description'].includes(tableName)) {
      if (!tables.find(t => t.name === tableName)) {
        tables.push({
          name: tableName,
          hasRls: true,
          hasIndexes: true,
          hasMigration: true,
          hasSeedData: false,
        });
      }
    }
  }
  
  // Pattern 3: Table names mentioned in schema sections
  const schemaSection = content.match(/##.*(?:schema|database|tables)[\s\S]*?(?=##|$)/gi);
  if (schemaSection) {
    for (const section of schemaSection) {
      const tableNameRegex = /(?:table|entity):\s*`?(\w+)`?/gi;
      while ((match = tableNameRegex.exec(section)) !== null) {
        const tableName = match[1];
        if (!tables.find(t => t.name === tableName)) {
          tables.push({
            name: tableName,
            hasRls: true,
            hasIndexes: true,
            hasMigration: true,
            hasSeedData: false,
          });
        }
      }
    }
  }
  
  return tables;
}

function extractEndpoints(content: string): ParsedEndpoint[] {
  const endpoints: ParsedEndpoint[] = [];
  
  // Pattern 1: REST-style endpoint definitions
  const endpointRegex = /(GET|POST|PUT|PATCH|DELETE)\s+[`"]?([\/\w\-\{\}:]+)[`"]?/gi;
  let match;
  while ((match = endpointRegex.exec(content)) !== null) {
    const method = match[1].toUpperCase();
    const endpointPath = match[2];
    const name = `${method.toLowerCase()}_${endpointPath.replace(/[\/\-\{\}:]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '')}`;
    
    if (!endpoints.find(e => e.name === name)) {
      endpoints.push({
        name,
        method,
        path: endpointPath,
        hasValidation: true,
        hasTests: true,
        hasDocumentation: true,
      });
    }
  }
  
  // Pattern 2: API route file paths
  const routeFileRegex = /app\/api\/([\/\w\-]+)\/route\.ts/gi;
  while ((match = routeFileRegex.exec(content)) !== null) {
    const routePath = match[1];
    const name = `api_${routePath.replace(/\//g, '_')}`;
    
    if (!endpoints.find(e => e.name === name)) {
      endpoints.push({
        name,
        method: 'MIXED',
        path: `/api/${routePath}`,
        hasValidation: true,
        hasTests: true,
        hasDocumentation: true,
      });
    }
  }
  
  return endpoints;
}

function extractServices(content: string): ParsedService[] {
  const services: ParsedService[] = [];
  
  // Pattern 1: Service class definitions
  const serviceClassRegex = /(?:class|interface)\s+(\w*Service\w*)/gi;
  let match;
  while ((match = serviceClassRegex.exec(content)) !== null) {
    const serviceName = match[1];
    if (!services.find(s => s.name === serviceName)) {
      // Try to find methods for this service
      const methods: string[] = [];
      const methodRegex = new RegExp(`${serviceName}[\\s\\S]*?(?:async\\s+)?(\\w+)\\s*\\(`, 'gi');
      let methodMatch;
      while ((methodMatch = methodRegex.exec(content)) !== null) {
        if (!methods.includes(methodMatch[1])) {
          methods.push(methodMatch[1]);
        }
      }
      
      services.push({
        name: serviceName,
        methods: methods.length > 0 ? methods : ['execute'],
      });
    }
  }
  
  // Pattern 2: Service file mentions
  const serviceFileRegex = /(?:lib|services)\/(\w+)\.ts/gi;
  while ((match = serviceFileRegex.exec(content)) !== null) {
    const serviceName = match[1];
    if (!services.find(s => s.name.toLowerCase() === serviceName.toLowerCase())) {
      services.push({
        name: `${serviceName.charAt(0).toUpperCase()}${serviceName.slice(1)}Service`,
        methods: ['execute'],
      });
    }
  }
  
  return services;
}

function extractComponents(content: string): ParsedComponent[] {
  const components: ParsedComponent[] = [];
  
  // Pattern 1: React component definitions
  const componentRegex = /(?:function|const)\s+(\w+)(?:\s*:\s*React\.FC|\s*=\s*\()/gi;
  let match;
  while ((match = componentRegex.exec(content)) !== null) {
    const componentName = match[1];
    // Filter out non-component names
    if (componentName[0] === componentName[0].toUpperCase() && 
        !['Props', 'State', 'Context', 'Provider'].some(s => componentName.endsWith(s))) {
      if (!components.find(c => c.name === componentName)) {
        components.push({
          name: componentName,
          hasTests: true,
          hasStorybook: true,
          hasAccessibility: true,
        });
      }
    }
  }
  
  // Pattern 2: Component file paths
  const componentFileRegex = /components\/(?:[\w\/]+\/)?(\w+)\.tsx/gi;
  while ((match = componentFileRegex.exec(content)) !== null) {
    const componentName = match[1];
    if (componentName[0] === componentName[0].toUpperCase()) {
      if (!components.find(c => c.name === componentName)) {
        components.push({
          name: componentName,
          hasTests: true,
          hasStorybook: true,
          hasAccessibility: true,
        });
      }
    }
  }
  
  // Pattern 3: Component names in lists
  const componentListRegex = /[-*]\s+`?(\w+)`?\s*(?:component|page|screen)/gi;
  while ((match = componentListRegex.exec(content)) !== null) {
    const componentName = match[1];
    if (!components.find(c => c.name === componentName)) {
      components.push({
        name: componentName,
        hasTests: true,
        hasStorybook: true,
        hasAccessibility: true,
      });
    }
  }
  
  return components;
}

function extractFeatures(content: string, epicId: string): ParsedFeature[] {
  const features: ParsedFeature[] = [];
  
  // Split content by H2 headers (## Feature Name)
  const sections = content.split(/(?=^## )/gm);
  
  for (const section of sections) {
    if (!section.trim()) continue;
    
    // Extract feature name from H2 header
    const headerMatch = section.match(/^## (.+?)(?:\n|$)/);
    if (!headerMatch) continue;
    
    const featureName = headerMatch[1]
      .replace(/[^\w\s-]/g, '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');
    
    // Skip non-feature sections
    const skipPatterns = [
      'overview', 'introduction', 'summary', 'dependencies',
      'success-criteria', 'testing', 'deployment', 'references',
      'appendix', 'glossary', 'changelog', 'version'
    ];
    
    if (skipPatterns.some(p => featureName.includes(p))) continue;
    
    // Extract description (first paragraph after header)
    const descMatch = section.match(/^## .+?\n\n(.+?)(?:\n\n|$)/s);
    const description = descMatch ? descMatch[1].trim() : '';
    
    // Extract atomic tasks from this section
    const tables = extractTables(section);
    const endpoints = extractEndpoints(section);
    const services = extractServices(section);
    const components = extractComponents(section);
    
    // Only add feature if it has some content
    if (tables.length > 0 || endpoints.length > 0 || 
        services.length > 0 || components.length > 0) {
      features.push({
        name: featureName,
        description,
        tables,
        endpoints,
        services,
        components,
      });
    }
  }
  
  // If no features found, create a default "core" feature
  if (features.length === 0) {
    const tables = extractTables(content);
    const endpoints = extractEndpoints(content);
    const services = extractServices(content);
    const components = extractComponents(content);
    
    if (tables.length > 0 || endpoints.length > 0 || 
        services.length > 0 || components.length > 0) {
      features.push({
        name: 'core',
        description: `Core functionality for ${epicId}`,
        tables,
        endpoints,
        services,
        components,
      });
    }
  }
  
  return features;
}

// =============================================================================
// Main Parser
// =============================================================================

export function parseEpicSpec(basePath: string, epicId: EpicId): ParsedEpic | null {
  const specPath = path.join(basePath, EPIC_SPEC_FILES[epicId]);
  
  if (!fs.existsSync(specPath)) {
    console.warn(`Epic spec file not found: ${specPath}`);
    return null;
  }
  
  const content = fs.readFileSync(specPath, 'utf-8');
  const features = extractFeatures(content, epicId);
  
  return {
    epicId,
    epicName: EPIC_NAMES[epicId],
    specFile: EPIC_SPEC_FILES[epicId],
    features,
  };
}

export function parseAllEpicSpecs(basePath: string): Map<EpicId, ParsedEpic> {
  const parsed = new Map<EpicId, ParsedEpic>();
  
  for (const epicId of EPIC_IDS) {
    const result = parseEpicSpec(basePath, epicId);
    if (result) {
      parsed.set(epicId, result);
    }
  }
  
  return parsed;
}

// =============================================================================
// Conversion to Tracker State
// =============================================================================

function createAtomicTask(status: 'pending' = 'pending'): AtomicTask {
  return { status };
}

function convertTable(table: ParsedTable): TableTask {
  return {
    schema: createAtomicTask(),
    rls_policies: table.hasRls ? createAtomicTask() : undefined,
    indexes: table.hasIndexes ? createAtomicTask() : undefined,
    migrations: table.hasMigration ? createAtomicTask() : undefined,
    seed_data: table.hasSeedData ? createAtomicTask() : undefined,
  };
}

function convertEndpoint(endpoint: ParsedEndpoint): EndpointTask {
  return {
    implementation: createAtomicTask(),
    validation: endpoint.hasValidation ? createAtomicTask() : undefined,
    tests_unit: endpoint.hasTests ? { ...createAtomicTask(), count: 0 } : undefined,
    tests_integration: endpoint.hasTests ? { ...createAtomicTask(), count: 0 } : undefined,
    documentation: endpoint.hasDocumentation ? createAtomicTask() : undefined,
  };
}

function convertService(service: ParsedService): Record<string, ServiceTask> {
  const result: Record<string, ServiceTask> = {};
  
  for (const method of service.methods) {
    result[`${service.name}_${method}`] = {
      implementation: createAtomicTask(),
      unit_tests: { ...createAtomicTask(), count: 0, coverage: 0 },
    };
  }
  
  return result;
}

function convertComponent(component: ParsedComponent): ComponentTask {
  return {
    implementation: createAtomicTask(),
    styling: createAtomicTask(),
    accessibility: component.hasAccessibility ? createAtomicTask() : undefined,
    tests: component.hasTests ? { ...createAtomicTask(), count: 0 } : undefined,
    storybook: component.hasStorybook ? createAtomicTask() : undefined,
  };
}

function convertFeature(parsedFeature: ParsedFeature): Feature {
  const feature: Feature = {
    status: 'not-started',
    percentage: 0,
    description: parsedFeature.description,
  };
  
  // Convert tables
  if (parsedFeature.tables.length > 0) {
    feature.tables = {};
    for (const table of parsedFeature.tables) {
      feature.tables[table.name] = convertTable(table);
    }
  }
  
  // Convert endpoints
  if (parsedFeature.endpoints.length > 0) {
    feature.endpoints = {};
    for (const endpoint of parsedFeature.endpoints) {
      feature.endpoints[endpoint.name] = convertEndpoint(endpoint);
    }
  }
  
  // Convert services
  if (parsedFeature.services.length > 0) {
    feature.services = {};
    for (const service of parsedFeature.services) {
      Object.assign(feature.services, convertService(service));
    }
  }
  
  // Convert components
  if (parsedFeature.components.length > 0) {
    feature.components = {};
    for (const component of parsedFeature.components) {
      feature.components[component.name] = convertComponent(component);
    }
  }
  
  return feature;
}

export function convertParsedEpicToState(parsed: ParsedEpic): Epic {
  const features: Record<string, Feature> = {};
  
  for (const parsedFeature of parsed.features) {
    features[parsedFeature.name] = convertFeature(parsedFeature);
  }
  
  // Calculate initial metrics
  let totalTasks = 0;
  for (const feature of Object.values(features)) {
    // Count all atomic tasks
    if (feature.tables) {
      totalTasks += Object.keys(feature.tables).length * 5; // schema, rls, indexes, migrations, seed
    }
    if (feature.endpoints) {
      totalTasks += Object.keys(feature.endpoints).length * 5; // impl, validation, unit, integration, docs
    }
    if (feature.services) {
      totalTasks += Object.keys(feature.services).length * 2; // impl, tests
    }
    if (feature.components) {
      totalTasks += Object.keys(feature.components).length * 5; // impl, styling, a11y, tests, storybook
    }
  }
  
  return {
    epicId: parsed.epicId,
    epicName: parsed.epicName,
    specFile: parsed.specFile,
    status: 'not-started',
    metrics: {
      totalTasks,
      completedTasks: 0,
      inProgressTasks: 0,
      blockedTasks: 0,
      percentage: 0,
      testCoverage: 0,
      testsWritten: 0,
      testsPassing: 0,
    },
    features,
    toolingValidation: {
      lastCheck: new Date().toISOString(),
      rulesLoaded: [],
      rulesApplied: false,
      coverageGatePassing: false,
      tddEnforced: true,
    },
    dependencies: {
      blockedBy: EPIC_DEPENDENCIES[parsed.epicId] || [],
      blocks: [], // Will be computed by reverse lookup
    },
  };
}

// =============================================================================
// Reverse Dependency Calculation
// =============================================================================

export function calculateBlocksRelationships(epics: Map<string, Epic>): void {
  // Clear existing blocks
  for (const epic of epics.values()) {
    epic.dependencies.blocks = [];
  }
  
  // Calculate blocks from blockedBy
  for (const [epicId, epic] of epics) {
    for (const blockedByEpic of epic.dependencies.blockedBy) {
      const blockingEpic = epics.get(blockedByEpic);
      if (blockingEpic && !blockingEpic.dependencies.blocks.includes(epicId)) {
        blockingEpic.dependencies.blocks.push(epicId);
      }
    }
  }
}

// =============================================================================
// Summary Functions
// =============================================================================

export interface ParseSummary {
  epicId: string;
  epicName: string;
  featuresCount: number;
  tablesCount: number;
  endpointsCount: number;
  servicesCount: number;
  componentsCount: number;
  totalTasks: number;
}

export function getEpicParseSummary(parsed: ParsedEpic): ParseSummary {
  let tablesCount = 0;
  let endpointsCount = 0;
  let servicesCount = 0;
  let componentsCount = 0;
  
  for (const feature of parsed.features) {
    tablesCount += feature.tables.length;
    endpointsCount += feature.endpoints.length;
    servicesCount += feature.services.length;
    componentsCount += feature.components.length;
  }
  
  // Estimate total atomic tasks
  const totalTasks = 
    (tablesCount * 5) + // schema, rls, indexes, migrations, seed
    (endpointsCount * 5) + // impl, validation, unit, integration, docs
    (servicesCount * 2) + // impl, tests
    (componentsCount * 5); // impl, styling, a11y, tests, storybook
  
  return {
    epicId: parsed.epicId,
    epicName: parsed.epicName,
    featuresCount: parsed.features.length,
    tablesCount,
    endpointsCount,
    servicesCount,
    componentsCount,
    totalTasks,
  };
}

export function getAllEpicsParseSummary(parsed: Map<EpicId, ParsedEpic>): ParseSummary[] {
  return Array.from(parsed.values()).map(getEpicParseSummary);
}

