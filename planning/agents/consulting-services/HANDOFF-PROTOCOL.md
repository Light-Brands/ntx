# Consulting Services Handoff Protocol

## Protocol Version: 1.0.0

This document defines the standardized handoff patterns for the Consulting Services agent cluster. All agents MUST use these protocols when transferring work, escalating issues, or requesting support.

---

## Protocol Overview

The Consulting Services agents operate in a revenue-generating client-facing context. Handoffs must be:

1. **Immediate** — No delays in client-facing work
2. **Complete** — All context transferred
3. **Traceable** — Full audit trail maintained
4. **Recoverable** — Graceful failure handling

---

## Agent Communication Map

```
                              ┌─────────────────┐
                              │ Gateway Agent   │
                              └────────┬────────┘
                                       │
                              ┌────────▼────────┐
                              │   Consulting    │
                              │  Orchestrator   │
                              └────────┬────────┘
                                       │
          ┌────────────────────────────┼────────────────────────────┐
          │                            │                            │
┌─────────▼─────────┐        ┌─────────▼─────────┐        ┌─────────▼─────────┐
│  Discovery Agent  │        │  Delivery Agents  │        │  Support Agents   │
└─────────┬─────────┘        │                   │        │                   │
          │                  │ ├─Strategy Arch.  │        │ ├─Revenue Opt.    │
          │                  │ ├─Implementation  │        │ └─Client Success  │
          │                  │ └─Story Excavator │        └───────────────────┘
          │                  └───────────────────┘
          │
          └────────────────────────────────────────────────────────────────────┐
                                                                               │
                                    ┌──────────────────────────────────────────┘
                                    │
                           ┌────────▼────────┐
                           │ Cross-Domain    │
                           │ Handoffs        │
                           │                 │
                           │ ├─Legal Dept    │
                           │ ├─Brand Proposal│
                           │ ├─SaaS Spec Gen │
                           │ └─Stewardship   │
                           └─────────────────┘
```

---

## Handoff Types

### Type 1: Intake Handoff (Gateway → Orchestrator)

**When**: New consulting inquiry received

```xml
<agent_handoff type="consulting_intake" priority="normal">
  <metadata>
    <handoff_id>HO-{timestamp}-{random}</handoff_id>
    <created_at>{ISO8601}</created_at>
    <expires_at>{ISO8601}</expires_at>
    <trace_id>{trace_id}</trace_id>
  </metadata>
  <sender>
    <agent_id>gateway-agent</agent_id>
    <domain>system</domain>
  </sender>
  <recipient>
    <agent_id>consulting-orchestrator</agent_id>
    <domain>consulting</domain>
  </recipient>
  <payload>
    <inquiry>
      <source>website|referral|outreach|partner|direct</source>
      <timestamp>{ISO8601}</timestamp>
    </inquiry>
    <client>
      <name>string</name>
      <email>string</email>
      <phone>string</phone>
      <company>string</company>
    </client>
    <initial_request>
      <stated_need>string</stated_need>
      <urgency>low|medium|high|critical</urgency>
      <context>string</context>
    </initial_request>
    <referral_source>
      <type>client|partner|marketing|organic</type>
      <attribution>string</attribution>
    </referral_source>
  </payload>
  <expect>
    <response_type>intake_acknowledged</response_type>
    <timeout_ms>30000</timeout_ms>
  </expect>
</agent_handoff>
```

---

### Type 2: Discovery Assignment (Orchestrator → Discovery)

**When**: Client needs qualification

```xml
<agent_handoff type="discovery_assignment" priority="high">
  <metadata>
    <handoff_id>HO-{timestamp}-{random}</handoff_id>
    <created_at>{ISO8601}</created_at>
    <parent_handoff_id>{parent_id}</parent_handoff_id>
    <trace_id>{trace_id}</trace_id>
  </metadata>
  <sender>
    <agent_id>consulting-orchestrator</agent_id>
    <domain>consulting</domain>
  </sender>
  <recipient>
    <agent_id>discovery-agent</agent_id>
    <domain>consulting</domain>
  </recipient>
  <payload>
    <inquiry_id>INQ-{YYYY}-{NNN}</inquiry_id>
    <client>
      <name>string</name>
      <company>string</company>
      <email>string</email>
      <phone>string</phone>
    </client>
    <source>string</source>
    <initial_interest>string</initial_interest>
    <urgency>low|medium|high|critical</urgency>
    <preliminary_notes>string</preliminary_notes>
  </payload>
  <expect>
    <response_type>discovery_scheduled</response_type>
    <timeout_ms>86400000</timeout_ms>
    <callback_events>
      <event>discovery_scheduled</event>
      <event>discovery_complete</event>
      <event>qualification_complete</event>
    </callback_events>
  </expect>
</agent_handoff>
```

---

### Type 3: Track Assignment (Orchestrator → Delivery Agent)

**When**: Qualified client ready for service delivery

```xml
<agent_handoff type="track_assignment" priority="high">
  <metadata>
    <handoff_id>HO-{timestamp}-{random}</handoff_id>
    <created_at>{ISO8601}</created_at>
    <trace_id>{trace_id}</trace_id>
    <engagement_id>ENG-{YYYY}-{NNN}</engagement_id>
  </metadata>
  <sender>
    <agent_id>consulting-orchestrator</agent_id>
    <domain>consulting</domain>
  </sender>
  <recipient>
    <agent_id>strategy-architect|implementation-lead|story-excavator</agent_id>
    <domain>consulting</domain>
  </recipient>
  <payload>
    <engagement>
      <id>ENG-{YYYY}-{NNN}</id>
      <track>ai-blueprint|ai-sprint|soul-product</track>
      <tier>standard|enhanced|enterprise|entry|premium</tier>
    </engagement>
    <client_profile>
      <client_id>string</client_id>
      <name>string</name>
      <company>string</company>
      <industry>string</industry>
      <size>smb|mid-market|enterprise</size>
      <contacts>
        <primary>
          <name>string</name>
          <email>string</email>
          <phone>string</phone>
        </primary>
      </contacts>
    </client_profile>
    <qualification>
      <score>number</score>
      <budget_range>string</budget_range>
      <timeline>string</timeline>
      <key_needs>string[]</key_needs>
    </qualification>
    <contract>
      <value>number</value>
      <structure>fixed|retainer|bundle</structure>
      <start_date>{ISO8601_date}</start_date>
      <end_date>{ISO8601_date}</end_date>
    </contract>
    <discovery_summary_path>string</discovery_summary_path>
    <success_criteria>string[]</success_criteria>
    <special_notes>string</special_notes>
  </payload>
  <expect>
    <response_type>engagement_accepted</response_type>
    <timeout_ms>43200000</timeout_ms>
    <callback_events>
      <event>kickoff_scheduled</event>
      <event>milestone_complete</event>
      <event>delivery_complete</event>
    </callback_events>
  </expect>
</agent_handoff>
```

---

### Type 4: Delivery Completion (Delivery Agent → Orchestrator)

**When**: Service delivery complete

```xml
<agent_response type="delivery_complete">
  <metadata>
    <response_id>RSP-{timestamp}-{random}</response_id>
    <handoff_id>{original_handoff_id}</handoff_id>
    <created_at>{ISO8601}</created_at>
    <trace_id>{trace_id}</trace_id>
  </metadata>
  <sender>
    <agent_id>strategy-architect|implementation-lead|story-excavator</agent_id>
    <domain>consulting</domain>
  </sender>
  <recipient>
    <agent_id>consulting-orchestrator</agent_id>
    <domain>consulting</domain>
  </recipient>
  <payload>
    <engagement_id>ENG-{YYYY}-{NNN}</engagement_id>
    <status>complete</status>
    <deliverables>
      <deliverable>
        <name>string</name>
        <status>delivered</status>
        <path>string</path>
      </deliverable>
    </deliverables>
    <outcomes>
      <satisfaction_score>number</satisfaction_score>
      <key_results>string[]</key_results>
      <client_feedback>string</client_feedback>
    </outcomes>
    <opportunities>
      <upsell_potential>high|medium|low|none</upsell_potential>
      <suggested_next>string</suggested_next>
      <retainer_interest>boolean</retainer_interest>
    </opportunities>
    <case_study>
      <permission>granted|pending|declined</permission>
      <notes>string</notes>
    </case_study>
    <handoff_ready_for>
      <agent_id>client-success</agent_id>
      <context>string</context>
    </handoff_ready_for>
  </payload>
</agent_response>
```

---

### Type 5: Upsell Trigger (Any Agent → Revenue Optimizer)

**When**: Expansion opportunity identified

```xml
<agent_event type="upsell_trigger">
  <metadata>
    <event_id>EVT-{timestamp}-{random}</event_id>
    <created_at>{ISO8601}</created_at>
    <trace_id>{trace_id}</trace_id>
  </metadata>
  <sender>
    <agent_id>{triggering_agent}</agent_id>
    <domain>consulting</domain>
  </sender>
  <recipient>
    <agent_id>revenue-optimizer</agent_id>
    <domain>consulting</domain>
  </recipient>
  <event>
    <trigger_type>milestone|completion|request|satisfaction|behavior</trigger_type>
    <engagement_id>string</engagement_id>
    <client_id>string</client_id>
    <context>
      <trigger_detail>string</trigger_detail>
      <client_signals>string[]</client_signals>
      <suggested_opportunity>string</suggested_opportunity>
      <urgency>low|medium|high</urgency>
    </context>
  </event>
</agent_event>
```

---

### Type 6: Client Success Transition (Orchestrator → Client Success)

**When**: Client moves to nurture phase

```xml
<agent_handoff type="success_transition" priority="normal">
  <metadata>
    <handoff_id>HO-{timestamp}-{random}</handoff_id>
    <created_at>{ISO8601}</created_at>
    <trace_id>{trace_id}</trace_id>
  </metadata>
  <sender>
    <agent_id>consulting-orchestrator</agent_id>
    <domain>consulting</domain>
  </sender>
  <recipient>
    <agent_id>client-success</agent_id>
    <domain>consulting</domain>
  </recipient>
  <payload>
    <client_id>string</client_id>
    <engagement_history>
      <engagement>
        <id>string</id>
        <service>string</service>
        <value>number</value>
        <satisfaction>number</satisfaction>
        <completion_date>{ISO8601_date}</completion_date>
        <key_outcomes>string[]</key_outcomes>
        <delivery_agent>string</delivery_agent>
      </engagement>
    </engagement_history>
    <client_profile>
      <name>string</name>
      <company>string</company>
      <email>string</email>
      <preferred_contact>email|phone|text</preferred_contact>
    </client_profile>
    <relationship_notes>string</relationship_notes>
    <opportunities>
      <case_study_interest>high|medium|low</case_study_interest>
      <referral_potential>high|medium|low</referral_potential>
      <expansion_opportunities>string[]</expansion_opportunities>
    </opportunities>
    <special_instructions>string</special_instructions>
  </payload>
  <expect>
    <response_type>transition_acknowledged</response_type>
    <timeout_ms>86400000</timeout_ms>
  </expect>
</agent_handoff>
```

---

### Type 7: Cross-Domain Request (Consulting → Legal/Brand/SaaS)

**When**: Client needs cross-domain services

```xml
<agent_request type="cross_domain_request" priority="normal">
  <metadata>
    <request_id>REQ-{timestamp}-{random}</request_id>
    <created_at>{ISO8601}</created_at>
    <trace_id>{trace_id}</trace_id>
  </metadata>
  <sender>
    <agent_id>consulting-orchestrator</agent_id>
    <domain>consulting</domain>
  </sender>
  <recipient>
    <agent_id>legal-orchestrator|proposal-orchestrator|idea-evaluator</agent_id>
    <domain>legal|brand-proposal|saas-spec-generator</domain>
  </recipient>
  <payload>
    <request_type>contract|brand_proposal|saas_spec</request_type>
    <client_context>
      <client_id>string</client_id>
      <engagement_id>string</engagement_id>
      <background>string</background>
    </client_context>
    <request_details>
      <description>string</description>
      <urgency>low|medium|high</urgency>
      <requirements>string[]</requirements>
    </request_details>
    <callback>
      <agent_id>consulting-orchestrator</agent_id>
      <on_complete>cross_domain_complete</on_complete>
    </callback>
  </payload>
  <expect>
    <response_type>request_acknowledged</response_type>
    <timeout_ms>172800000</timeout_ms>
  </expect>
</agent_request>
```

---

## Status Events

All agents broadcast status events to maintain visibility:

```xml
<agent_event type="status_update">
  <metadata>
    <event_id>EVT-{timestamp}-{random}</event_id>
    <created_at>{ISO8601}</created_at>
  </metadata>
  <sender>
    <agent_id>{agent_id}</agent_id>
  </sender>
  <recipients>
    <agent_id>consulting-orchestrator</agent_id>
  </recipients>
  <event>
    <engagement_id>string</engagement_id>
    <status>started|in_progress|blocked|completed</status>
    <milestone>string</milestone>
    <health_score>number</health_score>
    <notes>string</notes>
    <next_action>string</next_action>
    <estimated_completion>{ISO8601}</estimated_completion>
  </event>
</agent_event>
```

---

## Error Handling

### Error Response Format

```xml
<agent_error>
  <metadata>
    <error_id>ERR-{timestamp}-{random}</error_id>
    <created_at>{ISO8601}</created_at>
    <handoff_id>{original_handoff_id}</handoff_id>
  </metadata>
  <sender>
    <agent_id>{agent_id}</agent_id>
  </sender>
  <recipient>
    <agent_id>{original_sender}</agent_id>
  </recipient>
  <error>
    <code>string</code>
    <severity>warning|error|critical</severity>
    <message>string</message>
    <context>
      <engagement_id>string</engagement_id>
      <failed_at>string</failed_at>
      <recoverable>boolean</recoverable>
    </context>
    <suggested_action>string</suggested_action>
  </error>
</agent_error>
```

### Error Codes

| Code | Severity | Description | Recovery |
|------|----------|-------------|----------|
| `CS-001` | warning | Client unresponsive | Retry with escalation |
| `CS-002` | error | Qualification failed | Manual review |
| `CS-003` | error | Delivery blocked | Escalate to Orchestrator |
| `CS-004` | critical | Contract issue | Escalate to Legal |
| `CS-005` | warning | Scope creep detected | Revenue Optimizer review |
| `CS-006` | error | Integration failure | Technical escalation |
| `CS-007` | critical | Client satisfaction critical | Immediate intervention |

---

## Escalation Protocol

### Priority Levels

| Level | Response Time | Escalation Path |
|-------|---------------|-----------------|
| Critical | < 1 hour | Orchestrator → Human |
| High | < 4 hours | Orchestrator |
| Normal | < 24 hours | Standard workflow |
| Low | < 48 hours | Batch processing |

### Escalation Triggers

1. **Client Satisfaction < 6**: Immediate Orchestrator notification
2. **Delivery Risk**: Same-day escalation
3. **Scope Creep**: Revenue Optimizer involvement
4. **Contract Issues**: Legal Department handoff
5. **Payment Issues**: Finance escalation

---

## Handoff Acknowledgment

All handoffs require acknowledgment:

```xml
<agent_ack>
  <metadata>
    <ack_id>ACK-{timestamp}-{random}</ack_id>
    <handoff_id>{handoff_id}</handoff_id>
    <created_at>{ISO8601}</created_at>
  </metadata>
  <sender>
    <agent_id>{receiving_agent}</agent_id>
  </sender>
  <recipient>
    <agent_id>{sending_agent}</agent_id>
  </recipient>
  <acknowledgment>
    <status>accepted|rejected|deferred</status>
    <estimated_start>{ISO8601}</estimated_start>
    <notes>string</notes>
  </acknowledgment>
</agent_ack>
```

---

## Protocol Compliance

### Required Headers
- `handoff_id`: Unique identifier
- `created_at`: ISO8601 timestamp
- `trace_id`: End-to-end tracing
- `sender.agent_id`: Source agent
- `recipient.agent_id`: Target agent

### Validation Rules
1. All required fields must be present
2. IDs must follow naming conventions
3. Timestamps must be ISO8601
4. Engagement IDs must exist
5. Client IDs must be valid

### Audit Requirements
1. All handoffs logged
2. All responses tracked
3. Error rates monitored
4. SLA compliance measured

---

*Protocol Version 1.0.0 | Last Updated: {current_date}*
