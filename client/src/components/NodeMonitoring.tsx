import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import type { Node } from '@shared/schema';

export default function NodeMonitoring() {
  const { data: nodes } = useQuery<Node[]>({ 
    queryKey: ['/api/nodes']
  });

  const signalData = nodes?.map(node => ({
    name: node.name,
    signal: Math.abs(node.signalStrength),
    battery: node.batteryLevel
  })) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Signal Strength</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={signalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="signal" 
                stroke="#2196f3" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Battery Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={signalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="battery" 
                stroke="#4caf50" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Node Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nodes?.map(node => (
            <div 
              key={node.id} 
              className="p-4 rounded-lg border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{node.name}</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  node.status === 'online' ? 'bg-green-100 text-green-800' :
                  node.status === 'offline' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {node.status}
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <p>Type: {node.type}</p>
                <p>Signal: {node.signalStrength} dBm</p>
                <p>Battery: {node.batteryLevel}%</p>
                <p>Clients: {node.connectedClients}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
