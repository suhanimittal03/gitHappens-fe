import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import type { MetricCard, RecentAnalysis } from "@/types";

// Mock data functions - Replace with API calls
const getMockMetrics = (): MetricCard[] => [
  {
    title: "Total Analyses",
    value: "247",
    change: "+12%",
    trend: "up",
    icon: "Activity",
  },
  {
    title: "Avg. Components Affected",
    value: "8.3",
    change: "-5%",
    trend: "down",
    icon: "TrendingUp",
  },
  {
    title: "High Risk Changes",
    value: "23",
    change: "+8%",
    trend: "up",
    icon: "AlertTriangle",
  },
  {
    title: "Success Rate",
    value: "94%",
    change: "+2%",
    trend: "up",
    icon: "CheckCircle2",
  },
];

const getMockRecentAnalyses = (): RecentAnalysis[] => [
  {
    id: "1",
    module: "Payment Gateway Module",
    timestamp: "2 hours ago",
    impact: "High",
    status: "completed",
  },
  {
    id: "2",
    module: "User Authentication Service",
    timestamp: "5 hours ago",
    impact: "Medium",
    status: "in-progress",
  },
  {
    id: "3",
    module: "Email Notification Handler",
    timestamp: "1 day ago",
    impact: "Low",
    status: "completed",
  },
];

const Dashboard = () => {
  const [metrics, setMetrics] = useState<MetricCard[]>([]);
  const [recentAnalyses, setRecentAnalyses] = useState<RecentAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  // TODO: Replace with actual API calls
  // Required API endpoints:
  // - GET /api/dashboard/metrics -> Returns MetricCard[]
  // - GET /api/analyses/recent?limit=3 -> Returns RecentAnalysis[]
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // TODO: Replace with actual API calls:
        // const metricsRes = await fetch('/api/dashboard/metrics');
        // const metricsData = await metricsRes.json();
        setMetrics(getMockMetrics());

        // const analysesRes = await fetch('/api/analyses/recent?limit=3');
        // const analysesData = await analysesRes.json();
        setRecentAnalyses(getMockRecentAnalyses());
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getIcon = (iconName: string) => {
    const icons = {
      Activity,
      TrendingUp,
      AlertTriangle,
      CheckCircle2,
      Clock,
    };
    return icons[iconName as keyof typeof icons] || Activity;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Impact Analysis Dashboard
          </h1>
          <p className="text-muted-foreground">
            AI-powered insights for smarter development decisions
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-card border-border/50"
              >
                <div className="flex items-start justify-between mb-4">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <Skeleton className="w-12 h-5" />
                </div>
                <Skeleton className="w-16 h-8 mb-1" />
                <Skeleton className="w-32 h-4" />
              </Card>
            ))
          ) : (
            metrics.map((metric, index) => {
              const Icon = getIcon(metric.icon);
              return (
                <Card
                  key={index}
                  className="p-6 bg-gradient-card border-border/50 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        metric.trend === "up"
                          ? "text-success"
                          : "text-destructive"
                      }`}
                    >
                      {metric.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {metric.title}
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Recent Analyses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recent Analyses</h2>
            <Link to="/history">
              <Button variant="ghost" className="group">
                View All
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Card
                  key={index}
                  className="p-6 bg-gradient-card border-border/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Skeleton className="w-48 h-6 mb-2" />
                      <Skeleton className="w-32 h-4" />
                    </div>
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-20 h-6 rounded-full" />
                      <Skeleton className="w-20 h-6 rounded-full" />
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              recentAnalyses.map((analysis) => (
                <Card
                  key={analysis.id}
                  className="p-6 bg-gradient-card border-border/50 hover:shadow-md transition-all hover:border-primary/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {analysis.module}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {analysis.timestamp}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          analysis.impact === "High"
                            ? "bg-destructive/10 text-destructive"
                            : analysis.impact === "Medium"
                            ? "bg-warning/10 text-warning"
                            : "bg-success/10 text-success"
                        }`}
                      >
                        {analysis.impact.toUpperCase()} RISK
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          analysis.status === "completed"
                            ? "bg-success/10 text-success"
                            : analysis.status === "in-progress"
                            ? "bg-warning/10 text-warning"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {analysis.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="p-8 bg-gradient-hero border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Ready for a new analysis?
              </h3>
              <p className="text-muted-foreground">
                Upload your code changes and get instant impact insights
              </p>
            </div>
            <Link to="/analyze">
              <Button
                size="lg"
                className="bg-gradient-primary hover:shadow-glow transition-all"
              >
                Start New Analysis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
