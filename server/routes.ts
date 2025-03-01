import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateMockNodes } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const mockNodes = generateMockNodes(10);
  
  app.get("/api/nodes", (_req, res) => {
    res.json(mockNodes);
  });

  app.get("/api/network-stats", (_req, res) => {
    const stats = {
      totalNodes: mockNodes.length,
      activeNodes: mockNodes.filter(n => n.status === "online").length,
      totalClients: mockNodes.reduce((acc, n) => acc + n.connectedClients, 0),
      averageSignal: Math.round(
        mockNodes.reduce((acc, n) => acc + n.signalStrength, 0) / mockNodes.length
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
  return httpServer;
}
