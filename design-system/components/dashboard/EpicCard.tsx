import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { EpicInfo } from '@/types/document'

interface EpicCardProps {
  epic: EpicInfo
}

export function EpicCard({ epic }: EpicCardProps) {
  const getStatusVariant = (status: string): 'primary' | 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'in-progress':
        return 'warning'
      case 'blocked':
        return 'error'
      default:
        return 'primary'
    }
  }

  const getPriorityColor = (priority: string): string => {
    return priority === 'P0' ? 'text-red-600' : priority === 'P1' ? 'text-orange-600' : 'text-blue-600'
  }

  return (
    <Card hover className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">{epic.number}</span>
              <Badge variant={getStatusVariant(epic.status)}>
                {epic.status.replace('-', ' ')}
              </Badge>
              <span className={`text-xs font-bold ${getPriorityColor(epic.priority)}`}>
                {epic.priority}
              </span>
            </div>
            <CardTitle className="text-xl">{epic.name}</CardTitle>
          </div>
        </div>
        <CardDescription>{epic.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-foreground/60">Timeline</p>
            <p className="text-sm text-foreground">{epic.timeline}</p>
          </div>
          
          {epic.dependencies.length > 0 && (
            <div>
              <p className="text-sm font-medium text-foreground/60">Dependencies</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {epic.dependencies.map((dep) => (
                  <Badge key={dep} variant="neutral" className="text-xs">
                    {dep}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Link href={`/docs/${epic.path}`} className="w-full">
          <Button variant="primary" className="w-full">
            View Specification →
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

