'use client';

import React, { useState, useMemo } from 'react';

// =============================================================================
// Types
// =============================================================================

export type TaskStatus = 'pending' | 'in-progress' | 'complete' | 'blocked' | 'skipped';
export type TaskType = 'table' | 'endpoint' | 'service' | 'component' | 'test' | 'config';
export type AgentType = 'cursor' | 'claude-cli' | 'swarm-agent';

export interface AtomicTask {
  id: string;
  type: TaskType;
  name: string;
  subTask?: string;
  status: TaskStatus;
  assignedTo?: AgentType;
  pr?: number;
  prUrl?: string;
  tests?: { passing: number; failing: number };
  coverage?: number;
  duration?: string;
  epic: string;
  feature: string;
}

export interface AtomicTaskListProps {
  tasks: AtomicTask[];
  onTaskClick?: (taskId: string) => void;
}

// =============================================================================
// Task Type Icons
// =============================================================================

const typeIcons: Record<TaskType, string> = {
  table: '🗄️',
  endpoint: '🔌',
  service: '⚙️',
  component: '🧩',
  test: '🧪',
  config: '⚡',
};

const typeLabels: Record<TaskType, string> = {
  table: 'Database',
  endpoint: 'API',
  service: 'Service',
  component: 'UI',
  test: 'Test',
  config: 'Config',
};

// =============================================================================
// Status Indicators
// =============================================================================

const statusConfig: Record<TaskStatus, { icon: string; className: string }> = {
  pending: { icon: '○', className: 'text-zinc-500' },
  'in-progress': { icon: '◐', className: 'text-amber-400 animate-pulse' },
  complete: { icon: '●', className: 'text-emerald-400' },
  blocked: { icon: '⊘', className: 'text-red-400' },
  skipped: { icon: '⊝', className: 'text-zinc-600' },
};

// =============================================================================
// Filter Controls
// =============================================================================

interface FilterState {
  status: TaskStatus | 'all';
  type: TaskType | 'all';
  search: string;
}

function FilterControls({
  filters,
  onChange,
  taskCounts,
}: {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  taskCounts: Record<string, number>;
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-500">Status:</span>
        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value as any })}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          <option value="all">All ({taskCounts.all || 0})</option>
          <option value="pending">Pending ({taskCounts.pending || 0})</option>
          <option value="in-progress">In Progress ({taskCounts['in-progress'] || 0})</option>
          <option value="complete">Complete ({taskCounts.complete || 0})</option>
          <option value="blocked">Blocked ({taskCounts.blocked || 0})</option>
        </select>
      </div>
      
      {/* Type Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-500">Type:</span>
        <select
          value={filters.type}
          onChange={(e) => onChange({ ...filters, type: e.target.value as any })}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          <option value="all">All Types</option>
          <option value="table">{typeIcons.table} Database</option>
          <option value="endpoint">{typeIcons.endpoint} API</option>
          <option value="service">{typeIcons.service} Service</option>
          <option value="component">{typeIcons.component} UI</option>
          <option value="test">{typeIcons.test} Test</option>
          <option value="config">{typeIcons.config} Config</option>
        </select>
      </div>
      
      {/* Search */}
      <div className="flex-1 min-w-[200px]">
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search tasks..."
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        />
      </div>
    </div>
  );
}

// =============================================================================
// Task Row Component
// =============================================================================

function TaskRow({ task, onClick }: { task: AtomicTask; onClick?: () => void }) {
  const statusCfg = statusConfig[task.status];
  
  return (
    <div
      className={`
        group flex items-center gap-4 p-3 rounded-lg border transition-all duration-150
        ${task.status === 'complete'
          ? 'bg-emerald-500/5 border-emerald-500/20'
          : task.status === 'blocked'
          ? 'bg-red-500/5 border-red-500/20'
          : task.status === 'in-progress'
          ? 'bg-amber-500/5 border-amber-500/20'
          : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
        }
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      {/* Status Icon */}
      <span className={`text-lg ${statusCfg.className}`}>{statusCfg.icon}</span>
      
      {/* Type Badge */}
      <span className="w-16 flex items-center gap-1 text-xs text-zinc-500">
        <span>{typeIcons[task.type]}</span>
        <span className="hidden sm:inline">{typeLabels[task.type]}</span>
      </span>
      
      {/* Task Name */}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-zinc-200 truncate">
          {task.name}
          {task.subTask && (
            <span className="text-zinc-500 font-normal"> / {task.subTask}</span>
          )}
        </div>
        <div className="text-xs text-zinc-500 truncate">
          {task.epic} / {task.feature}
        </div>
      </div>
      
      {/* Assignment */}
      {task.assignedTo && (
        <span className="hidden md:inline-block px-2 py-0.5 text-xs bg-zinc-800 text-zinc-400 rounded">
          {task.assignedTo}
        </span>
      )}
      
      {/* Test Status */}
      {task.tests && (
        <span className="hidden sm:inline-block text-xs">
          <span className="text-emerald-400">{task.tests.passing}</span>
          {task.tests.failing > 0 && (
            <>
              <span className="text-zinc-600">/</span>
              <span className="text-red-400">{task.tests.failing}</span>
            </>
          )}
          <span className="text-zinc-600 ml-1">tests</span>
        </span>
      )}
      
      {/* Coverage */}
      {task.coverage !== undefined && (
        <span className={`hidden sm:inline-block text-xs ${
          task.coverage >= 90 ? 'text-emerald-400' :
          task.coverage >= 75 ? 'text-amber-400' :
          'text-red-400'
        }`}>
          {task.coverage}%
        </span>
      )}
      
      {/* PR Link */}
      {task.pr && (
        <a
          href={task.prUrl || `#pr-${task.pr}`}
          onClick={(e) => e.stopPropagation()}
          className="text-xs text-blue-400 hover:text-blue-300"
        >
          #{task.pr}
        </a>
      )}
      
      {/* Duration */}
      {task.duration && (
        <span className="hidden md:inline-block text-xs text-zinc-500">
          {task.duration}
        </span>
      )}
    </div>
  );
}

// =============================================================================
// Atomic Task List Component
// =============================================================================

export function AtomicTaskList({ tasks, onTaskClick }: AtomicTaskListProps) {
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    type: 'all',
    search: '',
  });
  
  // Calculate task counts for filters
  const taskCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tasks.length };
    for (const task of tasks) {
      counts[task.status] = (counts[task.status] || 0) + 1;
    }
    return counts;
  }, [tasks]);
  
  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filters.status !== 'all' && task.status !== filters.status) return false;
      if (filters.type !== 'all' && task.type !== filters.type) return false;
      if (filters.search) {
        const search = filters.search.toLowerCase();
        const searchable = `${task.name} ${task.subTask || ''} ${task.epic} ${task.feature}`.toLowerCase();
        if (!searchable.includes(search)) return false;
      }
      return true;
    });
  }, [tasks, filters]);
  
  // Group by feature for better organization
  const groupedTasks = useMemo(() => {
    const groups: Record<string, AtomicTask[]> = {};
    for (const task of filteredTasks) {
      const key = `${task.epic}/${task.feature}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(task);
    }
    return groups;
  }, [filteredTasks]);
  
  return (
    <div className="space-y-4">
      {/* Filters */}
      <FilterControls
        filters={filters}
        onChange={setFilters}
        taskCounts={taskCounts}
      />
      
      {/* Results Count */}
      <div className="text-sm text-zinc-500">
        Showing {filteredTasks.length} of {tasks.length} tasks
      </div>
      
      {/* Task List */}
      {Object.entries(groupedTasks).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedTasks).map(([groupKey, groupTasks]) => (
            <div key={groupKey}>
              <h3 className="text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
                <span className="font-mono">{groupKey}</span>
                <span className="text-zinc-600">({groupTasks.length})</span>
              </h3>
              <div className="space-y-1">
                {groupTasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onClick={onTaskClick ? () => onTaskClick(task.id) : undefined}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-zinc-500">
          No tasks match the current filters
        </div>
      )}
    </div>
  );
}

export default AtomicTaskList;

