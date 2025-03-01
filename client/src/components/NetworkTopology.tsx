import { useEffect, useState } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useQuery } from '@tanstack/react-query';
import type { Node } from '@shared/schema';

const nodeColors = {
  drone: '#ff9800',
  ground: '#4caf50',
  solar: '#2196f3'
};

type NodeData = {
  label: string;
  type: 'drone' | 'ground' | 'solar';
  status: 'online' | 'offline' | 'maintenance';
};

export default function NetworkTopology() {
  const [flowNodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('Connected to network topology updates');
      setWsConnected(true);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'initialState' || message.type === 'update') {
        const nodes = message.data.nodes;

        // Update node positions with animation
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
          },
          // Add transition for smooth movement
          transition: {
            duration: 800,
            timing: 'ease'
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
              style: { stroke: '#666', strokeWidth: 2 },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: '#666',
              },
            }))
        );

        setNodes(flowNodes);
        setEdges(edges);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from network topology updates');
      setWsConnected(false);
      // Attempt to reconnect after a delay
      setTimeout(() => {
        setWsConnected(false);
      }, 5000);
    };

    return () => ws.close();
  }, [setNodes, setEdges]);

  return (
    <div className="h-full w-full border rounded-lg overflow-hidden">
      <div className="absolute top-4 right-4 z-10 px-2 py-1 rounded text-sm">
        {wsConnected ? (
          <span className="text-green-500">●</span>
        ) : (
          <span className="text-red-500">●</span>
        )} Live Updates
      </div>
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