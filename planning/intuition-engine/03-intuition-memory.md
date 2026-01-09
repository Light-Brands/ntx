# Intuition Memory

> Dual-Layer Storage for Fast Intuition and Deep Recall

The Intuition Memory stores extracted lessons in a dual-layer architecture that enables both lightning-fast intuitive retrieval and deliberate deep search.

---

## Core Design Principle

Human cognition operates on two systems:

| System | Speed | Nature | Use |
|--------|-------|--------|-----|
| System 1 | Fast | Intuitive, automatic | Quick judgments |
| System 2 | Slow | Deliberate, analytical | Complex reasoning |

The Intuition Memory mirrors this with two retrieval paths:

```
                    ┌────────────────────┐
                    │   Current Context  │
                    └─────────┬──────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
    ┌─────────────────────┐       ┌─────────────────────┐
    │   FAST PATH (~1ms)  │       │   SLOW PATH (~100ms)│
    │                     │       │                     │
    │  Vector similarity  │       │  Full-text search   │
    │  Top-k retrieval    │       │  Complex queries    │
    │  Cached hot lessons │       │  Historical analysis│
    │                     │       │                     │
    │  "Gut feelings"     │       │  "Let me think..."  │
    └─────────────────────┘       └─────────────────────┘
              │                               │
              └───────────────┬───────────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │  Decision Making   │
                    └────────────────────┘
```

---

## Layer 1: Explicit Log

The complete, searchable database of all lessons.

### Storage Schema

```sql
CREATE TABLE lessons (
    id UUID PRIMARY KEY,
    version INTEGER NOT NULL,

    -- Core content
    trigger_pattern TEXT NOT NULL,
    lesson_core TEXT NOT NULL,
    action_bias JSONB NOT NULL,

    -- Classification
    domain VARCHAR(50) NOT NULL,
    tags TEXT[] DEFAULT '{}',

    -- Strength metrics
    strength FLOAT DEFAULT 0.5,
    confidence FLOAT DEFAULT 0.5,
    application_count INTEGER DEFAULT 0,

    -- Temporal
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_applied_at TIMESTAMPTZ,

    -- Provenance
    source_episodes TEXT[] NOT NULL,
    derived_from UUID[],

    -- Search vectors
    embedding VECTOR(1536),
    search_text TSVECTOR
);

-- Indexes for fast retrieval
CREATE INDEX idx_lessons_embedding ON lessons
    USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_lessons_search ON lessons USING GIN (search_text);
CREATE INDEX idx_lessons_domain ON lessons (domain);
CREATE INDEX idx_lessons_strength ON lessons (strength DESC);
```

### Query Capabilities

```python
class ExplicitLog:
    def search_by_text(self, query: str, limit: int = 20) -> List[Lesson]:
        """Full-text search through lessons."""
        pass

    def search_by_domain(self, domain: str, min_strength: float = 0.5) -> List[Lesson]:
        """Get all lessons for a specific domain."""
        pass

    def search_by_episode(self, episode_id: str) -> List[Lesson]:
        """Find all lessons derived from a specific episode."""
        pass

    def find_contradictions(self, lesson: Lesson) -> List[Lesson]:
        """Find lessons that might contradict a given lesson."""
        pass

    def get_reinforcement_history(self, lesson_id: str) -> List[Reinforcement]:
        """Get the full history of how a lesson's strength changed."""
        pass

    def analyze_trends(self, domain: str, time_range: TimeRange) -> Analytics:
        """Analyze lesson patterns over time."""
        pass
```

---

## Layer 2: Fast Intuitive Layer

High-speed retrieval system for real-time decision support.

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    FAST INTUITIVE LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   HOT CACHE (Redis)                     │   │
│  │                                                         │   │
│  │  Recently applied lessons with full context             │   │
│  │  TTL: 1 hour | Max: 1000 lessons                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                VECTOR INDEX (FAISS/ScaNN)               │   │
│  │                                                         │   │
│  │  All lessons indexed by embedding                       │   │
│  │  Retrieval: <1ms for top-100                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              NEURAL ROUTING INDEX                       │   │
│  │                                                         │   │
│  │  Learned index that predicts which lessons are          │   │
│  │  most relevant for a given context embedding            │   │
│  │  Trained on: (context, retrieved_lessons, outcomes)     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Fast Retrieval Process

```python
class FastIntuitiveLayer:
    def retrieve_intuitions(
        self,
        context: Context,
        k: int = 10,
        min_strength: float = 0.3
    ) -> List[IntuitiveHit]:
        """
        Retrieve the top-k most relevant lessons for current context.

        Returns within 1-5ms.
        """
        # Step 1: Embed the current context
        context_embedding = self.embed_context(context)

        # Step 2: Check hot cache first
        cached_hits = self.hot_cache.get_relevant(context_embedding, k=k//2)

        # Step 3: Vector similarity search
        vector_hits = self.vector_index.search(
            context_embedding,
            k=k,
            min_strength=min_strength
        )

        # Step 4: Neural routing refinement
        refined_hits = self.neural_router.rerank(
            context_embedding,
            cached_hits + vector_hits
        )

        # Step 5: Return top-k with relevance scores
        return refined_hits[:k]
```

### Intuitive Hit Format

```python
@dataclass
class IntuitiveHit:
    lesson_id: str
    lesson_core: str
    action_bias: ActionBias

    # Retrieval metadata
    relevance_score: float     # How relevant to current context
    strength: float            # How strongly to apply
    combined_weight: float     # relevance * strength

    # Application guidance
    suggested_adjustment: str  # Natural language suggestion
    confidence: float
```

---

## Memory Operations

### Writing New Lessons

```python
def store_lesson(lesson: Lesson):
    # 1. Write to explicit log (database)
    db.insert(lesson)

    # 2. Index in vector store
    vector_index.add(lesson.id, lesson.embedding)

    # 3. Update neural router training data
    router_training_queue.enqueue(lesson)

    # 4. Invalidate relevant cache entries
    hot_cache.invalidate_by_domain(lesson.domain)
```

### Reinforcing Lessons

```python
def reinforce_lesson(
    lesson_id: str,
    outcome: Outcome,
    application_context: Context
):
    """Called when a lesson was applied and we have outcome data."""

    lesson = db.get(lesson_id)

    if outcome.success:
        # Positive reinforcement
        lesson.strength = min(1.0, lesson.strength + 0.05)
        lesson.application_count += 1
    else:
        # Negative signal - may need review
        lesson.strength = max(0.0, lesson.strength - 0.1)
        if lesson.strength < 0.3:
            flag_for_review(lesson)

    lesson.last_applied_at = now()
    db.update(lesson)

    # Update neural router with this (context, lesson, outcome) triple
    router_training_queue.enqueue((application_context, lesson, outcome))
```

### Decaying Unused Lessons

```python
def decay_unused_lessons():
    """Run daily to gradually weaken unused lessons."""

    stale_threshold = days_ago(30)  # Not applied in 30 days

    stale_lessons = db.query(
        "SELECT * FROM lessons WHERE last_applied_at < %s AND strength > 0.2",
        stale_threshold
    )

    for lesson in stale_lessons:
        # Gradual decay
        lesson.strength *= 0.99  # ~1% per day
        db.update(lesson)

        if lesson.strength < 0.2:
            # Move to archive
            archive_lesson(lesson)
```

---

## Cache Management

### Hot Cache Strategy

```python
class HotCache:
    """
    Caches the most frequently and recently used lessons
    for instant retrieval.
    """

    def __init__(self, max_size: int = 1000, ttl_seconds: int = 3600):
        self.cache = LRUCache(max_size)
        self.ttl = ttl_seconds

    def on_lesson_applied(self, lesson: Lesson, context: Context):
        """Add to cache when a lesson is successfully applied."""
        cache_key = self.generate_key(lesson, context)
        self.cache.set(cache_key, lesson, ttl=self.ttl)

    def get_relevant(self, context_embedding: Vector, k: int) -> List[Lesson]:
        """Get cached lessons relevant to current context."""
        # This uses a locality-sensitive hash of the embedding
        # to find cached lessons that might be relevant
        candidates = self.cache.get_by_lsh(context_embedding)
        return self.rank_by_relevance(candidates, context_embedding)[:k]
```

### Index Refresh

```python
class IndexManager:
    """
    Manages the vector index to ensure it stays current
    without impacting query performance.
    """

    def refresh_index(self):
        """
        Rebuild index with latest lessons.
        Run during low-traffic periods.
        """
        # Build new index in background
        new_index = self.build_index_from_db()

        # Atomic swap
        old_index = self.vector_index
        self.vector_index = new_index

        # Clean up old index
        del old_index
```

---

## Neural Routing Index

A learned model that improves retrieval quality over time.

### Training

```python
class NeuralRouter:
    """
    Learns which lessons are most useful for which contexts
    based on actual application outcomes.
    """

    def train(self, training_data: List[TrainingTriple]):
        """
        Training data format:
        (context_embedding, retrieved_lessons, outcomes)

        The model learns to predict which retrieved lessons
        led to good outcomes for similar contexts.
        """
        for context, lessons, outcomes in training_data:
            # Positive examples: lessons that helped
            positive = [l for l, o in zip(lessons, outcomes) if o.success]

            # Negative examples: lessons that didn't help
            negative = [l for l, o in zip(lessons, outcomes) if not o.success]

            # Contrastive learning update
            self.model.update(context, positive, negative)

    def rerank(self, context: Vector, candidates: List[Lesson]) -> List[Lesson]:
        """Use learned model to rerank candidate lessons."""
        scores = self.model.score(context, candidates)
        return sorted(zip(candidates, scores), key=lambda x: -x[1])
```

---

## Metrics & Monitoring

### Health Metrics

| Metric | Target | Alert |
|--------|--------|-------|
| Fast path latency (p50) | <2ms | >5ms |
| Fast path latency (p99) | <10ms | >50ms |
| Cache hit rate | >60% | <40% |
| Index freshness | <1 hour | >4 hours |
| Lesson retrieval accuracy | >80% | <60% |

### Quality Metrics

| Metric | Definition |
|--------|------------|
| Retrieval Precision | % of retrieved lessons that were applied |
| Retrieval Recall | % of applied lessons that were retrieved |
| Outcome Correlation | Correlation between lesson strength and success |
