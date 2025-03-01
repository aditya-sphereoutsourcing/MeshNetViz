import { pgTable, text, serial, integer, numeric, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Existing tables remain unchanged
export const nodes = pgTable("nodes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type", { enum: ["drone", "ground", "solar"] }).notNull(),
  status: text("status", { enum: ["online", "offline", "maintenance"] }).notNull(),
  x: numeric("x").notNull(),
  y: numeric("y").notNull(),
  batteryLevel: integer("battery_level"),
  signalStrength: integer("signal_strength"),
  connectedClients: integer("connected_clients").default(0),
  lastUpdate: timestamp("last_update").defaultNow()
});

export const connections = pgTable("connections", {
  id: serial("id").primaryKey(),
  sourceId: integer("source_id").notNull(),
  targetId: integer("target_id").notNull(),
  strength: integer("strength").notNull(),
  active: boolean("active").default(true)
});

export const performanceMetrics = pgTable("performance_metrics", {
  id: serial("id").primaryKey(),
  nodeId: integer("node_id").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  signalStrength: integer("signal_strength").notNull(),
  latency: integer("latency").notNull(),
  packetLoss: numeric("packet_loss").notNull(),
  throughput: integer("throughput").notNull(),
  predictionWindow: integer("prediction_window"),
  predictedSignalStrength: integer("predicted_signal_strength"),
  predictedLatency: integer("predicted_latency"),
  predictedThroughput: integer("predicted_throughput")
});

// New table for simulated paths
export const simulatedPaths = pgTable("simulated_paths", {
  id: serial("id").primaryKey(),
  nodeId: integer("node_id").notNull(),
  pathType: text("path_type", { enum: ["linear", "circular", "random"] }).notNull(),
  startX: numeric("start_x").notNull(),
  startY: numeric("start_y").notNull(),
  endX: numeric("end_x"),
  endY: numeric("end_y"),
  speed: numeric("speed").notNull(), // units per second
  startTime: timestamp("start_time").defaultNow(),
  active: boolean("active").default(true)
});

// Export schemas
export const insertNodeSchema = createInsertSchema(nodes).omit({ 
  id: true,
  lastUpdate: true 
});

export const insertConnectionSchema = createInsertSchema(connections).omit({ 
  id: true 
});

export const insertMetricsSchema = createInsertSchema(performanceMetrics).omit({
  id: true,
  timestamp: true,
  predictionWindow: true,
  predictedSignalStrength: true,
  predictedLatency: true,
  predictedThroughput: true
});

export const insertPathSchema = createInsertSchema(simulatedPaths).omit({
  id: true,
  startTime: true
});

// Export types
export type InsertNode = z.infer<typeof insertNodeSchema>;
export type InsertConnection = z.infer<typeof insertConnectionSchema>;
export type InsertMetrics = z.infer<typeof insertMetricsSchema>;
export type InsertPath = z.infer<typeof insertPathSchema>;
export type Node = typeof nodes.$inferSelect;
export type Connection = typeof connections.$inferSelect;
export type PerformanceMetric = typeof performanceMetrics.$inferSelect;
export type SimulatedPath = typeof simulatedPaths.$inferSelect;

// Mock data generators
export function generateMockNodes(count: number): Node[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Node ${i + 1}`,
    type: ["drone", "ground", "solar"][Math.floor(Math.random() * 3)] as "drone" | "ground" | "solar",
    status: ["online", "offline", "maintenance"][Math.floor(Math.random() * 3)] as "online" | "offline" | "maintenance",
    x: Math.random() * 1000,
    y: Math.random() * 1000,
    batteryLevel: Math.floor(Math.random() * 100),
    signalStrength: -1 * Math.floor(Math.random() * 60 + 40),
    connectedClients: Math.floor(Math.random() * 50),
    lastUpdate: new Date()
  }));
}

export function generateMockMetrics(nodeId: number): InsertMetrics {
  return {
    nodeId,
    signalStrength: -1 * Math.floor(Math.random() * 60 + 40),
    latency: Math.floor(Math.random() * 100),
    packetLoss: Math.random() * 5,
    throughput: Math.floor(Math.random() * 1000000)
  };
}

// Path generation utilities
export function generatePathPoints(path: SimulatedPath, timestamp: Date): { x: number, y: number } {
  const elapsedTime = (timestamp.getTime() - path.startTime.getTime()) / 1000;
  const speed = Number(path.speed);

  switch (path.pathType) {
    case "linear": {
      const progress = Math.min(1, (elapsedTime * speed) / distance(
        Number(path.startX), Number(path.startY),
        Number(path.endX), Number(path.endY)
      ));
      return {
        x: Number(path.startX) + (Number(path.endX) - Number(path.startX)) * progress,
        y: Number(path.startY) + (Number(path.endY) - Number(path.startY)) * progress
      };
    }
    case "circular": {
      const radius = 100;
      const centerX = Number(path.startX);
      const centerY = Number(path.startY);
      const angle = (elapsedTime * speed) % (2 * Math.PI);
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    }
    case "random":
    default: {
      const changeInterval = 5; // seconds
      const intervalCount = Math.floor(elapsedTime / changeInterval);
      const rand = new Random(path.id + intervalCount);
      return {
        x: Number(path.startX) + rand.next() * 200 - 100,
        y: Number(path.startY) + rand.next() * 200 - 100
      };
    }
  }
}

// Utility functions
function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

class Random {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }
}