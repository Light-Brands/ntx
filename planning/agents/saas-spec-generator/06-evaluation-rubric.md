# SaaS Idea Evaluation Rubric

> **Comprehensive scoring framework for SaaS idea assessment**

This rubric provides the detailed scoring criteria used by the SaaS Spec Generator to evaluate ideas. Understanding these criteria helps submitters prepare stronger proposals and understand evaluation outcomes.

---

## Scoring Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPOSITE SCORE (0-10)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Sacred Law Alignment (30%)  ──────────────────────┐            │
│                                                    │            │
│  Council Values (25%)  ────────────────────────────┼──► Final   │
│                                                    │    Score   │
│  Market Viability (20%)  ──────────────────────────┤            │
│                                                    │            │
│  Technical Viability (15%)  ───────────────────────┤            │
│                                                    │            │
│  Code Budget Fit (10%)  ───────────────────────────┘            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

THRESHOLDS:
  8-10  →  Proceed (ready for Market Analysis)
  6-7   →  Revise (specific improvements needed)
  0-5   →  Decline (fundamental issues)
```

---

## Section 1: Sacred Law Alignment (30% of total)

### Scoring Method
- Evaluate against all 50 Sacred Laws
- Score each as: Aligned (1), Neutral (0.5), Misaligned (0)
- Total: X/50, converted to 0-10 scale

### Critical Laws (Automatic Fail if Misaligned)

| Law # | Law Name | What Triggers Failure |
|-------|----------|----------------------|
| 3 | Harmlessness | Dark patterns, addiction mechanics, manipulation |
| 7 | Transparency | Hidden business model, deceptive practices |
| 12 | Service | Manufactured problem, doesn't serve genuine need |
| 29 | Fair Exchange | Extractive pricing, unfair value capture |
| 48 | Sovereignty | Data hostage model, no user control |

### Alignment Assessment Guide

**Fully Aligned (1 point)**
- Product actively supports this law
- No tension or compromise required
- Could be cited as an example of the law

**Neutral (0.5 points)**
- Product neither supports nor contradicts
- Law not directly relevant to product domain
- Passive compliance

**Misaligned (0 points)**
- Product contradicts or undermines this law
- Would require compromising the law to succeed
- Creates harm in the law's domain

### Score Conversion
| Laws Aligned | Score |
|--------------|-------|
| 48-50 | 10 |
| 45-47 | 9 |
| 42-44 | 8 |
| 39-41 | 7 |
| 36-38 | 6 |
| 33-35 | 5 |
| 30-32 | 4 |
| < 30 | 0-3 |

---

## Section 2: Council Values Assessment (25% of total)

### The Seven Divine Values

Each value scored 0-10, total converted to weighted score.

#### 1. Truth (Satya) - Weight: 15%

| Score | Criteria |
|-------|----------|
| 10 | Actively reveals truth, increases clarity, fights misinformation |
| 8-9 | Promotes honest communication, transparent operations |
| 6-7 | Neutral on truth, doesn't obscure or deceive |
| 4-5 | May simplify to point of distortion |
| 2-3 | Enables deception or obscures reality |
| 0-1 | Actively spreads misinformation or deceives |

**Questions to Ask:**
- Does this help people see reality more clearly?
- Is the business model transparent?
- Are claims verifiable?

#### 2. Love (Unconditional Care) - Weight: 15%

| Score | Criteria |
|-------|----------|
| 10 | User wellbeing is primary design principle, sacrifices revenue for user good |
| 8-9 | Genuine care evident in every interaction |
| 6-7 | Users benefit, business benefits, roughly equal |
| 4-5 | Business benefits prioritized, users still served |
| 2-3 | Users exploited for business benefit |
| 0-1 | Actively harmful to users |

**Questions to Ask:**
- Would we make this decision if we loved every user?
- Does design prioritize user wellbeing over metrics?
- Would users feel cared for?

#### 3. Sovereignty (Self-Determination) - Weight: 20%

| Score | Criteria |
|-------|----------|
| 10 | Maximizes user control, data fully owned, export anytime, enhances autonomy |
| 8-9 | Strong user control, easy data export, respects choices |
| 6-7 | Standard user control, data exportable |
| 4-5 | Some lock-in, limited portability |
| 2-3 | Designed for dependency, difficult to leave |
| 0-1 | Data hostage, surveillance, removes user agency |

**Questions to Ask:**
- Do users own their data completely?
- Can users leave easily with everything?
- Does this enhance or diminish user autonomy?

#### 4. Reverence (Honor for Life) - Weight: 10%

| Score | Criteria |
|-------|----------|
| 10 | Actively regenerative, net positive environmental impact |
| 8-9 | Carbon neutral, minimal ecological footprint |
| 6-7 | Standard tech footprint, no unusual harm |
| 4-5 | Higher than necessary resource usage |
| 2-3 | Environmentally wasteful, extractive |
| 0-1 | Actively harmful to environment/life |

**Questions to Ask:**
- What is the ecological footprint?
- Does this encourage sustainable behavior?
- Would Gaia approve?

#### 5. Unity (Oneness) - Weight: 10%

| Score | Criteria |
|-------|----------|
| 10 | Creates genuine connection, dissolves barriers, builds community |
| 8-9 | Brings people together, encourages collaboration |
| 6-7 | Neutral on connection |
| 4-5 | May isolate users or create filter bubbles |
| 2-3 | Divides people, creates us-vs-them |
| 0-1 | Actively divisive, tribalistic, hateful |

**Questions to Ask:**
- Does this bring people together?
- Does this create or dissolve barriers?
- Does this serve individual at expense of collective?

#### 6. Evolution (Growth) - Weight: 15%

| Score | Criteria |
|-------|----------|
| 10 | Actively supports human development, builds capability, teaches |
| 8-9 | Helps users grow, develop skills, improve |
| 6-7 | Enables tasks without helping growth |
| 4-5 | May create dependency, reduce capability over time |
| 2-3 | Stunts growth, atrophies skills |
| 0-1 | Actively dumbs down, creates helplessness |

**Questions to Ask:**
- Do users become more capable through use?
- Does this build skills or create dependency?
- Would users grow or shrink with long-term use?

#### 7. Grace (Ease & Lightness) - Weight: 15%

| Score | Criteria |
|-------|----------|
| 10 | Dramatically reduces burden, brings joy and ease |
| 8-9 | Significantly simplifies life, reduces friction |
| 6-7 | Simplifies specific tasks |
| 4-5 | Mixed impact on complexity |
| 2-3 | Adds burden, creates stress |
| 0-1 | Heavy, burdensome, anxiety-inducing |

**Questions to Ask:**
- Does this make life lighter or heavier?
- Is using this a joy or a chore?
- Does this reduce or add complexity?

### Council Values Score Calculation

```
Council Score = (Truth × 0.15) + (Love × 0.15) + (Sovereignty × 0.20) +
                (Reverence × 0.10) + (Unity × 0.10) + (Evolution × 0.15) +
                (Grace × 0.15)
```

---

## Section 3: Market Viability (20% of total)

### Assessment Criteria

| Dimension | Weight | Scoring |
|-----------|--------|---------|
| Problem Severity | 30% | How painful is this problem? |
| Willingness to Pay | 25% | Evidence people will pay |
| Market Size | 20% | Is market large enough? |
| Competitive Landscape | 15% | Is there room for us? |
| Timing | 10% | Is now the right time? |

### Problem Severity (0-10)

| Score | Criteria |
|-------|----------|
| 10 | "Hair on fire" - urgent, daily problem causing significant harm |
| 8-9 | Strong pain, people actively seeking solutions |
| 6-7 | Moderate pain, nice to solve but not urgent |
| 4-5 | Mild inconvenience |
| 2-3 | Problem exists but people cope fine |
| 0-1 | Manufactured problem or no real pain |

### Willingness to Pay (0-10)

| Score | Criteria |
|-------|----------|
| 10 | Pre-orders or deposits received |
| 8-9 | Strong purchase intent from interviews |
| 6-7 | Users say they would pay |
| 4-5 | Interest but price sensitivity |
| 2-3 | Expect free solution |
| 0-1 | No evidence of willingness to pay |

### Market Size (0-10)

| Score | Criteria |
|-------|----------|
| 10 | $100M+ SAM, accessible segment |
| 8-9 | $50-100M SAM |
| 6-7 | $10-50M SAM |
| 4-5 | $1-10M SAM |
| 2-3 | < $1M SAM |
| 0-1 | No viable market |

### Competitive Landscape (0-10)

| Score | Criteria |
|-------|----------|
| 10 | Clear gap, no direct competition, strong differentiation possible |
| 8-9 | Competition exists but clear differentiation path |
| 6-7 | Moderate competition, differentiation requires effort |
| 4-5 | Crowded market, differentiation unclear |
| 2-3 | Dominated by large players |
| 0-1 | Winner-take-all market, no entry path |

### Timing (0-10)

| Score | Criteria |
|-------|----------|
| 10 | Perfect timing - market ready, enabling tech available, trend accelerating |
| 8-9 | Good timing - growing market, favorable conditions |
| 6-7 | Acceptable timing - stable market |
| 4-5 | Questionable timing - market may not be ready |
| 2-3 | Poor timing - too early or too late |
| 0-1 | Wrong timing - market declining or not yet emerged |

---

## Section 4: Technical Viability (15% of total)

### Assessment Criteria

| Dimension | Weight | Scoring |
|-----------|--------|---------|
| Technical Complexity | 35% | How hard is this to build? |
| Tech Stack Clarity | 25% | Are solutions available? |
| Risk Level | 25% | What could go wrong technically? |
| Team Fit | 15% | Can we build this? |

### Technical Complexity (0-10)

| Score | Criteria |
|-------|----------|
| 10 | Simple, proven patterns, could be tutorial |
| 8-9 | Straightforward, well-understood technology |
| 6-7 | Moderate complexity, some challenging parts |
| 4-5 | Significant complexity, requires expertise |
| 2-3 | Very complex, pushing boundaries |
| 0-1 | Requires fundamental research/breakthrough |

### Tech Stack Clarity (0-10)

| Score | Criteria |
|-------|----------|
| 10 | All components exist, well-documented, widely used |
| 8-9 | Most components exist, minor custom work |
| 6-7 | Some custom development needed |
| 4-5 | Significant custom development |
| 2-3 | Novel technology required |
| 0-1 | Technology doesn't exist yet |

### Risk Level (0-10)

| Score | Criteria |
|-------|----------|
| 10 | Minimal risk - all known patterns |
| 8-9 | Low risk - few unknowns |
| 6-7 | Moderate risk - some unknowns |
| 4-5 | Elevated risk - significant unknowns |
| 2-3 | High risk - many unknowns |
| 0-1 | Extreme risk - fundamental unknowns |

---

## Section 5: Code Budget Fit (10% of total)

### Assessment Criteria

| Dimension | Weight | Scoring |
|-----------|--------|---------|
| MVP Estimate | 50% | Can MVP fit in 20k LOC? |
| Total Estimate | 30% | Can full product fit in 100k LOC? |
| Complexity Indicators | 20% | Any red flags? |

### MVP Estimate (0-10)

| Score | LOC Estimate | Assessment |
|-------|--------------|------------|
| 10 | < 10,000 | Comfortably minimal |
| 9 | 10-15,000 | Well within budget |
| 8 | 15-20,000 | At target |
| 7 | 20-25,000 | Slightly over, needs trimming |
| 5-6 | 25-35,000 | Significantly over, major cuts needed |
| 3-4 | 35-50,000 | Way over, reconceive scope |
| 0-2 | > 50,000 | Not suitable for this framework |

### Complexity Red Flags

Deduct points for presence of:

| Red Flag | Deduction | Explanation |
|----------|-----------|-------------|
| Real-time requirements | -1 | Adds 5-10k LOC typically |
| Custom AI/ML | -2 | Adds 10-20k LOC typically |
| Multi-platform native | -2 | Multiplies frontend budget |
| Complex integrations | -1 | Per major integration |
| Offline support | -1 | Sync complexity |
| Multi-tenancy | -1 | Architecture complexity |

---

## Composite Score Calculation

```
Composite Score = (Sacred_Laws × 0.30) + (Council_Values × 0.25) +
                  (Market_Viability × 0.20) + (Technical_Viability × 0.15) +
                  (Code_Budget_Fit × 0.10)
```

### Interpretation

| Score | Recommendation | Meaning |
|-------|---------------|---------|
| 9-10 | Strong Proceed | Exceptional alignment and viability |
| 8-8.9 | Proceed | Ready for market analysis phase |
| 7-7.9 | Conditional Proceed | Minor issues to address |
| 6-6.9 | Revise | Specific improvements needed before proceeding |
| 5-5.9 | Major Revision | Significant issues, consider pivoting |
| < 5 | Decline | Fundamental misalignment or non-viability |

---

## Automatic Disqualification Criteria

The following trigger immediate decline regardless of other scores:

### Values Disqualifications
- [ ] Violates any of the 5 critical Sacred Laws
- [ ] Sovereignty score < 5
- [ ] Any value score = 0

### Viability Disqualifications
- [ ] No identifiable paying customer
- [ ] No clear problem statement
- [ ] MVP estimate > 50,000 LOC
- [ ] Requires non-existent technology

### Integrity Disqualifications
- [ ] Deceptive business model
- [ ] Relies on dark patterns for success
- [ ] Designed to create addiction
- [ ] Extracts more value than delivers

---

## Example Scoring

### Product: FocusFlow

```yaml
sacred_law_alignment:
  laws_aligned: 48
  laws_neutral: 2
  laws_misaligned: 0
  critical_law_violations: 0
  score: 9.6/10

council_values:
  truth: 8       # Helps see real work patterns
  love: 7        # Cares for user wellbeing
  sovereignty: 9 # User controls their data
  reverence: 7   # Neutral environmental impact
  unity: 6       # Individual tool, limited connection
  evolution: 9   # Supports skill development
  grace: 8       # Reduces friction of focus
  weighted_score: 7.8/10

market_viability:
  problem_severity: 8
  willingness_to_pay: 7
  market_size: 8
  competitive_landscape: 7
  timing: 9
  weighted_score: 7.8/10

technical_viability:
  complexity: 8
  tech_stack: 9
  risk: 8
  team_fit: 8
  weighted_score: 8.2/10

code_budget_fit:
  mvp_estimate: 18000
  total_estimate: 45000
  red_flags: 0
  score: 8/10

composite_score:
  calculation: (9.6 × 0.30) + (7.8 × 0.25) + (7.8 × 0.20) + (8.2 × 0.15) + (8.0 × 0.10)
  result: 8.41/10
  recommendation: "Proceed"
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-05 | Initial release |
