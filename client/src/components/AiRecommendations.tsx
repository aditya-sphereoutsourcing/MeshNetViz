import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Move, Plus, RefreshCw } from 'lucide-react';

type Recommendation = {
  id: number;
  type: string;
  description: string;
  impact: string;
};

export default function AiRecommendations() {
  const { data: recommendations } = useQuery<Recommendation[]>({
    queryKey: ['/api/recommendations']
  });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-500" />
            <h3 className="text-lg font-medium">AI Recommendations</h3>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Analysis
          </Button>
        </div>

        <div className="space-y-4">
          {recommendations?.map((rec) => (
            <div 
              key={rec.id}
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {rec.type === 'optimization' ? (
                    <Move className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Plus className="h-5 w-5 text-green-500" />
                  )}
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {rec.type}
                    </Badge>
                    <p className="text-sm">{rec.description}</p>
                  </div>
                </div>
                <Badge variant="secondary">
                  {rec.impact}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Coverage Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Current coverage efficiency is at 85%. Implementing recommended changes
              could improve coverage by up to 12%.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Network Health</h4>
            <p className="text-sm text-muted-foreground">
              Network resilience could be improved by adding redundant paths
              between critical nodes.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
