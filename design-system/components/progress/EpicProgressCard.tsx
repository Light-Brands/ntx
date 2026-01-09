import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { StatusBadge } from './StatusBadge'
import type { EpicProgress } from '@/types/progress'

interface EpicProgressCardProps {
  epic: EpicProgress
}

export function EpicProgressCard({ epic }: EpicProgressCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary text-white font-bold">
              {epic.epicNumber}
            </div>
            <div>
              <CardTitle className="text-lg">{epic.epicName}</CardTitle>
              <StatusBadge status={epic.status} size="sm" />
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {epic.completionPercentage}%
            </div>
            <div className="text-xs text-foreground/60">Complete</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Progress bar */}
        <div className="w-full h-2 bg-light-grey rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-primary transition-all duration-300"
            style={{ width: `${epic.completionPercentage}%` }}
          />
        </div>

        {/* Sections */}
        {epic.sections.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-foreground/60">Sections</p>
            {epic.sections.map((section, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-foreground/80">{section.sectionName}</span>
                <div className="flex items-center gap-2">
                  <span className="text-foreground/60">{section.completionPercentage}%</span>
                  <StatusBadge status={section.status} size="sm" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Blockers */}
        {epic.blockers.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-medium text-red-700 mb-2">
              🚫 {epic.blockers.length} Blocker{epic.blockers.length !== 1 ? 's' : ''}
            </p>
            {epic.blockers.map((blocker) => (
              <div key={blocker.id} className="text-xs text-red-600">
                • {blocker.description}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

