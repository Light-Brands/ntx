import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface CategoryCardProps {
  title: string
  description: string
  icon: string
  docCount: number
  href: string
}

export function CategoryCard({ title, description, icon, docCount, href }: CategoryCardProps) {
  return (
    <Link href={href}>
      <Card hover className="h-full cursor-pointer">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary">
              <span className="text-2xl">{icon}</span>
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Badge variant="primary">{docCount} documents</Badge>
        </CardContent>
      </Card>
    </Link>
  )
}

