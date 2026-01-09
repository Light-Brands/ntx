export interface ProgressData {
  epics: EpicProgress[]
  documents: DocumentProgress[]
  overall: OverallProgress
  lastUpdated: string
}

export interface EpicProgress {
  epicId: string
  epicNumber: number
  epicName: string
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked'
  completionPercentage: number
  sections: SectionProgress[]
  blockers: Blocker[]
  assignees?: string[]
  startDate?: string
  targetDate?: string
  completedDate?: string
}

export interface SectionProgress {
  sectionName: string
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked'
  completionPercentage: number
  tasks?: Task[]
}

export interface Task {
  id: string
  name: string
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked'
  assignee?: string
  dueDate?: string
}

export interface DocumentProgress {
  documentId: string
  documentPath: string
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked'
  completionPercentage: number
  lastUpdated: string
}

export interface OverallProgress {
  totalEpics: number
  completedEpics: number
  inProgressEpics: number
  notStartedEpics: number
  blockedEpics: number
  overallPercentage: number
  velocity: Velocity
}

export interface Velocity {
  pagesPerWeek: number
  epicsPerMonth: number
  trend: 'increasing' | 'stable' | 'decreasing'
}

export interface Blocker {
  id: string
  description: string
  severity: 'high' | 'medium' | 'low'
  createdDate: string
  resolvedDate?: string
}

