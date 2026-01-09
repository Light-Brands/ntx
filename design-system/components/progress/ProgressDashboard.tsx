import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { EpicProgressCard } from './EpicProgressCard'
import type { ProgressData } from '@/types/progress'

interface ProgressDashboardProps {
  progressData: ProgressData
}

export function ProgressDashboard({ progressData }: ProgressDashboardProps) {
  const { overall, epics } = progressData

  return (
    <div className="space-y-8">
      {/* Overall Progress */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Overall Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Overall Completion"
            value={`${overall.overallPercentage}%`}
            subtitle="Across all epics"
            icon="📊"
          />
          <StatsCard
            title="Completed Epics"
            value={overall.completedEpics}
            subtitle={`Out of ${overall.totalEpics} total`}
            icon="✅"
          />
          <StatsCard
            title="In Progress"
            value={overall.inProgressEpics}
            subtitle="Currently being developed"
            icon="🔄"
          />
          <StatsCard
            title="Blocked"
            value={overall.blockedEpics}
            subtitle="Requiring attention"
            icon="🚫"
          />
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Development Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="w-full h-4 bg-light-grey rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-primary transition-all duration-500"
                style={{ width: `${overall.overallPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-foreground/60">
              <span>Started</span>
              <span className="font-medium text-foreground">{overall.overallPercentage}% Complete</span>
              <span>Launch Ready</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Epic Progress Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Epic Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {epics.map((epic) => (
            <EpicProgressCard key={epic.epicId} epic={epic} />
          ))}
        </div>
      </div>

      {/* Velocity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Pages Per Week"
          value={overall.velocity.pagesPerWeek}
          subtitle="Development velocity"
          icon="📝"
          trend={{
            value: 0,
            label: 'vs last week',
            positive: overall.velocity.trend === 'increasing',
          }}
        />
        <StatsCard
          title="Epics Per Month"
          value={overall.velocity.epicsPerMonth}
          subtitle="Completion rate"
          icon="🚀"
        />
        <StatsCard
          title="Velocity Trend"
          value={overall.velocity.trend.charAt(0).toUpperCase() + overall.velocity.trend.slice(1)}
          subtitle="Overall momentum"
          icon="📈"
        />
      </div>
    </div>
  )
}

