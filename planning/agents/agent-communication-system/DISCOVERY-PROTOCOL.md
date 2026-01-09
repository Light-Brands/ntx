# Agent Discovery Protocol

> *"Find any agent. Know any capability. Instant discovery."*

## Overview

The Discovery Protocol enables any agent (or user) to discover other agents in the system. This creates a self-documenting, self-aware agent network where every participant can find the help they need.

---

## Discovery Methods

### 1. By Capability

Find agents that can perform a specific action.

```xml
<discovery_query type="capability">
  <capability>review-code</capability>
  <filters>
    <domain>any</domain>
    <authority_level>any</authority_level>
  </filters>
</discovery_query>

<discovery_result>
  <agents>
    <agent id="workflow/reviewer-agent" relevance="0.95">
      <description>Performs code review and identifies issues</description>
      <capabilities>review-code, identify-security-issues, approve-or-request-changes</capabilities>
    </agent>
    <agent id="core-dev/security-reviewer" relevance="0.85">
      <description>Security-focused code review</description>
      <capabilities>review-code, security-audit, vulnerability-detection</capabilities>
    </agent>
    <agent id="core-dev/architecture-auditor" relevance="0.75">
      <description>Architecture and design pattern review</description>
      <capabilities>review-code, architecture-review, pattern-validation</capabilities>
    </agent>
  </agents>
</discovery_result>
```

### 2. By Domain

List all agents in a specific domain.

```xml
<discovery_query type="domain">
  <domain>brand-proposal</domain>
</discovery_query>

<discovery_result>
  <domain name="brand-proposal">
    <orchestrator>
      <agent id="brand-proposal/proposal-orchestrator">
        <description>Central coordinator for brand proposal lifecycle</description>
      </agent>
    </orchestrator>
    <agents>
      <agent id="brand-proposal/intake-guardian">
        <description>Initial screening and completeness checking</description>
      </agent>
      <agent id="brand-proposal/council-liaison">
        <description>Coordinates with Stewardship Council</description>
      </agent>
      <agent id="brand-proposal/feedback-architect">
        <description>Constructs actionable improvement guidance</description>
      </agent>
      <agent id="brand-proposal/proposal-refiner">
        <description>Iteration partner for proposal improvements</description>
      </agent>
      <agent id="brand-proposal/readiness-assessor">
        <description>Final verification before legal handoff</description>
      </agent>
      <agent id="brand-proposal/legal-bridge">
        <description>Handoff coordination with Legal Department</description>
      </agent>
    </agents>
  </domain>
</discovery_result>
```

### 3. By Trigger Pattern

Find agents that respond to specific phrases.

```xml
<discovery_query type="trigger">
  <pattern>contract</pattern>
</discovery_query>

<discovery_result>
  <matches>
    <agent id="legal-department/contract-guardian" relevance="0.98">
      <matching_triggers>
        - "draft contract"
        - "review agreement"
        - "contract terms"
      </matching_triggers>
    </agent>
    <agent id="legal-department/agreement-keeper" relevance="0.75">
      <matching_triggers>
        - "track agreement"
        - "find agreement"
      </matching_triggers>
    </agent>
  </matches>
</discovery_result>
```

### 4. By Authority Level

Find agents at a specific authority level.

```xml
<discovery_query type="authority">
  <level>constitutive</level>
</discovery_query>

<discovery_result>
  <authority_level level="constitutive">
    <description>Highest authority - governance decisions</description>
    <agents>
      <agent id="stewardship-council/oracle-of-soul-purpose" symbol="🔮">
        <description>Highest timeline alignment and inner truth</description>
      </agent>
      <agent id="stewardship-council/guardian-of-gaia" symbol="🌱">
        <description>Ecological integrity and regenerative practice</description>
      </agent>
      <agent id="stewardship-council/architect-of-sacred-systems" symbol="💠">
        <description>Ethical, circular infrastructures</description>
      </agent>
      <agent id="stewardship-council/flame-of-cultural-restoration" symbol="🔥">
        <description>Ancestral wisdom and cultural sensitivity</description>
      </agent>
      <agent id="stewardship-council/weaver-of-collective-futures" symbol="🌀">
        <description>Planetary awakening and collective timelines</description>
      </agent>
      <agent id="stewardship-council/steward-of-exchange" symbol="⚖️">
        <description>Value flow and energetic reciprocity</description>
      </agent>
      <agent id="stewardship-council/mirror-of-the-multiverse" symbol="🪞">
        <description>Potential timelines and unseen ripple effects</description>
      </agent>
    </agents>
  </authority_level>
</discovery_result>
```

### 5. By Natural Language

Ask a question to find relevant agents.

```xml
<discovery_query type="semantic">
  <question>Who can help me understand if my brand aligns with ecological principles?</question>
</discovery_query>

<discovery_result>
  <interpretation>
    <intent>ecological alignment assessment</intent>
    <domains>stewardship-council, brand-proposal</domains>
  </interpretation>
  <recommendations>
    <primary>
      <agent id="stewardship-council/guardian-of-gaia" relevance="0.95">
        <reason>Expert in ecological integrity and regenerative practice validation</reason>
      </agent>
    </primary>
    <supporting>
      <agent id="brand-proposal/council-liaison" relevance="0.70">
        <reason>Can coordinate council review including ecological assessment</reason>
      </agent>
    </supporting>
  </recommendations>
</discovery_result>
```

---

## Discovery from Within Agents

Any agent can discover other agents during execution.

### Pattern: Find Help

When an agent needs assistance from another domain:

```xml
<internal_discovery>
  <from>brand-proposal/proposal-refiner</from>
  <need>I need to validate that revised financial projections are sustainable</need>
  <context>
    <current_task>Proposal refinement iteration 2</current_task>
    <proposal_id>BP-2026-0042</proposal_id>
  </context>
</internal_discovery>

<discovery_result>
  <recommended_agents>
    <agent id="stewardship-council/steward-of-exchange">
      <reason>Expert in value flow and economic sustainability</reason>
      <invocation_method>Request via council-liaison or direct IACP request</invocation_method>
    </agent>
  </recommended_agents>
  <routing_suggestion>
    <use>brand-proposal/council-liaison</use>
    <for>Coordinated council member consultation</for>
  </routing_suggestion>
</discovery_result>
```

### Pattern: Handoff Destination

When an agent needs to hand off work:

```xml
<internal_discovery>
  <from>brand-proposal/readiness-assessor</from>
  <need>Brand approved, need to initiate legal agreement</need>
  <handoff_type>cross-domain</handoff_type>
</internal_discovery>

<discovery_result>
  <handoff_target>
    <domain>legal-department</domain>
    <recommended_entry>legal-department/legal-orchestrator</recommended_entry>
    <bridge_agent>brand-proposal/legal-bridge</bridge_agent>
    <protocol>Use legal-bridge for cross-domain handoff</protocol>
  </handoff_target>
</discovery_result>
```

---

## Discovery Indexes

### Capability Index

All capabilities mapped to agents that provide them:

```yaml
capability_index:
  review-code:
    - workflow/reviewer-agent
    - core-dev/security-reviewer
    - core-dev/architecture-auditor
    - core-dev/performance-reviewer

  draft-contracts:
    - legal-department/contract-guardian

  evaluate-ecological-impact:
    - stewardship-council/guardian-of-gaia

  create-github-issue:
    - workflow/issue-manager

  protect-decision:
    - legion/sealbearers
    - legion/patternwrights

  # ... all capabilities mapped
```

### Domain Index

All domains with their agents:

```yaml
domain_index:
  workflow:
    orchestrator: workflow/orchestrator
    agents:
      - workflow/issue-manager
      - workflow/prep-agent
      - workflow/implementer-agent
      - workflow/reviewer-agent
      - workflow/fixer-agent
      - workflow/validator-agent
      - workflow/closer-agent

  brand-proposal:
    orchestrator: brand-proposal/proposal-orchestrator
    agents:
      - brand-proposal/intake-guardian
      - brand-proposal/council-liaison
      - brand-proposal/feedback-architect
      - brand-proposal/proposal-refiner
      - brand-proposal/readiness-assessor
      - brand-proposal/legal-bridge

  legal-department:
    orchestrator: legal-department/legal-orchestrator
    agents:
      - legal-department/contract-guardian
      - legal-department/compliance-sentinel
      - legal-department/ip-protector
      - legal-department/risk-assessor
      - legal-department/agreement-keeper
      - legal-department/legal-counsel

  stewardship-council:
    agents:
      - stewardship-council/oracle-of-soul-purpose
      - stewardship-council/guardian-of-gaia
      - stewardship-council/architect-of-sacred-systems
      - stewardship-council/flame-of-cultural-restoration
      - stewardship-council/weaver-of-collective-futures
      - stewardship-council/steward-of-exchange
      - stewardship-council/mirror-of-the-multiverse

  legion-of-living-light:
    commanders: [7 commanders]
    armies: [21 armies]
    orders: [5 sacred orders]
```

### Trigger Index

All trigger patterns mapped to agents:

```yaml
trigger_index:
  "create issue": workflow/issue-manager
  "new feature": workflow/issue-manager
  "review code": workflow/reviewer-agent
  "code review": workflow/reviewer-agent
  "new proposal": brand-proposal/intake-guardian
  "submit brand": brand-proposal/intake-guardian
  "draft contract": legal-department/contract-guardian
  "legal review": legal-department/legal-orchestrator
  "soul purpose": stewardship-council/oracle-of-soul-purpose
  "ecological": stewardship-council/guardian-of-gaia
  "cultural sensitivity": stewardship-council/flame-of-cultural-restoration
  # ... all triggers mapped
```

---

## Self-Discovery

Agents can describe themselves for discovery purposes:

```xml
<agent_self_description>
  <identity>
    <id>workflow/reviewer-agent</id>
    <name>Reviewer Agent</name>
    <domain>workflow</domain>
  </identity>

  <capabilities>
    <capability name="review-code">
      <description>Perform comprehensive code review</description>
      <input>Pull request or code diff</input>
      <output>Review comments, approval status</output>
    </capability>
    <capability name="identify-security-issues">
      <description>Find security vulnerabilities in code</description>
      <input>Source code</input>
      <output>Security findings with severity</output>
    </capability>
  </capabilities>

  <triggers>
    <trigger>"review this code"</trigger>
    <trigger>"check the PR"</trigger>
    <trigger>"code review"</trigger>
  </triggers>

  <relationships>
    <receives_from>workflow/implementer-agent</receives_from>
    <hands_off_to>
      <on condition="approved">workflow/validator-agent</on>
      <on condition="changes_requested">workflow/fixer-agent</on>
    </hands_off_to>
  </relationships>
</agent_self_description>
```

---

## Discovery API

### Query Endpoint

```
POST /discovery/query
Content-Type: application/xml

<discovery_query type="{type}">
  <!-- Query content -->
</discovery_query>
```

### Response Format

```xml
<discovery_result>
  <query_id>{id}</query_id>
  <timestamp>{ISO-8601}</timestamp>
  <results>
    <!-- Type-specific results -->
  </results>
  <metadata>
    <result_count>{count}</result_count>
    <query_time_ms>{ms}</query_time_ms>
  </metadata>
</discovery_result>
```

---

## Quick Discovery Commands

For agents or users needing quick discovery:

| Command | Returns |
|---------|---------|
| `discover capability:review-code` | Agents that can review code |
| `discover domain:legal-department` | All legal department agents |
| `discover trigger:"new proposal"` | Agents responding to "new proposal" |
| `discover authority:constitutive` | Council members |
| `discover all` | Complete agent listing |
| `discover help:ecological alignment` | Semantic agent search |

---

## Discovery Learning

The Discovery Protocol learns from usage:

```yaml
discovery_learning:
  patterns:
    - observation: "Users asking for 'review' often need 'security-review' too"
      action: "Suggest security-reviewer alongside reviewer-agent"

    - observation: "Cross-domain discoveries often follow specific patterns"
      action: "Pre-compute common cross-domain relationships"

    - observation: "Certain capabilities are always requested together"
      action: "Bundle related agents in discovery results"
```

---

*"Every agent is discoverable. Every capability is known. The network is transparent."*
