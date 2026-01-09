import { AppShell } from '@/components/layout/AppShell'
import { ProgressDashboard } from '@/components/progress/ProgressDashboard'
import { readProgressData } from '@/lib/progress/database'
import { formatDate } from '@/lib/utils'

export default async function ProgressPage() {
  const progressData = readProgressData()

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Implementation Progress</h1>
            <p className="text-foreground/60">
              Track the development progress across all epics and features
            </p>
          </div>
          <div className="text-sm text-foreground/60">
            Last updated: {formatDate(progressData.lastUpdated)}
          </div>
        </div>

        <ProgressDashboard progressData={progressData} />
      </div>
    </AppShell>
  )
}

