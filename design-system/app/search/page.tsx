import { AppShell } from '@/components/layout/AppShell'
import { SearchInterface } from '@/components/search/SearchInterface'
import { readAllDocuments } from '@/lib/fs/documents'
import { serializeSearchIndex } from '@/lib/search/indexer'

export default async function SearchPage() {
  const documents = await readAllDocuments()
  const searchDataJson = serializeSearchIndex(documents)
  const searchData = JSON.parse(searchDataJson)

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Search Documentation</h1>
          <p className="text-foreground/60">
            Search across 200+ pages of design specifications, architecture docs, and implementation guides
          </p>
        </div>

        <SearchInterface searchData={searchData} />
      </div>
    </AppShell>
  )
}

