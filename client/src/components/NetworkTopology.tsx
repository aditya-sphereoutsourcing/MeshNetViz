import { useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useQuery } from '@tanstack/react-query';
import type { Node } from '@shared/schema';

const nodeColors = {
  drone: '#ff9800',
  ground: '#4caf50',
  solar: '#2196f3'
};

export default function NetworkTopology() {
  const { data: nodes } = useQuery<Node[]>({ 
    queryKey: ['/api/nodes']
  });

  const [flowNodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!nodes) return;

    const flowNodes = nodes.map(node => ({
      id: node.id.toString(),
      position: { x: Number(node.x), y: Number(node.y) },
      data: { 
        label: node.name,
        type: node.type,
        status: node.status
      },
      style: { 
        background: nodeColors[node.type],
        border: node.status === 'online' ? '2px solid #4caf50' : '2px solid #f44336',
        width: 150,
        padding: 10,
        borderRadius: 5
      }
    }));

    // Create edges between nodes that are close to each other
    const edges = nodes.flatMap((node, idx) => 
      nodes
        .slice(idx + 1)
        .filter(target => {
          const distance = Math.sqrt(
            Math.pow(Number(target.x) - Number(node.x), 2) + 
            Math.pow(Number(target.y) - Number(node.y), 2)
          );
          return distance < 300; // Only connect nodes within 300 units
        })
        .map(target => ({
          id: `e${node.id}-${target.id}`,
          source: node.id.toString(),
          target: target.id.toString(),
          animated: true,
          style: { stroke: '#666', strokeWidth: 2 }
        }))
    );

    setNodes(flowNodes);
    setEdges(edges);
  }, [nodes, setNodes, setEdges]);

  return (
    <div className="h-full w-full border rounded-lg overflow-hidden">
      <ReactFlow
        nodes={flowNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap 
          nodeColor={node => nodeColors[node.data?.type] || '#666'}
          style={{ background: '#f8f9fa' }}
        />
      </ReactFlow>
    </div>
  );
}