# Mesh Network Visualization Dashboard

A real-time dashboard for monitoring and visualizing a mesh WiFi network. This application provides network topology visualization, node monitoring, coverage mapping, and AI-powered optimization recommendations.

## Features

### 1. Network Topology View
- Interactive visualization of mesh network nodes and connections
- Color-coded nodes based on type (drone, ground, solar)
- Status indicators for online/offline nodes
- Dynamic connection lines between nodes within proximity
- Minimap for easy navigation in large networks

### 2. Node Monitoring
- Real-time status monitoring of all network nodes
- Signal strength visualization
- Battery level tracking
- Connected clients counter
- Status indicators with color coding

### 3. Coverage Map
- Heat map visualization of network coverage
- Signal strength indicators
- Coverage optimization suggestions
- Interactive zoom and pan capabilities

### 4. AI Recommendations
- Intelligent suggestions for network optimization
- Node placement recommendations
- Coverage improvement strategies
- Performance insights

## Technical Implementation

### Network Topology (NetworkTopology.tsx)
The network topology visualization uses React Flow for interactive node-based diagrams:
- Nodes represent network devices (drones, ground stations, solar-powered nodes)
- Edges show connections between nodes within 300 units range
- Color coding: 
  - Drone nodes: Orange (#ff9800)
  - Ground nodes: Green (#4caf50)
  - Solar nodes: Blue (#2196f3)
- Status indicators:
  - Online: Green border
  - Offline: Red border

### Backend API Endpoints
- `/api/nodes`: Returns current network nodes with status
- `/api/network-stats`: Provides network-wide statistics
- `/api/coverage`: Generates coverage data points
- `/api/recommendations`: Returns AI-powered optimization suggestions

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5000`

## Architecture

- Frontend: React + TypeScript
- State Management: TanStack Query (React Query)
- Visualization: React Flow, Recharts
- Styling: Tailwind CSS + shadcn/ui
- Backend: Express.js
- Database: PostgreSQL with Drizzle ORM

## Data Model

### Node
```typescript
{
  id: number;
  name: string;
  type: "drone" | "ground" | "solar";
  status: "online" | "offline" | "maintenance";
  x: number;
  y: number;
  batteryLevel: number;
  signalStrength: number;
  connectedClients: number;
  lastUpdate: Date;
}
```

### Connection
```typescript
{
  id: number;
  sourceId: number;
  targetId: number;
  strength: number;
  active: boolean;
}
```
