import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network, Download, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { useCallback } from "react";
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

// Mock data for dependency graph
const initialNodes: Node[] = [
  {
    id: "module-a",
    type: "default",
    position: { x: 250, y: 0 },
    data: { label: "Module A (Changed)" },
    style: {
      background: "hsl(var(--primary))",
      color: "white",
      border: "2px solid hsl(var(--primary))",
      borderRadius: "8px",
      padding: "10px",
      fontWeight: "bold",
    },
  },
  {
    id: "module-b",
    type: "default",
    position: { x: 100, y: 150 },
    data: { label: "Module B" },
    style: {
      background: "hsl(var(--warning))",
      color: "white",
      border: "2px solid hsl(var(--warning))",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "module-c",
    type: "default",
    position: { x: 400, y: 150 },
    data: { label: "Module C" },
    style: {
      background: "hsl(var(--accent))",
      color: "white",
      border: "2px solid hsl(var(--accent))",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "service-x",
    type: "default",
    position: { x: 0, y: 300 },
    data: { label: "Service X" },
    style: {
      background: "hsl(var(--card))",
      color: "hsl(var(--foreground))",
      border: "2px solid hsl(var(--border))",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "service-y",
    type: "default",
    position: { x: 200, y: 300 },
    data: { label: "Service Y" },
    style: {
      background: "hsl(var(--card))",
      color: "hsl(var(--foreground))",
      border: "2px solid hsl(var(--border))",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "component-1",
    type: "default",
    position: { x: 400, y: 300 },
    data: { label: "Component 1" },
    style: {
      background: "hsl(var(--card))",
      color: "hsl(var(--foreground))",
      border: "2px solid hsl(var(--border))",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "component-2",
    type: "default",
    position: { x: 550, y: 300 },
    data: { label: "Component 2" },
    style: {
      background: "hsl(var(--card))",
      color: "hsl(var(--foreground))",
      border: "2px solid hsl(var(--border))",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "database",
    type: "default",
    position: { x: 250, y: 450 },
    data: { label: "Database" },
    style: {
      background: "hsl(var(--muted))",
      color: "hsl(var(--foreground))",
      border: "2px solid hsl(var(--border))",
      borderRadius: "8px",
      padding: "10px",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-a-b",
    source: "module-a",
    target: "module-b",
    animated: true,
    style: { stroke: "hsl(var(--primary))", strokeWidth: 2 },
  },
  {
    id: "e-a-c",
    source: "module-a",
    target: "module-c",
    animated: true,
    style: { stroke: "hsl(var(--primary))", strokeWidth: 2 },
  },
  {
    id: "e-b-x",
    source: "module-b",
    target: "service-x",
    style: { stroke: "hsl(var(--warning))", strokeWidth: 2 },
  },
  {
    id: "e-b-y",
    source: "module-b",
    target: "service-y",
    style: { stroke: "hsl(var(--warning))", strokeWidth: 2 },
  },
  {
    id: "e-c-1",
    source: "module-c",
    target: "component-1",
    style: { stroke: "hsl(var(--accent))", strokeWidth: 2 },
  },
  {
    id: "e-c-2",
    source: "module-c",
    target: "component-2",
    style: { stroke: "hsl(var(--accent))", strokeWidth: 2 },
  },
  {
    id: "e-x-db",
    source: "service-x",
    target: "database",
    style: { stroke: "hsl(var(--muted-foreground))" },
  },
  {
    id: "e-y-db",
    source: "service-y",
    target: "database",
    style: { stroke: "hsl(var(--muted-foreground))" },
  },
  {
    id: "e-1-db",
    source: "component-1",
    target: "database",
    style: { stroke: "hsl(var(--muted-foreground))" },
  },
];

const Dependencies = () => {
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
                  if (node.id === "module-a") return "hsl(var(--primary))";
                  if (node.id === "module-b") return "hsl(var(--warning))";
                  if (node.id === "module-c") return "hsl(var(--accent))";
                  return "hsl(var(--muted))";
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
