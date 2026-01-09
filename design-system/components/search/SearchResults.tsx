import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { SearchResult } from '@/types/search'
import { getCategoryColor } from '@/lib/utils'

interface SearchResultsProps {
  results: SearchResult[]
  query: string
}

export function SearchResults({ results, query }: SearchResultsProps) {
  if (results.length === 0 && query) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-foreground/60 mb-2">No results found</p>
        <p className="text-sm text-foreground/40">
          Try adjusting your search or filters
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <Link key={result.id} href={`/docs/${result.slug}`}>
          <Card hover className="cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">
                    {highlightText(result.title, query)}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    {result.category && (
                      <Badge variant="neutral" className={getCategoryColor(result.category)}>
                        {result.category}
                      </Badge>
                    )}
                    {result.epic && (
                      <Badge variant="primary" className="text-xs">
                        {result.epic}
                      </Badge>
                    )}
                    {result.metadata.status && (
                      <Badge variant="neutral" className="text-xs">
                        {result.metadata.status}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-sm text-foreground/40 shrink-0">
                  Score: {Math.round(result.score)}
                </div>
              </div>
            </CardHeader>
            {result.description && (
              <CardContent>
                <CardDescription className="line-clamp-2">
                  {highlightText(result.description, query)}
                </CardDescription>
                {result.metadata.tags && result.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {result.metadata.tags.map((tag) => (
                      <Badge key={tag} variant="neutral" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        </Link>
      ))}
    </div>
  )
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return text

  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index} className="bg-accent/20 text-accent font-medium px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

