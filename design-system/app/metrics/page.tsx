import { AppShell } from '@/components/layout/AppShell'
import { MetricsDashboard } from '@/components/metrics/MetricsDashboard'
import { readAllDocuments } from '@/lib/fs/documents'
import { calculateSpecHealthMetrics, calculateContentQualityMetrics } from '@/lib/metrics/calculator'

export default async function MetricsPage() {
  const documents = await readAllDocuments()
  const specHealth = calculateSpecHealthMetrics(documents)
  const contentQuality = calculateContentQualityMetrics(documents)

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Business Metrics</h1>
          <p className="text-foreground/60">
            Comprehensive metrics for specification health, content quality, and implementation progress
          </p>
        </div>

        <MetricsDashboard 
          specHealth={specHealth}
          contentQuality={contentQuality}
        />
      </div>
    </AppShell>
  )
}

