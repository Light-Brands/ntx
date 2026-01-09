# /track-validate - Validate Tooling Health

Comprehensive validation that ai-coding-config is properly installed and all tooling loads correctly.

## Usage

```
/track-validate [--fix] [--verbose]
```

## Options

- `--fix`: Attempt to fix discoverable issues
- `--verbose`: Show detailed validation for each component

## What This Command Validates

### 1. ai-coding-config Installation
- Check `~/.ai_coding_config` exists
- Verify architecture version (v2 cross-tool)
- Check for updates available

### 2. Rules Directory Structure
- Verify `rules/` is canonical source
- Check `.cursor/rules/` symlink validity
- Parse all `.mdc` files for syntax errors
- Identify `alwaysApply: true` rules

### 3. Commands Availability
- Scan `.claude/commands/` directory
- Verify each command file is valid
- Check `.cursor/commands/` symlink
- List available commands

### 4. Agents Status
- Scan `.claude/agents/` directory
- Parse agent frontmatter (model, tools)
- Check plugin agents in `plugins/`
- Report agent availability

### 5. Git Hooks
- Check husky installation
- Verify pre-commit hook configured
- Verify pre-push hook configured
- Test hook execution

### 6. Coverage Tools
- Check jest/vitest configuration
- Verify coverage thresholds set
- Check reporter configuration

### 7. Swarm Infrastructure (if applicable)
- Check for remote agent configuration
- Verify network connectivity
- Report local-only mode if no remotes

## Example Output

```
🔍 VIBEUP Tooling Validation Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ ai-coding-config
   Version: 2.0.0
   Architecture: v2-cross-tool
   Location: ~/.ai_coding_config
   Last Updated: 2025-12-20

✅ Rules: 45 rules in 7 categories
   core: 12 rules
     ✓ autonomous-development-workflow.mdc
     ✓ git-interaction.mdc (alwaysApply)
     ✓ git-commit-message.mdc
     ✓ git-worktree-task.mdc
     ... and 8 more
   frontend: 8 rules
     ✓ react-components.mdc
     ✓ typescript-coding-standards.mdc
     ... and 6 more
   python: 6 rules
   django: 4 rules
   observability: 4 rules
   personalities: 6 rules
   ai: 5 rules

✅ Commands: 12 available
   ✓ /load-rules
   ✓ /autotask
   ✓ /swarm
   ✓ /setup-environment
   ✓ /track-init
   ✓ /track-start
   ✓ /track-complete
   ✓ /track-status
   ✓ /track-resume
   ✓ /track-validate
   ✓ /track-manifest
   ✓ /ai-coding-config

✅ Agents: 7 ready
   ✓ Ada (autonomous-developer) - sonnet
   ✓ Dixon (debugger) - opus
   ✓ Rivera (code-reviewer) - sonnet
   ✓ Phil (planner) - opus
   ✓ Petra (performance) - sonnet
   ✓ Explore (explorer) - haiku
   ✓ Swarm Coordinator - sonnet

✅ Git Hooks: Configured
   ✓ husky installed
   ✓ pre-commit configured
   ✓ pre-push configured
   ✓ hooks executable

✅ Coverage: Configured
   ✓ jest.config.ts found
   ✓ thresholds: 85% statements, 80% branches
   ✓ lcov reporter enabled

⚠️ Swarm: Local-only mode
   No remote agents configured
   Run with --local flag for /swarm

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Summary: 6/7 checks passing
   1 warning (swarm remotes not configured)

Tooling validation complete. Ready for development.
```

## Example with Issues

```
🔍 VIBEUP Tooling Validation Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ ai-coding-config: Installed

⚠️ Rules: 44 rules (1 issue)
   ❌ frontend/broken-rule.mdc
      Parse error: Invalid YAML frontmatter at line 3

✅ Commands: 12 available

✅ Agents: 7 ready

❌ Git Hooks: Not configured
   ✗ husky not installed
   
   Fix: npm install -D husky && npx husky install

⚠️ Coverage: Partially configured
   ✓ jest.config.ts found
   ✗ thresholds not set (using defaults)
   
   Fix: Add coverageThreshold to jest.config.ts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Summary: 4/7 checks passing
   2 warnings, 1 error

Run with --fix to attempt automatic fixes.
```

## Auto-Fix Mode

```bash
/track-validate --fix
```

Can automatically fix:
- Install husky if missing
- Create symlinks for rules/commands
- Set default coverage thresholds
- Fix simple YAML syntax issues

Cannot auto-fix:
- Complex parse errors
- Missing dependencies
- Network issues

## Integration

Updates:
- `.tracker/tooling.yaml` with validation results
- Adds entry to `validationHistory`

Reads:
- `rules/` directory
- `.claude/commands/` directory
- `.claude/agents/` directory
- `jest.config.ts` / `vitest.config.ts`
- `.husky/` directory

## When to Run

- After `/track-init`
- After updating ai-coding-config
- After adding new rules/commands
- When tooling seems misconfigured
- Before starting major work
- As part of CI/CD pipeline

## Verbose Mode

```bash
/track-validate --verbose
```

Shows:
- Full frontmatter for each rule
- Command descriptions
- Agent tools and models
- Hook file contents
- Coverage configuration details

