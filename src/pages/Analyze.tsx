import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Upload, Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import type { ImpactAnalysisRequest, ImpactAnalysisResult } from "@/types";

// Mock function - Replace with API call
const getMockAnalysisResult = (
  request: ImpactAnalysisRequest
): ImpactAnalysisResult => {
  return {
    id: `analysis-${Date.now()}`,
    module: request.module,
    timestamp: new Date().toISOString(),
    summary: {
      totalAffected: 5,
      highImpact: 2,
      mediumImpact: 2,
      lowImpact: 1,
      criticalPaths: 1,
    },
    affectedComponents: [
      {
        name: "User Service API",
        type: "Service",
        impact: "High",
        details: "Direct dependency - will require updates to API contracts",
      },
      {
        name: "Database Layer",
        type: "Database",
        impact: "High",
        details: "Schema changes may be required for data persistence",
      },
      {
        name: "Email Notifications",
        type: "Service",
        impact: "Low",
        details: "Downstream dependency - minimal impact expected",
      },
      {
        name: "Analytics Dashboard",
        type: "UI Component",
        impact: "Medium",
        details: "Display logic may need updates for new data structure",
      },
      {
        name: "Logging Service",
        type: "Service",
        impact: "Medium",
        details: "Indirect dependency through shared infrastructure",
      },
    ],
    recommendations: [
      "Update integration tests for User Service API",
      "Review database migration scripts",
      "Test email notification triggers",
      "Validate analytics data flow",
    ],
    riskScore: 65,
  };
};

const Analyze = () => {
  const [formData, setFormData] = useState<ImpactAnalysisRequest>({
    module: "",
    changeType: "",
    description: "",
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<ImpactAnalysisResult | null>(null);

  // TODO: Replace with actual API call
  // Required API endpoint: POST /api/analyze
  // Request body: { module: string, changeType: string, description?: string }
  // Response: ImpactAnalysisResult
  const handleAnalyze = async () => {
    if (!formData.module || !formData.changeType) {
      toast.error("Please fill in module name and change type");
      return;
    }

    setAnalyzing(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // TODO: Replace with actual API call:
      // const response = await fetch('/api/analyze', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();

      const mockResults = getMockAnalysisResult(formData);

      setResults(mockResults);
      toast.success("Analysis complete!");
    } catch (error) {
      toast.error("Analysis failed. Please try again.");
      console.error("Analysis error:", error);
    } finally {
      setAnalyzing(false);
    }
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
                  Module Name *
                </Label>
                <Input
                  id="module"
                  placeholder="e.g., Payment Gateway Module"
                  value={formData.module}
                  onChange={(e) =>
                    setFormData({ ...formData, module: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label
                  htmlFor="changeType"
                  className="text-base font-semibold mb-2"
                >
                  Change Type *
                </Label>
                <Select
                  value={formData.changeType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, changeType: value })
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select change type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="api">API Modification</SelectItem>
                    <SelectItem value="schema">
                      Database Schema Change
                    </SelectItem>
                    <SelectItem value="logic">Business Logic Update</SelectItem>
                    <SelectItem value="dependency">
                      Dependency Update
                    </SelectItem>
                    <SelectItem value="config">Configuration Change</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="changes" className="text-base font-semibold mb-2">
                  Change Description
                </Label>
                <Textarea
                  id="changes"
                  placeholder="Describe the changes being made to this module..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
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

          {/* Loading State */}
          {analyzing && (
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-card border-border/50">
                <div className="flex items-center justify-center py-8">
                  <Sparkles className="w-8 h-8 animate-pulse text-primary" />
                  <span className="ml-3 text-muted-foreground">
                    Analyzing impact across your codebase...
                  </span>
                </div>
              </Card>
            </div>
          )}

          {/* Results */}
          {results && !analyzing && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Risk Level */}
              <Card className="p-6 bg-gradient-card border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      Risk Assessment
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Based on dependency analysis and historical data
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-warning" />
                    <div>
                      <div className="text-2xl font-bold text-warning">
                        {results.riskScore}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Risk Score
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Affected Components */}
              <Card className="p-6 bg-gradient-card border-border/50">
                <h3 className="text-lg font-semibold mb-4">
                  Affected Components ({results.affectedComponents.length})
                </h3>
                <div className="space-y-3">
                  {results.affectedComponents.map((component, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium mb-1">{component.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {component.type} • {component.details}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-4 ${
                          component.impact === "High"
                            ? "bg-destructive/10 text-destructive"
                            : component.impact === "Medium"
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
                  {results.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </div>
                  ))}
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
