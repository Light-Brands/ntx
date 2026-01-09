# Universal Router

> *"Every request finds its agent. Every agent finds its purpose."*

## Overview

The Universal Router is the **semantic routing brain** of the Agent Communication System. It understands natural language requests and routes them to the appropriate agent(s) across ALL domains.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           UNIVERSAL ROUTER                                   │
│                                                                              │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐         │
│  │  REQUEST        │    │   SEMANTIC      │    │   ROUTING       │         │
│  │  ANALYSIS       │ →  │   MATCHING      │ →  │   PLAN          │         │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘         │
│         ↓                       ↓                      ↓                    │
│  Intent + Domain         Agent Registry         Multi-Agent                │
│  Classification          Capability Match       Coordination               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Routing Pipeline

### Stage 1: Request Analysis

Parse and understand the incoming request.

```yaml
request_analysis:
  input: "raw request text or structured request"
  outputs:
    - intent: "what the user wants to accomplish"
    - domain_hints: "keywords suggesting specific domains"
    - complexity: "simple|compound|complex"
    - urgency: "immediate|normal|low"
    - governance_required: "boolean"
```

**Intent Classification:**

| Intent Type | Description | Example |
|-------------|-------------|---------|
| `query` | Information request | "What's the status of proposal X?" |
| `action` | Task execution | "Create an issue for this bug" |
| `review` | Evaluation request | "Review this code for security" |
| `decision` | Governance decision | "Should we approve this brand?" |
| `handoff` | Cross-domain transfer | "Send this to legal" |

### Stage 2: Semantic Matching

Match request semantics against Agent Registry.

```yaml
semantic_matching:
  process:
    1. Generate request embedding
    2. Compare against all agent trigger embeddings
    3. Rank agents by semantic similarity
    4. Filter by domain relevance
    5. Check capability match

  outputs:
    - primary_matches: "top 3 agents by semantic match"
    - domain_matches: "all agents in relevant domain"
    - capability_matches: "agents with required capabilities"
```

**Domain Classification:**

| Domain | Trigger Patterns |
|--------|-----------------|
| `workflow` | issue, PR, code, implement, review, build, test, merge |
| `brand-proposal` | proposal, brand, intake, submit, evaluate, iterate |
| `legal-department` | legal, contract, agreement, compliance, trademark, risk |
| `stewardship-council` | council, governance, sacred, alignment, evaluate, approve |
| `legion-of-living-light` | protect, enforce, heal, guard, validate, uphold |
| `core-development` | architecture, security, performance, debug, simplify |

### Stage 3: Routing Plan Generation

Create an execution plan for the request.

```yaml
routing_plan:
  request_id: "REQ-{timestamp}-{hash}"
  routing_id: "RP-{timestamp}-{hash}"

  primary:
    domain: "target domain"
    agent: "primary handler agent"
    reason: "why this agent"

  supporting:
    - domain: "secondary domain"
      agent: "supporting agent"
      role: "what they contribute"

  governance:
    required: "boolean"
    council_review: "none|notification|approval"
    legion_protection: "auto|explicit|none"

  execution:
    mode: "sequential|parallel|coordinated"
    priority: "critical|high|normal|low"
    timeout: "expected completion time"

  fallback:
    on_primary_failure: "alternative agent"
    escalation_path: "orchestrator chain"
```

---

## Domain Routing Rules

### Rule 1: Development Tasks → Workflow Domain

```yaml
patterns:
  - "create issue"
  - "implement feature"
  - "fix bug"
  - "code review"
  - "merge PR"
  - "run tests"

route_to: workflow/orchestrator
entry_point: workflow/issue-manager (for new work)
           : workflow/reviewer-agent (for reviews)
           : workflow/validator-agent (for validation)
```

### Rule 2: Brand Operations → Brand Proposal Domain

```yaml
patterns:
  - "new brand"
  - "submit proposal"
  - "evaluate brand"
  - "iterate proposal"
  - "check proposal status"

route_to: brand-proposal/proposal-orchestrator
entry_point: brand-proposal/intake-guardian (for new proposals)
           : brand-proposal/proposal-refiner (for iterations)
```

### Rule 3: Legal Matters → Legal Department Domain

```yaml
patterns:
  - "contract"
  - "agreement"
  - "legal review"
  - "compliance"
  - "trademark"
  - "IP"
  - "risk assessment"

route_to: legal-department/legal-orchestrator
entry_point: legal-department/contract-guardian (for contracts)
           : legal-department/ip-protector (for IP matters)
           : legal-department/compliance-sentinel (for compliance)
```

### Rule 4: Governance Decisions → Stewardship Council

```yaml
patterns:
  - "council review"
  - "governance decision"
  - "sacred alignment"
  - "approve brand"
  - "evaluate purpose"
  - "check regenerative"

route_to: stewardship-council/* (semantic routing to specific member)
governance_integration: council-vector-db/semantic-router
```

### Rule 5: Protection/Enforcement → Legion of Living Light

```yaml
patterns:
  - "protect decision"
  - "enforce integrity"
  - "validate against laws"
  - "guard process"

route_to: legion/* (commander or army based on need)
auto_deploy: true (protection is automatic for council decisions)
```

---

## Cross-Domain Routing

### Pattern: Sequential Handoff

When work flows from one domain to another.

```
Brand Proposal → Legal Department

1. brand-proposal/readiness-assessor completes
2. Router receives: handoff_to_legal signal
3. Router generates: cross-domain routing plan
4. legal-department/legal-orchestrator receives handoff
```

### Pattern: Parallel Coordination

When multiple domains must work simultaneously.

```
Council Review + Legion Protection (parallel)

1. Request triggers governance evaluation
2. Router generates parallel routing plan:
   - stewardship-council/* for evaluation
   - legion/* for protection (auto-deployed)
3. Both execute simultaneously
4. Results merged before completion
```

### Pattern: Escalation Chain

When work needs higher authority.

```
Operational Agent → Executive → Constitutive

1. Reviewer agent encounters complex security issue
2. Escalates to workflow/orchestrator (executive)
3. Orchestrator determines council review needed
4. Routes to stewardship-council/architect-of-sacred-systems
```

---

## Routing Algorithms

### Algorithm 1: Semantic Similarity Routing

```python
def route_by_semantics(request):
    # Generate embedding for request
    request_embedding = embed(request.content)

    # Compare against all agent triggers
    matches = []
    for agent in registry.all_agents():
        for trigger in agent.triggers:
            similarity = cosine_similarity(
                request_embedding,
                embed(trigger)
            )
            if similarity > THRESHOLD:
                matches.append((agent, similarity))

    # Sort by similarity, return top matches
    return sorted(matches, key=lambda x: x[1], reverse=True)[:5]
```

### Algorithm 2: Capability-Based Routing

```python
def route_by_capability(request):
    # Extract required capabilities from request
    required_caps = extract_capabilities(request.content)

    # Find agents that have all required capabilities
    matches = []
    for agent in registry.all_agents():
        if all(cap in agent.capabilities for cap in required_caps):
            matches.append(agent)

    return matches
```

### Algorithm 3: Domain-Priority Routing

```python
def route_by_domain(request):
    # Classify request domain
    domain = classify_domain(request.content)

    # Get domain orchestrator
    orchestrator = registry.get_orchestrator(domain)

    # If compound request, identify all relevant domains
    if request.complexity == 'compound':
        domains = identify_all_domains(request.content)
        return [registry.get_orchestrator(d) for d in domains]

    return [orchestrator]
```

### Algorithm 4: Authority-Aware Routing

```python
def route_with_authority(request):
    # Determine required authority level
    if requires_governance(request):
        authority = 'constitutive'
    elif requires_coordination(request):
        authority = 'executive'
    else:
        authority = 'operational'

    # Filter agents by authority level
    return registry.agents_by_authority(authority)
```

---

## Routing Plan Schema

### Full Routing Plan Structure

```xml
<routing_plan>
  <meta>
    <request_id>REQ-2026-0105-A7B3</request_id>
    <routing_id>RP-2026-0105-A7B3</routing_id>
    <timestamp>2026-01-05T10:30:00Z</timestamp>
    <router_version>1.0.0</router_version>
  </meta>

  <analysis>
    <original_request>Create a new brand proposal for Sacred Wellness</original_request>
    <intent>action</intent>
    <complexity>simple</complexity>
    <urgency>normal</urgency>
    <domains_identified>
      <domain relevance="0.95">brand-proposal</domain>
      <domain relevance="0.45">stewardship-council</domain>
    </domains_identified>
  </analysis>

  <routing>
    <primary>
      <domain>brand-proposal</domain>
      <agent>intake-guardian</agent>
      <agent_id>brand-proposal/intake-guardian</agent_id>
      <reason>New brand proposal requires intake screening</reason>
      <confidence>0.95</confidence>
    </primary>

    <chain>
      <step order="1" agent="brand-proposal/intake-guardian" />
      <step order="2" agent="brand-proposal/proposal-orchestrator" />
      <step order="3" agent="brand-proposal/council-liaison" conditional="intake-complete" />
    </chain>

    <supporting>
      <agent>
        <id>brand-proposal/proposal-orchestrator</id>
        <role>coordination</role>
        <when>after-intake</when>
      </agent>
    </supporting>
  </routing>

  <governance>
    <council_required>true</council_required>
    <council_trigger>council-review-request</council_trigger>
    <legion_auto_protect>true</legion_auto_protect>
    <review_tier>pending-intake</review_tier>
  </governance>

  <execution>
    <mode>sequential</mode>
    <priority>normal</priority>
    <estimated_duration>2-14 days</estimated_duration>
  </execution>

  <fallback>
    <on_intake_failure>
      <action>return-to-submitter</action>
      <message>Proposal incomplete or ineligible</message>
    </on_intake_failure>
    <escalation_path>
      <level1>brand-proposal/proposal-orchestrator</level1>
      <level2>gateway-agent</level2>
    </escalation_path>
  </fallback>
</routing_plan>
```

---

## Multi-Agent Routing

### Scenario: Complex Request Requiring Multiple Agents

**Request:** "Review the security of the new authentication PR and ensure it aligns with our sacred systems principles"

```xml
<routing_plan>
  <analysis>
    <intent>review</intent>
    <complexity>compound</complexity>
    <domains_identified>
      <domain relevance="0.90">workflow</domain>
      <domain relevance="0.85">core-development</domain>
      <domain relevance="0.70">stewardship-council</domain>
    </domains_identified>
  </analysis>

  <routing>
    <primary>
      <domain>workflow</domain>
      <agent>reviewer-agent</agent>
      <reason>Code review request</reason>
    </primary>

    <parallel_agents>
      <agent>
        <id>core-dev/security-reviewer</id>
        <role>security-audit</role>
        <required>true</required>
      </agent>
      <agent>
        <id>stewardship-council/architect-of-sacred-systems</id>
        <role>systems-alignment-check</role>
        <required>true</required>
      </agent>
    </parallel_agents>

    <aggregation>
      <strategy>all-must-pass</strategy>
      <coordinator>workflow/reviewer-agent</coordinator>
    </aggregation>
  </routing>
</routing_plan>
```

---

## Routing Intelligence

### Learning from Outcomes

The router learns from routing decisions:

```yaml
routing_outcome:
  routing_id: "RP-2026-0105-A7B3"
  success: true
  agent_performance:
    - agent: "brand-proposal/intake-guardian"
      success: true
      duration: "15 minutes"
  lessons_learned:
    - "New brand proposals with 'wellness' trigger should include guardian-of-gaia"
```

### Pattern Recognition

Common routing patterns are cached for faster matching:

```yaml
routing_patterns:
  - pattern: "create issue for.*"
    route: workflow/issue-manager
    confidence: 0.99

  - pattern: "submit.*proposal"
    route: brand-proposal/intake-guardian
    confidence: 0.98

  - pattern: "review.*security"
    route:
      - workflow/reviewer-agent
      - core-dev/security-reviewer
    confidence: 0.97
```

---

## Integration with Existing Systems

### Council Vector Database Integration

For governance-related routing, the Universal Router leverages the existing Council Vector Database:

```yaml
council_routing_integration:
  trigger: governance_required == true
  delegate_to: council-vector-db/semantic-router
  return: council_members, legion_protection
```

### Intuition Engine Integration

All routing decisions feed into the Intuition Engine:

```yaml
intuition_integration:
  pre_routing:
    - query: "What have we learned about routing '{intent}' requests?"
    - apply: accumulated wisdom to routing decision

  post_routing:
    - record: routing decision and outcome
    - extract: lessons for future routing
```

### AIQ Engine Integration

Routing intelligence is measured:

```yaml
aiq_integration:
  measure:
    - routing_accuracy: "correct agent on first try"
    - domain_classification: "correct domain identification"
    - multi_agent_coordination: "successful parallel routing"
    - fallback_usage: "escalation patterns"
```

---

## Quick Reference

### Route This Request

```
Input: "I need help with [request]"

Router Process:
1. Analyze intent and complexity
2. Classify domains
3. Match agents by capability
4. Generate routing plan
5. Return to Gateway for execution

Output: Routing Plan with primary agent and supporting agents
```

### Common Routing Shortcuts

| Request Pattern | Route To |
|-----------------|----------|
| "Create issue..." | workflow/issue-manager |
| "Review PR..." | workflow/reviewer-agent |
| "New proposal..." | brand-proposal/intake-guardian |
| "Legal review..." | legal-department/legal-orchestrator |
| "Is this aligned..." | stewardship-council/* (semantic) |
| "Security check..." | core-dev/security-reviewer |
| "Debug this..." | core-dev/debugger |

---

*"The right agent for every request. The right request for every agent."*
