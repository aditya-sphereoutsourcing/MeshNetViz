import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import { storage } from "./storage";
import { 
  generateMockNodes, 
  generateMockMetrics, 
  generatePathPoints,
  type SimulatedPath 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const mockNodes = generateMockNodes(10);

  // Generate simulated paths for drone nodes
  const simulatedPaths: SimulatedPath[] = mockNodes
    .filter(node => node.type === "drone")
    .map(node => ({
      id: node.id,
      nodeId: node.id,
      pathType: ["linear", "circular", "random"][Math.floor(Math.random() * 3)] as "linear" | "circular" | "random",
      startX: node.x.toString(),
      startY: node.y.toString(),
      endX: (Number(node.x) + Math.random() * 200 - 100).toString(),
      endY: (Number(node.y) + Math.random() * 200 - 100).toString(),
      speed: (1 + Math.random() * 4).toString(), // 1-5 units per second
      startTime: new Date(),
      active: true
    }));

  app.get("/api/nodes", (_req, res) => {
    // Update node positions based on paths
    const updatedNodes = mockNodes.map(node => {
      const path = simulatedPaths.find(p => p.nodeId === node.id);
      if (path && node.type === "drone") {
        const position = generatePathPoints(path, new Date());
        return { ...node, x: position.x, y: position.y };
      }
      return node;
    });
    res.json(updatedNodes);
  });

  app.get("/api/network-stats", (_req, res) => {
    const stats = {
      totalNodes: mockNodes.length,
      activeNodes: mockNodes.filter(n => n.status === "online").length,
      totalClients: mockNodes.reduce((acc, n) => acc + (n.connectedClients || 0), 0),
      averageSignal: Math.round(
        mockNodes.reduce((acc, n) => acc + (n.signalStrength || 0), 0) / mockNodes.length
      )
    };
    res.json(stats);
  });

  app.get("/api/coverage", (_req, res) => {
    // Generate mock coverage data points
    const coverage = Array.from({ length: 100 }, () => ({
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      strength: Math.random() * 100
    }));
    res.json(coverage);
  });

  app.get("/api/performance-metrics", (_req, res) => {
    const metrics = mockNodes.map(node => generateMockMetrics(node.id));
    res.json(metrics);
  });

  app.get("/api/recommendations", (_req, res) => {
    const recommendations = [
      {
        id: 1,
        type: "optimization",
        description: "Move Node 3 20m northwest to improve coverage",
        impact: "15% signal strength improvement"
      },
      {
        id: 2,
        type: "addition",
        description: "Add relay node at coordinates (450, 670)",
        impact: "Cover dead zone in southeast sector"
      }
    ];
    res.json(recommendations);
  });

  const httpServer = createServer(app);

  // Setup WebSocket server for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws) => {
    console.log('Client connected to real-time updates');

    // Send initial data
    const initialData = {
      nodes: mockNodes.map(node => {
        const path = simulatedPaths.find(p => p.nodeId === node.id);
        if (path && node.type === "drone") {
          const position = generatePathPoints(path, new Date());
          return { ...node, x: position.x, y: position.y };
        }
        return node;
      }),
      metrics: mockNodes.map(node => ({
        nodeId: node.id,
        metrics: generateMockMetrics(node.id)
      }))
    };
    ws.send(JSON.stringify({ type: 'initialState', data: initialData }));

    // Start sending periodic updates
    const interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        const updatedData = {
          nodes: mockNodes.map(node => {
            const path = simulatedPaths.find(p => p.nodeId === node.id);
            if (path && node.type === "drone") {
              const position = generatePathPoints(path, new Date());
              return { ...node, x: position.x, y: position.y };
            }
            return node;
          }),
          metrics: mockNodes.map(node => ({
            nodeId: node.id,
            metrics: generateMockMetrics(node.id)
          }))
        };
        ws.send(JSON.stringify({ type: 'update', data: updatedData }));
      }
    }, 1000); // Update every second

    ws.on('close', () => {
      clearInterval(interval);
      console.log('Client disconnected from real-time updates');
    });
  });

  return httpServer;
}