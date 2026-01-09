# Legal Department Handoff Protocol

This document defines the standard protocol for agent-to-agent communication within the Legal Department.

## Overview

Legal agents communicate via structured XML handoffs. Each handoff contains:
- Source and destination agent
- Matter identifier
- Request type and priority
- Relevant data and documents
- Instructions and deadlines

## Handoff Structure

```xml
<legal-handoff>
  <matter_id>LM-2024-0001</matter_id>
  <from>source-agent</from>
  <to>target-agent</to>
  <timestamp>2024-01-15T10:30:00Z</timestamp>
  <request_type>type-of-request</request_type>
  <priority>critical|high|medium|low</priority>
  <deadline>2024-01-30</deadline>
  <status>success|failure|blocked|pending</status>
  <data>
    <!-- Request-specific payload -->
  </data>
  <documents>
    <document path="/legal-vault/..." type="contract|agreement|etc"/>
  </documents>
  <instructions>Specific guidance for receiving agent</instructions>
</legal-handoff>
```

## Agent-Specific Handoffs

### Legal Orchestrator → Contract Guardian

```xml
<legal-handoff>
  <matter_id>LM-2024-0001</matter_id>
  <from>legal-orchestrator</from>
  <to>contract-guardian</to>
  <request_type>contract-review</request_type>
  <priority>high</priority>
  <deadline>2024-01-25</deadline>
  <data>
    <contract_type>vendor-agreement</contract_type>
    <counterparty>Acme Corp</counterparty>
    <estimated_value currency="USD">500000</estimated_value>
    <term>24 months</term>
    <requester>procurement@company.com</requester>
    <context>New SaaS vendor for customer analytics</context>
  </data>
  <documents>
    <document path="/legal-vault/contracts/draft_acme-corp_2024-01-15.pdf" type="draft-contract"/>
  </documents>
  <instructions>
    Full contract review with focus on data processing provisions.
    Counterparty has been resistant to liability caps in past deals.
  </instructions>
</legal-handoff>
```

### Contract Guardian → Risk Assessor

```xml
<legal-handoff>
  <matter_id>LM-2024-0001</matter_id>
  <from>contract-guardian</from>
  <to>risk-assessor</to>
  <request_type>contract-risk-evaluation</request_type>
  <priority>high</priority>
  <data>
    <contract_type>vendor-agreement</contract_type>
    <counterparty>Acme Corp</counterparty>
    <contract_value currency="USD">500000</contract_value>
    <term>24 months</term>
    <review_status>complete</review_status>
  </data>
  <issues_identified>
    <issue severity="critical">
      <clause>Section 8.2</clause>
      <provision>Unlimited liability for data breaches</provision>
      <risk>Uncapped financial exposure for breach of customer data</risk>
      <recommendation>Negotiate cap at 2x annual fees with carve-out</recommendation>
    </issue>
    <issue severity="high">
      <clause>Section 12.1</clause>
      <provision>Governing law: United Kingdom</provision>
      <risk>Foreign jurisdiction increases enforcement costs</risk>
      <recommendation>Negotiate to Delaware or neutral arbitration</recommendation>
    </issue>
    <issue severity="medium">
      <clause>Section 3.4</clause>
      <provision>Auto-renewal with 90-day notice</provision>
      <risk>Missed renewal window could lock us in</risk>
      <recommendation>Add calendar reminder; negotiate to 60-day notice</recommendation>
    </issue>
  </issues_identified>
  <documents>
    <document path="/legal-vault/contracts/draft_acme-corp_2024-01-15_redlined.pdf" type="redlined-contract"/>
  </documents>
  <instructions>
    Evaluate overall risk profile given identified issues.
    Recommend proceed/negotiate/walk-away with rationale.
  </instructions>
</legal-handoff>
```

### Risk Assessor → Legal Counsel

```xml
<legal-handoff>
  <matter_id>LM-2024-0001</matter_id>
  <from>risk-assessor</from>
  <to>legal-counsel</to>
  <request_type>strategic-guidance</request_type>
  <priority>high</priority>
  <data>
    <contract_type>vendor-agreement</contract_type>
    <counterparty>Acme Corp</counterparty>
    <contract_value currency="USD">500000</contract_value>
  </data>
  <risk_summary>
    <overall_score>18</overall_score>
    <classification>high</classification>
    <key_exposure>$5M+ potential liability from data breach clause</key_exposure>
    <business_context>Vendor provides critical analytics capability</business_context>
  </risk_summary>
  <analysis>
    <risk id="R1">
      <description>Unlimited data breach liability</description>
      <probability>3</probability>
      <impact>5</impact>
      <score>15</score>
      <mitigation_options>
        <option>Negotiate cap at 2x annual fees ($1M)</option>
        <option>Require vendor to carry $5M cyber insurance</option>
        <option>Add specific breach cooperation obligations</option>
      </mitigation_options>
    </risk>
    <risk id="R2">
      <description>Foreign jurisdiction (UK)</description>
      <probability>2</probability>
      <impact>3</impact>
      <score>6</score>
    </risk>
  </analysis>
  <recommendation>
    Do not proceed without liability cap and insurance requirements.
    Business value significant but does not justify unlimited exposure.
    Recommend negotiation strategy with walk-away threshold.
  </recommendation>
  <decision_needed>
    Approve negotiation strategy or escalate to leadership for risk acceptance decision
  </decision_needed>
</legal-handoff>
```

### Contract Guardian → Agreement Keeper (Executed)

```xml
<legal-handoff>
  <matter_id>LM-2024-0001</matter_id>
  <from>contract-guardian</from>
  <to>agreement-keeper</to>
  <request_type>file-executed-agreement</request_type>
  <status>success</status>
  <data>
    <contract_type>vendor-agreement</contract_type>
    <counterparty>Acme Corp</counterparty>
    <status>fully-executed</status>
    <effective_date>2024-02-01</effective_date>
    <expiration_date>2026-01-31</expiration_date>
    <value currency="USD">500000</value>
    <payment_terms>annual-upfront</payment_terms>
    <governing_law>Delaware</governing_law>
    <renewal>
      <type>auto-renew</type>
      <term>12 months</term>
      <notice_period>60 days</notice_period>
    </renewal>
  </data>
  <key_dates>
    <date type="renewal-notice" date="2025-12-02">60-day renewal notice deadline</date>
    <date type="annual-review" date="2025-02-01">First anniversary review</date>
    <date type="insurance-renewal" date="2025-02-01">Verify vendor insurance renewal</date>
  </key_dates>
  <obligations>
    <obligation party="us" frequency="monthly">
      Submit usage data by 15th of each month
    </obligation>
    <obligation party="counterparty" frequency="quarterly">
      Provide SOC 2 attestation status
    </obligation>
    <obligation party="counterparty" frequency="continuous">
      Maintain 99.9% uptime SLA
    </obligation>
  </obligations>
  <documents>
    <document path="/legal-vault/contracts/vendor/contract_acme-corp_2024-02-01_executed.pdf" type="executed-contract"/>
    <document path="/legal-vault/contracts/vendor/sow_acme-corp_2024-02-01_executed.pdf" type="sow"/>
    <document path="/legal-vault/compliance/dpa_acme-corp_2024-02-01_executed.pdf" type="dpa"/>
  </documents>
</legal-handoff>
```

### Legal Orchestrator → Compliance Sentinel

```xml
<legal-handoff>
  <matter_id>LM-2024-0002</matter_id>
  <from>legal-orchestrator</from>
  <to>compliance-sentinel</to>
  <request_type>compliance-assessment</request_type>
  <priority>high</priority>
  <deadline>2024-02-15</deadline>
  <data>
    <compliance_domain>data-privacy</compliance_domain>
    <regulation>GDPR</regulation>
    <trigger>New product launch with EU customers</trigger>
    <context>Launching customer analytics feature that processes EU personal data</context>
  </data>
  <scope>
    <item>Data Processing Impact Assessment (DPIA)</item>
    <item>Legal basis determination</item>
    <item>Privacy notice updates</item>
    <item>Vendor DPA requirements</item>
  </scope>
  <documents>
    <document path="/planning/products/analytics-feature-spec.md" type="product-spec"/>
  </documents>
  <instructions>
    Complete DPIA before product launch.
    Coordinate with IP Protector on any data-related IP considerations.
  </instructions>
</legal-handoff>
```

### Compliance Sentinel → Agreement Keeper

```xml
<legal-handoff>
  <matter_id>LM-2024-0002</matter_id>
  <from>compliance-sentinel</from>
  <to>agreement-keeper</to>
  <request_type>dpa-required</request_type>
  <priority>high</priority>
  <deadline>2024-02-01</deadline>
  <data>
    <requirement>Data Processing Agreement</requirement>
    <vendor>Cloud Analytics Inc</vendor>
    <regulation>GDPR Article 28</regulation>
    <context>Vendor will process EU customer data for analytics feature</context>
  </data>
  <special_provisions>
    <provision>Sub-processor notification required</provision>
    <provision>EU data residency commitment</provision>
    <provision>Standard Contractual Clauses attachment</provision>
  </special_provisions>
  <template>/legal-vault/templates/dpa_template_gdpr_v2.docx</template>
  <instructions>
    Create DPA tracking entry.
    Route to Contract Guardian for execution.
    Must be signed before processing begins.
  </instructions>
</legal-handoff>
```

### Legal Orchestrator → IP Protector

```xml
<legal-handoff>
  <matter_id>LM-2024-0003</matter_id>
  <from>legal-orchestrator</from>
  <to>ip-protector</to>
  <request_type>trademark-filing</request_type>
  <priority>medium</priority>
  <deadline>2024-03-15</deadline>
  <data>
    <ip_type>trademark</ip_type>
    <mark>BrandName Pro</mark>
    <mark_type>word-mark</mark_type>
    <classes>
      <class number="9">Computer software</class>
      <class number="42">SaaS services</class>
    </classes>
    <jurisdictions>
      <jurisdiction>US</jurisdiction>
      <jurisdiction>EU</jurisdiction>
    </jurisdictions>
    <first_use_date>2024-01-15</first_use_date>
  </data>
  <documents>
    <document path="/brand/logos/brandname-pro-logo.png" type="specimen"/>
  </documents>
  <instructions>
    Conduct clearance search before filing.
    Coordinate with marketing on specimen preparation.
  </instructions>
</legal-handoff>
```

### IP Protector → Risk Assessor (Infringement)

```xml
<legal-handoff>
  <matter_id>LM-2024-0004</matter_id>
  <from>ip-protector</from>
  <to>risk-assessor</to>
  <request_type>infringement-risk-assessment</request_type>
  <priority>high</priority>
  <data>
    <ip_type>trademark</ip_type>
    <our_asset>Brand Logo</our_asset>
    <infringement_type>counterfeiting</infringement_type>
    <infringer>Unknown seller on Amazon</infringer>
    <platform>Amazon.com</platform>
    <first_detected>2024-01-15</first_detected>
    <estimated_volume>500+ units/month</estimated_volume>
  </data>
  <evidence>
    <item type="screenshot" path="/legal-vault/ip/evidence/amazon_infringement_2024-01-15.png"/>
    <item type="url">https://amazon.com/dp/BXXXXXXXXX</item>
    <item type="test-purchase" order="111-XXXXXXX-XXXXXXX"/>
  </evidence>
  <preliminary_assessment>
    Clear trademark infringement. Counterfeit products damaging brand reputation.
    Consumer confusion likely. Safety concerns possible with counterfeit goods.
  </preliminary_assessment>
  <instructions>
    Assess reputational and financial risk.
    Recommend enforcement strategy: takedown, investigation, litigation.
  </instructions>
</legal-handoff>
```

### Agreement Keeper → Legal Orchestrator (Expiration Alert)

```xml
<legal-handoff>
  <from>agreement-keeper</from>
  <to>legal-orchestrator</to>
  <alert_type>expiration-warning</alert_type>
  <priority>high</priority>
  <timestamp>2024-01-15T09:00:00Z</timestamp>
  <data>
    <alert_window>60 days</alert_window>
    <agreements_count>3</agreements_count>
  </data>
  <agreements>
    <agreement id="AGR-2023-0045">
      <counterparty>Cloud Services Inc</counterparty>
      <type>vendor-agreement</type>
      <expiration_date>2024-03-15</expiration_date>
      <days_remaining>59</days_remaining>
      <renewal_type>auto-renew</renewal_type>
      <notice_deadline>2024-02-14</notice_deadline>
      <value currency="USD">120000</value>
      <owner>it@company.com</owner>
      <action_required>Decide: renew, renegotiate, or terminate by Feb 14</action_required>
    </agreement>
    <agreement id="AGR-2023-0067">
      <counterparty>Marketing Agency LLC</counterparty>
      <type>services-agreement</type>
      <expiration_date>2024-03-20</expiration_date>
      <days_remaining>64</days_remaining>
      <renewal_type>manual</renewal_type>
      <value currency="USD">85000</value>
      <owner>marketing@company.com</owner>
      <action_required>Initiate renewal discussions if continuing</action_required>
    </agreement>
    <agreement id="AGR-2023-0012">
      <counterparty>Jane Smith</counterparty>
      <type>nda</type>
      <expiration_date>2024-03-10</expiration_date>
      <days_remaining>54</days_remaining>
      <renewal_type>manual</renewal_type>
      <owner>hr@company.com</owner>
      <action_required>Determine if NDA still needed; renew or let expire</action_required>
    </agreement>
  </agreements>
  <recommendation>
    Contact agreement owners to determine renewal intentions.
    Prioritize Cloud Services Inc due to auto-renewal notice deadline.
  </recommendation>
</legal-handoff>
```

## Workflow Complete Handoff

### Matter Closed

```xml
<legal-matter-complete>
  <matter_id>LM-2024-0001</matter_id>
  <title>Acme Corp Vendor Agreement</title>
  <type>contract-review</type>
  <status>completed</status>
  <opened>2024-01-15T10:00:00Z</opened>
  <closed>2024-02-05T14:30:00Z</closed>
  <cycle_time>21 days</cycle_time>
  <outcome>
    <result>Contract executed with negotiated terms</result>
    <value_protected>$4.5M liability cap negotiated (down from unlimited)</value_protected>
    <key_wins>
      <win>Liability cap at 2x annual fees</win>
      <win>Delaware governing law (vs UK)</win>
      <win>60-day renewal notice (vs 90-day)</win>
      <win>Vendor cyber insurance requirement added</win>
    </key_wins>
  </outcome>
  <agents_involved>
    <agent name="legal-orchestrator" role="coordination"/>
    <agent name="contract-guardian" role="review-and-negotiation"/>
    <agent name="risk-assessor" role="risk-evaluation"/>
    <agent name="legal-counsel" role="strategy-guidance"/>
    <agent name="agreement-keeper" role="filing"/>
  </agents_involved>
  <documents_filed>
    <document path="/legal-vault/contracts/vendor/contract_acme-corp_2024-02-01_executed.pdf"/>
    <document path="/legal-vault/contracts/vendor/sow_acme-corp_2024-02-01_executed.pdf"/>
    <document path="/legal-vault/compliance/dpa_acme-corp_2024-02-01_executed.pdf"/>
  </documents_filed>
  <lessons_learned>
    <lesson>Vendor initially resistant to liability caps; persistence paid off</lesson>
    <lesson>Cyber insurance requirement was effective alternative to higher cap</lesson>
  </lessons_learned>
</legal-matter-complete>
```

## Status Codes

| Status | Meaning |
|--------|---------|
| `success` | Agent completed task successfully |
| `failure` | Agent encountered error, may need retry |
| `blocked` | External dependency preventing progress |
| `pending` | Task in progress |
| `escalated` | Matter escalated to human or senior agent |
| `deferred` | Task postponed with reason |

## Priority Definitions

| Priority | Response SLA | Resolution SLA | Examples |
|----------|--------------|----------------|----------|
| `critical` | 2 hours | 24 hours | Litigation threat, regulatory deadline |
| `high` | 4 hours | 3 days | Major contracts, compliance audits |
| `medium` | 24 hours | 7 days | Standard contracts, trademark filings |
| `low` | 48 hours | 14 days | Template updates, policy reviews |

## Error Handoffs

When an agent cannot complete a task:

```xml
<legal-handoff>
  <matter_id>LM-2024-0001</matter_id>
  <from>contract-guardian</from>
  <to>legal-orchestrator</to>
  <status>blocked</status>
  <error>
    <type>MissingInformation</type>
    <description>Cannot complete review - contract missing signature page</description>
    <blocking_issue>Document appears incomplete</blocking_issue>
    <attempted_resolution>Contacted requester, awaiting response</attempted_resolution>
    <suggested_action>Follow up with procurement for complete document</suggested_action>
  </error>
  <deadline_impact>Review delayed pending document receipt</deadline_impact>
</legal-handoff>
```

## Handoff Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       LEGAL DEPARTMENT HANDOFF FLOWS                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                          ┌──────────────────┐                                │
│                          │      Legal       │                                │
│                          │   Orchestrator   │                                │
│                          └────────┬─────────┘                                │
│                                   │                                          │
│          ┌────────────────────────┼────────────────────────┐                │
│          │            │           │           │            │                │
│          ▼            ▼           ▼           ▼            ▼                │
│    ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│    │ Contract │ │Compliance│ │    IP    │ │   Risk   │ │  Legal   │        │
│    │ Guardian │ │ Sentinel │ │Protector │ │ Assessor │ │ Counsel  │        │
│    └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘        │
│         │            │            │            │            │               │
│         │            │            │            │            │               │
│         └────────────┴────────────┴────────────┴────────────┘               │
│                                   │                                          │
│                                   ▼                                          │
│                          ┌──────────────────┐                                │
│                          │    Agreement     │                                │
│                          │     Keeper       │                                │
│                          └────────┬─────────┘                                │
│                                   │                                          │
│                                   ▼                                          │
│                          ┌──────────────────┐                                │
│                          │   Legal Vault    │                                │
│                          │   (Documents)    │                                │
│                          └──────────────────┘                                │
│                                                                              │
│  Handoff Types:                                                              │
│  ───────────▶  Request (new task)                                           │
│  - - - - - ▶  Response (completed task)                                     │
│  ═══════════▶  Escalation (needs higher authority)                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Integration with Other Agent Groups

| Agent Group | Integration Point | Handoff Type |
|-------------|-------------------|--------------|
| **Workflow Agents** | Legal review before PR merge | Review gate |
| **Stewardship Council** | Sacred exchange principles | Advisory input |
| **Legion of Living Light** | Brand and IP protection | Enforcement coordination |

## Extensibility

To add a new legal agent:

1. Create agent definition in `legal-department/`
2. Define input handoff schema (what data it receives)
3. Define output handoff schemas (success, failure, blocked)
4. Update Legal Orchestrator routing logic
5. Add to this handoff protocol document
6. Create entries in plugin.json
