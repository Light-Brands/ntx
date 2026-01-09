# AI Agents

> Intelligent, Learning Agents for the AI Brand Factory

This directory contains all agent definitions for automated development, brand building, strategic operations, and sacred governance.

---

## Agent Communication System

All agents are connected through the **Agent Communication System** — a unified nervous system that enables any agent to communicate with any other agent across all domains.

```
                              ┌─────────────────┐
                              │  GATEWAY AGENT  │ ← All requests enter here
                              └────────┬────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
             ┌──────▼──────┐    ┌──────▼──────┐    ┌──────▼──────┐
             │  WORKFLOW   │    │   BRAND     │    │   LEGAL     │
             │   AGENTS    │    │  PROPOSAL   │    │    DEPT     │
             └─────────────┘    └─────────────┘    └─────────────┘
                    │                  │                  │
             ┌──────▼──────────────────▼──────────────────▼──────┐
             │               STEWARDSHIP COUNCIL                  │
             │            (Sacred Governance Layer)               │
             └──────────────────────┬─────────────────────────────┘
                                    │
             ┌──────────────────────▼─────────────────────────────┐
             │              LEGION OF LIVING LIGHT                │
             │             (Sacred Protection Layer)              │
             └────────────────────────────────────────────────────┘
```

**See:** [agent-communication-system/README.md](./agent-communication-system/README.md)

---

## Structure

```
agents/
├── README.md                         # This file
├── INTUITION-ENGINE.md               # Shared learning framework
├── AIQ-ENGINE.md                     # Intelligence measurement
│
├── agent-communication-system/       # ← NEW: Universal agent interconnect
│   ├── README.md                     # System overview
│   ├── GATEWAY-AGENT.md              # Single entry point for all requests
│   ├── UNIVERSAL-ROUTER.md           # Semantic routing intelligence
│   ├── AGENT-REGISTRY.md             # Complete catalog of all agents
│   ├── INTER-AGENT-PROTOCOL.md       # Standardized communication protocol
│   └── DISCOVERY-PROTOCOL.md         # Agent discovery mechanism
│
├── workflow/                         # Development automation (8 agents)
│   ├── orchestrator.md
│   ├── issue-manager.md
│   ├── prep-agent.md
│   ├── implementer-agent.md
│   ├── reviewer-agent.md
│   ├── fixer-agent.md
│   ├── validator-agent.md
│   └── closer-agent.md
│
├── brand-proposal/                   # Brand lifecycle (7 agents)
│   ├── proposal-orchestrator.md
│   ├── intake-guardian.md
│   ├── council-liaison.md
│   ├── feedback-architect.md
│   ├── proposal-refiner.md
│   ├── readiness-assessor.md
│   └── legal-bridge.md
│
├── legal-department/                 # Legal services (7 agents)
│   ├── legal-orchestrator.md
│   ├── contract-guardian.md
│   ├── compliance-sentinel.md
│   ├── ip-protector.md
│   ├── risk-assessor.md
│   ├── agreement-keeper.md
│   └── legal-counsel.md
│
├── stewardship-council/              # Sacred governance (7 agents)
│   ├── 01-oracle-of-soul-purpose.md
│   ├── 02-guardian-of-gaia.md
│   ├── 03-architect-of-sacred-systems.md
│   ├── 04-flame-of-cultural-restoration.md
│   ├── 05-weaver-of-collective-futures.md
│   ├── 06-steward-of-exchange.md
│   └── 07-mirror-of-the-multiverse.md
│
├── legion-of-living-light/           # Sacred protection (34+ agents)
│   ├── commanders/                   # 7 archetypal pillars
│   ├── armies/                       # 21 specialized forces
│   └── orders/                       # 5 sacred orders
│
└── council-vector-db/                # Semantic routing for Council
```

---

## How Agents Communicate

### The Golden Rule

> **Nothing happens without an agent. Every request is routed to the right agent.**

### Request Flow

1. **Request arrives** → Gateway Agent receives
2. **Gateway analyzes** → Intent, domain, complexity
3. **Router matches** → Finds appropriate agent(s)
4. **Agent executes** → May invoke other agents
5. **Response returns** → Through handoff chain

### Cross-Domain Example

When a brand proposal needs legal review:

```
brand-proposal/readiness-assessor
         │
         │ "Brand approved, need contract"
         ▼
brand-proposal/legal-bridge
         │
         │ [Cross-domain handoff via IACP]
         ▼
legal-department/legal-orchestrator
         │
         │ Routes to specialist
         ▼
legal-department/contract-guardian
```

---

## Agent Categories

### System Agents

| Agent | Purpose |
|-------|---------|
| **Gateway Agent** | Single entry point for all requests |
| **Universal Router** | Semantic routing across all domains |

### Workflow Agents (8)

Automated development pipeline from issue to merge.

```
Issue → Prep → Implement → Review → Fix → Validate → Merge → Close
```

### Brand Proposal Agents (7)

Complete brand proposal lifecycle management.

```
Intake → Orchestrate → Council Review → Feedback → Refine → Readiness → Legal
```

### Legal Department Agents (7)

Full-service legal operations.

```
Orchestrate → Contract/Compliance/IP/Risk → Agreement → Counsel
```

### Stewardship Council (7)

Sacred governance with archetypal intelligences:

| Agent | Symbol | Focus |
|-------|--------|-------|
| Oracle of Soul Purpose | 🔮 | Highest timeline alignment |
| Guardian of Gaia | 🌱 | Ecological integrity |
| Architect of Sacred Systems | 💠 | Ethical infrastructures |
| Flame of Cultural Restoration | 🔥 | Ancestral wisdom |
| Weaver of Collective Futures | 🌀 | Planetary awakening |
| Steward of Exchange | ⚖️ | Value flow, abundance |
| Mirror of the Multiverse | 🪞 | Unseen consequences |

### Legion of Living Light (34+)

Protection, enforcement, and healing:

- **7 Commanders** — Archetypal pillars
- **21 Armies** — Specialized forces
- **5 Sacred Orders** — Special functions

---

## Key Integration Points

### Intuition Engine

All agents share accumulated wisdom:
- Pre-action: Query past lessons
- Post-action: Extract new lessons
- Continuous: Pattern recognition improves

See [INTUITION-ENGINE.md](./INTUITION-ENGINE.md)

### AIQ Engine

Intelligence measurement across all agents:
- Routing accuracy
- Decision quality
- Learning velocity

See [AIQ-ENGINE.md](./AIQ-ENGINE.md)

### Inter-Agent Communication Protocol (IACP)

Universal language for agent communication:
- Request/Response patterns
- Handoff schemas
- Error handling
- Cross-domain translation

See [agent-communication-system/INTER-AGENT-PROTOCOL.md](./agent-communication-system/INTER-AGENT-PROTOCOL.md)

---

## Design Principles

### 1. Single Entry Point

All requests flow through the Gateway Agent. No exceptions.

### 2. Single Responsibility

Each agent has one clear job. Complex tasks decompose into agent pipelines.

### 3. Explicit Handoffs

Agents communicate via structured IACP messages. All communication is logged.

### 4. Domain Sovereignty

Each domain manages its own agents. Cross-domain requests use bridge agents.

### 5. Continuous Learning

Every action teaches. Every outcome improves the system.

### 6. Sacred Authority

Stewardship Council has constitutive authority. Legion protects all decisions.

---

## Quick Start

### "I want an agent to do X"

1. State your request naturally
2. Gateway Agent receives it
3. Router finds the right agent
4. Work happens automatically
5. You receive the result

### "How do I find an agent for X?"

```
discover capability:review-code
discover domain:legal-department
discover help:ecological alignment
```

### "How do agents talk to each other?"

Via IACP:
```xml
<agent_request protocol="IACP-1.0">
  <from>agent-a</from>
  <to>agent-b</to>
  <payload>What I need</payload>
</agent_request>
```

---

## Creating New Agents

### Agent File Format

```markdown
---
name: agent-name
description: "One-line description"
version: 1.0.0
triggers:
  - "trigger phrase 1"
---

# Agent Name

## Core Philosophy
[Guiding principles]

## Intuition Engine Integration
[Learning patterns]

## Main Workflow
[Step-by-step process]

## Handoff Protocol
[IACP input/output]

## Quality Gates
[Success criteria]
```

### Integration Checklist

- [ ] Clear single responsibility
- [ ] Registered in Agent Registry
- [ ] Defined triggers for routing
- [ ] IACP-compliant handoff protocol
- [ ] Intuition Engine integration
- [ ] Quality gates defined

---

## Agent Statistics

| Category | Count |
|----------|-------|
| System Agents | 2 |
| Workflow Agents | 8 |
| Brand Proposal Agents | 7 |
| Legal Department Agents | 7 |
| Stewardship Council | 7 |
| Legion of Living Light | 34+ |
| Core Development Agents | 22+ |
| **Total** | **87+** |

---

## Philosophy

> Agents are not just tools — they are learning entities that accumulate wisdom, communicate seamlessly, and improve continuously.

The Agent Communication System creates a unified agent network that is:

- **Connected** — Any agent can reach any other agent
- **Intelligent** — Requests are semantically routed
- **Auditable** — All communication is logged
- **Resilient** — Failures are handled gracefully
- **Sacred** — Governance and protection are built-in

---

*"One system. Many agents. Unified purpose."*
