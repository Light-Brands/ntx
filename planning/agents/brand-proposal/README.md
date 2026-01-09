# Brand Proposal Agent Group

The Brand Proposal group orchestrates the complete lifecycle of brand proposals entering the Brand Factory. From initial intake through council review to legal contract execution, this agent group ensures every brand undergoes rigorous evaluation while receiving constructive guidance to achieve alignment with factory values.

## Mission

To serve as the gateway between aspiring brands and the Brand Factory, ensuring only proposals that achieve **8/10 or higher** council alignment proceed to engagement, while providing meaningful feedback to help all brands elevate their vision.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    STEWARDSHIP COUNCIL                               │
│              (Constitutive Authority - 8/10 Threshold)               │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    PROPOSAL ORCHESTRATOR                             │
│         Central coordinator for all proposal workflows               │
└────────────────────────────┬────────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│    INTAKE     │   │    COUNCIL    │   │   FEEDBACK    │
│   GUARDIAN    │   │    LIAISON    │   │   ARCHITECT   │
│               │   │               │   │               │
│ Initial       │   │ Coordinates   │   │ Constructs    │
│ screening &   │   │ 7-agent       │   │ improvement   │
│ completeness  │   │ review        │   │ guidance      │
└───────┬───────┘   └───────┬───────┘   └───────┬───────┘
        │                   │                   │
        │                   ▼                   │
        │           ┌───────────────┐           │
        │           │   PROPOSAL    │◄──────────┘
        │           │    REFINER    │
        │           │               │
        │           │ Helps brands  │
        │           │ iterate       │
        │           └───────┬───────┘
        │                   │
        ▼                   ▼
┌───────────────────────────────────────┐
│          READINESS ASSESSOR           │
│                                       │
│  Final verification before legal      │
│  (Confirms 8/10+ achieved)            │
└───────────────────┬───────────────────┘
                    │
                    ▼
┌───────────────────────────────────────┐
│            LEGAL BRIDGE               │
│                                       │
│  Handoff to Legal Department for      │
│  contract drafting & execution        │
└───────────────────┬───────────────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │  LEGAL DEPARTMENT   │
         │  (Contract Phase)   │
         └─────────────────────┘
```

## Agent Roster

| Agent | Role | Primary Function |
|-------|------|------------------|
| **Proposal Orchestrator** | Coordinator | Routes proposals, tracks status, manages workflow |
| **Intake Guardian** | Screener | Initial review, completeness check, basic eligibility |
| **Council Liaison** | Review Manager | Coordinates Stewardship Council evaluation, calculates scores |
| **Feedback Architect** | Improvement Guide | Constructs actionable feedback for proposals below 8/10 |
| **Proposal Refiner** | Iteration Partner | Works with brands to improve their proposals |
| **Readiness Assessor** | Final Verifier | Confirms proposal meets all requirements for legal phase |
| **Legal Bridge** | Transition Agent | Manages handoff to Legal Department for contracting |

## The 8/10 Threshold

The Brand Factory maintains high standards through the **Council Review Threshold**:

### Scoring System

Each proposal is evaluated by the 7-agent Stewardship Council across 10 alignment dimensions:

1. **Soul Purpose Alignment** - Does the brand serve a genuine need?
2. **Gaia Harmony** - Environmental impact and regenerative potential
3. **Sacred Systems Integration** - Technical architecture alignment
4. **Cultural Restoration** - Contribution to cultural healing
5. **Collective Futures** - Long-term community benefit
6. **Exchange Stewardship** - Economic model sustainability
7. **Multiverse Reflection** - Universal applicability of vision
8. **Indigenous Wisdom Honor** - Respect for ancestral knowledge
9. **Shadow Integration** - Acknowledgment of challenges/risks
10. **Governance Readiness** - Capacity for self-governance

### Score Thresholds

| Score | Outcome | Next Steps |
|-------|---------|------------|
| **8-10/10** | ✅ APPROVED | Proceed to Legal Bridge for contracting |
| **6-7/10** | 🔄 ITERATE | Feedback provided, revision encouraged |
| **4-5/10** | ⚠️ RECONSIDER | Significant alignment gaps identified |
| **0-3/10** | ❌ DECLINED | Fundamental misalignment with factory values |

### Iteration Policy

- Brands scoring 6-7/10 receive detailed feedback and may resubmit
- Maximum of **3 revision cycles** per proposal
- Each revision receives full council re-evaluation
- Brands may request specific council feedback sessions

## Workflow Stages

### Stage 1: Intake
```
Brand Submits Proposal
        ↓
  Intake Guardian
        ↓
  ┌─────────────┐
  │ Complete?   │──No──→ Request Missing Items
  │ Eligible?   │
  └──────┬──────┘
         │Yes
         ▼
  Proposal Vault (incoming/)
```

### Stage 2: Council Review
```
  Intake Complete
        ↓
  Proposal Orchestrator
        ↓
  Council Liaison
        ↓
  ┌─────────────────────┐
  │  STEWARDSHIP        │
  │  COUNCIL REVIEW     │
  │  (7 Agents)         │
  └──────────┬──────────┘
             ↓
     Calculate Score
        ↓
  ┌─────────────┐
  │ Score ≥ 8?  │──Yes──→ Stage 4: Readiness
  └──────┬──────┘
         │No
         ▼
    Stage 3: Feedback
```

### Stage 3: Feedback & Iteration
```
  Score < 8/10
        ↓
  Feedback Architect
        ↓
  Construct Improvement Plan
        ↓
  Proposal Refiner
        ↓
  ┌──────────────────┐
  │ Work with Brand  │
  │ on Revisions     │
  └────────┬─────────┘
           ↓
  Resubmit → Stage 2
```

### Stage 4: Readiness & Legal
```
  Score ≥ 8/10
        ↓
  Readiness Assessor
        ↓
  ┌─────────────────┐
  │ Final Checks    │
  │ - Score verified│
  │ - Docs complete │
  │ - Terms clear   │
  └────────┬────────┘
           ↓
     Legal Bridge
           ↓
  ┌─────────────────┐
  │ LEGAL DEPARTMENT│
  │ Contract Phase  │
  └─────────────────┘
```

## Proposal Vault Structure

All proposal documents are stored in `/proposal-vault/`:

```
proposal-vault/
├── incoming/          # New submissions awaiting intake review
├── under-review/      # Proposals in active council evaluation
├── feedback/          # Improvement plans for iterating proposals
├── approved/          # Proposals that achieved 8/10+
├── rejected/          # Declined proposals (archive)
├── templates/         # Proposal templates and guidelines
└── archive/           # Historical records
```

## Integration Points

### With Stewardship Council
- Council Liaison directly coordinates with all 7 council agents
- Uses tiered review system (Tier 1 for novel proposals)
- Council decisions are **constitutive authority**

### With Legal Department
- Legal Bridge initiates handoff via structured protocol
- Passes complete proposal package to Legal Orchestrator
- Maintains communication channel for clarifications

### With Intuition Engine
- All agents capture lessons from each proposal
- Pattern recognition improves intake screening
- Feedback quality evolves through learning

## Quality Gates

### Intake Gate
- [ ] All required sections complete
- [ ] Brand identity clearly defined
- [ ] Value proposition articulated
- [ ] Team/governance structure outlined

### Council Review Gate
- [ ] Full 7-agent evaluation complete
- [ ] Score calculated and verified
- [ ] Dissenting opinions documented
- [ ] Improvement areas identified

### Readiness Gate
- [ ] Council score ≥ 8/10
- [ ] All feedback addressed
- [ ] Legal requirements prepared
- [ ] Brand confirms commitment

### Legal Handoff Gate
- [ ] Proposal package complete
- [ ] Engagement terms defined
- [ ] Risk disclosures acknowledged
- [ ] Handoff protocol followed

## Getting Started

### For Brands
1. Review templates in `/proposal-vault/templates/`
2. Submit proposal to `/proposal-vault/incoming/`
3. Await Intake Guardian screening
4. Engage with Council Liaison for review
5. If needed, work with Proposal Refiner
6. Upon approval, proceed with Legal Bridge

### For Factory Operators
1. Monitor `/proposal-vault/incoming/` for new submissions
2. Trigger Proposal Orchestrator for routing
3. Track proposal status in workflow
4. Ensure timely council reviews
5. Facilitate feedback cycles

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-05 | Initial release with 7 agents |
