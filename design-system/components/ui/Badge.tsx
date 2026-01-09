import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'badge inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
          {
            'badge-primary': variant === 'primary',
            'badge-success': variant === 'success',
            'badge-warning': variant === 'warning',
            'badge-error': variant === 'error',
            'bg-light-grey text-foreground': variant === 'neutral',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }

