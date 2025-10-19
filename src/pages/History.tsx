import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Search, Filter, Download } from "lucide-react";
import type { AnalysisHistoryItem } from "@/types";

// Mock data function - Replace with API call
const getMockHistoryData = (): AnalysisHistoryItem[] => [
  {
    id: "1",
    module: "Payment Gateway Module",
    changeType: "API Modification",
    timestamp: "2024-01-15T14:30:00Z",
    impact: "High",
    status: "completed",
    affectedModules: 12,
    criticalIssues: 2,
  },
  {
    id: "2",
    module: "User Authentication Service",
    changeType: "Business Logic Update",
    timestamp: "2024-01-15T11:20:00Z",
    impact: "Medium",
    status: "in-progress",
    affectedModules: 7,
    criticalIssues: 0,
  },
  {
    id: "3",
    module: "Email Notification Handler",
    changeType: "Configuration Change",
    timestamp: "2024-01-14T16:45:00Z",
    impact: "Low",
    status: "completed",
    affectedModules: 3,
    criticalIssues: 0,
  },
  {
    id: "4",
    module: "Data Processing Pipeline",
    changeType: "Database Schema Change",
    timestamp: "2024-01-14T09:15:00Z",
    impact: "High",
    status: "completed",
    affectedModules: 15,
    criticalIssues: 3,
  },
  {
    id: "5",
    module: "API Gateway Configuration",
    changeType: "Dependency Update",
    timestamp: "2024-01-13T13:50:00Z",
    impact: "Medium",
    status: "completed",
    affectedModules: 8,
    criticalIssues: 1,
  },
];

const History = () => {
  const [historyData, setHistoryData] = useState<AnalysisHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // TODO: Replace with actual API call
  // Required API endpoint: GET /api/analyses/history?search={query}&limit={limit}
  // Response: AnalysisHistoryItem[]
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // TODO: Replace with actual API call:
        // const response = await fetch(`/api/analyses/history?search=${searchQuery}`);
        // const data = await response.json();

        setHistoryData(getMockHistoryData());
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [searchQuery]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    // Required API endpoint: GET /api/analyses/export?format=csv
    console.log("Export functionality to be implemented");
  };

  const filteredHistory = historyData.filter((item) =>
    item.module.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Analysis History
          </h1>
          <p className="text-muted-foreground">
            Complete timeline of all impact analyses
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 bg-gradient-card border-border/50 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by module name..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 w-4 h-4" />
              Filters
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 w-4 h-4" />
              Export
            </Button>
          </div>
        </Card>

        {/* Timeline */}
        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-card border-border/50"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <Skeleton className="w-10 h-10 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="w-64 h-6" />
                        <Skeleton className="w-48 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-24 h-6 rounded-full" />
                    <Skeleton className="w-24 h-6 rounded-full" />
                  </div>
                </div>
              </Card>
            ))
          ) : filteredHistory.length === 0 ? (
            <Card className="p-12 bg-gradient-card border-border/50 text-center">
              <p className="text-muted-foreground">
                No analysis history found. Start a new analysis to see results
                here.
              </p>
            </Card>
          ) : (
            filteredHistory.map((item) => (
              <Card
                key={item.id}
                className="p-6 bg-gradient-card border-border/50 hover:shadow-md transition-all hover:border-primary/30 cursor-pointer"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg mt-1">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">
                          {item.module}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span>{formatTimestamp(item.timestamp)}</span>
                          <span>•</span>
                          <span>{item.changeType}</span>
                          <span>•</span>
                          <span>
                            {item.affectedModules} component
                            {item.affectedModules !== 1 ? "s" : ""} affected
                          </span>
                          {item.criticalIssues > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-destructive font-medium">
                                {item.criticalIssues} critical issue
                                {item.criticalIssues !== 1 ? "s" : ""}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        item.impact === "High"
                          ? "bg-destructive/10 text-destructive"
                          : item.impact === "Medium"
                          ? "bg-warning/10 text-warning"
                          : "bg-success/10 text-success"
                      }`}
                    >
                      {item.impact.toUpperCase()} RISK
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        item.status === "completed"
                          ? "bg-success/10 text-success"
                          : item.status === "in-progress"
                          ? "bg-warning/10 text-warning"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
