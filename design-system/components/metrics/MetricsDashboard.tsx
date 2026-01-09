import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { MetricCard } from './MetricCard'
import type { SpecHealthMetrics, ContentQualityMetrics } from '@/lib/metrics/calculator'

interface MetricsDashboardProps {
  specHealth: SpecHealthMetrics
  contentQuality: ContentQualityMetrics
}

export function MetricsDashboard({ specHealth, contentQuality }: MetricsDashboardProps) {
  return (
    <div className="space-y-8">
      {/* Specification Health */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Specification Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Documents"
            value={specHealth.totalDocuments}
            description="Across all categories"
            icon="📚"
            status="good"
          />
          <MetricCard
            title="Total Pages"
            value={specHealth.totalPages}
            description="Estimated page count"
            icon="📄"
            status="good"
          />
          <MetricCard
            title="Orphaned Documents"
            value={specHealth.orphanedDocuments}
            description="No references in or out"
            icon="🔗"
            status={specHealth.orphanedDocuments === 0 ? 'good' : 'warning'}
          />
          <MetricCard
            title="Broken Links"
            value={specHealth.brokenLinks}
            description="Internal links to verify"
            icon="⚠️"
            status={specHealth.brokenLinks === 0 ? 'good' : 'error'}
          />
        </div>
      </div>

      {/* Content Quality */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Content Quality</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Code Examples"
            value={contentQuality.codeExamples}
            description="Across all documents"
            icon="💻"
            status="good"
          />
          <MetricCard
            title="Diagrams"
            value={contentQuality.diagramCount}
            description="Visual explanations"
            icon="📊"
            status="good"
          />
          <MetricCard
            title="Cross-Reference Density"
            value={contentQuality.crossReferenceDensity}
            description="Avg references per doc"
            icon="🔗"
            status={contentQuality.crossReferenceDensity > 2 ? 'good' : 'warning'}
          />
          <MetricCard
            title="Tag Coverage"
            value={`${contentQuality.tagCoverage}%`}
            description="Documents with tags"
            icon="🏷️"
            status={contentQuality.tagCoverage > 80 ? 'good' : 'warning'}
          />
        </div>
      </div>

      {/* Documentation Coverage by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Documentation Coverage by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(specHealth.documentationCoverage).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm font-medium capitalize">{category}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-light-grey rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary"
                      style={{ width: `${(count / specHealth.totalDocuments) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-foreground/60 w-12 text-right">{count} docs</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documentation Depth */}
      <Card>
        <CardHeader>
          <CardTitle>Documentation Depth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(contentQuality.documentationDepth)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([level, count]) => (
                <div key={level} className="flex items-center gap-3">
                  <span className="text-sm font-mono w-12">H{level}</span>
                  <div className="flex-1 h-6 bg-light-grey rounded overflow-hidden">
                    <div
                      className="h-full bg-accent/30 flex items-center px-2"
                      style={{ 
                        width: `${(count / Math.max(...Object.values(contentQuality.documentationDepth))) * 100}%` 
                      }}
                    >
                      <span className="text-xs font-medium">{count}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className={specHealth.averageDocumentLength > 1000 ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}>
          <CardHeader>
            <CardTitle className="text-lg">Document Length</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground mb-2">
              {specHealth.averageDocumentLength} words
            </p>
            <p className="text-sm text-foreground/60">
              Average document length. {specHealth.averageDocumentLength > 1000 ? 'Comprehensive' : 'Could be more detailed'}.
            </p>
          </CardContent>
        </Card>

        <Card className={specHealth.lastUpdatedDays < 7 ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}>
          <CardHeader>
            <CardTitle className="text-lg">Freshness</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground mb-2">
              {specHealth.lastUpdatedDays} days
            </p>
            <p className="text-sm text-foreground/60">
              Since last update. {specHealth.lastUpdatedDays < 7 ? 'Very fresh!' : 'Consider updating soon'}.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

