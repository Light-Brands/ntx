import { AppShell } from '@/components/layout/AppShell'
import { EpicCard } from '@/components/dashboard/EpicCard'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { CategoryCard } from '@/components/dashboard/CategoryCard'
import { EPICS } from '@/lib/data/epics'

export default function HomePage() {
  const stats = {
    totalDocuments: 200,
    totalPages: '200+',
    epicsInProgress: 0,
    epicsCompleted: 0,
    lastUpdated: 'December 2025',
  }

  const categories = [
    {
      title: 'Architecture',
      description: 'Technical system design, data models, APIs',
      icon: '🏗️',
      docCount: 7,
      href: '/docs/architecture/readme',
    },
    {
      title: 'Brand Identity',
      description: 'Visual identity, voice, personality, product vision',
      icon: '🎨',
      docCount: 10,
      href: '/docs/brand/readme',
    },
    {
      title: 'Operations',
      description: 'Testing, admin tools, feature flags, observability',
      icon: '⚙️',
      docCount: 6,
      href: '/docs/operations/readme',
    },
    {
      title: 'Design System',
      description: 'UI components, user journeys, design guidelines',
      icon: '✨',
      docCount: 7,
      href: '/docs/design/readme',
    },
  ]

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-primary p-8 text-white">
          <div className="relative z-10 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              VIBEUP Design Specification
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Complete, implementation-ready specification for the VIBEUP platform.
              Your Energy Is Your Edge.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <div className="w-2 h-2 bg-soft-aqua rounded-full animate-pulse"></div>
              <span>Version 1.0.0 • Last Updated: {stats.lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Documents"
            value={stats.totalDocuments}
            subtitle="Across all categories"
            icon="📚"
          />
          <StatsCard
            title="Total Pages"
            value={stats.totalPages}
            subtitle="Of comprehensive specs"
            icon="📄"
          />
          <StatsCard
            title="Epics In Progress"
            value={stats.epicsInProgress}
            subtitle="Currently being developed"
            icon="🚀"
          />
          <StatsCard
            title="Epics Completed"
            value={stats.epicsCompleted}
            subtitle={`Out of ${EPICS.length} total`}
            icon="✅"
          />
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Documentation Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>

        {/* Epics */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Platform Epics</h2>
            <p className="text-sm text-foreground/60">
              Implementation Order: 0 → 1 → 2&3 → 4 → 5 → 6 → 7 → 8
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EPICS.map((epic) => (
              <EpicCard key={epic.id} epic={epic} />
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="rounded-lg border border-border bg-light-grey/30 p-6">
          <h3 className="text-lg font-semibold mb-3">Quick Start</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-foreground mb-2">For Developers</h4>
              <ul className="space-y-1 text-foreground/60">
                <li>→ Start with Master Plan</li>
                <li>→ Review Epic 0: Foundation</li>
                <li>→ Follow TDD workflow</li>
                <li>→ Reference APIs as needed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">For Designers</h4>
              <ul className="space-y-1 text-foreground/60">
                <li>→ Review Brand Identity</li>
                <li>→ Check UX Wireframes</li>
                <li>→ Explore UI Component Library</li>
                <li>→ Follow Design Guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
