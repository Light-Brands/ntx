# AIQ Engine Integration

> Intelligence Measurement and Reporting for All Agents

This module integrates the AIQ (Artificial Intelligence Quotient) Engine into every agent, enabling continuous visibility into the intelligence level being applied to decisions.

---

## Overview

The AIQ Engine provides agents with:

1. **Intelligence Visibility** - Real-time measurement of reasoning depth and quality
2. **Decision Tracking** - Automatic capture of cognitive signals during tasks
3. **Post-Task Reporting** - Comprehensive AIQ scores after completion
4. **Continuous Improvement** - Insights for evolving intelligence over time

```
┌─────────────────────────────────────────────────────────────────┐
│                    AIQ-ENABLED AGENT                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│   │   Context    │───▶│     AIQ      │───▶│   Decision   │     │
│   │   Input      │    │ Observation  │    │   Making     │     │
│   └──────────────┘    └──────────────┘    └──────────────┘     │
│                              │                    │              │
│                              ▼                    ▼              │
│                       ┌──────────────┐    ┌──────────────┐     │
│                       │     AIQ      │◀───│     AIQ      │     │
│                       │   Scoring    │    │ Measurement  │     │
│                       └──────────────┘    └──────────────┘     │
│                              │                                   │
│                              ▼                                   │
│                       ┌──────────────┐                          │
│                       │     AIQ      │                          │
│                       │   Report     │                          │
│                       └──────────────┘                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Integration Protocol

### Phase 1: AIQ Observation Start

At the beginning of any significant task, agents MUST:

```xml
<aiq-start>
  <task_id>{unique_task_identifier}</task_id>
  <agent>{agent_name}</agent>
  <timestamp>{ISO8601}</timestamp>

  <context>
    <task_type>{implementation|review|planning|etc}</task_type>
    <complexity>{trivial|low|medium|high|critical}</complexity>
    <domain>{code|architecture|governance|etc}</domain>
    <stakes>{low|medium|high|critical}</stakes>
  </context>

  <initial_state>
    <context_factors_known>{count}</context_factors_known>
    <constraints_identified>{count}</constraints_identified>
    <stakeholders_considered>{list}</stakeholders_considered>
  </initial_state>
</aiq-start>
```

### Phase 2: Active Decision Tracking

During task execution, agents should surface reasoning for measurement:

```xml
<aiq-trace>
  <reasoning_step n="{sequence}">
    <thought>{what_you_are_considering}</thought>
    <depth_marker>{causal_analysis|counterfactual|inference|etc}</depth_marker>
    <context_expansion>{new_factors_discovered}</context_expansion>
  </reasoning_step>

  <pattern_recognition>
    <!-- When you recognize a pattern from another domain -->
    <analogy source="{source_domain}" target="{current_domain}">
      {description_of_connection}
    </analogy>
  </pattern_recognition>

  <alternatives>
    <!-- When you consider multiple approaches -->
    <option n="{sequence}" novelty="{0.0-1.0}">
      {alternative_approach}
    </option>
  </alternatives>

  <adaptation>
    <!-- When you change course based on new information -->
    <trigger>{what_caused_the_change}</trigger>
    <adjustment>{how_you_adapted}</adjustment>
  </adaptation>
</aiq-trace>
```

### Phase 3: Post-Task AIQ Report

After completing any significant task, agents MUST:

```xml
<aiq-complete>
  <task_id>{task_identifier}</task_id>
  <completed_at>{ISO8601}</completed_at>

  <outcome>
    <success>{true|false}</success>
    <quality>{0.0-1.0}</quality>
    <unexpected_effects>{list_of_surprises}</unexpected_effects>
  </outcome>

  <self_assessment>
    <confidence_level>{0.0-1.0}</confidence_level>
    <confidence_reasoning>{why_this_confidence}</confidence_reasoning>
    <limitations_acknowledged>{list}</limitations_acknowledged>
    <lessons_learned>{list}</lessons_learned>
  </self_assessment>

  <request_report>true</request_report>
</aiq-complete>
```

---

## AIQ Dimensions

Agents contribute signals across six intelligence dimensions:

### 1. Reasoning Depth (25%)

**What it measures:** How deep is your logical analysis?

| Signal | How to Demonstrate |
|--------|-------------------|
| Inference chains | Show "A leads to B leads to C" reasoning |
| Causal analysis | Explain "because" relationships |
| Counterfactuals | Consider "what if X was different" |
| Root cause | Ask "why" multiple times |
| Implications | Map downstream consequences |

**Example:**
```
Instead of: "This code has a bug, I'll fix it"
Show: "This code has a null pointer issue because the initialization
happens after the first access. This could cause crashes in production
which would affect user trust. The root cause is the async loading
pattern which doesn't guarantee order. If we hadn't caught this,
monitoring would have shown the crash rate increase by ~5%."
```

### 2. Pattern Recognition (20%)

**What it measures:** Can you see connections across domains?

| Signal | How to Demonstrate |
|--------|-------------------|
| Cross-domain analogies | Reference patterns from other fields |
| Historical matching | Note similar past situations |
| Anomaly detection | Flag unexpected deviations |
| Trend recognition | Identify directional patterns |
| Structural similarity | Find deep structural parallels |

**Example:**
```
"This rate limiting problem is similar to how ecosystems regulate
population growth - we need a feedback loop that self-corrects
rather than hard cutoffs. The token bucket pattern used in
network QoS could work here."
```

### 3. Context Integration (20%)

**What it measures:** How broadly do you consider the situation?

| Signal | How to Demonstrate |
|--------|-------------------|
| Stakeholder coverage | List all affected parties |
| Temporal scope | Consider past, present, future |
| System awareness | Recognize system-level effects |
| Constraint handling | Explicitly note limitations |
| Trade-off articulation | Enumerate competing concerns |

**Example:**
```
"This change affects: developers (API change), users (new feature),
ops (monitoring needs update), legal (data handling implications),
and future maintainers (increased complexity). Short-term it adds
value, but long-term maintenance cost must be considered."
```

### 4. Creativity (15%)

**What it measures:** Are you generating novel solutions?

| Signal | How to Demonstrate |
|--------|-------------------|
| Solution novelty | Diverge from standard approaches |
| Combination originality | Merge concepts in new ways |
| Constraint transcendence | Sidestep apparent limitations |
| Generative alternatives | Produce multiple distinct options |
| Paradigm shifts | Fundamentally reframe the problem |

**Example:**
```
"Standard approach: Add a caching layer.
Alternative 1: Use read-through cache with TTL.
Alternative 2: Precompute common queries.
Alternative 3: What if we flip the model - push updates to clients
instead of clients polling? This eliminates the need for caching
entirely and gives real-time updates as a bonus."
```

### 5. Adaptability (10%)

**What it measures:** Do you respond well to change?

| Signal | How to Demonstrate |
|--------|-------------------|
| Mid-course correction | Adjust when new info arrives |
| Feedback integration | Incorporate external input |
| Assumption revision | Update beliefs when warranted |
| Graceful degradation | Handle unexpected failures |
| Strategy pivots | Change approach when needed |

**Example:**
```
"Initial plan: Use library X.
Discovery: Library X doesn't support our use case.
Adaptation: Evaluated alternatives Y and Z.
Revised plan: Using Z because it's maintained actively
and has better TypeScript support."
```

### 6. Self-Reflection (10%)

**What it measures:** Do you have meta-cognitive awareness?

| Signal | How to Demonstrate |
|--------|-------------------|
| Uncertainty acknowledgment | State confidence bounds |
| Limitation awareness | Recognize own blind spots |
| Error anticipation | Proactively identify risks |
| Learning articulation | Explicitly state lessons |
| Reasoning explanation | Meta-commentary on process |

**Example:**
```
"I'm 75% confident in this solution. My uncertainty comes from:
1) I haven't seen this exact pattern before
2) Performance characteristics are theoretical
3) I may be missing edge cases in concurrent scenarios.
Recommend: Test under load before production."
```

---

## Intelligence Level Targets

Agents should aim for appropriate intelligence levels by task type:

| Task Type | Target Level | Target AIQ |
|-----------|--------------|------------|
| Bug fix | Analytical | 350-450 |
| Code review | Strategic | 550-650 |
| New feature | Strategic | 550-700 |
| Architecture | Creative | 700-800 |
| Brand launch | Visionary | 800-900 |

### Level Definitions

```
Reactive (0-100)       → Simple stimulus-response
Procedural (101-250)   → Following patterns
Analytical (251-400)   → Breaking down problems
Synthetic (401-550)    → Combining insights
Strategic (551-700)    → Planning and anticipating
Creative (701-850)     → Novel solutions
Visionary (851-950)    → Systems-level insight
Transcendent (951-1000)→ Wisdom integration
```

---

## AIQ Report Format

After task completion, agents receive AIQ reports:

```
┌────────────────────────────────────────────────────────────────┐
│  AIQ TASK REPORT                                               │
├────────────────────────────────────────────────────────────────┤
│  Task: Implement authentication flow                           │
│  Agent: implementer-agent                                      │
│  Duration: 2h 15m                                              │
│                                                                │
│  Overall AIQ: 576  ████████████████░░░░  Level: Strategic     │
│  Confidence: 87%                                               │
│                                                                │
│  Dimensions:                                                   │
│  Reasoning     612  ████████████████████░░░░░░░░░░            │
│  Pattern       548  █████████████████░░░░░░░░░░░░░            │
│  Context       680  ██████████████████████░░░░░░░░            │
│  Creativity    445  ██████████████░░░░░░░░░░░░░░░░            │
│  Adaptability  520  ████████████████░░░░░░░░░░░░░░            │
│  Reflection    590  ███████████████████░░░░░░░░░░░            │
│                                                                │
│  Strengths:                                                    │
│  • Excellent context awareness (5 stakeholder groups)          │
│  • Strong causal reasoning (4-level chain)                     │
│                                                                │
│  Growth Areas:                                                 │
│  • Explore more creative alternatives                          │
│  • Increase cross-domain pattern matching                      │
│                                                                │
│  vs Average: +23 (self) | +45 (factory) | +12 (task type)     │
└────────────────────────────────────────────────────────────────┘
```

---

## Domain-Specific AIQ Profiles

Each agent type has characteristic AIQ patterns:

| Agent | Strongest Dimensions | Growth Dimensions |
|-------|---------------------|-------------------|
| Issue Manager | Context Integration | Creativity |
| Prep Agent | Reasoning Depth | Pattern Recognition |
| Implementer | Reasoning, Adaptability | Creativity |
| Reviewer | Pattern Recognition, Reflection | Creativity |
| Fixer | Adaptability, Reasoning | Context Integration |
| Validator | Self-Reflection | Pattern Recognition |
| Closer | Context Integration | Reasoning Depth |
| Orchestrator | Context Integration, Adaptability | Creativity |

---

## AIQ Quality Signals

Agents should track these metrics:

### Performance Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| Average AIQ | Rolling 7-day average | 500+ |
| AIQ Trend | Direction of change | Ascending |
| Level Consistency | % tasks at expected level | >80% |
| Dimension Balance | Gap between highest/lowest | <300 |

### Growth Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| Creativity Improvement | Monthly trend | +5% |
| Pattern Recognition Growth | Monthly trend | +3% |
| Self-Reflection Depth | Increasing meta-awareness | Ascending |

---

## Integration Checklist

Every agent should:

- [ ] Start AIQ observation at task beginning
- [ ] Surface reasoning traces during execution
- [ ] Demonstrate pattern recognition when applicable
- [ ] Consider multiple alternatives before deciding
- [ ] Acknowledge uncertainty and limitations
- [ ] Complete AIQ report at task end
- [ ] Review AIQ reports for improvement opportunities
- [ ] Track dimension scores over time

---

## Example AIQ Flow

### Scenario: Implementer Agent building a new feature

```
1. AIQ START
   Task: Implement user notification preferences
   Complexity: Medium
   Stakes: Medium

2. REASONING TRACE
   Step 1: "User preferences need persistence - database schema first"
   Step 2: "But wait, this affects performance - need to consider caching"
   Step 3: "Similar to the recommendation engine pattern where we..."
   [Cross-domain analogy detected]

   Alternatives Considered:
   - Store in user table (simple, but couples concerns)
   - Separate preferences table (normalized, more flexible)
   - Key-value store (most flexible, but harder to query)
   [Creativity: 3 alternatives generated]

   Adaptation:
   - Originally planned SQL only
   - Discovered Redis is already in stack
   - Revised to hybrid approach
   [Adaptability signal captured]

3. SELF-ASSESSMENT
   Confidence: 0.80
   "Confident in the architecture, less certain about
   notification delivery edge cases in high-volume scenarios"
   [Self-reflection captured]

4. AIQ REPORT GENERATED
   Overall: 587 (Strategic)
   Strengths: Adaptability (course correction), Context (stakeholder aware)
   Growth: Could explore more novel notification patterns

5. LESSON FOR FUTURE
   "Hybrid storage approaches work well when different access
   patterns exist for the same data"
   [Feeds into Intuition Engine]
```

---

## Connection to AIQ Engine Architecture

This integration module implements:

- **AIQ Observation** → Task start and reasoning trace capture
- **AIQ Measurement** → Signal extraction from traces
- **AIQ Scoring** → Dimension and overall score calculation
- **AIQ Reporting** → Post-task reports and insights

See `aiq-engine/` for full architecture documentation:

- [00-architecture-overview.md](../aiq-engine/00-architecture-overview.md)
- [01-measurement-framework.md](../aiq-engine/01-measurement-framework.md)
- [02-scoring-system.md](../aiq-engine/02-scoring-system.md)
- [03-reporting-system.md](../aiq-engine/03-reporting-system.md)

---

## Synergy with Intuition Engine

AIQ and Intuition work together:

```
┌─────────────────────────────────────────────────────────────────┐
│                    DUAL ENGINE SYNERGY                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   INTUITION ENGINE          │          AIQ ENGINE               │
│   "What have we learned?"   │   "How intelligently are we       │
│                             │    applying what we know?"        │
│                             │                                    │
│   ┌─────────────┐           │    ┌─────────────┐                │
│   │   Lessons   │───────────┼───▶│   Signals   │                │
│   │  Retrieved  │           │    │  Measured   │                │
│   └─────────────┘           │    └─────────────┘                │
│         │                   │          │                         │
│         ▼                   │          ▼                         │
│   ┌─────────────┐           │    ┌─────────────┐                │
│   │  Decision   │◀──────────┼────│    AIQ      │                │
│   │   Guided    │           │    │   Report    │                │
│   └─────────────┘           │    └─────────────┘                │
│         │                   │          │                         │
│         ▼                   │          ▼                         │
│   ┌─────────────┐           │    ┌─────────────┐                │
│   │ New Lessons │◀──────────┼────│  Insights   │                │
│   │  Extracted  │           │    │  Generated  │                │
│   └─────────────┘           │    └─────────────┘                │
│                                                                  │
│   High AIQ decisions produce better lessons                     │
│   Rich lessons enable higher AIQ decisions                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Key Integration Points:**
1. AIQ measures how effectively lessons are being applied
2. High-AIQ decisions produce higher-quality lessons
3. Both systems feed the same episode stream
4. Council reviews consider both AIQ and intuition metrics

---

## Remember

The goal is not just to complete tasks, but to **demonstrate visible intelligence**. Each agent interaction is an opportunity to:

1. Show reasoning depth and quality
2. Make intelligence measurable and observable
3. Generate insights for continuous improvement
4. Evolve toward higher wisdom

**Every agent is an intelligent agent. Every decision demonstrates that intelligence.**
