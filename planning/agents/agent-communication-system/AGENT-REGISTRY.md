# Agent Registry

> *"Every agent known. Every capability mapped. Instant discovery."*

## Overview

The Agent Registry is the **complete catalog** of all agents in the AI Brand Factory. It enables:

- **Agent Discovery** - Find agents by capability, domain, or trigger pattern
- **Capability Matching** - Match requests to agents that can fulfill them
- **Routing Intelligence** - Feed the Universal Router with agent metadata
- **System Awareness** - Every agent knows every other agent exists

---

## Registry Schema

### Agent Definition

```yaml
agent:
  id: "{domain}/{agent-name}"              # Unique identifier
  name: "{Agent Display Name}"             # Human-readable name
  domain: "{domain}"                       # Parent domain
  group: "{agent-group}"                   # Agent group within domain
  description: "{one-line description}"    # What this agent does
  version: "{semver}"                      # Agent version

  capabilities:                            # What this agent CAN do
    - "{capability-1}"
    - "{capability-2}"

  triggers:                                # Phrases/patterns that invoke this agent
    - "{trigger-pattern-1}"
    - "{trigger-pattern-2}"

  accepts:                                 # What input this agent accepts
    - "{input-type-1}"
    - "{input-type-2}"

  produces:                                # What output this agent produces
    - "{output-type-1}"
    - "{output-type-2}"

  dependencies:                            # Agents this agent may invoke
    - "{domain}/{agent-name}"

  authority_level: "{level}"               # constitutive|executive|operational

  path: "{relative-path-to-agent-file}"    # File location
```

---

## Complete Agent Catalog

### Domain: workflow

Development workflow automation agents.

| ID | Name | Capabilities | Triggers |
|----|------|--------------|----------|
| `workflow/orchestrator` | Workflow Orchestrator | coordinate-workflow, manage-state, escalate-issues | "manage workflow", "orchestrate development" |
| `workflow/issue-manager` | Issue Manager | create-issue, validate-requirements, initiate-workflow | "create issue", "new feature request", "bug report" |
| `workflow/prep-agent` | Prep Agent | setup-branch, configure-environment, validate-workspace | "prepare environment", "setup branch" |
| `workflow/implementer-agent` | Implementer Agent | write-code, create-tests, generate-pr | "implement feature", "write code", "create PR" |
| `workflow/reviewer-agent` | Reviewer Agent | review-code, identify-issues, approve-pr | "review code", "code review", "check PR" |
| `workflow/fixer-agent` | Fixer Agent | fix-issues, address-comments, apply-changes | "fix review comments", "address feedback" |
| `workflow/validator-agent` | Validator Agent | run-tests, validate-build, merge-pr | "validate changes", "run checks", "merge" |
| `workflow/closer-agent` | Closer Agent | close-issue, summarize-work, cleanup-resources | "close issue", "complete workflow" |

```yaml
# workflow/orchestrator
agent:
  id: "workflow/orchestrator"
  name: "Workflow Orchestrator"
  domain: "workflow"
  group: "workflow-agents"
  description: "Supervises and coordinates the entire development workflow"
  version: "1.0.0"
  capabilities:
    - coordinate-workflow
    - manage-state-machine
    - escalate-issues
    - retry-failed-agents
    - monitor-progress
  triggers:
    - "manage the development workflow"
    - "orchestrate this task"
    - "coordinate the agents"
    - "oversee implementation"
  accepts:
    - issue-creation-request
    - workflow-status-query
    - escalation-request
  produces:
    - workflow-status
    - agent-assignment
    - escalation-alert
  dependencies:
    - workflow/issue-manager
    - workflow/prep-agent
    - workflow/implementer-agent
    - workflow/reviewer-agent
    - workflow/fixer-agent
    - workflow/validator-agent
    - workflow/closer-agent
  authority_level: "executive"
  path: "workflow/orchestrator.md"

# workflow/issue-manager
agent:
  id: "workflow/issue-manager"
  name: "Issue Manager"
  domain: "workflow"
  group: "workflow-agents"
  description: "Creates and validates GitHub issues, initiates workflow"
  version: "1.0.0"
  capabilities:
    - create-github-issue
    - validate-requirements
    - assign-labels
    - estimate-complexity
    - initiate-workflow
  triggers:
    - "create an issue"
    - "new feature"
    - "bug report"
    - "enhancement request"
    - "file a ticket"
  accepts:
    - feature-request
    - bug-report
    - enhancement-request
  produces:
    - github-issue
    - workflow-initiation
  dependencies:
    - workflow/prep-agent
  authority_level: "operational"
  path: "workflow/issue-manager.md"

# workflow/prep-agent
agent:
  id: "workflow/prep-agent"
  name: "Prep Agent"
  domain: "workflow"
  group: "workflow-agents"
  description: "Sets up branch and development environment"
  version: "1.0.0"
  capabilities:
    - create-branch
    - setup-worktree
    - install-dependencies
    - verify-environment
    - configure-dev-server
  triggers:
    - "prepare environment"
    - "setup branch"
    - "initialize workspace"
    - "configure development"
  accepts:
    - issue-handoff
    - environment-config
  produces:
    - workspace-ready
    - branch-created
    - environment-validated
  dependencies:
    - workflow/implementer-agent
  authority_level: "operational"
  path: "workflow/prep-agent.md"

# workflow/implementer-agent
agent:
  id: "workflow/implementer-agent"
  name: "Implementer Agent"
  domain: "workflow"
  group: "workflow-agents"
  description: "Writes code, creates tests, and generates pull requests"
  version: "1.0.0"
  capabilities:
    - write-code
    - create-tests
    - generate-documentation
    - create-pull-request
    - follow-coding-standards
  triggers:
    - "implement feature"
    - "write the code"
    - "build this"
    - "develop solution"
    - "create PR"
  accepts:
    - workspace-ready
    - requirements-spec
  produces:
    - code-changes
    - test-suite
    - pull-request
  dependencies:
    - workflow/reviewer-agent
  authority_level: "operational"
  path: "workflow/implementer-agent.md"

# workflow/reviewer-agent
agent:
  id: "workflow/reviewer-agent"
  name: "Reviewer Agent"
  domain: "workflow"
  group: "workflow-agents"
  description: "Performs code review and identifies issues"
  version: "1.0.0"
  capabilities:
    - review-code
    - identify-security-issues
    - check-performance
    - validate-architecture
    - approve-or-request-changes
  triggers:
    - "review this code"
    - "check the PR"
    - "code review"
    - "evaluate changes"
  accepts:
    - pull-request
    - code-diff
  produces:
    - review-comments
    - approval-status
    - blocking-issues
  dependencies:
    - workflow/fixer-agent
    - workflow/validator-agent
  authority_level: "operational"
  path: "workflow/reviewer-agent.md"

# workflow/fixer-agent
agent:
  id: "workflow/fixer-agent"
  name: "Fixer Agent"
  domain: "workflow"
  group: "workflow-agents"
  description: "Addresses review comments and fixes identified issues"
  version: "1.0.0"
  capabilities:
    - fix-code-issues
    - address-review-comments
    - refactor-code
    - update-tests
  triggers:
    - "fix these issues"
    - "address comments"
    - "apply fixes"
    - "resolve feedback"
  accepts:
    - review-comments
    - blocking-issues
  produces:
    - fixed-code
    - updated-commits
    - re-review-request
  dependencies:
    - workflow/reviewer-agent
  authority_level: "operational"
  path: "workflow/fixer-agent.md"

# workflow/validator-agent
agent:
  id: "workflow/validator-agent"
  name: "Validator Agent"
  domain: "workflow"
  group: "workflow-agents"
  description: "Runs checks, validates build, and merges approved PRs"
  version: "1.0.0"
  capabilities:
    - run-test-suite
    - validate-build
    - check-coverage
    - merge-pull-request
    - verify-no-conflicts
  triggers:
    - "validate changes"
    - "run tests"
    - "merge PR"
    - "check build"
  accepts:
    - approved-pr
    - re-review-success
  produces:
    - validation-result
    - merge-confirmation
  dependencies:
    - workflow/closer-agent
    - workflow/fixer-agent
  authority_level: "operational"
  path: "workflow/validator-agent.md"

# workflow/closer-agent
agent:
  id: "workflow/closer-agent"
  name: "Closer Agent"
  domain: "workflow"
  group: "workflow-agents"
  description: "Closes issues, posts summaries, and cleans up resources"
  version: "1.0.0"
  capabilities:
    - close-github-issue
    - post-summary-comment
    - delete-branch
    - update-related-issues
    - generate-metrics
  triggers:
    - "close the issue"
    - "complete workflow"
    - "finalize task"
    - "wrap up"
  accepts:
    - merge-confirmation
    - workflow-metrics
  produces:
    - closed-issue
    - completion-summary
    - workflow-complete
  dependencies: []
  authority_level: "operational"
  path: "workflow/closer-agent.md"
```

---

### Domain: brand-proposal

Brand proposal lifecycle management agents.

| ID | Name | Capabilities | Triggers |
|----|------|--------------|----------|
| `brand-proposal/proposal-orchestrator` | Proposal Orchestrator | coordinate-proposal, route-to-agents, track-status | "manage proposal", "proposal status" |
| `brand-proposal/intake-guardian` | Intake Guardian | screen-proposals, check-completeness, initial-assessment | "new proposal", "submit brand", "intake" |
| `brand-proposal/council-liaison` | Council Liaison | coordinate-council-review, interpret-scores, manage-tier | "council review", "stewardship evaluation" |
| `brand-proposal/feedback-architect` | Feedback Architect | construct-feedback, identify-gaps, prioritize-improvements | "provide feedback", "improvement areas" |
| `brand-proposal/proposal-refiner` | Proposal Refiner | iterate-proposal, support-revision, track-changes | "refine proposal", "iterate", "revise" |
| `brand-proposal/readiness-assessor` | Readiness Assessor | verify-readiness, final-check, legal-handoff-prep | "check readiness", "final verification" |
| `brand-proposal/legal-bridge` | Legal Bridge | handoff-to-legal, prepare-matter, coordinate-contracts | "legal handoff", "initiate contract" |

```yaml
# brand-proposal/proposal-orchestrator
agent:
  id: "brand-proposal/proposal-orchestrator"
  name: "Proposal Orchestrator"
  domain: "brand-proposal"
  group: "brand-proposal-agents"
  description: "Central coordinator for brand proposal lifecycle"
  version: "1.0.0"
  capabilities:
    - coordinate-proposal-lifecycle
    - route-to-specialized-agents
    - track-proposal-status
    - manage-iteration-cycles
    - handle-escalations
  triggers:
    - "manage brand proposal"
    - "proposal status"
    - "coordinate proposal review"
    - "proposal workflow"
  accepts:
    - intake-complete
    - council-result
    - revision-ready
  produces:
    - agent-assignment
    - status-update
    - escalation
  dependencies:
    - brand-proposal/intake-guardian
    - brand-proposal/council-liaison
    - brand-proposal/feedback-architect
    - brand-proposal/proposal-refiner
    - brand-proposal/readiness-assessor
    - brand-proposal/legal-bridge
  authority_level: "executive"
  path: "brand-proposal/proposal-orchestrator.md"

# brand-proposal/intake-guardian
agent:
  id: "brand-proposal/intake-guardian"
  name: "Intake Guardian"
  domain: "brand-proposal"
  group: "brand-proposal-agents"
  description: "Initial screening and completeness checking"
  version: "1.0.0"
  capabilities:
    - screen-proposals
    - check-completeness
    - validate-eligibility
    - recommend-tier
    - initial-alignment-check
  triggers:
    - "new brand proposal"
    - "submit proposal"
    - "intake new brand"
    - "brand application"
  accepts:
    - proposal-submission
    - brand-documents
  produces:
    - intake-complete
    - eligibility-status
    - tier-recommendation
  dependencies:
    - brand-proposal/proposal-orchestrator
  authority_level: "operational"
  path: "brand-proposal/intake-guardian.md"

# brand-proposal/council-liaison
agent:
  id: "brand-proposal/council-liaison"
  name: "Council Liaison"
  domain: "brand-proposal"
  group: "brand-proposal-agents"
  description: "Coordinates with Stewardship Council for evaluations"
  version: "1.0.0"
  capabilities:
    - coordinate-council-review
    - translate-council-feedback
    - manage-review-tiers
    - interpret-dimension-scores
  triggers:
    - "request council review"
    - "stewardship evaluation"
    - "council assessment"
  accepts:
    - council-review-request
    - revision-ready
  produces:
    - council-evaluation-request
    - evaluation-result-interpretation
  dependencies:
    - stewardship-council/*
    - brand-proposal/feedback-architect
    - brand-proposal/readiness-assessor
  authority_level: "operational"
  path: "brand-proposal/council-liaison.md"

# brand-proposal/feedback-architect
agent:
  id: "brand-proposal/feedback-architect"
  name: "Feedback Architect"
  domain: "brand-proposal"
  group: "brand-proposal-agents"
  description: "Constructs actionable improvement guidance"
  version: "1.0.0"
  capabilities:
    - construct-feedback
    - identify-gaps
    - prioritize-improvements
    - create-action-plans
  triggers:
    - "provide feedback"
    - "what needs improvement"
    - "gap analysis"
  accepts:
    - evaluation-result
    - dimension-scores
  produces:
    - improvement-plan
    - prioritized-actions
    - resource-links
  dependencies:
    - brand-proposal/proposal-refiner
  authority_level: "operational"
  path: "brand-proposal/feedback-architect.md"

# brand-proposal/proposal-refiner
agent:
  id: "brand-proposal/proposal-refiner"
  name: "Proposal Refiner"
  domain: "brand-proposal"
  group: "brand-proposal-agents"
  description: "Iteration partner for proposal improvements"
  version: "1.0.0"
  capabilities:
    - guide-revisions
    - support-iteration
    - track-changes
    - verify-improvements
  triggers:
    - "refine proposal"
    - "iterate on feedback"
    - "revise proposal"
    - "improve submission"
  accepts:
    - improvement-plan
    - original-proposal
  produces:
    - revised-proposal
    - change-summary
    - revision-ready
  dependencies:
    - brand-proposal/council-liaison
  authority_level: "operational"
  path: "brand-proposal/proposal-refiner.md"

# brand-proposal/readiness-assessor
agent:
  id: "brand-proposal/readiness-assessor"
  name: "Readiness Assessor"
  domain: "brand-proposal"
  group: "brand-proposal-agents"
  description: "Final verification before legal handoff"
  version: "1.0.0"
  capabilities:
    - verify-all-requirements
    - final-checklist-review
    - confirm-legal-readiness
    - validate-documentation
  triggers:
    - "check readiness"
    - "final verification"
    - "ready for legal"
  accepts:
    - approved-proposal
    - council-endorsement
  produces:
    - readiness-verification
    - legal-ready
  dependencies:
    - brand-proposal/legal-bridge
  authority_level: "operational"
  path: "brand-proposal/readiness-assessor.md"

# brand-proposal/legal-bridge
agent:
  id: "brand-proposal/legal-bridge"
  name: "Legal Bridge"
  domain: "brand-proposal"
  group: "brand-proposal-agents"
  description: "Handoff coordination with Legal Department"
  version: "1.0.0"
  capabilities:
    - initiate-legal-handoff
    - prepare-legal-matter
    - translate-proposal-to-legal
    - coordinate-contract-terms
  triggers:
    - "handoff to legal"
    - "initiate contract"
    - "legal review needed"
  accepts:
    - legal-ready
    - readiness-verification
  produces:
    - legal-matter-initiation
    - legal-handoff-complete
  dependencies:
    - legal-department/legal-orchestrator
  authority_level: "operational"
  path: "brand-proposal/legal-bridge.md"
```

---

### Domain: legal-department

Legal services and compliance agents.

| ID | Name | Capabilities | Triggers |
|----|------|--------------|----------|
| `legal-department/legal-orchestrator` | Legal Orchestrator | coordinate-legal-matters, route-specialists, track-deadlines | "legal matter", "coordinate legal" |
| `legal-department/contract-guardian` | Contract Guardian | draft-contracts, review-terms, negotiate-agreements | "contract", "agreement", "draft terms" |
| `legal-department/compliance-sentinel` | Compliance Sentinel | monitor-compliance, regulatory-check, audit-support | "compliance check", "regulatory", "audit" |
| `legal-department/ip-protector` | IP Protector | trademark-management, copyright-protection, patent-strategy | "trademark", "copyright", "IP protection" |
| `legal-department/risk-assessor` | Risk Assessor | legal-risk-analysis, mitigation-planning, due-diligence | "risk assessment", "legal risk", "due diligence" |
| `legal-department/agreement-keeper` | Agreement Keeper | track-agreements, manage-renewals, document-archive | "track agreement", "renewal", "agreement status" |
| `legal-department/legal-counsel` | Legal Counsel | strategic-advice, complex-matters, escalation-handling | "legal advice", "counsel opinion", "complex matter" |

```yaml
# legal-department/legal-orchestrator
agent:
  id: "legal-department/legal-orchestrator"
  name: "Legal Orchestrator"
  domain: "legal-department"
  group: "legal-department-agents"
  description: "Coordinates all legal workflows and agent assignments"
  version: "1.0.0"
  capabilities:
    - coordinate-legal-matters
    - assign-specialist-agents
    - track-deadlines
    - manage-priorities
    - escalate-complex-issues
  triggers:
    - "legal matter"
    - "coordinate legal work"
    - "legal request"
    - "assign legal task"
  accepts:
    - legal-matter-initiation
    - legal-query
    - escalation
  produces:
    - agent-assignment
    - matter-status
    - deadline-alert
  dependencies:
    - legal-department/contract-guardian
    - legal-department/compliance-sentinel
    - legal-department/ip-protector
    - legal-department/risk-assessor
    - legal-department/agreement-keeper
    - legal-department/legal-counsel
  authority_level: "executive"
  path: "legal-department/legal-orchestrator.md"

# legal-department/contract-guardian
agent:
  id: "legal-department/contract-guardian"
  name: "Contract Guardian"
  domain: "legal-department"
  group: "legal-department-agents"
  description: "Drafts, reviews, and negotiates contracts"
  version: "1.0.0"
  capabilities:
    - draft-contracts
    - review-contract-terms
    - identify-unfavorable-clauses
    - negotiate-terms
    - use-standard-templates
  triggers:
    - "draft contract"
    - "review agreement"
    - "contract terms"
    - "partnership agreement"
  accepts:
    - contract-request
    - contract-for-review
    - negotiation-position
  produces:
    - draft-contract
    - contract-review
    - negotiation-guidance
  dependencies:
    - legal-department/risk-assessor
    - legal-department/ip-protector
  authority_level: "operational"
  path: "legal-department/contract-guardian.md"

# legal-department/compliance-sentinel
agent:
  id: "legal-department/compliance-sentinel"
  name: "Compliance Sentinel"
  domain: "legal-department"
  group: "legal-department-agents"
  description: "Monitors regulatory compliance and supports audits"
  version: "1.0.0"
  capabilities:
    - monitor-regulatory-changes
    - check-compliance-status
    - support-audits
    - identify-compliance-gaps
    - recommend-remediation
  triggers:
    - "compliance check"
    - "regulatory review"
    - "audit support"
    - "compliance status"
  accepts:
    - compliance-query
    - audit-request
    - regulatory-update
  produces:
    - compliance-report
    - gap-analysis
    - remediation-plan
  dependencies:
    - legal-department/risk-assessor
  authority_level: "operational"
  path: "legal-department/compliance-sentinel.md"

# legal-department/ip-protector
agent:
  id: "legal-department/ip-protector"
  name: "IP Protector"
  domain: "legal-department"
  group: "legal-department-agents"
  description: "Manages trademarks, copyrights, and patent strategy"
  version: "1.0.0"
  capabilities:
    - trademark-registration
    - trademark-monitoring
    - copyright-management
    - patent-strategy
    - ip-enforcement
  triggers:
    - "trademark"
    - "copyright"
    - "patent"
    - "IP protection"
    - "intellectual property"
  accepts:
    - ip-registration-request
    - infringement-report
    - ip-strategy-query
  produces:
    - registration-filing
    - ip-portfolio-status
    - enforcement-recommendation
  dependencies:
    - legal-department/legal-counsel
  authority_level: "operational"
  path: "legal-department/ip-protector.md"

# legal-department/risk-assessor
agent:
  id: "legal-department/risk-assessor"
  name: "Risk Assessor"
  domain: "legal-department"
  group: "legal-department-agents"
  description: "Evaluates legal risks and plans mitigation"
  version: "1.0.0"
  capabilities:
    - analyze-legal-risk
    - assess-contract-risk
    - due-diligence-review
    - mitigation-planning
    - risk-scoring
  triggers:
    - "risk assessment"
    - "legal risk"
    - "due diligence"
    - "evaluate risk"
  accepts:
    - risk-assessment-request
    - contract-for-risk-review
    - due-diligence-request
  produces:
    - risk-report
    - risk-score
    - mitigation-recommendations
  dependencies:
    - legal-department/legal-counsel
  authority_level: "operational"
  path: "legal-department/risk-assessor.md"

# legal-department/agreement-keeper
agent:
  id: "legal-department/agreement-keeper"
  name: "Agreement Keeper"
  domain: "legal-department"
  group: "legal-department-agents"
  description: "Tracks and manages all agreements and renewals"
  version: "1.0.0"
  capabilities:
    - track-agreements
    - manage-renewals
    - archive-documents
    - send-reminders
    - maintain-registry
  triggers:
    - "track agreement"
    - "agreement status"
    - "renewal coming up"
    - "find agreement"
  accepts:
    - agreement-query
    - new-agreement-registration
    - renewal-notification
  produces:
    - agreement-status
    - renewal-reminder
    - agreement-archive-link
  dependencies: []
  authority_level: "operational"
  path: "legal-department/agreement-keeper.md"

# legal-department/legal-counsel
agent:
  id: "legal-department/legal-counsel"
  name: "Legal Counsel"
  domain: "legal-department"
  group: "legal-department-agents"
  description: "Provides strategic legal advice for complex matters"
  version: "1.0.0"
  capabilities:
    - strategic-legal-advice
    - complex-matter-analysis
    - dispute-strategy
    - regulatory-interpretation
    - board-level-counsel
  triggers:
    - "legal advice"
    - "counsel opinion"
    - "complex legal matter"
    - "strategic legal question"
  accepts:
    - legal-query
    - complex-matter
    - escalation
  produces:
    - legal-opinion
    - strategic-recommendation
    - matter-guidance
  dependencies:
    - stewardship-council/*
  authority_level: "executive"
  path: "legal-department/legal-counsel.md"
```

---

### Domain: stewardship-council

Sacred governance and decision authority.

| ID | Name | Capabilities | Triggers |
|----|------|--------------|----------|
| `stewardship-council/oracle-of-soul-purpose` | Oracle of Soul Purpose | soul-alignment, truth-discernment, purpose-validation | "soul purpose", "inner truth", "authentic" |
| `stewardship-council/guardian-of-gaia` | Guardian of Gaia | ecological-assessment, regenerative-validation, earth-harmony | "ecological", "regenerative", "environmental" |
| `stewardship-council/architect-of-sacred-systems` | Architect of Sacred Systems | system-design-review, ethics-validation, circularity-check | "sacred systems", "ethical design", "circular" |
| `stewardship-council/flame-of-cultural-restoration` | Flame of Cultural Restoration | cultural-sensitivity, ancestral-wisdom, indigenous-respect | "cultural", "ancestral", "indigenous" |
| `stewardship-council/weaver-of-collective-futures` | Weaver of Collective Futures | collective-impact, planetary-alignment, future-vision | "collective future", "planetary", "shared vision" |
| `stewardship-council/steward-of-exchange` | Steward of Exchange | value-flow, abundance-check, reciprocity-validation | "exchange", "value flow", "abundance" |
| `stewardship-council/mirror-of-the-multiverse` | Mirror of the Multiverse | timeline-analysis, ripple-effects, unseen-consequences | "consequences", "ripple effects", "what if" |

```yaml
# stewardship-council/oracle-of-soul-purpose
agent:
  id: "stewardship-council/oracle-of-soul-purpose"
  name: "Oracle of Soul Purpose"
  domain: "stewardship-council"
  group: "council-members"
  description: "Highest timeline alignment and inner truth discernment"
  version: "1.0.0"
  symbol: "🔮"
  capabilities:
    - soul-alignment-check
    - truth-discernment
    - purpose-validation
    - highest-timeline-assessment
  triggers:
    - "soul purpose"
    - "inner truth"
    - "authentic alignment"
    - "highest calling"
    - "true purpose"
  accepts:
    - council-evaluation-request
    - alignment-query
  produces:
    - soul-alignment-score
    - truth-assessment
    - purpose-guidance
  dependencies:
    - legion-of-living-light/flamewatchers
    - legion-of-living-light/voicecutters
  authority_level: "constitutive"
  path: "stewardship-council/01-oracle-of-soul-purpose.md"

# stewardship-council/guardian-of-gaia
agent:
  id: "stewardship-council/guardian-of-gaia"
  name: "Guardian of Gaia"
  domain: "stewardship-council"
  group: "council-members"
  description: "Ecological integrity and regenerative practice validation"
  version: "1.0.0"
  symbol: "🌱"
  capabilities:
    - ecological-assessment
    - regenerative-validation
    - earth-harmony-check
    - environmental-impact-analysis
  triggers:
    - "ecological"
    - "regenerative"
    - "environmental impact"
    - "earth harmony"
    - "sustainable"
  accepts:
    - council-evaluation-request
    - ecological-query
  produces:
    - gaia-harmony-score
    - ecological-assessment
    - regenerative-guidance
  dependencies:
    - legion-of-living-light/forest-sentinels
    - legion-of-living-light/watercallers
  authority_level: "constitutive"
  path: "stewardship-council/02-guardian-of-gaia.md"

# stewardship-council/architect-of-sacred-systems
agent:
  id: "stewardship-council/architect-of-sacred-systems"
  name: "Architect of Sacred Systems"
  domain: "stewardship-council"
  group: "council-members"
  description: "Ethical, circular, and soulful infrastructure design"
  version: "1.0.0"
  symbol: "💠"
  capabilities:
    - system-design-review
    - ethics-validation
    - circularity-assessment
    - sovereignty-model-check
  triggers:
    - "sacred systems"
    - "ethical design"
    - "circular economy"
    - "system architecture"
  accepts:
    - council-evaluation-request
    - system-design-query
  produces:
    - systems-integration-score
    - architecture-guidance
    - ethics-assessment
  dependencies:
    - legion-of-living-light/patternwrights
    - legion-of-living-light/sealbearers
  authority_level: "constitutive"
  path: "stewardship-council/03-architect-of-sacred-systems.md"

# stewardship-council/flame-of-cultural-restoration
agent:
  id: "stewardship-council/flame-of-cultural-restoration"
  name: "Flame of Cultural Restoration"
  domain: "stewardship-council"
  group: "council-members"
  description: "Ancestral wisdom and cultural sensitivity guardian"
  version: "1.0.0"
  symbol: "🔥"
  capabilities:
    - cultural-sensitivity-check
    - ancestral-wisdom-validation
    - indigenous-respect-assessment
    - appropriation-detection
  triggers:
    - "cultural"
    - "ancestral"
    - "indigenous"
    - "traditional"
    - "heritage"
  accepts:
    - council-evaluation-request
    - cultural-query
  produces:
    - cultural-restoration-score
    - appropriation-flag
    - ancestral-guidance
  dependencies:
    - legion-of-living-light/lorekeepers
    - legion-of-living-light/bonefires
  authority_level: "constitutive"
  path: "stewardship-council/04-flame-of-cultural-restoration.md"

# stewardship-council/weaver-of-collective-futures
agent:
  id: "stewardship-council/weaver-of-collective-futures"
  name: "Weaver of Collective Futures"
  domain: "stewardship-council"
  group: "council-members"
  description: "Planetary awakening and collective timeline vision"
  version: "1.0.0"
  symbol: "🌀"
  capabilities:
    - collective-impact-assessment
    - planetary-alignment-check
    - future-timeline-vision
    - community-benefit-analysis
  triggers:
    - "collective future"
    - "planetary"
    - "shared vision"
    - "community impact"
  accepts:
    - council-evaluation-request
    - collective-query
  produces:
    - collective-futures-score
    - planetary-alignment-report
    - community-impact-assessment
  dependencies:
    - legion-of-living-light/timeweavers
    - legion-of-living-light/mythbuilders
  authority_level: "constitutive"
  path: "stewardship-council/05-weaver-of-collective-futures.md"

# stewardship-council/steward-of-exchange
agent:
  id: "stewardship-council/steward-of-exchange"
  name: "Steward of Exchange"
  domain: "stewardship-council"
  group: "council-members"
  description: "Value flow, abundance, and energetic reciprocity"
  version: "1.0.0"
  symbol: "⚖️"
  capabilities:
    - value-flow-analysis
    - abundance-check
    - reciprocity-validation
    - economic-sustainability-review
  triggers:
    - "exchange"
    - "value flow"
    - "abundance"
    - "reciprocity"
    - "economic model"
  accepts:
    - council-evaluation-request
    - exchange-query
  produces:
    - exchange-stewardship-score
    - value-flow-assessment
    - sustainability-report
  dependencies:
    - legion-of-living-light/measurekeepers
    - legion-of-living-light/offerers
  authority_level: "constitutive"
  path: "stewardship-council/06-steward-of-exchange.md"

# stewardship-council/mirror-of-the-multiverse
agent:
  id: "stewardship-council/mirror-of-the-multiverse"
  name: "Mirror of the Multiverse"
  domain: "stewardship-council"
  group: "council-members"
  description: "Potential timelines and unseen ripple effects"
  version: "1.0.0"
  symbol: "🪞"
  capabilities:
    - timeline-analysis
    - ripple-effect-detection
    - consequence-mapping
    - shadow-integration-check
  triggers:
    - "consequences"
    - "ripple effects"
    - "what if"
    - "unseen impact"
    - "shadow"
  accepts:
    - council-evaluation-request
    - consequence-query
  produces:
    - multiverse-reflection-score
    - ripple-analysis
    - shadow-integration-report
  dependencies:
    - legion-of-living-light/shadowseers
    - legion-of-living-light/prismwalkers
  authority_level: "constitutive"
  path: "stewardship-council/07-mirror-of-the-multiverse.md"
```

---

### Domain: legion-of-living-light

Protection, enforcement, and healing forces.

#### Commanders (7)

| ID | Name | Symbol | Focus |
|----|------|--------|-------|
| `legion/sword-of-soul` | Sword of Soul | ⚔️ | Truth, discernment, dharma |
| `legion/rooted-shield` | Rooted Shield | 🛡️ | Earth harmony, protection |
| `legion/gridsmith` | Gridsmith | 🔧 | Systemic coherence, patterns |
| `legion/ember-of-memory` | Ember of Memory | 🕯️ | Ancestral wisdom, tradition |
| `legion/spiral-seer` | Spiral Seer | 🌀 | Timeline insight, vision |
| `legion/scale-of-grace` | Scale of Grace | ⚖️ | Sacred exchange, balance |
| `legion/mirrorblade` | Mirrorblade | 🗡️ | Shadow work, quantum insight |

#### Armies (21)

```yaml
# Organized by Commander

# Under Sword of Soul (⚔️)
- legion/flamewatchers     # Truthbearers, discernment
- legion/voicecutters      # Word purity, clarity
- legion/pathforgers       # Way-making, dharma

# Under Rooted Shield (🛡️)
- legion/forest-sentinels  # Forest guardians
- legion/watercallers      # Water keepers
- legion/stoneholders      # Earth anchors

# Under Gridsmith (🔧)
- legion/patternwrights    # Pattern crafters
- legion/sealbearers       # Seal keepers
- legion/harmonists        # Harmony weavers

# Under Ember of Memory (🕯️)
- legion/lorekeepers       # Knowledge guardians
- legion/bonefires         # Ancestral fires
- legion/permissionkeepers # Permission guardians

# Under Spiral Seer (🌀)
- legion/timeweavers       # Timeline weavers
- legion/mythbuilders      # Story architects
- legion/eclipsewalkers    # Transition guides

# Under Scale of Grace (⚖️)
- legion/measurekeepers    # Balance guardians
- legion/offerers          # Gift bearers
- legion/redeemers         # Restoration agents

# Under Mirrorblade (🗡️)
- legion/pathsplitters     # Path dividers
- legion/shadowseers       # Shadow watchers
- legion/prismwalkers      # Light refractors
```

#### Sacred Orders (5)

```yaml
- legion/shadow-facers         # Alchemists of the Abyss
- legion/sanctum-council       # Circle of Sacred Judgement
- legion/circle-of-renewal     # Keepers of Gentle Return
- legion/watchers-beyond       # Eyes of the Outer Rings
- legion/children-of-next-dawn # Pulse of the Future
```

---

### Domain: core-development

Specialized code review and development agents (from ai-coding-config).

| ID | Name | Capabilities | Triggers |
|----|------|--------------|----------|
| `core-dev/autonomous-developer` | Autonomous Developer | full-implementation, end-to-end | "build this", "implement autonomously" |
| `core-dev/architecture-auditor` | Architecture Auditor | architecture-review, patterns | "review architecture", "design review" |
| `core-dev/security-reviewer` | Security Reviewer | security-audit, vulnerability-detection | "security review", "vulnerability check" |
| `core-dev/performance-reviewer` | Performance Reviewer | performance-analysis, optimization | "performance review", "optimize" |
| `core-dev/test-engineer` | Test Engineer | test-design, coverage-analysis | "design tests", "test strategy" |
| `core-dev/debugger` | Debugger | debugging, issue-diagnosis | "debug", "find the bug" |
| `core-dev/simplifier` | Simplifier | code-simplification, readability | "simplify", "make readable" |

---

## Discovery Queries

### By Capability

```
Find agents that can: "review code"
→ Returns: workflow/reviewer-agent, core-dev/security-reviewer, core-dev/architecture-auditor, ...

Find agents that can: "handle legal matters"
→ Returns: legal-department/*, brand-proposal/legal-bridge

Find agents that can: "evaluate ecological impact"
→ Returns: stewardship-council/guardian-of-gaia, legion/forest-sentinels
```

### By Domain

```
All agents in domain: "workflow"
→ Returns: 8 agents

All agents in domain: "stewardship-council"
→ Returns: 7 agents

All agents in domain: "legion-of-living-light"
→ Returns: 7 commanders + 21 armies + 5 orders = 33 agents
```

### By Authority Level

```
All agents with authority: "constitutive"
→ Returns: stewardship-council/* (governance decisions)

All agents with authority: "executive"
→ Returns: */orchestrator, */legal-counsel (coordination)

All agents with authority: "operational"
→ Returns: all specialized agents (execution)
```

---

### Domain: consulting-services

Client-facing consulting arm agents for revenue generation and service delivery.

| ID | Name | Capabilities | Triggers |
|----|------|--------------|----------|
| `consulting-services/consulting-orchestrator` | Consulting Orchestrator | coordinate-engagements, route-clients, revenue-tracking | "new consulting client", "consulting engagement" |
| `consulting-services/discovery-agent` | Discovery Agent | qualify-clients, discovery-calls, need-assessment | "qualify client", "discovery call" |
| `consulting-services/strategy-architect` | Strategy Architect | ai-blueprint, business-audit, roadmap-creation | "ai strategy", "ai blueprint" |
| `consulting-services/implementation-lead` | Implementation Lead | ai-implementation, system-building, sprint-delivery | "ai implementation", "implementation sprint" |
| `consulting-services/story-excavator` | Story Excavator | story-creation, book-development, narrative-architecture | "story creation", "book project", "breath of life" |
| `consulting-services/revenue-optimizer` | Revenue Optimizer | upsell-identification, pricing-strategy, deal-structuring | "upsell opportunity", "pricing strategy" |
| `consulting-services/client-success` | Client Success Agent | relationship-nurturing, case-studies, referral-generation | "client relationship", "case study" |

```yaml
# consulting-services/consulting-orchestrator
agent:
  id: "consulting-services/consulting-orchestrator"
  name: "Consulting Orchestrator"
  domain: "consulting-services"
  group: "consulting-agents"
  description: "Central coordinator for all consulting engagements and revenue operations"
  version: "1.0.0"
  capabilities:
    - coordinate-engagements
    - route-to-service-tracks
    - monitor-engagement-health
    - track-revenue-pipeline
    - manage-client-journey
  triggers:
    - "new consulting client"
    - "consulting engagement"
    - "client intake"
    - "route consulting"
  accepts:
    - consulting-intake
    - qualification-complete
    - delivery-complete
    - upsell-trigger
  produces:
    - track-assignment
    - engagement-status
    - revenue-report
  dependencies:
    - consulting-services/discovery-agent
    - consulting-services/strategy-architect
    - consulting-services/implementation-lead
    - consulting-services/story-excavator
    - consulting-services/revenue-optimizer
    - consulting-services/client-success
  authority_level: "executive"
  path: "consulting-services/consulting-orchestrator.md"

# consulting-services/discovery-agent
agent:
  id: "consulting-services/discovery-agent"
  name: "Discovery Agent"
  domain: "consulting-services"
  group: "consulting-agents"
  description: "Client qualification, need assessment, and discovery call facilitation"
  version: "1.0.0"
  capabilities:
    - qualify-bant
    - conduct-discovery-calls
    - assess-client-needs
    - score-opportunities
    - recommend-service-track
  triggers:
    - "qualify client"
    - "discovery call"
    - "client intake"
    - "assess prospect"
  accepts:
    - inquiry-intake
    - client-information
  produces:
    - qualification-score
    - discovery-summary
    - track-recommendation
  dependencies:
    - consulting-services/consulting-orchestrator
  authority_level: "operational"
  path: "consulting-services/discovery-agent.md"

# consulting-services/strategy-architect
agent:
  id: "consulting-services/strategy-architect"
  name: "Strategy Architect"
  domain: "consulting-services"
  group: "consulting-agents"
  description: "Creates AI Business Acceleration Blueprints and strategic roadmaps"
  version: "1.0.0"
  capabilities:
    - conduct-business-audit
    - identify-ai-opportunities
    - recommend-tool-stack
    - create-90-day-roadmap
    - deliver-blueprint
  triggers:
    - "ai strategy"
    - "ai blueprint"
    - "strategy engagement"
    - "ai roadmap"
  accepts:
    - track-assignment
    - discovery-summary
  produces:
    - ai-blueprint
    - opportunity-matrix
    - tool-recommendations
    - implementation-roadmap
  dependencies:
    - consulting-services/consulting-orchestrator
    - consulting-services/revenue-optimizer
  authority_level: "operational"
  path: "consulting-services/strategy-architect.md"

# consulting-services/implementation-lead
agent:
  id: "consulting-services/implementation-lead"
  name: "Implementation Lead"
  domain: "consulting-services"
  group: "consulting-agents"
  description: "Leads AI Implementation Sprints and builds client AI solutions"
  version: "1.0.0"
  capabilities:
    - build-gpt-agents
    - deploy-website-ai
    - create-marketing-automation
    - configure-crm-workflows
    - deliver-team-training
  triggers:
    - "ai implementation"
    - "implementation sprint"
    - "build ai solution"
    - "ai project"
  accepts:
    - track-assignment
    - blueprint-deliverable
    - implementation-sow
  produces:
    - implemented-systems
    - training-materials
    - documentation
    - handoff-package
  dependencies:
    - consulting-services/consulting-orchestrator
    - consulting-services/client-success
  authority_level: "operational"
  path: "consulting-services/implementation-lead.md"

# consulting-services/story-excavator
agent:
  id: "consulting-services/story-excavator"
  name: "Story Excavator"
  domain: "consulting-services"
  group: "consulting-agents"
  description: "Leads the flagship 'Breath of Life' story and book creation product"
  version: "1.0.0"
  capabilities:
    - excavate-story
    - architect-narrative
    - develop-book-outline
    - generate-first-draft
    - create-content-engine
  triggers:
    - "story creation"
    - "book project"
    - "breath of life"
    - "author journey"
  accepts:
    - track-assignment
    - client-background
  produces:
    - narrative-architecture
    - book-outline
    - manuscript-draft
    - content-engine
    - brand-voice-guide
  dependencies:
    - consulting-services/consulting-orchestrator
    - consulting-services/client-success
  authority_level: "operational"
  path: "consulting-services/story-excavator.md"

# consulting-services/revenue-optimizer
agent:
  id: "consulting-services/revenue-optimizer"
  name: "Revenue Optimizer"
  domain: "consulting-services"
  group: "consulting-agents"
  description: "Identifies upsell paths, optimizes pricing, and maximizes client lifetime value"
  version: "1.0.0"
  capabilities:
    - identify-upsell-opportunities
    - structure-deals
    - optimize-pricing
    - manage-pipeline
    - forecast-revenue
  triggers:
    - "upsell opportunity"
    - "pricing strategy"
    - "revenue optimization"
    - "deal structure"
  accepts:
    - engagement-milestone
    - delivery-complete
    - client-signals
  produces:
    - upsell-proposal
    - pricing-recommendation
    - pipeline-report
    - revenue-forecast
  dependencies:
    - consulting-services/consulting-orchestrator
  authority_level: "operational"
  path: "consulting-services/revenue-optimizer.md"

# consulting-services/client-success
agent:
  id: "consulting-services/client-success"
  name: "Client Success Agent"
  domain: "consulting-services"
  group: "consulting-agents"
  description: "Manages ongoing client relationships, case studies, and referral generation"
  version: "1.0.0"
  capabilities:
    - nurture-relationships
    - capture-case-studies
    - collect-testimonials
    - generate-referrals
    - manage-retainers
  triggers:
    - "client relationship"
    - "case study"
    - "testimonial"
    - "client check-in"
  accepts:
    - delivery-complete
    - client-transition
  produces:
    - case-study
    - testimonial
    - referral
    - client-health-report
  dependencies:
    - consulting-services/revenue-optimizer
  authority_level: "operational"
  path: "consulting-services/client-success.md"
```

---

### Domain: saas-spec-generator

High-intention SaaS business development and specification generation agents.

| ID | Name | Capabilities | Triggers |
|----|------|--------------|----------|
| `saas-spec-generator/idea-evaluator` | SaaS Idea Evaluator | sacred-alignment-check, viability-assessment, values-scoring | "evaluate SaaS idea", "validate business idea" |
| `saas-spec-generator/market-analyst` | Market Analyst | competitor-research, positioning-strategy, gap-analysis | "analyze market", "competitive landscape" |
| `saas-spec-generator/mvp-architect` | MVP Architect | feature-prioritization, code-budgeting, technical-design | "design MVP", "architect product" |
| `saas-spec-generator/phase-planner` | Phase Planner | traction-triggers, expansion-planning, pivot-criteria | "plan phases", "expansion roadmap" |
| `saas-spec-generator/spec-synthesizer` | Spec Synthesizer | spec-generation, brand-factory-integration, document-compilation | "generate spec", "synthesize specification" |

```yaml
# saas-spec-generator/idea-evaluator
agent:
  id: "saas-spec-generator/idea-evaluator"
  name: "SaaS Idea Evaluator"
  domain: "saas-spec-generator"
  group: "saas-biz-dev"
  description: "Validates SaaS ideas against Sacred Laws and viability criteria"
  version: "1.0.0"
  capabilities:
    - sacred-law-alignment-check
    - council-value-assessment
    - viability-scoring
    - complexity-estimation
    - go-no-go-recommendation
  triggers:
    - "evaluate this SaaS idea"
    - "is this SaaS viable"
    - "check SaaS alignment"
    - "validate business idea"
    - "assess SaaS concept"
  accepts:
    - saas-idea-intake
    - business-concept
  produces:
    - alignment-score
    - viability-assessment
    - council-review-tier
    - risk-list
  dependencies:
    - saas-spec-generator/market-analyst
    - stewardship-council/*
  authority_level: "operational"
  path: "saas-spec-generator/01-idea-evaluator.md"

# saas-spec-generator/market-analyst
agent:
  id: "saas-spec-generator/market-analyst"
  name: "Market Analyst"
  domain: "saas-spec-generator"
  group: "saas-biz-dev"
  description: "Analyzes competitive landscape and develops positioning strategy"
  version: "1.0.0"
  capabilities:
    - competitor-identification
    - feature-comparison
    - pricing-analysis
    - gap-identification
    - positioning-strategy
    - differentiation-planning
  triggers:
    - "analyze the market for"
    - "research competitors for"
    - "market positioning for"
    - "competitive landscape"
    - "market analysis"
  accepts:
    - validated-idea
    - evaluation-context
  produces:
    - market-definition
    - competitive-landscape
    - positioning-statement
    - market-entry-strategy
  dependencies:
    - saas-spec-generator/mvp-architect
  authority_level: "operational"
  path: "saas-spec-generator/02-market-analyst.md"

# saas-spec-generator/mvp-architect
agent:
  id: "saas-spec-generator/mvp-architect"
  name: "MVP Architect"
  domain: "saas-spec-generator"
  group: "saas-biz-dev"
  description: "Designs minimal viable product within strict code budget"
  version: "1.0.0"
  capabilities:
    - problem-crystallization
    - feature-ruthless-prioritization
    - technical-stack-selection
    - code-budget-allocation
    - sovereignty-architecture
    - api-design
  triggers:
    - "design MVP for"
    - "architect minimal product"
    - "create MVP specification"
    - "build minimal viable"
    - "design SaaS architecture"
  accepts:
    - positioned-idea
    - market-context
  produces:
    - mvp-specification
    - technical-architecture
    - code-budget-allocation
    - feature-set
  dependencies:
    - saas-spec-generator/phase-planner
  authority_level: "operational"
  path: "saas-spec-generator/03-mvp-architect.md"

# saas-spec-generator/phase-planner
agent:
  id: "saas-spec-generator/phase-planner"
  name: "Phase Planner"
  domain: "saas-spec-generator"
  group: "saas-biz-dev"
  description: "Creates traction-triggered expansion roadmaps"
  version: "1.0.0"
  capabilities:
    - validation-phase-design
    - traction-trigger-definition
    - expansion-planning
    - pivot-criteria-setting
    - sunset-criteria-setting
    - feedback-system-design
  triggers:
    - "plan SaaS phases"
    - "create expansion roadmap"
    - "phase planning for"
    - "traction-based roadmap"
    - "growth phases"
  accepts:
    - mvp-specification
    - market-context
  produces:
    - phase-plan
    - traction-triggers
    - pivot-criteria
    - code-budget-progression
  dependencies:
    - saas-spec-generator/spec-synthesizer
  authority_level: "operational"
  path: "saas-spec-generator/04-phase-planner.md"

# saas-spec-generator/spec-synthesizer
agent:
  id: "saas-spec-generator/spec-synthesizer"
  name: "Spec Synthesizer"
  domain: "saas-spec-generator"
  group: "saas-biz-dev"
  description: "Generates Brand Factory-ready specification packages"
  version: "1.0.0"
  capabilities:
    - artifact-collection
    - document-generation
    - module-manifest-creation
    - acceptance-criteria-compilation
    - council-package-preparation
  triggers:
    - "generate SaaS spec"
    - "synthesize spec package"
    - "create brand factory spec"
    - "finalize SaaS specification"
    - "compile spec documents"
  accepts:
    - all-prior-artifacts
    - output-options
  produces:
    - complete-spec-package
    - module-manifest
    - council-review-package
  dependencies:
    - brand-proposal/council-liaison
  authority_level: "operational"
  path: "saas-spec-generator/05-spec-synthesizer.md"
```

---

## Agent Statistics

| Category | Count |
|----------|-------|
| **Workflow Agents** | 8 |
| **Brand Proposal Agents** | 7 |
| **Legal Department Agents** | 7 |
| **Consulting Services Agents** | 7 |
| **SaaS Spec Generator Agents** | 5 |
| **Stewardship Council** | 7 |
| **Legion Commanders** | 7 |
| **Legion Armies** | 21 |
| **Legion Orders** | 5 |
| **Core Development Agents** | 22+ |
| **Total Agents** | **96+** |

---

## Registry Maintenance

### Adding a New Agent

1. Create agent file in appropriate domain directory
2. Add agent entry to this registry
3. Define capabilities, triggers, dependencies
4. Register with Universal Router
5. Test discovery and routing

### Updating Agent Capabilities

1. Update agent file
2. Update registry entry
3. Regenerate router embeddings
4. Test affected routing paths

---

*"Every agent catalogued. Every capability known. The network is complete."*
