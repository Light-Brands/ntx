import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: string
  trend?: {
    value: number
    label: string
    positive?: boolean
  }
}

export function StatsCard({ title, value, subtitle, icon, trend }: StatsCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-foreground/60">
            {title}
          </CardTitle>
          {icon && <span className="text-2xl">{icon}</span>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-sm text-foreground/60">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 text-sm">
              <span className={trend.positive ? 'text-green-600' : 'text-red-600'}>
                {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-foreground/60">{trend.label}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

