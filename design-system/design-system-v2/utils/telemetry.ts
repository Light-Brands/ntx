// AUTODEV Telemetry Service - Real Metrics Collection
// ====================================================

import { autodevStorage } from '../data/autodevStorage';
import {
  Alert,
  ErrorContext,
  HealthMetric,
  PerformanceMetrics,
  SystemHealth,
  TelemetryEvent,
  WarningContext,
} from '../data/autodevTypes';

// ============ TYPES ============

interface TelemetryConfig {
  enabled: boolean;
  flushInterval: number; // ms
  maxBufferSize: number;
  sessionId: string;
  debug: boolean;
}

interface MetricAggregation {
  count: number;
  sum: number;
  min: number;
  max: number;
  avg: number;
  lastValue: number;
  lastUpdated: string;
}

// ============ SESSION ID ============

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ============ TELEMETRY CLASS ============

class AutodevTelemetry {
  private config: TelemetryConfig;
  private buffer: TelemetryEvent[] = [];
  private flushTimer: number | null = null;
  private metricsCache: Map<string, MetricAggregation> = new Map();
  private performanceMetrics: Partial<PerformanceMetrics> = {};
  private startTime: number = Date.now();
  private errorCount: number = 0;
  private navigationHistory: string[] = [];

  constructor(config?: Partial<TelemetryConfig>) {
    this.config = {
      enabled: true,
      flushInterval: 5000, // 5 seconds
      maxBufferSize: 100,
      sessionId: generateSessionId(),
      debug: false,
      ...config,
    };

    if (this.config.enabled) {
      this.initialize();
    }
  }

  // ============ INITIALIZATION ============

  private initialize(): void {
    // Set up global error handler
    if (typeof window !== 'undefined') {
      window.onerror = this.handleError.bind(this);
      window.onunhandledrejection = this.handlePromiseRejection.bind(this);

      // Set up performance observer
      this.setupPerformanceObserver();

      // Track page visibility
      document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));

      // Track initial page load
      if (document.readyState === 'complete') {
        this.trackPageLoad();
      } else {
        window.addEventListener('load', () => this.trackPageLoad());
      }
    }

    // Start periodic flush
    this.startFlushTimer();

    // Start health monitoring
    this.startHealthMonitoring();

    this.log('Telemetry initialized', { sessionId: this.config.sessionId });
  }

  private setupPerformanceObserver(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      // Core Web Vitals
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
        this.performanceMetrics.lcp = lastEntry.startTime;
        this.trackMetric('perf.lcp', lastEntry.startTime, { type: 'web-vital' });
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0] as PerformanceEventTiming;
        if (firstEntry.processingStart) {
          const fid = firstEntry.processingStart - firstEntry.startTime;
          this.performanceMetrics.fid = fid;
          this.trackMetric('perf.fid', fid, { type: 'web-vital' });
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as (PerformanceEntry & { hadRecentInput?: boolean; value?: number })[]) {
          if (!entry.hadRecentInput && entry.value) {
            clsValue += entry.value;
          }
        }
        this.performanceMetrics.cls = clsValue;
        this.trackMetric('perf.cls', clsValue, { type: 'web-vital' });
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      // Paint events
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.performanceMetrics.fcp = entry.startTime;
            this.trackMetric('perf.fcp', entry.startTime, { type: 'paint' });
          }
        }
      });
      paintObserver.observe({ type: 'paint', buffered: true });

      // Navigation timing
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as PerformanceNavigationTiming[]) {
          this.performanceMetrics.ttfb = entry.responseStart - entry.requestStart;
          this.trackMetric('perf.ttfb', this.performanceMetrics.ttfb, { type: 'navigation' });
        }
      });
      navObserver.observe({ type: 'navigation', buffered: true });

      // Long tasks
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.trackMetric('perf.longTask', entry.duration, { type: 'long-task' });
        }
      });
      longTaskObserver.observe({ type: 'longtask', buffered: true });
    } catch (error) {
      this.log('Performance observer setup error', error);
    }
  }

  private startFlushTimer(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flushTimer = window.setInterval(() => this.flush(), this.config.flushInterval);
  }

  private startHealthMonitoring(): void {
    // Update health metrics every 30 seconds
    setInterval(() => this.updateHealthMetrics(), 30000);
  }

  // ============ PUBLIC TRACKING METHODS ============

  trackPageLoad(page?: string): void {
    const pageName = page || window.location.pathname;
    const loadTime = performance.now();

    this.addEvent({
      type: 'pageLoad',
      data: {
        page: pageName,
        duration: loadTime,
        performanceMetrics: this.performanceMetrics,
      },
    });

    this.trackMetric('page.loadTime', loadTime, { page: pageName });
    this.log('Page load tracked', { page: pageName, duration: loadTime });
  }

  trackApiCall(
    endpoint: string,
    method: string,
    duration: number,
    status: number,
    error?: string
  ): void {
    this.addEvent({
      type: 'apiCall',
      data: {
        endpoint,
        method,
        duration,
        status,
        error,
        success: status >= 200 && status < 400,
      },
    });

    this.trackMetric(`api.${method.toLowerCase()}.duration`, duration, { endpoint });
    this.trackMetric(`api.${method.toLowerCase()}.status.${status}`, 1, { endpoint });

    if (status >= 400) {
      this.errorCount++;
    }
  }

  trackRender(component: string, renderTime: number): void {
    this.addEvent({
      type: 'render',
      data: {
        component,
        renderTime,
      },
    });

    this.trackMetric(`render.${component}`, renderTime);
  }

  trackError(error: Error, context?: Partial<ErrorContext>): void {
    this.errorCount++;

    const errorContext: ErrorContext = {
      sessionId: this.config.sessionId,
      stack: error.stack || '',
      timestamp: new Date().toISOString(),
      ...context,
    };

    this.addEvent({
      type: 'error',
      data: {
        name: error.name,
        message: error.message,
        context: errorContext,
      },
    });

    // Create alert for errors
    this.createAlert({
      level: 'warning',
      title: `Error: ${error.name}`,
      message: error.message,
      source: 'sentinel',
    });

    this.log('Error tracked', { error: error.message });
  }

  trackWarning(message: string, context?: Partial<WarningContext>): void {
    const warningContext: WarningContext = {
      sessionId: this.config.sessionId,
      timestamp: new Date().toISOString(),
      ...context,
    };

    this.addEvent({
      type: 'warning',
      data: {
        message,
        context: warningContext,
      },
    });
  }

  trackNavigation(from: string, to: string): void {
    this.navigationHistory.push(to);
    if (this.navigationHistory.length > 50) {
      this.navigationHistory.shift();
    }

    this.addEvent({
      type: 'navigation',
      data: {
        from,
        to,
        timestamp: new Date().toISOString(),
      },
    });

    this.trackMetric('navigation.count', 1);
  }

  trackInteraction(element: string, action: string, details?: Record<string, unknown>): void {
    this.addEvent({
      type: 'interaction',
      data: {
        element,
        action,
        details,
      },
    });

    this.trackMetric(`interaction.${action}`, 1, { element });
  }

  trackFeatureUsage(feature: string, metadata?: Record<string, unknown>): void {
    this.addEvent({
      type: 'feature',
      data: {
        feature,
        metadata,
      },
    });

    this.trackMetric(`feature.${feature}`, 1);
  }

  trackMetric(name: string, value: number, tags?: Record<string, string>): void {
    // Update aggregation cache
    const existing = this.metricsCache.get(name) || {
      count: 0,
      sum: 0,
      min: Infinity,
      max: -Infinity,
      avg: 0,
      lastValue: 0,
      lastUpdated: '',
    };

    existing.count++;
    existing.sum += value;
    existing.min = Math.min(existing.min, value);
    existing.max = Math.max(existing.max, value);
    existing.avg = existing.sum / existing.count;
    existing.lastValue = value;
    existing.lastUpdated = new Date().toISOString();

    this.metricsCache.set(name, existing);

    this.addEvent({
      type: 'metric',
      data: {
        name,
        value,
        tags,
        aggregation: existing,
      },
    });
  }

  // ============ INTERNAL HANDLERS ============

  private handleError(
    message: string | Event,
    source?: string,
    lineno?: number,
    colno?: number,
    error?: Error
  ): boolean {
    const err = error || new Error(typeof message === 'string' ? message : 'Unknown error');

    this.trackError(err, {
      component: source,
      page: window.location.pathname,
    });

    return false; // Don't prevent default error handling
  }

  private handlePromiseRejection(event: PromiseRejectionEvent): void {
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));

    this.trackError(error, {
      page: window.location.pathname,
    });
  }

  private handleVisibilityChange(): void {
    if (document.visibilityState === 'hidden') {
      // Flush buffer when page is hidden
      this.flush();
    }
  }

  // ============ BUFFER MANAGEMENT ============

  private addEvent(event: Omit<TelemetryEvent, 'id' | 'timestamp' | 'sessionId'>): void {
    const fullEvent: TelemetryEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      sessionId: this.config.sessionId,
      ...event,
    };

    this.buffer.push(fullEvent);

    if (this.buffer.length >= this.config.maxBufferSize) {
      this.flush();
    }
  }

  private async flush(): Promise<void> {
    if (this.buffer.length === 0) return;

    const events = [...this.buffer];
    this.buffer = [];

    try {
      // Store events in IndexedDB
      for (const event of events) {
        await autodevStorage.addTelemetryEvent(event);
      }

      this.log(`Flushed ${events.length} events`);
    } catch (error) {
      // Re-add events to buffer on failure
      this.buffer = [...events, ...this.buffer];
      console.error('Telemetry flush failed:', error);
    }
  }

  // ============ HEALTH METRICS ============

  private async updateHealthMetrics(): Promise<void> {
    const now = Date.now();
    const uptime = now - this.startTime;

    // Calculate error rate (errors per minute)
    const errorRate = this.errorCount / (uptime / 60000);

    // Get memory usage if available
    let memoryUsage = 0;
    if ('memory' in performance) {
      const memory = (performance as Performance & { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
      if (memory) {
        memoryUsage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
      }
    }

    // Calculate health score (0-100)
    let healthScore = 100;

    // Deduct for high error rate (>5% = -20 points)
    if (errorRate > 0.05) healthScore -= 20;
    else if (errorRate > 0.02) healthScore -= 10;

    // Deduct for high memory usage (>80% = -15 points)
    if (memoryUsage > 80) healthScore -= 15;
    else if (memoryUsage > 60) healthScore -= 5;

    // Deduct for slow LCP (>2.5s = -10 points)
    if (this.performanceMetrics.lcp && this.performanceMetrics.lcp > 2500) healthScore -= 10;

    // Deduct for high CLS (>0.1 = -10 points)
    if (this.performanceMetrics.cls && this.performanceMetrics.cls > 0.1) healthScore -= 10;

    const metrics: HealthMetric[] = [
      {
        id: 'errorRate',
        name: 'Error Rate',
        value: errorRate,
        unit: 'errors/min',
        threshold: { warning: 0.02, critical: 0.05 },
        trend: 'stable',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'memoryUsage',
        name: 'Memory Usage',
        value: memoryUsage,
        unit: '%',
        threshold: { warning: 70, critical: 85 },
        trend: 'stable',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'uptime',
        name: 'Session Uptime',
        value: uptime,
        unit: 'ms',
        threshold: { warning: 0, critical: 0 },
        trend: 'up',
        timestamp: new Date().toISOString(),
      },
    ];

    if (this.performanceMetrics.lcp) {
      metrics.push({
        id: 'lcp',
        name: 'Largest Contentful Paint',
        value: this.performanceMetrics.lcp,
        unit: 'ms',
        threshold: { warning: 2500, critical: 4000 },
        trend: 'stable',
        timestamp: new Date().toISOString(),
      });
    }

    const health: SystemHealth = {
      overall: Math.max(0, healthScore),
      status: healthScore >= 90 ? 'nominal' : healthScore >= 70 ? 'advisory' : healthScore >= 50 ? 'warning' : 'critical',
      metrics,
      lastUpdated: new Date().toISOString(),
    };

    autodevStorage.setSystemHealth(health);
  }

  private createAlert(alert: Omit<Alert, 'id' | 'timestamp' | 'acknowledged'>): void {
    const fullAlert: Alert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      acknowledged: false,
      ...alert,
    };

    autodevStorage.addAlert(fullAlert);
  }

  // ============ PUBLIC GETTERS ============

  getSessionId(): string {
    return this.config.sessionId;
  }

  getMetricsCache(): Map<string, MetricAggregation> {
    return new Map(this.metricsCache);
  }

  getPerformanceMetrics(): Partial<PerformanceMetrics> {
    return { ...this.performanceMetrics };
  }

  getNavigationHistory(): string[] {
    return [...this.navigationHistory];
  }

  getErrorCount(): number {
    return this.errorCount;
  }

  // ============ UTILITY ============

  private log(message: string, data?: unknown): void {
    if (this.config.debug) {
      console.log(`[AUTODEV Telemetry] ${message}`, data);
    }
  }

  // ============ CLEANUP ============

  destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flush();
  }
}

// ============ SINGLETON INSTANCE ============

let telemetryInstance: AutodevTelemetry | null = null;

export function initTelemetry(config?: Partial<TelemetryConfig>): AutodevTelemetry {
  if (!telemetryInstance) {
    telemetryInstance = new AutodevTelemetry(config);
  }
  return telemetryInstance;
}

export function getTelemetry(): AutodevTelemetry | null {
  return telemetryInstance;
}

// ============ CONVENIENCE EXPORTS ============

export const telemetry = {
  init: initTelemetry,
  get: getTelemetry,

  trackPageLoad: (page?: string) => telemetryInstance?.trackPageLoad(page),
  trackApiCall: (endpoint: string, method: string, duration: number, status: number, error?: string) =>
    telemetryInstance?.trackApiCall(endpoint, method, duration, status, error),
  trackRender: (component: string, renderTime: number) => telemetryInstance?.trackRender(component, renderTime),
  trackError: (error: Error, context?: Partial<ErrorContext>) => telemetryInstance?.trackError(error, context),
  trackWarning: (message: string, context?: Partial<WarningContext>) => telemetryInstance?.trackWarning(message, context),
  trackNavigation: (from: string, to: string) => telemetryInstance?.trackNavigation(from, to),
  trackInteraction: (element: string, action: string, details?: Record<string, unknown>) =>
    telemetryInstance?.trackInteraction(element, action, details),
  trackFeatureUsage: (feature: string, metadata?: Record<string, unknown>) =>
    telemetryInstance?.trackFeatureUsage(feature, metadata),
  trackMetric: (name: string, value: number, tags?: Record<string, string>) =>
    telemetryInstance?.trackMetric(name, value, tags),
};

export default telemetry;
