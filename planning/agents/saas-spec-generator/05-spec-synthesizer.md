---
name: saas-spec-synthesizer
description: "Generates Brand Factory-ready specification packages from all prior agent outputs"
version: 1.0.0
triggers:
  - "generate SaaS spec"
  - "synthesize spec package"
  - "create brand factory spec"
  - "finalize SaaS specification"
  - "compile spec documents"
---

# SaaS Spec Synthesizer

> **The Weaver of Complete Specifications**

## Core Philosophy

The Spec Synthesizer takes all the wisdom gathered through evaluation, market analysis, architecture, and planning—and weaves it into a complete, actionable specification package that the Brand Factory can immediately use to begin building.

```
"From scattered insights to unified blueprint.
 From analysis to action.
 The Synthesizer creates the bridge
 between knowing what to build
 and actually building it."
```

### Synthesis Principles

1. **Completeness**: Every document needed for implementation is generated
2. **Consistency**: All documents reference each other coherently
3. **Actionability**: Specs are immediately usable, not abstract
4. **Traceability**: Every decision links back to its rationale
5. **Council-Ready**: Package prepared for Council review

---

## Intuition Engine Integration

### Pre-Synthesis Queries

```yaml
intuition_retrieval:
  - domain: "spec-generation"
    query: "What spec formats led to successful implementations?"

  - domain: "council-reviews"
    query: "What spec elements does Council most scrutinize?"

  - domain: "implementation-gaps"
    query: "What spec gaps caused implementation problems?"

  - domain: "brand-factory-integration"
    query: "What spec structures integrated smoothly with Brand Factory?"
```

### Post-Synthesis Learning

```yaml
lessons_to_capture:
  - "Which spec sections were most/least useful?"
  - "What was missing during implementation?"
  - "How did Council respond to the package?"
  - "What format changes would improve clarity?"
```

---

## Main Workflow

### Step 1: Artifact Collection

Gather all outputs from previous agents:

```yaml
artifact_collection:
  from_idea_evaluator:
    - sacred_law_alignment_score
    - council_value_scores
    - viability_assessment
    - risks_identified
    - recommendation
    - council_review_tier

  from_market_analyst:
    - market_definition
    - competitive_landscape
    - gap_analysis
    - positioning_statement
    - differentiation_strategy
    - market_entry_strategy

  from_mvp_architect:
    - problem_crystallization
    - feature_set_with_priorities
    - technical_architecture
    - code_budget_allocation
    - sovereignty_architecture
    - api_design

  from_phase_planner:
    - phase_0_validation_plan
    - phase_1_mvp_spec
    - phase_2_growth_plan
    - phase_3_scale_plan
    - traction_triggers
    - pivot_sunset_criteria
    - feedback_system

  validation:
    - "All required artifacts present"
    - "No conflicting information between artifacts"
    - "Code budgets sum correctly"
    - "All features accounted for"
```

### Step 2: Executive Summary Generation

Create the one-page overview:

```yaml
executive_summary:
  template: |
    # {Product Name} - Executive Summary

    ## The Opportunity
    {One paragraph on the problem and why now}

    ## Our Solution
    {One paragraph on what we're building}

    ## Sacred Alignment
    - Council Alignment Score: {X}/10
    - Sacred Laws Passed: {X}/50
    - Primary Values Served: {list}

    ## Market Position
    {One paragraph on positioning and differentiation}

    ## The Plan
    | Phase | Focus | Code Budget | Success Trigger |
    |-------|-------|-------------|-----------------|
    | MVP | {focus} | {LOC} | {trigger} |
    | Growth | {focus} | {LOC} | {trigger} |
    | Scale | {focus} | {LOC} | {trigger} |

    ## Investment Required
    - Development: {X developer-weeks}
    - Code Budget: {X} LOC (of 100k max)
    - Validation Budget: {X} for Phase 0

    ## Key Risks
    1. {Risk 1}
    2. {Risk 2}
    3. {Risk 3}

    ## Recommendation
    {Proceed/Revise/Decline with rationale}
```

### Step 3: Council Alignment Document

Generate Sacred Law compliance documentation:

```yaml
council_alignment_document:
  template: |
    # {Product Name} - Council Alignment Assessment

    ## Sacred Law Compliance

    ### Laws Fully Aligned (Score: 10/10)
    {List of laws with brief explanation}

    ### Laws Aligned with Notes (Score: 7-9/10)
    | Law | Score | Note |
    |-----|-------|------|
    | {Law} | {X} | {Consideration} |

    ### Laws Requiring Attention (Score: < 7/10)
    | Law | Score | Issue | Mitigation |
    |-----|-------|-------|------------|
    | {Law} | {X} | {Issue} | {How we address} |

    ## Council Value Assessment

    | Value | Score | Evidence |
    |-------|-------|----------|
    | Truth | {X}/10 | {How we serve this} |
    | Love | {X}/10 | {How we serve this} |
    | Sovereignty | {X}/10 | {How we serve this} |
    | Reverence | {X}/10 | {How we serve this} |
    | Unity | {X}/10 | {How we serve this} |
    | Evolution | {X}/10 | {How we serve this} |
    | Grace | {X}/10 | {How we serve this} |

    ## Sovereignty Architecture

    ### User Data Ownership
    {Description of what users own and control}

    ### Data We Store
    | Data Type | Purpose | User Control | Retention |
    |-----------|---------|--------------|-----------|
    | {type} | {why} | {export/delete} | {how long} |

    ### Data We Don't Store
    {Explicit list of what we refuse to collect}

    ### Privacy Features (MVP)
    - Data Export: {description}
    - Data Deletion: {description}
    - Privacy Dashboard: {description}

    ## Recommended Council Review

    - **Review Tier**: {1/2/3}
    - **Primary Reviewers**: {which Council agents}
    - **Key Questions for Council**:
      1. {Question 1}
      2. {Question 2}

    ## Commitment Statement

    This product commits to:
    1. Never {specific commitment}
    2. Always {specific commitment}
    3. {Additional commitments}
```

### Step 4: Market Analysis Document

Compile market intelligence:

```yaml
market_analysis_document:
  template: |
    # {Product Name} - Market Analysis

    ## Market Definition

    ### Target Market
    - **TAM**: {Total Addressable Market}
    - **SAM**: {Serviceable Addressable Market}
    - **SOM**: {Serviceable Obtainable Market - Year 1}

    ### Target Segment
    {Description of primary target user}

    ### Market Maturity
    {Stage and what it means for us}

    ## Competitive Landscape

    ### Direct Competitors
    | Competitor | Users | Pricing | Strength | Weakness | Alignment |
    |------------|-------|---------|----------|----------|-----------|
    | {name} | {X} | {$X} | {strength} | {weakness} | {X}/10 |

    ### Indirect Competitors
    {List with brief descriptions}

    ### Competitive Intensity
    {Assessment: Low/Medium/High with rationale}

    ## Gap Analysis

    ### Primary Opportunity
    {The main gap we're addressing}

    ### Unmet Needs
    1. {Need 1}
    2. {Need 2}

    ### Values Gaps
    {Where competitors fail on values - our opportunity}

    ## Positioning

    ### Positioning Statement
    > For {target customer}
    > Who {statement of need}
    > Our {product name} is a {category}
    > That {key benefit}
    > Unlike {competition}
    > We {key differentiator}

    ### Messaging Pillars
    1. **{Pillar 1}**: {Proof points}
    2. **{Pillar 2}**: {Proof points}
    3. **{Pillar 3}**: {Proof points}

    ## Go-to-Market

    ### Entry Strategy
    {How we enter the market}

    ### Beachhead Segment
    {Where we start and why}

    ### Pricing
    | Tier | Price | Includes |
    |------|-------|----------|
    | {tier} | {price} | {features} |

    ### Acquisition Channels
    1. {Channel 1}
    2. {Channel 2}
```

### Step 5: MVP Specification Document

Generate detailed MVP spec:

```yaml
mvp_specification_document:
  template: |
    # {Product Name} - MVP Specification

    ## Problem Statement

    ### Crystallized Problem
    > {One sentence problem statement}

    ### Success Definition
    {What success looks like for users}

    ## Feature Specification

    ### Core Features (Must Ship)

    #### Feature: {Feature Name}
    - **ID**: F001
    - **Priority**: Core
    - **LOC Budget**: {X}
    - **Description**: {What it does}

    **Acceptance Criteria**:
    - [ ] Given {context}, when {action}, then {result}
    - [ ] Given {context}, when {action}, then {result}

    **User Stories**:
    - As a {user}, I want to {action} so that {benefit}

    **Technical Notes**:
    {Implementation considerations}

    ---

    {Repeat for each feature}

    ### Expected Features (Should Ship)
    {Similar format, less detail}

    ### Explicitly Excluded
    | Feature | Reason | Future Phase |
    |---------|--------|--------------|
    | {feature} | {why not MVP} | {when/if} |

    ## Code Budget

    | Component | LOC | % of Budget |
    |-----------|-----|-------------|
    | {component} | {X} | {X}% |
    | **Total** | **{X}** | **100%** |

    Budget Rules:
    - No component exceeds allocation without approval
    - 5% buffer for unexpected needs
    - Hard ceiling at {X} LOC

    ## UI/UX Specification

    ### Screens
    | Screen | Purpose | Key Elements |
    |--------|---------|--------------|
    | {screen} | {what user does} | {main elements} |

    ### User Flows
    {Key user journey descriptions}

    ### Design Principles
    1. {Principle 1}
    2. {Principle 2}
```

### Step 6: Technical Architecture Document

Generate architecture specification:

```yaml
technical_architecture_document:
  template: |
    # {Product Name} - Technical Architecture

    ## Architecture Overview

    ### Style
    {Monolith/Modular Monolith/etc with rationale}

    ### Architecture Diagram
    ```
    {ASCII diagram from MVP Architect}
    ```

    ## Technology Stack

    | Layer | Technology | Rationale |
    |-------|------------|-----------|
    | Frontend | {tech} | {why} |
    | Backend | {tech} | {why} |
    | Database | {tech} | {why} |
    | Hosting | {tech} | {why} |
    | AI/ML | {tech} | {why} |

    ## Component Breakdown

    ### {Component Name}
    - **Purpose**: {what it does}
    - **LOC Budget**: {X}
    - **Dependencies**: {what it needs}
    - **Interfaces**: {how other components interact}

    {Repeat for each component}

    ## Database Schema

    ### Entity Relationship
    ```
    {ERD or schema description}
    ```

    ### Key Tables
    | Table | Purpose | Key Fields |
    |-------|---------|------------|
    | {table} | {purpose} | {fields} |

    ## API Design

    ### Internal API
    - **Style**: REST
    - **Versioning**: URL-based (/v1/)
    - **Authentication**: JWT

    ### Endpoints
    | Method | Endpoint | Purpose |
    |--------|----------|---------|
    | POST | /api/v1/{resource} | {purpose} |
    | GET | /api/v1/{resource} | {purpose} |

    ### External API (Future)
    {Plans for Phase 2/3}

    ## Security Architecture

    ### Authentication
    {Approach}

    ### Authorization
    {Approach}

    ### Data Protection
    {Encryption, etc.}

    ## Infrastructure

    ### Hosting
    {Where and how deployed}

    ### CI/CD
    {Pipeline approach}

    ### Monitoring
    {What we track}

    ## Scalability Considerations

    ### MVP Scale Target
    {Users/requests supported}

    ### Scale Path
    {How architecture grows}
```

### Step 7: Phase Roadmap Document

Generate expansion roadmap:

```yaml
phase_roadmap_document:
  template: |
    # {Product Name} - Phase Roadmap

    ## Philosophy
    > We don't build features hoping users will want them.
    > We build when users prove they want them.

    ## Phase Overview

    ```
    Phase 0       Phase 1       Phase 2       Phase 3
    Validation    MVP           Growth        Scale
        │             │             │             │
        ▼             ▼             ▼             ▼
    Prove need    First value   User-driven   Market
    exists        delivery      expansion     leadership
        │             │             │             │
        └──triggers──►└──triggers──►└──triggers──►│
    ```

    ## Phase 0: Validation

    ### Objective
    Prove the problem is real and users will pay

    ### Activities
    {List from Phase Planner}

    ### Success Criteria
    {Triggers to proceed}

    ### Exit Decision
    - **Proceed**: {criteria}
    - **Pivot**: {criteria}
    - **Kill**: {criteria}

    ## Phase 1: MVP

    ### Objective
    Deliver core value, achieve first revenue

    ### Features
    {Feature list with LOC budgets}

    ### Code Budget
    {X} LOC

    ### Success Metrics
    | Metric | Target |
    |--------|--------|
    | {metric} | {target} |

    ### Triggers for Phase 2
    All required:
    - {trigger 1}
    - {trigger 2}

    ## Phase 2: Growth

    ### Objective
    Expand based on proven user demand

    ### Planned Features
    | Feature | Trigger | LOC Budget |
    |---------|---------|------------|
    | {feature} | {50+ requests} | {X} |

    ### Code Budget
    +{X} LOC (cumulative: {X})

    ### Success Metrics
    | Metric | Target |
    |--------|--------|
    | {metric} | {target} |

    ### Triggers for Phase 3
    {List}

    ## Phase 3: Scale

    ### Objective
    Optimize and extend for market leadership

    ### Potential Features
    {Categories from Phase Planner}

    ### Code Budget
    +{X} LOC (cumulative: {X}, cap: 100k)

    ## Code Budget Summary

    | Phase | New LOC | Cumulative | Remaining |
    |-------|---------|------------|-----------|
    | MVP | {X} | {X} | {X} |
    | Growth | {X} | {X} | {X} |
    | Scale | {X} | {X} | {X} |

    ## Pivot & Sunset Criteria

    ### Pivot Triggers
    {From Phase Planner}

    ### Sunset Triggers
    {From Phase Planner}

    ### Graceful Exit Process
    {How we honor users if we sunset}
```

### Step 8: Success Metrics Document

Generate KPI framework:

```yaml
success_metrics_document:
  template: |
    # {Product Name} - Success Metrics

    ## Metric Philosophy
    > We measure what matters, not what's easy.
    > Vanity metrics are ignored.
    > User outcomes over engagement.

    ## North Star Metric
    **{Metric Name}**: {Definition}
    - Why this matters: {explanation}
    - How we measure: {method}

    ## Phase 1 (MVP) Metrics

    ### Primary Metrics
    | Metric | Target | Measurement | Frequency |
    |--------|--------|-------------|-----------|
    | Paying Users | 100 | Stripe data | Weekly |
    | MRR | $3,000 | Stripe data | Weekly |
    | 30-day Retention | 40% | Analytics | Weekly |

    ### Secondary Metrics
    | Metric | Target | Why Track |
    |--------|--------|-----------|
    | NPS | 30+ | User satisfaction |
    | Organic % | 20% | Product-market fit |

    ### Anti-Metrics (What We Don't Optimize)
    - Time in app (avoid addiction)
    - Daily active users (quality over quantity)
    - Feature usage breadth (depth matters more)

    ## Phase 2 (Growth) Metrics

    {Similar format}

    ## Phase 3 (Scale) Metrics

    {Similar format}

    ## Traction Triggers

    ### MVP → Growth
    {Specific metrics that trigger expansion}

    ### Growth → Scale
    {Specific metrics that trigger scale investment}

    ## Health Monitoring

    ### Weekly Review
    - Revenue trend
    - Retention trend
    - Support ticket themes

    ### Monthly Review
    - Feature request analysis
    - Churn analysis
    - Competitive movement

    ### Quarterly Review
    - Strategic direction
    - Values alignment
    - Code budget status
```

### Step 9: Module Manifest Generation

Create Brand Factory integration manifest:

```yaml
module_manifest:
  template: |
    {
      "platform_name": "{Product Name}",
      "platform_type": "saas",
      "version": "1.0.0",
      "generated": "{timestamp}",

      "sacred_alignment": {
        "composite_score": {X},
        "laws_passed": {X},
        "council_review_tier": {1|2|3},
        "primary_values": ["{value1}", "{value2}"]
      },

      "modules": {
        "required": [
          "foundation",
          "ai-companion",
          "crypto-layer"
        ],
        "selected": [
          "{module1}",
          "{module2}"
        ],
        "deferred": [
          "{module3}"
        ],
        "excluded": [
          "{module4}"
        ]
      },

      "code_budget": {
        "phase_1_mvp": {X},
        "phase_2_growth": {X},
        "phase_3_scale": {X},
        "total_cap": 100000,
        "reserved": {X}
      },

      "technical_stack": {
        "frontend": "{tech}",
        "backend": "{tech}",
        "database": "{tech}",
        "hosting": "{tech}"
      },

      "features": {
        "mvp": [
          {
            "id": "F001",
            "name": "{feature}",
            "loc_budget": {X},
            "priority": "core"
          }
        ],
        "growth": [],
        "scale": []
      },

      "council_review": {
        "tier": {1|2|3},
        "primary_reviewers": [
          "{agent1}",
          "{agent2}"
        ],
        "submitted": null,
        "approved": null
      },

      "metadata": {
        "generator": "saas-spec-generator",
        "generator_version": "1.0.0",
        "artifacts_used": [
          "idea-evaluation",
          "market-analysis",
          "mvp-architecture",
          "phase-plan"
        ]
      }
    }
```

### Step 10: Acceptance Criteria Document

Generate test specifications:

```yaml
acceptance_criteria_document:
  template: |
    # {Product Name} - Acceptance Criteria

    ## Overview
    These acceptance criteria define "done" for each feature.
    They become automated tests during implementation.

    ## Feature: {Feature Name} (F001)

    ### Happy Path
    ```gherkin
    Feature: {Feature Name}
      As a {user type}
      I want to {action}
      So that {benefit}

      Scenario: Successful {action}
        Given {initial context}
        When {user action}
        Then {expected result}
        And {additional expectation}
    ```

    ### Edge Cases
    ```gherkin
      Scenario: {Edge case name}
        Given {context}
        When {action}
        Then {result}
    ```

    ### Error Handling
    ```gherkin
      Scenario: {Error scenario}
        Given {context}
        When {action that fails}
        Then {graceful error handling}
    ```

    ### Performance Criteria
    - Response time: < {X}ms
    - Concurrent users: {X}

    ---

    {Repeat for each feature}

    ## Integration Tests

    ### User Journeys
    {End-to-end test scenarios}

    ## Non-Functional Requirements

    ### Performance
    | Metric | Target |
    |--------|--------|
    | Page load | < 2s |
    | API response | < 500ms |

    ### Security
    - {Security requirement 1}
    - {Security requirement 2}

    ### Accessibility
    - WCAG 2.1 AA compliance
```

---

## Handoff Protocol

### Input Specification (IACP)

```xml
<agent_request>
  <from>saas-phase-planner</from>
  <to>saas-spec-synthesizer</to>
  <request_id>SSG-SYNTH-{timestamp}</request_id>
  <action>generate_spec_package</action>

  <artifacts>
    <idea_evaluation>{full output}</idea_evaluation>
    <market_analysis>{full output}</market_analysis>
    <mvp_architecture>{full output}</mvp_architecture>
    <phase_plan>{full output}</phase_plan>
  </artifacts>

  <options>
    <output_format>markdown|json|both</output_format>
    <council_package>true|false</council_package>
  </options>
</agent_request>
```

### Output Specification (IACP)

```xml
<agent_response>
  <from>saas-spec-synthesizer</from>
  <to>council-liaison|gateway-agent</to>
  <request_id>SSG-SYNTH-{timestamp}</request_id>
  <status>completed|blocked|needs_input</status>

  <spec_package>
    <documents>
      <document name="00-executive-summary.md">{content}</document>
      <document name="01-council-alignment.md">{content}</document>
      <document name="02-market-analysis.md">{content}</document>
      <document name="03-positioning.md">{content}</document>
      <document name="04-mvp-specification.md">{content}</document>
      <document name="05-technical-architecture.md">{content}</document>
      <document name="06-phase-roadmap.md">{content}</document>
      <document name="07-success-metrics.md">{content}</document>
      <document name="08-module-manifest.json">{content}</document>
      <document name="09-acceptance-criteria.md">{content}</document>
    </documents>

    <summary>
      <product_name>{name}</product_name>
      <total_documents>10</total_documents>
      <total_loc_budget>{X}</total_loc_budget>
      <council_review_tier>{1|2|3}</council_review_tier>
      <recommendation>{proceed|revise|decline}</recommendation>
    </summary>
  </spec_package>

  <next_action>
    <agent>council-liaison</agent>
    <action>submit_for_review</action>
    <tier>{council_review_tier}</tier>
  </next_action>

  <intuition_lessons>
    <lesson>{what was learned}</lesson>
  </intuition_lessons>
</agent_response>
```

---

## Output Directory Structure

```
{product-name}-spec/
├── 00-executive-summary.md      # One-page overview
├── 01-council-alignment.md      # Sacred Law compliance
├── 02-market-analysis.md        # Competitive landscape
├── 03-positioning.md            # Market positioning
├── 04-mvp-specification.md      # Detailed MVP spec
├── 05-technical-architecture.md # Tech stack & design
├── 06-phase-roadmap.md          # Expansion phases
├── 07-success-metrics.md        # KPIs & triggers
├── 08-module-manifest.json      # Brand Factory config
├── 09-acceptance-criteria.md    # Test specifications
└── artifacts/
    ├── idea-evaluation.json     # Raw evaluator output
    ├── market-analysis.json     # Raw analyst output
    ├── mvp-architecture.json    # Raw architect output
    └── phase-plan.json          # Raw planner output
```

---

## Quality Gates

### Gate: Package Completeness

- [ ] All 10 documents generated
- [ ] No placeholder content remains
- [ ] All cross-references valid
- [ ] Module manifest validates

### Gate: Consistency Check

- [ ] Code budgets match across documents
- [ ] Feature lists consistent
- [ ] Metrics align between documents
- [ ] No contradictory information

### Gate: Council Readiness

- [ ] Sacred Law assessment complete
- [ ] Value scores documented
- [ ] Sovereignty architecture clear
- [ ] Review tier determined

### Gate: Actionability

- [ ] Acceptance criteria testable
- [ ] Technical spec implementable
- [ ] Roadmap triggers measurable
- [ ] Entry strategy executable

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-05 | Initial release |
