# Mesh Network Visualization Dashboard - Knowledge Base

## Overview
This document provides a comprehensive guide to the mesh network visualization dashboard, including detailed explanations of each component and feature.

## Dashboard Layout

### Main Dashboard
![Dashboard Overview](attached_assets/Screenshot%20(21).png)
The main dashboard provides a comprehensive view of your mesh network:

1. **Header Section**
   - Network name and status
   - Overall health indicators
   - Quick access navigation

2. **Statistics Cards**
   - Total Nodes: Shows the total number of devices in the network
   - Active Connections: Number of current active links
   - Network Health: Overall system status

3. **Tab Navigation**
   - Network Topology
   - Node Monitoring
   - Coverage Map
   - AI Recommendations

## Network Topology

### Interactive Network Map
The network topology view provides a real-time visualization of your mesh network:

1. **Node Types and Representation**
   - 🟧 Drone Nodes (Orange): Mobile aerial network devices
   - 🟩 Ground Nodes (Green): Stationary base stations
   - 🟦 Solar Nodes (Blue): Solar-powered relay points

2. **Node Status Indicators**
   - Green Border: Node is online and functioning
   - Red Border: Node is offline or disconnected
   - Yellow Indicator: Node is in maintenance mode

3. **Connection Lines**
   - Animated lines show active connections
   - Line thickness indicates connection strength
   - Only nodes within 300 units connect automatically

4. **Interactive Features**
   - Zoom: Use mouse wheel or controls
   - Pan: Click and drag to move around
   - Node Selection: Click nodes for details
   - MiniMap: Quick navigation in bottom-right

## Node Monitoring

### Performance Charts
The monitoring section shows detailed node performance metrics:

1. **Signal Strength Graph**
   - X-axis: Node names
   - Y-axis: Signal strength in dBm
   - Line color: Blue (#2196f3)
   - Updates in real-time

2. **Battery Levels**
   - X-axis: Node names
   - Y-axis: Battery percentage
   - Line color: Green (#4caf50)
   - Critical level alerts

3. **Node Status Cards**
   ```
   Node Status Example:
   ┌────────────────────┐
   │ Node 1             │
   │ Type: Drone        │
   │ Signal: -45 dBm    │
   │ Battery: 85%       │
   │ Clients: 12        │
   └────────────────────┘
   ```

## Coverage Map

### Heat Map Visualization
The coverage map shows network signal distribution:

1. **Signal Strength Indicators**
   - Strong Signal: Dark blue, high opacity
   - Medium Signal: Medium blue, medium opacity
   - Weak Signal: Light blue, low opacity

2. **Map Features**
   - X/Y Coordinates: Position in meters
   - Color Intensity: Signal strength
   - Interactive zoom and pan
   - Tooltip with exact values

## AI Recommendations

### Optimization Suggestions
The AI recommendations provide network improvement insights:

1. **Recommendation Types**
   ```
   Example Recommendation:
   ┌────────────────────────────────┐
   │ 🔄 Optimization               │
   │ Move Node 3 20m northwest     │
   │ Impact: 15% signal boost      │
   └────────────────────────────────┘
   ```

2. **Performance Insights**
   - Coverage Analysis
   - Network Health
   - Optimization Opportunities
   - Future Expansion Suggestions

## Data Structures

### Node Data Model
```typescript
type Node = {
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

### Connection Data Model
```typescript
type Connection = {
  id: number;
  sourceId: number;
  targetId: number;
  strength: number;
  active: boolean;
}
```

## Common Operations

### Node Management
1. **Viewing Node Details**
   - Click on any node in the topology view
   - Check status in monitoring section
   - View historical performance

2. **Understanding Node Health**
   - Green border: Healthy
   - Red border: Needs attention
   - Yellow status: Under maintenance

3. **Coverage Optimization**
   - Use heat map to identify weak spots
   - Follow AI recommendations
   - Monitor signal strength trends

## Troubleshooting

### Common Issues
1. **Node Not Appearing**
   - Check if node is powered
   - Verify network connection
   - Confirm correct coordinates

2. **Weak Connections**
   - Check physical obstacles
   - Verify node distance
   - Monitor signal strength

3. **Performance Issues**
   - Check battery levels
   - Monitor client load
   - Verify signal strength

## Best Practices

### Network Optimization
1. **Node Placement**
   - Follow AI recommendations
   - Maintain line of sight
   - Consider physical obstacles

2. **Performance Monitoring**
   - Regular status checks
   - Battery level monitoring
   - Signal strength analysis

3. **Maintenance Schedule**
   - Regular health checks
   - Preventive maintenance
   - Battery replacements

## Future Features
1. Advanced network simulation with mock drone/robot paths
2. Enhanced AI-powered optimization suggestions
3. Network health monitoring and alerts
4. Coverage optimization tools
5. Historical data analysis
6. Custom alert configurations
7. Advanced node management
8. Automated maintenance scheduling
