import fs from 'fs'
import path from 'path'
import type { ProgressData, EpicProgress } from '@/types/progress'

const PROGRESS_FILE_PATH = path.join(process.cwd(), 'data', 'progress.json')

/**
 * Read progress data
 */
export function readProgressData(): ProgressData {
  try {
    const data = fs.readFileSync(PROGRESS_FILE_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (_error) {
    // Return default data if file doesn't exist
    return getDefaultProgressData()
  }
}

/**
 * Write progress data
 */
export function writeProgressData(data: ProgressData): void {
  const dir = path.dirname(PROGRESS_FILE_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(PROGRESS_FILE_PATH, JSON.stringify(data, null, 2))
}

/**
 * Update epic progress
 */
export function updateEpicProgress(epicId: string, updates: Partial<EpicProgress>): void {
  const data = readProgressData()
  const epicIndex = data.epics.findIndex(e => e.epicId === epicId)
  
  if (epicIndex !== -1) {
    data.epics[epicIndex] = {
      ...data.epics[epicIndex],
      ...updates,
    }
    
    // Recalculate overall progress
    data.overall = calculateOverallProgress(data.epics)
    data.lastUpdated = new Date().toISOString()
    
    writeProgressData(data)
  }
}

/**
 * Calculate overall progress from epic progress
 */
function calculateOverallProgress(epics: EpicProgress[]) {
  const completedEpics = epics.filter(e => e.status === 'completed').length
  const inProgressEpics = epics.filter(e => e.status === 'in-progress').length
  const notStartedEpics = epics.filter(e => e.status === 'not-started').length
  const blockedEpics = epics.filter(e => e.status === 'blocked').length
  
  const totalCompletion = epics.reduce((sum, e) => sum + e.completionPercentage, 0)
  const overallPercentage = epics.length > 0 ? Math.round(totalCompletion / epics.length) : 0

  return {
    totalEpics: epics.length,
    completedEpics,
    inProgressEpics,
    notStartedEpics,
    blockedEpics,
    overallPercentage,
    velocity: {
      pagesPerWeek: 0, // Would be calculated from historical data
      epicsPerMonth: 0,
      trend: 'stable' as const,
    },
  }
}

/**
 * Get default progress data
 */
function getDefaultProgressData(): ProgressData {
  return {
    lastUpdated: new Date().toISOString(),
    overall: {
      totalEpics: 9,
      completedEpics: 0,
      inProgressEpics: 0,
      notStartedEpics: 9,
      blockedEpics: 0,
      overallPercentage: 0,
      velocity: {
        pagesPerWeek: 0,
        epicsPerMonth: 0,
        trend: 'stable',
      },
    },
    epics: [],
    documents: [],
  }
}

