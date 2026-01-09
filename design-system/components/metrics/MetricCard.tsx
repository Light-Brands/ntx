import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

interface MetricCardProps {
  title: string
  value: string | number
  description?: string
  icon?: string
  status?: 'good' | 'warning' | 'error'
  trend?: {
    value: number
    direction: 'up' | 'down'
    label: string
  }
}

export function MetricCard({ title, value, description, icon, status, trend }: MetricCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return 'text-green-600'
      case 'warning':
        return 'text-yellow-600'
      case 'error':
        return 'text-red-600'
      default:
        return 'text-primary'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-foreground/60">
            {title}
          </CardTitle>
          {icon && <span className="text-2xl">{icon}</span>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className={`text-3xl font-bold ${getStatusColor()}`}>
            {value}
          </p>
          {description && (
            <p className="text-sm text-foreground/60">{description}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 text-sm">
              <span className={trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
                {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-foreground/60">{trend.label}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

