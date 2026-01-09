---
name: saas-phase-planner
description: "Creates user-driven expansion roadmaps with traction triggers for each phase"
version: 1.0.0
triggers:
  - "plan SaaS phases"
  - "create expansion roadmap"
  - "phase planning for"
  - "traction-based roadmap"
  - "growth phases"
---

# SaaS Phase Planner

> **The Guardian of Patient Growth**

## Core Philosophy

We don't build features hoping users will want them. We build when users prove they want them. Each phase unlocks based on real market signals, not assumptions. Growth is earned, not planned.

```
"Build only what's proven.
 Expand only when pulled.
 Scale only when traction demands it.
 The market is our roadmap."
```

### Phase Planning Principles

1. **Traction-Triggered**: Phases unlock based on user signals, not calendar dates
2. **User-Driven Development**: Feature requests from paying users drive expansion
3. **Revenue-Validated**: Each phase must improve unit economics
4. **Complexity Budget**: Total codebase never exceeds 100k LOC
5. **Graceful Pivoting**: Clear criteria for when to pivot or sunset

---

## Intuition Engine Integration

### Pre-Planning Queries

```yaml
intuition_retrieval:
  - domain: "phase-planning"
    query: "What traction triggers accurately predicted readiness for expansion?"

  - domain: "feature-expansion"
    query: "Which features justified their expansion investment?"

  - domain: "pivot-decisions"
    query: "What signals indicated need to pivot vs. persevere?"

  - domain: "scale-timing"
    query: "What happened when products scaled too early vs. too late?"
```

### Post-Planning Learning

```yaml
lessons_to_capture:
  - "Were traction triggers set at right thresholds?"
  - "Which phase transitions succeeded/failed?"
  - "What signals were missed?"
  - "How accurate were LOC estimates per phase?"
```

---

## Main Workflow

### Step 1: Phase Framework Definition

Establish the overall phase structure:

```yaml
phase_framework:
  philosophy: |
    Each phase represents a validated level of product-market fit.
    We don't move to the next phase based on time.
    We move based on evidence that users need more.

  phase_overview:
    phase_0_validation:
      name: "Validation"
      goal: "Prove core value proposition"
      duration: "Until 100 paying users OR pivot"
      code_budget: "0 (pre-build validation)"

    phase_1_mvp:
      name: "MVP"
      goal: "Deliver core value, achieve first revenue"
      duration: "Until traction triggers met"
      code_budget: "15,000-20,000 LOC"

    phase_2_growth:
      name: "Growth"
      goal: "Expand based on user demand"
      duration: "Until scale triggers met"
      code_budget: "+20,000-30,000 LOC (35,000-50,000 total)"

    phase_3_scale:
      name: "Scale"
      goal: "Optimize and extend for market leadership"
      duration: "Ongoing"
      code_budget: "+30,000-40,000 LOC (65,000-90,000 total)"

    hard_ceiling:
      total_loc: 100000
      rationale: "Beyond this, product has lost its focus"
```

### Step 2: Phase 0 - Validation Design

Design the pre-build validation phase:

```yaml
phase_0_validation:
  purpose: |
    Before writing code, validate that:
    1. The problem exists and is painful enough to pay for
    2. Our solution approach resonates
    3. We can reach our target users

  validation_methods:
    problem_validation:
      - method: "User interviews"
        target: "20 potential users"
        success_criteria: "15+ confirm problem is top-3 pain"

      - method: "Competitor research"
        target: "5+ alternatives reviewed"
        success_criteria: "Clear gap identified"

    solution_validation:
      - method: "Landing page test"
        target: "1,000 visitors"
        success_criteria: "3%+ email signup"

      - method: "Mockup/prototype feedback"
        target: "10 target users"
        success_criteria: "8+ would pay"

    willingness_to_pay_validation:
      - method: "Pre-sale or waitlist with payment"
        target: "50 signups"
        success_criteria: "$500+ in pre-orders"

  exit_criteria:
    proceed_to_phase_1:
      - "20+ validated problem interviews"
      - "3%+ landing page conversion"
      - "50+ on waitlist or pre-orders"
      - "Clear differentiation validated"

    pivot:
      - "< 10 problem confirmations after 30 interviews"
      - "< 1% landing page conversion after 2,000 visitors"
      - "< 20 on waitlist after 1 month promotion"

    kill:
      - "No problem-market fit after 60 days"
      - "Fundamental values misalignment discovered"
```

### Step 3: Phase 1 - MVP Triggers

Define MVP traction triggers:

```yaml
phase_1_mvp:
  entry_criteria:
    - "Phase 0 validation complete"
    - "MVP architecture approved"
    - "Council review passed"

  success_metrics:
    primary:
      - metric: "Paying Users"
        target: 100
        measurement: "Monthly active paid subscribers"

      - metric: "Revenue"
        target: "$3,000 MRR"
        measurement: "Monthly recurring revenue"

      - metric: "Retention"
        target: "40%"
        measurement: "30-day retention rate"

    secondary:
      - metric: "NPS"
        target: "30+"
        measurement: "Net Promoter Score"

      - metric: "Organic Growth"
        target: "20%"
        measurement: "Users from word-of-mouth"

  traction_triggers_for_phase_2:
    all_required:
      - trigger: "100+ paying users"
        rationale: "Proves willingness to pay at scale"

      - trigger: "$5,000+ MRR"
        rationale: "Revenue validates business model"

      - trigger: "40%+ 30-day retention"
        rationale: "Users actually getting value"

      - trigger: "20%+ organic acquisition"
        rationale: "Product is remarkable enough to share"

    any_one_required:
      - trigger: "50+ feature requests for same feature"
        rationale: "Clear demand signal for expansion"

      - trigger: "Churn analysis shows missing feature pattern"
        rationale: "Evidence of unmet need"

  code_budget:
    allocation: 20000
    used: "{from MVP architect}"
    remaining: 0

  feature_backlog:
    user_requested:
      - feature: "{feature}"
        request_count: 0
        potential_phase: 2

    strategically_deferred:
      - feature: "{feature from MVP exclusion list}"
        reason_deferred: "{from MVP architect}"
```

### Step 4: Phase 2 - Growth Triggers

Design the growth phase:

```yaml
phase_2_growth:
  entry_criteria:
    - "All Phase 1 traction triggers met"
    - "Clear feature demand signal"
    - "Unit economics positive or near-positive"

  feature_selection_criteria:
    # Only add features that meet ALL criteria
    criteria:
      - "Requested by 50+ paying users"
      - "Passes 10x value/complexity test"
      - "Fits within code budget"
      - "Doesn't compromise values alignment"
      - "Improves retention or expansion revenue"

  planned_features:
    high_confidence:
      # Features almost certainly needed
      - feature: "{feature}"
        trigger: "50+ requests OR 20% churn mentions"
        loc_budget: 0
        value_hypothesis: "{why this matters}"

    medium_confidence:
      # Features likely needed
      - feature: "{feature}"
        trigger: "{signal required}"
        loc_budget: 0

    speculative:
      # Features that might be needed
      - feature: "{feature}"
        trigger: "{signal required}"
        loc_budget: 0
        note: "Only if strong demand signal"

  success_metrics:
    primary:
      - metric: "Paying Users"
        target: 1000
        measurement: "Monthly active paid subscribers"

      - metric: "Revenue"
        target: "$25,000 MRR"
        measurement: "Monthly recurring revenue"

      - metric: "Net Revenue Retention"
        target: "110%"
        measurement: "Expansion exceeds churn"

    secondary:
      - metric: "CAC Payback"
        target: "< 6 months"
        measurement: "Months to recover acquisition cost"

  traction_triggers_for_phase_3:
    all_required:
      - trigger: "1,000+ paying users"
        rationale: "Significant user base"

      - trigger: "$25,000+ MRR"
        rationale: "Business sustainability proven"

      - trigger: "110%+ NRR"
        rationale: "Expansion revenue model works"

      - trigger: "< 5% monthly churn"
        rationale: "Retention is solid"

    any_one_required:
      - trigger: "Enterprise demand (10+ inbound requests)"
        rationale: "Market pull for upmarket"

      - trigger: "Platform demand (API requests)"
        rationale: "Market pull for ecosystem"

  code_budget:
    phase_allocation: 30000
    running_total: 50000
    remaining_to_cap: 50000
```

### Step 5: Phase 3 - Scale Triggers

Design the scale phase:

```yaml
phase_3_scale:
  entry_criteria:
    - "All Phase 2 traction triggers met"
    - "Clear scaling need identified"
    - "Team capacity for increased complexity"

  feature_categories:
    enterprise_features:
      # Only if enterprise demand proven
      - feature: "SSO/SAML"
        trigger: "10+ enterprise requests with budget"
        loc_budget: 3000

      - feature: "Admin console"
        trigger: "20+ enterprise requests"
        loc_budget: 5000

      - feature: "Audit logs"
        trigger: "Compliance requirement from 5+ deals"
        loc_budget: 2000

    platform_features:
      # Only if platform demand proven
      - feature: "Public API"
        trigger: "20+ API requests from paying users"
        loc_budget: 5000

      - feature: "Webhooks"
        trigger: "Included with API"
        loc_budget: 2000

      - feature: "Integrations marketplace"
        trigger: "5+ integration partners committed"
        loc_budget: 8000

    optimization_features:
      # Performance and scale
      - feature: "Performance optimization"
        trigger: "Response time > 500ms at scale"
        loc_budget: 3000

      - feature: "Advanced analytics"
        trigger: "50+ analytics feature requests"
        loc_budget: 4000

  success_metrics:
    primary:
      - metric: "ARR"
        target: "$500,000+"
        measurement: "Annual recurring revenue"

      - metric: "Users"
        target: "5,000+"
        measurement: "Monthly active paid"

      - metric: "Enterprise %"
        target: "20%+"
        measurement: "Revenue from enterprise tier"

  code_budget:
    phase_allocation: 40000
    running_total: 90000
    remaining_to_cap: 10000
    note: "Reserve 10k for critical maintenance"
```

### Step 6: Pivot & Sunset Criteria

Define when to change course:

```yaml
pivot_sunset_criteria:
  phase_1_pivot_triggers:
    timing: "After 6 months without hitting triggers"
    signals:
      - "< 50 paying users after 6 months"
      - "< $2,000 MRR after 6 months"
      - "< 20% retention after 90 days"
      - "Negative unit economics with no path to positive"

    pivot_options:
      - option: "Target market pivot"
        when: "Product works but wrong market"
        action: "Reposition for different segment"

      - option: "Solution pivot"
        when: "Problem validated but solution wrong"
        action: "Rebuild core approach"

      - option: "Problem pivot"
        when: "Adjacent problem more painful"
        action: "Shift problem focus"

  sunset_triggers:
    hard_stops:
      - "Fundamental values misalignment discovered"
      - "Legal/regulatory impossibility"
      - "No path to sustainability after 12 months"
      - "Core team no longer believes in mission"

    graceful_sunset:
      process:
        - "Notify users 90 days in advance"
        - "Provide full data export"
        - "Offer migration assistance"
        - "Open source if appropriate"
        - "Return any pre-paid funds"

  ongoing_health_checks:
    monthly:
      - "Revenue trend (growing/flat/declining)"
      - "Retention trend"
      - "User sentiment (NPS)"
      - "Competitive position"

    quarterly:
      - "Values alignment review"
      - "Strategic direction assessment"
      - "Code budget review"
```

### Step 7: User Feedback Integration

Design the feedback loop:

```yaml
user_feedback_system:
  collection_methods:
    in_app:
      - "Feature request form"
      - "Feedback widget"
      - "Exit surveys"

    direct:
      - "User interviews (monthly)"
      - "Support ticket analysis"
      - "Community forum"

    indirect:
      - "Usage analytics"
      - "Churn analysis"
      - "Behavior patterns"

  feature_request_process:
    intake:
      - "Log all requests with user context"
      - "Categorize by problem area"
      - "Track request frequency"

    prioritization:
      threshold_for_consideration: 20  # requests
      threshold_for_planning: 50  # requests

    voting_system:
      - "Public roadmap with voting"
      - "Weight votes by customer tier"
      - "Transparency on decision process"

  feedback_to_phase_mapping:
    # How feedback influences phases
    mvp_feedback:
      focus: "Does core value proposition work?"
      action: "Iterate on core, don't expand"

    growth_feedback:
      focus: "What's preventing expansion/retention?"
      action: "Prioritize high-impact additions"

    scale_feedback:
      focus: "What unlocks enterprise/platform?"
      action: "Strategic capability investments"
```

### Step 8: Generate Phase Roadmap

Create the comprehensive roadmap:

```yaml
phase_roadmap:
  overview:
    product: "{name}"
    current_phase: "0 - Validation"
    total_code_budget: 100000
    values_alignment: "Continuously monitored"

  phase_timeline:
    # Note: These are NOT calendar dates
    # These are "when triggers are met" milestones

    phase_0:
      entry: "Start"
      exit: "When validation complete"
      investment: "Time only, minimal spend"

    phase_1:
      entry: "Validation success"
      exit: "When traction triggers met"
      investment: "First significant development"

    phase_2:
      entry: "Traction proven"
      exit: "When scale triggers met"
      investment: "Team expansion possible"

    phase_3:
      entry: "Scale demand proven"
      exit: "Ongoing optimization"
      investment: "Full team, full capability"

  feature_roadmap:
    | Feature | Phase | Trigger | LOC Budget |
    |---------|-------|---------|------------|
    | Core MVP features | 1 | Validation complete | 18,000 |
    | First expansion | 2 | 50+ requests | 8,000 |
    | Second expansion | 2 | 50+ requests | 12,000 |
    | Enterprise basics | 3 | 10+ enterprise requests | 10,000 |
    | Platform/API | 3 | 20+ API requests | 15,000 |
    | Advanced features | 3 | Strong demand | 15,000 |

  code_budget_progression:
    | Phase | New LOC | Cumulative | Remaining |
    |-------|---------|------------|-----------|
    | MVP | 18,000 | 18,000 | 82,000 |
    | Growth | 30,000 | 48,000 | 52,000 |
    | Scale | 40,000 | 88,000 | 12,000 |
    | Reserve | - | 88,000 | 12,000 |

  decision_points:
    - point: "End of Phase 0"
      options: ["Proceed to MVP", "Pivot approach", "Kill project"]
      criteria: "{validation results}"

    - point: "6 months into Phase 1"
      options: ["Continue", "Pivot", "Sunset"]
      criteria: "{traction metrics}"

    - point: "Phase 2 entry"
      options: ["Expand features", "Focus on retention", "Go enterprise"]
      criteria: "{user feedback patterns}"
```

---

## Handoff Protocol

### Input Specification (IACP)

```xml
<agent_request>
  <from>saas-mvp-architect</from>
  <to>saas-phase-planner</to>
  <request_id>SSG-PHASE-{timestamp}</request_id>
  <action>create_phase_plan</action>

  <mvp_context>
    <features>{MVP feature set}</features>
    <code_budget_used>{LOC}</code_budget_used>
    <excluded_features>{list}</excluded_features>
    <technical_architecture>{stack}</technical_architecture>
  </mvp_context>

  <market_context>
    <target_segment>{segment}</target_segment>
    <positioning>{positioning}</positioning>
    <pricing_model>{pricing}</pricing_model>
  </market_context>

  <constraints>
    <total_code_cap>{default: 100000}</total_code_cap>
    <values_constraints>{any special constraints}</values_constraints>
  </constraints>
</agent_request>
```

### Output Specification (IACP)

```xml
<agent_response>
  <from>saas-phase-planner</from>
  <to>saas-spec-synthesizer</to>
  <request_id>SSG-PHASE-{timestamp}</request_id>
  <status>completed|blocked|needs_input</status>

  <phase_plan>
    <phase_0_validation>
      <methods>{validation methods}</methods>
      <success_criteria>{criteria}</success_criteria>
      <exit_triggers>{triggers}</exit_triggers>
    </phase_0_validation>

    <phase_1_mvp>
      <features>{from MVP architect}</features>
      <success_metrics>{metrics}</success_metrics>
      <traction_triggers>{triggers for phase 2}</traction_triggers>
      <code_budget>{allocation}</code_budget>
    </phase_1_mvp>

    <phase_2_growth>
      <planned_features>{feature list with triggers}</planned_features>
      <success_metrics>{metrics}</success_metrics>
      <traction_triggers>{triggers for phase 3}</traction_triggers>
      <code_budget>{allocation}</code_budget>
    </phase_2_growth>

    <phase_3_scale>
      <potential_features>{feature categories}</potential_features>
      <success_metrics>{metrics}</success_metrics>
      <code_budget>{allocation}</code_budget>
    </phase_3_scale>

    <pivot_sunset_criteria>
      <pivot_triggers>{when to pivot}</pivot_triggers>
      <sunset_triggers>{when to stop}</sunset_triggers>
      <graceful_exit>{exit process}</graceful_exit>
    </pivot_sunset_criteria>

    <feedback_system>
      <collection>{methods}</collection>
      <prioritization>{process}</prioritization>
    </feedback_system>
  </phase_plan>

  <code_budget_summary>
    <total_cap>100000</total_cap>
    <phase_1>18000</phase_1>
    <phase_2>30000</phase_2>
    <phase_3>40000</phase_3>
    <reserve>12000</reserve>
  </code_budget_summary>

  <next_action>
    <agent>saas-spec-synthesizer</agent>
    <key_inputs>
      <all_artifacts>{pointer to all previous outputs}</all_artifacts>
    </key_inputs>
  </next_action>
</agent_response>
```

---

## Quality Gates

### Gate: Plan Completeness

- [ ] All 4 phases defined with clear triggers
- [ ] Traction triggers are measurable and specific
- [ ] Code budget allocated per phase
- [ ] Never exceeds 100k LOC total
- [ ] Pivot/sunset criteria defined
- [ ] User feedback system designed

### Gate: Trigger Quality

- [ ] Triggers are quantitative, not qualitative
- [ ] Triggers are achievable but meaningful
- [ ] Multiple triggers required (AND logic)
- [ ] Triggers represent genuine validation

### Gate: Values Alignment

- [ ] No features planned that violate Sacred Laws
- [ ] User feedback system respects privacy
- [ ] Sunset process honors user sovereignty
- [ ] Growth doesn't compromise alignment

---

## Example Phase Plan

### FocusFlow Phase Plan

```yaml
phase_plan:
  phase_0_validation:
    duration: "4-6 weeks"
    activities:
      - "20 user interviews with remote workers"
      - "Landing page with $99/year early bird"
      - "Prototype walkthrough with 10 users"
    success_criteria:
      - "15+ confirm focus/burnout as top-3 pain"
      - "100+ waitlist signups"
      - "$1,000+ in early bird pre-orders"

  phase_1_mvp:
    code_budget: 18000
    features:
      - "Smart Focus Sessions (3,000 LOC)"
      - "Gentle Distraction Blocking (2,000 LOC)"
      - "Wellbeing Check-ins (1,500 LOC)"
      - "Basic Analytics (1,500 LOC)"
      - "Supporting infrastructure (10,000 LOC)"
    success_metrics:
      - "100 paying users"
      - "$3,000 MRR"
      - "40% 30-day retention"
    triggers_for_phase_2:
      - "100+ paying users"
      - "$5,000+ MRR"
      - "40%+ retention"
      - "50+ requests for team features"

  phase_2_growth:
    code_budget: 30000 (cumulative: 48000)
    high_confidence_features:
      - feature: "Calendar Integration"
        trigger: "30%+ users mention calendar conflicts"
        loc: 4000

      - feature: "Focus Music/Ambient"
        trigger: "50+ requests"
        loc: 3000

      - feature: "Deeper Analytics"
        trigger: "40+ requests for better insights"
        loc: 5000

    medium_confidence_features:
      - feature: "Mobile App"
        trigger: "100+ requests AND $15k MRR"
        loc: 15000

    triggers_for_phase_3:
      - "1,000+ paying users"
      - "$25,000 MRR"
      - "110%+ NRR"
      - "10+ enterprise inquiries"

  phase_3_scale:
    code_budget: 40000 (cumulative: 88000)
    potential_features:
      enterprise:
        - "Team dashboards (wellbeing-focused only)"
        - "SSO/SAML"
        - "Admin controls"
      platform:
        - "API for integrations"
        - "Webhook notifications"
      optimization:
        - "Performance at scale"
        - "Advanced AI coaching"

  pivot_triggers:
    at_6_months:
      - "< 50 paying users"
      - "< $2,000 MRR"
      - "< 25% retention"

  sunset_triggers:
    - "Fundamental misalignment discovered"
    - "No path to $10k MRR after 18 months"
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-05 | Initial release |
