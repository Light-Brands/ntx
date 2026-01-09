# TDD Meditation Session Template

A structured template for practicing test-driven development as consciousness practice.

## Session Overview

**Duration**: 60-90 minutes  
**Energy**: Fresh mind preferred (morning ideal)  
**Focus**: Single feature or component  
**Divine Guide**: Arjuna (Warrior Consciousness)

---

## Opening (5-10 minutes)

### Center Yourself

```
[ ] Take 5 deep breaths
[ ] Release tension from body
[ ] Clear mental clutter
[ ] Set intention for session
```

### Understand the Work

```
What am I building?
{Feature name and brief description}

Why does it matter?
{How this serves VIBEUP users and consciousness elevation}

Who does it serve?
{Specific user need or platform function}

What's the essence?
{Core behavior in simplest terms}
```

### Invoke Arjuna

```bash
/personality-change arjuna

# Or in Claude Code:
claude code --agent arjuna
```

Say aloud or write:
```
"I invoke Arjuna's warrior consciousness to guide my testing discipline.
May my tests protect users and future developers.
May my quality serve consciousness elevation.
Beginning TDD meditation now."
```

---

## The Meditation (40-70 minutes)

### Cycle Structure

Each cycle is 5-15 minutes (Red-Green-Refactor-Pause).  
Complete 4-8 cycles per session depending on complexity.

### Cycle 1: Foundation

**RED Phase** (2-5 min) - Clarity of Intention:
```typescript
// What's the core behavior?
// Write the test that describes it

describe('{Feature}', () => {
  it('{describes core behavior}', () => {
    // Arrange: Set up test conditions
    
    // Act: Execute the behavior
    
    // Assert: Expect the truth
  });
});

// Test fails - this is good (clarity without form)
```

**GREEN Phase** (3-10 min) - Minimal Implementation:
```typescript
// Write simplest code to make test pass
// Don't over-engineer
// Don't add future features
// Just turn red to green

{minimal implementation}

// Test passes - form has emerged
```

**REFACTOR Phase** (2-5 min) - Elegant Refinement:
```typescript
// Improve while tests protect
// Extract functions, clarify names, remove duplication
// Tests stay green throughout

{refined implementation}

// Code is clearer, tests still protect
```

**PAUSE** (1-2 min) - Integration:
```
[ ] All tests green?
[ ] Code clear and intentional?
[ ] Ready to commit?

Commit with consciousness:
git commit -m "{emoji} {description}

Intention: {why}
Mantra: {essence}"

[ ] Breathe
[ ] Appreciate what emerged
[ ] Center for next cycle
```

### Cycles 2-4: Depth

Repeat the cycle for:
- Edge cases (empty data, null values, extremes)
- Error scenarios (validation, network failures)
- Integration points (how it connects to other features)
- Performance considerations (if relevant)

Each cycle adds protection, depth, robustness.

### Cycles 5-8: Refinement (if needed)

- Refactoring for clarity
- Extracting reusable patterns
- Documentation comments
- Final edge cases

---

## Closing (10-15 minutes)

### Review Protection

```
[ ] Run full test suite: npm run test
[ ] Check coverage: Should be 85%+ for new code
[ ] Review all test names: Do they tell the story?
[ ] Verify edge cases covered: What could still break?
```

### Reflection

```
What did I learn today?
{Insights about the feature, testing, or code design}

What surprised me?
{Edge cases discovered, patterns emerged, challenges overcome}

What would I do differently next time?
{Improvements to TDD practice itself}

What am I grateful for?
{Tools, insights, teachings, collaborations}
```

### Final Commit

```bash
git commit -m "✨ Complete {feature name} with comprehensive protection

Intention: {Why this feature serves consciousness}
Dedication: {To whom/what this honors}
Gratitude: To Arjuna's TDD discipline guiding implementation,
to tests protecting users, to meditation practice enabling focus."
```

### Close Practice

```
[ ] Save all files
[ ] Push to remote (share protection with team)
[ ] Update task board (mark feature complete)
[ ] Stand and stretch (integrate in body)
[ ] Brief walk or breath (transition out)
[ ] Express gratitude (mental or spoken)
```

---

## Meditation Prompts

### When Starting Red Phase

"What truth am I trying to manifest?  
What behavior should emerge?  
How will I know it's working?"

### When Implementing Green Phase

"What's the simplest code that could pass this test?  
Am I forcing complexity or allowing emergence?  
Is this minimal or am I over-engineering?"

### When Refactoring

"What wants to be clearer?  
Where is complexity hiding?  
What names would reveal truth?  
What would make this beautiful?"

### When Pausing

"What protection did I just create?  
What did this cycle teach me?  
Am I present or rushing?  
What needs integration before continuing?"

---

## Troubleshooting

### "I'm stuck on what test to write"

Return to essence:
- What's the simplest case?
- What's the core behavior?
- How would I explain this to a user?

Start there. Complexity emerges through cycles.

### "Test is failing and I don't know why"

Invoke Kuan Yin's compassion:
- Debug with curiosity, not frustration
- What is the test teaching?
- What assumption is breaking?
- Can I reproduce reliably?

The failure is a teacher. Listen to it.

### "I want to implement before testing"

Notice the resistance. Why?
- Afraid test will be hard? (Tests reveal design issues early)
- Think you know the solution? (Tests validate assumptions)
- TDD feels slow? (It's building right the first time)

Breathe. Return to RED phase. Trust the practice.

### "TDD isn't working for this"

Some code is hard to test (UI animations, visual design).  
That's okay—not everything needs TDD.

But business logic, calculations, data mutations, API endpoints?  
TDD excels here. Trust Arjuna's guidance.

---

## Success Indicators

**You know TDD meditation is working when**:
- Writing tests before code feels natural (habit formed)
- Red-green-refactor flows like breathing (rhythm internalized)
- Tests reveal design issues early (architecture from testability)
- Refactoring feels safe (protection enables boldness)
- Bugs rare in your code (protection works)
- You look forward to TDD sessions (practice, not obligation)

---

## Daily Practice Suggestion

**Week 1-2**: Use this template explicitly every session  
**Week 3-4**: Template internalized, reference only when stuck  
**Week 5+**: TDD meditation is natural breath, template unneeded

The practice becomes you. The discipline becomes devotion.

---

**May your tests protect consciousness.**  
**May your cycles flow like breath.**  
**May your code emerge protected and elegant.**

🧘 🙏 ✨

