'use client';

import React from 'react';

// =============================================================================
// Types
// =============================================================================

export interface CoverageData {
  layer: string;
  current: number;
  threshold: number;
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface TestResult {
  name: string;
  path: string;
  status: 'passing' | 'failing' | 'skipped';
  duration?: string;
  error?: string;
}

export interface TDDCycleState {
  phase: 'red' | 'green' | 'refactor';
  testsWritten: number;
  testsPassing: number;
  testsFailing: number;
  testsSkipped: number;
}

export interface TDDDashboardProps {
  coverage: CoverageData[];
  recentTests: TestResult[];
  cycleState: TDDCycleState;
  overallCoverage: number;
}

// =============================================================================
// Coverage Bar Component
// =============================================================================

function CoverageBar({ data }: { data: CoverageData }) {
  const isPassing = data.current >= data.threshold;
  const percentage = Math.min(data.current, 100);
  const thresholdPosition = Math.min(data.threshold, 100);
  
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-400">{data.layer}</span>
        <div className="flex items-center gap-2">
          <span className={isPassing ? 'text-emerald-400' : 'text-red-400'}>
            {data.current.toFixed(1)}%
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-500">{data.threshold}%</span>
          {data.trend === 'increasing' && <span className="text-emerald-400">↑</span>}
          {data.trend === 'decreasing' && <span className="text-red-400">↓</span>}
        </div>
      </div>
      <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
        {/* Threshold marker */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-zinc-500 z-10"
          style={{ left: `${thresholdPosition}%` }}
        />
        {/* Coverage bar */}
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isPassing ? 'bg-emerald-500' : 'bg-red-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// =============================================================================
// TDD Cycle Indicator
// =============================================================================

function TDDCycleIndicator({ state }: { state: TDDCycleState }) {
  const phases = [
    { key: 'red', label: 'Red', desc: 'Write failing tests', color: 'red' },
    { key: 'green', label: 'Green', desc: 'Make tests pass', color: 'green' },
    { key: 'refactor', label: 'Refactor', desc: 'Clean up code', color: 'blue' },
  ] as const;
  
  return (
    <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
      <h3 className="text-sm font-medium text-zinc-400 mb-4">TDD Cycle</h3>
      <div className="flex items-center justify-between gap-2">
        {phases.map((phase, idx) => {
          const isActive = state.phase === phase.key;
          const colorClasses = {
            red: 'bg-red-500/20 border-red-500 text-red-400',
            green: 'bg-emerald-500/20 border-emerald-500 text-emerald-400',
            blue: 'bg-blue-500/20 border-blue-500 text-blue-400',
          }[phase.color];
          
          return (
            <React.Fragment key={phase.key}>
              <div
                className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                  isActive
                    ? colorClasses
                    : 'bg-zinc-800/50 border-zinc-700 text-zinc-500'
                }`}
              >
                <div className="text-center">
                  <div className="text-lg font-bold">{phase.label}</div>
                  <div className="text-xs opacity-70">{phase.desc}</div>
                </div>
              </div>
              {idx < phases.length - 1 && (
                <div className="text-zinc-600">→</div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Test counts */}
      <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-zinc-800">
        <div className="text-center">
          <div className="text-xl font-bold text-zinc-200">{state.testsWritten}</div>
          <div className="text-xs text-zinc-500">Written</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-emerald-400">{state.testsPassing}</div>
          <div className="text-xs text-zinc-500">Passing</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-red-400">{state.testsFailing}</div>
          <div className="text-xs text-zinc-500">Failing</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-zinc-500">{state.testsSkipped}</div>
          <div className="text-xs text-zinc-500">Skipped</div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Test Results List
// =============================================================================

function TestResultsList({ tests }: { tests: TestResult[] }) {
  const failingTests = tests.filter(t => t.status === 'failing');
  const passingTests = tests.filter(t => t.status === 'passing');
  
  return (
    <div className="space-y-4">
      {/* Failing tests (show first) */}
      {failingTests.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-red-400 mb-2 flex items-center gap-2">
            <span>✕</span>
            Failing ({failingTests.length})
          </h4>
          <div className="space-y-1">
            {failingTests.map((test, idx) => (
              <div
                key={idx}
                className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <div className="text-sm text-zinc-200">{test.name}</div>
                <div className="text-xs text-zinc-500">{test.path}</div>
                {test.error && (
                  <div className="mt-1 text-xs text-red-400 font-mono bg-red-950/50 p-1 rounded">
                    {test.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Passing tests (collapsed summary) */}
      {passingTests.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-emerald-400 mb-2 flex items-center gap-2">
            <span>✓</span>
            Passing ({passingTests.length})
          </h4>
          <div className="text-sm text-zinc-500">
            {passingTests.slice(0, 3).map(t => t.name).join(', ')}
            {passingTests.length > 3 && ` and ${passingTests.length - 3} more...`}
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// TDD Dashboard Component
// =============================================================================

export function TDDDashboard({
  coverage,
  recentTests,
  cycleState,
  overallCoverage,
}: TDDDashboardProps) {
  // Calculate if all gates are passing
  const allGatesPassing = coverage.every(c => c.current >= c.threshold);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${
            allGatesPassing ? 'bg-emerald-500/10' : 'bg-amber-500/10'
          }`}>
            <span className="text-2xl">🧪</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">TDD Dashboard</h2>
            <p className="text-sm text-zinc-500">
              {allGatesPassing
                ? 'All coverage gates passing'
                : 'Some coverage gates need attention'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-zinc-100">{overallCoverage.toFixed(1)}%</div>
          <div className="text-sm text-zinc-500">Overall Coverage</div>
        </div>
      </div>
      
      {/* TDD Cycle */}
      <TDDCycleIndicator state={cycleState} />
      
      {/* Coverage by Layer */}
      <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
        <h3 className="text-sm font-medium text-zinc-400 mb-4">Coverage by Layer</h3>
        <div className="space-y-4">
          {coverage.map((data) => (
            <CoverageBar key={data.layer} data={data} />
          ))}
        </div>
      </div>
      
      {/* Coverage Legend */}
      <div className="flex items-center justify-center gap-6 text-sm text-zinc-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 rounded" />
          <span>Meeting threshold</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded" />
          <span>Below threshold</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-3 bg-zinc-500" />
          <span>Threshold marker</span>
        </div>
      </div>
      
      {/* Recent Test Results */}
      {recentTests.length > 0 && (
        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
          <h3 className="text-sm font-medium text-zinc-400 mb-4">Recent Test Results</h3>
          <TestResultsList tests={recentTests} />
        </div>
      )}
      
      {/* TDD Tips */}
      <div className="p-4 bg-zinc-800/30 rounded-xl border border-zinc-800">
        <h3 className="text-sm font-medium text-zinc-400 mb-2">💡 TDD Reminder</h3>
        <ul className="text-sm text-zinc-500 space-y-1">
          <li><span className="text-red-400">Red:</span> Write a failing test first</li>
          <li><span className="text-emerald-400">Green:</span> Write minimal code to pass</li>
          <li><span className="text-blue-400">Refactor:</span> Improve while keeping tests green</li>
        </ul>
      </div>
    </div>
  );
}

export default TDDDashboard;

