# Lesson Extractor

> Distilling Wisdom from Experience

The Lesson Extractor transforms raw episodes into explicit, reusable lessons that form the foundation of the AI's growing intuition.

---

## Core Function

After each episode (or batch), distill explicit lessons that capture:
- What worked and why
- What failed and why
- What to do differently
- General principles that apply beyond this specific case

---

## Extraction Process

### Input

Episodes from the Experience Stream with full context, actions, outcomes, and feedback.

### Processing Steps

```
┌─────────────────────────────────────────────────────────────┐
│                    LESSON EXTRACTION                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. SINGLE EPISODE ANALYSIS                                 │
│     └─▶ Chain-of-thought reflection                         │
│     └─▶ Identify specific learnings                         │
│                                                             │
│  2. PATTERN MATCHING                                        │
│     └─▶ Find similar past episodes                          │
│     └─▶ Identify recurring themes                           │
│                                                             │
│  3. GENERALIZATION                                          │
│     └─▶ Abstract specific → general                         │
│     └─▶ Validate across contexts                            │
│                                                             │
│  4. LESSON FORMATION                                        │
│     └─▶ Structure in standard format                        │
│     └─▶ Generate embedding                                  │
│     └─▶ Assign initial strength                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Extraction Methods

### 1. Chain-of-Thought Prompting

```python
REFLECTION_PROMPT = """
Analyzing Episode: {episode_id}
Domain: {domain}
Success Score: {success_score}

Context Summary:
{context_summary}

Actions Taken:
{actions_summary}

Outcomes:
{outcomes_summary}

Feedback Received:
{feedback_summary}

---

Please analyze this episode:

1. **Success Factors**: What specific actions or decisions contributed to
   positive outcomes? Why did they work?

2. **Failure Points**: What actions or decisions led to negative outcomes
   or suboptimal results? What was the root cause?

3. **Counterfactuals**: What alternative approaches might have worked
   better? What would you do differently?

4. **Generalizable Insight**: What lesson from this episode applies
   beyond this specific situation? State it as a general principle.

5. **Trigger Conditions**: Under what circumstances should this lesson
   be recalled? What patterns indicate relevance?

6. **Action Bias**: How should this lesson influence future decisions?
   What behavior should increase or decrease?
"""
```

### 2. Pattern Matching Across Episodes

```python
class PatternMatcher:
    def find_similar_episodes(self, episode: Episode, k: int = 20) -> List[Episode]:
        """Find episodes with similar context or outcomes."""
        # Embed current episode
        embedding = self.embed_episode(episode)

        # Search for similar past episodes
        similar = self.vector_store.search(embedding, k=k)

        return similar

    def identify_patterns(self, episodes: List[Episode]) -> List[Pattern]:
        """Find recurring themes across episode cluster."""
        patterns = []

        # Analyze action sequences that led to success
        successful = [e for e in episodes if e.outcomes.success_degree > 0.7]
        patterns.extend(self.extract_action_patterns(successful))

        # Analyze failure modes
        failed = [e for e in episodes if e.outcomes.success_degree < 0.3]
        patterns.extend(self.extract_failure_patterns(failed))

        return patterns
```

### 3. Critique Model

A fine-tuned model specialized in extracting lessons:

```python
class CritiqueModel:
    """
    Fine-tuned on:
    - Episode → lesson pairs from expert annotation
    - Self-generated lessons validated by outcomes
    - Diverse domains (business, technical, social)
    """

    def extract_lessons(self, episode: Episode) -> List[RawLesson]:
        # Generate candidate lessons
        candidates = self.generate_candidates(episode)

        # Score each candidate
        scored = [(c, self.score_lesson(c, episode)) for c in candidates]

        # Filter by quality threshold
        quality_lessons = [c for c, s in scored if s > 0.7]

        return quality_lessons
```

---

## Lesson Data Structure

```typescript
interface Lesson {
    // Identity
    id: string;
    version: number;
    created_at: ISO8601;
    updated_at: ISO8601;

    // Core Content
    trigger_pattern: string;      // When does this lesson apply?
    lesson_core: string;          // The actual insight
    action_bias: ActionBias;      // How to adjust behavior

    // Metadata
    domain: string;
    tags: string[];

    // Strength & Confidence
    strength: number;             // 0.0 - 1.0, how strongly to apply
    confidence: number;           // 0.0 - 1.0, how certain is this lesson
    application_count: number;    // Times successfully applied
    reinforcement_history: Reinforcement[];

    // Provenance
    source_episodes: string[];    // Episodes that generated this
    derived_from: string[];       // Parent lessons if merged
    contradicts: string[];        // Lessons this conflicts with

    // Retrieval
    embedding: number[];          // Vector for similarity search
    keywords: string[];           // For text search
}

interface ActionBias {
    type: 'increase' | 'decrease' | 'prefer' | 'avoid' | 'require' | 'forbid';
    target: string;               // What action or approach
    magnitude: number;            // How much to adjust (0.0 - 1.0)
    conditions: string[];         // Additional conditions for application
}
```

---

## Lesson Quality Criteria

Each lesson is evaluated against:

| Criterion | Description | Weight |
|-----------|-------------|--------|
| **Specificity** | Clear, actionable guidance | 0.20 |
| **Generality** | Applies beyond source context | 0.20 |
| **Testability** | Can verify if it works | 0.15 |
| **Non-obvious** | Adds beyond common sense | 0.15 |
| **Consistency** | Doesn't contradict strong lessons | 0.15 |
| **Alignment** | Compatible with light-focused values | 0.15 |

Lessons scoring below 0.6 are flagged for review.

---

## Example Lessons

### Token Launch Lesson

```json
{
    "id": "lesson_tok_001",
    "trigger_pattern": "Preparing to launch a new token without established community",
    "lesson_core": "Token launches without prior community engagement consistently underperform. Build community interest and validate demand before deploying contracts.",
    "action_bias": {
        "type": "require",
        "target": "community_validation_step",
        "magnitude": 0.9,
        "conditions": ["new_token_launch", "community_size < 100"]
    },
    "domain": "token_design",
    "strength": 0.87,
    "confidence": 0.92,
    "source_episodes": ["ep_tok_012", "ep_tok_034", "ep_tok_056"]
}
```

### Governance Lesson

```json
{
    "id": "lesson_gov_023",
    "trigger_pattern": "Designing voting mechanisms for new DAO",
    "lesson_core": "Quadratic voting reduces plutocracy but requires sybil resistance. Always pair quadratic mechanisms with identity verification.",
    "action_bias": {
        "type": "prefer",
        "target": "quadratic_plus_identity",
        "magnitude": 0.75,
        "conditions": ["dao_design", "governance_voting"]
    },
    "domain": "governance",
    "strength": 0.78,
    "confidence": 0.85,
    "source_episodes": ["ep_gov_008", "ep_gov_019"]
}
```

### Meta-Learning Lesson

```json
{
    "id": "lesson_meta_007",
    "trigger_pattern": "Encountering a situation with high uncertainty and high stakes",
    "lesson_core": "When both uncertainty and stakes are high, slow down. Request more information, run simulations, or escalate to human review. Rushing high-stakes uncertain decisions has 3x the failure rate.",
    "action_bias": {
        "type": "increase",
        "target": "deliberation_time",
        "magnitude": 0.85,
        "conditions": ["uncertainty > 0.7", "stakes > 0.7"]
    },
    "domain": "meta_learning",
    "strength": 0.94,
    "confidence": 0.91,
    "source_episodes": ["ep_meta_001", "ep_meta_003", "ep_meta_012", "..."]
}
```

---

## Lesson Lifecycle

```
Birth           Growth              Maturity           Decay/Merge
  │               │                    │                   │
  ▼               ▼                    ▼                   ▼
┌─────┐       ┌───────┐           ┌─────────┐        ┌─────────┐
│ New │──────▶│Reinforce│─────────▶│ Stable  │───────▶│Archive  │
│0.5  │       │ +0.1   │          │  0.9    │        │or Merge │
└─────┘       └───────┘           └─────────┘        └─────────┘
                  │                    │
                  │  Contradiction     │ No application
                  ▼                    ▼
              ┌───────┐           ┌─────────┐
              │Review │           │ Decay   │
              │ -0.2  │           │ -0.01/d │
              └───────┘           └─────────┘
```

---

## Batch Processing

For efficiency, lessons are often extracted in batches:

```python
class BatchExtractor:
    def process_batch(self, episodes: List[Episode]) -> List[Lesson]:
        # Group by domain
        by_domain = self.group_by_domain(episodes)

        # Extract per-domain lessons
        lessons = []
        for domain, eps in by_domain.items():
            domain_lessons = self.extract_domain_lessons(domain, eps)
            lessons.extend(domain_lessons)

        # Cross-domain pattern extraction
        cross_lessons = self.extract_cross_domain_patterns(episodes)
        lessons.extend(cross_lessons)

        # Deduplicate and merge similar lessons
        final_lessons = self.deduplicate_and_merge(lessons)

        return final_lessons
```

---

## Quality Assurance

### Automated Checks

- Contradiction detection with existing lessons
- Alignment verification against core principles
- Specificity and actionability scoring
- Source episode validity

### Human Review Queue

High-impact lessons are flagged for human review:

- Lessons that would override existing high-strength lessons
- Lessons in sensitive domains (security, alignment)
- Lessons with conflicting evidence
- Novel lessons in unexplored territory

---

## Related Documents

- [Experience Stream](./01-experience-stream.md)
- [Intuition Memory](./03-intuition-memory.md)
- [Decision Flow](./04-decision-flow.md)
