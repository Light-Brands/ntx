# /track-status - Display Development Progress

Show comprehensive progress status including epic completion, tooling health, active work, and velocity metrics.

## Usage

```
/track-status [--epic <id>] [--feature <id>] [--verbose] [--json]
```

## Options

- `--epic <id>`: Show detailed status for specific epic
- `--feature <id>`: Show detailed status for specific feature (requires --epic)
- `--verbose`: Include all atomic task details
- `--json`: Output as JSON instead of formatted text

## Default Output

```
📊 VIBEUP Development Tracker
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Overall Progress: 4.2% (103/2,451 tasks)
Estimated Completion: March 15, 2025
Velocity: 47 tasks/week (accelerating ↑)

🔧 Tooling Status: ✅ All systems operational
   Rules: 45/45 loaded and validated
   Commands: 12/12 available
   Agents: 7/7 ready
   Coverage Gate: Passing (91.2% average)

📋 Epic Progress:
   [████░░░░░░] 35% Epic 00: Foundation (86/247 tasks)
   [░░░░░░░░░░]  0% Epic 01: Mira (blocked by Epic 00)
   [░░░░░░░░░░]  0% Epic 1A: Crypto (blocked by Epic 00)
   [░░░░░░░░░░]  0% Epic 1B: Karma (blocked by Epic 00)
   [░░░░░░░░░░]  0% Epic 02: Humans (blocked by Epic 00, 01)
   [░░░░░░░░░░]  0% Epic 03: Practices (blocked by Epic 00, 01)
   [░░░░░░░░░░]  0% Epic 04: Discovery (blocked by Epic 00, 01, 02)
   [░░░░░░░░░░]  0% Epic 05: Impact (blocked by Epic 00, 01)
   [░░░░░░░░░░]  0% Epic 06: Business (blocked by Epic 00, 01, 02)
   [░░░░░░░░░░]  0% Epic 07: Community (blocked by 5 epics)
   [░░░░░░░░░░]  0% Epic 08: Monetization (blocked by 3 epics)

🎯 Active Work:
   Cursor: epic-00/auth-system/magic-link-verify (47m elapsed)
   Swarm: 3 tasks running, 5 queued (batch: epic-00-batch-2)

⏰ Last Checkpoint: 2025-12-22T10:30:00Z (15m ago)
   Task: epic-00/auth-system/magic-link-verify
   Branch: feat/epic-00-auth-verify
```

## Epic Detail Output (--epic)

```bash
/track-status --epic epic-00
```

```
📋 Epic 00: Foundation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Status: in-progress
Progress: 35% (86/247 tasks)
Started: 2025-12-20T08:00:00Z
Est. Completion: 2025-12-28

Blocks: epic-01, epic-1a, epic-1b, epic-02, epic-03, epic-05, epic-06

📦 Features:
   [██████████] 100% testing-framework (complete)
   [████████░░]  80% observability (in-progress)
   [██████░░░░]  65% database-setup (in-progress)
   [████░░░░░░]  45% auth-system (in-progress)
   [██░░░░░░░░]  20% feature-flags (in-progress)
   [░░░░░░░░░░]   0% admin-panel (pending)
   [░░░░░░░░░░]   0% design-system (pending)
   [░░░░░░░░░░]   0% dev-environment (pending)

🔧 Tooling for this epic:
   Rules loaded: autonomous-development-workflow.mdc, typescript-coding-standards.mdc
   Coverage: 89.2% (passing)
   TDD enforced: Yes

🎯 Current Focus: auth-system
```

## Feature Detail Output (--epic --feature)

```bash
/track-status --epic epic-00 --feature auth-system
```

```
📦 Feature: epic-00/auth-system
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Status: in-progress
Progress: 45% (27/60 tasks)
Test Coverage: 87%

📊 Endpoints:
   ✅ POST /api/auth/signup
      implementation: complete (PR #145)
      tests_unit: complete (5 tests)
      tests_integration: complete (3 tests)
      
   🔄 POST /api/auth/verify
      implementation: in-progress (cursor)
      tests_unit: complete (4 tests)
      tests_integration: pending
      
   ⏳ POST /api/auth/login
      implementation: pending
      tests_unit: pending
      
   ⏳ POST /api/auth/logout
      implementation: pending
      tests_unit: pending
      
   ⏳ GET /api/auth/session
      implementation: pending
      tests_unit: pending

📊 Services:
   ✅ AuthService_signup: complete (94% coverage)
   🔄 AuthService_verify: in-progress
   ⏳ AuthService_login: pending
   ⏳ AuthService_logout: pending
   ⏳ AuthService_session: pending

📦 Tables:
   ✅ profiles: complete (all subtasks)
   ✅ auth_tokens: complete (all subtasks)
   🔄 sessions: schema complete, RLS pending
```

## JSON Output (--json)

For programmatic consumption:

```bash
/track-status --json
```

Returns the full progress.yaml structure as JSON.

## Velocity Metrics

The tracker calculates:
- **Tasks/day**: Rolling average over last 7 days
- **Tasks/week**: Current week total
- **Trend**: accelerating/stable/decelerating based on week-over-week
- **Est. Completion**: Projection based on current velocity and remaining tasks

## Integration

Reads from:
- `.tracker/progress.yaml` - Platform-wide metrics
- `.tracker/epics/*.yaml` - Per-epic details
- `.tracker/tooling.yaml` - Tooling health

Updates:
- Nothing (read-only command)

## Tips

- Run frequently to stay aware of progress
- Use `--epic` to focus on current work
- Use `--json` for scripting/automation
- Check blockers to plan work order

