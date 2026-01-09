# Agent Communication System — Quick Start

> *"State what you need. The right agent will respond."*

## The Basics

### How It Works

1. **You make a request** (natural language)
2. **Gateway Agent receives it** (single entry point)
3. **Universal Router analyzes** (finds the right agent)
4. **Agent handles it** (may involve multiple agents)
5. **You get results** (through the handoff chain)

### The Golden Rule

> **Every request goes through an agent. No exceptions.**

---

## Making Requests

### Just Say What You Need

```
"Create a GitHub issue for adding user authentication"
→ Routes to: workflow/issue-manager

"Submit a new brand proposal for Conscious Coffee Co"
→ Routes to: brand-proposal/intake-guardian

"Draft a partnership contract"
→ Routes to: legal-department/contract-guardian

"Is this brand aligned with regenerative principles?"
→ Routes to: stewardship-council/guardian-of-gaia
```

### Complex Requests Work Too

```
"Review PR #42 for security issues and ensure it aligns with our ethical guidelines"
→ Routes to:
  - workflow/reviewer-agent (primary)
  - core-dev/security-reviewer (parallel)
  - stewardship-council/architect-of-sacred-systems (parallel)
→ Results aggregated and returned
```

---

## Finding Agents

### By What They Can Do

```
discover capability:review-code
→ Returns: workflow/reviewer-agent, core-dev/security-reviewer, ...

discover capability:draft-contracts
→ Returns: legal-department/contract-guardian
```

### By Domain

```
discover domain:brand-proposal
→ Returns: All 7 brand proposal agents

discover domain:stewardship-council
→ Returns: All 7 council members
```

### By Natural Language

```
discover help:I need to understand ecological impact
→ Returns: stewardship-council/guardian-of-gaia (recommended)
```

---

## Agent Domains

| Domain | Focus | # Agents |
|--------|-------|----------|
| `workflow` | Development automation | 8 |
| `brand-proposal` | Brand lifecycle | 7 |
| `legal-department` | Legal services | 7 |
| `stewardship-council` | Sacred governance | 7 |
| `legion-of-living-light` | Protection | 34+ |
| `core-development` | Code quality | 22+ |

---

## Cross-Domain Flows

### Brand → Legal

```
Brand approved → Legal Bridge → Legal Orchestrator → Contract Guardian
```

### Workflow → Governance

```
Code complete → Reviewer → Council check → Legion protection
```

### Any → Council

```
Governance question → Council Vector DB → Appropriate member(s)
```

---

## For Agents: How to Call Other Agents

### Request Another Agent

```xml
<agent_request protocol="IACP-1.0">
  <header>
    <from><domain>my-domain</domain><agent>my-agent</agent></from>
    <to><domain>target-domain</domain><agent>target-agent</agent></to>
  </header>
  <payload>
    <action>what-i-need</action>
    <content>Details of the request</content>
  </payload>
</agent_request>
```

### Hand Off Work

```xml
<agent_handoff protocol="IACP-1.0">
  <header>
    <from><domain>my-domain</domain><agent>my-agent</agent></from>
    <to><domain>next-domain</domain><agent>next-agent</agent></to>
    <handoff_type>cross-domain</handoff_type>
  </header>
  <work_state>
    <summary>What I've done so far</summary>
    <data><!-- Accumulated data --></data>
  </work_state>
  <instructions>
    <primary>What to do next</primary>
  </instructions>
</agent_handoff>
```

### Discover Other Agents

```xml
<internal_discovery>
  <from>my-domain/my-agent</from>
  <need>I need help with ecological assessment</need>
</internal_discovery>
```

---

## Common Patterns

### Pattern: Sequential Pipeline

```
Agent A → Agent B → Agent C → Done
```

Example: Issue → Prep → Implement → Review → Merge

### Pattern: Parallel Fan-Out

```
         ┌→ Agent B ─┐
Request ─┼→ Agent C ─┼→ Aggregate → Response
         └→ Agent D ─┘
```

Example: Review code + Security check + Ethics check

### Pattern: Escalation

```
Operational Agent → Orchestrator → Council
```

Example: Complex issue → Workflow Orchestrator → Stewardship Council

---

## Key Files

| File | What It Does |
|------|--------------|
| `GATEWAY-AGENT.md` | Single entry point definition |
| `UNIVERSAL-ROUTER.md` | Routing intelligence |
| `AGENT-REGISTRY.md` | All agents catalogued |
| `INTER-AGENT-PROTOCOL.md` | Communication standard |
| `DISCOVERY-PROTOCOL.md` | Finding agents |

---

## Remember

1. **State naturally** — Don't worry about finding the right agent
2. **Gateway handles it** — All routing is automatic
3. **Agents know each other** — Discovery is built-in
4. **Cross-domain works** — Bridge agents handle transitions
5. **Everything is logged** — Full traceability

---

*"The network is alive. Every agent is connected. Just ask."*
