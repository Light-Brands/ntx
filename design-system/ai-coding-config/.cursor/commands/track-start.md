# /track-start - Start Tracked Work

Begin work on a specific feature with full context loading, tooling validation, and checkpoint creation.

## Usage

```
/track-start <epic-id> <feature-id> [--task <task-id>] [--no-checkpoint]
```

## Arguments

- `epic-id`: Epic identifier (e.g., `epic-00`, `epic-01`, `epic-1a`)
- `feature-id`: Feature within the epic (e.g., `auth-system`, `database-setup`)
- `--task`: Optional specific task to start with
- `--no-checkpoint`: Skip checkpoint creation

## What This Command Does

1. **Validate Prerequisites**
   - Verify epic exists in tracker
   - Verify feature exists in epic
   - Check dependencies (epic not blocked)
   - Ensure tooling is validated

2. **Create Checkpoint**
   - Save current state before starting
   - Record current branch and git state
   - Enable resume capability if interrupted

3. **Load Context**
   - Load relevant spec sections from `vibeup-design-spec/`
   - Identify design patterns from `design-system-v2/`
   - Load related architecture docs

4. **Load Rules** (via `/load-rules`)
   - Determine applicable rules for task type
   - Load `autonomous-development-workflow.mdc`
   - Load `typescript-coding-standards.mdc`
   - Load `react-components.mdc` if UI work
   - Update tooling.yaml with loaded rules

5. **Set Up TDD Scaffolding**
   - Identify tests needed for feature
   - Generate test file stubs (failing tests first)
   - Set coverage expectations

6. **Update Tracker State**
   - Mark feature as "in-progress"
   - Record start time
   - Set as current focus in progress.yaml
   - Update active work tracking

## Example

```bash
/track-start epic-00 auth-system
```

Output:
```
🎯 Starting work on: epic-00/auth-system

📋 Context loaded:
   Spec: vibeup-design-spec/epics/epic-00-foundation.md#authentication
   Design: design-system-v2/components/auth/

📚 Rules loaded:
   ✓ autonomous-development-workflow.mdc
   ✓ typescript-coding-standards.mdc
   ✓ git-interaction.mdc

🧪 TDD Setup:
   Tests to write: 15 (5 endpoints × 3 tests each)
   Coverage target: 85% (API routes)

💾 Checkpoint created: 2025-12-22-epic-00-auth-a3f2

📝 Feature Tasks:
   Pending:
   - [ ] POST /api/auth/signup (tests → implementation)
   - [ ] POST /api/auth/verify (tests → implementation)
   - [ ] POST /api/auth/login (tests → implementation)
   - [ ] POST /api/auth/logout (tests → implementation)
   - [ ] GET /api/auth/session (tests → implementation)

   Reminder: Write failing tests first! (TDD red phase)

Ready to begin. Use /track-complete <task> when done.
```

## TDD Workflow

This command enforces Test-Driven Development:

1. **Red Phase**: Tests are generated first (they will fail)
2. **Green Phase**: Implement to make tests pass
3. **Refactor Phase**: Clean up while keeping tests green

Cannot mark tasks complete until:
- All associated tests pass
- Coverage meets threshold
- No linting errors

## Integration with Other Commands

- Creates checkpoint → Use `/track-resume` to restore
- Loads rules → Updates `tooling.yaml`
- Sets up TDD → Use `/track-complete` with validation
- Updates progress → View with `/track-status`

## Interruption Handling

If interrupted:
1. Checkpoint was created at start
2. Run `/track-resume` to restore context
3. Continue where you left off

All uncommitted work is tracked in the checkpoint for restoration.

