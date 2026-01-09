# Brand Proposal Handoff Protocol

This document defines the structured communication format for handoffs between Brand Proposal agents and integration with external agent groups (Stewardship Council, Legal Department).

## Core Handoff Schema

All inter-agent communication within the Brand Proposal group follows this XML structure:

```xml
<proposal_handoff>
  <proposal_id>BP-{YYYY}-{sequential}</proposal_id>
  <from>{sending_agent}</from>
  <to>{receiving_agent}</to>
  <handoff_type>{type}</handoff_type>
  <priority>critical|high|medium|low</priority>
  <timestamp>{ISO-8601}</timestamp>
  <brand>
    <name>{brand_name}</name>
    <contact>{primary_contact}</contact>
  </brand>
  <status>
    <current_stage>{stage}</current_stage>
    <council_score>{score}/10</council_score>
    <iteration_count>{n}</iteration_count>
  </status>
  <data>
    <!-- Handoff-specific payload -->
  </data>
  <documents>
    <doc type="{type}" path="{vault_path}" />
  </documents>
  <instructions>{specific_guidance}</instructions>
</proposal_handoff>
```

## Handoff Types

### 1. Intake → Orchestrator: `intake-complete`

```xml
<proposal_handoff>
  <proposal_id>BP-2026-0042</proposal_id>
  <from>intake-guardian</from>
  <to>proposal-orchestrator</to>
  <handoff_type>intake-complete</handoff_type>
  <priority>medium</priority>
  <timestamp>2026-01-05T10:30:00Z</timestamp>
  <brand>
    <name>Sacred Threads Collective</name>
    <contact>maya@sacredthreads.earth</contact>
  </brand>
  <status>
    <current_stage>intake</current_stage>
    <council_score>pending</council_score>
    <iteration_count>0</iteration_count>
  </status>
  <data>
    <eligibility>confirmed</eligibility>
    <completeness>100%</completeness>
    <intake_notes>Strong initial alignment signals. Regenerative textile focus with indigenous partnership model.</intake_notes>
    <recommended_tier>tier-2</recommended_tier>
  </data>
  <documents>
    <doc type="proposal" path="/proposal-vault/incoming/BP-2026-0042-proposal.md" />
    <doc type="team-bios" path="/proposal-vault/incoming/BP-2026-0042-team.md" />
    <doc type="financials" path="/proposal-vault/incoming/BP-2026-0042-financials.md" />
  </documents>
  <instructions>Ready for council review routing. Recommend Tier 2 review based on standard pattern match.</instructions>
</proposal_handoff>
```

### 2. Orchestrator → Council Liaison: `council-review-request`

```xml
<proposal_handoff>
  <proposal_id>BP-2026-0042</proposal_id>
  <from>proposal-orchestrator</from>
  <to>council-liaison</to>
  <handoff_type>council-review-request</handoff_type>
  <priority>medium</priority>
  <timestamp>2026-01-05T10:35:00Z</timestamp>
  <brand>
    <name>Sacred Threads Collective</name>
    <contact>maya@sacredthreads.earth</contact>
  </brand>
  <status>
    <current_stage>under-review</current_stage>
    <council_score>pending</council_score>
    <iteration_count>0</iteration_count>
  </status>
  <data>
    <review_tier>tier-2</review_tier>
    <review_deadline>2026-01-12T23:59:59Z</review_deadline>
    <special_considerations>Indigenous partnership model requires Oracle of Soul Purpose and Flame of Cultural Restoration focus.</special_considerations>
  </data>
  <documents>
    <doc type="proposal-package" path="/proposal-vault/under-review/BP-2026-0042/" />
  </documents>
  <instructions>Initiate Tier 2 council review. Flag for additional attention on cultural restoration dimension.</instructions>
</proposal_handoff>
```

### 3. Council Liaison → Stewardship Council: `council-evaluation-request`

This handoff bridges to the Stewardship Council agent group:

```xml
<council_evaluation>
  <proposal_id>BP-2026-0042</proposal_id>
  <from>council-liaison</from>
  <to>stewardship-council</to>
  <evaluation_type>brand-proposal</evaluation_type>
  <review_tier>tier-2</review_tier>
  <deadline>2026-01-12T23:59:59Z</deadline>
  <brand>
    <name>Sacred Threads Collective</name>
    <summary>Regenerative textile brand with indigenous weaving partnerships</summary>
  </brand>
  <evaluation_dimensions>
    <dimension name="soul-purpose-alignment" weight="1.0" />
    <dimension name="gaia-harmony" weight="1.0" />
    <dimension name="sacred-systems-integration" weight="1.0" />
    <dimension name="cultural-restoration" weight="1.0" />
    <dimension name="collective-futures" weight="1.0" />
    <dimension name="exchange-stewardship" weight="1.0" />
    <dimension name="multiverse-reflection" weight="1.0" />
    <dimension name="indigenous-wisdom-honor" weight="1.0" />
    <dimension name="shadow-integration" weight="1.0" />
    <dimension name="governance-readiness" weight="1.0" />
  </evaluation_dimensions>
  <documents>
    <doc type="proposal-package" path="/proposal-vault/under-review/BP-2026-0042/" />
  </documents>
  <instructions>
    Conduct full evaluation across all 10 dimensions.
    Special attention requested on cultural-restoration and indigenous-wisdom-honor.
    Return aggregate score and individual dimension scores.
  </instructions>
</council_evaluation>
```

### 4. Stewardship Council → Council Liaison: `evaluation-result`

```xml
<evaluation_result>
  <proposal_id>BP-2026-0042</proposal_id>
  <from>stewardship-council</from>
  <to>council-liaison</to>
  <result_type>brand-proposal-evaluation</result_type>
  <timestamp>2026-01-11T16:45:00Z</timestamp>
  <scores>
    <aggregate>7.8</aggregate>
    <dimensions>
      <dimension name="soul-purpose-alignment" score="8" />
      <dimension name="gaia-harmony" score="9" />
      <dimension name="sacred-systems-integration" score="7" />
      <dimension name="cultural-restoration" score="9" />
      <dimension name="collective-futures" score="8" />
      <dimension name="exchange-stewardship" score="6" />
      <dimension name="multiverse-reflection" score="7" />
      <dimension name="indigenous-wisdom-honor" score="9" />
      <dimension name="shadow-integration" score="6" />
      <dimension name="governance-readiness" score="7" />
    </dimensions>
  </scores>
  <council_notes>
    <agent name="oracle-of-soul-purpose">Strong purpose alignment. Authentic vision.</agent>
    <agent name="guardian-of-gaia">Excellent regenerative model. Carbon-negative supply chain.</agent>
    <agent name="architect-of-sacred-systems">Technology integration needs refinement.</agent>
    <agent name="flame-of-cultural-restoration">Beautiful indigenous partnership. True reciprocity.</agent>
    <agent name="weaver-of-collective-futures">Community benefit model well-designed.</agent>
    <agent name="steward-of-exchange">Revenue model needs stress testing. Sustainability unclear.</agent>
    <agent name="mirror-of-the-multiverse">Scalability potential but not yet proven.</agent>
  </council_notes>
  <verdict>iterate</verdict>
  <improvement_areas>
    <area priority="high">Exchange stewardship - economic sustainability</area>
    <area priority="medium">Shadow integration - risk acknowledgment</area>
    <area priority="low">Sacred systems integration - technical clarity</area>
  </improvement_areas>
</evaluation_result>
```

### 5. Council Liaison → Feedback Architect: `feedback-request`

```xml
<proposal_handoff>
  <proposal_id>BP-2026-0042</proposal_id>
  <from>council-liaison</from>
  <to>feedback-architect</to>
  <handoff_type>feedback-request</handoff_type>
  <priority>high</priority>
  <timestamp>2026-01-11T17:00:00Z</timestamp>
  <brand>
    <name>Sacred Threads Collective</name>
    <contact>maya@sacredthreads.earth</contact>
  </brand>
  <status>
    <current_stage>feedback</current_stage>
    <council_score>7.8/10</council_score>
    <iteration_count>0</iteration_count>
  </status>
  <data>
    <verdict>iterate</verdict>
    <gap_to_threshold>0.2</gap_to_threshold>
    <dimension_scores>
      <!-- Full dimension breakdown -->
    </dimension_scores>
    <council_notes>
      <!-- Agent-specific feedback -->
    </council_notes>
    <improvement_areas>
      <area priority="high">Exchange stewardship - economic sustainability</area>
      <area priority="medium">Shadow integration - risk acknowledgment</area>
      <area priority="low">Sacred systems integration - technical clarity</area>
    </improvement_areas>
  </data>
  <documents>
    <doc type="evaluation-result" path="/proposal-vault/feedback/BP-2026-0042-evaluation.xml" />
  </documents>
  <instructions>Construct actionable improvement plan. Brand is close to threshold - focus on high-priority gaps.</instructions>
</proposal_handoff>
```

### 6. Feedback Architect → Proposal Refiner: `improvement-plan`

```xml
<proposal_handoff>
  <proposal_id>BP-2026-0042</proposal_id>
  <from>feedback-architect</from>
  <to>proposal-refiner</to>
  <handoff_type>improvement-plan</handoff_type>
  <priority>medium</priority>
  <timestamp>2026-01-11T18:30:00Z</timestamp>
  <brand>
    <name>Sacred Threads Collective</name>
    <contact>maya@sacredthreads.earth</contact>
  </brand>
  <status>
    <current_stage>feedback</current_stage>
    <council_score>7.8/10</council_score>
    <iteration_count>0</iteration_count>
  </status>
  <data>
    <improvement_plan>
      <action priority="high" dimension="exchange-stewardship">
        <title>Strengthen Economic Sustainability Model</title>
        <description>Current revenue model relies on wholesale partnerships without clear diversification. Need to demonstrate 3-year sustainability under multiple scenarios.</description>
        <specific_asks>
          <ask>Add financial stress test showing viability under 50% revenue reduction</ask>
          <ask>Identify 3+ alternative revenue streams</ask>
          <ask>Document cash reserve strategy</ask>
        </specific_asks>
        <resources>
          <resource>/proposal-vault/templates/financial-sustainability-guide.md</resource>
        </resources>
      </action>
      <action priority="medium" dimension="shadow-integration">
        <title>Acknowledge Supply Chain Risks</title>
        <description>Proposal presents idealized scenario without addressing potential challenges in indigenous partnerships or material sourcing.</description>
        <specific_asks>
          <ask>Document known risks in indigenous partnership model</ask>
          <ask>Identify supply chain vulnerabilities</ask>
          <ask>Propose mitigation strategies</ask>
        </specific_asks>
      </action>
      <action priority="low" dimension="sacred-systems-integration">
        <title>Clarify Technology Approach</title>
        <description>Technical implementation details are vague. Council needs clearer architecture.</description>
        <specific_asks>
          <ask>Provide system architecture diagram</ask>
          <ask>Specify key technology decisions</ask>
        </specific_asks>
      </action>
    </improvement_plan>
    <target_score>8.0</target_score>
    <estimated_effort>moderate</estimated_effort>
  </data>
  <documents>
    <doc type="improvement-plan" path="/proposal-vault/feedback/BP-2026-0042-improvement-plan.md" />
    <doc type="original-proposal" path="/proposal-vault/under-review/BP-2026-0042/" />
  </documents>
  <instructions>Work with brand to address improvement areas. Schedule revision support session. Target resubmission within 14 days.</instructions>
</proposal_handoff>
```

### 7. Proposal Refiner → Council Liaison: `revision-ready`

```xml
<proposal_handoff>
  <proposal_id>BP-2026-0042</proposal_id>
  <from>proposal-refiner</from>
  <to>council-liaison</to>
  <handoff_type>revision-ready</handoff_type>
  <priority>medium</priority>
  <timestamp>2026-01-20T14:00:00Z</timestamp>
  <brand>
    <name>Sacred Threads Collective</name>
    <contact>maya@sacredthreads.earth</contact>
  </brand>
  <status>
    <current_stage>under-review</current_stage>
    <council_score>pending</council_score>
    <iteration_count>1</iteration_count>
  </status>
  <data>
    <changes_made>
      <change dimension="exchange-stewardship">Added comprehensive financial stress testing and diversified revenue model</change>
      <change dimension="shadow-integration">Documented risks and mitigation strategies for supply chain and partnerships</change>
      <change dimension="sacred-systems-integration">Provided detailed technology architecture with clear decision rationale</change>
    </changes_made>
    <refinement_confidence>high</refinement_confidence>
    <brand_engagement>excellent</brand_engagement>
  </data>
  <documents>
    <doc type="revised-proposal" path="/proposal-vault/under-review/BP-2026-0042-v2/" />
    <doc type="change-summary" path="/proposal-vault/under-review/BP-2026-0042-v2/CHANGES.md" />
  </documents>
  <instructions>Request re-evaluation from Stewardship Council. Focus verification on previously flagged dimensions.</instructions>
</proposal_handoff>
```

### 8. Council Liaison → Readiness Assessor: `approval-verification`

```xml
<proposal_handoff>
  <proposal_id>BP-2026-0042</proposal_id>
  <from>council-liaison</from>
  <to>readiness-assessor</to>
  <handoff_type>approval-verification</handoff_type>
  <priority>high</priority>
  <timestamp>2026-01-22T10:00:00Z</timestamp>
  <brand>
    <name>Sacred Threads Collective</name>
    <contact>maya@sacredthreads.earth</contact>
  </brand>
  <status>
    <current_stage>readiness</current_stage>
    <council_score>8.4/10</council_score>
    <iteration_count>1</iteration_count>
  </status>
  <data>
    <council_verdict>approved</council_verdict>
    <dimension_scores>
      <dimension name="soul-purpose-alignment" score="8" />
      <dimension name="gaia-harmony" score="9" />
      <dimension name="sacred-systems-integration" score="8" />
      <dimension name="cultural-restoration" score="9" />
      <dimension name="collective-futures" score="8" />
      <dimension name="exchange-stewardship" score="8" />
      <dimension name="multiverse-reflection" score="8" />
      <dimension name="indigenous-wisdom-honor" score="9" />
      <dimension name="shadow-integration" score="8" />
      <dimension name="governance-readiness" score="8" />
    </dimension_scores>
    <council_endorsements>
      <endorsement agent="guardian-of-gaia">Strong regenerative vision</endorsement>
      <endorsement agent="flame-of-cultural-restoration">Authentic cultural partnership</endorsement>
    </council_endorsements>
  </data>
  <documents>
    <doc type="approved-proposal" path="/proposal-vault/approved/BP-2026-0042/" />
    <doc type="council-evaluation" path="/proposal-vault/approved/BP-2026-0042/evaluation.xml" />
  </documents>
  <instructions>Conduct final readiness verification. Confirm all legal requirements are prepared. Clear for Legal Bridge handoff if verified.</instructions>
</proposal_handoff>
```

### 9. Readiness Assessor → Legal Bridge: `legal-ready`

```xml
<proposal_handoff>
  <proposal_id>BP-2026-0042</proposal_id>
  <from>readiness-assessor</from>
  <to>legal-bridge</to>
  <handoff_type>legal-ready</handoff_type>
  <priority>high</priority>
  <timestamp>2026-01-22T14:00:00Z</timestamp>
  <brand>
    <name>Sacred Threads Collective</name>
    <contact>maya@sacredthreads.earth</contact>
  </brand>
  <status>
    <current_stage>legal-handoff</current_stage>
    <council_score>8.4/10</council_score>
    <iteration_count>1</iteration_count>
  </status>
  <data>
    <readiness_checklist>
      <item status="verified">Council approval confirmed (8.4/10)</item>
      <item status="verified">All proposal documents complete</item>
      <item status="verified">Brand commitment confirmed</item>
      <item status="verified">Engagement terms outlined</item>
      <item status="verified">Risk disclosures acknowledged</item>
      <item status="verified">Legal entity information provided</item>
    </readiness_checklist>
    <engagement_type>full-factory-partnership</engagement_type>
    <proposed_terms>
      <term name="duration">24 months</term>
      <term name="revenue-share">70/30 brand-factory</term>
      <term name="exclusivity">non-exclusive</term>
    </proposed_terms>
  </data>
  <documents>
    <doc type="full-package" path="/proposal-vault/approved/BP-2026-0042/" />
    <doc type="legal-intake" path="/proposal-vault/approved/BP-2026-0042/legal-intake.md" />
  </documents>
  <instructions>Initiate Legal Department handoff. Draft partnership agreement per proposed terms. Priority: high.</instructions>
</proposal_handoff>
```

### 10. Legal Bridge → Legal Department: `legal-matter-initiation`

This handoff bridges to the Legal Department agent group:

```xml
<legal_handoff>
  <matter_id>LM-2026-BP-0042</matter_id>
  <from>legal-bridge</from>
  <to>legal-orchestrator</to>
  <request_type>partnership-agreement</request_type>
  <priority>high</priority>
  <deadline>2026-02-05T23:59:59Z</deadline>
  <brand>
    <name>Sacred Threads Collective</name>
    <legal_entity>Sacred Threads Collective LLC</legal_entity>
    <jurisdiction>Oregon, USA</jurisdiction>
    <contact>maya@sacredthreads.earth</contact>
  </brand>
  <proposal_summary>
    <council_score>8.4/10</council_score>
    <engagement_type>full-factory-partnership</engagement_type>
    <key_terms>
      <term name="duration">24 months</term>
      <term name="revenue-share">70/30 brand-factory</term>
      <term name="exclusivity">non-exclusive</term>
    </key_terms>
    <special_considerations>
      <consideration>Indigenous partnership component - ensure IP protections</consideration>
      <consideration>Regenerative materials sourcing - verify sustainability claims</consideration>
    </special_considerations>
  </proposal_summary>
  <documents>
    <doc type="approved-proposal" path="/proposal-vault/approved/BP-2026-0042/" />
    <doc type="council-evaluation" path="/proposal-vault/approved/BP-2026-0042/evaluation.xml" />
    <doc type="legal-intake" path="/proposal-vault/approved/BP-2026-0042/legal-intake.md" />
  </documents>
  <instructions>
    Draft partnership agreement following standard factory template.
    Include IP protection provisions for indigenous designs.
    Route to Contract Guardian for detailed review.
    Coordinate with IP Protector on trademark considerations.
    Target contract delivery within 14 days.
  </instructions>
</legal_handoff>
```

## Status Codes

All handoffs may include status updates:

| Code | Meaning |
|------|---------|
| `pending` | Awaiting action |
| `in-progress` | Currently being processed |
| `completed` | Successfully finished |
| `blocked` | Waiting on external dependency |
| `failed` | Error occurred |
| `cancelled` | Proposal withdrawn |

## Error Handling

When issues occur during handoff:

```xml
<handoff_error>
  <proposal_id>BP-2026-0042</proposal_id>
  <from>{agent}</from>
  <error_type>validation|timeout|dependency|system</error_type>
  <error_code>{code}</error_code>
  <message>{description}</message>
  <recovery_action>{suggested_action}</recovery_action>
  <escalate_to>proposal-orchestrator</escalate_to>
</handoff_error>
```

## Handoff Acknowledgment

Receiving agents should acknowledge handoffs:

```xml
<handoff_ack>
  <proposal_id>BP-2026-0042</proposal_id>
  <from>{receiving_agent}</from>
  <to>{sending_agent}</to>
  <handoff_type>{original_type}</handoff_type>
  <status>received|processing|completed</status>
  <timestamp>{ISO-8601}</timestamp>
  <notes>{optional}</notes>
</handoff_ack>
```

## Integration Notes

### Stewardship Council Integration
- Use `<council_evaluation>` schema when requesting reviews
- Expect `<evaluation_result>` responses
- Council decisions are final; only improvement iterations allowed

### Legal Department Integration
- Use `<legal_handoff>` schema for Legal Department handoffs
- Reference proposal vault paths for document access
- Coordinate on `matter_id` assignment with Legal Orchestrator
