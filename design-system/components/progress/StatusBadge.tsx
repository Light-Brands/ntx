import { Badge } from '@/components/ui/Badge'

interface StatusBadgeProps {
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked'
  size?: 'sm' | 'md' | 'lg'
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const getVariant = (status: string): 'primary' | 'success' | 'warning' | 'error' | 'neutral' => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'in-progress':
        return 'warning'
      case 'blocked':
        return 'error'
      default:
        return 'neutral'
    }
  }

  const getIcon = (status: string): string => {
    switch (status) {
      case 'completed':
        return '✅'
      case 'in-progress':
        return '🔄'
      case 'blocked':
        return '🚫'
      default:
        return '⏸️'
    }
  }

  const getLabel = (status: string): string => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : size === 'lg' ? 'text-base px-4 py-2' : ''

  return (
    <Badge variant={getVariant(status)} className={sizeClass}>
      <span className="mr-1">{getIcon(status)}</span>
      {getLabel(status)}
    </Badge>
  )
}

