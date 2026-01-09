'use client';

import React, { useMemo } from 'react';

// =============================================================================
// Types
// =============================================================================

export type EpicStatus = 'not-started' | 'in-progress' | 'blocked' | 'complete';

export interface TimelineEpic {
  id: string;
  name: string;
  status: EpicStatus;
  percentage: number;
  startDate?: string;
  endDate?: string;
  estimatedEndDate?: string;
  blockedBy: string[];
  blocks: string[];
}

export interface DependencyTimelineProps {
  epics: TimelineEpic[];
  currentDate?: Date;
}

// =============================================================================
// Gantt Bar Component
// =============================================================================

interface GanttBarProps {
  epic: TimelineEpic;
  rowIndex: number;
  totalRows: number;
  scale: number; // pixels per day
  startOffset: number; // days from timeline start
  duration: number; // days
}

function GanttBar({ epic, rowIndex, scale, startOffset, duration }: GanttBarProps) {
  const statusColors = {
    'not-started': 'bg-zinc-700',
    'in-progress': 'bg-amber-500',
    'blocked': 'bg-red-500',
    'complete': 'bg-emerald-500',
  };
  
  const width = Math.max(duration * scale, 60);
  const left = startOffset * scale;
  
  return (
    <div
      className="absolute h-8 rounded-lg flex items-center px-2 text-xs font-medium text-white shadow-lg"
      style={{
        left: `${left}px`,
        width: `${width}px`,
        top: `${rowIndex * 48 + 8}px`,
      }}
    >
      {/* Background */}
      <div className={`absolute inset-0 rounded-lg ${statusColors[epic.status]} opacity-80`} />
      
      {/* Progress overlay */}
      <div
        className={`absolute inset-y-0 left-0 rounded-lg ${statusColors[epic.status]}`}
        style={{ width: `${epic.percentage}%` }}
      />
      
      {/* Label */}
      <span className="relative z-10 truncate">{epic.name}</span>
      
      {/* Percentage */}
      <span className="relative z-10 ml-auto opacity-70">{Math.round(epic.percentage)}%</span>
    </div>
  );
}

// =============================================================================
// Dependency Arrow Component
// =============================================================================

interface DependencyArrowProps {
  fromIndex: number;
  toIndex: number;
  fromEnd: number; // x position
  toStart: number; // x position
  scale: number;
}

function DependencyArrow({ fromIndex, toIndex, fromEnd, toStart, scale }: DependencyArrowProps) {
  const fromY = fromIndex * 48 + 24;
  const toY = toIndex * 48 + 24;
  const fromX = fromEnd * scale;
  const toX = toStart * scale;
  
  // Simple path with bezier curve
  const midX = (fromX + toX) / 2;
  const path = `M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`;
  
  return (
    <path
      d={path}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-zinc-600"
      markerEnd="url(#arrowhead)"
    />
  );
}

// =============================================================================
// Timeline Header
// =============================================================================

function TimelineHeader({ months, scale }: { months: Date[]; scale: number }) {
  return (
    <div className="flex border-b border-zinc-800 h-10">
      {/* Epic label column */}
      <div className="w-40 flex-shrink-0 px-4 flex items-center text-sm font-medium text-zinc-400">
        Epic
      </div>
      
      {/* Month headers */}
      <div className="relative flex-1 overflow-hidden">
        {months.map((month, idx) => {
          const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
          const width = daysInMonth * scale;
          
          return (
            <div
              key={idx}
              className="absolute top-0 h-full border-l border-zinc-800 px-2 flex items-center"
              style={{
                left: `${months.slice(0, idx).reduce((sum, m) => {
                  const days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
                  return sum + days * scale;
                }, 0)}px`,
                width: `${width}px`,
              }}
            >
              <span className="text-xs text-zinc-500">
                {month.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================================
// Epic Row
// =============================================================================

function EpicRow({ epic, isLast }: { epic: TimelineEpic; isLast: boolean }) {
  const statusIndicator = {
    'not-started': '○',
    'in-progress': '◐',
    'blocked': '⊘',
    'complete': '●',
  }[epic.status];
  
  const statusColor = {
    'not-started': 'text-zinc-500',
    'in-progress': 'text-amber-400',
    'blocked': 'text-red-400',
    'complete': 'text-emerald-400',
  }[epic.status];
  
  return (
    <div className={`flex h-12 ${!isLast ? 'border-b border-zinc-800/50' : ''}`}>
      <div className="w-40 flex-shrink-0 px-4 flex items-center gap-2">
        <span className={statusColor}>{statusIndicator}</span>
        <span className="text-sm text-zinc-300 truncate" title={epic.name}>
          {epic.name}
        </span>
      </div>
      <div className="flex-1" /> {/* Gantt bars rendered separately */}
    </div>
  );
}

// =============================================================================
// Today Marker
// =============================================================================

function TodayMarker({ offset, scale }: { offset: number; scale: number }) {
  return (
    <div
      className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20"
      style={{ left: `${offset * scale + 160}px` }} // 160px for label column
    >
      <div className="absolute -top-1 -left-2 w-4 h-4 bg-red-500 rounded-full" />
      <div className="absolute -top-6 -left-6 text-xs text-red-400 whitespace-nowrap">
        Today
      </div>
    </div>
  );
}

// =============================================================================
// Dependency Timeline Component
// =============================================================================

export function DependencyTimeline({ epics, currentDate = new Date() }: DependencyTimelineProps) {
  const SCALE = 3; // pixels per day
  
  // Calculate timeline range (3 months before and after current date)
  const timelineStart = useMemo(() => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() - 1);
    d.setDate(1);
    return d;
  }, [currentDate]);
  
  const timelineEnd = useMemo(() => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + 5);
    d.setDate(0);
    return d;
  }, [currentDate]);
  
  // Generate month headers
  const months = useMemo(() => {
    const result: Date[] = [];
    const current = new Date(timelineStart);
    while (current <= timelineEnd) {
      result.push(new Date(current));
      current.setMonth(current.getMonth() + 1);
    }
    return result;
  }, [timelineStart, timelineEnd]);
  
  // Calculate days from timeline start for each epic
  const epicPositions = useMemo(() => {
    const getDayOffset = (date: Date) => {
      return Math.floor((date.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24));
    };
    
    return epics.map((epic, idx) => {
      // Default positions based on epic order
      const baseStart = idx * 14; // Stagger by 2 weeks
      const baseDuration = 30; // Default 30 days
      
      const startOffset = epic.startDate 
        ? getDayOffset(new Date(epic.startDate))
        : baseStart;
      
      const endOffset = epic.endDate
        ? getDayOffset(new Date(epic.endDate))
        : epic.estimatedEndDate
        ? getDayOffset(new Date(epic.estimatedEndDate))
        : startOffset + baseDuration;
      
      return {
        epic,
        startOffset: Math.max(0, startOffset),
        duration: Math.max(14, endOffset - startOffset),
        index: idx,
      };
    });
  }, [epics, timelineStart]);
  
  // Calculate total width
  const totalDays = Math.ceil((timelineEnd.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24));
  const totalWidth = totalDays * SCALE + 160; // 160px for label column
  
  // Today offset
  const todayOffset = Math.floor((currentDate.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24));
  
  // Build epic index map for dependency arrows
  const epicIndexMap = useMemo(() => {
    const map: Record<string, number> = {};
    epics.forEach((e, i) => { map[e.id] = i; });
    return map;
  }, [epics]);
  
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <h3 className="text-lg font-semibold text-zinc-100">Development Timeline</h3>
        <p className="text-sm text-zinc-500">Epic dependencies and progress visualization</p>
      </div>
      
      {/* Timeline */}
      <div className="overflow-x-auto">
        <div style={{ minWidth: `${totalWidth}px` }}>
          {/* Month headers */}
          <TimelineHeader months={months} scale={SCALE} />
          
          {/* Epic rows and Gantt chart */}
          <div className="relative">
            {/* Row backgrounds */}
            {epics.map((epic, idx) => (
              <EpicRow key={epic.id} epic={epic} isLast={idx === epics.length - 1} />
            ))}
            
            {/* Gantt bars (positioned absolutely) */}
            <div className="absolute top-0 left-40 right-0 bottom-0">
              {/* Today marker */}
              <TodayMarker offset={todayOffset} scale={SCALE} />
              
              {/* SVG for dependency arrows */}
              <svg className="absolute inset-0 pointer-events-none" style={{ overflow: 'visible' }}>
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="6"
                    markerHeight="4"
                    refX="5"
                    refY="2"
                    orient="auto"
                  >
                    <polygon points="0 0, 6 2, 0 4" fill="currentColor" className="text-zinc-600" />
                  </marker>
                </defs>
                
                {/* Draw dependency arrows */}
                {epics.map((epic) =>
                  epic.blockedBy.map((blockerId) => {
                    const fromIdx = epicIndexMap[blockerId];
                    const toIdx = epicIndexMap[epic.id];
                    const fromPos = epicPositions[fromIdx];
                    const toPos = epicPositions[toIdx];
                    
                    if (fromIdx === undefined || toIdx === undefined) return null;
                    
                    return (
                      <DependencyArrow
                        key={`${blockerId}-${epic.id}`}
                        fromIndex={fromIdx}
                        toIndex={toIdx}
                        fromEnd={fromPos.startOffset + fromPos.duration}
                        toStart={toPos.startOffset}
                        scale={SCALE}
                      />
                    );
                  })
                )}
              </svg>
              
              {/* Gantt bars */}
              {epicPositions.map(({ epic, startOffset, duration, index }) => (
                <GanttBar
                  key={epic.id}
                  epic={epic}
                  rowIndex={index}
                  totalRows={epics.length}
                  scale={SCALE}
                  startOffset={startOffset}
                  duration={duration}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="p-4 border-t border-zinc-800 flex flex-wrap gap-4 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 rounded" />
          <span>Complete</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-amber-500 rounded" />
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded" />
          <span>Blocked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-zinc-700 rounded" />
          <span>Not Started</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-red-500" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="20" height="10">
            <path d="M 0 5 L 20 5" stroke="currentColor" fill="none" className="text-zinc-600" />
            <polygon points="15 2, 20 5, 15 8" fill="currentColor" className="text-zinc-600" />
          </svg>
          <span>Dependency</span>
        </div>
      </div>
    </div>
  );
}

export default DependencyTimeline;

