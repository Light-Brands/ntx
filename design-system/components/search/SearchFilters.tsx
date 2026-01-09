'use client'

import { Badge } from '@/components/ui/Badge'
import type { SearchFilters as Filters, SearchIndex } from '@/types/search'

interface SearchFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  searchData: SearchIndex[]
}

export function SearchFilters({ filters, onFiltersChange, searchData }: SearchFiltersProps) {
  const categories = [...new Set(searchData.map(d => d.category).filter(Boolean))] as string[]
  const epics = [...new Set(searchData.map(d => d.epic).filter(Boolean))] as string[]
  const statuses = [...new Set(searchData.map(d => d.status).filter(Boolean))] as string[]
  const allTags = [...new Set(searchData.flatMap(d => d.tags))]

  const toggleFilter = (type: keyof Filters, value: string) => {
    const current = filters[type] || []
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    
    onFiltersChange({
      ...filters,
      [type]: updated.length > 0 ? updated : undefined,
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = Object.values(filters).some(f => f && f.length > 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-foreground">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-accent hover:text-sky-blue"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-foreground/60 mb-2">Category</h4>
          <div className="space-y-1">
            {categories.map(category => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories?.includes(category)}
                  onChange={() => toggleFilter('categories', category)}
                  className="rounded border-border text-accent focus:ring-accent"
                />
                <span className="text-sm capitalize">{category}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Epics */}
      {epics.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-foreground/60 mb-2">Epic</h4>
          <div className="space-y-1">
            {epics.map(epic => epic && (
              <label key={epic} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.epics?.includes(epic) || false}
                  onChange={() => toggleFilter('epics', epic)}
                  className="rounded border-border text-accent focus:ring-accent"
                />
                <span className="text-sm">{epic}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Status */}
      {statuses.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-foreground/60 mb-2">Status</h4>
          <div className="space-y-1">
            {statuses.map(status => (
              <label key={status} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.statuses?.includes(status)}
                  onChange={() => toggleFilter('statuses', status)}
                  className="rounded border-border text-accent focus:ring-accent"
                />
                <span className="text-sm capitalize">{status.replace('-', ' ')}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Tags (limited to top 10) */}
      {allTags.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-foreground/60 mb-2">Tags</h4>
          <div className="flex flex-wrap gap-1">
            {allTags.slice(0, 10).map(tag => (
              <Badge
                key={tag}
                variant={filters.tags?.includes(tag) ? 'primary' : 'neutral'}
                className="cursor-pointer text-xs"
                onClick={() => toggleFilter('tags', tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

