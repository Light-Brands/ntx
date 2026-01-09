# Experience Stream

> Capturing Every Interaction as Structured Learning Data

The Experience Stream is the sensory system of the Intuition Engine — recording, structuring, and routing all interactions for learning.

---

## Core Function

Transform raw interactions into structured episodes that can be analyzed for lessons.

```
Raw Interaction → Structured Episode → Feedback Integration → Lesson Pipeline
```

---

## Episode Structure

Every interaction is recorded as a structured episode:

```typescript
interface Episode {
    // Identification
    id: string;
    timestamp: ISO8601;
    session_id: string;
    agent_id: string;

    // Context
    context: {
        situation: string;          // What was happening
        constraints: string[];      // Limitations in play
        goals: string[];            // What we were trying to achieve
        domain: string;             // Business area (token launch, governance, etc.)
        prior_episodes: string[];   // Related past episodes
        environment: object;        // System state, market conditions, etc.
    };

    // Actions
    actions: {
        sequence: Action[];         // Ordered list of decisions
        reasoning: string[];        // Why each action was taken
        alternatives_considered: string[];
        tools_used: string[];
    };

    // Outcomes
    outcomes: {
        results: object;            // What actually happened
        metrics: Record<string, number>;
        success_degree: number;     // 0.0 - 1.0
        unexpected_effects: string[];
        duration_ms: number;
    };

    // Feedback
    feedback: {
        external: ExternalFeedback[];   // Rewards, corrections, user input
        internal: InternalCritique;     // Self-reflection results
        human_override: boolean;
        alignment_flags: string[];
    };
}
```

---

## Interaction Sources

The Experience Stream captures from multiple sources:

### 1. Task Execution

```
Brand Factory Operations:
├── Business ideation sessions
├── Token design processes
├── Smart contract deployments
├── Market launch sequences
├── Community building activities
└── Governance decisions
```

### 2. Conversations

```
Dialogue Interactions:
├── User queries and responses
├── Clarification exchanges
├── Feedback discussions
├── Planning conversations
└── Error recovery dialogues
```

### 3. Simulations

```
Synthetic Environments:
├── Market scenario testing
├── Governance attack simulations
├── Stress testing protocols
├── What-if explorations
└── Adversarial challenges
```

### 4. Self-Play

```
Autonomous Learning:
├── Strategy competitions
├── Design alternatives
├── Optimization searches
├── Hypothesis testing
└── Capability probing
```

### 5. Real-World Interfaces

```
External Systems:
├── Blockchain transactions
├── API integrations
├── Market data feeds
├── Social sentiment
└── Performance metrics
```

---

## Feedback Types

### External Feedback

Signals from outside the system:

| Type | Source | Example |
|------|--------|---------|
| Rewards | Metrics | TVL increased by 50% |
| Corrections | Human oversight | "That approach is too aggressive" |
| Ratings | User feedback | 4.5/5 satisfaction score |
| Market signals | On-chain data | Token price stability |
| Community response | Social metrics | Engagement up 200% |

### Internal Feedback

Self-generated through reflection:

```python
class InternalCritique:
    reflection_prompt = """
    Analyzing episode {episode_id}:

    1. What worked well and why?
    2. What failed or underperformed?
    3. What would I do differently?
    4. What patterns do I notice?
    5. What assumptions were wrong?
    6. What should I remember?
    """

    def generate_critique(self, episode: Episode) -> Critique:
        # Run reflection prompt through critique model
        # Score each dimension
        # Identify key learnings
        return critique
```

---

## Episode Processing Pipeline

```
┌──────────────┐
│  Raw Event   │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────┐
│         INGESTION LAYER              │
│  - Normalize format                  │
│  - Validate structure                │
│  - Assign identifiers                │
│  - Timestamp synchronization         │
└──────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│         ENRICHMENT LAYER             │
│  - Add environmental context         │
│  - Link related episodes             │
│  - Compute initial metrics           │
│  - Tag domain and category           │
└──────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│         FEEDBACK INTEGRATION         │
│  - Collect external signals          │
│  - Run internal critique             │
│  - Calculate success scores          │
│  - Flag alignment concerns           │
└──────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│         STORAGE & ROUTING            │
│  - Write to episode store            │
│  - Queue for lesson extraction       │
│  - Update real-time dashboards       │
│  - Trigger alerts if needed          │
└──────────────────────────────────────┘
```

---

## Episode Categories

### By Outcome

| Category | Success Score | Treatment |
|----------|---------------|-----------|
| Success | 0.8 - 1.0 | Extract positive patterns |
| Partial | 0.4 - 0.8 | Analyze what limited success |
| Failure | 0.0 - 0.4 | Deep dive on what went wrong |
| Unexpected | Any + flags | Priority review |

### By Domain

```
Domains:
├── token_design
├── smart_contracts
├── governance
├── community
├── market_launch
├── defi_integration
├── security
├── alignment
└── meta_learning
```

---

## Real-Time Streaming

Episodes flow through the system in real-time:

```
                     ┌─────────────────┐
                     │   Event Bus     │
                     │  (Kafka/Redis)  │
                     └────────┬────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ Episode Store │   │Lesson Pipeline│   │  Dashboards   │
│ (PostgreSQL)  │   │  (Extractor)  │   │ (Real-time)   │
└───────────────┘   └───────────────┘   └───────────────┘
```

---

## Retention & Archival

| Age | Storage | Access |
|-----|---------|--------|
| 0-7 days | Hot (SSD) | Real-time |
| 7-90 days | Warm (HDD) | Fast query |
| 90+ days | Cold (Archive) | Batch retrieval |
| Summarized | Permanent | Always available |

Raw episodes may age out, but extracted lessons persist forever.

---

## Quality Metrics

Track the health of the experience stream:

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Episodes/day | >100 | <50 |
| Feedback coverage | >90% | <80% |
| Processing latency | <1s | >5s |
| Structure validity | >99% | <95% |
| Enrichment success | >95% | <90% |
