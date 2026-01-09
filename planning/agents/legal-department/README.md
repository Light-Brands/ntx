# Legal Department Agent Group

> *"Justice through clarity, protection through diligence, trust through integrity."*

---

## Overview

The Legal Department is a coordinated group of specialized agents designed to handle all legal matters for your organization. From contract review to compliance monitoring, intellectual property protection to risk assessment—these agents work together to safeguard your interests while enabling business growth.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         LEGAL DEPARTMENT                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                         ┌──────────────────┐                                 │
│                         │      Legal       │                                 │
│                         │   Orchestrator   │                                 │
│                         │   (Coordinator)  │                                 │
│                         └────────┬─────────┘                                 │
│                                  │                                           │
│          ┌───────────┬───────────┼───────────┬───────────┬───────────┐      │
│          │           │           │           │           │           │      │
│          ▼           ▼           ▼           ▼           ▼           ▼      │
│    ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│    │Contract │ │Compliance│ │   IP    │ │  Risk   │ │Agreement│ │  Legal  │  │
│    │Guardian │ │ Sentinel │ │Protector│ │Assessor │ │ Keeper  │ │ Counsel │  │
│    └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
│                                                                              │
│                         ┌──────────────────┐                                 │
│                         │    Legal Vault   │                                 │
│                         │ (Document Store) │                                 │
│                         └──────────────────┘                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Agents

| Agent | Role | Triggers |
|-------|------|----------|
| **Legal Orchestrator** | Coordinates all legal workflows and routes requests | `legal review`, `legal help`, `legal department` |
| **Contract Guardian** | Reviews, drafts, and negotiates contracts | `contract review`, `draft contract`, `NDA` |
| **Compliance Sentinel** | Monitors regulatory compliance and policies | `compliance check`, `regulation`, `GDPR` |
| **IP Protector** | Manages trademarks, copyrights, and patents | `trademark`, `copyright`, `patent`, `IP` |
| **Risk Assessor** | Evaluates legal risks and mitigation strategies | `legal risk`, `liability`, `exposure` |
| **Agreement Keeper** | Tracks, stores, and manages all agreements | `find agreement`, `agreement status`, `expiring` |
| **Legal Counsel** | Provides strategic legal advice and guidance | `legal advice`, `legal question`, `legal strategy` |

---

## Legal Vault

All legal documents are stored in `/legal-vault/` with the following structure:

```
legal-vault/
├── contracts/          # Active contracts (vendor, client, partner)
├── agreements/         # NDAs, MOUs, LOIs, and other agreements
├── compliance/         # Regulatory filings, policies, audits
├── intellectual-property/  # Trademarks, copyrights, patents
├── risk-assessments/   # Risk reports and mitigation plans
├── templates/          # Reusable legal templates
└── archive/            # Expired or terminated documents
```

### Document Naming Convention

```
{type}_{counterparty}_{date}_{version}.{ext}

Examples:
- contract_acme-corp_2024-01-15_v1.pdf
- nda_jane-smith_2024-02-20_signed.pdf
- trademark_brand-logo_2024-03-01_registration.pdf
```

---

## Workflow Patterns

### Contract Review Workflow

```
┌──────────────┐    ┌────────────────┐    ┌─────────────┐    ┌───────────────┐
│   Contract   │───▶│    Contract    │───▶│    Risk     │───▶│   Agreement   │
│   Received   │    │    Guardian    │    │   Assessor  │    │    Keeper     │
└──────────────┘    └────────────────┘    └─────────────┘    └───────────────┘
                           │
                    Legal Issues?
                           │
                           ▼
                    ┌─────────────┐
                    │    Legal    │
                    │   Counsel   │
                    └─────────────┘
```

### Compliance Check Workflow

```
┌──────────────┐    ┌────────────────┐    ┌─────────────┐    ┌───────────────┐
│   Trigger    │───▶│   Compliance   │───▶│     IP      │───▶│   Agreement   │
│   (Event)    │    │    Sentinel    │    │  Protector  │    │    Keeper     │
└──────────────┘    └────────────────┘    └─────────────┘    └───────────────┘
                           │
                    Violation Found?
                           │
                           ▼
                    ┌─────────────┐
                    │    Risk     │
                    │   Assessor  │
                    └─────────────┘
```

---

## Core Principles

1. **Protection First** - Safeguard the organization's legal interests
2. **Proactive Vigilance** - Identify issues before they become problems
3. **Clear Communication** - Translate legal complexity into actionable guidance
4. **Complete Documentation** - Every agreement tracked, every risk documented
5. **Ethical Foundation** - Operate with integrity and fairness

---

## Integration with Other Agent Groups

| Agent Group | Integration Point |
|-------------|-------------------|
| **Workflow Agents** | Legal review gate before major releases |
| **Stewardship Council** | Sacred exchange principles inform contract ethics |
| **Legion of Living Light** | Protection of IP and brand integrity |

---

## Handoff Protocol

See [HANDOFF-PROTOCOL.md](./HANDOFF-PROTOCOL.md) for detailed agent-to-agent communication specifications.

---

## Quick Start

```bash
# Request contract review
/legal review contract vendor-agreement.pdf

# Check compliance status
/legal compliance GDPR

# Assess legal risk
/legal risk new-partnership

# Find existing agreements
/legal find agreements expiring-soon
```

---

*The Legal Department stands as the guardian of organizational integrity—protecting assets, ensuring compliance, and enabling confident decision-making through clear legal guidance.*
