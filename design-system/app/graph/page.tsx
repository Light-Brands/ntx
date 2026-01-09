'use client'

import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/layout/AppShell'
import { DocumentGraph } from '@/components/visualization/DocumentGraph'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

// This would normally be loaded from server, but for simplicity showing static example
export default function GraphPage() {
  const router = useRouter()

  // Sample graph data - in real implementation, this would come from server
  const sampleGraph = {
    nodes: [
      {
        id: 'epic-00',
        label: 'Foundation',
        type: 'epic' as const,
        category: 'epic',
        status: 'not-started' as const,
        path: 'epics/epic-00-foundation',
      },
      {
        id: 'epic-01',
        label: 'Mira',
        type: 'epic' as const,
        category: 'epic',
        status: 'not-started' as const,
        path: 'epics/epic-01-mira',
      },
      {
        id: 'epic-02',
        label: 'Humans',
        type: 'epic' as const,
        category: 'epic',
        status: 'not-started' as const,
        path: 'epics/epic-02-humans',
      },
      {
        id: 'master-plan',
        label: 'Master Plan',
        type: 'document' as const,
        category: 'overview',
        path: 'MASTER-PLAN',
      },
    ],
    edges: [
      {
        id: 'epic-01->epic-00',
        source: 'epic-01',
        target: 'epic-00',
        type: 'dependency' as const,
        label: 'depends on',
      },
      {
        id: 'epic-02->epic-00',
        source: 'epic-02',
        target: 'epic-00',
        type: 'dependency' as const,
        label: 'depends on',
      },
      {
        id: 'epic-02->epic-01',
        source: 'epic-02',
        target: 'epic-01',
        type: 'dependency' as const,
        label: 'depends on',
      },
      {
        id: 'master-plan->epic-00',
        source: 'master-plan',
        target: 'epic-00',
        type: 'reference' as const,
        label: 'references',
      },
    ],
  }

  const handleNodeClick = (nodeId: string) => {
    const node = sampleGraph.nodes.find(n => n.id === nodeId)
    if (node) {
      router.push(`/docs/${node.path}`)
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Document Graph</h1>
          <p className="text-foreground/60">
            Visualize relationships and dependencies between documentation
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="primary">🔵 Epic</Badge>
          <Badge variant="neutral" className="bg-midnight-blue/10 text-midnight-blue">
            🔷 Category
          </Badge>
          <Badge variant="neutral" className="bg-accent/10 text-accent">
            ⚪ Document
          </Badge>
          <Badge variant="success">✅ Completed</Badge>
          <Badge variant="error">🚫 Blocked</Badge>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">All Documents</Button>
            <Button variant="ghost" size="sm">Epic Dependencies</Button>
            <Button variant="ghost" size="sm">By Category</Button>
          </div>

          <DocumentGraph graph={sampleGraph} onNodeClick={handleNodeClick} />
        </div>

        <div className="rounded-lg border border-border bg-light-grey/30 p-6">
          <h3 className="text-lg font-semibold mb-3">Graph Controls</h3>
          <ul className="space-y-1 text-sm text-foreground/60">
            <li>• Click and drag to pan the graph</li>
            <li>• Scroll to zoom in and out</li>
            <li>• Click on nodes to navigate to documents</li>
            <li>• Use controls in bottom-left for zoom and fit view</li>
            <li>• Mini-map in bottom-right shows overview</li>
          </ul>
        </div>
      </div>
    </AppShell>
  )
}

