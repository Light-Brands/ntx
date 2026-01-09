import React, { useState, useMemo } from 'react';
import {
  epicData,
  routeData,
  toolingCommands,
  toolingAgents,
  toolingRules,
  dependencyGraph,
  systemArchitecture,
  dataFlowDiagram,
  getEpicStatus,
  getEpicProgress,
  getEpicTaskCounts,
  getAllTasks,
  getTotalProgress,
  type EpicData,
  type TrackerTask,
  type RouteData,
  type TaskStatus,
  type TaskType,
} from '../data/trackerData';

// =============================================================================
// Types
// =============================================================================

type EpicStatus = 'not-started' | 'in-progress' | 'blocked' | 'complete';
type TabId = 'overview' | 'tasks' | 'tdd' | 'routes' | 'tooling' | 'architecture';

// =============================================================================
// Status Badge Component
// =============================================================================

const statusConfig: Record<EpicStatus, { label: string; className: string }> = {
  'not-started': { label: 'Not Started', className: 'bg-white/10 text-white/50' },
  'in-progress': { label: 'In Progress', className: 'bg-gold-accent/20 text-gold-accent border border-gold-accent/30' },
  'blocked': { label: 'Blocked', className: 'bg-red-500/20 text-red-400 border border-red-500/30' },
  'complete': { label: 'Complete', className: 'bg-aqua-light/20 text-aqua-light border border-aqua-light/30' },
};

function StatusBadge({ status }: { status: EpicStatus }) {
  const config = statusConfig[status];
  return (
    <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
}

// =============================================================================
// Progress Ring Component
// =============================================================================

function ProgressRing({ percentage, size = 80, strokeWidth = 6, status }: { percentage: number; size?: number; strokeWidth?: number; status: EpicStatus }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colorClass = {
    'not-started': 'stroke-white/30',
    'in-progress': 'stroke-gold-accent',
    'blocked': 'stroke-red-500',
    'complete': 'stroke-aqua-light',
  }[status];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle className="stroke-white/10" strokeWidth={strokeWidth} fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
        <circle className={`${colorClass} transition-all duration-500 ease-out`} strokeWidth={strokeWidth} strokeLinecap="round" fill="transparent" r={radius} cx={size / 2} cy={size / 2} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-black text-moonlight">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
}

// =============================================================================
// Epic Card Component
// =============================================================================

function EpicCard({ epic, onClick }: { epic: EpicData; onClick?: () => void }) {
  const status = getEpicStatus(epic);
  const progress = getEpicProgress(epic);
  const counts = getEpicTaskCounts(epic);

  return (
    <div
      className={`group relative p-4 rounded-2xl border transition-all duration-300 ${
        status === 'blocked'
          ? 'bg-abyss-mystic/30 border-red-500/20'
          : 'bg-abyss-mystic/50 border-white/10 hover:border-aqua-light/30 cursor-pointer hover:scale-[1.02]'
      }`}
      onClick={status !== 'blocked' ? onClick : undefined}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-[10px] font-black text-teal-light/50 uppercase tracking-widest">{epic.epicId}</span>
          <h3 className="text-lg font-black text-moonlight">{epic.epicName}</h3>
          <span className={`text-[10px] uppercase tracking-wider ${
            epic.phase === 'Foundation' ? 'text-gold-accent' :
            epic.phase === 'MVP' ? 'text-aqua-light' : 'text-teal-light'
          }`}>{epic.phase}</span>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="flex items-center gap-4 mb-4">
        <ProgressRing percentage={progress} status={status} />
        <div className="flex-1">
          <div className="text-sm text-white/60 mb-1">
            <span className="text-moonlight font-bold">{counts.completed}</span>
            <span className="text-white/40"> / </span>
            <span>{counts.total} tasks</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <span className="text-gold-accent">{counts.inProgress} in progress</span>
            <span className="text-white/40">{counts.pending} pending</span>
          </div>
        </div>
      </div>

      {epic.dependencies.length > 0 && status === 'blocked' && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <span className="text-[9px] text-red-400/70 uppercase tracking-wider">Blocked by:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {epic.dependencies.map((dep) => (
              <span key={dep} className="px-2 py-0.5 text-[10px] bg-red-500/10 text-red-400 rounded font-bold">{dep}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Dependency Graph Component (Mermaid)
// =============================================================================

function DependencyGraph() {
  return (
    <div className="p-6 bg-abyss-mystic/50 rounded-2xl border border-white/10">
      <h3 className="text-lg font-black text-moonlight mb-4">Epic Dependencies</h3>
      <div className="text-center text-white/40 text-sm mb-4">Build Order: Epic 00 → 01 → (1A, 1B, 02, 03, 05) → (04, 06) → 07 → 08</div>

      {/* Visual dependency tree */}
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="px-4 py-2 bg-gold-accent/20 text-gold-accent rounded-lg border border-gold-accent/30 font-bold text-sm">
            Epic 00: Foundation
          </div>
        </div>
        <div className="flex justify-center text-white/30">↓</div>
        <div className="flex justify-center">
          <div className="px-4 py-2 bg-aqua-light/20 text-aqua-light rounded-lg border border-aqua-light/30 font-bold text-sm">
            Epic 01: Mira
          </div>
        </div>
        <div className="flex justify-center text-white/30">↓</div>
        <div className="flex flex-wrap justify-center gap-2">
          {['1A: Crypto', '1B: Karma', '02: Humans', '03: Practices', '05: Impact'].map((name) => (
            <div key={name} className="px-3 py-1.5 bg-white/5 text-white/60 rounded-lg border border-white/10 text-xs font-bold">
              {name}
            </div>
          ))}
        </div>
        <div className="flex justify-center text-white/30">↓</div>
        <div className="flex flex-wrap justify-center gap-2">
          {['04: Discovery', '06: Business'].map((name) => (
            <div key={name} className="px-3 py-1.5 bg-white/5 text-white/60 rounded-lg border border-white/10 text-xs font-bold">
              {name}
            </div>
          ))}
        </div>
        <div className="flex justify-center text-white/30">↓</div>
        <div className="flex justify-center">
          <div className="px-4 py-2 bg-teal-light/20 text-teal-light rounded-lg border border-teal-light/30 font-bold text-sm">
            Epic 07: Community
          </div>
        </div>
        <div className="flex justify-center text-white/30">↓</div>
        <div className="flex justify-center">
          <div className="px-4 py-2 bg-teal-light/20 text-teal-light rounded-lg border border-teal-light/30 font-bold text-sm">
            Epic 08: Monetization
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Epic Overview Component
// =============================================================================

function EpicOverview({ onEpicClick }: { onEpicClick?: (epicId: string) => void }) {
  const progress = getTotalProgress();
  const completedEpics = epicData.filter(e => getEpicStatus(e) === 'complete').length;
  const inProgressEpics = epicData.filter(e => getEpicStatus(e) === 'in-progress').length;
  const blockedEpics = epicData.filter(e => getEpicStatus(e) === 'blocked').length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-abyss-mystic/50 rounded-2xl border border-white/10">
          <div className="text-3xl font-black text-moonlight">{progress.percentage.toFixed(1)}%</div>
          <div className="text-xs text-white/40 uppercase tracking-wider">Overall Progress</div>
          <div className="text-xs text-white/30 mt-1">{progress.completed} / {progress.total} tasks</div>
        </div>
        <div className="p-4 bg-abyss-mystic/50 rounded-2xl border border-white/10">
          <div className="text-3xl font-black text-aqua-light">{completedEpics}</div>
          <div className="text-xs text-white/40 uppercase tracking-wider">Epics Complete</div>
        </div>
        <div className="p-4 bg-abyss-mystic/50 rounded-2xl border border-white/10">
          <div className="text-3xl font-black text-gold-accent">{inProgressEpics}</div>
          <div className="text-xs text-white/40 uppercase tracking-wider">In Progress</div>
        </div>
        <div className="p-4 bg-abyss-mystic/50 rounded-2xl border border-white/10">
          <div className="text-3xl font-black text-red-400">{blockedEpics}</div>
          <div className="text-xs text-white/40 uppercase tracking-wider">Blocked</div>
        </div>
      </div>

      {/* Dependency Graph */}
      <DependencyGraph />

      {/* Epic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {epicData.map((epic) => (
          <EpicCard key={epic.epicId} epic={epic} onClick={() => onEpicClick?.(epic.epicId)} />
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// Task List Component
// =============================================================================

const typeIcons: Record<TaskType, string> = {
  table: '🗄️', endpoint: '🔌', service: '⚙️', component: '🧩', test: '🧪', config: '⚡',
};

const taskStatusConfig: Record<TaskStatus, { icon: string; className: string }> = {
  pending: { icon: '○', className: 'text-white/30' },
  'in-progress': { icon: '◐', className: 'text-gold-accent animate-pulse' },
  complete: { icon: '●', className: 'text-aqua-light' },
  blocked: { icon: '⊘', className: 'text-red-400' },
};

function TaskList({ filter }: { filter?: string }) {
  const [typeFilter, setTypeFilter] = useState<TaskType | 'all'>('all');
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const tasks = useMemo(() => {
    let result = getAllTasks();
    if (filter) result = result.filter(t => t.epic === filter);
    if (typeFilter !== 'all') result = result.filter(t => t.type === typeFilter);
    return result;
  }, [filter, typeFilter]);

  const groupedTasks = useMemo(() => {
    const groups: Record<string, TrackerTask[]> = {};
    for (const task of tasks) {
      const key = `${task.epic}/${task.category}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(task);
    }
    return groups;
  }, [tasks]);

  const types: (TaskType | 'all')[] = ['all', 'table', 'endpoint', 'service', 'component', 'test', 'config'];

  const hasDetails = (task: TrackerTask) =>
    task.filePath || task.acceptanceCriteria?.length || task.relatedTests?.length || task.implementation;

  return (
    <div className="space-y-6">
      {/* Type Filter */}
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              typeFilter === type
                ? 'bg-aqua-light/20 text-aqua-light border border-aqua-light/30'
                : 'bg-white/5 text-white/50 hover:text-moonlight hover:bg-white/10'
            }`}
          >
            {type === 'all' ? 'All' : `${typeIcons[type]} ${type}`}
          </button>
        ))}
      </div>

      {/* Task Groups */}
      {Object.entries(groupedTasks).map(([groupKey, groupTasks]) => (
        <div key={groupKey}>
          <h3 className="text-xs font-black text-teal-light/50 uppercase tracking-wider mb-2">
            {groupKey} <span className="text-white/30">({groupTasks.length})</span>
          </h3>
          <div className="space-y-1">
            {groupTasks.map((task) => {
              const statusCfg = taskStatusConfig[task.status];
              const isExpanded = expandedTask === task.id;
              const canExpand = hasDetails(task);

              return (
                <div key={task.id} className="space-y-0">
                  <div
                    onClick={() => canExpand && setExpandedTask(isExpanded ? null : task.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      task.status === 'complete' ? 'bg-aqua-light/5 border-aqua-light/20' :
                      task.status === 'blocked' ? 'bg-red-500/5 border-red-500/20' :
                      task.status === 'in-progress' ? 'bg-gold-accent/5 border-gold-accent/20' :
                      'bg-abyss-mystic/30 border-white/5'
                    } ${canExpand ? 'cursor-pointer hover:bg-white/5' : ''} ${isExpanded ? 'rounded-b-none' : ''}`}
                  >
                    <span className={`text-lg ${statusCfg.className}`}>{statusCfg.icon}</span>
                    <span className="text-sm">{typeIcons[task.type]}</span>
                    <div className="flex-1">
                      <span className="text-sm font-bold text-moonlight">{task.name}</span>
                      {task.description && <span className="text-white/40 text-xs ml-2">{task.description}</span>}
                    </div>
                    {canExpand && (
                      <span className={`text-white/30 text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="p-4 bg-abyss-mystic/50 border border-t-0 border-white/5 rounded-b-xl space-y-3">
                      {task.filePath && (
                        <div>
                          <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">File Path</span>
                          <div className="text-sm font-mono text-moonlight">{task.filePath}</div>
                        </div>
                      )}

                      {task.acceptanceCriteria && task.acceptanceCriteria.length > 0 && (
                        <div>
                          <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">Acceptance Criteria</span>
                          <ul className="mt-1 space-y-1">
                            {task.acceptanceCriteria.map((criteria, i) => (
                              <li key={i} className="text-xs text-white/60 flex gap-2">
                                <span className="text-aqua-light">•</span> {criteria}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {task.relatedTests && task.relatedTests.length > 0 && (
                        <div>
                          <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">Related Tests</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {task.relatedTests.map((test, i) => (
                              <span key={i} className="px-2 py-0.5 text-[10px] bg-gold-accent/10 text-gold-accent rounded font-mono">
                                {test}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {task.implementation && (
                        <div>
                          <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">Implementation Notes</span>
                          <div className="text-xs text-white/60 mt-1">{task.implementation}</div>
                        </div>
                      )}

                      {!task.filePath && !task.acceptanceCriteria?.length && !task.relatedTests?.length && !task.implementation && (
                        <div className="text-xs text-white/30 italic">No additional details available yet</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// TDD Dashboard Component
// =============================================================================

function TDDDashboard() {
  const [expandedEpic, setExpandedEpic] = useState<string | null>(null);

  const coverage = [
    { layer: 'Service Layer', current: 0, threshold: 90 },
    { layer: 'API Routes', current: 0, threshold: 85 },
    { layer: 'Components', current: 0, threshold: 75 },
    { layer: 'Utils & Helpers', current: 0, threshold: 95 },
  ];

  // Get full test data by epic
  const testDataByEpic = epicData.map(epic => ({
    epicId: epic.epicId,
    epicName: epic.epicName,
    tests: epic.tasks.tests,
    totalTests: epic.tasks.tests.length,
    completed: epic.tasks.tests.filter(t => t.status === 'complete').length,
  }));

  return (
    <div className="space-y-6">
      {/* Coverage by Layer */}
      <div className="p-6 bg-abyss-mystic/50 rounded-2xl border border-white/10">
        <h3 className="text-lg font-black text-moonlight mb-4">Coverage Thresholds</h3>
        <div className="space-y-4">
          {coverage.map((data) => {
            const isPassing = data.current >= data.threshold;
            return (
              <div key={data.layer} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">{data.layer}</span>
                  <span className={isPassing ? 'text-aqua-light font-bold' : 'text-white/40'}>
                    {data.current.toFixed(1)}% <span className="text-white/30">/ {data.threshold}%</span>
                  </span>
                </div>
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="absolute top-0 bottom-0 w-0.5 bg-white/30 z-10" style={{ left: `${data.threshold}%` }} />
                  <div className={`h-full rounded-full transition-all duration-500 ${isPassing ? 'bg-aqua-light' : 'bg-white/20'}`} style={{ width: `${Math.min(data.current, 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tests by Epic - Expandable */}
      <div className="p-6 bg-abyss-mystic/50 rounded-2xl border border-white/10">
        <h3 className="text-lg font-black text-moonlight mb-4">Test Inventory by Epic</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {testDataByEpic.map((epic) => {
            const isExpanded = expandedEpic === epic.epicId;
            const hasTests = epic.tests.length > 0;

            return (
              <div key={epic.epicId} className="space-y-0">
                <div
                  onClick={() => hasTests && setExpandedEpic(isExpanded ? null : epic.epicId)}
                  className={`p-3 bg-white/5 rounded-xl transition-all ${
                    hasTests ? 'cursor-pointer hover:bg-white/10' : ''
                  } ${isExpanded ? 'rounded-b-none' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-teal-light/50 uppercase">{epic.epicId}</div>
                      <div className="text-sm font-bold text-moonlight">{epic.epicName}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-lg font-black text-aqua-light">{epic.completed}/{epic.totalTests}</div>
                        <div className="text-[10px] text-white/40">tests</div>
                      </div>
                      {hasTests && (
                        <span className={`text-white/30 text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 bg-abyss-mystic/70 border border-t-0 border-white/5 rounded-b-xl space-y-2">
                    {epic.tests.map((test) => {
                      const statusCfg = taskStatusConfig[test.status];
                      return (
                        <div key={test.id} className={`flex items-center gap-3 p-2 rounded-lg ${
                          test.status === 'complete' ? 'bg-aqua-light/5' :
                          test.status === 'in-progress' ? 'bg-gold-accent/5' :
                          'bg-white/5'
                        }`}>
                          <span className={`text-sm ${statusCfg.className}`}>{statusCfg.icon}</span>
                          <span className="text-xs font-mono text-moonlight flex-1">{test.name}</span>
                          {test.description && (
                            <span className="text-[10px] text-white/40">{test.description}</span>
                          )}
                        </div>
                      );
                    })}

                    {epic.tests.length === 0 && (
                      <div className="text-xs text-white/30 italic">No tests defined yet</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* TDD Cycle */}
      <div className="p-6 bg-abyss-mystic/50 rounded-2xl border border-white/10">
        <h3 className="text-lg font-black text-moonlight mb-4">TDD Cycle</h3>
        <div className="flex items-center justify-between gap-4">
          {[{ phase: 'Red', desc: 'Write failing tests', color: 'bg-red-500/20 border-red-500 text-red-400' },
            { phase: 'Green', desc: 'Make tests pass', color: 'bg-aqua-light/20 border-aqua-light text-aqua-light' },
            { phase: 'Refactor', desc: 'Clean up code', color: 'bg-teal-light/20 border-teal-light text-teal-light' }
          ].map((p, idx) => (
            <React.Fragment key={p.phase}>
              <div className={`flex-1 p-4 rounded-xl border-2 text-center ${idx === 0 ? p.color : 'bg-white/5 border-white/10 text-white/40'}`}>
                <div className="text-lg font-black">{p.phase}</div>
                <div className="text-[10px] opacity-70">{p.desc}</div>
              </div>
              {idx < 2 && <span className="text-white/20">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Routes Tab Component
// =============================================================================

function RoutesTab() {
  const [epicFilter, setEpicFilter] = useState<string | null>(null);
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);

  const filteredRoutes = epicFilter
    ? routeData.filter(r => r.epic === epicFilter)
    : routeData;

  const groupedRoutes = useMemo(() => {
    const groups: Record<string, RouteData[]> = {};
    for (const route of filteredRoutes) {
      if (!groups[route.epic]) groups[route.epic] = [];
      groups[route.epic].push(route);
    }
    return groups;
  }, [filteredRoutes]);

  const methodColors: Record<string, string> = {
    GET: 'bg-aqua-light/20 text-aqua-light',
    POST: 'bg-gold-accent/20 text-gold-accent',
    PUT: 'bg-teal-light/20 text-teal-light',
    DELETE: 'bg-red-500/20 text-red-400',
    PATCH: 'bg-purple-500/20 text-purple-400',
  };

  const hasDetails = (route: RouteData) =>
    route.params?.length || route.requestBody || route.responseBody || route.example || route.relatedService || route.relatedTest;

  return (
    <div className="space-y-6">
      {/* Epic Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setEpicFilter(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            !epicFilter ? 'bg-aqua-light/20 text-aqua-light border border-aqua-light/30' : 'bg-white/5 text-white/50'
          }`}
        >
          All Epics
        </button>
        {epicData.map((epic) => (
          <button
            key={epic.epicId}
            onClick={() => setEpicFilter(epic.epicId)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              epicFilter === epic.epicId ? 'bg-aqua-light/20 text-aqua-light border border-aqua-light/30' : 'bg-white/5 text-white/50'
            }`}
          >
            {epic.epicId}
          </button>
        ))}
      </div>

      {/* Routes Summary */}
      <div className="p-4 bg-abyss-mystic/50 rounded-2xl border border-white/10">
        <div className="text-2xl font-black text-moonlight">{filteredRoutes.length}</div>
        <div className="text-xs text-white/40 uppercase">API Routes</div>
        <div className="flex gap-4 mt-2 text-xs">
          <span className="text-aqua-light">GET: {filteredRoutes.filter(r => r.method === 'GET').length}</span>
          <span className="text-gold-accent">POST: {filteredRoutes.filter(r => r.method === 'POST').length}</span>
          <span className="text-teal-light">PUT: {filteredRoutes.filter(r => r.method === 'PUT').length}</span>
        </div>
      </div>

      {/* Routes by Epic */}
      {Object.entries(groupedRoutes).map(([epicId, routes]) => {
        const epic = epicData.find(e => e.epicId === epicId);
        return (
          <div key={epicId}>
            <h3 className="text-xs font-black text-teal-light/50 uppercase tracking-wider mb-2">
              {epicId}: {epic?.epicName} <span className="text-white/30">({routes.length})</span>
            </h3>
            <div className="space-y-1">
              {routes.map((route, idx) => {
                const routeKey = `${route.method}-${route.path}`;
                const isExpanded = expandedRoute === routeKey;
                const canExpand = hasDetails(route);

                return (
                  <div key={idx} className="space-y-0">
                    <div
                      onClick={() => canExpand && setExpandedRoute(isExpanded ? null : routeKey)}
                      className={`flex items-center gap-3 p-3 bg-abyss-mystic/30 rounded-xl border border-white/5 transition-all ${
                        canExpand ? 'cursor-pointer hover:bg-white/5' : ''
                      } ${isExpanded ? 'rounded-b-none' : ''}`}
                    >
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${methodColors[route.method]}`}>
                        {route.method}
                      </span>
                      <span className="text-sm font-mono text-moonlight flex-1">{route.path}</span>
                      {route.auth && <span className="text-[10px] text-gold-accent">🔒 Auth</span>}
                      <span className="text-xs text-white/40">{route.description}</span>
                      {canExpand && (
                        <span className={`text-white/30 text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      )}
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="p-4 bg-abyss-mystic/50 border border-t-0 border-white/5 rounded-b-xl space-y-3">
                        {route.params && route.params.length > 0 && (
                          <div>
                            <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">Parameters</span>
                            <div className="mt-1 space-y-1">
                              {route.params.map((param, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs">
                                  <span className="font-mono text-moonlight">{param.name}</span>
                                  <span className="text-white/30">:</span>
                                  <span className="text-aqua-light">{param.type}</span>
                                  {param.required && <span className="text-red-400 text-[10px]">required</span>}
                                  {param.description && <span className="text-white/40">- {param.description}</span>}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {route.requestBody && (
                          <div>
                            <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">Request Body</span>
                            <pre className="mt-1 p-2 bg-black/20 rounded text-xs font-mono text-gold-accent overflow-x-auto">
                              {route.requestBody}
                            </pre>
                          </div>
                        )}

                        {route.responseBody && (
                          <div>
                            <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">Response Body</span>
                            <pre className="mt-1 p-2 bg-black/20 rounded text-xs font-mono text-aqua-light overflow-x-auto">
                              {route.responseBody}
                            </pre>
                          </div>
                        )}

                        {route.example && (
                          <div>
                            <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">Example</span>
                            <pre className="mt-1 p-2 bg-black/20 rounded text-xs font-mono text-white/60 overflow-x-auto">
                              {route.example}
                            </pre>
                          </div>
                        )}

                        <div className="flex gap-4">
                          {route.relatedService && (
                            <div>
                              <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">Service</span>
                              <div className="text-xs text-moonlight font-mono">{route.relatedService}</div>
                            </div>
                          )}

                          {route.relatedTest && (
                            <div>
                              <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">Test File</span>
                              <div className="text-xs text-gold-accent font-mono">{route.relatedTest}</div>
                            </div>
                          )}
                        </div>

                        {!route.params?.length && !route.requestBody && !route.responseBody && !route.example && !route.relatedService && !route.relatedTest && (
                          <div className="text-xs text-white/30 italic">No additional details available yet</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// =============================================================================
// Tooling Status Component
// =============================================================================

function ToolingStatus() {
  const [expandedCommand, setExpandedCommand] = useState<string | null>(null);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [expandedRule, setExpandedRule] = useState<string | null>(null);
  // Nested config view state
  const [viewingCommandConfig, setViewingCommandConfig] = useState<string | null>(null);
  const [viewingAgentConfig, setViewingAgentConfig] = useState<string | null>(null);
  const [viewingRuleConfig, setViewingRuleConfig] = useState<string | null>(null);

  const hasCommandDetails = (cmd: typeof toolingCommands[0]) =>
    cmd.parameters?.length || cmd.examples?.length || cmd.output || cmd.configContent;

  const hasAgentDetails = (agent: typeof toolingAgents[0]) =>
    agent.capabilities?.length || agent.invocation || agent.useCases?.length || agent.configContent;

  const hasRuleDetails = (rule: typeof toolingRules[0]) =>
    rule.triggers?.length || rule.keyPoints?.length || rule.filePath || rule.configContent;

  return (
    <div className="space-y-6">
      {/* Commands */}
      <div className="p-6 bg-abyss-mystic/50 rounded-2xl border border-white/10">
        <h3 className="text-lg font-black text-moonlight mb-4">Available Commands</h3>
        <div className="space-y-2">
          {toolingCommands.map((cmd) => {
            const isExpanded = expandedCommand === cmd.name;
            const canExpand = hasCommandDetails(cmd);

            return (
              <div key={cmd.name} className="space-y-0">
                <div
                  onClick={() => canExpand && setExpandedCommand(isExpanded ? null : cmd.name)}
                  className={`flex items-start gap-3 p-3 bg-white/5 rounded-xl transition-all ${
                    canExpand ? 'cursor-pointer hover:bg-white/10' : ''
                  } ${isExpanded ? 'rounded-b-none' : ''}`}
                >
                  <span className="text-aqua-light font-mono text-sm font-bold">{cmd.name}</span>
                  <div className="flex-1">
                    <div className="text-sm text-white/60">{cmd.description}</div>
                    <div className="text-xs text-white/30 font-mono mt-1">{cmd.usage}</div>
                  </div>
                  {canExpand && (
                    <span className={`text-white/30 text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  )}
                </div>

                {isExpanded && (
                  <div className="p-4 bg-abyss-mystic/70 border border-t-0 border-white/5 rounded-b-xl space-y-3">
                    {cmd.parameters && cmd.parameters.length > 0 && (
                      <div>
                        <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">Parameters</span>
                        <div className="mt-1 space-y-1">
                          {cmd.parameters.map((param, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs">
                              <span className="font-mono text-moonlight">{param.name}</span>
                              <span className="text-aqua-light">{param.type}</span>
                              {param.required && <span className="text-red-400 text-[10px]">required</span>}
                              <span className="text-white/40">- {param.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {cmd.examples && cmd.examples.length > 0 && (
                      <div>
                        <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">Examples</span>
                        <div className="mt-1 space-y-1">
                          {cmd.examples.map((ex, i) => (
                            <pre key={i} className="text-xs font-mono text-gold-accent bg-black/20 p-2 rounded">{ex}</pre>
                          ))}
                        </div>
                      </div>
                    )}

                    {cmd.output && (
                      <div>
                        <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">Output</span>
                        <div className="text-xs text-white/60 mt-1">{cmd.output}</div>
                      </div>
                    )}

                    {/* View Config Button */}
                    {cmd.configContent && (
                      <div className="pt-2 border-t border-white/10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewingCommandConfig(viewingCommandConfig === cmd.name ? null : cmd.name);
                          }}
                          className="flex items-center gap-2 text-xs text-teal-light hover:text-aqua-light transition-colors"
                        >
                          <span className={`transition-transform ${viewingCommandConfig === cmd.name ? 'rotate-90' : ''}`}>▶</span>
                          <span className="font-mono">{cmd.filePath || 'View Config'}</span>
                        </button>

                        {viewingCommandConfig === cmd.name && (
                          <div className="mt-3 p-3 bg-black/40 rounded-lg border border-white/10 max-h-80 overflow-y-auto">
                            <pre className="text-xs font-mono text-white/70 whitespace-pre-wrap">{cmd.configContent}</pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Agents */}
      <div className="p-6 bg-abyss-mystic/50 rounded-2xl border border-white/10">
        <h3 className="text-lg font-black text-moonlight mb-4">AI Agents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {toolingAgents.map((agent) => {
            const isExpanded = expandedAgent === agent.name;
            const canExpand = hasAgentDetails(agent);

            return (
              <div key={agent.name} className="space-y-0">
                <div
                  onClick={() => canExpand && setExpandedAgent(isExpanded ? null : agent.name)}
                  className={`p-3 bg-white/5 rounded-xl transition-all ${
                    canExpand ? 'cursor-pointer hover:bg-white/10' : ''
                  } ${isExpanded ? 'rounded-b-none' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-black text-aqua-light">{agent.name}</div>
                      <div className="text-xs text-gold-accent uppercase">{agent.specialization}</div>
                    </div>
                    {canExpand && (
                      <span className={`text-white/30 text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-white/40 mt-1">{agent.description}</div>
                </div>

                {isExpanded && (
                  <div className="p-4 bg-abyss-mystic/70 border border-t-0 border-white/5 rounded-b-xl space-y-3">
                    {agent.capabilities && agent.capabilities.length > 0 && (
                      <div>
                        <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">Capabilities</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {agent.capabilities.map((cap, i) => (
                            <span key={i} className="px-2 py-0.5 text-[10px] bg-aqua-light/10 text-aqua-light rounded">
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {agent.invocation && (
                      <div>
                        <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">How to Invoke</span>
                        <pre className="text-xs font-mono text-gold-accent bg-black/20 p-2 rounded mt-1">{agent.invocation}</pre>
                      </div>
                    )}

                    {agent.useCases && agent.useCases.length > 0 && (
                      <div>
                        <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">Use Cases</span>
                        <ul className="mt-1 space-y-1">
                          {agent.useCases.map((uc, i) => (
                            <li key={i} className="text-xs text-white/60 flex gap-2">
                              <span className="text-aqua-light">•</span> {uc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* View Config Button */}
                    {agent.configContent && (
                      <div className="pt-2 border-t border-white/10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewingAgentConfig(viewingAgentConfig === agent.name ? null : agent.name);
                          }}
                          className="flex items-center gap-2 text-xs text-teal-light hover:text-aqua-light transition-colors"
                        >
                          <span className={`transition-transform ${viewingAgentConfig === agent.name ? 'rotate-90' : ''}`}>▶</span>
                          <span className="font-mono">{agent.filePath || 'View Agent Config'}</span>
                        </button>

                        {viewingAgentConfig === agent.name && (
                          <div className="mt-3 p-3 bg-black/40 rounded-lg border border-white/10 max-h-80 overflow-y-auto">
                            <pre className="text-xs font-mono text-white/70 whitespace-pre-wrap">{agent.configContent}</pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Rules */}
      <div className="p-6 bg-abyss-mystic/50 rounded-2xl border border-white/10">
        <h3 className="text-lg font-black text-moonlight mb-4">Coding Rules</h3>
        <div className="space-y-2">
          {toolingRules.map((rule) => {
            const isExpanded = expandedRule === rule.name;
            const canExpand = hasRuleDetails(rule);

            return (
              <div key={rule.name} className="space-y-0">
                <div
                  onClick={() => canExpand && setExpandedRule(isExpanded ? null : rule.name)}
                  className={`flex items-center gap-3 p-3 bg-white/5 rounded-xl transition-all ${
                    canExpand ? 'cursor-pointer hover:bg-white/10' : ''
                  } ${isExpanded ? 'rounded-b-none' : ''}`}
                >
                  <span className={`w-2 h-2 rounded-full ${rule.alwaysApply ? 'bg-aqua-light animate-pulse' : 'bg-white/30'}`} />
                  <span className="text-sm font-mono text-moonlight">{rule.name}</span>
                  <span className="text-xs text-white/40 flex-1">{rule.description}</span>
                  {rule.alwaysApply && <span className="text-[10px] text-aqua-light uppercase">Always Active</span>}
                  {canExpand && (
                    <span className={`text-white/30 text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  )}
                </div>

                {isExpanded && (
                  <div className="p-4 bg-abyss-mystic/70 border border-t-0 border-white/5 rounded-b-xl space-y-3">
                    {rule.triggers && rule.triggers.length > 0 && (
                      <div>
                        <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">When to Apply</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {rule.triggers.map((trigger, i) => (
                            <span key={i} className="px-2 py-0.5 text-[10px] bg-gold-accent/10 text-gold-accent rounded">
                              {trigger}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {rule.keyPoints && rule.keyPoints.length > 0 && (
                      <div>
                        <span className="text-[10px] text-teal-light/50 uppercase tracking-wider">Key Points</span>
                        <ul className="mt-1 space-y-1">
                          {rule.keyPoints.map((point, i) => (
                            <li key={i} className="text-xs text-white/60 flex gap-2">
                              <span className="text-aqua-light">•</span> {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* View Config Button */}
                    {rule.configContent && (
                      <div className="pt-2 border-t border-white/10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewingRuleConfig(viewingRuleConfig === rule.name ? null : rule.name);
                          }}
                          className="flex items-center gap-2 text-xs text-teal-light hover:text-aqua-light transition-colors"
                        >
                          <span className={`transition-transform ${viewingRuleConfig === rule.name ? 'rotate-90' : ''}`}>▶</span>
                          <span className="font-mono">{rule.filePath || 'View Rule Config'}</span>
                        </button>

                        {viewingRuleConfig === rule.name && (
                          <div className="mt-3 p-3 bg-black/40 rounded-lg border border-white/10 max-h-80 overflow-y-auto">
                            <pre className="text-xs font-mono text-white/70 whitespace-pre-wrap">{rule.configContent}</pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Architecture Tab Component
// =============================================================================

function ArchitectureTab() {
  return (
    <div className="space-y-6">
      {/* System Architecture */}
      <div className="p-6 bg-abyss-mystic/50 rounded-2xl border border-white/10">
        <h3 className="text-lg font-black text-moonlight mb-4">System Architecture</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <div className="text-blue-400 font-black mb-2">Frontend</div>
            <ul className="text-xs text-white/60 space-y-1">
              <li>• Next.js 14 (App Router)</li>
              <li>• React 18</li>
              <li>• Tailwind CSS</li>
              <li>• Zustand (State)</li>
            </ul>
          </div>
          <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
            <div className="text-green-400 font-black mb-2">Backend</div>
            <ul className="text-xs text-white/60 space-y-1">
              <li>• Supabase (PostgreSQL)</li>
              <li>• Row Level Security</li>
              <li>• Supabase Auth</li>
              <li>• Supabase Storage</li>
            </ul>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <div className="text-purple-400 font-black mb-2">AI Services</div>
            <ul className="text-xs text-white/60 space-y-1">
              <li>• Mira AI Companion</li>
              <li>• Claude API</li>
              <li>• Context Aggregation</li>
              <li>• Prompt Engineering</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Data Flow */}
      <div className="p-6 bg-abyss-mystic/50 rounded-2xl border border-white/10">
        <h3 className="text-lg font-black text-moonlight mb-4">Data Flow</h3>
        <div className="flex items-center justify-between gap-2">
          {['Browser', 'React UI', 'API Routes', 'Services', 'Supabase'].map((step, idx) => (
            <React.Fragment key={step}>
              <div className="flex-1 p-3 bg-white/5 rounded-xl text-center">
                <div className="text-sm font-bold text-moonlight">{step}</div>
              </div>
              {idx < 4 && <span className="text-white/30">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Database Schema by Epic */}
      <div className="p-6 bg-abyss-mystic/50 rounded-2xl border border-white/10">
        <h3 className="text-lg font-black text-moonlight mb-4">Database Tables by Epic</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {epicData.map((epic) => (
            <div key={epic.epicId} className="p-3 bg-white/5 rounded-xl">
              <div className="text-xs text-teal-light/50 uppercase">{epic.epicId}</div>
              <div className="text-sm font-bold text-moonlight mb-2">{epic.epicName}</div>
              <div className="space-y-1">
                {epic.tasks.tables.slice(0, 3).map((table) => (
                  <div key={table.id} className="text-xs text-white/40 font-mono">
                    🗄️ {table.name}
                  </div>
                ))}
                {epic.tasks.tables.length > 3 && (
                  <div className="text-xs text-white/30">+{epic.tasks.tables.length - 3} more</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* External Integrations */}
      <div className="p-6 bg-abyss-mystic/50 rounded-2xl border border-white/10">
        <h3 className="text-lg font-black text-moonlight mb-4">External Integrations</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Stripe', desc: 'Payments', color: 'bg-purple-500/10 text-purple-400' },
            { name: 'Twilio', desc: 'SMS/OTP', color: 'bg-red-500/10 text-red-400' },
            { name: 'Claude', desc: 'AI', color: 'bg-orange-500/10 text-orange-400' },
            { name: 'Sentry', desc: 'Errors', color: 'bg-pink-500/10 text-pink-400' },
          ].map((svc) => (
            <div key={svc.name} className={`p-3 rounded-xl ${svc.color}`}>
              <div className="font-black">{svc.name}</div>
              <div className="text-xs opacity-70">{svc.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Tracker Page Component
// =============================================================================

export function Tracker() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [selectedEpic, setSelectedEpic] = useState<string | null>(null);

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'tasks', label: 'Tasks', icon: '📋' },
    { id: 'tdd', label: 'TDD', icon: '🧪' },
    { id: 'routes', label: 'Routes', icon: '🔌' },
    { id: 'tooling', label: 'Tooling', icon: '🔧' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-moonlight mb-2">
          <span className="bg-gradient-to-r from-gold-accent to-aqua-light bg-clip-text text-transparent">
            VIBEUP Tracker
          </span>
        </h1>
        <p className="text-white/40">Development Progress & Architecture</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 p-1 bg-abyss-mystic/30 rounded-2xl border border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSelectedEpic(null); }}
            className={`flex-1 min-w-[100px] px-4 py-3 text-sm font-black uppercase tracking-wider rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-aqua-light to-teal-light text-abyss-base shadow-lg'
                : 'text-white/50 hover:text-moonlight hover:bg-white/5'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <EpicOverview
          onEpicClick={(epicId) => {
            setSelectedEpic(epicId);
            setActiveTab('tasks');
          }}
        />
      )}

      {activeTab === 'tasks' && (
        <div className="space-y-4">
          {selectedEpic && (
            <button onClick={() => setSelectedEpic(null)} className="text-sm text-aqua-light hover:text-teal-light font-bold">
              ← All Tasks
            </button>
          )}
          <TaskList filter={selectedEpic || undefined} />
        </div>
      )}

      {activeTab === 'tdd' && <TDDDashboard />}
      {activeTab === 'routes' && <RoutesTab />}
      {activeTab === 'tooling' && <ToolingStatus />}
      {activeTab === 'architecture' && <ArchitectureTab />}
    </div>
  );
}

export default Tracker;
