import { useCallback } from 'react';
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

  const onInit = useCallback(() => {
    if (!nodes) return;

    const flowNodes = nodes.map(node => ({
      id: node.id.toString(),
      position: { x: Number(node.x), y: Number(node.y) },
      data: { label: node.name },
      style: { 
        background: nodeColors[node.type],
        border: node.status === 'online' ? '2px solid #4caf50' : '2px solid #f44336'
      }
    }));

    const edges = nodes.map((node, idx) => ({
      id: `e${idx}`,
      source: node.id.toString(),
      target: ((idx + 1) % nodes.length + 1).toString(),
      animated: true,
      style: { stroke: '#666' }
    }));

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
        onInit={onInit}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
