# /track-complete - Complete Tracked Task

Mark an atomic task as complete after validating tests pass and coverage meets thresholds.

## Usage

```
/track-complete <task-path> [--pr <number>] [--skip-coverage] [--force]
```

## Arguments

- `task-path`: Path to task (e.g., `epic-00/auth-system/endpoint-post_auth_signup/implementation`)
- `--pr`: Associate a pull request number
- `--skip-coverage`: Skip coverage gate check (not recommended)
- `--force`: Force completion even if validation fails

## What This Command Does

1. **Validate Task Exists**
   - Parse task path to locate in tracker state
   - Verify task is "in-progress" or "pending"
   - Identify task type for validation rules

2. **Run Tests**
   - Execute relevant test suite
   - Collect test results
   - Report passing/failing counts

3. **Check Coverage Gate**
   - Calculate coverage for changed files
   - Compare against threshold for task type:
     - Service layer: 90%
     - API routes: 85%
     - Components: 75%
   - Block completion if below threshold

4. **Validate Code Quality**
   - Run linter (ruff/eslint)
   - Check TypeScript errors
   - Verify no console.logs (use logger)

5. **Update Tracker State**
   - Mark task as "complete"
   - Record completion timestamp
   - Calculate duration
   - Associate PR if provided
   - Update test count and coverage

6. **Recalculate Rollups**
   - Update feature percentage
   - Update epic percentage
   - Update platform percentage
   - Check if feature/epic now complete

7. **Check Unblocked Work**
   - Identify tasks depending on this one
   - Update their status if unblocked
   - Report newly available tasks

8. **Create Completion Checkpoint**
   - Record milestone achievement
   - Enable rollback if needed

## Example

```bash
/track-complete epic-00/auth-system/endpoint-post_auth_signup/implementation --pr 145
```

Output:
```
🎯 Completing: epic-00/auth-system/endpoint-post_auth_signup/implementation

🧪 Running tests...
   tests/api/auth/signup.test.ts
   ✓ should create new user with valid data
   ✓ should return 400 for invalid email
   ✓ should return 409 for duplicate email
   ✓ should hash password before storing
   ✓ should send verification email
   
   5 passing (1.2s)

📊 Coverage check...
   Statements: 94% (target: 85%) ✓
   Branches: 89% (target: 85%) ✓
   Functions: 100% (target: 85%) ✓
   Lines: 92% (target: 85%) ✓

✅ Validation passed!

📝 Updating tracker...
   Task: complete (PR #145)
   Duration: 47m
   Feature progress: 45% → 55%
   Epic progress: 23% → 26%

🔓 Unblocked tasks:
   - epic-00/auth-system/endpoint-post_auth_signup/validation
   - epic-00/auth-system/endpoint-post_auth_signup/tests-integration

💾 Checkpoint created: 2025-12-22-milestone-auth-signup

Next: Pick from unblocked tasks or run /track-status
```

## TDD Enforcement

Completion is blocked if:
- Tests are failing
- Coverage below threshold
- TypeScript errors exist
- Linting errors exist

Use `--force` only in emergencies (not recommended).

## Coverage Gates Reference

From `.tracker/coverage-gates.yaml`:

| Layer | Threshold | Enforced |
|-------|-----------|----------|
| service-layer | 90% | Yes |
| api-routes | 85% | Yes |
| components | 75% | Yes |
| e2e-critical-paths | 100% | Yes |
| integration-tests | 80% | Yes |
| utils-helpers | 95% | Yes |

## PR Association

When providing `--pr <number>`:
- PR URL is recorded in tracker state
- Enables linking in dashboard
- Tracks which PR implemented which feature

## Partial Completion

For complex tasks with subtasks:
```bash
# Complete just the unit tests
/track-complete epic-00/auth-system/endpoint-post_auth_signup/tests-unit

# Then complete implementation
/track-complete epic-00/auth-system/endpoint-post_auth_signup/implementation
```

## Rollback

If completion was premature:
1. Use checkpoint to identify state
2. Manually edit `.tracker/epics/<epic>.yaml`
3. Change task status back to "in-progress"
4. Run `/track-status` to verify

