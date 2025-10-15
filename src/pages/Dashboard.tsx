import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight, Clock } from "lucide-react";

const Dashboard = () => {
  const recentAnalyses = [
    {
      id: 1,
      module: "Payment Gateway Module",
      timestamp: "2 hours ago",
      risk: "high",
      affectedComponents: 12,
      status: "reviewed",
    },
    {
      id: 2,
      module: "User Authentication Service",
      timestamp: "5 hours ago",
      risk: "medium",
      affectedComponents: 7,
      status: "pending",
    },
    {
      id: 3,
      module: "Email Notification Handler",
      timestamp: "1 day ago",
      risk: "low",
      affectedComponents: 3,
      status: "reviewed",
    },
  ];

  const metrics = [
    {
      label: "Total Analyses",
      value: "247",
      change: "+12%",
      icon: Activity,
      trend: "up",
    },
    {
      label: "Avg. Components Affected",
      value: "8.3",
      change: "-5%",
      icon: TrendingUp,
      trend: "down",
    },
    {
      label: "High Risk Changes",
      value: "23",
      change: "+8%",
      icon: AlertTriangle,
      trend: "up",
    },
    {
      label: "Success Rate",
      value: "94%",
      change: "+2%",
      icon: CheckCircle2,
      trend: "up",
    },
  ];

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
          {metrics.map((metric) => (
            <Card key={metric.label} className="p-6 bg-gradient-card border-border/50 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <metric.icon className="w-5 h-5 text-primary" />
                </div>
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-success' : 'text-destructive'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </Card>
          ))}
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
            {recentAnalyses.map((analysis) => (
              <Card
                key={analysis.id}
                className="p-6 bg-gradient-card border-border/50 hover:shadow-md transition-all hover:border-primary/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{analysis.module}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {analysis.timestamp}
                      </span>
                      <span>{analysis.affectedComponents} components affected</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        analysis.risk === "high"
                          ? "bg-destructive/10 text-destructive"
                          : analysis.risk === "medium"
                          ? "bg-warning/10 text-warning"
                          : "bg-success/10 text-success"
                      }`}
                    >
                      {analysis.risk.toUpperCase()} RISK
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        analysis.status === "reviewed"
                          ? "bg-success/10 text-success"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {analysis.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="p-8 bg-gradient-hero border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready for a new analysis?</h3>
              <p className="text-muted-foreground">
                Upload your code changes and get instant impact insights
              </p>
            </div>
            <Link to="/analyze">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all">
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
