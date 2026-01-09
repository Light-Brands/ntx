
import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Card } from './Card';

// ============================================================================
// ICONS - Practice-specific icons
// ============================================================================

export const PracticeIcons = {
  Flame: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Sun: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Sunset: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 18a5 5 0 0 0-10 0" />
      <line x1="12" y1="2" x2="12" y2="9" />
      <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
      <line x1="1" y1="18" x2="3" y2="18" />
      <line x1="21" y1="18" x2="23" y2="18" />
      <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
    </svg>
  ),
  Moon: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Target: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Heart: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Zap: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Play: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Pause: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
};

// ============================================================================
// 1. PRACTICE CARD - Individual practice item with actions
// ============================================================================

interface PracticeCardProps {
  practice: {
    id: string;
    name: string;
    category?: string;
    icon?: React.ReactNode;
    streak?: number;
    completedToday?: boolean;
    duration?: number;
    timeOfDay?: 'morning' | 'afternoon' | 'evening';
  };
  onComplete?: () => void;
  onLog?: () => void;
  onTimer?: () => void;
  className?: string;
}

export const PracticeCard: React.FC<PracticeCardProps> = ({
  practice,
  onComplete,
  onLog,
  onTimer,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`p-5 relative overflow-hidden transition-all duration-500 group
                 ${practice.completedToday
                   ? 'border-aqua-light/40 bg-gradient-to-br from-aqua-light/8 to-aqua-light/3 shadow-lg shadow-aqua-light/10'
                   : 'border-white/10 bg-white/[0.02] hover:border-aqua-light/30 hover:shadow-md'
                 } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-aqua-light/0 to-transparent -z-10
                      transition-all duration-500 ${isHovered && !practice.completedToday ? 'from-aqua-light/5' : ''}`} />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                        ${practice.completedToday
                          ? 'bg-aqua-light/25 text-aqua-light shadow-md shadow-aqua-light/20'
                          : 'bg-white/5 text-muted group-hover:bg-aqua-light/10 group-hover:text-aqua-light'}`}>
            {practice.icon || <PracticeIcons.Target />}
          </div>
          <div>
            <h3 className={`text-base font-black uppercase tracking-tight transition-colors
                          ${practice.completedToday ? 'text-aqua-light' : 'text-white'}`}>
              {practice.name}
            </h3>
            {practice.category && (
              <p className="text-[10px] text-muted/70 uppercase tracking-wider font-bold mt-0.5">{practice.category}</p>
            )}
          </div>
        </div>
        {practice.completedToday && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aqua-light to-aqua-medium
                       flex items-center justify-center text-abyss-base
                       shadow-lg shadow-aqua-light/30 animate-in zoom-in-50 duration-500">
            <PracticeIcons.Check />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mb-4">
        {practice.streak !== undefined && (
          <StreakDisplay streak={practice.streak} size="sm" />
        )}
        {practice.duration && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
            <PracticeIcons.Clock />
            <span className="text-[11px] font-bold text-white">{practice.duration}m</span>
          </div>
        )}
        {practice.timeOfDay && (
          <TimeOfDayBadge timeOfDay={practice.timeOfDay} size="sm" />
        )}
      </div>

      {!practice.completedToday ? (
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            className="flex-1 flex items-center justify-center gap-2 py-3 font-black uppercase text-xs
                     shadow-md shadow-aqua-light/20 hover:shadow-lg hover:shadow-aqua-light/30
                     hover:scale-105 active:scale-95"
            onClick={onComplete}
          >
            <PracticeIcons.Check />
            <span>Complete</span>
          </Button>
          {onTimer && (
            <button
              onClick={onTimer}
              className="px-3 py-3 rounded-xl bg-white/5 border border-white/10
                       text-teal-light hover:bg-teal-light/10 hover:text-aqua-light
                       hover:border-teal-light/30 hover:scale-105 active:scale-95
                       transition-all duration-300"
            >
              <PracticeIcons.Clock />
            </button>
          )}
        </div>
      ) : (
        <div className="p-3 rounded-lg bg-aqua-light/10 border border-aqua-light/30">
          <p className="text-xs font-bold text-aqua-light text-center uppercase tracking-wide">
            Completed Today
          </p>
        </div>
      )}
    </Card>
  );
};

// ============================================================================
// 2. STREAK DISPLAY - Flame icon with streak count
// ============================================================================

interface StreakDisplayProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({
  streak,
  size = 'md',
  showLabel = false,
  className = ''
}) => {
  const sizes = {
    sm: { container: 'gap-1.5', text: 'text-sm', icon: 'w-4 h-4' },
    md: { container: 'gap-2', text: 'text-lg', icon: 'w-5 h-5' },
    lg: { container: 'gap-3', text: 'text-2xl', icon: 'w-6 h-6' },
  };

  const config = sizes[size];
  const isActive = streak > 0;

  return (
    <div className={`inline-flex items-center ${config.container} px-3 py-1.5 rounded-full
                    ${isActive
                      ? 'bg-orange-500/15 border-2 border-orange-500/40 text-orange-400'
                      : 'bg-white/5 border border-white/10 text-muted/50'}
                    ${className}`}>
      <div className={isActive ? 'animate-pulse' : ''}>
        <PracticeIcons.Flame />
      </div>
      <span className={`${config.text} font-black`}>{streak}</span>
      {showLabel && <span className="text-xs font-bold uppercase tracking-wide">Day Streak</span>}
    </div>
  );
};

// ============================================================================
// 3. PROGRESS CIRCLE - Circular completion progress
// ============================================================================

interface ProgressCircleProps {
  completed: number;
  total: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  completed,
  total,
  size = 'md',
  showLabel = true,
  className = ''
}) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const sizes = {
    sm: { width: 60, stroke: 4, text: 'text-sm' },
    md: { width: 80, stroke: 5, text: 'text-lg' },
    lg: { width: 120, stroke: 6, text: 'text-2xl' },
  };

  const config = sizes[size];
  const radius = (config.width - config.stroke * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="relative" style={{ width: config.width, height: config.width }}>
        <svg className="transform -rotate-90" width={config.width} height={config.width}>
          {/* Background circle */}
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={config.stroke}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            stroke="#97D9C4"
            strokeWidth={config.stroke}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(151, 217, 196, 0.4))'
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${config.text} font-black text-aqua-light`}>
            {completed}/{total}
          </span>
        </div>
      </div>
      {showLabel && (
        <p className="text-xs font-bold text-muted uppercase tracking-wider">
          Completed Today
        </p>
      )}
    </div>
  );
};

// ============================================================================
// 4. TIME OF DAY BADGE - Morning/Afternoon/Evening indicator
// ============================================================================

interface TimeOfDayBadgeProps {
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  size?: 'sm' | 'md';
  className?: string;
}

export const TimeOfDayBadge: React.FC<TimeOfDayBadgeProps> = ({
  timeOfDay,
  size = 'md',
  className = ''
}) => {
  const configs = {
    morning: {
      icon: <PracticeIcons.Sun />,
      label: 'Morning',
      color: '#fbbf24',
      bg: 'rgba(251, 191, 36, 0.15)'
    },
    afternoon: {
      icon: <PracticeIcons.Sunset />,
      label: 'Afternoon',
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.15)'
    },
    evening: {
      icon: <PracticeIcons.Moon />,
      label: 'Evening',
      color: '#8b5cf6',
      bg: 'rgba(139, 92, 246, 0.15)'
    },
  };

  const config = configs[timeOfDay];
  const isSmall = size === 'sm';

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border-2
                 ${isSmall ? 'px-2.5 py-1' : 'px-4 py-2'} ${className}`}
      style={{
        backgroundColor: config.bg,
        borderColor: config.color,
        color: config.color
      }}
    >
      {config.icon}
      <span className={`font-bold uppercase tracking-wide ${isSmall ? 'text-[10px]' : 'text-xs'}`}>
        {config.label}
      </span>
    </div>
  );
};

// ============================================================================
// 5. SESSION HISTORY ITEM - Individual logged session
// ============================================================================

interface SessionHistoryItemProps {
  session: {
    id: string;
    practiceName: string;
    date: string;
    duration?: number;
    timeOfDay?: 'morning' | 'afternoon' | 'evening';
    reflection?: string;
  };
  onView?: () => void;
  className?: string;
}

export const SessionHistoryItem: React.FC<SessionHistoryItemProps> = ({
  session,
  onView,
  className = ''
}) => (
  <div
    className={`p-5 rounded-2xl border border-white/10 bg-white/[0.02]
               hover:border-aqua-light/30 hover:bg-white/5 transition-all duration-300
               cursor-pointer group ${className}`}
    onClick={onView}
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <h4 className="text-base font-black font-heading text-white group-hover:text-aqua-light transition-colors">
          {session.practiceName}
        </h4>
        <p className="text-xs text-muted/70 mt-1 font-medium">{session.date}</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-aqua-light/10 flex items-center justify-center text-aqua-light">
        <PracticeIcons.Check />
      </div>
    </div>

    <div className="flex items-center gap-3 mb-3">
      {session.duration && (
        <div className="flex items-center gap-1.5 text-muted text-xs font-medium">
          <PracticeIcons.Clock />
          <span>{session.duration} min</span>
        </div>
      )}
      {session.timeOfDay && (
        <TimeOfDayBadge timeOfDay={session.timeOfDay} size="sm" />
      )}
    </div>

    {session.reflection && (
      <p className="text-sm text-pearl/70 line-clamp-2 leading-relaxed italic">
        "{session.reflection}"
      </p>
    )}
  </div>
);

// ============================================================================
// 6. DAILY STATS BAR - Today's practice statistics
// ============================================================================

interface DailyStatsBarProps {
  streak: number;
  completed: number;
  total: number;
  totalMinutes?: number;
  className?: string;
}

export const DailyStatsBar: React.FC<DailyStatsBarProps> = ({
  streak,
  completed,
  total,
  totalMinutes,
  className = ''
}) => (
  <div className={`p-4 rounded-2xl border border-white/10 bg-white/[0.02] ${className}`}>
    <div className="grid grid-cols-3 gap-4">
      {/* Streak */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-orange-500/5 border border-orange-500/20">
        <div className="w-10 h-10 rounded-lg bg-orange-500/15 flex items-center justify-center text-orange-400">
          <PracticeIcons.Flame />
        </div>
        <div>
          <div className="text-xl font-black text-orange-400">{streak}</div>
          <div className="text-[9px] text-muted/60 uppercase tracking-wider font-bold">Streak</div>
        </div>
      </div>

      {/* Completed Today */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
        <div className="w-10 h-10 rounded-lg bg-aqua-light/10 flex items-center justify-center text-aqua-light">
          <PracticeIcons.Check />
        </div>
        <div>
          <div className="text-xl font-black font-heading text-white">
            {completed}<span className="text-muted/50 text-base">/{total}</span>
          </div>
          <div className="text-[9px] text-muted/60 uppercase tracking-wider font-bold">Today</div>
        </div>
      </div>

      {/* Total Time */}
      {totalMinutes !== undefined && totalMinutes > 0 && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-aqua-light/5 border border-aqua-light/20">
          <div className="w-10 h-10 rounded-lg bg-aqua-light/10 flex items-center justify-center text-aqua-light">
            <PracticeIcons.Clock />
          </div>
          <div>
            <div className="text-xl font-black text-aqua-light">{totalMinutes}</div>
            <div className="text-[9px] text-muted/60 uppercase tracking-wider font-bold">Minutes</div>
          </div>
        </div>
      )}
    </div>
  </div>
);

// ============================================================================
// 7. PRACTICE TIMER DISPLAY - Timer component
// ============================================================================

interface PracticeTimerDisplayProps {
  practiceName: string;
  duration: number;
  isRunning: boolean;
  onStart?: () => void;
  onPause?: () => void;
  onComplete?: () => void;
  className?: string;
}

export const PracticeTimerDisplay: React.FC<PracticeTimerDisplayProps> = ({
  practiceName,
  duration,
  isRunning,
  onStart,
  onPause,
  onComplete,
  className = ''
}) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          onComplete?.();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercentage = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <Card className={`p-8 text-center ${className}`}>
      <h3 className="text-xl font-black font-heading text-white mb-6 uppercase tracking-tight">{practiceName}</h3>

      {/* Timer Circle */}
      <div className="relative w-48 h-48 mx-auto mb-8">
        <svg className="transform -rotate-90" width="192" height="192">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="#97D9C4"
            strokeWidth="8"
            fill="none"
            strokeDasharray={552}
            strokeDashoffset={552 - (552 * progressPercentage) / 100}
            strokeLinecap="round"
            className="transition-all duration-1000"
            style={{ filter: 'drop-shadow(0 0 12px rgba(151, 217, 196, 0.5))' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-black text-aqua-light font-mono">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <p className="text-xs text-muted uppercase tracking-widest mt-2 font-bold">Remaining</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        {!isRunning ? (
          <Button variant="primary" onClick={onStart} className="px-8 flex items-center gap-2">
            <PracticeIcons.Play />
            <span>Start</span>
          </Button>
        ) : (
          <Button variant="ghost" onClick={onPause} className="px-8 flex items-center gap-2">
            <PracticeIcons.Pause />
            <span>Pause</span>
          </Button>
        )}
      </div>
    </Card>
  );
};

// ============================================================================
// 8. COMPLETION CHECKMARK - Animated completion indicator
// ============================================================================

interface CompletionCheckmarkProps {
  completed: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export const CompletionCheckmark: React.FC<CompletionCheckmarkProps> = ({
  completed,
  size = 'md',
  onClick,
  className = ''
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <button
      onClick={onClick}
      className={`${sizes[size]} rounded-full border-2 flex items-center justify-center
                 transition-all duration-300 ${onClick ? 'cursor-pointer' : 'cursor-default'}
                 ${completed
                   ? 'bg-aqua-light border-aqua-light text-abyss-base shadow-lg shadow-aqua-light/30 scale-105'
                   : 'bg-transparent border-white/30 text-transparent hover:border-aqua-light/50'
                 } ${className}`}
    >
      {completed && <PracticeIcons.Check />}
    </button>
  );
};

// ============================================================================
// 9. PRACTICE CATEGORY BADGE - Category label with icon
// ============================================================================

interface PracticeCategoryBadgeProps {
  category: string;
  icon?: React.ReactNode;
  color?: string;
  className?: string;
}

export const PracticeCategoryBadge: React.FC<PracticeCategoryBadgeProps> = ({
  category,
  icon,
  color = '#97D9C4',
  className = ''
}) => (
  <div
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 ${className}`}
    style={{
      backgroundColor: `${color}15`,
      borderColor: `${color}40`,
      color: color
    }}
  >
    {icon}
    <span className="text-xs font-black uppercase tracking-wide">{category}</span>
  </div>
);

// ============================================================================
// 10. WEEKLY CALENDAR - Week view with completion dots
// ============================================================================

interface WeeklyCalendarProps {
  weekData: { day: string; completed: boolean; date: string }[];
  className?: string;
}

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  weekData,
  className = ''
}) => (
  <div className={`p-5 rounded-2xl bg-white/[0.02] border border-white/10 ${className}`}>
    <div className="grid grid-cols-7 gap-2">
      {weekData.map((day, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-2 p-3 rounded-xl
                   hover:bg-white/5 transition-all duration-300"
        >
          <span className="text-[10px] font-black text-muted uppercase tracking-wider">
            {day.day}
          </span>
          <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center
                         transition-all duration-300
                         ${day.completed
                           ? 'bg-aqua-light/20 border-aqua-light text-aqua-light'
                           : 'bg-transparent border-white/20 text-white/30'
                         }`}>
            {day.completed ? (
              <PracticeIcons.Check />
            ) : (
              <span className="text-xs font-bold">{day.date}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================================
// 11. PRACTICE EMPTY STATE - No practices placeholder
// ============================================================================

interface PracticeEmptyStateProps {
  type: 'no-practices' | 'no-sessions' | 'no-history';
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

export const PracticeEmptyState: React.FC<PracticeEmptyStateProps> = ({
  type,
  onAction,
  actionLabel = 'Add Practice',
  className = ''
}) => {
  const configs = {
    'no-practices': {
      title: 'No Practices Yet',
      message: 'Start building your daily practice routine',
      icon: <PracticeIcons.Target />,
    },
    'no-sessions': {
      title: 'No Sessions Today',
      message: 'Complete a practice to start your streak',
      icon: <PracticeIcons.Flame />,
    },
    'no-history': {
      title: 'No History',
      message: 'Your practice history will appear here',
      icon: <PracticeIcons.Clock />,
    },
  };

  const config = configs[type];

  return (
    <div className={`rounded-3xl border-2 border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent
                    p-16 text-center ${className}`}>
      <div className="w-24 h-24 rounded-3xl bg-aqua-light/10 border-2 border-aqua-light/20
                    flex items-center justify-center text-aqua-light mx-auto mb-6
                    animate-in zoom-in-50 duration-500">
        <div className="scale-150">{config.icon}</div>
      </div>
      <h3 className="text-2xl font-black font-heading text-white uppercase tracking-tight mb-4">
        {config.title}
      </h3>
      <p className="text-base text-muted/80 mb-8 max-w-sm mx-auto leading-relaxed">
        {config.message}
      </p>
      {onAction && (
        <Button variant="primary" onClick={onAction} className="px-8">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

// ============================================================================
// 12. ADD PRACTICE BUTTON - Create new practice action
// ============================================================================

interface AddPracticeButtonProps {
  onClick?: () => void;
  className?: string;
}

export const AddPracticeButton: React.FC<AddPracticeButtonProps> = ({
  onClick,
  className = ''
}) => (
  <button
    onClick={onClick}
    className={`w-full p-6 rounded-2xl border-2 border-dashed border-aqua-light/30
               bg-aqua-light/5 hover:bg-aqua-light/10
               hover:border-aqua-light/50 hover:shadow-lg hover:shadow-aqua-light/10
               hover:scale-[1.01] active:scale-95
               transition-all duration-300 group ${className}`}
  >
    <div className="flex items-center justify-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-aqua-light/20 border border-aqua-light/40
                   flex items-center justify-center text-aqua-light
                   group-hover:scale-110 group-hover:rotate-90 transition-all duration-500">
        <PracticeIcons.Plus />
      </div>
      <div className="text-left">
        <p className="text-base font-black text-aqua-light uppercase tracking-tight">
          Add Practice
        </p>
        <p className="text-xs text-muted/70 mt-0.5">Build your ritual</p>
      </div>
    </div>
  </button>
);

// ============================================================================
// 13. REFINED DASHBOARD - Complete practice dashboard
// ============================================================================

interface RefinedPracticesDashboardProps {
  className?: string;
}

export const RefinedPracticesDashboard: React.FC<RefinedPracticesDashboardProps> = ({
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState('today');
  const [practices, setPractices] = useState([
    { id: '1', name: 'Morning Meditation', icon: <PracticeIcons.Target />, completedToday: true, streak: 7, duration: 15, timeOfDay: 'morning' as const },
    { id: '2', name: 'Evening Gratitude', icon: <PracticeIcons.Heart />, completedToday: false, streak: 3, duration: 5, timeOfDay: 'evening' as const },
    { id: '3', name: 'Movement Practice', icon: <PracticeIcons.Zap />, completedToday: true, streak: 5, duration: 20, timeOfDay: 'morning' as const },
  ]);

  const [sessions] = useState([
    { id: '1', practiceName: 'Morning Meditation', date: 'Dec 19, 2024', duration: 15, timeOfDay: 'morning' as const, reflection: 'Felt very centered and calm today.' },
    { id: '2', practiceName: 'Movement Practice', date: 'Dec 19, 2024', duration: 20, timeOfDay: 'morning' as const, reflection: 'Great energy after the session!' },
    { id: '3', practiceName: 'Morning Meditation', date: 'Dec 18, 2024', duration: 15, timeOfDay: 'morning' as const },
    { id: '4', practiceName: 'Evening Gratitude', date: 'Dec 18, 2024', duration: 5, timeOfDay: 'evening' as const, reflection: 'Grateful for meaningful connections.' },
  ]);

  const [todayIntention, setTodayIntention] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const handleCompletePractice = (practiceId: string) => {
    setPractices(prev => prev.map(p =>
      p.id === practiceId ? { ...p, completedToday: true } : p
    ));
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
  };

  return (
    <div className={`min-h-[800px] ${className}`}>
      {/* Purpose Header */}
      <div className="text-center py-10 px-6 bg-gradient-to-b from-aqua-light/5 to-transparent border-b border-white/5">
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="w-12 h-12 rounded-xl bg-aqua-light/10 border border-aqua-light/20
                       flex items-center justify-center text-aqua-light mx-auto
                       animate-in zoom-in-50 duration-500">
            <PracticeIcons.Target />
          </div>
          <p className="text-2xl font-medium text-pearl italic leading-relaxed">
            "I embrace each moment with presence and gratitude."
          </p>
          <Button variant="ghost" className="px-6 py-2 uppercase tracking-widest font-black text-xs
                                           border border-white/10 hover:border-aqua-light/30">
            Set Purpose
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 pt-6">
        <div className="p-2 rounded-2xl bg-white/[0.02] border border-white/10 mb-6">
          <div className="flex gap-2">
            {['today', 'history'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest
                         transition-all duration-300
                         ${activeTab === tab
                           ? 'bg-aqua-light text-abyss-base shadow-lg shadow-aqua-light/20'
                           : 'text-muted hover:bg-white/5 hover:text-white'
                         }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Celebration Overlay */}
        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="text-center space-y-3 animate-in zoom-in-50 duration-300">
              <div className="w-24 h-24 rounded-full bg-aqua-light/20 border-4 border-aqua-light
                           flex items-center justify-center text-aqua-light mx-auto
                           shadow-2xl shadow-aqua-light/50 animate-pulse">
                <PracticeIcons.Check />
              </div>
              <p className="text-2xl font-black text-aqua-light uppercase">Completed!</p>
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === 'today' ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Daily Intention */}
            <div className="p-4 rounded-2xl border border-aqua-light/20 bg-gradient-to-br from-aqua-light/8 to-aqua-light/3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-aqua-light/20 flex items-center justify-center text-aqua-light flex-shrink-0">
                  <PracticeIcons.Target />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-black text-aqua-light uppercase tracking-wider mb-2 block">
                    Today's Intention
                  </label>
                  {todayIntention ? (
                    <p className="text-base text-white italic">"{todayIntention}"</p>
                  ) : (
                    <input
                      type="text"
                      placeholder="What's your focus today?"
                      value={todayIntention}
                      onChange={(e) => setTodayIntention(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white/10 border border-aqua-light/30
                               text-white placeholder-white/40 focus:outline-none focus:border-aqua-light
                               transition-all duration-300 text-sm"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <DailyStatsBar
              streak={7}
              completed={practices.filter(p => p.completedToday).length}
              total={practices.length}
              totalMinutes={40}
            />

            {/* Motivational Message */}
            {practices.filter(p => !p.completedToday).length > 0 && (
              <div className="text-center py-3 px-5 rounded-xl bg-gradient-to-r from-gold-accent/10 via-aqua-light/10 to-gold-accent/10 border border-gold-accent/20">
                <p className="text-sm font-bold text-white">
                  {practices.filter(p => p.completedToday).length === practices.length
                    ? "All practices complete - keep the momentum!"
                    : practices.filter(p => p.completedToday).length > 0
                    ? `${practices.filter(p => !p.completedToday).length} more to go!`
                    : "Start your day with intention"
                  }
                </p>
              </div>
            )}

            {/* Practices Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black font-heading text-white uppercase tracking-tight">Practices</h3>
                <span className="px-3 py-1.5 rounded-full bg-aqua-light/10 border border-aqua-light/20
                             text-aqua-light text-xs font-black uppercase tracking-wide">
                  {practices.filter(p => p.completedToday).length}/{practices.length}
                </span>
              </div>

              <div className="grid gap-4">
                {practices.map((practice, index) => (
                  <div key={practice.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                       style={{ animationDelay: `${index * 100}ms` }}>
                    <PracticeCard
                      practice={practice}
                      onComplete={() => handleCompletePractice(practice.id)}
                      onTimer={() => console.log('Timer', practice.id)}
                    />
                  </div>
                ))}
                <AddPracticeButton onClick={() => console.log('Add practice')} />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            {/* Weekly Calendar */}
            <WeeklyCalendar
              weekData={[
                { day: 'Mon', completed: true, date: '16' },
                { day: 'Tue', completed: true, date: '17' },
                { day: 'Wed', completed: true, date: '18' },
                { day: 'Thu', completed: true, date: '19' },
                { day: 'Fri', completed: false, date: '20' },
                { day: 'Sat', completed: false, date: '21' },
                { day: 'Sun', completed: false, date: '22' },
              ]}
            />

            {/* Session History */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black font-heading text-white uppercase tracking-tight">Recent Sessions</h3>
              <div className="grid gap-4">
                {sessions.map((session) => (
                  <SessionHistoryItem
                    key={session.id}
                    session={session}
                    onView={() => console.log('View', session.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 14. LOG SESSION MODAL - Session logging interface
// ============================================================================

interface LogSessionModalProps {
  practiceName?: string;
  className?: string;
}

export const RefinedLogSessionModal: React.FC<LogSessionModalProps> = ({
  practiceName = "Meditation",
  className = ''
}) => {
  const [selectedTime, setSelectedTime] = useState<string>('morning');
  const [selectedDuration, setSelectedDuration] = useState<string>('10m');

  return (
    <div className={`space-y-10 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-5">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-aqua-light/20 to-aqua-light/10
                     border-2 border-aqua-light/30 flex items-center justify-center text-aqua-light mx-auto
                     shadow-xl shadow-aqua-light/20 animate-in zoom-in-50 duration-500">
          <div className="scale-125">
            <PracticeIcons.Check />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-black font-heading text-white uppercase tracking-tight mb-2">Log Session</h2>
          <p className="text-base text-aqua-light font-bold uppercase tracking-wider">{practiceName}</p>
        </div>
      </div>

      {/* Quick Log */}
      <Button variant="primary" className="w-full py-5 text-base font-black uppercase tracking-wide
                                         flex items-center justify-center gap-3 shadow-xl shadow-aqua-light/20">
        <div className="w-6 h-6 rounded-full bg-abyss-base/30 flex items-center justify-center animate-pulse">
          <PracticeIcons.Zap />
        </div>
        <span>Quick Log - I Did This!</span>
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-5 py-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <span className="text-xs font-black font-heading text-white uppercase tracking-[0.2em] px-4 py-2
                     rounded-full bg-white/5 border border-white/10">Manual Calibration</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Time of Day */}
      <div className="space-y-5">
        <label className="text-sm font-black font-heading text-white uppercase tracking-[0.15em] block">
          Temporal Alignment
        </label>
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'morning', label: 'Morning', icon: <PracticeIcons.Sun />, desc: 'Before 12 PM', color: '#fbbf24' },
            { id: 'afternoon', label: 'Afternoon', icon: <PracticeIcons.Sunset />, desc: '12 PM - 6 PM', color: '#f59e0b' },
            { id: 'evening', label: 'Evening', icon: <PracticeIcons.Moon />, desc: 'After 6 PM', color: '#8b5cf6' },
            { id: 'anytime', label: 'Anytime', icon: <PracticeIcons.Clock />, desc: 'Flexible Sync', color: '#97D9C4' },
          ].map((time) => (
            <button
              key={time.id}
              onClick={() => setSelectedTime(time.id)}
              className={`p-5 rounded-2xl border-2 transition-all duration-300 text-left group
                       hover:scale-105 active:scale-95
                       ${selectedTime === time.id
                         ? 'border-aqua-light shadow-xl shadow-aqua-light/20 bg-aqua-light/10'
                         : 'bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/5'
                       }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`transition-all duration-300 ${selectedTime === time.id ? 'text-aqua-light scale-110' : 'text-muted'}`}>
                  {time.icon}
                </div>
                <span className={`text-base font-black uppercase ${selectedTime === time.id ? 'text-aqua-light' : 'text-white'}`}>
                  {time.label}
                </span>
              </div>
              <p className="text-xs text-muted/60 uppercase tracking-wide font-medium">{time.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-5">
        <label className="text-sm font-black font-heading text-white uppercase tracking-[0.15em] block">
          Duration Offset
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['5m', '10m', '15m', '20m', '30m', '45m'].map((duration) => (
            <button
              key={duration}
              onClick={() => setSelectedDuration(duration)}
              className={`px-5 py-4 rounded-xl border-2 transition-all duration-300
                       text-base font-black uppercase hover:scale-105 active:scale-95
                       ${selectedDuration === duration
                         ? 'bg-aqua-light/10 border-aqua-light text-aqua-light shadow-lg shadow-aqua-light/10'
                         : 'bg-white/5 border-white/10 text-muted hover:border-white/30'
                       }`}
            >
              {duration}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6">
        <Button variant="ghost" className="flex-1 py-4 flex items-center justify-center gap-2">
          <PracticeIcons.Clock />
          <span>Start Timer</span>
        </Button>
        <Button variant="primary" className="flex-1 py-4 flex items-center justify-center gap-2">
          <PracticeIcons.Check />
          <span>Log Session</span>
        </Button>
      </div>
    </div>
  );
};

// ============================================================================
// 15. CHOOSE PRACTICE MODAL - Practice selection interface
// ============================================================================

export const RefinedChoosePracticeModal: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPractice, setSelectedPractice] = useState<string>('meditation');

  const practiceLibrary = [
    { id: 'meditation', name: 'Meditation', icon: <PracticeIcons.Target />, frequency: 'Daily', color: '#97D9C4' },
    { id: 'movement', name: 'Movement', icon: <PracticeIcons.Zap />, frequency: 'Daily', color: '#fbbf24' },
    { id: 'yoga', name: 'Yoga', icon: <PracticeIcons.Target />, frequency: 'Daily', color: '#97D9C4' },
    { id: 'journaling', name: 'Journaling', icon: <PracticeIcons.Heart />, frequency: 'Daily', color: '#f59e0b' },
    { id: 'gratitude', name: 'Gratitude', icon: <PracticeIcons.Heart />, frequency: 'Daily', color: '#fbbf24' },
    { id: 'breathwork', name: 'Breathwork', icon: <PracticeIcons.Target />, frequency: 'Daily', color: '#97D9C4' },
    { id: 'nature', name: 'Nature Walk', icon: <PracticeIcons.Target />, frequency: 'Weekly', color: '#10b981' },
    { id: 'hydration', name: 'Hydration', icon: <PracticeIcons.Target />, frequency: 'Daily', color: '#06b6d4' },
    { id: 'creative', name: 'Creative Time', icon: <PracticeIcons.Target />, frequency: 'Weekly', color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-5">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-aqua-light/20 to-aqua-light/10
                     border-2 border-aqua-light/30 flex items-center justify-center text-aqua-light mx-auto
                     shadow-xl shadow-aqua-light/20 animate-in zoom-in-50 duration-500">
          <div className="scale-125">
            <PracticeIcons.Plus />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-black font-heading text-white uppercase tracking-tight mb-2">Select Practice</h2>
          <p className="text-base text-muted/70 uppercase tracking-wider font-medium">
            Curated Library of Neural Activities
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search resonance types..."
          className="w-full px-6 py-5 pl-14 rounded-2xl bg-white/5 border-2 border-white/10
                   text-white placeholder-white/30 focus:outline-none focus:border-aqua-light/50
                   focus:bg-white/10 focus:ring-4 focus:ring-aqua-light/10
                   transition-all duration-300 font-medium text-base"
        />
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted/40">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
      </div>

      {/* Practice Grid */}
      <div className="grid grid-cols-3 gap-4 max-h-[450px] overflow-y-auto pr-2 py-2">
        {practiceLibrary
          .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((practice) => (
            <button
              key={practice.id}
              onClick={() => setSelectedPractice(practice.id)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300
                       flex flex-col items-center gap-4 hover:scale-105 active:scale-95
                       ${selectedPractice === practice.id
                         ? 'bg-aqua-light/15 border-aqua-light text-aqua-light shadow-2xl shadow-aqua-light/30'
                         : 'bg-white/[0.02] border-white/10 text-muted hover:border-white/30 hover:bg-white/5'
                       }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all
                            ${selectedPractice === practice.id
                              ? 'bg-aqua-light/20 scale-110'
                              : 'bg-white/10'}`}
                   style={selectedPractice === practice.id ? { color: practice.color } : {}}>
                {practice.icon}
              </div>
              <div className="text-center">
                <p className={`text-sm font-black uppercase tracking-wide mb-1
                            ${selectedPractice === practice.id ? 'text-aqua-light' : 'text-white'}`}>
                  {practice.name}
                </p>
                <p className={`text-[10px] uppercase tracking-wider font-bold
                            ${selectedPractice === practice.id ? 'text-aqua-light/70' : 'text-muted/50'}`}>
                  {practice.frequency}
                </p>
              </div>
            </button>
          ))}
      </div>

      {/* Action */}
      <Button
        variant="primary"
        disabled={!selectedPractice}
        className="w-full py-5 text-base font-black uppercase tracking-wide
                 flex items-center justify-center gap-3 shadow-xl shadow-aqua-light/20"
      >
        <PracticeIcons.Plus />
        <span>Add to My Practices</span>
      </Button>
    </div>
  );
};

// ============================================================================
// 16. PRACTICE QUICK ACTIONS - Quick action buttons
// ============================================================================

interface PracticeQuickActionsProps {
  onLog?: () => void;
  onTimer?: () => void;
  onEdit?: () => void;
  disabled?: boolean;
  className?: string;
}

export const PracticeQuickActions: React.FC<PracticeQuickActionsProps> = ({
  onLog,
  onTimer,
  onEdit,
  disabled = false,
  className = ''
}) => (
  <div className={`flex items-center gap-2 ${className}`}>
    {onLog && (
      <button
        onClick={onLog}
        disabled={disabled}
        className="px-4 py-2 rounded-xl bg-aqua-light/10 border border-aqua-light/30
                 text-aqua-light font-bold text-xs uppercase tracking-wide
                 hover:bg-aqua-light/20 hover:scale-105 active:scale-95
                 disabled:opacity-40 disabled:cursor-not-allowed
                 transition-all duration-300 flex items-center gap-2"
      >
        <PracticeIcons.Check />
        <span>Log</span>
      </button>
    )}
    {onTimer && (
      <button
        onClick={onTimer}
        disabled={disabled}
        className="px-4 py-2 rounded-xl bg-teal-light/10 border border-teal-light/30
                 text-teal-light font-bold text-xs uppercase tracking-wide
                 hover:bg-teal-light/20 hover:scale-105 active:scale-95
                 disabled:opacity-40 disabled:cursor-not-allowed
                 transition-all duration-300 flex items-center gap-2"
      >
        <PracticeIcons.Play />
        <span>Timer</span>
      </button>
    )}
    {onEdit && (
      <button
        onClick={onEdit}
        disabled={disabled}
        className="p-2 rounded-xl bg-white/5 border border-white/10
                 text-muted hover:text-white hover:bg-white/10
                 hover:scale-105 active:scale-95
                 disabled:opacity-40 disabled:cursor-not-allowed
                 transition-all duration-300"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>
    )}
  </div>
);

