// AUTODEV Storage Layer - localStorage + IndexedDB
// ==================================================

import {
  Alert,
  AlertFilter,
  AuditEntry,
  AutodevConfig,
  AutodevState,
  AutonomyConfig,
  Digest,
  HealingAction,
  HealingRule,
  LearningStats,
  Pattern,
  Prediction,
  PulseCycle,
  PulseCycleType,
  Recommendation,
  SpecDefinition,
  SpecRegistry,
  SystemHealth,
  TelemetryEvent,
} from './autodevTypes';

// ============ CONSTANTS ============

const STORAGE_KEYS = {
  HEALTH: 'autodev:health',
  ALERTS: 'autodev:alerts',
  CONFIG: 'autodev:config',
  AUTONOMY: 'autodev:autonomy',
  PULSE_CYCLES: 'autodev:pulse_cycles',
  HEALING_RULES: 'autodev:healing_rules',
  SPEC_REGISTRY: 'autodev:spec_registry',
  ACTIVE_SPEC: 'autodev:active_spec',
} as const;

const IDB_NAME = 'autodev_db';
const IDB_VERSION = 1;

const IDB_STORES = {
  TELEMETRY: 'telemetry',
  DIGESTS: 'digests',
  PATTERNS: 'patterns',
  PREDICTIONS: 'predictions',
  RECOMMENDATIONS: 'recommendations',
  HEALING_HISTORY: 'healing_history',
  AUDIT_LOG: 'audit_log',
} as const;

// ============ INDEXEDDB SETUP ============

let dbPromise: Promise<IDBDatabase> | null = null;

function openDatabase(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(IDB_NAME, IDB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Telemetry events - last 24 hours
      if (!db.objectStoreNames.contains(IDB_STORES.TELEMETRY)) {
        const telemetryStore = db.createObjectStore(IDB_STORES.TELEMETRY, { keyPath: 'id' });
        telemetryStore.createIndex('timestamp', 'timestamp', { unique: false });
        telemetryStore.createIndex('type', 'type', { unique: false });
        telemetryStore.createIndex('sessionId', 'sessionId', { unique: false });
      }

      // Digests - last 30 days
      if (!db.objectStoreNames.contains(IDB_STORES.DIGESTS)) {
        const digestsStore = db.createObjectStore(IDB_STORES.DIGESTS, { keyPath: 'id' });
        digestsStore.createIndex('type', 'type', { unique: false });
        digestsStore.createIndex('createdAt', 'createdAt', { unique: false });
      }

      // Patterns
      if (!db.objectStoreNames.contains(IDB_STORES.PATTERNS)) {
        const patternsStore = db.createObjectStore(IDB_STORES.PATTERNS, { keyPath: 'id' });
        patternsStore.createIndex('type', 'type', { unique: false });
        patternsStore.createIndex('lastSeen', 'lastSeen', { unique: false });
      }

      // Predictions
      if (!db.objectStoreNames.contains(IDB_STORES.PREDICTIONS)) {
        const predictionsStore = db.createObjectStore(IDB_STORES.PREDICTIONS, { keyPath: 'id' });
        predictionsStore.createIndex('type', 'type', { unique: false });
      }

      // Recommendations
      if (!db.objectStoreNames.contains(IDB_STORES.RECOMMENDATIONS)) {
        const recommendationsStore = db.createObjectStore(IDB_STORES.RECOMMENDATIONS, { keyPath: 'id' });
        recommendationsStore.createIndex('status', 'status', { unique: false });
        recommendationsStore.createIndex('type', 'type', { unique: false });
        recommendationsStore.createIndex('severity', 'severity', { unique: false });
        recommendationsStore.createIndex('createdAt', 'createdAt', { unique: false });
      }

      // Healing History
      if (!db.objectStoreNames.contains(IDB_STORES.HEALING_HISTORY)) {
        const healingStore = db.createObjectStore(IDB_STORES.HEALING_HISTORY, { keyPath: 'id' });
        healingStore.createIndex('ruleId', 'ruleId', { unique: false });
        healingStore.createIndex('status', 'status', { unique: false });
        healingStore.createIndex('startedAt', 'startedAt', { unique: false });
      }

      // Audit Log
      if (!db.objectStoreNames.contains(IDB_STORES.AUDIT_LOG)) {
        const auditStore = db.createObjectStore(IDB_STORES.AUDIT_LOG, { keyPath: 'id' });
        auditStore.createIndex('timestamp', 'timestamp', { unique: false });
        auditStore.createIndex('actor', 'actor', { unique: false });
        auditStore.createIndex('action', 'action', { unique: false });
      }
    };
  });

  return dbPromise;
}

// ============ GENERIC IDB HELPERS ============

async function idbGet<T>(storeName: string, key: string): Promise<T | undefined> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(key);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function idbGetAll<T>(storeName: string): Promise<T[]> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function idbGetByIndex<T>(storeName: string, indexName: string, value: IDBValidKey): Promise<T[]> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const index = store.index(indexName);
    const request = index.getAll(value);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function idbPut<T>(storeName: string, item: T): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(item);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

async function idbDelete(storeName: string, key: string): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(key);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

async function idbClear(storeName: string): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.clear();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

// ============ LOCALSTORAGE HELPERS ============

function lsGet<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

function lsSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('LocalStorage write error:', error);
  }
}

function lsRemove(key: string): void {
  localStorage.removeItem(key);
}

// ============ DEFAULT VALUES ============

const defaultHealth: SystemHealth = {
  overall: 100,
  status: 'nominal',
  metrics: [],
  lastUpdated: new Date().toISOString(),
};

const defaultConfig: AutodevConfig = {
  sentinel: {
    enabled: true,
    pollingInterval: 30,
    alertThresholds: {
      errorRate: { warning: 0.02, critical: 0.05 },
      responseTime: { warning: 2000, critical: 5000 },
      memoryUsage: { warning: 70, critical: 85 },
    },
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
};

const defaultAutonomy: AutonomyConfig = {
  dialPosition: 25,
  description: 'Conservative - L1 actions auto-executed, others require approval',
  l0Behavior: 'manual',
  l1Behavior: 'auto',
  l2Behavior: 'manual',
  l3Behavior: 'manual',
};

const defaultPulseCycles: PulseCycle[] = [
  { type: 'heartbeat', lastRun: '', nextRun: '', status: 'idle', findings: 0 },
  { type: 'daily', lastRun: '', nextRun: '', status: 'idle', findings: 0 },
  { type: 'weekly', lastRun: '', nextRun: '', status: 'idle', findings: 0 },
  { type: 'monthly', lastRun: '', nextRun: '', status: 'idle', findings: 0 },
  { type: 'quarterly', lastRun: '', nextRun: '', status: 'idle', findings: 0 },
];

const defaultSpecRegistry: SpecRegistry = {
  activeSpecs: [
    {
      id: 'vibeup-design-spec',
      name: 'VIBEUP Design System',
      version: '1.0.0',
      repo: {
        url: 'https://github.com/vibeup/design-system',
        branch: 'main',
        specPath: '/spec',
      },
      telemetry: {
        enabled: true,
        endpoints: [],
        components: [],
        customMetrics: [],
      },
      healingRules: [],
      integration: {
        aiCodingConfig: true,
        prLabels: ['autodev', 'automated'],
        reviewers: [],
        codeowners: true,
      },
    },
  ],
  defaultSpec: 'vibeup-design-spec',
};

// ============ AUTODEV STORAGE API ============

export const autodevStorage = {
  // ========== HEALTH & ALERTS ==========

  getSystemHealth(): SystemHealth {
    return lsGet<SystemHealth>(STORAGE_KEYS.HEALTH) || defaultHealth;
  },

  setSystemHealth(health: SystemHealth): void {
    lsSet(STORAGE_KEYS.HEALTH, health);
  },

  getAlerts(): Alert[] {
    return lsGet<Alert[]>(STORAGE_KEYS.ALERTS) || [];
  },

  setAlerts(alerts: Alert[]): void {
    lsSet(STORAGE_KEYS.ALERTS, alerts);
  },

  addAlert(alert: Alert): void {
    const alerts = this.getAlerts();
    alerts.unshift(alert);
    // Keep last 100 alerts in localStorage
    this.setAlerts(alerts.slice(0, 100));
  },

  acknowledgeAlert(id: string): void {
    const alerts = this.getAlerts();
    const index = alerts.findIndex((a) => a.id === id);
    if (index !== -1) {
      alerts[index].acknowledged = true;
      this.setAlerts(alerts);
    }
  },

  resolveAlert(id: string, resolution: string): void {
    const alerts = this.getAlerts();
    const index = alerts.findIndex((a) => a.id === id);
    if (index !== -1) {
      alerts[index].resolvedAt = new Date().toISOString();
      alerts[index].resolution = resolution;
      this.setAlerts(alerts);
    }
  },

  getFilteredAlerts(filter?: AlertFilter): Alert[] {
    let alerts = this.getAlerts();

    if (filter?.level?.length) {
      alerts = alerts.filter((a) => filter.level!.includes(a.level));
    }
    if (filter?.source?.length) {
      alerts = alerts.filter((a) => filter.source!.includes(a.source));
    }
    if (filter?.acknowledged !== undefined) {
      alerts = alerts.filter((a) => a.acknowledged === filter.acknowledged);
    }
    if (filter?.startDate) {
      alerts = alerts.filter((a) => a.timestamp >= filter.startDate!);
    }
    if (filter?.endDate) {
      alerts = alerts.filter((a) => a.timestamp <= filter.endDate!);
    }

    return alerts;
  },

  // ========== PULSE & DIGESTS ==========

  getPulseCycles(): PulseCycle[] {
    return lsGet<PulseCycle[]>(STORAGE_KEYS.PULSE_CYCLES) || defaultPulseCycles;
  },

  setPulseCycles(cycles: PulseCycle[]): void {
    lsSet(STORAGE_KEYS.PULSE_CYCLES, cycles);
  },

  updatePulseCycle(type: PulseCycleType, update: Partial<PulseCycle>): void {
    const cycles = this.getPulseCycles();
    const index = cycles.findIndex((c) => c.type === type);
    if (index !== -1) {
      cycles[index] = { ...cycles[index], ...update };
      this.setPulseCycles(cycles);
    }
  },

  async getDigests(type?: PulseCycleType, limit?: number): Promise<Digest[]> {
    let digests = await idbGetAll<Digest>(IDB_STORES.DIGESTS);

    if (type) {
      digests = digests.filter((d) => d.type === type);
    }

    digests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (limit) {
      digests = digests.slice(0, limit);
    }

    return digests;
  },

  async addDigest(digest: Digest): Promise<void> {
    await idbPut(IDB_STORES.DIGESTS, digest);
  },

  // ========== CORTEX INTELLIGENCE ==========

  async getPatterns(type?: string): Promise<Pattern[]> {
    if (type) {
      return idbGetByIndex<Pattern>(IDB_STORES.PATTERNS, 'type', type);
    }
    return idbGetAll<Pattern>(IDB_STORES.PATTERNS);
  },

  async addPattern(pattern: Pattern): Promise<void> {
    await idbPut(IDB_STORES.PATTERNS, pattern);
  },

  async getPredictions(): Promise<Prediction[]> {
    return idbGetAll<Prediction>(IDB_STORES.PREDICTIONS);
  },

  async addPrediction(prediction: Prediction): Promise<void> {
    await idbPut(IDB_STORES.PREDICTIONS, prediction);
  },

  async getRecommendations(status?: string): Promise<Recommendation[]> {
    if (status) {
      return idbGetByIndex<Recommendation>(IDB_STORES.RECOMMENDATIONS, 'status', status);
    }
    return idbGetAll<Recommendation>(IDB_STORES.RECOMMENDATIONS);
  },

  async addRecommendation(recommendation: Recommendation): Promise<void> {
    await idbPut(IDB_STORES.RECOMMENDATIONS, recommendation);
  },

  async updateRecommendation(id: string, update: Partial<Recommendation>): Promise<void> {
    const existing = await idbGet<Recommendation>(IDB_STORES.RECOMMENDATIONS, id);
    if (existing) {
      await idbPut(IDB_STORES.RECOMMENDATIONS, { ...existing, ...update });
    }
  },

  async getLearningStats(): Promise<LearningStats> {
    const recommendations = await this.getRecommendations();
    const accepted = recommendations.filter((r) => r.status === 'approved' || r.status === 'implemented');
    const rejected = recommendations.filter((r) => r.status === 'rejected');
    const implemented = recommendations.filter((r) => r.status === 'implemented');

    const successfulImplementations = implemented.filter((r) => r.outcome?.includes('success'));

    return {
      totalRecommendations: recommendations.length,
      accepted: accepted.length,
      rejected: rejected.length,
      implemented: implemented.length,
      successRate: implemented.length > 0 ? successfulImplementations.length / implemented.length : 0,
      avgTimeToDecision: 0, // Would need to calculate from timestamps
      topAcceptedTypes: [],
      topRejectedTypes: [],
    };
  },

  // ========== GENESIS HEALING ==========

  getHealingRules(): HealingRule[] {
    return lsGet<HealingRule[]>(STORAGE_KEYS.HEALING_RULES) || [];
  },

  setHealingRules(rules: HealingRule[]): void {
    lsSet(STORAGE_KEYS.HEALING_RULES, rules);
  },

  updateHealingRule(id: string, update: Partial<HealingRule>): void {
    const rules = this.getHealingRules();
    const index = rules.findIndex((r) => r.id === id);
    if (index !== -1) {
      rules[index] = { ...rules[index], ...update };
      this.setHealingRules(rules);
    }
  },

  async getHealingHistory(limit?: number): Promise<HealingAction[]> {
    let actions = await idbGetAll<HealingAction>(IDB_STORES.HEALING_HISTORY);
    actions.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());

    if (limit) {
      actions = actions.slice(0, limit);
    }

    return actions;
  },

  async addHealingAction(action: HealingAction): Promise<void> {
    await idbPut(IDB_STORES.HEALING_HISTORY, action);
  },

  async updateHealingAction(id: string, update: Partial<HealingAction>): Promise<void> {
    const existing = await idbGet<HealingAction>(IDB_STORES.HEALING_HISTORY, id);
    if (existing) {
      await idbPut(IDB_STORES.HEALING_HISTORY, { ...existing, ...update });
    }
  },

  getAutonomyConfig(): AutonomyConfig {
    return lsGet<AutonomyConfig>(STORAGE_KEYS.AUTONOMY) || defaultAutonomy;
  },

  setAutonomyConfig(config: AutonomyConfig): void {
    lsSet(STORAGE_KEYS.AUTONOMY, config);
  },

  setAutonomyDial(position: number): void {
    const config = this.getAutonomyConfig();
    config.dialPosition = position;

    // Update behavior based on dial position
    config.l0Behavior = position >= 100 ? 'auto' : 'manual';
    config.l1Behavior = position >= 25 ? 'auto' : 'manual';
    config.l2Behavior = position >= 50 ? 'auto' : 'manual';
    config.l3Behavior = position >= 75 ? 'auto' : 'manual';

    // Update description
    if (position === 0) {
      config.description = 'All Manual - All actions require human approval';
    } else if (position <= 25) {
      config.description = 'Conservative - L1 actions auto-executed';
    } else if (position <= 50) {
      config.description = 'Balanced - L1-L2 actions auto-executed';
    } else if (position <= 75) {
      config.description = 'Aggressive - L1-L3 actions auto-executed';
    } else {
      config.description = 'Full Auto - All actions auto-executed';
    }

    this.setAutonomyConfig(config);
  },

  // ========== NEXUS CONFIG & AUDIT ==========

  getConfig(): AutodevConfig {
    return lsGet<AutodevConfig>(STORAGE_KEYS.CONFIG) || defaultConfig;
  },

  setConfig(config: AutodevConfig): void {
    lsSet(STORAGE_KEYS.CONFIG, config);
  },

  updateConfig(update: Partial<AutodevConfig>): void {
    const config = this.getConfig();
    this.setConfig({ ...config, ...update });
  },

  async getAuditLog(limit?: number): Promise<AuditEntry[]> {
    let entries = await idbGetAll<AuditEntry>(IDB_STORES.AUDIT_LOG);
    entries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    if (limit) {
      entries = entries.slice(0, limit);
    }

    return entries;
  },

  async addAuditEntry(entry: AuditEntry): Promise<void> {
    await idbPut(IDB_STORES.AUDIT_LOG, entry);
  },

  // ========== PRISM SPEC REGISTRY ==========

  getSpecRegistry(): SpecRegistry {
    return lsGet<SpecRegistry>(STORAGE_KEYS.SPEC_REGISTRY) || defaultSpecRegistry;
  },

  setSpecRegistry(registry: SpecRegistry): void {
    lsSet(STORAGE_KEYS.SPEC_REGISTRY, registry);
  },

  registerSpec(spec: SpecDefinition): void {
    const registry = this.getSpecRegistry();
    const existingIndex = registry.activeSpecs.findIndex((s) => s.id === spec.id);
    if (existingIndex !== -1) {
      registry.activeSpecs[existingIndex] = spec;
    } else {
      registry.activeSpecs.push(spec);
    }
    this.setSpecRegistry(registry);
  },

  unregisterSpec(specId: string): void {
    const registry = this.getSpecRegistry();
    registry.activeSpecs = registry.activeSpecs.filter((s) => s.id !== specId);
    this.setSpecRegistry(registry);
  },

  getActiveSpec(): string {
    return lsGet<string>(STORAGE_KEYS.ACTIVE_SPEC) || defaultSpecRegistry.defaultSpec;
  },

  setActiveSpec(specId: string): void {
    lsSet(STORAGE_KEYS.ACTIVE_SPEC, specId);
  },

  // ========== TELEMETRY ==========

  async addTelemetryEvent(event: TelemetryEvent): Promise<void> {
    await idbPut(IDB_STORES.TELEMETRY, event);
  },

  async getTelemetryEvents(since?: string): Promise<TelemetryEvent[]> {
    const events = await idbGetAll<TelemetryEvent>(IDB_STORES.TELEMETRY);
    if (since) {
      return events.filter((e) => e.timestamp >= since);
    }
    return events;
  },

  async clearOldTelemetry(olderThan: string): Promise<void> {
    const db = await openDatabase();
    const transaction = db.transaction(IDB_STORES.TELEMETRY, 'readwrite');
    const store = transaction.objectStore(IDB_STORES.TELEMETRY);
    const index = store.index('timestamp');

    const range = IDBKeyRange.upperBound(olderThan);
    const request = index.openCursor(range);

    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };
  },

  // ========== FULL STATE ==========

  async getFullState(): Promise<Partial<AutodevState>> {
    const [digests, patterns, predictions, recommendations, healingHistory, auditLog] = await Promise.all([
      this.getDigests(),
      this.getPatterns(),
      this.getPredictions(),
      this.getRecommendations(),
      this.getHealingHistory(),
      this.getAuditLog(),
    ]);

    const learningStats = await this.getLearningStats();

    return {
      health: this.getSystemHealth(),
      alerts: this.getAlerts(),
      pulseCycles: this.getPulseCycles(),
      digests,
      patterns,
      predictions,
      recommendations,
      learningStats,
      healingRules: this.getHealingRules(),
      healingHistory,
      autonomyConfig: this.getAutonomyConfig(),
      config: this.getConfig(),
      auditLog,
      specRegistry: this.getSpecRegistry(),
      activeSpecId: this.getActiveSpec(),
      lastUpdated: new Date().toISOString(),
    };
  },

  // ========== CLEANUP ==========

  async clearAll(): Promise<void> {
    // Clear localStorage
    Object.values(STORAGE_KEYS).forEach((key) => lsRemove(key));

    // Clear IndexedDB stores
    await Promise.all(Object.values(IDB_STORES).map((store) => idbClear(store)));
  },
};

// Export default instance
export default autodevStorage;
