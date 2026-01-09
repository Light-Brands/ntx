# Onyx Design System

A comprehensive, brand-agnostic design system providing production-ready React components and design tokens. This system can be configured to work with any brand specification.

## Overview

This design system provides:
- **50+ React Components** - Production-ready dark mode UI components
- **Live Showcase** - Interactive component playground with navigable sections
- **Design Tokens** - Centralized color, typography, spacing, and shadow definitions
- **Brand Integration** - Configure with any brand spec from the `brands/` folder

## Quick Start

```bash
# Install dependencies
npm install

# Run the showcase
npm run dev
```

## Structure

```
design-system-v2/
├── components/          # 50+ React components
├── pages/               # Showcase application
├── tokens/              # Design tokens (colors, typography, spacing, shadows)
├── contexts/            # React context providers
├── lib/                 # Utility libraries
├── data/                # Data types and storage
├── spec/                # Brand-agnostic specification templates
│   ├── architecture/    # Technical design templates
│   ├── brand/           # Brand identity templates
│   ├── design/          # UX/UI specification templates
│   ├── operations/      # Operational templates
│   └── development/     # Development infrastructure
└── public/              # Static assets
```

## Component Groups

The design system includes **13 component groups** with **58 sections**:

| Group | Sections |
|-------|----------|
| Foundations | Identity, Palette, Typography |
| Home Page | Loading States, Arrival, Email Capture, Forms, Containers |
| Profile Page | Stats & Badges, Action Buttons, Attributes & Pills, Photos & Uploads, Sections & Layout |
| Discover Page | Search & Navigation, Recommendation Cards, Filters & Chips, Loading & Empty States |
| Messages Page | Conversation List, Message Bubbles, Input & Actions, Status & Empty States |
| Practices Page | Practice Cards, Stats & Streaks, Timer & Sessions, Calendar & History, Full Dashboard, Modals & Flows |
| My Profile Page | Own View, Public Profile View, Edit Mode & Controls, Quick Edit Sections, Photo Management, Account Settings |
| Settings Page | Account & Profile, Notifications, Privacy & Security, Data & Preferences |
| Community Page | Full Community View, Community Cards, Community Header, Members & Roles, Posts & Rules |
| Business Page | Full Business Profile, Business Cards, Services & Listings, Reviews & Ratings |
| Notifications Page | Notification Items, Notification Types, Controls & Filters |
| Impact Page | Full Impact Dashboard, Impact Statistics, Voting Cards |
| Core: Auth & Layout | AI Guide, Auth & Onboarding, Navigation & Headers, Profile Systems, Social & Discovery, Error Systems |

> **Note:** Brand-specific specifications (epics, architecture, operations, brand identity, design specs, development) are now located in the `brands/` folder at the repository root.

## Design Tokens: Single Source of Truth

All design values are defined in `tokens/` - **never hardcode values in components**.

```typescript
import { colors, typography, spacing, borderRadius, shadows } from './tokens';

// Colors (17 tokens)
colors['abyss-base']     // #0D0D0D - Primary background
colors['moonlight']      // #F5F5F5 - Primary text
colors['aqua-light']     // #97D9C4 - Primary accent

// Typography
typography.fontFamily.sans  // ['Inter', 'SF Pro', 'system-ui']
typography.fontSize.base    // 1rem (16px)
typography.fontWeight.bold  // 700

// Spacing & Border Radius
spacing['6']              // 1.5rem (24px)
borderRadius['vibe-card'] // 1rem (16px)

// Shadows
shadows['elevation']      // Standard card elevation
shadows['mira-glow']      // Mira AI glow effect
```

**Documentation**: See [tokens/README.md](tokens/README.md) for complete token reference.

## Component Usage

```tsx
import { Button, Card, Avatar } from './components';

const MyComponent = () => (
  <Card>
    <Avatar src="/user.jpg" size="lg" />
    <Button variant="primary">Click Me</Button>
  </Card>
);
```

## Features

### Dark Mode Exclusive
All components are designed for dark mode aesthetics with the Onyx color palette.

### Tailwind CSS
Utility-first styling with zero runtime overhead.

### TypeScript
Fully typed props and states for better developer experience.

### Accessibility
Built with ARIA standards in mind.

### Tree-shakable
Only include the components you use.

## Documentation Architecture

**Tokens → Design System → Components** with **Brand Philosophy** guiding all decisions.

### Design Tokens (Source of Truth)
- **[tokens/README.md](tokens/README.md)** - Complete token reference
- **[tokens/colors.ts](tokens/colors.ts)** - 17 color tokens with JSDoc
- **[tokens/typography.ts](tokens/typography.ts)** - Type system
- **[tokens/spacing.ts](tokens/spacing.ts)** - Spacing & border radius
- **[tokens/shadows.ts](tokens/shadows.ts)** - Elevation & glows

### Specification Templates

Brand-agnostic templates are available in the `spec/` folder:
- **[spec/README.md](spec/README.md)** - Template overview and usage guide
- **[spec/architecture/](spec/architecture/)** - Data models, APIs, deployment
- **[spec/brand/](spec/brand/)** - Visual identity, voice, AI personality
- **[spec/design/](spec/design/)** - Guidelines, components, user journeys
- **[spec/operations/](spec/operations/)** - Feature flags, testing, observability
- **[spec/development/](spec/development/)** - Coding standards, AI agents

### Brand Implementations

Brand-specific documentation is located in the `brands/` folder:

**Available Brands:**
- [vibeup](../../brands/vibeup/) - VIBEUP platform specifications
- [earth-weavers](../../brands/earth-weavers/) - Earth Weavers brand

**Creating a New Brand:**
1. Create folder: `brands/{brand-name}/spec/`
2. Copy templates from `design-system-v2/spec/`
3. Customize for your brand

## Tech Stack

```yaml
Framework: React + TypeScript
Styling: Tailwind CSS
Build: Vite
Components: 50+ production-ready
```

## License

Proprietary - Internal Use Only

---

**Onyx Design System** - A brand-agnostic component library
