'use client'

import { useCallback, useMemo } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Position,
} from 'reactflow'
import 'reactflow/dist/style.css'
import type { DocumentGraph as GraphData } from '@/types/graph'

interface DocumentGraphProps {
  graph: GraphData
  onNodeClick?: (nodeId: string) => void
}

export function DocumentGraph({ graph, onNodeClick }: DocumentGraphProps) {
  // Convert graph data to React Flow format
  const initialNodes: Node[] = useMemo(() => {
    return graph.nodes.map((node, index) => {
      const x = (index % 5) * 250
      const y = Math.floor(index / 5) * 150

      let color = '#5BB8FF' // Default accent color
      if (node.type === 'epic') color = '#002B7F' // Primary
      if (node.type === 'category') color = '#001A47' // Midnight
      if (node.status === 'completed') color = '#10B981' // Green
      if (node.status === 'blocked') color = '#EF4444' // Red

      return {
        id: node.id,
        type: 'default',
        position: { x, y },
        data: { 
          label: node.label,
          type: node.type,
          category: node.category,
        },
        style: {
          background: color,
          color: '#ffffff',
          border: '2px solid #ffffff',
          borderRadius: '8px',
          padding: '10px',
          fontSize: '12px',
          fontWeight: 500,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      }
    })
  }, [graph.nodes])

  const initialEdges: Edge[] = useMemo(() => {
    return graph.edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      type: edge.type === 'dependency' ? 'step' : 'default',
      animated: edge.type === 'dependency',
      style: {
        stroke: edge.type === 'dependency' ? '#002B7F' : '#C7CEDA',
        strokeWidth: edge.type === 'dependency' ? 2 : 1,
      },
    }))
  }, [graph.edges])

  const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, _setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (onNodeClick) {
        onNodeClick(node.id)
      }
    },
    [onNodeClick]
  )

  return (
    <div style={{ width: '100%', height: '600px' }} className="border border-border rounded-lg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        fitView
        attributionPosition="bottom-right"
      >
        <Background />
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            const nodeData = graph.nodes.find(n => n.id === node.id)
            if (nodeData?.type === 'epic') return '#002B7F'
            if (nodeData?.type === 'category') return '#001A47'
            return '#5BB8FF'
          }}
          maskColor="rgba(247, 249, 252, 0.8)"
        />
      </ReactFlow>
    </div>
  )
}

