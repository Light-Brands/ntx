// AUTODEV - Autonomous Development Intelligence System
// =====================================================
// The AI Brain of the Platform - Epic Visual Experience

import React, { useEffect, useMemo, useState } from 'react';
import { AutodevProvider, useAutodev, useAutodevUI } from '../contexts/AutodevContext';
import type { AutodevTab, Alert, Recommendation, HealingAction } from '../data/autodevTypes';
import { AIChatPanel } from '../components/autodev';

// ============ VISUAL COMPONENTS ============

// Animated Neural Background
const NeuralBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Gradient orbs */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] animate-pulse" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

    {/* Grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}
    />
  </div>
);

// Circular Progress Ring
const ProgressRing = ({
  value,
  size = 120,
  strokeWidth = 8,
  color = 'from-purple-500 to-cyan-500',
  label,
  sublabel
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-white/5"
        />
        {/* Progress ring with gradient */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{value}</span>
        {label && <span className="text-xs text-white/50 mt-1">{label}</span>}
        {sublabel && <span className="text-[10px] text-white/30">{sublabel}</span>}
      </div>
    </div>
  );
};

// Mini Sparkline Chart
const Sparkline = ({ data, color = '#8B5CF6', height = 40 }: { data: number[]; color?: string; height?: number }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="100%" height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`sparkGradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points={`0,${height} ${points} 100,${height}`}
        fill={`url(#sparkGradient-${color})`}
      />
    </svg>
  );
};

// Status Indicator with Glow
const StatusIndicator = ({ status, size = 'md' }: { status: 'nominal' | 'advisory' | 'warning' | 'critical'; size?: 'sm' | 'md' | 'lg' }) => {
  const colors = {
    nominal: 'bg-emerald-500 shadow-emerald-500/50',
    advisory: 'bg-yellow-500 shadow-yellow-500/50',
    warning: 'bg-orange-500 shadow-orange-500/50',
    critical: 'bg-red-500 shadow-red-500/50',
  };

  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className="relative">
      <div className={`${sizes[size]} rounded-full ${colors[status]} shadow-lg animate-pulse`} />
      <div className={`absolute inset-0 ${sizes[size]} rounded-full ${colors[status]} blur-sm opacity-50`} />
    </div>
  );
};

// Glowing Card Component
const GlowCard = ({
  children,
  className = '',
  glowColor = 'purple',
  hover = true
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'purple' | 'cyan' | 'emerald' | 'orange' | 'red';
  hover?: boolean;
}) => {
  const glowColors = {
    purple: 'hover:shadow-purple-500/20 hover:border-purple-500/30',
    cyan: 'hover:shadow-cyan-500/20 hover:border-cyan-500/30',
    emerald: 'hover:shadow-emerald-500/20 hover:border-emerald-500/30',
    orange: 'hover:shadow-orange-500/20 hover:border-orange-500/30',
    red: 'hover:shadow-red-500/20 hover:border-red-500/30',
  };

  return (
    <div className={`
      relative bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10
      ${hover ? `transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${glowColors[glowColor]}` : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

// Animated Counter
const AnimatedNumber = ({ value, duration = 1000 }: { value: number; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const startValue = displayValue;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startValue + (value - startValue) * easeOut));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return <span>{displayValue}</span>;
};

// Alert Item with Visual Flair
const AlertItem = ({ alert }: { alert: Alert }) => {
  const levelConfig = {
    critical: { bg: 'bg-red-500/10', border: 'border-red-500/30', icon: '🚨', color: 'text-red-400' },
    warning: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', icon: '⚠️', color: 'text-orange-400' },
    advisory: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: '💡', color: 'text-yellow-400' },
    info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: 'ℹ️', color: 'text-blue-400' },
  };

  const config = levelConfig[alert.level];

  return (
    <div className={`flex items-start gap-3 p-3 rounded-xl ${config.bg} border ${config.border} transition-all hover:scale-[1.01]`}>
      <span className="text-lg">{config.icon}</span>
      <div className="flex-1 min-w-0">
        <div className={`font-medium ${config.color}`}>{alert.title}</div>
        <div className="text-white/50 text-sm mt-0.5 truncate">{alert.message}</div>
        <div className="text-white/30 text-xs mt-1">
          {new Date(alert.timestamp).toLocaleTimeString()}
        </div>
      </div>
      <StatusIndicator status={alert.level === 'info' ? 'advisory' : alert.level} size="sm" />
    </div>
  );
};

// Recommendation Card with Actions
const RecommendationCard = ({
  rec,
  onApprove,
  onReject
}: {
  rec: Recommendation;
  onApprove: () => void;
  onReject: () => void;
}) => {
  const severityConfig = {
    critical: { gradient: 'from-red-500 to-orange-500', badge: 'bg-red-500/20 text-red-400' },
    important: { gradient: 'from-orange-500 to-yellow-500', badge: 'bg-orange-500/20 text-orange-400' },
    recommended: { gradient: 'from-purple-500 to-cyan-500', badge: 'bg-purple-500/20 text-purple-400' },
    suggestion: { gradient: 'from-cyan-500 to-blue-500', badge: 'bg-cyan-500/20 text-cyan-400' },
  };

  const config = severityConfig[rec.severity];

  return (
    <GlowCard className="overflow-hidden">
      {/* Gradient accent bar */}
      <div className={`h-1 bg-gradient-to-r ${config.gradient}`} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.badge}`}>
                {rec.severity}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-white/50">
                {rec.type}
              </span>
            </div>
            <h4 className="text-white font-semibold">{rec.title}</h4>
            <p className="text-white/50 text-sm mt-1">{rec.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5">
          <div className="flex-1 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-white/30 uppercase tracking-wider">Impact</div>
              <div className="text-sm text-white/70 font-medium mt-1">{rec.impact.improvement}</div>
            </div>
            <div>
              <div className="text-xs text-white/30 uppercase tracking-wider">Effort</div>
              <div className={`text-sm font-medium mt-1 ${
                rec.impact.effort === 'low' ? 'text-emerald-400' :
                rec.impact.effort === 'medium' ? 'text-yellow-400' : 'text-orange-400'
              }`}>{rec.impact.effort}</div>
            </div>
            <div>
              <div className="text-xs text-white/30 uppercase tracking-wider">Risk</div>
              <div className={`text-sm font-medium mt-1 ${
                rec.impact.risk === 'low' ? 'text-emerald-400' :
                rec.impact.risk === 'medium' ? 'text-yellow-400' : 'text-red-400'
              }`}>{rec.impact.risk}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={onApprove}
            className="flex-1 py-2 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            ✓ Approve
          </button>
          <button
            onClick={onReject}
            className="flex-1 py-2 px-4 bg-white/5 text-white/70 rounded-xl font-medium hover:bg-white/10 transition-colors"
          >
            ✗ Reject
          </button>
        </div>
      </div>
    </GlowCard>
  );
};

// Autonomy Dial - Epic Visual Control
const AutonomyDial = ({
  value,
  onChange
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  const getDialDescription = (val: number) => {
    if (val === 0) return { label: 'Manual Mode', desc: 'All actions require human approval', color: 'from-slate-500 to-slate-600' };
    if (val <= 25) return { label: 'Conservative', desc: 'L1 auto-executed', color: 'from-blue-500 to-cyan-500' };
    if (val <= 50) return { label: 'Balanced', desc: 'L1-L2 auto-executed', color: 'from-cyan-500 to-emerald-500' };
    if (val <= 75) return { label: 'Aggressive', desc: 'L1-L3 auto-executed', color: 'from-emerald-500 to-yellow-500' };
    return { label: 'Full Auto', desc: 'AI decides everything', color: 'from-yellow-500 to-orange-500' };
  };

  const dialInfo = getDialDescription(value);

  return (
    <GlowCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="text-2xl">🎛️</span>
            Autonomy Dial
          </h3>
          <p className="text-white/40 text-sm mt-1">Control AI decision-making authority</p>
        </div>
        <div className="text-right">
          <div className={`text-4xl font-bold bg-gradient-to-r ${dialInfo.color} bg-clip-text text-transparent`}>
            {value}%
          </div>
          <div className="text-white/50 text-sm">{dialInfo.label}</div>
        </div>
      </div>

      {/* Custom Slider */}
      <div className="relative mt-4">
        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${dialInfo.color} transition-all duration-300 rounded-full`}
            style={{ width: `${value}%` }}
          />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="25"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-3 opacity-0 cursor-pointer"
        />

        {/* Tick marks */}
        <div className="flex justify-between mt-2 px-1">
          {[0, 25, 50, 75, 100].map((tick) => (
            <div key={tick} className="flex flex-col items-center">
              <div className={`w-1 h-1 rounded-full ${value >= tick ? 'bg-white' : 'bg-white/20'}`} />
              <span className={`text-xs mt-1 ${value >= tick ? 'text-white/70' : 'text-white/30'}`}>
                {tick}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-white/40 text-sm mt-4 text-center">{dialInfo.desc}</p>

      {/* Level indicators */}
      <div className="grid grid-cols-4 gap-2 mt-6">
        {['L0', 'L1', 'L2', 'L3'].map((level, i) => {
          const isAuto = value >= (i === 0 ? 100 : i * 25);
          return (
            <div
              key={level}
              className={`p-2 rounded-lg text-center transition-all ${
                isAuto ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-white/5 border border-white/10'
              }`}
            >
              <div className={`text-xs font-bold ${isAuto ? 'text-emerald-400' : 'text-white/30'}`}>
                {level}
              </div>
              <div className={`text-[10px] ${isAuto ? 'text-emerald-400/70' : 'text-white/20'}`}>
                {isAuto ? 'AUTO' : 'MANUAL'}
              </div>
            </div>
          );
        })}
      </div>
    </GlowCard>
  );
};

// ============ TAB COMPONENTS ============

// Command Center - Main Dashboard
function CommandCenter() {
  const { state } = useAutodev();
  const { health, alerts, recommendations, healingHistory, autonomyConfig } = state;

  const activeAlerts = alerts.filter((a) => !a.resolvedAt);
  const pendingRecommendations = recommendations.filter((r) => r.status === 'pending');
  const todayActions = healingHistory.filter(a => {
    const today = new Date().toDateString();
    return new Date(a.startedAt).toDateString() === today;
  });

  // Mock sparkline data
  const healthData = [85, 87, 82, 88, 90, 92, 89, 94, 91, health.overall];
  const alertData = [3, 2, 5, 4, 2, 3, 1, 2, activeAlerts.length];

  return (
    <div className="space-y-6">
      {/* Hero Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {/* Health Score - Featured */}
        <GlowCard className="p-6 col-span-1" glowColor="emerald">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/40 text-sm uppercase tracking-wider">System Health</span>
            <StatusIndicator status={health.status} />
          </div>
          <div className="flex items-center gap-4">
            <ProgressRing value={health.overall} size={100} />
            <div className="flex-1">
              <Sparkline data={healthData} color="#10B981" height={40} />
              <div className="text-white/30 text-xs mt-2">24h trend</div>
            </div>
          </div>
        </GlowCard>

        {/* Active Alerts */}
        <GlowCard className="p-6" glowColor={activeAlerts.length > 0 ? 'orange' : 'cyan'}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/40 text-sm uppercase tracking-wider">Active Alerts</span>
            <span className="text-2xl">🔔</span>
          </div>
          <div className="text-5xl font-bold text-white mb-2">
            <AnimatedNumber value={activeAlerts.length} />
          </div>
          <div className="text-white/30 text-sm">
            {activeAlerts.filter(a => a.level === 'critical').length} critical
          </div>
          <div className="mt-3">
            <Sparkline data={alertData} color="#F59E0B" height={30} />
          </div>
        </GlowCard>

        {/* Pending Actions */}
        <GlowCard className="p-6" glowColor="purple">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/40 text-sm uppercase tracking-wider">Pending Review</span>
            <span className="text-2xl">📋</span>
          </div>
          <div className="text-5xl font-bold text-white mb-2">
            <AnimatedNumber value={pendingRecommendations.length} />
          </div>
          <div className="text-white/30 text-sm">recommendations</div>
          <div className="mt-3 flex gap-1">
            {pendingRecommendations.slice(0, 5).map((_, i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full bg-purple-500/50" />
            ))}
            {Array(Math.max(0, 5 - pendingRecommendations.length)).fill(0).map((_, i) => (
              <div key={`empty-${i}`} className="flex-1 h-1.5 rounded-full bg-white/10" />
            ))}
          </div>
        </GlowCard>

        {/* Auto-Healed Today */}
        <GlowCard className="p-6" glowColor="cyan">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/40 text-sm uppercase tracking-wider">Auto-Healed</span>
            <span className="text-2xl">🔧</span>
          </div>
          <div className="text-5xl font-bold text-white mb-2">
            <AnimatedNumber value={todayActions.filter(a => a.status === 'completed').length} />
          </div>
          <div className="text-white/30 text-sm">today</div>
          <div className="mt-3">
            <div className={`text-sm font-medium bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent`}>
              Autonomy: {autonomyConfig.dialPosition}%
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Alerts Column */}
        <div className="col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span>🚨</span> Live Alerts
            </h3>
            <span className="text-white/30 text-sm">{activeAlerts.length} active</span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {activeAlerts.length === 0 ? (
              <GlowCard className="p-6 text-center" glowColor="emerald">
                <span className="text-4xl mb-3 block">✨</span>
                <div className="text-white/70">All systems nominal</div>
                <div className="text-white/30 text-sm mt-1">No active alerts</div>
              </GlowCard>
            ) : (
              activeAlerts.slice(0, 8).map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))
            )}
          </div>
        </div>

        {/* Recommendations Column */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span>🧠</span> AI Recommendations
            </h3>
            <span className="text-white/30 text-sm">{pendingRecommendations.length} pending</span>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {pendingRecommendations.length === 0 ? (
              <GlowCard className="p-8 text-center" glowColor="purple">
                <span className="text-5xl mb-4 block">🤖</span>
                <div className="text-white/70 text-lg">AI is analyzing...</div>
                <div className="text-white/30 text-sm mt-2">
                  Recommendations will appear as patterns are detected
                </div>
              </GlowCard>
            ) : (
              pendingRecommendations.slice(0, 4).map((rec) => (
                <RecommendationCard
                  key={rec.id}
                  rec={rec}
                  onApprove={() => {}}
                  onReject={() => {}}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* System Pulse Bar */}
      <GlowCard className="p-5" glowColor="purple">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
            <span className="text-white font-medium">System Pulse</span>
          </div>
          <span className="text-white/30 text-sm">Next heartbeat: 4m 32s</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-500 rounded-full animate-pulse"
            style={{ width: '75%' }}
          />
        </div>
        <div className="flex justify-between mt-3 text-sm text-white/40">
          <span>Today: 288 heartbeats</span>
          <span>12 issues detected</span>
          <span>8 auto-resolved</span>
        </div>
      </GlowCard>
    </div>
  );
}

// Sentinel - Real-Time Monitoring
function SentinelDashboard() {
  const { state } = useAutodev();
  const { health, alerts } = state;

  // Mock metrics data
  const metrics = [
    { name: 'Response Time', value: 142, unit: 'ms', status: 'good', icon: '⚡', data: [150, 145, 148, 142, 138, 145, 142] },
    { name: 'Error Rate', value: 0.02, unit: '%', status: 'good', icon: '🐛', data: [0.05, 0.04, 0.03, 0.02, 0.02, 0.03, 0.02] },
    { name: 'Memory Usage', value: 67, unit: '%', status: 'warning', icon: '💾', data: [55, 58, 62, 65, 68, 70, 67] },
    { name: 'CPU Load', value: 34, unit: '%', status: 'good', icon: '🔲', data: [30, 35, 32, 38, 35, 33, 34] },
    { name: 'Active Sessions', value: 1247, unit: '', status: 'good', icon: '👥', data: [1100, 1150, 1200, 1180, 1220, 1240, 1247] },
    { name: 'API Latency', value: 89, unit: 'ms', status: 'good', icon: '🌐', data: [95, 92, 88, 85, 90, 87, 89] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-3xl">👁️</span> Sentinel
          </h2>
          <p className="text-white/40 mt-1">Real-time health monitoring & anomaly detection</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusIndicator status={health.status} size="lg" />
          <span className={`text-lg font-semibold ${
            health.status === 'nominal' ? 'text-emerald-400' :
            health.status === 'advisory' ? 'text-yellow-400' :
            health.status === 'warning' ? 'text-orange-400' : 'text-red-400'
          }`}>
            {health.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <GlowCard key={metric.name} className="p-5" glowColor={metric.status === 'warning' ? 'orange' : 'cyan'}>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-2xl">{metric.icon}</span>
                <div className="text-white/40 text-sm mt-2">{metric.name}</div>
                <div className="text-3xl font-bold text-white mt-1">
                  {metric.value}{metric.unit}
                </div>
              </div>
              <StatusIndicator status={metric.status === 'good' ? 'nominal' : 'warning'} />
            </div>
            <div className="mt-4">
              <Sparkline
                data={metric.data}
                color={metric.status === 'warning' ? '#F59E0B' : '#06B6D4'}
                height={35}
              />
            </div>
          </GlowCard>
        ))}
      </div>

      {/* Error Stream */}
      <GlowCard className="p-5" glowColor="red">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span>🔴</span> Error Stream
          </h3>
          <span className="text-white/30 text-sm">Live</span>
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
          {alerts.filter(a => a.source === 'sentinel').length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl">🎉</span>
              <div className="text-white/50 mt-2">No errors detected</div>
            </div>
          ) : (
            alerts.filter(a => a.source === 'sentinel').slice(0, 10).map((alert) => (
              <div key={alert.id} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white/30 text-xs font-mono">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </span>
                <span className="text-white/70 text-sm flex-1 truncate">{alert.message}</span>
              </div>
            ))
          )}
        </div>
      </GlowCard>
    </div>
  );
}

// Pulse - Periodic Analysis
function PulseDashboard() {
  const { state } = useAutodev();
  const { pulseCycles, digests } = state;

  const cycles = [
    { type: 'heartbeat', icon: '💓', frequency: 'Every 5 min', status: 'active' },
    { type: 'daily', icon: '📅', frequency: 'Daily @ 6 AM', status: 'idle' },
    { type: 'weekly', icon: '📊', frequency: 'Sundays', status: 'idle' },
    { type: 'monthly', icon: '📈', frequency: '1st of month', status: 'idle' },
    { type: 'quarterly', icon: '🎯', frequency: 'Quarter end', status: 'idle' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-3xl">💓</span> Pulse
        </h2>
        <p className="text-white/40 mt-1">Periodic analysis & scheduled reports</p>
      </div>

      {/* Cycle Status */}
      <div className="grid grid-cols-5 gap-4">
        {cycles.map((cycle) => (
          <GlowCard
            key={cycle.type}
            className="p-5 text-center"
            glowColor={cycle.status === 'active' ? 'emerald' : 'purple'}
          >
            <div className="text-4xl mb-3">{cycle.icon}</div>
            <div className="text-white font-semibold capitalize">{cycle.type}</div>
            <div className="text-white/40 text-xs mt-1">{cycle.frequency}</div>
            <div className={`mt-3 text-xs px-2 py-1 rounded-full inline-block ${
              cycle.status === 'active'
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-white/10 text-white/40'
            }`}>
              {cycle.status === 'active' && <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1 animate-pulse" />}
              {cycle.status}
            </div>
          </GlowCard>
        ))}
      </div>

      {/* Digests */}
      <GlowCard className="p-5">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>📝</span> Recent Digests
        </h3>
        {digests.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-5xl">📊</span>
            <div className="text-white/50 mt-4">No digests yet</div>
            <div className="text-white/30 text-sm mt-1">
              Digests are generated based on pulse cycles
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {digests.slice(0, 5).map((digest) => (
              <div key={digest.id} className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium capitalize">{digest.type}</span>
                  <span className="text-white/30 text-xs">
                    {new Date(digest.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-white/50 text-sm mt-2">{digest.summary}</p>
              </div>
            ))}
          </div>
        )}
      </GlowCard>
    </div>
  );
}

// Cortex - AI Intelligence
function CortexDashboard() {
  const { state, approveRecommendation, rejectRecommendation } = useAutodev();
  const { patterns, predictions, recommendations, learningStats } = state;

  const pendingRecs = recommendations.filter((r) => r.status === 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-3xl">🧠</span> Cortex
        </h2>
        <p className="text-white/40 mt-1">AI intelligence core & recommendation engine</p>
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-4 gap-4">
        <GlowCard className="p-5 text-center" glowColor="purple">
          <div className="text-4xl font-bold text-white">
            <AnimatedNumber value={learningStats.totalRecommendations} />
          </div>
          <div className="text-white/40 text-sm mt-1">Total Analyzed</div>
        </GlowCard>
        <GlowCard className="p-5 text-center" glowColor="emerald">
          <div className="text-4xl font-bold text-emerald-400">
            <AnimatedNumber value={learningStats.accepted} />
          </div>
          <div className="text-white/40 text-sm mt-1">Accepted</div>
        </GlowCard>
        <GlowCard className="p-5 text-center" glowColor="red">
          <div className="text-4xl font-bold text-red-400">
            <AnimatedNumber value={learningStats.rejected} />
          </div>
          <div className="text-white/40 text-sm mt-1">Rejected</div>
        </GlowCard>
        <GlowCard className="p-5 text-center" glowColor="cyan">
          <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {(learningStats.successRate * 100).toFixed(0)}%
          </div>
          <div className="text-white/40 text-sm mt-1">Success Rate</div>
        </GlowCard>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>💡</span> Pending Recommendations ({pendingRecs.length})
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {pendingRecs.length === 0 ? (
            <GlowCard className="col-span-2 p-12 text-center">
              <span className="text-6xl">🤖</span>
              <div className="text-white/70 text-lg mt-4">AI is learning...</div>
              <div className="text-white/30 mt-2">
                Recommendations will appear as patterns emerge
              </div>
            </GlowCard>
          ) : (
            pendingRecs.map((rec) => (
              <RecommendationCard
                key={rec.id}
                rec={rec}
                onApprove={() => approveRecommendation(rec.id)}
                onReject={() => rejectRecommendation(rec.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Patterns & Predictions */}
      <div className="grid grid-cols-2 gap-6">
        <GlowCard className="p-5">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>🔍</span> Detected Patterns
          </h3>
          {patterns.length === 0 ? (
            <div className="text-center py-8 text-white/40">
              <span className="text-3xl">👀</span>
              <div className="mt-2">Analyzing patterns...</div>
            </div>
          ) : (
            <div className="space-y-2">
              {patterns.map((p) => (
                <div key={p.id} className="p-3 bg-white/5 rounded-lg">
                  <div className="text-white text-sm">{p.description}</div>
                  <div className="text-white/30 text-xs mt-1">
                    Confidence: {(p.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlowCard>

        <GlowCard className="p-5">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>🔮</span> Predictions
          </h3>
          {predictions.length === 0 ? (
            <div className="text-center py-8 text-white/40">
              <span className="text-3xl">🎱</span>
              <div className="mt-2">Forecasting future...</div>
            </div>
          ) : (
            <div className="space-y-2">
              {predictions.map((p) => (
                <div key={p.id} className="p-3 bg-white/5 rounded-lg">
                  <div className="text-white text-sm">{p.description}</div>
                  <div className="flex gap-3 text-xs mt-1">
                    <span className="text-cyan-400">{(p.probability * 100).toFixed(0)}% likely</span>
                    <span className="text-white/30">{p.timeframe}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlowCard>
      </div>
    </div>
  );
}

// Genesis - Self-Healing
function GenesisDashboard() {
  const { state, setAutonomyDial, updateHealingRule } = useAutodev();
  const { healingRules, healingHistory, autonomyConfig } = state;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-3xl">🔧</span> Genesis
        </h2>
        <p className="text-white/40 mt-1">Self-healing module with configurable autonomy</p>
      </div>

      {/* Autonomy Dial */}
      <AutonomyDial
        value={autonomyConfig.dialPosition}
        onChange={setAutonomyDial}
      />

      {/* Healing Rules */}
      <GlowCard className="p-5">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>⚙️</span> Healing Rules
        </h3>
        {healingRules.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-5xl">🛠️</span>
            <div className="text-white/50 mt-4">No healing rules configured</div>
            <div className="text-white/30 text-sm mt-1">
              Rules define automatic responses to issues
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {healingRules.map((rule) => (
              <div
                key={rule.id}
                className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                  rule.enabled ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-white/5 border border-white/10'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{rule.name}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      rule.level === 0 ? 'bg-slate-500/20 text-slate-400' :
                      rule.level === 1 ? 'bg-blue-500/20 text-blue-400' :
                      rule.level === 2 ? 'bg-cyan-500/20 text-cyan-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      L{rule.level}
                    </span>
                  </div>
                  <div className="text-white/40 text-sm mt-1">{rule.trigger}</div>
                  <div className="text-white/30 text-xs mt-1">
                    {(rule.successRate * 100).toFixed(0)}% success • {rule.executionCount} runs
                  </div>
                </div>
                <button
                  onClick={() => updateHealingRule(rule.id, { enabled: !rule.enabled })}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    rule.enabled
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-white/10 text-white/50 hover:bg-white/20'
                  }`}
                >
                  {rule.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            ))}
          </div>
        )}
      </GlowCard>

      {/* Action History */}
      <GlowCard className="p-5">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>📜</span> Action History
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
          {healingHistory.length === 0 ? (
            <div className="text-center py-8 text-white/40">
              No healing actions yet
            </div>
          ) : (
            healingHistory.map((action) => (
              <div key={action.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  action.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                  action.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {action.status === 'completed' ? '✓' : action.status === 'failed' ? '✗' : '⋯'}
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm">{action.action}</div>
                  <div className="text-white/30 text-xs">
                    {new Date(action.startedAt).toLocaleString()}
                  </div>
                </div>
                {action.rollbackAvailable && action.status === 'completed' && (
                  <button className="px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-lg text-xs hover:bg-yellow-500/30">
                    Rollback
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </GlowCard>
    </div>
  );
}

// Nexus - Configuration
function NexusDashboard() {
  const { state, updateConfig } = useAutodev();
  const { config, auditLog } = state;

  const configSections = [
    {
      key: 'sentinel',
      name: 'Sentinel',
      icon: '👁️',
      enabled: config.sentinel.enabled,
      desc: 'Real-time monitoring',
      color: 'cyan'
    },
    {
      key: 'pulse',
      name: 'Pulse',
      icon: '💓',
      enabled: config.pulse.enabled,
      desc: 'Periodic analysis',
      color: 'purple'
    },
    {
      key: 'cortex',
      name: 'Cortex',
      icon: '🧠',
      enabled: config.cortex.enabled,
      desc: 'AI intelligence',
      color: 'emerald'
    },
    {
      key: 'genesis',
      name: 'Genesis',
      icon: '🔧',
      enabled: config.genesis.enabled,
      desc: 'Self-healing',
      color: 'orange'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-3xl">⚙️</span> Nexus
        </h2>
        <p className="text-white/40 mt-1">Central command hub & configuration</p>
      </div>

      {/* System Toggles */}
      <div className="grid grid-cols-4 gap-4">
        {configSections.map((section) => (
          <GlowCard
            key={section.key}
            className="p-5"
            glowColor={section.color as any}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{section.icon}</span>
              <button
                onClick={() => {
                  const key = section.key as keyof typeof config;
                  updateConfig({ [key]: { ...config[key], enabled: !section.enabled } });
                }}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  section.enabled ? 'bg-emerald-500' : 'bg-white/20'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                  section.enabled ? 'left-7' : 'left-1'
                }`} />
              </button>
            </div>
            <div className="text-white font-semibold">{section.name}</div>
            <div className="text-white/40 text-sm mt-1">{section.desc}</div>
          </GlowCard>
        ))}
      </div>

      {/* Audit Trail */}
      <GlowCard className="p-5">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>📋</span> Audit Trail
        </h3>
        <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar font-mono text-sm">
          {auditLog.length === 0 ? (
            <div className="text-center py-8 text-white/40">
              No audit entries yet
            </div>
          ) : (
            auditLog.map((entry) => (
              <div key={entry.id} className="flex items-start gap-3 p-2 bg-white/5 rounded-lg">
                <span className="text-white/30 text-xs whitespace-nowrap">
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
                <span className={`px-1.5 py-0.5 rounded text-xs ${
                  entry.actor === 'autodev' ? 'bg-purple-500/20 text-purple-400' :
                  entry.actor === 'user' ? 'bg-cyan-500/20 text-cyan-400' :
                  'bg-white/10 text-white/40'
                }`}>
                  {entry.actor}
                </span>
                <span className="text-white/70 flex-1">{entry.action}</span>
                <span className={`text-xs ${
                  entry.outcome === 'success' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {entry.outcome}
                </span>
              </div>
            ))
          )}
        </div>
      </GlowCard>
    </div>
  );
}

// ============ TAB NAVIGATION ============

const tabs: { id: AutodevTab; label: string; icon: string; color: string }[] = [
  { id: 'command', label: 'Command', icon: '⌘', color: 'from-purple-500 to-indigo-500' },
  { id: 'sentinel', label: 'Sentinel', icon: '👁️', color: 'from-cyan-500 to-blue-500' },
  { id: 'pulse', label: 'Pulse', icon: '💓', color: 'from-pink-500 to-rose-500' },
  { id: 'cortex', label: 'Cortex', icon: '🧠', color: 'from-emerald-500 to-teal-500' },
  { id: 'genesis', label: 'Genesis', icon: '🔧', color: 'from-orange-500 to-amber-500' },
  { id: 'nexus', label: 'Nexus', icon: '⚙️', color: 'from-slate-500 to-zinc-500' },
];

// ============ MAIN PAGE COMPONENT ============

function AutodevContent() {
  const { activeTab, setActiveTab, isLoading, error } = useAutodevUI();
  const { state } = useAutodev();

  const renderTab = useMemo(() => {
    switch (activeTab) {
      case 'command': return <CommandCenter />;
      case 'sentinel': return <SentinelDashboard />;
      case 'pulse': return <PulseDashboard />;
      case 'cortex': return <CortexDashboard />;
      case 'genesis': return <GenesisDashboard />;
      case 'nexus': return <NexusDashboard />;
      default: return <CommandCenter />;
    }
  }, [activeTab]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-abyss-base flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-spin"
               style={{ animationDuration: '2s' }} />
          <div className="text-white/50 mt-4">Initializing AUTODEV...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-abyss-base flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl">⚠️</span>
          <div className="text-red-400 mt-4">Error: {error}</div>
        </div>
      </div>
    );
  }

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen bg-abyss-base relative overflow-hidden">
      <NeuralBackground />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-purple-500/30">
                  AD
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-abyss-base animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">AUTODEV</h1>
                <p className="text-white/40 text-xs">Autonomous Development Intelligence</p>
              </div>
            </div>

            {/* System Status */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <StatusIndicator status={state.health.status} />
                <span className="text-white/50 text-sm">Health: {state.health.overall}%</span>
              </div>
              <div className="text-white/30 text-sm">
                Autonomy: <span className="text-purple-400 font-medium">{state.autonomyConfig.dialPosition}%</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 mt-4 -mb-px overflow-x-auto pb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-5 py-3 rounded-t-xl text-sm font-medium transition-all whitespace-nowrap
                  ${activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                    : 'text-white/50 hover:text-white hover:bg-white/5'}
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {renderTab}
      </main>

      {/* AI Chat Assistant */}
      <AIChatPanel
        context={{
          systemHealth: {
            overall: state.health.overall,
            status: state.health.status,
          },
          activeAlerts: state.alerts.filter(a => !a.resolvedAt).length,
          pendingRecommendations: state.recommendations.filter(r => r.status === 'pending').length,
          recentActions: state.healingHistory.slice(0, 5).map(a => a.action),
          currentPage: activeTab,
        }}
      />

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  );
}

// ============ EXPORT ============

export default function Autodev() {
  return (
    <AutodevProvider>
      <AutodevContent />
    </AutodevProvider>
  );
}
