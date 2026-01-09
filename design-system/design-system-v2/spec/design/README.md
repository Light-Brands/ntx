# Design Specifications

UX/UI specification templates for platform design.

## Core Documents

| Document | Purpose |
|----------|---------|
| [GUIDELINES.md](GUIDELINES.md) | Core development guidelines |
| [component-catalog-template.md](component-catalog-template.md) | Component documentation |
| [user-journey-template.md](user-journey-template.md) | User flow documentation |

## Design Principles

### Mobile-First
- Design for 320px minimum width
- Progressive enhancement for larger screens
- Touch-friendly tap targets (44px minimum)

### Accessibility
- WCAG 2.1 AA compliance
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility

### Performance
- Lazy load below-the-fold content
- Optimize images and assets
- Minimize layout shifts
- Fast time-to-interactive

### Consistency
- Use design tokens, never hardcode
- Follow component patterns
- Maintain visual rhythm
- Consistent interaction patterns

## Component Architecture

```
components/
├── primitives/          # Base elements (Button, Input, Text)
├── patterns/            # Composed patterns (Card, Modal, Form)
├── features/            # Feature-specific (ProfileCard, MessageBubble)
└── layouts/             # Page layouts (PageShell, Sidebar)
```

## Usage

1. Copy templates to `brands/{brand-name}/spec/design/`
2. Reference design tokens from the design system
3. Document brand-specific component variants
4. Create user journey maps for key flows

## Reference Implementation

See [vibeup design](../../../../brands/vibeup/spec/design/) for a complete example.

---

*Onyx Design System*
