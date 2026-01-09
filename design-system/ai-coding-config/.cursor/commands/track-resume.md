# /track-resume - Resume from Checkpoint

Restore full context from a checkpoint after interruption and continue work.

## Usage

```
/track-resume [checkpoint-id] [--list] [--pop-stash]
```

## Options

- `checkpoint-id`: Specific checkpoint to restore (default: latest)
- `--list`: List available checkpoints instead of resuming
- `--pop-stash`: Automatically pop stashed changes if checkpoint has stash

## What This Command Does

1. **Load Checkpoint**
   - Read checkpoint file from `.tracker/checkpoints/`
   - Display checkpoint metadata (when created, reason, work state)

2. **Verify Git State**
   - Check current branch matches checkpoint
   - Warn if branch differs
   - Show uncommitted changes status

3. **Restore Context**
   - Reload spec sections recorded in checkpoint
   - Reload rules via `/load-rules`
   - Display files that were modified

4. **Show Test Status**
   - Display test state from checkpoint
   - Show which tests were passing/failing

5. **Restore Stashed Changes** (if `--pop-stash`)
   - If checkpoint has stashed changes, offer to pop them
   - Warn about potential conflicts

6. **Display Resume Summary**
   - Show what was being worked on
   - Display next steps from checkpoint
   - Show any blockers recorded

## Example: Resume Latest

```bash
/track-resume
```

Output:
```
📂 Restoring from checkpoint: 2025-12-22-epic-00-auth-a3f2

📋 Checkpoint Details:
   Created: 2025-12-22T10:30:00Z (2 hours ago)
   Reason: session-end
   Epic: epic-00-foundation
   Feature: auth-system
   Task: post_auth_verify

🔀 Git State:
   Branch: feat/epic-00/auth-verify ✓ (matches)
   Uncommitted changes: 3 files
   - app/api/auth/verify/route.ts
   - lib/services/auth.ts
   - tests/api/auth/verify.test.ts

📚 Loading context...
   ✓ Spec: vibeup-design-spec/epics/epic-00-foundation.md#authentication
   ✓ Rules: autonomous-development-workflow.mdc, typescript-coding-standards.mdc

🧪 Test Status (from checkpoint):
   3 passing, 2 failing
   Failing tests:
   - should handle expired magic links
   - should rate limit verification attempts

📝 Resume Notes:
   Working on magic link verification endpoint.
   Tests written for happy path, need edge cases.
   Waiting on rate limiting middleware from parallel task.

📋 Next Steps (from checkpoint):
   1. Implement expiry check for magic links
   2. Add rate limiting once middleware available
   3. Complete integration tests

Ready to continue! Run tests to see current state: npm test
```

## Example: List Checkpoints

```bash
/track-resume --list
```

Output:
```
📂 Available Checkpoints:

1. 2025-12-22-epic-00-auth-a3f2 (latest)
   Created: 2025-12-22T10:30:00Z
   Reason: session-end
   Task: epic-00/auth-system/post_auth_verify
   
2. 2025-12-22-milestone-signup-b1c2
   Created: 2025-12-22T09:15:00Z
   Reason: milestone
   Task: epic-00/auth-system/post_auth_signup
   
3. 2025-12-21-epic-00-db-c3d4
   Created: 2025-12-21T16:45:00Z
   Reason: session-end
   Task: epic-00/database-setup/profiles

To resume: /track-resume <checkpoint-id>
```

## Example: Resume Specific Checkpoint

```bash
/track-resume 2025-12-22-milestone-signup-b1c2
```

## Handling Branch Mismatch

If current branch differs from checkpoint:

```
⚠️ Branch mismatch:
   Current: main
   Checkpoint: feat/epic-00/auth-verify

Options:
   1. Switch to checkpoint branch: git checkout feat/epic-00/auth-verify
   2. Continue on current branch (context may not match)
   3. Abort resume
```

## Handling Stashed Changes

If checkpoint has stashed changes:

```
📦 Stashed changes detected:
   Stash ref: abc123def
   Created: 2025-12-22T10:30:00Z

To restore: /track-resume --pop-stash
Or manually: git stash pop
```

## Recovery from Corruption

If checkpoint file is corrupted or missing:
1. Check `.tracker/checkpoints/` for other checkpoints
2. Use `/track-status` to see current state
3. Manually set active work via `/track-start`

## Integration

- Reads: `.tracker/checkpoints/*.yaml`
- Calls: `/load-rules` for context restoration
- Updates: Nothing directly (informational command)

After resuming, continue with:
- Work on the task
- `/track-complete` when done
- `/track-status` to check progress

