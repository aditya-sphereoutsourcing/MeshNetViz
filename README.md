# Mesh Network Visualization Dashboard

A real-time dashboard for monitoring and visualizing a mesh WiFi network. This application provides network topology visualization, node monitoring, coverage mapping, and AI-powered optimization recommendations.

## Features

### 1. Network Topology View ✅
- Interactive visualization of mesh network nodes and connections
- Color-coded nodes based on type (drone, ground, solar)
- Status indicators for online/offline nodes
- Dynamic connection lines between nodes within proximity
- Minimap for easy navigation in large networks
- Real-time position updates
- Interactive zoom and pan capabilities
- Node status indicators with colored borders
- Animated connection lines showing active data flow
- Live WebSocket updates for real-time node positions

### 2. Node Monitoring ✅
- Real-time status monitoring of all network nodes
- Signal strength visualization through line charts
- Battery level tracking for each node
- Connected clients counter
- Status indicators with color coding
- Detailed node information display:
  - Type classification
  - Signal strength in dBm
  - Battery percentage
  - Number of connected clients
  - Last update timestamp

### 3. Coverage Map ✅
- Heat map visualization of network coverage
- Signal strength indicators with color gradients
- Coverage optimization suggestions
- Interactive zoom and pan capabilities
- Detailed signal strength measurements
- Coverage dead zone identification
- Signal overlap areas visualization
- Distance-based connection mapping

### 4. Performance Heat Map ✅
- Real-time performance metrics visualization
- Predictive insights for network metrics
- Multiple metric views:
  - Signal Strength (dBm)
  - Latency (ms)
  - Throughput (B/s)
- Live WebSocket updates
- Current vs Predicted performance comparison
- Interactive data points with tooltips
- Color-coded intensity visualization

### 5. AI Recommendations ✅
- Intelligent suggestions for network optimization
- Node placement recommendations
- Coverage improvement strategies
- Performance insights
- Categorized recommendations:
  - Optimization suggestions
  - New node additions
  - Performance improvements
  - Coverage enhancements

### 6. Advanced Network Simulation ✅
- Simulated drone paths with multiple patterns:
  - Linear paths
  - Circular patterns
  - Random movements
- Real-time node position updates
- Speed and direction controls
- Path visualization
- Collision avoidance

## Current Status

✅ Completed Features:
1. Network Topology View with real-time updates
2. Node Monitoring with performance charts
3. Coverage Map visualization
4. Performance Heat Map with predictions
5. AI Recommendations
6. Advanced Network Simulation


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
  - Maintenance: Yellow indicator

### Backend API Endpoints
- `/api/nodes`: Returns current network nodes with status
- `/api/network-stats`: Provides network-wide statistics
- `/api/coverage`: Generates coverage data points
- `/api/recommendations`: Returns AI-powered optimization suggestions
- `/api/performance-metrics`: Provides real-time performance data

### WebSocket Updates
- Path: `/ws`
- Message Types:
  - `initialState`: Initial data load
  - `update`: Real-time updates
  - `metrics`: Performance metrics

### Node Types and Properties
Each node in the network contains:
- Unique identifier
- Name descriptor
- Type classification (drone/ground/solar)
- Status indicator (online/offline/maintenance)
- Position coordinates (x, y)
- Battery level percentage
- Signal strength measurement
- Connected clients count
- Last update timestamp

## Getting Started

1. Clone and Install Dependencies:
```bash
# Install all required packages
npm install
```

2. Environment Setup:
```bash
# Create a .env file with required variables
DATABASE_URL=your_database_url
```

3. Start the Development Server:
```bash
npm run dev
```

4. Build for Production:
```bash
npm run build
```

5. Start Production Server:
```bash
npm run start
```

## Architecture

### Frontend
- **Framework**: React + TypeScript
- **State Management**: TanStack Query (React Query)
- **Visualization Libraries**:
  - React Flow: Network topology
  - Recharts: Performance charts
- **Styling**: 
  - Tailwind CSS
  - shadcn/ui components
- **Routing**: wouter
- **Real-time Updates**: WebSocket

### Backend
- **Server**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **API Structure**: RESTful endpoints
- **Real-time Updates**: WebSocket support
- **Simulation Engine**: Custom path generation

### Component Structure
```
client/src/
├── components/
│   ├── NetworkTopology.tsx   # Network visualization
│   ├── NodeMonitoring.tsx    # Performance monitoring
│   ├── CoverageMap.tsx       # Coverage visualization
│   ├── PerformanceHeatMap.tsx # Performance predictions
│   └── AiRecommendations.tsx # AI suggestions
├── pages/
│   └── dashboard.tsx         # Main dashboard layout
└── lib/
    └── queryClient.ts        # API communication
```

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

### Performance Metrics
```typescript
{
  id: number;
  nodeId: number;
  timestamp: Date;
  signalStrength: number;
  latency: number;
  packetLoss: number;
  throughput: number;
  predictionWindow?: number;
  predictedSignalStrength?: number;
  predictedLatency?: number;
  predictedThroughput?: number;
}
```

### Simulated Path
```typescript
{
  id: number;
  nodeId: number;
  pathType: "linear" | "circular" | "random";
  startX: number;
  startY: number;
  endX?: number;
  endY?: number;
  speed: number;
  startTime: Date;
  active: boolean;
}
```

## Performance Considerations

### Network Optimization
- Automatic node distance calculation
- Signal strength optimization
- Coverage area maximization
- Client load balancing
- Efficient path planning for mobile nodes

### Real-time Updates
- Efficient data polling
- WebSocket support for live updates
- Optimized state management
- Minimal re-renders
- Batched updates for performance metrics

## Deployment

The application is designed to be deployed on Replit:
1. The server runs on port 5000
2. Static assets are served through the Express.js server
3. API endpoints are prefixed with `/api`
4. Database connections are managed through environment variables
5. WebSocket connections use the same port as HTTP

## Deployment on Vercel

### Prerequisites
1. A Vercel account
2. Vercel CLI installed (`npm i -g vercel`)
3. Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

### Deployment Steps

1. **Prepare Environment Variables**
   ```bash
   # Create a new file .env.production
   DATABASE_URL=your_production_database_url
   # Add any other required environment variables
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy to Vercel**
   ```bash
   # Initial deployment
   vercel

   # For production deployment
   vercel --prod
   ```

4. **Configure Project Settings**
   - Go to your project settings in Vercel dashboard
   - Add environment variables from `.env.production`
   - Configure build settings if needed
   - Set up custom domain if desired

### WebSocket Alternative for Vercel
Since Vercel doesn't support WebSocket connections directly, consider these alternatives:
1. Use Pusher for real-time updates
2. Implement Server-Sent Events (SSE)
3. Use polling with increased frequency
4. Consider a separate WebSocket server (e.g., on Heroku)


## Future Enhancements
1. Enhanced AI-powered optimization algorithms
2. Advanced path planning for drone nodes
3. Machine learning for performance predictions
4. Customizable alert thresholds
5. Historical data analysis tools
6. Advanced node management interface
7. Automated maintenance scheduling
8. Multi-cluster support

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
MIT License