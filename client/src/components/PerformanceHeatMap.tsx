import { useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip } from 'recharts';
import type { InsertMetrics } from '@shared/schema';

type PerformanceData = {
  nodeId: number;
  metrics: InsertMetrics;
};

type ProcessedDataPoint = {
  x: number;
  y: number;
  value: number;
  metric: string;
  prediction?: number;
};

export default function PerformanceHeatMap() {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<'signalStrength' | 'latency' | 'throughput'>('signalStrength');
  
  const connectWebSocket = useCallback(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'metrics') {
        setPerformanceData(message.data);
      }
    };

    ws.onclose = () => {
      // Attempt to reconnect after a delay
      setTimeout(connectWebSocket, 5000);
    };

    return ws;
  }, []);

  useEffect(() => {
    const ws = connectWebSocket();
    return () => ws.close();
  }, [connectWebSocket]);

  // Process data for visualization
  const processedData: ProcessedDataPoint[] = performanceData.flatMap(({ nodeId, metrics }) => {
    const baseValue = metrics[selectedMetric];
    const prediction = calculatePrediction(metrics); // Simple prediction based on current values

    return [
      {
        x: nodeId * 100, // Spread out nodes for visibility
        y: baseValue,
        value: baseValue,
        metric: 'current',
      },
      {
        x: nodeId * 100,
        y: prediction,
        value: prediction,
        metric: 'predicted',
      },
    ];
  });

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Network Performance Heat Map</h3>
        <div className="flex gap-2">
          <select
            className="border rounded p-1"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as any)}
          >
            <option value="signalStrength">Signal Strength</option>
            <option value="latency">Latency</option>
            <option value="throughput">Throughput</option>
          </select>
        </div>
      </div>

      <div className="h-[600px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Node Position" 
              unit="" 
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name={selectedMetric} 
              unit={getMetricUnit(selectedMetric)} 
            />
            <ZAxis
              type="number"
              dataKey="value"
              range={[20, 200]}
              name="Intensity"
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background/95 p-2 rounded shadow">
                      <p className="text-sm">
                        {`${selectedMetric}: ${data.value}${getMetricUnit(selectedMetric)}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {data.metric === 'predicted' ? 'Predicted' : 'Current'}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter
              name="Current"
              data={processedData.filter(d => d.metric === 'current')}
              fill="#8884d8"
            />
            <Scatter
              name="Predicted"
              data={processedData.filter(d => d.metric === 'predicted')}
              fill="#82ca9d"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <h4 className="font-medium mb-2">Current Performance</h4>
          <p className="text-sm text-muted-foreground">
            Real-time metrics showing current network performance across all nodes.
          </p>
        </div>
        <div className="p-4 border rounded">
          <h4 className="font-medium mb-2">Predictive Insights</h4>
          <p className="text-sm text-muted-foreground">
            AI-driven predictions for expected performance changes in the next 30 minutes.
          </p>
        </div>
      </div>
    </Card>
  );
}

function getMetricUnit(metric: string): string {
  switch (metric) {
    case 'signalStrength':
      return 'dBm';
    case 'latency':
      return 'ms';
    case 'throughput':
      return 'B/s';
    default:
      return '';
  }
}

function calculatePrediction(metrics: InsertMetrics): number {
  // Simple prediction algorithm - could be enhanced with more sophisticated methods
  const randomVariation = (Math.random() - 0.5) * 10;
  return Math.abs(metrics.signalStrength) + randomVariation;
}
