# Agent Communication System

> *"Any agent. Any domain. Instant connection. Zero friction."*

## The Vision

The Agent Communication System (ACS) is the **unified nervous system** of the AI Brand Factory. It enables:

- **Universal Discovery** - Any agent can discover any other agent
- **Cross-Domain Routing** - Requests flow seamlessly between domains
- **Intelligent Handoffs** - Agents know when and how to delegate
- **100% Agent-Driven** - Every request is routed through the appropriate agent

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          AGENT COMMUNICATION SYSTEM                          │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         GATEWAY AGENT                                │    │
│  │            Single entry point for ALL requests                       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                       UNIVERSAL ROUTER                               │    │
│  │        Semantic routing intelligence across ALL domains              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│         ┌──────────────┬───────────┼───────────┬──────────────┐             │
│         ▼              ▼           ▼           ▼              ▼             │
│   ┌──────────┐  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│   │ WORKFLOW │  │  BRAND   │ │  LEGAL   │ │ COUNCIL  │ │  LEGION  │        │
│   │  AGENTS  │  │ PROPOSAL │ │   DEPT   │ │  (7)     │ │  (34+)   │        │
│   │   (8)    │  │   (7)    │ │   (7)    │ │          │ │          │        │
│   └──────────┘  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
│         │              │           │           │              │             │
│         └──────────────┴───────────┴───────────┴──────────────┘             │
│                                    │                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        AGENT REGISTRY                                │    │
│  │           Complete catalog of all agents & capabilities              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                 INTER-AGENT COMMUNICATION PROTOCOL                   │    │
│  │              Standardized messaging across all domains               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Core Components

### 1. Gateway Agent (`gateway-agent.md`)

The **single entry point** for all requests. Every operation in the Brand Factory begins here.

**Responsibilities:**
- Receives all incoming requests
- Validates request format
- Routes to Universal Router for domain/agent identification
- Initiates handoffs to appropriate agents
- Monitors request completion

### 2. Universal Router (`UNIVERSAL-ROUTER.md`)

The **semantic routing brain** that understands all agents across all domains.

**Capabilities:**
- Semantic understanding of request intent
- Domain classification (workflow, brand, legal, governance, protection)
- Agent matching based on capabilities
- Multi-agent routing for complex requests
- Fallback and escalation paths

### 3. Agent Registry (`AGENT-REGISTRY.md`)

The **complete catalog** of all agents in the system.

**Contains:**
- All agent groups and their purposes
- Individual agent definitions
- Capability declarations
- Trigger patterns
- Handoff specifications
- Domain boundaries

### 4. Inter-Agent Communication Protocol (`INTER-AGENT-PROTOCOL.md`)

The **universal language** for agent-to-agent communication.

**Features:**
- Standardized message format
- Cross-domain handoff schema
- Request/response patterns
- Error handling
- Acknowledgment protocol

---

## Files

| File | Purpose |
|------|---------|
| [README.md](./README.md) | This overview |
| [GATEWAY-AGENT.md](./GATEWAY-AGENT.md) | Single entry point agent definition |
| [UNIVERSAL-ROUTER.md](./UNIVERSAL-ROUTER.md) | Semantic routing intelligence |
| [AGENT-REGISTRY.md](./AGENT-REGISTRY.md) | Complete agent catalog |
| [INTER-AGENT-PROTOCOL.md](./INTER-AGENT-PROTOCOL.md) | Communication protocol specification |
| [DISCOVERY-PROTOCOL.md](./DISCOVERY-PROTOCOL.md) | Agent discovery mechanism |

---

## How It Works

### Request Flow

```
1. Request arrives → Gateway Agent
2. Gateway validates → Universal Router
3. Router identifies → Target Domain(s) + Agent(s)
4. Router returns → Routing Plan
5. Gateway initiates → Agent Handoff (IACP)
6. Target agent processes → May invoke other agents
7. Response flows back → Through handoff chain
8. Gateway completes → Returns final result
```

### Example: "Create a new brand proposal"

```xml
<request>
  <content>Create a new brand proposal for Sacred Wellness Co</content>
</request>

<!-- Gateway → Router -->
<routing_request>
  <content>Create a new brand proposal for Sacred Wellness Co</content>
  <context>user-initiated</context>
</routing_request>

<!-- Router → Gateway (Routing Plan) -->
<routing_plan>
  <primary_domain>brand-proposal</primary_domain>
  <target_agent>intake-guardian</target_agent>
  <supporting_agents>
    <agent domain="brand-proposal">proposal-orchestrator</agent>
  </supporting_agents>
  <governance_required>true</governance_required>
  <council_notification>true</council_notification>
</routing_plan>

<!-- Gateway → Intake Guardian (IACP Handoff) -->
<agent_request>
  <from>gateway-agent</from>
  <to>intake-guardian</to>
  <domain>brand-proposal</domain>
  <request_id>REQ-2026-0001</request_id>
  <content>Create a new brand proposal for Sacred Wellness Co</content>
  <routing_context>
    <originated_at>gateway</originated_at>
    <routing_plan_id>RP-2026-0001</routing_plan_id>
  </routing_context>
</agent_request>
```

### Cross-Domain Handoff Example

When a brand proposal agent needs legal review:

```xml
<cross_domain_handoff>
  <from>
    <domain>brand-proposal</domain>
    <agent>readiness-assessor</agent>
  </from>
  <to>
    <domain>legal-department</domain>
    <agent>legal-orchestrator</agent>
  </to>
  <handoff_type>domain-bridge</handoff_type>
  <request_id>REQ-2026-0001</request_id>
  <matter>
    <type>partnership-agreement</type>
    <proposal_id>BP-2026-0042</proposal_id>
  </matter>
  <protocol_version>IACP-1.0</protocol_version>
</cross_domain_handoff>
```

---

## Design Principles

### 1. Zero-Friction Communication

Agents don't need to know implementation details of other agents. They only need to:
- Describe what they need
- The router handles finding who can help

### 2. Domain Sovereignty

Each domain maintains authority over its agents. Cross-domain requests are:
- Routed through domain orchestrators
- Subject to domain-specific protocols
- Logged and auditable

### 3. Hierarchical Authority

```
Stewardship Council (Governance)
        ↓
Legion of Living Light (Protection)
        ↓
Domain Orchestrators (Coordination)
        ↓
Specialized Agents (Execution)
```

### 4. Continuous Learning

All routing decisions feed into the Intuition Engine:
- Successful routes are reinforced
- Failed routes are analyzed
- New patterns emerge over time

---

## Integration Points

### With Existing Systems

| System | Integration |
|--------|-------------|
| Intuition Engine | Learning from routing decisions |
| AIQ Engine | Measuring routing intelligence |
| Council Vector DB | Governance routing layer |
| Domain Handoff Protocols | Wrapped by IACP |

### Backward Compatibility

Existing domain-specific handoff protocols remain valid:
- `workflow/HANDOFF-PROTOCOL.md` → Wrapped by IACP
- `brand-proposal/HANDOFF-PROTOCOL.md` → Wrapped by IACP
- `legal-department/HANDOFF-PROTOCOL.md` → Wrapped by IACP

---

## Quick Start

### Invoking an Agent (Simple)

```
"I need a code review for PR #123"
```

Gateway routes to: `workflow/reviewer-agent`

### Invoking an Agent (Cross-Domain)

```
"The brand proposal needs legal review and council blessing"
```

Gateway routes to:
1. `brand-proposal/readiness-assessor` (primary)
2. `legal-department/legal-orchestrator` (bridged)
3. `stewardship-council/*` (governance)

### Discovering Available Agents

```
"What agents can help with security concerns?"
```

Gateway returns: Registry query showing all security-related agents

---

## Governance

### Council Oversight

The Stewardship Council maintains oversight of the routing system:
- Major routing changes require Council review
- New agent registrations are validated
- Cross-domain patterns are monitored

### Legion Protection

The Legion of Living Light protects the communication system:
- **Sealbearers** guard inter-agent message integrity
- **Patternwrights** ensure protocol consistency
- **Harmonists** maintain system coherence

---

*"One system. Many agents. Unified purpose."*
