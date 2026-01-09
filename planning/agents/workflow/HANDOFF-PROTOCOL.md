# Handoff Protocol

This document defines the standard protocol for agent-to-agent communication in the automated development workflow.

## Overview

Agents communicate via structured XML handoffs. Each handoff contains:
- Source and destination agent
- Issue/PR identifiers
- Status and outcome
- Agent-specific data

## Handoff Structure

```xml
<handoff>
  <from>source-agent-name</from>
  <to>target-agent-name</to>
  <timestamp>2024-01-15T10:30:00Z</timestamp>
  <issue_number>123</issue_number>
  <pr_number>456</pr_number>  <!-- Optional, if PR exists -->
  <status>success|failure|blocked</status>
  <summary>One-line description of outcome</summary>
  <data>
    <!-- Agent-specific payload -->
  </data>
</handoff>
```

## Agent-Specific Handoffs

### Issue Manager → Prep Agent

```xml
<handoff>
  <from>issue-manager</from>
  <to>prep-agent</to>
  <issue_url>https://github.com/owner/repo/issues/123</issue_url>
  <issue_number>123</issue_number>
  <issue_title>Add user authentication</issue_title>
  <type>feature|bug|enhancement|refactor|chore</type>
  <priority>critical|high|medium|low</priority>
  <summary>Created issue for user authentication feature</summary>
  <requirements>
    <requirement>Users can log in with email/password</requirement>
    <requirement>JWT tokens expire after 1 hour</requirement>
  </requirements>
</handoff>
```

### Prep Agent → Implementer Agent

```xml
<handoff>
  <from>prep-agent</from>
  <to>implementer-agent</to>
  <issue_url>https://github.com/owner/repo/issues/123</issue_url>
  <issue_number>123</issue_number>
  <branch>feature/issue-123-user-auth</branch>
  <workspace_path>/path/to/repo-issue-123</workspace_path>
  <workspace_type>worktree|in-place|cloud</workspace_type>
  <port>3100</port>
  <status>ready</status>
  <validation>
    <dependencies>installed</dependencies>
    <build>passing</build>
    <dev_server>verified</dev_server>
  </validation>
</handoff>
```

### Implementer Agent → Reviewer Agent

```xml
<handoff>
  <from>implementer-agent</from>
  <to>reviewer-agent</to>
  <issue_url>https://github.com/owner/repo/issues/123</issue_url>
  <issue_number>123</issue_number>
  <pr_url>https://github.com/owner/repo/pull/456</pr_url>
  <pr_number>456</pr_number>
  <branch>feature/issue-123-user-auth</branch>
  <summary>Implemented user authentication with JWT tokens</summary>
  <files_changed>12</files_changed>
  <tests_added>24</tests_added>
  <coverage>96%</coverage>
  <commits>
    <commit sha="abc123">feat(auth): add login endpoint</commit>
    <commit sha="def456">feat(auth): add JWT token generation</commit>
  </commits>
</handoff>
```

### Reviewer Agent → Fixer Agent (Changes Requested)

```xml
<handoff>
  <from>reviewer-agent</from>
  <to>fixer-agent</to>
  <pr_url>https://github.com/owner/repo/pull/456</pr_url>
  <pr_number>456</pr_number>
  <issue_number>123</issue_number>
  <review_status>changes_requested</review_status>
  <critical_count>2</critical_count>
  <important_count>3</important_count>
  <suggestion_count>4</suggestion_count>
  <blocking_issues>
    <issue location="src/auth/login.ts:42" severity="critical">SQL injection vulnerability</issue>
    <issue location="src/admin/routes.ts:15" severity="critical">Missing authentication check</issue>
    <issue location="src/auth/token.ts:78" severity="important">Token not invalidated on logout</issue>
  </blocking_issues>
</handoff>
```

### Reviewer Agent → Validator Agent (Approved)

```xml
<handoff>
  <from>reviewer-agent</from>
  <to>validator-agent</to>
  <pr_url>https://github.com/owner/repo/pull/456</pr_url>
  <pr_number>456</pr_number>
  <issue_number>123</issue_number>
  <review_status>approved</review_status>
  <critical_count>0</critical_count>
  <important_count>0</important_count>
  <summary>Code review passed with no blocking issues</summary>
</handoff>
```

### Fixer Agent → Reviewer Agent (Re-review)

```xml
<handoff>
  <from>fixer-agent</from>
  <to>reviewer-agent</to>
  <pr_url>https://github.com/owner/repo/pull/456</pr_url>
  <pr_number>456</pr_number>
  <issue_number>123</issue_number>
  <status>ready-for-re-review</status>
  <fixes_applied>
    <fix location="src/auth/login.ts:42">Parameterized SQL queries</fix>
    <fix location="src/admin/routes.ts:15">Added authentication middleware</fix>
    <fix location="src/auth/token.ts:78">Token invalidation on logout</fix>
  </fixes_applied>
  <commits_added>3</commits_added>
</handoff>
```

### Validator Agent → Closer Agent (Merged)

```xml
<handoff>
  <from>validator-agent</from>
  <to>closer-agent</to>
  <pr_url>https://github.com/owner/repo/pull/456</pr_url>
  <pr_number>456</pr_number>
  <issue_number>123</issue_number>
  <merge_status>merged</merge_status>
  <merge_sha>abc123def456</merge_sha>
  <merge_strategy>squash</merge_strategy>
  <validation_summary>
    <tests>passed (156/156)</tests>
    <coverage>94%</coverage>
    <lint>passed</lint>
    <type_check>passed</type_check>
    <security>no vulnerabilities</security>
  </validation_summary>
</handoff>
```

### Validator Agent → Fixer Agent (Validation Failed)

```xml
<handoff>
  <from>validator-agent</from>
  <to>fixer-agent</to>
  <pr_url>https://github.com/owner/repo/pull/456</pr_url>
  <pr_number>456</pr_number>
  <issue_number>123</issue_number>
  <validation_status>failed</validation_status>
  <failures>
    <failure type="test">src/auth/login.test.ts - expected 200, got 401</failure>
    <failure type="lint">src/utils/helpers.ts:15 - unused import</failure>
    <failure type="type_check">src/auth/types.ts:23 - Type mismatch</failure>
  </failures>
</handoff>
```

### Closer Agent → Workflow Complete

```xml
<workflow-complete>
  <issue_number>123</issue_number>
  <issue_url>https://github.com/owner/repo/issues/123</issue_url>
  <pr_number>456</pr_number>
  <pr_url>https://github.com/owner/repo/pull/456</pr_url>
  <status>completed</status>
  <cycle_time>2 days 4 hours</cycle_time>
  <summary>User authentication implemented with JWT tokens</summary>
  <metrics>
    <review_iterations>2</review_iterations>
    <total_commits>8</total_commits>
    <tests_added>24</tests_added>
    <coverage>94%</coverage>
  </metrics>
  <actions_taken>
    <action>Closing comment posted</action>
    <action>Issue closed</action>
    <action>Branch deleted</action>
    <action>Related issues updated</action>
  </actions_taken>
</workflow-complete>
```

## Status Codes

| Status | Meaning |
|--------|---------|
| `success` | Agent completed successfully, handoff to next agent |
| `failure` | Agent failed, may need retry or escalation |
| `blocked` | Agent blocked by external factor, needs intervention |
| `pending` | Agent is still processing |
| `skipped` | Agent skipped (e.g., no fixes needed) |

## Error Handoffs

When an agent fails, include error details:

```xml
<handoff>
  <from>implementer-agent</from>
  <to>orchestrator</to>
  <status>failure</status>
  <error>
    <type>BuildError</type>
    <message>TypeScript compilation failed</message>
    <details>Cannot find module '@/auth/types'</details>
    <recoverable>true</recoverable>
    <suggested_action>Check import paths and module resolution</suggested_action>
  </error>
</handoff>
```

## Handoff Flow Diagram

```
Issue Manager ──────────────────────────────────────────────────────┐
     │                                                              │
     │ issue_url, issue_number, type, priority, requirements        │
     ▼                                                              │
Prep Agent ─────────────────────────────────────────────────────────┤
     │                                                              │
     │ + branch, workspace_path, port, validation                   │
     ▼                                                              │
Implementer Agent ──────────────────────────────────────────────────┤
     │                                                              │
     │ + pr_url, pr_number, files_changed, tests_added, coverage    │
     ▼                                                              │
Reviewer Agent ─────────┬───────────────────────────────────────────┤
     │                  │                                           │
     │ approved         │ changes_requested                         │
     │                  │ + blocking_issues                         │
     ▼                  ▼                                           │
Validator Agent    Fixer Agent ─────────────────────────────────────┤
     │                  │                                           │
     │ merged           │ + fixes_applied, commits_added            │
     │                  │                                           │
     │                  └────────────────▶ Reviewer Agent           │
     ▼                                          │                   │
Closer Agent ◀──────────────────────────────────┘                   │
     │                                                              │
     │ workflow complete                                            │
     ▼                                                              │
   Done ◀───────────────────────────────────────────────────────────┘
```

## Integration with Existing Tooling

The handoff protocol integrates with existing ai-coding-config tools:

| Workflow Stage | ai-coding-config Tool |
|---------------|----------------------|
| Issue creation | Custom (new) |
| Environment prep | `/setup-environment` |
| Implementation | `/autotask`, `autonomous-developer` agent |
| Code review | `reviewer-*` agents |
| Fix application | `/address-pr-comments` |
| Validation | `/verify-fix`, test runners |
| PR operations | `git-writer` agent |

## Extensibility

To add a new agent to the workflow:

1. Create agent definition in `workflow-agents/`
2. Define input handoff schema (what data it receives)
3. Define output handoff schemas (success, failure, blocked)
4. Update orchestrator routing logic
5. Add to workflow state machine
6. Document in this file
