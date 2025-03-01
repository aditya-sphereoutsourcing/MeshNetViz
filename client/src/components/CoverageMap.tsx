import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip } from 'recharts';

type CoveragePoint = {
  x: number;
  y: number;
  strength: number;
};

export default function CoverageMap() {
  const { data: coverage } = useQuery<CoveragePoint[]>({ 
    queryKey: ['/api/coverage']
  });

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Network Coverage Heatmap</h3>
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
            <XAxis type="number" dataKey="x" name="X" unit="m" />
            <YAxis type="number" dataKey="y" name="Y" unit="m" />
            <ZAxis
              type="number"
              dataKey="strength"
              range={[20, 200]}
              name="Signal Strength"
              unit="%"
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter
              name="Coverage"
              data={coverage}
              fill="#8884d8"
              shape="circle"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full opacity-20" />
          <span>Weak Signal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full opacity-60" />
          <span>Medium Signal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full" />
          <span>Strong Signal</span>
        </div>
      </div>
    </Card>
  );
}
