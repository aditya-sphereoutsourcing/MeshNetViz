import { ReactFlowProvider } from 'reactflow';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NetworkTopology from "@/components/NetworkTopology";
import NodeMonitoring from "@/components/NodeMonitoring";
import CoverageMap from "@/components/CoverageMap";
import AiRecommendations from "@/components/AiRecommendations";
import PerformanceHeatMap from "@/components/PerformanceHeatMap";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-4">
      <h1 className="text-2xl font-bold mb-6">Mesh Network Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Total Nodes</h3>
          <p className="text-3xl font-bold text-primary">10</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Active Connections</h3>
          <p className="text-3xl font-bold text-primary">15</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-2">Network Health</h3>
          <p className="text-3xl font-bold text-green-500">Good</p>
        </Card>
      </div>

      <Tabs defaultValue="topology" className="space-y-4">
        <TabsList>
          <TabsTrigger value="topology">Network Topology</TabsTrigger>
          <TabsTrigger value="monitoring">Node Monitoring</TabsTrigger>
          <TabsTrigger value="coverage">Coverage Map</TabsTrigger>
          <TabsTrigger value="performance">Performance Heat Map</TabsTrigger>
          <TabsTrigger value="ai">AI Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="topology" className="h-[600px]">
          <ReactFlowProvider>
            <NetworkTopology />
          </ReactFlowProvider>
        </TabsContent>

        <TabsContent value="monitoring">
          <NodeMonitoring />
        </TabsContent>

        <TabsContent value="coverage">
          <CoverageMap />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceHeatMap />
        </TabsContent>

        <TabsContent value="ai">
          <AiRecommendations />
        </TabsContent>
      </Tabs>
    </div>
  );
}