'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  const navigation = [
    {
      title: 'Overview',
      items: [
        { name: 'Dashboard', href: '/', icon: '📊' },
        { name: 'Master Plan', href: '/docs/master-plan', icon: '🗺️' },
        { name: 'README', href: '/docs/readme', icon: '📖' },
      ],
    },
    {
      title: 'Epics',
      items: [
        { name: 'Epic 0: Foundation', href: '/docs/epics/epic-00-foundation', icon: '⚡' },
        { name: 'Epic 1: Mira', href: '/docs/epics/epic-01-mira', icon: '✨' },
        { name: 'Epic 2: Humans', href: '/docs/epics/epic-02-humans', icon: '👥' },
        { name: 'Epic 3: Practices', href: '/docs/epics/epic-03-practices', icon: '🧘' },
        { name: 'Epic 4: Discovery', href: '/docs/epics/epic-04-discovery', icon: '🔍' },
        { name: 'Epic 5: Impact', href: '/docs/epics/epic-05-impact', icon: '💫' },
        { name: 'Epic 6: Business', href: '/docs/epics/epic-06-business', icon: '💼' },
        { name: 'Epic 7: Community', href: '/docs/epics/epic-07-community', icon: '🌟' },
        { name: 'Epic 8: Monetization', href: '/docs/epics/epic-08-monetization', icon: '💰' },
      ],
    },
    {
      title: 'Architecture',
      items: [
        { name: 'Overview', href: '/docs/architecture/readme', icon: '📋' },
        { name: 'Data Models', href: '/docs/architecture/data-models', icon: '🗄️' },
        { name: 'API Reference', href: '/docs/architecture/api-reference', icon: '🔌' },
        { name: 'Service Layer', href: '/docs/architecture/service-layer', icon: '⚙️' },
        { name: 'AI Model Router', href: '/docs/architecture/ai-model-router', icon: '🤖' },
        { name: 'AI Coding Config', href: '/docs/architecture/ai-coding-config-architecture', icon: '🛠️' },
        { name: 'Deployment', href: '/docs/architecture/deployment-infrastructure', icon: '🚀' },
      ],
    },
    {
      title: 'Brand',
      items: [
        { name: 'Overview', href: '/docs/brand/readme', icon: '📋' },
        { name: 'Visual Identity', href: '/docs/brand/01-visual-identity', icon: '🎨' },
        { name: 'Brand Deck', href: '/docs/brand/02-brand-deck', icon: '📊' },
        { name: 'Brand Voice', href: '/docs/brand/03-brand-voice-messaging', icon: '✍️' },
        { name: 'Mira Personality', href: '/docs/brand/04-mira-personality-guide', icon: '🤖' },
        { name: 'Product Vision', href: '/docs/brand/05-product-vision', icon: '🎯' },
        { name: 'UX Wireframes', href: '/docs/brand/06-ux-wireframe-blueprint', icon: '📐' },
        { name: 'Brand Integration', href: '/docs/brand/brand-identity-integration', icon: '🔗' },
        { name: 'Conscious Development', href: '/docs/brand/conscious-development-manifesto', icon: '🙏' },
      ],
    },
    {
      title: 'Operations',
      items: [
        { name: 'Testing Strategy', href: '/docs/operations/testing-strategy', icon: '🧪' },
        { name: 'Admin Panel Spec', href: '/docs/operations/admin-panel-spec', icon: '⚙️' },
        { name: 'Feature Flags', href: '/docs/operations/feature-flags', icon: '🚩' },
        { name: 'Observability', href: '/docs/operations/observability-spec', icon: '📊' },
        { name: 'Environment Variables', href: '/docs/operations/environment-variables-reference', icon: '🔐' },
      ],
    },
    {
      title: 'Design',
      items: [
        { name: 'Overview', href: '/docs/design/readme', icon: '📋' },
        { name: 'Guidelines', href: '/docs/design/guidelines', icon: '📐' },
        { name: 'Codex Usage', href: '/docs/design/codex_usage', icon: '📖' },
        { name: 'UI Components', href: '/docs/design/ui-component-library', icon: '🧩' },
        { name: 'User Journeys', href: '/docs/design/user-journey-maps', icon: '🗺️' },
        { name: 'Design Tools', href: '/docs/design/tools/readme', icon: '🛠️' },
      ],
    },
  ]

  return (
    <div
      className={cn(
        'pb-12 border-r border-border bg-background',
        isOpen ? 'w-64' : 'w-16',
        'transition-all duration-300',
        className
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mb-4 flex items-center justify-center w-full p-2 rounded-md hover:bg-light-grey transition-colors"
          >
            <span className="text-xl">{isOpen ? '◀' : '▶'}</span>
          </button>
          
          {navigation.map((section) => (
            <div key={section.title} className="py-2">
              {isOpen && (
                <h3 className="mb-2 px-4 text-sm font-semibold text-foreground/60">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium',
                      'hover:bg-light-grey hover:text-accent transition-colors',
                      'text-foreground/80'
                    )}
                  >
                    <span className="text-base">{item.icon}</span>
                    {isOpen && <span>{item.name}</span>}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

