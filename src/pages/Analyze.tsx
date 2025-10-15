import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Upload, Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const Analyze = () => {
  const [moduleName, setModuleName] = useState("");
  const [changeDescription, setChangeDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!moduleName || !changeDescription) {
      toast.error("Please fill in all fields");
      return;
    }

    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = {
        riskLevel: "medium",
        affectedComponents: [
          { name: "User Service API", impact: "high", dependency: "direct" },
          { name: "Database Layer", impact: "medium", dependency: "indirect" },
          { name: "Email Notifications", impact: "low", dependency: "downstream" },
          { name: "Analytics Dashboard", impact: "medium", dependency: "downstream" },
          { name: "Logging Service", impact: "low", dependency: "indirect" },
        ],
        recommendations: [
          "Update integration tests for User Service API",
          "Review database migration scripts",
          "Test email notification triggers",
          "Validate analytics data flow",
        ],
        estimatedTestingTime: "4-6 hours",
      };
      
      setResults(mockResults);
      setAnalyzing(false);
      toast.success("Analysis complete!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Impact Analysis
            </h1>
            <p className="text-muted-foreground">
              Analyze code changes and identify affected components instantly
            </p>
          </div>

          <Card className="p-8 bg-gradient-card border-border/50 mb-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="module" className="text-base font-semibold mb-2">
                  Module Name
                </Label>
                <Input
                  id="module"
                  placeholder="e.g., Payment Gateway Module"
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="changes" className="text-base font-semibold mb-2">
                  Change Description
                </Label>
                <Textarea
                  id="changes"
                  placeholder="Describe the changes being made to this module..."
                  value={changeDescription}
                  onChange={(e) => setChangeDescription(e.target.value)}
                  className="mt-2 min-h-[150px]"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="bg-gradient-primary hover:shadow-glow transition-all flex-1"
                  size="lg"
                >
                  {analyzing ? (
                    <>
                      <Sparkles className="mr-2 w-5 h-5 animate-pulse" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 w-5 h-5" />
                      Analyze Impact
                    </>
                  )}
                </Button>
                <Button variant="outline" size="lg">
                  <Upload className="mr-2 w-5 h-5" />
                  Upload Code
                </Button>
              </div>
            </div>
          </Card>

          {results && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Risk Level */}
              <Card className="p-6 bg-gradient-card border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Risk Assessment</h3>
                    <p className="text-sm text-muted-foreground">
                      Based on dependency analysis and historical data
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-warning" />
                    <span className="text-2xl font-bold text-warning uppercase">
                      {results.riskLevel} Risk
                    </span>
                  </div>
                </div>
              </Card>

              {/* Affected Components */}
              <Card className="p-6 bg-gradient-card border-border/50">
                <h3 className="text-lg font-semibold mb-4">
                  Affected Components ({results.affectedComponents.length})
                </h3>
                <div className="space-y-3">
                  {results.affectedComponents.map((component: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{component.name}</div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {component.dependency} dependency
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          component.impact === "high"
                            ? "bg-destructive/10 text-destructive"
                            : component.impact === "medium"
                            ? "bg-warning/10 text-warning"
                            : "bg-success/10 text-success"
                        }`}
                      >
                        {component.impact.toUpperCase()} IMPACT
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recommendations */}
              <Card className="p-6 bg-gradient-card border-border/50">
                <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {results.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estimated Testing Time:</span>
                    <span className="font-semibold">{results.estimatedTestingTime}</span>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <div className="flex gap-4">
                <Button className="flex-1" size="lg">
                  Generate Test Plan
                </Button>
                <Button variant="outline" className="flex-1" size="lg">
                  <ArrowRight className="mr-2 w-5 h-5" />
                  View Dependencies
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyze;
