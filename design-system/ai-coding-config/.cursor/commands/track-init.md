# /track-init - Initialize Development Tracker

Initialize the VIBEUP development tracker by parsing all epic specifications and generating atomic task tracking state.

## Usage

```
/track-init [--force] [--skip-validation] [--verbose]
```

## Options

- `--force`: Reinitialize even if tracker already exists
- `--skip-validation`: Skip tooling validation step
- `--verbose`: Show detailed output during initialization

## What This Command Does

1. **Create Directory Structure**
   - `.tracker/` - Main tracker directory
   - `.tracker/epics/` - Per-epic state files
   - `.tracker/checkpoints/` - Resume points
   - `.tracker/manifests/` - Swarm work manifests
   - `.tracker/schema/` - YAML schemas

2. **Parse Epic Specifications**
   - Scan `vibeup-design-spec/epics/*.md` for all epic files
   - Extract database tables from SQL/schema sections
   - Extract API endpoints from REST definitions
   - Extract services from class definitions
   - Extract UI components from React patterns

3. **Generate Tracker State**
   - Create `.tracker/epics/<epic-id>.yaml` for each epic
   - Generate atomic tasks for each extracted item:
     - Tables: schema, RLS policies, indexes, migrations, seed data
     - Endpoints: tests (TDD first), implementation, validation, integration tests, docs
     - Services: tests (TDD first), implementation
     - Components: tests (TDD first), implementation, styling, accessibility, storybook

4. **Create Progress Rollup**
   - Generate `.tracker/progress.yaml` with platform-wide metrics
   - Calculate epic dependencies and blocked status
   - Initialize velocity tracking

5. **Validate Tooling** (unless `--skip-validation`)
   - Verify ai-coding-config installation
   - Discover all rules in `rules/` directory
   - List available commands and agents
   - Check git hooks configuration
   - Generate `.tracker/tooling.yaml`

6. **Initialize Coverage Gates**
   - Create `.tracker/coverage-gates.yaml` with TDD thresholds
   - Set service layer threshold (90%)
   - Set API routes threshold (85%)
   - Set components threshold (75%)
   - Configure critical path 100% coverage

## Example Output

```
🚀 Initializing VIBEUP Development Tracker...
📖 Parsing epic specifications...
  ✓ epic-00: 8 features, 247 tasks
  ✓ epic-01: 6 features, 189 tasks
  ✓ epic-1a: 5 features, 156 tasks
  ✓ epic-1b: 4 features, 98 tasks
  ✓ epic-02: 7 features, 234 tasks
  ✓ epic-03: 6 features, 178 tasks
  ✓ epic-04: 5 features, 145 tasks
  ✓ epic-05: 4 features, 112 tasks
  ✓ epic-06: 6 features, 201 tasks
  ✓ epic-07: 5 features, 167 tasks
  ✓ epic-08: 4 features, 134 tasks

📊 Creating progress rollup...
🔧 Validating tooling...
  ✓ Rules: 45 discovered
  ✓ Commands: 12 available
  ✓ Agents: 7 ready

✅ Tracker initialized successfully!
   Epics: 11
   Total Tasks: 1,861

📋 Next steps:
   1. Run /track-status to see current state
   2. Run /track-start epic-00 <feature> to begin work
   3. Run /track-manifest epic-00 to generate swarm manifests
```

## Integration

This command uses the tracker library at `lib/tracker/`:
- `init.ts` - Initialization logic
- `parser.ts` - Epic spec parsing
- `validator.ts` - Tooling validation
- `state.ts` - State file management

## After Initialization

Once initialized, use these commands to work with the tracker:
- `/track-status` - View current progress
- `/track-start` - Begin work on a feature
- `/track-complete` - Mark tasks complete
- `/track-resume` - Resume from checkpoint
- `/track-validate` - Validate tooling health
- `/track-manifest` - Generate swarm manifests

