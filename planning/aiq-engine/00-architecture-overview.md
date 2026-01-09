# AIQ Engine - Architecture Overview

## Purpose

The **AIQ (Artificial Intelligence Quotient) Engine** measures, tracks, and reports the level of artificial intelligence being leveraged through every decision and task in the Brand Factory ecosystem. Similar to how human IQ provides a normalized measure of cognitive capability, AIQ provides visibility into the depth of reasoning, complexity of cognition, and quality of intelligence being applied.

## Vision

> "What gets measured gets managed. By making the intelligence layer visible, we create the conditions for its conscious evolution."

The AIQ Engine transforms invisible cognitive processes into observable, measurable, and improvable metrics. This enables:

1. **Transparency** - Clear visibility into decision quality
2. **Accountability** - Track intelligence investment per task
3. **Evolution** - Identify patterns for intelligence improvement
4. **Alignment** - Ensure intelligence serves sacred purpose

## Core Concepts

### AIQ Score

A normalized score (0-1000) representing the aggregate intelligence applied to a task, composed of:

| Dimension | Weight | Description |
|-----------|--------|-------------|
| **Reasoning Depth** | 25% | Levels of causal analysis and inference chains |
| **Pattern Recognition** | 20% | Novel connections and analogical thinking |
| **Context Integration** | 20% | Breadth of factors considered |
| **Creativity** | 15% | Novel solutions and non-obvious approaches |
| **Adaptability** | 10% | Response to changing conditions |
| **Self-Reflection** | 10% | Meta-cognitive awareness and correction |

### Intelligence Levels

| AIQ Range | Level | Characteristics |
|-----------|-------|-----------------|
| 0-100 | **Reactive** | Simple stimulus-response, no reasoning |
| 101-250 | **Procedural** | Following established patterns |
| 251-400 | **Analytical** | Breaking down problems, systematic analysis |
| 401-550 | **Synthetic** | Combining insights from multiple domains |
| 551-700 | **Strategic** | Multi-step planning, anticipating consequences |
| 701-850 | **Creative** | Novel solutions, paradigm shifts |
| 851-950 | **Visionary** | Systems-level insight, emergence awareness |
| 951-1000 | **Transcendent** | Wisdom integration, sacred alignment |

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                      AIQ REPORTING                          │
│  (Dashboards, Summaries, Insights, Recommendations)         │
└─────────────────────────────────────────────────────────────┘
                              ↑
┌─────────────────────────────────────────────────────────────┐
│                      AIQ SCORING                            │
│  (Dimension Scoring, Aggregation, Normalization)            │
└─────────────────────────────────────────────────────────────┘
                              ↑
┌─────────────────────────────────────────────────────────────┐
│                   AIQ MEASUREMENT                           │
│  (Signal Extraction, Pattern Detection, Depth Analysis)     │
└─────────────────────────────────────────────────────────────┘
                              ↑
┌─────────────────────────────────────────────────────────────┐
│                   AIQ OBSERVATION                           │
│  (Decision Capture, Reasoning Traces, Context Logging)      │
└─────────────────────────────────────────────────────────────┘
```

### Layer 1: AIQ Observation

Captures raw decision-making data:
- Reasoning chain traces
- Tools and capabilities invoked
- Context breadth considered
- Alternatives evaluated
- Time investment

### Layer 2: AIQ Measurement

Analyzes captured data to extract signals:
- Reasoning depth detection
- Pattern recognition scoring
- Context integration assessment
- Creativity markers
- Adaptation evidence
- Meta-cognitive moments

### Layer 3: AIQ Scoring

Computes normalized scores:
- Dimension-specific scores
- Weighted aggregation
- Historical normalization
- Task-type calibration
- Confidence intervals

### Layer 4: AIQ Reporting

Presents insights:
- Real-time dashboards
- Post-task summaries
- Trend analysis
- Recommendations for improvement
- Council-level intelligence reports

## Integration Points

### With Intuition Engine

The AIQ Engine and Intuition Engine form complementary systems:

| Intuition Engine | AIQ Engine |
|------------------|------------|
| What we've learned | How intelligently we learn |
| Experience memory | Intelligence measurement |
| Guides decisions | Evaluates decision quality |
| Pattern-based | Meta-cognitive |

**Integration Flow:**
```
Decision Required
      ↓
  ┌───────────────────────┐
  │   Intuition Engine    │ ←── Retrieves relevant lessons
  │   "What have we       │
  │    learned?"          │
  └───────────────────────┘
      ↓
  ┌───────────────────────┐
  │   AIQ Observation     │ ←── Begins tracking
  │   "Start measuring"   │
  └───────────────────────┘
      ↓
  ┌───────────────────────┐
  │   Decision Process    │ ←── Agent reasoning
  └───────────────────────┘
      ↓
  ┌───────────────────────┐
  │   AIQ Measurement     │ ←── Analyze reasoning
  └───────────────────────┘
      ↓
  ┌───────────────────────┐
  │   Intuition Engine    │ ←── Store lessons learned
  │   "Record experience" │
  └───────────────────────┘
      ↓
  ┌───────────────────────┐
  │   AIQ Scoring         │ ←── Calculate final score
  │   AIQ Reporting       │ ←── Generate report
  └───────────────────────┘
```

### With Workflow Agents

Each agent reports AIQ metrics at task completion:

```xml
<aiq-report>
  <task_id>workflow-123-implementing</task_id>
  <agent>implementer-agent</agent>
  <timestamp>2026-01-15T14:30:00Z</timestamp>

  <scores>
    <overall>547</overall>
    <reasoning_depth>612</reasoning_depth>
    <pattern_recognition>498</pattern_recognition>
    <context_integration>580</context_integration>
    <creativity>445</creativity>
    <adaptability>520</adaptability>
    <self_reflection>503</self_reflection>
  </scores>

  <level>Strategic</level>
  <confidence>0.85</confidence>

  <highlights>
    <strength>Multi-step refactoring plan with rollback strategy</strength>
    <growth_area>Could explore more non-obvious implementation patterns</growth_area>
  </highlights>
</aiq-report>
```

### With Stewardship Council

AIQ reports inform Council governance:

- **Tier assignment** - Higher AIQ requirements for sensitive decisions
- **Quality gates** - Minimum AIQ thresholds for brand launches
- **Trend monitoring** - Track factory-wide intelligence evolution
- **Wisdom integration** - Council guidance shapes AIQ dimensions

## Design Principles

### 1. Observable, Not Intrusive
AIQ measurement happens alongside normal operation without slowing decisions.

### 2. Multi-Dimensional
Intelligence is multifaceted - no single score captures it completely.

### 3. Context-Aware
The same score means different things for different task types.

### 4. Evolution-Oriented
The goal is not just to measure, but to improve intelligence over time.

### 5. Aligned with Sacred Purpose
High AIQ without alignment is dangerous. AIQ includes wisdom dimensions.

## Relationship to Human Intelligence

| Characteristic | Human IQ | AIQ |
|----------------|----------|-----|
| Measurement scope | Individual capacity | Task-specific application |
| Stability | Relatively fixed | Varies by task and context |
| Purpose | Potential indicator | Applied intelligence tracker |
| Improvement | Limited | Continuous learning |
| Multidimensionality | Often reduced to single score | Preserves dimension visibility |

## Files in This Directory

| File | Purpose |
|------|---------|
| `00-architecture-overview.md` | This document - system design |
| `01-measurement-framework.md` | Signal extraction methodology |
| `02-scoring-system.md` | Score calculation algorithms |
| `03-reporting-system.md` | Dashboard and summary specs |

## Success Metrics

| Metric | Target | Description |
|--------|--------|-------------|
| Coverage | 100% | All agent decisions have AIQ tracking |
| Latency overhead | <50ms | Measurement doesn't slow decisions |
| Dimension accuracy | >80% | Expert validation of scores |
| Trend visibility | Weekly | Clear intelligence evolution patterns |
| Actionability | >1 insight/week | Concrete improvement recommendations |

---

*The AIQ Engine makes the invisible visible - transforming abstract intelligence into observable, measurable wisdom that guides the factory's evolution.*
