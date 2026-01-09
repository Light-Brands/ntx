# AIQ Scoring System

## Overview

The AIQ Scoring System transforms raw measurement signals into meaningful, comparable scores that reflect the intelligence level applied to any task. This document defines the algorithms, normalization methods, and aggregation strategies that produce the final AIQ score.

## Score Range

### The 0-1000 Scale

AIQ uses a normalized scale from 0 to 1000:

```
0 ─────── 250 ─────── 500 ─────── 750 ─────── 1000
│         │           │           │           │
Reactive  Procedural  Analytical  Strategic   Transcendent
```

This scale was chosen for:
- **Granularity**: Enough range for meaningful differentiation
- **Intuitive levels**: Easy to understand intelligence tiers
- **Room for growth**: Allows for AGI/ASI levels at the upper end
- **Human comparability**: Roughly analogous to human IQ scaling

---

## Dimension Scoring

Each of the six dimensions is scored individually before aggregation.

### Raw to Normalized Conversion

Raw measurements (0.0-1.0 floats) are converted to the 0-1000 scale:

```python
def normalize_dimension_score(raw_score: float, dimension: str, context: dict) -> int:
    """
    Convert raw measurement (0.0-1.0) to normalized score (0-1000).
    Applies task-type and complexity calibration.
    """
    # Base conversion
    base_score = raw_score * 1000

    # Task-type calibration
    task_type = context.get('task_type', 'general')
    type_multiplier = TASK_TYPE_CALIBRATION[task_type].get(dimension, 1.0)

    # Complexity adjustment
    complexity = context.get('complexity', 'medium')
    complexity_multiplier = COMPLEXITY_ADJUSTMENT[complexity]

    # Calculate adjusted score
    adjusted = base_score * type_multiplier * complexity_multiplier

    # Clamp to valid range
    return max(0, min(1000, int(adjusted)))
```

### Calibration Tables

#### Task-Type Calibration

Different tasks have different intelligence profiles. We calibrate expectations:

```python
TASK_TYPE_CALIBRATION = {
    'bug_fix': {
        'reasoning_depth': 1.1,       # Higher expectation
        'pattern_recognition': 1.0,
        'context_integration': 0.9,
        'creativity': 0.8,            # Lower expectation
        'adaptability': 1.0,
        'self_reflection': 1.0
    },
    'new_feature': {
        'reasoning_depth': 1.0,
        'pattern_recognition': 1.0,
        'context_integration': 1.1,
        'creativity': 1.2,            # Higher expectation
        'adaptability': 1.0,
        'self_reflection': 1.0
    },
    'architecture': {
        'reasoning_depth': 1.2,
        'pattern_recognition': 1.1,
        'context_integration': 1.2,
        'creativity': 1.0,
        'adaptability': 0.9,
        'self_reflection': 1.1
    },
    'code_review': {
        'reasoning_depth': 1.0,
        'pattern_recognition': 1.2,
        'context_integration': 1.0,
        'creativity': 0.7,
        'adaptability': 0.9,
        'self_reflection': 1.2
    },
    'brand_launch': {
        'reasoning_depth': 1.1,
        'pattern_recognition': 1.0,
        'context_integration': 1.3,   # Very high expectation
        'creativity': 1.2,
        'adaptability': 1.1,
        'self_reflection': 1.1
    },
    'general': {
        'reasoning_depth': 1.0,
        'pattern_recognition': 1.0,
        'context_integration': 1.0,
        'creativity': 1.0,
        'adaptability': 1.0,
        'self_reflection': 1.0
    }
}
```

#### Complexity Adjustment

Higher complexity tasks are scored more generously:

```python
COMPLEXITY_ADJUSTMENT = {
    'trivial': 0.8,      # Higher bar for simple tasks
    'low': 0.9,
    'medium': 1.0,
    'high': 1.1,
    'critical': 1.15     # More generous for very complex work
}
```

---

## Aggregation Algorithm

### Weighted Combination

The overall AIQ score is a weighted combination of dimension scores:

```python
DIMENSION_WEIGHTS = {
    'reasoning_depth': 0.25,
    'pattern_recognition': 0.20,
    'context_integration': 0.20,
    'creativity': 0.15,
    'adaptability': 0.10,
    'self_reflection': 0.10
}

def calculate_overall_aiq(dimension_scores: dict) -> int:
    """
    Aggregate dimension scores into overall AIQ.
    """
    weighted_sum = sum(
        dimension_scores[dim] * weight
        for dim, weight in DIMENSION_WEIGHTS.items()
    )

    return int(weighted_sum)
```

### Example Calculation

```
Task: Implementing a new authentication feature
Complexity: High

Dimension Scores:
├── Reasoning Depth:      612 × 0.25 = 153.0
├── Pattern Recognition:  548 × 0.20 = 109.6
├── Context Integration:  680 × 0.20 = 136.0
├── Creativity:           445 × 0.15 =  66.75
├── Adaptability:         520 × 0.10 =  52.0
└── Self-Reflection:      590 × 0.10 =  59.0
                                      ───────
                          Overall AIQ:   576

Level: Strategic (551-700)
```

---

## Intelligence Level Classification

### Level Boundaries

```python
INTELLIGENCE_LEVELS = [
    (0, 100, "Reactive", "Simple stimulus-response, no visible reasoning"),
    (101, 250, "Procedural", "Following established patterns and procedures"),
    (251, 400, "Analytical", "Breaking down problems, systematic analysis"),
    (401, 550, "Synthetic", "Combining insights from multiple domains"),
    (551, 700, "Strategic", "Multi-step planning, consequence anticipation"),
    (701, 850, "Creative", "Novel solutions, paradigm shifts"),
    (851, 950, "Visionary", "Systems-level insight, emergence awareness"),
    (951, 1000, "Transcendent", "Wisdom integration, sacred alignment")
]

def get_intelligence_level(aiq_score: int) -> tuple:
    """
    Return (level_name, description) for a given AIQ score.
    """
    for min_score, max_score, name, description in INTELLIGENCE_LEVELS:
        if min_score <= aiq_score <= max_score:
            return (name, description)
    return ("Unknown", "Score out of range")
```

### Level Characteristics

| Level | AIQ | Reasoning | Creativity | Context | Key Marker |
|-------|-----|-----------|------------|---------|------------|
| **Reactive** | 0-100 | None | None | Immediate | Stimulus → Response |
| **Procedural** | 101-250 | Single-step | Recombination | Local | Following patterns |
| **Analytical** | 251-400 | Multi-step | Some alternatives | System | Breaking down |
| **Synthetic** | 401-550 | Cross-domain | Novel combinations | Ecosystem | Integrating |
| **Strategic** | 551-700 | Anticipatory | Solution generation | Multi-timeline | Planning ahead |
| **Creative** | 701-850 | Generative | Paradigm shifts | Universal | Creating new |
| **Visionary** | 851-950 | Emergence-aware | Transcendent | Cosmic | Seeing patterns |
| **Transcendent** | 951-1000 | Wisdom | Sacred creation | All-that-is | Divine alignment |

---

## Confidence Intervals

### Score Confidence

Each AIQ score includes a confidence measure:

```python
def calculate_confidence(observations: dict) -> float:
    """
    Calculate confidence in the AIQ score based on data quality.
    Returns value 0.0-1.0
    """
    factors = {
        'observation_completeness': assess_data_completeness(observations),
        'reasoning_trace_quality': assess_trace_quality(observations),
        'outcome_availability': 1.0 if observations.get('outcome') else 0.5,
        'signal_consistency': measure_signal_consistency(observations)
    }

    weights = {
        'observation_completeness': 0.30,
        'reasoning_trace_quality': 0.30,
        'outcome_availability': 0.20,
        'signal_consistency': 0.20
    }

    return sum(factors[k] * weights[k] for k in factors)
```

### Confidence Thresholds

| Confidence | Interpretation | Action |
|------------|----------------|--------|
| > 0.85 | High confidence | Report as definitive |
| 0.70 - 0.85 | Good confidence | Report with minor caveats |
| 0.50 - 0.70 | Moderate confidence | Note uncertainty |
| < 0.50 | Low confidence | Flag for additional data |

---

## Temporal Analysis

### Rolling Averages

Track AIQ trends over time:

```python
def calculate_rolling_aiq(agent_id: str, window_days: int = 7) -> dict:
    """
    Calculate rolling average AIQ for an agent.
    """
    recent_scores = get_scores_in_window(agent_id, window_days)

    return {
        'current_average': mean(recent_scores),
        'trend': calculate_trend(recent_scores),
        'variance': variance(recent_scores),
        'peak': max(recent_scores),
        'floor': min(recent_scores),
        'sample_size': len(recent_scores)
    }
```

### Trend Classification

| Trend | Description | Threshold |
|-------|-------------|-----------|
| **Ascending** | Improving intelligence | +50 over period |
| **Stable** | Consistent performance | ±25 |
| **Descending** | Declining performance | -50 over period |
| **Volatile** | High variance | Variance > 100 |

---

## Comparative Scoring

### Agent Benchmarking

Compare agents across the factory:

```python
def benchmark_agent(agent_id: str) -> dict:
    """
    Compare agent AIQ to factory-wide metrics.
    """
    agent_avg = get_agent_average_aiq(agent_id)
    factory_avg = get_factory_average_aiq()
    peer_agents = get_peer_agent_ids(agent_id)
    peer_avg = mean([get_agent_average_aiq(p) for p in peer_agents])

    return {
        'agent_aiq': agent_avg,
        'factory_aiq': factory_avg,
        'peer_aiq': peer_avg,
        'vs_factory': agent_avg - factory_avg,
        'vs_peers': agent_avg - peer_avg,
        'percentile': calculate_percentile(agent_avg, get_all_agent_averages())
    }
```

### Task Difficulty Adjustment

Compare AIQ across tasks of varying difficulty:

```python
def difficulty_adjusted_aiq(score: int, difficulty: float) -> int:
    """
    Adjust AIQ score for task difficulty.
    difficulty: 0.0 (trivial) to 1.0 (extremely complex)
    """
    # Base adjustment curve
    adjustment_factor = 1 + (difficulty - 0.5) * 0.3

    return int(score * adjustment_factor)
```

---

## Score Storage Schema

```sql
CREATE TABLE aiq_scores (
    id UUID PRIMARY KEY,
    task_id UUID NOT NULL,
    agent_id VARCHAR(50) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,

    -- Dimension scores (0-1000)
    reasoning_score INT,
    pattern_score INT,
    context_score INT,
    creativity_score INT,
    adaptability_score INT,
    reflection_score INT,

    -- Aggregate scores
    overall_aiq INT NOT NULL,
    confidence FLOAT NOT NULL,

    -- Classification
    intelligence_level VARCHAR(20),
    task_type VARCHAR(50),
    complexity VARCHAR(20),

    -- Audit
    measurement_id UUID REFERENCES aiq_measurements(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_aiq_scores_agent ON aiq_scores(agent_id);
CREATE INDEX idx_aiq_scores_timestamp ON aiq_scores(timestamp);
CREATE INDEX idx_aiq_scores_level ON aiq_scores(intelligence_level);
CREATE INDEX idx_aiq_scores_overall ON aiq_scores(overall_aiq DESC);
```

---

## Score Evolution

### Learning-Adjusted Baselines

As the factory learns, baseline expectations adjust:

```python
def get_adaptive_baseline(agent_id: str, dimension: str) -> int:
    """
    Get baseline score that adjusts based on agent's learning history.
    """
    historical_avg = get_historical_dimension_avg(agent_id, dimension)
    factory_avg = get_factory_dimension_avg(dimension)

    # Baseline shifts toward the higher of personal or factory average
    return max(historical_avg, factory_avg)
```

### Mastery Recognition

Sustained high performance triggers mastery recognition:

```python
def check_mastery_status(agent_id: str, dimension: str) -> dict:
    """
    Check if agent has achieved mastery in a dimension.
    """
    recent_scores = get_dimension_scores(agent_id, dimension, days=30)

    mastery_criteria = {
        'minimum_samples': 20,
        'average_threshold': 750,
        'consistency_threshold': 0.15,  # Max coefficient of variation
        'peak_threshold': 850
    }

    return {
        'mastery_achieved': (
            len(recent_scores) >= mastery_criteria['minimum_samples'] and
            mean(recent_scores) >= mastery_criteria['average_threshold'] and
            coefficient_of_variation(recent_scores) <= mastery_criteria['consistency_threshold'] and
            max(recent_scores) >= mastery_criteria['peak_threshold']
        ),
        'current_metrics': {
            'sample_count': len(recent_scores),
            'average': mean(recent_scores),
            'consistency': coefficient_of_variation(recent_scores),
            'peak': max(recent_scores)
        }
    }
```

---

## Quality Assurance

### Score Validation

Before storing, scores undergo validation:

```python
def validate_aiq_score(score_data: dict) -> tuple:
    """
    Validate AIQ score data before storage.
    Returns (is_valid, errors)
    """
    errors = []

    # Range checks
    if not 0 <= score_data['overall_aiq'] <= 1000:
        errors.append("Overall AIQ out of range")

    for dim in DIMENSIONS:
        if not 0 <= score_data[f'{dim}_score'] <= 1000:
            errors.append(f"{dim} score out of range")

    # Confidence check
    if not 0 <= score_data['confidence'] <= 1:
        errors.append("Confidence out of range")

    # Level consistency
    expected_level = get_intelligence_level(score_data['overall_aiq'])[0]
    if score_data['intelligence_level'] != expected_level:
        errors.append("Intelligence level mismatch")

    return (len(errors) == 0, errors)
```

### Anomaly Detection

Flag unusual score patterns:

```python
def detect_score_anomalies(score_data: dict, agent_id: str) -> list:
    """
    Detect anomalous scores that may indicate measurement issues.
    """
    anomalies = []
    historical = get_recent_scores(agent_id, days=7)

    if historical:
        avg = mean([s['overall_aiq'] for s in historical])
        std = stdev([s['overall_aiq'] for s in historical])

        # Flag if > 2 standard deviations from mean
        if abs(score_data['overall_aiq'] - avg) > 2 * std:
            anomalies.append({
                'type': 'statistical_outlier',
                'detail': f"Score {score_data['overall_aiq']} is > 2σ from mean {avg:.0f}"
            })

    # Dimension imbalance detection
    dim_scores = [score_data[f'{d}_score'] for d in DIMENSIONS]
    if max(dim_scores) - min(dim_scores) > 400:
        anomalies.append({
            'type': 'dimension_imbalance',
            'detail': f"Large gap between highest ({max(dim_scores)}) and lowest ({min(dim_scores)}) dimensions"
        })

    return anomalies
```

---

*The scoring system transforms raw measurements into actionable intelligence metrics, enabling continuous improvement and wisdom evolution across the Brand Factory.*
