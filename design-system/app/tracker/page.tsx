'use client';

import React, { useState } from 'react';
import { EpicOverview, type EpicCardProps } from '@/components/tracker/EpicOverview';
import { AtomicTaskList, type AtomicTask } from '@/components/tracker/AtomicTaskList';
import { ToolingStatus, type ToolingStatusProps } from '@/components/tracker/ToolingStatus';
import { TDDDashboard, type TDDDashboardProps } from '@/components/tracker/TDDDashboard';
import { DependencyTimeline, type TimelineEpic } from '@/components/tracker/DependencyTimeline';

// =============================================================================
// Mock Data (Replace with actual tracker state loading)
// =============================================================================

const mockEpics: EpicCardProps[] = [
  {
    epicId: 'epic-00',
    epicName: 'Foundation',
    percentage: 35,
    status: 'in-progress',
    blockers: [],
    metrics: { totalTasks: 247, completedTasks: 86, testCoverage: 89 },
    currentFocus: 'auth-system',
  },
  {
    epicId: 'epic-01',
    epicName: 'Mira',
    percentage: 0,
    status: 'blocked',
    blockers: ['epic-00'],
    metrics: { totalTasks: 189, completedTasks: 0 },
  },
  {
    epicId: 'epic-1a',
    epicName: 'Crypto',
    percentage: 0,
    status: 'blocked',
    blockers: ['epic-00'],
    metrics: { totalTasks: 156, completedTasks: 0 },
  },
  {
    epicId: 'epic-1b',
    epicName: 'Karma',
    percentage: 0,
    status: 'blocked',
    blockers: ['epic-00'],
    metrics: { totalTasks: 98, completedTasks: 0 },
  },
  {
    epicId: 'epic-02',
    epicName: 'Humans',
    percentage: 0,
    status: 'blocked',
    blockers: ['epic-00', 'epic-01'],
    metrics: { totalTasks: 234, completedTasks: 0 },
  },
  {
    epicId: 'epic-03',
    epicName: 'Practices',
    percentage: 0,
    status: 'blocked',
    blockers: ['epic-00', 'epic-01'],
    metrics: { totalTasks: 178, completedTasks: 0 },
  },
  {
    epicId: 'epic-04',
    epicName: 'Discovery',
    percentage: 0,
    status: 'blocked',
    blockers: ['epic-00', 'epic-01', 'epic-02'],
    metrics: { totalTasks: 145, completedTasks: 0 },
  },
  {
    epicId: 'epic-05',
    epicName: 'Impact',
    percentage: 0,
    status: 'blocked',
    blockers: ['epic-00', 'epic-01'],
    metrics: { totalTasks: 112, completedTasks: 0 },
  },
  {
    epicId: 'epic-06',
    epicName: 'Business',
    percentage: 0,
    status: 'blocked',
    blockers: ['epic-00', 'epic-01', 'epic-02'],
    metrics: { totalTasks: 201, completedTasks: 0 },
  },
  {
    epicId: 'epic-07',
    epicName: 'Community',
    percentage: 0,
    status: 'blocked',
    blockers: ['epic-03', 'epic-04', 'epic-06'],
    metrics: { totalTasks: 167, completedTasks: 0 },
  },
  {
    epicId: 'epic-08',
    epicName: 'Monetization',
    percentage: 0,
    status: 'blocked',
    blockers: ['epic-06', 'epic-07'],
    metrics: { totalTasks: 134, completedTasks: 0 },
  },
];

const mockTasks: AtomicTask[] = [
  { id: '1', type: 'endpoint', name: 'POST /api/auth/signup', subTask: 'implementation', status: 'complete', epic: 'epic-00', feature: 'auth-system', pr: 145, tests: { passing: 5, failing: 0 }, coverage: 94 },
  { id: '2', type: 'endpoint', name: 'POST /api/auth/verify', status: 'in-progress', assignedTo: 'cursor', epic: 'epic-00', feature: 'auth-system', tests: { passing: 3, failing: 2 }, coverage: 67 },
  { id: '3', type: 'endpoint', name: 'POST /api/auth/login', subTask: 'tests-unit', status: 'pending', epic: 'epic-00', feature: 'auth-system' },
  { id: '4', type: 'service', name: 'AuthService_signup', status: 'complete', epic: 'epic-00', feature: 'auth-system', coverage: 92 },
  { id: '5', type: 'service', name: 'AuthService_verify', status: 'in-progress', epic: 'epic-00', feature: 'auth-system' },
  { id: '6', type: 'table', name: 'profiles', subTask: 'schema', status: 'complete', epic: 'epic-00', feature: 'database-setup' },
  { id: '7', type: 'table', name: 'profiles', subTask: 'rls', status: 'complete', epic: 'epic-00', feature: 'database-setup' },
  { id: '8', type: 'table', name: 'sessions', subTask: 'schema', status: 'complete', epic: 'epic-00', feature: 'database-setup' },
  { id: '9', type: 'table', name: 'sessions', subTask: 'rls', status: 'pending', epic: 'epic-00', feature: 'database-setup' },
  { id: '10', type: 'component', name: 'LoginForm', status: 'pending', epic: 'epic-00', feature: 'auth-system' },
];

const mockTooling: ToolingStatusProps = {
  lastValidated: new Date().toISOString(),
  aiCodingConfig: { installed: true, version: '2.0.0', architecture: 'v2-cross-tool' },
  rules: {
    totalAvailable: 45,
    categories: {
      core: [
        { name: 'autonomous-development-workflow.mdc', path: 'rules/autonomous-development-workflow.mdc' },
        { name: 'git-interaction.mdc', path: 'rules/git-interaction.mdc', alwaysApply: true },
        { name: 'git-commit-message.mdc', path: 'rules/git-commit-message.mdc' },
      ],
      frontend: [
        { name: 'react-components.mdc', path: 'rules/frontend/react-components.mdc', loadedInSession: true },
        { name: 'typescript-coding-standards.mdc', path: 'rules/typescript-coding-standards.mdc', loadedInSession: true },
      ],
      python: [
        { name: 'python-coding-standards.mdc', path: 'rules/python/python-coding-standards.mdc' },
      ],
    },
  },
  commands: [
    // Development Tracker Commands
    { name: '/track-init', path: '.claude/commands/track-init.md', description: 'Initialize Development Tracker', usageCount: 1 },
    { name: '/track-start', path: '.claude/commands/track-start.md', description: 'Start Tracked Work', usageCount: 3 },
    { name: '/track-complete', path: '.claude/commands/track-complete.md', description: 'Complete Tracked Task', usageCount: 8 },
    { name: '/track-status', path: '.claude/commands/track-status.md', description: 'Display Development Progress', usageCount: 12 },
    { name: '/track-validate', path: '.claude/commands/track-validate.md', description: 'Validate Tooling Health', usageCount: 2 },
    { name: '/track-resume', path: '.claude/commands/track-resume.md', description: 'Resume from Checkpoint', usageCount: 1 },
    { name: '/track-manifest', path: '.claude/commands/track-manifest.md', description: 'Generate Swarm Work Manifest', usageCount: 0 },
    // Core Workflow Commands
    { name: '/load-rules', path: '.claude/commands/load-rules.md', description: 'Load relevant coding rules for the current task', usageCount: 5 },
    { name: '/autotask', path: '.claude/commands/autotask.md', description: 'Execute complete development task autonomously from description to PR-ready', usageCount: 4 },
    { name: '/troubleshoot', path: '.claude/commands/troubleshoot.md', description: 'Autonomous production error resolution system (Sentry/HoneyBadger)', usageCount: 2 },
    { name: '/create-prompt', path: '.claude/commands/create-prompt.md', description: 'Create optimized prompts for complex tasks', usageCount: 3 },
    { name: '/handoff-context', path: '.claude/commands/handoff-context.md', description: 'Generate comprehensive context handoff for new sessions', usageCount: 1 },
    // Setup & Configuration Commands
    { name: '/ai-coding-config', path: '.claude/commands/ai-coding-config.md', description: 'Set up, update, or add AI coding configurations', usageCount: 2 },
    { name: '/setup-environment', path: '.claude/commands/setup-environment.md', description: 'Initialize development environment for git worktree', usageCount: 1 },
    { name: '/personality-change', path: '.claude/commands/personality-change.md', description: 'Change or activate a personality for Cursor and Claude Code', usageCount: 0 },
    { name: '/generate-AGENTS-file', path: '.claude/commands/generate-AGENTS-file.md', description: 'Generate or update AGENTS.md with project context', usageCount: 1 },
    { name: '/product-intel', path: '.claude/commands/product-intel.md', description: 'Run comprehensive product intelligence research on competitors', usageCount: 0 },
  ],
  agents: [
    // VIBEUP Divine Agent Collective
    { name: 'Mira', path: '.claude/agents/mira.md', status: 'available', model: 'sonnet', description: 'AI Companion - Consciousness Platform Guidance' },
    { name: 'Sophia', path: '.claude/agents/sophia.md', status: 'available', model: 'opus', description: 'Divine Wisdom - Architecture & Design' },
    { name: 'Brighid', path: '.claude/agents/brighid.md', status: 'available', model: 'sonnet', description: 'Sacred Craft - Feature Development' },
    { name: 'Arjuna', path: '.claude/agents/arjuna.md', status: 'available', model: 'sonnet', description: 'Warrior Consciousness - Testing & Quality' },
    { name: 'Kuan Yin', path: '.claude/agents/kuan-yin.md', status: 'available', model: 'opus', description: 'Divine Compassion - Debugging & Refactoring' },
    { name: 'Gaia', path: '.claude/agents/gaia.md', status: 'available', model: 'sonnet', description: 'Earth Mother - Infrastructure & DevOps' },
    { name: 'Akasha', path: '.claude/agents/akasha.md', status: 'available', model: 'sonnet', description: 'Ethereal Bridge - API & Integration' },
  ],
  gitHooks: { huskyInstalled: true, preCommitConfigured: true, prePushConfigured: true },
  coverageGate: 'passing',
  issues: [],
};

const mockTDD: TDDDashboardProps = {
  coverage: [
    { layer: 'Service Layer', current: 91.2, threshold: 90, trend: 'increasing' },
    { layer: 'API Routes', current: 87.5, threshold: 85, trend: 'stable' },
    { layer: 'Components', current: 72.3, threshold: 75, trend: 'increasing' },
    { layer: 'Utils & Helpers', current: 96.1, threshold: 95, trend: 'stable' },
  ],
  recentTests: [
    { name: 'should hash password before storing', path: 'tests/api/auth/signup.test.ts', status: 'passing', duration: '45ms' },
    { name: 'should handle expired magic links', path: 'tests/api/auth/verify.test.ts', status: 'failing', error: 'Expected 401, received 500' },
    { name: 'should rate limit verification attempts', path: 'tests/api/auth/verify.test.ts', status: 'failing', error: 'Rate limiter not implemented' },
    { name: 'should send verification email', path: 'tests/api/auth/signup.test.ts', status: 'passing', duration: '120ms' },
  ],
  cycleState: { phase: 'red', testsWritten: 47, testsPassing: 42, testsFailing: 5, testsSkipped: 0 },
  overallCoverage: 86.8,
};

const mockTimeline: TimelineEpic[] = mockEpics.map(e => ({
  id: e.epicId,
  name: e.epicName,
  status: e.status,
  percentage: e.percentage,
  blockedBy: e.blockers,
  blocks: [],
}));

// =============================================================================
// Tab Navigation
// =============================================================================

type TabId = 'overview' | 'tasks' | 'tooling' | 'tdd' | 'timeline';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'overview', label: 'Epic Overview', icon: '📊' },
  { id: 'tasks', label: 'Tasks', icon: '📋' },
  { id: 'tdd', label: 'TDD', icon: '🧪' },
  { id: 'tooling', label: 'Tooling', icon: '🔧' },
  { id: 'timeline', label: 'Timeline', icon: '📅' },
];

// =============================================================================
// Tracker Page Component
// =============================================================================

export default function TrackerPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [selectedEpic, setSelectedEpic] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                VIBEUP Tracker
              </h1>
              <p className="text-sm text-zinc-500">Development & Deployment Tracking</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-500">
                Last updated: {new Date().toLocaleTimeString()}
              </span>
              <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-lg transition-colors">
                Refresh
              </button>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <nav className="flex gap-1 mt-4 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-t-lg transition-colors
                  ${activeTab === tab.id
                    ? 'bg-zinc-800 text-amber-400 border-b-2 border-amber-400'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'overview' && (
          <EpicOverview
            epics={mockEpics}
            onEpicClick={(epicId) => {
              setSelectedEpic(epicId);
              setActiveTab('tasks');
            }}
          />
        )}
        
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {selectedEpic && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedEpic(null)}
                  className="text-sm text-amber-400 hover:text-amber-300"
                >
                  ← All Tasks
                </button>
                <span className="text-zinc-500">|</span>
                <span className="text-sm text-zinc-400">
                  Filtered: {selectedEpic}
                </span>
              </div>
            )}
            <AtomicTaskList
              tasks={selectedEpic 
                ? mockTasks.filter(t => t.epic === selectedEpic)
                : mockTasks
              }
              onTaskClick={(taskId) => console.log('Task clicked:', taskId)}
            />
          </div>
        )}
        
        {activeTab === 'tdd' && (
          <TDDDashboard {...mockTDD} />
        )}
        
        {activeTab === 'tooling' && (
          <ToolingStatus {...mockTooling} />
        )}
        
        {activeTab === 'timeline' && (
          <DependencyTimeline epics={mockTimeline} />
        )}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-zinc-800 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-zinc-600">
          VIBEUP Development Tracker • Powered by ai-coding-config
        </div>
      </footer>
    </div>
  );
}

