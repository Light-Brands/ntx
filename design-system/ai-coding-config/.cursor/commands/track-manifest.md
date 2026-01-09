# /track-manifest - Generate Swarm Work Manifest

Generate swarm-compatible work manifests from tracker state for distributed task execution.

## Usage

```
/track-manifest <epic-id> [--feature <id>] [--batch-size <n>] [--all-batches]
```

## Arguments

- `epic-id`: Epic to generate manifest for (e.g., `epic-00`)
- `--feature <id>`: Generate for specific feature only
- `--batch-size <n>`: Maximum tasks per manifest (default: 10)
- `--all-batches`: Generate all batches for the entire epic

## What This Command Does

1. **Read Tracker State**
   - Load epic from `.tracker/epics/<epic-id>.yaml`
   - Identify all pending tasks
   - Analyze task dependencies

2. **Generate Task Prompts**
   - Create detailed prompts for each task
   - Include spec file references
   - Add TDD requirements (tests first)
   - Reference coding standards

3. **Organize by Dependencies**
   - Group independent tasks for parallel execution
   - Sequence dependent tasks correctly
   - Optimize for maximum parallelism

4. **Create Swarm Manifest**
   - Generate YAML in swarm-compatible format
   - Set appropriate timeouts
   - Configure branch names
   - Save to `.tracker/manifests/`

## Example: Single Feature

```bash
/track-manifest epic-00 --feature auth-system
```

Output:
```
📋 Generating manifest for epic-00/auth-system

📊 Pending tasks found: 18
   Tables: 0 (all complete)
   Endpoints: 12
   Services: 6
   Components: 0

🔄 Analyzing dependencies...
   Independent tasks: 6 (can run in parallel)
   Sequential tasks: 12 (have dependencies)

📝 Generating prompts with TDD requirements...

💾 Manifest saved: .tracker/manifests/epic-00-auth-system-1734876543.yaml

Preview:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
name: "Foundation - auth-system - Batch 1734876543"
base_branch: main
max_parallel: 4

tasks:
  - id: epic-00-auth-system-endpoint-post_auth_login-tests-unit
    prompt: |
      Write unit tests for the "post_auth_login" API endpoint (TDD - tests first).
      
      Requirements:
      - Write failing tests first (TDD red phase)
      - Cover happy path scenarios
      - Cover error cases (validation, auth, not found)
      ...
    branch: feat/epic-00-auth-system-endpoint-post_auth_login-tests-unit
    priority: medium
    timeout: 45m

  - id: epic-00-auth-system-endpoint-post_auth_login-implementation
    prompt: |
      Implement the "post_auth_login" API endpoint to pass all tests.
      ...
    branch: feat/epic-00-auth-system-endpoint-post_auth_login-implementation
    priority: medium
    depends_on:
      - epic-00-auth-system-endpoint-post_auth_login-tests-unit
    timeout: 45m

  # ... more tasks
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To execute: /swarm .tracker/manifests/epic-00-auth-system-1734876543.yaml
```

## Example: All Batches for Epic

```bash
/track-manifest epic-00 --all-batches --batch-size 10
```

Output:
```
📋 Generating batched manifests for epic-00

📊 Total pending tasks: 161
   Batch size: 10
   Estimated batches: 17

🔄 Grouping by independence and dependencies...

📝 Generating manifests...
   ✓ .tracker/manifests/epic-00-batch-01.yaml (10 tasks)
   ✓ .tracker/manifests/epic-00-batch-02.yaml (10 tasks)
   ✓ .tracker/manifests/epic-00-batch-03.yaml (10 tasks)
   ...
   ✓ .tracker/manifests/epic-00-batch-17.yaml (1 task)

💾 17 manifests saved to .tracker/manifests/

Execution order:
   1. Batches 01-05 can run in parallel (independent tasks)
   2. Batches 06-10 depend on batch results
   3. Batches 11-17 are sequential dependencies

To execute first batch: /swarm .tracker/manifests/epic-00-batch-01.yaml
```

## Generated Prompt Structure

For each task type, prompts include:

### Table Tasks
```yaml
prompt: |
  Create the "profiles" database table following the spec in 
  vibeup-design-spec/epics/epic-00-foundation.md.
  
  Requirements:
  - Define complete TypeScript types for the table
  - Create Supabase table schema with all columns
  - Add appropriate constraints and defaults
  - Include timestamps (created_at, updated_at)
  - Follow the database schema patterns in epic-00-foundation.md
  - Write unit tests for type definitions
  
  Deliverables:
  - types/database.ts additions
  - SQL migration file
  - Test file with at least 3 tests
```

### Endpoint Tasks (TDD)
```yaml
prompt: |
  Write unit tests for the "post_auth_signup" API endpoint (TDD - tests first).
  
  Requirements:
  - Write failing tests first (TDD red phase)
  - Cover happy path scenarios
  - Cover error cases (validation, auth, not found)
  - Cover edge cases
  - Follow testing patterns from typescript-coding-standards.mdc
  - Minimum 5 test cases
  
  Deliverables:
  - Test file in tests/api/ or __tests__/
  - Tests should fail initially (no implementation yet)
```

### Service Tasks (TDD)
```yaml
prompt: |
  Write unit tests for the "AuthService" service (TDD - tests first).
  
  Requirements:
  - Write failing tests first
  - Cover all public methods
  - Cover success and error scenarios
  - Mock external dependencies
  - Target 90% coverage
  - Minimum 5 test cases
```

### Component Tasks (TDD)
```yaml
prompt: |
  Write tests for the "LoginForm" component (TDD - tests first).
  
  Requirements:
  - Write failing tests first
  - Test rendering
  - Test user interactions
  - Test accessibility
  - Use React Testing Library
  - Minimum 3 tests
```

## Manifest Schema

Generated manifests follow the swarm schema:

```yaml
name: "Epic Name - Feature - Batch ID"
base_branch: main
default_priority: medium
max_parallel: 4

tasks:
  - id: unique-task-id
    prompt: |
      Detailed prompt with requirements
    branch: feat/branch-name
    priority: high|medium|low
    depends_on: [other-task-id]  # optional
    timeout: 30m|45m|60m
```

## Integration with Swarm

After generating manifests:

```bash
# Execute single manifest
/swarm .tracker/manifests/epic-00-batch-01.yaml

# Or with local mode
/swarm .tracker/manifests/epic-00-batch-01.yaml --local
```

Swarm will:
1. Parse the manifest
2. Distribute tasks to agents
3. Track progress in `.swarm/state.json`
4. Update tracker state on completion

## Tips

- Start with `--batch-size 5` for testing
- Use `--feature` to focus on specific work
- Run `--all-batches` when ready for full parallel execution
- Check manifest before executing with swarm
- Independent tasks (no dependencies) maximize parallelism

