# Automated Development Workflow Agents

A suite of specialized agents that automate the complete software development lifecycle from issue creation to merge.

## Overview

This system implements an autonomous development workflow where GitHub issues drive development through a coordinated pipeline of specialized agents. Each agent handles a specific stage of the development process, handing off to the next when complete.

```
┌─────────────────────────────────────────────────────────────────┐
│                    WORKFLOW PIPELINE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   📝 Issue      🔧 Prep       💻 Implement    👀 Review        │
│   Manager  ───▶ Agent   ───▶ Agent      ───▶ Agent           │
│                                                │               │
│                                         ┌──────┴──────┐        │
│                                         ▼             ▼        │
│                                    🔨 Fixer      ✅ Validator  │
│                                       Agent         Agent      │
│                                         │             │        │
│                                         │      ┌──────┘        │
│                                         ▼      ▼               │
│                                       📋 Closer Agent          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Intuition Engine Integration

All workflow agents are integrated with the **Intuition Engine** for experience-based learning. This enables:

- **Fast Intuition** - Instant pattern recognition from accumulated wisdom
- **Continuous Learning** - Every action becomes a lesson for the future
- **Adaptive Behavior** - Agents improve their decision-making over time

See [INTUITION-ENGINE.md](../INTUITION-ENGINE.md) for the complete integration protocol.

Each agent includes domain-specific lessons that guide decision-making:
- Pre-decision intuition checks
- Domain lesson libraries
- Post-action reflection and learning

## Agents

| Agent | Purpose | Input | Output |
|-------|---------|-------|--------|
| [Issue Manager](issue-manager.md) | Create/validate GitHub issues | User request | Issue URL → Prep |
| [Prep Agent](prep-agent.md) | Set up branch & environment | Issue URL | Workspace → Implementer |
| [Implementer Agent](implementer-agent.md) | Write code, tests, create PR | Workspace | PR URL → Reviewer |
| [Reviewer Agent](reviewer-agent.md) | Code review, post comments | PR URL | Review → Fixer/Validator |
| [Fixer Agent](fixer-agent.md) | Address review comments | Review comments | Fixed PR → Reviewer |
| [Validator Agent](validator-agent.md) | Run checks, merge PR | Approved PR | Merged → Closer |
| [Closer Agent](closer-agent.md) | Close issue with summary | Merged PR | Done |
| [Orchestrator](orchestrator.md) | Coordinate all agents | Events | Routing |

## Quick Start

### 1. Start a Workflow from an Issue

```bash
# Create issue and start workflow
@issue-manager Create a feature for user authentication with JWT tokens

# Or from existing issue
@orchestrator Start workflow for issue #123
```

### 2. Monitor Progress

```bash
# Check workflow status
@orchestrator Status for issue #123

# View active workflows
@orchestrator Dashboard
```

### 3. Manual Intervention (if needed)

```bash
# Resume stalled workflow
@orchestrator Resume issue #123

# Force specific stage
@orchestrator Run reviewer for PR #456
```

## Integration with ai-coding-config

These workflow agents leverage the existing ai-coding-config tooling:

| Agent | Uses |
|-------|------|
| Prep Agent | `/setup-environment` command |
| Implementer | `/autotask` command, `autonomous-developer` agent |
| Reviewer | `security-reviewer`, `performance-reviewer`, etc. |
| Fixer | `/address-pr-comments` command |
| Validator | `/verify-fix` command, test runners |

## Handoff Protocol

Agents communicate via structured XML handoffs. See [HANDOFF-PROTOCOL.md](HANDOFF-PROTOCOL.md) for the complete specification.

Example handoff:
```xml
<handoff>
  <from>implementer-agent</from>
  <to>reviewer-agent</to>
  <issue_number>123</issue_number>
  <pr_number>456</pr_number>
  <status>success</status>
  <summary>Created PR with user authentication implementation</summary>
</handoff>
```

## Workflow States

| State | Description |
|-------|-------------|
| `created` | Issue created, waiting for prep |
| `preparing` | Environment being set up |
| `implementing` | Code being written |
| `in_review` | Awaiting code review |
| `fixing` | Addressing review comments |
| `validating` | Running final checks |
| `merging` | PR being merged |
| `closed` | Issue closed, workflow complete |

## Execution Modes

### Fully Autonomous
All stages execute without human intervention. PRs auto-merge when validated.

### Semi-Autonomous
Human checkpoints at key stages (issue approval, merge approval).

### Supervised
Human approval required for each stage transition.

## Requirements

- GitHub CLI (`gh`) installed and authenticated
- Node.js/Python environment
- ai-coding-config tools installed
- Repository with CI/CD configured

## Configuration

### Repository Labels

The workflow uses these labels:
- `ready` - Issue ready for development
- `in-progress` - Development underway
- `needs-review` - PR awaiting review
- `needs-human-review` - Escalated for human attention

### Branch Naming

Branches follow the pattern: `{type}/issue-{number}-{slug}`

Examples:
- `feature/issue-123-user-auth`
- `fix/issue-456-login-bug`
- `refactor/issue-789-cleanup`

## Metrics

The workflow tracks:
- **Cycle Time**: Issue creation to merge
- **Review Iterations**: Times through review loop
- **Auto-merge Rate**: PRs merged without manual intervention
- **Coverage Trend**: Test coverage over time

## Error Handling

### Automatic Recovery
- Transient failures retry with exponential backoff
- CI flakiness detected and retried
- Merge conflicts trigger rebase attempt

### Escalation
- Security reviews requiring human judgment
- Architectural decisions
- Repeated failures (>3 attempts)

## Directory Structure

```
agents/
├── README.md                 # Agents overview
├── INTUITION-ENGINE.md       # Shared intuition engine integration
└── workflow/                 # This directory
    ├── README.md             # This file
    ├── HANDOFF-PROTOCOL.md   # Agent communication spec
    ├── plugin.json           # Plugin manifest
    ├── orchestrator.md       # Workflow coordinator
    ├── issue-manager.md      # Issue creation agent
    ├── prep-agent.md         # Environment setup agent
    ├── implementer-agent.md  # Code implementation agent
    ├── reviewer-agent.md     # Code review agent
    ├── fixer-agent.md        # Review fix agent
    ├── validator-agent.md    # Validation & merge agent
    └── closer-agent.md       # Issue closure agent
```

## Contributing

To add or modify agents:

1. Follow the agent file format (YAML frontmatter + markdown body)
2. Define clear input/output handoff schemas
3. Integrate with existing ai-coding-config tools where possible
4. Update HANDOFF-PROTOCOL.md with new handoff types
5. Update orchestrator routing logic

## Philosophy

This workflow embodies the principle that **every development task should be tracked and automated**. By creating clear boundaries between agents, we achieve:

- **Clarity**: Each agent has one job
- **Debuggability**: Easy to identify where issues occur
- **Scalability**: Agents can run in parallel
- **Resilience**: Failures are isolated and recoverable
- **Traceability**: Full audit trail from issue to merge
- **Learning**: Every action contributes to accumulated wisdom

The goal is to make high-quality software development the default, not the exception. With the Intuition Engine integration, the system gets wiser with every workflow completion.
