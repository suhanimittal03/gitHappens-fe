import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network, Download, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

const Dependencies = () => {
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
              <Button variant="outline" size="sm">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 w-4 h-4" />
              Export Graph
            </Button>
          </div>
        </Card>

        {/* Graph Visualization Placeholder */}
        <Card className="p-8 bg-gradient-card border-border/50">
          <div className="flex flex-col items-center justify-center min-h-[600px] text-center">
            <div className="p-6 bg-primary/10 rounded-full mb-6">
              <Network className="w-16 h-16 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Dependency Graph Visualization</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Interactive dependency graph showing relationships between modules, services, and components.
              This feature requires integration with your codebase analysis.
            </p>
            <Button className="bg-gradient-primary hover:shadow-glow transition-all">
              Configure Integration
            </Button>
          </div>
        </Card>

        {/* Legend */}
        <Card className="p-6 bg-gradient-card border-border/50 mt-6">
          <h3 className="font-semibold mb-4">Graph Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-primary"></div>
              <span className="text-sm">Direct Dependency</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-warning"></div>
              <span className="text-sm">Indirect Dependency</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-accent"></div>
              <span className="text-sm">Downstream Impact</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dependencies;
