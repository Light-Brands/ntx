'use client';

import React, { useState } from 'react';

// =============================================================================
// Types
// =============================================================================

export interface RuleStatus {
  name: string;
  path: string;
  alwaysApply?: boolean;
  loadedInSession?: boolean;
  appliedCorrectly?: boolean;
}

export interface CommandStatus {
  name: string;
  path: string;
  description?: string;
  lastUsed?: string;
  usageCount?: number;
}

export interface AgentStatus {
  name: string;
  path: string;
  status: 'available' | 'busy' | 'unavailable';
  model?: string;
  description?: string;
}

export interface ValidationIssue {
  rule: string;
  issue: string;
  severity: 'info' | 'warning' | 'error';
  resolved?: boolean;
}

export interface ToolingStatusProps {
  lastValidated?: string;
  aiCodingConfig: {
    installed: boolean;
    version?: string;
    architecture?: string;
  };
  rules: {
    totalAvailable: number;
    categories: Record<string, RuleStatus[]>;
  };
  commands: CommandStatus[];
  agents: AgentStatus[];
  gitHooks: {
    huskyInstalled: boolean;
    preCommitConfigured: boolean;
    prePushConfigured: boolean;
  };
  coverageGate: 'passing' | 'failing' | 'not-configured';
  issues: ValidationIssue[];
}

// =============================================================================
// Status Indicator Component
// =============================================================================

function StatusIndicator({ 
  status 
}: { 
  status: 'ok' | 'warning' | 'error' | 'unknown' 
}) {
  const config = {
    ok: { icon: '✓', className: 'text-emerald-400 bg-emerald-500/10' },
    warning: { icon: '!', className: 'text-amber-400 bg-amber-500/10' },
    error: { icon: '✕', className: 'text-red-400 bg-red-500/10' },
    unknown: { icon: '?', className: 'text-zinc-400 bg-zinc-500/10' },
  }[status];
  
  return (
    <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${config.className}`}>
      {config.icon}
    </span>
  );
}

// =============================================================================
// Collapsible Section Component
// =============================================================================

function CollapsibleSection({
  title,
  count,
  status,
  children,
  defaultOpen = false,
}: {
  title: string;
  count?: number;
  status: 'ok' | 'warning' | 'error' | 'unknown';
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <StatusIndicator status={status} />
          <span className="font-medium text-zinc-200">{title}</span>
          {count !== undefined && (
            <span className="text-sm text-zinc-500">({count})</span>
          )}
        </div>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/50">
          {children}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Tooling Status Component
// =============================================================================

export function ToolingStatus({
  lastValidated,
  aiCodingConfig,
  rules,
  commands,
  agents,
  gitHooks,
  coverageGate,
  issues,
}: ToolingStatusProps) {
  const unresolvedIssues = issues.filter(i => !i.resolved);
  const hasErrors = unresolvedIssues.some(i => i.severity === 'error');
  const hasWarnings = unresolvedIssues.some(i => i.severity === 'warning');
  
  const overallStatus = hasErrors ? 'error' : hasWarnings ? 'warning' : 'ok';
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${
            overallStatus === 'ok' ? 'bg-emerald-500/10' :
            overallStatus === 'warning' ? 'bg-amber-500/10' :
            'bg-red-500/10'
          }`}>
            <span className="text-2xl">🔧</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">Tooling Status</h2>
            <p className="text-sm text-zinc-500">
              {overallStatus === 'ok' ? 'All systems operational' :
               overallStatus === 'warning' ? 'Some warnings detected' :
               'Issues require attention'}
            </p>
          </div>
        </div>
        {lastValidated && (
          <div className="text-right">
            <div className="text-xs text-zinc-500">Last validated</div>
            <div className="text-sm text-zinc-400">
              {new Date(lastValidated).toLocaleString()}
            </div>
          </div>
        )}
      </div>
      
      {/* Issues Alert */}
      {unresolvedIssues.length > 0 && (
        <div className={`p-4 rounded-lg border ${
          hasErrors ? 'bg-red-500/10 border-red-500/30' : 'bg-amber-500/10 border-amber-500/30'
        }`}>
          <h3 className={`font-medium mb-2 ${hasErrors ? 'text-red-400' : 'text-amber-400'}`}>
            {unresolvedIssues.length} issue{unresolvedIssues.length !== 1 ? 's' : ''} found
          </h3>
          <ul className="space-y-1">
            {unresolvedIssues.map((issue, idx) => (
              <li key={idx} className="text-sm text-zinc-300 flex items-start gap-2">
                <span className={
                  issue.severity === 'error' ? 'text-red-400' :
                  issue.severity === 'warning' ? 'text-amber-400' :
                  'text-blue-400'
                }>
                  {issue.severity === 'error' ? '✕' : issue.severity === 'warning' ? '!' : 'ℹ'}
                </span>
                <span>
                  <strong>{issue.rule}:</strong> {issue.issue}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* ai-coding-config Section */}
      <CollapsibleSection
        title="ai-coding-config"
        status={aiCodingConfig.installed ? 'ok' : 'error'}
        defaultOpen={!aiCodingConfig.installed}
      >
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-500">Installed:</span>
            <span className={`ml-2 ${aiCodingConfig.installed ? 'text-emerald-400' : 'text-red-400'}`}>
              {aiCodingConfig.installed ? 'Yes' : 'No'}
            </span>
          </div>
          {aiCodingConfig.version && (
            <div>
              <span className="text-zinc-500">Version:</span>
              <span className="ml-2 text-zinc-300">{aiCodingConfig.version}</span>
            </div>
          )}
          {aiCodingConfig.architecture && (
            <div>
              <span className="text-zinc-500">Architecture:</span>
              <span className="ml-2 text-zinc-300">{aiCodingConfig.architecture}</span>
            </div>
          )}
        </div>
      </CollapsibleSection>
      
      {/* Rules Section */}
      <CollapsibleSection
        title="Rules"
        count={rules.totalAvailable}
        status={rules.totalAvailable > 0 ? 'ok' : 'warning'}
      >
        <div className="space-y-3">
          {Object.entries(rules.categories).map(([category, categoryRules]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-zinc-400 mb-1 capitalize">{category}</h4>
              <div className="flex flex-wrap gap-1">
                {categoryRules.map((rule) => (
                  <span
                    key={rule.name}
                    className={`px-2 py-0.5 text-xs rounded ${
                      rule.alwaysApply 
                        ? 'bg-amber-500/20 text-amber-300' 
                        : rule.loadedInSession
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                    title={rule.path}
                  >
                    {rule.name.replace('.mdc', '')}
                    {rule.alwaysApply && ' ★'}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-zinc-800 text-xs text-zinc-500">
          ★ = alwaysApply | <span className="text-emerald-400">●</span> = loaded in session
        </div>
      </CollapsibleSection>
      
      {/* Commands Section */}
      <CollapsibleSection
        title="Commands"
        count={commands.length}
        status={commands.length > 0 ? 'ok' : 'warning'}
        defaultOpen={true}
      >
        <div className="space-y-2">
          {commands.map((cmd) => (
            <div
              key={cmd.name}
              className="p-3 bg-zinc-900 rounded border border-zinc-800/50 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-sm text-emerald-400">{cmd.name}</span>
                {cmd.usageCount !== undefined && cmd.usageCount > 0 && (
                  <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
                    {cmd.usageCount} uses
                  </span>
                )}
              </div>
              {cmd.description && (
                <p className="text-xs text-zinc-400">{cmd.description}</p>
              )}
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Agents Section */}
      <CollapsibleSection
        title="Agents"
        count={agents.length}
        status={agents.length > 0 ? 'ok' : 'warning'}
        defaultOpen={true}
      >
        <div className="space-y-2">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="p-3 bg-zinc-900 rounded border border-zinc-800/50 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    agent.status === 'available' ? 'bg-emerald-400' :
                    agent.status === 'busy' ? 'bg-amber-400' :
                    'bg-zinc-600'
                  }`} />
                  <span className="text-sm font-medium text-zinc-200">{agent.name}</span>
                </div>
                {agent.model && (
                  <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">{agent.model}</span>
                )}
              </div>
              {agent.description && (
                <p className="text-xs text-zinc-400 ml-4">{agent.description}</p>
              )}
            </div>
          ))}
        </div>
      </CollapsibleSection>
      
      {/* Git Hooks Section */}
      <CollapsibleSection
        title="Git Hooks"
        status={gitHooks.huskyInstalled && gitHooks.preCommitConfigured ? 'ok' : 'warning'}
      >
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <StatusIndicator status={gitHooks.huskyInstalled ? 'ok' : 'warning'} />
            <span className="text-zinc-400">Husky</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusIndicator status={gitHooks.preCommitConfigured ? 'ok' : 'warning'} />
            <span className="text-zinc-400">Pre-commit</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusIndicator status={gitHooks.prePushConfigured ? 'ok' : 'unknown'} />
            <span className="text-zinc-400">Pre-push</span>
          </div>
        </div>
      </CollapsibleSection>
      
      {/* Coverage Gate */}
      <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg border border-zinc-800">
        <div className="flex items-center gap-3">
          <StatusIndicator 
            status={
              coverageGate === 'passing' ? 'ok' :
              coverageGate === 'failing' ? 'error' :
              'unknown'
            } 
          />
          <span className="text-zinc-200">Coverage Gate</span>
        </div>
        <span className={`text-sm ${
          coverageGate === 'passing' ? 'text-emerald-400' :
          coverageGate === 'failing' ? 'text-red-400' :
          'text-zinc-500'
        }`}>
          {coverageGate === 'passing' ? 'Passing' :
           coverageGate === 'failing' ? 'Failing' :
           'Not Configured'}
        </span>
      </div>
    </div>
  );
}

export default ToolingStatus;

