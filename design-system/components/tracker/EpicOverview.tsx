'use client';

import React from 'react';

// =============================================================================
// Types
// =============================================================================

export type EpicStatus = 'not-started' | 'in-progress' | 'blocked' | 'complete';

export interface EpicMetrics {
  totalTasks: number;
  completedTasks: number;
  testCoverage?: number;
}

export interface EpicCardProps {
  epicId: string;
  epicName: string;
  percentage: number;
  status: EpicStatus;
  blockers: string[];
  metrics: EpicMetrics;
  currentFocus?: string;
  onClick?: () => void;
}

export interface EpicOverviewProps {
  epics: EpicCardProps[];
  onEpicClick?: (epicId: string) => void;
}

// =============================================================================
// Status Badge Component
// =============================================================================

const statusConfig: Record<EpicStatus, { label: string; className: string }> = {
  'not-started': {
    label: 'Not Started',
    className: 'bg-zinc-700 text-zinc-300',
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  },
  'blocked': {
    label: 'Blocked',
    className: 'bg-red-500/20 text-red-400 border border-red-500/30',
  },
  'complete': {
    label: 'Complete',
    className: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  },
};

function StatusBadge({ status }: { status: EpicStatus }) {
  const config = statusConfig[status];
  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
}

// =============================================================================
// Progress Ring Component
// =============================================================================

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  status: EpicStatus;
}

function ProgressRing({ percentage, size = 80, strokeWidth = 6, status }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  const colorClass = {
    'not-started': 'stroke-zinc-600',
    'in-progress': 'stroke-amber-500',
    'blocked': 'stroke-red-500',
    'complete': 'stroke-emerald-500',
  }[status];
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          className="stroke-zinc-800"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className={`${colorClass} transition-all duration-500 ease-out`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-zinc-100">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
}

// =============================================================================
// Epic Card Component
// =============================================================================

function EpicCard({
  epicId,
  epicName,
  percentage,
  status,
  blockers,
  metrics,
  currentFocus,
  onClick,
}: EpicCardProps) {
  return (
    <div
      className={`
        group relative p-4 rounded-xl border transition-all duration-200
        ${status === 'blocked' 
          ? 'bg-zinc-900/50 border-red-500/20' 
          : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 cursor-pointer'
        }
      `}
      onClick={status !== 'blocked' ? onClick : undefined}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs font-mono text-zinc-500 uppercase">{epicId}</span>
          <h3 className="text-lg font-semibold text-zinc-100">{epicName}</h3>
        </div>
        <StatusBadge status={status} />
      </div>
      
      {/* Progress Ring */}
      <div className="flex items-center gap-4 mb-4">
        <ProgressRing percentage={percentage} status={status} />
        <div className="flex-1">
          <div className="text-sm text-zinc-400 mb-1">
            <span className="text-zinc-100 font-semibold">{metrics.completedTasks}</span>
            {' / '}
            <span>{metrics.totalTasks}</span>
            {' tasks'}
          </div>
          {metrics.testCoverage !== undefined && (
            <div className="text-sm text-zinc-500">
              Coverage: <span className="text-zinc-300">{metrics.testCoverage}%</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Current Focus */}
      {currentFocus && status === 'in-progress' && (
        <div className="mb-3 p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
          <span className="text-xs text-amber-400/70">Current Focus:</span>
          <div className="text-sm text-amber-300 font-medium">{currentFocus}</div>
        </div>
      )}
      
      {/* Blockers */}
      {blockers.length > 0 && (
        <div className="mt-3 pt-3 border-t border-zinc-800">
          <span className="text-xs text-red-400/70">Blocked by:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {blockers.map((blocker) => (
              <span
                key={blocker}
                className="px-2 py-0.5 text-xs bg-red-500/10 text-red-400 rounded"
              >
                {blocker}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Hover indicator */}
      {status !== 'blocked' && (
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  );
}

// =============================================================================
// Epic Overview Component
// =============================================================================

export function EpicOverview({ epics, onEpicClick }: EpicOverviewProps) {
  // Calculate overall stats
  const totalTasks = epics.reduce((sum, e) => sum + e.metrics.totalTasks, 0);
  const completedTasks = epics.reduce((sum, e) => sum + e.metrics.completedTasks, 0);
  const overallPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const completedEpics = epics.filter(e => e.status === 'complete').length;
  const inProgressEpics = epics.filter(e => e.status === 'in-progress').length;
  const blockedEpics = epics.filter(e => e.status === 'blocked').length;
  
  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
          <div className="text-3xl font-bold text-zinc-100">
            {overallPercentage.toFixed(1)}%
          </div>
          <div className="text-sm text-zinc-500">Overall Progress</div>
        </div>
        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
          <div className="text-3xl font-bold text-emerald-400">{completedEpics}</div>
          <div className="text-sm text-zinc-500">Epics Complete</div>
        </div>
        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
          <div className="text-3xl font-bold text-amber-400">{inProgressEpics}</div>
          <div className="text-sm text-zinc-500">In Progress</div>
        </div>
        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
          <div className="text-3xl font-bold text-red-400">{blockedEpics}</div>
          <div className="text-sm text-zinc-500">Blocked</div>
        </div>
      </div>
      
      {/* Epic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {epics.map((epic) => (
          <EpicCard
            key={epic.epicId}
            {...epic}
            onClick={() => onEpicClick?.(epic.epicId)}
          />
        ))}
      </div>
    </div>
  );
}

export default EpicOverview;

