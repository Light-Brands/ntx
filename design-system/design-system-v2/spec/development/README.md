# Development Infrastructure

Templates for AI-assisted development and coding standards.

## Templates

| Template | Purpose |
|----------|---------|
| [coding-standards.md](coding-standards.md) | Code style and conventions |
| [ai-agents-template.md](ai-agents-template.md) | AI coding assistant setup |
| [commands/](commands/) | Development workflow commands |
| [templates/](templates/) | Code generation templates |

## Development Principles

### Code Quality
- Type safety with TypeScript strict mode
- Consistent formatting with Prettier
- Linting with ESLint
- Pre-commit hooks for validation

### AI-Assisted Development
- Structured prompts for consistency
- Context-aware code generation
- Pattern library for common tasks
- Review automation

### Workflow
- Feature branches from main
- Pull request reviews
- CI/CD automation
- Semantic versioning

## Directory Structure

```
development/
├── README.md           # This file
├── coding-standards.md # Code conventions
├── ai-agents-template.md # AI agent setup
├── commands/           # Workflow automation
│   ├── setup.md
│   ├── deploy.md
│   └── review.md
└── templates/          # Code templates
    ├── component/
    ├── api-route/
    └── test/
```

## Usage

1. Copy relevant templates to your brand's development folder
2. Customize coding standards for team preferences
3. Set up AI agents with brand context
4. Configure workflow commands

## Reference Implementation

See [vibeup development](../../../../brands/vibeup/spec/development/) for a complete example with:
- 50+ AI coding rules
- Multiple personality agents
- Comprehensive plugin system
- Workflow automation

---

*Onyx Design System*
