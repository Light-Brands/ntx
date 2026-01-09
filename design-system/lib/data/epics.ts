import type { EpicInfo } from '@/types/document'

/**
 * Epic data from the design spec
 */
export const EPICS: EpicInfo[] = [
  {
    id: 'epic-00',
    number: 0,
    name: 'Foundation',
    title: 'Infrastructure & Foundation',
    timeline: '2-3 weeks',
    dependencies: [],
    status: 'not-started',
    priority: 'P0',
    description: 'Infrastructure, database, testing, observability - Must build first',
    path: 'epics/epic-00-foundation',
  },
  {
    id: 'epic-01',
    number: 1,
    name: 'Mira',
    title: 'Mira AI Companion',
    timeline: '2 weeks',
    dependencies: ['Epic 0'],
    status: 'not-started',
    priority: 'P0',
    description: 'AI companion, onboarding, account creation - Blocks all other epics',
    path: 'epics/epic-01-mira',
  },
  {
    id: 'epic-02',
    number: 2,
    name: 'Humans',
    title: 'Human Profiles & Connections',
    timeline: '2-3 weeks',
    dependencies: ['Epic 0', 'Epic 1'],
    status: 'not-started',
    priority: 'P0',
    description: 'Profiles, chemistry, connections - Core platform functionality',
    path: 'epics/epic-02-humans',
  },
  {
    id: 'epic-03',
    number: 3,
    name: 'Practices',
    title: 'Practice Tracking',
    timeline: '2-3 weeks',
    dependencies: ['Epic 0', 'Epic 1'],
    status: 'not-started',
    priority: 'P0',
    description: 'Practice tracking, streaks, accountability - Core engagement driver',
    path: 'epics/epic-03-practices',
  },
  {
    id: 'epic-04',
    number: 4,
    name: 'Discovery',
    title: 'Social Discovery',
    timeline: '3-4 weeks',
    dependencies: ['Epic 0', 'Epic 1', 'Epic 2'],
    status: 'not-started',
    priority: 'P0',
    description: 'Social discovery, search, messaging - Connect users',
    path: 'epics/epic-04-discovery',
  },
  {
    id: 'epic-05',
    number: 5,
    name: 'Impact',
    title: 'Voting & Feedback',
    timeline: '1-2 weeks',
    dependencies: ['Epic 0', 'Epic 1'],
    status: 'not-started',
    priority: 'P1',
    description: 'Voting, feedback, co-creation - Community engagement',
    path: 'epics/epic-05-impact',
  },
  {
    id: 'epic-06',
    number: 6,
    name: 'Business',
    title: 'Business Profiles',
    timeline: '3-4 weeks',
    dependencies: ['Epic 0', 'Epic 1', 'Epic 2'],
    status: 'not-started',
    priority: 'P1',
    description: 'Business profiles, services, verification - Marketplace foundation',
    path: 'epics/epic-06-business',
  },
  {
    id: 'epic-07',
    number: 7,
    name: 'Community',
    title: 'Community Constellations',
    timeline: '2-3 weeks',
    dependencies: ['Epic 0', 'Epic 1', 'Epic 3', 'Epic 4', 'Epic 6'],
    status: 'not-started',
    priority: 'P1',
    description: 'Communities, posts, moderation - Group consciousness',
    path: 'epics/epic-07-community',
  },
  {
    id: 'epic-08',
    number: 8,
    name: 'Monetization',
    title: 'Memberships & Payments',
    timeline: '2-3 weeks',
    dependencies: ['Epic 0', 'Epic 6', 'Epic 7'],
    status: 'not-started',
    priority: 'P1',
    description: 'Memberships, Stripe, affiliates - Revenue generation',
    path: 'epics/epic-08-monetization',
  },
]

/**
 * Get epic by ID
 */
export function getEpicById(id: string): EpicInfo | undefined {
  return EPICS.find(epic => epic.id === id)
}

/**
 * Get epic by number
 */
export function getEpicByNumber(number: number): EpicInfo | undefined {
  return EPICS.find(epic => epic.number === number)
}

/**
 * Get epics by priority
 */
export function getEpicsByPriority(priority: 'P0' | 'P1' | 'P2'): EpicInfo[] {
  return EPICS.filter(epic => epic.priority === priority)
}

/**
 * Get epics by status
 */
export function getEpicsByStatus(status: string): EpicInfo[] {
  return EPICS.filter(epic => epic.status === status)
}

