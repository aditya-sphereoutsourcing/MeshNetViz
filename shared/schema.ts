import { pgTable, text, serial, integer, numeric, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const nodes = pgTable("nodes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type", { enum: ["drone", "ground", "solar"] }).notNull(),
  status: text("status", { enum: ["online", "offline", "maintenance"] }).notNull(),
  x: numeric("x").notNull(), // position coordinates
  y: numeric("y").notNull(),
  batteryLevel: integer("battery_level"), // percentage
  signalStrength: integer("signal_strength"), // dBm
  connectedClients: integer("connected_clients").default(0),
  lastUpdate: timestamp("last_update").defaultNow()
});

export const connections = pgTable("connections", {
  id: serial("id").primaryKey(),
  sourceId: integer("source_id").notNull(),
  targetId: integer("target_id").notNull(),
  strength: integer("strength").notNull(), // dBm
  active: boolean("active").default(true)
});

export const insertNodeSchema = createInsertSchema(nodes).omit({ 
  id: true,
  lastUpdate: true 
});

export const insertConnectionSchema = createInsertSchema(connections).omit({ 
  id: true 
});

export type InsertNode = z.infer<typeof insertNodeSchema>;
export type InsertConnection = z.infer<typeof insertConnectionSchema>;
export type Node = typeof nodes.$inferSelect;
export type Connection = typeof connections.$inferSelect;

// Mock data generator
export function generateMockNodes(count: number): Node[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Node ${i + 1}`,
    type: ["drone", "ground", "solar"][Math.floor(Math.random() * 3)] as "drone" | "ground" | "solar",
    status: ["online", "offline", "maintenance"][Math.floor(Math.random() * 3)] as "online" | "offline" | "maintenance",
    x: Math.random() * 1000,
    y: Math.random() * 1000,
    batteryLevel: Math.floor(Math.random() * 100),
    signalStrength: -1 * Math.floor(Math.random() * 60 + 40), // -40 to -100 dBm
    connectedClients: Math.floor(Math.random() * 50),
    lastUpdate: new Date()
  }));
}
