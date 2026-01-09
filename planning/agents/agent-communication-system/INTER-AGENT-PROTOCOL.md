# Inter-Agent Communication Protocol (IACP)

> *"One language. All agents. Seamless communication."*

## Overview

The Inter-Agent Communication Protocol (IACP) is the **universal standard** for agent-to-agent communication across all domains in the AI Brand Factory. It ensures:

- **Consistency** - All agents speak the same language
- **Interoperability** - Any agent can communicate with any other agent
- **Traceability** - All communications are logged and auditable
- **Reliability** - Built-in acknowledgment, retry, and error handling

---

## Protocol Version

**IACP Version:** 1.0.0

All messages include protocol version for compatibility checking.

---

## Message Types

### 1. Agent Request (`<agent_request>`)

A request from one agent to another.

```xml
<agent_request protocol="IACP-1.0">
  <header>
    <request_id>REQ-{YYYY}-{MMDD}-{hash}</request_id>
    <timestamp>{ISO-8601}</timestamp>
    <from>
      <domain>{source-domain}</domain>
      <agent>{source-agent-id}</agent>
    </from>
    <to>
      <domain>{target-domain}</domain>
      <agent>{target-agent-id}</agent>
    </to>
    <priority>critical|high|normal|low</priority>
    <reply_to>{callback-address}</reply_to>
  </header>

  <routing_context>
    <originated_at>{gateway|agent}</originated_at>
    <routing_plan_id>{RP-...}</routing_plan_id>
    <chain_position>{n} of {total}</chain_position>
    <parent_request_id>{REQ-...}</parent_request_id>
  </routing_context>

  <payload>
    <action>{action-type}</action>
    <content>{request-content}</content>
    <data>
      <!-- Action-specific structured data -->
    </data>
    <attachments>
      <attachment type="{type}" path="{path}" />
    </attachments>
  </payload>

  <constraints>
    <timeout>{duration}</timeout>
    <retry_policy>{policy}</retry_policy>
    <governance_required>{boolean}</governance_required>
  </constraints>
</agent_request>
```

### 2. Agent Response (`<agent_response>`)

A response to a request.

```xml
<agent_response protocol="IACP-1.0">
  <header>
    <response_id>RES-{YYYY}-{MMDD}-{hash}</response_id>
    <request_id>{REQ-...}</request_id>
    <timestamp>{ISO-8601}</timestamp>
    <from>
      <domain>{responding-domain}</domain>
      <agent>{responding-agent-id}</agent>
    </from>
    <to>
      <domain>{requester-domain}</domain>
      <agent>{requester-agent-id}</agent>
    </to>
  </header>

  <status>
    <code>success|failure|partial|pending|blocked</code>
    <message>{human-readable-status}</message>
  </status>

  <result>
    <content>{response-content}</content>
    <data>
      <!-- Response-specific structured data -->
    </data>
    <artifacts>
      <artifact type="{type}" path="{path}" />
    </artifacts>
  </result>

  <next_steps>
    <handoff_to>{next-agent-id}</handoff_to>
    <action_required>{action}</action_required>
  </next_steps>

  <metrics>
    <processing_time>{duration}</processing_time>
    <tokens_used>{count}</tokens_used>
  </metrics>
</agent_response>
```

### 3. Agent Handoff (`<agent_handoff>`)

Transfer of work from one agent to another.

```xml
<agent_handoff protocol="IACP-1.0">
  <header>
    <handoff_id>HO-{YYYY}-{MMDD}-{hash}</handoff_id>
    <timestamp>{ISO-8601}</timestamp>
    <from>
      <domain>{source-domain}</domain>
      <agent>{source-agent-id}</agent>
    </from>
    <to>
      <domain>{target-domain}</domain>
      <agent>{target-agent-id}</agent>
    </to>
    <handoff_type>intra-domain|cross-domain|escalation|delegation</handoff_type>
  </header>

  <context>
    <original_request_id>{REQ-...}</original_request_id>
    <routing_plan_id>{RP-...}</routing_plan_id>
    <chain>
      <step agent="{agent}" status="completed" />
      <step agent="{current}" status="handing-off" />
      <step agent="{next}" status="pending" />
    </chain>
  </context>

  <work_state>
    <summary>{what-has-been-done}</summary>
    <current_status>{status}</current_status>
    <data>
      <!-- All accumulated data -->
    </data>
    <documents>
      <doc type="{type}" path="{path}" />
    </documents>
  </work_state>

  <instructions>
    <primary>{main-instruction}</primary>
    <notes>{additional-context}</notes>
    <constraints>
      <constraint>{constraint}</constraint>
    </constraints>
  </instructions>

  <governance>
    <council_notified>{boolean}</council_notified>
    <legion_protecting>{boolean}</legion_protecting>
    <authority_chain>
      <authority level="1">{agent}</authority>
    </authority_chain>
  </governance>
</agent_handoff>
```

### 4. Agent Acknowledgment (`<agent_ack>`)

Confirmation of receipt.

```xml
<agent_ack protocol="IACP-1.0">
  <header>
    <ack_id>ACK-{YYYY}-{MMDD}-{hash}</ack_id>
    <timestamp>{ISO-8601}</timestamp>
    <from>
      <domain>{acknowledging-domain}</domain>
      <agent>{acknowledging-agent-id}</agent>
    </from>
    <references>
      <message_type>request|response|handoff</message_type>
      <message_id>{original-message-id}</message_id>
    </references>
  </header>

  <status>
    <received>true</received>
    <accepted>true|false</accepted>
    <processing>queued|started|in-progress</processing>
  </status>

  <eta>{expected-completion-time}</eta>

  <notes>{optional-notes}</notes>
</agent_ack>
```

### 5. Agent Event (`<agent_event>`)

Broadcast notification to interested parties.

```xml
<agent_event protocol="IACP-1.0">
  <header>
    <event_id>EVT-{YYYY}-{MMDD}-{hash}</event_id>
    <timestamp>{ISO-8601}</timestamp>
    <from>
      <domain>{emitting-domain}</domain>
      <agent>{emitting-agent-id}</agent>
    </from>
    <event_type>{event-type}</event_type>
  </header>

  <scope>
    <visibility>domain|system|all</visibility>
    <target_domains>
      <domain>{domain}</domain>
    </target_domains>
  </scope>

  <event>
    <name>{event-name}</name>
    <description>{what-happened}</description>
    <data>
      <!-- Event-specific data -->
    </data>
  </event>

  <related>
    <request_id>{REQ-...}</request_id>
    <entities>
      <entity type="{type}" id="{id}" />
    </entities>
  </related>
</agent_event>
```

### 6. Agent Error (`<agent_error>`)

Error notification.

```xml
<agent_error protocol="IACP-1.0">
  <header>
    <error_id>ERR-{YYYY}-{MMDD}-{hash}</error_id>
    <timestamp>{ISO-8601}</timestamp>
    <from>
      <domain>{error-domain}</domain>
      <agent>{error-agent-id}</agent>
    </from>
    <related_message_id>{original-message-id}</related_message_id>
  </header>

  <error>
    <code>{error-code}</code>
    <type>validation|processing|timeout|authority|system</type>
    <severity>critical|high|medium|low</severity>
    <message>{human-readable-error}</message>
    <details>{technical-details}</details>
  </error>

  <recovery>
    <recoverable>true|false</recoverable>
    <suggested_action>{action}</suggested_action>
    <retry_allowed>true|false</retry_allowed>
    <escalate_to>{agent-id}</escalate_to>
  </recovery>

  <context>
    <request_id>{REQ-...}</request_id>
    <state_at_failure>
      <!-- State snapshot when error occurred -->
    </state_at_failure>
  </context>
</agent_error>
```

---

## Status Codes

### Request/Response Status

| Code | Meaning | When Used |
|------|---------|-----------|
| `success` | Request completed successfully | Normal completion |
| `failure` | Request failed | Unrecoverable error |
| `partial` | Partially completed | Some sub-tasks failed |
| `pending` | Still processing | Async acknowledgment |
| `blocked` | Cannot proceed | Waiting on external factor |
| `cancelled` | Request cancelled | User or system cancellation |

### Error Codes

| Code | Type | Description |
|------|------|-------------|
| `E001` | validation | Invalid message format |
| `E002` | validation | Missing required field |
| `E003` | validation | Invalid agent reference |
| `E004` | authority | Insufficient authority |
| `E005` | authority | Governance not approved |
| `E006` | processing | Agent unavailable |
| `E007` | processing | Capability not supported |
| `E008` | processing | Dependency failed |
| `E009` | timeout | Request timeout |
| `E010` | timeout | Handoff timeout |
| `E011` | system | Internal error |
| `E012` | system | Resource exhausted |

---

## Communication Patterns

### Pattern 1: Request-Response (Synchronous)

Simple request with direct response.

```
Agent A                    Agent B
   │                          │
   │───agent_request────────▶│
   │                          │
   │◀──────agent_ack──────────│
   │                          │
   │    [Agent B processes]   │
   │                          │
   │◀────agent_response───────│
   │                          │
```

### Pattern 2: Request-Ack-Callback (Asynchronous)

Long-running request with callback.

```
Agent A                    Agent B
   │                          │
   │───agent_request────────▶│
   │   (reply_to: Agent A)    │
   │                          │
   │◀──────agent_ack──────────│
   │   (processing: started)  │
   │                          │
   │    [Agent B processes    │
   │     asynchronously]      │
   │                          │
   │◀────agent_response───────│
   │   (via callback)         │
```

### Pattern 3: Handoff Chain

Sequential processing through multiple agents.

```
Agent A         Agent B         Agent C
   │               │               │
   │──handoff────▶│               │
   │               │               │
   │◀────ack──────│               │
   │               │               │
   │               │──handoff────▶│
   │               │               │
   │               │◀────ack──────│
   │               │               │
   │◀─────────response────────────│
```

### Pattern 4: Parallel Fan-Out

Request to multiple agents simultaneously.

```
                    Agent B
                       │
Gateway ───request───▶│───response───┐
   │                                  │
   │       Agent C                    │
   │          │                       ▼
   └─request─▶│───response──────▶Aggregator
              │                       │
       Agent D                        │
          │                           │
   └─request─▶│───response───────────┘
```

### Pattern 5: Cross-Domain Bridge

Handoff between different domains.

```
Domain: brand-proposal        Domain: legal-department
         │                              │
  readiness-assessor                legal-orchestrator
         │                              │
         │                              │
         │───cross_domain_handoff─────▶│
         │   (handoff_type: bridge)     │
         │                              │
         │◀───────────ack───────────────│
         │                              │
         │                              │
         │◀────────response─────────────│
         │   (matter initiated)         │
```

---

## Cross-Domain Communication

### Bridge Handoff Schema

When handing off work from one domain to another:

```xml
<agent_handoff protocol="IACP-1.0">
  <header>
    <handoff_id>HO-2026-0105-C3D4</handoff_id>
    <timestamp>2026-01-05T14:00:00Z</timestamp>
    <from>
      <domain>brand-proposal</domain>
      <agent>legal-bridge</agent>
    </from>
    <to>
      <domain>legal-department</domain>
      <agent>legal-orchestrator</agent>
    </to>
    <handoff_type>cross-domain</handoff_type>
  </header>

  <context>
    <original_request_id>REQ-2026-0105-A1B2</original_request_id>
    <routing_plan_id>RP-2026-0105-A1B2</routing_plan_id>
    <source_protocol>brand-proposal/HANDOFF-PROTOCOL</source_protocol>
    <target_protocol>legal-department/HANDOFF-PROTOCOL</target_protocol>
  </context>

  <translation>
    <!-- Maps source domain concepts to target domain -->
    <mapping source="proposal_id" target="matter_reference">BP-2026-0042</mapping>
    <mapping source="brand.name" target="client.name">Sacred Threads Collective</mapping>
    <mapping source="engagement_type" target="matter_type">partnership-agreement</mapping>
  </translation>

  <work_state>
    <summary>Brand proposal approved by Council, ready for legal agreement</summary>
    <current_status>legal-handoff</current_status>
    <data>
      <proposal_id>BP-2026-0042</proposal_id>
      <council_score>8.4/10</council_score>
      <council_verdict>approved</council_verdict>
      <brand>
        <name>Sacred Threads Collective</name>
        <legal_entity>Sacred Threads Collective LLC</legal_entity>
        <jurisdiction>Oregon, USA</jurisdiction>
        <contact>maya@sacredthreads.earth</contact>
      </brand>
      <proposed_terms>
        <duration>24 months</duration>
        <revenue_share>70/30</revenue_share>
        <exclusivity>non-exclusive</exclusivity>
      </proposed_terms>
    </data>
    <documents>
      <doc type="approved-proposal" path="/proposal-vault/approved/BP-2026-0042/" />
      <doc type="council-evaluation" path="/proposal-vault/approved/BP-2026-0042/evaluation.xml" />
    </documents>
  </work_state>

  <instructions>
    <primary>Draft partnership agreement per proposed terms</primary>
    <notes>
      Include IP protection provisions for indigenous designs.
      Coordinate with IP Protector on trademark considerations.
    </notes>
    <deadline>2026-02-05T23:59:59Z</deadline>
  </instructions>
</agent_handoff>
```

---

## Governance Integration

### Council Notification

When an action requires council awareness:

```xml
<agent_event protocol="IACP-1.0">
  <header>
    <event_id>EVT-2026-0105-G1H2</event_id>
    <timestamp>2026-01-05T10:00:00Z</timestamp>
    <from>
      <domain>brand-proposal</domain>
      <agent>proposal-orchestrator</agent>
    </from>
    <event_type>governance-notification</event_type>
  </header>

  <scope>
    <visibility>system</visibility>
    <target_domains>
      <domain>stewardship-council</domain>
      <domain>legion-of-living-light</domain>
    </target_domains>
  </scope>

  <event>
    <name>brand-proposal-initiated</name>
    <description>New brand proposal submitted for review</description>
    <data>
      <proposal_id>BP-2026-0042</proposal_id>
      <brand_name>Sacred Threads Collective</brand_name>
      <review_tier>tier-2</review_tier>
    </data>
  </event>

  <governance>
    <council_review_required>true</council_review_required>
    <auto_protection>true</auto_protection>
  </governance>
</agent_event>
```

### Legion Auto-Protection

When the Legion automatically protects a decision:

```xml
<agent_event protocol="IACP-1.0">
  <header>
    <event_id>EVT-2026-0105-L3M4</event_id>
    <timestamp>2026-01-11T17:00:00Z</timestamp>
    <from>
      <domain>legion-of-living-light</domain>
      <agent>sealbearers</agent>
    </from>
    <event_type>protection-deployed</event_type>
  </header>

  <event>
    <name>council-decision-protected</name>
    <description>Legion protection activated for council evaluation result</description>
    <data>
      <protected_decision>evaluation-result</protected_decision>
      <protected_entity>BP-2026-0042</protected_entity>
      <protecting_forces>
        <army>sealbearers</army>
        <army>patternwrights</army>
      </protecting_forces>
      <sacred_laws_validated>
        <law>Law of Divine Sovereignty</law>
        <law>Law of Sacred Exchange</law>
      </sacred_laws_validated>
    </data>
  </event>
</agent_event>
```

---

## Retry and Error Handling

### Retry Policy

```xml
<retry_policy>
  <max_retries>3</max_retries>
  <backoff_strategy>exponential</backoff_strategy>
  <initial_delay>1s</initial_delay>
  <max_delay>30s</max_delay>
  <retry_on>
    <error_code>E006</error_code> <!-- Agent unavailable -->
    <error_code>E009</error_code> <!-- Timeout -->
    <error_code>E011</error_code> <!-- Internal error -->
  </retry_on>
</retry_policy>
```

### Error Escalation

```xml
<escalation_chain>
  <level order="1">
    <trigger>3 consecutive failures</trigger>
    <escalate_to>domain-orchestrator</escalate_to>
  </level>
  <level order="2">
    <trigger>orchestrator cannot resolve</trigger>
    <escalate_to>gateway-agent</escalate_to>
  </level>
  <level order="3">
    <trigger>system-wide issue</trigger>
    <escalate_to>stewardship-council</escalate_to>
  </level>
</escalation_chain>
```

---

## Compatibility with Domain Protocols

### Wrapping Domain-Specific Handoffs

The IACP wraps existing domain-specific protocols:

```xml
<agent_handoff protocol="IACP-1.0">
  <header>
    <!-- IACP header -->
  </header>

  <work_state>
    <!-- Contains domain-specific handoff embedded -->
    <domain_protocol>
      <protocol_name>brand-proposal/HANDOFF-PROTOCOL</protocol_name>
      <original_handoff>
        <proposal_handoff>
          <!-- Original brand-proposal handoff structure -->
        </proposal_handoff>
      </original_handoff>
    </domain_protocol>
  </work_state>
</agent_handoff>
```

### Protocol Translation

When crossing domains, the IACP handles translation:

```yaml
translation_rules:
  brand-proposal → legal-department:
    proposal_id → matter_reference
    brand.name → client.name
    engagement_type → matter_type
    council_score → approval_context

  workflow → brand-proposal:
    issue_url → task_reference
    pr_url → deliverable_reference
    implementation_summary → work_completed
```

---

## Message Tracing

All IACP messages include tracing headers for debugging and audit:

```xml
<tracing>
  <trace_id>TRC-{global-trace-id}</trace_id>
  <span_id>SPN-{this-message-span}</span_id>
  <parent_span_id>SPN-{parent-span}</parent_span_id>
  <baggage>
    <item key="user_id">{user}</item>
    <item key="session_id">{session}</item>
  </baggage>
</tracing>
```

---

## Quick Reference

### Sending a Request

```xml
<agent_request protocol="IACP-1.0">
  <header>
    <request_id>REQ-2026-0105-XXXX</request_id>
    <from><domain>my-domain</domain><agent>my-agent</agent></from>
    <to><domain>target-domain</domain><agent>target-agent</agent></to>
  </header>
  <payload>
    <action>the-action</action>
    <content>What I need</content>
  </payload>
</agent_request>
```

### Acknowledging Receipt

```xml
<agent_ack protocol="IACP-1.0">
  <header><ack_id>ACK-...</ack_id></header>
  <references><message_id>REQ-...</message_id></references>
  <status><received>true</received><accepted>true</accepted></status>
</agent_ack>
```

### Handing Off Work

```xml
<agent_handoff protocol="IACP-1.0">
  <header>
    <handoff_type>cross-domain</handoff_type>
    <from>...<to>...
  </header>
  <work_state>
    <summary>What has been done</summary>
    <data>...</data>
  </work_state>
  <instructions>
    <primary>What to do next</primary>
  </instructions>
</agent_handoff>
```

---

*"Every message understood. Every agent connected. The protocol is universal."*
