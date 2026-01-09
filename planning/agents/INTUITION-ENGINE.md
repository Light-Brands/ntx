# Intuition Engine Integration

> Experience-Based Learning for All Agents

This module integrates the Intuition Engine into every agent, enabling continuous learning from experience and human-like decision-making.

---

## Overview

The Intuition Engine provides agents with:

1. **Fast Intuition** - Instant pattern recognition from accumulated wisdom
2. **Deliberate Reasoning** - Deep analysis guided by intuitive priors
3. **Continuous Learning** - Every action becomes a lesson for the future

```
┌─────────────────────────────────────────────────────────────────┐
│                    INTUITION-ENABLED AGENT                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│   │   Context    │───▶│  Intuition   │───▶│   Decision   │     │
│   │   Input      │    │   Retrieval  │    │   Making     │     │
│   └──────────────┘    └──────────────┘    └──────────────┘     │
│                              │                    │              │
│                              ▼                    ▼              │
│                       ┌──────────────┐    ┌──────────────┐     │
│                       │   Lessons    │◀───│  Reflection  │     │
│                       │   Memory     │    │  & Learning  │     │
│                       └──────────────┘    └──────────────┘     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Integration Protocol

### Phase 1: Pre-Decision Intuition

Before taking any significant action, agents MUST:

```xml
<intuition-check>
  <context>
    <!-- Current situation summary -->
    <domain>{agent_domain}</domain>
    <task>{current_task}</task>
    <constraints>{known_constraints}</constraints>
    <stakes>{low|medium|high|critical}</stakes>
  </context>

  <retrieve>
    <!-- Request relevant lessons -->
    <query>What have I learned about {situation_pattern}?</query>
    <min_strength>0.3</min_strength>
    <max_results>10</max_results>
  </retrieve>
</intuition-check>
```

### Phase 2: Apply Intuitive Guidance

Retrieved lessons influence decision-making:

```
INTUITIVE GUIDANCE APPLICATION:

1. ATTENTION SHIFTS
   - Focus extra attention on flagged aspects
   - "Past failures in X area" → double-check X

2. ACTION BIASES
   - Prefer/avoid certain approaches
   - "Pattern Y worked well" → weight Y higher

3. CAUTION SIGNALS
   - Slow down for risky patterns
   - "Similar situations had issues" → extra validation

4. CONFIDENCE CALIBRATION
   - Adjust certainty based on domain experience
   - "Novel territory" → reduce confidence, seek review
```

### Phase 3: Post-Action Reflection

After completing any significant action, agents MUST:

```xml
<reflection>
  <episode>
    <context>{what_was_the_situation}</context>
    <action>{what_action_was_taken}</action>
    <outcome>{what_happened}</outcome>
    <success_score>{0.0-1.0}</success_score>
  </episode>

  <lessons>
    <applied_lessons>
      <!-- Which lessons influenced this decision? -->
      <lesson id="..." effect="helped|hurt|neutral"/>
    </applied_lessons>

    <new_insights>
      <!-- What did we learn? -->
      <insight>
        <trigger_pattern>When...</trigger_pattern>
        <lesson_core>Then...</lesson_core>
        <action_bias>Therefore...</action_bias>
      </insight>
    </new_insights>
  </lessons>
</reflection>
```

---

## Lesson Storage Format

Agents contribute to the shared lesson corpus:

```json
{
    "id": "lesson_{domain}_{sequence}",
    "created_by": "{agent_name}",
    "created_at": "{ISO8601}",

    "trigger_pattern": "When {situation_description}",
    "lesson_core": "The insight or wisdom",
    "action_bias": {
        "type": "increase|decrease|prefer|avoid|require|forbid",
        "target": "what_action",
        "magnitude": 0.0-1.0
    },

    "domain": "{agent_domain}",
    "tags": ["tag1", "tag2"],

    "strength": 0.5,
    "confidence": 0.7,
    "source_episodes": ["ep_001", "ep_002"]
}
```

---

## Domain-Specific Lessons

Each agent domain accumulates specialized wisdom:

### Workflow Domain Lessons

| Agent | Lesson Type | Example |
|-------|-------------|---------|
| Issue Manager | Issue quality | "Vague issues lead to scope creep" |
| Prep Agent | Environment setup | "Dependency conflicts need isolation" |
| Implementer | Code patterns | "Complex features need incremental commits" |
| Reviewer | Review effectiveness | "Specific feedback gets better fixes" |
| Fixer | Fix strategies | "Root cause analysis prevents repeat fixes" |
| Validator | Merge safety | "Rushed merges cause rollbacks" |
| Closer | Documentation | "Detailed summaries help future issues" |
| Orchestrator | Coordination | "Parallel execution improves throughput" |

---

## Intuition Quality Signals

Agents should track these metrics:

### Decision Quality

| Metric | Description |
|--------|-------------|
| Intuition Hit Rate | % of retrieved lessons relevant to decision |
| Override Success | When ignoring intuition, how often correct? |
| Regret Rate | Decisions we'd make differently with hindsight |

### Learning Velocity

| Metric | Description |
|--------|-------------|
| Lessons per Episode | Average new insights extracted |
| Reinforcement Ratio | Lessons strengthened vs weakened |
| Cross-Domain Transfer | Lessons applied outside original domain |

---

## Integration Checklist

Every agent should:

- [ ] Query intuition before major decisions
- [ ] Apply retrieved lessons as soft biases
- [ ] Log all significant actions as episodes
- [ ] Extract lessons from outcomes
- [ ] Reinforce/decay applied lessons based on results
- [ ] Share high-value lessons across agent domains

---

## Example Intuition Flow

### Scenario: Reviewer Agent evaluating a PR

```
1. INTUITION CHECK
   Context: Large PR (500+ lines), auth-related changes

   Retrieved Lessons:
   - "Large PRs have 2x bug rate" (0.87)
   - "Auth changes need security review" (0.92)
   - "Split reviews by concern are faster" (0.71)

2. APPLY GUIDANCE
   - Increase scrutiny (large PR signal)
   - Require security focus (auth signal)
   - Consider suggesting PR split (efficiency signal)

3. TAKE ACTION
   - Perform detailed security review
   - Flag potential auth vulnerabilities
   - Suggest splitting into smaller PRs

4. REFLECT
   Outcome: Found 2 critical issues, PR was split
   Success Score: 0.9

   Reinforce: "Auth changes need security review" (+0.05)
   New Lesson: "Large auth PRs benefit from formal threat modeling"
```

---

## Connection to Intuition Engine Architecture

This integration module implements:

- **Experience Stream** → Episode logging after each action
- **Lesson Extractor** → Reflection phase extracts new lessons
- **Intuition Memory** → Lesson storage and retrieval
- **Decision Flow** → Three-phase decision process

See `intuition-engine/` for full architecture documentation:

- [00-architecture-overview.md](../intuition-engine/00-architecture-overview.md)
- [01-experience-stream.md](../intuition-engine/01-experience-stream.md)
- [02-lesson-extractor.md](../intuition-engine/02-lesson-extractor.md)
- [03-intuition-memory.md](../intuition-engine/03-intuition-memory.md)
- [04-decision-flow.md](../intuition-engine/04-decision-flow.md)

---

## Remember

The goal is not just to complete tasks, but to **get wiser with every action**. Each agent interaction is an opportunity to:

1. Apply accumulated wisdom
2. Observe outcomes carefully
3. Extract generalizable lessons
4. Improve for next time

**Every agent is a learning agent. Every action teaches something.**
