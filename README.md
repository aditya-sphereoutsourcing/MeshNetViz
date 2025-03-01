# Mesh Network Visualization Dashboard

A real-time dashboard for monitoring and visualizing a mesh WiFi network. This application provides network topology visualization, node monitoring, coverage mapping, and AI-powered optimization recommendations.

## Features

### 1. Network Topology View
- Interactive visualization of mesh network nodes and connections
- Color-coded nodes based on type (drone, ground, solar)
- Status indicators for online/offline nodes
- Dynamic connection lines between nodes within proximity
- Minimap for easy navigation in large networks
- Real-time position updates
- Interactive zoom and pan capabilities
- Node status indicators with colored borders
- Animated connection lines showing active data flow

### 2. Node Monitoring
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

### 3. Coverage Map
- Heat map visualization of network coverage
- Signal strength indicators with color gradients
- Coverage optimization suggestions
- Interactive zoom and pan capabilities
- Detailed signal strength measurements
- Coverage dead zone identification
- Signal overlap areas visualization
- Distance-based connection mapping

### 4. AI Recommendations
- Intelligent suggestions for network optimization
- Node placement recommendations
- Coverage improvement strategies
- Performance insights
- Categorized recommendations:
  - Optimization suggestions
  - New node additions
  - Performance improvements
  - Coverage enhancements

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

### Backend
- **Server**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **API Structure**: RESTful endpoints
- **Real-time Updates**: WebSocket support

### Component Structure
```
client/src/
├── components/
│   ├── NetworkTopology.tsx   # Network visualization
│   ├── NodeMonitoring.tsx    # Performance monitoring
│   ├── CoverageMap.tsx       # Coverage visualization
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

## Performance Considerations

### Network Optimization
- Automatic node distance calculation
- Signal strength optimization
- Coverage area maximization
- Client load balancing

### Real-time Updates
- Efficient data polling
- WebSocket support for live updates
- Optimized state management
- Minimal re-renders

## Deployment

The application is designed to be deployed on Replit:
1. The server runs on port 5000
2. Static assets are served through the Express.js server
3. API endpoints are prefixed with `/api`
4. Database connections are managed through environment variables

## Future Enhancements
1. Advanced network simulation with mock drone/robot paths
2. Enhanced AI-powered optimization suggestions
3. Network health monitoring and alerts
4. Coverage optimization tools
5. Real-time performance analytics
6. Historical data tracking and trends
7. Advanced node management capabilities
8. Custom alert configurations

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
MIT License