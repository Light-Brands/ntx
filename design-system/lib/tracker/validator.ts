/**
 * VIBEUP Development Tracker - Tooling Validator
 * Validates ai-coding-config installation, rules, commands, and agents
 */

import * as fs from 'fs';
import * as path from 'path';
import type {
  Tooling,
  RuleStatus,
  CommandStatus,
  AgentStatus,
  ValidationIssue,
  AiCodingConfigStatus,
  RulesConfig,
  CommandsConfig,
  AgentsConfig,
  GitHooksConfig,
} from './types';
import { readTooling, writeTooling } from './state';

// =============================================================================
// Constants
// =============================================================================

const RULES_DIR = 'rules';
const CURSOR_RULES_DIR = '.cursor/rules';
const CLAUDE_COMMANDS_DIR = '.claude/commands';
const CURSOR_COMMANDS_DIR = '.cursor/commands';
const CLAUDE_AGENTS_DIR = '.claude/agents';
const PLUGINS_DIR = 'plugins';
const AI_CODING_CONFIG_PATH = '~/.ai_coding_config';

const RULE_CATEGORIES = [
  'core',
  'frontend',
  'python',
  'django',
  'observability',
  'personalities',
  'ai',
] as const;

// =============================================================================
// File System Utilities
// =============================================================================

function expandHomePath(p: string): string {
  if (p.startsWith('~')) {
    return path.join(process.env.HOME || '', p.slice(1));
  }
  return p;
}

function isSymlink(p: string): boolean {
  try {
    return fs.lstatSync(p).isSymbolicLink();
  } catch {
    return false;
  }
}

function getSymlinkTarget(p: string): string | null {
  try {
    return fs.readlinkSync(p);
  } catch {
    return null;
  }
}

function findFiles(dir: string, pattern: RegExp): string[] {
  const results: string[] = [];
  
  if (!fs.existsSync(dir)) {
    return results;
  }
  
  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (pattern.test(entry.name)) {
        results.push(fullPath);
      }
    }
  }
  
  walk(dir);
  return results;
}

// =============================================================================
// Rule Parsing
// =============================================================================

interface RuleFrontmatter {
  description?: string;
  alwaysApply?: boolean;
  globs?: string[];
}

function parseRuleFrontmatter(content: string): RuleFrontmatter {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return {};
  }
  
  const frontmatter: RuleFrontmatter = {};
  const lines = frontmatterMatch[1].split('\n');
  
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim();
    
    if (key.trim() === 'description') {
      frontmatter.description = value.replace(/^["']|["']$/g, '');
    } else if (key.trim() === 'alwaysApply') {
      frontmatter.alwaysApply = value === 'true';
    }
  }
  
  return frontmatter;
}

function categorizeRule(rulePath: string): string {
  const relativePath = rulePath.toLowerCase();
  
  if (relativePath.includes('frontend') || relativePath.includes('react') || relativePath.includes('typescript')) {
    return 'frontend';
  }
  if (relativePath.includes('python') || relativePath.includes('celery') || relativePath.includes('pytest')) {
    return 'python';
  }
  if (relativePath.includes('django')) {
    return 'django';
  }
  if (relativePath.includes('observability') || relativePath.includes('logging') || relativePath.includes('honeybadger')) {
    return 'observability';
  }
  if (relativePath.includes('personalities') || relativePath.includes('bob-ross') || relativePath.includes('ron-swanson')) {
    return 'personalities';
  }
  if (relativePath.includes('/ai/') || relativePath.includes('agent') || relativePath.includes('prompt')) {
    return 'ai';
  }
  
  return 'core';
}

// =============================================================================
// Validation Functions
// =============================================================================

export function validateAiCodingConfig(basePath: string): AiCodingConfigStatus {
  const homeConfigPath = expandHomePath(AI_CODING_CONFIG_PATH);
  const installed = fs.existsSync(homeConfigPath);
  
  let version: string | undefined;
  let architecture: 'v1-cursor-first' | 'v2-cross-tool' = 'v2-cross-tool';
  const issues: string[] = [];
  
  // Check if rules/ is the canonical source (v2 architecture)
  const rulesDir = path.join(basePath, RULES_DIR);
  const cursorRulesDir = path.join(basePath, CURSOR_RULES_DIR);
  
  if (fs.existsSync(rulesDir)) {
    // v2 architecture - rules/ is canonical
    architecture = 'v2-cross-tool';
    
    if (fs.existsSync(cursorRulesDir)) {
      if (!isSymlink(cursorRulesDir)) {
        issues.push('.cursor/rules should be a symlink to rules/ in v2 architecture');
      }
    }
  } else if (fs.existsSync(cursorRulesDir)) {
    // v1 architecture - .cursor/rules is canonical
    architecture = 'v1-cursor-first';
  } else {
    issues.push('No rules directory found');
  }
  
  // Try to read version from package.json or similar
  const aiCodingConfigPackage = path.join(homeConfigPath, 'package.json');
  if (fs.existsSync(aiCodingConfigPackage)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(aiCodingConfigPackage, 'utf-8'));
      version = pkg.version;
    } catch {
      // Ignore parse errors
    }
  }
  
  return {
    installed,
    version,
    architecture,
    lastUpdated: installed ? fs.statSync(homeConfigPath).mtime.toISOString() : undefined,
    repoPath: installed ? homeConfigPath : undefined,
    issues,
  };
}

export function validateRules(basePath: string): RulesConfig {
  const rulesDir = path.join(basePath, RULES_DIR);
  const cursorRulesDir = path.join(basePath, CURSOR_RULES_DIR);
  
  // Use the appropriate rules directory
  const effectiveRulesDir = fs.existsSync(rulesDir) ? rulesDir : cursorRulesDir;
  
  const ruleFiles = findFiles(effectiveRulesDir, /\.mdc$/);
  const categories: Record<string, RuleStatus[]> = {};
  
  // Initialize categories
  for (const cat of RULE_CATEGORIES) {
    categories[cat] = [];
  }
  
  for (const ruleFile of ruleFiles) {
    try {
      const content = fs.readFileSync(ruleFile, 'utf-8');
      const frontmatter = parseRuleFrontmatter(content);
      const relativePath = path.relative(basePath, ruleFile);
      const category = categorizeRule(relativePath);
      
      const ruleStatus: RuleStatus = {
        name: path.basename(ruleFile),
        path: relativePath,
        alwaysApply: frontmatter.alwaysApply || false,
        description: frontmatter.description,
        loadedInSession: false,
        appliedCorrectly: true,
        loadCount: 0,
      };
      
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(ruleStatus);
    } catch (error) {
      console.error(`Error parsing rule ${ruleFile}:`, error);
    }
  }
  
  // Check symlink validity
  let cursorSymlinkValid = false;
  if (fs.existsSync(cursorRulesDir) && isSymlink(cursorRulesDir)) {
    const target = getSymlinkTarget(cursorRulesDir);
    cursorSymlinkValid = target !== null && fs.existsSync(path.resolve(path.dirname(cursorRulesDir), target));
  }
  
  return {
    totalAvailable: ruleFiles.length,
    discoveredAt: new Date().toISOString(),
    rulesDirectory: effectiveRulesDir,
    cursorSymlinkValid,
    categories,
  };
}

export function validateCommands(basePath: string): CommandsConfig {
  const claudeCommandsDir = path.join(basePath, CLAUDE_COMMANDS_DIR);
  const cursorCommandsDir = path.join(basePath, CURSOR_COMMANDS_DIR);
  
  const available: CommandStatus[] = [];
  
  // Find command files
  if (fs.existsSync(claudeCommandsDir)) {
    const commandFiles = findFiles(claudeCommandsDir, /\.md$/);
    
    for (const cmdFile of commandFiles) {
      const content = fs.readFileSync(cmdFile, 'utf-8');
      const relativePath = path.relative(basePath, cmdFile);
      
      // Extract command name from filename or content
      const fileName = path.basename(cmdFile, '.md');
      const name = `/${fileName}`;
      
      // Try to extract description
      let description: string | undefined;
      const descMatch = content.match(/^#\s*(.+)/m);
      if (descMatch) {
        description = descMatch[1].replace(/^\/\w+\s*-?\s*/, '').trim();
      }
      
      available.push({
        name,
        path: relativePath,
        description,
        usageCount: 0,
      });
    }
  }
  
  // Check cursor symlink
  let cursorSymlinkValid = false;
  if (fs.existsSync(cursorCommandsDir) && isSymlink(cursorCommandsDir)) {
    cursorSymlinkValid = true;
  }
  
  return {
    directory: claudeCommandsDir,
    cursorSymlinkValid,
    available,
  };
}

export function validateAgents(basePath: string): AgentsConfig {
  const claudeAgentsDir = path.join(basePath, CLAUDE_AGENTS_DIR);
  const available: AgentStatus[] = [];
  
  if (fs.existsSync(claudeAgentsDir)) {
    const agentFiles = findFiles(claudeAgentsDir, /\.md$/);
    
    for (const agentFile of agentFiles) {
      try {
        const content = fs.readFileSync(agentFile, 'utf-8');
        const relativePath = path.relative(basePath, agentFile);
        
        // Parse frontmatter for agent info
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        let name = path.basename(agentFile, '.md');
        let description: string | undefined;
        let model: string | undefined;
        let tools: string[] = [];
        
        if (frontmatterMatch) {
          const lines = frontmatterMatch[1].split('\n');
          for (const line of lines) {
            const [key, ...valueParts] = line.split(':');
            const value = valueParts.join(':').trim();
            
            if (key.trim() === 'name') {
              name = value.replace(/^["']|["']$/g, '');
            } else if (key.trim() === 'description') {
              description = value.replace(/^["']|["']$/g, '');
            } else if (key.trim() === 'model') {
              model = value;
            } else if (key.trim() === 'tools') {
              tools = value.split(',').map(t => t.trim());
            }
          }
        }
        
        available.push({
          name,
          path: relativePath,
          description,
          status: 'available',
          model,
          tools: tools.length > 0 ? tools : undefined,
          invocationCount: 0,
        });
      } catch (error) {
        console.error(`Error parsing agent ${agentFile}:`, error);
      }
    }
  }
  
  // Also check plugins for agents
  const pluginsDir = path.join(basePath, PLUGINS_DIR);
  if (fs.existsSync(pluginsDir)) {
    const pluginAgentFiles = findFiles(pluginsDir, /\.md$/);
    
    for (const agentFile of pluginAgentFiles) {
      if (agentFile.includes('agents')) {
        try {
          const content = fs.readFileSync(agentFile, 'utf-8');
          const relativePath = path.relative(basePath, agentFile);
          const name = path.basename(agentFile, '.md');
          
          // Check if not already added
          if (!available.find(a => a.name === name)) {
            available.push({
              name,
              path: relativePath,
              status: 'available',
              invocationCount: 0,
            });
          }
        } catch (error) {
          console.error(`Error parsing plugin agent ${agentFile}:`, error);
        }
      }
    }
  }
  
  return {
    directory: claudeAgentsDir,
    available,
  };
}

export function validateGitHooks(basePath: string): GitHooksConfig {
  const huskyDir = path.join(basePath, '.husky');
  const huskyInstalled = fs.existsSync(huskyDir);
  
  const preCommitHook = path.join(huskyDir, 'pre-commit');
  const prePushHook = path.join(huskyDir, 'pre-push');
  
  const preCommitConfigured = fs.existsSync(preCommitHook);
  const prePushConfigured = fs.existsSync(prePushHook);
  
  // Check if hooks are executable
  let hooksWorking = false;
  if (preCommitConfigured) {
    try {
      const stats = fs.statSync(preCommitHook);
      hooksWorking = (stats.mode & 0o111) !== 0; // Check if executable
    } catch {
      hooksWorking = false;
    }
  }
  
  return {
    huskyInstalled,
    preCommitConfigured,
    prePushConfigured,
    hooksWorking,
    lastVerified: new Date().toISOString(),
  };
}

// =============================================================================
// Full Validation
// =============================================================================

export interface ValidationResult {
  tooling: Tooling;
  issues: ValidationIssue[];
  summary: {
    aiCodingConfigOk: boolean;
    rulesOk: boolean;
    commandsOk: boolean;
    agentsOk: boolean;
    gitHooksOk: boolean;
    overallOk: boolean;
  };
}

export function performFullValidation(basePath: string): ValidationResult {
  const issues: ValidationIssue[] = [];
  
  // Validate each component
  const aiCodingConfig = validateAiCodingConfig(basePath);
  const rules = validateRules(basePath);
  const commands = validateCommands(basePath);
  const agents = validateAgents(basePath);
  const gitHooks = validateGitHooks(basePath);
  
  // Collect issues
  if (!aiCodingConfig.installed) {
    issues.push({
      rule: 'ai-coding-config',
      issue: 'ai-coding-config not installed in ~/.ai_coding_config',
      severity: 'warning',
    });
  }
  
  for (const issue of aiCodingConfig.issues || []) {
    issues.push({
      rule: 'ai-coding-config',
      issue,
      severity: 'warning',
    });
  }
  
  if (rules.totalAvailable === 0) {
    issues.push({
      rule: 'rules',
      issue: 'No rules found in rules/ directory',
      severity: 'error',
    });
  }
  
  if (!rules.cursorSymlinkValid && fs.existsSync(path.join(basePath, CURSOR_RULES_DIR))) {
    issues.push({
      rule: 'rules',
      issue: '.cursor/rules should be a symlink to rules/',
      severity: 'warning',
    });
  }
  
  if (commands.available.length === 0) {
    issues.push({
      rule: 'commands',
      issue: 'No commands found in .claude/commands/',
      severity: 'warning',
    });
  }
  
  if (agents.available.length === 0) {
    issues.push({
      rule: 'agents',
      issue: 'No agents found in .claude/agents/',
      severity: 'warning',
    });
  }
  
  if (!gitHooks.huskyInstalled) {
    issues.push({
      rule: 'git-hooks',
      issue: 'Husky not installed',
      severity: 'info',
    });
  }
  
  // Build tooling state
  const tooling: Tooling = {
    version: '1.0',
    lastValidated: new Date().toISOString(),
    aiCodingConfig,
    rules,
    commands,
    agents,
    gitHooks,
    validationHistory: [],
  };
  
  // Read existing tooling to preserve history
  const existingTooling = readTooling(basePath);
  if (existingTooling?.validationHistory) {
    tooling.validationHistory = [
      {
        timestamp: new Date().toISOString(),
        rulesLoaded: rules.totalAvailable,
        rulesApplied: rules.totalAvailable,
        issues,
      },
      ...existingTooling.validationHistory.slice(0, 9), // Keep last 10
    ];
  } else {
    tooling.validationHistory = [{
      timestamp: new Date().toISOString(),
      rulesLoaded: rules.totalAvailable,
      rulesApplied: rules.totalAvailable,
      issues,
    }];
  }
  
  // Calculate summary
  const summary = {
    aiCodingConfigOk: aiCodingConfig.issues?.length === 0,
    rulesOk: rules.totalAvailable > 0,
    commandsOk: commands.available.length > 0,
    agentsOk: agents.available.length > 0,
    gitHooksOk: gitHooks.huskyInstalled && gitHooks.preCommitConfigured,
    overallOk: false,
  };
  
  summary.overallOk = summary.rulesOk && summary.commandsOk && summary.agentsOk;
  
  return {
    tooling,
    issues,
    summary,
  };
}

export function saveValidationResult(basePath: string, result: ValidationResult): boolean {
  return writeTooling(basePath, result.tooling);
}

// =============================================================================
// Rule Loading Tracking
// =============================================================================

export function markRuleLoaded(basePath: string, ruleName: string): void {
  const tooling = readTooling(basePath);
  if (!tooling) return;
  
  for (const category of Object.values(tooling.rules.categories)) {
    for (const rule of category) {
      if (rule.name === ruleName || rule.path.endsWith(ruleName)) {
        rule.loadedInSession = true;
        rule.lastLoaded = new Date().toISOString();
        rule.loadCount = (rule.loadCount || 0) + 1;
      }
    }
  }
  
  writeTooling(basePath, tooling);
}

export function markRulesLoaded(basePath: string, ruleNames: string[]): void {
  for (const ruleName of ruleNames) {
    markRuleLoaded(basePath, ruleName);
  }
}

export function getLoadedRules(basePath: string): string[] {
  const tooling = readTooling(basePath);
  if (!tooling) return [];
  
  const loaded: string[] = [];
  
  for (const category of Object.values(tooling.rules.categories)) {
    for (const rule of category) {
      if (rule.loadedInSession) {
        loaded.push(rule.name);
      }
    }
  }
  
  return loaded;
}

export function getAlwaysApplyRules(basePath: string): string[] {
  const tooling = readTooling(basePath);
  if (!tooling) return [];
  
  const alwaysApply: string[] = [];
  
  for (const category of Object.values(tooling.rules.categories)) {
    for (const rule of category) {
      if (rule.alwaysApply) {
        alwaysApply.push(rule.name);
      }
    }
  }
  
  return alwaysApply;
}

