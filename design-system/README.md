# Design System Dashboard

A comprehensive Next.js 14 dashboard for navigating, searching, and tracking design specifications. This dashboard provides intelligent access to design docs, architecture specs, and implementation guides for any brand.

> **Note**: Brand specifications have been moved to the `brands/` folder at the repository root.
> See `brands/vibeup/` for VIBEUP specifications.

## 🌟 Features

### Core Functionality
- **📚 Document Management**: Browse and view 200+ design specification documents
- **🔍 Full-Text Search**: Instant search across all documentation with filtering
- **🕸️ Graph Visualization**: Interactive document relationship mapping
- **📊 Progress Tracking**: Monitor implementation status across 9 epics
- **📈 Business Metrics**: Comprehensive spec health and quality metrics
- **🎨 Mermaid Diagrams**: Interactive diagram rendering

### User Experience
- **🎯 Mobile-First**: Responsive design optimized for all screen sizes
- **⌨️ Keyboard Navigation**: Full keyboard shortcuts (⌘K for command palette)
- **✨ Smooth Animations**: Framer Motion for delightful interactions
- **🎨 VIBEUP Brand Theme**: Authentic brand colors and design system
- **🌙 Dark Mode Ready**: Theme system built for future dark mode

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
open http://localhost:3000
```

### Build for Production

```bash
# Build static site
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
vibeup-v3/
├── app/                      # Next.js 14 App Router
│   ├── page.tsx             # Dashboard home
│   ├── docs/[...slug]/      # Dynamic doc viewer
│   ├── search/              # Search interface
│   ├── graph/               # Graph visualization
│   ├── progress/            # Progress tracking
│   └── metrics/             # Business metrics
├── components/              # React components
│   ├── layout/             # Layout components
│   ├── navigation/         # Navigation components
│   ├── document/           # Document viewer
│   ├── search/             # Search components
│   ├── visualization/      # Graph visualization
│   ├── progress/           # Progress tracking
│   ├── metrics/            # Metrics dashboard
│   ├── diagrams/           # Mermaid renderer
│   └── ui/                 # Base UI components
├── lib/                     # Utilities and core logic
│   ├── markdown/           # Markdown processing
│   ├── fs/                 # File system operations
│   ├── search/             # Search engine
│   ├── graph/              # Graph building
│   ├── progress/           # Progress tracking
│   ├── metrics/            # Metrics calculation
│   └── diagrams/           # Diagram utilities
├── types/                   # TypeScript types
├── data/                    # Static data (progress.json)
├── design-system-v2/        # Onyx Design System components
└── public/                  # Static assets
```

## 🎨 VIBEUP Brand Colors

```css
--vibe-deep-blue: #002B7F      /* Primary */
--vibe-white: #F7F9FC           /* Background */
--vibe-graphite: #0A0C10        /* Text */
--sky-blue: #5BB8FF             /* Accent */
--soft-aqua: #A7E6FF            /* Light Accent */
--midnight-blue: #001A47        /* Depth */
--light-grey: #E6E9EF           /* UI Neutral */
--cool-grey: #C7CEDA            /* Borders */
```

## 🔑 Key Features Explained

### Document Viewer
- Markdown rendering with syntax highlighting
- Mermaid diagram support
- Table of contents
- Cross-reference navigation
- Reading time estimation

### Search System
- Client-side search index using FlexSearch
- Fuzzy matching and typo tolerance
- Filter by category, epic, status, tags
- Instant results (<100ms)
- Search result highlighting

### Graph Visualization
- React Flow powered interactive graphs
- Epic dependency visualization
- Cross-reference mapping
- Click nodes to navigate
- Zoom, pan, and minimap controls

### Progress Tracking
- Epic-level progress monitoring
- Section breakdown
- Blocker identification
- Velocity metrics
- Overall completion percentage

### Business Metrics
- Specification health metrics
- Content quality analysis
- Documentation coverage
- Cross-reference density
- Broken link detection

## ⌨️ Keyboard Shortcuts

- `⌘K` / `Ctrl+K` - Open command palette
- `Esc` - Close modals/dialogs
- `↑` / `↓` - Navigate search results
- `Enter` - Select item
- `/` - Focus search input

## 🔧 Configuration

### Environment Variables

None required for basic operation. The dashboard reads from the `vibeup-design-spec/` directory.

### Customization

**Brand Colors**: Edit `tailwind.config.ts`
**Search Index**: Modify `lib/search/indexer.ts`
**Progress Data**: Update `data/progress.json`

## 📊 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Markdown**: unified, remark, rehype
- **Diagrams**: Mermaid.js
- **Search**: FlexSearch
- **Graphs**: React Flow
- **Icons**: Emoji (native)

## 🎯 Quality Gates

✅ All pages render without errors  
✅ Search returns results in <100ms  
✅ Mobile responsive on <640px screens  
✅ Keyboard navigation throughout  
✅ Mermaid diagrams render correctly  
✅ Cross-references are bidirectional  
✅ Progress tracking persists  
✅ Brand colors match spec exactly  

## 📝 Development Guidelines

### Adding New Features

1. Create types in `types/`
2. Build utilities in `lib/`
3. Create components in `components/`
4. Add pages in `app/`
5. Update README

### Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Component props interfaces
- Meaningful variable names

### Testing

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Build check
npm run build
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Connect to Vercel
vercel

# Deploy to production
vercel --prod
```

### Static Export

```bash
# Generate static site
npm run build

# Deploy /out directory
```

## 📖 Documentation

Brand specifications are now located in the `brands/` folder at the repository root:

**VIBEUP Brand:**
- `../brands/vibeup/README.md` - Brand overview
- `../brands/vibeup/spec/README.md` - Specification index
- `../brands/vibeup/spec/MASTER-PLAN.md` - Platform vision and architecture
- `../brands/vibeup/spec/epics/` - Feature specifications

**Other Brands:**
- `../brands/earth-weavers/` - Earth Weavers brand

**Design System Components:**
- `design-system-v2/` - Onyx Design System (brand-agnostic components)

## 🤝 Contributing

This is the VIBEUP Design Spec Dashboard - the foundation of the VIBEUP platform. Contributions should align with the conscious development manifesto and VIBEUP brand identity.

## 📄 License

Proprietary - VIBEUP Internal Use Only

## 🙏 Acknowledgments

Built with consciousness and intention for the VIBEUP platform.

**Your Energy Is Your Edge** ✨
