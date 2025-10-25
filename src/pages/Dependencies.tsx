import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Download } from "lucide-react";
import { useCallback, useMemo, useState, useEffect } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { DependencyGraphData } from "@/types";
import graphData from "@/data/dependency_graph.json";

// Load graph data
const getGraphData = async (): Promise<DependencyGraphData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return graphData as DependencyGraphData;
};

// Node type styling configuration
const nodeTypeStyles = {
  file: {
    background: "hsl(var(--primary))",
    color: "hsl(var(--primary-foreground))",
    border: "2px solid hsl(var(--primary))",
  },
  class: {
    background: "hsl(var(--accent))",
    color: "hsl(var(--accent-foreground))",
    border: "2px solid hsl(var(--accent))",
  },
  function: {
    background: "hsl(var(--secondary))",
    color: "hsl(var(--secondary-foreground))",
    border: "2px solid hsl(var(--secondary))",
  },
  external: {
    background: "hsl(var(--muted))",
    color: "hsl(var(--muted-foreground))",
    border: "2px solid hsl(var(--border))",
  },
};

// Edge type styling configuration
const edgeTypeStyles = {
  contains: {
    stroke: "hsl(var(--primary))",
    strokeWidth: 2,
    animated: true,
  },
  imports: {
    stroke: "hsl(var(--muted-foreground))",
    strokeWidth: 1.5,
    animated: false,
  },
};

// Transform dependency graph data to ReactFlow format with hierarchical layout
const transformToReactFlow = (data: DependencyGraphData) => {
  // Use a hierarchical layout algorithm
  const levelMap = new Map<string, number>();
  const visited = new Set<string>();
  
  // Calculate levels using BFS
  const calculateLevels = () => {
    const queue: [string, number][] = [];
    
    // Start with nodes that have no incoming edges (roots)
    const incomingCount = new Map<string, number>();
    data.nodes.forEach(node => incomingCount.set(node.id, 0));
    data.edges.forEach(edge => {
      incomingCount.set(edge.target, (incomingCount.get(edge.target) || 0) + 1);
    });
    
    // Find root nodes
    data.nodes.forEach(node => {
      if (incomingCount.get(node.id) === 0) {
        queue.push([node.id, 0]);
      }
    });
    
    // BFS to calculate levels
    while (queue.length > 0) {
      const [nodeId, level] = queue.shift()!;
      if (visited.has(nodeId)) continue;
      
      visited.add(nodeId);
      levelMap.set(nodeId, level);
      
      // Add children
      data.edges
        .filter(e => e.source === nodeId)
        .forEach(edge => {
          if (!visited.has(edge.target)) {
            queue.push([edge.target, level + 1]);
          }
        });
    }
    
    // Handle any remaining unvisited nodes
    data.nodes.forEach(node => {
      if (!levelMap.has(node.id)) {
        levelMap.set(node.id, 0);
      }
    });
  };
  
  calculateLevels();
  
  // Group nodes by level
  const levelGroups = new Map<number, string[]>();
  levelMap.forEach((level, nodeId) => {
    if (!levelGroups.has(level)) {
      levelGroups.set(level, []);
    }
    levelGroups.get(level)!.push(nodeId);
  });
  
  // Position nodes
  const nodes: Node[] = data.nodes.map((node) => {
    const level = levelMap.get(node.id) || 0;
    const nodesInLevel = levelGroups.get(level) || [];
    const indexInLevel = nodesInLevel.indexOf(node.id);
    const totalInLevel = nodesInLevel.length;
    
    return {
      id: node.id,
      type: "default",
      data: { label: node.label },
      position: {
        x: (indexInLevel - totalInLevel / 2) * 250 + 400,
        y: level * 120,
      },
      style: {
        ...nodeTypeStyles[node.type as keyof typeof nodeTypeStyles],
        borderRadius: "8px",
        padding: "10px",
      },
    };
  });

  const edges: Edge[] = data.edges.map((edge, index) => {
    const edgeStyle = edgeTypeStyles[edge.relation as keyof typeof edgeTypeStyles];
    return {
      id: `edge-${index}`,
      source: edge.source,
      target: edge.target,
      label: edge.relation,
      style: { stroke: edgeStyle.stroke, strokeWidth: edgeStyle.strokeWidth },
      animated: edgeStyle.animated,
      type: "smoothstep",
    };
  });

  return { nodes, edges };
};

const Dependencies = () => {
  const [graphData, setGraphData] = useState<DependencyGraphData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGraphData = async () => {
      setLoading(true);
      try {
        const data = await getGraphData();
        setGraphData(data);
      } catch (error) {
        console.error("Failed to fetch graph data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, []);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => (graphData ? transformToReactFlow(graphData) : { nodes: [], edges: [] }),
    [graphData]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when graph data changes
  useEffect(() => {
    if (graphData) {
      const { nodes: newNodes, edges: newEdges } = transformToReactFlow(graphData);
      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [graphData, setNodes, setEdges]);

  const handleExport = useCallback(() => {
    if (!graphData) return;
    
    const dataStr = JSON.stringify(graphData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = "dependency-graph.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }, [graphData]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Dependency Graph
          </h1>
          <p className="text-muted-foreground">
            Interactive visualization of code dependencies
          </p>
        </div>

        {/* Controls */}
        <Card className="p-4 bg-gradient-card border-border/50 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Use mouse wheel to zoom, drag to pan
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 w-4 h-4" />
              Export Graph
            </Button>
          </div>
        </Card>

        {/* Graph Visualization */}
        <Card className="p-0 bg-gradient-card border-border/50 overflow-hidden">
          <div style={{ height: "600px" }}>
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Skeleton className="w-full h-full" />
              </div>
            ) : nodes.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">
                  No dependency data available
                </p>
              </div>
            ) : (
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                attributionPosition="bottom-left"
              >
                <Controls />
                <MiniMap
                  nodeColor={(node) => {
                    if (!graphData) return "hsl(var(--muted))";
                    const originalNode = graphData.nodes.find((n) => n.id === node.id);
                    if (!originalNode) return "hsl(var(--muted))";
                    return nodeTypeStyles[
                      originalNode.type as keyof typeof nodeTypeStyles
                    ].background;
                  }}
                  style={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Background gap={12} size={1} />
              </ReactFlow>
            )}
          </div>
        </Card>

        {/* Legend */}
        <Card className="p-6 bg-gradient-card border-border/50 mt-6">
          <h3 className="font-semibold mb-4">Graph Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-primary"></div>
              <span className="text-sm">File</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-accent"></div>
              <span className="text-sm">Class</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-secondary"></div>
              <span className="text-sm">Function</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-muted"></div>
              <span className="text-sm">External Module</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dependencies;
