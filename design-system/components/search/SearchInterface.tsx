'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/Input'
import { SearchResults } from './SearchResults'
import { SearchFilters } from './SearchFilters'
import { search } from '@/lib/search/searcher'
import { debounce } from '@/lib/utils'
import type { SearchIndex, SearchResult, SearchFilters as Filters } from '@/types/search'

interface SearchInterfaceProps {
  searchData: SearchIndex[]
}

export function SearchInterface({ searchData }: SearchInterfaceProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [filters, setFilters] = useState<Filters>({})
  const [isSearching, setIsSearching] = useState(false)

  // Debounced search
  useEffect(() => {
    const performSearch = debounce(() => {
      if (!query.trim()) {
        setResults([])
        setIsSearching(false)
        return
      }

      setIsSearching(true)
      const searchResults = search(query, searchData, filters)
      setResults(searchResults)
      setIsSearching(false)
    }, 300)

    performSearch()
  }, [query, filters, searchData])

  return (
    <div className="space-y-6">
      {/* Search input */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-12 text-lg pr-10"
          autoFocus
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isSearching ? (
            <span className="animate-spin text-accent">⏳</span>
          ) : (
            <span className="text-foreground/40">🔍</span>
          )}
        </div>
      </div>

      {/* Results count */}
      {query && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-foreground/60">
            {results.length > 0 ? (
              <>
                Found <strong>{results.length}</strong> {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
              </>
            ) : (
              <>No results found for &ldquo;{query}&rdquo;</>
            )}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        {/* Filters */}
        <aside>
          <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            searchData={searchData}
          />
        </aside>

        {/* Results */}
        <div>
          <SearchResults results={results} query={query} />
        </div>
      </div>
    </div>
  )
}

