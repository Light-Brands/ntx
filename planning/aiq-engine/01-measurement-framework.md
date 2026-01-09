# AIQ Measurement Framework

## Overview

The AIQ Measurement Framework defines how raw decision-making signals are captured, analyzed, and converted into dimensional scores. This layer sits between raw observation and final scoring, extracting meaningful intelligence indicators from agent activity.

## Measurement Dimensions

### 1. Reasoning Depth (Weight: 25%)

Measures the depth of causal analysis and logical inference chains.

#### Signals

| Signal | Detection Method | Score Impact |
|--------|------------------|--------------|
| **Inference chain length** | Count logical steps from premise to conclusion | +5-50 per layer |
| **Causal analysis** | Identify "because", "therefore", "leads to" patterns | +10-30 per causal link |
| **Counterfactual reasoning** | "If X had been different, then Y" analysis | +20-40 per counterfactual |
| **Root cause investigation** | Depth of "why" questioning | +15-35 per level |
| **Implication mapping** | Downstream consequence consideration | +10-25 per implication |

#### Depth Levels

```
Level 0: Direct action (no reasoning visible)
Level 1: Single-step reasoning ("Do X because Y")
Level 2: Two-step chain ("Do X because Y, which leads to Z")
Level 3: Multi-step with branching
Level 4: Recursive reasoning with feedback loops
Level 5: Meta-reasoning about reasoning process
```

#### Measurement Code Pattern

```json
{
  "dimension": "reasoning_depth",
  "signals": {
    "inference_chain": {
      "max_depth": 4,
      "total_steps": 12,
      "branches": 3
    },
    "causal_links": 8,
    "counterfactuals_considered": 2,
    "root_cause_layers": 3
  },
  "raw_score": 0.72
}
```

---

### 2. Pattern Recognition (Weight: 20%)

Measures the ability to identify relevant patterns and make analogical connections.

#### Signals

| Signal | Detection Method | Score Impact |
|--------|------------------|--------------|
| **Cross-domain analogy** | Reference to patterns from different domains | +25-50 per analogy |
| **Historical pattern matching** | Reference to similar past situations | +15-30 per match |
| **Anomaly detection** | Identification of unexpected deviations | +20-40 per anomaly |
| **Trend recognition** | Identification of directional patterns | +15-25 per trend |
| **Structural similarity** | Deep structural parallels identified | +30-50 per structure |

#### Pattern Types

| Type | Description | Base Score |
|------|-------------|------------|
| **Surface** | Obvious visual/textual similarity | 10 |
| **Functional** | Similar purpose or behavior | 25 |
| **Structural** | Isomorphic underlying structure | 40 |
| **Generative** | Pattern used to create new solutions | 55 |
| **Meta** | Pattern about patterns | 70 |

#### Measurement Code Pattern

```json
{
  "dimension": "pattern_recognition",
  "signals": {
    "analogies": [
      {
        "source_domain": "ecosystem design",
        "target_domain": "token economics",
        "type": "structural",
        "novelty": 0.75
      }
    ],
    "historical_matches": 3,
    "anomalies_flagged": 1,
    "trends_identified": 2
  },
  "raw_score": 0.68
}
```

---

### 3. Context Integration (Weight: 20%)

Measures the breadth and coherence of contextual factors considered.

#### Signals

| Signal | Detection Method | Score Impact |
|--------|------------------|--------------|
| **Stakeholder coverage** | Number of affected parties considered | +10-20 per stakeholder |
| **Temporal scope** | Past, present, future considerations | +15-30 per timeframe |
| **System awareness** | Recognition of system-level effects | +20-40 |
| **Constraint handling** | Explicit consideration of limitations | +10-25 per constraint |
| **Trade-off articulation** | Clear enumeration of competing concerns | +15-30 per trade-off |

#### Context Breadth Levels

```
Level 1: Immediate task only
Level 2: Adjacent processes/stakeholders
Level 3: System-wide implications
Level 4: Ecosystem-level considerations
Level 5: Multi-timeline/multiverse awareness
```

#### Measurement Code Pattern

```json
{
  "dimension": "context_integration",
  "signals": {
    "stakeholders_considered": ["users", "developers", "partners", "community", "future_generations"],
    "temporal_scopes": ["immediate", "short_term", "long_term"],
    "system_layers": ["code", "architecture", "ecosystem", "societal"],
    "constraints_acknowledged": 5,
    "trade_offs_articulated": 3
  },
  "raw_score": 0.81
}
```

---

### 4. Creativity (Weight: 15%)

Measures novelty, originality, and non-obvious solution generation.

#### Signals

| Signal | Detection Method | Score Impact |
|--------|------------------|--------------|
| **Solution novelty** | Divergence from standard approaches | +20-50 based on novelty |
| **Combination originality** | New combinations of known elements | +15-35 |
| **Constraint transcendence** | Solutions that sidestep limitations | +30-60 |
| **Generative alternatives** | Number of distinct options generated | +10-20 per alternative |
| **Paradigm shift** | Fundamental reframing of problem | +50-100 |

#### Creativity Markers

| Marker | Description | Detection Pattern |
|--------|-------------|-------------------|
| **Divergence** | Exploring unusual directions | Multiple distinct approaches |
| **Combination** | Merging separate concepts | "Combined X with Y" |
| **Transformation** | Changing problem representation | "Reframing as..." |
| **Boundary pushing** | Questioning given constraints | "What if we didn't assume..." |
| **Emergence** | New properties from combinations | Unexpected synergies |

#### Measurement Code Pattern

```json
{
  "dimension": "creativity",
  "signals": {
    "alternatives_generated": 5,
    "novelty_assessment": {
      "chosen_approach": 0.7,
      "max_novelty_considered": 0.85
    },
    "combinations": 2,
    "constraints_challenged": 1,
    "reframings": 1
  },
  "raw_score": 0.58
}
```

---

### 5. Adaptability (Weight: 10%)

Measures response to changing conditions, feedback, and new information.

#### Signals

| Signal | Detection Method | Score Impact |
|--------|------------------|--------------|
| **Mid-course correction** | Plan changes based on new info | +25-45 per correction |
| **Feedback integration** | Visible incorporation of feedback | +20-35 per integration |
| **Assumption revision** | Explicit updating of assumptions | +15-30 per revision |
| **Graceful degradation** | Handling unexpected failures | +20-40 |
| **Strategy pivots** | Major approach changes when warranted | +30-50 |

#### Adaptability Patterns

```
Low: Rigid adherence to initial plan despite signals
Medium: Adjustments within original framework
High: Fundamental pivot when evidence warrants
Mastery: Anticipatory adaptation before signals manifest
```

#### Measurement Code Pattern

```json
{
  "dimension": "adaptability",
  "signals": {
    "corrections_made": 2,
    "feedback_sources_integrated": ["review_comments", "test_failures", "user_input"],
    "assumptions_revised": 1,
    "pivot_quality": 0.8
  },
  "raw_score": 0.65
}
```

---

### 6. Self-Reflection (Weight: 10%)

Measures meta-cognitive awareness and self-correction capability.

#### Signals

| Signal | Detection Method | Score Impact |
|--------|------------------|--------------|
| **Uncertainty acknowledgment** | Explicit confidence bounds | +15-30 |
| **Limitation awareness** | Recognition of own limitations | +20-35 |
| **Error anticipation** | Proactive risk identification | +15-30 per risk |
| **Learning articulation** | Explicit statement of lessons | +20-40 per lesson |
| **Reasoning explanation** | Meta-commentary on own process | +15-25 |

#### Self-Reflection Depth

| Level | Characteristic | Example |
|-------|----------------|---------|
| 0 | None | No meta-awareness |
| 1 | Surface | "I think this is correct" |
| 2 | Uncertainty | "I'm 70% confident because..." |
| 3 | Limitation | "I may be missing X because..." |
| 4 | Meta-process | "My reasoning might be biased by..." |
| 5 | Wisdom | "The deepest uncertainty here is..." |

#### Measurement Code Pattern

```json
{
  "dimension": "self_reflection",
  "signals": {
    "confidence_stated": true,
    "confidence_calibration": 0.85,
    "limitations_acknowledged": ["domain_expertise_gap", "data_recency"],
    "risks_anticipated": 3,
    "lessons_extracted": 2,
    "reasoning_explained": true
  },
  "raw_score": 0.72
}
```

---

## Signal Collection Protocol

### Pre-Decision Capture

```xml
<aiq-observation phase="pre-decision">
  <task_id>task-uuid</task_id>
  <agent>agent-name</agent>
  <context>
    <task_type>implementation|review|planning|etc</task_type>
    <complexity>low|medium|high|critical</complexity>
    <domain>code|architecture|governance|etc</domain>
    <initial_context_size>count of factors known</initial_context_size>
  </context>
  <intuition_retrieved>
    <lessons_count>N</lessons_count>
    <top_lesson_strength>0.0-1.0</top_lesson_strength>
  </intuition_retrieved>
</aiq-observation>
```

### Active Decision Capture

During decision-making, capture:

```xml
<aiq-observation phase="active">
  <reasoning_trace>
    <step n="1">
      <thought>Initial assessment of problem</thought>
      <depth_markers>causal_analysis, counterfactual</depth_markers>
    </step>
    <step n="2">
      <thought>Considering alternatives</thought>
      <depth_markers>divergent_thinking, constraint_evaluation</depth_markers>
    </step>
    <!-- ... more steps ... -->
  </reasoning_trace>

  <tools_invoked>
    <tool name="Search" count="3"/>
    <tool name="Read" count="8"/>
    <tool name="Edit" count="5"/>
  </tools_invoked>

  <context_expansion>
    <new_factors_discovered>7</new_factors_discovered>
    <stakeholders_added>2</stakeholders_added>
  </context_expansion>

  <adaptations>
    <correction reason="test_failure">Revised approach for edge case</correction>
  </adaptations>
</aiq-observation>
```

### Post-Decision Capture

```xml
<aiq-observation phase="post-decision">
  <outcome>
    <success>true|false</success>
    <quality>0.0-1.0</quality>
    <unexpected_effects>list of surprises</unexpected_effects>
  </outcome>

  <reflection>
    <confidence_stated>0.85</confidence_stated>
    <limitations_noted>list</limitations_noted>
    <lessons_articulated>list</lessons_articulated>
  </reflection>

  <intuition_feedback>
    <lessons_reinforced>list of lesson IDs</lessons_reinforced>
    <lessons_weakened>list of lesson IDs</lessons_weakened>
    <new_lessons>list of new insights</new_lessons>
  </intuition_feedback>
</aiq-observation>
```

---

## Measurement Algorithms

### Reasoning Depth Calculator

```python
def calculate_reasoning_depth(trace):
    """
    Analyze reasoning trace for depth indicators.
    Returns normalized score 0.0-1.0
    """
    scores = {
        'inference_depth': analyze_inference_chains(trace),
        'causal_links': count_causal_connections(trace),
        'counterfactuals': detect_counterfactual_reasoning(trace),
        'root_cause_depth': measure_why_depth(trace),
        'implications': count_downstream_considerations(trace)
    }

    weights = {
        'inference_depth': 0.30,
        'causal_links': 0.25,
        'counterfactuals': 0.20,
        'root_cause_depth': 0.15,
        'implications': 0.10
    }

    raw_score = sum(scores[k] * weights[k] for k in scores)
    return normalize_to_range(raw_score, min=0, max=1)
```

### Pattern Recognition Scorer

```python
def calculate_pattern_recognition(trace, context):
    """
    Detect analogies, pattern matches, and structural insights.
    Returns normalized score 0.0-1.0
    """
    analogies = extract_analogies(trace)
    historical = match_historical_patterns(trace, context)
    anomalies = detect_flagged_anomalies(trace)

    analogy_score = sum(
        score_analogy(a, novelty_weight=0.5)
        for a in analogies
    )

    pattern_score = sum(
        score_pattern_match(p, relevance_weight=0.6)
        for p in historical
    )

    anomaly_score = len(anomalies) * 0.15

    combined = analogy_score * 0.45 + pattern_score * 0.35 + anomaly_score * 0.20
    return normalize_to_range(combined, min=0, max=1)
```

### Context Integration Assessor

```python
def calculate_context_integration(observations):
    """
    Measure breadth and coherence of context considered.
    Returns normalized score 0.0-1.0
    """
    stakeholder_breadth = count_unique_stakeholders(observations)
    temporal_scope = assess_temporal_range(observations)
    system_depth = measure_system_layer_coverage(observations)
    constraints = count_constraints_handled(observations)
    trade_offs = count_trade_offs_articulated(observations)

    breadth_score = min(stakeholder_breadth / 10, 1.0) * 0.25
    temporal_score = temporal_scope / 5 * 0.20
    system_score = system_depth / 5 * 0.25
    constraint_score = min(constraints / 8, 1.0) * 0.15
    trade_off_score = min(trade_offs / 5, 1.0) * 0.15

    return breadth_score + temporal_score + system_score + constraint_score + trade_off_score
```

---

## Calibration

### Task-Type Baselines

Different task types have different AIQ expectations:

| Task Type | Expected Reasoning | Expected Creativity | Expected Context |
|-----------|-------------------|---------------------|------------------|
| Bug fix | High | Low | Medium |
| New feature | High | High | High |
| Code review | High | Low | Medium |
| Architecture | Very High | Medium | Very High |
| Documentation | Medium | Low | Medium |
| Research | Very High | Medium | High |

### Agent-Specific Adjustments

Each agent has characteristic AIQ profiles:

| Agent | Strong Dimensions | Growth Dimensions |
|-------|-------------------|-------------------|
| Implementer | Reasoning, Adaptability | Creativity |
| Reviewer | Pattern Recognition, Self-Reflection | Creativity |
| Orchestrator | Context Integration | Reasoning Depth |
| Council | All dimensions | Continuous mastery |

---

## Storage Schema

```sql
CREATE TABLE aiq_measurements (
    id UUID PRIMARY KEY,
    task_id UUID NOT NULL,
    agent_id VARCHAR(50) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,

    -- Raw dimension signals (JSONB for flexibility)
    reasoning_signals JSONB,
    pattern_signals JSONB,
    context_signals JSONB,
    creativity_signals JSONB,
    adaptability_signals JSONB,
    reflection_signals JSONB,

    -- Computed raw scores (0.0-1.0)
    reasoning_raw FLOAT,
    pattern_raw FLOAT,
    context_raw FLOAT,
    creativity_raw FLOAT,
    adaptability_raw FLOAT,
    reflection_raw FLOAT,

    -- Task metadata for calibration
    task_type VARCHAR(50),
    task_complexity VARCHAR(20),
    domain VARCHAR(50)
);

CREATE INDEX idx_aiq_task ON aiq_measurements(task_id);
CREATE INDEX idx_aiq_agent ON aiq_measurements(agent_id);
CREATE INDEX idx_aiq_timestamp ON aiq_measurements(timestamp);
```

---

*The measurement framework transforms invisible cognitive processes into observable signals, enabling the intelligence layer to become visible and improvable.*
