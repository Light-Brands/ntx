# Architecture Specifications

Technical system design templates for platform architecture.

## Templates

| Template | Purpose |
|----------|---------|
| [data-models-template.md](data-models-template.md) | Database schema design with RLS policies |
| [api-reference-template.md](api-reference-template.md) | API endpoint documentation |
| [service-layer-template.md](service-layer-template.md) | Business logic patterns |
| [deployment-template.md](deployment-template.md) | Infrastructure configuration |
| [ai-router-template.md](ai-router-template.md) | Multi-provider AI system design |

## Core Architecture Principles

### Database Design
- Use PostgreSQL with Row-Level Security (RLS)
- Design for multi-tenant from the start
- Include soft-delete patterns where appropriate
- Document all relationships and constraints

### API Design
- RESTful endpoints with consistent naming
- Version APIs when making breaking changes
- Include request/response contracts
- Document error codes and handling

### Service Layer
- Separate business logic from API handlers
- Use dependency injection for testability
- Implement proper error boundaries
- Log at appropriate levels

### Deployment
- Infrastructure as code
- Environment-specific configurations
- CI/CD pipeline integration
- Health checks and monitoring

## Usage

1. Copy templates to your brand's `spec/architecture/` folder
2. Rename by removing `-template` suffix
3. Fill in brand-specific details
4. Cross-reference with other spec documents

## Reference Implementation

See [vibeup architecture](../../../../brands/vibeup/spec/architecture/) for a complete example.
