import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useCallback, useMemo } from "react";
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

// Mock data structure
const mockGraphData = {
  nodes: [
    { id: "module-a", label: "Module A", type: "changed", position: { x: 250, y: 0 } },
    { id: "module-b", label: "Module B", type: "direct", position: { x: 100, y: 150 } },
    { id: "module-c", label: "Module C", type: "indirect", position: { x: 400, y: 150 } },
    { id: "service-x", label: "Service X", type: "service", position: { x: 0, y: 300 } },
    { id: "service-y", label: "Service Y", type: "service", position: { x: 200, y: 300 } },
    { id: "component-1", label: "Component 1", type: "ui", position: { x: 400, y: 300 } },
    { id: "component-2", label: "Component 2", type: "ui", position: { x: 550, y: 300 } },
    { id: "database", label: "Database", type: "database", position: { x: 250, y: 450 } },
  ],
  edges: [
    { source: "module-a", target: "module-b", label: "depends on", type: "changed" },
    { source: "module-a", target: "module-c", label: "depends on", type: "changed" },
    { source: "module-b", target: "service-x", label: "calls", type: "direct" },
    { source: "module-b", target: "service-y", label: "calls", type: "direct" },
    { source: "module-c", target: "component-1", label: "renders", type: "indirect" },
    { source: "module-c", target: "component-2", label: "renders", type: "indirect" },
    { source: "service-x", target: "database", label: "reads from", type: "downstream" },
    { source: "service-y", target: "database", label: "writes to", type: "downstream" },
    { source: "component-1", target: "database", label: "queries", type: "downstream" },
  ],
};

// Node type styling configuration
const nodeTypeStyles = {
  changed: {
    background: "hsl(var(--primary))",
    color: "hsl(var(--primary-foreground))",
    border: "2px solid hsl(var(--primary))",
    fontWeight: "bold",
  },
  direct: {
    background: "hsl(var(--warning))",
    color: "hsl(var(--warning-foreground))",
    border: "2px solid hsl(var(--warning))",
  },
  indirect: {
    background: "hsl(var(--accent))",
    color: "hsl(var(--accent-foreground))",
    border: "2px solid hsl(var(--accent))",
  },
  service: {
    background: "hsl(var(--card))",
    color: "hsl(var(--foreground))",
    border: "2px solid hsl(var(--border))",
  },
  ui: {
    background: "hsl(var(--card))",
    color: "hsl(var(--foreground))",
    border: "2px solid hsl(var(--border))",
  },
  database: {
    background: "hsl(var(--muted))",
    color: "hsl(var(--foreground))",
    border: "2px solid hsl(var(--border))",
  },
};

// Edge type styling configuration
const edgeTypeStyles = {
  changed: {
    stroke: "hsl(var(--primary))",
    strokeWidth: 2,
    animated: true,
  },
  direct: {
    stroke: "hsl(var(--warning))",
    strokeWidth: 2,
    animated: false,
  },
  indirect: {
    stroke: "hsl(var(--accent))",
    strokeWidth: 2,
    animated: false,
  },
  downstream: {
    stroke: "hsl(var(--muted-foreground))",
    strokeWidth: 1,
    animated: false,
  },
};

// Transform mock data to ReactFlow format
const transformToReactFlow = (data: typeof mockGraphData) => {
  const nodes: Node[] = data.nodes.map((node) => ({
    id: node.id,
    type: "default",
    position: node.position,
    data: { label: node.label },
    style: {
      ...nodeTypeStyles[node.type as keyof typeof nodeTypeStyles],
      borderRadius: "8px",
      padding: "10px",
    },
  }));

  const edges: Edge[] = data.edges.map((edge, index) => {
    const edgeStyle = edgeTypeStyles[edge.type as keyof typeof edgeTypeStyles];
    return {
      id: `edge-${index}`,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      style: { stroke: edgeStyle.stroke, strokeWidth: edgeStyle.strokeWidth },
      animated: edgeStyle.animated,
    };
  });

  return { nodes, edges };
};

const Dependencies = () => {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => transformToReactFlow(mockGraphData),
    []
  );
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleExport = useCallback(() => {
    const graphData = { nodes, edges };
    const dataStr = JSON.stringify(graphData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = "dependency-graph.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }, [nodes, edges]);

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
                  const originalNode = mockGraphData.nodes.find(n => n.id === node.id);
                  if (!originalNode) return "hsl(var(--muted))";
                  return nodeTypeStyles[originalNode.type as keyof typeof nodeTypeStyles].background;
                }}
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Background gap={12} size={1} />
            </ReactFlow>
          </div>
        </Card>

        {/* Legend */}
        <Card className="p-6 bg-gradient-card border-border/50 mt-6">
          <h3 className="font-semibold mb-4">Graph Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-primary"></div>
              <span className="text-sm">Changed Module</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-warning"></div>
              <span className="text-sm">Direct Dependency</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-accent"></div>
              <span className="text-sm">Indirect Dependency</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-muted"></div>
              <span className="text-sm">Downstream Impact</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dependencies;
