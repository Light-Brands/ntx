// AUTODEV Context - Global State Management
// ==========================================

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { autodevStorage } from '../data/autodevStorage';
import {
  Alert,
  AuditEntry,
  AutodevAction,
  AutodevConfig,
  AutodevState,
  AutodevTab,
  AutodevUIState,
  AutonomyConfig,
  Digest,
  HealingAction,
  HealingRule,
  LearningStats,
  Pattern,
  Prediction,
  PulseCycle,
  Recommendation,
  SpecDefinition,
  SpecRegistry,
  SystemHealth,
} from '../data/autodevTypes';
import { initTelemetry } from '../utils/telemetry';

// ============ INITIAL STATE ============

const initialUIState: AutodevUIState = {
  activeTab: 'command',
  isConfiguring: false,
  searchQuery: '',
  filters: {},
};

const initialState: AutodevState = {
  health: {
    overall: 100,
    status: 'nominal',
    metrics: [],
    lastUpdated: new Date().toISOString(),
  },
  alerts: [],
  pulseCycles: [],
  digests: [],
  patterns: [],
  predictions: [],
  recommendations: [],
  learningStats: {
    totalRecommendations: 0,
    accepted: 0,
    rejected: 0,
    implemented: 0,
    successRate: 0,
    avgTimeToDecision: 0,
    topAcceptedTypes: [],
    topRejectedTypes: [],
  },
  healingRules: [],
  healingHistory: [],
  autonomyConfig: {
    dialPosition: 25,
    description: 'Conservative - L1 actions auto-executed',
    l0Behavior: 'manual',
    l1Behavior: 'auto',
    l2Behavior: 'manual',
    l3Behavior: 'manual',
  },
  config: {
    sentinel: {
      enabled: true,
      pollingInterval: 30,
      alertThresholds: {},
    },
    pulse: {
      enabled: true,
      schedules: {
        heartbeat: '*/5 * * * *',
        daily: '0 6 * * *',
        weekly: '0 6 * * 0',
        monthly: '0 6 1 * *',
        quarterly: '0 6 1 1,4,7,10 *',
      },
    },
    cortex: {
      enabled: true,
      autoRecommend: true,
      confidenceThreshold: 0.7,
    },
    genesis: {
      enabled: true,
      autonomyDial: 25,
      maxAutoLevel: 2,
      requireApprovalFor: ['code', 'infra'],
    },
  },
  auditLog: [],
  specRegistry: {
    activeSpecs: [],
    defaultSpec: 'vibeup-design-spec',
  },
  activeSpecId: 'vibeup-design-spec',
  ui: initialUIState,
  lastUpdated: new Date().toISOString(),
  isLoading: true,
  error: undefined,
};

// ============ REDUCER ============

function autodevReducer(state: AutodevState, action: AutodevAction): AutodevState {
  switch (action.type) {
    case 'SET_HEALTH':
      return { ...state, health: action.payload, lastUpdated: new Date().toISOString() };

    case 'ADD_ALERT':
      return {
        ...state,
        alerts: [action.payload, ...state.alerts].slice(0, 100),
        lastUpdated: new Date().toISOString(),
      };

    case 'ACKNOWLEDGE_ALERT':
      return {
        ...state,
        alerts: state.alerts.map((a) =>
          a.id === action.payload ? { ...a, acknowledged: true } : a
        ),
      };

    case 'RESOLVE_ALERT':
      return {
        ...state,
        alerts: state.alerts.map((a) =>
          a.id === action.payload.id
            ? { ...a, resolvedAt: new Date().toISOString(), resolution: action.payload.resolution }
            : a
        ),
      };

    case 'SET_PULSE_CYCLES':
      return { ...state, pulseCycles: action.payload };

    case 'ADD_DIGEST':
      return {
        ...state,
        digests: [action.payload, ...state.digests],
      };

    case 'SET_PATTERNS':
      return { ...state, patterns: action.payload };

    case 'SET_PREDICTIONS':
      return { ...state, predictions: action.payload };

    case 'ADD_RECOMMENDATION':
      return {
        ...state,
        recommendations: [action.payload, ...state.recommendations],
      };

    case 'UPDATE_RECOMMENDATION':
      return {
        ...state,
        recommendations: state.recommendations.map((r) =>
          r.id === action.payload.id ? { ...r, ...action.payload.update } : r
        ),
      };

    case 'SET_HEALING_RULES':
      return { ...state, healingRules: action.payload };

    case 'UPDATE_HEALING_RULE':
      return {
        ...state,
        healingRules: state.healingRules.map((r) =>
          r.id === action.payload.id ? { ...r, ...action.payload.update } : r
        ),
      };

    case 'ADD_HEALING_ACTION':
      return {
        ...state,
        healingHistory: [action.payload, ...state.healingHistory],
      };

    case 'UPDATE_HEALING_ACTION':
      return {
        ...state,
        healingHistory: state.healingHistory.map((a) =>
          a.id === action.payload.id ? { ...a, ...action.payload.update } : a
        ),
      };

    case 'SET_AUTONOMY_DIAL': {
      const position = action.payload;
      const autonomyConfig: AutonomyConfig = {
        dialPosition: position,
        description:
          position === 0
            ? 'All Manual - All actions require human approval'
            : position <= 25
              ? 'Conservative - L1 actions auto-executed'
              : position <= 50
                ? 'Balanced - L1-L2 actions auto-executed'
                : position <= 75
                  ? 'Aggressive - L1-L3 actions auto-executed'
                  : 'Full Auto - All actions auto-executed',
        l0Behavior: position >= 100 ? 'auto' : 'manual',
        l1Behavior: position >= 25 ? 'auto' : 'manual',
        l2Behavior: position >= 50 ? 'auto' : 'manual',
        l3Behavior: position >= 75 ? 'auto' : 'manual',
      };
      return { ...state, autonomyConfig };
    }

    case 'SET_CONFIG':
      return {
        ...state,
        config: { ...state.config, ...action.payload },
      };

    case 'ADD_AUDIT_ENTRY':
      return {
        ...state,
        auditLog: [action.payload, ...state.auditLog].slice(0, 500),
      };

    case 'SET_ACTIVE_SPEC':
      return { ...state, activeSpecId: action.payload };

    case 'REGISTER_SPEC': {
      const existingIndex = state.specRegistry.activeSpecs.findIndex(
        (s) => s.id === action.payload.id
      );
      const newSpecs =
        existingIndex !== -1
          ? state.specRegistry.activeSpecs.map((s, i) =>
              i === existingIndex ? action.payload : s
            )
          : [...state.specRegistry.activeSpecs, action.payload];
      return {
        ...state,
        specRegistry: { ...state.specRegistry, activeSpecs: newSpecs },
      };
    }

    case 'SET_UI_STATE':
      return {
        ...state,
        ui: { ...state.ui, ...action.payload },
      };

    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        ui: { ...state.ui, activeTab: action.payload },
      };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'REFRESH_ALL':
      return { ...state, lastUpdated: new Date().toISOString() };

    default:
      return state;
  }
}

// ============ CONTEXT ============

interface AutodevContextValue {
  state: AutodevState;
  dispatch: React.Dispatch<AutodevAction>;

  // Health & Alerts
  refreshHealth: () => Promise<void>;
  acknowledgeAlert: (id: string) => void;
  resolveAlert: (id: string, resolution: string) => void;

  // Pulse
  refreshPulseCycles: () => void;
  getDigests: (type?: string, limit?: number) => Promise<Digest[]>;

  // Cortex
  refreshIntelligence: () => Promise<void>;
  approveRecommendation: (id: string) => Promise<void>;
  rejectRecommendation: (id: string) => Promise<void>;
  implementRecommendation: (id: string, outcome?: string) => Promise<void>;

  // Genesis
  refreshHealingRules: () => void;
  updateHealingRule: (id: string, update: Partial<HealingRule>) => void;
  setAutonomyDial: (position: number) => void;
  triggerHealing: (ruleId: string) => Promise<HealingAction>;

  // Nexus
  updateConfig: (update: Partial<AutodevConfig>) => void;
  addAuditEntry: (entry: Omit<AuditEntry, 'id' | 'timestamp'>) => Promise<void>;

  // Prism
  registerSpec: (spec: SpecDefinition) => void;
  setActiveSpec: (specId: string) => void;

  // UI
  setActiveTab: (tab: AutodevTab) => void;
  setSearchQuery: (query: string) => void;
}

const AutodevContext = createContext<AutodevContextValue | null>(null);

// ============ PROVIDER ============

interface AutodevProviderProps {
  children: React.ReactNode;
}

export function AutodevProvider({ children }: AutodevProviderProps) {
  const [state, dispatch] = useReducer(autodevReducer, initialState);

  // Initialize telemetry on mount
  useEffect(() => {
    initTelemetry({ debug: false });
  }, []);

  // Load initial state from storage
  useEffect(() => {
    async function loadState() {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });

        const storedState = await autodevStorage.getFullState();

        if (storedState.health) {
          dispatch({ type: 'SET_HEALTH', payload: storedState.health });
        }

        if (storedState.alerts) {
          storedState.alerts.forEach((alert) => {
            dispatch({ type: 'ADD_ALERT', payload: alert });
          });
        }

        if (storedState.pulseCycles) {
          dispatch({ type: 'SET_PULSE_CYCLES', payload: storedState.pulseCycles });
        }

        if (storedState.patterns) {
          dispatch({ type: 'SET_PATTERNS', payload: storedState.patterns });
        }

        if (storedState.predictions) {
          dispatch({ type: 'SET_PREDICTIONS', payload: storedState.predictions });
        }

        if (storedState.recommendations) {
          storedState.recommendations.forEach((rec) => {
            dispatch({ type: 'ADD_RECOMMENDATION', payload: rec });
          });
        }

        if (storedState.healingRules) {
          dispatch({ type: 'SET_HEALING_RULES', payload: storedState.healingRules });
        }

        if (storedState.autonomyConfig) {
          dispatch({ type: 'SET_AUTONOMY_DIAL', payload: storedState.autonomyConfig.dialPosition });
        }

        if (storedState.config) {
          dispatch({ type: 'SET_CONFIG', payload: storedState.config });
        }

        if (storedState.specRegistry) {
          storedState.specRegistry.activeSpecs.forEach((spec) => {
            dispatch({ type: 'REGISTER_SPEC', payload: spec });
          });
        }

        if (storedState.activeSpecId) {
          dispatch({ type: 'SET_ACTIVE_SPEC', payload: storedState.activeSpecId });
        }

        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        console.error('Failed to load AUTODEV state:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load state' });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }

    loadState();
  }, []);

  // Periodic health refresh
  useEffect(() => {
    const interval = setInterval(() => {
      const health = autodevStorage.getSystemHealth();
      dispatch({ type: 'SET_HEALTH', payload: health });
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // ============ ACTIONS ============

  const refreshHealth = useCallback(async () => {
    const health = autodevStorage.getSystemHealth();
    dispatch({ type: 'SET_HEALTH', payload: health });
  }, []);

  const acknowledgeAlert = useCallback((id: string) => {
    autodevStorage.acknowledgeAlert(id);
    dispatch({ type: 'ACKNOWLEDGE_ALERT', payload: id });
  }, []);

  const resolveAlert = useCallback((id: string, resolution: string) => {
    autodevStorage.resolveAlert(id, resolution);
    dispatch({ type: 'RESOLVE_ALERT', payload: { id, resolution } });
  }, []);

  const refreshPulseCycles = useCallback(() => {
    const cycles = autodevStorage.getPulseCycles();
    dispatch({ type: 'SET_PULSE_CYCLES', payload: cycles });
  }, []);

  const getDigests = useCallback(async (type?: string, limit?: number): Promise<Digest[]> => {
    return autodevStorage.getDigests(type as any, limit);
  }, []);

  const refreshIntelligence = useCallback(async () => {
    const [patterns, predictions, recommendations] = await Promise.all([
      autodevStorage.getPatterns(),
      autodevStorage.getPredictions(),
      autodevStorage.getRecommendations(),
    ]);

    dispatch({ type: 'SET_PATTERNS', payload: patterns });
    dispatch({ type: 'SET_PREDICTIONS', payload: predictions });
    recommendations.forEach((rec) => {
      dispatch({ type: 'ADD_RECOMMENDATION', payload: rec });
    });
  }, []);

  const approveRecommendation = useCallback(async (id: string) => {
    await autodevStorage.updateRecommendation(id, {
      status: 'approved',
      reviewedAt: new Date().toISOString(),
    });
    dispatch({
      type: 'UPDATE_RECOMMENDATION',
      payload: { id, update: { status: 'approved', reviewedAt: new Date().toISOString() } },
    });
  }, []);

  const rejectRecommendation = useCallback(async (id: string) => {
    await autodevStorage.updateRecommendation(id, {
      status: 'rejected',
      reviewedAt: new Date().toISOString(),
    });
    dispatch({
      type: 'UPDATE_RECOMMENDATION',
      payload: { id, update: { status: 'rejected', reviewedAt: new Date().toISOString() } },
    });
  }, []);

  const implementRecommendation = useCallback(async (id: string, outcome?: string) => {
    await autodevStorage.updateRecommendation(id, {
      status: 'implemented',
      implementedAt: new Date().toISOString(),
      outcome,
    });
    dispatch({
      type: 'UPDATE_RECOMMENDATION',
      payload: {
        id,
        update: { status: 'implemented', implementedAt: new Date().toISOString(), outcome },
      },
    });
  }, []);

  const refreshHealingRules = useCallback(() => {
    const rules = autodevStorage.getHealingRules();
    dispatch({ type: 'SET_HEALING_RULES', payload: rules });
  }, []);

  const updateHealingRule = useCallback((id: string, update: Partial<HealingRule>) => {
    autodevStorage.updateHealingRule(id, update);
    dispatch({ type: 'UPDATE_HEALING_RULE', payload: { id, update } });
  }, []);

  const setAutonomyDial = useCallback((position: number) => {
    autodevStorage.setAutonomyDial(position);
    dispatch({ type: 'SET_AUTONOMY_DIAL', payload: position });
  }, []);

  const triggerHealing = useCallback(async (ruleId: string): Promise<HealingAction> => {
    const action: HealingAction = {
      id: `heal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ruleId,
      trigger: 'manual',
      action: 'Manually triggered healing action',
      status: 'pending',
      startedAt: new Date().toISOString(),
      rollbackAvailable: true,
    };

    await autodevStorage.addHealingAction(action);
    dispatch({ type: 'ADD_HEALING_ACTION', payload: action });

    return action;
  }, []);

  const updateConfig = useCallback((update: Partial<AutodevConfig>) => {
    autodevStorage.updateConfig(update);
    dispatch({ type: 'SET_CONFIG', payload: update });
  }, []);

  const addAuditEntry = useCallback(
    async (entry: Omit<AuditEntry, 'id' | 'timestamp'>) => {
      const fullEntry: AuditEntry = {
        id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        ...entry,
      };

      await autodevStorage.addAuditEntry(fullEntry);
      dispatch({ type: 'ADD_AUDIT_ENTRY', payload: fullEntry });
    },
    []
  );

  const registerSpec = useCallback((spec: SpecDefinition) => {
    autodevStorage.registerSpec(spec);
    dispatch({ type: 'REGISTER_SPEC', payload: spec });
  }, []);

  const setActiveSpec = useCallback((specId: string) => {
    autodevStorage.setActiveSpec(specId);
    dispatch({ type: 'SET_ACTIVE_SPEC', payload: specId });
  }, []);

  const setActiveTab = useCallback((tab: AutodevTab) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: 'SET_UI_STATE', payload: { searchQuery: query } });
  }, []);

  // ============ MEMOIZED VALUE ============

  const value = useMemo<AutodevContextValue>(
    () => ({
      state,
      dispatch,
      refreshHealth,
      acknowledgeAlert,
      resolveAlert,
      refreshPulseCycles,
      getDigests,
      refreshIntelligence,
      approveRecommendation,
      rejectRecommendation,
      implementRecommendation,
      refreshHealingRules,
      updateHealingRule,
      setAutonomyDial,
      triggerHealing,
      updateConfig,
      addAuditEntry,
      registerSpec,
      setActiveSpec,
      setActiveTab,
      setSearchQuery,
    }),
    [
      state,
      refreshHealth,
      acknowledgeAlert,
      resolveAlert,
      refreshPulseCycles,
      getDigests,
      refreshIntelligence,
      approveRecommendation,
      rejectRecommendation,
      implementRecommendation,
      refreshHealingRules,
      updateHealingRule,
      setAutonomyDial,
      triggerHealing,
      updateConfig,
      addAuditEntry,
      registerSpec,
      setActiveSpec,
      setActiveTab,
      setSearchQuery,
    ]
  );

  return <AutodevContext.Provider value={value}>{children}</AutodevContext.Provider>;
}

// ============ HOOKS ============

export function useAutodev(): AutodevContextValue {
  const context = useContext(AutodevContext);
  if (!context) {
    throw new Error('useAutodev must be used within an AutodevProvider');
  }
  return context;
}

export function useAutodevHealth(): {
  health: SystemHealth;
  alerts: Alert[];
  refresh: () => Promise<void>;
} {
  const { state, refreshHealth } = useAutodev();
  return {
    health: state.health,
    alerts: state.alerts,
    refresh: refreshHealth,
  };
}

export function useAutodevPulse(): {
  cycles: PulseCycle[];
  digests: Digest[];
  refresh: () => void;
} {
  const { state, refreshPulseCycles } = useAutodev();
  return {
    cycles: state.pulseCycles,
    digests: state.digests,
    refresh: refreshPulseCycles,
  };
}

export function useAutodevCortex(): {
  patterns: Pattern[];
  predictions: Prediction[];
  recommendations: Recommendation[];
  learningStats: LearningStats;
  refresh: () => Promise<void>;
  approve: (id: string) => Promise<void>;
  reject: (id: string) => Promise<void>;
  implement: (id: string, outcome?: string) => Promise<void>;
} {
  const {
    state,
    refreshIntelligence,
    approveRecommendation,
    rejectRecommendation,
    implementRecommendation,
  } = useAutodev();
  return {
    patterns: state.patterns,
    predictions: state.predictions,
    recommendations: state.recommendations,
    learningStats: state.learningStats,
    refresh: refreshIntelligence,
    approve: approveRecommendation,
    reject: rejectRecommendation,
    implement: implementRecommendation,
  };
}

export function useAutodevGenesis(): {
  rules: HealingRule[];
  history: HealingAction[];
  autonomy: AutonomyConfig;
  refreshRules: () => void;
  updateRule: (id: string, update: Partial<HealingRule>) => void;
  setDial: (position: number) => void;
  trigger: (ruleId: string) => Promise<HealingAction>;
} {
  const {
    state,
    refreshHealingRules,
    updateHealingRule,
    setAutonomyDial,
    triggerHealing,
  } = useAutodev();
  return {
    rules: state.healingRules,
    history: state.healingHistory,
    autonomy: state.autonomyConfig,
    refreshRules: refreshHealingRules,
    updateRule: updateHealingRule,
    setDial: setAutonomyDial,
    trigger: triggerHealing,
  };
}

export function useAutodevNexus(): {
  config: AutodevConfig;
  auditLog: AuditEntry[];
  updateConfig: (update: Partial<AutodevConfig>) => void;
  addAudit: (entry: Omit<AuditEntry, 'id' | 'timestamp'>) => Promise<void>;
} {
  const { state, updateConfig, addAuditEntry } = useAutodev();
  return {
    config: state.config,
    auditLog: state.auditLog,
    updateConfig,
    addAudit: addAuditEntry,
  };
}

export function useAutodevPrism(): {
  registry: SpecRegistry;
  activeSpecId: string;
  register: (spec: SpecDefinition) => void;
  setActive: (specId: string) => void;
} {
  const { state, registerSpec, setActiveSpec } = useAutodev();
  return {
    registry: state.specRegistry,
    activeSpecId: state.activeSpecId,
    register: registerSpec,
    setActive: setActiveSpec,
  };
}

export function useAutodevUI(): {
  activeTab: AutodevTab;
  searchQuery: string;
  isLoading: boolean;
  error?: string;
  setActiveTab: (tab: AutodevTab) => void;
  setSearchQuery: (query: string) => void;
} {
  const { state, setActiveTab, setSearchQuery } = useAutodev();
  return {
    activeTab: state.ui.activeTab,
    searchQuery: state.ui.searchQuery,
    isLoading: state.isLoading,
    error: state.error,
    setActiveTab,
    setSearchQuery,
  };
}

export default AutodevContext;
